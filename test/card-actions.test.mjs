/**
 * R2.2 (docs/REWORK-SPEC.md §4, R2) — the whitelist of what the team channel may ask the
 * board to do.
 *
 * The board belongs to the person; the channel works on cards. So the service the fork
 * provides answers five methods and nothing else: reading a card, adding one, changing one,
 * moving one, commenting on one. Renaming a list, deleting a card, choosing which column is
 * Done or editing labels are not the channel's to do, and a whitelist is only worth something
 * if a test keeps it a whitelist.
 */

import { test } from 'node:test'
import assert from 'node:assert/strict'
import { CARD_ACTION_METHODS, SERVICE_VERSION, SCHEMA_VERSION, attachFamily } from '../index.js'

test('R2.2 the card whitelist is exactly the five methods of card work', () => {
  assert.deepEqual(
    [...CARD_ACTION_METHODS].sort(),
    ['addCard', 'addComment', 'getCard', 'moveCard', 'updateCard'].sort(),
    `the channel may ask the board for card work only: ${[...CARD_ACTION_METHODS].sort().join(', ')}`,
  )
})

test('R2.2 the board structure and the destructive board methods are not reachable from the channel', () => {
  for (const method of [
    'deleteCard', 'deleteComment', 'addColumn', 'renameColumn', 'deleteColumn', 'moveColumn',
    'setCompletedColumn', 'addLabel', 'updateLabel', 'deleteLabel',
  ]) {
    assert.equal(CARD_ACTION_METHODS.has(method), false, `${method} changes the board itself, not a card of the work`)
  }
})

test('R2.2 the service version and the board schema travel together', () => {
  assert.equal(SERVICE_VERSION, 2, 'version 2 of the service is read + card actions; version 1 was read only')
  assert.equal(SCHEMA_VERSION, 5, 'the card fields of the team (parent, assignee, milestone) are what the service exposes')
})

test('R2.4 a card view shows the cards that were made out of it', () => {
  const cards = [
    { id: 'k13', title: 'Whole piece' },
    { id: 'k14', title: 'First part', parent: 'k13' },
    { id: 'k15', title: 'Second part', parent: 'k13' },
    { id: 'k16', title: 'Alone' },
  ]
  const views = attachFamily(cards.map((card) => ({ id: card.id, title: card.title, children: [] })), cards)
  const byId = new Map(views.map((view) => [view.id, view]))

  assert.deepEqual(byId.get('k13').children, ['k14', 'k15'],
    'a decomposition is only visible when the parent also shows its parts')
  assert.deepEqual(byId.get('k14').children, [], 'a part with no parts answers with an empty list, not with nothing')
  assert.deepEqual(byId.get('k16').children, [], 'a card of its own answers the same way')
})

test('R2.4 the family helper is asked about the board it was given, not about a wider world', () => {
  const views = attachFamily([{ id: 'k14', title: 'Part', children: [] }], [{ id: 'k14', title: 'Part', parent: 'k13' }])
  assert.deepEqual(views[0].children, [], 'a card is not a parent of cards that are not on this board')

  const empty = attachFamily([], [])
  assert.deepEqual(empty, [], 'no views, nothing to attach')
})
