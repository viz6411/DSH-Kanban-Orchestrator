/**
 * R2.8 (docs/REWORK-SPEC.md §8.2) — the engine that says «карточка назначена на роль» must
 * actually make it so on the card.
 *
 * The orchestrator decides which role a card needs: the column the card sits in has a role. Until
 * now it wrote that as a comment on the card and as a label, while the card's own `assignee` -
 * added in R2.4' for exactly this purpose - stayed empty. So the board could not answer "who owns
 * this card" without reading a chat log, and the column role was the only hint about an assignment.
 *
 * What the engine must not do is overwrite a role that a person or the manager already put on the
 * card. Column roles describe a stage; an assignment is a decision, and a silent rewrite is how an
 * assignment disappears.
 */

import { test } from 'node:test'
import assert from 'node:assert/strict'
import { createOrchestrator, defaultConfig, ORCH_FILE } from '../lib/orchestrator.js'

const WORKSPACE = { id: 'ws-1', path: '/tmp/dsh-kanban-stamp-test-ws', title: 'Fake project' }
const CARD_ID = 'k1'
const COLUMN_ROLE = 'developer'

const config = (over = {}) => ({
  ...defaultConfig(),
  enabled: true,
  dispatchEnabled: false,
  sourceColumnIds: ['c1'],
  doneColumnIds: ['c4'],
  entryColumnId: 'c2',
  wipLimit: 1,
  autoPull: false,
  columnRoles: { c2: COLUMN_ROLE },
  stampAssignments: true,
  labelAssignments: false,
  ...over,
})

/**
 * A board whose card sits in a role column and knows nothing about an assignment, plus a stand-in
 * for the board itself that records every write the engine asks for.
 */
function harness({ assignee = null, cfg = config(), stampError = null } = {}) {
  const board = {
    schemaVersion: 5,
    completedColumnId: 'c4',
    columns: [{ id: 'c1', title: 'Todo' }, { id: 'c2', title: 'In Progress' }, { id: 'c4', title: 'Done' }],
    labels: [],
    activities: [],
    cards: [{
      id: CARD_ID,
      columnId: 'c2',
      title: 'Make the thing work',
      note: '',
      label: null,
      priority: null,
      dueDate: null,
      parent: null,
      assignee,
      milestone: false,
      createdAt: '2026-10-31T10:00:00.000Z',
      createdBy: 'human',
      comments: [],
    }],
  }

  const writes = []
  const logs = []
  const deps = {
    ctx: { get: () => undefined, sessions: undefined },
    logger: { info: (line) => logs.push(line) },
    dispatch: async (workspace, method, args, actor) => {
      writes.push({ method, args, actor })
      if (method === 'get') return { board: JSON.parse(JSON.stringify(board)) }
      const card = board.cards.find((row) => row.id === args.id)
      if (method === 'updateCard') {
        if (args.assignee !== undefined) {
          if (stampError) return { error: stampError }
          if (card) card.assignee = args.assignee
        }
        if (args.label !== undefined && card) card.label = args.label
        return { board }
      }
      if (method === 'addComment') {
        if (card) card.comments.push({ id: 'm' + card.comments.length, content: args.content, source: 'agent', createdAt: '2026-10-31T10:01:00.000Z' })
        return { board }
      }
      return { board }
    },
    listWorkspaces: () => [WORKSPACE],
    workspaceKey: (workspace) => workspace.path,
    readFile: async (workspace, name) => (name === ORCH_FILE ? JSON.stringify(cfg) : null),
    writeFile: async () => {},
    presetsProvider: async () => [{ id: COLUMN_ROLE, name: COLUMN_ROLE }],
  }

  const orch = createOrchestrator(deps)
  return {
    board,
    writes,
    logs,
    orch,
    async stampOnce() {
      // The engine stamps a role on the first sighting of a card in a role column.
      await orch.reconcile(WORKSPACE.path, WORKSPACE)
      const state = orch.states.get(WORKSPACE.path)
      const types = (state?.log ?? []).map((row) => row.type)
      orch.dispose()
      return types
    },
    card: () => board.cards.find((row) => row.id === CARD_ID),
    assigneeWrites: () => writes.filter((row) => row.method === 'updateCard' && row.args && row.args.assignee !== undefined),
  }
}

test('R2.8 the engine puts the column role on the card when nobody has assigned it', async () => {
  const h = harness()
  const types = await h.stampOnce()

  const wrote = h.assigneeWrites()
  assert.equal(wrote.length, 1, `the assignment has to be written to the board once, not repeated every tick: ${JSON.stringify(wrote)}`)
  assert.equal(wrote[0].args.assignee, COLUMN_ROLE, 'the role that answers for the list becomes the assignee of the card')
  assert.equal(wrote[0].args.id, CARD_ID)
  assert.equal(wrote[0].actor, 'agent', 'the engine acts as an agent on the board, the way it already does for a label')
  assert.equal(h.card().assignee, COLUMN_ROLE, 'the card itself carries the assignment, so the board can answer who owns it')
  assert.ok(h.card().comments.some((row) => row.content.includes(COLUMN_ROLE)), 'the comment stays: the person reading the card should see why it is assigned')
  assert.equal(types.includes('stamp-warn'), false, JSON.stringify(types))
})

test('R2.8 a role the person or the manager already put on the card is not written over', async () => {
  const h = harness({ assignee: 'tester' })
  const types = await h.stampOnce()

  assert.equal(h.assigneeWrites().length, 0, `the engine must not touch an assignment that is already made: ${JSON.stringify(h.assigneeWrites())}`)
  assert.equal(h.card().assignee, 'tester', 'the card keeps the role it was given, even though its column answers for another one')
  assert.equal(types.includes('stamp-kept'), true,
    `the engine has to say out loud that it left the decision alone: ${JSON.stringify(types)}`)
  assert.ok(h.logs.some((line) => line.includes('tester') && line.includes(COLUMN_ROLE)),
    `the log line must name both roles so the mismatch is traceable: ${JSON.stringify(h.logs)}`)
})

test('R2.8 with stamping turned off the engine writes nothing about assignments', async () => {
  const h = harness({ cfg: config({ stampAssignments: false }) })
  const types = await h.stampOnce()

  assert.equal(h.assigneeWrites().length, 0, 'no assignee writes when the switch is off')
  assert.equal(h.writes.filter((row) => row.method === 'addComment').length, 0, 'and no comment either: the switch covers the stamp as a whole')
  assert.equal(h.card().assignee, null)
  assert.deepEqual(types, [], `a disabled stamp produces no log at all: ${JSON.stringify(types)}`)
})

test('R2.8 a stamp the board refuses is reported, and the card is left unassigned', async () => {
  const h = harness({ stampError: 'board is read-only' })
  const types = await h.stampOnce()

  assert.equal(h.card().assignee, null, 'a refused write is not pretended to have happened')
  assert.equal(types.includes('stamp-warn'), true, `the refusal has to reach the engine log: ${JSON.stringify(types)}`)
  assert.ok(h.logs.some((line) => line.includes('read-only')), `the reason travels with the warning: ${JSON.stringify(h.logs)}`)
})
