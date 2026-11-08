/**
 * dsh-kanban: DSH bundle host plugin (standard Cordis function plugin).
 *
 * package.json points dsh.bundle.patch to cordis.patch.yml, which inserts this
 * plugin into the profile composition. The loader resolves its package entry.
 *
 * Responsibilities:
 * - Workspace isolation: boards are keyed by workspaceId, one board per workspace.
 * - Persistence: ctx.fs writes <workspace.path>/.dsh-kanban.json.
 * - Agent tools: ctx.tools.register exposes 16 kanban_* tools.
 * - Browser API: ctx.get('connection') registers the authenticated /api/kanban route.
 *
 * Per-workspace data model (disk files include schemaVersion):
 *   schemaVersion: 4
 *   completedColumnId: string | null
 *   columns: [{ id, title }]
 *   labels: [{ name, color }] // name is the unique key and binds the color
 *   cards:   [{ id, columnId, title, note, label, priority, dueDate, createdAt, createdBy,
 *               comments: [{ id, content, source, createdAt }] }]
 *   activities: [{ id, ts, cardId, type, source, field?, from?, to?, meta? }] // append-only log
 *
 * Data safety:
 * - Files without schemaVersion are v0 and migrate on first access (see MIGRATIONS).
 * - Back up originals before migration or recovery: .bak-vN / .corrupt-<ts> / .unsupported-vN.
 * - Check all workspace boards at startup; back up corrupt files and keep boards usable.
 */
import { createOrchestrator } from './lib/orchestrator.js'

export const name = 'dsh-kanban'

export const inject = ['tools']

// ---------------------------------------------------------------------------
// Persistence format version and migrations.
//
// On-disk structure:
//   { schemaVersion, columns, labels, cards }
//
// Version conventions:
// v1: first versioned format, matching the unversioned columns/labels/cards arrays
// used in 1.0.x through 1.2.x, with normalized note/label/priority card fields.
// LEGACY_VERSION (0): files without schemaVersion.
//
// Adding or removing fields:
// 1) Increment SCHEMA_VERSION.
// 2) Register a v(n) -> v(n+1) function in MIGRATIONS, keyed by the old version.
// 3) Return schemaVersion: n+1 from the pure migration (checked by migrateBoard).
// Back up old files before following the migration chain on first access.
// ---------------------------------------------------------------------------

export const SCHEMA_VERSION = 5
export const SERVICE_VERSION = 2
/** R2.2 (our fork): the only card methods the team channel is allowed to ask for. */
export const CARD_ACTION_METHODS = new Set(['getCard', 'addCard', 'updateCard', 'moveCard', 'addComment'])

/**
 * R2.4 (docs/REWORK-SPEC.md §4 R2): fill in, for every card view, which cards of the same
 * board name it as their parent. A parent link alone tells a reader only where a card came
 * from; a decomposition is only visible when the parent also shows the pieces it was split
 * into. Kept separate from the view builders so the rule can be tested as a rule.
 */
export function attachFamily(views, cards) {
  const all = Array.isArray(cards) ? cards : []
  for (const view of Array.isArray(views) ? views : []) {
    view.children = all.filter((card) => card.parent === view.id).map((card) => card.id)
  }
  return views
}
export const LEGACY_VERSION = 0

// Append-only activity log persisted with the board; drop oldest events above the limit.
const ACTIVITY_LIMIT = 5000

// Input limits must match tool schemas and the CardDialog editor.
// clampText truncates oversized input before writing and emits a one-time board warning
// so both agents and users know when content was shortened.
export const TITLE_LIMIT = 120
export const NOTE_LIMIT = 2000
export const LABEL_LIMIT = 20
/**
 * Our fork (REWORK-SPEC.md R2.4'): a card carries the role it is assigned to.
 * 40 characters covers the longest preset id a Host profile reasonably holds.
 */
export const ASSIGNEE_LIMIT = 40
export const COLUMN_TITLE_LIMIT = 40
export const COMMENT_LIMIT = 2000

const isObj = (v) => typeof v === 'object' && v !== null && !Array.isArray(v)
const strField = (v, fb) => (typeof v === 'string' && v ? v : fb)
const normColor = (v) => (typeof v === 'string' && /^#[0-9a-fA-F]{6}$/.test(v) ? v.toLowerCase() : '#94a3b8')

// Calendar dates stay date-only; parsing them as timestamps can shift the day by timezone.
const isDueDate = (value) => {
  if (typeof value !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(value)) return false
  const [year, month, day] = value.split('-').map(Number)
  if (year < 1 || month < 1 || month > 12 || day < 1) return false
  const leapYear = year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0)
  return day <= [31, leapYear ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][month - 1]
}

// Canonical v1 entity shapes: fill missing defaults without changing valid data.
const normColumn = (c) =>
  isObj(c) ? { id: strField(c.id, ''), title: strField(c.title, 'Untitled') } : null
const normLabel = (l) =>
  isObj(l) ? { name: strField(l.name, ''), color: normColor(l.color) } : null
const normCard = (c) =>
  isObj(c)
    ? {
        id: strField(c.id, ''),
        columnId: strField(c.columnId, ''),
        title: strField(c.title, 'Untitled'),
        note: typeof c.note === 'string' ? c.note : '',
        label: typeof c.label === 'string' && c.label ? c.label : null,
        priority: typeof c.priority === 'string' ? c.priority : null,
      }
    : null

/**
 * Our fork (REWORK-SPEC.md R2.4'): the three fields a workflow needs and a chat
 * otherwise has to invent outside the board — `parent` (the card this one is a piece
 * of), `assignee` (the role the card is given to) and `milestone` (a card that closes
 * only when its children close). Pure on purpose: the rules around links (a parent has
 * to exist, a card may not become its own descendant) are testable without a Host.
 * @param board - board whose cards are checked.
 * @param args - raw arguments; an absent key means "leave as it is", null/'' means "clear".
 * @param options - `{ currentId }` when an existing card is edited, so it cannot be linked under itself or under its own child.
 * @returns `{ parent, assignee, milestone, error }`; `error` is a message for the person or agent.
 */
export function planCardLinks(board, args = {}, options = {}) {
  const cards = Array.isArray(board && board.cards) ? board.cards : []
  const out = { parent: undefined, assignee: undefined, milestone: undefined, error: null }
  if (args.parent !== undefined) {
    if (args.parent === null || args.parent === '') out.parent = null
    else {
      const wanted = String(args.parent)
      if (!cards.some((card) => card && card.id === wanted)) {
        out.error = 'Parent card not found: ' + wanted
        return out
      }
      const currentId = options.currentId
      if (currentId && (wanted === currentId || climbsTo(cards, wanted, currentId))) {
        out.error = 'A card cannot be linked under itself or under its own child: ' + wanted
        return out
      }
      out.parent = wanted
    }
  }
  if (args.assignee !== undefined) {
    if (args.assignee === null || args.assignee === '') out.assignee = null
    else {
      const value = String(args.assignee).trim()
      if (!value) {
        out.error = 'Assignee must name a role, not be empty'
        return out
      }
      out.assignee = value.slice(0, ASSIGNEE_LIMIT)
    }
  }
  if (args.milestone !== undefined) out.milestone = args.milestone === true
  return out
}

/** Walk the parent chain of `fromId`; true when it reaches `targetId` (or loops). */
function climbsTo(cards, fromId, targetId) {
  let cursor = fromId
  const guard = new Set()
  while (cursor) {
    if (cursor === targetId) return true
    if (guard.has(cursor)) return true
    guard.add(cursor)
    const next = cards.find((card) => card && card.id === cursor)
    cursor = next && typeof next.parent === 'string' && next.parent ? next.parent : null
  }
  return false
}

/**
 * Migration registry: key = old version, value = (old data) => new data.
 * Each result must set schemaVersion = key + 1; migrateBoard validates every step.
 */
export const MIGRATIONS = {
  0: (data) => {
    // v0 -> v1: declare the version and normalize legacy entity fields.
    const src = isObj(data) ? data : {}
    const pick = (arr) => (Array.isArray(arr) ? arr : [])
    return {
      schemaVersion: 1,
      columns: pick(src.columns).map(normColumn).filter(Boolean),
      labels: pick(src.labels).map(normLabel).filter(Boolean),
      cards: pick(src.cards).map(normCard).filter(Boolean),
    }
  },
  1: (data) => {
    // v1 -> v2: add activities and card createdAt/createdBy (null for legacy cards).
    const src = isObj(data) ? data : {}
    const pick = (arr) => (Array.isArray(arr) ? arr : [])
    return {
      schemaVersion: 2,
      columns: pick(src.columns).map(normColumn).filter(Boolean),
      labels: pick(src.labels).map(normLabel).filter(Boolean),
      cards: pick(src.cards)
        .map((c) => {
          const card = normCard(c)
          return card ? { ...card, createdAt: null, createdBy: null } : null
        })
        .filter(Boolean),
      activities: [],
    }
  },
  2: (data) => {
    // v2 -> v3: add comments; legacy cards start with an empty array.
    const src = isObj(data) ? data : {}
    const pick = (arr) => (Array.isArray(arr) ? arr : [])
    return {
      schemaVersion: 3,
      columns: pick(src.columns),
      labels: pick(src.labels),
      cards: pick(src.cards)
        .map((c) => (isObj(c) ? { ...c, comments: [] } : null))
        .filter(Boolean),
      activities: pick(src.activities),
    }
  },
  3: (data) => ({
    ...data,
    schemaVersion: 4,
    // Existing boards choose completion explicitly; titles and positions are customizable.
    completedColumnId: null,
    cards: Array.isArray(data.cards) ? data.cards.map((card) => isObj(card) ? { ...card, dueDate: null } : card) : data.cards,
  }),
  4: (data) => ({
    ...data,
    schemaVersion: 5,
    // R2.4' (our fork): every existing card gets the workflow links with empty values,
    // so nothing about an old board changes except that the fields now exist.
    cards: Array.isArray(data.cards)
      ? data.cards.map((card) => isObj(card)
        ? {
            ...card,
            parent: typeof card.parent === 'string' && card.parent ? card.parent : null,
            assignee: typeof card.assignee === 'string' && card.assignee.trim() ? card.assignee.trim().slice(0, ASSIGNEE_LIMIT) : null,
            milestone: card.milestone === true,
          }
        : card)
      : data.cards,
  }),
}

