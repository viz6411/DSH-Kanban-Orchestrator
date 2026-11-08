/**
 * R2.5' (docs/REWORK-SPEC.md §8.2) — one owner of the model request.
 *
 * The board engine decides which role a card needs and when (column roles, WIP limit,
 * auto-pull). The team channel owns the single model slot, so the engine must ask the
 * channel before it creates a session and prompts a role itself - otherwise two clocks
 * wake the same role and a local model faces parallel work.
 *
 * The engine must also keep working when the channel is absent or refuses: the chat
 * plugin is optional, and until R3 is built the channel answers that it cannot take a
 * card wake yet. These tests pin all three answers.
 */

import { test } from 'node:test'
import assert from 'node:assert/strict'
import { createOrchestrator, defaultConfig, ORCH_FILE } from '../lib/orchestrator.js'

const WORKSPACE = { id: 'ws-1', path: '/tmp/dsh-kanban-test-ws', title: 'Fake project' }
const CARD_ID = 'k1'
const ROLE = 'developer'

const config = () => ({
  ...defaultConfig(),
  enabled: true,
  dispatchEnabled: true,
  sourceColumnIds: ['c1'],
  doneColumnIds: ['c4'],
  entryColumnId: 'c2',
  wipLimit: 1,
  autoPull: false,
  columnRoles: { c2: ROLE },
  stampAssignments: true,
  labelAssignments: false,
})

function harness(service, { withWakeDelegate = true } = {}) {
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
      assignee: ROLE,
      milestone: false,
      createdAt: '2026-10-30T10:00:00.000Z',
      createdBy: 'human',
      comments: [],
    }],
  }

  const wakeCalls = []
  const sessionCalls = []
  const logs = []
  const cfg = config()

  const deps = {
    ctx: {
      get: (name) => {
        if (name === 'sessionController') {
          return {
            create: async () => { sessionCalls.push('create'); return { sessionId: 'session-fake-1' } },
            resolveAgent: async () => ({ agent: { followup: () => {} } }),
          }
        }
        return undefined
      },
      sessions: undefined,
    },
    logger: { info: (line) => logs.push(line) },
    dispatch: async (workspace, method, args) => {
      if (method === 'get') return { board: JSON.parse(JSON.stringify(board)) }
      if (method === 'addComment') {
        const card = board.cards.find((c) => c.id === args.id)
        if (card) card.comments.push({ id: 'm' + card.comments.length, content: args.content, source: 'agent', createdAt: '2026-10-30T10:01:00.000Z' })
        return { board }
      }
      if (method === 'updateCard') {
        const card = board.cards.find((c) => c.id === args.id)
        if (card && args.label) card.label = args.label
        return { board }
      }
      return { board }
    },
    listWorkspaces: () => [WORKSPACE],
    workspaceKey: (workspace) => workspace.path,
    readFile: async (workspace, name) => (name === ORCH_FILE ? JSON.stringify(cfg) : null),
    writeFile: async () => {},
    presetsProvider: async () => [{ id: ROLE, name: ROLE }],
  }
  if (withWakeDelegate) deps.wakeDelegate = () => service

  const orch = createOrchestrator(deps)
  const logTypes = () => (orch.states.get(WORKSPACE.path)?.log ?? []).map((row) => row.type)
  return {
    orch,
    board,
    wakeCalls,
    sessionCalls,
    logs,
    logTypes,
    async drive() {
      // First pass: the engine sees the card for the first time and only stamps the role.
      await orch.reconcile(WORKSPACE.path, WORKSPACE)
      // Second pass: the card sits in a role column without a session -> catch-up dispatch.
      await orch.reconcile(WORKSPACE.path, WORKSPACE)
      // dispose() drops the in-memory state, so the log has to be read before it.
      const types = logTypes()
      orch.dispose()
      return types
    },
  }
}

