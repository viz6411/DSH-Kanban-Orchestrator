var WF_STYLE = '.kanban-wf{position:fixed;inset:16px;z-index:60;display:flex;flex-direction:column;background:var(--dsw-alias-fill-primary,#101317);border:1px solid var(--dsw-alias-border-primary,#26292f);border-radius:10px;box-shadow:0 18px 48px rgba(0,0,0,.45);overflow:hidden}.kanban-wf-head{display:flex;align-items:flex-start;justify-content:space-between;gap:10px;padding:10px 14px;border-bottom:1px solid var(--dsw-alias-border-primary,#26292f)}.kanban-wf-title{font:600 14px var(--dsw-font-xxs-12,sans-serif);color:var(--dsw-alias-label-primary,#f5f6f7)}.kanban-wf-sub{font:12px var(--dsw-font-xxs-12,sans-serif);color:var(--dsw-alias-label-secondary,#9aa1ab);margin:3px 0 0}.kanban-wf-body{overflow:auto;padding:12px 14px;display:flex;flex-direction:column;gap:14px}.kanban-wf-section{border:1px solid var(--dsw-alias-border-secondary,#202328);border-radius:8px;padding:10px 12px;display:flex;flex-direction:column;gap:8px}.kanban-wf-caption{font:600 12px var(--dsw-font-xxs-12,sans-serif);color:var(--dsw-alias-label-primary,#f5f6f7)}.kanban-wf-row{display:grid;grid-template-columns:minmax(120px,1fr) minmax(120px,1fr) minmax(110px,1fr) auto auto;gap:8px;align-items:center}.kanban-wf-row input,.kanban-wf-row select{font:12px var(--dsw-font-xxs-12,sans-serif);padding:4px 8px;border-radius:6px;border:1px solid var(--dsw-alias-border-primary,#26292f);background:var(--dsw-alias-fill-secondary,#171a1f);color:var(--dsw-alias-label-primary,#f5f6f7)}.kanban-wf-tools{display:flex;gap:6px;flex-wrap:wrap;align-items:center}.kanban-wf-note{font:12px var(--dsw-font-xxs-12,sans-serif);color:var(--dsw-alias-label-secondary,#9aa1ab)}.kanban-wf-error{color:#f6a3a3;font:12px var(--dsw-font-xxs-12,sans-serif)}.kanban-wf-ok{color:#8fd6a4;font:12px var(--dsw-font-xxs-12,sans-serif)}.kanban-wf-foot{display:flex;align-items:center;justify-content:space-between;gap:10px;padding:10px 14px;border-top:1px solid var(--dsw-alias-border-primary,#26292f)}@media (max-width:980px){.kanban-wf-row{grid-template-columns:1fr 1fr}}';
function KanbanWorkflowEditor(e){
  var open=e.open,onOpenChange=e.onOpenChange,workspaceId=e.workspaceId,reload=e.reload;
  var st=(0,pe.useState)(null),rows=st[0],setRows=st[1];
  var ex=(0,pe.useState)({enabled:false}),extra=ex[0],setExtra=ex[1];
  var ro=(0,pe.useState)([]),roles=ro[0],setRoles=ro[1];
  var bo=(0,pe.useState)([]),boards=bo[0],setBoards=bo[1];
  var bu=(0,pe.useState)(false),busy=bu[0],setBusy=bu[1];
  var ms=(0,pe.useState)(null),msg=ms[0],setMsg=ms[1];
  var er=(0,pe.useState)(null),err=er[0],setErr=er[1];
  var nw=(0,pe.useState)(''),newTitle=nw[0],setNewTitle=nw[1];
  var t=(0,De)();
  (0,pe.useEffect)(function(){
    if(!open)return;
    var live=true;
    Promise.all([La('getPolicy',{workspaceId:workspaceId}),un('roles',{},workspaceId),La('workspaces',{})]).then(function(res){
      if(!live)return;
      var pol=res[0]||{},shared=pol.shared||{},titles=shared.sharedTitles||{};
      var byTitle=titles.columnRolesByTitle||{};
      var cols=(titles.columns||[]).map(function(title){
        var kind='flow';
        if((titles.sourceColumnTitles||[]).indexOf(title)>=0)kind='source';
        else if(titles.entryColumnTitle===title)kind='entry';
        else if((titles.doneColumnTitles||[]).indexOf(title)>=0)kind='done';
        return {title:title,role:byTitle[title]||'',kind:kind};
      });
      setRows(cols);
      setExtra({wipLimit:shared.wipLimit==null?1:shared.wipLimit,autoPull:shared.autoPull!==false,enforceWip:shared.enforceWip!==false,pullOrder:shared.pullOrder||'priority',stampAssignments:shared.stampAssignments!==false,labelAssignments:shared.labelAssignments!==false,dispatchEnabled:shared.dispatchEnabled===true,dispatchModel:shared.dispatchModel?String(shared.dispatchModel.provider||'')+'/'+String(shared.dispatchModel.model||''):'',enabled:!!(pol.effective&&pol.effective.enabled)});
      setRoles(((res[1]&&res[1].roles)||[]).filter(function(x){return /^(team-)?(manager|developer|tester|reviewer|designer|researcher)$/.test(String(x));}));
      setBoards((res[2]&&res[2].workspaces)||[]);
      setErr(null);
    }).catch(function(x){if(live)setErr(String((x&&x.message)||x));});
    return function(){live=false;};
  },[open,workspaceId]);
  if(!open)return null;
  function patchRow(i,part){setRows((rows||[]).map(function(r,j){return j===i?Object.assign({},r,part):r;}));}
  function moveRow(i,dir){var list=(rows||[]).slice();var j=i+dir;if(j<0||j>=list.length)return;var tmp=list[i];list[i]=list[j];list[j]=tmp;setRows(list);}
  function addColumn(){var name=String(newTitle||'').trim();if(!name)return;var list=(rows||[]).slice();list.push({title:name.slice(0,60),role:'',kind:'flow'});setRows(list);setNewTitle('');}
  function removeRow(i){setRows((rows||[]).filter(function(_,j){return j!==i;}));}
  function save(){
    if(!rows||!rows.length){setErr(t('wfColumns')+' - '+t('wfAdd'));return;}
    setBusy(true);setErr(null);setMsg(null);
    La('saveColumns',{workspaceId:workspaceId,policy:{columns:rows,wipLimit:Number(extra.wipLimit)||1,autoPull:!!extra.autoPull,enforceWip:!!extra.enforceWip,pullOrder:extra.pullOrder,stampAssignments:!!extra.stampAssignments,labelAssignments:!!extra.labelAssignments,dispatchEnabled:!!extra.dispatchEnabled,dispatchModel:extra.dispatchModel||null}}).then(function(r){
      setBusy(false);
      if(!r||r.error){setErr(t('wfSaveFailed')+String((r&&r.error)||''));return;}
      setMsg(String(t('wfSaved')).replace('{n}',String((r.boards||[]).length)));
      if(reload)reload();
    }).catch(function(x){setBusy(false);setErr(t('wfSaveFailed')+String((x&&x.message)||x));});
  }
  function toggleBoard(){
    La('setEnabled',{workspaceId:workspaceId,enabled:!extra.enabled}).then(function(r){setExtra(Object.assign({},extra,{enabled:!!(r&&r.enabled)}));if(reload)reload();}).catch(function(x){setErr(String((x&&x.message)||x));});
  }
  function checkbox(label,on,onChange){return (0,W.jsxs)('label',{className:'kanban-wf-note',children:[(0,W.jsx)('input',{type:'checkbox',checked:!!on,onChange:function(ev){onChange(ev.target.checked);}}),label]},label);}
  var kinds=[['flow',t('wfKindFlow')],['source',t('wfKindSource')],['entry',t('wfKindEntry')],['done',t('wfKindDone')]];
  return (0,W.jsxs)('div',{className:'kanban-wf',role:'dialog','aria-modal':'true','aria-label':t('wfTitle'),children:[
    (0,W.jsxs)('div',{className:'kanban-wf-head',children:[
      (0,W.jsxs)('div',{children:[
        (0,W.jsx)('div',{className:'kanban-wf-title',children:t('wfTitle')}),
        (0,W.jsxs)('p',{className:'kanban-wf-sub',children:[String(t('wfAppliesTo')).replace('{n}',String(boards.length||1)),' - ',t('wfColumnsHint')]})
      ]}),
      (0,W.jsx)('button',{className:'kanban-toolbar-button',type:'button',onClick:function(){onOpenChange(false);},children:'X'})
    ]}),
    (0,W.jsxs)('div',{className:'kanban-wf-body',children:[
      (0,W.jsxs)('div',{className:'kanban-wf-section',children:[
        (0,W.jsx)('div',{className:'kanban-wf-caption',children:t('wfColumns')}),
        rows===null?(0,W.jsx)('p',{className:'kanban-wf-note',children:t('loading')}):null,
        (rows||[]).map(function(r,i){return (0,W.jsxs)('div',{className:'kanban-wf-row',children:[
          (0,W.jsx)('input',{value:r.title,onChange:function(ev){patchRow(i,{title:ev.target.value});},maxLength:60}),
          (0,W.jsxs)('select',{value:r.role,onChange:function(ev){patchRow(i,{role:ev.target.value});},children:[
            (0,W.jsx)('option',{value:'',children:t('wfNoRole')},'nr'),
            roles.map(function(name){return (0,W.jsx)('option',{value:name,children:name},name);}),
            r.role&&roles.indexOf(r.role)<0?(0,W.jsx)('option',{value:r.role,children:r.role},r.role):null
          ].filter(Boolean)},'role'),
          (0,W.jsxs)('select',{value:r.kind,onChange:function(ev){patchRow(i,{kind:ev.target.value});},children:kinds.map(function(k){return (0,W.jsx)('option',{value:k[0],children:k[1]},k[0]);})},'kind'),
          (0,W.jsxs)('span',{className:'kanban-wf-tools',children:[
            (0,W.jsx)('button',{className:'kanban-toolbar-button',type:'button',title:t('wfMoveUp'),onClick:function(){moveRow(i,-1);},children:'\u2191'},'up'),
            (0,W.jsx)('button',{className:'kanban-toolbar-button',type:'button',title:t('wfMoveDown'),onClick:function(){moveRow(i,1);},children:'\u2193'},'down')
          ]},'order'),
          (0,W.jsx)('button',{className:'kanban-toolbar-button',type:'button',title:t('wfRemove'),onClick:function(){removeRow(i);},children:'\u2715'},'del')
        ]},r.title+':'+i);}),
        (0,W.jsxs)('div',{className:'kanban-wf-tools',children:[
          (0,W.jsx)('input',{value:newTitle,placeholder:t('wfAdd'),onChange:function(ev){setNewTitle(ev.target.value);},onKeyDown:function(ev){if(ev.key==='Enter')addColumn();},maxLength:60}),
          (0,W.jsx)('button',{className:'kanban-toolbar-button',type:'button',onClick:addColumn,children:t('wfAdd')})
        ]})
      ]}),
      (0,W.jsxs)('div',{className:'kanban-wf-section',children:[
        (0,W.jsx)('div',{className:'kanban-wf-caption',children:t('wfAutomation')}),
        (0,W.jsxs)('label',{className:'kanban-wf-note',children:[t('wfWip'),' ',(0,W.jsx)('input',{type:'number',min:1,max:20,value:extra.wipLimit,onChange:function(ev){setExtra(Object.assign({},extra,{wipLimit:ev.target.value}));}})]},'wip'),
        checkbox(t('wfAutoPull'),extra.autoPull,function(on){setExtra(Object.assign({},extra,{autoPull:on}));}),
        checkbox(t('wfEnforceWip'),extra.enforceWip,function(on){setExtra(Object.assign({},extra,{enforceWip:on}));}),
        checkbox(t('wfStamp'),extra.stampAssignments,function(on){setExtra(Object.assign({},extra,{stampAssignments:on}));}),
        checkbox(t('wfLabels'),extra.labelAssignments,function(on){setExtra(Object.assign({},extra,{labelAssignments:on}));}),
        checkbox(t('wfDispatch'),extra.dispatchEnabled,function(on){setExtra(Object.assign({},extra,{dispatchEnabled:on}));})
      ]}),
      (0,W.jsxs)('div',{className:'kanban-wf-section',children:[
        (0,W.jsx)('div',{className:'kanban-wf-caption',children:t('wfBoardOnly')}),
        checkbox(t('wfEnabled'),extra.enabled,function(){toggleBoard();}),
        err?(0,W.jsx)('p',{className:'kanban-wf-error',children:err},'err'):null
      ].filter(Boolean)})
    ]}),
    (0,W.jsxs)('div',{className:'kanban-wf-foot',children:[
      msg?(0,W.jsx)('p',{className:'kanban-wf-ok',children:msg},'msg'):(0,W.jsx)('p',{className:'kanban-wf-note',children:t('wfColumnsHint')},'hint'),
      (0,W.jsx)('button',{className:'kanban-toolbar-button',type:'button',disabled:busy||rows===null,onClick:save,children:busy?t('wfSaving'):t('wfSave')})
    ].filter(Boolean)})
  ]});
}