/**
 * Migrate from fromVersion to SCHEMA_VERSION one step at a time.
 * Throw for missing steps or invalid output; the caller handles backup and fallback.
 */
export function migrateBoard(data, fromVersion) {
  let out = data
  let v = fromVersion
  while (v < SCHEMA_VERSION) {
    const step = MIGRATIONS[v]
    if (typeof step !== 'function') {
      throw new Error('missing migration v' + v + ' -> v' + (v + 1))
    }
    out = step(out)
    v += 1
    if (!isObj(out) || out.schemaVersion !== v) {
      throw new Error('migration v' + (v - 1) + ' -> v' + v + ' produced invalid data')
    }
  }
  return out
}

/**
 * Validate the final migrated structure.
 * Return { ok, errors }; nonempty errors mark the file as invalid.
 */
export function validateBoard(data) {
  const errors = []
  if (!isObj(data)) {
    errors.push('board is not an object')
    return { ok: false, errors }
  }
  if (data.schemaVersion !== SCHEMA_VERSION) {
    errors.push('expected schemaVersion ' + SCHEMA_VERSION + ', got ' + String(data.schemaVersion))
  }
  if (!Array.isArray(data.columns)) errors.push('columns must be an array')
  if (!Array.isArray(data.labels)) errors.push('labels must be an array')
  if (!Array.isArray(data.cards)) errors.push('cards must be an array')
  if (!Array.isArray(data.activities)) errors.push('activities must be an array')

  const columnIds = new Set()
  if (Array.isArray(data.columns)) {
    for (const c of data.columns) {
      if (!isObj(c) || typeof c.id !== 'string' || !c.id || typeof c.title !== 'string' || !c.title) {
        errors.push('columns contain an invalid entry')
        break
      }
      if (columnIds.has(c.id)) {
        errors.push('duplicate column id: ' + c.id)
        break
      }
      columnIds.add(c.id)
    }
  }

  if (data.completedColumnId !== null && !columnIds.has(data.completedColumnId)) {
    errors.push('completedColumnId must be null or reference an existing column')
  }

  const labelNames = new Set()
  if (Array.isArray(data.labels)) {
    for (const l of data.labels) {
      if (!isObj(l) || typeof l.name !== 'string' || !l.name || typeof l.color !== 'string' || !/^#[0-9a-fA-F]{6}$/.test(l.color)) {
        errors.push('labels contain an invalid entry')
        break
      }
      if (labelNames.has(l.name)) {
        errors.push('duplicate label name: ' + l.name)
        break
      }
      labelNames.add(l.name)
    }
  }

  if (Array.isArray(data.cards)) {
    const seen = new Set()
    const commentIds = new Set()
    for (const c of data.cards) {
      if (!isObj(c) || typeof c.id !== 'string' || !c.id || typeof c.columnId !== 'string' || typeof c.title !== 'string' || !Array.isArray(c.comments)) {
        errors.push('cards contain an invalid entry')
        break
      }
      if (seen.has(c.id)) {
        errors.push('duplicate card id: ' + c.id)
        break
      }
      if (!columnIds.has(c.columnId)) errors.push('card references missing column: ' + c.id)
      if (c.label != null && !labelNames.has(c.label)) errors.push('card references missing label: ' + c.id)
      if (c.dueDate !== null && !isDueDate(c.dueDate)) errors.push('card has invalid due date: ' + c.id)
      if (c.priority != null && !['high', 'medium', 'low'].includes(c.priority)) errors.push('card has invalid priority: ' + c.id)
      // R2.4' (our fork): the links are part of the shape, not an extension the reader guesses at.
      if (c.parent !== null && c.parent !== undefined && (typeof c.parent !== 'string' || !c.parent)) errors.push('card has an invalid parent: ' + c.id)
      if (c.assignee !== null && c.assignee !== undefined && (typeof c.assignee !== 'string' || !c.assignee.trim() || c.assignee.length > ASSIGNEE_LIMIT)) errors.push('card has an invalid assignee: ' + c.id)
      if (c.milestone !== undefined && typeof c.milestone !== 'boolean') errors.push('card has a non-boolean milestone: ' + c.id)
      for (const comment of c.comments) {
        if (!isObj(comment) || typeof comment.id !== 'string' || !comment.id || typeof comment.content !== 'string' || !comment.content.trim() || comment.content.length > 2000 || !['human', 'agent'].includes(comment.source) || typeof comment.createdAt !== 'string' || !comment.createdAt) {
          errors.push('card comments contain an invalid entry: ' + c.id)
          break
        }
        if (commentIds.has(comment.id)) {
          errors.push('duplicate comment id: ' + comment.id)
          break
        }
        commentIds.add(comment.id)
      }
      seen.add(c.id)
    }
    // R2.4' (our fork): a parent has to be a card that exists, and no card may sit in
    // the parent chain of its own child (the planner prevents it; a hand-edited file
    // still has to be rejected instead of rendering a loop).
    for (const c of data.cards) {
      if (typeof c.parent !== 'string' || !c.parent) continue
      if (!seen.has(c.parent)) {
        errors.push('card references a missing parent: ' + c.id)
        continue
      }
      if (c.parent === c.id) {
        errors.push('card is its own parent: ' + c.id)
        continue
      }
      const guard = new Set([c.id])
      let cursor = c.parent
      while (cursor) {
        if (guard.has(cursor)) {
          errors.push('cards form a parent loop at: ' + c.id)
          break
        }
        guard.add(cursor)
        const next = data.cards.find((k) => k && k.id === cursor)
        cursor = next && typeof next.parent === 'string' && next.parent ? next.parent : null
      }
    }
  }

  if (Array.isArray(data.activities)) {
    for (const a of data.activities) {
      if (!isObj(a) || typeof a.id !== 'string' || !a.id || typeof a.ts !== 'string' || typeof a.type !== 'string' || !['human', 'agent'].includes(a.source)) {
        errors.push('activities contain an invalid entry')
        break
      }
    }
  }
  return { ok: errors.length === 0, errors }
}

/**
 * Parse and migrate board JSON without accessing disk.
 *
 * Results:
 *   { ok: true, kind: 'ok', data, migrated, fromVersion, warnings }: usable current data
 *   { ok: false, kind: 'corrupt'|'invalid'|'unsupported', warnings }: back up the original
 *
 * Failure kinds:
 *   corrupt: JSON parsing failed
 *   invalid: validation or migration failed
 *   unsupported: schemaVersion exceeds this plugin version
 */
export function parseBoardText(text) {
  const warnings = []
  let data
  try {
    data = JSON.parse(text)
  } catch {
    return {
      ok: false,
      kind: 'corrupt',
      warnings: [
        'Board data file could not be parsed as JSON; the original file has been backed up and the board opened empty.',
      ],
    }
  }

  const version =
    isObj(data) && typeof data.schemaVersion === 'number' ? data.schemaVersion : LEGACY_VERSION

  if (version > SCHEMA_VERSION) {
    return {
      ok: false,
      kind: 'unsupported',
      version,
      warnings: [
        'Board data file was written by a newer plugin version (schemaVersion ' +
          version +
          '); this plugin supports up to ' +
          SCHEMA_VERSION +
          '. The original file has been backed up and the board opened empty — please upgrade the plugin to read the original data.',
      ],
    }
  }

  let migrated = false
  if (version < SCHEMA_VERSION) {
    try {
      data = migrateBoard(data, version)
      migrated = true
      warnings.push(
        'Board data was automatically upgraded from schemaVersion ' +
          version +
          ' to ' +
          SCHEMA_VERSION +
          '; the pre-upgrade file has been backed up.',
      )
    } catch (err) {
      return {
        ok: false,
        kind: 'invalid',
        version,
        warnings: [
          'Board data upgrade failed (' +
            ((err && err.message) || err) +
            '); the original file has been backed up and the board opened empty.',
        ],
      }
    }
  }

  const check = validateBoard(data)
  if (!check.ok) {
    return {
      ok: false,
      kind: 'invalid',
      version: isObj(data) ? data.schemaVersion : undefined,
      warnings: [
        'Board data file structure is invalid (' +
          check.errors.join('; ') +
          '); the original file has been backed up and the board opened empty.',
      ],
    }
  }

  return { ok: true, kind: 'ok', data, migrated, fromVersion: version, warnings }
}