test('R2.5 the engine hands the wake to the team channel and creates no session itself', async () => {
  const service = {
    version: 1,
    canWake: () => true,
    wake: async (request) => { service.calls.push(request); return { accepted: true, requestId: 'req-77' } },
    calls: [],
  }
  const h = harness(service)
  const types = await h.drive()

  assert.equal(service.calls.length, 1, `the channel must be asked exactly once: ${JSON.stringify(service.calls)}`)
  const request = service.calls[0]
  assert.equal(request.cardId, CARD_ID)
  assert.equal(request.role, ROLE)
  assert.equal(request.workspaceKey, WORKSPACE.path, 'the channel needs the workspace the board belongs to')
  assert.equal(request.columnTitle, 'In Progress')
  assert.equal(request.rework, false)
  assert.equal(request.workspacePath, WORKSPACE.path, 'the channel has to know the folder the role works in (R2.5\'b: it is what binds the role session to the project)')

  assert.ok(types.includes('dispatch-delegated'), `the engine must record the hand-off: ${JSON.stringify(types)}`)
  assert.equal(h.sessionCalls.length, 0,
    'the engine must not create a session when the channel took the wake: two owners would mean parallel model requests')
  assert.ok(h.logs.some((line) => line.includes('req-77')), 'the request id has to appear in the engine log')
})

test('R2.5 a channel that cannot wake a card yet keeps the engine dispatching as before', async () => {
  const service = { version: 1, canWake: () => false, wake: async () => ({ accepted: false }), calls: [] }
  const h = harness(service)
  const types = await h.drive()

  assert.equal(service.calls.length, 0, 'canWake() false must not even be offered the card')
  assert.ok(h.sessionCalls.includes('create'), 'without a channel that can wake, the engine dispatches the card itself')
  assert.ok(!types.includes('dispatch-delegated'), JSON.stringify(types))
})

test('R2.5 a refused wake falls back to the own dispatch and says so in the log', async () => {
  const service = {
    version: 1,
    canWake: () => true,
    wake: async () => ({ accepted: false, code: 'CARD_WAKE_NOT_BUILT' }),
  }
  const h = harness(service)
  const types = await h.drive()

  assert.ok(types.includes('dispatch-delegate-refused'), `the refusal has to be visible: ${JSON.stringify(types)}`)
  assert.ok(h.sessionCalls.includes('create'), 'a refusal must not stop the pipeline: the engine takes its own path')
  assert.ok(!types.includes('dispatch-delegated'), JSON.stringify(types))
})

test('R2.5 a deployment without the chat plugin behaves exactly as before', async () => {
  const h = harness(undefined, { withWakeDelegate: false })
  const types = await h.drive()
  assert.ok(h.sessionCalls.includes('create'), 'no channel, no delegation: the engine works alone')
  assert.ok(!types.includes('dispatch-delegated') && !types.includes('dispatch-delegate-refused'), JSON.stringify(types))
})

test('R2.5 a throwing channel is survived', async () => {
  const service = { canWake: () => true, wake: async () => { throw new Error('channel is down') } }
  const h = harness(service)
  const types = await h.drive()
  assert.ok(types.includes('dispatch-delegate-failed'), `a broken channel must be reported, not fatal: ${JSON.stringify(types)}`)
  assert.ok(h.sessionCalls.includes('create'), 'the card must still reach its role')
})

test('R2.5\'b a wake the channel cannot take now makes the engine wait, not dispatch alone', async () => {
  const service = {
    version: 2,
    canWake: () => true,
    wake: async (request) => { service.calls.push(request); return { accepted: false, code: 'CARD_WAKE_SLOT_BUSY', retry: true } },
    calls: [],
  }
  const h = harness(service)
  const types = await h.drive()

  assert.ok(types.includes('dispatch-delegate-deferred'), `the wait has to be visible in the engine log: ${JSON.stringify(types)}`)
  assert.equal(h.sessionCalls.length, 0,
    'while the channel holds the single model request the engine must not create a session of its own - that is the difference between one owner and two clocks')
  assert.ok(!types.includes('dispatch-delegated'), JSON.stringify(types))
  assert.ok(service.calls.length >= 1, 'the card is asked again on a later tick instead of being abandoned')
})

test('R2.5\'b a refusal without retry still lets the engine take its own path', async () => {
  const service = {
    version: 2,
    canWake: () => true,
    wake: async () => ({ accepted: false, code: 'CARD_WAKE_UNKNOWN_ROLE', retry: false }),
  }
  const h = harness(service)
  const types = await h.drive()

  assert.ok(types.includes('dispatch-delegate-refused'), JSON.stringify(types))
  assert.ok(!types.includes('dispatch-delegate-deferred'), 'a refusal that will never change must not park the card forever')
  assert.ok(h.sessionCalls.includes('create'), 'a role the channel does not have still reaches the board pipeline')
})
