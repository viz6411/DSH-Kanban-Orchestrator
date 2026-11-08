/**
 * R8.4 (docs/REWORK-SPEC.md §4 R8, journal of 2026-11-01): a board workspace that belongs to a team
 * channel belongs to the rules of that channel too - a card moves with the role it is assigned to, and
 * the one who distributes work is the manager. The board plugin does not know the channel and must not
 * know it: it asks a service the channel publishes under the name `kanbanChatGuard`.
 *
 * Three things are pinned. The question is asked only for a mutation an agent performs, and only for
 * the methods that change a card. A refusal from the channel means the board is not written at all.
 * And when no channel publishes that service, the board behaves exactly as it did before: a board
 * without a team is still a board.
 */

import { test, after } from 'node:test'
import assert from 'node:assert/strict'
import { mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { apply } from '../index.js'

const dirs = []
const workspaceDir = () => {
  const dir = mkdtempSync(join(tmpdir(), 'kanban-channel-guard-'))
  dirs.push(dir)
  return dir
}
after(() => { for (const dir of dirs) rmSync(dir, { recursive: true, force: true }) })

/** The Host fs service as the board uses it: resolve, readText, writeText. */
const fakeFs = {
  async resolve(name, { cwd }) {
    return { path: join(cwd, name), cwd }
  },
  async readText(target) {
    return readFileSync(target.path, 'utf8')
  },
  async writeText(target, text) {
    mkdirSync(join(target.path, '..'), { recursive: true })
    writeFileSync(target.path, text, 'utf8')
    return target
  },
}

/**
 * Activate the plugin against a Host that is just enough to hold it: tools registration captured,
 * services answered by name, the connection route namespace stubbed. The returned dispose closes the
 * orchestrator the plugin starts.
 */
const boot = async (cwd, { guard } = {}) => {
  const registered = new Map()
  const ctx = {
    tools: { register: (tool) => { registered.set(tool.name, tool); return () => registered.delete(tool.name) } },
    provide: () => () => {},
    get: (name) => {
      if (name === 'fs') return fakeFs
      if (name === 'kanbanChatGuard') return guard ?? null
      return null
    },
    logger: Object.assign(() => {}, { log: () => {}, info: () => {}, warn: () => {}, error: () => {} }),
    inject: (_names, callback) => callback({ connection: { fetch: { register: () => () => {} } } }),
  }
  const dispose = await apply(ctx)
  const exec = { agent: { session: { header: { cwd } } } }
  const call = async (name, args) => registered.get(name).execute(args, exec)
  return { call, dispose: async () => { if (typeof dispose === 'function') await dispose() } }
}

const boardCards = (cwd) => JSON.parse(readFileSync(join(cwd, '.dsh-kanban.json'), 'utf8')).cards
const cardIn = (cwd, id) => boardCards(cwd).find((entry) => entry.id === id)

test('R8.4 the board asks the channel before an agent moves a card and does not write when the channel says no', async () => {
  const cwd = workspaceDir()
  const asked = []
  const api = await boot(cwd, { guard: {
    async decide(fact) { asked.push(fact); return { allow: false, code: 'CARD_RIGHT', message: 'Карточку ведёт тот, на кого она назначена' } },
    async report(fact) { asked.push({ reported: fact.method }) },
  } })
  try {
    const created = await api.call('kanban_add_card', { title: 'Собрать отчёт' })
    assert.equal(created.ok, true, created.message)
    const cardId = created.card?.id ?? (created.board.cards.at(-1) ?? {}).id
    assert.ok(cardId, 'the board created a card to move')
    assert.equal(asked.length, 0, 'creating a card is not a move of a card: the channel is not asked about it')

    const columnId = created.board.columns[1].id
    const moved = await api.call('kanban_move_card', { id: cardId, columnId })
    assert.equal(moved.ok, false, `the refusal of the channel has to reach the agent: ${JSON.stringify(moved)}`)
    assert.match(moved.message, /Карточку ведёт тот/, 'and it has to say why in the words of the channel')
    assert.equal(asked.length, 1, `only the move is asked about: ${JSON.stringify(asked)}`)
    assert.equal(asked[0].method, 'moveCard', 'the question names the action')
    assert.equal(asked[0].workspacePath, cwd, 'the channel is told which workspace the card lives in')
    assert.equal(asked[0].args.id, cardId, 'and which card')
    assert.ok(asked[0].session?.header?.cwd, 'the channel is given the acting session, so it can tell who acted')
    assert.ok(!asked.some((entry) => entry.reported), 'a card that was not moved is not reported to the channel')

    const row = cardIn(cwd, cardId)
    assert.notEqual(row.columnId, columnId, 'the board was not written: the card stayed where the channel left it')
  } finally {
    await api.dispose()
  }
})

test('R8.4 when the channel allows the move the board writes it and the channel is told', async () => {
  const cwd = workspaceDir()
  const asked = []
  const reported = []
  const api = await boot(cwd, { guard: {
    async decide(fact) { asked.push(fact); return { allow: true } },
    async report(fact) { reported.push(fact) },
  } })
  try {
    const created = await api.call('kanban_add_card', { title: 'Проверить читку' })
    const cardId = created.card?.id ?? (created.board.cards.at(-1) ?? {}).id
    const columnId = created.board.columns[1].id
    const moved = await api.call('kanban_move_card', { id: cardId, columnId })
    assert.equal(moved.ok, true, moved.message)
    assert.equal(cardIn(cwd, cardId).columnId, columnId, 'the card moved on the board of this workspace')
    assert.equal(asked.length, 1)
    assert.equal(reported.length, 1, 'the channel learns what its board accepted')
    assert.equal(reported[0].method, 'moveCard')
    assert.equal(reported[0].args.id, cardId)
  } finally {
    await api.dispose()
  }
})

test('R8.4 a board whose workspace has no channel behaves exactly as before', async () => {
  const cwd = workspaceDir()
  const api = await boot(cwd, { guard: null })
  try {
    const created = await api.call('kanban_add_card', { title: 'Доска без команды' })
    assert.equal(created.ok, true, created.message)
    const cardId = created.card?.id ?? (created.board.cards.at(-1) ?? {}).id
    const columnId = created.board.columns[2].id
    const moved = await api.call('kanban_move_card', { id: cardId, columnId })
    assert.equal(moved.ok, true, `a guard that is not published must not change the board: ${moved.message}`)
    assert.equal(cardIn(cwd, cardId).columnId, columnId, 'the move happened')
  } finally {
    await api.dispose()
  }
})
