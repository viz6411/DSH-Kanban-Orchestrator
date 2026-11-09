#!/usr/bin/env python3
"""k1601 / R3.9c host checks (tester F2, F3, F4 and the INFO item).

Run against the live host: python3 tools/browser-checks/k1601_api.py
Requires the plugin to be reloaded after the host code changed.

Everything this script writes to the shared policy is put back; the last step re-saves the canonical rule and
verifies the file is byte-identical to the baseline and that all ten boards are canonical again.
"""
import hashlib
import json
import subprocess
import sys
import time

ORCH = 'http://192.168.64.230:3080/api/kanban-orch'
KANBAN = 'http://192.168.64.230:3080/api/kanban'
JAR = '/tmp/dshjar.txt'
GP = '/home/viz/.dsh/kanban-orch.global.json'
WS = '06789358-f92f-4ebf-b0d2-33866aa3c6cd'  # team_test_v2: orchestrator disabled, so nothing is pulled
CANON = ['Todo', 'Ready', 'In Progress', 'Test', 'Review', 'Done']
ROLES = {'In Progress': 'developer', 'Test': 'tester', 'Review': 'reviewer'}
EXTRA = ['ZZ-1', 'ZZ-2', 'ZZ-3', 'ZZ-4', 'ZZ-5', 'ZZ-6']


def md5():
    return hashlib.md5(open(GP, 'rb').read()).hexdigest()


def post(url, payload):
    p = subprocess.run(['curl', '-s', '-m', '40', '-b', JAR, '-X', 'POST', url,
                        '-H', 'content-type: application/json', '-d', json.dumps(payload),
                        '-w', '\nHTTPCODE:%{http_code}'], capture_output=True, text=True)
    out = p.stdout
    i = out.rfind('\nHTTPCODE:')
    code = out[i + len('\nHTTPCODE:'):].strip()
    try:
        data = json.loads(out[:i])
    except Exception:
        data = {'_raw': out[:i][:180]}
    return code, data


def rows(titles):
    out = []
    for t in titles:
        r = {'title': t}
        if t in ROLES:
            r['role'] = ROLES[t]
        out.append(r)
    return out


def policy(cols, src='Ready', done='Done', **kw):
    p = {'columns': rows(cols), 'wipLimit': 1, 'autoPull': True, 'pullOrder': 'priority', 'enforceWip': True,
         'stampAssignments': True, 'labelAssignments': True, 'dispatchEnabled': False, 'dispatchModel': None,
         'sourceColumnTitle': src, 'doneColumnTitle': done}
    p.update(kw)
    return p


def boards_list():
    # The board list lives on the orchestrator route (method 'workspaces'); /api/kanban has no such method.
    code, data = post(ORCH, {'method': 'workspaces', 'args': {}})
    items = data.get('workspaces') or data.get('boards') or []
    out = []
    for it in items:
        wid = it.get('id') or it.get('workspaceId')
        if not wid:
            continue
        c2, d = post(KANBAN, {'method': 'get', 'args': {'workspaceId': wid}})
        board = (d or {}).get('board') or {}
        cols = [str(c.get('title', '')).strip() for c in (board.get('columns') or [])]
        out.append({'id': wid, 'title': it.get('title') or wid, 'columns': cols, 'completed': board.get('completedColumnId')})
    return out


fails = 0


def check(name, ok, detail=''):
    global fails
    if not ok:
        fails += 1
    print(('PASS ' if ok else 'FAIL ') + name + (' | ' + detail if detail else ''))