export function apply(ctx) {
  const getFs = () => ctx.get('fs')
  const getPolicy = () => ctx.get('sandboxPolicy')
  const getWorkspaceRegistry = () => ctx.get('workspaceRegistry')

  const boards = new Map() // workspaceId -> { columns, labels, cards }
  const boardLoads = new Map() // workspaceId -> Promise<board>; publish only fully initialized boards
  const workspaceQueues = new Map() // workspaceId -> Promise; serialize the entire mutation
  const fileTargets = new Map() // workspaceId -> FsTarget; retry failed resolution instead of caching it
  let seq = 0 // Global sequence for unique cN (column) and kN (card) ids.

  // ---- ID generation ----
  const nextId = (prefix) => prefix + (++seq)
  const bumpSeq = (id) => {
    if (typeof id !== 'string') return
    const n = Number(id.slice(1))
    if (Number.isFinite(n) && n > seq) seq = n
  }

  // ---- Default board ----
  const DEFAULT_COLUMNS = ['Todo', 'In Progress', 'Review', 'Done']
  const DEFAULT_LABELS = [
    { name: 'New Feature', color: '#38bdf8' },
    { name: 'bug', color: '#f87171' },
    { name: 'Feedback', color: '#34d399' },
  ]

  // ---- Persistence target resolution ----
  const BOARD_FILE = '.dsh-kanban.json'
  const workspaceKey = (workspace) => String(workspace.id || workspace.path)
  const writePolicyFor = (workspace, session) => {
    const policy = getPolicy()
    const resolved =
      policy && typeof policy.resolve === 'function'
        ? policy.resolve(session ? { session } : {})
        : { mode: (policy && policy.defaultMode) || 'workspace-write' }
    return { ...resolved, workspaceRoot: workspace.path }
  }
  const resolveFile = async (workspace) => {
    const fs = getFs()
    if (!fs) return null
    try {
      return await fs.resolve(BOARD_FILE, { cwd: workspace.path })
    } catch (err) {
      console.log(
        'dsh-kanban: Failed to resolve workspace board file ' + workspaceKey(workspace) + ': ' + ((err && err.message) || err),
      )
      return null
    }
  }
  const targetOf = async (workspace) => {
    const key = workspaceKey(workspace)
    if (fileTargets.has(key)) return fileTargets.get(key)
    const target = await resolveFile(workspace)
    if (target) fileTargets.set(key, target)
    return target
  }
  const persistedFlag = (workspace) => fileTargets.has(workspaceKey(workspace))

  // ---- Board reads and writes ----

  // Copy to .dsh-kanban.json.<suffix>, keeping the original until the replacement is written.
  const backupFile = async (workspace, suffix, session) => {
    const fs = getFs()
    const target = await targetOf(workspace)
    if (!fs || !target) return null
    const key = workspaceKey(workspace)
    try {
      const text = await fs.readText(target)
      const backupTarget = await fs.resolve(BOARD_FILE + '.' + suffix, { cwd: workspace.path })
      await fs.writeText(backupTarget, text, undefined, undefined, writePolicyFor(workspace, session))
      return backupTarget
    } catch (err) {
      console.log('dsh-kanban: Backup failed ' + key + ' (' + suffix + '): ' + ((err && err.message) || err))
      return null
    }
  }

  // Queue a one-time board warning and write it to the host log.
  const warn = (board, message) => {
    if (Array.isArray(board.warnings)) board.warnings.push(message)
    console.log('dsh-kanban: ' + message)
  }
  const takeWarnings = (board) => {
    const w = Array.isArray(board.warnings) ? board.warnings : []
    board.warnings = []
    return w
  }
  const timestamp = () => new Date().toISOString().replace(/[:.]/g, '-')

  const isNotFound = (err) => err && (err.code === 'ENOENT' || err.code === 'FS_NOT_FOUND' || err.message === 'ENOENT')

  // Cache initialization promises; publish only after reads, migrations and defaults finish.
  const boardOf = async (workspace, session) => {
    const key = workspaceKey(workspace)
    const existing = boards.get(key)
    if (existing) return existing
    if (boardLoads.has(key)) return boardLoads.get(key)

    const load = (async () => {
      const board = {
        schemaVersion: SCHEMA_VERSION,
        completedColumnId: null,
        columns: [],
        labels: [],
        cards: [],
        activities: [],
        warnings: [],
        readOnlyReason: null,
      }
      const fs = getFs()
      const target = await targetOf(workspace)
      let migrated = false
      let loadedBoard = false
      if (fs && target) {
        try {
          const text = await fs.readText(target)
          const parsed = parseBoardText(text)
          for (const w of parsed.warnings) warn(board, w)
          if (parsed.ok) {
            loadedBoard = true
            board.completedColumnId = parsed.data.completedColumnId
            board.columns = parsed.data.columns
            board.labels = parsed.data.labels
            board.cards = parsed.data.cards
            board.activities = parsed.data.activities
            migrated = parsed.migrated
            if (parsed.migrated) {
              const backup = await backupFile(workspace, 'bak-v' + parsed.fromVersion, session)
              if (!backup) {
                migrated = false
                board.readOnlyReason = 'Board migration backup failed; changes are disabled to protect the original file.'
                warn(board, board.readOnlyReason)
              }
            }
          } else {
            const suffix = parsed.kind === 'unsupported'
              ? 'unsupported-v' + parsed.version
              : 'corrupt-' + timestamp()
            const backup = await backupFile(workspace, suffix, session)
            if (parsed.kind === 'unsupported' || !backup) {
              board.readOnlyReason = parsed.kind === 'unsupported'
                ? 'Board was created by a newer plugin version; changes are disabled until the plugin is upgraded.'
                : 'Board backup failed; changes are disabled to protect the original file.'
              warn(board, board.readOnlyReason)
            }
          }
        } catch (err) {
          // R9.4: a board file that does not exist yet is an empty board, not a failure.
          // A workspace of a team chat starts without a card file until the first card is
          // written, and logging that every startup made a fresh chat look broken.
          if (!isNotFound(err)) console.log('dsh-kanban: Failed to read board ' + key + ': ' + ((err && err.message) || err))
          if (!isNotFound(err)) {
            board.readOnlyReason = 'Board could not be read; changes are disabled to protect the existing file.'
            warn(board, board.readOnlyReason)
          }
        }
      }
      for (const col of board.columns) bumpSeq(col.id)
      for (const card of board.cards) {
        bumpSeq(card.id)
        for (const comment of card.comments) bumpSeq(comment.id)
      }
      for (const act of board.activities) bumpSeq(act.id)
      if (board.columns.length === 0) {
        for (const title of DEFAULT_COLUMNS) {
          const column = { id: nextId('c'), title }
          board.columns.push(column)
          if (!loadedBoard && title === 'Done') board.completedColumnId = column.id
        }
      }
      if (board.labels.length === 0) board.labels = DEFAULT_LABELS.map((l) => ({ ...l }))
      boards.set(key, board)
      if (migrated && fs && target) {
        try {
          await save(workspace, session)
        } catch (err) {
          board.readOnlyReason = 'Migrated board could not be saved; changes are disabled to protect the original file.'
          warn(board, board.readOnlyReason)
        }
      }
      return board
    })()
    boardLoads.set(key, load)
    try {
      return await load
    } finally {
      boardLoads.delete(key)
    }
  }
  const save = async (workspace, session) => {
    const fs = getFs()
    const target = await targetOf(workspace)
    const key = workspaceKey(workspace)
    const board = boards.get(key)
    if (!fs || !target || !board) return
    try {
      await fs.writeText(
        target,
        JSON.stringify({
          schemaVersion: SCHEMA_VERSION,
          completedColumnId: board.completedColumnId,
          columns: board.columns,
          labels: board.labels,
          cards: board.cards,
          activities: Array.isArray(board.activities) ? board.activities : [],
        }),
        undefined,
        undefined,
        writePolicyFor(workspace, session),
      )
    } catch (err) {
      console.log('dsh-kanban: Save failed ' + key + ': ' + ((err && err.message) || err))
      throw err
    }
  }

  // ---- Validation, lookup and serialization ----
  const str = (v, fb) => (typeof v === 'string' ? v : fb)

  // Clamp input to its limit and warn through the board warnings queue and host log
  // whenever truncation occurs, so content is never silently discarded.
  const clampText = (value, limit, field, board) => {
    const s = str(value, '')
    if (s.length <= limit) return s
    warn(board, field + ' truncated to ' + limit + ' characters')
    return s.slice(0, limit)
  }

  const PRIORITIES = ['high', 'medium', 'low']
  const normPriority = (v) => (typeof v === 'string' && PRIORITIES.includes(v) ? v : undefined)
  const normColor = (v) => (typeof v === 'string' && /^#[0-9a-fA-F]{6}$/.test(v) ? v.toLowerCase() : undefined)
  const findCard = (b, id) => b.cards.find((c) => c.id === id)
  const findColumn = (b, id) => b.columns.find((c) => c.id === id)
  const findLabel = (b, name) => b.labels.find((l) => l.name === name)

  const cloneBoard = (b) => ({
    completedColumnId: b.completedColumnId,
    columns: b.columns.map((c) => ({ id: c.id, title: c.title })),
    labels: b.labels.map((l) => ({ name: l.name, color: l.color })),
    cards: b.cards.map((c) => ({
      id: c.id,
      columnId: c.columnId,
      title: c.title,
      note: c.note ?? '',
      label: c.label ?? null,
      priority: c.priority ?? null,
      dueDate: c.dueDate,
      // R2.7 (our fork): the fields of the team have to travel with the card. This is the answer
      // the board UI and an agent reading the whole board get, and until now it dropped parent,
      // assignee and milestone: the board could not show who a card belongs to, and the
      // orchestration engine could not see an assignment either - which means it would have
      // written a column role over a role the manager or the person had chosen.
      parent: c.parent ?? null,
      assignee: typeof c.assignee === 'string' && c.assignee.trim() ? c.assignee.trim() : null,
      milestone: c.milestone === true,
      createdAt: typeof c.createdAt === 'string' ? c.createdAt : null,
      createdBy: typeof c.createdBy === 'string' ? c.createdBy : null,
      comments: Array.isArray(c.comments)
        ? c.comments.map((comment) => ({
            id: comment.id,
            content: comment.content,
            source: comment.source,
            createdAt: comment.createdAt,
          }))
        : [],
    })),
    activities: Array.isArray(b.activities) ? b.activities.map((a) => ({ ...a })) : [],
  })
  const summaryOfClone = (clone) => ({
    completedColumnId: clone.completedColumnId,
    columns: clone.columns.map((c) => ({
      id: c.id,
      title: c.title,
      count: clone.cards.filter((k) => k.columnId === c.id).length,
    })),
    labels: clone.labels.map((l) => ({ name: l.name, color: l.color })),
    cards: clone.cards.map((c) => ({
      id: c.id,
      columnId: c.columnId,
      title: c.title,
      label: c.label ?? null,
      priority: c.priority ?? null,
      dueDate: c.dueDate,
      commentCount: c.comments.length,
    })),
  })

  // Append a read-only activity event, persisted with the board.
  const record = (board, ev) => {
    if (!Array.isArray(board.activities)) board.activities = []
    board.activities.push({
      id: nextId('e'),
      ts: new Date().toISOString(),
      ...ev,
    })
    if (board.activities.length > ACTIVITY_LIMIT) {
      board.activities.splice(0, board.activities.length - ACTIVITY_LIMIT)
    }
  }

  // ---- Core operations shared by agent tools and browser HTTP ----
  const READ_METHODS = new Set(['get', 'getCard'])
  const dispatchUnlocked = async (workspace, method, args, source, session) => {
    const board = await boardOf(workspace, session)
    const a = args || {}
    const actor = source === 'agent' ? 'agent' : 'human'
    const persisted = () => persistedFlag(workspace)
    const result = (extra) => ({ board: cloneBoard(board), persisted: persisted(), warnings: takeWarnings(board), ...extra })
    if (!READ_METHODS.has(method) && board.readOnlyReason) {
      return result({ error: board.readOnlyReason })
    }

    switch (method) {
      case 'get':
        return { board: cloneBoard(board), persisted: persisted(), warnings: takeWarnings(board), message: 'Board loaded' }

      case 'getCard': {
        const card = cloneBoard(board).cards.find((c) => c.id === str(a.id, ''))
        if (!card) return { warnings: takeWarnings(board), error: 'Card not found: ' + str(a.id, '') }
        return { card, completedColumnId: board.completedColumnId, warnings: takeWarnings(board) }
      }

      case 'addCard': {
        if (a.dueDate !== undefined && a.dueDate !== null && a.dueDate !== '' && !isDueDate(a.dueDate)) return result({ error: 'Due date must be a real calendar date in YYYY-MM-DD format' })
        const col = findColumn(board, str(a.columnId, '')) || board.columns[0]
        if (!col) return result({ error: 'No list available' })
        const label = typeof a.label === 'string' ? clampText(a.label, LABEL_LIMIT, 'Label', board) : undefined
        if (label && !findLabel(board, label)) return result({ error: 'Label not found: ' + label })
        const links = planCardLinks(board, a)
        if (links.error) return result({ error: links.error })
        const card = {
          id: nextId('k'),
          columnId: col.id,
          title: clampText(a.title, TITLE_LIMIT, 'Title', board) || 'Untitled card',
          note: clampText(a.note, NOTE_LIMIT, 'Note', board),
          label,
          priority: normPriority(a.priority),
          dueDate: a.dueDate || null,
          // R2.4' (our fork): the breakdown and the assignment live on the board itself.
          parent: links.parent ?? null,
          assignee: links.assignee ?? null,
          milestone: links.milestone === true,
          createdAt: new Date().toISOString(),
          createdBy: actor,
          comments: [],
        }
        board.cards.push(card)
        record(board, {
          cardId: card.id,
          type: 'card_created',
          source: actor,
          meta: {
            title: card.title,
            column: col.title,
            label: card.label ?? null,
            priority: card.priority ?? null,
            dueDate: card.dueDate,
            parent: card.parent,
            assignee: card.assignee,
            milestone: card.milestone,
          },
        })
        await save(workspace, session)
        return result({ message: 'Card added to "' + col.title + '"' })
      }

      case 'updateCard': {
        if (a.dueDate !== undefined && a.dueDate !== null && a.dueDate !== '' && !isDueDate(a.dueDate)) return result({ error: 'Due date must be a real calendar date in YYYY-MM-DD format' })
        const card = findCard(board, str(a.id, ''))
        if (card) {
          const nextLabel = typeof a.label === 'string' ? clampText(a.label, LABEL_LIMIT, 'Label', board) : undefined
          if (nextLabel && !findLabel(board, nextLabel)) return result({ error: 'Label not found: ' + nextLabel })
          const links = planCardLinks(board, a, { currentId: card.id })
          if (links.error) return result({ error: links.error })
          const before = {
            title: card.title,
            note: card.note,
            label: card.label ?? null,
            priority: card.priority ?? null,
            dueDate: card.dueDate,
            parent: card.parent ?? null,
            assignee: card.assignee ?? null,
            milestone: card.milestone === true,
          }
          if (typeof a.title === 'string') card.title = clampText(a.title, TITLE_LIMIT, 'Title', board) || card.title
          if (typeof a.note === 'string') card.note = clampText(a.note, NOTE_LIMIT, 'Note', board)
          if (typeof a.label === 'string') card.label = nextLabel || undefined
          if (typeof a.priority === 'string') card.priority = normPriority(a.priority)
          if (a.dueDate !== undefined) card.dueDate = a.dueDate || null
          if (links.parent !== undefined) card.parent = links.parent
          if (links.assignee !== undefined) card.assignee = links.assignee
          if (links.milestone !== undefined) card.milestone = links.milestone
          const after = {
            title: card.title,
            note: card.note,
            label: card.label ?? null,
            priority: card.priority ?? null,
            dueDate: card.dueDate,
            parent: card.parent ?? null,
            assignee: card.assignee ?? null,
            milestone: card.milestone === true,
          }
          if (after.title !== before.title) {
            record(board, { cardId: card.id, type: 'card_title_changed', source: actor, field: 'title', from: before.title, to: after.title })
          }
          if (after.note !== before.note) {
            record(board, { cardId: card.id, type: 'card_note_changed', source: actor, field: 'note' })
          }
          if (after.label !== before.label) {
            record(board, { cardId: card.id, type: 'card_label_changed', source: actor, field: 'label', from: before.label, to: after.label })
          }
          if (after.dueDate !== before.dueDate) {
            record(board, { cardId: card.id, type: 'card_due_date_changed', source: actor, field: 'dueDate', from: before.dueDate, to: after.dueDate })
          }
          if (after.priority !== before.priority) {
            record(board, { cardId: card.id, type: 'card_priority_changed', source: actor, field: 'priority', from: before.priority, to: after.priority })
          }
          if (after.parent !== before.parent) {
            record(board, { cardId: card.id, type: 'card_parent_changed', source: actor, field: 'parent', from: before.parent, to: after.parent })
          }
          if (after.assignee !== before.assignee) {
            record(board, { cardId: card.id, type: 'card_assignee_changed', source: actor, field: 'assignee', from: before.assignee, to: after.assignee })
          }
          if (after.milestone !== before.milestone) {
            record(board, { cardId: card.id, type: 'card_milestone_changed', source: actor, field: 'milestone', from: before.milestone, to: after.milestone })
          }
          await save(workspace, session)
        }
        return card
          ? result({ message: 'Card updated' })
          : result({ error: 'Card not found: ' + str(a.id, '') })
      }

      case 'addComment': {
        const card = findCard(board, str(a.id, ''))
        if (!card) return result({ error: 'Card not found: ' + str(a.id, '') })
        const content = str(a.content, '').trim()
        if (!content) return result({ error: 'Comment content required' })
        if (content.length > COMMENT_LIMIT) return result({ error: 'Comment exceeds ' + COMMENT_LIMIT + ' characters' })
        const comment = {
          id: nextId('m'),
          content,
          source: actor,
          createdAt: new Date().toISOString(),
        }
        card.comments.push(comment)
        record(board, { cardId: card.id, type: 'card_comment_added', source: actor, meta: { title: card.title } })
        await save(workspace, session)
        return result({ message: 'Comment added' })
      }

      case 'deleteCard': {
        const id = str(a.id, '')
        const card = findCard(board, id)
        if (!card) return result({ error: 'Card not found: ' + id })
        board.cards = board.cards.filter((c) => c.id !== id)
        // R2.4' (our fork): deleting a card must not orphan the pieces split from it -
        // they move up to the parent the deleted card had.
        const orphans = board.cards.filter((c) => c.parent === id)
        if (orphans.length) {
          for (const child of orphans) child.parent = card.parent ?? null
          record(board, { cardId: id, type: 'cards_reparented', source: actor, meta: { count: orphans.length, to: card.parent ?? null } })
        }
        record(board, { cardId: id, type: 'card_deleted', source: actor, meta: { title: card.title } })
        await save(workspace, session)
        return result({ message: 'Card deleted' + (orphans.length ? '; ' + orphans.length + ' child card(s) moved up' : '') })
      }

      case 'moveCard': {
        const card = findCard(board, str(a.id, ''))
        const target = findColumn(board, str(a.columnId, ''))
        if (!card || !target) return result({ error: 'Card or list not found' })
        const fromCol = findColumn(board, card.columnId)
        const fromTitle = fromCol ? fromCol.title : String(card.columnId)
        board.cards = board.cards.filter((c) => c.id !== card.id)
        card.columnId = target.id
        const inCol = board.cards.filter((c) => c.columnId === target.id)
        const toIndex = typeof a.toIndex === 'number' && Number.isFinite(a.toIndex)
          ? Math.max(0, Math.min(Math.floor(a.toIndex), inCol.length))
          : inCol.length
        const anchor = inCol[toIndex]
        if (anchor) board.cards.splice(board.cards.indexOf(anchor), 0, card)
        else board.cards.push(card)
        if (fromTitle !== target.title) {
          // R2.8 (our fork): a card that changes list changes the stage of its work, and the
          // board history has to show that the assignment and the breakdown travelled with it -
          // otherwise the only trace of who owns the card is a chat log the board cannot see.
          record(board, {
            cardId: card.id,
            type: 'card_moved',
            source: actor,
            field: 'columnId',
            from: fromTitle,
            to: target.title,
            meta: {
              title: card.title,
              assignee: card.assignee ?? null,
              parent: card.parent ?? null,
              milestone: card.milestone === true,
            },
          })
        }
        await save(workspace, session)
        return result({ message: 'Moved to "' + target.title + '"' })
      }

      case 'addColumn': {
        const title = clampText(a.title, COLUMN_TITLE_LIMIT, 'List title', board) || 'New list'
        board.columns.push({ id: nextId('c'), title })
        record(board, { cardId: null, type: 'column_added', source: actor, meta: { column: title } })
        await save(workspace, session)
        return result({ message: 'List added: "' + title + '"' })
      }

      case 'renameColumn': {
        const col = findColumn(board, str(a.id, ''))
        if (col && typeof a.title === 'string') {
          const before = col.title
          col.title = clampText(a.title, COLUMN_TITLE_LIMIT, 'List title', board) || col.title
          if (col.title !== before) {
            record(board, { cardId: null, type: 'column_renamed', source: actor, field: 'title', from: before, to: col.title, meta: { column: col.title } })
          }
          await save(workspace, session)
        }
        return col ? result({ message: 'List renamed' }) : result({ error: 'List not found' })
      }

      case 'setCompletedColumn': {
        if (a.columnId !== null && (typeof a.columnId !== 'string' || !findColumn(board, a.columnId))) return result({ error: 'Completion column must be null or an existing list id' })
        const previousId = board.completedColumnId
        if (previousId !== a.columnId) {
          board.completedColumnId = a.columnId
          record(board, { cardId: null, type: 'board_completed_column_changed', source: actor, field: 'completedColumnId', from: previousId, to: a.columnId, meta: { fromColumn: findColumn(board, previousId)?.title ?? null, toColumn: findColumn(board, a.columnId)?.title ?? null } })
          await save(workspace, session)
        }
        return result({ message: a.columnId === null ? 'Completion column cleared' : 'Completion column updated' })
      }

      case 'deleteColumn': {
        const id = str(a.id, '')
        if (board.columns.length <= 1) return result({ error: 'At least one list must remain' })
        const idx = board.columns.findIndex((c) => c.id === id)
        if (idx < 0) return result({ error: 'List not found' })
        const deleted = board.columns[idx]
        board.columns.splice(idx, 1)
        if (board.completedColumnId === id) {
          board.completedColumnId = null
          record(board, { cardId: null, type: 'board_completed_column_changed', source: actor, field: 'completedColumnId', from: id, to: null, meta: { fromColumn: deleted.title, toColumn: null } })
        }
        const fallback = board.columns[0].id
        for (const card of board.cards) {
          if (card.columnId === id) {
            card.columnId = fallback
            record(board, { cardId: card.id, type: 'card_moved', source: actor, field: 'columnId', from: deleted.title, to: board.columns[0].title, meta: { title: card.title } })
          }
        }
        record(board, { cardId: null, type: 'column_deleted', source: actor, meta: { column: deleted.title } })
        await save(workspace, session)
        return result({ message: 'List deleted, cards moved to "' + board.columns[0].title + '"' })
      }

      case 'moveColumn': {
        const id = str(a.id, '')
        const idx = board.columns.findIndex((c) => c.id === id)
        if (idx < 0) return result({ error: 'List not found' })
        const [col] = board.columns.splice(idx, 1)
        const toIndex = typeof a.toIndex === 'number' && Number.isFinite(a.toIndex)
          ? Math.max(0, Math.min(Math.floor(a.toIndex), board.columns.length))
          : board.columns.length
        board.columns.splice(toIndex, 0, col)
        await save(workspace, session)
        return result({ message: 'List order updated' })
      }

      case 'addLabel': {
        const name = clampText(a.name, LABEL_LIMIT, 'Label name', board)
        if (!name) return result({ error: 'Label name required' })
        if (findLabel(board, name)) return result({ error: 'Label already exists' })
        board.labels.push({ name, color: normColor(a.color) || '#94a3b8' })
        record(board, { cardId: null, type: 'label_added', source: actor, meta: { label: name } })
        await save(workspace, session)
        return result({ message: 'Label added: "' + name + '"' })
      }

      case 'updateLabel': {
        const name = str(a.name, '')
        const label = findLabel(board, name)
        if (!label) return result({ error: 'Label not found' })
        const newName = clampText(a.newName, LABEL_LIMIT, 'Label name', board)
        if (newName && newName !== name) {
          if (findLabel(board, newName)) return result({ error: 'Label name already exists' })
          label.name = newName
          for (const card of board.cards) {
            if (card.label === name) {
              card.label = newName
              record(board, { cardId: card.id, type: 'card_label_changed', source: actor, field: 'label', from: name, to: newName, meta: { title: card.title } })
            }
          }
          record(board, { cardId: null, type: 'label_renamed', source: actor, field: 'name', from: name, to: newName, meta: { label: newName } })
        }
        if (typeof a.color === 'string') {
          const beforeColor = label.color
          label.color = normColor(a.color) || label.color
          if (label.color !== beforeColor) {
            record(board, { cardId: null, type: 'label_color_changed', source: actor, field: 'color', from: beforeColor, to: label.color, meta: { label: label.name } })
          }
        }
        await save(workspace, session)
        return result({ message: 'Label updated' })
      }

      case 'deleteLabel': {
        const name = str(a.name, '')
        const idx = board.labels.findIndex((l) => l.name === name)
        if (idx < 0) return result({ error: 'Label not found' })
        board.labels.splice(idx, 1)
        for (const card of board.cards) {
          if (card.label === name) {
            card.label = undefined
            record(board, { cardId: card.id, type: 'card_label_changed', source: actor, field: 'label', from: name, to: null, meta: { title: card.title } })
          }
        }
        record(board, { cardId: null, type: 'label_deleted', source: actor, meta: { label: name } })
        await save(workspace, session)
        return result({ message: 'Label deleted' })
      }

      default:
        return result({ error: 'Unknown kanban method: ' + method })
    }
  }

  // ---- Orchestration engine (plain server automation; see lib/orchestrator.js) ----
  let orch = null

  const dispatch = (workspace, method, args, source, session) => {
    const key = workspaceKey(workspace)
    const previous = workspaceQueues.get(key) || Promise.resolve()
    const run = previous.catch(() => {}).then(async () => {
      const board = await boardOf(workspace, session)
      const snapshot = READ_METHODS.has(method) ? null : JSON.parse(JSON.stringify(board))
      try {
        const result = await dispatchUnlocked(workspace, method, args, source, session)
        // Orchestration engine follows every successful board mutation.
        if (!READ_METHODS.has(method) && !(result && result.error) && orch) orch.noteChange(key)
        return result
      } catch (err) {
        if (snapshot) boards.set(key, snapshot)
        throw err
      }
    })
    const settled = run.then(() => undefined, () => undefined)
    workspaceQueues.set(key, settled)
    settled.finally(() => {
      if (workspaceQueues.get(key) === settled) workspaceQueues.delete(key)
    })
    return run
  }

  // ---- Orchestrator wiring: same fs sandbox pattern as the board file ----
  const orchFileTarget = async (workspace, name) => {
    const fs = getFs()
    if (!fs) return null
    try {
      return await fs.resolve(name, { cwd: workspace.path })
    } catch (err) {
      console.log('dsh-kanban: Failed to resolve orchestrator file ' + name + ' in ' + workspaceKey(workspace) + ': ' + ((err && err.message) || err))
      return null
    }
  }
  const orchRead = async (workspace, name) => {
    const fs = getFs()
    const target = await orchFileTarget(workspace, name)
    if (!fs || !target) return null
    try {
      return await fs.readText(target)
    } catch (err) {
      if (isNotFound(err)) return null
      throw err
    }
  }
  const orchWrite = async (workspace, name, text) => {
    const fs = getFs()
    const target = await orchFileTarget(workspace, name)
    if (!fs || !target) throw new Error('Filesystem target unavailable for ' + name)
    await fs.writeText(target, text, undefined, undefined, writePolicyFor(workspace))
  }
  orch = createOrchestrator({
    ctx,
    // R2.5' (our fork): the team channel may own the wake of a role. Look it up lazily -
    // plugins start in any order, and a deployment without the chat plugin must keep
    // working exactly as before.
    wakeDelegate: () => {
      try { return typeof ctx.get === 'function' ? ctx.get('groupChatWake') : null } catch { return null }
    },
    logger: ctx.logger ? ctx.logger('dsh-kanban') : console,
    dispatch: (workspace, method, args, source) => dispatch(workspace, method, args, source, undefined),
    listWorkspaces: () => {
      const registry = getWorkspaceRegistry()
      return registry && typeof registry.list === 'function' ? registry.list() : []
    },
    workspaceKey,
    readFile: orchRead,
    writeFile: orchWrite,
    presetsProvider: async () => {
      const presets = ctx.get('agentPresets')
      return presets && typeof presets.list === 'function' ? await presets.list() : []
    },
  })

  // R2.1 (our fork): the board as a read-only view for the team channel.
  //
  // Only a workspace the Host actually registers is answered. Serving an arbitrary path is
  // how phantom workspaces and their empty boards were created in the first place, and a
  // read-only view must not repeat that mistake: nothing here creates or touches a file.
  /** A workspace the Host actually registered, or null. Never invented from a path. */
  const resolveRegisteredWorkspace = async ({ workspaceId, path } = {}) => {
    const registry = getWorkspaceRegistry()
    let workspace = null
    if (workspaceId && registry && typeof registry.get === 'function') {
      try { workspace = await registry.get(String(workspaceId)) } catch { workspace = null }
    }
    if (!workspace && path && registry && typeof registry.resolveByPath === 'function') {
      try { workspace = await registry.resolveByPath(String(path)) } catch { workspace = null }
    }
    return workspace
  }

  const columnsOf = (board) => new Map(board.columns.map((column) => [column.id, column.title]))

  /** One card as the channel needs it: the fields the fork added, plus where it sits. */
  const cardViewOf = (card, columns) => ({
    id: card.id,
    title: card.title,
    columnId: card.columnId,
    columnTitle: columns.get(card.columnId) ?? card.columnId,
    label: card.label ?? null,
    priority: card.priority ?? null,
    dueDate: card.dueDate ?? null,
    parent: card.parent ?? null,
    assignee: card.assignee ?? null,
    milestone: card.milestone === true,
    comments: Array.isArray(card.comments) ? card.comments.length : 0,
    // Filled by attachFamily: the ids of the cards that were made out of this one.
    children: [],
  })

  const boardViewOf = (board, key) => {
    const columns = columnsOf(board)
    const cards = attachFamily((board.cards || []).map((card) => cardViewOf(card, columns)), board.cards || [])
    return {
      ok: true,
      version: SERVICE_VERSION,
      workspaceKey: key ?? null,
      schemaVersion: board.schemaVersion ?? SCHEMA_VERSION,
      completedColumnId: board.completedColumnId ?? null,
      columns: board.columns.map((column) => ({
        id: column.id,
        title: column.title,
        cards: cards.filter((card) => card.columnId === column.id).length,
      })),
      labels: (board.labels || []).map((label) => ({ id: label.id, name: label.name, color: label.color ?? null })),
      cards,
      cardCount: cards.length,
      warnings: Array.isArray(board.warnings) ? board.warnings.slice(0, 10) : [],
      readOnlyReason: board.readOnlyReason ?? null,
    }
  }

  const boardViewFor = async ({ workspaceId, path } = {}) => {
    const workspace = await resolveRegisteredWorkspace({ workspaceId, path })
    if (!workspace) {
      return { ok: false, code: 'BOARD_WORKSPACE_NOT_REGISTERED', message: 'this workspace is not registered with the Host, so it has no board to read' }
    }
    const board = await boardOf(workspace, undefined)
    return boardViewOf(board, workspaceKey(workspace))
  }

  /**
   * R2.2 (our fork): a card action asked by the team channel.
   *
   * A whitelist, not a pass-through: the channel may create a card, change a card, move a
   * card and comment on one. It may not rename a column, delete a card, set the Done column
   * or rewrite the board — those are the person's board, not the channel's. Every accepted
   * action goes through the same serialized queue the board UI and the orchestration engine
   * use, so the in-memory board, the file and the engine cannot drift apart.
   */
  const cardActionFor = async ({ workspaceId, path, method, args = {}, actor } = {}) => {
    if (!CARD_ACTION_METHODS.has(method)) {
      return {
        ok: false,
        code: 'CARD_ACTION_UNSUPPORTED',
        message: 'the channel may only ask the board for: ' + Array.from(CARD_ACTION_METHODS).join(', '),
      }
    }
    const workspace = await resolveRegisteredWorkspace({ workspaceId, path })
    if (!workspace) {
      return { ok: false, code: 'BOARD_WORKSPACE_NOT_REGISTERED', message: 'this workspace is not registered with the Host, so it has no card to change' }
    }
    const board = await boardOf(workspace, undefined)
    if (board.readOnlyReason) {
      return { ok: false, code: 'BOARD_READ_ONLY', message: board.readOnlyReason }
    }
    // R2.8 (our fork): the ids the board had before the action, so a created card can be found
    // afterwards. addCard, updateCard and moveCard answer with a message, not with the card, and a
    // channel that just created a card has to learn its id - a manager that decomposes a card into
    // children cannot assign them without it.
    const knownIds = new Set((board.cards || []).map((card) => card.id))
    const result = await dispatch(workspace, method, args || {}, actor === 'agent' ? 'agent' : 'human', undefined)
    if (result && result.error) {
      return { ok: false, code: 'CARD_ACTION_REFUSED', message: String(result.error) }
    }
    const columns = columnsOf(board)
    const cardId = typeof (args || {}).id === 'string' ? args.id : null
    const created = method === 'addCard' ? (board.cards || []).find((card) => !knownIds.has(card.id)) ?? null : null
    const changed = result && result.card ? result.card : created || board.cards.find((card) => card.id === cardId)
    const cardView = changed ? cardViewOf(changed, columns) : null
    if (cardView) attachFamily([cardView], board.cards || [])
    return {
      ok: true,
      version: SERVICE_VERSION,
      method,
      card: cardView,
      // getCard is the one answer that carries the whole card: the description and the
      // comments are what the channel needs when it opens a card, and the compact view is
      // what it needs when it only lists them.
      fullCard: method === 'getCard' && result && result.card ? result.card : null,
      board: boardViewOf(board, workspaceKey(workspace)),
      message: (result && result.message) || null,
    }
  }

  if (typeof ctx.provide === 'function') {
    try {
      ctx.provide('kanbanBoard', { version: SERVICE_VERSION, read: boardViewFor, act: cardActionFor })
    } catch (err) {
      console.log('dsh-kanban: the board view service could not be provided: ' + ((err && err.message) || err))
    }
  }

  // ---- Tool execution context and browser workspaceId resolution ----
  const workspaceOfExec = async (exec) => {
    const agent = exec && exec.agent
    const session = agent && agent.session
    const cwd = session && session.header && session.header.cwd
    if (typeof cwd !== 'string' || !cwd) return null
    const registry = getWorkspaceRegistry()
    if (registry) {
      try {
        const workspace = await registry.resolveByPath(cwd)
        if (workspace) return workspace
      } catch (err) {
        console.log('dsh-kanban: Failed to resolve workspace: ' + ((err && err.message) || err))
      }
    }
    // Unregistered sessions use their own cwd as the workspace root.
    return { id: 'cwd:' + cwd, path: cwd, title: cwd }
  }
  const workspaceOfId = (id) => {
    const registry = getWorkspaceRegistry()
    return registry && typeof registry.get === 'function' ? registry.get(id) : undefined
  }
  const emptyBoardSummary = { completedColumnId: null, columns: [], labels: [], cards: [] }

  // ---- Channel guard (R8.4, dsh-group-chat/docs/REWORK-SPEC.md §4 R8) ----
  // A board workspace that belongs to a team channel also belongs to the rules of that channel:
  // a card moves with the person it is assigned to, and the person who distributes work is the
  // manager. The board does not know the channel and must not know it, so it asks a service the
  // channel publishes. Two boundaries keep this safe for a board without a team: the question is
  // asked only for mutations an agent performs (a person acting through the Board tab is not
  // restricted by a team rule), and when the service is absent or answers badly the board decides
  // on its own exactly as it did before.
  const chatGuard = () => {
    try { return typeof ctx.get === 'function' ? ctx.get('kanbanChatGuard') : null } catch { return null }
  }
  const GUARDED_CARD_METHODS = new Set(['moveCard', 'updateCard', 'deleteCard'])

  const runTool = async (method, args, exec) => {
    const workspace = await workspaceOfExec(exec)
    if (!workspace) {
      return {
        ok: false,
        message: 'Cannot determine the current workspace from the tool execution context',
        board: emptyBoardSummary,
        warnings: [],
      }
    }
    const session = exec && exec.agent && exec.agent.session
    const guard = session && GUARDED_CARD_METHODS.has(method) ? chatGuard() : null
    if (guard && typeof guard.decide === 'function') {
      let decision = null
      try {
        decision = await guard.decide({ workspaceKey: workspaceKey(workspace), workspacePath: workspace.path, method, args, session })
      } catch (err) {
        console.log('dsh-kanban: the channel guard could not judge a card action, so the board decided on its own: ' + ((err && err.message) || err))
      }
      if (decision && decision.allow === false) {
        return {
          ok: false,
          message: decision.message || 'The channel of this workspace does not allow this card action',
          board: summaryOfClone(cloneBoard(await boardOf(workspace, session))),
          warnings: [],
        }
      }
    }
    try {
      const r = await dispatch(workspace, method, args, 'agent', session)
      if (guard && !r.error && typeof guard.report === 'function') {
        try { await guard.report({ workspaceKey: workspaceKey(workspace), workspacePath: workspace.path, method, args, session }) }
        catch (err) { console.log('dsh-kanban: the channel guard could not note a card action: ' + ((err && err.message) || err)) }
      }      return {
        ok: !r.error,
        message: r.error || r.message || 'Done',
        board: summaryOfClone(r.board),
        warnings: Array.isArray(r.warnings) ? r.warnings : [],
      }
    } catch (err) {
      return {
        ok: false,
        message: 'Board change could not be persisted: ' + ((err && err.message) || err),
        board: summaryOfClone(cloneBoard(await boardOf(workspace, session))),
        warnings: [],
      }
    }
  }

  // ---- Browser API through the authenticated Connection extension ----
  const MAX_HTTP_BODY = 1024 * 1024
  const sendJson = (status, value) => Response.json(value, { status })
  const httpHandler = async (req) => {
    try {
      if (req.method !== 'POST') return sendJson(405, { error: 'Method not allowed' })
      const chunks = []
      let size = 0
      for await (const chunk of req.body || []) {
        size += chunk.length
        // Drain rejected uploads without buffering them so Connection can send the error response.
        if (size <= MAX_HTTP_BODY) chunks.push(chunk)
      }
      if (size > MAX_HTTP_BODY) return sendJson(413, { error: 'Request body too large' })
      const contentType = (req.headers.get('content-type') || '').split(';', 1)[0].trim().toLowerCase()
      if (contentType !== 'application/json') return sendJson(415, { error: 'Expected application/json' })
      const origin = req.headers.get('origin')
      const host = req.headers.get('host') || new URL(req.url).host
      if (origin && host) {
        let originHost = ''
        try { originHost = new URL(origin).host } catch {}
        if (originHost !== host) return sendJson(403, { error: 'Cross-origin request denied' })
      }

      const raw = Buffer.concat(chunks).toString('utf8')
      const body = raw ? JSON.parse(raw) : {}
      if (!isObj(body)) return sendJson(400, { error: 'Expected a JSON object' })
      const method = typeof body.method === 'string' ? body.method : 'get'
      const args = isObj(body.args) ? body.args : {}
      const workspaceId = typeof args.workspaceId === 'string' ? args.workspaceId : ''
      let workspace = workspaceId ? workspaceOfId(workspaceId) : undefined
      // Fallback: a client that cannot map its session to a workspace sends 'default'
      // (or nothing). When exactly one workspace is registered, that is unambiguous.
      if (!workspace) {
        const registry = getWorkspaceRegistry()
        const all = registry && typeof registry.list === 'function' ? registry.list() : []
        if (Array.isArray(all) && all.length === 1) workspace = all[0]
      }
      // R2.8 (our fork): a conversation view inside a subagent chat has no workspace binding of its own,
      // so the board view asks for 'default'. The request names the session it belongs to, and a session
      // certainly knows the folder it works in - resolve that instead of guessing which board to show.
      if (!workspace && typeof body.sessionId === 'string' && body.sessionId) {
        const registry = getWorkspaceRegistry()
        const cwdOf = (candidate) => {
          if (!candidate) return null
          const header = candidate.header || candidate.session && candidate.session.header || candidate
          return typeof header.cwd === 'string' && header.cwd ? header.cwd : null
        }
        // Every session carries the folder it works in, live or not: a running agent's own header, the
        // durable persistence snapshot, or the Host inspection. Try them in that order and resolve the
        // board from the folder, which is what a session's workspace actually means.
        const attempts = [
          async () => {
            const sc = typeof ctx.get === 'function' ? ctx.get('sessionController') : null
            const handle = sc && typeof sc.resolveAgent === 'function' ? await sc.resolveAgent(body.sessionId) : null
            return handle && handle.agent ? cwdOf(handle.agent.session) : null
          },
          async () => {
            const sessions = typeof ctx.get === 'function' ? ctx.get('sessions') : null
            const session = sessions && typeof sessions.get === 'function' ? sessions.get(body.sessionId) : null
            return session ? cwdOf(session) : null
          },
          async () => {
            const persistence = typeof ctx.get === 'function' ? ctx.get('sessionPersistence') : null
            if (!persistence || typeof persistence.stat !== 'function') return null
            return cwdOf(await persistence.stat(body.sessionId))
          },
          async () => {
            const sc = typeof ctx.get === 'function' ? ctx.get('sessionController') : null
            if (!sc || typeof sc.inspect !== 'function') return null
            return cwdOf(await sc.inspect(body.sessionId, new AbortController().signal))
          },
        ]
        for (const attempt of attempts) {
          try {
            const cwd = await attempt()
            if (!cwd) continue
            if (registry && typeof registry.resolveByPath === 'function') workspace = await registry.resolveByPath(cwd)
            if (workspace) break
          } catch (err) {
            console.log('dsh-kanban: the workspace of session ' + body.sessionId + ' could not be resolved: ' + ((err && err.message) || err))
          }
        }
      }
      if (!workspace) return sendJson(400, { error: 'Unknown workspace: ' + (workspaceId || '(missing)') })
      const result = await dispatch(workspace, method, args, 'human')
      return sendJson(result.error ? 400 : 200, result)
    } catch (err) {
      const status = err instanceof SyntaxError ? 400 : 500
      return sendJson(status, { error: String((err && err.message) || err) })
    }
  }

  // Connection may arrive after tools during desktop boot; follow its lifecycle.
  ctx.inject(['connection'], (routeCtx) => {
    const disposeKanban = routeCtx.connection.fetch.register({
      path: '/api/kanban',
      methods: ['POST'],
      requestBody: 'streaming',
      fetch: httpHandler,
    })
    const disposeOrch = routeCtx.connection.fetch.register({
      path: '/api/kanban-orch',
      methods: ['POST'],
      requestBody: 'streaming',
      fetch: (req) => orch.httpHandler(req),
    })
    return () => {
      if (typeof disposeKanban === 'function') disposeKanban()
      if (typeof disposeOrch === 'function') disposeOrch()
    }
  })

  // ---- Startup checks: read each workspace board and back up corrupt files ----
  const runStartupCheck = async () => {
    const fs = getFs()
    const registry = getWorkspaceRegistry()
    if (!fs || !registry || typeof registry.list !== 'function') return
    try {
      const workspaces = registry.list()
      let found = 0
      let corrupt = 0
      let pendingUpgrade = 0
      let unsupported = 0
      let ok = 0
      for (const workspace of workspaces) {
        const key = workspaceKey(workspace)
        try {
          const target = await fs.resolve(BOARD_FILE, { cwd: workspace.path })
          const text = await fs.readText(target)
          found++
          const parsed = parseBoardText(text)
          if (parsed.ok) {
            if (parsed.migrated) {
              pendingUpgrade++
              console.log('dsh-kanban: Startup check ' + key + ': schemaVersion ' + parsed.fromVersion + '; will migrate on first access')
            } else {
              ok++
            }
          } else if (parsed.kind === 'unsupported') {
            unsupported++
            console.log('dsh-kanban: Startup check ' + key + ': file written by a newer plugin (schemaVersion ' + parsed.version + ')')
          } else {
            corrupt++
            const suffix = 'corrupt-' + timestamp()
            const backupTarget = await fs.resolve(BOARD_FILE + '.' + suffix, { cwd: workspace.path })
            await fs.writeText(backupTarget, text, undefined, undefined, writePolicyFor(workspace))
            console.log('dsh-kanban: Startup check ' + key + ': corrupt data file (' + parsed.kind + '); backed up to ' + BOARD_FILE + '.' + suffix)
          }
        } catch (err) {
          // R9.4: a workspace whose board file was never written is an empty board.
          if (!isNotFound(err)) {
            console.log('dsh-kanban: Startup check ' + key + ': check failed ' + ((err && err.message) || err))
          }
        }
      }
      if (found === 0) {
        console.log('dsh-kanban: Startup check complete: no board data files found')
        return
      }
      console.log(
        'dsh-kanban: Startup check complete: total ' +
          found +
          ' board files, valid ' +
          ok +
          ', corrupt and backed up ' +
          corrupt +
          ', pending migration ' +
          pendingUpgrade +
          ', unsupported version ' +
          unsupported,
      )
    } catch (err) {
      console.log('dsh-kanban: Startup check failed: ' + ((err && err.message) || err))
    }
  }
  ctx.inject(['fs', 'workspaceRegistry'], () => {
    void runStartupCheck()
    // Orchestrator starts after storage is ready; its timer is unref'd.
    setTimeout(() => { try { orch.start() } catch (err) { console.log('dsh-kanban: orchestrator start failed: ' + ((err && err.message) || err)) } }, 2000)
  })

  // ---- Tool registration ----
  const resultSchema = {
    type: 'object',
    properties: {
      ok: { type: 'boolean' },
      message: { type: 'string' },
      board: { type: 'object' },
      warnings: { type: 'array', items: { type: 'string' } },
    },
    required: ['ok', 'message'],
    additionalProperties: false,
  }
  const renderBoard = (value) => {
    const b = value && value.board
    const lines = []
    if (Array.isArray(value && value.warnings)) {
      for (const w of value.warnings) lines.push('⚠ ' + w)
    }
    lines.push(String((value && value.message) || ''))
    if (b && Array.isArray(b.columns)) {
      lines.push('Board state:')
      lines.push('Completion column: ' + (b.completedColumnId || 'not set'))
      for (const col of b.columns) {
        lines.push('· [' + col.id + '] ' + col.title + ' (' + col.count + ')' + (col.id === b.completedColumnId ? ' [completed]' : ''))
      }
      if (Array.isArray(b.labels) && b.labels.length > 0) {
        lines.push('Labels: ' + b.labels.map((l) => l.name).join(' / '))
      }
      if (Array.isArray(b.cards)) {
        for (const card of b.cards) {
          lines.push(
            '  - [' + card.id + '] ' +
            (card.priority ? '[' + card.priority + '] ' : '') +
            (card.label ? '[' + card.label + '] ' : '') +
            card.title +
            (card.dueDate ? ' (due ' + card.dueDate + ')' : '') +
            (card.columnId === b.completedColumnId ? ' [completed]' : '') +
            (card.commentCount ? ' (' + card.commentCount + ' comments)' : ''),
          )
        }
      }
    }
    return [{ type: 'text', text: lines.join('\n') }]
  }
  const output = (render) => ({ schema: resultSchema, render: (args, value) => render(value) })

  const tools = [
    {
      name: 'kanban_get',
      description: 'Read the current state of the current project (workspace) kanban board (all lists, labels, cards with dueDate, and completedColumnId). Due dates are local calendar dates, not UTC timestamps; a date becomes overdue the following day. Cards in completedColumnId are finished and excluded from due-today/overdue checks. Resolve relative dates using the user local date and confirm the concrete YYYY-MM-DD date. Call it before planning to understand existing content and avoid duplicate cards.',
      parameters: { type: 'object', properties: {} },
      output: output(renderBoard),
      async execute(args, exec) {
        return runTool('get', args, exec)
      },
    },
    {
      name: 'kanban_get_card',
      description: "Read one card's full details (title, raw Markdown description in note, label, priority, dueDate, comments) plus its workflow links (parent card id, assigned role, milestone flag), and the board completion column ID from the current project (workspace) board by card id. Use kanban_get first to discover card ids; its summary omits note. Read this tool before editing an existing description to preserve its content and Markdown formatting.",
      parameters: {
        type: 'object',
        properties: {
          id: { type: 'string', description: 'Card id (see kanban_get output)' },
        },
        required: ['id'],
      },
      output: {
        schema: {
          type: 'object',
          properties: {
            ok: { type: 'boolean' },
            message: { type: 'string' },
            card: { type: 'object' },
            completedColumnId: { oneOf: [{ type: 'string' }, { type: 'null' }] },
            warnings: { type: 'array', items: { type: 'string' } },
          },
          required: ['ok', 'message'],
          additionalProperties: false,
        },
        render: (args, value) => {
          const c = value && value.card
          const lines = []
          if (Array.isArray(value && value.warnings)) {
            for (const w of value.warnings) lines.push('⚠ ' + w)
          }
          lines.push(String((value && value.message) || ''))
          if (c) {
            lines.push('[' + c.id + '] ' + c.title)
            if (c.priority) lines.push('Priority: ' + c.priority)
            if (c.label) lines.push('Label: ' + c.label)
            if (c.dueDate) lines.push('Due date: ' + c.dueDate + ' (local calendar date)')
            lines.push('Completed: ' + (c.columnId === value.completedColumnId ? 'yes' : 'no'))
            if (c.note) lines.push('Note: ' + c.note)
            if (Array.isArray(c.comments) && c.comments.length > 0) {
              lines.push('Comments:')
              for (const comment of c.comments) {
                lines.push('  - [' + comment.createdAt + '] ' + comment.source + ': ' + comment.content)
              }
            }
          }
          return [{ type: 'text', text: lines.join('\n') }]
        },
      },
      async execute(args, exec) {
        const workspace = await workspaceOfExec(exec)
        if (!workspace) return { ok: false, message: 'Cannot determine the current workspace from the tool execution context', warnings: [] }
        const session = exec && exec.agent && exec.agent.session
        const r = await dispatch(workspace, 'getCard', args, 'agent', session)
        if (r.error) return { ok: false, message: r.error, warnings: Array.isArray(r.warnings) ? r.warnings : [] }
        return { ok: true, message: 'Card ' + String(args.id || '') + ' details', card: r.card, completedColumnId: r.completedColumnId, warnings: Array.isArray(r.warnings) ? r.warnings : [] }
      },
    },
    {
      name: 'kanban_add_comment',
      description: 'Add a comment to a card in the current project (workspace). Use it to leave progress updates, decisions, questions, or review feedback.',
      parameters: {
        type: 'object',
        properties: {
          id: { type: 'string', description: 'Card id' },
          content: { type: 'string', description: 'Comment text (1-2000 characters)' },
        },
        required: ['id', 'content'],
      },
      output: output(renderBoard),
      async execute(args, exec) {
        return runTool('addComment', args, exec)
      },
    },
    {
      name: 'kanban_add_card',
      description: 'Add a card to the current project (workspace) kanban board. Write feature breakdowns and plans to the board: one card per task step. Put the task description in note as raw Markdown; the task details drawer renders it. For a breakdown pass parent (the id of the card being split) and set milestone true on a card that closes only when its children close; assignee names the role the card is given to.',
      parameters: {
        type: 'object',
        properties: {
          title: { type: 'string', description: `Card title (task name, concise and actionable; max ${TITLE_LIMIT} chars)` },
          columnId: { type: 'string', description: 'Target list id; defaults to the first list (Todo)' },
          parent: { type: 'string', description: 'Id of the card this one is a piece of (R2.4\u0027); omit to keep the card top level' },
          assignee: { type: 'string', description: 'Role the card is given to, e.g. developer, tester, reviewer' },
          milestone: { type: 'boolean', description: 'true when this card closes only after its child cards close' },
          note: { type: 'string', description: `Task description as raw Markdown source, not HTML: background, acceptance criteria or breakdown details. Supports headings, lists, tables and fenced code blocks; preserve line breaks. Optional; max ${NOTE_LIMIT} chars including Markdown syntax and newlines. Longer input is truncated with a warning.` },
          label: { type: 'string', description: `Label name (optional; max ${LABEL_LIMIT} chars): e.g. New Feature, bug, Feedback` },
          priority: { type: 'string', enum: ['high', 'medium', 'low'], description: 'Priority (optional): high=P0 / medium=P1 / low=P2' },
          dueDate: { oneOf: [{ type: 'string' }, { type: 'null' }], description: 'Optional local calendar date in YYYY-MM-DD format, without time or timezone. Resolve relative dates such as Friday using the user local date and confirm the concrete date. Omit to keep unchanged (new cards default to no date); null or empty string clears it. Due today is not overdue until the next local day; completed-column cards are excluded.' },
        },
        required: ['title'],
      },
      output: output(renderBoard),
      async execute(args, exec) {
        return runTool('addCard', args, exec)
      },
    },
    {
      name: 'kanban_update_card',
      description: "Update a card's title, Markdown description (note), label, priority or dueDate on the board. Read kanban_get_card before editing an existing description; note replaces the whole description, not a patch. parent links the card under another card (null clears the link, and a card cannot be linked under itself or under its own child), assignee names the role working the card (null clears it), milestone marks a card that closes only when its children close.",
      parameters: {
        type: 'object',
        properties: {
          id: { type: 'string', description: 'Card id' },
          title: { type: 'string', description: `New title (optional; max ${TITLE_LIMIT} chars)` },
          parent: { type: 'string', description: 'New parent card id, or null to clear the link' },
          assignee: { type: 'string', description: 'New role the card is assigned to, or null to clear it' },
          milestone: { type: 'boolean', description: 'true or false; only sent values change the card' },
          note: { type: 'string', description: `Complete replacement description as raw Markdown source, not HTML; preserve line breaks. Omit to keep the description unchanged; pass an empty string to clear it. Max ${NOTE_LIMIT} chars including Markdown syntax and newlines. Longer input is truncated with a warning.` },
          label: { type: 'string', description: `New label name (optional; max ${LABEL_LIMIT} chars); pass empty string to clear` },
          priority: { type: 'string', enum: ['high', 'medium', 'low', ''], description: 'New priority (optional): high=P0 / medium=P1 / low=P2; pass empty string to clear' },
          dueDate: { oneOf: [{ type: 'string' }, { type: 'null' }], description: 'Optional local calendar date in YYYY-MM-DD format, without time or timezone. Resolve relative dates such as Friday using the user local date and confirm the concrete date. Omit to keep unchanged (new cards default to no date); null or empty string clears it. Due today is not overdue until the next local day; completed-column cards are excluded.' },
        },
        required: ['id'],
      },
      output: output(renderBoard),
      async execute(args, exec) {
        return runTool('updateCard', args, exec)
      },
    },
    {
      name: 'kanban_delete_card',
      description: 'Delete a card from the board (permanent, not recoverable).',
      parameters: {
        type: 'object',
        properties: { id: { type: 'string', description: 'Card id' } },
        required: ['id'],
      },
      output: output(renderBoard),
      async execute(args, exec) {
        return runTool('deleteCard', args, exec)
      },
    },
    {
      name: 'kanban_move_card',
      description: 'Move a card to the specified list (e.g. from Todo to In Progress). Use when a task status changes.',
      parameters: {
        type: 'object',
        properties: {
          id: { type: 'string', description: 'Card id' },
          columnId: { type: 'string', description: 'Target list id' },
          toIndex: { type: 'integer', description: 'Position within the target list (optional); takes effect when reordering within the same list, 0 = top' },
        },
        required: ['id', 'columnId'],
      },
      output: output(renderBoard),
      async execute(args, exec) {
        return runTool('moveCard', args, exec)
      },
    },
    {
      name: 'kanban_add_column',
      description: 'Add a list (column) to the board. Use when a new workflow stage (e.g. Review, Blocked) is needed.',
      parameters: {
        type: 'object',
        properties: { title: { type: 'string', description: `List name (max ${COLUMN_TITLE_LIMIT} chars)` } },
        required: ['title'],
      },
      output: output(renderBoard),
      async execute(args, exec) {
        return runTool('addColumn', args, exec)
      },
    },
    {
      name: 'kanban_rename_column',
      description: 'Rename a list on the board.',
      parameters: {
        type: 'object',
        properties: {
          id: { type: 'string', description: 'List id' },
          title: { type: 'string', description: `New name (max ${COLUMN_TITLE_LIMIT} chars)` },
        },
        required: ['id', 'title'],
      },
      output: output(renderBoard),
      async execute(args, exec) {
        return runTool('renameColumn', args, exec)
      },
    },
    {
      name: 'kanban_set_completed_column',
      description: 'Choose the one list that means completed for this board by its stable column id, or clear the setting with null. Cards in this list are excluded from due-today and overdue checks. Existing boards require an explicit choice; never infer completion from a list name or position. New boards default to Done.',
      parameters: {
        type: 'object',
        properties: { columnId: { oneOf: [{ type: 'string' }, { type: 'null' }], description: 'Existing list id from kanban_get, or null to clear the completion column' } },
        required: ['columnId'],
      },
      output: output(renderBoard),
      async execute(args, exec) {
        return runTool('setCompletedColumn', args, exec)
      },
    },
    {
      name: 'kanban_delete_column',
      description: 'Delete a list from the board; its cards are moved into the first list. At least one list must remain.',
      parameters: {
        type: 'object',
        properties: { id: { type: 'string', description: 'List id' } },
        required: ['id'],
      },
      output: output(renderBoard),
      async execute(args, exec) {
        return runTool('deleteColumn', args, exec)
      },
    },
    {
      name: 'kanban_move_column',
      description: 'Reorder a list (column) on the board, moving it to the specified position.',
      parameters: {
        type: 'object',
        properties: {
          id: { type: 'string', description: 'List id to move' },
          toIndex: { type: 'integer', description: 'Target position (0 = first list)' },
        },
        required: ['id', 'toIndex'],
      },
      output: output(renderBoard),
      async execute(args, exec) {
        return runTool('moveColumn', args, exec)
      },
    },
    {
      name: 'kanban_add_label',
      description: 'Create a new label on the board (name bound to a color). Use to categorize cards.',
      parameters: {
        type: 'object',
        properties: {
          name: { type: 'string', description: `Label name (unique, max ${LABEL_LIMIT} chars; e.g. Urgent, Refactor)` },
          color: { type: 'string', description: 'Label color (optional): #rrggbb hex; defaults to gray' },
        },
        required: ['name'],
      },
      output: output(renderBoard),
      async execute(args, exec) {
        return runTool('addLabel', args, exec)
      },
    },
    {
      name: 'kanban_update_label',
      description: 'Modify a label on the board (rename or recolor). Renaming automatically updates cards referencing it.',
      parameters: {
        type: 'object',
        properties: {
          name: { type: 'string', description: 'Current label name' },
          newName: { type: 'string', description: `New name (optional; max ${LABEL_LIMIT} chars)` },
          color: { type: 'string', description: 'New color (optional): #rrggbb hex' },
        },
        required: ['name'],
      },
      output: output(renderBoard),
      async execute(args, exec) {
        return runTool('updateLabel', args, exec)
      },
    },
    {
      name: 'kanban_delete_label',
      description: 'Delete a label from the board. Cards referencing it will have their label cleared.',
      parameters: {
        type: 'object',
        properties: { name: { type: 'string', description: 'Label name' } },
        required: ['name'],
      },
      output: output(renderBoard),
      async execute(args, exec) {
        return runTool('deleteLabel', args, exec)
      },
    },
    {
      name: 'kanban_get_label',
      description: 'Read the label list (names and colors) of the current project (workspace) board. Check available labels before tagging cards.',
      parameters: { type: 'object', properties: {} },
      output: {
        schema: {
          type: 'object',
          properties: {
            ok: { type: 'boolean' },
            message: { type: 'string' },
            labels: { type: 'array', items: { type: 'object' } },
            warnings: { type: 'array', items: { type: 'string' } },
          },
          required: ['ok', 'message'],
          additionalProperties: false,
        },
        render: (args, value) => {
          const labels = value && value.labels
          const lines = []
          if (Array.isArray(value && value.warnings)) {
            for (const w of value.warnings) lines.push('⚠ ' + w)
          }
          lines.push(String((value && value.message) || ''))
          if (Array.isArray(labels)) {
            for (const l of labels) lines.push('- ' + l.name + ' (' + l.color + ')')
          }
          return [{ type: 'text', text: lines.join('\n') }]
        },
      },
      async execute(args, exec) {
        const workspace = await workspaceOfExec(exec)
        if (!workspace) return { ok: false, message: 'Cannot determine the current workspace from the tool execution context', labels: [], warnings: [] }
        const session = exec && exec.agent && exec.agent.session
        const r = await dispatch(workspace, 'get', args, 'agent', session)
        const labels = (r.board && r.board.labels) || []
        return {
          ok: true,
          message: 'Labels (workspace ' + workspaceKey(workspace) + ')',
          labels,
          warnings: Array.isArray(r.warnings) ? r.warnings : [],
        }
      },
    },
  ]

  for (const tool of tools) ctx.tools.register(tool)

  return async () => {
    if (orch) orch.dispose()
    boards.clear()
    boardLoads.clear()
    workspaceQueues.clear()
    fileTargets.clear()
  }
}
