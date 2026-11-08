/**
 * R2.4' (docs/REWORK-SPEC.md §8.2) — the workflow fields of a card, in our Kanban fork.
 *
 * A card now carries `parent` (the card it is a piece of), `assignee` (the role it is
 * given to) and `milestone` (closes only when its children close). The board is the
 * source of truth for the team's work, so the breakdown and the assignment have to live
 * here instead of being guessed inside the chat plugin.
 */

import { test } from 'node:test'
import assert from 'node:assert/strict'
import { SCHEMA_VERSION, ASSIGNEE_LIMIT, MIGRATIONS, migrateBoard, validateBoard, parseBoardText, planCardLinks } from '../index.js'

const board = (cards, extra = {}) => ({
  schemaVersion: SCHEMA_VERSION,
  completedColumnId: 'c4',
  columns: [{ id: 'c1', title: 'Todo' }, { id: 'c4', title: 'Done' }],
  labels: [],
  cards,
  activities: [],
  ...extra,
})

const card = (id, over = {}) => ({
  id,
  columnId: 'c1',
  title: 'card ' + id,
  note: '',
  label: null,
  priority: null,
  dueDate: null,
  createdAt: '2026-10-30T10:00:00.000Z',
  createdBy: 'human',
  comments: [],
  ...over,
})

test('R2.4 the board schema is version 5 and an old board migrates into it', () => {
  assert.equal(SCHEMA_VERSION, 5)
  const v4 = {
    schemaVersion: 4,
    completedColumnId: 'c4',
    columns: [{ id: 'c1', title: 'Todo' }, { id: 'c4', title: 'Done' }],
    labels: [{ name: 'bug', color: '#f87171' }],
    cards: [card('k7', { label: 'bug', columnId: 'c4' }), card('k9')],
    activities: [{ id: 'a1', ts: '2026-10-30T10:00:00.000Z', type: 'card_created', source: 'human' }],
  }
  const parsed = parseBoardText(JSON.stringify(v4))
  assert.equal(parsed.ok, true, `the v4 board must still open: ${JSON.stringify(parsed.warnings)}`)
  assert.equal(parsed.kind, 'ok')
  assert.equal(parsed.migrated, true)
  assert.equal(parsed.fromVersion, 4)
  assert.equal(parsed.data.schemaVersion, 5)

  const migrated = parsed.data.cards
  assert.deepEqual(migrated.map((c) => [c.id, c.parent, c.assignee, c.milestone]),
    [['k7', null, null, false], ['k9', null, null, false]],
    'old cards keep working: the new fields exist with empty values, nothing else moves')
  assert.equal(migrated[0].label, 'bug')
  assert.equal(parsed.data.completedColumnId, 'c4', 'the completion column of the board survives the migration')

  const check = validateBoard(parsed.data)
  assert.deepEqual(check.errors, [], `migrated board must validate: ${JSON.stringify(check.errors)}`)
})

test('R2.4 migration 4->5 is the last step and produces the current version', () => {
  assert.equal(typeof MIGRATIONS[4], 'function', 'the fork needs a v4 -> v5 step, otherwise an old board is unreadable')
  const out = migrateBoard({ schemaVersion: 4, completedColumnId: null, columns: [{ id: 'c1', title: 'Todo' }], labels: [], cards: [card('k1')], activities: [] }, 4)
  assert.equal(out.schemaVersion, 5)
  assert.deepEqual(validateBoard(out).errors, [])
})

test('R2.4 a parent has to be a card that exists, and never the card itself or its own child', () => {
  const withCards = board([card('k1'), card('k2', { parent: 'k1' }), card('k3', { parent: 'k2' })])

  assert.equal(planCardLinks(withCards, { parent: 'nope' }).error, 'Parent card not found: nope')
  assert.equal(planCardLinks(withCards, { parent: '' }).parent, null, 'an empty parent clears the link')
  assert.equal(planCardLinks(withCards, { parent: null }).parent, null)

  const self = planCardLinks(withCards, { parent: 'k1' }, { currentId: 'k1' })
  assert.equal(self.error, 'A card cannot be linked under itself or under its own child: k1')

  const grandchild = planCardLinks(withCards, { parent: 'k3' }, { currentId: 'k1' })
  assert.equal(grandchild.error, 'A card cannot be linked under itself or under its own child: k3',
    'k3 is a grandchild of k1: linking them would close a loop')

  const legal = planCardLinks(withCards, { parent: 'k1' }, { currentId: 'k3' })
  assert.equal(legal.error, null)
  assert.equal(legal.parent, 'k1')
})

test('R2.4 an assignee is a role name, trimmed, capped, and never empty', () => {
  const withCards = board([card('k1')])
  assert.equal(planCardLinks(withCards, { assignee: '  developer ' }).assignee, 'developer')
  assert.equal(planCardLinks(withCards, { assignee: null }).assignee, null)
  assert.equal(planCardLinks(withCards, { assignee: '' }).assignee, null)
  assert.equal(planCardLinks(withCards, { assignee: 'x'.repeat(200) }).assignee.length, ASSIGNEE_LIMIT)
  assert.equal(planCardLinks(withCards, { assignee: '   ' }).error, 'Assignee must name a role, not be empty')
})

test('R2.4 milestone is a flag, and a value that is not true is not a milestone', () => {
  const withCards = board([card('k1')])
  assert.equal(planCardLinks(withCards, { milestone: true }).milestone, true)
  assert.equal(planCardLinks(withCards, { milestone: 'yes' }).milestone, false)
  assert.equal(planCardLinks(withCards, {}).milestone, undefined, 'an absent key must not rewrite the card')
})

test('R2.4 a board file cannot smuggle a broken link past validation', () => {
  const missing = board([card('k1', { parent: 'ghost' })])
  assert.ok(validateBoard(missing).errors.some((e) => e.includes('missing parent')), JSON.stringify(validateBoard(missing).errors))

  const loop = board([card('k1', { parent: 'k2' }), card('k2', { parent: 'k1' })])
  assert.ok(validateBoard(loop).errors.some((e) => e.includes('parent loop')), JSON.stringify(validateBoard(loop).errors))

  const selfParent = board([card('k1', { parent: 'k1' })])
  assert.ok(validateBoard(selfParent).errors.some((e) => e.includes('its own parent')))

  const badMilestone = board([card('k1', { milestone: 'true' })])
  assert.ok(validateBoard(badMilestone).errors.some((e) => e.includes('non-boolean milestone')))

  const longAssignee = board([card('k1', { assignee: 'r'.repeat(ASSIGNEE_LIMIT + 1) })])
  assert.ok(validateBoard(longAssignee).errors.some((e) => e.includes('invalid assignee')))

  const legal = board([card('k1', { milestone: true }), card('k2', { parent: 'k1', assignee: 'developer' })])
  assert.deepEqual(validateBoard(legal).errors, [])
})