def main():
    mode = sys.argv[1] if len(sys.argv) > 1 else 'all'
    base = md5()
    print('baseline md5:', base)

    if mode in ('all', 'model'):
        # F3: a non-empty Model field that cannot be read must be refused, and the file must not move.
        for bad in ['noseparator', 'acme/', '/model', '   /  ']:
            before = md5()
            code, data = post(ORCH, {'method': 'saveColumns', 'args': {'workspaceId': WS, 'policy': policy(CANON, dispatchModel=bad)}})
            check('model ' + repr(bad) + ' -> 400', code == '400' and bool((data or {}).get('error')),
                  'http ' + code + ' error=' + repr((data or {}).get('error', ''))[:90] + ' file-unchanged=' + str(md5() == before))
        before = md5()
        code, data = post(ORCH, {'method': 'saveColumns', 'args': {'workspaceId': WS, 'policy': policy(CANON, dispatchModel='a/b/c')}})
        eff = (data or {}).get('shared', {}).get('dispatchModel') or {}
        check('model a/b/c -> stored as a + b/c', code == '200' and eff.get('provider') == 'a' and eff.get('model') == 'b/c',
              'http ' + code + ' stored=' + json.dumps(eff))
        code, data = post(ORCH, {'method': 'saveColumns', 'args': {'workspaceId': WS, 'policy': policy(CANON, dispatchModel=None)}})
        check('empty model still legal', code == '200', 'http ' + code)
        print('file back to baseline md5:', md5() == base or md5())

    if mode in ('all', 'wip'):
        # F4: a fractional WIP limit is refused, whole numbers are accepted.
        for bad in [1.5, 0, 21, '2.5']:
            before = md5()
            code, data = post(ORCH, {'method': 'saveColumns', 'args': {'workspaceId': WS, 'policy': policy(CANON, wipLimit=bad)}})
            check('wipLimit ' + repr(bad) + ' -> 400', code == '400', 'http ' + code + ' error=' + repr((data or {}).get('error', ''))[:60] + ' file-unchanged=' + str(md5() == before))
        code, data = post(ORCH, {'method': 'saveColumns', 'args': {'workspaceId': WS, 'policy': policy(CANON, wipLimit=3)}})
        check('wipLimit 3 accepted', code == '200' and ((data or {}).get('shared') or {}).get('wipLimit') == 3, 'http ' + code)
        post(ORCH, {'method': 'saveColumns', 'args': {'workspaceId': WS, 'policy': policy(CANON, wipLimit=1)}})

    if mode in ('all', 'info'):
        code, data = post(ORCH, {'method': 'getPolicy', 'args': {'workspaceId': WS}})
        eff = (data or {}).get('effective') or {}
        need = ['tickMs', 'wipLimit', 'autoPull', 'pullOrder', 'enforceWip', 'stampAssignments', 'labelAssignments',
                'dispatchEnabled', 'dispatchModel', 'uiRefreshSec']
        missing = [k for k in need if k not in eff]
        check('effective carries every scalar the engine runs on', not missing, 'missing=' + json.dumps(missing) +
              ' tickMs=' + str(eff.get('tickMs')) + ' dispatchModel=' + json.dumps(eff.get('dispatchModel')))

    if mode in ('all', 'columns'):
        # F2: a 12-title rule must not duplicate a column a board already carries, and coming back to six titles
        # must remove the empty leftovers while a column that holds cards is kept and reported.
        before = md5()
        code, data = post(ORCH, {'method': 'saveColumns', 'args': {'workspaceId': WS, 'policy': policy(CANON + EXTRA)}})
        print('12-column save: http ' + code)
        time.sleep(2)
        listed = boards_list()
        dup_boards = [b['title'] for b in listed if len(set(b['columns'])) != len(b['columns'])]
        check('no duplicated column titles on any board', not dup_boards, 'dups on ' + json.dumps(dup_boards[:6]))
        extras_seen = {b['title']: [c for c in b['columns'] if c.startswith('ZZ-')] for b in listed if any(c.startswith('ZZ-') for c in b['columns'])}
        print('boards carrying ZZ-*: ' + str(len(extras_seen)))

        # Put one card into an extra column: that column must survive the way back and be reported as kept.
        zz3 = None
        for b in boards_list():
            if b['id'] != WS:
                continue
            c2, d = post(KANBAN, {'method': 'get', 'args': {'workspaceId': WS}})
            for c in ((d or {}).get('board') or {}).get('columns', []):
                if str(c.get('title', '')).strip() == 'ZZ-3':
                    zz3 = c.get('id')
        card_id = None
        if zz3:
            c2, made = post(KANBAN, {'method': 'addCard', 'args': {'workspaceId': WS, 'title': 'K1601 kept probe', 'columnId': zz3}})
            card_id = ((made or {}).get('card') or {}).get('id') or (made or {}).get('id')
        print('probe card ' + str(card_id) + ' in ZZ-3 ' + str(zz3))
        code, data = post(ORCH, {'method': 'saveColumns', 'args': {'workspaceId': WS, 'policy': policy(CANON)}})
        kept = (data or {}).get('columnsKept') or []
        removed = (data or {}).get('columnsRemoved') or []
        check('column with cards is kept, not destroyed', any(k.get('title') == 'ZZ-3' for k in kept),
              'kept=' + json.dumps(kept)[:220])
        check('empty leftovers are removed on a saved rule', sum(1 for r in removed if str(r.get('title', '')).startswith('ZZ-')) >= 5,
              'removed ZZ count=' + str(sum(1 for r in removed if str(r.get('title', '')).startswith('ZZ-'))))
        if card_id:
            post(KANBAN, {'method': 'deleteCard', 'args': {'workspaceId': WS, 'id': card_id}})
        for b in boards_list():
            if b['id'] != WS:
                continue
            for c in (post(KANBAN, {'method': 'get', 'args': {'workspaceId': WS}})[1].get('board') or {}).get('columns', []):
                if str(c.get('title', '')).strip().startswith('ZZ-'):
                    post(KANBAN, {'method': 'deleteColumn', 'args': {'workspaceId': WS, 'id': c.get('id')}})
        time.sleep(2)

    if mode in ('all', 'restore'):
        code, data = post(ORCH, {'method': 'saveColumns', 'args': {'workspaceId': WS, 'policy': policy(CANON)}})
        time.sleep(2)
        listed = boards_list()
        bad = []
        for b in listed:
            titles = [t for t in b['columns']]
            if titles != CANON:
                bad.append(b['title'] + ' -> ' + json.dumps(titles))
        check('all boards canonical again', not bad, 'off: ' + json.dumps(bad[:8]) + ' boards=' + str(len(listed)))
        check('policy file byte-identical to baseline', md5() == base, 'now ' + md5())

    print('FAILURES:', fails)
    return 1 if fails else 0


sys.exit(main())
