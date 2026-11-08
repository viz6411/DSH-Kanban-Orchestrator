#!/usr/bin/env python3
"""Rebuild lib/client.js from the untouched bundle plus our UI changes.

The shipped client of @alpacachen/dsh-kanban is one minified bundle. Our workflow screen is authored in
readable sources - wf_editor.js (component + WF_STYLE) and wf_keys.json (zh/en/ru labels) - and this script
is the only way those changes reach the bundle, so a new release of the upstream plugin is re-patched by
running it again against a fresh lib/client.js.pre-r32-workflow-editor backup.

Usage:
  python3 tools/patch-client-bundle.py            # write lib/client.js
  python3 tools/patch-client-bundle.py --verify   # compare with the current lib/client.js, write nothing

Every step must match exactly one anchor. A missing anchor or a step that breaks the syntax stops the run
and leaves the previous bundle untouched.
"""
import json
import pathlib
import re
import subprocess
import sys

ROOT = pathlib.Path(__file__).resolve().parents[1]
BASE = ROOT / 'lib' / 'client.js.pre-r32-workflow-editor'
TARGET = ROOT / 'lib' / 'client.js'
EDITOR = ROOT / 'wf_editor.js'
KEYS = ROOT / 'wf_keys.json'

IM_OLD = '(0,W.jsx)(Im,{error:d,open:C,columns:u.columns,completedColumnId:u.completedColumnId,onSetCompletedColumn:k=>J("setCompletedColumn",{columnId:k}),onOpenChange:v,onReorder:(k,z)=>{let K=u.columns.findIndex(ae=>ae.id===z);return K>=0?J("moveColumn",{id:k,toIndex:K}):Promise.resolve(!1)},onRename:(k,z)=>J("renameColumn",{id:k,title:z}),onDelete:k=>J("deleteColumn",{id:k}),onAdd:k=>J("addColumn",{title:k})})'
MENU_OLD = '(0,W.jsxs)(ht,{onClick:()=>{f(""),v(!0)},children:[(0,W.jsx)(Ir,{className:"kanban-icon"}),i("columnEdit")]})'
CHIP_OLD = 'window.__kanbanWsTitle?(0,W.jsx)("span",{className:"kanban-toolbar-board-name",title:window.__kanbanWsTitle,children:window.__kanbanWsTitle}):null'
TAB_OLD = 'ea("boardTab")+(window.__kanbanWsTitle?" \\u00b7 "+window.__kanbanWsTitle:"")'
AM_OLD = '(0,W.jsx)(Am,{open:S,workspaceId:s,onOpenChange:R})'
STYLE_OLD = 'e.textContent=Hi,document.head.appendChild(e)'
LOAD_OLD = '(0,W.jsx)("div",{className:"kanban-root kanban-loading",children:d?(0,W.jsx)("p",{className:"kanban-error",children:d}):(0,W.jsx)("p",{className:"kanban-muted-text",children:i("loading")})})'

CHIP = '(0,W.jsx)("span",{className:"kanban-toolbar-board-name"+(window.__kanbanWsTitle?"":" is-skeleton"),title:window.__kanbanWsTitle||"",children:window.__kanbanWsTitle||""})'


def style_anchor(text):
    # The plugin stylesheet lives in `var Hi=`...`; its <style> tag is filled much later in the bundle, so
    # WF_STYLE has to be defined at the definition site, not next to the component that uses it.
    return text.index('`;', text.index('var Hi=`')) + 2


def build():
    if not BASE.exists():
        raise SystemExit('missing the untouched bundle backup: ' + str(BASE))
    text = BASE.read_text()
    editor = EDITOR.read_text()
    split_at = editor.index('function KanbanWorkflowEditor')
    style_part = editor[:split_at].rstrip() + '\n'
    component_part = editor[split_at:]
    keys = json.loads(KEYS.read_text())

    def apply_keys(body):
        # Three locale dicts (Fc = zh, Xx = en, jx = ru). Keys are inserted after the opening brace: a leading
        # comma would make the object literal invalid.
        for match in reversed(list(re.finditer(r'\b(Fc|Xx|jx)=\{', body))):
            lang = {'Fc': 0, 'Xx': 1, 'jx': 2}[match.group(1)]
            body = body[:match.end()] + ''.join(
                key + ':' + json.dumps(value[lang], ensure_ascii=False) + ',' for key, value in keys.items()
            ) + body[match.end():]
        return body

    steps = [
        ('localisation keys (zh/en/ru)', apply_keys),
        ('toolbar chip always present, skeleton while empty', lambda s: s.replace(CHIP_OLD, CHIP, 1)),
        ('Board tab label static, no workspace suffix', lambda s: s.replace(TAB_OLD, 'ea("boardTab")', 1)),
        ('column editor entry removed from the board menu', lambda s: s.replace(MENU_OLD, '', 1)),
        ('the remaining entry is named after the workflow screen', lambda s: s.replace('i("orchMenu")', 'i("wfTitle")', 1)),
        ('the old column dialog is gone', lambda s: s.replace(IM_OLD, 'null', 1)),
        ('Workflow opens the workflow screen', lambda s: s.replace(AM_OLD, '(0,W.jsx)(KanbanWorkflowEditor,{open:S,workspaceId:s,onOpenChange:R,reload:le})', 1)),
        ('loading state carries the chip inside the toolbar', lambda s: s.replace(LOAD_OLD, '(0,W.jsx)("div",{className:"kanban-root kanban-loading",children:[(0,W.jsx)("div",{className:"kanban-toolbar",children:' + CHIP + '}),d?(0,W.jsx)("p",{className:"kanban-error",children:d}):(0,W.jsx)("p",{className:"kanban-muted-text",children:i("loading")})]})', 1)),
        ('workflow styles joined with the plugin stylesheet', lambda s: s.replace(STYLE_OLD, 'e.textContent=Hi+WF_STYLE,document.head.appendChild(e)', 1)),
        ('workflow styles defined where the stylesheet is defined', lambda s: (lambda pos: s[:pos] + '\n' + style_part + s[pos:])(style_anchor(s))),
        ('workflow screen component added', lambda s: s.replace('var bL=qm;', component_part + '\nvar bL=qm;', 1)),
    ]

    for label, step in steps:
        before = text
        text = step(text)
        if text == before:
            raise SystemExit('anchor not found, nothing written: ' + label)
        probe = pathlib.Path('/tmp/dsh-kanban-bundle-probe.js')
        probe.write_text(text)
        check = subprocess.run(['node', '--check', str(probe)], capture_output=True, text=True)
        if check.returncode:
            detail = (check.stderr or '').splitlines()
            short = next((line for line in detail if 'SyntaxError' in line or 'Error' in line), 'node --check failed')
            raise SystemExit('bundle is invalid after "' + label + '": ' + short[:300])
        print('pass  ' + label)
    return text


def main():
    verify = '--verify' in sys.argv
    built = build()
    if verify:
        current = TARGET.read_text() if TARGET.exists() else ''
        if built == current:
            print('verify  lib/client.js is exactly what this script produces')
            return 0
        print('verify  lib/client.js differs from the generated bundle ('
              + str(len(built)) + ' generated vs ' + str(len(current)) + ' on disk)')
        return 1
    TARGET.write_text(built)
    print('written  ' + str(TARGET) + '  ' + str(len(built)) + ' bytes')
    return 0


if __name__ == '__main__':
    raise SystemExit(main())
