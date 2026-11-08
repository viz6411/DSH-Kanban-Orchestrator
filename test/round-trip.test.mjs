/**
 * R2.8 (docs/REWORK-SPEC.md §8.2) — the fields of the team survive the board they are stored on.
 *
 * Until now the fork's own fields (`parent`, `assignee`, `milestone`) were tested where they are
 * planned (`planCardLinks`) and where a file is checked (`validateBoard`, `migrateBoard`). This file
 * goes through the door the team channel actually uses: the service the fork provides, with a real
 * board file on disk. A migration, a create, a move and a second plugin instance reading the same
 * folder - that is what "survives round-trip" has to mean, because the board is the source of truth
 * for the work, and a field that only lives in the memory of one Host start is not a fact.
 */

import { test, after } from 'node:test'
import assert from 'node:assert/strict'
import { mkdtempSync, readFileSync, writeFileSync, rmSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { apply, SCHEMA_VERSION, SERVICE_VERSION } from '../index.js'

const BOARD_FILE = '.dsh-kanban.json'
const dirs = []

const freshDir = () => {
  const dir = mkdtempSync(join(tmpdir(), 'dsh-kanban-roundtrip-'))
  dirs.push(dir)
  return dir
}

after(() => {
  for (const dir of dirs) rmSync(dir, { recursive: true, force: true })
})

/**
 * The Host services the fork asks for, standing in for a running Host: a filesystem that really
 * writes into the temporary workspace, and a registry that knows this one workspace. The activation
 * factory is deliberately not called: no orchestrator timer and no startup scan are needed here,
 * and keeping them out keeps the test about the board file.
 */
function harness(dir) {
  const workspace = { id: 'ws-roundtrip', path: dir }
  const fs = {
    resolve: async (name, { cwd } = {}) => ({ name, cwd: cwd ?? dir, path: join(cwd ?? dir, name) }),
    readText: async (target) => {
      try {
        return readFileSync(target.path, 'utf8')
      } catch (error) {
        const failure = new Error(error?.code === 'ENOENT' ? 'ENOENT' : String(error?.message ?? error))
        failure.code = 'ENOENT'
        throw failure
      }
    },
    writeText: async (target, text) => {
      writeFileSync(target.path, text, 'utf8')
      return target
    },
  }
  const provided = {}
  const ctx = {
    get: (name) => {
      if (name === 'fs') return fs
      if (name === 'workspaceRegistry') return { get: async (id) => ({ ...workspace, id }), resolveByPath: async () => workspace, list: () => [workspace] }
      if (name === 'sandboxPolicy') return { defaultMode: 'workspace-write', resolve: () => ({ mode: 'workspace-write' }) }
      return undefined
    },
    provide: (name, value) => { provided[name] = value },
    tools: { register: () => {} },
    inject: () => {},
  }
  apply(ctx)
  const service = provided.kanbanBoard
  assert.ok(service, 'the fork must provide its board service for the team channel')
  const read = () => service.read({ path: dir })
  const act = (method, args = {}) => service.act({ path: dir, method, args, actor: 'human' })
  const onDisk = () => JSON.parse(readFileSync(join(dir, BOARD_FILE), 'utf8'))
  return { service, read, act, onDisk, workspace }
}

const v4Board = () => JSON.stringify({
  schemaVersion: 4,
  completedColumnId: 'c4',
  columns: [{ id: 'c1', title: 'Todo' }, { id: 'c2', title: 'In Progress' }, { id: 'c3', title: 'Review' }, { id: 'c4', title: 'Done' }],
  labels: [],
  cards: [{
    id: 'k1',
    columnId: 'c1',
    title: 'Old card from before the team fields',
    note: 'written when the board knew no parent and no assignee',
    label: null,
    priority: null,
    dueDate: null,
    createdAt: '2026-10-20T10:00:00.000Z',
    createdBy: 'human',
    comments: [{ id: 'm1', content: 'a comment that must survive', source: 'human', createdAt: '2026-10-21T10:00:00.000Z' }],
  }],
  activities: [],
})

test('R2.8 a board file of schema 4 migrates to 5 where the channel reads it, without losing the card', async () => {
  const dir = freshDir()
  writeFileSync(join(dir, BOARD_FILE), v4Board(), 'utf8')
  const { read, onDisk } = harness(dir)

  const view = await read()
  assert.equal(view.ok, true, JSON.stringify(view).slice(0, 300))
  assert.equal(view.schemaVersion, SCHEMA_VERSION, 'the channel must be shown the current schema, not the one the file was written with')
  assert.equal(view.completedColumnId, 'c4', 'the Done column of the old board stays the Done column')
  const card = view.cards.find((row) => row.id === 'k1')
  assert.ok(card, `the card of the old board must be there: ${JSON.stringify(view.cards.map((row) => row.id))}`)
  assert.equal(card.title, 'Old card from before the team fields')
  assert.equal(card.parent, null, 'a card without a breakdown gets one, it does not invent one')
  assert.equal(card.assignee, null, 'a card nobody assigned has no assignee; the board must not guess a role')
  assert.equal(card.milestone, false, 'milestone is a flag, and an old card is not one')
  assert.deepEqual(card.children, [], 'a card without children answers an empty list, not undefined')

  const stored = onDisk()
  assert.equal(stored.schemaVersion, SCHEMA_VERSION, 'the migrated board is written back, so the next start does not migrate it again')
  const storedCard = stored.cards.find((row) => row.id === 'k1')
  assert.equal(storedCard.note, 'written when the board knew no parent and no assignee', 'the description of the old card is not rewritten by the migration')
  assert.equal(storedCard.comments.length, 1, 'the comments of the old card survive the migration')
})

test('R2.8 the fields the channel puts on a card come back on the next read and on a second start', async () => {
  const dir = freshDir()
  const first = harness(dir)

  const parent = await first.act('addCard', { title: 'Whole piece of work', milestone: true, assignee: 'developer' })
  assert.equal(parent.ok, true, JSON.stringify(parent).slice(0, 300))
  assert.equal(parent.card.milestone, true, 'a card that closes only when its children close is marked as one')
  assert.equal(parent.card.assignee, 'developer', 'the role the card is given to is a fact on the card')

  const child = await first.act('addCard', { title: 'A piece of it', parent: parent.card.id })
  assert.equal(child.ok, true, JSON.stringify(child).slice(0, 300))
  assert.equal(child.card.parent, parent.card.id)

  const view = await first.read()
  const parentView = view.cards.find((row) => row.id === parent.card.id)
  const childView = view.cards.find((row) => row.id === child.card.id)
  assert.deepEqual(parentView.children, [child.card.id], `the parent must show the card that was made out of it: ${JSON.stringify(parentView)}`)
  assert.equal(parentView.milestone, true)
  assert.equal(parentView.assignee, 'developer')
  assert.equal(childView.parent, parent.card.id)

  // The same folder, a new plugin instance: what the board file says is what the channel sees.
  const again = harness(dir)
  const second = await again.read()
  const storedParent = second.cards.find((row) => row.id === parent.card.id)
  const storedChild = second.cards.find((row) => row.id === child.card.id)
  assert.ok(storedParent && storedChild, `both cards must come back from the file: ${JSON.stringify(second.cards.map((row) => row.id))}`)
  assert.equal(storedParent.milestone, true, 'milestone survives the restart')
  assert.equal(storedParent.assignee, 'developer', 'the assignment survives the restart')
  assert.deepEqual(storedParent.children, [child.card.id], 'the breakdown survives the restart')
  assert.equal(storedChild.parent, parent.card.id, 'the child still knows whose piece it is')
})

test('R2.8 moving a card keeps its assignment and its breakdown, and the board history says so', async () => {
  const dir = freshDir()
  const { act, read, onDisk } = harness(dir)

  const parent = await act('addCard', { title: 'Whole piece', milestone: true })
  const child = await act('addCard', { title: 'A piece', parent: parent.card.id, assignee: 'tester' })
  const view = await read()
  const review = view.columns.find((column) => column.title === 'Review')
  assert.ok(review, `the default board has a Review list: ${JSON.stringify(view.columns)}`)

  const moved = await act('moveCard', { id: child.card.id, columnId: review.id })
  assert.equal(moved.ok, true, JSON.stringify(moved).slice(0, 300))
  assert.equal(moved.card.columnId, review.id)
  assert.equal(moved.card.parent, parent.card.id, 'a move changes the list of a card, not its place in the breakdown')
  assert.equal(moved.card.assignee, 'tester', 'a move does not drop who the card was given to')

  const stored = onDisk()
  const storedChild = stored.cards.find((row) => row.id === child.card.id)
  assert.equal(storedChild.columnId, review.id, 'the move is on disk, not only in this process')
  assert.equal(storedChild.assignee, 'tester')
  assert.equal(storedChild.parent, parent.card.id)

  const moveRecord = (stored.activities ?? []).filter((row) => row.type === 'card_moved').slice(-1)[0]
  assert.ok(moveRecord, `the board must record the move: ${JSON.stringify((stored.activities ?? []).map((row) => row.type))}`)
  assert.equal(moveRecord.meta?.assignee, 'tester',
    `the history of a moved card has to say who owned it, not leave the assignment to a chat log: ${JSON.stringify(moveRecord)}`)
  assert.equal(moveRecord.meta?.parent, parent.card.id, 'and which piece of work it is')
  const parentAfter = (await read()).cards.find((row) => row.id === parent.card.id)
  assert.deepEqual(parentAfter.children, [child.card.id], 'the parent still lists the child after the child moved')
})

test('R2.8 the service answers the current version of itself, and a board file appears when the board is really changed', async () => {
  const dir = freshDir()
  const { read, act, onDisk } = harness(dir)
  const view = await read()
  assert.equal(view.version, SERVICE_VERSION, 'the channel checks the version of the service before it trusts the answer')
  assert.equal(view.ok, true)
  assert.deepEqual(view.cards, [], 'a fresh workspace has an empty board, not a phantom card')
  assert.notEqual(view.completedColumnId, null, 'a default board knows which list is Done')
  assert.equal(view.cardCount, 0)

  const added = await act('addCard', { title: 'The first card' })
  assert.equal(added.ok, true, JSON.stringify(added).slice(0, 300))
  assert.ok(added.card && added.card.id, `creating a card has to answer with the card it created, or a breakdown cannot be built: ${JSON.stringify(added)}`)
  const stored = onDisk()
  assert.equal(stored.schemaVersion, SCHEMA_VERSION, 'a board written today is written in today’s schema')
  assert.deepEqual(stored.cards.map((row) => row.id), [added.card.id], 'the card the channel was told about is the card on disk')
})

test('R2.7 the answer a card read gives carries the fields of the team, not only the ones the board UI of 1.8.0 knew', async () => {
  const dir = freshDir()
  const { act } = harness(dir)

  const parent = await act('addCard', { title: 'Whole piece', milestone: true })
  const child = await act('addCard', { title: 'A piece', parent: parent.card.id, assignee: 'reviewer' })

  const view = await act('getCard', { id: child.card.id })
  assert.equal(view.ok, true, JSON.stringify(view).slice(0, 300))
  const full = view.fullCard
  assert.ok(full, `opening a card has to answer with the card itself: ${JSON.stringify(view).slice(0, 300)}`)
  assert.equal(full.assignee, 'reviewer', 'the whole-card answer is what a UI and an agent read, and it must not drop the assignment')
  assert.equal(full.parent, parent.card.id, 'and it must not drop the piece of work the card belongs to')

  const parentCard = await act('getCard', { id: parent.card.id })
  assert.equal(parentCard.fullCard.milestone, true, 'a card that closes only when its children close is recognisable as one from the card answer too')
})
