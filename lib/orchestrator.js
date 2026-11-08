/**
 * dsh-kanban orchestration engine v2 (no LLM: plain server automation).
 *
 * Responsibilities:
 * - Watch every workspace board (changes flow through kanban dispatch; a timer
 *   re-reconciles as a safety net).
 * - Column roles: each column can be bound to an agent preset (role). When a
 *   card arrives in such a column the engine stamps the assignment (comment,
 *   optional label) and records it in the status log.
 * - WIP limit: at most `wipLimit` cards may live in the flow (outside the
 *   source and done columns). Auto-pull moves the next source card into the
 *   entry column only while the limit allows it — this is the core guarantee
 *   that a local model never faces parallel work.
 * - Agent dispatch (on by default): when a card arrives in a role column the
 *   engine creates a Session running that preset, optionally pins a model
 *   (`dispatchModel`), and delivers the card as the first user message through
 *   agent.followup(). The card↔session link is persisted in
 *   `.dsh-kanban-orch-state.json` so the Board UI can open the exact dialog.
 * - Attachments: `.kanban-attachments/<cardId>/<role>/` files are listed per
 *   card, grouped by creator and sorted by modification time (node fs,
 *   read-only). `📎 <path>` markers in comments are listed too.
 *
 * Persistence: per-workspace config `.dsh-kanban-orch.json` and runtime state
 * `.dsh-kanban-orch-state.json`, written with the same fs sandbox pattern as
 * the board file. All board mutations go through the kanban `dispatch` queue so
 * the in-memory cache and the disk file never diverge.
 */

export const ORCH_FILE = '.dsh-kanban-orch.json'
export const ORCH_STATE_FILE = '.dsh-kanban-orch-state.json'
export const ATTACH_DIR = '.kanban-attachments'
export const ORCH_SCHEMA = 1

const PRIORITIES = { high: 0, medium: 1, low: 2 }
const LOG_LIMIT = 200
const MIN_TICK_MS = 5000
const DEFAULT_TICK_MS = 20000
const PREVIEW_MAX_BYTES = 128 * 1024
const FORBIDDEN_PATH_RE = /(^|[\\/])(node_modules|\.git|\.dsh)([\\/]|$)|\.env$/i

const isObj = (v) => typeof v === 'object' && v !== null && !Array.isArray(v)
const clampInt = (v, fb, min, max) => {
  const n = typeof v === 'number' ? v : Number.parseInt(String(v ?? ''), 10)
  if (!Number.isFinite(n)) return fb
  return Math.max(min, Math.min(max, Math.trunc(n)))
}
const nowIso = () => new Date().toISOString()
const safeCardId = (v) => (typeof v === 'string' && /^[a-z0-9]{1,32}$/i.test(v) ? v : null)

export function defaultConfig() {
  return {
    schemaVersion: ORCH_SCHEMA,
    enabled: false,
    sourceColumnIds: [],
    doneColumnIds: [],
    entryColumnId: null,
    wipLimit: 1,
    autoPull: true,
    pullOrder: 'priority',
    enforceWip: false,
    stampAssignments: true,
    labelAssignments: true,
    dispatchEnabled: true,
    dispatchModel: null,
    uiRefreshSec: 5,
    tickMs: DEFAULT_TICK_MS,
    columnRoles: {},
  }
}

export function normalizeConfig(raw) {
  const base = defaultConfig()
  if (!isObj(raw)) return base
  const out = { ...base }
  out.enabled = raw.enabled === true
  out.autoPull = raw.autoPull !== false
  out.enforceWip = raw.enforceWip === true
  out.stampAssignments = raw.stampAssignments !== false
  out.labelAssignments = raw.labelAssignments !== false
  out.dispatchEnabled = raw.dispatchEnabled !== false
  out.wipLimit = clampInt(raw.wipLimit, 1, 1, 20)
  out.pullOrder = raw.pullOrder === 'board' ? 'board' : 'priority'
  out.uiRefreshSec = clampInt(raw.uiRefreshSec, 5, 0, 3600)
  out.tickMs = clampInt(raw.tickMs, DEFAULT_TICK_MS, MIN_TICK_MS, 3600000)
  out.sourceColumnIds = Array.isArray(raw.sourceColumnIds)
    ? raw.sourceColumnIds.filter((id) => typeof id === 'string' && id).slice(0, 8)
    : []
  out.doneColumnIds = Array.isArray(raw.doneColumnIds)
    ? raw.doneColumnIds.filter((id) => typeof id === 'string' && id).slice(0, 8)
    : []
  out.entryColumnId = typeof raw.entryColumnId === 'string' && raw.entryColumnId ? raw.entryColumnId : null
  if (isObj(raw.dispatchModel)) {
    const provider = typeof raw.dispatchModel.provider === 'string' ? raw.dispatchModel.provider.trim() : ''
    const model = typeof raw.dispatchModel.model === 'string' ? raw.dispatchModel.model.trim() : ''
    const effort = typeof raw.dispatchModel.reasoningEffort === 'string' ? raw.dispatchModel.reasoningEffort.trim() : ''
    out.dispatchModel = provider && model ? { provider, model, ...(effort ? { reasoningEffort: effort } : {}) } : null
  } else {
    out.dispatchModel = null
  }
  out.columnRoles = {}
  if (isObj(raw.columnRoles)) {
    for (const [k, v] of Object.entries(raw.columnRoles)) {
      if (typeof k === 'string' && k && typeof v === 'string' && v) out.columnRoles[k] = v
    }
  }
  out.schemaVersion = ORCH_SCHEMA
  return out
}

/** Deterministic colors for role labels; stable per role name. */
function roleColor(role) {
  let h = 0
  for (let i = 0; i < role.length; i += 1) h = (h * 31 + role.charCodeAt(i)) >>> 0
  const hue = h % 360
  const s = 0.62
  const l = 0.56
  const c = (1 - Math.abs(2 * l - 1)) * s
  const x = c * (1 - Math.abs(((hue / 60) % 2) - 1))
  const m = l - c / 2
  let r = 0
  let g = 0
  let b = 0
  if (hue < 60) [r, g, b] = [c, x, 0]
  else if (hue < 120) [r, g, b] = [x, c, 0]
  else if (hue < 180) [r, g, b] = [0, c, x]
  else if (hue < 240) [r, g, b] = [0, x, c]
  else if (hue < 300) [r, g, b] = [x, 0, c]
  else [r, g, b] = [c, 0, x]
  const hex = (v) => Math.round((v + m) * 255).toString(16).padStart(2, '0')
  return '#' + hex(r) + hex(g) + hex(b)
}

