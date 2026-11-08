var WF_STYLE = '.kanban-wf{position:fixed;inset:16px;max-height:calc(100vh - 32px);z-index:60;display:flex;flex-direction:column;max-width:640px;margin:0 auto;background:var(--dsw-alias-fill-primary,#101317);border:1px solid var(--dsw-alias-border-primary,#26292f);border-radius:10px;box-shadow:0 18px 48px rgba(0,0,0,.45);overflow:hidden}\
.kanban-wf-head{display:flex;align-items:flex-start;justify-content:space-between;gap:10px;padding:10px 14px;border-bottom:1px solid var(--dsw-alias-border-primary,#26292f)}\
.kanban-wf-title{font:600 14px var(--dsw-font-xxs-12,sans-serif);color:var(--dsw-alias-label-primary,#f5f6f7);display:flex;gap:8px;align-items:center}\
.kanban-wf-sub{font:12px var(--dsw-font-xxs-12,sans-serif);color:var(--dsw-alias-label-secondary,#9aa1ab);margin:3px 0 0;max-width:440px}\
.kanban-wf-body{overflow:auto;padding:12px 14px;display:flex;flex-direction:column;gap:14px}\
.kanban-wf-section{border:1px solid var(--dsw-alias-border-secondary,#202328);border-radius:8px;padding:10px 12px;display:flex;flex-direction:column;gap:8px}\
.kanban-wf-section-head{display:flex;align-items:flex-start;justify-content:space-between;gap:8px}\
.kanban-wf-caption{font:600 12px var(--dsw-font-xxs-12,sans-serif);color:var(--dsw-alias-label-primary,#f5f6f7)}\
.kanban-wf-section-sub{font:11px var(--dsw-font-xxs-12,sans-serif);color:var(--dsw-alias-label-secondary,#9aa1ab);margin:2px 0 0}\
.kanban-wf-scope{font:11px var(--dsw-font-xxs-12,sans-serif);padding:2px 7px;border-radius:5px;background:var(--dsw-alias-fill-tertiary,rgba(120,130,145,.12));color:var(--dsw-alias-label-secondary,#9aa1ab);white-space:nowrap;max-width:220px;overflow:hidden;text-overflow:ellipsis}\
.kanban-wf-row{display:grid;grid-template-columns:12px minmax(90px,1fr) minmax(96px,1fr) minmax(88px,1fr) auto auto;gap:8px;align-items:center}\
.kanban-wf-dot{width:10px;height:10px;border-radius:50%;border:2px solid var(--dsw-alias-border-primary,#3a3f47);background:transparent}\
.kanban-wf-dot[data-filled="1"]{background:var(--dsw-alias-label-secondary,#9aa1ab);border-color:var(--dsw-alias-label-secondary,#9aa1ab)}\
.kanban-wf-row input,.kanban-wf-row select{font:12px var(--dsw-font-xxs-12,sans-serif);padding:4px 8px;border-radius:6px;border:1px solid var(--dsw-alias-border-primary,#26292f);background:var(--dsw-alias-fill-secondary,#171a1f);color:var(--dsw-alias-label-primary,#f5f6f7)}\
.kanban-wf-row-invalid input{border:1px solid #f6a3a3}\
.kanban-wf-tools{display:flex;gap:6px;flex-wrap:wrap;align-items:center}\
.kanban-wf-note{font:12px var(--dsw-font-xxs-12,sans-serif);color:var(--dsw-alias-label-secondary,#9aa1ab);display:flex;gap:6px;align-items:center}\
.kanban-wf-muted{font:11px var(--dsw-font-xxs-12,sans-serif);color:var(--dsw-alias-label-secondary,#9aa1ab)}\
.kanban-wf-field{display:flex;gap:8px;align-items:center;font:12px var(--dsw-font-xxs-12,sans-serif);color:var(--dsw-alias-label-primary,#f5f6f7)}\
.kanban-wf-error{color:#f6a3a3;font:12px var(--dsw-font-xxs-12,sans-serif)}\
.kanban-wf-ok{color:#8fd6a4;font:12px var(--dsw-font-xxs-12,sans-serif)}\
.kanban-wf-foot{display:flex;align-items:center;justify-content:space-between;gap:10px;padding:10px 14px;border-top:1px solid var(--dsw-alias-border-primary,#26292f)}\
.kanban-wf-foot button,.kanban-wf-tools button{white-space:nowrap}.kanban-wf-tools input{min-width:150px}.kanban-wf-skeleton{height:30px;border-radius:6px;background:var(--dsw-alias-fill-secondary,#171a1f)}\
.kanban-wf-close{display:flex;gap:8px;align-items:center;flex-wrap:wrap}\
.kanban-toolbar-board-name{flex:none;display:inline-block;max-width:160px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;font-size:12px;line-height:1.4;padding:3px 8px;border-radius:6px;color:var(--dsw-alias-label-secondary,#9aa1ab);background:var(--dsw-alias-fill-tertiary,rgba(120,130,145,.12));vertical-align:middle}\
.kanban-toolbar-board-name.is-skeleton{width:80px;min-height:14px;padding:0;background:var(--dsw-alias-fill-secondary,#171a1f)}\
@media (max-width:980px){.kanban-wf{inset:8px}.kanban-wf-row{grid-template-columns:12px 1fr 1fr;grid-auto-rows:auto}}';
var WF_MAX_COLUMNS = 12;
function KanbanWorkflowEditor(e){
  var open = e.open, onOpenChange = e.onOpenChange, workspaceId = e.workspaceId, reload = e.reload;
  var st = (0, pe.useState)(null), rows = st[0], setRows = st[1];
  var ex = (0, pe.useState)({ enabled: false }), extra = ex[0], setExtra = ex[1];
  var ro = (0, pe.useState)([]), roles = ro[0], setRoles = ro[1];
  var bo = (0, pe.useState)([]), boards = bo[0], setBoards = bo[1];
  var bc = (0, pe.useState)([]), boardCols = bc[0], setBoardCols = bc[1];
  var bu = (0, pe.useState)(false), busy = bu[0], setBusy = bu[1];
  var ms = (0, pe.useState)(null), msg = ms[0], setMsg = ms[1];
  var er = (0, pe.useState)(null), err = er[0], setErr = er[1];
  var fa = (0, pe.useState)(null), fatal = fa[0], setFatal = fa[1];
  var nw = (0, pe.useState)(''), newTitle = nw[0], setNewTitle = nw[1];
  var dy = (0, pe.useState)(false), dirty = dy[0], setDirty = dy[1];
  var cq = (0, pe.useState)(false), confirmClose = cq[0], setConfirmClose = cq[1];
  var sv = (0, pe.useState)(null), savedState = sv[0], setSavedState = sv[1];
  var t = (0, De)();
  function text(key, fallback) { var v = t(key); return (v === key || !v) ? fallback : v; }
  function fill(s, varName, value) { return String(s).split('{' + varName + '}').join(String(value)); }
  function load() {
    setFatal(null);
    Promise.all([La('getPolicy', { workspaceId: workspaceId }), un('roles', {}, workspaceId), La('workspaces', {})])
      .then(function (res) {
        var pol = res[0] || {}, shared = pol.shared || {}, titles = shared.sharedTitles || {}, byTitle = titles.columnRolesByTitle || {};
        var cols = (titles.columns || []).map(function (title) {
          var kind = 'flow';
          if ((titles.sourceColumnTitles || []).indexOf(title) >= 0) kind = 'source';
          else if (titles.entryColumnTitle === title) kind = 'entry';
          else if ((titles.doneColumnTitles || []).indexOf(title) >= 0) kind = 'done';
          return { title: title, role: byTitle[title] || '', kind: kind };
        });
        setRows(cols);
        setExtra({
          wipLimit: shared.wipLimit == null ? 1 : shared.wipLimit,
          autoPull: shared.autoPull !== false,
          enforceWip: shared.enforceWip !== false,
          pullOrder: shared.pullOrder || 'priority',
          stampAssignments: shared.stampAssignments !== false,
          labelAssignments: shared.labelAssignments !== false,
          dispatchEnabled: shared.dispatchEnabled === true,
          dispatchModel: shared.dispatchModel ? String(shared.dispatchModel.provider || '') + '/' + String(shared.dispatchModel.model || '') : '',
          enabled: !!(pol.effective && pol.effective.enabled)
        });
        setRoles(((res[1] && res[1].roles) || []).filter(function (x) { return /^(team-)?(manager|developer|tester|reviewer|designer|researcher)$/.test(String(x)); }));
        setBoards((res[2] && res[2].workspaces) || []);
        setBoardCols(((pol.boardColumns) || []).map(function (c) { return String(c.title || '').trim(); }));
        setDirty(false); setErr(null); setSavedState(null);
      })
      .catch(function (x) { setFatal(String((x && x.message) || x)); });
  }
  (0, pe.useEffect)(function () { if (!open) return; setConfirmClose(false); setMsg(null); load(); }, [open, workspaceId]);
  (0, pe.useEffect)(function () { if (rows === null) return; setErr(problems()); }, [rows, extra]);
  (0, pe.useEffect)(function () {
    if (!open) return;
    function onKey(ev) { if (ev.key === 'Escape') attemptClose(); }
    window.addEventListener('keydown', onKey);
    return function () { window.removeEventListener('keydown', onKey); };
  }, [open, dirty]);
  if (!open) return null;
  function attemptClose() { if (dirty) { setConfirmClose(true); return; } onOpenChange(false); }
  function patchRow(i, part) { setDirty(true); setRows((rows || []).map(function (r, j) { return j === i ? Object.assign({}, r, part) : r; })); }
  function moveRow(i, dir) {
    var list = (rows || []).slice(); var j = i + dir;
    if (j < 0 || j >= list.length) return;
    setDirty(true);
    var tmp = list[i]; list[i] = list[j]; list[j] = tmp; setRows(list);
  }
  function removeRow(i) { setDirty(true); setRows((rows || []).filter(function (_, j) { return j !== i; })); }
  function addColumn() {
    var name = String(newTitle || '').trim();
    if (!name) return;
    if ((rows || []).some(function (r) { return r.title.trim().toLowerCase() === name.toLowerCase(); })) { setErr(text('wfDupColumn', 'A column with this name already exists')); return; }
    setDirty(true); setErr(null);
    setRows((rows || []).concat([{ title: name.slice(0, 60), role: '', kind: 'flow' }]));
    setNewTitle('');
  }
  function problems() {
    var list = rows || [];
    if (!list.length) return text('wfColumnsEmpty', 'The workflow needs at least one column');
    var seen = {};
    for (var i = 0; i < list.length; i++) {
      var name = list[i].title.trim().toLowerCase();
      if (!name) return text('wfColumnsEmpty', 'The workflow needs at least one column');
      if (seen[name]) return text('wfDupColumn', 'A column with this name already exists');
      seen[name] = 1;
    }
    if (list.filter(function (r) { return r.kind === 'entry'; }).length > 1) return text('wfOneEntry', 'Only one entry column is allowed');
    var wip = Number(extra.wipLimit);
    if (!(wip >= 1 && wip <= 20)) return text('wfWipRange', 'WIP limit must be 1-20');
    return null;
  }
  function save() {
    var bad = problems();
    if (bad) { setErr(bad); return; }
    setBusy(true); setErr(null); setMsg(null);
    var policy = {
      columns: rows, wipLimit: Number(extra.wipLimit), autoPull: !!extra.autoPull, enforceWip: !!extra.enforceWip,
      pullOrder: extra.pullOrder, stampAssignments: !!extra.stampAssignments, labelAssignments: !!extra.labelAssignments,
      dispatchEnabled: !!extra.dispatchEnabled, dispatchModel: extra.dispatchModel || null
    };
    La('saveColumns', { workspaceId: workspaceId, policy: policy }).then(function (r) {
      setBusy(false);
      if (!r || r.error) { setErr(fill(text('wfSaveFailed', 'Could not save the rule: {detail}'), 'detail', String((r && r.error) || ''))); return; }
      setMsg(fill(text('wfSaved', 'Rule saved - boards updated: {n}'), 'n', (r.boards || []).length));
      setDirty(false);
      if (reload) reload();
    }).catch(function (x) {
      setBusy(false);
      setErr(fill(text('wfSaveFailed', 'Could not save the rule: {detail}'), 'detail', String((x && x.message) || x)));
    });
  }
  function toggleBoard() {
    La('setEnabled', { workspaceId: workspaceId, enabled: !extra.enabled }).then(function (r) {
      setExtra(Object.assign({}, extra, { enabled: !!(r && r.enabled) }));
      setSavedState(r && !r.error ? text('wfBoardSaved', 'saved') : fill(text('wfBoardSaveFailed', 'Could not switch: {detail}'), 'detail', String((r && r.error) || 'request failed')));
      if (reload) reload();
    }).catch(function (x) {
      setSavedState(fill(text('wfBoardSaveFailed', 'Could not switch: {detail}'), 'detail', String((x && x.message) || x)));
    });
  }
  function onBoard(title) { return boardCols.indexOf(title) >= 0; }
  var extraCols = boardCols.filter(function (title) { return title && (rows || []).every(function (r) { return r.title.trim() !== title; }); });
  function switchRow(key, fallback, on, field) {
    return (0, W.jsxs)('label', { className: 'kanban-wf-note', children: [
      (0, W.jsx)('input', { type: 'checkbox', checked: !!on, onChange: function (ev) { setDirty(true); setExtra(Object.assign({}, extra, (function () { var o = {}; o[field] = ev.target.checked; return o; })())); } }),
      text(key, fallback)
    ] }, key);
  }
  var kinds = [['flow', 'wfKindFlow', 'Flow'], ['source', 'wfKindSource', 'Source'], ['entry', 'wfKindEntry', 'Entry'], ['done', 'wfKindDone', 'Done']];
  var dup = {}, seen2 = {};
  (rows || []).forEach(function (r) { var n = r.title.trim().toLowerCase(); if (seen2[n]) dup[n] = 1; seen2[n] = 1; });
  var atLimit = (rows || []).length >= WF_MAX_COLUMNS;
  var wsName = window.__kanbanWsTitle || workspaceId || '';
  return (0, W.jsxs)('div', { className: 'kanban-wf', role: 'dialog', 'aria-modal': 'true', 'aria-label': text('wfTitle', 'Workflow'), children: [
    (0, W.jsxs)('div', { className: 'kanban-wf-head', children: [
      (0, W.jsxs)('div', { children: [
        (0, W.jsxs)('div', { className: 'kanban-wf-title', children: [text('wfTitle', 'Workflow'), (0, W.jsx)('span', { className: 'kanban-wf-scope', children: text('wfScopeAll', 'all boards') })] }),
        (0, W.jsx)('p', { className: 'kanban-wf-sub', children: fill(text('wfAppliesTo', 'Applied to all boards ({n} workspaces).'), 'n', boards.length || 1) })
      ] }),
      (0, W.jsx)('button', { className: 'kanban-toolbar-button', type: 'button', 'aria-label': text('wfClose', 'Close'), onClick: attemptClose, children: '\u2715' })
    ] }),
    (0, W.jsxs)('div', { className: 'kanban-wf-body', children: [
      rows === null ? (0, W.jsxs)('div', { children: [
        (0, W.jsx)('div', { className: 'kanban-wf-skeleton' }),
        (0, W.jsx)('div', { className: 'kanban-wf-skeleton', style: { marginTop: 8 } }),
        (0, W.jsx)('div', { className: 'kanban-wf-skeleton', style: { marginTop: 8, width: '60%' } })
      ] }) : null,
      fatal ? (0, W.jsxs)('div', { children: [
        (0, W.jsx)('p', { className: 'kanban-wf-error', role: 'alert', children: fill(text('wfSaveFailed', 'Could not save the rule: {detail}'), 'detail', fatal) }),
        (0, W.jsx)('button', { className: 'kanban-toolbar-button', type: 'button', onClick: load, children: text('wfRetry', 'Retry') })
      ] }, 'fatal') : null,
      err ? (0, W.jsx)('p', { id: 'kanban-wf-error', className: 'kanban-wf-error', role: 'alert', children: err }, 'inline') : null,
      (0, W.jsxs)('div', { className: 'kanban-wf-section', children: [
        (0, W.jsxs)('div', { className: 'kanban-wf-section-head', children: [
          (0, W.jsxs)('div', { children: [
            (0, W.jsx)('div', { className: 'kanban-wf-caption', children: text('wfColumns', 'Columns') }),
            (0, W.jsx)('p', { className: 'kanban-wf-section-sub', children: text('wfColumnsHint', 'Order defines the flow. Roles bind columns to team roles.') })
          ] }),
          (0, W.jsx)('span', { className: 'kanban-wf-scope', children: text('wfScopeAll', 'all boards') })
        ] }),
        rows !== null && rows.length === 0 ? (0, W.jsx)('p', { className: 'kanban-wf-muted', children: text('wfColumnsEmpty', 'The workflow needs at least one column') }, 'empty') : null,
        (rows || []).map(function (r, i) {
          var isDup = !!dup[r.title.trim().toLowerCase()];
          return (0, W.jsxs)('div', { className: 'kanban-wf-row' + (isDup ? ' kanban-wf-row-invalid' : ''), children: [
            (0, W.jsx)('span', { className: 'kanban-wf-dot', 'data-filled': onBoard(r.title.trim()) ? '1' : '0', 'aria-label': onBoard(r.title.trim()) ? text('wfOnBoard', 'Already on this board') : text('wfWillCreate', 'Will be created on save') }),
            (0, W.jsx)('input', { value: r.title, maxLength: 60, 'aria-label': text('wfColumns', 'Columns'), 'aria-describedby': isDup ? 'kanban-wf-error' : undefined, onChange: function (ev) { patchRow(i, { title: ev.target.value }); } }),
            (0, W.jsxs)('select', { className: 'kanban-orch-select', value: r.role, 'aria-label': text('wfRole', 'Role'), onChange: function (ev) { patchRow(i, { role: ev.target.value }); }, children: [
              (0, W.jsx)('option', { value: '', children: text('wfNoRole', '- no role -') }, 'norole'),
              roles.map(function (name) { return (0, W.jsx)('option', { value: name, children: name }, name); }),
              r.role && roles.indexOf(r.role) < 0 ? (0, W.jsx)('option', { value: r.role, children: r.role }, r.role) : null
            ].filter(Boolean) }),
            (0, W.jsxs)('select', { className: 'kanban-orch-select', value: r.kind, 'aria-label': text('wfKind', 'Stage'), onChange: function (ev) { patchRow(i, { kind: ev.target.value }); }, children: kinds.map(function (k) { return (0, W.jsx)('option', { value: k[0], children: text(k[1], k[2]) }, k[0]); }) }),
            (0, W.jsxs)('span', { className: 'kanban-wf-tools', children: [
              (0, W.jsx)('button', { className: 'kanban-toolbar-button', type: 'button', 'aria-label': text('wfMoveUp', 'Move up'), title: text('wfMoveUp', 'Move up'), onClick: function () { moveRow(i, -1); }, children: '\u2191' }),
              (0, W.jsx)('button', { className: 'kanban-toolbar-button', type: 'button', 'aria-label': text('wfMoveDown', 'Move down'), title: text('wfMoveDown', 'Move down'), onClick: function () { moveRow(i, 1); }, children: '\u2193' }),
              (0, W.jsx)('button', { className: 'kanban-toolbar-button', type: 'button', 'aria-label': text('wfRemove', 'Remove'), title: text('wfRemove', 'Remove'), onClick: function () { removeRow(i); }, children: '\u2715' })
            ] })
          ] }, r.title + ':' + i);
        }),
        extraCols.length ? (0, W.jsx)('p', { className: 'kanban-wf-muted', children: fill(text('wfExtraColumns', 'This board has columns outside the rule: {names}. They stay on the board but are not automated.'), 'names', extraCols.join(', ')) }, 'extra') : null,
        atLimit ? (0, W.jsx)('p', { className: 'kanban-wf-muted', children: text('wfMaxColumns', 'Maximum 12 columns') }, 'limit') : (0, W.jsxs)('div', { className: 'kanban-wf-tools', children: [
          (0, W.jsx)('input', { value: newTitle, maxLength: 60, 'aria-label': text('wfAdd', 'Add column'), placeholder: text('wfAdd', 'Add column'), onChange: function (ev) { setNewTitle(ev.target.value); }, onKeyDown: function (ev) { if (ev.key === 'Enter') addColumn(); } }),
          (0, W.jsx)('button', { className: 'kanban-toolbar-button', type: 'button', disabled: !String(newTitle || '').trim(), onClick: addColumn, children: text('wfAdd', 'Add column') })
        ] }, 'add')
      ] }),
      (0, W.jsxs)('div', { className: 'kanban-wf-section', children: [
        (0, W.jsxs)('div', { className: 'kanban-wf-section-head', children: [
          (0, W.jsxs)('div', { children: [
            (0, W.jsx)('div', { className: 'kanban-wf-caption', children: text('wfAutomation', 'Automation') }),
            (0, W.jsx)('p', { className: 'kanban-wf-section-sub', children: text('wfAutomationSub', 'Shared behaviour of the pipeline on every board.') })
          ] }),
          (0, W.jsx)('span', { className: 'kanban-wf-scope', children: text('wfScopeAll', 'all boards') })
        ] }),
        (0, W.jsxs)('label', { className: 'kanban-wf-field', children: [text('wfWip', 'WIP limit per column'), (0, W.jsx)('input', { type: 'number', min: 1, max: 20, value: extra.wipLimit, onChange: function (ev) { setDirty(true); setExtra(Object.assign({}, extra, { wipLimit: ev.target.value })); } })] }, 'wip'),
        (0, W.jsxs)('label', { className: 'kanban-wf-field', children: [text('wfPullOrder', 'Pull order'), (0, W.jsxs)('select', { className: 'kanban-orch-select', value: extra.pullOrder, onChange: function (ev) { setDirty(true); setExtra(Object.assign({}, extra, { pullOrder: ev.target.value })); }, children: [
          (0, W.jsx)('option', { value: 'priority', children: text('wfPullPriority', 'by priority') }, 'p'),
          (0, W.jsx)('option', { value: 'created', children: text('wfPullCreated', 'by creation') }, 'c')
        ] })] }, 'pull'),
        switchRow('wfAutoPull', 'Auto-pull cards', extra.autoPull, 'autoPull'),
        switchRow('wfEnforceWip', 'Enforce limit', extra.enforceWip, 'enforceWip'),
        switchRow('wfStamp', 'Assignee stamp on cards', extra.stampAssignments, 'stampAssignments'),
        switchRow('wfLabels', 'Label assignments', extra.labelAssignments, 'labelAssignments'),
        switchRow('wfDispatch', 'Dispatch to agents', extra.dispatchEnabled, 'dispatchEnabled'),
        (0, W.jsxs)('label', { className: 'kanban-wf-field', children: [text('wfDispatchModel', 'Model'), (0, W.jsx)('input', { value: extra.dispatchModel, 'aria-label': text('wfDispatchModel', 'Model'), placeholder: 'provider/model', onChange: function (ev) { setDirty(true); setExtra(Object.assign({}, extra, { dispatchModel: ev.target.value })); } })] }, 'model')
      ] }),
      (0, W.jsxs)('div', { className: 'kanban-wf-section', children: [
        (0, W.jsxs)('div', { className: 'kanban-wf-section-head', children: [
          (0, W.jsxs)('div', { children: [
            (0, W.jsx)('div', { className: 'kanban-wf-caption', title: wsName, children: fill(text('wfBoardOnly', 'This board - {name}'), 'name', wsName) }),
            (0, W.jsx)('p', { className: 'kanban-wf-section-sub', children: text('wfEnabledHint', 'Off: cards move only by hand and by the manager.') })
          ] }),
          (0, W.jsx)('span', { className: 'kanban-wf-scope', children: text('wfScopeBoard', 'this board only') })
        ] }),
        (0, W.jsxs)('label', { className: 'kanban-wf-note', children: [
          (0, W.jsx)('input', { type: 'checkbox', checked: !!extra.enabled, onChange: function () { toggleBoard(); } }),
          text('wfEnabled', 'Orchestrator on this board')
        ] }, 'wfEnabled'),
        savedState ? (0, W.jsx)('p', { className: savedState === text('wfBoardSaved', 'saved') ? 'kanban-wf-ok' : 'kanban-wf-error', children: savedState }, 'boardstate') : null
      ] })
    ].filter(Boolean) }),
    (0, W.jsxs)('div', { className: 'kanban-wf-foot', children: [
      confirmClose ? (0, W.jsxs)('div', { className: 'kanban-wf-close', children: [
        (0, W.jsx)('span', { className: 'kanban-wf-error', children: text('wfDiscardTitle', 'Changes are not saved') }),
        (0, W.jsx)('button', { className: 'kanban-toolbar-button', type: 'button', onClick: function () { onOpenChange(false); }, children: text('wfDiscard', 'Discard changes') }),
        (0, W.jsx)('button', { className: 'kanban-toolbar-button', type: 'button', onClick: function () { setConfirmClose(false); }, children: text('wfKeepEditing', 'Keep editing') })
      ] }, 'confirm') : msg ? (0, W.jsx)('p', { className: 'kanban-wf-ok', children: msg }, 'hint') : null,
      (0, W.jsx)('button', { className: 'kanban-toolbar-button', type: 'button', disabled: busy || rows === null || !dirty || !!problems(), onClick: save, children: busy ? text('wfSaving', 'Saving...') : text('wfSaveAll', 'Save for all boards') })
    ] })
  ] });
}
