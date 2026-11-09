var WF_STYLE = '.kanban-wf{position:fixed;inset:16px;max-height:calc(100vh - 32px);z-index:60;display:flex;flex-direction:column;max-width:640px;margin:0 auto;background:var(--dsw-alias-fill-primary,#101317);border:1px solid var(--dsw-alias-border-primary,#26292f);border-radius:10px;box-shadow:0 18px 48px rgba(0,0,0,.45);overflow:hidden}\
.kanban-wf-head{display:flex;align-items:flex-start;justify-content:space-between;gap:10px;padding:10px 14px;border-bottom:1px solid var(--dsw-alias-border-primary,#26292f)}\
.kanban-wf-title{font:600 14px var(--dsw-font-xxs-12,sans-serif);color:var(--dsw-alias-label-primary,#f5f6f7);display:flex;gap:8px;align-items:center}\
.kanban-wf-sub{font:12px var(--dsw-font-xxs-12,sans-serif);color:var(--dsw-alias-label-secondary,#9aa1ab);margin:3px 0 0;max-width:440px}\
.kanban-wf-body{overflow:auto;padding:12px 14px;display:flex;flex-direction:column;gap:14px}\
.kanban-wf-section{border:1px solid var(--dsw-alias-border-secondary,#202328);border-radius:8px;padding:10px 12px;display:flex;flex-direction:column;gap:8px}\
.kanban-wf-section-head{display:flex;align-items:flex-start;justify-content:space-between;gap:8px}\
.kanban-wf-section-head>div:first-child{min-width:0}.kanban-wf-section-head .kanban-wf-caption{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.kanban-wf-caption{font:600 12px var(--dsw-font-xxs-12,sans-serif);color:var(--dsw-alias-label-primary,#f5f6f7)}\
.kanban-wf-section-sub{font:11px var(--dsw-font-xxs-12,sans-serif);color:var(--dsw-alias-label-secondary,#9aa1ab);margin:2px 0 0}\
.kanban-wf-scope{flex:none;font:11px var(--dsw-font-xxs-12,sans-serif);padding:2px 7px;border-radius:5px;background:var(--dsw-alias-fill-tertiary,rgba(120,130,145,.12));color:var(--dsw-alias-label-secondary,#9aa1ab);white-space:nowrap}\
.kanban-wf-rows{position:relative;display:flex;flex-direction:column;gap:6px}\
.kanban-wf-row{display:grid;grid-template-columns:14px 40px minmax(120px,1fr) minmax(110px,1fr) 26px;grid-template-areas:"grip dot name role del";gap:8px;align-items:center}\
.kanban-wf-headrow{display:grid;grid-template-columns:14px 40px minmax(120px,1fr) minmax(110px,1fr) 26px;gap:8px;align-items:center;font:11px var(--dsw-font-xxs-12,sans-serif);color:var(--dsw-alias-label-secondary,#9aa1ab);padding:0 0 2px}\
.kanban-wf-headrow span{min-width:0;white-space:nowrap}.kanban-wf-headrow .h-dot{grid-column:1/3}.kanban-wf-headrow .h-name{grid-column:3}.kanban-wf-headrow .h-role{grid-column:4}.kanban-wf-headrow .h-del{grid-column:5}\
.kanban-wf-picks{display:flex;gap:12px;flex-wrap:wrap;margin-top:12px}.kanban-wf-picks .kanban-wf-field{flex:1 1 210px}\
.kanban-wf-a-grip{grid-area:grip}.kanban-wf-a-dot{grid-area:dot}.kanban-wf-a-name{grid-area:name}.kanban-wf-a-role{grid-area:role}.kanban-wf-a-del{grid-area:del;display:flex;gap:6px}\
.kanban-wf-grip{cursor:grab;font:12px var(--dsw-font-xxs-12,sans-serif);color:var(--dsw-alias-label-secondary,#9aa1ab);padding:2px 4px;border-radius:4px;border:1px solid transparent;line-height:1.2}\
.kanban-wf-grip:focus-visible{outline:2px solid var(--dsw-alias-label-primary,#f5f6f7);outline-offset:1px}.kanban-wf-grip[aria-pressed="true"]{color:var(--dsw-alias-label-primary,#f5f6f7);border-color:var(--dsw-alias-border-primary,#3a3f47)}\
.kanban-wf-row{cursor:grab}.kanban-wf-row input,.kanban-wf-row select{cursor:text}.kanban-wf-row button{cursor:default}\
.kanban-wf-row.is-dragging{opacity:.35;border:1px dashed var(--dsw-alias-border-primary,#3a3f47);cursor:grabbing}.kanban-wf-row.is-dragging input,.kanban-wf-row.is-dragging select{pointer-events:none}\
.kanban-wf-dropline{position:absolute;left:0;right:0;top:0;height:2px;border-radius:1px;background:var(--dsw-alias-label-secondary,#9aa1ab);visibility:hidden}\
.kanban-wf-dropline.is-active{visibility:visible;background:var(--dsw-alias-label-primary,#f5f6f7)}\
.kanban-wf-live{position:absolute;width:1px;height:1px;margin:-1px;overflow:hidden;clip-path:inset(50%);white-space:nowrap}\
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
.kanban-wf-foot button,.kanban-wf-tools button{white-space:nowrap}.kanban-wf-tools input{min-width:150px}.kanban-loading .kanban-toolbar-board-name{margin:0 0 10px}.kanban-wf-skeleton{height:30px;border-radius:6px;background:var(--dsw-alias-fill-secondary,#171a1f)}\
.kanban-wf-close{display:flex;gap:8px;align-items:center;flex-wrap:wrap}\
.kanban-toolbar-board-name{flex:none;display:inline-block;max-width:160px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;font-size:12px;line-height:1.4;padding:3px 8px;border-radius:6px;color:var(--dsw-alias-label-secondary,#9aa1ab);background:var(--dsw-alias-fill-tertiary,rgba(120,130,145,.12));vertical-align:middle}\
.kanban-toolbar-board-name.is-skeleton{width:80px;min-height:23px;padding:0;background:var(--dsw-alias-fill-secondary,#171a1f)}\
@media (max-width:980px){.kanban-wf{inset:8px}.kanban-wf-headrow,.kanban-wf-row{grid-template-columns:16px 46px minmax(96px,1fr) minmax(96px,1fr) 26px}}';
var WF_MAX_COLUMNS = 12;
var wfNewRowSeq = 0;
// R3.8 (k1601): drag state is module-level on purpose. A single panel is open at a time, and the drop
// handler plus the dragend handler have to see the same values regardless of which render they came from.
// R3.9c (tester F1): `target` is the single source of truth for a move - the 0-based index the dragged row
// will sit at, -1 when nothing is promised. `over`/`pos` are kept only as the last hover/keyboard markers.
var wfDrag = { from: -1, over: -1, grab: -1, pos: -1, target: -1, committed: false };
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
  var dz = (0, pe.useState)(-1), dragIdx = dz[0], setDragIdx = dz[1];
  var dp = (0, pe.useState)(-1), dropAt = dp[0], setDropAt = dp[1];
  var gb = (0, pe.useState)(-1), grabIdx = gb[0], setGrabIdx = gb[1];
  // R3.8e (reviewer B1): one stable id per row, fixed when the rows are loaded and moved along with them. The
  // render key used to be title + index, and a title changes on every keystroke, so React remounted the row and
  // the caret was lost after the first character - columns 2..N could not be typed into at all.
  var rk = (0, pe.useState)([]), rowKeys = rk[0], setRowKeys = rk[1];
  // R3.9: remembers that the caret has already been placed for this opening of the panel.
  var focusPlacedRef = (0, pe.useRef)(false);
  var lv = (0, pe.useState)(''), live = lv[0], setLive = lv[1];
  var t = (0, De)();
  function text(key, fallback) { var v = t(key); return (v === key || !v) ? fallback : v; }
  function fill(s, varName, value) { return String(s).split('{' + varName + '}').join(String(value)); }
  function load() {
    setFatal(null);
    Promise.all([La('getPolicy', { workspaceId: workspaceId }), un('roles', {}, workspaceId), La('workspaces', {})])
      .then(function (res) {
        var pol = res[0] || {}, shared = pol.shared || {}, titles = shared.sharedTitles || {}, byTitle = titles.columnRolesByTitle || {};
        // R3.9 (the human's requirement): a column carries a name and a role, nothing else. Where the dispatcher
        // takes work from and where work counts as finished are two settings of the rule, not a property of a row.
        var cols = (titles.columns || []).map(function (title) { return { title: title, role: byTitle[title] || '' }; });
        setRows(cols);
        // Keyed by the board column id when the name matches a column that already exists on the board; for a
        // column the rule knows but the board does not, the load-time position is the identity. Neither reads
        // the current title, so editing a name cannot change a key.
        var idByTitle = {};
        ((pol.boardColumns) || []).forEach(function (c) { idByTitle[String(c.title || '').trim().toLowerCase()] = String(c.id); });
        setRowKeys(cols.map(function (r, i) { return 'k' + i + '-' + (idByTitle[r.title.trim().toLowerCase()] || 'x'); }));
        setExtra({
          wipLimit: shared.wipLimit == null ? 1 : shared.wipLimit,
          autoPull: shared.autoPull !== false,
          enforceWip: shared.enforceWip !== false,
          pullOrder: shared.pullOrder || 'priority',
          stampAssignments: shared.stampAssignments !== false,
          labelAssignments: shared.labelAssignments !== false,
          dispatchEnabled: shared.dispatchEnabled === true,
          dispatchModel: shared.dispatchModel ? String(shared.dispatchModel.provider || '') + '/' + String(shared.dispatchModel.model || '') : '',
          sourceTitle: ((pol.shared && pol.shared.sharedTitles) || {}).sourceColumnTitles ? (((pol.shared.sharedTitles.sourceColumnTitles) || [])[0] || '') : '',
          doneTitle: ((pol.shared && pol.shared.sharedTitles) || {}).doneColumnTitles ? (((pol.shared.sharedTitles.doneColumnTitles) || [])[0] || '') : '',
          enabled: !!(pol.effective && pol.effective.enabled)
        });
        setRoles(((res[1] && res[1].roles) || []).filter(function (x) { return /^(team-)?(manager|developer|tester|reviewer|designer|researcher)$/.test(String(x)); }));
        setBoards((res[2] && res[2].workspaces) || []);
        setBoardCols(((pol.boardColumns) || []).map(function (c) { return String(c.title || '').trim(); }));
        setDirty(false); setErr(null); setSavedState(null);
      })
      .catch(function (x) { setFatal(String((x && x.message) || x)); });
  }
  (0, pe.useEffect)(function () {
    if (!open) return;
    // Minor (reviewer r38): wfDrag lives at module level, so a half-finished grab from a previous opening of the
    // panel could still be in it when the panel opens again. A new opening starts clean.
    wfDrag.from = -1; wfDrag.over = -1; wfDrag.grab = -1; wfDrag.pos = -1; wfDrag.target = -1; wfDrag.committed = false;
    setDragIdx(-1); setGrabIdx(-1); setDropAt(-1);
    focusPlacedRef.current = false;
    setConfirmClose(false); setMsg(null); load();
  }, [open, workspaceId]);
  (0, pe.useEffect)(function () { if (rows === null) return; setErr(problems()); }, [rows, extra]);

  // R3.7 (our fork): opening the screen puts the caret in the first column field; the marker focus trick keeps
  // it from stealing focus again after every keystroke.
  // R3.9 (the typing blocker): this effect used to depend on `rows`, so it ran after every keystroke and moved
  // the caret into the first field of the table - the remaining characters of the word were typed into row 1.
  // Putting the caret in the first field is a one-time part of opening the screen, so it belongs to the load, not
  // to every change of the list.
  (0, pe.useEffect)(function () {
    if (rows === null || focusPlacedRef.current) return;
    focusPlacedRef.current = true;
    var field = document.querySelector('.kanban-wf-row input');
    if (field) field.focus();
  }, [rows]);
  (0, pe.useEffect)(function () {
    if (!open) return;
    function onKey(ev) {
      if (ev.key !== 'Escape') return;
      if (wfDrag.from >= 0 || wfDrag.grab >= 0) { cancelMove(); ev.stopPropagation(); return; }
      attemptClose();
    }
    window.addEventListener('keydown', onKey);
    return function () { window.removeEventListener('keydown', onKey); };
  }, [open, dirty]);
  if (!open) return null;
  function attemptClose() { if (dirty) { setConfirmClose(true); return; } onOpenChange(false); }
  function patchRow(i, part) { setDirty(true); setRows((rows || []).map(function (r, j) { return j === i ? Object.assign({}, r, part) : r; })); }
  // R3.8 (k1601, прямое требование человека): порядок меняется перетаскиванием строки мышью.
  // Кнопки ↑/↓ из строки убраны; grip + Space/Enter + ↑/↓ — тот же самый перенос для клавиатуры.
  function rowTitle(i) { var list = rows || []; return (list[i] && list[i].title) ? list[i].title : ''; }
  function announce(key, fallback, name, n, total) {
    var line = fill(text(key, fallback), 'name', name);
    if (n !== undefined) line = fill(line, 'n', n);
    if (total !== undefined) line = fill(line, 'N', total);
    setLive(line);
    // R3.9c (tester F1): the dropline is painted straight into the DOM, so the announced position must be written
    // the same way. Going through React alone left the text one render behind the line and the committed move,
    // and a measurement saw «position 2» next to a line and a landing at position 6.
    var live = document.querySelector('.kanban-wf-live');
    if (live) live.textContent = line;
  }
  // R3.9c (k1601, tester F1): ONE source of truth for a move. `wfDrag.target` is the 0-based index the dragged
  // row will sit at (-1 = nothing is promised). The dropline, the live text and the commit are all derived from
  // that single number, so the panel can no longer promise «position 6» and land the row in another place.
  // A boundary is a gap between rows (0..length). Below the last row is the last boundary, above the first row
  // is the first one: a pointer that leaves the band lands on the edge the panel already drew instead of
  // silently cancelling a move the person was shown.
  function rowTotal() { return (rows || []).length; }
  function targetFromBoundary(from, boundary) {
    var total = rowTotal();
    if (from < 0 || boundary < 0 || !total) return -1;
    var target = boundary > from ? boundary - 1 : boundary;
    if (target < 0) target = 0;
    if (target > total - 1) target = total - 1;
    return target;
  }
  function boundaryForTarget(from, target) { return target >= from ? target + 1 : target; }
  function applyMoveTarget(from, target) {
    var list = (rows || []).slice();
    if (from < 0 || from >= list.length || target < 0 || target >= list.length || target === from) return false;
    var item = list.splice(from, 1)[0];
    list.splice(target, 0, item);
    setDirty(true); setRows(list);
    var keys = (rowKeys || []).slice();
    if (keys.length === list.length) { var kitem = keys.splice(from, 1)[0]; keys.splice(target, 0, kitem); setRowKeys(keys) }
    return target;
  }
  function droplineHost() { return document.querySelector('.kanban-wf-rows'); }
  function paintDropline(index) {
    var host = droplineHost();
    if (!host) return;
    var line = host.querySelector('.kanban-wf-dropline');
    if (!line) return;
    if (index < 0) { line.classList.remove('is-active'); return; }
    var kids = Array.prototype.slice.call(host.querySelectorAll('.kanban-wf-row'));
    var hostTop = host.getBoundingClientRect().top;
    var pos = 0;
    if (kids.length) {
      if (index === 0) pos = kids[0].getBoundingClientRect().top - hostTop;
      else if (index === kids.length) pos = kids[kids.length - 1].getBoundingClientRect().bottom - hostTop;
      else {
        var prev = kids[index - 1].getBoundingClientRect(); var next = kids[index].getBoundingClientRect();
        pos = (prev.bottom + next.top) / 2 - hostTop;
      }
    }
    line.style.top = Math.round(pos) + 'px';
    line.classList.add('is-active');
  }
  function boundaryAt(clientY) {
    var host = droplineHost();
    if (!host) return -1;
    var kids = Array.prototype.slice.call(host.querySelectorAll('.kanban-wf-row'));
    if (!kids.length) return 0;
    var first = kids[0].getBoundingClientRect();
    var last = kids[kids.length - 1].getBoundingClientRect();
    // Above the table the only place to land is the first boundary; below it - the last one. Before this the
    // pointer just outside the band produced no dragover at all, and the drop was cancelled even though the
    // panel had drawn a line and promised «position 1 of 6» / «position 6 of 6» (tester F1).
    if (clientY <= first.top) return 0;
    if (clientY >= last.bottom) return kids.length;
    for (var i = 0; i < kids.length; i++) {
      var rect = kids[i].getBoundingClientRect();
      if (clientY < rect.top + rect.height / 2) return i;
    }
    return kids.length;
  }
  function clearMove() {
    wfDrag.from = -1; wfDrag.over = -1; wfDrag.grab = -1; wfDrag.pos = -1; wfDrag.target = -1; wfDrag.committed = false;
    setDragIdx(-1); setGrabIdx(-1); setDropAt(-1); paintDropline(-1);
  }
  function cancelMove() {
    var name = rowTitle(wfDrag.from >= 0 ? wfDrag.from : wfDrag.grab);
    announce('wfDragCancel', '{name}: move cancelled', name);
    clearMove();
  }
  function startDrag(i, ev) {
    // R3.8 (tester D1): жест «зажать и вести» внутри поля или select — это правка самого контрола
    // (выделение текста, перетаскивание выделенного), а не перенос строки.
    var node = ev.target;
    var tag = node && node.tagName ? String(node.tagName) : '';
    if (tag === 'INPUT' || tag === 'SELECT' || tag === 'TEXTAREA' || tag === 'BUTTON') { ev.preventDefault(); return; }
    wfDrag.from = i; wfDrag.over = -1; wfDrag.pos = -1; wfDrag.target = -1; wfDrag.committed = false;
    setDragIdx(i); setDropAt(-1);
    announce('wfDragStart', '{name}: moving…', rowTitle(i));
    if (ev.dataTransfer) {
      ev.dataTransfer.effectAllowed = 'move';
      try { ev.dataTransfer.setData('text/plain', String(i)); } catch (ignored) {}
    }
  }
  // The dropline, the announced position and the commit are all written from wfDrag.target and nothing else.
  function showTarget(target) {
    var from = wfDrag.from >= 0 ? wfDrag.from : wfDrag.grab;
    if (target === wfDrag.target) return;
    wfDrag.target = target;
    if (from < 0 || target < 0 || target === from) {
      // Hovering the row's own slot: no promise, no line - dropping here cannot move the row anywhere.
      wfDrag.over = -1; wfDrag.pos = -1; setDropAt(-1); paintDropline(-1);
      return;
    }
    var boundary = boundaryForTarget(from, target);
    wfDrag.over = boundary; wfDrag.pos = target;
    setDropAt(boundary); paintDropline(boundary);
    announce('wfDragPosition', '{name}: position {n} of {N}', rowTitle(from), target + 1, rowTotal());
  }
  function overRows(ev) {
    if (wfDrag.from < 0 && wfDrag.grab < 0) return;
    ev.preventDefault();
    if (ev.dataTransfer) ev.dataTransfer.dropEffect = 'move';
    var from = wfDrag.from >= 0 ? wfDrag.from : wfDrag.grab;
    var boundary = boundaryAt(ev.clientY);
    if (boundary < 0) return;
    showTarget(targetFromBoundary(from, boundary));
  }
  function commitMove(ev) {
    var from = wfDrag.from >= 0 ? wfDrag.from : wfDrag.grab;
    var name = rowTitle(from);
    if (from < 0) { clearMove(); return; }
    // What is committed is the move the line was drawn for. The drop point is only the fallback for a release
    // that never produced a dragover, and it goes through the same measure the hover uses.
    var target = wfDrag.target;
    if (target < 0 && ev && typeof ev.clientY === 'number') target = targetFromBoundary(from, boundaryAt(ev.clientY));
    var landed = applyMoveTarget(from, target);
    wfDrag.committed = true;
    clearMove();
    if (landed === false) announce('wfDragCancel', '{name}: move cancelled', name);
    else announce('wfDragDrop', '{name}: moved to position {n}', name, landed + 1);
  }
  function dropRows(ev) { ev.preventDefault(); commitMove(ev); }
  function endDrag() {
    if (wfDrag.from >= 0 && !wfDrag.committed) { cancelMove(); return; }
    clearMove();
  }
  function gripKey(i, ev) {
    var key = ev.key;
    if (wfDrag.grab === i && (key === 'ArrowUp' || key === 'ArrowDown')) {
      ev.preventDefault();
      var total = rowTotal();
      // R3.9c (F1): the keyboard route uses the same single source as the mouse - the landing index - so its
      // line, its announced position and its commit can no longer disagree with each other.
      var target = wfDrag.target >= 0 ? wfDrag.target : i;
      if (key === 'ArrowDown') target = Math.min(target + 1, total - 1);
      else target = Math.max(target - 1, 0);
      showTarget(target);
      return;
    }
    if (key === ' ' || key === 'Enter') {
      ev.preventDefault();
      if (wfDrag.grab < 0) {
        // Grabbing a row does not promise anything yet: the row is still on its own slot, so no line and no
        // position are shown until an arrow actually moves it.
        wfDrag.grab = i; wfDrag.over = -1; wfDrag.pos = -1; wfDrag.target = i; wfDrag.committed = false;
        setGrabIdx(i); setDropAt(-1); paintDropline(-1);
        announce('wfDragStart', '{name}: moving…', rowTitle(i));
      } else { commitMove(); }
      return;
    }
    if (key === 'Escape' && wfDrag.grab === i) { ev.preventDefault(); cancelMove(); }
  }
  function removeRow(i) {
    setDirty(true);
    setRows((rows || []).filter(function (_, j) { return j !== i; }));
    setRowKeys((rowKeys || []).filter(function (_, j) { return j !== i; }));
  }
  function addColumn() {
    var name = String(newTitle || '').trim();
    if (!name) return;
    if ((rows || []).some(function (r) { return r.title.trim().toLowerCase() === name.toLowerCase(); })) { setErr(text('wfDupColumn', 'A column with this name already exists')); return; }
    setDirty(true); setErr(null);
    setRows((rows || []).concat([{ title: name.slice(0, 60), role: '', kind: 'flow' }]));
    wfNewRowSeq += 1;
    setRowKeys((rowKeys || []).concat(['new-' + wfNewRowSeq]));
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
    var src = String(extra.sourceTitle || '').trim();
    var dn = String(extra.doneTitle || '').trim();
    var has = function (name) { return list.some(function (r) { return r.title.trim().toLowerCase() === name.toLowerCase(); }); };
    if (!src) return text('wfNeedSource', 'Choose the column the dispatcher takes cards from');
    if (!dn) return text('wfNeedDone', 'Choose the column where a card counts as done');
    if (!has(src)) return text('wfSourceMissing', 'The column cards are taken from is not part of the rule');
    if (!has(dn)) return text('wfDoneMissing', 'The column where cards count as done is not part of the rule');
    if (src.toLowerCase() === dn.toLowerCase()) return text('wfSourceDoneSame', 'Work cannot be taken from and finished in the same column');
    var wip = Number(extra.wipLimit);
    if (!(wip >= 1 && wip <= 20)) return text('wfWipRange', 'WIP limit must be 1-20');
    // R3.9c (tester F4): 1.5 passed this gate, the host rounded it to 1 and nothing was ever said about it.
    if (String(extra.wipLimit).indexOf('.') >= 0 || !Number.isInteger(wip)) return text('wfWipWhole', 'WIP limit must be a whole number');
    // R3.9c (tester F3): this field is what the dispatcher would run on. A value that cannot be read used to be
    // saved with HTTP 200 and «Rule saved», then the stored value came back null and the typed text was gone.
    // One slash splits provider from model; the model part may itself contain slashes (a/b/c -> a + b/c).
    var model = String(extra.dispatchModel || '').trim();
    var slash = model.indexOf('/');
    if (model && (slash < 1 || slash === model.length - 1)) return text('wfModelShape', 'Model must be provider/model; the model name may itself contain a slash');
    return null;
  }
  function save() {
    var bad = problems();
    if (bad) { setErr(bad); return; }
    setBusy(true); setErr(null); setMsg(null);
    var policy = {
      columns: rows, wipLimit: Number(extra.wipLimit), autoPull: !!extra.autoPull, enforceWip: !!extra.enforceWip,
      pullOrder: extra.pullOrder, stampAssignments: !!extra.stampAssignments, labelAssignments: !!extra.labelAssignments,
      dispatchEnabled: !!extra.dispatchEnabled, dispatchModel: extra.dispatchModel || null,
      sourceColumnTitle: String(extra.sourceTitle || '').trim(), doneColumnTitle: String(extra.doneTitle || '').trim()
    };
    La('saveColumns', { workspaceId: workspaceId, policy: policy }).then(function (r) {
      setBusy(false);
      if (!r || r.error) { setErr(fill(text('wfSaveFailed', 'Could not save the rule: {detail}'), 'detail', String((r && r.error) || ''))); return; }
      setMsg(fill(text('wfSaved', 'Rule saved - boards updated: {n}'), 'n', (r.boards || []).length) + (function () {
        // R3.9c (tester F2): a column that holds cards and is not in the rule was kept, not destroyed. The person
        // has to read that here, not dig it out of a host log.
        var kept = r.columnsKept || [];
        if (!kept.length) return '';
        return ' | ' + fill(text('wfColumnsKept', 'Columns kept because they hold cards: {names}'), 'names',
          kept.map(function (c) { return c.board + ' · ' + c.title + ' (' + c.cards + ')'; }).join(', '));
      })());
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
  function onBoard(title) { var needle = String(title).trim().toLowerCase(); return boardCols.some(function (c) { return c.toLowerCase() === needle; }); }
  var extraCols = boardCols.filter(function (title) { var needle = String(title).trim().toLowerCase(); return title && (rows || []).every(function (r) { return r.title.trim().toLowerCase() !== needle; }); });
  function switchRow(key, fallback, on, field) {
    return (0, W.jsxs)('label', { className: 'kanban-wf-note', children: [
      (0, W.jsx)('input', { type: 'checkbox', 'aria-label': text(key, fallback), checked: !!on, onChange: function (ev) { setDirty(true); setExtra(Object.assign({}, extra, (function () { var o = {}; o[field] = ev.target.checked; return o; })())); } }),
      text(key, fallback)
    ] }, key);
  }
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
      ] }, 'skeleton') : null,
      fatal ? (0, W.jsxs)('div', { children: [
        (0, W.jsx)('p', { className: 'kanban-wf-error', role: 'alert', children: fill(text('wfLoadFailed', 'Could not read the settings: {detail}'), 'detail', fatal) }),
        (0, W.jsx)('button', { className: 'kanban-toolbar-button', type: 'button', onClick: load, children: text('wfRetry', 'Retry') })
      ] }, 'fatal') : null,
      err ? (0, W.jsx)('p', { id: 'kanban-wf-error', className: 'kanban-wf-error', role: 'alert', children: err }, 'inline') : null,
      // R3.9c (tester F1): the drop zone is the whole Columns section, not only the band of row strips. A
      // release just below the table or just above it used to hit nothing at all: no dragover, no drop, so the
      // dragend cancelled a move the panel had already promised as «position 1/6» or «position 6 of 6».
      (0, W.jsxs)('div', { className: 'kanban-wf-section', onDragOver: overRows, onDrop: dropRows, children: [
        (0, W.jsxs)('div', { className: 'kanban-wf-section-head', children: [
          (0, W.jsxs)('div', { children: [
            (0, W.jsx)('div', { className: 'kanban-wf-caption', children: text('wfColumns', 'Columns') }),
            (0, W.jsx)('p', { className: 'kanban-wf-section-sub', children: text('wfDragHint', 'Drag a row to reorder') }),
          ] }),
          (0, W.jsx)('span', { className: 'kanban-wf-scope', children: text('wfScopeAll', 'all boards') })
        ] }),
        rows !== null && rows.length === 0 ? (0, W.jsx)('p', { className: 'kanban-wf-muted', children: text('wfColumnsEmpty', 'The workflow needs at least one column') }, 'empty') : null,
        (0, W.jsxs)('div', { className: 'kanban-wf-headrow', 'aria-hidden': 'true', children: [
          (0, W.jsx)('span', { className: 'h-grip' }, 'hd-grip'),
          (0, W.jsx)('span', { className: 'h-dot', children: text('wfColOnBoard', 'On board') }, 'hd-dot'),
          (0, W.jsx)('span', { className: 'h-name', children: text('wfColName', 'Column') }, 'hd-name'),
          (0, W.jsx)('span', { className: 'h-role', children: text('wfColRole', 'Team role') }, 'hd-role'),
          (0, W.jsx)('span', { className: 'h-del' }, 'hd-del')
        ] }, 'headrow'),
        (0, W.jsxs)('div', { className: 'kanban-wf-rows', children: [
          (0, W.jsx)('div', { className: 'kanban-wf-dropline' + (dropAt >= 0 ? ' is-active' : ''), 'aria-hidden': 'true' }),
          (rows || []).map(function (r, i) {
            var isDup = !!dup[r.title.trim().toLowerCase()];
            var moving = dragIdx === i || grabIdx === i;
            var gripLabel = fill(text('wfReorder', 'Reorder {name}'), 'name', r.title);
            return (0, W.jsxs)('div', {
              className: 'kanban-wf-row' + (isDup ? ' kanban-wf-row-invalid' : '') + (moving ? ' is-dragging' : ''),
              draggable: true,
              onDragStart: function (ev) { startDrag(i, ev); },
              onDragEnd: function () { endDrag(); },
              children: [
                (0, W.jsx)('span', { className: 'kanban-wf-grip kanban-wf-a-grip', role: 'button', tabIndex: 0, 'aria-label': gripLabel, 'aria-pressed': grabIdx === i ? 'true' : 'false', title: gripLabel, onKeyDown: function (ev) { gripKey(i, ev); }, children: '\u283f' }, 'grip'),
                (0, W.jsx)('span', { className: 'kanban-wf-dot kanban-wf-a-dot', role: 'img', 'data-filled': onBoard(r.title.trim()) ? '1' : '0', 'aria-label': onBoard(r.title.trim()) ? text('wfOnBoard', 'Already on this board') : text('wfWillCreate', 'Will be created on save') }),
                (0, W.jsx)('input', { className: 'kanban-wf-a-name', value: r.title, maxLength: 60, draggable: false, 'aria-label': text('wfColName', 'Column'), 'aria-describedby': isDup ? 'kanban-wf-error' : undefined, onChange: function (ev) { patchRow(i, { title: ev.target.value }); } }),
                (0, W.jsxs)('select', { className: 'kanban-orch-select kanban-wf-a-role', value: r.role, draggable: false, 'aria-label': text('wfColRole', 'Team role'), onChange: function (ev) { patchRow(i, { role: ev.target.value }); }, children: [
                  (0, W.jsx)('option', { value: '', children: text('wfNoRole', '- no role -') }, 'norole'),
                  roles.map(function (name) { return (0, W.jsx)('option', { value: name, children: name }, name); }),
                  r.role && roles.indexOf(r.role) < 0 ? (0, W.jsx)('option', { value: r.role, children: r.role }, r.role) : null
                ].filter(Boolean) }),
                (0, W.jsxs)('span', { className: 'kanban-wf-del kanban-wf-a-del', children: [
                  (0, W.jsx)('button', { className: 'kanban-toolbar-button', type: 'button', draggable: false, 'aria-label': text('wfRemove', 'Remove column'), title: text('wfRemove', 'Remove column'), onClick: function () { removeRow(i); }, children: '\u2715' })
                ] })
              ]
            }, rowKeys[i] !== undefined ? rowKeys[i] : ('k' + i + '-' + r.title));
          })
        ] }, 'rows'),
        (0, W.jsxs)('div', { className: 'kanban-wf-picks', children: [
          (0, W.jsxs)('label', { className: 'kanban-wf-field', children: [text('wfSourceColumn', 'Cards are taken from'), (0, W.jsxs)('select', { className: 'kanban-orch-select', 'aria-label': text('wfSourceColumn', 'Cards are taken from'), value: extra.sourceTitle || '', draggable: false, onChange: function (ev) { setDirty(true); setExtra(Object.assign({}, extra, { sourceTitle: ev.target.value })); }, children: [
            (0, W.jsx)('option', { value: '', children: text('wfPickNone', '- choose a column -') }, 'none'),
            (rows || []).map(function (r) { return (0, W.jsx)('option', { value: r.title, children: r.title }, 's-' + r.title); })
          ].filter(Boolean) })] }, 'pick-source'),
          (0, W.jsxs)('label', { className: 'kanban-wf-field', children: [text('wfDoneColumn', 'Cards count as done in'), (0, W.jsxs)('select', { className: 'kanban-orch-select', 'aria-label': text('wfDoneColumn', 'Cards count as done in'), value: extra.doneTitle || '', draggable: false, onChange: function (ev) { setDirty(true); setExtra(Object.assign({}, extra, { doneTitle: ev.target.value })); }, children: [
            (0, W.jsx)('option', { value: '', children: text('wfPickNone', '- choose a column -') }, 'none'),
            (rows || []).map(function (r) { return (0, W.jsx)('option', { value: r.title, children: r.title }, 'd-' + r.title); })
          ].filter(Boolean) })] }, 'pick-done')
        ] }, 'picks'),
        extraCols.length ? (0, W.jsx)('p', { className: 'kanban-wf-muted', children: fill(text('wfExtraColumns', 'This board has columns outside the rule: {names}. They stay on the board but are not automated.'), 'names', extraCols.join(', ')) }, 'extra') : null,
        atLimit ? (0, W.jsx)('p', { className: 'kanban-wf-muted', children: text('wfMaxColumns', 'Maximum 12 columns') }, 'limit') : (0, W.jsxs)('div', { className: 'kanban-wf-tools', children: [
          (0, W.jsx)('input', { value: newTitle, maxLength: 60, 'aria-label': text('wfAdd', 'Add column'), placeholder: text('wfAdd', 'Add column'), onChange: function (ev) { setNewTitle(ev.target.value); }, onKeyDown: function (ev) { if (ev.key === 'Enter') addColumn(); } }),
          (0, W.jsx)('button', { className: 'kanban-toolbar-button', type: 'button', disabled: !String(newTitle || '').trim(), onClick: addColumn, children: text('wfAdd', 'Add column') })
        ] }, 'add'),
        (0, W.jsx)('div', { className: 'kanban-wf-live', 'aria-live': 'polite', children: live }, 'live')
      ] }, 'columns'),
      (0, W.jsxs)('div', { className: 'kanban-wf-section', children: [
        (0, W.jsxs)('div', { className: 'kanban-wf-section-head', children: [
          (0, W.jsxs)('div', { children: [
            (0, W.jsx)('div', { className: 'kanban-wf-caption', children: text('wfAutomation', 'Automation') }),
            (0, W.jsx)('p', { className: 'kanban-wf-section-sub', children: text('wfAutomationSub', 'Shared behaviour of the pipeline on every board.') })
          ] }),
          (0, W.jsx)('span', { className: 'kanban-wf-scope', children: text('wfScopeAll', 'all boards') })
        ] }),
        (0, W.jsxs)('label', { className: 'kanban-wf-field', children: [text('wfWip', 'WIP limit per column'), (0, W.jsx)('input', { type: 'number', min: 1, max: 20, step: 1, 'aria-label': text('wfWip', 'WIP limit per column'), value: extra.wipLimit, onChange: function (ev) { setDirty(true); setExtra(Object.assign({}, extra, { wipLimit: ev.target.value })); } })] }, 'wip'),
        (0, W.jsxs)('label', { className: 'kanban-wf-field', children: [text('wfPullOrder', 'Pull order'), (0, W.jsxs)('select', { className: 'kanban-orch-select', 'aria-label': text('wfPullOrder', 'Pull order'), value: extra.pullOrder, onChange: function (ev) { setDirty(true); setExtra(Object.assign({}, extra, { pullOrder: ev.target.value })); }, children: [
          (0, W.jsx)('option', { value: 'priority', children: text('wfPullPriority', 'by priority') }, 'p'),
          (0, W.jsx)('option', { value: 'created', children: text('wfPullCreated', 'by creation') }, 'c'),
          (0, W.jsx)('option', { value: 'board', children: text('wfPullBoard', 'board order') }, 'b')
        ] })] }, 'pull'),
        switchRow('wfAutoPull', 'Auto-pull cards', extra.autoPull, 'autoPull'),
        switchRow('wfEnforceWip', 'Enforce limit', extra.enforceWip, 'enforceWip'),
        switchRow('wfStamp', 'Assignee stamp on cards', extra.stampAssignments, 'stampAssignments'),
        switchRow('wfLabels', 'Label assignments', extra.labelAssignments, 'labelAssignments'),
        switchRow('wfDispatch', 'Dispatch to agents', extra.dispatchEnabled, 'dispatchEnabled'),
        (0, W.jsxs)('label', { className: 'kanban-wf-field', children: [text('wfDispatchModel', 'Model'), (0, W.jsx)('input', { value: extra.dispatchModel, placeholder: text('wfModelHint', 'provider/model'), 'aria-label': text('wfDispatchModel', 'Model'), placeholder: 'provider/model', onChange: function (ev) { setDirty(true); setExtra(Object.assign({}, extra, { dispatchModel: ev.target.value })); } })] }, 'model')
      ] }, 'automation'),
      (0, W.jsxs)('div', { className: 'kanban-wf-section', children: [
        (0, W.jsxs)('div', { className: 'kanban-wf-section-head', children: [
          (0, W.jsxs)('div', { children: [
            (0, W.jsx)('div', { className: 'kanban-wf-caption', title: wsName, children: fill(text('wfBoardOnly', 'This board - {name}'), 'name', wsName) }),
            (0, W.jsx)('p', { className: 'kanban-wf-section-sub', children: text('wfEnabledHint', 'Off: cards move only by hand and by the manager.') })
          ] }),
          (0, W.jsx)('span', { className: 'kanban-wf-scope', children: text('wfScopeBoard', 'this board only') })
        ] }),
        (0, W.jsxs)('label', { className: 'kanban-wf-note', children: [
          (0, W.jsx)('input', { type: 'checkbox', 'aria-label': text('wfEnabled', 'Orchestrator on this board'), checked: !!extra.enabled, onChange: function () { toggleBoard(); } }),
          text('wfEnabled', 'Orchestrator on this board')
        ] }, 'wfEnabled'),
        savedState ? (0, W.jsx)('p', { className: savedState === text('wfBoardSaved', 'saved') ? 'kanban-wf-ok' : 'kanban-wf-error', children: savedState }, 'boardstate') : null
      ] }, 'board')
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