export function createOrchestrator(deps) {
  const {
    dispatch, listWorkspaces, workspaceKey, readFile, writeFile, logger, presetsProvider,
  } = deps
  const log = (msg) => { try { logger.info('kanban-orchestrator: ' + msg) } catch { console.log('kanban-orchestrator: ' + msg) } }

  /** node fs for read-only attachment listings (metadata only, no contents). */
  const nodeFs = (() => {
    try {
      const g = process.getBuiltinModule ? process.getBuiltinModule('node:fs') : require('node:fs')
      return g && typeof g.readdirSync === 'function' ? g : null
    } catch {
      return null
    }
  })()

  /** wsKey -> {config, cardColumn, stamped, log, inflight, links, linksLoaded, dirty, running} */
  const states = new Map()
  let sweepTimer
  let stopping = false

  const stateOf = (wsKey) => {
    let s = states.get(wsKey)
    if (!s) {
      s = {
        config: null, configPromise: null, cardColumn: new Map(), stamped: new Set(), tried: new Set(),
        log: [], inflight: new Map(), links: {}, linksLoaded: false, linksPromise: null,
        linksDirty: false, dirty: false, running: false,
      }
      states.set(wsKey, s)
    }
    return s
  }

  const pushLog = (s, type, text) => {
    s.log.push({ ts: nowIso(), type, text })
    if (s.log.length > LOG_LIMIT) s.log.splice(0, s.log.length - LOG_LIMIT)
    log(type + ': ' + text)
  }

  /*
   * R2.9 (our fork): the workflow rules - columns, WIP, auto-pull, dispatch - are one shared policy for
   * the whole host, kept in $DSH_HOME/kanban-orch.global.json, because a board is only a place to put a
   * card and the rules belong to the workflow, not to a folder. The only per-board setting is whether the
   * orchestrator runs on that board at all: `<workspace>/.dsh-kanban-orch.json` keeps `enabled` and
   * nothing else. A workspace file that still holds a full configuration is legacy: its `enabled` is used
   * as the override and its other fields are ignored, so no board can drift a different workflow quietly.
   */
  const GLOBAL_ORCH_FILE = 'kanban-orch.global.json'
  const globalOrchPath = () => {
    const builtin = process.getBuiltinModule
    const nodePath = builtin ? builtin('node:path') : null
    const nodeOs = builtin ? builtin('node:os') : null
    if (!nodePath) throw new Error('node:path is not available to this module')
    const home = typeof process.env.DSH_HOME === 'string' && process.env.DSH_HOME ? process.env.DSH_HOME : nodePath.join(nodeOs ? nodeOs.homedir() : '/home/viz', '.dsh')
    return nodePath.join(home, GLOBAL_ORCH_FILE)
  }
  let globalConfig = null
  let globalTitles = null
  const titlesOf = (raw) => ({
    columns: Array.isArray(raw && raw.columns) ? raw.columns.filter((t) => typeof t === 'string' && t).slice(0, 12) : [],
    sourceColumnTitles: Array.isArray(raw && raw.sourceColumnTitles) ? raw.sourceColumnTitles.filter((t) => typeof t === 'string' && t).slice(0, 8) : [],
    doneColumnTitles: Array.isArray(raw && raw.doneColumnTitles) ? raw.doneColumnTitles.filter((t) => typeof t === 'string' && t).slice(0, 8) : [],
    entryColumnTitle: raw && typeof raw.entryColumnTitle === 'string' && raw.entryColumnTitle ? raw.entryColumnTitle : null,
    columnRolesByTitle: isObj(raw && raw.columnRolesByTitle) ? Object.fromEntries(Object.entries(raw.columnRolesByTitle).filter(([k, v]) => typeof k === 'string' && k && typeof v === 'string' && v)) : {},
  })
  const loadGlobalConfig = async () => {
    if (globalConfig) return globalConfig
    let raw = null
    try {
      const text = await (process.getBuiltinModule ? process.getBuiltinModule('node:fs/promises') : null).readFile(globalOrchPath(), 'utf8')
      raw = JSON.parse(text)
      globalConfig = normalizeConfig(raw)
    } catch {
      globalConfig = defaultConfig()
    }
    globalTitles = titlesOf(raw)
    return globalConfig
  }
  const readWorkspaceOverride = async (workspace) => {
    try {
      const text = await readFile(workspace, ORCH_FILE)
      const raw = text ? JSON.parse(text) : null
      if (!isObj(raw)) return null
      return { enabled: typeof raw.enabled === 'boolean' ? raw.enabled : null }
    } catch {
      return null
    }
  }

  const loadConfig = async (wsKey, workspace) => {
    const s = stateOf(wsKey)
    if (s.config) return s.config
    if (s.configPromise) return s.configPromise
    s.configPromise = (async () => {
      const shared = await loadGlobalConfig()
      const override = await readWorkspaceOverride(workspace)
      const cfg = normalizeConfig({ ...shared, enabled: override && override.enabled !== null ? override.enabled : shared.enabled })
      cfg.sharedTitles = { ...(globalTitles || titlesOf(null)) }
      s.config = cfg
      return s.config
    })()
    return s.configPromise
  }

  const loadLinks = async (wsKey, workspace) => {
    const s = stateOf(wsKey)
    if (s.linksLoaded) return s.links
    if (s.linksPromise) return s.linksPromise
    s.linksPromise = (async () => {
      try {
        const text = await readFile(workspace, ORCH_STATE_FILE)
        const data = text ? JSON.parse(text) : null
        s.links = isObj(data) && isObj(data.links) ? data.links : {}
      } catch {
        s.links = {}
      }
      s.linksLoaded = true
      return s.links
    })()
    return s.linksPromise
  }

  let linksFlushTimer
  const scheduleLinksFlush = () => {
    if (linksFlushTimer) return
    linksFlushTimer = setTimeout(() => {
      linksFlushTimer = null
      for (const [wsKey, s] of states) {
        if (!s.linksLoaded || !s.linksDirty) continue
        s.linksDirty = false
        const ws = resolveWorkspace(wsKey)
        if (!ws) continue
        writeFile(ws, ORCH_STATE_FILE, JSON.stringify({ schemaVersion: 1, links: s.links }, null, 2) + '\n')
          .catch((err) => pushLog(s, 'state-warn', 'links save failed: ' + ((err && err.message) || err)))
      }
    }, 300)
    if (typeof linksFlushTimer.unref === 'function') linksFlushTimer.unref()
  }

  const saveConfig = async (workspace, raw) => {
    const wsKey = workspaceKey(workspace)
    const s = stateOf(wsKey)
    const shared = normalizeConfig(raw)
    // R3.0 (our fork): the UI edits the columns of this board, which have the ids of this board. Store the
    // policy by column name so the next board - with different ids - reads the same workflow.
    try {
      const boardRes = await dispatch(workspace, 'get', {}, 'agent')
      const columns = boardRes && boardRes.board && Array.isArray(boardRes.board.columns) ? boardRes.board.columns : []
      const titleOf = (id) => {
        const hit = columns.find((c) => c.id === id)
        return hit ? String(hit.title).trim() : null
      }
      const names = (ids) => (Array.isArray(ids) ? ids.map(titleOf).filter(Boolean) : [])
      const titles = titlesOf(null)
      titles.columns = columns.map((c) => String(c.title).trim()).filter(Boolean).slice(0, 12)
      titles.sourceColumnTitles = names(raw && raw.sourceColumnIds)
      titles.doneColumnTitles = names(raw && raw.doneColumnIds)
      titles.entryColumnTitle = raw && raw.entryColumnId ? titleOf(raw.entryColumnId) : null
      titles.columnRolesByTitle = {}
      if (isObj(raw && raw.columnRoles)) {
        for (const [id, role] of Object.entries(raw.columnRoles)) {
          const title = titleOf(id)
          if (title && typeof role === 'string' && role) titles.columnRolesByTitle[title] = role
        }
      }
      Object.assign(shared, titles)
      globalTitles = titles
    } catch (err) {
      pushLog(s, 'config-warn', 'the policy could not be translated to column names: ' + ((err && err.message) || err))
    }
    // Only this board switch goes to the workspace file; everything else is the host-wide policy.
    const cfg = normalizeConfig({ ...(await loadGlobalConfig()), enabled: shared.enabled })
    globalConfig = shared
    try {
      await (process.getBuiltinModule ? process.getBuiltinModule('node:fs/promises') : null).writeFile(globalOrchPath(), JSON.stringify(shared, null, 2) + '\n')
    } catch (err) {
      pushLog(s, 'config-error', 'the shared policy could not be saved (' + ((err && err.message) || err) + '); kept in memory only')
    }
    for (const [, other] of states) { other.config = null; other.configPromise = null }
    s.config = cfg
    s.configPromise = Promise.resolve(cfg)
    await writeFile(workspace, ORCH_FILE, JSON.stringify({ schemaVersion: 1, enabled: shared.enabled }, null, 2) + '\n')
    pushLog(s, 'config-saved', 'wipLimit=' + cfg.wipLimit + ' enabled=' + cfg.enabled + ' autoPull=' + cfg.autoPull
      + ' dispatch=' + cfg.dispatchEnabled + (cfg.dispatchModel ? ' model=' + cfg.dispatchModel.provider + '/' + cfg.dispatchModel.model : ''))
    scheduleReconcile(wsKey)
    return cfg
  }

  /** Column model helpers */
  // R3.5 (our fork): a column name is the identity of a shared column and the person types it in, so
  // "Done" and "done" must be one column. Case-sensitive matching created a second Done column on all ten
  // boards and moved where finished cards live.
  const sameTitle = (a, b) => String(a ?? '').trim().toLowerCase() === String(b ?? '').trim().toLowerCase()
  const exactTitle = (a, b) => String(a ?? '').trim() === String(b ?? '').trim()

  /** R3.2 (our fork): lay the shared column policy out on one board. */
  const applyColumnPolicy = async (workspace, previousTitles) => {
    const titles = globalTitles || titlesOf(null)
    if (!Array.isArray(titles.columns) || titles.columns.length === 0) return null
    const s = stateOf(workspaceKey(workspace))
    const res = await dispatch(workspace, 'get', {}, 'agent')
    const board = res && res.board
    if (!board || !Array.isArray(board.columns)) return null
    const out = { workspaceId: String(workspace.id || workspace.path), title: workspace.title || workspace.path, created: [], renamed: [], moved: 0 }
    for (const title of titles.columns) {
      const existing = board.columns.find((c) => sameTitle(c.title, title))
      if (!existing) {
        const added = await dispatch(workspace, 'addColumn', { title }, 'agent')
        if (added && added.error) pushLog(s, 'column-warn', '«' + title + '» could not be created: ' + added.error)
        else if (added && added.column) board.columns.push(added.column)
        else if (added) board.columns.push({ id: String(added.id || added.card?.id || ''), title })
        out.created.push(title)
      } else if (!exactTitle(existing.title, title)) {
        const rewritten = await dispatch(workspace, 'renameColumn', { id: existing.id, title }, 'agent')
        if (rewritten && rewritten.error) pushLog(s, 'column-warn', '«' + existing.title + '» could not be written as «' + title + '»: ' + rewritten.error)
        else { out.renamed.push(existing.title + ' → ' + title); existing.title = title }
      }
    }
    const prev = previousTitles && Array.isArray(previousTitles.columns) ? previousTitles.columns : []
    for (let i = 0; i < Math.min(prev.length, titles.columns.length); i++) {
      const oldTitle = prev[i]; const newTitle = titles.columns[i]
      if (!oldTitle || oldTitle === newTitle) continue
      if (titles.columns.includes(oldTitle)) continue
      const stale = board.columns.find((c) => sameTitle(c.title, oldTitle))
      if (!stale) continue
      // A rename never makes a second column with the name the board already has: that is how a board
      // ends up with two Done columns, and the person loses track of where finished cards live.
      if (board.columns.some((c) => exactTitle(c.title, newTitle))) { pushLog(s, 'column-warn', '«' + oldTitle + '» was not renamed to «' + newTitle + '»: this board already has a column with that name'); continue }
      const renamed = await dispatch(workspace, 'renameColumn', { id: stale.id, title: newTitle }, 'agent')
      if (renamed && renamed.error) pushLog(s, 'column-warn', 'rename «' + oldTitle + '» → «' + newTitle + '»: ' + renamed.error)
      else { stale.title = newTitle; out.renamed.push(oldTitle + ' → ' + newTitle) }
    }
    for (let i = 0; i < titles.columns.length; i++) {
      const wanted = titles.columns[i]
      const at = board.columns.findIndex((c) => sameTitle(c.title, wanted))
      if (at < 0 || at === i) continue
      const moved = await dispatch(workspace, 'moveColumn', { id: board.columns[at].id, toIndex: i }, 'agent')
      if (moved && moved.error) { pushLog(s, 'column-warn', 'order of «' + wanted + '»: ' + moved.error); continue }
      const [col] = board.columns.splice(at, 1)
      board.columns.splice(i, 0, col)
      out.moved++
    }
    const doneTitle = titles.doneColumnTitles[0]
    if (doneTitle) {
      const doneCol = board.columns.find((c) => sameTitle(c.title, doneTitle))
      if (doneCol && board.completedColumnId !== doneCol.id) {
        const set = await dispatch(workspace, 'setCompletedColumn', { columnId: doneCol.id }, 'agent')
        if (set && set.error) pushLog(s, 'column-warn', 'the done column could not be marked: ' + set.error)
      }
    }
    return out
  }

  const columnModel = (board, cfgRaw) => {
    const cfg = cfgRaw || defaultConfig()
    const columns = Array.isArray(board.columns) ? board.columns : []
    // R3.0 (our fork): the shared policy names columns, not column ids, because an id belongs to one board
    // and a name belongs to the workflow. Here the names become this board ids.
    const idByTitle = (title) => {
      const hit = columns.find((c) => String(c.title ?? '').trim().toLowerCase() === String(title ?? '').trim().toLowerCase())
      return hit ? hit.id : null
    }
    const titles = cfg.sharedTitles || {}
    if (Array.isArray(titles.sourceColumnTitles) && titles.sourceColumnTitles.length) {
      cfg.sourceColumnIds = titles.sourceColumnTitles.map(idByTitle).filter(Boolean)
    }
    if (Array.isArray(titles.doneColumnTitles) && titles.doneColumnTitles.length) {
      cfg.doneColumnIds = titles.doneColumnTitles.map(idByTitle).filter(Boolean)
    }
    if (titles.entryColumnTitle) cfg.entryColumnId = idByTitle(titles.entryColumnTitle)
    if (titles.columnRolesByTitle) {
      cfg.columnRoles = {}
      for (const [title, role] of Object.entries(titles.columnRolesByTitle)) {
        const id = idByTitle(title)
        if (id) cfg.columnRoles[id] = role
      }
    }
    const doneIds = new Set(cfg.doneColumnIds.filter((id) => columns.some((c) => c.id === id)))
    if (board.completedColumnId && columns.some((c) => c.id === board.completedColumnId)) doneIds.add(board.completedColumnId)
    const sourceIds = new Set(cfg.sourceColumnIds.filter((id) => columns.some((c) => c.id === id)))
    if (sourceIds.size === 0 && columns.length > 0) sourceIds.add(columns[0].id)
    let entry = cfg.entryColumnId && columns.some((c) => c.id === cfg.entryColumnId) && !sourceIds.has(cfg.entryColumnId) && !doneIds.has(cfg.entryColumnId)
      ? cfg.entryColumnId
      : null
    if (!entry) {
      const after = columns.filter((c) => !sourceIds.has(c.id) && !doneIds.has(c.id))
      entry = after.length > 0 ? after[0].id : null
    }
    return { columns, doneIds, sourceIds, entry }
  }

  const activeCards = (board, model) => board.cards.filter(
    (c) => !model.sourceIds.has(c.columnId) && !model.doneIds.has(c.columnId),
  )

  const pickNextSource = (board, model, cfg) => {
    const pool = board.cards.filter((c) => model.sourceIds.has(c.columnId))
    if (pool.length === 0) return null
    if (cfg.pullOrder === 'priority') {
      const sorted = [...pool].sort((a, b) => {
        const pa = a.priority ? (PRIORITIES[a.priority] ?? 3) : 4
        const pb = b.priority ? (PRIORITIES[b.priority] ?? 3) : 4
        if (pa !== pb) return pa - pb
        return board.cards.indexOf(a) - board.cards.indexOf(b)
      })
      return sorted[0]
    }
    return pool[0]
  }

  const listPresets = async () => {
    if (!presetsProvider) return []
    try {
      const list = await presetsProvider()
      return Array.isArray(list) ? list.filter((p) => p && typeof p.id === 'string') : []
    } catch {
      return []
    }
  }

  const columnsById = (board, ids) => (board.columns || []).filter((c) => ids.includes(c.id))

  const buildPrompt = (card, colTitle, role, model, board, cfg, workspaceId) => {
    const doneCol = columnsById(board, [...model.doneIds])[0]
    const lines = []
    lines.push('Task ID: ' + card.id + ' — ' + card.title)
    lines.push('')
    lines.push('[Kanban Orchestrator] Роль «' + role + '»: карточка ' + card.id + ' перемещена в столбец «' + colTitle + '» — начни работу по ней прямо сейчас.')
    lines.push('Заголовок карточки: ' + card.title)
    if (card.note) {
      lines.push('Описание:')
      lines.push(String(card.note).slice(0, 2000))
    }
    lines.push('')
    lines.push('Правила работы (строго):')
    lines.push('1)workspaceId для всех kanban-инструментов: ' + workspaceId + '. Полный текст карточки: kanban_get_card {workspaceId, id:"' + card.id + '"}.')
    lines.push('2) Прогресс и итог ОБЯЗАТЕЛЬНО фиксируй комментариями карточки: kanban_add_comment {workspaceId, id:"' + card.id + '", content:"..."}. Минимум: один комментарий в начале работы и финальный отчёт в конце (что сделано, где результат).')
    lines.push('3) Все созданные/изменённые файлы, важные для приёмки задачи (отчёты, артефакты, скрипты), копируй в каталог ' + ATTACH_DIR + '/' + card.id + '/' + role + '/ — они появятся в блоке Attachments карточки.')
    lines.push('4) Если по ходу создаёшь файлы вне этого каталога — добавь комментарий с пометкой «📎 <путь>» (одна строка на файл).')
    if (doneCol) {
      lines.push('5) Когда задача полностью выполнена — перемести карточку в столбец «' + doneCol.title + '» (id: ' + doneCol.id + '): kanban_move_card {workspaceId, id:"' + card.id + '", columnId:"' + doneCol.id + '"}. Если работа не завершена — оставь карточку в столбце «' + colTitle + '» и опиши причину комментарием.')
    }
    lines.push('6) В работе всегда ровно одна карточка (лимит ' + cfg.wipLimit + '). Работай только по этой карточке, параллельные задачи не создавай.')
    return lines.join('\n')
  }

  const reworkPrompt = (card, colTitle, role) => {
    const lines = []
    lines.push('[Kanban Orchestrator] Карточка ' + card.id + ' снова в столбце «' + colTitle + '» (роль «' + role + '»).')
    lines.push('Прочитай свежие комментарии карточки (kanban_get_card) и продолжи/исправь работу по замечаниям. Результат — комментарием карточки; при завершении перемести карточку в Done.')
    return lines.join('\n')
  }

  const addEngineComment = (workspace, cardId, text) =>
    dispatch(workspace, 'addComment', { id: cardId, content: text.slice(0, 2000) }, 'agent')

  /** Create (or reuse) the role session and deliver the card. */
  const dispatchToRole = async (workspace, s, cfg, board, model, card, role, isRework) => {
    if (s.inflight.has(card.id) && s.inflight.get(card.id).pending) return
    const ctx = deps.ctx

    // R2.5' (our fork): ask the team channel before creating anything. The channel owns
    // the single model slot, so the card has to be woken there if it can be woken there.
    // `wakeDelegate` returns the service or null; the engine never depends on the chat
    // plugin being present, and keeps its own path when the channel refuses.
    if (typeof deps.wakeDelegate === 'function') {
      let service = null
      try { service = deps.wakeDelegate() } catch { service = null }
      if (service && typeof service.canWake === 'function' && service.canWake() && typeof service.wake === 'function') {
        let answer = null
        try {
          answer = await service.wake({
            workspaceKey: workspaceKey(workspace),
            // The channel needs the folder the role works in; the board file lives in it, so the
            // engine is the one side that certainly knows the path.
            workspacePath: workspace.path ?? null,
            cardId: card.id,
            title: card.title,
            role,
            columnTitle: (board.columns.find((c) => c.id === card.columnId) || {}).title || card.columnId,
            assignee: card.assignee ?? null,
            rework: Boolean(isRework),
          })
        } catch (err) {
          pushLog(s, 'dispatch-delegate-failed', 'card ' + card.id + ': the channel threw while taking the wake: ' + ((err && err.message) || err))
        }
        if (answer && answer.accepted) {
          s.inflight.set(card.id, { role, at: nowIso(), sessionId: null, delegated: true, requestId: answer.requestId ?? null, pending: false })
          pushLog(s, 'dispatch-delegated', 'card ' + card.id + ' «' + card.title + '» → роль «' + role + '» передана каналу команды' + (answer.requestId ? ' (request ' + answer.requestId + ')' : ''))
          return
        }
        // R2.5'b (our fork): «not now, ask again» is not permission to dispatch alone. The
        // channel holds the single model request, so the engine defers this card to a later tick
        // instead of starting a second clock - which is the whole point of one owner.
        if (answer && answer.retry === true) {
          s.tried.delete(card.id + ':' + role)
          pushLog(s, 'dispatch-delegate-deferred', 'card ' + card.id + ': канал держит единый запрос к модели, доска спросит позже (' + ((answer && answer.code) || 'slot busy') + ')')
          return
        }
        pushLog(s, 'dispatch-delegate-refused', 'card ' + card.id + ': канал не принял пробуждение (' + ((answer && (answer.code || answer.message)) || 'unknown') + ')')
      }
    }
    // Session lifecycle goes through the `sessionController` service:
    // create({cwd, agentPreset}) -> {sessionId}; selectModel validates + pins the
    // model for the next request; resolveAgent(sessionId) -> {agent} for followup.
    let sc = null
    let scProbe = 'no-ctx'
    try {
      sc = ctx && ctx.get ? ctx.get('sessionController') : null
      scProbe = 'type=' + typeof sc + ' create=' + typeof (sc && sc.create) + ' resolveAgent=' + typeof (sc && sc.resolveAgent)
    } catch (err) {
      scProbe = 'get-throws: ' + ((err && err.message) || err)
    }
    if (!sc || typeof sc.create !== 'function' || typeof sc.resolveAgent !== 'function') {
      s.tried.add(card.id + ':' + role)
      pushLog(s, 'dispatch-skipped', 'card ' + card.id + ': sessionController unavailable (' + scProbe + ')')
      return
    }
    const presets = await listPresets()
    if (presets.length > 0 && !presets.some((p) => p.id === role)) {
      s.tried.add(card.id + ':' + role)
      pushLog(s, 'dispatch-skipped', 'card ' + card.id + ': preset «' + role + '» is not in the roster')
      await addEngineComment(workspace, card.id, '⚙ Не удалось запустить роль «' + role + '»: такого пресета нет в реестре агентов.')
      return
    }
    const colTitle = (board.columns.find((c) => c.id === card.columnId) || {}).title || card.columnId
    const workspaceId = String(workspace.id || workspace.path)
    s.inflight.set(card.id, { role, at: nowIso(), sessionId: s.links[card.id] ? s.links[card.id].sessionId : null, pending: true })

    const send = async (agent, text) => {
      const sessions = ctx.get('sessions')
      const msg = {
        id: 'orch-' + Date.now().toString(36) + '-' + Math.random().toString(36).slice(2, 10),
        role: 'user',
        content: [{ type: 'text', text }],
        source: { kind: 'user' },
      }
      agent.followup(msg)
      if (sessions && typeof sessions.flush === 'function') {
        try { await sessions.flush(agent.session) } catch (err) { log('flush failed: ' + ((err && err.message) || err)) }
      }
    }

    try {
      const link = s.links[card.id]
      if (isRework && link && link.role === role && link.sessionId && typeof sc.resolveAgent === 'function') {
        const resolved = await sc.resolveAgent(link.sessionId)
        if (resolved && resolved.agent && typeof resolved.agent.followup === 'function') {
          await send(resolved.agent, reworkPrompt(card, colTitle, role))
          s.inflight.set(card.id, { role, at: nowIso(), sessionId: link.sessionId })
          pushLog(s, 'dispatch-rework', 'card ' + card.id + ' «' + card.title + '» → роль «' + role + '» в существующий диалог ' + String(link.sessionId).slice(0, 8))
          return
        }
      }
      const created = await sc.create({ cwd: workspace.path, agentPreset: role })
      const newSessionId = created && created.sessionId
      if (!newSessionId) {
        s.inflight.set(card.id, { role, at: nowIso(), sessionId: null, error: 'no session id' })
        pushLog(s, 'dispatch-failed', 'card ' + card.id + ' → «' + role + '»: session create returned no id')
        await addEngineComment(workspace, card.id, '⚙ Не удалось запустить работу по карточке: сессия не создана.')
        return
      }
      if (cfg.dispatchModel && typeof sc.selectModel === 'function') {
        try {
          await sc.selectModel({
            sessionId: newSessionId,
            provider: cfg.dispatchModel.provider,
            model: cfg.dispatchModel.model,
            ...(cfg.dispatchModel.reasoningEffort ? { reasoningEffort: cfg.dispatchModel.reasoningEffort } : {}),
          })
        } catch (err) {
          pushLog(s, 'model-warn', 'card ' + card.id + ': model selection failed: ' + ((err && err.message) || err))
        }
      }
      const started = await sc.resolveAgent(newSessionId)
      const agent = started && started.agent
      if (!agent || typeof agent.followup !== 'function') {
        s.inflight.set(card.id, { role, at: nowIso(), sessionId: newSessionId, error: 'no live agent' })
        pushLog(s, 'dispatch-failed', 'card ' + card.id + ' → «' + role + '»: no live agent')
        await addEngineComment(workspace, card.id, '⚙ Не удалось запустить работу по карточке: нет живого агента роли «' + role + '».')
        return
      }
      const text = buildPrompt(card, colTitle, role, model, board, cfg, workspaceId)
      await send(agent, text)
      const sessionId = (agent.session && agent.session.id) || newSessionId
      s.inflight.set(card.id, { role, at: nowIso(), sessionId })
      if (sessionId) {
        s.links[card.id] = { sessionId, role, ts: nowIso() }
        s.linksDirty = true
        scheduleLinksFlush()
      }
      pushLog(s, 'dispatch', 'card ' + card.id + ' «' + card.title + '» → роль «' + role + '» (session ' + (sessionId ? String(sessionId).slice(0, 8) : '?') + ')')
      await addEngineComment(workspace, card.id, '⚙ Работа запущена: роль «' + role + '», диалог создан. Ход работы и итог агент пишет комментариями этой карточки.')
    } catch (err) {
      s.tried.add(card.id + ':' + role)
      s.inflight.set(card.id, { role, at: nowIso(), sessionId: null, error: String((err && err.message) || err) })
      pushLog(s, 'dispatch-failed', 'card ' + card.id + ' → «' + role + '»: ' + ((err && err.message) || err))
      await addEngineComment(workspace, card.id, '⚙ Ошибка запуска роли «' + role + '»: ' + String((err && err.message) || err))
    }
  }

  const ensureRoleLabel = async (board, workspace, s, role) => {
    if (!board.labels.some((l) => l.name === role)) {
      const r = await dispatch(workspace, 'addLabel', { name: role.slice(0, 20), color: roleColor(role) }, 'agent')
      if (r && r.error) pushLog(s, 'label-warn', 'label «' + role + '»: ' + r.error)
      return r && !r.error
    }
    return true
  }

  const stampArrival = async (board, workspace, s, cfg, card, toCol, role) => {
    const stampKey = card.id + ':' + toCol.id
    if (s.stamped.has(stampKey)) return
    s.stamped.add(stampKey)
    if (!cfg.stampAssignments) return
    // R2.8 (our fork): «карточка назначена на роль» has to be a fact on the card, not only a
    // comment on it. The engine writes the column role into the card's own `assignee` when nobody
    // has assigned the card yet, so the board - not a chat log - is where the assignment lives.
    // It never writes over a role that a person or the manager already put there: that choice is
    // theirs, and silently replacing it is exactly how an assignment disappears from a board.
    const assigned = typeof card.assignee === 'string' && card.assignee.trim() ? card.assignee.trim() : null
    if (!assigned) {
      // ASSIGNEE_LIMIT of index.js is 40; the role names of the team are far shorter, and the
      // board refuses an over-long one, so the cap is applied here instead of as a failure.
      const wanted = role.trim().slice(0, 40)
      const stamped = await dispatch(workspace, 'updateCard', { id: card.id, assignee: wanted }, 'agent')
      if (stamped && stamped.error) {
        pushLog(s, 'stamp-warn', 'card ' + card.id + ': the assignee stamp was refused: ' + stamped.error)
      } else {
        card.assignee = wanted
      }
    } else if (assigned !== role) {
      pushLog(s, 'stamp-kept', 'card ' + card.id + ': already assigned to «' + assigned + '», the column role «' + role + '» was not written over')
    }
    const text = '⚙ Оркестратор: за столбец «' + toCol.title + '» отвечает роль «' + role + '» — карточка назначена на ' + role + '.'
    const r = await addEngineComment(workspace, card.id, text)
    if (r && r.error) pushLog(s, 'stamp-warn', 'card ' + card.id + ': ' + r.error)
    if (cfg.labelAssignments && !card.label) {
      const ok = await ensureRoleLabel(board, workspace, s, role)
      if (ok) {
        const u = await dispatch(workspace, 'updateCard', { id: card.id, label: role.slice(0, 20) }, 'agent')
        if (u && u.error) pushLog(s, 'stamp-warn', 'label on ' + card.id + ': ' + u.error)
      }
    }
  }

  const reconcile = async (wsKey, workspace) => {
    const s = stateOf(wsKey)
    if (s.running) { s.dirty = true; return }
    s.running = true
    try {
      const cfg = await loadConfig(wsKey, workspace)
      await loadLinks(wsKey, workspace)
      let res = await dispatch(workspace, 'get', {}, 'agent')
      let board = res && res.board
      if (!board || !Array.isArray(board.cards)) return
      // R3.0 (our fork): the column set is part of the shared policy, so a board missing one of the
      // workflow columns gets it instead of quietly running a different flow.
      const wantedColumns = (cfg.sharedTitles && cfg.sharedTitles.columns) || []
      if (wantedColumns.length) {
        const laid = await applyColumnPolicy(workspace, globalTitles || titlesOf(null))
        if (laid && (laid.created.length || laid.renamed.length || laid.moved)) {
          pushLog(s, 'columns-aligned', laid.workspaceId + ': ' + [laid.created.length ? 'created ' + laid.created.join(', ') : '', laid.renamed.length ? 'renamed ' + laid.renamed.join(', ') : '', laid.moved ? 'reordered ' + laid.moved : ''].filter(Boolean).join(' | '))
        }
        res = await dispatch(workspace, 'get', {}, 'agent')
        board = res && res.board
        if (!board || !Array.isArray(board.cards)) return
      }
      const model = columnModel(board, cfg)
      const byId = new Map(board.columns.map((c) => [c.id, c]))

      // 1) Detect transitions and apply column-role rules.
      for (const card of board.cards) {
        const prev = s.cardColumn.get(card.id)
        if (prev === undefined) {
          // First sighting: treat as arrival only for role stamping (no dispatch).
          s.cardColumn.set(card.id, card.columnId)
          const col = byId.get(card.columnId)
          const role = cfg.columnRoles[card.columnId]
          if (cfg.enabled && col && role && !model.doneIds.has(card.columnId) && !model.sourceIds.has(card.columnId)) {
            await stampArrival(board, workspace, s, cfg, card, col, role)
          }
          continue
        }
        if (prev === card.columnId) continue
        s.cardColumn.set(card.id, card.columnId)
        const fromCol = byId.get(prev)
        const toCol = byId.get(card.columnId)
        pushLog(s, 'move', 'card ' + card.id + ' «' + card.title + '»: «' + (fromCol ? fromCol.title : prev) + '» → «' + (toCol ? toCol.title : card.columnId) + '»')
        if (model.doneIds.has(card.columnId)) {
          s.inflight.delete(card.id)
          for (const key of [...s.tried]) if (key.startsWith(card.id + ':')) s.tried.delete(key)
          continue
        }
        const role = cfg.columnRoles[card.columnId]
        if (!cfg.enabled || !role || !toCol) continue
        const existingLink = s.links[card.id]
        const wasRework = Boolean(existingLink && existingLink.role === role && existingLink.sessionId)
        await stampArrival(board, workspace, s, cfg, card, toCol, role)
        if (cfg.dispatchEnabled) {
          const inflightActive = [...s.inflight.keys()].filter((id) => {
            const c = board.cards.find((k) => k.id === id)
            return c && !model.doneIds.has(c.columnId) && !model.sourceIds.has(c.columnId)
          })
          if (inflightActive.length < cfg.wipLimit || inflightActive.includes(card.id)) {
            await dispatchToRole(workspace, s, cfg, board, model, card, role, wasRework)
          } else {
            pushLog(s, 'dispatch-hold', 'card ' + card.id + ': wipLimit=' + cfg.wipLimit + ' reached')
          }
        }
      }
      // 1.5) Catch-up: cards sitting in a role column without a live session
      // (engine restart, prior skip/failure, cards created in place).
      if (cfg.enabled && cfg.dispatchEnabled) {
        for (const card of board.cards) {
          if (model.sourceIds.has(card.columnId) || model.doneIds.has(card.columnId)) continue
          const role = cfg.columnRoles[card.columnId]
          if (!role) continue
          const key = card.id + ':' + role
          if (s.links[card.id] || s.inflight.has(card.id) || s.tried.has(key)) continue
          const inflightActive = [...s.inflight.keys()].filter((id) => {
            const c = board.cards.find((k) => k.id === id)
            return c && !model.doneIds.has(c.columnId) && !model.sourceIds.has(c.columnId)
          })
          if (inflightActive.length >= cfg.wipLimit && !inflightActive.includes(card.id)) continue
          pushLog(s, 'dispatch-catchup', 'card ' + card.id + ' «' + card.title + '» sits in a role column without a session')
          await dispatchToRole(workspace, s, cfg, board, model, card, role, false)
        }
      }
      // Forget vanished cards (links are kept on disk for audit, pruned above the cap).
      const alive = new Set(board.cards.map((c) => c.id))
      for (const id of [...s.cardColumn.keys()]) if (!alive.has(id)) s.cardColumn.delete(id)
      for (const id of [...s.inflight.keys()]) if (!alive.has(id)) s.inflight.delete(id)
      for (const key of [...s.tried]) if (!alive.has(key.split(':')[0])) s.tried.delete(key)
      const linkKeys = Object.keys(s.links)
      if (linkKeys.length > 200) {
        for (const id of linkKeys.slice(0, linkKeys.length - 200)) {
          if (!alive.has(id)) { delete s.links[id]; s.linksDirty = true }
        }
      }

      if (!cfg.enabled) return

      // 2) Hard WIP enforcement (opt-in): move the newest excess back to source.
      const active = activeCards(board, model)
      if (cfg.enforceWip && model.sourceIds.size > 0 && active.length > cfg.wipLimit) {
        const overflow = active.slice(cfg.wipLimit)
        const sourceId = [...model.sourceIds][0]
        for (const card of overflow) {
          pushLog(s, 'wip-enforce', 'card ' + card.id + ' «' + card.title + '»: active=' + active.length + ' > limit=' + cfg.wipLimit + ' → back to source')
          await addEngineComment(workspace, card.id, '⚙ Оркестратор: возврат в исходный столбец — в работе не больше ' + cfg.wipLimit + ' (сейчас ' + active.length + ').')
          await dispatch(workspace, 'moveCard', { id: card.id, columnId: sourceId, toIndex: 0 }, 'agent')
        }
        return
      }

      // 3) Auto-pull: keep the flow filled up to the WIP limit.
      if (cfg.autoPull && model.entry && active.length < cfg.wipLimit) {
        const next = pickNextSource(board, model, cfg)
        if (next) {
          const entryCol = byId.get(model.entry)
          pushLog(s, 'pull', 'card ' + next.id + ' «' + next.title + '» → «' + (entryCol ? entryCol.title : model.entry) + '» (active=' + active.length + '/' + cfg.wipLimit + ')')
          const r = await dispatch(workspace, 'moveCard', { id: next.id, columnId: model.entry }, 'agent')
          if (r && r.error) pushLog(s, 'pull-warn', r.error)
        }
      }
    } catch (err) {
      pushLog(s, 'error', String((err && err.message) || err))
    } finally {
      s.running = false
      if (s.dirty) {
        s.dirty = false
        setTimeout(() => { const w = resolveWorkspace(wsKey); if (w) void reconcile(wsKey, w) }, 300)
      }
    }
  }

  const resolveWorkspace = (wsKey) => {
    try {
      for (const ws of listWorkspaces()) if (workspaceKey(ws) === wsKey) return ws
    } catch { /* registry unavailable */ }
    return null
  }

  const scheduleReconcile = (wsKey) => {
    setTimeout(() => { const w = resolveWorkspace(wsKey); if (w) void reconcile(wsKey, w) }, 400)
  }

  const statusOf = (wsKey, cfg) => {
    const s = stateOf(wsKey)
    return {
      config: cfg || s.config || defaultConfig(),
      inflight: [...s.inflight.entries()].map(([cardId, v]) => ({ cardId, ...v })),
      links: s.links,
      log: s.log.slice(-40).reverse(),
    }
  }

  /** Read-only attachment scan (node fs, metadata only). */
  const scanAttachments = (workspace, cardId) => {
    if (!nodeFs) return []
    const base = String(workspace.path || '') + '/' + ATTACH_DIR + '/' + cardId
    const out = []
    let top
    try { top = nodeFs.readdirSync(base, { withFileTypes: true }) } catch { return [] }
    for (const ent of top.slice(0, 400)) {
      if (ent.name.startsWith('.')) continue
      const full = base + '/' + ent.name
      if (ent.isDirectory()) {
        let kids = []
        try { kids = nodeFs.readdirSync(full, { withFileTypes: true }) } catch { continue }
        for (const kid of kids.slice(0, 200)) {
          if (!kid.isFile() || kid.name.startsWith('.')) continue
          try {
            const st = nodeFs.statSync(full + '/' + kid.name)
            out.push({ creator: ent.name, name: kid.name, path: ATTACH_DIR + '/' + cardId + '/' + ent.name + '/' + kid.name, size: st.size, mtime: st.mtimeMs })
          } catch { /* ignore */ }
        }
      } else if (ent.isFile()) {
        try {
          const st = nodeFs.statSync(full)
          out.push({ creator: 'agent', name: ent.name, path: ATTACH_DIR + '/' + cardId + '/' + ent.name, size: st.size, mtime: st.mtimeMs })
        } catch { /* ignore */ }
      }
    }
    return out
  }

  const parseClipPaths = (board, cardId, links) => {
    const card = board.cards.find((c) => c.id === cardId)
    if (!card || !Array.isArray(card.comments)) return []
    const role = links[cardId] ? links[cardId].role : null
    const out = []
    for (const cmt of card.comments) {
      const text = String(cmt.content || '')
      for (const m of text.matchAll(/📎[ \t]*([^\r\n"'`]+)/g)) {
        const raw = m[1].trim().replace(/[.,;)]+$/, '')
        if (!raw || raw.startsWith('/') || FORBIDDEN_PATH_RE.test(raw)) continue
        out.push({
          creator: cmt.source === 'agent' ? (role || 'agent') : 'human',
          name: raw.split(/[\\/]/).pop(),
          path: raw,
          size: null,
          mtime: Date.parse(cmt.createdAt || '') || 0,
        })
      }
    }
    return out
  }

  const httpHandler = async (req) => {
    const json = (status, value) => Response.json(value, { status })
    try {
      if (req.method !== 'POST') return json(405, { error: 'Method not allowed' })
      // Same-origin guard, mirroring the kanban route.
      const origin = req.headers.get('origin')
      const host = req.headers.get('host') || new URL(req.url).host
      if (origin && host) {
        let originHost = ''
        try { originHost = new URL(origin).host } catch {}
        if (originHost !== host) return json(403, { error: 'Cross-origin request denied' })
      }
      const url = new URL(req.url, 'http://local')
      let method = 'getConfig'
      let args = {}
      {
        const contentType = (req.headers.get('content-type') || '').split(';')[0].trim().toLowerCase()
        if (contentType !== 'application/json') return json(415, { error: 'Expected application/json' })
        const raw = await req.text()
        const body = raw ? JSON.parse(raw) : {}
        if (!isObj(body)) return json(400, { error: 'Expected a JSON object' })
        method = typeof body.method === 'string' ? body.method : 'getConfig'
        args = isObj(body.args) ? body.args : {}
      }

      if (method === 'debug') {
        const out = {}
        const ctx = deps.ctx
        for (const name of ['agents', 'sessionController', 'sessions', 'workspaceRegistry', 'agentPresets', 'apiSessionManagement']) {
          try {
            const svc = ctx.get(name)
            const keys = new Set()
            let o = svc
            while (o && o !== Object.prototype) {
              for (const k of Object.getOwnPropertyNames(o)) if (!k.startsWith('_') && k !== 'constructor') keys.add(k)
              o = Object.getPrototypeOf(o)
            }
            out[name] = { type: typeof svc, members: [...keys].slice(0, 40) }
          } catch (err) {
            out[name] = String((err && err.message) || err)
          }
        }
        return json(200, out)
      }
      if (method === 'workspaces') {
        const list = []
        for (const ws of listWorkspaces()) list.push({ id: String(ws.id || ws.path), title: ws.title || ws.path })
        return json(200, { workspaces: list })
      }

      const workspaceId = typeof args.workspaceId === 'string' ? args.workspaceId : url.searchParams.get('workspaceId') || ''
      let workspace = null
      for (const ws of listWorkspaces()) {
        if (String(ws.id || ws.path) === workspaceId) { workspace = ws; break }
      }
      if (!workspace) return json(400, { error: 'Unknown workspace: ' + (workspaceId || '(missing)') })
      const wsKey = workspaceKey(workspace)
      const cfg = await loadConfig(wsKey, workspace)

      if (method === 'setEnabled') {
        const wanted = Boolean(args.enabled)
        await writeFile(workspace, ORCH_FILE, JSON.stringify({ schemaVersion: 1, enabled: wanted }, null, 2) + '\n')
        const st = stateOf(wsKey)
        st.config = null; st.configPromise = null
        pushLog(st, 'config-saved', 'orchestrator ' + (wanted ? 'enabled' : 'disabled') + ' on this board only')
        scheduleReconcile(wsKey)
        return json(200, { ok: true, enabled: wanted })
      }

      // R3.2 (our fork): one screen edits the column set of every board. The policy is stored by column
      // name; here it is written once and then laid out on each board, so no board keeps its own idea of
      // the workflow - not by title, not by order, not by role.
      if (method === 'saveColumns') {
        const incoming = isObj(args.policy) ? args.policy : {}
        const previous = globalTitles ? { ...globalTitles, columns: [...(globalTitles.columns || [])] } : titlesOf(null)
        const rows = []
        for (const raw of Array.isArray(incoming.columns) ? incoming.columns : []) {
          const title = (typeof raw === 'string' ? raw : String((raw && raw.title) || '')).trim().slice(0, 60)
          if (!title) continue
          const role = raw && typeof raw.role === 'string' && raw.role.trim() ? raw.role.trim().slice(0, 40) : null
          const kind = ['source', 'entry', 'flow', 'done'].includes(raw && raw.kind) ? raw.kind : 'flow'
          if (!rows.some((r) => r.title.toLowerCase() === title.toLowerCase())) rows.push({ title, role, kind })
        }
        if (rows.length === 0) return json(400, { error: 'the workflow needs at least one column' })
        const titles = titlesOf(null)
        titles.columns = rows.map((r) => r.title)
        titles.sourceColumnTitles = rows.filter((r) => r.kind === 'source').map((r) => r.title)
        titles.doneColumnTitles = rows.filter((r) => r.kind === 'done').map((r) => r.title)
        titles.entryColumnTitle = (rows.find((r) => r.kind === 'entry') || {}).title || null
        titles.columnRolesByTitle = {}
        for (const r of rows) if (r.role) titles.columnRolesByTitle[r.title] = r.role
        const merged = { ...(globalConfig || defaultConfig()), columns: titles.columns, sourceColumnTitles: titles.sourceColumnTitles, doneColumnTitles: titles.doneColumnTitles, entryColumnTitle: titles.entryColumnTitle, columnRolesByTitle: titles.columnRolesByTitle }
        for (const key of ['wipLimit', 'autoPull', 'pullOrder', 'enforceWip', 'stampAssignments', 'labelAssignments', 'dispatchEnabled', 'dispatchModel', 'tickMs', 'uiRefreshSec']) {
          if (key in incoming) merged[key] = incoming[key]
        }
        globalConfig = normalizeConfig(merged)
        globalTitles = titles
        try {
          await (process.getBuiltinModule ? process.getBuiltinModule('node:fs/promises') : null).writeFile(globalOrchPath(), JSON.stringify({ ...globalConfig, ...titles }, null, 2) + '\n')
        } catch (err) {
          pushLog(stateOf(wsKey), 'config-error', 'the shared column policy could not be saved: ' + ((err && err.message) || err))
          return json(400, { error: 'the shared column policy could not be saved: ' + ((err && err.message) || err) })
        }
        for (const [, other] of states) { other.config = null; other.configPromise = null }
        const applied = []
        for (const ws of listWorkspaces()) {
          const one = await applyColumnPolicy(ws, previous)
          if (one) applied.push(one)
          scheduleReconcile(workspaceKey(ws))
        }
        pushLog(stateOf(wsKey), 'columns-saved', 'shared columns: ' + titles.columns.join(', ') + ' | boards updated: ' + applied.length)
        return json(200, { ok: true, shared: { ...globalConfig, sharedTitles: globalTitles }, boards: applied })
      }

      if (method === 'getPolicy') {
        const shared = await loadGlobalConfig()
        const boardRes = await dispatch(workspace, 'get', {}, 'agent')
        const board = boardRes && boardRes.board
        const effective = columnModel(board, normalizeConfig({ ...cfg }))
        return json(200, {
          ok: true,
          globalPath: globalOrchPath(),
          shared: { ...shared, sharedTitles: globalTitles || titlesOf(null) },
          boardColumns: (effective.columns || []).map((c) => ({ id: c.id, title: c.title })),
          effective: {
            enabled: cfg.enabled,
            wipLimit: cfg.wipLimit,
            dispatchEnabled: cfg.dispatchEnabled,
            sourceColumnIds: effective.sourceIds ? [...effective.sourceIds] : cfg.sourceColumnIds,
            entryColumnId: effective.entry,
            doneColumnIds: effective.doneIds ? [...effective.doneIds] : cfg.doneColumnIds,
            columnRoles: cfg.columnRoles,
          },
        })
      }

      if (method === 'getConfig' || method === 'getStatus' || req.method === 'GET') {
        await loadLinks(wsKey, workspace)
        const boardRes = await dispatch(workspace, 'get', {}, 'agent')
        const board = boardRes.board
        const model = columnModel(board, cfg)
        const counts = {}
        for (const col of model.columns) counts[col.id] = board.cards.filter((c) => c.columnId === col.id).length
        const active = activeCards(board, model)
        const presets = await listPresets()
        return json(200, {
          config: cfg,
          columns: model.columns.map((c) => ({ id: c.id, title: c.title, count: counts[c.id] })),
          completedColumnId: board.completedColumnId ?? null,
          status: {
            ...statusOf(wsKey, cfg),
            active: active.map((c) => ({ id: c.id, title: c.title, columnId: c.columnId })),
            activeCount: active.length,
            sourceIds: [...model.sourceIds],
            doneIds: [...model.doneIds],
            entryId: model.entry,
          },
          presets,
        })
      }
      if (method === 'saveConfig') {
        const saved = await saveConfig(workspace, args.config)
        return json(200, { config: saved })
      }
      if (method === 'runNow') {
        await reconcile(wsKey, workspace)
        return json(200, { ok: true, ...statusOf(wsKey, cfg) })
      }
      if (method === 'files') {
        const cardId = safeCardId(args.cardId)
        if (!cardId) return json(400, { error: 'Bad cardId' })
        await loadLinks(wsKey, workspace)
        const boardRes = await dispatch(workspace, 'get', {}, 'agent')
        const board = boardRes.board
        const links = stateOf(wsKey).links
        const items = [...scanAttachments(workspace, cardId), ...parseClipPaths(board, cardId, links)]
        const groups = new Map()
        for (const it of items) {
          const key = it.creator || 'agent'
          if (!groups.has(key)) groups.set(key, [])
          groups.get(key).push(it)
        }
        const payload = [...groups.entries()]
          .map(([creator, files]) => {
            files.sort((a, b) => b.mtime - a.mtime)
            return { creator, files: files.slice(0, 200) }
          })
          .sort((a, b) => (b.files[0] ? b.files[0].mtime : 0) - (a.files[0] ? a.files[0].mtime : 0))
        return json(200, { groups: payload, link: links[cardId] || null })
      }
      if (method === 'filePreview') {
        const rel = typeof args.path === 'string' ? args.path : ''
        if (!rel || rel.startsWith('/') || rel.includes('\0') || rel.split(/[\\/]/).some((p) => p === '..')) return json(400, { error: 'Bad path' })
        const underAttachments = rel === ATTACH_DIR || rel.startsWith(ATTACH_DIR + '/')
        if (!underAttachments && FORBIDDEN_PATH_RE.test(rel)) return json(403, { error: 'Path not previewable' })
        if (rel === ORCH_FILE || rel === ORCH_STATE_FILE || rel === '.dsh-kanban.json') return json(403, { error: 'Path not previewable' })
        try {
          const text = await readFile(workspace, rel)
          if (text === null || text === undefined) return json(404, { error: 'Not found' })
          const cap = PREVIEW_MAX_BYTES
          const content = text.length > cap ? text.slice(0, cap) : text
          return json(200, { path: rel, content, truncated: text.length > cap, size: text.length })
        } catch (err) {
          return json(404, { error: String((err && err.message) || err) })
        }
      }
      return json(400, { error: 'Unknown orchestrator method: ' + method })
    } catch (err) {
      return json(500, { error: String((err && err.message) || err) })
    }
  }

  const start = () => {
    for (const ws of listWorkspaces()) {
      const wsKey = workspaceKey(ws)
      void loadConfig(wsKey, ws)
      void loadLinks(wsKey, ws)
      void reconcile(wsKey, ws)
    }
    sweepTimer = setInterval(() => {
      if (stopping) return
      for (const ws of listWorkspaces()) void reconcile(workspaceKey(ws), ws)
    }, DEFAULT_TICK_MS)
    if (typeof sweepTimer.unref === 'function') sweepTimer.unref()
  }

  const noteChange = (wsKey) => scheduleReconcile(wsKey)

  const dispose = () => {
    stopping = true
    if (sweepTimer) clearInterval(sweepTimer)
    if (linksFlushTimer) clearTimeout(linksFlushTimer)
    states.clear()
  }

  return { httpHandler, start, noteChange, saveConfig, reconcile, dispose, states, globalConfigPath: globalOrchPath, loadGlobalConfig }
}
