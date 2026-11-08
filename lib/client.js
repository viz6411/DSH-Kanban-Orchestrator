window.__ModuleLoader__.load({
  id: "@alpacachen/dsh-kanban",
  factory: function (require) {
    var module = { exports: {} }
    var exports = module.exports
"use strict";var Xm=Object.create;var cn=Object.defineProperty;var jm=Object.getOwnPropertyDescriptor;var $m=Object.getOwnPropertyNames;var Ym=Object.getPrototypeOf,Zm=Object.prototype.hasOwnProperty;var Fi=e=>{throw TypeError(e)};var Jm=(e,t)=>{for(var a in t)cn(e,a,{get:t[a],enumerable:!0})},Bi=(e,t,a,o)=>{if(t&&typeof t=="object"||typeof t=="function")for(let r of $m(t))!Zm.call(e,r)&&r!==a&&cn(e,r,{get:()=>t[r],enumerable:!(o=jm(t,r))||o.enumerable});return e};var $=(e,t,a)=>(a=e!=null?Xm(Ym(e)):{},Bi(t||!e||!e.__esModule?cn(a,"default",{value:e,enumerable:!0}):a,e)),Qm=e=>Bi(cn({},"__esModule",{value:!0}),e);var Ni=(e,t,a)=>t.has(e)||Fi("Cannot "+a);var et=(e,t,a)=>(Ni(e,t,"read from private field"),a?a.call(e):t.get(e)),_i=(e,t,a)=>t.has(e)?Fi("Cannot add the same private member more than once"):t instanceof WeakSet?t.add(e):t.set(e,a),Ds=(e,t,a,o)=>(Ni(e,t,"write to private field"),o?o.call(e,a):t.set(e,a),a);var CL={};Jm(CL,{default:()=>bL});module.exports=Qm(CL);var Hi=`/*\r
 * Kanban plugin styles.\r
 * All selectors are namespaced so this stylesheet can live in DSH's <head>.\r
 * Typography, colors, borders and shadows use DSH theme tokens directly.\r
 */\r
\r
.kanban-root,\r
.kanban-portal {\r
  color: var(--dsw-alias-label-primary);\r
  font: var(--dsw-font-xs-13);\r
}\r
\r
.kanban-root,\r
.kanban-root *,\r
.kanban-portal,\r
.kanban-portal * {\r
  box-sizing: border-box;\r
}\r
\r
/* Low-specificity reset: component variants must retain their font and color. */\r
:where(.kanban-root, .kanban-portal) :where(button, input, textarea) {\r
  font: inherit;\r
}\r
\r
:where(.kanban-root, .kanban-portal) button {\r
  color: inherit;\r
}\r
\r
.kanban-root svg,\r
.kanban-portal svg {\r
  flex-shrink: 0;\r
}\r
\r
:where(.kanban-root, .kanban-portal) :where(p, h3, ol) {\r
  margin: 0;\r
}\r
\r
/* One inset keyboard ring, not an outer ring plus the surface's stroke.\r
 * Low specificity lets text fields and Radix menu highlights own their focus. */\r
:where(.kanban-root, .kanban-portal) :focus-visible {\r
  outline: 2px solid var(--dsw-alias-state-business-primary);\r
  outline-offset: -2px;\r
}\r
\r
.kanban-sortable-card:focus-visible .kanban-card {\r
  box-shadow: none;\r
}\r
\r
/* Main board */\r
.kanban-loading {\r
  display: flex;\r
  height: 100%;\r
  min-height: 420px;\r
  align-items: center;\r
  justify-content: center;\r
  padding: 20px;\r
}\r
\r
.kanban-view {\r
  display: flex;\r
  height: 100%;\r
  min-height: 0;\r
  flex-direction: column;\r
  gap: 12px;\r
  padding: 16px;\r
}\r
\r
.kanban-error {\r
  color: var(--dsw-alias-state-error-primary);\r
  font: var(--dsw-font-xs-13);\r
}\r
\r
.kanban-muted-text {\r
  color: var(--dsw-alias-label-secondary);\r
  font: var(--dsw-font-xs-13);\r
}\r
\r
.kanban-warning {\r
  display: flex;\r
  align-items: flex-start;\r
  gap: 8px;\r
  padding: 8px 12px;\r
  border: 1px solid var(--dsw-alias-state-warn-primary);\r
  border-radius: 12px;\r
  background: var(--dsw-alias-bg-layer-2);\r
}\r
\r
.kanban-warning-body {\r
  min-width: 0;\r
  flex: 1;\r
}\r
\r
.kanban-warning-title {\r
  color: var(--dsw-alias-state-warn-label);\r
  font: var(--dsw-font-xxs-strong-12);\r
}\r
\r
.kanban-warning-item {\r
  margin-top: 2px;\r
  overflow-wrap: anywhere;\r
  color: var(--dsw-alias-state-warn-label);\r
  font: var(--dsw-font-xxs-12);\r
}\r
\r
.kanban-warning-dismiss {\r
  flex-shrink: 0;\r
  height: 24px;\r
  padding: 0 8px;\r
  color: var(--dsw-alias-state-warn-label);\r
  font: var(--dsw-font-xxs-strong-12);\r
}\r
\r
.kanban-warning-dismiss:hover {\r
  color: var(--dsw-alias-state-warn-primary);\r
}\r
\r
.kanban-content {\r
  display: flex;\r
  min-width: 0;\r
  min-height: 0;\r
  flex: 1;\r
  gap: 12px;\r
}\r
\r
.kanban-toolbar {\r
  display: flex;\r
  flex-shrink: 0;\r
  flex-direction: column;\r
  align-items: center;\r
  align-self: flex-start;\r
  gap: 4px;\r
  padding: 4px;\r
  border: 1px solid var(--dsw-alias-border-l2);\r
  border-radius: 12px;\r
  background: var(--dsw-alias-bg-layer-1);\r
}\r
\r
.kanban-toolbar-divider {\r
  width: 24px;\r
  height: 1px;\r
  margin: 2px 0;\r
  background: var(--dsw-alias-border-l2);\r
}\r
\r
.kanban-toolbar-button {\r
  width: 32px;\r
  height: 32px;\r
  padding: 0;\r
  border: 0;\r
  border-radius: 8px;\r
  background: transparent;\r
  color: var(--dsw-alias-label-secondary);\r
  box-shadow: none;\r
}\r
\r
.kanban-toolbar-button:hover {\r
  color: var(--dsw-alias-label-primary);\r
  background: var(--dsw-alias-interactive-bg-hover);\r
}\r
\r
.kanban-toolbar-button:active,\r
.kanban-toolbar-button.is-active {\r
  background: var(--dsw-alias-button-ghost-active-fill);\r
  color: var(--dsw-alias-label-primary);\r
}\r
\r
.kanban-toolbar-button.is-active {\r
  position: relative;\r
}\r
\r
.kanban-toolbar-button.is-active::after {\r
  position: absolute;\r
  top: 4px;\r
  right: 4px;\r
  width: 4px;\r
  height: 4px;\r
  border-radius: 50%;\r
  background: var(--dsw-alias-state-business-primary);\r
  content: "";\r
}\r
\r
.kanban-filter-summary {\r
  display: flex;\r
  flex-wrap: wrap;\r
  align-items: center;\r
  gap: 4px;\r
  color: var(--dsw-alias-label-secondary);\r
  font: var(--dsw-font-xxs-12);\r
}\r
\r
.kanban-filter-chip {\r
  max-width: 100%;\r
  background: var(--dsw-alias-interactive-bg-hover);\r
}\r
\r
.kanban-board-scroll {\r
  display: flex;\r
  min-width: 0;\r
  min-height: 0;\r
  flex: 1;\r
  gap: 12px;\r
  overflow-x: auto;\r
  overflow-y: hidden;\r
  padding: 1px 1px 8px;\r
  overscroll-behavior-x: contain;\r
}\r
\r
/* Standard scrollbar styling takes precedence over the Host's WebKit skin. */\r
.kanban-board-scroll,\r
.kanban-column-cards,\r
.kanban-dialog-body,\r
.kanban-dropdown-content,\r
.kanban-select-viewport,\r
.kanban-textarea {\r
  scrollbar-width: thin;\r
  scrollbar-color: auto;\r
}\r
\r
.kanban-filter-check {\r
  display: flex;\r
  width: 16px;\r
  height: 16px;\r
  align-items: center;\r
}\r
\r
.kanban-priority-dot {\r
  width: 8px;\r
  height: 8px;\r
  border-radius: 50%;\r
  corner-shape: round;\r
}\r
\r
/* Columns and cards */\r
.kanban-column {\r
  display: flex;\r
  width: 288px;\r
  min-width: 288px;\r
  min-height: 0;\r
  flex-shrink: 0;\r
  flex-direction: column;\r
  overflow: hidden;\r
  border: 1px solid var(--dsw-alias-border-l2);\r
  border-radius: 12px;\r
  background: color-mix(in srgb, var(--dsw-alias-bg-base) 65%, var(--dsw-alias-bg-module-platform));\r
}\r
\r
.kanban-column.is-over {\r
  /* Highlight only the drop target, not every card inheriting its stroke token. */\r
  border-color: var(--dsw-alias-state-business-primary);\r
  box-shadow: inset 0 0 0 1px var(--dsw-alias-state-business-primary);\r
}\r
\r
.kanban-column-header {\r
  display: flex;\r
  flex-shrink: 0;\r
  align-items: center;\r
  gap: 6px;\r
  padding: 12px 12px 10px;\r
}\r
\r
.kanban-column-title {\r
  min-width: 0;\r
  flex: 1;\r
  overflow: hidden;\r
  color: var(--dsw-alias-label-primary);\r
  text-overflow: ellipsis;\r
  white-space: nowrap;\r
  font: var(--dsw-font-xs-strong-13);\r
}\r
\r
.kanban-column-count {\r
  padding: 2px 6px;\r
  border-radius: 999px;\r
  corner-shape: round;\r
  background: var(--dsw-alias-interactive-bg-hover);\r
  color: var(--dsw-alias-label-secondary);\r
  font: var(--dsw-font-xxs-12);\r
}\r
\r
.kanban-column-cards {\r
  display: flex;\r
  min-height: 0;\r
  flex: 1;\r
  flex-direction: column;\r
  gap: 8px;\r
  overflow-y: auto;\r
  padding: 2px 8px 8px;\r
  overscroll-behavior-y: contain;\r
}\r
\r
.kanban-column-empty {\r
  padding: 20px 0;\r
  text-align: center;\r
  color: var(--dsw-alias-label-tertiary);\r
  font: var(--dsw-font-xxs-12);\r
}\r
\r
.kanban-column-footer {\r
  flex-shrink: 0;\r
  padding: 6px 8px 8px;\r
}\r
\r
.kanban-add-card {\r
  display: flex;\r
  width: 100%;\r
  justify-content: flex-start;\r
  border: 0;\r
  border-radius: 12px;\r
  background: transparent;\r
  color: var(--dsw-alias-label-secondary);\r
  box-shadow: none;\r
}\r
\r
.kanban-add-card:hover {\r
  color: var(--dsw-alias-label-primary);\r
  background: var(--dsw-alias-interactive-bg-hover);\r
}\r
\r
.kanban-add-card:active {\r
  background: var(--dsw-alias-button-ghost-active-fill);\r
}\r
\r
.kanban-sortable-card {\r
  border-radius: 10px;\r
  cursor: grab;\r
  touch-action: auto;\r
  user-select: none;\r
}\r
\r
.kanban-sortable-card:active {\r
  cursor: grabbing;\r
}\r
\r
.kanban-sortable-card.is-dragging {\r
  opacity: 0.4;\r
}\r
\r
.kanban-card {\r
  border: 1px solid var(--dsw-alias-border-l2);\r
  border-radius: 10px;\r
  background: var(--dsw-alias-bg-layer-1);\r
  color: var(--dsw-alias-label-primary);\r
}\r
\r
.kanban-sortable-card:hover .kanban-card {\r
  border-color: var(--dsw-alias-border-l3);\r
  background: var(--dsw-alias-interactive-bg-hover-solid);\r
}\r
\r
.kanban-sortable-card-content {\r
  padding: 12px;\r
}\r
\r
.kanban-card-meta {\r
  display: flex;\r
  flex-wrap: wrap;\r
  align-items: center;\r
  gap: 6px;\r
  margin-bottom: 6px;\r
}\r
\r
.kanban-card-badge {\r
  display: inline-flex;\r
  align-items: center;\r
  gap: 6px;\r
  max-width: 100%;\r
  padding: 1px 6px;\r
  border: 0;\r
  border-radius: 6px;\r
  font: var(--dsw-font-xxs-12);\r
  overflow-wrap: anywhere;\r
}\r
\r
.kanban-card-assignee {\r
  background: var(--dsw-alias-fill-tertiary, rgba(56,189,248,.14));\r
  color: var(--dsw-alias-label-primary);\r
}\r
\r
.kanban-card-milestone {\r
  background: var(--dsw-alias-fill-secondary, rgba(250,204,21,.16));\r
  color: var(--dsw-alias-label-primary);\r
}\r
\r
.kanban-card-parent {\r
  background: var(--dsw-alias-fill-tertiary, rgba(148,163,184,.16));\r
  color: var(--dsw-alias-label-secondary);\r
}\r
\r
.kanban-card-children {\r
  display: flex;\r
  align-items: center;\r
  gap: 8px;\r
  margin-bottom: 6px;\r
}\r
\r
.kanban-card-children-list {\r
  display: inline-flex;\r
  flex-wrap: wrap;\r
  align-items: center;\r
  gap: 6px;\r
}\r
\r
.kanban-milestone-check {\r
  margin-right: 4px;\r
}\r
\r
.kanban-label-dot {\r
  display: inline-block;\r
  width: 8px;\r
  height: 8px;\r
  flex-shrink: 0;\r
  border-radius: 50%;\r
  corner-shape: round;\r
}\r
\r
.kanban-card-title {\r
  overflow-wrap: anywhere;\r
  color: var(--dsw-alias-label-primary);\r
  font: var(--dsw-font-xs-strong-13);\r
}\r
\r
.kanban-card-note {\r
  display: -webkit-box;\r
  max-height: 4.875em;\r
  margin-top: 6px;\r
  overflow: hidden;\r
  color: var(--dsw-alias-label-secondary);\r
  font: var(--dsw-font-xxs-12);\r
  white-space: pre-wrap;\r
  overflow-wrap: anywhere;\r
  -webkit-box-orient: vertical;\r
  -webkit-line-clamp: 3;\r
}\r
\r
.kanban-card-status-row {\r
  display: flex;\r
  align-items: center;\r
  justify-content: space-between;\r
  flex-wrap: wrap;\r
  gap: 6px 12px;\r
  margin-top: 8px;\r
}\r
\r
.kanban-card-due-date {\r
  display: inline-flex;\r
  align-items: center;\r
  gap: 4px;\r
  color: var(--dsw-alias-label-secondary);\r
  font: var(--dsw-font-xxxs-11);\r
}\r
\r
.kanban-card-due-date svg {\r
  width: 12px;\r
  height: 12px;\r
}\r
\r
.kanban-card-due-date.is-today { color: var(--dsw-alias-state-warn-primary); }\r
.kanban-card-due-date.is-overdue { color: var(--dsw-alias-state-error-primary); }\r
.kanban-card-due-date.is-completed { color: var(--dsw-alias-label-tertiary); }\r
\r
.kanban-card-comment-count {\r
  display: flex;\r
  align-items: center;\r
  justify-content: flex-end;\r
  gap: 4px;\r
  margin-left: auto;\r
  color: var(--dsw-alias-label-secondary);\r
  font: var(--dsw-font-xxxs-11);\r
}\r
\r
.kanban-card-comment-count svg {\r
  width: 12px;\r
  height: 12px;\r
}\r
\r
.kanban-drag-preview {\r
  width: 100%;\r
  transform: rotate(2deg);\r
  cursor: grabbing;\r
}\r
\r
.kanban-drag-preview .kanban-card {\r
  background: var(--dsw-alias-bg-layer-2);\r
  box-shadow: var(--dsw-elevation-panel);\r
}\r
\r
/* Form and activity */\r
.kanban-form-stack {\r
  display: grid;\r
  align-content: start;\r
  gap: 16px;\r
}\r
\r
.kanban-form-row {\r
  display: grid;\r
  grid-template-columns: repeat(2, minmax(0, 1fr));\r
  gap: 16px;\r
}\r
\r
.kanban-form-field {\r
  display: grid;\r
  min-width: 0;\r
  gap: 6px;\r
}\r
\r
.kanban-due-date-controls {\r
  display: flex;\r
  flex-wrap: wrap;\r
  align-items: center;\r
  gap: 6px 10px;\r
}\r
\r
.kanban-due-date-controls input { width: 160px; color-scheme: inherit; }\r
\r
.kanban-date-shortcuts { display: flex; flex-wrap: wrap; gap: 2px; }\r
.kanban-date-shortcuts .kanban-button { padding: 0 6px; }\r
\r
.kanban-field-label {\r
  display: flex;\r
  align-items: center;\r
  justify-content: space-between;\r
}\r
\r
.kanban-field-id {\r
  color: var(--dsw-alias-label-secondary);\r
  font: var(--dsw-font-xxs-12);\r
}\r
\r
.kanban-markdown-preview {\r
  min-width: 0;\r
  padding: 8px 0;\r
  overflow-wrap: anywhere;\r
}\r
\r
.kanban-textarea.kanban-markdown-source {\r
  width: 100%;\r
  min-height: 240px;\r
  font-family: var(--ds-font-family-code, ui-monospace, monospace);\r
  line-height: 1.6;\r
  tab-size: 2;\r
}\r
\r
.kanban-note-hint {\r
  display: flex;\r
  justify-content: space-between;\r
  gap: 12px;\r
  margin-top: 6px;\r
  color: var(--dsw-alias-label-secondary);\r
  font: var(--dsw-font-xxs-12);\r
}\r
\r
.kanban-inline-priority {\r
  display: flex;\r
  align-items: center;\r
  gap: 8px;\r
}\r
\r
.kanban-comments-box {\r
  display: grid;\r
  gap: 8px;\r
  padding-top: 16px;\r
  border-top: 1px solid var(--dsw-alias-border-l2);\r
}\r
\r
.kanban-comment-list {\r
  display: grid;\r
  gap: 8px;\r
  padding: 0;\r
  list-style: none;\r
}\r
\r
.kanban-comment-item {\r
  display: grid;\r
  gap: 4px;\r
  padding: 8px 0;\r
}\r
\r
.kanban-comment-meta {\r
  display: flex;\r
  align-items: baseline;\r
  justify-content: space-between;\r
  gap: 8px;\r
}\r
\r
.kanban-comment-content {\r
  color: var(--dsw-alias-label-primary);\r
  font: var(--dsw-font-xxs-12);\r
  white-space: pre-wrap;\r
  overflow-wrap: anywhere;\r
}\r
\r
.kanban-comment-composer {\r
  display: grid;\r
  justify-items: end;\r
  gap: 8px;\r
}\r
\r
.kanban-comment-composer .kanban-textarea {\r
  width: 100%;\r
  min-height: 64px;\r
}\r
\r
.kanban-activity-box {\r
  display: grid;\r
  gap: 6px;\r
  padding-top: 16px;\r
  border-top: 1px solid var(--dsw-alias-border-l2);\r
}\r
\r
.kanban-activity-list {\r
  display: grid;\r
}\r
\r
.kanban-activity-item {\r
  display: grid;\r
  grid-template-columns: 6px minmax(0, 1fr) auto;\r
  align-items: baseline;\r
  gap: 8px;\r
  padding: 7px 0;\r
  border-top: 1px solid var(--dsw-alias-border-l2);\r
}\r
\r
.kanban-activity-item:first-child {\r
  border-top: 0;\r
}\r
\r
.kanban-activity-dot {\r
  width: 6px;\r
  height: 6px;\r
  border-radius: 50%;\r
  corner-shape: round;\r
}\r
\r
.kanban-activity-dot.is-agent {\r
  background: var(--dsw-alias-state-business-primary);\r
}\r
\r
.kanban-activity-dot.is-human {\r
  background: var(--dsw-alias-state-success-primary);\r
}\r
\r
.kanban-activity-actor {\r
  font: var(--dsw-font-xxxs-strong-11);\r
}\r
\r
.kanban-activity-actor.is-agent {\r
  color: var(--dsw-alias-state-business-primary);\r
}\r
\r
.kanban-activity-actor.is-human {\r
  color: var(--dsw-alias-state-success-primary);\r
}\r
\r
.kanban-activity-description {\r
  min-width: 0;\r
  overflow-wrap: anywhere;\r
  color: var(--dsw-alias-label-primary);\r
  font: var(--dsw-font-xxs-12);\r
}\r
\r
.kanban-activity-time {\r
  color: var(--dsw-alias-label-secondary);\r
  font: var(--dsw-font-xxxs-11);\r
  white-space: nowrap;\r
}\r
\r
.kanban-muted-small {\r
  color: var(--dsw-alias-label-secondary);\r
  font: var(--dsw-font-xxs-12);\r
}\r
\r
.kanban-tiny-icon {\r
  width: 12px;\r
  height: 12px;\r
}\r
\r
.kanban-tabular {\r
  font-variant-numeric: tabular-nums;\r
}\r
\r
/* Radix-backed controls mirror the current Host primitive geometry and tokens. */\r
:where(.kanban-button) {\r
  display: inline-flex;\r
  appearance: none;\r
  align-items: center;\r
  justify-content: center;\r
  gap: 4px;\r
  white-space: nowrap;\r
  border: 0;\r
  border-radius: 12px;\r
  background: transparent;\r
  color: var(--dsw-alias-label-primary);\r
  font: var(--dsw-font-xs-13);\r
  cursor: pointer;\r
}\r
\r
.kanban-button:disabled {\r
  cursor: not-allowed;\r
  opacity: 0.4;\r
}\r
\r
.kanban-button svg {\r
  width: 16px;\r
  height: 16px;\r
  pointer-events: none;\r
}\r
\r
:where(.kanban-button--size-default) {\r
  height: 36px;\r
  padding: 0 14px;\r
}\r
\r
:where(.kanban-button--size-sm) {\r
  height: 28px;\r
  padding: 0 10px;\r
  border-radius: 8px;\r
  font: var(--dsw-font-xxs-12);\r
}\r
\r
:where(.kanban-button--size-lg) {\r
  height: 40px;\r
  padding: 0 18px;\r
  border-radius: 12px;\r
}\r
\r
:where(.kanban-button--size-icon) {\r
  width: 32px;\r
  height: 32px;\r
  padding: 0;\r
  border-radius: 8px;\r
}\r
\r
.kanban-button--default {\r
  background: var(--dsw-alias-button-primary-fill);\r
  color: var(--dsw-alias-label-primary-foreground);\r
}\r
\r
.kanban-button--default:hover:not(:disabled) {\r
  background: var(--dsw-alias-button-primary-hover);\r
}\r
\r
.kanban-button--destructive {\r
  background: var(--dsw-alias-state-error-primary);\r
  color: var(--dsw-static-neutral-00);\r
}\r
\r
.kanban-button--destructive:hover:not(:disabled) {\r
  background: var(--dsw-alias-state-error-secondary);\r
}\r
\r
.kanban-button--outline {\r
  border: 1px solid var(--dsw-alias-border-l3);\r
}\r
\r
.kanban-button--secondary {\r
  background: var(--dsw-alias-interactive-bg-hover);\r
}\r
\r
.kanban-button--secondary:hover:not(:disabled) {\r
  background: var(--dsw-alias-button-ghost-active-fill);\r
}\r
\r
.kanban-button--outline:hover:not(:disabled),\r
.kanban-button--ghost:hover:not(:disabled) {\r
  background: var(--dsw-alias-interactive-bg-hover);\r
}\r
\r
.kanban-button--ghost:active:not(:disabled) {\r
  background: var(--dsw-alias-interactive-bg-active);\r
}\r
\r
.kanban-button--link {\r
  color: var(--dsw-alias-brand-primary);\r
  text-underline-offset: 4px;\r
}\r
\r
.kanban-button--link:hover:not(:disabled) {\r
  text-decoration: underline;\r
}\r
\r
.kanban-icon {\r
  width: 16px;\r
  height: 16px;\r
}\r
\r
.kanban-icon-button {\r
  width: 32px;\r
  height: 32px;\r
  flex-shrink: 0;\r
  padding: 0;\r
}\r
\r
.kanban-danger-button {\r
  color: var(--dsw-alias-state-error-primary);\r
}\r
\r
/* Base styles must not override the card's compact business variant. */\r
:where(.kanban-card-content) {\r
  padding: 24px;\r
}\r
\r
.kanban-card-header {\r
  display: flex;\r
  flex-direction: column;\r
  gap: 6px;\r
  padding: 24px;\r
}\r
\r
.kanban-ui-card-title {\r
  font-weight: 600;\r
  line-height: 1;\r
  letter-spacing: -0.01em;\r
}\r
\r
.kanban-card-description {\r
  color: var(--dsw-alias-label-secondary);\r
  font: var(--dsw-font-xs-13);\r
}\r
\r
.kanban-card-footer {\r
  display: flex;\r
  align-items: center;\r
  padding: 24px 24px 0;\r
}\r
\r
:where(.kanban-badge) {\r
  display: inline-flex;\r
  align-items: center;\r
  gap: 6px;\r
  border: 0;\r
  border-radius: 6px;\r
  padding: 2px 8px;\r
  font: var(--dsw-font-xxs-12);\r
}\r
\r
.kanban-badge--default {\r
  background: var(--dsw-alias-brand-primary);\r
  color: var(--dsw-alias-label-primary-foreground);\r
  box-shadow: var(--dsw-shadow-lv1);\r
}\r
\r
.kanban-badge--secondary {\r
  background: var(--dsw-alias-bg-layer-2);\r
  color: var(--dsw-alias-label-primary);\r
}\r
\r
.kanban-badge--destructive {\r
  background: var(--dsw-alias-state-error-primary);\r
  color: var(--dsw-alias-label-primary-foreground);\r
  box-shadow: var(--dsw-shadow-lv1);\r
}\r
\r
.kanban-badge--outline {\r
  color: var(--dsw-alias-label-primary);\r
}\r
\r
.kanban-input,\r
.kanban-textarea {\r
  width: 100%;\r
  min-width: 0;\r
  border: 1px solid var(--dsw-alias-border-l4);\r
  border-radius: 8px;\r
  background: var(--dsw-alias-bg-layer-1);\r
  color: var(--dsw-alias-label-primary);\r
  font: var(--dsw-font-xs-13);\r
}\r
\r
.kanban-input {\r
  height: 32px;\r
  padding: 0 8px;\r
}\r
\r
.kanban-textarea {\r
  min-height: 60px;\r
  padding: 8px;\r
  resize: vertical;\r
}\r
\r
.kanban-input::placeholder,\r
.kanban-textarea::placeholder {\r
  color: var(--dsw-alias-label-dimmed);\r
}\r
\r
.kanban-input:focus,\r
.kanban-textarea:focus {\r
  border-color: var(--dsw-alias-state-business-primary);\r
  outline: none;\r
  box-shadow: none;\r
}\r
\r
.kanban-input:disabled,\r
.kanban-textarea:disabled {\r
  cursor: not-allowed;\r
  opacity: 0.4;\r
}\r
\r
:where(.kanban-label) {\r
  color: var(--dsw-alias-label-primary);\r
  font: var(--dsw-font-xs-13);\r
}\r
\r
.kanban-separator {\r
  flex-shrink: 0;\r
  background: var(--dsw-alias-border-l1);\r
}\r
\r
.kanban-separator--horizontal {\r
  width: 100%;\r
  height: 1px;\r
}\r
\r
.kanban-separator--vertical {\r
  width: 1px;\r
  height: 100%;\r
}\r
\r
/* Radix portals */\r
.kanban-dialog-overlay {\r
  position: fixed;\r
  z-index: 1000;\r
  inset: 0;\r
  background: var(--dsw-alias-bg-mask-1);\r
  backdrop-filter: var(--dsw-mask-blur);\r
}\r
\r
.kanban-dialog-overlay[data-state="open"] {\r
  animation: kanban-fade-in 150ms ease-out;\r
}\r
\r
.kanban-dialog-overlay[data-state="closed"] {\r
  animation: kanban-fade-out 150ms ease-in;\r
}\r
\r
.kanban-dialog-content {\r
  position: fixed;\r
  z-index: 1001;\r
  top: 50%;\r
  left: 50%;\r
  display: grid;\r
  grid-template-rows: auto minmax(0, 1fr) auto;\r
  width: calc(100% - 32px);\r
  max-width: 512px;\r
  max-height: calc(100dvh - 64px);\r
  overflow: hidden;\r
  border: 1px solid var(--dsw-alias-border-l2);\r
  border-radius: 18px;\r
  background: var(--dsw-alias-bg-layer-2);\r
  color: var(--dsw-alias-label-primary);\r
  font: var(--dsw-font-xs-13);\r
  box-shadow: var(--dsw-shadow-lv3);\r
  transform: translate(-50%, -50%);\r
}\r
\r
.kanban-dialog-wide {\r
  max-width: 576px;\r
}\r
\r
.kanban-dialog-medium {\r
  max-width: 448px;\r
}\r
\r
.kanban-dialog-content[data-state="open"] {\r
  animation: kanban-fade-in 150ms ease-out, kanban-dialog-in 150ms ease-out;\r
}\r
\r
.kanban-dialog-content[data-state="closed"] {\r
  animation: kanban-fade-out 150ms ease-in, kanban-dialog-out 150ms ease-in;\r
}\r
\r
.kanban-dialog-close {\r
  position: absolute;\r
  top: 12px;\r
  right: 12px;\r
  display: flex;\r
  width: 32px;\r
  height: 32px;\r
  align-items: center;\r
  justify-content: center;\r
  padding: 0;\r
  border: 0;\r
  border-radius: 8px;\r
  background: transparent;\r
  color: var(--dsw-alias-label-tertiary);\r
  font: inherit;\r
  cursor: pointer;\r
}\r
\r
.kanban-dialog-close:hover {\r
  background: var(--dsw-alias-interactive-bg-hover);\r
  color: var(--dsw-alias-label-primary);\r
  opacity: 1;\r
}\r
\r
.kanban-dialog-close-icon {\r
  width: 16px;\r
  height: 16px;\r
}\r
\r
.kanban-dialog-header {\r
  display: flex;\r
  flex-direction: column;\r
  gap: 4px;\r
  padding: 18px 52px 16px 20px;\r
  border-bottom: 1px solid var(--dsw-alias-border-l1);\r
  text-align: left;\r
}\r
\r
.kanban-dialog-body {\r
  min-width: 0;\r
  min-height: 0;\r
  overflow: auto;\r
  padding: 16px 20px;\r
  overscroll-behavior: contain;\r
}\r
\r
.kanban-dialog-footer {\r
  display: flex;\r
  flex-wrap: wrap;\r
  align-items: center;\r
  justify-content: flex-end;\r
  gap: 8px;\r
  padding: 12px 20px;\r
  border-top: 1px solid var(--dsw-alias-border-l2);\r
  background: var(--dsw-alias-bg-layer-2);\r
}\r
\r
.kanban-dialog-error {\r
  width: 100%;\r
  color: var(--dsw-alias-state-error-primary);\r
  font: var(--dsw-font-xs-13);\r
  overflow-wrap: anywhere;\r
}\r
\r
.kanban-dialog-confirm {\r
  display: grid;\r
  width: 100%;\r
  gap: 8px;\r
  padding: 12px;\r
  border: 1px solid var(--dsw-alias-border-l3);\r
  border-radius: 8px;\r
  background: var(--dsw-alias-bg-layer-1);\r
}\r
\r
.kanban-confirm-actions {\r
  display: flex;\r
  flex-wrap: wrap;\r
  justify-content: flex-end;\r
  gap: 8px;\r
}\r
\r
.kanban-dialog-title {\r
  margin: 0;\r
  color: var(--dsw-alias-label-primary);\r
  font-family: inherit;\r
  font-size: 16px;\r
  font-weight: 500;\r
  line-height: 24px;\r
}\r
\r
.kanban-dialog-description {\r
  color: var(--dsw-alias-label-secondary);\r
  font: var(--dsw-font-xs-13);\r
}\r
\r
.kanban-dialog-delete {\r
  margin-right: auto;\r
}\r
\r
.kanban-sr-only {\r
  position: absolute;\r
  width: 1px;\r
  height: 1px;\r
  margin: -1px;\r
  padding: 0;\r
  overflow: hidden;\r
  clip: rect(0, 0, 0, 0);\r
  white-space: nowrap;\r
  border: 0;\r
}\r
\r
.kanban-dropdown-content {\r
  z-index: 1100;\r
  min-width: 128px;\r
  max-width: calc(100vw - 16px);\r
  max-height: var(--radix-dropdown-menu-content-available-height);\r
  overflow-y: auto;\r
  border: 1px solid var(--dsw-alias-border-l2);\r
  border-radius: 12px;\r
  padding: 4px;\r
  background: var(--dsw-alias-bg-layer-2);\r
  color: var(--dsw-alias-label-primary);\r
  box-shadow: var(--dsw-shadow-lv3);\r
}\r
\r
.kanban-dropdown-content[data-state="open"] {\r
  animation: kanban-fade-in 120ms ease-out, kanban-scale-in 120ms ease-out;\r
}\r
\r
.kanban-dropdown-item {\r
  position: relative;\r
  display: flex;\r
  align-items: center;\r
  gap: 8px;\r
  min-height: 34px;\r
  border-radius: 8px;\r
  padding: 5px 10px;\r
  color: var(--dsw-alias-label-primary);\r
  font: var(--dsw-font-xs-13);\r
  cursor: pointer;\r
  user-select: none;\r
  outline: none;\r
}\r
\r
.kanban-dropdown-item--inset {\r
  padding-left: 32px;\r
}\r
\r
.kanban-dropdown-item:hover,\r
.kanban-dropdown-item[data-highlighted] {\r
  background: var(--dsw-alias-interactive-bg-hover);\r
}\r
\r
.kanban-dropdown-item[data-disabled] {\r
  pointer-events: none;\r
  opacity: 0.5;\r
}\r
\r
.kanban-dropdown-item svg {\r
  width: 16px;\r
  height: 16px;\r
}\r
\r
.kanban-dropdown-label {\r
  padding: 6px 8px;\r
  color: var(--dsw-alias-label-primary);\r
  font: var(--dsw-font-xs-strong-13);\r
}\r
\r
.kanban-dropdown-label--inset {\r
  padding-left: 32px;\r
}\r
\r
.kanban-dropdown-separator {\r
  height: 1px;\r
  margin: 4px -4px;\r
  background: var(--dsw-alias-border-l1);\r
}\r
\r
.kanban-select-trigger {\r
  display: flex;\r
  width: 100%;\r
  min-width: 0;\r
  height: 32px;\r
  align-items: center;\r
  justify-content: space-between;\r
  gap: 6px;\r
  white-space: nowrap;\r
  border: 1px solid var(--dsw-alias-border-l4);\r
  border-radius: 8px;\r
  padding: 0 8px;\r
  background: var(--dsw-alias-bg-layer-1);\r
  color: var(--dsw-alias-label-primary);\r
  font: var(--dsw-font-xs-13);\r
  cursor: pointer;\r
}\r
\r
.kanban-select-trigger:focus-visible {\r
  border-color: var(--dsw-alias-state-business-primary);\r
  outline: none;\r
  box-shadow: none;\r
}\r
\r
.kanban-select-trigger:disabled {\r
  cursor: not-allowed;\r
  opacity: 0.5;\r
}\r
\r
.kanban-select-trigger > span {\r
  overflow: hidden;\r
  text-overflow: ellipsis;\r
  white-space: nowrap;\r
}\r
\r
.kanban-select-icon,\r
.kanban-select-scroll-icon,\r
.kanban-select-check {\r
  width: 16px;\r
  height: 16px;\r
}\r
\r
.kanban-select-scroll-button {\r
  display: flex;\r
  align-items: center;\r
  justify-content: center;\r
  padding: 4px 0;\r
  border: 0;\r
  background: transparent;\r
  color: var(--dsw-alias-label-secondary);\r
}\r
\r
.kanban-select-content {\r
  position: relative;\r
  z-index: 1100;\r
  max-height: min(384px, var(--radix-select-content-available-height, 384px));\r
  min-width: 128px;\r
  max-width: calc(100vw - 16px);\r
  overflow: hidden;\r
  border: 1px solid var(--dsw-alias-border-l2);\r
  border-radius: 12px;\r
  background: var(--dsw-alias-bg-layer-2);\r
  color: var(--dsw-alias-label-primary);\r
  box-shadow: var(--dsw-shadow-lv3);\r
}\r
\r
.kanban-select-content--popper .kanban-select-viewport--popper {\r
  min-width: var(--radix-select-trigger-width);\r
}\r
\r
.kanban-select-content[data-state="open"] {\r
  animation: kanban-fade-in 120ms ease-out, kanban-scale-in 120ms ease-out;\r
}\r
\r
.kanban-select-viewport {\r
  padding: 4px;\r
}\r
\r
.kanban-select-label {\r
  padding: 6px 8px;\r
  color: var(--dsw-alias-label-primary);\r
  font: var(--dsw-font-xs-strong-13);\r
}\r
\r
.kanban-select-item {\r
  position: relative;\r
  display: flex;\r
  width: 100%;\r
  min-height: 34px;\r
  align-items: center;\r
  border-radius: 8px;\r
  padding: 5px 32px 5px 10px;\r
  color: var(--dsw-alias-label-primary);\r
  font: var(--dsw-font-xs-13);\r
  cursor: pointer;\r
  user-select: none;\r
  outline: none;\r
}\r
\r
.kanban-select-item:hover,\r
.kanban-select-item[data-highlighted] {\r
  background: var(--dsw-alias-interactive-bg-hover);\r
}\r
\r
.kanban-select-item[data-disabled] {\r
  pointer-events: none;\r
  opacity: 0.5;\r
}\r
\r
.kanban-select-item-indicator {\r
  position: absolute;\r
  right: 8px;\r
  display: flex;\r
  width: 14px;\r
  height: 14px;\r
  align-items: center;\r
  justify-content: center;\r
}\r
\r
.kanban-select-separator {\r
  height: 1px;\r
  margin: 4px -4px;\r
  background: var(--dsw-alias-border-l1);\r
}\r
\r
.kanban-tooltip-content {\r
  z-index: 1200;\r
  overflow: hidden;\r
  border-radius: 6px;\r
  padding: 6px 12px;\r
  background: var(--dsw-alias-bg-layer-2);\r
  border: 1px solid var(--dsw-alias-border-l2);\r
  box-shadow: var(--dsw-shadow-lv1);\r
  color: var(--dsw-alias-label-primary);\r
  font: var(--dsw-font-xxs-12);\r
}\r
\r
.kanban-tooltip-content[data-state="open"] {\r
  animation: kanban-fade-in 120ms ease-out, kanban-scale-in 120ms ease-out;\r
}\r
\r
/* List and label editors */\r
.kanban-editor-dialog {\r
  max-width: 480px;\r
}\r
\r
.kanban-editor-dialog .kanban-dialog-description {\r
  font: var(--dsw-font-xxs-12);\r
}\r
\r
.kanban-editor-body {\r
  display: grid;\r
  align-content: start;\r
  gap: 20px;\r
}\r
\r
.kanban-editor-section,\r
.kanban-editor-add {\r
  display: grid;\r
  min-width: 0;\r
  gap: 8px;\r
}\r
\r
.kanban-editor-caption {\r
  display: flex;\r
  align-items: center;\r
  gap: 8px;\r
  color: var(--dsw-alias-label-secondary);\r
  font: var(--dsw-font-xxs-12);\r
}\r
\r
.kanban-editor-caption span {\r
  color: var(--dsw-alias-label-tertiary);\r
  font-variant-numeric: tabular-nums;\r
}\r
\r
.kanban-editor-list {\r
  min-width: 0;\r
  border: 1px solid var(--dsw-alias-border-l2);\r
  border-radius: 10px;\r
  background: var(--dsw-alias-bg-layer-1);\r
}\r
\r
.kanban-editor-row {\r
  position: relative;\r
  display: grid;\r
  grid-template-columns: 32px minmax(0, 1fr) 32px;\r
  align-items: center;\r
  gap: 8px;\r
  min-height: 46px;\r
  padding: 6px;\r
}\r
\r
.kanban-editor-row + .kanban-editor-row {\r
  border-top: 1px solid var(--dsw-alias-border-l1);\r
}\r
\r
.kanban-editor-row[data-dragging] {\r
  z-index: 1;\r
  border-radius: 8px;\r
  background: var(--dsw-alias-bg-layer-2);\r
  box-shadow: var(--dsw-shadow-lv1);\r
}\r
\r
.kanban-editor-name {\r
  border-color: transparent;\r
  background: transparent;\r
}\r
\r
.kanban-editor-name:hover:not(:disabled):not(:focus) {\r
  border-color: var(--dsw-alias-border-l2);\r
}\r
\r
.kanban-editor-name:focus {\r
  background: var(--dsw-alias-bg-layer-2);\r
}\r
\r
.kanban-editor-delete {\r
  color: var(--dsw-alias-label-tertiary);\r
}\r
\r
.kanban-editor-delete:hover:not(:disabled),\r
.kanban-editor-delete:focus-visible {\r
  color: var(--dsw-alias-state-error-primary);\r
}\r
\r
.kanban-editor-setting {\r
  display: grid;\r
  grid-template-columns: minmax(0, 1fr) 148px;\r
  align-items: start;\r
  gap: 16px;\r
  padding-top: 16px;\r
  border-top: 1px solid var(--dsw-alias-border-l1);\r
}\r
\r
.kanban-editor-setting-copy {\r
  display: grid;\r
  gap: 4px;\r
}\r
\r
.kanban-editor-empty {\r
  display: flex;\r
  align-items: center;\r
  gap: 8px;\r
  padding: 20px 14px;\r
  color: var(--dsw-alias-label-secondary);\r
  font: var(--dsw-font-xxs-12);\r
}\r
\r
.kanban-editor-add {\r
  width: 100%;\r
}\r
\r
.kanban-editor-add-row {\r
  display: grid;\r
  grid-template-columns: 32px minmax(0, 1fr) auto;\r
  align-items: center;\r
  gap: 8px;\r
  padding-inline: 7px;\r
}\r
\r
.kanban-editor-add-icon {\r
  display: flex;\r
  width: 32px;\r
  height: 32px;\r
  align-items: center;\r
  justify-content: center;\r
  color: var(--dsw-alias-label-tertiary);\r
}\r
\r
.kanban-editor-add-button {\r
  height: 32px;\r
  min-width: 56px;\r
}\r
\r
.kanban-drag-handle {\r
  display: flex;\r
  width: 32px;\r
  height: 32px;\r
  align-items: center;\r
  justify-content: center;\r
  padding: 0;\r
  border: 0;\r
  border-radius: 6px;\r
  background: transparent;\r
  color: var(--dsw-alias-label-tertiary);\r
  font: inherit;\r
  cursor: grab;\r
  touch-action: none;\r
}\r
\r
.kanban-drag-handle:hover {\r
  background: var(--dsw-alias-interactive-bg-hover);\r
  color: var(--dsw-alias-label-primary);\r
}\r
\r
.kanban-color-input {\r
  appearance: none;\r
  width: 32px;\r
  height: 32px;\r
  cursor: pointer;\r
  border: 0;\r
  border-radius: 6px;\r
  padding: 6px;\r
  background: transparent;\r
}\r
\r
.kanban-color-input::-webkit-color-swatch-wrapper {\r
  padding: 0;\r
}\r
\r
.kanban-color-input::-webkit-color-swatch {\r
  border: 1px solid var(--dsw-alias-border-l4);\r
  border-radius: 50%;\r
  corner-shape: round;\r
}\r
\r
.kanban-color-input::-moz-color-swatch {\r
  border: 1px solid var(--dsw-alias-border-l4);\r
  border-radius: 50%;\r
}\r
\r
.kanban-color-input:hover:not(:disabled) {\r
  background: var(--dsw-alias-interactive-bg-hover);\r
}\r
\r
.kanban-color-input:disabled {\r
  cursor: not-allowed;\r
  opacity: 0.4;\r
}\r
\r
.kanban-dialog-footer-layout {\r
  display: flex;\r
  flex-direction: column;\r
  gap: 8px;\r
}\r
\r
.kanban-animate-spin {\r
  animation: kanban-spin 1s linear infinite;\r
}\r
\r
@keyframes kanban-spin {\r
  to { transform: rotate(360deg); }\r
}\r
\r
@keyframes kanban-fade-in {\r
  from { opacity: 0; }\r
  to { opacity: 1; }\r
}\r
\r
@keyframes kanban-fade-out {\r
  from { opacity: 1; }\r
  to { opacity: 0; }\r
}\r
\r
@keyframes kanban-scale-in {\r
  from { transform: scale(0.95); }\r
  to { transform: scale(1); }\r
}\r
\r
@keyframes kanban-dialog-in {\r
  from { transform: translate(-50%, -50%) scale(0.95); }\r
  to { transform: translate(-50%, -50%) scale(1); }\r
}\r
\r
@keyframes kanban-dialog-out {\r
  from { transform: translate(-50%, -50%) scale(1); }\r
  to { transform: translate(-50%, -50%) scale(0.95); }\r
}\r
\r
@media (max-width: 640px) {\r
  .kanban-view {\r
    padding: 10px;\r
  }\r
\r
  .kanban-column {\r
    width: 272px;\r
    min-width: 272px;\r
  }\r
\r
  .kanban-form-row {\r
    grid-template-columns: minmax(0, 1fr);\r
  }\r
\r
  .kanban-dialog-content {\r
    max-height: calc(100dvh - 24px);\r
  }\r
\r
  .kanban-dialog-header {\r
    padding-left: 14px;\r
  }\r
\r
  .kanban-dialog-body {\r
    padding: 14px;\r
  }\r
\r
  .kanban-dialog-footer {\r
    padding: 12px 14px;\r
  }\r
}\r
\r
@media (max-width: 440px) {\r
  .kanban-editor-setting {\r
    grid-template-columns: minmax(0, 1fr);\r
    gap: 8px;\r
  }\r
}\r
\r
@media (prefers-reduced-motion: reduce) {\r
  .kanban-root,\r
  .kanban-root *,\r
  .kanban-portal,\r
  .kanban-portal * {\r
    animation-duration: 0.01ms !important;\r
    animation-iteration-count: 1 !important;\r
    transition-duration: 0s !important;\r
  }\r
}\r
\r
/* Task details retain the dialog's focus management while using the full height. */\r
.kanban-dialog-content.kanban-drawer-content {\r
  top: 0;\r
  right: 0;\r
  bottom: 0;\r
  left: auto;\r
  height: 100dvh;\r
  max-width: 100%;\r
  max-height: 100dvh;\r
  border-width: 0 0 0 1px;\r
  border-radius: 0;\r
  transform: none;\r
}\r
\r
.kanban-drawer-content[data-state="open"] {\r
  animation: kanban-drawer-in 180ms ease-out;\r
}\r
\r
.kanban-drawer-content[data-state="closed"] {\r
  animation: kanban-drawer-out 150ms ease-in;\r
}\r
\r
.kanban-drawer-content[data-resizing] {\r
  user-select: none;\r
}\r
\r
.kanban-drawer-resize {\r
  position: absolute;\r
  z-index: 1;\r
  top: 0;\r
  bottom: 0;\r
  left: 0;\r
  width: 10px;\r
  outline: none;\r
  cursor: col-resize;\r
  touch-action: none;\r
}\r
\r
.kanban-drawer-resize::after {\r
  position: absolute;\r
  top: calc(50% - 24px);\r
  left: 3px;\r
  width: 3px;\r
  height: 48px;\r
  border-radius: 2px;\r
  background: var(--dsw-alias-border-l2);\r
  content: "";\r
}\r
\r
.kanban-drawer-resize:hover::after,\r
.kanban-drawer-resize:focus-visible::after,\r
.kanban-drawer-content[data-resizing] .kanban-drawer-resize::after {\r
  background: var(--dsw-alias-label-secondary);\r
}\r
\r
.kanban-drawer-resize:focus-visible {\r
  box-shadow: inset 0 0 0 2px var(--dsw-alias-label-secondary);\r
}\r
\r
@keyframes kanban-drawer-in {\r
  from { transform: translateX(100%); }\r
  to { transform: translateX(0); }\r
}\r
\r
@keyframes kanban-drawer-out {\r
  from { transform: translateX(0); }\r
  to { transform: translateX(100%); }\r
}\r
\r
@media (max-width: 600px) {\r
  .kanban-dialog-content.kanban-drawer-content {\r
    border-left-width: 0;\r
  }\r
}\r
\r
/* ---- Workflow automation (orchestrator) dialog ---- */\r
.kanban-orch-dialog { max-width: 640px; }\r
\r
.kanban-orch-grid {\r
  display: grid;\r
  grid-template-columns: 1fr;\r
  gap: 8px;\r
  margin: 8px 0;\r
}\r
\r
.kanban-orch-wip { width: 88px; }\r
\r
.kanban-orch-selects {\r
  display: grid;\r
  grid-template-columns: repeat(auto-fit, minmax(170px, 1fr));\r
  gap: 8px;\r
  margin: 8px 0;\r
}\r
\r
.kanban-orch-select {\r
  display: flex;\r
  flex-direction: column;\r
  gap: 4px;\r
  font-size: 12px;\r
  color: var(--dsw-alias-label-secondary);\r
}\r
\r
.kanban-orch-checks {\r
  display: flex;\r
  flex-direction: column;\r
  gap: 6px;\r
  margin: 8px 0;\r
}\r
\r
.kanban-orch-check {\r
  display: flex;\r
  gap: 8px;\r
  align-items: flex-start;\r
  font-size: 13px;\r
  cursor: pointer;\r
}\r
\r
.kanban-orch-check input[type="checkbox"] {\r
  margin-top: 3px;\r
  accent-color: var(--dsw-alias-accent);\r
}\r
\r
.kanban-orch-check-title { font-weight: 500; }\r
\r
.kanban-orch-rows {\r
  display: flex;\r
  flex-direction: column;\r
  gap: 6px;\r
  margin-top: 6px;\r
}\r
\r
.kanban-orch-row {\r
  display: flex;\r
  align-items: center;\r
  justify-content: space-between;\r
  gap: 8px;\r
  padding: 6px 8px;\r
  border: 1px solid var(--dsw-alias-border-l1);\r
  border-radius: 8px;\r
}\r
\r
.kanban-orch-col-title {\r
  display: inline-flex;\r
  gap: 6px;\r
  align-items: center;\r
  font-size: 13px;\r
  font-weight: 500;\r
}\r
\r
.kanban-orch-count,\r
.kanban-orch-done-tag {\r
  padding: 0 6px;\r
  border-radius: 8px;\r
  font-size: 11px;\r
  font-weight: 400;\r
  color: var(--dsw-alias-label-secondary);\r
  background: var(--dsw-alias-fill-tertiary);\r
}\r
\r
.kanban-orch-row-controls {\r
  display: inline-flex;\r
  gap: 8px;\r
  align-items: center;\r
}\r
\r
.kanban-orch-inline { font-size: 12px; white-space: nowrap; }\r
.kanban-orch-inline input[type="checkbox"] { margin-top: 2px; }\r
.kanban-orch-role { width: 150px; }\r
.kanban-orch-roles-hint { margin-bottom: 4px; }\r
\r
.kanban-orch-badge {\r
  margin-left: 8px;\r
  padding: 1px 8px;\r
  border-radius: 10px;\r
  font-size: 11px;\r
  font-weight: 400;\r
  color: var(--dsw-alias-label-primary);\r
  background: var(--dsw-alias-fill-secondary);\r
}\r
\r
.kanban-orch-active {\r
  margin: 4px 0 8px 18px;\r
  font-size: 12px;\r
}\r
\r
.kanban-orch-log {\r
  max-height: 140px;\r
  overflow-y: auto;\r
  padding: 6px 8px;\r
  border-radius: 8px;\r
  background: var(--dsw-alias-fill-tertiary);\r
  font-size: 11px;\r
  font-family: var(--dsw-code-font-family, ui-monospace, monospace);\r
}\r
\r
.kanban-orch-log-line {\r
  display: flex;\r
  gap: 6px;\r
  line-height: 1.6;\r
}\r
\r
.kanban-orch-log-ts { color: var(--dsw-alias-label-tertiary); }\r
.kanban-orch-log-type { min-width: 96px; color: var(--dsw-alias-accent); }\r
\r
.kanban-orch-footer {\r
  display: flex;\r
  align-items: center;\r
  justify-content: flex-end;\r
  width: 100%;\r
  gap: 8px;\r
}\r
\r
.kanban-orch-footer-actions { display: inline-flex; gap: 8px; }\r
\r
.kanban-orch-saved {\r
  margin-right: auto;\r
  font-size: 12px;\r
  color: var(--dsw-alias-success, var(--dsw-alias-accent));\r
}\r
\r
/* ---- Standalone Kanban page (global sidebar panel) ---- */\r
.kanban-main-shell {\r
  height: 100%;\r
  min-height: 0;\r
}\r
.kanban-page {\r
  height: 100%;\r
  min-height: 0;\r
  padding: 8px 12px;\r
  display: flex;\r
  flex-direction: column;\r
  gap: 6px;\r
}\r
.kanban-page .kanban-view {\r
  flex: 1;\r
  min-height: 0;\r
}\r
.kanban-page-head {\r
  display: flex;\r
  align-items: center;\r
  gap: 8px;\r
}\r
.kanban-page-label {\r
  color: var(--dsw-alias-text-secondary, #888);\r
  font-size: 12px;\r
}\r
.kanban-page-select {\r
  background: var(--dsw-alias-bg-secondary, #1c1c1c);\r
  color: inherit;\r
  border: 1px solid var(--dsw-alias-border, #333);\r
  border-radius: 6px;\r
  padding: 4px 8px;\r
  font-size: 13px;\r
}\r
\r
/* ---- Card attachments ---- */\r
.kanban-attach-box {\r
  display: flex;\r
  flex-direction: column;\r
  gap: 6px;\r
  border-top: 1px solid var(--dsw-alias-border, #333);\r
  padding-top: 8px;\r
}\r
.kanban-attach-groups {\r
  display: flex;\r
  flex-direction: column;\r
  gap: 6px;\r
  max-height: 180px;\r
  overflow-y: auto;\r
}\r
.kanban-attach-creator {\r
  font-size: 11px;\r
  text-transform: uppercase;\r
  letter-spacing: 0.04em;\r
  color: var(--dsw-alias-text-secondary, #888);\r
  margin-bottom: 2px;\r
}\r
.kanban-attach-list {\r
  list-style: none;\r
  margin: 0;\r
  padding: 0;\r
  display: flex;\r
  flex-direction: column;\r
  gap: 2px;\r
}\r
.kanban-attach-file {\r
  display: flex;\r
  align-items: center;\r
  gap: 6px;\r
  width: 100%;\r
  background: none;\r
  border: none;\r
  border-radius: 4px;\r
  color: inherit;\r
  cursor: pointer;\r
  font-size: 13px;\r
  padding: 3px 6px;\r
  text-align: left;\r
}\r
.kanban-attach-file:hover {\r
  background: var(--dsw-alias-bg-hover, rgba(128, 128, 128, 0.15));\r
}\r
.kanban-attach-file.is-active {\r
  background: var(--dsw-alias-bg-secondary, rgba(128, 128, 128, 0.2));\r
}\r
.kanban-attach-name {\r
  flex: 1;\r
  overflow: hidden;\r
  text-overflow: ellipsis;\r
  white-space: nowrap;\r
}\r
.kanban-attach-meta {\r
  color: var(--dsw-alias-text-secondary, #888);\r
  font-size: 11px;\r
  white-space: nowrap;\r
}\r
.kanban-attach-preview {\r
  border: 1px solid var(--dsw-alias-border, #333);\r
  border-radius: 6px;\r
  padding: 6px 8px;\r
  max-height: 240px;\r
  display: flex;\r
  flex-direction: column;\r
  gap: 4px;\r
}\r
.kanban-attach-preview-head {\r
  display: flex;\r
  align-items: center;\r
  gap: 8px;\r
  font-size: 12px;\r
}\r
.kanban-attach-preview-body {\r
  overflow: auto;\r
  max-height: 180px;\r
  margin: 0;\r
  font-size: 12px;\r
  white-space: pre-wrap;\r
  word-break: break-word;\r
}\r
.kanban-orch-model-input {\r
  width: 100%;\r
  margin-top: 4px;\r
}\r
\r
.kanban-open-session {\r
  margin-right: auto;\r
}\r
`;
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
.kanban-wf-row{display:grid;grid-template-columns:14px 40px minmax(110px,1fr) minmax(100px,1fr) minmax(112px,1fr) 26px;grid-template-areas:"grip dot name role step del";gap:8px;align-items:center}\
.kanban-wf-headrow{display:grid;grid-template-columns:14px 40px minmax(110px,1fr) minmax(100px,1fr) minmax(112px,1fr) 26px;gap:8px;align-items:center;font:11px var(--dsw-font-xxs-12,sans-serif);color:var(--dsw-alias-label-secondary,#9aa1ab);padding:0 0 2px}\
.kanban-wf-headrow span{min-width:0}.kanban-wf-headrow .h-dot{grid-column:1/3}.kanban-wf-headrow .h-name{grid-column:3}.kanban-wf-headrow .h-role{grid-column:4}.kanban-wf-headrow .h-step{grid-column:5}.kanban-wf-headrow .h-del{grid-column:6}\
.kanban-wf-a-grip{grid-area:grip}.kanban-wf-a-dot{grid-area:dot}.kanban-wf-a-name{grid-area:name}.kanban-wf-a-role{grid-area:role}.kanban-wf-a-step{grid-area:step}.kanban-wf-a-del{grid-area:del;display:flex;gap:6px}\
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
@media (max-width:980px){.kanban-wf{inset:8px}.kanban-wf-headrow,.kanban-wf-row{grid-template-columns:14px 32px minmax(84px,1fr) minmax(84px,1fr) minmax(92px,1fr) 26px}}';
var WF_MAX_COLUMNS = 12;
// R3.8 (k1601): drag state is module-level on purpose. A single panel is open at a time, and the drop
// handler plus the dragend handler have to see the same values regardless of which render they came from.
var wfDrag = { from: -1, over: -1, grab: -1, pos: -1, committed: false };
var dr=require("react");var fn=require("react");var Ui=e=>e?.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase();function qi(e,t,a=[]){if(t==null)throw new Error("[lucide]: iconNode is required when icon name is used");return{name:Ui(e),size:24,node:t,...a.length>0?{aliases:a}:{}}}var Wi=e=>{let t="",a=!1;for(let o of e){if(o==="-"||o==="_"||o<=" "){a=t.length>0;continue}t.length===0?t+=o.toLowerCase():t+=a?o.toUpperCase():o,a=!1}return t};var zi=e=>{let t=Wi(e);return t.charAt(0).toUpperCase()+t.slice(1)};var gr=require("react");var hr=(...e)=>e.filter((t,a,o)=>!!t&&t.trim()!==""&&o.indexOf(t)===a).join(" ").trim();var Da={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":2,"stroke-linecap":"round","stroke-linejoin":"round"};function Ms(e){return e!=null}function Vi(e,t={}){let a=t.attributeNames??{},o=f=>a[f]??f,r=e.size??e.width??Da.width,n=e.size??e.height??Da.height,l=e.aliases?.filter(f=>typeof f=="string"&&f.trim()!=="").map(f=>`lucide-${f}`)??[],s=[...e.name?[`lucide-${e.name}`]:[],...l],i=t.className?.split(" ").filter(Boolean)??[],u=t.includeDefaultClasses===!1?hr(...i):hr("lucide",...s,...i),c=t.absoluteStrokeWidth?Number(t.strokeWidth??Da["stroke-width"])*Number(e.size??e.width??Da.width)/Number(t.size??t.width??Da.width):t.strokeWidth??Da["stroke-width"];return["svg",{...Object.entries(Da).reduce((f,[m,h])=>(f[o(m)]=h,f),{}),..."color"in t&&t.color&&{[o("stroke")]:t.color},..."size"in t&&Ms(t.size)&&{[o("width")]:t.size,[o("height")]:t.size},..."width"in t&&Ms(t.width)&&{[o("width")]:t.width},..."height"in t&&Ms(t.height)&&{[o("height")]:t.height},[o("stroke-width")]:c,...u&&{[o("class")]:u},[o("viewBox")]:`0 0 ${r} ${n}`,...t.hasA11yProp===!1?{[o("aria-hidden")]:"true"}:{},..."attributes"in t&&t.attributes},e.node.map(f=>{let[m,h,p]=f,g=t.nonScalingStroke?{[o("vector-effect")]:"non-scaling-stroke",...h}:h;return p?[m,g,p]:[m,g]})]}function Gi(e,t={}){return Vi(e,{...t,attributeNames:{...t.attributeNames,class:"className","stroke-width":"strokeWidth","stroke-linecap":"strokeLinecap","stroke-linejoin":"strokeLinejoin","vector-effect":"vectorEffect"}})}var Ki=e=>{for(let t in e)if(t.startsWith("aria-")||t==="role"||t==="title")return!0;return!1};var Bo=require("react");var th=(0,Bo.createContext)({});var Xi=()=>(0,Bo.useContext)(th);var ji=(0,gr.forwardRef)(({color:e,size:t,width:a,height:o,strokeWidth:r,absoluteStrokeWidth:n,nonScalingStroke:l,className:s="",children:i,iconNode:u=[],icon:c={node:u,aliases:[],size:24},...d},f)=>{let{size:m=24,strokeWidth:h=2,absoluteStrokeWidth:p=!1,nonScalingStroke:g=!1,color:x="currentColor",className:L=""}=Xi()??{},C=!!i||Ki(d),[v,y,b=[]]=Gi(c,{color:e??x,width:a??t??m,height:o??t??m,strokeWidth:r??h,absoluteStrokeWidth:n??p,nonScalingStroke:l??g,className:hr(L,s),hasA11yProp:C,attributes:d});return(0,gr.createElement)(v,{ref:f,...y},[...b.map(([S,R])=>(0,gr.createElement)(S,R)),...Array.isArray(i)?i:[i]])});function ne(e,t=[],a=[]){let o=typeof e=="string"?qi(e,t,a):e,r=(0,fn.forwardRef)(({className:n,...l},s)=>(0,fn.createElement)(ji,{ref:s,icon:o,className:n,...l}));return o.name&&(r.displayName=zi(o.name)),r}var $i={name:"bot",size:24,node:[["path",{d:"M12 8V4H8",key:"hb8ula"}],["rect",{width:"16",height:"12",x:"4",y:"8",rx:"2",key:"enze0r"}],["path",{d:"M2 14h2",key:"vft8re"}],["path",{d:"M20 14h2",key:"4cs60a"}],["path",{d:"M15 13v2",key:"1xurst"}],["path",{d:"M9 13v2",key:"rq6x2g"}]]};$i.node;var xr=ne($i);var Yi={name:"calendar-days",size:24,node:[["path",{d:"M8 2v3",key:"1ioesn"}],["path",{d:"M16 2v3",key:"otl347"}],["rect",{x:"3",y:"3",width:"18",height:"18",rx:"2",key:"h1oib"}],["path",{d:"M3 9h18",key:"1pudct"}],["path",{d:"M8 13h.01",key:"1sbv64"}],["path",{d:"M12 13h.01",key:"y0uutt"}],["path",{d:"M16 13h.01",key:"wip0gl"}],["path",{d:"M8 17h.01",key:"p3bg7i"}],["path",{d:"M12 17h.01",key:"p32p05"}],["path",{d:"M16 17h.01",key:"ql8jdd"}]]};Yi.node;var Ga=ne(Yi);var Zi={name:"check",size:24,node:[["path",{d:"M20 6 9 17l-5-5",key:"1gmf2c"}]]};Zi.node;var ft=ne(Zi);var Ji={name:"chevron-down",size:24,node:[["path",{d:"m6 9 6 6 6-6",key:"qrunsl"}]]};Ji.node;var No=ne(Ji);var Qi={name:"chevron-up",size:24,node:[["path",{d:"m18 15-6-6-6 6",key:"153udz"}]]};Qi.node;var br=ne(Qi);var eu={name:"external-link",size:24,node:[["path",{d:"M15 3h6v6",key:"1q9fwt"}],["path",{d:"M10 14 21 3",key:"gplh6r"}],["path",{d:"M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6",key:"a6xqqp"}]]};eu.node;var Cr=ne(eu);var tu={name:"file-text",size:24,node:[["path",{d:"M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z",key:"1oefj6"}],["path",{d:"M14 2v5a1 1 0 0 0 1 1h5",key:"wfsgrz"}],["path",{d:"M10 9H8",key:"b1mrlr"}],["path",{d:"M16 13H8",key:"t4e002"}],["path",{d:"M16 17H8",key:"z1uh3a"}]]};tu.node;var Lr=ne(tu);var au={name:"funnel",size:24,node:[["path",{d:"M10 20a1 1 0 0 0 .553.895l2 1A1 1 0 0 0 14 21v-7a2 2 0 0 1 .517-1.341L21.74 4.67A1 1 0 0 0 21 3H3a1 1 0 0 0-.742 1.67l7.225 7.989A2 2 0 0 1 10 14z",key:"sc7q7i"}]],aliases:["filter"]};au.node;var Ma=ne(au);var ou={name:"grip-vertical",size:24,node:[["circle",{cx:"9",cy:"12",r:"1",key:"1vctgf"}],["circle",{cx:"9",cy:"5",r:"1",key:"hp0tcf"}],["circle",{cx:"9",cy:"19",r:"1",key:"fkjjf6"}],["circle",{cx:"15",cy:"12",r:"1",key:"1tmaij"}],["circle",{cx:"15",cy:"5",r:"1",key:"19l28e"}],["circle",{cx:"15",cy:"19",r:"1",key:"f4zoj3"}]]};ou.node;var vr=ne(ou);var ru={name:"list",size:24,node:[["path",{d:"M3 5h.01",key:"18ugdj"}],["path",{d:"M3 12h.01",key:"nlz23k"}],["path",{d:"M3 19h.01",key:"noohij"}],["path",{d:"M8 5h13",key:"1pao27"}],["path",{d:"M8 12h13",key:"1za7za"}],["path",{d:"M8 19h13",key:"m83p4d"}]]};ru.node;var Ir=ne(ru);var nu={name:"message-square",size:24,node:[["path",{d:"M22 17a2 2 0 0 1-2 2H6.828a2 2 0 0 0-1.414.586l-2.202 2.202A.71.71 0 0 1 2 21.286V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2z",key:"18887p"}]]};nu.node;var Ka=ne(nu);var su={name:"pencil",size:24,node:[["path",{d:"M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z",key:"1a8usu"}],["path",{d:"m15 5 4 4",key:"1mk7zo"}]]};su.node;var wr=ne(su);var lu={name:"play",size:24,node:[["path",{d:"M5 5a2 2 0 0 1 3.008-1.728l11.997 6.998a2 2 0 0 1 .003 3.458l-12 7A2 2 0 0 1 5 19z",key:"10ikf1"}]]};lu.node;var Sr=ne(lu);var iu={name:"plus",size:24,node:[["path",{d:"M5 12h14",key:"1ays0h"}],["path",{d:"M12 5v14",key:"s699le"}]]};iu.node;var Xa=ne(iu);var uu={name:"refresh-cw",size:24,node:[["path",{d:"M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8",key:"v9h5vc"}],["path",{d:"M21 3v5h-5",key:"1q7to0"}],["path",{d:"M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16",key:"3uifl3"}],["path",{d:"M8 16H3v5",key:"1cv678"}]]};uu.node;var ja=ne(uu);var du={name:"send",size:24,node:[["path",{d:"M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z",key:"1ffxy3"}],["path",{d:"m21.854 2.147-10.94 10.939",key:"12cjpa"}]]};du.node;var yr=ne(du);var cu={name:"settings-2",size:24,node:[["path",{d:"M14 17H5",key:"gfn3mx"}],["path",{d:"M19 7h-9",key:"6i9tg"}],["circle",{cx:"17",cy:"17",r:"3",key:"18b49y"}],["circle",{cx:"7",cy:"7",r:"3",key:"dfmy0x"}]]};cu.node;var kr=ne(cu);var fu={name:"square-kanban",size:24,node:[["rect",{width:"18",height:"18",x:"3",y:"3",rx:"2",key:"afitv7"}],["path",{d:"M8 7v7",key:"1x2jlm"}],["path",{d:"M12 7v4",key:"xawao1"}],["path",{d:"M16 7v9",key:"1hp2iy"}]],aliases:["kanban-square"]};fu.node;var Aa=ne(fu);var pu={name:"tag",size:24,node:[["path",{d:"M12.586 2.586A2 2 0 0 0 11.172 2H4a2 2 0 0 0-2 2v7.172a2 2 0 0 0 .586 1.414l8.704 8.704a2.426 2.426 0 0 0 3.42 0l6.58-6.58a2.426 2.426 0 0 0 0-3.42z",key:"vktsd0"}],["circle",{cx:"7.5",cy:"7.5",r:".5",fill:"currentColor",key:"kqv944"}]]};pu.node;var _o=ne(pu);var mu={name:"tags",size:24,node:[["path",{d:"M13.172 2a2 2 0 0 1 1.414.586l6.71 6.71a2.4 2.4 0 0 1 0 3.408l-4.592 4.592a2.4 2.4 0 0 1-3.408 0l-6.71-6.71A2 2 0 0 1 6 9.172V3a1 1 0 0 1 1-1z",key:"16rjxf"}],["path",{d:"M2 7v6.172a2 2 0 0 0 .586 1.414l6.71 6.71a2.4 2.4 0 0 0 3.191.193",key:"178nd4"}],["circle",{cx:"10.5",cy:"6.5",r:".5",fill:"currentColor",key:"12ikhr"}]]};mu.node;var Rr=ne(mu);var hu={name:"trash",size:24,node:[["path",{d:"M10 11v6",key:"nco0om"}],["path",{d:"M14 11v6",key:"outv1u"}],["path",{d:"M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6",key:"miytrc"}],["path",{d:"M3 6h18",key:"d0wm0j"}],["path",{d:"M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2",key:"e791ji"}]],aliases:["trash-2"]};hu.node;var Mt=ne(hu);var gu={name:"x",size:24,node:[["path",{d:"M18 6 6 18",key:"1bl5f8"}],["path",{d:"m6 6 12 12",key:"d8bk6v"}]]};gu.node;var ua=ne(gu);var pe=require("react");var D=$(require("react")),to=require("react-dom");var Ee=require("react");function bu(){for(var e=arguments.length,t=new Array(e),a=0;a<e;a++)t[a]=arguments[a];return(0,Ee.useMemo)(()=>o=>{t.forEach(r=>r(o))},t)}var Pr=typeof window<"u"&&typeof window.document<"u"&&typeof window.document.createElement<"u";function $a(e){let t=Object.prototype.toString.call(e);return t==="[object Window]"||t==="[object global]"}function pn(e){return"nodeType"in e}function nt(e){var t,a;return e?$a(e)?e:pn(e)&&(t=(a=e.ownerDocument)==null?void 0:a.defaultView)!=null?t:window:window}function mn(e){let{Document:t}=nt(e);return e instanceof t}function Ho(e){return $a(e)?!1:e instanceof nt(e).HTMLElement}function Ts(e){return e instanceof nt(e).SVGElement}function Ya(e){return e?$a(e)?e.document:pn(e)?mn(e)?e:Ho(e)||Ts(e)?e.ownerDocument:document:document:document}var It=Pr?Ee.useLayoutEffect:Ee.useEffect;function Dr(e){let t=(0,Ee.useRef)(e);return It(()=>{t.current=e}),(0,Ee.useCallback)(function(){for(var a=arguments.length,o=new Array(a),r=0;r<a;r++)o[r]=arguments[r];return t.current==null?void 0:t.current(...o)},[])}function Cu(){let e=(0,Ee.useRef)(null),t=(0,Ee.useCallback)((o,r)=>{e.current=setInterval(o,r)},[]),a=(0,Ee.useCallback)(()=>{e.current!==null&&(clearInterval(e.current),e.current=null)},[]);return[t,a]}function Uo(e,t){t===void 0&&(t=[e]);let a=(0,Ee.useRef)(e);return It(()=>{a.current!==e&&(a.current=e)},t),a}function qo(e,t){let a=(0,Ee.useRef)();return(0,Ee.useMemo)(()=>{let o=e(a.current);return a.current=o,o},[...t])}function Mr(e){let t=Dr(e),a=(0,Ee.useRef)(null),o=(0,Ee.useCallback)(r=>{r!==a.current&&t?.(r,a.current),a.current=r},[]);return[a,o]}function Ar(e){let t=(0,Ee.useRef)();return(0,Ee.useEffect)(()=>{t.current=e},[e]),t.current}var As={};function Za(e,t){return(0,Ee.useMemo)(()=>{if(t)return t;let a=As[e]==null?0:As[e]+1;return As[e]=a,e+"-"+a},[e,t])}function Lu(e){return function(t){for(var a=arguments.length,o=new Array(a>1?a-1:0),r=1;r<a;r++)o[r-1]=arguments[r];return o.reduce((n,l)=>{let s=Object.entries(l);for(let[i,u]of s){let c=n[i];c!=null&&(n[i]=c+e*u)}return n},{...t})}}var Ja=Lu(1),Qa=Lu(-1);function ah(e){return"clientX"in e&&"clientY"in e}function Wo(e){if(!e)return!1;let{KeyboardEvent:t}=nt(e.target);return t&&e instanceof t}function oh(e){if(!e)return!1;let{TouchEvent:t}=nt(e.target);return t&&e instanceof t}function Tr(e){if(oh(e)){if(e.touches&&e.touches.length){let{clientX:t,clientY:a}=e.touches[0];return{x:t,y:a}}else if(e.changedTouches&&e.changedTouches.length){let{clientX:t,clientY:a}=e.changedTouches[0];return{x:t,y:a}}}return ah(e)?{x:e.clientX,y:e.clientY}:null}var vt=Object.freeze({Translate:{toString(e){if(!e)return;let{x:t,y:a}=e;return"translate3d("+(t?Math.round(t):0)+"px, "+(a?Math.round(a):0)+"px, 0)"}},Scale:{toString(e){if(!e)return;let{scaleX:t,scaleY:a}=e;return"scaleX("+t+") scaleY("+a+")"}},Transform:{toString(e){if(e)return[vt.Translate.toString(e),vt.Scale.toString(e)].join(" ")}},Transition:{toString(e){let{property:t,duration:a,easing:o}=e;return t+" "+a+"ms "+o}}}),xu="a,frame,iframe,input:not([type=hidden]):not(:disabled),select:not(:disabled),textarea:not(:disabled),button:not(:disabled),*[tabindex]";function vu(e){return e.matches(xu)?e:e.querySelector(xu)}var eo=$(require("react")),rh={display:"none"};function Iu(e){let{id:t,value:a}=e;return eo.default.createElement("div",{id:t,style:rh},a)}function wu(e){let{id:t,announcement:a,ariaLiveType:o="assertive"}=e,r={position:"fixed",top:0,left:0,width:1,height:1,margin:-1,border:0,padding:0,overflow:"hidden",clip:"rect(0 0 0 0)",clipPath:"inset(100%)",whiteSpace:"nowrap"};return eo.default.createElement("div",{id:t,style:r,role:"status","aria-live":o,"aria-atomic":!0},a)}function Su(){let[e,t]=(0,eo.useState)("");return{announce:(0,eo.useCallback)(o=>{o!=null&&t(o)},[]),announcement:e}}var Nu=(0,D.createContext)(null);function nh(e){let t=(0,D.useContext)(Nu);(0,D.useEffect)(()=>{if(!t)throw new Error("useDndMonitor must be used within a children of <DndContext>");return t(e)},[e,t])}function sh(){let[e]=(0,D.useState)(()=>new Set),t=(0,D.useCallback)(o=>(e.add(o),()=>e.delete(o)),[e]);return[(0,D.useCallback)(o=>{let{type:r,event:n}=o;e.forEach(l=>{var s;return(s=l[r])==null?void 0:s.call(l,n)})},[e]),t]}var lh={draggable:`
    To pick up a draggable item, press the space bar.
    While dragging, use the arrow keys to move the item.
    Press space again to drop the item in its new position, or press escape to cancel.
  `},ih={onDragStart(e){let{active:t}=e;return"Picked up draggable item "+t.id+"."},onDragOver(e){let{active:t,over:a}=e;return a?"Draggable item "+t.id+" was moved over droppable area "+a.id+".":"Draggable item "+t.id+" is no longer over a droppable area."},onDragEnd(e){let{active:t,over:a}=e;return a?"Draggable item "+t.id+" was dropped over droppable area "+a.id:"Draggable item "+t.id+" was dropped."},onDragCancel(e){let{active:t}=e;return"Dragging was cancelled. Draggable item "+t.id+" was dropped."}};function uh(e){let{announcements:t=ih,container:a,hiddenTextDescribedById:o,screenReaderInstructions:r=lh}=e,{announce:n,announcement:l}=Su(),s=Za("DndLiveRegion"),[i,u]=(0,D.useState)(!1);if((0,D.useEffect)(()=>{u(!0)},[]),nh((0,D.useMemo)(()=>({onDragStart(d){let{active:f}=d;n(t.onDragStart({active:f}))},onDragMove(d){let{active:f,over:m}=d;t.onDragMove&&n(t.onDragMove({active:f,over:m}))},onDragOver(d){let{active:f,over:m}=d;n(t.onDragOver({active:f,over:m}))},onDragEnd(d){let{active:f,over:m}=d;n(t.onDragEnd({active:f,over:m}))},onDragCancel(d){let{active:f,over:m}=d;n(t.onDragCancel({active:f,over:m}))}}),[n,t])),!i)return null;let c=D.default.createElement(D.default.Fragment,null,D.default.createElement(Iu,{id:o,value:r.draggable}),D.default.createElement(wu,{id:s,announcement:l}));return a?(0,to.createPortal)(c,a):c}var ze;(function(e){e.DragStart="dragStart",e.DragMove="dragMove",e.DragEnd="dragEnd",e.DragCancel="dragCancel",e.DragOver="dragOver",e.RegisterDroppable="registerDroppable",e.SetDroppableDisabled="setDroppableDisabled",e.UnregisterDroppable="unregisterDroppable"})(ze||(ze={}));function gn(){}function ro(e,t){return(0,D.useMemo)(()=>({sensor:e,options:t??{}}),[e,t])}function bn(){for(var e=arguments.length,t=new Array(e),a=0;a<e;a++)t[a]=arguments[a];return(0,D.useMemo)(()=>[...t].filter(o=>o!=null),[...t])}var Nt=Object.freeze({x:0,y:0});function Us(e,t){return Math.sqrt(Math.pow(e.x-t.x,2)+Math.pow(e.y-t.y,2))}function dh(e,t){let a=Tr(e);if(!a)return"0 0";let o={x:(a.x-t.left)/t.width*100,y:(a.y-t.top)/t.height*100};return o.x+"% "+o.y+"%"}function qs(e,t){let{data:{value:a}}=e,{data:{value:o}}=t;return a-o}function ch(e,t){let{data:{value:a}}=e,{data:{value:o}}=t;return o-a}function Bs(e){let{left:t,top:a,height:o,width:r}=e;return[{x:t,y:a},{x:t+r,y:a},{x:t,y:a+o},{x:t+r,y:a+o}]}function Hr(e,t){if(!e||e.length===0)return null;let[a]=e;return t?a[t]:a}function yu(e,t,a){return t===void 0&&(t=e.left),a===void 0&&(a=e.top),{x:t+e.width*.5,y:a+e.height*.5}}var _u=e=>{let{collisionRect:t,droppableRects:a,droppableContainers:o}=e,r=yu(t,t.left,t.top),n=[];for(let l of o){let{id:s}=l,i=a.get(s);if(i){let u=Us(yu(i),r);n.push({id:s,data:{droppableContainer:l,value:u}})}}return n.sort(qs)},Cn=e=>{let{collisionRect:t,droppableRects:a,droppableContainers:o}=e,r=Bs(t),n=[];for(let l of o){let{id:s}=l,i=a.get(s);if(i){let u=Bs(i),c=r.reduce((f,m,h)=>f+Us(u[h],m),0),d=Number((c/4).toFixed(4));n.push({id:s,data:{droppableContainer:l,value:d}})}}return n.sort(qs)};function fh(e,t){let a=Math.max(t.top,e.top),o=Math.max(t.left,e.left),r=Math.min(t.left+t.width,e.left+e.width),n=Math.min(t.top+t.height,e.top+e.height),l=r-o,s=n-a;if(o<r&&a<n){let i=t.width*t.height,u=e.width*e.height,c=l*s,d=c/(i+u-c);return Number(d.toFixed(4))}return 0}var Ws=e=>{let{collisionRect:t,droppableRects:a,droppableContainers:o}=e,r=[];for(let n of o){let{id:l}=n,s=a.get(l);if(s){let i=fh(s,t);i>0&&r.push({id:l,data:{droppableContainer:n,value:i}})}}return r.sort(ch)};function ph(e,t){let{top:a,left:o,bottom:r,right:n}=t;return a<=e.y&&e.y<=r&&o<=e.x&&e.x<=n}var Hu=e=>{let{droppableContainers:t,droppableRects:a,pointerCoordinates:o}=e;if(!o)return[];let r=[];for(let n of t){let{id:l}=n,s=a.get(l);if(s&&ph(o,s)){let u=Bs(s).reduce((d,f)=>d+Us(o,f),0),c=Number((u/4).toFixed(4));r.push({id:l,data:{droppableContainer:n,value:c}})}}return r.sort(qs)};function mh(e,t,a){return{...e,scaleX:t&&a?t.width/a.width:1,scaleY:t&&a?t.height/a.height:1}}function Uu(e,t){return e&&t?{x:e.left-t.left,y:e.top-t.top}:Nt}function hh(e){return function(a){for(var o=arguments.length,r=new Array(o>1?o-1:0),n=1;n<o;n++)r[n-1]=arguments[n];return r.reduce((l,s)=>({...l,top:l.top+e*s.y,bottom:l.bottom+e*s.y,left:l.left+e*s.x,right:l.right+e*s.x}),{...a})}}var gh=hh(1);function qu(e){if(e.startsWith("matrix3d(")){let t=e.slice(9,-1).split(/, /);return{x:+t[12],y:+t[13],scaleX:+t[0],scaleY:+t[5]}}else if(e.startsWith("matrix(")){let t=e.slice(7,-1).split(/, /);return{x:+t[4],y:+t[5],scaleX:+t[0],scaleY:+t[3]}}return null}function xh(e,t,a){let o=qu(t);if(!o)return e;let{scaleX:r,scaleY:n,x:l,y:s}=o,i=e.left-l-(1-r)*parseFloat(a),u=e.top-s-(1-n)*parseFloat(a.slice(a.indexOf(" ")+1)),c=r?e.width/r:e.width,d=n?e.height/n:e.height;return{width:c,height:d,top:u,right:i+c,bottom:u+d,left:i}}var bh={ignoreTransform:!1};function no(e,t){t===void 0&&(t=bh);let a=e.getBoundingClientRect();if(t.ignoreTransform){let{transform:u,transformOrigin:c}=nt(e).getComputedStyle(e);u&&(a=xh(a,u,c))}let{top:o,left:r,width:n,height:l,bottom:s,right:i}=a;return{top:o,left:r,width:n,height:l,bottom:s,right:i}}function ku(e){return no(e,{ignoreTransform:!0})}function Ch(e){let t=e.innerWidth,a=e.innerHeight;return{top:0,left:0,right:t,bottom:a,width:t,height:a}}function Lh(e,t){return t===void 0&&(t=nt(e).getComputedStyle(e)),t.position==="fixed"}function vh(e,t){t===void 0&&(t=nt(e).getComputedStyle(e));let a=/(auto|scroll|overlay)/;return["overflow","overflowX","overflowY"].some(r=>{let n=t[r];return typeof n=="string"?a.test(n):!1})}function Ur(e,t){let a=[];function o(r){if(t!=null&&a.length>=t||!r)return a;if(mn(r)&&r.scrollingElement!=null&&!a.includes(r.scrollingElement))return a.push(r.scrollingElement),a;if(!Ho(r)||Ts(r)||a.includes(r))return a;let n=nt(e).getComputedStyle(r);return r!==e&&vh(r,n)&&a.push(r),Lh(r,n)?a:o(r.parentNode)}return e?o(e):a}function Wu(e){let[t]=Ur(e,1);return t??null}function Es(e){return!Pr||!e?null:$a(e)?e:pn(e)?mn(e)||e===Ya(e).scrollingElement?window:Ho(e)?e:null:null}function zu(e){return $a(e)?e.scrollX:e.scrollLeft}function Vu(e){return $a(e)?e.scrollY:e.scrollTop}function Ns(e){return{x:zu(e),y:Vu(e)}}var Ke;(function(e){e[e.Forward=1]="Forward",e[e.Backward=-1]="Backward"})(Ke||(Ke={}));function Gu(e){return!Pr||!e?!1:e===document.scrollingElement}function Ku(e){let t={x:0,y:0},a=Gu(e)?{height:window.innerHeight,width:window.innerWidth}:{height:e.clientHeight,width:e.clientWidth},o={x:e.scrollWidth-a.width,y:e.scrollHeight-a.height},r=e.scrollTop<=t.y,n=e.scrollLeft<=t.x,l=e.scrollTop>=o.y,s=e.scrollLeft>=o.x;return{isTop:r,isLeft:n,isBottom:l,isRight:s,maxScroll:o,minScroll:t}}var Ih={x:.2,y:.2};function wh(e,t,a,o,r){let{top:n,left:l,right:s,bottom:i}=a;o===void 0&&(o=10),r===void 0&&(r=Ih);let{isTop:u,isBottom:c,isLeft:d,isRight:f}=Ku(e),m={x:0,y:0},h={x:0,y:0},p={height:t.height*r.y,width:t.width*r.x};return!u&&n<=t.top+p.height?(m.y=Ke.Backward,h.y=o*Math.abs((t.top+p.height-n)/p.height)):!c&&i>=t.bottom-p.height&&(m.y=Ke.Forward,h.y=o*Math.abs((t.bottom-p.height-i)/p.height)),!f&&s>=t.right-p.width?(m.x=Ke.Forward,h.x=o*Math.abs((t.right-p.width-s)/p.width)):!d&&l<=t.left+p.width&&(m.x=Ke.Backward,h.x=o*Math.abs((t.left+p.width-l)/p.width)),{direction:m,speed:h}}function Sh(e){if(e===document.scrollingElement){let{innerWidth:n,innerHeight:l}=window;return{top:0,left:0,right:n,bottom:l,width:n,height:l}}let{top:t,left:a,right:o,bottom:r}=e.getBoundingClientRect();return{top:t,left:a,right:o,bottom:r,width:e.clientWidth,height:e.clientHeight}}function Xu(e){return e.reduce((t,a)=>Ja(t,Ns(a)),Nt)}function yh(e){return e.reduce((t,a)=>t+zu(a),0)}function kh(e){return e.reduce((t,a)=>t+Vu(a),0)}function ju(e,t){if(t===void 0&&(t=no),!e)return;let{top:a,left:o,bottom:r,right:n}=t(e);Wu(e)&&(r<=0||n<=0||a>=window.innerHeight||o>=window.innerWidth)&&e.scrollIntoView({block:"center",inline:"center"})}var Rh=[["x",["left","right"],yh],["y",["top","bottom"],kh]],Or=class{constructor(t,a){this.rect=void 0,this.width=void 0,this.height=void 0,this.top=void 0,this.bottom=void 0,this.right=void 0,this.left=void 0;let o=Ur(a),r=Xu(o);this.rect={...t},this.width=t.width,this.height=t.height;for(let[n,l,s]of Rh)for(let i of l)Object.defineProperty(this,i,{get:()=>{let u=s(o),c=r[n]-u;return this.rect[i]+c},enumerable:!0});Object.defineProperty(this,"rect",{enumerable:!1})}},ao=class{constructor(t){this.target=void 0,this.listeners=[],this.removeAll=()=>{this.listeners.forEach(a=>{var o;return(o=this.target)==null?void 0:o.removeEventListener(...a)})},this.target=t}add(t,a,o){var r;(r=this.target)==null||r.addEventListener(t,a,o),this.listeners.push([t,a,o])}};function Ph(e){let{EventTarget:t}=nt(e);return e instanceof t?e:Ya(e)}function Os(e,t){let a=Math.abs(e.x),o=Math.abs(e.y);return typeof t=="number"?Math.sqrt(a**2+o**2)>t:"x"in t&&"y"in t?a>t.x&&o>t.y:"x"in t?a>t.x:"y"in t?o>t.y:!1}var At;(function(e){e.Click="click",e.DragStart="dragstart",e.Keydown="keydown",e.ContextMenu="contextmenu",e.Resize="resize",e.SelectionChange="selectionchange",e.VisibilityChange="visibilitychange"})(At||(At={}));function Ru(e){e.preventDefault()}function Dh(e){e.stopPropagation()}var me;(function(e){e.Space="Space",e.Down="ArrowDown",e.Right="ArrowRight",e.Left="ArrowLeft",e.Up="ArrowUp",e.Esc="Escape",e.Enter="Enter",e.Tab="Tab"})(me||(me={}));var $u={start:[me.Space,me.Enter],cancel:[me.Esc],end:[me.Space,me.Enter,me.Tab]},Mh=(e,t)=>{let{currentCoordinates:a}=t;switch(e.code){case me.Right:return{...a,x:a.x+25};case me.Left:return{...a,x:a.x-25};case me.Down:return{...a,y:a.y+25};case me.Up:return{...a,y:a.y-25}}},Ea=class{constructor(t){this.props=void 0,this.autoScrollEnabled=!1,this.referenceCoordinates=void 0,this.listeners=void 0,this.windowListeners=void 0,this.props=t;let{event:{target:a}}=t;this.props=t,this.listeners=new ao(Ya(a)),this.windowListeners=new ao(nt(a)),this.handleKeyDown=this.handleKeyDown.bind(this),this.handleCancel=this.handleCancel.bind(this),this.attach()}attach(){this.handleStart(),this.windowListeners.add(At.Resize,this.handleCancel),this.windowListeners.add(At.VisibilityChange,this.handleCancel),setTimeout(()=>this.listeners.add(At.Keydown,this.handleKeyDown))}handleStart(){let{activeNode:t,onStart:a}=this.props,o=t.node.current;o&&ju(o),a(Nt)}handleKeyDown(t){if(Wo(t)){let{active:a,context:o,options:r}=this.props,{keyboardCodes:n=$u,coordinateGetter:l=Mh,scrollBehavior:s="smooth"}=r,{code:i}=t;if(n.end.includes(i)){this.handleEnd(t);return}if(n.cancel.includes(i)){this.handleCancel(t);return}let{collisionRect:u}=o.current,c=u?{x:u.left,y:u.top}:Nt;this.referenceCoordinates||(this.referenceCoordinates=c);let d=l(t,{active:a,context:o.current,currentCoordinates:c});if(d){let f=Qa(d,c),m={x:0,y:0},{scrollableAncestors:h}=o.current;for(let p of h){let g=t.code,{isTop:x,isRight:L,isLeft:C,isBottom:v,maxScroll:y,minScroll:b}=Ku(p),S=Sh(p),R={x:Math.min(g===me.Right?S.right-S.width/2:S.right,Math.max(g===me.Right?S.left:S.left+S.width/2,d.x)),y:Math.min(g===me.Down?S.bottom-S.height/2:S.bottom,Math.max(g===me.Down?S.top:S.top+S.height/2,d.y))},I=g===me.Right&&!L||g===me.Left&&!C,w=g===me.Down&&!v||g===me.Up&&!x;if(I&&R.x!==d.x){let P=p.scrollLeft+f.x,O=g===me.Right&&P<=y.x||g===me.Left&&P>=b.x;if(O&&!f.y){p.scrollTo({left:P,behavior:s});return}O?m.x=p.scrollLeft-P:m.x=g===me.Right?p.scrollLeft-y.x:p.scrollLeft-b.x,m.x&&p.scrollBy({left:-m.x,behavior:s});break}else if(w&&R.y!==d.y){let P=p.scrollTop+f.y,O=g===me.Down&&P<=y.y||g===me.Up&&P>=b.y;if(O&&!f.x){p.scrollTo({top:P,behavior:s});return}O?m.y=p.scrollTop-P:m.y=g===me.Down?p.scrollTop-y.y:p.scrollTop-b.y,m.y&&p.scrollBy({top:-m.y,behavior:s});break}}this.handleMove(t,Ja(Qa(d,this.referenceCoordinates),m))}}}handleMove(t,a){let{onMove:o}=this.props;t.preventDefault(),o(a)}handleEnd(t){let{onEnd:a}=this.props;t.preventDefault(),this.detach(),a()}handleCancel(t){let{onCancel:a}=this.props;t.preventDefault(),this.detach(),a()}detach(){this.listeners.removeAll(),this.windowListeners.removeAll()}};Ea.activators=[{eventName:"onKeyDown",handler:(e,t,a)=>{let{keyboardCodes:o=$u,onActivation:r}=t,{active:n}=a,{code:l}=e.nativeEvent;if(o.start.includes(l)){let s=n.activatorNode.current;return s&&e.target!==s?!1:(e.preventDefault(),r?.({event:e.nativeEvent}),!0)}return!1}}];function Pu(e){return!!(e&&"distance"in e)}function Du(e){return!!(e&&"delay"in e)}var Fr=class{constructor(t,a,o){var r;o===void 0&&(o=Ph(t.event.target)),this.props=void 0,this.events=void 0,this.autoScrollEnabled=!0,this.document=void 0,this.activated=!1,this.initialCoordinates=void 0,this.timeoutId=null,this.listeners=void 0,this.documentListeners=void 0,this.windowListeners=void 0,this.props=t,this.events=a;let{event:n}=t,{target:l}=n;this.props=t,this.events=a,this.document=Ya(l),this.documentListeners=new ao(this.document),this.listeners=new ao(o),this.windowListeners=new ao(nt(l)),this.initialCoordinates=(r=Tr(n))!=null?r:Nt,this.handleStart=this.handleStart.bind(this),this.handleMove=this.handleMove.bind(this),this.handleEnd=this.handleEnd.bind(this),this.handleCancel=this.handleCancel.bind(this),this.handleKeydown=this.handleKeydown.bind(this),this.removeTextSelection=this.removeTextSelection.bind(this),this.attach()}attach(){let{events:t,props:{options:{activationConstraint:a,bypassActivationConstraint:o}}}=this;if(this.listeners.add(t.move.name,this.handleMove,{passive:!1}),this.listeners.add(t.end.name,this.handleEnd),t.cancel&&this.listeners.add(t.cancel.name,this.handleCancel),this.windowListeners.add(At.Resize,this.handleCancel),this.windowListeners.add(At.DragStart,Ru),this.windowListeners.add(At.VisibilityChange,this.handleCancel),this.windowListeners.add(At.ContextMenu,Ru),this.documentListeners.add(At.Keydown,this.handleKeydown),a){if(o!=null&&o({event:this.props.event,activeNode:this.props.activeNode,options:this.props.options}))return this.handleStart();if(Du(a)){this.timeoutId=setTimeout(this.handleStart,a.delay),this.handlePending(a);return}if(Pu(a)){this.handlePending(a);return}}this.handleStart()}detach(){this.listeners.removeAll(),this.windowListeners.removeAll(),setTimeout(this.documentListeners.removeAll,50),this.timeoutId!==null&&(clearTimeout(this.timeoutId),this.timeoutId=null)}handlePending(t,a){let{active:o,onPending:r}=this.props;r(o,t,this.initialCoordinates,a)}handleStart(){let{initialCoordinates:t}=this,{onStart:a}=this.props;t&&(this.activated=!0,this.documentListeners.add(At.Click,Dh,{capture:!0}),this.removeTextSelection(),this.documentListeners.add(At.SelectionChange,this.removeTextSelection),a(t))}handleMove(t){var a;let{activated:o,initialCoordinates:r,props:n}=this,{onMove:l,options:{activationConstraint:s}}=n;if(!r)return;let i=(a=Tr(t))!=null?a:Nt,u=Qa(r,i);if(!o&&s){if(Pu(s)){if(s.tolerance!=null&&Os(u,s.tolerance))return this.handleCancel();if(Os(u,s.distance))return this.handleStart()}if(Du(s)&&Os(u,s.tolerance))return this.handleCancel();this.handlePending(s,u);return}t.cancelable&&t.preventDefault(),l(i)}handleEnd(){let{onAbort:t,onEnd:a}=this.props;this.detach(),this.activated||t(this.props.active),a()}handleCancel(){let{onAbort:t,onCancel:a}=this.props;this.detach(),this.activated||t(this.props.active),a()}handleKeydown(t){t.code===me.Esc&&this.handleCancel()}removeTextSelection(){var t;(t=this.document.getSelection())==null||t.removeAllRanges()}},Ah={cancel:{name:"pointercancel"},move:{name:"pointermove"},end:{name:"pointerup"}},zo=class extends Fr{constructor(t){let{event:a}=t,o=Ya(a.target);super(t,Ah,o)}};zo.activators=[{eventName:"onPointerDown",handler:(e,t)=>{let{nativeEvent:a}=e,{onActivation:o}=t;return!a.isPrimary||a.button!==0?!1:(o?.({event:a}),!0)}}];var Th={move:{name:"mousemove"},end:{name:"mouseup"}},_s;(function(e){e[e.RightClick=2]="RightClick"})(_s||(_s={}));var Br=class extends Fr{constructor(t){super(t,Th,Ya(t.event.target))}};Br.activators=[{eventName:"onMouseDown",handler:(e,t)=>{let{nativeEvent:a}=e,{onActivation:o}=t;return a.button===_s.RightClick?!1:(o?.({event:a}),!0)}}];var Fs={cancel:{name:"touchcancel"},move:{name:"touchmove"},end:{name:"touchend"}},Nr=class extends Fr{constructor(t){super(t,Fs)}static setup(){return window.addEventListener(Fs.move.name,t,{capture:!1,passive:!1}),function(){window.removeEventListener(Fs.move.name,t)};function t(){}}};Nr.activators=[{eventName:"onTouchStart",handler:(e,t)=>{let{nativeEvent:a}=e,{onActivation:o}=t,{touches:r}=a;return r.length>1?!1:(o?.({event:a}),!0)}}];var Er;(function(e){e[e.Pointer=0]="Pointer",e[e.DraggableRect=1]="DraggableRect"})(Er||(Er={}));var xn;(function(e){e[e.TreeOrder=0]="TreeOrder",e[e.ReversedTreeOrder=1]="ReversedTreeOrder"})(xn||(xn={}));function Eh(e){let{acceleration:t,activator:a=Er.Pointer,canScroll:o,draggingRect:r,enabled:n,interval:l=5,order:s=xn.TreeOrder,pointerCoordinates:i,scrollableAncestors:u,scrollableAncestorRects:c,delta:d,threshold:f}=e,m=Fh({delta:d,disabled:!n}),[h,p]=Cu(),g=(0,D.useRef)({x:0,y:0}),x=(0,D.useRef)({x:0,y:0}),L=(0,D.useMemo)(()=>{switch(a){case Er.Pointer:return i?{top:i.y,bottom:i.y,left:i.x,right:i.x}:null;case Er.DraggableRect:return r}},[a,r,i]),C=(0,D.useRef)(null),v=(0,D.useCallback)(()=>{let b=C.current;if(!b)return;let S=g.current.x*x.current.x,R=g.current.y*x.current.y;b.scrollBy(S,R)},[]),y=(0,D.useMemo)(()=>s===xn.TreeOrder?[...u].reverse():u,[s,u]);(0,D.useEffect)(()=>{if(!n||!u.length||!L){p();return}for(let b of y){if(o?.(b)===!1)continue;let S=u.indexOf(b),R=c[S];if(!R)continue;let{direction:I,speed:w}=wh(b,R,L,t,f);for(let P of["x","y"])m[P][I[P]]||(w[P]=0,I[P]=0);if(w.x>0||w.y>0){p(),C.current=b,h(v,l),g.current=w,x.current=I;return}}g.current={x:0,y:0},x.current={x:0,y:0},p()},[t,v,o,p,n,l,JSON.stringify(L),JSON.stringify(m),h,u,y,c,JSON.stringify(f)])}var Oh={x:{[Ke.Backward]:!1,[Ke.Forward]:!1},y:{[Ke.Backward]:!1,[Ke.Forward]:!1}};function Fh(e){let{delta:t,disabled:a}=e,o=Ar(t);return qo(r=>{if(a||!o||!r)return Oh;let n={x:Math.sign(t.x-o.x),y:Math.sign(t.y-o.y)};return{x:{[Ke.Backward]:r.x[Ke.Backward]||n.x===-1,[Ke.Forward]:r.x[Ke.Forward]||n.x===1},y:{[Ke.Backward]:r.y[Ke.Backward]||n.y===-1,[Ke.Forward]:r.y[Ke.Forward]||n.y===1}}},[a,t,o])}function Bh(e,t){let a=t!=null?e.get(t):void 0,o=a?a.node.current:null;return qo(r=>{var n;return t==null?null:(n=o??r)!=null?n:null},[o,t])}function Nh(e,t){return(0,D.useMemo)(()=>e.reduce((a,o)=>{let{sensor:r}=o,n=r.activators.map(l=>({eventName:l.eventName,handler:t(l.handler,o)}));return[...a,...n]},[]),[e,t])}var _r;(function(e){e[e.Always=0]="Always",e[e.BeforeDragging=1]="BeforeDragging",e[e.WhileDragging=2]="WhileDragging"})(_r||(_r={}));var Hs;(function(e){e.Optimized="optimized"})(Hs||(Hs={}));var Mu=new Map;function _h(e,t){let{dragging:a,dependencies:o,config:r}=t,[n,l]=(0,D.useState)(null),{frequency:s,measure:i,strategy:u}=r,c=(0,D.useRef)(e),d=g(),f=Uo(d),m=(0,D.useCallback)(function(x){x===void 0&&(x=[]),!f.current&&l(L=>L===null?x:L.concat(x.filter(C=>!L.includes(C))))},[f]),h=(0,D.useRef)(null),p=qo(x=>{if(d&&!a)return Mu;if(!x||x===Mu||c.current!==e||n!=null){let L=new Map;for(let C of e){if(!C)continue;if(n&&n.length>0&&!n.includes(C.id)&&C.rect.current){L.set(C.id,C.rect.current);continue}let v=C.node.current,y=v?new Or(i(v),v):null;C.rect.current=y,y&&L.set(C.id,y)}return L}return x},[e,n,a,d,i]);return(0,D.useEffect)(()=>{c.current=e},[e]),(0,D.useEffect)(()=>{d||m()},[a,d]),(0,D.useEffect)(()=>{n&&n.length>0&&l(null)},[JSON.stringify(n)]),(0,D.useEffect)(()=>{d||typeof s!="number"||h.current!==null||(h.current=setTimeout(()=>{m(),h.current=null},s))},[s,d,m,...o]),{droppableRects:p,measureDroppableContainers:m,measuringScheduled:n!=null};function g(){switch(u){case _r.Always:return!1;case _r.BeforeDragging:return a;default:return!a}}}function zs(e,t){return qo(a=>e?a||(typeof t=="function"?t(e):e):null,[t,e])}function Hh(e,t){return zs(e,t)}function Uh(e){let{callback:t,disabled:a}=e,o=Dr(t),r=(0,D.useMemo)(()=>{if(a||typeof window>"u"||typeof window.MutationObserver>"u")return;let{MutationObserver:n}=window;return new n(o)},[o,a]);return(0,D.useEffect)(()=>()=>r?.disconnect(),[r]),r}function Ln(e){let{callback:t,disabled:a}=e,o=Dr(t),r=(0,D.useMemo)(()=>{if(a||typeof window>"u"||typeof window.ResizeObserver>"u")return;let{ResizeObserver:n}=window;return new n(o)},[a]);return(0,D.useEffect)(()=>()=>r?.disconnect(),[r]),r}function qh(e){return new Or(no(e),e)}function Au(e,t,a){t===void 0&&(t=qh);let[o,r]=(0,D.useState)(null);function n(){r(i=>{if(!e)return null;if(e.isConnected===!1){var u;return(u=i??a)!=null?u:null}let c=t(e);return JSON.stringify(i)===JSON.stringify(c)?i:c})}let l=Uh({callback(i){if(e)for(let u of i){let{type:c,target:d}=u;if(c==="childList"&&d instanceof HTMLElement&&d.contains(e)){n();break}}}}),s=Ln({callback:n});return It(()=>{n(),e?(s?.observe(e),l?.observe(document.body,{childList:!0,subtree:!0})):(s?.disconnect(),l?.disconnect())},[e]),o}function Wh(e){let t=zs(e);return Uu(e,t)}var Tu=[];function zh(e){let t=(0,D.useRef)(e),a=qo(o=>e?o&&o!==Tu&&e&&t.current&&e.parentNode===t.current.parentNode?o:Ur(e):Tu,[e]);return(0,D.useEffect)(()=>{t.current=e},[e]),a}function Vh(e){let[t,a]=(0,D.useState)(null),o=(0,D.useRef)(e),r=(0,D.useCallback)(n=>{let l=Es(n.target);l&&a(s=>s?(s.set(l,Ns(l)),new Map(s)):null)},[]);return(0,D.useEffect)(()=>{let n=o.current;if(e!==n){l(n);let s=e.map(i=>{let u=Es(i);return u?(u.addEventListener("scroll",r,{passive:!0}),[u,Ns(u)]):null}).filter(i=>i!=null);a(s.length?new Map(s):null),o.current=e}return()=>{l(e),l(n)};function l(s){s.forEach(i=>{let u=Es(i);u?.removeEventListener("scroll",r)})}},[r,e]),(0,D.useMemo)(()=>e.length?t?Array.from(t.values()).reduce((n,l)=>Ja(n,l),Nt):Xu(e):Nt,[e,t])}function Eu(e,t){t===void 0&&(t=[]);let a=(0,D.useRef)(null);return(0,D.useEffect)(()=>{a.current=null},t),(0,D.useEffect)(()=>{let o=e!==Nt;o&&!a.current&&(a.current=e),!o&&a.current&&(a.current=null)},[e]),a.current?Qa(e,a.current):Nt}function Gh(e){(0,D.useEffect)(()=>{if(!Pr)return;let t=e.map(a=>{let{sensor:o}=a;return o.setup==null?void 0:o.setup()});return()=>{for(let a of t)a?.()}},e.map(t=>{let{sensor:a}=t;return a}))}function Kh(e,t){return(0,D.useMemo)(()=>e.reduce((a,o)=>{let{eventName:r,handler:n}=o;return a[r]=l=>{n(l,t)},a},{}),[e,t])}function Yu(e){return(0,D.useMemo)(()=>e?Ch(e):null,[e])}var Ou=[];function Xh(e,t){t===void 0&&(t=no);let[a]=e,o=Yu(a?nt(a):null),[r,n]=(0,D.useState)(Ou);function l(){n(()=>e.length?e.map(i=>Gu(i)?o:new Or(t(i),i)):Ou)}let s=Ln({callback:l});return It(()=>{s?.disconnect(),l(),e.forEach(i=>s?.observe(i))},[e]),r}function Zu(e){if(!e)return null;if(e.children.length>1)return e;let t=e.children[0];return Ho(t)?t:e}function jh(e){let{measure:t}=e,[a,o]=(0,D.useState)(null),r=(0,D.useCallback)(u=>{for(let{target:c}of u)if(Ho(c)){o(d=>{let f=t(c);return d?{...d,width:f.width,height:f.height}:f});break}},[t]),n=Ln({callback:r}),l=(0,D.useCallback)(u=>{let c=Zu(u);n?.disconnect(),c&&n?.observe(c),o(c?t(c):null)},[t,n]),[s,i]=Mr(l);return(0,D.useMemo)(()=>({nodeRef:s,rect:a,setRef:i}),[a,s,i])}var $h=[{sensor:zo,options:{}},{sensor:Ea,options:{}}],Yh={current:{}},hn={draggable:{measure:ku},droppable:{measure:ku,strategy:_r.WhileDragging,frequency:Hs.Optimized},dragOverlay:{measure:no}},oo=class extends Map{get(t){var a;return t!=null&&(a=super.get(t))!=null?a:void 0}toArray(){return Array.from(this.values())}getEnabled(){return this.toArray().filter(t=>{let{disabled:a}=t;return!a})}getNodeFor(t){var a,o;return(a=(o=this.get(t))==null?void 0:o.node.current)!=null?a:void 0}},Zh={activatorEvent:null,active:null,activeNode:null,activeNodeRect:null,collisions:null,containerNodeRect:null,draggableNodes:new Map,droppableRects:new Map,droppableContainers:new oo,over:null,dragOverlay:{nodeRef:{current:null},rect:null,setRef:gn},scrollableAncestors:[],scrollableAncestorRects:[],measuringConfiguration:hn,measureDroppableContainers:gn,windowRect:null,measuringScheduled:!1},Ju={activatorEvent:null,activators:[],active:null,activeNodeRect:null,ariaDescribedById:{draggable:""},dispatch:gn,draggableNodes:new Map,over:null,measureDroppableContainers:gn},qr=(0,D.createContext)(Ju),Qu=(0,D.createContext)(Zh);function Jh(){return{draggable:{active:null,initialCoordinates:{x:0,y:0},nodes:new Map,translate:{x:0,y:0}},droppable:{containers:new oo}}}function Qh(e,t){switch(t.type){case ze.DragStart:return{...e,draggable:{...e.draggable,initialCoordinates:t.initialCoordinates,active:t.active}};case ze.DragMove:return e.draggable.active==null?e:{...e,draggable:{...e.draggable,translate:{x:t.coordinates.x-e.draggable.initialCoordinates.x,y:t.coordinates.y-e.draggable.initialCoordinates.y}}};case ze.DragEnd:case ze.DragCancel:return{...e,draggable:{...e.draggable,active:null,initialCoordinates:{x:0,y:0},translate:{x:0,y:0}}};case ze.RegisterDroppable:{let{element:a}=t,{id:o}=a,r=new oo(e.droppable.containers);return r.set(o,a),{...e,droppable:{...e.droppable,containers:r}}}case ze.SetDroppableDisabled:{let{id:a,key:o,disabled:r}=t,n=e.droppable.containers.get(a);if(!n||o!==n.key)return e;let l=new oo(e.droppable.containers);return l.set(a,{...n,disabled:r}),{...e,droppable:{...e.droppable,containers:l}}}case ze.UnregisterDroppable:{let{id:a,key:o}=t,r=e.droppable.containers.get(a);if(!r||o!==r.key)return e;let n=new oo(e.droppable.containers);return n.delete(a),{...e,droppable:{...e.droppable,containers:n}}}default:return e}}function eg(e){let{disabled:t}=e,{active:a,activatorEvent:o,draggableNodes:r}=(0,D.useContext)(qr),n=Ar(o),l=Ar(a?.id);return(0,D.useEffect)(()=>{if(!t&&!o&&n&&l!=null){if(!Wo(n)||document.activeElement===n.target)return;let s=r.get(l);if(!s)return;let{activatorNode:i,node:u}=s;if(!i.current&&!u.current)return;requestAnimationFrame(()=>{for(let c of[i.current,u.current]){if(!c)continue;let d=vu(c);if(d){d.focus();break}}})}},[o,t,r,l,n]),null}function ed(e,t){let{transform:a,...o}=t;return e!=null&&e.length?e.reduce((r,n)=>n({transform:r,...o}),a):a}function tg(e){return(0,D.useMemo)(()=>({draggable:{...hn.draggable,...e?.draggable},droppable:{...hn.droppable,...e?.droppable},dragOverlay:{...hn.dragOverlay,...e?.dragOverlay}}),[e?.draggable,e?.droppable,e?.dragOverlay])}function ag(e){let{activeNode:t,measure:a,initialRect:o,config:r=!0}=e,n=(0,D.useRef)(!1),{x:l,y:s}=typeof r=="boolean"?{x:r,y:r}:r;It(()=>{if(!l&&!s||!t){n.current=!1;return}if(n.current||!o)return;let u=t?.node.current;if(!u||u.isConnected===!1)return;let c=a(u),d=Uu(c,o);if(l||(d.x=0),s||(d.y=0),n.current=!0,Math.abs(d.x)>0||Math.abs(d.y)>0){let f=Wu(u);f&&f.scrollBy({top:d.y,left:d.x})}},[t,l,s,o,a])}var vn=(0,D.createContext)({...Nt,scaleX:1,scaleY:1}),Ta;(function(e){e[e.Uninitialized=0]="Uninitialized",e[e.Initializing=1]="Initializing",e[e.Initialized=2]="Initialized"})(Ta||(Ta={}));var In=(0,D.memo)(function(t){var a,o,r,n;let{id:l,accessibility:s,autoScroll:i=!0,children:u,sensors:c=$h,collisionDetection:d=Ws,measuring:f,modifiers:m,...h}=t,p=(0,D.useReducer)(Qh,void 0,Jh),[g,x]=p,[L,C]=sh(),[v,y]=(0,D.useState)(Ta.Uninitialized),b=v===Ta.Initialized,{draggable:{active:S,nodes:R,translate:I},droppable:{containers:w}}=g,P=S!=null?R.get(S):null,O=(0,D.useRef)({initial:null,translated:null}),V=(0,D.useMemo)(()=>{var rt;return S!=null?{id:S,data:(rt=P?.data)!=null?rt:Yh,rect:O}:null},[S,P]),A=(0,D.useRef)(null),[N,H]=(0,D.useState)(null),[j,U]=(0,D.useState)(null),X=Uo(h,Object.values(h)),G=Za("DndDescribedBy",l),te=(0,D.useMemo)(()=>w.getEnabled(),[w]),ee=tg(f),{droppableRects:ce,measureDroppableContainers:Re,measuringScheduled:Ce}=_h(te,{dragging:b,dependencies:[I.x,I.y],config:ee.droppable}),q=Bh(R,S),Le=(0,D.useMemo)(()=>j?Tr(j):null,[j]),ve=Km(),xe=Hh(q,ee.draggable.measure);ag({activeNode:S!=null?R.get(S):null,config:ve.layoutShiftCompensation,initialRect:xe,measure:ee.draggable.measure});let B=Au(q,ee.draggable.measure,xe),J=Au(q?q.parentElement:null),le=(0,D.useRef)({activatorEvent:null,active:null,activeNode:q,collisionRect:null,collisions:null,droppableRects:ce,draggableNodes:R,draggingNode:null,draggingNodeRect:null,droppableContainers:w,over:null,scrollableAncestors:[],scrollAdjustedTranslate:null}),M=w.getNodeFor((a=le.current.over)==null?void 0:a.id),F=jh({measure:ee.dragOverlay.measure}),Q=(o=F.nodeRef.current)!=null?o:q,Pt=b?(r=F.rect)!=null?r:B:null,wa=!!(F.nodeRef.current&&F.rect),Sa=Wh(wa?null:B),cr=Yu(Q?nt(Q):null),$t=zh(b?M??q:null),Oo=Xh($t),k=ed(m,{transform:{x:I.x-Sa.x,y:I.y-Sa.y,scaleX:1,scaleY:1},activatorEvent:j,active:V,activeNodeRect:B,containerNodeRect:J,draggingNodeRect:Pt,over:le.current.over,overlayNodeRect:F.rect,scrollableAncestors:$t,scrollableAncestorRects:Oo,windowRect:cr}),z=Le?Ja(Le,I):null,K=Vh($t),ae=Eu(K),Te=Eu(K,[B]),fe=Ja(k,ae),Se=Pt?gh(Pt,k):null,_e=V&&Se?d({active:V,collisionRect:Se,droppableRects:ce,droppableContainers:te,pointerCoordinates:z}):null,Bt=Hr(_e,"id"),[We,ks]=(0,D.useState)(null),ya=wa?k:Ja(k,Te),dn=mh(ya,(n=We?.rect)!=null?n:null,B),Rs=(0,D.useRef)(null),Ei=(0,D.useCallback)((rt,bt)=>{let{sensor:Ct,options:ka}=bt;if(A.current==null)return;let Dt=R.get(A.current);if(!Dt)return;let Lt=rt.nativeEvent,Yt=new Ct({active:A.current,activeNode:Dt,event:Lt,options:ka,context:le,onAbort(Qe){if(!R.get(Qe))return;let{onDragAbort:Zt}=X.current,ia={id:Qe};Zt?.(ia),L({type:"onDragAbort",event:ia})},onPending(Qe,Ra,Zt,ia){if(!R.get(Qe))return;let{onDragPending:pr}=X.current,Pa={id:Qe,constraint:Ra,initialCoordinates:Zt,offset:ia};pr?.(Pa),L({type:"onDragPending",event:Pa})},onStart(Qe){let Ra=A.current;if(Ra==null)return;let Zt=R.get(Ra);if(!Zt)return;let{onDragStart:ia}=X.current,fr={activatorEvent:Lt,active:{id:Ra,data:Zt.data,rect:O}};(0,to.unstable_batchedUpdates)(()=>{ia?.(fr),y(Ta.Initializing),x({type:ze.DragStart,initialCoordinates:Qe,active:Ra}),L({type:"onDragStart",event:fr}),H(Rs.current),U(Lt)})},onMove(Qe){x({type:ze.DragMove,coordinates:Qe})},onEnd:Fo(ze.DragEnd),onCancel:Fo(ze.DragCancel)});Rs.current=Yt;function Fo(Qe){return async function(){let{active:Zt,collisions:ia,over:fr,scrollAdjustedTranslate:pr}=le.current,Pa=null;if(Zt&&pr){let{cancelDrop:mr}=X.current;Pa={activatorEvent:Lt,active:Zt,collisions:ia,delta:pr,over:fr},Qe===ze.DragEnd&&typeof mr=="function"&&await Promise.resolve(mr(Pa))&&(Qe=ze.DragCancel)}A.current=null,(0,to.unstable_batchedUpdates)(()=>{x({type:Qe}),y(Ta.Uninitialized),ks(null),H(null),U(null),Rs.current=null;let mr=Qe===ze.DragEnd?"onDragEnd":"onDragCancel";if(Pa){let Ps=X.current[mr];Ps?.(Pa),L({type:mr,event:Pa})}})}}},[R]),zm=(0,D.useCallback)((rt,bt)=>(Ct,ka)=>{let Dt=Ct.nativeEvent,Lt=R.get(ka);if(A.current!==null||!Lt||Dt.dndKit||Dt.defaultPrevented)return;let Yt={active:Lt};rt(Ct,bt.options,Yt)===!0&&(Dt.dndKit={capturedBy:bt.sensor},A.current=ka,Ei(Ct,bt))},[R,Ei]),Oi=Nh(c,zm);Gh(c),It(()=>{B&&v===Ta.Initializing&&y(Ta.Initialized)},[B,v]),(0,D.useEffect)(()=>{let{onDragMove:rt}=X.current,{active:bt,activatorEvent:Ct,collisions:ka,over:Dt}=le.current;if(!bt||!Ct)return;let Lt={active:bt,activatorEvent:Ct,collisions:ka,delta:{x:fe.x,y:fe.y},over:Dt};(0,to.unstable_batchedUpdates)(()=>{rt?.(Lt),L({type:"onDragMove",event:Lt})})},[fe.x,fe.y]),(0,D.useEffect)(()=>{let{active:rt,activatorEvent:bt,collisions:Ct,droppableContainers:ka,scrollAdjustedTranslate:Dt}=le.current;if(!rt||A.current==null||!bt||!Dt)return;let{onDragOver:Lt}=X.current,Yt=ka.get(Bt),Fo=Yt&&Yt.rect.current?{id:Yt.id,rect:Yt.rect.current,data:Yt.data,disabled:Yt.disabled}:null,Qe={active:rt,activatorEvent:bt,collisions:Ct,delta:{x:Dt.x,y:Dt.y},over:Fo};(0,to.unstable_batchedUpdates)(()=>{ks(Fo),Lt?.(Qe),L({type:"onDragOver",event:Qe})})},[Bt]),It(()=>{le.current={activatorEvent:j,active:V,activeNode:q,collisionRect:Se,collisions:_e,droppableRects:ce,draggableNodes:R,draggingNode:Q,draggingNodeRect:Pt,droppableContainers:w,over:We,scrollableAncestors:$t,scrollAdjustedTranslate:fe},O.current={initial:Pt,translated:Se}},[V,q,_e,Se,R,Q,Pt,ce,w,We,$t,fe]),Eh({...ve,delta:I,draggingRect:Se,pointerCoordinates:z,scrollableAncestors:$t,scrollableAncestorRects:Oo});let Vm=(0,D.useMemo)(()=>({active:V,activeNode:q,activeNodeRect:B,activatorEvent:j,collisions:_e,containerNodeRect:J,dragOverlay:F,draggableNodes:R,droppableContainers:w,droppableRects:ce,over:We,measureDroppableContainers:Re,scrollableAncestors:$t,scrollableAncestorRects:Oo,measuringConfiguration:ee,measuringScheduled:Ce,windowRect:cr}),[V,q,B,j,_e,J,F,R,w,ce,We,Re,$t,Oo,ee,Ce,cr]),Gm=(0,D.useMemo)(()=>({activatorEvent:j,activators:Oi,active:V,activeNodeRect:B,ariaDescribedById:{draggable:G},dispatch:x,draggableNodes:R,over:We,measureDroppableContainers:Re}),[j,Oi,V,B,x,G,R,We,Re]);return D.default.createElement(Nu.Provider,{value:C},D.default.createElement(qr.Provider,{value:Gm},D.default.createElement(Qu.Provider,{value:Vm},D.default.createElement(vn.Provider,{value:dn},u)),D.default.createElement(eg,{disabled:s?.restoreFocus===!1})),D.default.createElement(uh,{...s,hiddenTextDescribedById:G}));function Km(){let rt=N?.autoScrollEnabled===!1,bt=typeof i=="object"?i.enabled===!1:i===!1,Ct=b&&!rt&&!bt;return typeof i=="object"?{...i,enabled:Ct}:{enabled:Ct}}}),og=(0,D.createContext)(null),Fu="button",rg="Draggable";function td(e){let{id:t,data:a,disabled:o=!1,attributes:r}=e,n=Za(rg),{activators:l,activatorEvent:s,active:i,activeNodeRect:u,ariaDescribedById:c,draggableNodes:d,over:f}=(0,D.useContext)(qr),{role:m=Fu,roleDescription:h="draggable",tabIndex:p=0}=r??{},g=i?.id===t,x=(0,D.useContext)(g?vn:og),[L,C]=Mr(),[v,y]=Mr(),b=Kh(l,t),S=Uo(a);It(()=>(d.set(t,{id:t,key:n,node:L,activatorNode:v,data:S}),()=>{let I=d.get(t);I&&I.key===n&&d.delete(t)}),[d,t]);let R=(0,D.useMemo)(()=>({role:m,tabIndex:p,"aria-disabled":o,"aria-pressed":g&&m===Fu?!0:void 0,"aria-roledescription":h,"aria-describedby":c.draggable}),[o,m,p,g,h,c.draggable]);return{active:i,activatorEvent:s,activeNodeRect:u,attributes:R,isDragging:g,listeners:o?void 0:b,node:L,over:f,setNodeRef:C,setActivatorNodeRef:y,transform:x}}function Wr(){return(0,D.useContext)(Qu)}var ng="Droppable",sg={timeout:25};function wn(e){let{data:t,disabled:a=!1,id:o,resizeObserverConfig:r}=e,n=Za(ng),{active:l,dispatch:s,over:i,measureDroppableContainers:u}=(0,D.useContext)(qr),c=(0,D.useRef)({disabled:a}),d=(0,D.useRef)(!1),f=(0,D.useRef)(null),m=(0,D.useRef)(null),{disabled:h,updateMeasurementsFor:p,timeout:g}={...sg,...r},x=Uo(p??o),L=(0,D.useCallback)(()=>{if(!d.current){d.current=!0;return}m.current!=null&&clearTimeout(m.current),m.current=setTimeout(()=>{u(Array.isArray(x.current)?x.current:[x.current]),m.current=null},g)},[g]),C=Ln({callback:L,disabled:h||!l}),v=(0,D.useCallback)((R,I)=>{C&&(I&&(C.unobserve(I),d.current=!1),R&&C.observe(R))},[C]),[y,b]=Mr(v),S=Uo(t);return(0,D.useEffect)(()=>{!C||!y.current||(C.disconnect(),d.current=!1,C.observe(y.current))},[y,C]),(0,D.useEffect)(()=>(s({type:ze.RegisterDroppable,element:{id:o,key:n,disabled:a,node:y,rect:f,data:S}}),()=>s({type:ze.UnregisterDroppable,key:n,id:o})),[o]),(0,D.useEffect)(()=>{a!==c.current.disabled&&(s({type:ze.SetDroppableDisabled,id:o,key:n,disabled:a}),c.current.disabled=a)},[o,n,a,s]),{active:l,rect:f,isOver:i?.id===o,node:y,over:i,setNodeRef:b}}function lg(e){let{animation:t,children:a}=e,[o,r]=(0,D.useState)(null),[n,l]=(0,D.useState)(null),s=Ar(a);return!a&&!o&&s&&r(s),It(()=>{if(!n)return;let i=o?.key,u=o?.props.id;if(i==null||u==null){r(null);return}Promise.resolve(t(u,n)).then(()=>{r(null)})},[t,o,n]),D.default.createElement(D.default.Fragment,null,a,o?(0,D.cloneElement)(o,{ref:l}):null)}var ig={x:0,y:0,scaleX:1,scaleY:1};function ug(e){let{children:t}=e;return D.default.createElement(qr.Provider,{value:Ju},D.default.createElement(vn.Provider,{value:ig},t))}var dg={position:"fixed",touchAction:"none"},cg=e=>Wo(e)?"transform 250ms ease":void 0,fg=(0,D.forwardRef)((e,t)=>{let{as:a,activatorEvent:o,adjustScale:r,children:n,className:l,rect:s,style:i,transform:u,transition:c=cg}=e;if(!s)return null;let d=r?u:{...u,scaleX:1,scaleY:1},f={...dg,width:s.width,height:s.height,top:s.top,left:s.left,transform:vt.Transform.toString(d),transformOrigin:r&&o?dh(o,s):void 0,transition:typeof c=="function"?c(o):c,...i};return D.default.createElement(a,{className:l,style:f,ref:t},n)}),pg=e=>t=>{let{active:a,dragOverlay:o}=t,r={},{styles:n,className:l}=e;if(n!=null&&n.active)for(let[s,i]of Object.entries(n.active))i!==void 0&&(r[s]=a.node.style.getPropertyValue(s),a.node.style.setProperty(s,i));if(n!=null&&n.dragOverlay)for(let[s,i]of Object.entries(n.dragOverlay))i!==void 0&&o.node.style.setProperty(s,i);return l!=null&&l.active&&a.node.classList.add(l.active),l!=null&&l.dragOverlay&&o.node.classList.add(l.dragOverlay),function(){for(let[i,u]of Object.entries(r))a.node.style.setProperty(i,u);l!=null&&l.active&&a.node.classList.remove(l.active)}},mg=e=>{let{transform:{initial:t,final:a}}=e;return[{transform:vt.Transform.toString(t)},{transform:vt.Transform.toString(a)}]},hg={duration:250,easing:"ease",keyframes:mg,sideEffects:pg({styles:{active:{opacity:"0"}}})};function gg(e){let{config:t,draggableNodes:a,droppableContainers:o,measuringConfiguration:r}=e;return Dr((n,l)=>{if(t===null)return;let s=a.get(n);if(!s)return;let i=s.node.current;if(!i)return;let u=Zu(l);if(!u)return;let{transform:c}=nt(l).getComputedStyle(l),d=qu(c);if(!d)return;let f=typeof t=="function"?t:xg(t);return ju(i,r.draggable.measure),f({active:{id:n,data:s.data,node:i,rect:r.draggable.measure(i)},draggableNodes:a,dragOverlay:{node:l,rect:r.dragOverlay.measure(u)},droppableContainers:o,measuringConfiguration:r,transform:d})})}function xg(e){let{duration:t,easing:a,sideEffects:o,keyframes:r}={...hg,...e};return n=>{let{active:l,dragOverlay:s,transform:i,...u}=n;if(!t)return;let c={x:s.rect.left-l.rect.left,y:s.rect.top-l.rect.top},d={scaleX:i.scaleX!==1?l.rect.width*i.scaleX/s.rect.width:1,scaleY:i.scaleY!==1?l.rect.height*i.scaleY/s.rect.height:1},f={x:i.x-c.x,y:i.y-c.y,...d},m=r({...u,active:l,dragOverlay:s,transform:{initial:i,final:f}}),[h]=m,p=m[m.length-1];if(JSON.stringify(h)===JSON.stringify(p))return;let g=o?.({active:l,dragOverlay:s,...u}),x=s.node.animate(m,{duration:t,easing:a,fill:"forwards"});return new Promise(L=>{x.onfinish=()=>{g?.(),L()}})}}var Bu=0;function bg(e){return(0,D.useMemo)(()=>{if(e!=null)return Bu++,Bu},[e])}var ad=D.default.memo(e=>{let{adjustScale:t=!1,children:a,dropAnimation:o,style:r,transition:n,modifiers:l,wrapperElement:s="div",className:i,zIndex:u=999}=e,{activatorEvent:c,active:d,activeNodeRect:f,containerNodeRect:m,draggableNodes:h,droppableContainers:p,dragOverlay:g,over:x,measuringConfiguration:L,scrollableAncestors:C,scrollableAncestorRects:v,windowRect:y}=Wr(),b=(0,D.useContext)(vn),S=bg(d?.id),R=ed(l,{activatorEvent:c,active:d,activeNodeRect:f,containerNodeRect:m,draggingNodeRect:g.rect,over:x,overlayNodeRect:g.rect,scrollableAncestors:C,scrollableAncestorRects:v,transform:b,windowRect:y}),I=zs(f),w=gg({config:o,draggableNodes:h,droppableContainers:p,measuringConfiguration:L}),P=I?g.setRef:void 0;return D.default.createElement(ug,null,D.default.createElement(lg,{animation:w},d&&S?D.default.createElement(fg,{key:S,id:d.id,ref:P,as:s,activatorEvent:c,adjustScale:t,className:i,transition:n,rect:I,style:{zIndex:u,...r},transform:R},a):null))});var Oe=$(require("react"));function od(e,t,a){let o=e.slice();return o.splice(a<0?o.length+a:a,0,o.splice(t,1)[0]),o}function Cg(e,t){return e.reduce((a,o,r)=>{let n=t.get(o);return n&&(a[r]=n),a},Array(e.length))}function Sn(e){return e!==null&&e>=0}function Lg(e,t){if(e===t)return!0;if(e.length!==t.length)return!1;for(let a=0;a<e.length;a++)if(e[a]!==t[a])return!1;return!0}function vg(e){return typeof e=="boolean"?{draggable:e,droppable:e}:e}var rd=e=>{let{rects:t,activeIndex:a,overIndex:o,index:r}=e,n=od(t,o,a),l=t[r],s=n[r];return!s||!l?null:{x:s.left-l.left,y:s.top-l.top,scaleX:s.width/l.width,scaleY:s.height/l.height}};var yn={scaleX:1,scaleY:1},Rn=e=>{var t;let{activeIndex:a,activeNodeRect:o,index:r,rects:n,overIndex:l}=e,s=(t=n[a])!=null?t:o;if(!s)return null;if(r===a){let u=n[l];return u?{x:0,y:a<l?u.top+u.height-(s.top+s.height):u.top-s.top,...yn}:null}let i=Ig(n,r,a);return r>a&&r<=l?{x:0,y:-s.height-i,...yn}:r<a&&r>=l?{x:0,y:s.height+i,...yn}:{x:0,y:0,...yn}};function Ig(e,t,a){let o=e[t],r=e[t-1],n=e[t+1];return o?a<t?r?o.top-(r.top+r.height):n?n.top-(o.top+o.height):0:n?n.top-(o.top+o.height):r?o.top-(r.top+r.height):0:0}var nd="Sortable",sd=Oe.default.createContext({activeIndex:-1,containerId:nd,disableTransforms:!1,items:[],overIndex:-1,useDragOverlay:!1,sortedRects:[],strategy:rd,disabled:{draggable:!1,droppable:!1}});function Pn(e){let{children:t,id:a,items:o,strategy:r=rd,disabled:n=!1}=e,{active:l,dragOverlay:s,droppableRects:i,over:u,measureDroppableContainers:c}=Wr(),d=Za(nd,a),f=s.rect!==null,m=(0,Oe.useMemo)(()=>o.map(b=>typeof b=="object"&&"id"in b?b.id:b),[o]),h=l!=null,p=l?m.indexOf(l.id):-1,g=u?m.indexOf(u.id):-1,x=(0,Oe.useRef)(m),L=!Lg(m,x.current),C=g!==-1&&p===-1||L,v=vg(n);It(()=>{L&&h&&c(m)},[L,m,h,c]),(0,Oe.useEffect)(()=>{x.current=m},[m]);let y=(0,Oe.useMemo)(()=>({activeIndex:p,containerId:d,disabled:v,disableTransforms:C,items:m,overIndex:g,useDragOverlay:f,sortedRects:Cg(m,i),strategy:r}),[p,d,v.draggable,v.droppable,C,m,g,i,f,r]);return Oe.default.createElement(sd.Provider,{value:y},t)}var wg=e=>{let{id:t,items:a,activeIndex:o,overIndex:r}=e;return od(a,o,r).indexOf(t)},Sg=e=>{let{containerId:t,isSorting:a,wasDragging:o,index:r,items:n,newIndex:l,previousItems:s,previousContainerId:i,transition:u}=e;return!u||!o||s!==n&&r===l?!1:a?!0:l!==r&&t===i},yg={duration:200,easing:"ease"},ld="transform",kg=vt.Transition.toString({property:ld,duration:0,easing:"linear"}),Rg={roleDescription:"sortable"};function Pg(e){let{disabled:t,index:a,node:o,rect:r}=e,[n,l]=(0,Oe.useState)(null),s=(0,Oe.useRef)(a);return It(()=>{if(!t&&a!==s.current&&o.current){let i=r.current;if(i){let u=no(o.current,{ignoreTransform:!0}),c={x:i.left-u.left,y:i.top-u.top,scaleX:i.width/u.width,scaleY:i.height/u.height};(c.x||c.y)&&l(c)}}a!==s.current&&(s.current=a)},[t,a,o,r]),(0,Oe.useEffect)(()=>{n&&l(null)},[n]),n}function Dn(e){let{animateLayoutChanges:t=Sg,attributes:a,disabled:o,data:r,getNewIndex:n=wg,id:l,strategy:s,resizeObserverConfig:i,transition:u=yg}=e,{items:c,containerId:d,activeIndex:f,disabled:m,disableTransforms:h,sortedRects:p,overIndex:g,useDragOverlay:x,strategy:L}=(0,Oe.useContext)(sd),C=Dg(o,m),v=c.indexOf(l),y=(0,Oe.useMemo)(()=>({sortable:{containerId:d,index:v,items:c},...r}),[d,r,v,c]),b=(0,Oe.useMemo)(()=>c.slice(c.indexOf(l)),[c,l]),{rect:S,node:R,isOver:I,setNodeRef:w}=wn({id:l,data:y,disabled:C.droppable,resizeObserverConfig:{updateMeasurementsFor:b,...i}}),{active:P,activatorEvent:O,activeNodeRect:V,attributes:A,setNodeRef:N,listeners:H,isDragging:j,over:U,setActivatorNodeRef:X,transform:G}=td({id:l,data:y,attributes:{...Rg,...a},disabled:C.draggable}),te=bu(w,N),ee=!!P,ce=ee&&!h&&Sn(f)&&Sn(g),Re=!x&&j,Ce=Re&&ce?G:null,Le=ce?Ce??(s??L)({rects:p,activeNodeRect:V,activeIndex:f,overIndex:g,index:v}):null,ve=Sn(f)&&Sn(g)?n({id:l,items:c,activeIndex:f,overIndex:g}):v,xe=P?.id,B=(0,Oe.useRef)({activeId:xe,items:c,newIndex:ve,containerId:d}),J=c!==B.current.items,le=t({active:P,containerId:d,isDragging:j,isSorting:ee,id:l,index:v,items:c,newIndex:B.current.newIndex,previousItems:B.current.items,previousContainerId:B.current.containerId,transition:u,wasDragging:B.current.activeId!=null}),M=Pg({disabled:!le,index:v,node:R,rect:S});return(0,Oe.useEffect)(()=>{ee&&B.current.newIndex!==ve&&(B.current.newIndex=ve),d!==B.current.containerId&&(B.current.containerId=d),c!==B.current.items&&(B.current.items=c)},[ee,ve,d,c]),(0,Oe.useEffect)(()=>{if(xe===B.current.activeId)return;if(xe!=null&&B.current.activeId==null){B.current.activeId=xe;return}let Q=setTimeout(()=>{B.current.activeId=xe},50);return()=>clearTimeout(Q)},[xe]),{active:P,activeIndex:f,attributes:A,data:y,rect:S,index:v,newIndex:ve,items:c,isOver:I,isSorting:ee,isDragging:j,listeners:H,node:R,overIndex:g,over:U,setNodeRef:te,setActivatorNodeRef:X,setDroppableNodeRef:w,setDraggableNodeRef:N,transform:M??Le,transition:F()};function F(){if(M||J&&B.current.newIndex===v)return kg;if(!(Re&&!Wo(O)||!u)&&(ee||le))return vt.Transition.toString({...u,property:ld})}}function Dg(e,t){var a,o;return typeof e=="boolean"?{draggable:e,droppable:!1}:{draggable:(a=e?.draggable)!=null?a:t.draggable,droppable:(o=e?.droppable)!=null?o:t.droppable}}function kn(e){if(!e)return!1;let t=e.data.current;return!!(t&&"sortable"in t&&typeof t.sortable=="object"&&"containerId"in t.sortable&&"items"in t.sortable&&"index"in t.sortable)}var Mg=[me.Down,me.Right,me.Up,me.Left],Mn=(e,t)=>{let{context:{active:a,collisionRect:o,droppableRects:r,droppableContainers:n,over:l,scrollableAncestors:s}}=t;if(Mg.includes(e.code)){if(e.preventDefault(),!a||!o)return;let i=[];n.getEnabled().forEach(d=>{if(!d||d!=null&&d.disabled)return;let f=r.get(d.id);if(f)switch(e.code){case me.Down:o.top<f.top&&i.push(d);break;case me.Up:o.top>f.top&&i.push(d);break;case me.Left:o.left>f.left&&i.push(d);break;case me.Right:o.left<f.left&&i.push(d);break}});let u=Cn({active:a,collisionRect:o,droppableRects:r,droppableContainers:i,pointerCoordinates:null}),c=Hr(u,"id");if(c===l?.id&&u.length>1&&(c=u[1].id),c!=null){let d=n.get(a.id),f=n.get(c),m=f?r.get(f.id):null,h=f?.node.current;if(h&&m&&d&&f){let g=Ur(h).some((b,S)=>s[S]!==b),x=id(d,f),L=Ag(d,f),C=g||!x?{x:0,y:0}:{x:L?o.width-m.width:0,y:L?o.height-m.height:0},v={x:m.left,y:m.top};return C.x&&C.y?v:Qa(v,C)}}}};function id(e,t){return!kn(e)||!kn(t)?!1:e.data.current.sortable.containerId===t.data.current.sortable.containerId}function Ag(e,t){return!kn(e)||!kn(t)||!id(e,t)?!1:e.data.current.sortable.index<t.data.current.sortable.index}var Me=require("react");var gm=require("@deepseek-ai/dsh-client-ui-primitives");var vd=$(require("react"),1);var tt=$(require("react"),1);var ud=$(require("react"),1),Tg=Object.defineProperty,Gs=(e,t)=>Tg(e,"name",{value:t,configurable:!0});function Vs(e,t){if(typeof e=="function")return e(t);e!=null&&(e.current=t)}Gs(Vs,"setRef");function dd(...e){return t=>{let a=!1,o=e.map(r=>{let n=Vs(r,t);return!a&&typeof n=="function"&&(a=!0),n});if(a)return()=>{for(let r=0;r<o.length;r++){let n=o[r];typeof n=="function"?n():Vs(e[r],null)}}}}Gs(dd,"composeRefs");function ie(...e){return ud.useCallback(dd(...e),e)}Gs(ie,"useComposedRefs");var Eg=Object.defineProperty,wt=(e,t)=>Eg(e,"name",{value:t,configurable:!0});function st(e){let t=tt.forwardRef((a,o)=>{let{children:r,...n}=a,l=null,s=!1,i=[];r=xd(r),tt.Children.forEach(r,f=>{if(hd(f)){s=!0;let m=f,h="child"in m.props?m.props.child:m.props.children;for(;Ks(h)&&typeof An=="function";)h=An(h._payload);l=Fg(m,h),i.push(l?.props?.children)}else i.push(f)}),l?l=tt.cloneElement(l,void 0,i):!s&&tt.Children.count(r)===1&&tt.isValidElement(r)&&(l=r);let u=l?md(l):void 0,c=ie(o,u);if(!l){if(r||r===0)throw new Error(s?_g(e):Ng(e));return r}let d=pd(n,l.props??{});return l.type!==tt.Fragment&&(d.ref=o?c:u),tt.cloneElement(l,d)});return t.displayName=`${e}.Slot`,t}wt(st,"createSlot");var cd=st("Slot"),fd=Symbol.for("radix.slottable");function Og(e){let t=wt(a=>"child"in a?a.children(a.child):a.children,"Slottable");return t.displayName=`${e}.Slottable`,t.__radixId=fd,t}wt(Og,"createSlottable");var Fg=wt((e,t)=>"child"in e.props?tt.isValidElement(t)?tt.cloneElement(t,void 0,e.props.children(t.props.children)):null:tt.isValidElement(t)?t:null,"getSlottableElementFromSlottable");function pd(e,t){let a={...t};for(let o in t){let r=e[o],n=t[o];/^on[A-Z]/.test(o)?r&&n?a[o]=(...s)=>{let i=n(...s);return r(...s),i}:r&&(a[o]=r):o==="style"?a[o]={...r,...n}:o==="className"?a[o]=[r,n].filter(Boolean).join(" "):o==="aria-describedby"&&(a[o]=bd(n,r))}return{...e,...a}}wt(pd,"mergeProps");function md(e){let t=Object.getOwnPropertyDescriptor(e.props,"ref")?.get,a=t&&"isReactWarning"in t&&t.isReactWarning;return a?e.ref:(t=Object.getOwnPropertyDescriptor(e,"ref")?.get,a=t&&"isReactWarning"in t&&t.isReactWarning,a?e.props.ref:e.props.ref||e.ref)}wt(md,"getElementRef");function hd(e){return tt.isValidElement(e)&&typeof e.type=="function"&&"__radixId"in e.type&&e.type.__radixId===fd}wt(hd,"isSlottable");var Bg=Symbol.for("react.lazy");function Ks(e){return e!=null&&typeof e=="object"&&"$$typeof"in e&&e.$$typeof===Bg&&"_payload"in e&&gd(e._payload)}wt(Ks,"isLazyComponent");function gd(e){return typeof e=="object"&&e!==null&&"then"in e}wt(gd,"isPromiseLike");function xd(e){let t=e;for(;Ks(t)&&typeof An=="function";)t=An(t._payload);return t}wt(xd,"useUnwrappedLazy");function bd(...e){let t=new Set;for(let a of e)if(typeof a=="string")for(let o of String(a).trim().split(/\s+/))o&&t.add(o);return t.size>0?Array.from(t).join(" "):void 0}wt(bd,"concatAriaDescribedby");var Ng=wt(e=>`${e} failed to slot onto its children. Expected a single React element child or \`Slottable\`.`,"createSlotError"),_g=wt(e=>`${e} failed to slot onto its \`Slottable\`. Expected \`Slottable\` to receive a single React element child.`,"createSlottableError"),An=tt[" use ".trim().toString()];function Cd(e){var t,a,o="";if(typeof e=="string"||typeof e=="number")o+=e;else if(typeof e=="object")if(Array.isArray(e)){var r=e.length;for(t=0;t<r;t++)e[t]&&(a=Cd(e[t]))&&(o&&(o+=" "),o+=a)}else for(a in e)e[a]&&(o&&(o+=" "),o+=a);return o}function Ld(){for(var e,t,a=0,o="",r=arguments.length;a<r;a++)(e=arguments[a])&&(t=Cd(e))&&(o&&(o+=" "),o+=t);return o}function se(...e){return Ld(e)}var Id=require("react/jsx-runtime");function Hg({variant:e="default",size:t="default",className:a}={}){let o=e??"default",r=t??"default";return se("kanban-button",`kanban-button--${o}`,`kanban-button--size-${r}`,a)}var de=vd.forwardRef(({className:e,variant:t,size:a,asChild:o=!1,...r},n)=>(0,Id.jsx)(o?cd:"button",{className:Hg({variant:t,size:a,className:e}),ref:n,...r}));de.displayName="Button";var Jr=$(require("react"),1);var ye=$(require("react"),1);var Ug=Object.defineProperty,Vo=(e,t)=>Ug(e,"name",{value:t,configurable:!0}),wd=!!(typeof window<"u"&&window.document&&window.document.createElement);function Y(e,t,{checkForDefaultPrevented:a=!0}={}){return Vo(function(r){if(e?.(r),a===!1||!r||!r.defaultPrevented)return t?.(r)},"handleEvent")}Vo(Y,"composeEventHandlers");function qg(e){if(!wd)throw new Error("Cannot access window outside of the DOM");return e?.ownerDocument?.defaultView??window}Vo(qg,"getOwnerWindow");function Xs(e){if(!wd)throw new Error("Cannot access document outside of the DOM");return e?.ownerDocument??document}Vo(Xs,"getOwnerDocument");function Sd(e,t=!1){let{activeElement:a}=Xs(e);if(!a?.nodeName)return null;if(yd(a)&&a.contentDocument)return Sd(a.contentDocument.body,t);if(t){let o=a.getAttribute("aria-activedescendant");if(o){let r=Xs(a).getElementById(o);if(r)return r}}return a}Vo(Sd,"getActiveElement");function yd(e){return e.tagName==="IFRAME"}Vo(yd,"isFrame");var Et=$(require("react"),1),js=require("react/jsx-runtime"),Wg=Object.defineProperty,Tt=(e,t)=>Wg(e,"name",{value:t,configurable:!0});function zg(e,t){let a=Et.createContext(t);a.displayName=e+"Context";let o=Tt(n=>{let{children:l,...s}=n,i=Et.useMemo(()=>s,Object.values(s));return(0,js.jsx)(a.Provider,{value:i,children:l})},"Provider");o.displayName=e+"Provider";function r(n,l={}){let{optional:s=!1}=l,i=Et.useContext(a);if(i)return i;if(t!==void 0)return t;if(!s)throw new Error(`\`${n}\` must be used within \`${e}\``)}return Tt(r,"useContext"),[o,r]}Tt(zg,"createContext");function at(e,t=[]){let a=[];function o(n,l){let s=Et.createContext(l);s.displayName=n+"Context";let i=a.length;a=[...a,l];let u=Tt(d=>{let{scope:f,children:m,...h}=d,p=f?.[e]?.[i]||s,g=Et.useMemo(()=>h,Object.values(h));return(0,js.jsx)(p.Provider,{value:g,children:m})},"Provider");u.displayName=n+"Provider";function c(d,f,m={}){let{optional:h=!1}=m,p=f?.[e]?.[i]||s,g=Et.useContext(p);if(g)return g;if(l!==void 0)return l;if(!h)throw new Error(`\`${d}\` must be used within \`${n}\``)}return Tt(c,"useContext"),[u,c]}Tt(o,"createContext");let r=Tt(()=>{let n=a.map(l=>Et.createContext(l));return Tt(function(s){let i=s?.[e]||n;return Et.useMemo(()=>({[`__scope${e}`]:{...s,[e]:i}}),[s,i])},"useScope")},"createScope");return r.scopeName=e,[o,kd(r,...t)]}Tt(at,"createContextScope");function kd(...e){let t=e[0];if(e.length===1)return t;let a=Tt(()=>{let o=e.map(r=>({useScope:r(),scopeName:r.scopeName}));return Tt(function(n){let l=o.reduce((s,{useScope:i,scopeName:u})=>{let d=i(n)[`__scope${u}`];return{...s,...d}},{});return Et.useMemo(()=>({[`__scope${t.scopeName}`]:l}),[l])},"useComposedScopes")},"createScope");return a.scopeName=t.scopeName,a}Tt(kd,"composeContextScopes");var $s=$(require("react"),1);var Rd=$(require("react"),1),ge=globalThis?.document?Rd.useLayoutEffect:()=>{};var Vg=Object.defineProperty,Gg=(e,t)=>Vg(e,"name",{value:t,configurable:!0}),Kg=$s[" useId ".trim().toString()]||(()=>{}),Xg=0;function St(e){let[t,a]=$s.useState(Kg());return ge(()=>{e||a(o=>o??String(Xg++))},[e]),e||(t?`radix-${t}`:"")}Gg(St,"useId");var Ot=$(require("react"),1);var Tn=!1;var _t=$(require("react"),1);var Go=$(require("react"),1),jg=Object.defineProperty,$g=(e,t)=>jg(e,"name",{value:t,configurable:!0}),Pd=Go[" useEffectEvent ".trim().toString()],Dd=Go[" useInsertionEffect ".trim().toString()];function Ys(e){if(typeof Pd=="function")return Pd(e);let t=Go.useRef(()=>{throw new Error("Cannot call an event handler while rendering.")});return typeof Dd=="function"?Dd(()=>{t.current=e}):ge(()=>{t.current=e}),Go.useMemo(()=>((...a)=>t.current?.(...a)),[])}$g(Ys,"useEffectEvent");var Yg=Object.defineProperty,zr=(e,t)=>Yg(e,"name",{value:t,configurable:!0}),Zg=Ot[" useInsertionEffect ".trim().toString()]||ge;function Jt({prop:e,defaultProp:t,onChange:a=zr(()=>{},"onChange"),caller:o}){let[r,n,l]=Ad({defaultProp:t,onChange:a}),s=e!==void 0,i=s?e:r;if(Tn){let c=Ot.useRef(e!==void 0);Ot.useEffect(()=>{let d=c.current;d!==s&&console.warn(`${o} is changing from ${d?"controlled":"uncontrolled"} to ${s?"controlled":"uncontrolled"}. Components should not switch from controlled to uncontrolled (or vice versa). Decide between using a controlled or uncontrolled value for the lifetime of the component.`),c.current=s},[s,o])}let u=Ot.useCallback(c=>{if(s){let d=Td(c)?c(e):c;d!==e&&l.current?.(d)}else n(c)},[s,e,n,l]);return[i,u]}zr(Jt,"useControllableState");function Ad({defaultProp:e,onChange:t}){let[a,o]=Ot.useState(e),r=Ot.useRef(a),n=Ot.useRef(t);return Zg(()=>{n.current=t},[t]),Ot.useEffect(()=>{r.current!==a&&(n.current?.(a),r.current=a)},[a,r]),[a,o,n]}zr(Ad,"useUncontrolledState");function Td(e){return typeof e=="function"}zr(Td,"isFunction");var Md=Symbol("RADIX:SYNC_STATE");function Jg(e,t,a,o){let{prop:r,defaultProp:n,onChange:l,caller:s}=t,i=r!==void 0,u=Ys(l);if(Tn){let g=_t.useRef(r!==void 0);_t.useEffect(()=>{let x=g.current;x!==i&&console.warn(`${s} is changing from ${x?"controlled":"uncontrolled"} to ${i?"controlled":"uncontrolled"}. Components should not switch from controlled to uncontrolled (or vice versa). Decide between using a controlled or uncontrolled value for the lifetime of the component.`),g.current=i},[i,s])}let c=[{...a,state:n}];o&&c.push(o);let[d,f]=_t.useReducer((g,x)=>{if(x.type===Md)return{...g,state:x.state};let L=e(g,x);return i&&!Object.is(L.state,g.state)&&u(L.state),L},...c),m=d.state,h=_t.useRef(m);_t.useEffect(()=>{h.current!==m&&(h.current=m,i||u(m))},[m,h,i]);let p=_t.useMemo(()=>r!==void 0?{...d,state:r}:d,[d,r]);return _t.useEffect(()=>{i&&!Object.is(r,d.state)&&f({type:Md,state:r})},[r,d.state,i]),[p,f]}zr(Jg,"useControllableStateReducer");var Ie=$(require("react"),1);var Ed=$(require("react"),1),Od=$(require("react-dom"),1);var Fd=require("react/jsx-runtime"),Qg=Object.defineProperty,ex=(e,t)=>Qg(e,"name",{value:t,configurable:!0}),tx=["a","button","div","form","h2","h3","img","input","label","li","nav","ol","p","select","span","svg","ul"],ue=tx.reduce((e,t)=>{let a=st(`Primitive.${t}`),o=Ed.forwardRef((r,n)=>{let{asChild:l,...s}=r,i=l?a:t;return typeof window<"u"&&(window[Symbol.for("radix-ui")]=!0),(0,Fd.jsx)(i,{...s,ref:n})});return o.displayName=`Primitive.${t}`,{...e,[t]:o}},{});function Vr(e,t){e&&Od.flushSync(()=>e.dispatchEvent(t))}ex(Vr,"dispatchDiscreteCustomEvent");var Gr=$(require("react"),1),ax=Object.defineProperty,ox=(e,t)=>ax(e,"name",{value:t,configurable:!0}),Bd=Gr[" useInsertionEffect ".trim().toString()];function Xe(e){let t=Gr.useRef(e);return typeof Bd=="function"?Bd(()=>{t.current=e}):ge(()=>{t.current=e}),Gr.useMemo(()=>((...a)=>t.current?.(...a)),[])}ox(Xe,"useCallbackRef");var _d=require("react/jsx-runtime"),rx=Object.defineProperty,je=(e,t)=>rx(e,"name",{value:t,configurable:!0}),Zs="dismissableLayer.update",nx="dismissableLayer.pointerDownOutside",sx="dismissableLayer.focusOutside",Nd,Hd=Ie.createContext({layers:new Set,layersWithOutsidePointerEventsDisabled:new Set,branches:new Set,dismissableSurfaces:new Set}),Ko=Ie.forwardRef(je(function(t,a){let{disableOutsidePointerEvents:o=!1,deferPointerDownOutside:r=!1,onEscapeKeyDown:n,onPointerDownOutside:l,onFocusOutside:s,onInteractOutside:i,onDismiss:u,...c}=t,d=Ie.useContext(Hd),[f,m]=Ie.useState(null),h=f?.ownerDocument??globalThis?.document,[,p]=Ie.useState({}),g=ie(a,m),x=Array.from(d.layers),[L]=[...d.layersWithOutsidePointerEventsDisabled].slice(-1),C=L?x.indexOf(L):-1,v=f?x.indexOf(f):-1,y=d.layersWithOutsidePointerEventsDisabled.size>0,b=v>=C,S=Ie.useRef(!1),R=Ud(O=>{l?.(O),i?.(O),O.defaultPrevented||u?.()},{ownerDocument:h,deferPointerDownOutside:r,isDeferredPointerDownOutsideRef:S,dismissableSurfaces:d.dismissableSurfaces,shouldHandlePointerDownOutside:Ie.useCallback(O=>{if(!(O instanceof Node))return!1;let V=[...d.branches].some(A=>A.contains(O));return b&&!V},[d.branches,b])}),I=qd(O=>{if(r&&S.current)return;let V=O.target;[...d.branches].some(N=>N.contains(V))||(s?.(O),i?.(O),O.defaultPrevented||u?.())},h),w=f?v===x.length-1:!1,P=Xe(O=>{O.key==="Escape"&&(n?.(O),!O.defaultPrevented&&u&&(O.preventDefault(),u()))});return Ie.useEffect(()=>{if(w)return h.addEventListener("keydown",P,{capture:!0}),()=>h.removeEventListener("keydown",P,{capture:!0})},[h,w,P]),Ie.useEffect(()=>{if(f)return o&&(d.layersWithOutsidePointerEventsDisabled.size===0&&(Nd=h.body.style.pointerEvents,h.body.style.pointerEvents="none"),d.layersWithOutsidePointerEventsDisabled.add(f)),d.layers.add(f),Js(),()=>{o&&(d.layersWithOutsidePointerEventsDisabled.delete(f),d.layersWithOutsidePointerEventsDisabled.size===0&&(h.body.style.pointerEvents=Nd))}},[f,h,o,d]),Ie.useEffect(()=>()=>{f&&(d.layers.delete(f),d.layersWithOutsidePointerEventsDisabled.delete(f),Js())},[f,d]),Ie.useEffect(()=>{let O=je(()=>p({}),"handleUpdate");return document.addEventListener(Zs,O),()=>document.removeEventListener(Zs,O)},[]),(0,_d.jsx)(ue.div,{...c,ref:g,style:{pointerEvents:y?b?"auto":"none":void 0,...t.style},onFocusCapture:Y(t.onFocusCapture,I.onFocusCapture),onBlurCapture:Y(t.onBlurCapture,I.onBlurCapture),onPointerDownCapture:Y(t.onPointerDownCapture,R.onPointerDownCapture)})},"DismissableLayer"));function Qs(){let e=Ie.useContext(Hd),[t,a]=Ie.useState(null);return Ie.useEffect(()=>{if(t)return e.dismissableSurfaces.add(t),()=>{e.dismissableSurfaces.delete(t)}},[t,e.dismissableSurfaces]),a}je(Qs,"useDismissableLayerSurface");var lx=je(()=>!0,"IS_TRUE");function Ud(e,t){let{ownerDocument:a=globalThis?.document,deferPointerDownOutside:o=!1,isDeferredPointerDownOutsideRef:r,dismissableSurfaces:n,shouldHandlePointerDownOutside:l=lx}=t,s=Xe(e),i=Ie.useRef(!1),u=Ie.useRef(!1),c=Ie.useRef(new Map),d=Ie.useRef(()=>{});return Ie.useEffect(()=>{function f(){u.current=!1,r.current=!1,c.current.clear()}je(f,"resetOutsideInteraction");function m(){return Array.from(c.current.values()).some(Boolean)}je(m,"isOutsideInteractionIntercepted");function h(C){if(!u.current)return;let v=C.target;v instanceof Node&&[...n].some(b=>b.contains(v))||c.current.set(C.type,!0),C.type==="click"&&window.setTimeout(()=>{u.current&&d.current()},0)}je(h,"handleInteractionCapture");function p(C){u.current&&c.current.set(C.type,!1)}je(p,"handleInteractionBubble");let g=je(C=>{if(C.target&&!i.current){let y=function(){a.removeEventListener("click",d.current);let S=m();f(),S||el(nx,s,b,{discrete:!0})};var v=y;if(je(y,"handleAndDispatchPointerDownOutsideEvent"),!l(C.target)){a.removeEventListener("click",d.current),f(),i.current=!1;return}let b={originalEvent:C};u.current=!0,r.current=o&&C.button===0,c.current.clear(),!o||C.button!==0?y():(a.removeEventListener("click",d.current),d.current=y,a.addEventListener("click",d.current,{once:!0}))}else a.removeEventListener("click",d.current),f();i.current=!1},"handlePointerDown"),x=["pointerup","mousedown","mouseup","touchstart","touchend","click"];for(let C of x)a.addEventListener(C,h,!0),a.addEventListener(C,p);let L=window.setTimeout(()=>{a.addEventListener("pointerdown",g)},0);return()=>{window.clearTimeout(L),a.removeEventListener("pointerdown",g),a.removeEventListener("click",d.current);for(let C of x)a.removeEventListener(C,h,!0),a.removeEventListener(C,p)}},[a,s,o,r,n,l]),{onPointerDownCapture:je(()=>i.current=!0,"onPointerDownCapture")}}je(Ud,"usePointerDownOutside");function qd(e,t=globalThis?.document){let a=Xe(e),o=Ie.useRef(!1);return Ie.useEffect(()=>{let r=je(n=>{n.target&&!o.current&&el(sx,a,{originalEvent:n},{discrete:!1})},"handleFocus");return t.addEventListener("focusin",r),()=>t.removeEventListener("focusin",r)},[t,a]),{onFocusCapture:je(()=>o.current=!0,"onFocusCapture"),onBlurCapture:je(()=>o.current=!1,"onBlurCapture")}}je(qd,"useFocusOutside");function Js(){let e=new CustomEvent(Zs);document.dispatchEvent(e)}je(Js,"dispatchUpdate");function el(e,t,a,{discrete:o}){let r=a.originalEvent.target,n=new CustomEvent(e,{bubbles:!1,cancelable:!0,detail:a});t&&r.addEventListener(e,t,{once:!0}),o?Vr(r,n):r.dispatchEvent(n)}je(el,"handleAndDispatchCustomEvent");var Ae=$(require("react"),1);var nl=require("react/jsx-runtime"),ix=Object.defineProperty,He=(e,t)=>ix(e,"name",{value:t,configurable:!0}),tl="focusScope.autoFocusOnMount",al="focusScope.autoFocusOnUnmount",Wd={bubbles:!1,cancelable:!0},Xo=Ae.forwardRef(He(function(t,a){let{loop:o=!1,trapped:r=!1,branches:n,onMountAutoFocus:l,onUnmountAutoFocus:s,...i}=t,[u,c]=Ae.useState(null),d=Xe(l),f=Xe(s),m=Ae.useRef(null),h=ie(a,c),p=Ae.useRef(n);Ae.useEffect(()=>{p.current=n});let g=Ae.useCallback(C=>C?u?.contains(C)?!0:!!p.current?.some(v=>v.contains(C)):!1,[u]),x=Ae.useRef({paused:!1,pause(){this.paused=!0},resume(){this.paused=!1}}).current;Ae.useEffect(()=>{if(r){let b=function(w){if(x.paused||!u)return;let P=w.target;g(P)?m.current=P:da(m.current,{select:!0})},S=function(w){if(x.paused||!u)return;let P=w.relatedTarget;P!==null&&(g(P)||da(m.current,{select:!0}))},R=function(w){if(document.activeElement===document.body)for(let O of w)O.removedNodes.length>0&&da(u)};var C=b,v=S,y=R;He(b,"handleFocusIn"),He(S,"handleFocusOut"),He(R,"handleMutations"),document.addEventListener("focusin",b),document.addEventListener("focusout",S);let I=new MutationObserver(R);return u&&I.observe(u,{childList:!0,subtree:!0}),()=>{document.removeEventListener("focusin",b),document.removeEventListener("focusout",S),I.disconnect()}}},[r,u,x.paused,g]),Ae.useEffect(()=>{if(u){zd.add(x);let C=document.activeElement;if(!u.contains(C)){let y=new CustomEvent(tl,Wd);u.addEventListener(tl,d),u.dispatchEvent(y),y.defaultPrevented||(Gd(Yd(ll(u)),{select:!0}),document.activeElement===C&&da(u))}return()=>{u.removeEventListener(tl,d);let y=u.ownerDocument,b=CustomEvent;setTimeout(()=>{let S=new b(al,Wd);u.addEventListener(al,f),u.dispatchEvent(S),S.defaultPrevented||da(C??y.body,{select:!0}),u.removeEventListener(al,f),zd.remove(x)},0)}}},[u,d,f,x]);let L=Ae.useCallback(C=>{if(!o&&!r||x.paused)return;let v=C.key==="Tab"&&!C.altKey&&!C.ctrlKey&&!C.metaKey,y=document.activeElement;if(v&&y){let b=C.currentTarget,[S,R]=Kd(b);S&&R?!C.shiftKey&&y===R?(C.preventDefault(),o&&da(S,{select:!0})):C.shiftKey&&y===S&&(C.preventDefault(),o&&da(R,{select:!0})):y===b&&C.preventDefault()}},[o,r,x.paused]);return(0,nl.jsx)(ue.div,{tabIndex:-1,...i,ref:h,onKeyDown:L})},"FocusScope")),Vd=Ae.createContext(null);function Kr({registry:e,children:t}){return e?(0,nl.jsx)(Vd.Provider,{value:e,children:t}):t}He(Kr,"FocusScopeBranchProvider");function Xr(){let[e,t]=Ae.useState([]),a=Ae.useMemo(()=>({add:He(o=>t(r=>r.includes(o)?r:[...r,o]),"add"),remove:He(o=>t(r=>r.filter(n=>n!==o)),"remove")}),[]);return{nodes:e,registry:a}}He(Xr,"useFocusScopeBranchRegistry");function sl(e){let t=Ae.useContext(Vd);Ae.useEffect(()=>{if(!(!e||!t))return t.add(e),()=>t.remove(e)},[e,t])}He(sl,"useFocusScopeBranch");function Gd(e,{select:t=!1}={}){let a=document.activeElement;for(let o of e)if(da(o,{select:t}),document.activeElement!==a)return}He(Gd,"focusFirst");function Kd(e){let t=ll(e),a=ol(t,e),o=ol(t.reverse(),e);return[a,o]}He(Kd,"getTabbableEdges");function ll(e){let t=[],o=e.ownerDocument.createTreeWalker(e,NodeFilter.SHOW_ELEMENT,{acceptNode:He(r=>{let n=r.tagName==="INPUT"&&r.type==="hidden";return r.disabled||r.hidden||n?NodeFilter.FILTER_SKIP:r.tabIndex>=0?NodeFilter.FILTER_ACCEPT:NodeFilter.FILTER_SKIP},"acceptNode")});for(;o.nextNode();)t.push(o.currentNode);return t}He(ll,"getTabbableCandidates");function ol(e,t){let a=typeof t.checkVisibility=="function"&&t.checkVisibility({checkVisibilityCSS:!0});for(let o of e)if(!(a?!o.checkVisibility({checkVisibilityCSS:!0}):Xd(o,{upTo:t})))return o}He(ol,"findVisible");function Xd(e,{upTo:t}){if(getComputedStyle(e).visibility==="hidden")return!0;for(;e;){if(t!==void 0&&e===t)return!1;if(getComputedStyle(e).display==="none")return!0;e=e.parentElement}return!1}He(Xd,"isHidden");function jd(e){return e.tagName==="INPUT"&&typeof e.select=="function"}He(jd,"isSelectableInput");function da(e,{select:t=!1}={}){if(e&&e.focus){let o=(e.ownerDocument??document).activeElement;e.focus({preventScroll:!0}),e!==o&&jd(e)&&t&&e.select()}}He(da,"focus");var zd=$d();function $d(){let e=[];return{add(t){let a=e[0];t!==a&&a?.pause(),e=rl(e,t),e.unshift(t)},remove(t){e=rl(e,t),e[0]?.resume()}}}He($d,"createFocusScopesStack");function rl(e,t){let a=[...e],o=a.indexOf(t);return o!==-1&&a.splice(o,1),a}He(rl,"arrayRemove");function Yd(e){return e.filter(t=>t.tagName!=="A")}He(Yd,"removeLinks");var En=$(require("react"),1),Zd=$(require("react-dom"),1);var Jd=require("react/jsx-runtime"),ux=Object.defineProperty,dx=(e,t)=>ux(e,"name",{value:t,configurable:!0}),jo=En.forwardRef(dx(function(t,a){let{container:o,...r}=t,[n,l]=En.useState(!1);ge(()=>l(!0),[]);let s=o||n&&globalThis?.document?.body;return s?Zd.createPortal((0,Jd.jsx)(ue.div,{...r,ref:a}),s):null},"Portal"));var ot=$(require("react"),1);var Qd=$(require("react"),1),cx=Object.defineProperty,ca=(e,t)=>cx(e,"name",{value:t,configurable:!0});function ec(e,t){return Qd.useReducer((a,o)=>t[a][o]??a,e)}ca(ec,"useStateMachine");var fa=ca(e=>{let{present:t,children:a}=e,o=tc(t),r=typeof a=="function"?a({present:o.isPresent}):ot.Children.only(a),n=ac(o.ref,oc(r));return typeof a=="function"||o.isPresent?ot.cloneElement(r,{ref:n}):null},"Presence");function tc(e){let[t,a]=ot.useState(),o=ot.useRef(null),r=ot.useRef(e),n=ot.useRef("none"),l=ot.useRef(void 0),s=e?"mounted":"unmounted",[i,u]=ec(s,{mounted:{UNMOUNT:"unmounted",ANIMATION_OUT:"unmountSuspended"},unmountSuspended:{MOUNT:"mounted",ANIMATION_END:"unmounted"},unmounted:{MOUNT:"mounted"}});return ot.useEffect(()=>{i==="mounted"?(n.current=l.current??$o(o.current),l.current=void 0):n.current="none"},[i]),ge(()=>{let c=o.current,d=r.current;if(d!==e){let m=n.current,h=$o(c);e?(l.current=h,u("MOUNT")):h==="none"||c?.display==="none"?u("UNMOUNT"):u(d&&m!==h?"ANIMATION_OUT":"UNMOUNT"),r.current=e}},[e,u]),ge(()=>{if(t){let c,d=t.ownerDocument.defaultView??window,f=ca(h=>{let g=$o(o.current).includes(CSS.escape(h.animationName));if(h.target===t&&g&&(u("ANIMATION_END"),!r.current)){let x=t.style.animationFillMode;t.style.animationFillMode="forwards",c=d.setTimeout(()=>{t.style.animationFillMode==="forwards"&&(t.style.animationFillMode=x)})}},"handleAnimationEnd"),m=ca(h=>{h.target===t&&(n.current=$o(o.current))},"handleAnimationStart");return t.addEventListener("animationstart",m),t.addEventListener("animationcancel",f),t.addEventListener("animationend",f),()=>{d.clearTimeout(c),t.removeEventListener("animationstart",m),t.removeEventListener("animationcancel",f),t.removeEventListener("animationend",f)}}else u("ANIMATION_END")},[t,u]),{isPresent:["mounted","unmountSuspended"].includes(i),ref:ot.useCallback(c=>{if(c){let d=getComputedStyle(c);o.current=d,l.current=$o(d)}else o.current=null;a(c)},[])}}ca(tc,"usePresence");function il(e,t){if(typeof e=="function")return e(t);e!=null&&(e.current=t)}ca(il,"setRef");function ac(...e){let t=ot.useRef(e);return t.current=e,ot.useCallback(a=>{let o=t.current,r=!1,n=o.map(l=>{let s=il(l,a);return!r&&typeof s=="function"&&(r=!0),s});if(r)return()=>{for(let l=0;l<n.length;l++){let s=n[l];typeof s=="function"?s():il(o[l],null)}}},[])}ca(ac,"useStableComposedRefs");function $o(e){return e?.animationName||"none"}ca($o,"getAnimationName");function oc(e){let t=Object.getOwnPropertyDescriptor(e.props,"ref")?.get,a=t&&"isReactWarning"in t&&t.isReactWarning;return a?e.ref:(t=Object.getOwnPropertyDescriptor(e,"ref")?.get,a=t&&"isReactWarning"in t&&t.isReactWarning,a?e.props.ref:e.props.ref||e.ref)}ca(oc,"getElementRef");var rc=$(require("react"),1),fx=Object.defineProperty,dl=(e,t)=>fx(e,"name",{value:t,configurable:!0}),On=0,Yo=null;function px(e){return Oa(),e.children}dl(px,"FocusGuards");function Oa(){rc.useEffect(()=>{Yo||(Yo={start:ul(),end:ul()});let{start:e,end:t}=Yo;return document.body.firstElementChild!==e&&document.body.insertAdjacentElement("afterbegin",e),document.body.lastElementChild!==t&&document.body.insertAdjacentElement("beforeend",t),On++,()=>{On===1&&(Yo?.start.remove(),Yo?.end.remove(),Yo=null),On=Math.max(0,On-1)}},[])}dl(Oa,"useFocusGuards");function ul(){let e=document.createElement("span");return e.setAttribute("data-radix-focus-guard",""),e.tabIndex=0,e.style.outline="none",e.style.opacity="0",e.style.position="fixed",e.style.pointerEvents="none",e}dl(ul,"createFocusGuard");var pt=function(){return pt=Object.assign||function(t){for(var a,o=1,r=arguments.length;o<r;o++){a=arguments[o];for(var n in a)Object.prototype.hasOwnProperty.call(a,n)&&(t[n]=a[n])}return t},pt.apply(this,arguments)};function Fn(e,t){var a={};for(var o in e)Object.prototype.hasOwnProperty.call(e,o)&&t.indexOf(o)<0&&(a[o]=e[o]);if(e!=null&&typeof Object.getOwnPropertySymbols=="function")for(var r=0,o=Object.getOwnPropertySymbols(e);r<o.length;r++)t.indexOf(o[r])<0&&Object.prototype.propertyIsEnumerable.call(e,o[r])&&(a[o[r]]=e[o[r]]);return a}function nc(e,t,a){if(a||arguments.length===2)for(var o=0,r=t.length,n;o<r;o++)(n||!(o in t))&&(n||(n=Array.prototype.slice.call(t,0,o)),n[o]=t[o]);return e.concat(n||Array.prototype.slice.call(t))}var Un=$(require("react"));var lt=$(require("react"));var so="right-scroll-bar-position",lo="width-before-scroll-bar",cl="with-scroll-bars-hidden",fl="--removed-body-scroll-bar-size";function Bn(e,t){return typeof e=="function"?e(t):e&&(e.current=t),e}var sc=require("react");function lc(e,t){var a=(0,sc.useState)(function(){return{value:e,callback:t,facade:{get current(){return a.value},set current(o){var r=a.value;r!==o&&(a.value=o,a.callback(o,r))}}}})[0];return a.callback=t,a.facade}var Nn=$(require("react"));var mx=typeof window<"u"?Nn.useLayoutEffect:Nn.useEffect,ic=new WeakMap;function pl(e,t){var a=lc(t||null,function(o){return e.forEach(function(r){return Bn(r,o)})});return mx(function(){var o=ic.get(a);if(o){var r=new Set(o),n=new Set(e),l=a.current;r.forEach(function(s){n.has(s)||Bn(s,null)}),n.forEach(function(s){r.has(s)||Bn(s,l)})}ic.set(a,e)},[e]),a}function hx(e){return e}function gx(e,t){t===void 0&&(t=hx);var a=[],o=!1,r={read:function(){if(o)throw new Error("Sidecar: could not `read` from an `assigned` medium. `read` could be used only with `useMedium`.");return a.length?a[a.length-1]:e},useMedium:function(n){var l=t(n,o);return a.push(l),function(){a=a.filter(function(s){return s!==l})}},assignSyncMedium:function(n){for(o=!0;a.length;){var l=a;a=[],l.forEach(n)}a={push:function(s){return n(s)},filter:function(){return a}}},assignMedium:function(n){o=!0;var l=[];if(a.length){var s=a;a=[],s.forEach(n),l=a}var i=function(){var c=l;l=[],c.forEach(n)},u=function(){return Promise.resolve().then(i)};u(),a={push:function(c){l.push(c),u()},filter:function(c){return l=l.filter(c),a}}}};return r}function ml(e){e===void 0&&(e={});var t=gx(null);return t.options=pt({async:!0,ssr:!1},e),t}var uc=$(require("react")),dc=function(e){var t=e.sideCar,a=Fn(e,["sideCar"]);if(!t)throw new Error("Sidecar: please provide `sideCar` property to import the right car");var o=t.read();if(!o)throw new Error("Sidecar medium not found");return uc.createElement(o,pt({},a))};dc.isSideCarExport=!0;function hl(e,t){return e.useMedium(t),dc}var _n=ml();var gl=function(){},jr=lt.forwardRef(function(e,t){var a=lt.useRef(null),o=lt.useState({onScrollCapture:gl,onWheelCapture:gl,onTouchMoveCapture:gl}),r=o[0],n=o[1],l=e.forwardProps,s=e.children,i=e.className,u=e.removeScrollBar,c=e.enabled,d=e.shards,f=e.sideCar,m=e.noRelative,h=e.noIsolation,p=e.inert,g=e.allowPinchZoom,x=e.as,L=x===void 0?"div":x,C=e.gapMode,v=Fn(e,["forwardProps","children","className","removeScrollBar","enabled","shards","sideCar","noRelative","noIsolation","inert","allowPinchZoom","as","gapMode"]),y=f,b=pl([a,t]),S=pt(pt({},v),r);return lt.createElement(lt.Fragment,null,c&&lt.createElement(y,{sideCar:_n,removeScrollBar:u,shards:d,noRelative:m,noIsolation:h,inert:p,setCallbacks:n,allowPinchZoom:!!g,lockRef:a,gapMode:C}),l?lt.cloneElement(lt.Children.only(s),pt(pt({},S),{ref:b})):lt.createElement(L,pt({},S,{className:i,ref:b}),s))});jr.defaultProps={enabled:!0,removeScrollBar:!0,inert:!1};jr.classNames={fullWidth:lo,zeroRight:so};var Pe=$(require("react"));var Jo=$(require("react"));var pc=$(require("react"));var cc;var fc=function(){if(cc)return cc;if(typeof __webpack_nonce__<"u")return __webpack_nonce__};function xx(){if(!document)return null;var e=document.createElement("style");e.type="text/css";var t=fc();return t&&e.setAttribute("nonce",t),e}function bx(e,t){e.styleSheet?e.styleSheet.cssText=t:e.appendChild(document.createTextNode(t))}function Cx(e){var t=document.head||document.getElementsByTagName("head")[0];t.appendChild(e)}var xl=function(){var e=0,t=null;return{add:function(a){e==0&&(t=xx())&&(bx(t,a),Cx(t)),e++},remove:function(){e--,!e&&t&&(t.parentNode&&t.parentNode.removeChild(t),t=null)}}};var bl=function(){var e=xl();return function(t,a){pc.useEffect(function(){return e.add(t),function(){e.remove()}},[t&&a])}};var $r=function(){var e=bl(),t=function(a){var o=a.styles,r=a.dynamic;return e(o,r),null};return t};var Lx={left:0,top:0,right:0,gap:0},Cl=function(e){return parseInt(e||"",10)||0},vx=function(e){var t=window.getComputedStyle(document.body),a=t[e==="padding"?"paddingLeft":"marginLeft"],o=t[e==="padding"?"paddingTop":"marginTop"],r=t[e==="padding"?"paddingRight":"marginRight"];return[Cl(a),Cl(o),Cl(r)]},Ll=function(e){if(e===void 0&&(e="margin"),typeof window>"u")return Lx;var t=vx(e),a=document.documentElement.clientWidth,o=window.innerWidth;return{left:t[0],top:t[1],right:t[2],gap:Math.max(0,o-a+t[2]-t[0])}};var Ix=$r(),Zo="data-scroll-locked",wx=function(e,t,a,o){var r=e.left,n=e.top,l=e.right,s=e.gap;return a===void 0&&(a="margin"),`
  .`.concat(cl,` {
   overflow: hidden `).concat(o,`;
   padding-right: `).concat(s,"px ").concat(o,`;
  }
  body[`).concat(Zo,`] {
    overflow: hidden `).concat(o,`;
    overscroll-behavior: contain;
    `).concat([t&&"position: relative ".concat(o,";"),a==="margin"&&`
    padding-left: `.concat(r,`px;
    padding-top: `).concat(n,`px;
    padding-right: `).concat(l,`px;
    margin-left:0;
    margin-top:0;
    margin-right: `).concat(s,"px ").concat(o,`;
    `),a==="padding"&&"padding-right: ".concat(s,"px ").concat(o,";")].filter(Boolean).join(""),`
  }
  
  .`).concat(so,` {
    right: `).concat(s,"px ").concat(o,`;
  }
  
  .`).concat(lo,` {
    margin-right: `).concat(s,"px ").concat(o,`;
  }
  
  .`).concat(so," .").concat(so,` {
    right: 0 `).concat(o,`;
  }
  
  .`).concat(lo," .").concat(lo,` {
    margin-right: 0 `).concat(o,`;
  }
  
  body[`).concat(Zo,`] {
    `).concat(fl,": ").concat(s,`px;
  }
`)},mc=function(){var e=parseInt(document.body.getAttribute(Zo)||"0",10);return isFinite(e)?e:0},Sx=function(){Jo.useEffect(function(){return document.body.setAttribute(Zo,(mc()+1).toString()),function(){var e=mc()-1;e<=0?document.body.removeAttribute(Zo):document.body.setAttribute(Zo,e.toString())}},[])},vl=function(e){var t=e.noRelative,a=e.noImportant,o=e.gapMode,r=o===void 0?"margin":o;Sx();var n=Jo.useMemo(function(){return Ll(r)},[r]);return Jo.createElement(Ix,{styles:wx(n,!t,r,a?"":"!important")})};var Il=!1;if(typeof window<"u")try{Yr=Object.defineProperty({},"passive",{get:function(){return Il=!0,!0}}),window.addEventListener("test",Yr,Yr),window.removeEventListener("test",Yr,Yr)}catch{Il=!1}var Yr,io=Il?{passive:!1}:!1;var yx=function(e){return e.tagName==="TEXTAREA"},hc=function(e,t){if(!(e instanceof Element))return!1;var a=window.getComputedStyle(e);return a[t]!=="hidden"&&!(a.overflowY===a.overflowX&&!yx(e)&&a[t]==="visible")},kx=function(e){return hc(e,"overflowY")},Rx=function(e){return hc(e,"overflowX")},wl=function(e,t){var a=t.ownerDocument,o=t;do{typeof ShadowRoot<"u"&&o instanceof ShadowRoot&&(o=o.host);var r=gc(e,o);if(r){var n=xc(e,o),l=n[1],s=n[2];if(l>s)return!0}o=o.parentNode}while(o&&o!==a.body);return!1},Px=function(e){var t=e.scrollTop,a=e.scrollHeight,o=e.clientHeight;return[t,a,o]},Dx=function(e){var t=e.scrollLeft,a=e.scrollWidth,o=e.clientWidth;return[t,a,o]},gc=function(e,t){return e==="v"?kx(t):Rx(t)},xc=function(e,t){return e==="v"?Px(t):Dx(t)},Mx=function(e,t){return e==="h"&&t==="rtl"?-1:1},bc=function(e,t,a,o,r){var n=Mx(e,window.getComputedStyle(t).direction),l=n*o,s=a.target,i=t.contains(s),u=!1,c=l>0,d=0,f=0;do{if(!s)break;var m=xc(e,s),h=m[0],p=m[1],g=m[2],x=p-g-n*h;(h||x)&&gc(e,s)&&(d+=x,f+=h);var L=s.parentNode;s=L&&L.nodeType===Node.DOCUMENT_FRAGMENT_NODE?L.host:L}while(!i&&s!==document.body||i&&(t.contains(s)||t===s));return(c&&(r&&Math.abs(d)<1||!r&&l>d)||!c&&(r&&Math.abs(f)<1||!r&&-l>f))&&(u=!0),u};var Hn=function(e){return"changedTouches"in e?[e.changedTouches[0].clientX,e.changedTouches[0].clientY]:[0,0]},Cc=function(e){return[e.deltaX,e.deltaY]},Lc=function(e){return e&&"current"in e?e.current:e},Ax=function(e,t){return e[0]===t[0]&&e[1]===t[1]},Tx=function(e){return`
  .block-interactivity-`.concat(e,` {pointer-events: none;}
  .allow-interactivity-`).concat(e,` {pointer-events: all;}
`)},Ex=0,Qo=[];function vc(e){var t=Pe.useRef([]),a=Pe.useRef([0,0]),o=Pe.useRef(),r=Pe.useState(Ex++)[0],n=Pe.useState($r)[0],l=Pe.useRef(e);Pe.useEffect(function(){l.current=e},[e]),Pe.useEffect(function(){if(e.inert){document.body.classList.add("block-interactivity-".concat(r));var p=nc([e.lockRef.current],(e.shards||[]).map(Lc),!0).filter(Boolean);return p.forEach(function(g){return g.classList.add("allow-interactivity-".concat(r))}),function(){document.body.classList.remove("block-interactivity-".concat(r)),p.forEach(function(g){return g.classList.remove("allow-interactivity-".concat(r))})}}},[e.inert,e.lockRef.current,e.shards]);var s=Pe.useCallback(function(p,g){if("touches"in p&&p.touches.length===2||p.type==="wheel"&&p.ctrlKey)return!l.current.allowPinchZoom;var x=Hn(p),L=a.current,C="deltaX"in p?p.deltaX:L[0]-x[0],v="deltaY"in p?p.deltaY:L[1]-x[1],y,b=p.target,S=Math.abs(C)>Math.abs(v)?"h":"v";if("touches"in p&&S==="h"&&b.type==="range")return!1;var R=window.getSelection(),I=R&&R.anchorNode,w=I?I===b||I.contains(b):!1;if(w)return!1;var P=wl(S,b);if(!P)return!0;if(P?y=S:(y=S==="v"?"h":"v",P=wl(S,b)),!P)return!1;if(!o.current&&"changedTouches"in p&&(C||v)&&(o.current=y),!y)return!0;var O=o.current||y;return bc(O,g,p,O==="h"?C:v,!0)},[]),i=Pe.useCallback(function(p){var g=p;if(!(!Qo.length||Qo[Qo.length-1]!==n)){var x="deltaY"in g?Cc(g):Hn(g),L=t.current.filter(function(y){return y.name===g.type&&(y.target===g.target||g.target===y.shadowParent)&&Ax(y.delta,x)})[0];if(L&&L.should){g.cancelable&&g.preventDefault();return}if(!L){var C=(l.current.shards||[]).map(Lc).filter(Boolean).filter(function(y){return y.contains(g.target)}),v=C.length>0?s(g,C[0]):!l.current.noIsolation;v&&g.cancelable&&g.preventDefault()}}},[]),u=Pe.useCallback(function(p,g,x,L){var C={name:p,delta:g,target:x,should:L,shadowParent:Ox(x)};t.current.push(C),setTimeout(function(){t.current=t.current.filter(function(v){return v!==C})},1)},[]),c=Pe.useCallback(function(p){a.current=Hn(p),o.current=void 0},[]),d=Pe.useCallback(function(p){u(p.type,Cc(p),p.target,s(p,e.lockRef.current))},[]),f=Pe.useCallback(function(p){u(p.type,Hn(p),p.target,s(p,e.lockRef.current))},[]);Pe.useEffect(function(){return Qo.push(n),e.setCallbacks({onScrollCapture:d,onWheelCapture:d,onTouchMoveCapture:f}),document.addEventListener("wheel",i,io),document.addEventListener("touchmove",i,io),document.addEventListener("touchstart",c,io),function(){Qo=Qo.filter(function(p){return p!==n}),document.removeEventListener("wheel",i,io),document.removeEventListener("touchmove",i,io),document.removeEventListener("touchstart",c,io)}},[]);var m=e.removeScrollBar,h=e.inert;return Pe.createElement(Pe.Fragment,null,h?Pe.createElement(n,{styles:Tx(r)}):null,m?Pe.createElement(vl,{noRelative:e.noRelative,gapMode:e.gapMode}):null)}function Ox(e){for(var t=null;e!==null;)e instanceof ShadowRoot&&(t=e.host,e=e.host),e=e.parentNode;return t}var Ic=hl(_n,vc);var wc=Un.forwardRef(function(e,t){return Un.createElement(jr,pt({},e,{ref:t,sideCar:Ic}))});wc.classNames=jr.classNames;var uo=wc;var Fx=function(e){if(typeof document>"u")return null;var t=Array.isArray(e)?e[0]:e;return t.ownerDocument.body},er=new WeakMap,qn=new WeakMap,Wn={},Sl=0,Sc=function(e){return e&&(e.host||Sc(e.parentNode))},Bx=function(e,t){return t.map(function(a){if(e.contains(a))return a;var o=Sc(a);return o&&e.contains(o)?o:(console.error("aria-hidden",a,"in not contained inside",e,". Doing nothing"),null)}).filter(function(a){return!!a})},Nx=function(e,t,a,o){var r=Bx(t,Array.isArray(e)?e:[e]);Wn[a]||(Wn[a]=new WeakMap);var n=Wn[a],l=[],s=new Set,i=new Set(r),u=function(d){!d||s.has(d)||(s.add(d),u(d.parentNode))};r.forEach(u);var c=function(d){!d||i.has(d)||Array.prototype.forEach.call(d.children,function(f){if(s.has(f))c(f);else try{var m=f.getAttribute(o),h=m!==null&&m!=="false",p=(er.get(f)||0)+1,g=(n.get(f)||0)+1;er.set(f,p),n.set(f,g),l.push(f),p===1&&h&&qn.set(f,!0),g===1&&f.setAttribute(a,"true"),h||f.setAttribute(o,"true")}catch(x){console.error("aria-hidden: cannot operate on ",f,x)}})};return c(t),s.clear(),Sl++,function(){l.forEach(function(d){var f=er.get(d)-1,m=n.get(d)-1;er.set(d,f),n.set(d,m),f||(qn.has(d)||d.removeAttribute(o),qn.delete(d)),m||d.removeAttribute(a)}),Sl--,Sl||(er=new WeakMap,er=new WeakMap,qn=new WeakMap,Wn={})}},tr=function(e,t,a){a===void 0&&(a="data-aria-hidden");var o=Array.from(Array.isArray(e)?e:[e]),r=t||Fx(e);return r?(o.push.apply(o,Array.from(r.querySelectorAll("[aria-live], script"))),Nx(o,r,a,"aria-hidden")):function(){return null}};var Ue=require("react/jsx-runtime"),_x=Object.defineProperty,yt=(e,t)=>_x(e,"name",{value:t,configurable:!0}),kl="Dialog",[yc,SS]=at(kl),[Hx,Qt]=yc(kl),kc=yt(e=>{let{__scopeDialog:t,children:a,open:o,defaultOpen:r,onOpenChange:n,modal:l=!0}=e,s=ye.useRef(null),i=ye.useRef(null),{nodes:u,registry:c}=Xr(),[d,f]=Jt({prop:o,defaultProp:r??!1,onChange:n,caller:kl}),[m,h]=ye.useState(0),[p,g]=ye.useState(0);return(0,Ue.jsx)(Hx,{scope:t,triggerRef:s,contentRef:i,contentId:St(),titleId:St(),descriptionId:St(),titlePresent:m>0,descriptionPresent:p>0,setTitleCount:h,setDescriptionCount:g,open:d,onOpenChange:f,onOpenToggle:ye.useCallback(()=>f(x=>!x),[f]),modal:l,branchNodes:u,branchRegistry:c,children:a})},"Dialog");var Rc="DialogPortal",[Ux,Pc]=yc(Rc,{forceMount:void 0}),Dc=yt(e=>{let{__scopeDialog:t,forceMount:a,children:o,container:r}=e,n=Qt(Rc,t);return(0,Ue.jsx)(Ux,{scope:t,forceMount:a,children:ye.Children.map(o,l=>(0,Ue.jsx)(fa,{present:a||n.open,children:(0,Ue.jsx)(jo,{asChild:!0,container:r,children:l})}))})},"DialogPortal"),yl="DialogOverlay",Rl=ye.forwardRef(yt(function(t,a){let o=Pc(yl,t.__scopeDialog),{forceMount:r=o.forceMount,...n}=t,l=Qt(yl,t.__scopeDialog);return l.modal?(0,Ue.jsx)(fa,{present:r||l.open,children:(0,Ue.jsx)(Wx,{...n,ref:a})}):null},"DialogOverlay")),qx=st("DialogOverlay.RemoveScroll"),Wx=ye.forwardRef(yt(function(t,a){let{__scopeDialog:o,...r}=t,n=Qt(yl,o),l=Qs(),s=ie(a,l);return(0,Ue.jsx)(uo,{as:qx,allowPinchZoom:!0,shards:ye.useMemo(()=>[n.contentRef,...n.branchNodes.map(i=>({current:i}))],[n.contentRef,n.branchNodes]),children:(0,Ue.jsx)(ue.div,{"data-state":Al(n.open),...r,ref:s,style:{pointerEvents:"auto",...r.style}})})},"DialogOverlayImpl")),Zr="DialogContent",Pl=ye.forwardRef(yt(function(t,a){let o=Pc(Zr,t.__scopeDialog),{forceMount:r=o.forceMount,...n}=t,l=Qt(Zr,t.__scopeDialog);return(0,Ue.jsx)(fa,{present:r||l.open,children:l.modal?(0,Ue.jsx)(zx,{...n,ref:a}):(0,Ue.jsx)(Vx,{...n,ref:a})})},"DialogContent")),zx=ye.forwardRef(yt(function(t,a){let o=Qt(Zr,t.__scopeDialog),r=ye.useRef(null),n=ie(a,o.contentRef,r);return ye.useEffect(()=>{let l=r.current;if(l)return tr(l)},[]),(0,Ue.jsx)(Mc,{...t,ref:n,trapFocus:o.open,disableOutsidePointerEvents:o.open,onCloseAutoFocus:Y(t.onCloseAutoFocus,l=>{l.preventDefault(),o.triggerRef.current?.focus()}),onPointerDownOutside:Y(t.onPointerDownOutside,l=>{let s=l.detail.originalEvent,i=s.button===0&&s.ctrlKey===!0;(s.button===2||i)&&l.preventDefault()}),onFocusOutside:Y(t.onFocusOutside,l=>l.preventDefault())})},"DialogContentModal")),Vx=ye.forwardRef(yt(function(t,a){let o=Qt(Zr,t.__scopeDialog),r=ye.useRef(!1),n=ye.useRef(!1);return(0,Ue.jsx)(Mc,{...t,ref:a,trapFocus:!1,disableOutsidePointerEvents:!1,onCloseAutoFocus:l=>{t.onCloseAutoFocus?.(l),l.defaultPrevented||(r.current||o.triggerRef.current?.focus(),l.preventDefault()),r.current=!1,n.current=!1},onInteractOutside:l=>{t.onInteractOutside?.(l),l.defaultPrevented||(r.current=!0,l.detail.originalEvent.type==="pointerdown"&&(n.current=!0));let s=l.target;o.triggerRef.current?.contains(s)&&l.preventDefault(),l.detail.originalEvent.type==="focusin"&&n.current&&l.preventDefault()}})},"DialogContentNonModal")),Mc=ye.forwardRef(yt(function(t,a){let{__scopeDialog:o,trapFocus:r,onOpenAutoFocus:n,onCloseAutoFocus:l,"aria-describedby":s,children:i,...u}=t,c=Qt(Zr,o);return Oa(),(0,Ue.jsx)(Kr,{registry:c.branchRegistry,children:(0,Ue.jsx)(Xo,{asChild:!0,loop:!0,trapped:r,branches:c.branchNodes,onMountAutoFocus:n,onUnmountAutoFocus:l,children:(0,Ue.jsx)(Ko,{role:"dialog",id:c.contentId,"aria-labelledby":c.titlePresent?c.titleId:void 0,"aria-describedby":c.descriptionPresent?Tc(s,c.descriptionId):s,"data-state":Al(c.open),...u,ref:a,deferPointerDownOutside:!0,onDismiss:()=>c.onOpenChange(!1),children:i})})})},"DialogContentImpl")),Dl=ye.forwardRef(yt(function(t,a){let{__scopeDialog:o,...r}=t,n=Qt("DialogTitle",o),{setTitleCount:l}=n;return ge(()=>(l(s=>s+1),()=>l(s=>s-1)),[l]),(0,Ue.jsx)(ue.h2,{id:n.titleId,...r,ref:a})},"DialogTitle")),Ml=ye.forwardRef(yt(function(t,a){let{__scopeDialog:o,...r}=t,n=Qt("DialogDescription",o),{setDescriptionCount:l}=n;return ge(()=>(l(s=>s+1),()=>l(s=>s-1)),[l]),(0,Ue.jsx)(ue.p,{id:n.descriptionId,...r,ref:a})},"DialogDescription")),Gx="DialogClose",Ac=ye.forwardRef(yt(function(t,a){let{__scopeDialog:o,...r}=t,n=Qt(Gx,o);return(0,Ue.jsx)(ue.button,{type:"button",...r,ref:a,onClick:Y(t.onClick,()=>n.onOpenChange(!1))})},"DialogClose"));function Tc(...e){let t=new Set;for(let a of e)if(typeof a=="string")for(let o of String(a).trim().split(/\s+/))o&&t.add(o);return t.size>0?Array.from(t).join(" "):void 0}yt(Tc,"concatAriaDescribedby");function Al(e){return e?"open":"closed"}yt(Al,"getState");var Oc=require("react"),co="dsh-kanban",Fc={wfTitle:"工作流",wfScopeAll:"所有看板",wfScopeBoard:"仅当前看板",wfAppliesTo:"适用于所有看板（{n} 个工作区）。",wfColumns:"列",wfColumnsEmpty:"工作流至少需要一列",wfAutomation:"自动化",wfAutomationSub:"每个看板上共用的流水线行为。",wfBoardOnly:"当前看板 · {name}",wfEnabled:"此看板上的编排器",wfEnabledHint:"关闭：卡片仅由人或 manager 移动。",wfSaveAll:"为所有看板保存",wfSaving:"保存中…",wfSaved:"规则已保存 · 已更新看板：{n}",wfSaveFailed:"无法保存规则：{detail}",wfDupColumn:"此名称的列已存在",wfMaxColumns:"最多 12 列",wfOneEntry:"入口列只能有一个",wfWipRange:"WIP 限制须为 1-20",wfExtraColumns:"此看板有规则外的列：{names}，它们保留在看板但不参与自动化。",wfOnBoard:"已在看板上",wfWillCreate:"保存时将创建",wfBoardSaved:"已保存",wfBoardSaveFailed:"无法切换：{detail}",wfDiscardTitle:"更改未保存",wfDiscard:"放弃更改",wfKeepEditing:"继续编辑",wfKind:"阶段",wfKindFlow:"中间环节",wfKindSource:"取卡来源",wfKindEntry:"先落此处",wfKindDone:"完成",wfNoRole:"—无角色—",wfRole:"角色",wfAdd:"添加列",wfMoveUp:"上移",wfMoveDown:"下移",wfRemove:"删除列",wfClose:"关闭",wfRetry:"重试",wfWip:"每列 WIP 限制",wfPullOrder:"拉取顺序",wfPullPriority:"按优先级",wfPullCreated:"按创建时间",wfAutoPull:"自动拉取卡片",wfEnforceWip:"强制限制",wfStamp:"卡片指派标记",wfLabels:"卡片标签分配",wfDispatch:"分派给代理",wfDispatchModel:"模型",wfLoadFailed:"无法读取设置：{detail}",wfPullBoard:"看板顺序",wfColOnBoard:"在看板",wfColName:"列",wfColRole:"团队角色",wfColStep:"流程环节",wfStepExplain:"“取卡来源”＝从此列取卡；“先落此处”＝取出的卡片先放此列。",wfDragHint:"拖动行以调整顺序",wfReorder:"重新排序 {name}",wfDragStart:"{name}：正在移动…",wfDragPosition:"{name}：第 {n} 位，共 {N}",wfDragDrop:"{name}：已移至第 {n} 位",wfDragCancel:"{name}：移动已取消",boardTab:"\u770B\u677F",loading:"\u770B\u677F\u52A0\u8F7D\u4E2D\u2026",loadFailed:"\u770B\u677F\u52A0\u8F7D\u5931\u8D25\uFF1A",actionFailed:"\u64CD\u4F5C\u5931\u8D25\uFF1A",actionRetry:"\u64CD\u4F5C\u672A\u5B8C\u6210\uFF0C\u8BF7\u91CD\u8BD5\u3002",confirmDelete:"\u786E\u8BA4\u5220\u9664",discardChanges:"\u653E\u5F03\u4FEE\u6539",discardCommentDesc:"\u672A\u53D1\u9001\u7684\u8BC4\u8BBA\u4E0D\u4F1A\u5E26\u5165\u5BF9\u8BDD\uFF0C\u786E\u5B9A\u653E\u5F03\u8BC4\u8BBA\u5E76\u7EE7\u7EED\uFF1F",discardAndContinue:"\u653E\u5F03\u5E76\u7EE7\u7EED",discardChangesDesc:"\u6709\u672A\u4FDD\u5B58\u7684\u4FEE\u6539\u6216\u672A\u53D1\u9001\u7684\u8BC4\u8BBA\uFF0C\u786E\u5B9A\u653E\u5F03\u5E76\u5173\u95ED\uFF1F",deleteCardDesc:"\u5220\u9664\u6B64\u5361\u7247\u53CA\u5176\u8BC4\u8BBA\uFF1F\u6B64\u64CD\u4F5C\u65E0\u6CD5\u64A4\u9500\u3002",deleteColumnDesc:"\u5220\u9664\u5217\u8868\u300C{column}\u300D\uFF1F\u5361\u7247\u5C06\u79FB\u5230\u5269\u4F59\u7684\u7B2C\u4E00\u5217\u3002",deleteLabelDesc:"\u5220\u9664\u6807\u7B7E\u300C{label}\u300D\uFF1F\u6B64\u6807\u7B7E\u5C06\u4ECE\u6240\u6709\u5361\u7247\u4E2D\u79FB\u9664\u3002",clearFilter:"\u6E05\u9664\u7B5B\u9009",noMatchingCards:"\u65E0\u5339\u914D\u5361\u7247",refresh:"\u5237\u65B0\u770B\u677F",settings:"\u8BBE\u7F6E",columnEdit:"\u5217\u7F16\u8F91",labelEdit:"\u6807\u7B7E\u7F16\u8F91",orchMenu:"\u5DE5\u4F5C\u6D41\u81EA\u52A8\u5316",workspaceLabel:"\u5DE5\u4F5C\u533A",attachTitle:"\u9644\u4EF6",attachEmpty:"\u6682\u65E0\u6587\u4EF6\uFF1B\u667A\u80FD\u4F53\u7684\u5DE5\u4F5C\u4EA7\u7269\u4F1A\u663E\u793A\u5728\u8FD9\u91CC\u3002",attachTruncated:"\uFF08\u9884\u89C8\u5DF2\u622A\u65AD\uFF09",attachLoading:"\u52A0\u8F7D\u4E2D\u2026",attachCopyPath:"\u590D\u5236\u8DEF\u5F84",openTaskDialog:"\u6253\u5F00\u4F1A\u8BDD",orchTitle:"\u5DE5\u4F5C\u6D41\u81EA\u52A8\u5316",orchDesc:"\u670D\u52A1\u5668\u7AEF\u89C4\u5219\uFF1A\u5217\u89D2\u8272\u3001WIP \u4E0A\u9650\u3001\u81EA\u52A8\u9886\u53D6\u2014\u2014\u4E0D\u7ECF\u8FC7\u5927\u6A21\u578B\u3002",orchEnabled:"\u542F\u7528\u7F16\u6392\u5668",orchWipLimit:"WIP \u4E0A\u9650\uFF08\u6D41\u7A0B\u4E2D\u7684\u5361\u7247\uFF09",orchWipHint:"\u6D41\u7A0B\u4E2D\u5141\u8BB8\u7684\u6700\u5927\u5361\u7247\u6570\uFF08\u6E90\u5217\u548C\u5B8C\u6210\u5217\u4E4B\u5916\uFF09\uFF0C\u9ED8\u8BA4\u4E3A 1\u3002",orchSourceColumn:"\u6E90\uFF08\u5F85\u529E\uFF09\u5217",orchEntryColumn:"\u5165\u53E3\u5217",orchDoneColumns:"\u5B8C\u6210\u5217",orchAutoSelect:"\u81EA\u52A8",orchAutoPull:"\u81EA\u52A8\u4ECE\u6E90\u5217\u9886\u53D6\u4E0B\u4E00\u5F20\u5361\u7247",orchPullOrder:"\u9886\u53D6\u987A\u5E8F",orchPriorityOrder:"\u6309\u4F18\u5148\u7EA7",orchBoardOrder:"\u6309\u770B\u677F\u987A\u5E8F",orchEnforceWip:"\u5C06\u8D85\u989D\u7684\u5361\u7247\u9000\u56DE\u6E90\u5217",orchStamp:"\u5728\u5361\u7247\u4E0A\u8BC4\u8BBA\u5206\u914D\u7ED3\u679C",orchLabel:"\u4E3A\u5361\u7247\u6253\u4E0A\u89D2\u8272\u6807\u7B7E",orchDispatch:"\u5206\u914D\u65F6\u542F\u52A8\u89D2\u8272\u4EE3\u7406",orchDispatchHint:"\u521B\u5EFA\u8FD0\u884C\u89D2\u8272\u9884\u8BBE\u7684\u4F1A\u8BDD\u5E76\u628A\u5361\u7247\u4EFB\u52A1\u53D1\u9001\u7ED9\u5B83\u3002",orchDispatchModel:"\u8C03\u5EA6\u6A21\u578B\uFF08provider/model\uFF09",orchDispatchModelHint:"\u4F8B\u5982 deepseek-proxy/deepseek-chat\uFF1B\u7559\u7A7A\u8868\u793A\u4F7F\u7528\u9ED8\u8BA4\u6A21\u578B\u3002",orchRefreshSec:"\u754C\u9762\u81EA\u52A8\u5237\u65B0\u95F4\u9694\uFF08\u79D2\uFF09",orchRefreshHint:"\u5361\u7247\u53D8\u5316\u7684\u8F6E\u8BE2\u95F4\u9694\uFF1B0 \u8868\u793A\u5173\u95ED\u81EA\u52A8\u5237\u65B0\u3002",orchColumnRoles:"\u5217\u89D2\u8272",orchRolesHint:"\u4E3A\u6BCF\u4E00\u5217\u9009\u62E9\u8D1F\u8D23\u7684\u4EE3\u7406\u89D2\u8272\uFF1B\u5361\u7247\u5230\u8FBE\u8BE5\u5217\u65F6\u4F1A\u88AB\u5206\u914D\u3002",orchNoRole:"\u2014 \u65E0\u89D2\u8272 \u2014",orchStatus:"\u72B6\u6001",orchActiveInFlow:"\u6D41\u7A0B\u4E2D",orchRunNow:"\u7ACB\u5373\u8FD0\u884C",orchSaved:"\u5DF2\u4FDD\u5B58",emptyColumn:"\u6682\u65E0\u5361\u7247",addCard:"\u6DFB\u52A0\u5361\u7247",dragSort:"\u62D6\u62FD\u6392\u5E8F",cardKeyboardHelp:"\u6309\u56DE\u8F66\u7F16\u8F91\u5361\u7247\uFF1B\u6309\u7A7A\u683C\u6293\u53D6\u5361\u7247\uFF0C\u7528\u65B9\u5411\u952E\u79FB\u52A8\uFF0C\u518D\u6309\u7A7A\u683C\u653E\u4E0B\uFF0C\u6216\u6309 Esc \u53D6\u6D88\u3002",columnName:"\u5217\u8868\u540D\u79F0",labelName:"\u6807\u7B7E\u540D\u79F0",labelColor:"\u6807\u7B7E\u989C\u8272",newLabelColor:"\u65B0\u6807\u7B7E\u989C\u8272",deleteLabel:"\u5220\u9664\u6807\u7B7E",editCard:"\u7F16\u8F91\u5361\u7247",taskDetails:"\u4EFB\u52A1\u8BE6\u60C5",resizeTaskDetails:"\u8C03\u6574\u4EFB\u52A1\u8BE6\u60C5\u5BBD\u5EA6",resizeTaskDetailsHint:"\u62D6\u52A8\u6216\u4F7F\u7528\u5DE6\u53F3\u65B9\u5411\u952E\u8C03\u6574\u5BBD\u5EA6\uFF0CHome \u6700\u7A84\uFF0CEnd \u6700\u5BBD\u3002",fieldTitle:"\u6807\u9898",fieldId:"\u4EFB\u52A1 ID",titlePlaceholder:"\u5361\u7247\u6807\u9898",fieldLabel:"\u6807\u7B7E",noLabel:"\u65E0\u6807\u7B7E",fieldPriority:"\u4F18\u5148\u7EA7",noPriority:"\u65E0\u4F18\u5148\u7EA7",fieldAssignee:"\u8D1F\u8D23\u4EBA",fieldParent:"\u7236\u4EFB\u52A1",fieldChildren:"\u5B50\u4EFB\u52A1",fieldMilestone:"\u91CC\u7A0B\u7891",milestoneHint:"\u5B50\u4EFB\u52A1\u5168\u90E8\u5B8C\u6210\u540E\u624D\u5173\u95ED",assigneePlaceholder:"\u89D2\u8272",fieldDueDate:"\u622A\u6B62\u65E5\u671F",today:"\u4ECA\u5929",tomorrow:"\u660E\u5929",nextWeek:"\u4E00\u5468\u540E",clearDate:"\u6E05\u9664\u65E5\u671F",dueToday:"\u4ECA\u5929\u5230\u671F",overdue:"\u5DF2\u903E\u671F",overdueDays:"\u5DF2\u903E\u671F {days} \u5929",shortDate:"{month}\u6708{day}\u65E5",yearDate:"{year}\u5E74{month}\u6708{day}\u65E5",dueDateFilter:"\u6309\u622A\u6B62\u65E5\u671F\u7B5B\u9009",completedColumn:"\u5B8C\u6210\u5217",noCompletedColumn:"\u672A\u8BBE\u7F6E",completedColumnHint:"\u79FB\u5165\u6B64\u5217\u7684\u4EFB\u52A1\u89C6\u4E3A\u5DF2\u5B8C\u6210\uFF0C\u4E0D\u8BA1\u5165\u5230\u671F\u548C\u903E\u671F\u7B5B\u9009\u3002",completed:"\u5DF2\u5B8C\u6210",incomplete:"\u672A\u5B8C\u6210",completionStatus:"\u5B8C\u6210\u72B6\u6001",feedback:"\u53CD\u9988\u4E0E\u5EFA\u8BAE \xB7 GitHub",actDueDate:"\u622A\u6B62\u65E5\u671F {from} \u2192 {to}",actCompletedColumn:"\u5B8C\u6210\u5217 {from} \u2192 {to}",fieldNote:"\u63CF\u8FF0",notePlaceholder:"\u4F7F\u7528 Markdown \u63CF\u8FF0\u4EFB\u52A1\u2026",editNote:"\u7F16\u8F91",finishEditingNote:"\u5B8C\u6210\u7F16\u8F91",markdownEditHint:"Markdown \u539F\u6587 \xB7 \u70B9\u51FB\u4FDD\u5B58\u540E\u751F\u6548",emptyNote:"\u6682\u65E0\u63CF\u8FF0\uFF0C\u70B9\u51FB\u7F16\u8F91\u6DFB\u52A0\u3002",copyCode:"\u590D\u5236\u4EE3\u7801",copiedCode:"\u5DF2\u590D\u5236",footnotes:"\u811A\u6CE8",commentsTitle:"\u8BC4\u8BBA",commentEmpty:"\u6682\u65E0\u8BC4\u8BBA",commentPlaceholder:"\u6DFB\u52A0\u8BC4\u8BBA\u2026",sendComment:"\u53D1\u9001\u8BC4\u8BBA",cancel:"\u53D6\u6D88",save:"\u4FDD\u5B58",chatWithAgent:"\u4E0E agent \u804A\u4E00\u804A",chatCurrentSession:"\u5F53\u524D\u5BF9\u8BDD",chatNewSession:"\u65B0\u5EFA\u5BF9\u8BDD",delete:"\u5220\u9664",add:"\u6DFB\u52A0",close:"\u5173\u95ED",columnEditDesc:"\u62D6\u52A8\u5DE6\u4FA7\u8C03\u6574\u987A\u5E8F\uFF0C\u540D\u79F0\u4FEE\u6539\u540E\u81EA\u52A8\u4FDD\u5B58\u3002",boardLists:"\u770B\u677F\u5217\u8868",newColumnPlaceholder:"\u65B0\u5217\u8868\u540D\u79F0",labelEditDesc:"\u70B9\u51FB\u540D\u79F0\u6216\u8272\u70B9\u7F16\u8F91\uFF0C\u4FEE\u6539\u540E\u81EA\u52A8\u4FDD\u5B58\u3002",boardLabels:"\u4EFB\u52A1\u6807\u7B7E",noLabelsHint:"\u6682\u65E0\u6807\u7B7E\uFF0C\u5728\u4E0B\u65B9\u6DFB\u52A0\u7B2C\u4E00\u4E2A\u3002",newLabelPlaceholder:"\u65B0\u6807\u7B7E\u540D\u79F0",priorityFilter:"\u6309\u4F18\u5148\u7EA7\u7B5B\u9009",labelFilter:"\u6309\u6807\u7B7E\u7B5B\u9009",all:"\u5168\u90E8",warnings:"\u6570\u636E\u63D0\u793A",dismiss:"\u77E5\u9053\u4E86",activityTitle:"\u6D3B\u52A8\u8BB0\u5F55",activityEmpty:"\u6682\u65E0\u6D3B\u52A8\u8BB0\u5F55",actorHuman:"\u4F60",actorAgent:"Agent",actCreated:"\u521B\u5EFA\u4E8E\u300C{column}\u300D\uFF0C\u6807\u7B7E {label}\uFF0C\u4F18\u5148\u7EA7 {priority}",actMoved:"\u4ECE\u300C{from}\u300D\u79FB\u5230\u300C{to}\u300D",actLabel:"\u6807\u7B7E {from} \u2192 {to}",actLabelSet:"\u8BBE\u7F6E\u6807\u7B7E {to}",actLabelCleared:"\u6E05\u9664\u6807\u7B7E {from}",actPriority:"\u4F18\u5148\u7EA7 {from} \u2192 {to}",actPrioritySet:"\u8BBE\u7F6E\u4F18\u5148\u7EA7 {to}",actPriorityCleared:"\u6E05\u9664\u4F18\u5148\u7EA7 {from}",actTitle:'\u6807\u9898 "{from}" \u2192 "{to}"',actNote:"\u66F4\u65B0\u4E86\u5907\u6CE8",actComment:"\u6DFB\u52A0\u4E86\u8BC4\u8BBA",actDeleted:"\u5220\u9664\u4E86\u5361\u7247",actColumnAdded:"\u65B0\u589E\u5217\u8868\u300C{column}\u300D",actColumnRenamed:"\u5217\u8868\u300C{from}\u300D\u2192\u300C{to}\u300D",actColumnDeleted:"\u5220\u9664\u4E86\u5217\u8868\u300C{column}\u300D",actLabelAdded:"\u65B0\u589E\u6807\u7B7E\u300C{label}\u300D",actLabelRenamed:"\u6807\u7B7E\u300C{from}\u300D\u2192\u300C{to}\u300D",actLabelDeleted:"\u5220\u9664\u4E86\u6807\u7B7E\u300C{label}\u300D",actLabelColor:"\u6807\u7B7E\u300C{label}\u300D\u6539\u8272 {from} \u2192 {to}",noValue:"\u65E0"},Xx={wfTitle:"Workflow",wfScopeAll:"all boards",wfScopeBoard:"this board only",wfAppliesTo:"Applied to all boards ({n} workspaces).",wfColumns:"Columns",wfColumnsEmpty:"The workflow needs at least one column",wfAutomation:"Automation",wfAutomationSub:"Shared behaviour of the pipeline on every board.",wfBoardOnly:"This board · {name}",wfEnabled:"Orchestrator on this board",wfEnabledHint:"Off: cards move only by hand and by the manager.",wfSaveAll:"Save for all boards",wfSaving:"Saving…",wfSaved:"Rule saved · boards updated: {n}",wfSaveFailed:"Could not save the rule: {detail}",wfDupColumn:"A column with this name already exists",wfMaxColumns:"Maximum 12 columns",wfOneEntry:"Only one entry column is allowed",wfWipRange:"WIP limit must be 1-20",wfExtraColumns:"This board has columns outside the rule: {names}. They stay on the board but are not automated.",wfOnBoard:"Already on this board",wfWillCreate:"Will be created on save",wfBoardSaved:"saved",wfBoardSaveFailed:"Could not switch: {detail}",wfDiscardTitle:"Changes are not saved",wfDiscard:"Discard changes",wfKeepEditing:"Keep editing",wfKind:"Stage",wfKindFlow:"Middle step",wfKindSource:"Taken from",wfKindEntry:"First stop",wfKindDone:"Done",wfNoRole:"— no role —",wfRole:"Role",wfAdd:"Add column",wfMoveUp:"Move up",wfMoveDown:"Move down",wfRemove:"Remove column",wfClose:"Close",wfRetry:"Retry",wfWip:"WIP limit per column",wfPullOrder:"Pull order",wfPullPriority:"by priority",wfPullCreated:"by creation",wfAutoPull:"Auto-pull cards",wfEnforceWip:"Enforce limit",wfStamp:"Assignee stamp on cards",wfLabels:"Label assignments",wfDispatch:"Dispatch to agents",wfDispatchModel:"Model",wfLoadFailed:"Could not read the settings: {detail}",wfPullBoard:"board order",wfColOnBoard:"On board",wfColName:"Column",wfColRole:"Team role",wfColStep:"Pipeline step",wfStepExplain:"\"Taken from\": cards are pulled from this column. \"First stop\": a pulled card is placed here first.",wfDragHint:"Drag a row to reorder",wfReorder:"Reorder {name}",wfDragStart:"{name}: moving…",wfDragPosition:"{name}: position {n} of {N}",wfDragDrop:"{name}: moved to position {n}",wfDragCancel:"{name}: move cancelled",boardTab:"Board",loading:"Loading board\u2026",loadFailed:"Failed to load board: ",actionFailed:"Action failed: ",actionRetry:"The action did not complete. Please try again.",confirmDelete:"Confirm delete",discardChanges:"Discard changes",discardCommentDesc:"Unsent comments are not copied to chat. Discard the comment and continue?",discardAndContinue:"Discard and continue",discardChangesDesc:"Discard unsaved changes or unsent comments and close?",deleteCardDesc:"Delete this card and its comments? This cannot be undone.",deleteColumnDesc:'Delete list "{column}"? Its cards will move to the first remaining list.',deleteLabelDesc:'Delete label "{label}"? It will be removed from all cards.',clearFilter:"Clear filter",noMatchingCards:"No matching cards",refresh:"Refresh board",settings:"Settings",columnEdit:"Edit lists",labelEdit:"Edit labels",emptyColumn:"No cards",addCard:"Add card",dragSort:"Drag to reorder",cardKeyboardHelp:"Press Enter to edit. Press Space to pick up the card, use arrow keys to move, then Space to drop or Escape to cancel.",columnName:"List name",labelName:"Label name",labelColor:"Label color",newLabelColor:"New label color",deleteLabel:"Delete label",editCard:"Edit card",taskDetails:"Task details",resizeTaskDetails:"Resize task details",resizeTaskDetailsHint:"Drag or use Left/Right to resize; Home for minimum, End for maximum.",fieldTitle:"Title",fieldId:"Task ID",titlePlaceholder:"Card title",fieldLabel:"Label",noLabel:"No label",fieldPriority:"Priority",noPriority:"No priority",fieldAssignee:"Assignee",fieldParent:"Parent task",fieldChildren:"Children",fieldMilestone:"Milestone",milestoneHint:"closes only when its children close",assigneePlaceholder:"role, e.g. developer",fieldDueDate:"Due date",today:"Today",tomorrow:"Tomorrow",nextWeek:"In one week",clearDate:"Clear date",dueToday:"Due today",overdue:"Overdue",overdueDays:"Overdue by {days} days",shortDate:"{month}/{day}",yearDate:"{year}/{month}/{day}",dueDateFilter:"Filter by due date",completedColumn:"Completed list",noCompletedColumn:"Not set",completedColumnHint:"Tasks in this list are complete and excluded from due and overdue filters.",completed:"Completed",incomplete:"Incomplete",completionStatus:"Completion status",feedback:"Feedback \xB7 GitHub",actDueDate:"Due date {from} \u2192 {to}",actCompletedColumn:"Completed list {from} \u2192 {to}",fieldNote:"Description",notePlaceholder:"Describe the task in Markdown\u2026",editNote:"Edit",finishEditingNote:"Done editing",markdownEditHint:"Markdown source \xB7 Apply changes with Save",emptyNote:"No description yet. Select Edit to add one.",copyCode:"Copy code",copiedCode:"Copied",footnotes:"Footnotes",commentsTitle:"Comments",commentEmpty:"No comments yet",commentPlaceholder:"Add a comment\u2026",sendComment:"Send comment",cancel:"Cancel",save:"Save",chatWithAgent:"Chat with agent",chatCurrentSession:"Current session",chatNewSession:"New session",delete:"Delete",add:"Add",close:"Close",columnEditDesc:"Drag to reorder. Name changes save automatically.",orchMenu:"Workflow automation",workspaceLabel:"Workspace",attachTitle:"Attachments",attachEmpty:"No files yet. Agents publish work artifacts here.",attachTruncated:"(preview truncated)",attachLoading:"Loading\u2026",attachCopyPath:"Copy path",openTaskDialog:"Open dialog",orchTitle:"Workflow automation",orchDesc:"Server-side rules: column roles, WIP limit, auto-pull \u2014 no model involved.",orchEnabled:"Enable orchestrator",orchWipLimit:"WIP limit (cards in the flow)",orchWipHint:"Max cards allowed in the flow (outside the source and done columns). Default 1.",orchSourceColumn:"Source (to-do) column",orchEntryColumn:"Entry column",orchDoneColumns:"Done",orchAutoSelect:"Auto",orchAutoPull:"Auto-pull the next card from the source column",orchPullOrder:"Pull order",orchPriorityOrder:"By priority",orchBoardOrder:"Board order",orchEnforceWip:"Return excess cards to the source column",orchStamp:"Comment assignments on cards",orchLabel:"Label cards with their role",orchDispatch:"Start role agents on assignment",orchDispatchHint:"Creates a session running the role preset and sends the card task to it.",orchDispatchModel:"Dispatch model (provider/model)",orchDispatchModelHint:"e.g. deepseek-proxy/deepseek-chat; empty = default model.",orchRefreshSec:"Board auto-refresh interval (s)",orchRefreshHint:"Polling interval for card changes; 0 disables auto-refresh.",orchColumnRoles:"Column roles",orchRolesHint:"Pick the role that owns each column; arriving cards get assigned to it.",orchNoRole:"\u2014 no role \u2014",orchStatus:"Status",orchActiveInFlow:"In flow",orchRunNow:"Run now",orchSaved:"Saved",boardLists:"Board lists",newColumnPlaceholder:"New list name",labelEditDesc:"Edit a name or color. Changes save automatically.",boardLabels:"Task labels",noLabelsHint:"No labels yet. Add your first one below.",newLabelPlaceholder:"New label name",priorityFilter:"Filter by priority",labelFilter:"Filter by label",all:"All",warnings:"Data notice",dismiss:"Got it",activityTitle:"Activity",activityEmpty:"No activity yet",actorHuman:"You",actorAgent:"Agent",actCreated:'Created in "{column}" with label {label}, priority {priority}',actMoved:'Moved from "{from}" to "{to}"',actLabel:"Label {from} \u2192 {to}",actLabelSet:"Set label {to}",actLabelCleared:"Cleared label {from}",actPriority:"Priority {from} \u2192 {to}",actPrioritySet:"Set priority {to}",actPriorityCleared:"Cleared priority {from}",actTitle:'Title "{from}" \u2192 "{to}"',actNote:"Updated the note",actComment:"Added a comment",actDeleted:"Deleted the card",actColumnAdded:'Added list "{column}"',actColumnRenamed:'List "{from}" \u2192 "{to}"',actColumnDeleted:'Deleted list "{column}"',actLabelAdded:'Added label "{label}"',actLabelRenamed:'Label "{from}" \u2192 "{to}"',actLabelDeleted:'Deleted label "{label}"',actLabelColor:'Label "{label}" color {from} \u2192 {to}',noValue:"None"},jx={wfTitle:"Конвейер задач",wfScopeAll:"все доски",wfScopeBoard:"только эта доска",wfAppliesTo:"Применяется ко всем доскам ({n} воркспейсов).",wfColumns:"Столбцы",wfColumnsEmpty:"Нужен хотя бы один столбец",wfAutomation:"Автоматизация",wfAutomationSub:"Общее поведение конвейера на всех досках.",wfBoardOnly:"Эта доска · {name}",wfEnabled:"Оркестратор на этой доске",wfEnabledHint:"Выключен: карточки двигают только человек и manager.",wfSaveAll:"Сохранить для всех досок",wfSaving:"Сохранение…",wfSaved:"Правило сохранено · досок обновлено: {n}",wfSaveFailed:"Не удалось сохранить правило: {detail}",wfDupColumn:"Столбец с таким именем уже есть",wfMaxColumns:"Максимум 12 столбцов",wfOneEntry:"Точка входа может быть только одна",wfWipRange:"Значение WIP: 1-20",wfExtraColumns:"На этой доске есть столбцы вне правила: {names} — они останутся на доске, но не участвуют в автоматизации.",wfOnBoard:"Уже на доске",wfWillCreate:"Будет создан при сохранении",wfBoardSaved:"сохранено",wfBoardSaveFailed:"Не удалось переключить: {detail}",wfDiscardTitle:"Изменения не сохранены",wfDiscard:"Выйти без сохранения",wfKeepEditing:"Продолжить редактирование",wfKind:"Этап",wfKindFlow:"Обычный шаг",wfKindSource:"Откуда берём",wfKindEntry:"Куда кладём",wfKindDone:"Готово",wfNoRole:"— нет роли —",wfRole:"Роль",wfAdd:"Добавить столбец",wfMoveUp:"Вверх",wfMoveDown:"Вниз",wfRemove:"Удалить столбец",wfClose:"Закрыть",wfRetry:"Повторить",wfWip:"Лимит WIP на столбец",wfPullOrder:"Порядок забора",wfPullPriority:"по приоритету",wfPullCreated:"по созданию",wfAutoPull:"Автозабор карточек",wfEnforceWip:"Строгий лимит",wfStamp:"Роль на карточке",wfLabels:"Метки на карточке",wfDispatch:"Раздача агентам",wfDispatchModel:"Модель",wfLoadFailed:"Не удалось прочитать настройки: {detail}",wfPullBoard:"по порядку на доске",wfColOnBoard:"На доске",wfColName:"Столбец",wfColRole:"Роль команды",wfColStep:"Шаг конвейера",wfStepExplain:"«Откуда берём»: оркестратор забирает карточки из этого столбца. «Куда кладём»: забранная карточка ставится сюда первой.",wfDragHint:"Перетащите строку, чтобы изменить порядок",wfReorder:"Переставить {name}",wfDragStart:"{name}: перемещается…",wfDragPosition:"{name}: позиция {n} из {N}",wfDragDrop:"{name}: перемещено на позицию {n}",wfDragCancel:"{name}: перемещение отменено",orchMenu:"\u0410\u0432\u0442\u043E\u043C\u0430\u0442\u0438\u0437\u0430\u0446\u0438\u044F \u043F\u0440\u043E\u0446\u0435\u0441\u0441\u0430",workspaceLabel:"\u0420\u0430\u0431\u043E\u0447\u0430\u044F \u043E\u0431\u043B\u0430\u0441\u0442\u044C",attachTitle:"\u0412\u043B\u043E\u0436\u0435\u043D\u0438\u044F",attachEmpty:"\u041F\u043E\u043A\u0430 \u043F\u0443\u0441\u0442\u043E. \u0410\u0440\u0442\u0435\u0444\u0430\u043A\u0442\u044B \u0440\u0430\u0431\u043E\u0442\u044B \u0430\u0433\u0435\u043D\u0442\u044B \u043F\u0443\u0431\u043B\u0438\u043A\u0443\u044E\u0442 \u0437\u0434\u0435\u0441\u044C.",attachTruncated:" (\u043F\u0440\u0435\u0432\u044C\u044E \u043E\u0431\u0440\u0435\u0437\u0430\u043D\u043E)",attachLoading:"\u0417\u0430\u0433\u0440\u0443\u0437\u043A\u0430\u2026",attachCopyPath:"\u0421\u043A\u043E\u043F\u0438\u0440\u043E\u0432\u0430\u0442\u044C \u043F\u0443\u0442\u044C",openTaskDialog:"\u041E\u0442\u043A\u0440\u044B\u0442\u044C \u0434\u0438\u0430\u043B\u043E\u0433",orchTitle:"\u0410\u0432\u0442\u043E\u043C\u0430\u0442\u0438\u0437\u0430\u0446\u0438\u044F \u043F\u0440\u043E\u0446\u0435\u0441\u0441\u0430",orchDesc:"\u0421\u0435\u0440\u0432\u0435\u0440\u043D\u044B\u0435 \u043F\u0440\u0430\u0432\u0438\u043B\u0430: \u0440\u043E\u043B\u0438 \u0441\u0442\u043E\u043B\u0431\u0446\u043E\u0432, WIP-\u043B\u0438\u043C\u0438\u0442, \u0430\u0432\u0442\u043E-\u0432\u0437\u044F\u0442\u0438\u0435 \u0437\u0430\u0434\u0430\u0447 \u2014 \u0431\u0435\u0437 \u0443\u0447\u0430\u0441\u0442\u0438\u044F \u043C\u043E\u0434\u0435\u043B\u0438.",orchEnabled:"\u0412\u043A\u043B\u044E\u0447\u0438\u0442\u044C \u043E\u0440\u043A\u0435\u0441\u0442\u0440\u0430\u0442\u043E\u0440",orchWipLimit:"WIP-\u043B\u0438\u043C\u0438\u0442 (\u043A\u0430\u0440\u0442\u043E\u0447\u0435\u043A \u0432 \u0440\u0430\u0431\u043E\u0442\u0435)",orchWipHint:"\u0421\u043A\u043E\u043B\u044C\u043A\u043E \u043A\u0430\u0440\u0442\u043E\u0447\u0435\u043A \u043C\u043E\u0436\u0435\u0442 \u0431\u044B\u0442\u044C \u0432 \u0444\u043B\u043E\u0443 (\u0432\u043D\u0435 \u0438\u0441\u0445\u043E\u0434\u043D\u043E\u0433\u043E \u0438 \u0432\u044B\u043F\u043E\u043B\u043D\u0435\u043D\u043D\u044B\u0445 \u0441\u0442\u043E\u043B\u0431\u0446\u043E\u0432). \u041F\u043E \u0443\u043C\u043E\u043B\u0447\u0430\u043D\u0438\u044E 1.",orchSourceColumn:"\u0418\u0441\u0445\u043E\u0434\u043D\u044B\u0439 \u0441\u0442\u043E\u043B\u0431\u0435\u0446 (to-do)",orchEntryColumn:"\u0412\u0445\u043E\u0434\u043D\u043E\u0439 \u0441\u0442\u043E\u043B\u0431\u0435\u0446",orchDoneColumns:"\u0413\u043E\u0442\u043E\u0432\u043E",orchAutoSelect:"\u0410\u0432\u0442\u043E",orchAutoPull:"\u0410\u0432\u0442\u043E-\u0432\u0437\u044F\u0442\u0438\u0435 \u0441\u043B\u0435\u0434\u0443\u044E\u0449\u0435\u0439 \u043A\u0430\u0440\u0442\u043E\u0447\u043A\u0438 \u0438\u0437 to-do",orchPullOrder:"\u041F\u043E\u0440\u044F\u0434\u043E\u043A \u0432\u0437\u044F\u0442\u0438\u044F",orchPriorityOrder:"\u041F\u043E \u043F\u0440\u0438\u043E\u0440\u0438\u0442\u0435\u0442\u0443",orchBoardOrder:"\u041F\u043E \u043F\u043E\u0440\u044F\u0434\u043A\u0443 \u043D\u0430 \u0434\u043E\u0441\u043A\u0435",orchEnforceWip:"\u0412\u043E\u0437\u0432\u0440\u0430\u0449\u0430\u0442\u044C \u043B\u0438\u0448\u043D\u0438\u0435 \u043A\u0430\u0440\u0442\u043E\u0447\u043A\u0438 \u0432 to-do",orchStamp:"\u041A\u043E\u043C\u043C\u0435\u043D\u0442\u0430\u0440\u0438\u0439 \u043E \u043D\u0430\u0437\u043D\u0430\u0447\u0435\u043D\u0438\u0438 \u043D\u0430 \u043A\u0430\u0440\u0442\u043E\u0447\u043A\u0435",orchLabel:"\u041C\u0435\u0442\u0438\u0442\u044C \u043A\u0430\u0440\u0442\u043E\u0447\u043A\u0443 \u0440\u043E\u043B\u044C\u044E",orchDispatch:"\u0417\u0430\u043F\u0443\u0441\u043A\u0430\u0442\u044C \u0440\u043E\u043B\u044C-\u0430\u0433\u0435\u043D\u0442\u0430 \u043F\u0440\u0438 \u043D\u0430\u0437\u043D\u0430\u0447\u0435\u043D\u0438\u0438",orchDispatchHint:"\u0421\u043E\u0437\u0434\u0430\u0451\u0442 \u0441\u0435\u0441\u0441\u0438\u044E \u0441 \u043F\u0440\u0435\u0441\u0435\u0442\u043E\u043C \u0440\u043E\u043B\u0438 \u0438 \u043E\u0442\u043F\u0440\u0430\u0432\u043B\u044F\u0435\u0442 \u0435\u0439 \u043A\u0430\u0440\u0442\u043E\u0447\u043A\u0443 \u0432 \u0440\u0430\u0431\u043E\u0442\u0443.",orchDispatchModel:"\u041C\u043E\u0434\u0435\u043B\u044C \u0434\u043B\u044F \u0437\u0430\u043F\u0443\u0441\u043A\u0430 (provider/model)",orchDispatchModelHint:"\u041D\u0430\u043F\u0440\u0438\u043C\u0435\u0440 deepseek-proxy/deepseek-chat; \u043F\u0443\u0441\u0442\u043E \u2014 \u043C\u043E\u0434\u0435\u043B\u044C \u043F\u043E \u0443\u043C\u043E\u043B\u0447\u0430\u043D\u0438\u044E.",orchRefreshSec:"\u0418\u043D\u0442\u0435\u0440\u0432\u0430\u043B \u0430\u0432\u0442\u043E-\u043E\u0431\u043D\u043E\u0432\u043B\u0435\u043D\u0438\u044F \u0434\u043E\u0441\u043A\u0438 (\u0441\u0435\u043A)",orchRefreshHint:"\u041A\u0430\u043A \u0447\u0430\u0441\u0442\u043E \u043E\u043F\u0440\u0430\u0448\u0438\u0432\u0430\u0442\u044C \u0434\u043E\u0441\u043A\u0443 \u043E\u0431 \u0438\u0437\u043C\u0435\u043D\u0435\u043D\u0438\u044F\u0445; 0 \u2014 \u0432\u044B\u043A\u043B\u044E\u0447\u0435\u043D\u043E.",orchColumnRoles:"\u0420\u043E\u043B\u0438 \u0441\u0442\u043E\u043B\u0431\u0446\u043E\u0432",orchRolesHint:"\u0412\u044B\u0431\u0435\u0440\u0438\u0442\u0435 \u0440\u043E\u043B\u044C-\u0430\u0433\u0435\u043D\u0442\u0430 \u0434\u043B\u044F \u043A\u0430\u0436\u0434\u043E\u0433\u043E \u0441\u0442\u043E\u043B\u0431\u0446\u0430 \u2014 \u043A\u0430\u0440\u0442\u043E\u0447\u043A\u0430 \u043F\u0440\u0438 \u043F\u0440\u0438\u0445\u043E\u0434\u0435 \u0432 \u0441\u0442\u043E\u043B\u0431\u0435\u0446 \u043D\u0430\u0437\u043D\u0430\u0447\u0430\u0435\u0442\u0441\u044F \u043D\u0430 \u043D\u0435\u0451.",orchNoRole:"\u2014 \u0431\u0435\u0437 \u0440\u043E\u043B\u0438 \u2014",orchStatus:"\u0421\u043E\u0441\u0442\u043E\u044F\u043D\u0438\u0435",orchActiveInFlow:"\u0412 \u0440\u0430\u0431\u043E\u0442\u0435",orchRunNow:"\u0412\u044B\u043F\u043E\u043B\u043D\u0438\u0442\u044C \u0441\u0435\u0439\u0447\u0430\u0441",orchSaved:"\u0421\u043E\u0445\u0440\u0430\u043D\u0435\u043D\u043E"},fo=null,Tl=null;function Bc(e){let t=e.get("locale");t!==void 0&&(fo=t,e.effect(()=>t.register(co,"zh",Fc),"dsh-kanban: Chinese dictionary"),e.effect(()=>t.register(co,"en",Xx),"dsh-kanban: English dictionary"),e.effect(()=>t.register(co,"ru",jx),"dsh-kanban: Russian dictionary"),Tl=t.bind(co))}function ea(e){return Tl?Tl(e):Fc[e]??e}var $x=e=>fo&&typeof fo.subscribe=="function"?fo.subscribe(e):()=>{},Ec=()=>fo&&typeof fo.getSnapshot=="function"?fo.getSnapshot():null;function De(){return(0,Oc.useSyncExternalStore)($x,Ec,Ec),ea}var mt=require("react/jsx-runtime"),Fa=kc;var Yx=Dc;var Nc=Jr.forwardRef(({className:e,...t},a)=>(0,mt.jsx)(Rl,{ref:a,className:se("kanban-portal kanban-dialog-overlay",e),...t}));Nc.displayName=Rl.displayName;var pa=Jr.forwardRef(({className:e,children:t,...a},o)=>{let r=De();return(0,mt.jsxs)(Yx,{children:[(0,mt.jsx)(Nc,{}),(0,mt.jsxs)(Pl,{ref:o,className:se("kanban-portal kanban-dialog-content",e),...a,children:[t,(0,mt.jsxs)(Ac,{className:"kanban-dialog-close",children:[(0,mt.jsx)(ua,{className:"kanban-dialog-close-icon"}),(0,mt.jsx)("span",{className:"kanban-sr-only",children:r("close")})]})]})]})});pa.displayName=Pl.displayName;var ma=({className:e,...t})=>(0,mt.jsx)("div",{className:se("kanban-dialog-header",e),...t});ma.displayName="DialogHeader";var ha=({className:e,...t})=>(0,mt.jsx)("div",{className:se("kanban-dialog-body",e),...t});ha.displayName="DialogBody";var ga=({className:e,...t})=>(0,mt.jsx)("div",{className:se("kanban-dialog-footer",e),...t});ga.displayName="DialogFooter";var xa=Jr.forwardRef(({className:e,...t},a)=>(0,mt.jsx)(Dl,{ref:a,className:se("kanban-dialog-title",e),...t}));xa.displayName=Dl.displayName;var po=Jr.forwardRef(({className:e,...t},a)=>(0,mt.jsx)(Ml,{ref:a,className:se("kanban-dialog-description",e),...t}));po.displayName=Ml.displayName;var Ft=$(require("react"),1);var Ba=require("react/jsx-runtime"),Hc="dsh-kanban:card-drawer-width",Zx=720,El=420;function Jx(){try{let e=Number(window.localStorage.getItem(Hc));if(Number.isFinite(e)&&e>0)return e}catch{}return Zx}function _c(e){try{window.localStorage.setItem(Hc,String(e))}catch{}}var Ol=Ft.forwardRef(({className:e,children:t,id:a,style:o,...r},n)=>{let l=De(),s=Ft.useId(),i=a??s,u=`${s}-resize-hint`,[c,d]=Ft.useState(Jx),[f,m]=Ft.useState(()=>window.innerWidth),[h,p]=Ft.useState(!1),g=Ft.useRef(null),x=f<=600,L=Math.min(1e3,f-64),C=b=>Math.max(El,Math.min(L,b)),v=x?f:C(c);Ft.useEffect(()=>{let b=()=>{g.current&&(d(g.current.preferredWidth),g.current=null,p(!1)),m(window.innerWidth)};return window.addEventListener("resize",b),()=>window.removeEventListener("resize",b)},[]);function y(b,S){let R=g.current;!R||R.pointerId!==b.pointerId||(g.current=null,p(!1),S?d(R.preferredWidth):_c(R.lastWidth),b.currentTarget.hasPointerCapture(b.pointerId)&&b.currentTarget.releasePointerCapture(b.pointerId))}return(0,Ba.jsxs)(pa,{...r,ref:n,id:i,className:se("kanban-drawer-content",e),style:{...o,width:v},"data-resizing":h||void 0,children:[t,!x&&(0,Ba.jsxs)(Ba.Fragment,{children:[(0,Ba.jsx)("div",{className:"kanban-drawer-resize",role:"separator",tabIndex:0,"aria-label":l("resizeTaskDetails"),"aria-describedby":u,"aria-orientation":"vertical","aria-valuemin":El,"aria-valuemax":L,"aria-valuenow":v,"aria-controls":i,title:l("resizeTaskDetailsHint"),onPointerDown:b=>{b.button!==0||g.current||(b.preventDefault(),b.currentTarget.focus(),b.currentTarget.setPointerCapture(b.pointerId),g.current={pointerId:b.pointerId,x:b.clientX,width:v,preferredWidth:c,lastWidth:v},p(!0))},onPointerMove:b=>{let S=g.current;if(!S||S.pointerId!==b.pointerId)return;let R=C(S.width+S.x-b.clientX);S.lastWidth=R,d(R)},onPointerUp:b=>y(b,!1),onPointerCancel:b=>y(b,!0),onLostPointerCapture:b=>y(b,!0),onKeyDown:b=>{let S;if(b.key==="ArrowLeft")S=C(v+32);else if(b.key==="ArrowRight")S=C(v-32);else if(b.key==="Home")S=El;else if(b.key==="End")S=L;else return;b.preventDefault(),d(S),_c(S)}}),(0,Ba.jsx)("span",{id:u,className:"kanban-sr-only",children:l("resizeTaskDetailsHint")})]})]})});Ol.displayName="DrawerContent";var sn=$(require("react"),1);var Vt=$(require("react"),1);var oe=$(require("react"),1);var Ht=$(require("react"),1);var Vn=require("react/jsx-runtime"),Ge=$(require("react"),1);var Na=require("react/jsx-runtime");var Qx=Object.defineProperty,Ve=(e,t)=>Qx(e,"name",{value:t,configurable:!0});function mo(e){let t=e+"CollectionProvider",[a,o]=at(t),[r,n]=a(t,{collectionRef:{current:null},itemMap:new Map}),l=Ve(p=>{let{scope:g,children:x}=p,L=Ht.useRef(null),C=Ht.useRef(new Map).current;return(0,Vn.jsx)(r,{scope:g,itemMap:C,collectionRef:L,children:x})},"CollectionProvider");l.displayName=t;let s=e+"CollectionSlot",i=st(s),u=Ht.forwardRef((p,g)=>{let{scope:x,children:L}=p,C=n(s,x),v=ie(g,C.collectionRef);return(0,Vn.jsx)(i,{ref:v,children:L})});u.displayName=s;let c=e+"CollectionItemSlot",d="data-radix-collection-item",f=st(c),m=Ht.forwardRef((p,g)=>{let{scope:x,children:L,...C}=p,v=Ht.useRef(null),y=ie(g,v),b=n(c,x);return Ht.useEffect(()=>(b.itemMap.set(v,{ref:v,...C}),()=>{b.itemMap.delete(v)})),(0,Vn.jsx)(f,{[d]:"",ref:y,children:L})});m.displayName=c;function h(p){let g=n(e+"CollectionConsumer",p);return Ht.useCallback(()=>{let L=g.collectionRef.current;if(!L)return[];let C=Array.from(L.querySelectorAll(`[${d}]`));return Array.from(g.itemMap.values()).sort((b,S)=>C.indexOf(b.ref.current)-C.indexOf(S.ref.current))},[g.collectionRef,g.itemMap])}return Ve(h,"useCollection"),[{Provider:l,Slot:u,ItemSlot:m},h,o]}Ve(mo,"createCollection");var Uc=new WeakMap,Fe,kt,zn=(kt=class extends Map{constructor(a){super(a);_i(this,Fe);Ds(this,Fe,[...super.keys()]),Uc.set(this,!0)}set(a,o){return Uc.get(this)&&!this.has(a)&&et(this,Fe).push(a),super.set(a,o),this}insert(a,o,r){let n=this.has(o),l=n?this.size:this.size+1,s=Fl(a),i=s>=0?Math.min(s,l-1):Math.max(l+s,0);if(n?et(this,Fe).indexOf(o)===i:i===this.size)return this.set(o,r),this;let u=et(this,Fe).filter(d=>d!==o);u.splice(i,0,o);let c=u.map(d=>[d,d===o?r:this.get(d)]);this.clear();for(let[d,f]of c)this.set(d,f);return this}with(a,o,r){let n=new kt(this);return n.insert(a,o,r),n}before(a){let o=et(this,Fe).indexOf(a)-1;if(!(o<0))return this.entryAt(o)}setBefore(a,o,r){let n=et(this,Fe).indexOf(a);if(n===-1)return this;let l=et(this,Fe).indexOf(o),s=l!==-1&&l<n?n-1:n;return this.insert(s,o,r)}after(a){let o=et(this,Fe).indexOf(a);if(o=o===-1||o===this.size-1?-1:o+1,o!==-1)return this.entryAt(o)}setAfter(a,o,r){let n=et(this,Fe).indexOf(a);if(n===-1)return this;let l=et(this,Fe).indexOf(o),s=l!==-1&&l<=n?n:n+1;return this.insert(s,o,r)}first(){return this.entryAt(0)}last(){return this.entryAt(-1)}clear(){return Ds(this,Fe,[]),super.clear()}delete(a){let o=super.delete(a);return o&&et(this,Fe).splice(et(this,Fe).indexOf(a),1),o}deleteAt(a){let o=this.keyAt(a);return o!==void 0?this.delete(o):!1}at(a){let o=Gn(et(this,Fe),a);if(o!==void 0)return this.get(o)}entryAt(a){let o=Gn(et(this,Fe),a);if(o!==void 0)return[o,this.get(o)]}indexOf(a){return et(this,Fe).indexOf(a)}keyAt(a){return Gn(et(this,Fe),a)}from(a,o){let r=this.indexOf(a);if(r===-1)return;let n=r+o;return n<0&&(n=0),n>=this.size&&(n=this.size-1),this.at(n)}keyFrom(a,o){let r=this.indexOf(a);if(r===-1)return;let n=r+o;return n<0&&(n=0),n>=this.size&&(n=this.size-1),this.keyAt(n)}find(a,o){let r=0;for(let n of this){if(Reflect.apply(a,o,[n,r,this]))return n;r++}}findIndex(a,o){let r=0;for(let n of this){if(Reflect.apply(a,o,[n,r,this]))return r;r++}return-1}filter(a,o){let r=[],n=0;for(let l of this)Reflect.apply(a,o,[l,n,this])&&r.push(l),n++;return new kt(r)}map(a,o){let r=[],n=0;for(let l of this)r.push([l[0],Reflect.apply(a,o,[l,n,this])]),n++;return new kt(r)}reduce(...a){let[o,r]=a,n=a.length>1;if(!n&&this.size===0)throw new TypeError("Reduce of empty OrderedDict with no initial value");let l=0,s=r;for(let i of this)l===0&&!n?s=i:s=Reflect.apply(o,this,[s,i,l,this]),l++;return s}reduceRight(...a){let[o,r]=a,n=a.length>1;if(!n&&this.size===0)throw new TypeError("Reduce of empty OrderedDict with no initial value");let l=r;for(let s=this.size-1;s>=0;s--){let i=this.entryAt(s);s===this.size-1&&!n?l=i:l=Reflect.apply(o,this,[l,i,s,this])}return l}sort(a){if(typeof a!="function")throw new TypeError("OrderedDict.sort requires a compare function");let o=[...this.entries()].sort(a);this.clear();for(let[r,n]of o)this.set(r,n);return this}toSorted(a){if(typeof a!="function")throw new TypeError("OrderedDict.toSorted requires a compare function");let o=[...this.entries()].sort(a);return new kt(o)}toReversed(){let a=new kt;for(let o=this.size-1;o>=0;o--){let r=this.keyAt(o),n=this.get(r);a.set(r,n)}return a}toSpliced(...a){let o=[...this.entries()];return o.splice(...a),new kt(o)}slice(a,o){let r=new kt;for(let n of et(this,Fe).slice(a,o))r.set(n,this.get(n));return r}every(a,o){let r=0;for(let n of this){if(!Reflect.apply(a,o,[n,r,this]))return!1;r++}return!0}some(a,o){let r=0;for(let n of this){if(Reflect.apply(a,o,[n,r,this]))return!0;r++}return!1}},Fe=new WeakMap,Ve(kt,"OrderedDict"),kt);function Gn(e,t){if("at"in Array.prototype)return Array.prototype.at.call(e,t);let a=qc(e,t);return a===-1?void 0:e[a]}Ve(Gn,"at");function qc(e,t){let a=e.length,o=Fl(t),r=o>=0?o:a+o;return r<0||r>=a?-1:r}Ve(qc,"toSafeIndex");function Fl(e){return e!==e||e===0?0:Math.trunc(e)}Ve(Fl,"toSafeInteger");function eb(e){let t=e+"CollectionProvider",[a,o]=at(t),[r,n]=a(t);r.displayName=e+"CollectionStableContextProvider";let[l,s]=a(t);l.displayName=e+"CollectionStatefulContextProvider";let i=Ve(({state:b,...S})=>b?(0,Na.jsx)(c,{...S,state:b}):(0,Na.jsx)(u,{...S}),"CollectionProvider");i.displayName=t;let u=Ve(b=>{let S=L();return(0,Na.jsx)(c,{...b,state:S})},"CollectionInit");u.displayName=e+"CollectionInit";let c=Ve(b=>{let{scope:S,children:R,state:I}=b,w=Ge.useRef(null),[P,O]=Ge.useState(null),V=ie(w,O),[A,N]=I,H=Ge.useRef(new zn),j=Ge.useCallback(()=>{let U=H.current;return Vc(U)||U.sort(Kn),U},[]);return Ge.useEffect(()=>{if(!P)return;let U=Gc(()=>{N(X=>{let G=X.toSorted(Kn);return G.some(([ee],ce)=>X.keyAt(ce)!==ee)?G:X})});return U.observe(P,{childList:!0,subtree:!0}),()=>{U.disconnect()}},[P,N]),(0,Na.jsx)(r,{scope:S,collectionElementRef:V,collectionElementRefObject:w,getCollection:j,setCollection:N,registryRef:H,children:(0,Na.jsx)(l,{scope:S,collectionElement:P,collection:A,children:R})})},"CollectionProviderImpl");c.displayName=e+"CollectionProviderImpl";let d=e+"CollectionSlot",f=st(d),m=Ge.forwardRef((b,S)=>{let{scope:R,children:I}=b,w=n(d,R),P=ie(S,w.collectionElementRef);return(0,Na.jsx)(f,{ref:P,children:I})});m.displayName=d;let h=e+"CollectionItemSlot",p="data-radix-collection-item",g=st(h),x=Ge.forwardRef((b,S)=>{let{scope:R,children:I,...w}=b,P=Ge.useRef(null),O=n(h,R),{setCollection:V,registryRef:A}=O,N=Ge.useRef(w);Wc(N.current,w)||(N.current=w);let H=N.current,j=Ge.useCallback(G=>{let te=A.current;G?te.set(G,{...N.current,element:G}):P.current&&te.delete(P.current)},[A]),U=ie(S,j,P);ge(()=>{let G=P.current,te=A.current;G&&te.has(G)&&te.set(G,{...H,element:G})},[H,A]);let X=Ge.useRef(null);return Ge.useEffect(()=>{let G=P.current,te=X.current;(te?.element??null)===G&&(!G||te?.itemData===H)||(X.current=G?{element:G,itemData:H}:null,V(ee=>{let ce=new zn(ee);return te&&te.element!==G&&ce.delete(te.element),G&&ce.set(G,{...H,element:G}),ce.sort(Kn)}))}),Ge.useEffect(()=>()=>{let G=X.current;X.current=null,G&&V(te=>{if(!te.has(G.element))return te;let ee=new zn(te);return ee.delete(G.element),ee})},[V]),(0,Na.jsx)(g,{[p]:"",ref:U,children:I})});x.displayName=h;function L(){return Ge.useState(new zn)}Ve(L,"useInitCollection");function C(b){let{collection:S}=s(e+"CollectionConsumer",b);return S}Ve(C,"useCollection");function v(b){let{getCollection:S}=n(e+"CollectionConsumer",b);return S}return Ve(v,"useGetCollection"),[{Provider:i,Slot:m,ItemSlot:x},{createCollectionScope:o,useCollection:C,useGetCollection:v,useInitCollection:L}]}Ve(eb,"createCollection");function Wc(e,t){if(e===t)return!0;if(typeof e!="object"||typeof t!="object"||e==null||t==null)return!1;let a=Object.keys(e),o=Object.keys(t);if(a.length!==o.length)return!1;for(let r of a)if(!Object.prototype.hasOwnProperty.call(t,r)||e[r]!==t[r])return!1;return!0}Ve(Wc,"shallowEqual");function zc(e,t){return!!(t.compareDocumentPosition(e)&Node.DOCUMENT_POSITION_PRECEDING)}Ve(zc,"isElementPreceding");function Vc(e){let t;for(let a of e.keys()){if(t){let o=t.compareDocumentPosition(a);if(!(o&Node.DOCUMENT_POSITION_DISCONNECTED)&&o&Node.DOCUMENT_POSITION_PRECEDING)return!1}t=a}return!0}Ve(Vc,"isInDocumentOrder");function Kn(e,t){return!e[1].element||!t[1].element?0:zc(e[1].element,t[1].element)?-1:1}Ve(Kn,"sortByDocumentPosition");function Gc(e){return new MutationObserver(a=>{for(let o of a)if(o.type==="childList"){e();return}})}Ve(Gc,"getChildListObserver");var Xn=$(require("react"),1),ob=require("react/jsx-runtime"),tb=Object.defineProperty,ab=(e,t)=>tb(e,"name",{value:t,configurable:!0}),rb={LTR:"ltr",RTL:"rtl"},nb=Xn.createContext(void 0);function ho(e){let t=Xn.useContext(nb);return e||t||rb.LTR}ab(ho,"useDirection");var it=$(require("react"),1);var jc=["top","right","bottom","left"];var ta=Math.min,Ut=Math.max,en=Math.round,tn=Math.floor,aa=e=>({x:e,y:e}),sb={left:"right",right:"left",bottom:"top",top:"bottom"};function Bl(e,t,a){return Ut(e,ta(t,a))}function oa(e,t){return typeof e=="function"?e(t):e}function ba(e){return e.split("-")[0]}function go(e){return e.split("-")[1]}function $n(e){return e==="x"?"y":"x"}function Yn(e){return e==="y"?"height":"width"}function qt(e){let t=e[0];return t==="t"||t==="b"?"y":"x"}function Zn(e){return $n(qt(e))}function $c(e,t,a){a===void 0&&(a=!1);let o=go(e),r=Zn(e),n=Yn(r),l=r==="x"?o===(a?"end":"start")?"right":"left":o==="start"?"bottom":"top";return t.reference[n]>t.floating[n]&&(l=Qr(l)),[l,Qr(l)]}function Yc(e){let t=Qr(e);return[jn(e),t,jn(t)]}function jn(e){return e.includes("start")?e.replace("start","end"):e.replace("end","start")}var Kc=["left","right"],Xc=["right","left"],lb=["top","bottom"],ib=["bottom","top"];function ub(e,t,a){switch(e){case"top":case"bottom":return a?t?Xc:Kc:t?Kc:Xc;case"left":case"right":return t?lb:ib;default:return[]}}function Zc(e,t,a,o){let r=go(e),n=ub(ba(e),a==="start",o);return r&&(n=n.map(l=>l+"-"+r),t&&(n=n.concat(n.map(jn)))),n}function Qr(e){let t=ba(e);return sb[t]+e.slice(t.length)}function db(e){var t,a,o,r;return{top:(t=e.top)!=null?t:0,right:(a=e.right)!=null?a:0,bottom:(o=e.bottom)!=null?o:0,left:(r=e.left)!=null?r:0}}function Nl(e){return typeof e!="number"?db(e):{top:e,right:e,bottom:e,left:e}}function xo(e){let{x:t,y:a,width:o,height:r}=e;return{width:o,height:r,top:a,left:t,right:t+o,bottom:a+r,x:t,y:a}}function Jc(e,t,a){let{reference:o,floating:r}=e,n=qt(t),l=Zn(t),s=Yn(l),i=ba(t),u=n==="y",c=o.x+o.width/2-r.width/2,d=o.y+o.height/2-r.height/2,f=o[s]/2-r[s]/2,m;switch(i){case"top":m={x:c,y:o.y-r.height};break;case"bottom":m={x:c,y:o.y+o.height};break;case"right":m={x:o.x+o.width,y:d};break;case"left":m={x:o.x-r.width,y:d};break;default:m={x:o.x,y:o.y}}let h=go(t);return h&&(m[l]+=f*(h==="end"?1:-1)*(a&&u?-1:1)),m}async function tf(e,t){var a;t===void 0&&(t={});let{x:o,y:r,platform:n,rects:l,elements:s,strategy:i}=e,{boundary:u="clippingAncestors",rootBoundary:c="viewport",elementContext:d="floating",altBoundary:f=!1,padding:m=0}=oa(t,e),h=Nl(m),g=s[f?d==="floating"?"reference":"floating":d],x=xo(await n.getClippingRect({element:(a=await(n.isElement==null?void 0:n.isElement(g)))==null||a?g:g.contextElement||await(n.getDocumentElement==null?void 0:n.getDocumentElement(s.floating)),boundary:u,rootBoundary:c,strategy:i})),L=d==="floating"?{x:o,y:r,width:l.floating.width,height:l.floating.height}:l.reference,C=await(n.getOffsetParent==null?void 0:n.getOffsetParent(s.floating)),v=await(n.isElement==null?void 0:n.isElement(C))&&await(n.getScale==null?void 0:n.getScale(C))||{x:1,y:1},y=xo(n.convertOffsetParentRelativeRectToViewportRelativeRect?await n.convertOffsetParentRelativeRectToViewportRelativeRect({elements:s,rect:L,offsetParent:C,strategy:i}):L);return{top:(x.top-y.top+h.top)/v.y,bottom:(y.bottom-x.bottom+h.bottom)/v.y,left:(x.left-y.left+h.left)/v.x,right:(y.right-x.right+h.right)/v.x}}var cb=50,af=async(e,t,a)=>{let{placement:o="bottom",strategy:r="absolute",middleware:n=[],platform:l}=a,s=l.detectOverflow?l:{...l,detectOverflow:tf},i=await(l.isRTL==null?void 0:l.isRTL(t)),u=await l.getElementRects({reference:e,floating:t,strategy:r}),{x:c,y:d}=Jc(u,o,i),f=o,m=0,h={};for(let p=0;p<n.length;p++){let g=n[p];if(!g)continue;let{name:x,fn:L}=g,{x:C,y:v,data:y,reset:b}=await L({x:c,y:d,initialPlacement:o,placement:f,strategy:r,middlewareData:h,rects:u,platform:s,elements:{reference:e,floating:t}});c=C??c,d=v??d,h[x]={...h[x],...y},b&&m<cb&&(m++,typeof b=="object"&&(b.placement&&(f=b.placement),b.rects&&(u=b.rects===!0?await l.getElementRects({reference:e,floating:t,strategy:r}):b.rects),{x:c,y:d}=Jc(u,f,i)),p=-1)}return{x:c,y:d,placement:f,strategy:r,middlewareData:h}},of=e=>({name:"arrow",options:e,async fn(t){let{x:a,y:o,placement:r,rects:n,platform:l,elements:s,middlewareData:i}=t,{element:u,padding:c=0}=oa(e,t)||{};if(u==null)return{};let d=Nl(c),f={x:a,y:o},m=Zn(r),h=Yn(m),p=await l.getDimensions(u),g=m==="y",x=g?"top":"left",L=g?"bottom":"right",C=g?"clientHeight":"clientWidth",v=n.reference[h]+n.reference[m]-f[m]-n.floating[h],y=f[m]-n.reference[m],b=await(l.getOffsetParent==null?void 0:l.getOffsetParent(u)),S=b?b[C]:0;(!S||!await(l.isElement==null?void 0:l.isElement(b)))&&(S=s.floating[C]||n.floating[h]);let R=v/2-y/2,I=S/2-p[h]/2-1,w=ta(d[x],I),P=ta(d[L],I),O=S-p[h]-P,V=S/2-p[h]/2+R,A=Bl(w,V,O),N=!i.arrow&&go(r)!=null&&V!==A&&n.reference[h]/2-(V<w?w:P)-p[h]/2<0,H=N?V<w?V-w:V-O:0;return{[m]:f[m]+H,data:{[m]:A,centerOffset:V-A-H,...N&&{alignmentOffset:H}},reset:N}}});var rf=function(e){return e===void 0&&(e={}),{name:"flip",options:e,async fn(t){var a,o;let{placement:r,middlewareData:n,rects:l,initialPlacement:s,platform:i,elements:u}=t,{mainAxis:c=!0,crossAxis:d=!0,fallbackPlacements:f,fallbackStrategy:m="bestFit",fallbackAxisSideDirection:h="none",flipAlignment:p=!0,...g}=oa(e,t);if((a=n.arrow)!=null&&a.alignmentOffset)return{};let x=ba(r),L=qt(s),C=ba(s)===s,v=await(i.isRTL==null?void 0:i.isRTL(u.floating)),y=f||(C||!p?[Qr(s)]:Yc(s)),b=h!=="none";!f&&b&&y.push(...Zc(s,p,h,v));let S=[s,...y],R=await i.detectOverflow(t,g),I=[],w=((o=n.flip)==null?void 0:o.overflows)||[];if(c&&I.push(R[x]),d){let A=$c(r,l,v);I.push(R[A[0]],R[A[1]])}if(w=[...w,{placement:r,overflows:I}],!I.every(A=>A<=0)){var P,O;let A=(((P=n.flip)==null?void 0:P.index)||0)+1,N=S[A];if(N&&(!(d==="alignment"?L!==qt(N):!1)||w.every(U=>qt(U.placement)===L?U.overflows[0]>0:!0)))return{data:{index:A,overflows:w},reset:{placement:N}};let H=(O=w.filter(j=>j.overflows[0]<=0).sort((j,U)=>j.overflows[1]-U.overflows[1])[0])==null?void 0:O.placement;if(!H)switch(m){case"bestFit":{var V;let j=(V=w.filter(U=>{if(b){let X=qt(U.placement);return X===L||X==="y"}return!0}).map(U=>[U.placement,U.overflows.filter(X=>X>0).reduce((X,G)=>X+G,0)]).sort((U,X)=>U[1]-X[1])[0])==null?void 0:V[0];j&&(H=j);break}case"initialPlacement":H=s;break}if(r!==H)return{reset:{placement:H}}}return{}}}};function Qc(e,t){return{top:e.top-t.height,right:e.right-t.width,bottom:e.bottom-t.height,left:e.left-t.width}}function ef(e){return jc.some(t=>e[t]>=0)}var nf=function(e){return e===void 0&&(e={}),{name:"hide",options:e,async fn(t){let{rects:a,platform:o}=t,{strategy:r="referenceHidden",...n}=oa(e,t);switch(r){case"referenceHidden":{let l=await o.detectOverflow(t,{...n,elementContext:"reference"}),s=Qc(l,a.reference);return{data:{referenceHiddenOffsets:s,referenceHidden:ef(s)}}}case"escaped":{let l=await o.detectOverflow(t,{...n,altBoundary:!0}),s=Qc(l,a.floating);return{data:{escapedOffsets:s,escaped:ef(s)}}}default:return{}}}}};var sf=new Set(["left","top"]);async function fb(e,t){let{placement:a,platform:o,elements:r}=e,n=await(o.isRTL==null?void 0:o.isRTL(r.floating)),l=ba(a),s=go(a),i=qt(a)==="y",u=sf.has(l)?-1:1,c=n&&i?-1:1,d=oa(t,e),{mainAxis:f,crossAxis:m,alignmentAxis:h}=typeof d=="number"?{mainAxis:d,crossAxis:0,alignmentAxis:null}:{mainAxis:d.mainAxis||0,crossAxis:d.crossAxis||0,alignmentAxis:d.alignmentAxis};return s&&typeof h=="number"&&(m=s==="end"?h*-1:h),i?{x:m*c,y:f*u}:{x:f*u,y:m*c}}var lf=function(e){return e===void 0&&(e=0),{name:"offset",options:e,async fn(t){var a,o;let{x:r,y:n,placement:l,middlewareData:s}=t,i=await fb(t,e);return l===((a=s.offset)==null?void 0:a.placement)&&(o=s.arrow)!=null&&o.alignmentOffset?{}:{x:r+i.x,y:n+i.y,data:{...i,placement:l}}}}},uf=function(e){return e===void 0&&(e={}),{name:"shift",options:e,async fn(t){let{x:a,y:o,placement:r,platform:n}=t,{mainAxis:l=!0,crossAxis:s=!1,limiter:i={fn:L=>{let{x:C,y:v}=L;return{x:C,y:v}}},...u}=oa(e,t),c={x:a,y:o},d=await n.detectOverflow(t,u),f=qt(r),m=$n(f),h=c[m],p=c[f],g=(L,C)=>Bl(C+d[L==="y"?"top":"left"],C,C-d[L==="y"?"bottom":"right"]);l&&(h=g(m,h)),s&&(p=g(f,p));let x=i.fn({...t,[m]:h,[f]:p});return{...x,data:{x:x.x-a,y:x.y-o,enabled:{[m]:l,[f]:s}}}}}},df=function(e){return e===void 0&&(e={}),{options:e,fn(t){var a,o;let{x:r,y:n,placement:l,rects:s,middlewareData:i}=t,{offset:u=0,mainAxis:c=!0,crossAxis:d=!0}=oa(e,t),f={x:r,y:n},m=qt(l),h=$n(m),p=f[h],g=f[m],x=oa(u,t),L=typeof x=="number"?{mainAxis:x,crossAxis:0}:{mainAxis:(a=x.mainAxis)!=null?a:0,crossAxis:(o=x.crossAxis)!=null?o:0};if(c){let y=h==="y"?"height":"width",b=s.reference[h]-s.floating[y]+L.mainAxis,S=s.reference[h]+s.reference[y]-L.mainAxis;p<b?p=b:p>S&&(p=S)}if(d){var C,v;let y=h==="y"?"width":"height",b=sf.has(ba(l)),S=s.reference[m]-s.floating[y]+(b&&((C=i.offset)==null?void 0:C[m])||0)+(b?0:L.crossAxis),R=s.reference[m]+s.reference[y]+(b?0:((v=i.offset)==null?void 0:v[m])||0)-(b?L.crossAxis:0);g<S?g=S:g>R&&(g=R)}return{[h]:p,[m]:g}}}},cf=function(e){return e===void 0&&(e={}),{name:"size",options:e,async fn(t){let{placement:a,rects:o,platform:r,elements:n}=t,{apply:l=()=>{},...s}=oa(e,t),i=await r.detectOverflow(t,s),u=ba(a),c=go(a),d=qt(a)==="y",{width:f,height:m}=o.floating,h,p;u==="top"||u==="bottom"?(h=u,p=c===(await(r.isRTL==null?void 0:r.isRTL(n.floating))?"start":"end")?"left":"right"):(p=u,h=c==="end"?"top":"bottom");let g=m-i.top-i.bottom,x=f-i.left-i.right,L=ta(m-i[h],g),C=ta(f-i[p],x),v=t.middlewareData.shift,y=!v,b=L,S=C;v!=null&&v.enabled.x&&(S=x),v!=null&&v.enabled.y&&(b=g),y&&!c&&(d?S=f-2*Ut(i.left,i.right):b=m-2*Ut(i.top,i.bottom)),await l({...t,availableWidth:S,availableHeight:b});let R=await r.getDimensions(n.floating);return f!==R.width||m!==R.height?{reset:{rects:!0}}:{}}}};function Jn(){return typeof window<"u"}function Lo(e){return pf(e)?(e.nodeName||"").toLowerCase():"#document"}function ut(e){var t;return(e==null||(t=e.ownerDocument)==null?void 0:t.defaultView)||window}function ra(e){var t;return(t=(pf(e)?e.ownerDocument:e.document)||window.document)==null?void 0:t.documentElement}function pf(e){return Jn()?e instanceof Node||e instanceof ut(e).Node:!1}function Wt(e){return Jn()?e instanceof Element||e instanceof ut(e).Element:!1}function Ca(e){return Jn()?e instanceof HTMLElement||e instanceof ut(e).HTMLElement:!1}function ff(e){return!Jn()||typeof ShadowRoot>"u"?!1:e instanceof ShadowRoot||e instanceof ut(e).ShadowRoot}function an(e){let{overflow:t,overflowX:a,overflowY:o,display:r}=zt(e);return/auto|scroll|overlay|hidden|clip/.test(t+o+a)&&r!=="inline"&&r!=="contents"}function mf(e){return/^(table|td|th)$/.test(Lo(e))}function on(e){try{if(e.matches(":popover-open"))return!0}catch{}try{return e.matches(":modal")}catch{return!1}}var pb=/transform|translate|scale|rotate|perspective|filter/,mb=/paint|layout|strict|content/,bo=e=>!!e&&e!=="none",_l;function Qn(e){let t=Wt(e)?zt(e):e;return bo(t.transform)||bo(t.translate)||bo(t.scale)||bo(t.rotate)||bo(t.perspective)||!es()&&(bo(t.backdropFilter)||bo(t.filter))||pb.test(t.willChange||"")||mb.test(t.contain||"")}function hf(e){let t=_a(e);for(;Ca(t)&&!ar(t);){if(Qn(t))return t;if(on(t))return null;t=_a(t)}return null}function es(){return _l==null&&(_l=typeof CSS<"u"&&CSS.supports&&CSS.supports("-webkit-backdrop-filter","none")),_l}function ar(e){return/^(html|body|#document)$/.test(Lo(e))}function zt(e){return ut(e).getComputedStyle(e)}function rn(e){return Wt(e)?{scrollLeft:e.scrollLeft,scrollTop:e.scrollTop}:{scrollLeft:e.scrollX,scrollTop:e.scrollY}}function _a(e){if(Lo(e)==="html")return e;let t=e.assignedSlot||e.parentNode||ff(e)&&e.host||ra(e);return ff(t)?t.host:t}function gf(e){let t=_a(e);return ar(t)?(e.ownerDocument||e).body:Ca(t)&&an(t)?t:gf(t)}function Co(e,t,a){var o;t===void 0&&(t=[]),a===void 0&&(a=!0);let r=gf(e),n=r===((o=e.ownerDocument)==null?void 0:o.body),l=ut(r);if(n){let s=ts(l);return t.concat(l,l.visualViewport||[],an(r)?r:[],s&&a?Co(s):[])}else return t.concat(r,Co(r,[],a))}function ts(e){return e.parent&&Object.getPrototypeOf(e.parent)?e.frameElement:null}function Cf(e){let t=zt(e),a=parseFloat(t.width)||0,o=parseFloat(t.height)||0,r=Ca(e),n=r?e.offsetWidth:a,l=r?e.offsetHeight:o,s=en(a)!==n||en(o)!==l;return s&&(a=n,o=l),{width:a,height:o,$:s}}function Ul(e){return Wt(e)?e:e.contextElement}function or(e){let t=Ul(e);if(!Ca(t))return aa(1);let a=t.getBoundingClientRect(),{width:o,height:r,$:n}=Cf(t),l=(n?en(a.width):a.width)/o,s=(n?en(a.height):a.height)/r;return(!l||!Number.isFinite(l))&&(l=1),(!s||!Number.isFinite(s))&&(s=1),{x:l,y:s}}var hb=aa(0);function Lf(e){let t=ut(e);return!es()||!t.visualViewport?hb:{x:t.visualViewport.offsetLeft,y:t.visualViewport.offsetTop}}function gb(e,t,a){return t===void 0&&(t=!1),!!a&&t&&a===ut(e)}function vo(e,t,a,o){t===void 0&&(t=!1),a===void 0&&(a=!1);let r=e.getBoundingClientRect(),n=Ul(e),l=aa(1);t&&(o?Wt(o)&&(l=or(o)):l=or(e));let s=gb(n,a,o)?Lf(n):aa(0),i=(r.left+s.x)/l.x,u=(r.top+s.y)/l.y,c=r.width/l.x,d=r.height/l.y;if(n&&o){let f=ut(n),m=Wt(o)?ut(o):o,h=f,p=ts(h);for(;p&&m!==h;){let g=or(p),x=p.getBoundingClientRect(),L=zt(p),C=x.left+(p.clientLeft+parseFloat(L.paddingLeft))*g.x,v=x.top+(p.clientTop+parseFloat(L.paddingTop))*g.y;i*=g.x,u*=g.y,c*=g.x,d*=g.y,i+=C,u+=v,h=ut(p),p=ts(h)}}return xo({width:c,height:d,x:i,y:u})}function as(e,t){let a=rn(e).scrollLeft;return t?t.left+a:vo(ra(e)).left+a}function vf(e,t){let a=e.getBoundingClientRect(),o=a.left+t.scrollLeft-as(e,a),r=a.top+t.scrollTop;return{x:o,y:r}}function xb(e){let{elements:t,rect:a,offsetParent:o,strategy:r}=e,n=r==="fixed",l=ra(o),s=t?on(t.floating):!1;if(o===l||s&&n)return a;let i={scrollLeft:0,scrollTop:0},u=aa(1),c=aa(0),d=Ca(o);if((d||!n)&&((Lo(o)!=="body"||an(l))&&(i=rn(o)),d)){let m=vo(o);u=or(o),c.x=m.x+o.clientLeft,c.y=m.y+o.clientTop}let f=l&&!d&&!n?vf(l,i):aa(0);return{width:a.width*u.x,height:a.height*u.y,x:a.x*u.x-i.scrollLeft*u.x+c.x+f.x,y:a.y*u.y-i.scrollTop*u.y+c.y+f.y}}function bb(e){return e.getClientRects?Array.from(e.getClientRects()):[]}function Cb(e){let t=rn(e),a=e.ownerDocument.body,o=Ut(e.scrollWidth,e.clientWidth,a.scrollWidth,a.clientWidth),r=Ut(e.scrollHeight,e.clientHeight,a.scrollHeight,a.clientHeight),n=-t.scrollLeft+as(e),l=-t.scrollTop;return zt(a).direction==="rtl"&&(n+=Ut(e.clientWidth,a.clientWidth)-o),{width:o,height:r,x:n,y:l}}var Lb=25;function vb(e,t,a){a===void 0&&(a="viewport");let o=a==="layoutViewport",r=ut(e),n=ra(e),l=r.visualViewport,s=n.clientWidth,i=n.clientHeight,u=0,c=0;if(l){let f=!es()||t==="fixed";o?f||(u=-l.offsetLeft,c=-l.offsetTop):(s=l.width,i=l.height,f&&(u=l.offsetLeft,c=l.offsetTop))}if(as(n)<=0){let f=n.ownerDocument,m=f.body,h=getComputedStyle(m),p=f.compatMode==="CSS1Compat"&&parseFloat(h.marginLeft)+parseFloat(h.marginRight)||0,g=Math.abs(n.clientWidth-m.clientWidth-p),x=getComputedStyle(n).scrollbarGutter==="stable both-edges"?g/2:g;x<=Lb&&(s-=x)}return{width:s,height:i,x:u,y:c}}function Ib(e,t){let a=vo(e,!0,t==="fixed"),o=a.top+e.clientTop,r=a.left+e.clientLeft,n=or(e),l=e.clientWidth*n.x,s=e.clientHeight*n.y,i=r*n.x,u=o*n.y;return{width:l,height:s,x:i,y:u}}function xf(e,t,a){let o;if(t==="viewport"||t==="layoutViewport")o=vb(e,a,t);else if(t==="document")o=Cb(ra(e));else if(Wt(t))o=Ib(t,a);else{let r=Lf(e);o={x:t.x-r.x,y:t.y-r.y,width:t.width,height:t.height}}return xo(o)}function wb(e,t){let a=t.get(e);if(a)return a;let o=Co(e,[],!1).filter(s=>Wt(s)&&Lo(s)!=="body"),r=null,n=zt(e).position==="fixed",l=n?_a(e):e;for(;Wt(l)&&!ar(l);){let s=zt(l),i=Qn(l),u=r?r.position:n?"fixed":"";!i&&(u==="fixed"||u==="absolute"&&s.position==="static")?o=o.filter(d=>d!==l):r=s,l=_a(l)}return t.set(e,o),o}function Sb(e){let{element:t,boundary:a,rootBoundary:o,strategy:r}=e,l=[...a==="clippingAncestors"?on(t)?[]:wb(t,this._c):[].concat(a),o],s=xf(t,l[0],r),i=s.top,u=s.right,c=s.bottom,d=s.left;for(let f=1;f<l.length;f++){let m=xf(t,l[f],r);i=Ut(m.top,i),u=ta(m.right,u),c=ta(m.bottom,c),d=Ut(m.left,d)}return{width:u-d,height:c-i,x:d,y:i}}function yb(e){let{width:t,height:a}=Cf(e);return{width:t,height:a}}function kb(e,t,a){let o=Ca(t),r=ra(t),n=a==="fixed",l=vo(e,!0,n,t),s={scrollLeft:0,scrollTop:0},i=aa(0);if((o||!n)&&((Lo(t)!=="body"||an(r))&&(s=rn(t)),o)){let f=vo(t,!0,n,t);i.x=f.x+t.clientLeft,i.y=f.y+t.clientTop}!o&&r&&(i.x=as(r));let u=r&&!o&&!n?vf(r,s):aa(0),c=l.left+s.scrollLeft-i.x-u.x,d=l.top+s.scrollTop-i.y-u.y;return{x:c,y:d,width:l.width,height:l.height}}function Hl(e){return zt(e).position==="static"}function bf(e,t){if(!Ca(e)||zt(e).position==="fixed")return null;if(t)return t(e);let a=e.offsetParent;return ra(e)===a&&(a=a.ownerDocument.body),a}function If(e,t){let a=ut(e);if(on(e))return a;if(!Ca(e)){let r=_a(e);for(;r&&!ar(r);){if(Wt(r)&&!Hl(r))return r;r=_a(r)}return a}let o=bf(e,t);for(;o&&mf(o)&&Hl(o);)o=bf(o,t);return o&&ar(o)&&Hl(o)&&!Qn(o)?a:o||hf(e)||a}var Rb=async function(e){let t=this.getOffsetParent||If,a=this.getDimensions,o=await a(e.floating);return{reference:kb(e.reference,await t(e.floating),e.strategy),floating:{x:0,y:0,width:o.width,height:o.height}}};function Pb(e){return zt(e).direction==="rtl"}var wf={convertOffsetParentRelativeRectToViewportRelativeRect:xb,getDocumentElement:ra,getClippingRect:Sb,getOffsetParent:If,getElementRects:Rb,getClientRects:bb,getDimensions:yb,getScale:or,isElement:Wt,isRTL:Pb};function Sf(e,t){return e.x===t.x&&e.y===t.y&&e.width===t.width&&e.height===t.height}function Db(e,t,a){let o=null,r,n=ra(e);function l(){var c;clearTimeout(r),(c=o)==null||c.disconnect(),o=null}function s(c,d){c===void 0&&(c=!1),d===void 0&&(d=1),l();let f=e.getBoundingClientRect(),{left:m,top:h,width:p,height:g}=f;if(c||t(),!p||!g)return;let x=tn(h),L=tn(n.clientWidth-(m+p)),C=tn(n.clientHeight-(h+g)),v=tn(m),b={rootMargin:-x+"px "+-L+"px "+-C+"px "+-v+"px",threshold:Ut(0,ta(1,d))||1},S=!0;function R(I){let w=I[0].intersectionRatio;if(!Sf(f,e.getBoundingClientRect()))return s();if(w!==d){if(!S)return s();w?s(!1,w):r=setTimeout(()=>{s(!1,1e-7)},1e3)}S=!1}try{o=new IntersectionObserver(R,{...b,root:n.ownerDocument})}catch{o=new IntersectionObserver(R,b)}o.observe(e)}let i=ut(e),u=()=>s(a);return i.addEventListener("resize",u),s(!0),()=>{i.removeEventListener("resize",u),l()}}function ql(e,t,a,o){o===void 0&&(o={});let{ancestorScroll:r=!0,ancestorResize:n=!0,elementResize:l=typeof ResizeObserver=="function",layoutShift:s=typeof IntersectionObserver=="function",animationFrame:i=!1}=o,u=Ul(e),c=r||n?[...u?Co(u):[],...t?Co(t):[]]:[];c.forEach(x=>{r&&x.addEventListener("scroll",a),n&&x.addEventListener("resize",a)});let d=u&&s?Db(u,a,n):null,f=-1,m=null;l&&(m=new ResizeObserver(x=>{let[L]=x;L&&L.target===u&&m&&t&&(m.unobserve(t),cancelAnimationFrame(f),f=requestAnimationFrame(()=>{var C;(C=m)==null||C.observe(t)})),a()}),u&&!i&&m.observe(u),t&&m.observe(t));let h,p=i?vo(e):null;i&&g();function g(){let x=vo(e);p&&!Sf(p,x)&&a(),p=x,h=requestAnimationFrame(g)}return a(),()=>{var x;c.forEach(L=>{r&&L.removeEventListener("scroll",a),n&&L.removeEventListener("resize",a)}),d?.(),(x=m)==null||x.disconnect(),m=null,i&&cancelAnimationFrame(h)}}var yf=lf;var kf=uf,Rf=rf,Pf=cf,Df=nf,Wl=of;var Mf=df,zl=(e,t,a)=>{let o=new Map,r=a??{},n={...wf,...r.platform,_c:o};return af(e,t,{...r,platform:n})};var qe=$(require("react"),1),Tf=require("react"),Ef=$(require("react-dom"),1),Mb=typeof document<"u",Ab=function(){},os=Mb?Tf.useLayoutEffect:Ab;function rs(e,t){if(e===t)return!0;if(typeof e!=typeof t)return!1;if(typeof e=="function"&&e.toString()===t.toString())return!0;let a,o,r;if(e&&t&&typeof e=="object"){if(Array.isArray(e)){if(a=e.length,a!==t.length)return!1;for(o=a;o--!==0;)if(!rs(e[o],t[o]))return!1;return!0}if(r=Object.keys(e),a=r.length,a!==Object.keys(t).length)return!1;for(o=a;o--!==0;)if(!{}.hasOwnProperty.call(t,r[o]))return!1;for(o=a;o--!==0;){let n=r[o];if(!(n==="_owner"&&e.$$typeof)&&!rs(e[n],t[n]))return!1}return!0}return e!==e&&t!==t}function Of(e){return typeof window>"u"?1:(e.ownerDocument.defaultView||window).devicePixelRatio||1}function Af(e,t){let a=Of(e);return Math.round(t*a)/a}function Vl(e){let t=qe.useRef(e);return os(()=>{t.current=e}),t}function Ff(e){e===void 0&&(e={});let{placement:t="bottom",strategy:a="absolute",middleware:o=[],platform:r,elements:{reference:n,floating:l}={},transform:s=!0,whileElementsMounted:i,open:u}=e,[c,d]=qe.useState({x:0,y:0,strategy:a,placement:t,middlewareData:{},isPositioned:!1}),[f,m]=qe.useState(o);rs(f,o)||m(o);let[h,p]=qe.useState(null),[g,x]=qe.useState(null),L=qe.useCallback(U=>{U!==b.current&&(b.current=U,p(U))},[]),C=qe.useCallback(U=>{U!==S.current&&(S.current=U,x(U))},[]),v=n||h,y=l||g,b=qe.useRef(null),S=qe.useRef(null),R=qe.useRef(c),I=i!=null,w=Vl(i),P=Vl(r),O=Vl(u),V=qe.useCallback(()=>{if(!b.current||!S.current)return;let U={placement:t,strategy:a,middleware:f};P.current&&(U.platform=P.current),zl(b.current,S.current,U).then(X=>{let G={...X,isPositioned:O.current!==!1};A.current&&!rs(R.current,G)&&(R.current=G,Ef.flushSync(()=>{d(G)}))})},[f,t,a,P,O]);os(()=>{u===!1&&R.current.isPositioned&&(R.current.isPositioned=!1,d(U=>({...U,isPositioned:!1})))},[u]);let A=qe.useRef(!1);os(()=>(A.current=!0,()=>{A.current=!1}),[]),os(()=>{if(v&&(b.current=v),y&&(S.current=y),v&&y){if(w.current)return w.current(v,y,V);V()}},[v,y,V,w,I]);let N=qe.useMemo(()=>({reference:b,floating:S,setReference:L,setFloating:C}),[L,C]),H=qe.useMemo(()=>({reference:v,floating:y}),[v,y]),j=qe.useMemo(()=>{let U={position:a,left:0,top:0};if(!H.floating)return U;let X=Af(H.floating,c.x),G=Af(H.floating,c.y);return s?{...U,transform:"translate("+X+"px, "+G+"px)",...Of(H.floating)>=1.5&&{willChange:"transform"}}:{position:a,left:X,top:G}},[a,s,H.floating,c.x,c.y]);return qe.useMemo(()=>({...c,update:V,refs:N,elements:H,floatingStyles:j}),[c,V,N,H,j])}var Tb=e=>{function t(a){return{}.hasOwnProperty.call(a,"current")}return{name:"arrow",options:e,fn(a){let{element:o,padding:r}=typeof e=="function"?e(a):e;return o&&t(o)?o.current!=null?Wl({element:o.current,padding:r}).fn(a):{}:o?Wl({element:o,padding:r}).fn(a):{}}}},Bf=(e,t)=>{let a=yf(e);return{name:a.name,fn:a.fn,options:[e,t]}},Nf=(e,t)=>{let a=kf(e);return{name:a.name,fn:a.fn,options:[e,t]}},_f=(e,t)=>({fn:Mf(e).fn,options:[e,t]}),Hf=(e,t)=>{let a=Rf(e);return{name:a.name,fn:a.fn,options:[e,t]}},Uf=(e,t)=>{let a=Pf(e);return{name:a.name,fn:a.fn,options:[e,t]}};var qf=(e,t)=>{let a=Df(e);return{name:a.name,fn:a.fn,options:[e,t]}};var Wf=(e,t)=>{let a=Tb(e);return{name:a.name,fn:a.fn,options:[e,t]}};var zf=$(require("react"),1);var Eb=Object.defineProperty,Ob=(e,t)=>Eb(e,"name",{value:t,configurable:!0});function Gl(e){let[t,a]=zf.useState(void 0);return ge(()=>{if(e){a({width:e.offsetWidth,height:e.offsetHeight});let o=0,r=new ResizeObserver(n=>{if(!Array.isArray(n)||!n.length)return;let l=n[0];window.cancelAnimationFrame(o),o=window.requestAnimationFrame(()=>{let s,i;if("borderBoxSize"in l){let u=l.borderBoxSize,c=Array.isArray(u)?u[0]:u;s=c.inlineSize,i=c.blockSize}else s=e.offsetWidth,i=e.offsetHeight;a({width:s,height:i})})});return r.observe(e,{box:"border-box"}),()=>{window.cancelAnimationFrame(o),r.unobserve(e)}}else a(void 0)},[e]),t}Ob(Gl,"useSize");var rr=require("react/jsx-runtime"),Fb=Object.defineProperty,Ha=(e,t)=>Fb(e,"name",{value:t,configurable:!0});var Vf={Partial:"partial",Always:"always"},Gf={Optimized:"optimized",Always:"always"},Kf="Popper",[Xf,nr]=at(Kf),[Bb,jf]=Xf(Kf),ns=Ha(e=>{let{__scopePopper:t,children:a}=e,[o,r]=it.useState(null),[n,l]=it.useState(void 0);return(0,rr.jsx)(Bb,{scope:t,anchor:o,onAnchorChange:r,placementState:n,setPlacementState:l,children:a})},"Popper"),Nb="PopperAnchor",ss=it.forwardRef(Ha(function(t,a){let{__scopePopper:o,virtualRef:r,...n}=t,l=jf(Nb,o),s=it.useRef(null),i=l.onAnchorChange,u=it.useCallback(p=>{s.current=p,p&&i(p)},[i]),c=ie(a,u),d=it.useRef(null);it.useEffect(()=>{if(!r)return;let p=d.current;d.current=r.current,p!==d.current&&i(d.current)});let f=l.placementState&&is(l.placementState),m=f?.[0],h=f?.[1];return r?null:(0,rr.jsx)(ue.div,{"data-radix-popper-side":m,"data-radix-popper-align":h,...n,ref:c})},"PopperAnchor")),$f="PopperContent",[_b,by]=Xf($f),ls=it.forwardRef(Ha(function(t,a){let{__scopePopper:o,side:r="bottom",sideOffset:n=0,align:l="center",alignOffset:s=0,arrowPadding:i=0,avoidCollisions:u=!0,collisionBoundary:c=[],collisionPadding:d=0,sticky:f=Vf.Partial,hideWhenDetached:m=!1,updatePositionStrategy:h=Gf.Optimized,onPlaced:p,...g}=t,x=jf($f,o),[L,C]=it.useState(null),v=ie(a,C),[y,b]=it.useState(null),S=Gl(y),R=S?.width??0,I=S?.height??0,w=r+(l!=="center"?"-"+l:""),P=typeof d=="number"?d:{top:0,right:0,bottom:0,left:0,...d},O=Array.isArray(c)?c:[c],V=O.length>0,A={padding:P,boundary:O.filter(Yf),altBoundary:V},{refs:N,floatingStyles:H,placement:j,isPositioned:U,middlewareData:X}=Ff({strategy:"fixed",placement:w,whileElementsMounted:Ha((...xe)=>ql(...xe,{animationFrame:h===Gf.Always}),"whileElementsMounted"),elements:{reference:x.anchor},middleware:[Bf({mainAxis:n+I,alignmentAxis:s}),u&&Nf({mainAxis:!0,crossAxis:!1,...f===Vf.Partial?{limiter:_f()}:{},...A}),u&&Hf({...A}),Uf({...A,apply:Ha(({elements:xe,rects:B,availableWidth:J,availableHeight:le})=>{let{width:M,height:F}=B.reference,Q=xe.floating.style;Q.setProperty("--radix-popper-available-width",`${J}px`),Q.setProperty("--radix-popper-available-height",`${le}px`),Q.setProperty("--radix-popper-anchor-width",`${M}px`),Q.setProperty("--radix-popper-anchor-height",`${F}px`)},"apply")}),y&&Wf({element:y,padding:i}),Hb({arrowWidth:R,arrowHeight:I}),m&&qf(V?{strategy:"referenceHidden",...A}:{strategy:"referenceHidden",padding:A.padding,altBoundary:A.altBoundary})]}),G=x.setPlacementState;ge(()=>(G(j),()=>{G(void 0)}),[j,G]);let[te,ee]=is(j),ce=Xe(p);ge(()=>{U&&ce?.()},[U,ce]);let Re=X.arrow?.x,Ce=X.arrow?.y,q=X.arrow?.centerOffset!==0,[Le,ve]=it.useState();return ge(()=>{L&&ve(window.getComputedStyle(L).zIndex)},[L]),(0,rr.jsx)("div",{ref:N.setFloating,"data-radix-popper-content-wrapper":"",style:{...H,transform:U?H.transform:"translate(0, -200%)",minWidth:"max-content",zIndex:Le,"--radix-popper-transform-origin":[X.transformOrigin?.x,X.transformOrigin?.y].join(" "),...X.hide?.referenceHidden&&{visibility:"hidden",pointerEvents:"none"}},dir:t.dir,children:(0,rr.jsx)(_b,{scope:o,placedSide:te,placedAlign:ee,onArrowChange:b,arrowX:Re,arrowY:Ce,shouldHideArrow:q,children:(0,rr.jsx)(ue.div,{"data-side":te,"data-align":ee,...g,ref:v,style:{...g.style,animation:U?g.style?.animation:"none"}})})})},"PopperContent"));function Yf(e){return e!==null}Ha(Yf,"isNotNull");var Hb=Ha(e=>({name:"transformOrigin",options:e,fn(t){let{placement:a,rects:o,middlewareData:r}=t,l=r.arrow?.centerOffset!==0,s=l?0:e.arrowWidth,i=l?0:e.arrowHeight,[u,c]=is(a),d={start:"0%",center:"50%",end:"100%"}[c],f=(r.arrow?.x??0)+s/2,m=(r.arrow?.y??0)+i/2,h="",p="";return u==="bottom"?(h=l?d:`${f}px`,p=`${-i}px`):u==="top"?(h=l?d:`${f}px`,p=`${o.floating.height+i}px`):u==="right"?(h=`${-i}px`,p=l?d:`${m}px`):u==="left"&&(h=`${o.floating.width+i}px`,p=l?d:`${m}px`),{data:{x:h,y:p}}}}),"transformOrigin");function is(e){let[t,a="center"]=e.split("-");return[t,a]}Ha(is,"getSideAndAlignFromPlacement");var $e=$(require("react"),1);var qb=$(require("react"),1),us=$(require("react"),1),Ub=Object.defineProperty,Xl=(e,t)=>Ub(e,"name",{value:t,configurable:!0}),Kl=!1;function Jf(){let[e,t]=us.useState(Kl);return us.useEffect(()=>{Kl||(Kl=!0,t(!0))},[]),e}Xl(Jf,"useIsHydrated");var Qf=qb[" useSyncExternalStore ".trim().toString()];function ep(){return()=>{}}Xl(ep,"subscribe");function tp(){return Qf(ep,()=>!0,()=>!1)}Xl(tp,"useIsHydratedModern");var ap=typeof Qf=="function"?tp:Jf;var Ua=require("react/jsx-runtime"),Wb=Object.defineProperty,Io=(e,t)=>Wb(e,"name",{value:t,configurable:!0}),jl="rovingFocusGroup.onEntryFocus",zb={bubbles:!1,cancelable:!0},ds="RovingFocusGroup",[$l,rp,Vb]=mo(ds),[Gb,Yl]=at(ds,[Vb]),op={Vertical:"vertical",Horizontal:"horizontal"},Kb={LTR:"ltr",RTL:"rtl"},[Xb,jb]=Gb(ds),np=$e.forwardRef(Io(function(t,a){return(0,Ua.jsx)($l.Provider,{scope:t.__scopeRovingFocusGroup,children:(0,Ua.jsx)($l.Slot,{scope:t.__scopeRovingFocusGroup,children:(0,Ua.jsx)($b,{...t,ref:a})})})},"RovingFocusGroup")),$b=$e.forwardRef(Io(function(t,a){let{__scopeRovingFocusGroup:o,orientation:r,loop:n=!1,dir:l,currentTabStopId:s,defaultCurrentTabStopId:i,onCurrentTabStopIdChange:u,onEntryFocus:c,preventScrollOnEntryFocus:d=!1,...f}=t,m=$e.useRef(null),h=ie(a,m),p=ho(l),[g,x]=Jt({prop:s,defaultProp:i??null,onChange:u,caller:ds}),[L,C]=$e.useState(!1),v=Xe(c),y=rp(o),b=$e.useRef(!1),[S,R]=$e.useState(0);return $e.useEffect(()=>{let I=m.current;if(I)return I.addEventListener(jl,v),()=>I.removeEventListener(jl,v)},[v]),(0,Ua.jsx)(Xb,{scope:o,orientation:r,dir:p,loop:n,currentTabStopId:g,onItemFocus:$e.useCallback(I=>x(I),[x]),onItemShiftTab:$e.useCallback(()=>C(!0),[]),onFocusableItemAdd:$e.useCallback(()=>R(I=>I+1),[]),onFocusableItemRemove:$e.useCallback(()=>R(I=>I-1),[]),children:(0,Ua.jsx)(ue.div,{tabIndex:L||S===0?-1:0,"data-orientation":r,...f,ref:h,style:{outline:"none",...t.style},onMouseDown:Y(t.onMouseDown,()=>{b.current=!0}),onFocus:Y(t.onFocus,I=>{let w=!b.current;if(I.target===I.currentTarget&&w&&!L){let P=new CustomEvent(jl,zb);if(I.currentTarget.dispatchEvent(P),!P.defaultPrevented){let O=y().filter(j=>j.focusable),V=O.find(j=>j.active),A=O.find(j=>j.id===g),H=[V,A,...O].filter(Boolean).map(j=>j.ref.current);Zl(H,d)}}b.current=!1}),onBlur:Y(t.onBlur,()=>C(!1))})})},"RovingFocusGroupImpl")),Yb="RovingFocusGroupItem",sp=$e.forwardRef(Io(function(t,a){let{__scopeRovingFocusGroup:o,focusable:r=!0,active:n=!1,tabStopId:l,children:s,...i}=t,u=St(),c=l||u,d=jb(Yb,o),f=d.currentTabStopId===c,m=rp(o),{onFocusableItemAdd:h,onFocusableItemRemove:p,currentTabStopId:g}=d,x=ap();return ge(()=>{if(!(!x||!r))return h(),()=>p()},[x,r,h,p]),$e.useEffect(()=>{if(!(x||!r))return h(),()=>p()},[x,r,h,p]),(0,Ua.jsx)($l.ItemSlot,{scope:o,id:c,focusable:r,active:n,children:(0,Ua.jsx)(ue.span,{tabIndex:f?0:-1,"data-orientation":d.orientation,...i,ref:a,onMouseDown:Y(t.onMouseDown,L=>{r?d.onItemFocus(c):L.preventDefault()}),onFocus:Y(t.onFocus,()=>d.onItemFocus(c)),onKeyDown:Y(t.onKeyDown,L=>{if(L.key==="Tab"&&L.shiftKey){d.onItemShiftTab();return}if(L.target!==L.currentTarget)return;let C=ip(L,d.orientation,d.dir);if(C!==void 0){if(L.metaKey||L.ctrlKey||L.altKey||L.shiftKey)return;L.preventDefault();let y=m().filter(b=>b.focusable).map(b=>b.ref.current);if(C==="last")y.reverse();else if(C==="prev"||C==="next"){C==="prev"&&y.reverse();let b=y.indexOf(L.currentTarget);y=d.loop?up(y,b+1):y.slice(b+1)}setTimeout(()=>Zl(y))}}),children:typeof s=="function"?s({isCurrentTabStop:f,hasTabStop:g!=null}):s})})},"RovingFocusGroupItem")),Zb={ArrowLeft:"prev",ArrowUp:"prev",ArrowRight:"next",ArrowDown:"next",PageUp:"first",Home:"first",PageDown:"last",End:"last"};function lp(e,t){return t!==Kb.RTL?e:e==="ArrowLeft"?"ArrowRight":e==="ArrowRight"?"ArrowLeft":e}Io(lp,"getDirectionAwareKey");function ip(e,t,a){let o=lp(e.key,a);if(!(t===op.Vertical&&["ArrowLeft","ArrowRight"].includes(o))&&!(t===op.Horizontal&&["ArrowUp","ArrowDown"].includes(o)))return Zb[o]}Io(ip,"getFocusIntent");function Zl(e,t=!1){let a=document.activeElement;for(let o of e)if(o===a||(o.focus({preventScroll:t}),document.activeElement!==a))return}Io(Zl,"focusFirst");function up(e,t){return e.map((a,o)=>e[(t+o)%e.length])}Io(up,"wrapArray");var we=require("react/jsx-runtime"),eC=Object.defineProperty,ke=(e,t)=>eC(e,"name",{value:t,configurable:!0});var Jl=["Enter"," "],tC=["ArrowDown","PageUp","Home"],cp=["ArrowUp","PageDown","End"],aC=[...tC,...cp],jy={ltr:[...Jl,"ArrowRight"],rtl:[...Jl,"ArrowLeft"]};var fs="Menu",[Ql,oC,rC]=mo(fs),[wo,ti]=at(fs,[rC,nr,Yl]),ai=nr(),fp=Yl(),[nC,nn]=wo(fs),[sC,oi]=wo(fs),pp=ke(e=>{let{__scopeMenu:t,open:a=!1,children:o,dir:r,onOpenChange:n,modal:l=!0}=e,s=ai(t),[i,u]=oe.useState(null),c=oe.useRef(!1),d=Xe(n),f=ho(r);return oe.useEffect(()=>{let m=ke(()=>{c.current=!0,document.addEventListener("pointerdown",h,{capture:!0,once:!0}),document.addEventListener("pointermove",h,{capture:!0,once:!0})},"handleKeyDown"),h=ke(()=>c.current=!1,"handlePointer");return document.addEventListener("keydown",m,{capture:!0}),()=>{document.removeEventListener("keydown",m,{capture:!0}),document.removeEventListener("pointerdown",h,{capture:!0}),document.removeEventListener("pointermove",h,{capture:!0})}},[]),oe.useEffect(()=>{if(!a)return;let m=ke(()=>d(!1),"handleBlur");return window.addEventListener("blur",m),()=>window.removeEventListener("blur",m)},[a,d]),(0,we.jsx)(ns,{...s,children:(0,we.jsx)(nC,{scope:t,open:a,onOpenChange:d,content:i,onContentChange:u,children:(0,we.jsx)(sC,{scope:t,onClose:oe.useCallback(()=>d(!1),[d]),isUsingKeyboardRef:c,dir:f,modal:l,children:o})})})},"Menu"),mp=oe.forwardRef(ke(function(t,a){let{__scopeMenu:o,...r}=t,n=ai(o);return(0,we.jsx)(ss,{...n,...r,ref:a})},"MenuAnchor")),hp="MenuPortal",[lC,iC]=wo(hp,{forceMount:void 0}),gp=ke(e=>{let{__scopeMenu:t,forceMount:a,children:o,container:r}=e,n=nn(hp,t);return(0,we.jsx)(lC,{scope:t,forceMount:a,children:(0,we.jsx)(fa,{present:a||n.open,children:(0,we.jsx)(jo,{asChild:!0,container:r,children:o})})})},"MenuPortal"),qa="MenuContent",[uC,xp]=wo(qa),bp=oe.forwardRef(ke(function(t,a){let o=iC(qa,t.__scopeMenu),{forceMount:r=o.forceMount,...n}=t,l=nn(qa,t.__scopeMenu),s=oi(qa,t.__scopeMenu);return(0,we.jsx)(Ql.Provider,{scope:t.__scopeMenu,children:(0,we.jsx)(fa,{present:r||l.open,children:(0,we.jsx)(Ql.Slot,{scope:t.__scopeMenu,children:s.modal?(0,we.jsx)(dC,{...n,ref:a}):(0,we.jsx)(cC,{...n,ref:a})})})})},"MenuContent")),dC=oe.forwardRef(ke(function(t,a){let o=nn(qa,t.__scopeMenu),r=oe.useRef(null),n=ie(a,r);return oe.useEffect(()=>{let l=r.current;if(l)return tr(l)},[]),(0,we.jsx)(Cp,{...t,ref:n,trapFocus:o.open,disableOutsidePointerEvents:o.open,disableOutsideScroll:!0,onFocusOutside:Y(t.onFocusOutside,l=>l.preventDefault(),{checkForDefaultPrevented:!1}),onDismiss:()=>o.onOpenChange(!1)})},"MenuRootContentModal")),cC=oe.forwardRef(ke(function(t,a){let o=nn(qa,t.__scopeMenu);return(0,we.jsx)(Cp,{...t,ref:a,trapFocus:!1,disableOutsidePointerEvents:!1,disableOutsideScroll:!1,onDismiss:()=>o.onOpenChange(!1)})},"MenuRootContentNonModal")),fC=st("MenuContent.ScrollLock"),Cp=oe.forwardRef(ke(function(t,a){let{__scopeMenu:o,loop:r=!1,trapFocus:n,onOpenAutoFocus:l,onCloseAutoFocus:s,disableOutsidePointerEvents:i,onEntryFocus:u,onEscapeKeyDown:c,onPointerDownOutside:d,onFocusOutside:f,onInteractOutside:m,onDismiss:h,disableOutsideScroll:p,...g}=t,x=nn(qa,o),L=oi(qa,o),C=ai(o),v=fp(o),y=oC(o),[b,S]=oe.useState(null),R=oe.useRef(null),[I,w]=oe.useState(null);sl(I);let{nodes:P,registry:O}=Xr(),V=!!(n||p),A=ie(a,R,x.onContentChange,w),N=oe.useRef(0),H=oe.useRef(""),j=oe.useRef(0),U=oe.useRef(null),X=oe.useRef("right"),G=oe.useRef(0),te=oe.useMemo(()=>p?[R,...P.map(q=>({current:q}))]:[],[R,P,p]),ee=p?uo:oe.Fragment,ce=p?{as:fC,allowPinchZoom:!0,shards:te}:void 0,Re=ke(q=>{let Le=H.current+q,ve=y().filter(Q=>!Q.disabled),xe=document.activeElement,B=ve.find(Q=>Q.ref.current===xe)?.textValue,J=ve.map(Q=>Q.textValue),le=Rp(J,Le,B),M=ve.find(Q=>Q.textValue===le)?.ref.current;function F(Q){H.current=Q,window.clearTimeout(N.current),Q!==""&&(N.current=window.setTimeout(()=>F(""),1e3))}ke(F,"updateSearch"),F(Le),M&&setTimeout(()=>M.focus())},"handleTypeaheadSearch");oe.useEffect(()=>()=>window.clearTimeout(N.current),[]),Oa();let Ce=oe.useCallback(q=>X.current===U.current?.side&&Dp(q,U.current?.area),[]);return(0,we.jsx)(uC,{scope:o,searchRef:H,onItemEnter:oe.useCallback(q=>{Ce(q)&&q.preventDefault()},[Ce]),onItemLeave:oe.useCallback(q=>{Ce(q)||(R.current?.focus(),S(null))},[Ce]),onTriggerLeave:oe.useCallback(q=>{Ce(q)&&q.preventDefault()},[Ce]),pointerGraceTimerRef:j,onPointerGraceIntentChange:oe.useCallback(q=>{U.current=q},[]),children:(0,we.jsx)(Kr,{registry:V?O:null,children:(0,we.jsx)(ee,{...ce,children:(0,we.jsx)(Xo,{asChild:!0,trapped:n,branches:P,onMountAutoFocus:Y(l,q=>{q.preventDefault(),R.current?.focus({preventScroll:!0})}),onUnmountAutoFocus:s,children:(0,we.jsx)(Ko,{asChild:!0,disableOutsidePointerEvents:i,onEscapeKeyDown:c,onPointerDownOutside:d,onFocusOutside:f,onInteractOutside:m,onDismiss:h,children:(0,we.jsx)(np,{asChild:!0,...v,dir:L.dir,orientation:"vertical",loop:r,currentTabStopId:b,onCurrentTabStopIdChange:S,onEntryFocus:Y(u,q=>{L.isUsingKeyboardRef.current||q.preventDefault()}),preventScrollOnEntryFocus:!0,children:(0,we.jsx)(ls,{role:"menu","aria-orientation":"vertical","data-state":wp(x.open),"data-radix-menu-content":"",dir:L.dir,...C,...g,ref:A,style:{outline:"none",...g.style},onKeyDown:Y(g.onKeyDown,q=>{let ve=q.target.closest("[data-radix-menu-content]")===q.currentTarget,xe=q.ctrlKey||q.altKey||q.metaKey,B=q.key.length===1;ve&&(q.key==="Tab"&&q.preventDefault(),!xe&&B&&Re(q.key));let J=R.current;if(q.target!==J||!aC.includes(q.key))return;q.preventDefault();let M=y().filter(F=>!F.disabled).map(F=>F.ref.current);cp.includes(q.key)&&M.reverse(),yp(M)}),onBlur:Y(t.onBlur,q=>{q.currentTarget.contains(q.target)||(window.clearTimeout(N.current),H.current="")}),onPointerMove:Y(t.onPointerMove,cs(q=>{let Le=q.target,ve=G.current!==q.clientX;if(q.currentTarget.contains(Le)&&ve){let xe=q.clientX>G.current?"right":"left";X.current=xe,G.current=q.clientX}}))})})})})})})})},"MenuContentImpl"));var Lp=oe.forwardRef(ke(function(t,a){let{__scopeMenu:o,...r}=t;return(0,we.jsx)(ue.div,{...r,ref:a})},"MenuLabel")),ei="MenuItem",dp="menu.itemSelect",vp=oe.forwardRef(ke(function(t,a){let{disabled:o=!1,onSelect:r,...n}=t,l=oe.useRef(null),s=oi(ei,t.__scopeMenu),i=xp(ei,t.__scopeMenu),u=ie(a,l),c=oe.useRef(!1),d=ke(()=>{let f=l.current;if(!o&&f){let m=new CustomEvent(dp,{bubbles:!0,cancelable:!0});f.addEventListener(dp,h=>r?.(h),{once:!0}),Vr(f,m),m.defaultPrevented?c.current=!1:s.onClose()}},"handleSelect");return(0,we.jsx)(pC,{...n,ref:u,disabled:o,onClick:Y(t.onClick,d),onPointerDown:f=>{t.onPointerDown?.(f),c.current=!0},onPointerUp:Y(t.onPointerUp,f=>{c.current||f.currentTarget?.click()}),onKeyDown:Y(t.onKeyDown,f=>{o||f.target!==f.currentTarget||i.searchRef.current!==""&&f.key===" "||Jl.includes(f.key)&&(f.currentTarget.click(),f.preventDefault())})})},"MenuItem")),pC=oe.forwardRef(ke(function(t,a){let{__scopeMenu:o,disabled:r=!1,textValue:n,...l}=t,s=xp(ei,o),i=fp(o),u=oe.useRef(null),c=ie(a,u),[d,f]=oe.useState(!1),[m,h]=oe.useState("");return oe.useEffect(()=>{let p=u.current;p&&h((p.textContent??"").trim())},[l.children]),(0,we.jsx)(Ql.ItemSlot,{scope:o,disabled:r,textValue:n??m,children:(0,we.jsx)(sp,{asChild:!0,...i,focusable:!r,children:(0,we.jsx)(ue.div,{role:"menuitem","data-highlighted":d?"":void 0,"aria-disabled":r||void 0,"data-disabled":r?"":void 0,...l,ref:c,onPointerMove:Y(t.onPointerMove,cs(p=>{r?s.onItemLeave(p):(s.onItemEnter(p),p.defaultPrevented||p.currentTarget.focus({preventScroll:!0}))})),onPointerLeave:Y(t.onPointerLeave,cs(p=>s.onItemLeave(p))),onFocus:Y(t.onFocus,()=>f(!0)),onBlur:Y(t.onBlur,()=>f(!1))})})})},"MenuItemImpl"));var mC="MenuRadioGroup",[$y,Yy]=wo(mC,{value:void 0,onValueChange:ke(()=>{},"onValueChange")});var hC="MenuItemIndicator",[Zy,Jy]=wo(hC,{checked:!1});var Ip=oe.forwardRef(ke(function(t,a){let{__scopeMenu:o,...r}=t;return(0,we.jsx)(ue.div,{role:"separator","aria-orientation":"horizontal",...r,ref:a})},"MenuSeparator"));var gC="MenuSub",[Qy,ek]=wo(gC);function wp(e){return e?"open":"closed"}ke(wp,"getOpenState");function Sp(e){return e==="indeterminate"}ke(Sp,"isIndeterminate");function xC(e){return Sp(e)?"indeterminate":e?"checked":"unchecked"}ke(xC,"getCheckedState");function yp(e){let t=document.activeElement;for(let a of e)if(a===t||(a.focus(),document.activeElement!==t))return}ke(yp,"focusFirst");function kp(e,t){return e.map((a,o)=>e[(t+o)%e.length])}ke(kp,"wrapArray");function Rp(e,t,a){let r=t.length>1&&Array.from(t).every(u=>u===t[0])?t[0]:t,n=a?e.indexOf(a):-1,l=kp(e,Math.max(n,0));r.length===1&&(l=l.filter(u=>u!==a));let i=l.find(u=>u.toLowerCase().startsWith(r.toLowerCase()));return i!==a?i:void 0}ke(Rp,"getNextMatch");function Pp(e,t){let{x:a,y:o}=e,r=!1;for(let n=0,l=t.length-1;n<t.length;l=n++){let s=t[n],i=t[l],u=s.x,c=s.y,d=i.x,f=i.y;c>o!=f>o&&a<(d-u)*(o-c)/(f-c)+u&&(r=!r)}return r}ke(Pp,"isPointInPolygon");function Dp(e,t){if(!t)return!1;let a={x:e.clientX,y:e.clientY};return Pp(a,t)}ke(Dp,"isPointerInGraceArea");function cs(e){return t=>t.pointerType==="mouse"?e(t):void 0}ke(cs,"whenMouse");var na=require("react/jsx-runtime"),CC=Object.defineProperty,So=(e,t)=>CC(e,"name",{value:t,configurable:!0}),ri="DropdownMenu",[LC,xk]=at(ri,[ti]),yo=ti(),[vC,Mp]=LC(ri),Ap=So(e=>{let{__scopeDropdownMenu:t,children:a,dir:o,open:r,defaultOpen:n,onOpenChange:l,modal:s=!0}=e,i=yo(t),u=Vt.useRef(null),[c,d]=Jt({prop:r,defaultProp:n??!1,onChange:l,caller:ri});return(0,na.jsx)(vC,{scope:t,triggerId:St(),triggerRef:u,contentId:St(),open:c,onOpenChange:d,onOpenToggle:Vt.useCallback(()=>d(f=>!f),[d]),modal:s,children:(0,na.jsx)(pp,{...i,open:c,onOpenChange:d,dir:o,modal:s,children:a})})},"DropdownMenu"),IC="DropdownMenuTrigger",Tp=Vt.forwardRef(So(function(t,a){let{__scopeDropdownMenu:o,disabled:r=!1,...n}=t,l=Mp(IC,o),s=yo(o),i=ie(a,l.triggerRef);return(0,na.jsx)(mp,{asChild:!0,...s,children:(0,na.jsx)(ue.button,{type:"button",id:l.triggerId,"aria-haspopup":"menu","aria-expanded":l.open,"aria-controls":l.open?l.contentId:void 0,"data-state":l.open?"open":"closed","data-disabled":r?"":void 0,disabled:r,...n,ref:i,onPointerDown:Y(t.onPointerDown,u=>{!r&&u.button===0&&u.ctrlKey===!1&&(l.onOpenToggle(),l.open||u.preventDefault())}),onKeyDown:Y(t.onKeyDown,u=>{r||(["Enter"," "].includes(u.key)&&l.onOpenToggle(),u.key==="ArrowDown"&&l.onOpenChange(!0),["Enter"," ","ArrowDown"].includes(u.key)&&u.preventDefault())})})})},"DropdownMenuTrigger")),Ep=So(e=>{let{__scopeDropdownMenu:t,...a}=e,o=yo(t);return(0,na.jsx)(gp,{...o,...a})},"DropdownMenuPortal"),wC="DropdownMenuContent",ni=Vt.forwardRef(So(function(t,a){let{__scopeDropdownMenu:o,...r}=t,n=Mp(wC,o),l=yo(o),s=Vt.useRef(!1);return(0,na.jsx)(bp,{id:n.contentId,"aria-labelledby":n.triggerId,...l,...r,ref:a,onCloseAutoFocus:Y(t.onCloseAutoFocus,i=>{s.current||n.triggerRef.current?.focus(),s.current=!1,i.preventDefault()}),onInteractOutside:Y(t.onInteractOutside,i=>{let u=i.detail.originalEvent,c=u.button===0&&u.ctrlKey===!0,d=u.button===2||c;(!n.modal||d)&&(s.current=!0)}),style:{...t.style,"--radix-dropdown-menu-content-transform-origin":"var(--radix-popper-transform-origin)","--radix-dropdown-menu-content-available-width":"var(--radix-popper-available-width)","--radix-dropdown-menu-content-available-height":"var(--radix-popper-available-height)","--radix-dropdown-menu-trigger-width":"var(--radix-popper-anchor-width)","--radix-dropdown-menu-trigger-height":"var(--radix-popper-anchor-height)"}})},"DropdownMenuContent"));var si=Vt.forwardRef(So(function(t,a){let{__scopeDropdownMenu:o,...r}=t,n=yo(o);return(0,na.jsx)(Lp,{...n,...r,ref:a})},"DropdownMenuLabel")),li=Vt.forwardRef(So(function(t,a){let{__scopeDropdownMenu:o,...r}=t,n=yo(o);return(0,na.jsx)(vp,{...n,...r,ref:a})},"DropdownMenuItem"));var ii=Vt.forwardRef(So(function(t,a){let{__scopeDropdownMenu:o,...r}=t,n=yo(o);return(0,na.jsx)(Ip,{...n,...r,ref:a})},"DropdownMenuSeparator"));var sr=require("react/jsx-runtime"),ko=Ap,Ro=Tp;var Wa=sn.forwardRef(({className:e,sideOffset:t=4,...a},o)=>(0,sr.jsx)(Ep,{children:(0,sr.jsx)(ni,{ref:o,sideOffset:t,className:se("kanban-portal kanban-dropdown-content",e),...a})}));Wa.displayName=ni.displayName;var ht=sn.forwardRef(({className:e,inset:t,...a},o)=>(0,sr.jsx)(li,{ref:o,className:se("kanban-dropdown-item",t&&"kanban-dropdown-item--inset",e),...a}));ht.displayName=li.displayName;var yC=sn.forwardRef(({className:e,inset:t,...a},o)=>(0,sr.jsx)(si,{ref:o,className:se("kanban-dropdown-label",t&&"kanban-dropdown-label--inset",e),...a}));yC.displayName=si.displayName;var kC=sn.forwardRef(({className:e,...t},a)=>(0,sr.jsx)(ii,{ref:a,className:se("kanban-dropdown-separator",e),...t}));kC.displayName=ii.displayName;var Op=$(require("react"),1);var Fp=require("react/jsx-runtime"),gt=Op.forwardRef(({className:e,type:t,...a},o)=>(0,Fp.jsx)("input",{type:t,className:se("kanban-input",e),ref:o,...a}));gt.displayName="Input";var _p=$(require("react"),1);var Bp=$(require("react"),1);var Np=require("react/jsx-runtime"),RC=Object.defineProperty,PC=(e,t)=>RC(e,"name",{value:t,configurable:!0}),ui=Bp.forwardRef(PC(function(t,a){return(0,Np.jsx)(ue.label,{...t,ref:a,onMouseDown:o=>{o.target.closest("button, input, select, textarea")||(t.onMouseDown?.(o),!o.defaultPrevented&&o.detail>1&&o.preventDefault())}})},"Label"));var Hp=require("react/jsx-runtime"),Ye=_p.forwardRef(({className:e,...t},a)=>(0,Hp.jsx)(ui,{ref:a,className:se("kanban-label",e),...t}));Ye.displayName=ui.displayName;var Va=$(require("react"),1);var _=$(require("react"),1),ci=$(require("react-dom"),1);var MC=Object.defineProperty,AC=(e,t)=>MC(e,"name",{value:t,configurable:!0});function ps(e,[t,a]){return Math.min(a,Math.max(t,e))}AC(ps,"clamp");var TC=$(require("react"),1);var EC=require("react/jsx-runtime");var Up=Object.freeze({position:"absolute",border:0,width:1,height:1,padding:0,margin:-1,overflow:"hidden",clip:"rect(0, 0, 0, 0)",whiteSpace:"nowrap",wordWrap:"normal"});var Z=require("react/jsx-runtime"),OC=Object.defineProperty,he=(e,t)=>OC(e,"name",{value:t,configurable:!0}),qp={ItemAligned:"item-aligned",Popper:"popper"},FC={LTR:"ltr",RTL:"rtl"},BC=[" ","Enter","ArrowUp","ArrowDown"],NC=[" ","Enter"],lr="Select",[hs,gs,_C]=mo(lr),[Do,$k]=at(lr,[_C,nr]),fi=nr(),[HC,za]=Do(lr),[UC,qC]=Do(lr);function Kp(e){let{__scopeSelect:t,children:a,open:o,defaultOpen:r,onOpenChange:n,value:l,defaultValue:s,onValueChange:i,dir:u,name:c,autoComplete:d,disabled:f,required:m,form:h,internal_do_not_use_render:p}=e,g=fi(t),[x,L]=_.useState(null),[C,v]=_.useState(null),[y,b]=_.useState(!1),S=ho(u),[R,I]=Jt({prop:o,defaultProp:r??!1,onChange:n,caller:lr}),[w,P]=Jt({prop:l,defaultProp:s,onChange:i,caller:lr}),O=_.useRef(null),V=_.useRef(!1),[A,N]=_.useState(null),H=he(q=>{N({value:q,hasConsumerStoppedPropagation:V.current}),P(q)},"handleUserSelect"),j=_.useRef(w);_.useEffect(()=>{let q=h?x?.ownerDocument.getElementById(h):x?.form;if(q instanceof HTMLFormElement){let Le=he(()=>P(j.current),"reset");return q.addEventListener("reset",Le),()=>q.removeEventListener("reset",Le)}},[h,x,P]);let U=x?!!h||!!x.closest("form"):!0,[X,G]=_.useState(new Set),te=St(),ee=Array.from(X).map(q=>q.props.value).join(";"),ce=_.useCallback(q=>{G(Le=>new Set(Le).add(q))},[]),Re=_.useCallback(q=>{G(Le=>{let ve=new Set(Le);return ve.delete(q),ve})},[]),Ce={required:m,trigger:x,onTriggerChange:L,valueNode:C,onValueNodeChange:v,valueNodeHasChildren:y,onValueNodeHasChildrenChange:b,contentId:te,value:w,onValueChange:P,hasConsumerStoppedPropagationRef:V,userSelection:A,onUserSelect:H,open:R,onOpenChange:I,dir:S,triggerPointerDownPosRef:O,disabled:f,name:c,autoComplete:d,form:h,nativeOptions:X,nativeSelectKey:ee,isFormControl:U};return(0,Z.jsx)(ns,{...g,children:(0,Z.jsx)(HC,{scope:t,...Ce,children:(0,Z.jsx)(hs.Provider,{scope:t,children:(0,Z.jsx)(UC,{scope:t,onNativeOptionAdd:ce,onNativeOptionRemove:Re,children:om(p)?p(Ce):a})})})})}he(Kp,"SelectProvider");var Xp=he(e=>{let{__scopeSelect:t,children:a,...o}=e;return(0,Z.jsx)(Kp,{__scopeSelect:t,...o,internal_do_not_use_render:({isFormControl:r})=>(0,Z.jsxs)(Z.Fragment,{children:[a,r?(0,Z.jsx)(rL,{__scopeSelect:t}):null]})})},"Select"),WC="SelectTrigger",pi=_.forwardRef(he(function(t,a){let{__scopeSelect:o,disabled:r=!1,...n}=t,l=fi(o),s=za(WC,o),i=s.disabled||r,u=ie(a,s.onTriggerChange),c=gs(o),d=_.useRef("touch"),[f,m,h]=vi(g=>{let x=c().filter(v=>!v.disabled),L=x.find(v=>v.value===s.value),C=Ii(x,g,L);C!==void 0&&s.onUserSelect(C.value)}),p=he(g=>{i||(s.onOpenChange(!0),h()),g&&(s.triggerPointerDownPosRef.current={x:Math.round(g.pageX),y:Math.round(g.pageY)})},"handleOpen");return(0,Z.jsx)(ss,{asChild:!0,...l,children:(0,Z.jsx)(ue.button,{type:"button",role:"combobox","aria-controls":s.open?s.contentId:void 0,"aria-expanded":s.open,"aria-required":s.required,"aria-autocomplete":"none",dir:s.dir,"data-state":s.open?"open":"closed",disabled:i,"data-disabled":i?"":void 0,"data-placeholder":ln(s.value)?"":void 0,...n,ref:u,onClick:Y(n.onClick,g=>{g.currentTarget.focus(),d.current!=="mouse"&&p(g)}),onPointerDown:Y(n.onPointerDown,g=>{d.current=g.pointerType;let x=g.target;x.hasPointerCapture(g.pointerId)&&x.releasePointerCapture(g.pointerId),g.button===0&&g.ctrlKey===!1&&g.pointerType==="mouse"&&(p(g),g.preventDefault())}),onKeyDown:Y(n.onKeyDown,g=>{let x=f.current!=="";!(g.ctrlKey||g.altKey||g.metaKey)&&g.key.length===1&&(s.hasConsumerStoppedPropagationRef.current=g.isPropagationStopped(),m(g.key)),!(x&&g.key===" ")&&BC.includes(g.key)&&(p(),g.preventDefault())})})})},"SelectTrigger")),zC="SelectValue",jp=_.forwardRef(he(function(t,a){let{__scopeSelect:o,className:r,style:n,children:l,placeholder:s="",...i}=t,u=za(zC,o),{onValueNodeHasChildrenChange:c}=u,d=l!==void 0,f=ie(a,u.onValueNodeChange);ge(()=>{c(d)},[c,d]);let m=ln(u.value);return(0,Z.jsx)(ue.span,{...i,asChild:m?!1:i.asChild,ref:f,style:{pointerEvents:"none"},children:(0,Z.jsx)(_.Fragment,{children:m?s:l},m?"placeholder":"value")})},"SelectValue")),$p=_.forwardRef(he(function(t,a){let{__scopeSelect:o,children:r,...n}=t;return(0,Z.jsx)(ue.span,{"aria-hidden":!0,...n,ref:a,children:r||"\u25BC"})},"SelectIcon")),VC="SelectPortal",[GC,KC]=Do(VC,{forceMount:void 0}),Yp=he(e=>{let{__scopeSelect:t,forceMount:a,...o}=e;return(0,Z.jsx)(GC,{scope:e.__scopeSelect,forceMount:a,children:(0,Z.jsx)(jo,{asChild:!0,...o})})},"SelectPortal"),Po="SelectContent",mi=_.forwardRef(he(function(t,a){let o=KC(Po,t.__scopeSelect),{forceMount:r=o.forceMount,...n}=t,l=za(Po,t.__scopeSelect),[s,i]=_.useState();return ge(()=>{i(new DocumentFragment)},[]),(0,Z.jsx)(fa,{present:r||l.open,children:({present:u})=>u?(0,Z.jsx)($C,{...n,ref:a}):(0,Z.jsx)(XC,{...n,fragment:s})})},"SelectContent")),XC=_.forwardRef(he(function(t,a){let{__scopeSelect:o,children:r,fragment:n}=t;return n?ci.createPortal((0,Z.jsx)(Zp,{scope:o,children:(0,Z.jsx)(hs.Slot,{scope:o,children:(0,Z.jsx)("div",{ref:a,children:r})})}),n):null},"SelectContentFragment")),Gt=10,[Zp,Mo]=Do(Po),jC=st("SelectContent.RemoveScroll"),$C=_.forwardRef(he(function(t,a){let{__scopeSelect:o}=t,{position:r=qp.ItemAligned,onCloseAutoFocus:n,onEscapeKeyDown:l,onPointerDownOutside:s,side:i,sideOffset:u,align:c,alignOffset:d,arrowPadding:f,collisionBoundary:m,collisionPadding:h,sticky:p,hideWhenDetached:g,avoidCollisions:x,...L}=t,C=za(Po,o),[v,y]=_.useState(null),[b,S]=_.useState(null),R=ie(a,y),[I,w]=_.useState(null),[P,O]=_.useState(null),V=gs(o),[A,N]=_.useState(!1),H=_.useRef(!1),j=_.useRef(!1),U=_.useRef(!1);_.useEffect(()=>{if(v)return tr(v)},[v]),Oa();let X=_.useCallback(B=>{let[J,...le]=V().map(Q=>Q.ref.current),[M]=le.slice(-1),F=document.activeElement;for(let Q of B)if(Q===F||(Q?.scrollIntoView({block:"nearest"}),Q===J&&b&&(b.scrollTop=0),Q===M&&b&&(b.scrollTop=b.scrollHeight),Q?.focus(),document.activeElement!==F))return},[V,b]),G=_.useCallback(()=>X([I,v]),[X,I,v]);_.useEffect(()=>{A&&G()},[A,G]);let{onOpenChange:te,triggerPointerDownPosRef:ee}=C;_.useEffect(()=>{if(v){let B={x:0,y:0},J=he(M=>{B={x:Math.abs(Math.round(M.pageX)-(ee.current?.x??0)),y:Math.abs(Math.round(M.pageY)-(ee.current?.y??0))}},"handlePointerMove"),le=he(M=>{B.x<=10&&B.y<=10?M.preventDefault():M.composedPath().includes(v)||te(!1),document.removeEventListener("pointermove",J),ee.current=null},"handlePointerUp");return ee.current!==null&&(document.addEventListener("pointermove",J),document.addEventListener("pointerup",le,{capture:!0,once:!0})),()=>{document.removeEventListener("pointermove",J),document.removeEventListener("pointerup",le,{capture:!0})}}},[v,te,ee]),_.useEffect(()=>{let B=he(()=>te(!1),"close");return window.addEventListener("blur",B),window.addEventListener("resize",B),()=>{window.removeEventListener("blur",B),window.removeEventListener("resize",B)}},[te]);let[ce,Re]=vi(B=>{let J=V().filter(F=>!F.disabled),le=J.find(F=>F.ref.current===document.activeElement),M=Ii(J,B,le);M&&setTimeout(()=>M.ref.current?.focus())}),Ce=_.useCallback((B,J,le)=>{let M=!j.current;M&&(j.current=!0);let F=!H.current&&!le;C.value!==void 0&&C.value===J||F?(w(B),F&&(H.current=!0)):M&&w(B)},[C.value]),q=_.useCallback(()=>v?.focus(),[v]),Le=_.useCallback((B,J,le)=>{if(!B)return;let M=!U.current;M&&(U.current=!0);let F=!H.current&&!le;(C.value!==void 0&&C.value===J||F||M)&&O(B)},[C.value]),ve=r===qp.Popper?Wp:YC,xe=ve===Wp?{side:i,sideOffset:u,align:c,alignOffset:d,arrowPadding:f,collisionBoundary:m,collisionPadding:h,sticky:p,hideWhenDetached:g,avoidCollisions:x}:{};return(0,Z.jsx)(Zp,{scope:o,content:v,viewport:b,onViewportChange:S,itemRefCallback:Ce,selectedItem:I,onItemLeave:q,itemTextRefCallback:Le,focusSelectedItem:G,selectedItemText:P,position:r,isPositioned:A,searchRef:ce,children:(0,Z.jsx)(uo,{as:jC,allowPinchZoom:!0,children:(0,Z.jsx)(Xo,{asChild:!0,trapped:C.open,onMountAutoFocus:B=>{B.preventDefault()},onUnmountAutoFocus:Y(n,B=>{C.trigger?.focus({preventScroll:!0}),B.preventDefault()}),children:(0,Z.jsx)(Ko,{asChild:!0,disableOutsidePointerEvents:!0,onEscapeKeyDown:l,onPointerDownOutside:s,onFocusOutside:B=>B.preventDefault(),onDismiss:()=>C.onOpenChange(!1),children:(0,Z.jsx)(ve,{role:"listbox",id:C.contentId,"data-state":C.open?"open":"closed",dir:C.dir,onContextMenu:B=>B.preventDefault(),...L,...xe,onPlaced:()=>N(!0),ref:R,style:{display:"flex",flexDirection:"column",outline:"none",...L.style},onKeyDown:Y(L.onKeyDown,B=>{let J=B.ctrlKey||B.altKey||B.metaKey;if(B.key==="Tab"&&B.preventDefault(),!J&&B.key.length===1&&Re(B.key),["ArrowUp","ArrowDown","Home","End"].includes(B.key)){let M=V().filter(F=>!F.disabled).map(F=>F.ref.current);if(["ArrowUp","End"].includes(B.key)&&(M=M.slice().reverse()),["ArrowUp","ArrowDown"].includes(B.key)){let F=B.target,Q=M.indexOf(F);M=M.slice(Q+1)}setTimeout(()=>X(M)),B.preventDefault()}})})})})})})},"SelectContentImpl")),YC=_.forwardRef(he(function(t,a){let{__scopeSelect:o,onPlaced:r,...n}=t,l=za(Po,o),s=Mo(Po,o),[i,u]=_.useState(null),[c,d]=_.useState(null),f=ie(a,d),m=gs(o),h=_.useRef(!1),p=_.useRef(!0),{viewport:g,selectedItem:x,selectedItemText:L,focusSelectedItem:C}=s,v=_.useCallback(()=>{if(l.trigger&&l.valueNode&&i&&c&&g&&x&&L){let R=l.trigger.getBoundingClientRect(),I=c.getBoundingClientRect(),w=l.valueNode.getBoundingClientRect(),P=L.getBoundingClientRect();if(l.dir!==FC.RTL){let le=P.left-I.left,M=w.left-le,F=R.left-M,Q=R.width+F,Pt=Math.max(Q,I.width),wa=window.innerWidth-Gt,Sa=ps(M,[Gt,Math.max(Gt,wa-Pt)]);i.style.minWidth=Q+"px",i.style.left=Sa+"px"}else{let le=I.right-P.right,M=window.innerWidth-w.right-le,F=window.innerWidth-R.right-M,Q=R.width+F,Pt=Math.max(Q,I.width),wa=window.innerWidth-Gt,Sa=ps(M,[Gt,Math.max(Gt,wa-Pt)]);i.style.minWidth=Q+"px",i.style.right=Sa+"px"}let O=m(),V=window.innerHeight-Gt*2,A=g.scrollHeight,N=window.getComputedStyle(c),H=parseInt(N.borderTopWidth,10),j=parseInt(N.paddingTop,10),U=parseInt(N.borderBottomWidth,10),X=parseInt(N.paddingBottom,10),G=H+j+A+X+U,te=Math.min(x.offsetHeight*5,G),ee=window.getComputedStyle(g),ce=parseInt(ee.paddingTop,10),Re=parseInt(ee.paddingBottom,10),Ce=R.top+R.height/2-Gt,q=V-Ce,Le=x.offsetHeight/2,ve=x.offsetTop+Le,xe=H+j+ve,B=G-xe;if(xe<=Ce){let le=O.length>0&&x===O[O.length-1].ref.current;i.style.bottom="0px";let M=c.clientHeight-g.offsetTop-g.offsetHeight,F=Math.max(q,Le+(le?Re:0)+M+U),Q=xe+F;i.style.height=Q+"px"}else{let le=O.length>0&&x===O[0].ref.current;i.style.top="0px";let F=Math.max(Ce,H+g.offsetTop+(le?ce:0)+Le)+B;i.style.height=F+"px",g.scrollTop=xe-Ce+g.offsetTop}i.style.margin=`${Gt}px 0`,i.style.minHeight=te+"px",i.style.maxHeight=V+"px",r?.(),requestAnimationFrame(()=>h.current=!0)}},[m,l.trigger,l.valueNode,i,c,g,x,L,l.dir,r]);ge(()=>v(),[v]);let[y,b]=_.useState();ge(()=>{c&&b(window.getComputedStyle(c).zIndex)},[c]);let S=_.useCallback(R=>{R&&p.current===!0&&(v(),C?.(),p.current=!1)},[v,C]);return(0,Z.jsx)(ZC,{scope:o,contentWrapper:i,shouldExpandOnScrollRef:h,onScrollButtonChange:S,children:(0,Z.jsx)("div",{ref:u,style:{display:"flex",flexDirection:"column",position:"fixed",zIndex:y},children:(0,Z.jsx)(ue.div,{...n,ref:f,style:{boxSizing:"border-box",maxHeight:"100%",...n.style}})})})},"SelectItemAlignedPosition")),Wp=_.forwardRef(he(function(t,a){let{__scopeSelect:o,align:r="start",collisionPadding:n=Gt,...l}=t,s=fi(o);return(0,Z.jsx)(ls,{...s,...l,ref:a,align:r,collisionPadding:n,style:{boxSizing:"border-box",...l.style,"--radix-select-content-transform-origin":"var(--radix-popper-transform-origin)","--radix-select-content-available-width":"var(--radix-popper-available-width)","--radix-select-content-available-height":"var(--radix-popper-available-height)","--radix-select-trigger-width":"var(--radix-popper-anchor-width)","--radix-select-trigger-height":"var(--radix-popper-anchor-height)"}})},"SelectPopperPosition")),[ZC,hi]=Do(Po,{}),zp="SelectViewport",Jp=_.forwardRef(he(function(t,a){let{__scopeSelect:o,nonce:r,...n}=t,l=Mo(zp,o),s=hi(zp,o),i=ie(a,l.onViewportChange),u=_.useRef(0);return(0,Z.jsxs)(Z.Fragment,{children:[(0,Z.jsx)("style",{dangerouslySetInnerHTML:{__html:"[data-radix-select-viewport]{scrollbar-width:none;-ms-overflow-style:none;-webkit-overflow-scrolling:touch;}[data-radix-select-viewport]::-webkit-scrollbar{display:none}"},nonce:r}),(0,Z.jsx)(hs.Slot,{scope:o,children:(0,Z.jsx)(ue.div,{"data-radix-select-viewport":"",role:"presentation",...n,ref:i,style:{position:"relative",flex:1,overflow:"hidden auto",...n.style},onScroll:Y(n.onScroll,c=>{let d=c.currentTarget,{contentWrapper:f,shouldExpandOnScrollRef:m}=s;if(m?.current&&f){let h=Math.abs(u.current-d.scrollTop);if(h>0){let p=window.innerHeight-Gt*2,g=parseFloat(f.style.minHeight),x=parseFloat(f.style.height),L=Math.max(g,x);if(L<p){let C=L+h,v=Math.min(p,C),y=C-v;f.style.height=v+"px",f.style.bottom==="0px"&&(d.scrollTop=y>0?y:0,f.style.justifyContent="flex-end")}}}u.current=d.scrollTop})})})]})},"SelectViewport")),JC="SelectGroup",[Yk,QC]=Do(JC);var eL="SelectLabel",gi=_.forwardRef(he(function(t,a){let{__scopeSelect:o,...r}=t,n=QC(eL,o);return(0,Z.jsx)(ue.div,{id:n.id,...r,ref:a})},"SelectLabel")),di="SelectItem",[tL,Qp]=Do(di),xi=_.forwardRef(he(function(t,a){let{__scopeSelect:o,value:r,disabled:n=!1,textValue:l,...s}=t,i=za(di,o),u=Mo(di,o),c=i.value===r,[d,f]=_.useState(l??""),[m,h]=_.useState(!1),p=Xe(v=>u.itemRefCallback?.(v,r,n)),g=ie(a,p),x=St(),L=_.useRef("touch");function C(v){i.hasConsumerStoppedPropagationRef.current=v.isPropagationStopped(),i.onUserSelect(r),i.onOpenChange(!1)}return he(C,"handleSelect"),(0,Z.jsx)(tL,{scope:o,value:r,disabled:n,textId:x,isSelected:c,onItemTextChange:_.useCallback(v=>{f(y=>y||(v?.textContent??"").trim())},[]),children:(0,Z.jsx)(hs.ItemSlot,{scope:o,value:r,disabled:n,textValue:d,children:(0,Z.jsx)(ue.div,{role:"option","aria-labelledby":x,"data-highlighted":m?"":void 0,"aria-selected":c&&m,"data-state":c?"checked":"unchecked","aria-disabled":n||void 0,"data-disabled":n?"":void 0,tabIndex:n?void 0:-1,...s,ref:g,onFocus:Y(s.onFocus,()=>h(!0)),onBlur:Y(s.onBlur,()=>h(!1)),onClick:Y(s.onClick,v=>{n||L.current!=="mouse"&&C(v)}),onPointerUp:Y(s.onPointerUp,v=>{n||L.current==="mouse"&&C(v)}),onPointerDown:Y(s.onPointerDown,v=>{L.current=v.pointerType}),onPointerMove:Y(s.onPointerMove,v=>{L.current=v.pointerType,n?u.onItemLeave?.():L.current==="mouse"&&v.currentTarget.focus({preventScroll:!0})}),onPointerLeave:Y(s.onPointerLeave,v=>{v.currentTarget===document.activeElement&&u.onItemLeave?.()}),onKeyDown:Y(s.onKeyDown,v=>{n||v.target!==v.currentTarget||u.searchRef?.current!==""&&v.key===" "||(NC.includes(v.key)&&C(v),v.key===" "&&v.preventDefault())})})})})},"SelectItem")),ms="SelectItemText",em=_.forwardRef(he(function(t,a){let{__scopeSelect:o,className:r,style:n,...l}=t,s=za(ms,o),i=Mo(ms,o),u=Qp(ms,o),c=qC(ms,o),[d,f]=_.useState(null),m=Xe(C=>i.itemTextRefCallback?.(C,u.value,u.disabled)),h=ie(a,f,u.onItemTextChange,m),p=d?.textContent,g=_.useMemo(()=>(0,Z.jsx)("option",{value:u.value,disabled:u.disabled,children:p},u.value),[u.disabled,u.value,p]),{onNativeOptionAdd:x,onNativeOptionRemove:L}=c;return ge(()=>(x(g),()=>L(g)),[x,L,g]),(0,Z.jsxs)(Z.Fragment,{children:[(0,Z.jsx)(ue.span,{id:u.textId,...l,ref:h}),u.isSelected&&s.valueNode&&!s.valueNodeHasChildren&&!ln(s.value)?ci.createPortal(l.children,s.valueNode):null]})},"SelectItemText")),aL="SelectItemIndicator",tm=_.forwardRef(he(function(t,a){let{__scopeSelect:o,...r}=t;return Qp(aL,o).isSelected?(0,Z.jsx)(ue.span,{"aria-hidden":!0,...r,ref:a}):null},"SelectItemIndicator")),Vp="SelectScrollUpButton",bi=_.forwardRef(he(function(t,a){let o=Mo(Vp,t.__scopeSelect),r=hi(Vp,t.__scopeSelect),[n,l]=_.useState(!1),s=ie(a,r.onScrollButtonChange);return ge(()=>{if(o.viewport&&o.isPositioned){let u=function(){let d=c.scrollTop>0;l(d)};var i=u;he(u,"handleScroll");let c=o.viewport;return u(),c.addEventListener("scroll",u),()=>c.removeEventListener("scroll",u)}},[o.viewport,o.isPositioned]),n?(0,Z.jsx)(am,{...t,ref:s,onAutoScroll:()=>{let{viewport:i,selectedItem:u}=o;i&&u&&(i.scrollTop=i.scrollTop-u.offsetHeight)}}):null},"SelectScrollUpButton")),Gp="SelectScrollDownButton",Ci=_.forwardRef(he(function(t,a){let o=Mo(Gp,t.__scopeSelect),r=hi(Gp,t.__scopeSelect),[n,l]=_.useState(!1),s=ie(a,r.onScrollButtonChange);return ge(()=>{if(o.viewport&&o.isPositioned){let u=function(){let d=c.scrollHeight-c.clientHeight,f=Math.ceil(c.scrollTop)<d;l(f)};var i=u;he(u,"handleScroll");let c=o.viewport;return u(),c.addEventListener("scroll",u),()=>c.removeEventListener("scroll",u)}},[o.viewport,o.isPositioned]),n?(0,Z.jsx)(am,{...t,ref:s,onAutoScroll:()=>{let{viewport:i,selectedItem:u}=o;i&&u&&(i.scrollTop=i.scrollTop+u.offsetHeight)}}):null},"SelectScrollDownButton")),am=_.forwardRef(he(function(t,a){let{__scopeSelect:o,onAutoScroll:r,...n}=t,l=Mo("SelectScrollButton",o),s=_.useRef(null),i=gs(o),u=_.useCallback(()=>{s.current!==null&&(window.clearInterval(s.current),s.current=null)},[]);return _.useEffect(()=>()=>u(),[u]),ge(()=>{i().find(d=>d.ref.current===document.activeElement)?.ref.current?.scrollIntoView({block:"nearest"})},[i]),(0,Z.jsx)(ue.div,{"aria-hidden":!0,...n,ref:a,style:{flexShrink:0,...n.style},onPointerDown:Y(n.onPointerDown,()=>{s.current===null&&(s.current=window.setInterval(r,50))}),onPointerMove:Y(n.onPointerMove,()=>{l.onItemLeave?.(),s.current===null&&(s.current=window.setInterval(r,50))}),onPointerLeave:Y(n.onPointerLeave,()=>{u()})})},"SelectScrollButtonImpl")),Li=_.forwardRef(he(function(t,a){let{__scopeSelect:o,...r}=t;return(0,Z.jsx)(ue.div,{"aria-hidden":!0,...r,ref:a})},"SelectSeparator"));var oL="SelectBubbleInput",rL=_.forwardRef(he(function({__scopeSelect:t,...a},o){let r=za(oL,t),{value:n,onValueChange:l,required:s,disabled:i,name:u,autoComplete:c,form:d,userSelection:f}=r,{nativeOptions:m,nativeSelectKey:h}=r,p=_.useRef(null),g=ie(o,p),x=n??"",L=_.useRef(x),C=_.useRef(f),v=_.useRef(!1),y=Array.from(m).some(b=>(b.props.value??"")==="");return _.useEffect(()=>{let b=p.current;if(!b)return;let S=window.HTMLSelectElement.prototype,I=Object.getOwnPropertyDescriptor(S,"value").set,w=f!==null&&f!==C.current;C.current=f;let P=L.current!==x;L.current=x;let O=w&&P;if(w&&!P&&f.value!==x&&!f.hasConsumerStoppedPropagation&&I){v.current=!0;try{I.call(b,f.value),b.dispatchEvent(new Event("change",{bubbles:!0}))}finally{v.current=!1,I.call(b,x)}return}let V=O&&!f.hasConsumerStoppedPropagation;if(P&&I){let A=new Event("change",{bubbles:V});I.call(b,x),b.dispatchEvent(A)}},[x,f]),(0,Z.jsxs)(ue.select,{"aria-hidden":!0,required:s,tabIndex:-1,name:u,autoComplete:c,disabled:i,form:d,onChange:b=>{v.current||l(b.target.value)},...a,style:{...Up,...a.style},ref:g,defaultValue:x,children:[ln(n)&&!y?(0,Z.jsx)("option",{value:""}):null,Array.from(m)]},h)},"SelectBubbleInput"));function om(e){return typeof e=="function"}he(om,"isFunction");function ln(e){return e===""||e===void 0}he(ln,"shouldShowPlaceholder");function vi(e){let t=Xe(e),a=_.useRef(""),o=_.useRef(0),r=_.useCallback(l=>{let s=a.current+l;t(s);function i(u){a.current=u,window.clearTimeout(o.current),u!==""&&(o.current=window.setTimeout(()=>i(""),1e3))}he(i,"updateSearch"),i(s)},[t]),n=_.useCallback(()=>{a.current="",window.clearTimeout(o.current)},[]);return _.useEffect(()=>()=>window.clearTimeout(o.current),[]),[a,r,n]}he(vi,"useTypeaheadSearch");function Ii(e,t,a){let r=t.length>1&&Array.from(t).every(u=>u===t[0])?t[0]:t,n=a?e.indexOf(a):-1,l=rm(e,Math.max(n,0));r.length===1&&(l=l.filter(u=>u!==a));let i=l.find(u=>u.textValue.toLowerCase().startsWith(r.toLowerCase()));return i!==a?i:void 0}he(Ii,"findNextItem");function rm(e,t){return e.map((a,o)=>e[(t+o)%e.length])}he(rm,"wrapArray");var Be=require("react/jsx-runtime"),sa=Xp;var la=jp,Kt=Va.forwardRef(({className:e,children:t,...a},o)=>(0,Be.jsxs)(pi,{ref:o,className:se("kanban-select-trigger",e),...a,children:[t,(0,Be.jsx)($p,{asChild:!0,children:(0,Be.jsx)(No,{className:"kanban-select-icon"})})]}));Kt.displayName=pi.displayName;var nm=Va.forwardRef(({className:e,...t},a)=>(0,Be.jsx)(bi,{ref:a,className:se("kanban-select-scroll-button",e),...t,children:(0,Be.jsx)(br,{className:"kanban-select-scroll-icon"})}));nm.displayName=bi.displayName;var sm=Va.forwardRef(({className:e,...t},a)=>(0,Be.jsx)(Ci,{ref:a,className:se("kanban-select-scroll-button",e),...t,children:(0,Be.jsx)(No,{className:"kanban-select-scroll-icon"})}));sm.displayName=Ci.displayName;var Xt=Va.forwardRef(({className:e,children:t,position:a="popper",...o},r)=>(0,Be.jsx)(Yp,{children:(0,Be.jsxs)(mi,{ref:r,className:se("kanban-portal kanban-select-content",a==="popper"&&"kanban-select-content--popper",e),position:a,...o,children:[(0,Be.jsx)(nm,{}),(0,Be.jsx)(Jp,{className:se("kanban-select-viewport",a==="popper"&&"kanban-select-viewport--popper"),children:t}),(0,Be.jsx)(sm,{})]})}));Xt.displayName=mi.displayName;var sL=Va.forwardRef(({className:e,...t},a)=>(0,Be.jsx)(gi,{ref:a,className:se("kanban-select-label",e),...t}));sL.displayName=gi.displayName;var Ze=Va.forwardRef(({className:e,children:t,...a},o)=>(0,Be.jsxs)(xi,{ref:o,className:se("kanban-select-item",e),...a,children:[(0,Be.jsx)("span",{className:"kanban-select-item-indicator",children:(0,Be.jsx)(tm,{children:(0,Be.jsx)(ft,{className:"kanban-select-check"})})}),(0,Be.jsx)(em,{children:t})]}));Ze.displayName=xi.displayName;var lL=Va.forwardRef(({className:e,...t},a)=>(0,Be.jsx)(Li,{ref:a,className:se("kanban-select-separator",e),...t}));lL.displayName=Li.displayName;var lm=$(require("react"),1);var im=require("react/jsx-runtime"),xs=lm.forwardRef(({className:e,...t},a)=>(0,im.jsx)("textarea",{className:se("kanban-textarea",e),ref:a,...t}));xs.displayName="Textarea";var jt={high:{label:"P0",color:"var(--dsw-alias-state-error-primary)"},medium:{label:"P1",color:"var(--dsw-alias-state-warn-primary)"},low:{label:"P2",color:"var(--dsw-alias-state-business-primary)"}},bs=["high","medium","low"],um="var(--dsw-alias-label-tertiary)";function dm(e,t){return t?e.find(a=>a.name===t)?.color??um:um}var Cs=require("react");function Ao(e=new Date,t=0){let a=new Date(e);return a.setDate(a.getDate()+t),`${String(a.getFullYear()).padStart(4,"0")}-${String(a.getMonth()+1).padStart(2,"0")}-${String(a.getDate()).padStart(2,"0")}`}function wi(e,t){let a=o=>{let[r,n,l]=o.split("-").map(Number),s=new Date(0);return s.setUTCFullYear(r,n-1,l),s.getTime()/864e5};return a(t)-a(e)}function cm(e,t,a,o){return t?!e.dueDate||e.columnId===a?!1:t==="today"?e.dueDate===o:e.dueDate<o:!0}function fm(e,t,a){let[o,r,n]=e.split("-");return a(o===t.slice(0,4)?"shortDate":"yearDate").replace("{year}",o).replace("{month}",String(Number(r))).replace("{day}",String(Number(n)))}function pm(){let[e,t]=(0,Cs.useState)(()=>Ao());return(0,Cs.useEffect)(()=>{let a,o=()=>{clearTimeout(a);let r=new Date;t(Ao(r));let n=new Date(r);n.setHours(24,0,0,0),a=setTimeout(o,n.getTime()-r.getTime()+100)};return o(),window.addEventListener("focus",o),document.addEventListener("visibilitychange",o),()=>{clearTimeout(a),window.removeEventListener("focus",o),document.removeEventListener("visibilitychange",o)}},[]),e}var Je=(e,t)=>e.replace(/\{(\w+)\}/g,(a,o)=>t[o]??""),Si=e=>e==="high"||e==="medium"||e==="low"?jt[e].label:"";function mm(e,t){let a=e.meta||{},o=t("noValue"),r=e.from??null,n=e.to??null;switch(e.type){case"card_created":{let l=a.label??o,s=a.priority&&Si(a.priority)||o;return Je(t("actCreated"),{column:a.column??"",label:l,priority:s})}case"card_moved":return Je(t("actMoved"),{from:r??o,to:n??o});case"card_label_changed":return r==null&&n!=null?Je(t("actLabelSet"),{to:n}):r!=null&&n==null?Je(t("actLabelCleared"),{from:r}):Je(t("actLabel"),{from:r??o,to:n??o});case"card_priority_changed":{let l=r?Si(r)||r:o,s=n?Si(n)||n:o;return r==null&&n!=null?Je(t("actPrioritySet"),{to:s}):r!=null&&n==null?Je(t("actPriorityCleared"),{from:l}):Je(t("actPriority"),{from:l,to:s})}case"card_due_date_changed":return Je(t("actDueDate"),{from:r??o,to:n??o});case"board_completed_column_changed":return Je(t("actCompletedColumn"),{from:a.fromColumn??r??o,to:a.toColumn??n??o});case"card_title_changed":return Je(t("actTitle"),{from:r??o,to:n??o});case"card_note_changed":return t("actNote");case"card_comment_added":return t("actComment");case"card_deleted":return t("actDeleted");case"column_added":return Je(t("actColumnAdded"),{column:a.column??""});case"column_renamed":return Je(t("actColumnRenamed"),{from:r??o,to:n??o});case"column_deleted":return Je(t("actColumnDeleted"),{column:a.column??""});case"label_added":return Je(t("actLabelAdded"),{label:a.label??""});case"label_renamed":return Je(t("actLabelRenamed"),{from:r??o,to:n??o});case"label_deleted":return Je(t("actLabelDeleted"),{label:a.label??""});case"label_color_changed":return Je(t("actLabelColor"),{label:a.label??"",from:r??o,to:n??o});default:return e.type}}var Ls=e=>String(e).padStart(2,"0");function ir(e){let t=new Date(e);return Number.isNaN(t.getTime())?e:`${t.getFullYear()}-${Ls(t.getMonth()+1)}-${Ls(t.getDate())} ${Ls(t.getHours())}:${Ls(t.getMinutes())}`}function un(e,t={},a="default"){let s=a;if(!s||s==="default")s=(typeof window<"u"&&window.__kanbanWsId)||"";if(!s||s==="default"){let k=typeof window<"u"?window.__kanbanWsP:void 0;k||(k=window.__kanbanWsP=La("workspaces",{}).then(o=>{let c=Array.isArray(o&&o.workspaces)?o.workspaces:[];return window.__kanbanWsId=c.length?String(c[0].id):""}).catch(()=>""));return k.then(v=>un(e,t,v||a))}return fetch("/api/kanban",{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify({method:e,args:{...t,workspaceId:a},sessionId:window.__kanbanSessionId||null})}).then(async o=>{let r;try{r=await o.json()}catch{throw new Error(`Kanban request failed (${o.status})`)}if(!o.ok||r.error)throw new Error(r.error||`Kanban request failed (${o.status})`);return r})}function vs(e){return La("getConfig",{workspaceId:e})}function La(e,t={}){return fetch("/api/kanban-orch",{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify({method:e,args:t})}).then(async a=>{let o=await a.json().catch(()=>null);if(!a.ok||o&&o.error)throw new Error(o&&o.error||`Orchestrator request failed (${a.status})`);return o})}var va=require("react/jsx-runtime");function hm({activities:e}){let t=De();if(e.length===0)return(0,va.jsx)("p",{className:"kanban-muted-small",children:t("activityEmpty")});let a=[...e].reverse();return(0,va.jsx)("ol",{className:"kanban-activity-list",children:a.map(o=>{let r=o.source==="agent",n=t(r?"actorAgent":"actorHuman");return(0,va.jsxs)("li",{className:"kanban-activity-item",children:[(0,va.jsx)("span",{className:`kanban-activity-dot ${r?"is-agent":"is-human"}`,"aria-hidden":"true"}),(0,va.jsxs)("p",{className:"kanban-activity-description",children:[(0,va.jsx)("span",{className:`kanban-activity-actor ${r?"is-agent":"is-human"}`,children:n})," ",mm(o,t)]}),(0,va.jsx)("time",{className:"kanban-activity-time kanban-tabular",dateTime:o.ts,title:ir(o.ts),children:ir(o.ts)})]},o.id)})})}var T=require("react/jsx-runtime");function iL(e){return e==null?"":e<1024?e+" B":e<1024*1024?(e/1024).toFixed(1)+" KB":(e/1024/1024).toFixed(1)+" MB"}function xm({open:e,error:t,card:a,labels:o,comments:r,activities:n,kids:D=[],workspaceId:l,sessionLink:s,onOpenChange:i,onSave:u,onAddComment:c,onDelete:d,onChatWithAgent:f,onOpenSession:m}){let h=De(),p=(0,Me.useId)(),g=(0,Me.useRef)(null),x=(0,Me.useRef)(null),L=(0,Me.useRef)(null),C=(0,Me.useRef)(null),[v,y]=(0,Me.useState)(!a),[b,S]=(0,Me.useState)({id:"",title:"",note:"",label:"",priority:"",dueDate:"",assignee:"",parent:"",milestone:false}),[R,I]=(0,Me.useState)(""),[w,P]=(0,Me.useState)(!1),O=(0,Me.useRef)(!1),[V,A]=(0,Me.useState)(""),[N,H]=(0,Me.useState)(null),j=(0,Me.useRef)(null),U=(0,Me.useRef)(b);(0,Me.useEffect)(()=>{if(e){let M={id:a?.id??"",title:a?.title??"",note:a?.note??"",label:a?.label??"",priority:a?.priority??"",dueDate:a?.dueDate??"",assignee:a?.assignee??"",parent:a?.parent??"",milestone:a?.milestone===true};U.current=M,S(M),I(""),A(""),H(null),y(!a)}},[e,a]),(0,Me.useEffect)(()=>{N&&j.current?.focus()},[N]);let[X,G]=(0,Me.useState)([]),[te,ee]=(0,Me.useState)(null),[ce,Re]=(0,Me.useState)(null);(0,Me.useEffect)(()=>{if(G([]),ee(null),Re(null),!e||!a)return;let M=!0;return La("files",{workspaceId:l,cardId:a.id}).then(F=>{M&&(G(Array.isArray(F&&F.groups)?F.groups:[]),ee(F&&F.link?F.link:null))}).catch(()=>{}),()=>{M=!1}},[e,a?.id,l]);let Ce=s??te,q=M=>{Re({path:M.path,content:"",truncated:!1,loading:!0}),La("filePreview",{workspaceId:l,path:M.path}).then(F=>Re({path:M.path,content:F&&typeof F.content=="string"?F.content:String(F&&F.error||""),truncated:!!(F&&F.truncated),loading:!1})).catch(F=>Re({path:M.path,content:String(F&&F.message||F),truncated:!1,loading:!1}))},Le=!!R.trim()||Object.keys(b).some(M=>b[M]!==U.current[M]),ve=M=>{if(!O.current){if(!M&&N){H(null);return}if(!M&&Le){H("discard");return}i(M)}},xe=async M=>{if(O.current)return!1;O.current=!0,P(!0),A("");try{let F=await M();return F===!1&&A(h("actionRetry")),F!==!1}catch(F){return A(h("actionFailed")+String(F instanceof Error?F.message:F)),!1}finally{O.current=!1,P(!1)}},B=async M=>{if(L.current?.reportValidity()){if(R.trim()){H(M);return}await xe(()=>f(b,M))&&i(!1)}},J=M=>S(F=>({...F,...M})),le=async()=>{let M=R.trim();!a||!M||M.length>2e3||await xe(()=>c(a.id,M))&&I("")};return(0,T.jsx)(Fa,{open:e,onOpenChange:ve,children:(0,T.jsxs)(Ol,{"aria-describedby":void 0,onOpenAutoFocus:M=>{g.current=document.activeElement instanceof HTMLElement?document.activeElement:null,M.preventDefault(),x.current?.focus()},onCloseAutoFocus:M=>{g.current?.isConnected&&(M.preventDefault(),g.current.focus())},children:[(0,T.jsxs)(ma,{children:[(0,T.jsx)(xa,{children:h(a?"taskDetails":"addCard")}),a&&(0,T.jsxs)("span",{className:"kanban-field-id",children:[h("fieldId"),": ",a.id]})]}),D&&D.length>0&&(0,T.jsx)("div",{className:"kanban-card-children",children:(0,T.jsxs)("span",{className:"kanban-card-children-list",children:[(0,T.jsx)("span",{className:"kanban-field-label",children:h("fieldChildren")||"Children"}),D.map(M=>(0,T.jsxs)("span",{className:"kanban-card-badge kanban-card-parent",children:[(0,T.jsx)("span",{"aria-hidden":"true",children:"\u21b3"}),M.title||M.id]},M.id))]})}),(0,T.jsxs)(ha,{className:"kanban-form-stack",children:[(t||V)&&(0,T.jsx)("p",{className:"kanban-dialog-error",role:"alert",children:t||V}),(0,T.jsxs)("div",{className:"kanban-form-field",children:[(0,T.jsx)(Ye,{htmlFor:`${p}-title`,className:"kanban-field-label",children:h("fieldTitle")}),(0,T.jsx)(gt,{ref:x,id:`${p}-title`,value:b.title,placeholder:h("titlePlaceholder"),maxLength:120,disabled:w||!!N,onChange:M=>J({title:M.target.value})})]}),(0,T.jsxs)("div",{className:"kanban-form-row",children:[(0,T.jsxs)("div",{className:"kanban-form-field",children:[(0,T.jsx)(Ye,{htmlFor:`${p}-label`,children:h("fieldLabel")}),(0,T.jsxs)(sa,{disabled:w||!!N,value:b.label||"__none__",onValueChange:M=>J({label:M==="__none__"?"":M}),children:[(0,T.jsx)(Kt,{id:`${p}-label`,children:(0,T.jsx)(la,{placeholder:h("noLabel")})}),(0,T.jsxs)(Xt,{children:[(0,T.jsx)(Ze,{value:"__none__",children:h("noLabel")}),o.map(M=>(0,T.jsx)(Ze,{value:M.name,children:M.name},M.name))]})]})]}),(0,T.jsxs)("div",{className:"kanban-form-field",children:[(0,T.jsx)(Ye,{htmlFor:`${p}-priority`,children:h("fieldPriority")}),(0,T.jsxs)(sa,{disabled:w||!!N,value:b.priority||"__none__",onValueChange:M=>J({priority:M==="__none__"?"":M}),children:[(0,T.jsx)(Kt,{id:`${p}-priority`,children:(0,T.jsx)(la,{placeholder:h("noPriority")})}),(0,T.jsxs)(Xt,{children:[(0,T.jsx)(Ze,{value:"__none__",children:h("noPriority")}),bs.map(M=>{let F=jt[M];return(0,T.jsx)(Ze,{value:M,children:(0,T.jsxs)("span",{className:"kanban-inline-priority",children:[(0,T.jsx)("span",{className:"kanban-priority-dot",style:{background:F.color}}),F.label]})},M)})]})]})]})]}),(0,T.jsxs)("div",{className:"kanban-form-row",children:[(0,T.jsxs)("div",{className:"kanban-form-field",children:[(0,T.jsx)(Ye,{htmlFor:`${p}-assignee`,children:h("fieldAssignee")||"Assignee"}),(0,T.jsxs)("select",{id:`${p}-assignee`,className:"kanban-input kanban-assignee-select",value:b.assignee||"",disabled:w||!!N,title:h("fieldAssignee")||"Assignee",onChange:M=>J({assignee:M.target.value}),children:[(0,T.jsx)("option",{value:"",children:h("noAssignee")||"no role",},""),(window.__kanbanRoles||[]).map(M=>(0,T.jsx)("option",{value:M,children:M},M)),b.assignee&&!(window.__kanbanRoles||[]).includes(b.assignee)?(0,T.jsx)("option",{value:b.assignee,children:b.assignee},b.assignee):null].filter(Boolean)})]}),(0,T.jsxs)("div",{className:"kanban-form-field",children:[(0,T.jsx)(Ye,{htmlFor:`${p}-parent`,children:h("fieldParent")||"Parent task"}),(0,T.jsx)(gt,{id:`${p}-parent`,value:b.parent,placeholder:h("fieldId")||"Task ID",maxLength:32,disabled:w||!!N,onChange:M=>J({parent:M.target.value})})]}),]}),(0,T.jsxs)("div",{className:"kanban-form-field",children:[(0,T.jsxs)("label",{className:"kanban-field-label",htmlFor:`${p}-milestone`,children:[(0,T.jsx)("input",{type:"checkbox",id:`${p}-milestone`,checked:b.milestone,disabled:w||!!N,onChange:M=>J({milestone:M.target.checked}),className:"kanban-milestone-check"})," ",h("fieldMilestone")||"Milestone"]}),(0,T.jsx)("p",{className:"kanban-muted-small",children:h("milestoneHint")||"closes only when its children close"})]}),(0,T.jsxs)("div",{className:"kanban-form-field",children:[(0,T.jsx)(Ye,{htmlFor:`${p}-due-date`,children:h("fieldDueDate")}),(0,T.jsxs)("div",{className:"kanban-due-date-controls",children:[(0,T.jsx)(gt,{ref:L,id:`${p}-due-date`,type:"date",min:"0001-01-01",max:"9999-12-31",value:b.dueDate,disabled:w||!!N,onChange:M=>J({dueDate:M.target.value})}),(0,T.jsxs)("div",{className:"kanban-date-shortcuts",children:[[["today",0],["tomorrow",1],["nextWeek",7]].map(([M,F])=>(0,T.jsx)(de,{type:"button",variant:"ghost",size:"sm",disabled:w||!!N,onClick:()=>J({dueDate:Ao(new Date,F)}),children:h(M)},M)),(0,T.jsx)(de,{type:"button",variant:"ghost",size:"sm",disabled:w||!!N||!b.dueDate,onClick:()=>J({dueDate:""}),children:h("clearDate")})]})]})]}),(0,T.jsxs)("div",{className:"kanban-form-field",children:[(0,T.jsxs)("div",{className:"kanban-field-label",children:[(0,T.jsx)(Ye,{id:`${p}-note-label`,htmlFor:v?`${p}-note`:void 0,children:h("fieldNote")}),(0,T.jsxs)(de,{variant:"ghost",size:"sm",disabled:w||!!N,"aria-controls":`${p}-description`,onClick:()=>{y(!v),v||requestAnimationFrame(()=>C.current?.focus())},children:[v?(0,T.jsx)(ft,{}):(0,T.jsx)(wr,{}),h(v?"finishEditingNote":"editNote")]})]}),(0,T.jsx)("div",{id:`${p}-description`,children:v?(0,T.jsxs)(T.Fragment,{children:[(0,T.jsx)(xs,{ref:C,id:`${p}-note`,className:"kanban-markdown-source",value:b.note,placeholder:h("notePlaceholder"),rows:12,maxLength:2e3,disabled:w||!!N,onChange:M=>J({note:M.target.value})}),(0,T.jsxs)("p",{className:"kanban-note-hint",children:[h("markdownEditHint")," ",(0,T.jsxs)("span",{className:"kanban-tabular",children:[b.note.length,"/2000"]})]})]}):(0,T.jsx)("div",{className:"kanban-markdown-preview",role:"region","aria-labelledby":`${p}-note-label`,children:b.note.trim()?(0,T.jsx)(gm.MarkdownText,{text:b.note,labels:{code:{copyLabel:h("copyCode"),copiedLabel:h("copiedCode")},footnotes:h("footnotes")}}):(0,T.jsx)("p",{className:"kanban-muted-small",children:h("emptyNote")})})})]}),a&&(0,T.jsxs)("div",{className:"kanban-comments-box",children:[(0,T.jsxs)(Ye,{htmlFor:`${p}-comment`,children:[h("commentsTitle")," ",(0,T.jsxs)("span",{className:"kanban-tabular",children:["(",r.length,")"]})]}),(0,T.jsx)("div",{className:"kanban-comments-scroll","aria-live":"polite",children:r.length===0?(0,T.jsx)("p",{className:"kanban-muted-small",children:h("commentEmpty")}):(0,T.jsx)("ol",{className:"kanban-comment-list",children:r.map(M=>{let F=M.source==="agent";return(0,T.jsxs)("li",{className:"kanban-comment-item",children:[(0,T.jsxs)("div",{className:"kanban-comment-meta",children:[(0,T.jsx)("span",{className:`kanban-activity-actor ${F?"is-agent":"is-human"}`,children:h(F?"actorAgent":"actorHuman")}),(0,T.jsx)("time",{className:"kanban-activity-time kanban-tabular",dateTime:M.createdAt,children:ir(M.createdAt)})]}),(0,T.jsx)("p",{className:"kanban-comment-content",children:M.content})]},M.id)})})}),(0,T.jsxs)("div",{className:"kanban-comment-composer",children:[(0,T.jsx)(xs,{id:`${p}-comment`,value:R,placeholder:h("commentPlaceholder"),rows:3,maxLength:2e3,disabled:w||!!N,onChange:M=>I(M.target.value),onKeyDown:M=>{(M.metaKey||M.ctrlKey)&&M.key==="Enter"&&(M.preventDefault(),le())}}),(0,T.jsxs)(de,{type:"button",variant:"outline",disabled:w||!!N||!R.trim(),onClick:()=>{le()},children:[(0,T.jsx)(yr,{className:"kanban-icon"}),h("sendComment")]})]})]}),a&&(0,T.jsxs)("div",{className:"kanban-attach-box",children:[(0,T.jsxs)(Ye,{className:"kanban-muted-small",children:[h("attachTitle")," ",(0,T.jsxs)("span",{className:"kanban-tabular",children:["(",X.reduce((M,F)=>M+F.files.length,0),")"]})]}),X.length===0?(0,T.jsx)("p",{className:"kanban-muted-small",children:h("attachEmpty")}):(0,T.jsx)("div",{className:"kanban-attach-groups",children:X.map(M=>(0,T.jsxs)("div",{className:"kanban-attach-group",children:[(0,T.jsx)("div",{className:"kanban-attach-creator",children:M.creator}),(0,T.jsx)("ul",{className:"kanban-attach-list",children:M.files.map(F=>(0,T.jsx)("li",{children:(0,T.jsxs)("button",{type:"button",className:`kanban-attach-file${ce&&ce.path===F.path?" is-active":""}`,onClick:()=>q(F),title:F.path,children:[(0,T.jsx)(Lr,{className:"kanban-tiny-icon"}),(0,T.jsx)("span",{className:"kanban-attach-name",children:F.name}),(0,T.jsxs)("span",{className:"kanban-attach-meta kanban-tabular",children:[iL(F.size),F.mtime?" \xB7 "+ir(new Date(F.mtime).toISOString()):""]})]})},M.creator+":"+F.path))})]},M.creator))}),ce&&(0,T.jsxs)("div",{className:"kanban-attach-preview",children:[(0,T.jsxs)("div",{className:"kanban-attach-preview-head",children:[(0,T.jsx)("span",{className:"kanban-attach-name",children:ce.path}),ce.truncated&&(0,T.jsx)("span",{className:"kanban-muted-small",children:h("attachTruncated")}),(0,T.jsx)(de,{variant:"ghost",size:"sm",onClick:()=>{try{navigator.clipboard.writeText(ce.path)}catch{}},children:h("attachCopyPath")})]}),ce.loading?(0,T.jsx)("p",{className:"kanban-muted-small",children:h("attachLoading")}):(0,T.jsx)("pre",{className:"kanban-attach-preview-body",children:ce.content})]})]}),a&&(0,T.jsxs)("div",{className:"kanban-activity-box",children:[(0,T.jsx)(Ye,{className:"kanban-muted-small",children:h("activityTitle")}),(0,T.jsx)("div",{className:"kanban-activity-scroll",children:(0,T.jsx)(hm,{activities:n})})]})]}),(0,T.jsx)(ga,{children:N?(0,T.jsxs)("div",{className:"kanban-dialog-confirm",children:[(0,T.jsx)("p",{role:"alert",children:h(N==="discard"?"discardChangesDesc":N==="delete"?"deleteCardDesc":"discardCommentDesc")}),(0,T.jsxs)("div",{className:"kanban-confirm-actions",children:[(0,T.jsx)(de,{ref:j,variant:"outline",disabled:w,onClick:()=>H(null),children:h("cancel")}),(0,T.jsx)(de,{variant:"destructive",disabled:w,onClick:async()=>{if(N==="discard"){i(!1);return}if(N==="delete"){a&&d&&await xe(()=>d(a))&&i(!1);return}await xe(()=>f(b,N))&&i(!1)},children:h(N==="discard"?"discardChanges":N==="delete"?"confirmDelete":"discardAndContinue")})]})]}):(0,T.jsxs)(T.Fragment,{children:[a&&d&&(0,T.jsxs)(de,{variant:"ghost",className:"kanban-dialog-delete",disabled:w,onClick:()=>H("delete"),children:[(0,T.jsx)(Mt,{className:"kanban-icon"}),h("delete")]}),a&&Ce?.sessionId&&m&&(0,T.jsxs)(de,{variant:"outline",className:"kanban-open-session",disabled:w,onClick:()=>{m(Ce.sessionId),i(!1)},children:[(0,T.jsx)(Cr,{className:"kanban-icon"}),h("openTaskDialog")]}),(0,T.jsxs)(ko,{children:[(0,T.jsx)(Ro,{asChild:!0,children:(0,T.jsxs)(de,{variant:"outline",disabled:w||!b.title.trim()&&!b.note.trim(),children:[(0,T.jsx)(Ka,{className:"kanban-icon"}),h("chatWithAgent")]})}),(0,T.jsxs)(Wa,{align:"end",children:[(0,T.jsx)(ht,{onClick:()=>{B("current")},children:h("chatCurrentSession")}),(0,T.jsx)(ht,{onClick:()=>{B("new")},children:h("chatNewSession")})]})]}),(0,T.jsx)(de,{disabled:w||!b.title.trim(),onClick:async()=>{L.current?.reportValidity()&&await xe(()=>u(b))&&(U.current=b,R.trim()||i(!1))},children:h("save")})]})})]})})}var Cm=require("react");var bm=require("react/jsx-runtime");function uL({variant:e,className:t}={}){return se("kanban-badge",`kanban-badge--${e??"default"}`,t)}function yi({className:e,variant:t,...a}){return(0,bm.jsx)("div",{className:uL({variant:t,className:e}),...a})}var To=$(require("react"),1);var Eo=require("react/jsx-runtime"),ki=To.forwardRef(({className:e,...t},a)=>(0,Eo.jsx)("div",{ref:a,className:se("kanban-card",e),...t}));ki.displayName="Card";var dL=To.forwardRef(({className:e,...t},a)=>(0,Eo.jsx)("div",{ref:a,className:se("kanban-card-header",e),...t}));dL.displayName="CardHeader";var cL=To.forwardRef(({className:e,...t},a)=>(0,Eo.jsx)("div",{ref:a,className:se("kanban-ui-card-title",e),...t}));cL.displayName="CardTitle";var fL=To.forwardRef(({className:e,...t},a)=>(0,Eo.jsx)("div",{ref:a,className:se("kanban-card-description",e),...t}));fL.displayName="CardDescription";var Ri=To.forwardRef(({className:e,...t},a)=>(0,Eo.jsx)("div",{ref:a,className:se("kanban-card-content",e),...t}));Ri.displayName="CardContent";var pL=To.forwardRef(({className:e,...t},a)=>(0,Eo.jsx)("div",{ref:a,className:se("kanban-card-footer",e),...t}));pL.displayName="CardFooter";var Ne=require("react/jsx-runtime");function Pi({card:e,labels:t,completed:a=!1,today:o=Ao()}){let r=De(),n=e.priority?jt[e.priority]:null,l=dm(t,e.label),s=a?"completed":e.dueDate===o?"today":e.dueDate&&e.dueDate<o?"overdue":"future",i=e.dueDate?s==="today"?r("dueToday"):s==="overdue"?r("overdueDays").replace("{days}",String(wi(e.dueDate,o))):fm(e.dueDate,o,r):"";return(0,Ne.jsx)(ki,{className:"kanban-card",children:(0,Ne.jsxs)(Ri,{className:"kanban-sortable-card-content",children:[(e.label||n||e.assignee||e.milestone||e.parent)&&(0,Ne.jsxs)("div",{className:"kanban-card-meta",children:[e.label&&(0,Ne.jsxs)(yi,{variant:"secondary",className:"kanban-card-badge",children:[(0,Ne.jsx)("span",{className:"kanban-label-dot",style:{background:l},"aria-hidden":"true"}),e.label]}),n&&(0,Ne.jsxs)(yi,{variant:"secondary",className:"kanban-card-badge",children:[(0,Ne.jsx)("span",{className:"kanban-label-dot",style:{background:n.color},"aria-hidden":"true"}),n.label]}),e.assignee&&(0,Ne.jsxs)(yi,{variant:"secondary",className:"kanban-card-badge kanban-card-assignee",children:[(0,Ne.jsx)("span",{"aria-hidden":"true",title:"assignee",children:"@"}),e.assignee]}),e.milestone&&(0,Ne.jsx)(yi,{variant:"secondary",className:"kanban-card-badge kanban-card-milestone",children:(0,Ne.jsx)("span",{"aria-hidden":"true",title:"milestone",children:"\u25c6"})}),e.parent&&(0,Ne.jsxs)(yi,{variant:"secondary",className:"kanban-card-badge kanban-card-parent",children:[(0,Ne.jsx)("span",{"aria-hidden":"true",title:"parent",children:"\u21b3"}),e.parent]})]}),(0,Ne.jsx)("p",{className:"kanban-card-title",children:e.title}),e.note&&(0,Ne.jsx)("p",{className:"kanban-card-note",children:e.note}),(e.dueDate||e.comments.length>0)&&(0,Ne.jsxs)("div",{className:"kanban-card-status-row",children:[e.dueDate&&(0,Ne.jsxs)("span",{className:`kanban-card-due-date is-${s}`,title:`${r("fieldDueDate")}: ${e.dueDate}${a?` \xB7 ${r("completed")}`:""}`,children:[(0,Ne.jsx)(Ga,{"aria-hidden":"true"}),(0,Ne.jsx)("span",{children:i})]}),e.comments.length>0&&(0,Ne.jsxs)("span",{className:"kanban-card-comment-count",title:`${r("commentsTitle")}: ${e.comments.length}`,"aria-label":`${r("commentsTitle")}: ${e.comments.length}`,children:[(0,Ne.jsx)(Ka,{"aria-hidden":"true"}),(0,Ne.jsx)("span",{className:"kanban-tabular",children:e.comments.length})]})]})]})})}function Lm({card:e,labels:t,completed:a,today:o=Ao(),onOpen:r}){let n=De(),l=(0,Cm.useId)(),{attributes:s,listeners:i,setNodeRef:u,transform:c,transition:d,isDragging:f}=Dn({id:e.id,data:{type:"card",cardId:e.id,columnId:e.columnId}});return(0,Ne.jsxs)("div",{ref:u,style:{transform:vt.Transform.toString(c),transition:d},...s,...i,"aria-label":e.title,"aria-describedby":l,onKeyDown:m=>{m.key==="Enter"&&!f?(m.preventDefault(),r(e)):i?.onKeyDown?.(m)},onClick:m=>{m.currentTarget.focus(),r(e)},className:`kanban-sortable-card${f?" is-dragging":""}`,children:[(0,Ne.jsxs)("span",{id:l,className:"kanban-sr-only",children:[n("cardKeyboardHelp"),e.dueDate&&` ${n("fieldDueDate")}: ${e.dueDate}. ${a?n("completed"):e.dueDate===o?n("dueToday"):e.dueDate<o?n("overdueDays").replace("{days}",String(wi(e.dueDate,o))):""}`]}),(0,Ne.jsx)(Pi,{card:e,labels:t,completed:a,today:o})]})}var Rt=require("react/jsx-runtime");function vm({column:e,cards:t,totalCount:a,filtered:o,labels:r,completed:n,today:l,onAddCard:s,onOpenCard:i}){let{setNodeRef:u,isOver:c}=wn({id:e.id,data:{type:"column"}}),{active:d,over:f}=Wr(),m=De(),h=d?.data.current?.type==="card"&&(c||f?.data.current?.columnId===e.id);return(0,Rt.jsxs)("div",{ref:u,className:`kanban-column${h?" is-over":""}`,children:[(0,Rt.jsxs)("div",{className:"kanban-column-header",children:[(0,Rt.jsx)("h3",{className:"kanban-column-title",children:e.title}),(0,Rt.jsx)("span",{className:"kanban-column-count",children:o?`${t.length} / ${a}`:t.length})]}),(0,Rt.jsxs)("div",{className:"kanban-column-cards",children:[(0,Rt.jsx)(Pn,{items:t.map(p=>p.id),strategy:Rn,children:t.map(p=>(0,Rt.jsx)(Lm,{card:p,labels:r,completed:n,today:l,onOpen:i},p.id))}),t.length===0&&(0,Rt.jsx)("p",{className:"kanban-column-empty",children:m(o?"noMatchingCards":"emptyColumn")})]}),(0,Rt.jsx)("div",{className:"kanban-column-footer",children:(0,Rt.jsxs)(de,{variant:"ghost",size:"sm",className:"kanban-add-card",onClick:()=>s(e),children:[(0,Rt.jsx)(Xa,{className:"kanban-icon"}),m("addCard")]})})]})}var dt=require("react");var re=require("react/jsx-runtime");function mL({column:e,value:t,onValueChange:a,onCommit:o,onDelete:r,canDelete:n,disabled:l}){let{attributes:s,listeners:i,setNodeRef:u,transform:c,transition:d,isDragging:f}=Dn({id:e.id,disabled:l}),m=De();return(0,re.jsxs)("div",{ref:u,style:{transform:vt.Transform.toString(c),transition:d},className:"kanban-editor-row","data-dragging":f||void 0,children:[(0,re.jsx)("button",{...s,...i,className:"kanban-drag-handle",disabled:l,"aria-label":`${m("dragSort")}: ${e.title}`,children:(0,re.jsx)(vr,{className:"kanban-icon"})}),(0,re.jsx)(gt,{className:"kanban-editor-name","aria-label":`${m("columnName")}: ${e.title}`,value:t,disabled:l,maxLength:40,onChange:h=>a(h.target.value),onBlur:o,onKeyDown:h=>{h.key==="Enter"&&h.target.blur()}}),(0,re.jsx)(de,{variant:"ghost",size:"icon",className:"kanban-icon-button kanban-editor-delete","aria-label":`${m("delete")}: ${e.title}`,disabled:l||!n,onClick:r,children:(0,re.jsx)(Mt,{className:"kanban-icon"})})]})}function Im({open:e,error:t,columns:a,completedColumnId:o,onSetCompletedColumn:r,onOpenChange:n,onReorder:l,onRename:s,onDelete:i,onAdd:u}){let c=De(),d=(0,dt.useId)(),f=(0,dt.useId)(),[m,h]=(0,dt.useState)({}),[p,g]=(0,dt.useState)(""),[x,L]=(0,dt.useState)(!1),C=(0,dt.useRef)(!1),[v,y]=(0,dt.useState)(""),[b,S]=(0,dt.useState)(null),R=(0,dt.useRef)(null),I=bn(ro(zo,{activationConstraint:{distance:8}}),ro(Ea,{coordinateGetter:Mn}));(0,dt.useEffect)(()=>{e&&(h(Object.fromEntries(a.map(A=>[A.id,A.title]))),g(""),y(""),S(null))},[e]),(0,dt.useEffect)(()=>{b&&R.current?.focus()},[b]);let w=async A=>{if(C.current)return!1;C.current=!0,L(!0),y("");try{let N=await A();return N===!1&&y(c("actionRetry")),N!==!1}catch(N){return y(c("actionFailed")+String(N instanceof Error?N.message:N)),!1}finally{C.current=!1,L(!1)}},P=async()=>{let A=p.trim();A&&await w(()=>u(A))&&g("")},O=A=>{let N=(m[A]??"").trim(),H=a.find(j=>j.id===A);H&&N&&N!==H.title&&w(()=>s(A,N))},V=A=>{let{active:N,over:H}=A;H&&N.id!==H.id&&w(()=>l(String(N.id),String(H.id)))};return(0,re.jsx)(Fa,{open:e,onOpenChange:A=>{if(!C.current){if(!A&&b){S(null);return}n(A)}},children:(0,re.jsxs)(pa,{className:"kanban-dialog-medium kanban-editor-dialog",children:[(0,re.jsxs)(ma,{children:[(0,re.jsx)(xa,{children:c("columnEdit")}),(0,re.jsx)(po,{children:c("columnEditDesc")})]}),(0,re.jsxs)(ha,{className:"kanban-editor-body",children:[(t||v)&&(0,re.jsx)("p",{className:"kanban-dialog-error",role:"alert",children:t||v}),(0,re.jsxs)("section",{className:"kanban-editor-section","aria-label":c("boardLists"),children:[(0,re.jsxs)("h3",{className:"kanban-editor-caption",children:[c("boardLists")," ",(0,re.jsx)("span",{children:a.length})]}),(0,re.jsx)(In,{sensors:I,collisionDetection:_u,onDragEnd:V,children:(0,re.jsx)(Pn,{items:a.map(A=>A.id),strategy:Rn,children:(0,re.jsx)("div",{className:"kanban-editor-list",children:a.map(A=>(0,re.jsx)(mL,{column:A,value:m[A.id]??A.title,onValueChange:N=>h(H=>({...H,[A.id]:N})),onCommit:()=>O(A.id),onDelete:()=>S(A),disabled:x||!!b,canDelete:a.length>1},A.id))})})})]}),(0,re.jsxs)("div",{className:"kanban-editor-setting",children:[(0,re.jsxs)("div",{className:"kanban-editor-setting-copy",children:[(0,re.jsx)(Ye,{htmlFor:d,children:c("completedColumn")}),(0,re.jsx)("p",{id:`${d}-hint`,className:"kanban-muted-small",children:c("completedColumnHint")})]}),(0,re.jsxs)(sa,{value:o||"__none__",disabled:x||!!b,onValueChange:A=>{w(()=>r(A==="__none__"?null:A))},children:[(0,re.jsx)(Kt,{id:d,"aria-describedby":`${d}-hint`,children:(0,re.jsx)(la,{})}),(0,re.jsxs)(Xt,{children:[(0,re.jsx)(Ze,{value:"__none__",children:c("noCompletedColumn")}),a.map(A=>(0,re.jsx)(Ze,{value:A.id,children:A.title},A.id))]})]})]})]}),(0,re.jsx)(ga,{children:b?(0,re.jsxs)("div",{className:"kanban-dialog-confirm",children:[(0,re.jsx)("p",{role:"alert",children:c("deleteColumnDesc").replace("{column}",b.title)}),(0,re.jsxs)("div",{className:"kanban-confirm-actions",children:[(0,re.jsx)(de,{ref:R,variant:"outline",disabled:x,onClick:()=>S(null),children:c("cancel")}),(0,re.jsx)(de,{variant:"destructive",disabled:x,onClick:async()=>{await w(()=>i(b.id))&&S(null)},children:c("confirmDelete")})]})]}):(0,re.jsxs)("div",{className:"kanban-editor-add",children:[(0,re.jsx)(Ye,{htmlFor:f,children:c("newColumnPlaceholder")}),(0,re.jsxs)("div",{className:"kanban-editor-add-row",children:[(0,re.jsx)("span",{className:"kanban-editor-add-icon","aria-hidden":"true",children:(0,re.jsx)(Xa,{className:"kanban-icon"})}),(0,re.jsx)(gt,{id:f,value:p,disabled:x,placeholder:c("newColumnPlaceholder"),"aria-label":c("newColumnPlaceholder"),maxLength:40,onChange:A=>g(A.target.value),onKeyDown:A=>{A.key==="Enter"&&(A.preventDefault(),P())}}),(0,re.jsx)(de,{size:"sm",className:"kanban-editor-add-button",disabled:x||!p.trim(),onClick:()=>{P()},children:c("add")})]})]})})]})})}var ct=require("react");var be=require("react/jsx-runtime");function wm({open:e,error:t,labels:a,onOpenChange:o,onAdd:r,onUpdate:n,onDelete:l}){let s=De(),i=(0,ct.useId)(),[u,c]=(0,ct.useState)({}),[d,f]=(0,ct.useState)(""),[m,h]=(0,ct.useState)("#38bdf8"),[p,g]=(0,ct.useState)(!1),x=(0,ct.useRef)(!1),[L,C]=(0,ct.useState)(""),[v,y]=(0,ct.useState)(null),b=(0,ct.useRef)(null);(0,ct.useEffect)(()=>{e&&(c(Object.fromEntries(a.map(w=>[w.name,{name:w.name,color:w.color}]))),f(""),h("#38bdf8"),C(""),y(null))},[e]),(0,ct.useEffect)(()=>{v&&b.current?.focus()},[v]);let S=async w=>{if(x.current)return!1;x.current=!0,g(!0),C("");try{let P=await w();return P===!1&&C(s("actionRetry")),P!==!1}catch(P){return C(s("actionFailed")+String(P instanceof Error?P.message:P)),!1}finally{x.current=!1,g(!1)}},R=async()=>{let w=d.trim();w&&await S(()=>r(w,m))&&f("")},I=w=>{let P=u[w];if(!P)return;let O=a.find(A=>A.name===w),V=P.name.trim();O&&V&&(V!==w||P.color!==O.color)&&S(()=>n(w,V,P.color))};return(0,be.jsx)(Fa,{open:e,onOpenChange:w=>{if(!x.current){if(!w&&v){y(null);return}o(w)}},children:(0,be.jsxs)(pa,{className:"kanban-dialog-medium kanban-editor-dialog",children:[(0,be.jsxs)(ma,{children:[(0,be.jsx)(xa,{children:s("labelEdit")}),(0,be.jsx)(po,{children:s("labelEditDesc")})]}),(0,be.jsxs)(ha,{className:"kanban-editor-body",children:[(t||L)&&(0,be.jsx)("p",{className:"kanban-dialog-error",role:"alert",children:t||L}),(0,be.jsxs)("section",{className:"kanban-editor-section","aria-label":s("boardLabels"),children:[(0,be.jsxs)("h3",{className:"kanban-editor-caption",children:[s("boardLabels")," ",(0,be.jsx)("span",{children:a.length})]}),(0,be.jsxs)("div",{className:"kanban-editor-list",children:[a.length===0&&(0,be.jsxs)("div",{className:"kanban-editor-empty",children:[(0,be.jsx)(Rr,{className:"kanban-icon","aria-hidden":"true"}),(0,be.jsx)("p",{children:s("noLabelsHint")})]}),a.map(w=>{let P=u[w.name]??{name:w.name,color:w.color};return(0,be.jsxs)("div",{className:"kanban-editor-row",children:[(0,be.jsx)("input",{type:"color","aria-label":`${s("labelColor")}: ${w.name}`,title:`${s("labelColor")}: ${w.name}`,value:P.color,disabled:p||!!v,className:"kanban-color-input",onChange:O=>c(V=>({...V,[w.name]:{...P,color:O.target.value}})),onBlur:()=>I(w.name)}),(0,be.jsx)(gt,{className:"kanban-editor-name","aria-label":`${s("labelName")}: ${w.name}`,value:P.name,disabled:p||!!v,maxLength:20,onChange:O=>c(V=>({...V,[w.name]:{...P,name:O.target.value}})),onBlur:()=>I(w.name),onKeyDown:O=>{O.key==="Enter"&&O.target.blur()}}),(0,be.jsx)(de,{variant:"ghost",size:"icon",className:"kanban-icon-button kanban-editor-delete","aria-label":`${s("deleteLabel")}: ${w.name}`,disabled:p||!!v,onClick:()=>y(w.name),children:(0,be.jsx)(Mt,{className:"kanban-icon"})})]},w.name)})]})]})]}),(0,be.jsx)(ga,{children:v?(0,be.jsxs)("div",{className:"kanban-dialog-confirm",children:[(0,be.jsx)("p",{role:"alert",children:s("deleteLabelDesc").replace("{label}",v)}),(0,be.jsxs)("div",{className:"kanban-confirm-actions",children:[(0,be.jsx)(de,{ref:b,variant:"outline",disabled:p,onClick:()=>y(null),children:s("cancel")}),(0,be.jsx)(de,{variant:"destructive",disabled:p,onClick:async()=>{await S(()=>l(v))&&y(null)},children:s("confirmDelete")})]})]}):(0,be.jsxs)("div",{className:"kanban-editor-add",children:[(0,be.jsx)(Ye,{htmlFor:i,children:s("newLabelPlaceholder")}),(0,be.jsxs)("div",{className:"kanban-editor-add-row",children:[(0,be.jsx)("input",{type:"color","aria-label":s("newLabelColor"),title:s("newLabelColor"),value:m,disabled:p,className:"kanban-color-input",onChange:w=>h(w.target.value)}),(0,be.jsx)(gt,{id:i,value:d,disabled:p,placeholder:s("newLabelPlaceholder"),"aria-label":s("newLabelPlaceholder"),maxLength:20,onChange:w=>f(w.target.value),onKeyDown:w=>{w.key==="Enter"&&(w.preventDefault(),R())}}),(0,be.jsx)(de,{size:"sm",className:"kanban-editor-add-button",disabled:p||!d.trim(),onClick:()=>{R()},children:s("add")})]})]})})]})})}var xt=require("react");var Dm=$(require("react"),1);var km=$(require("react"),1);var Rm=require("react/jsx-runtime"),hL=Object.defineProperty,ym=(e,t)=>hL(e,"name",{value:t,configurable:!0}),Di={Horizontal:"horizontal",Vertical:"vertical"},Sm=Di.Horizontal,gL=Object.values(Di),Mi=km.forwardRef(ym(function(t,a){let{decorative:o,orientation:r=Sm,...n}=t,l=Pm(r)?r:Sm,s=l===Di.Vertical?l:void 0,i=o?{role:"none"}:{"aria-orientation":s,role:"separator"};return(0,Rm.jsx)(ue.div,{"data-orientation":l,...i,...n,ref:a})},"Separator"));function Pm(e){return gL.includes(e)}ym(Pm,"isValidOrientation");var Mm=require("react/jsx-runtime"),Is=Dm.forwardRef(({className:e,orientation:t="horizontal",decorative:a=!0,...o},r)=>(0,Mm.jsx)(Mi,{ref:r,decorative:a,orientation:t,className:se("kanban-separator",`kanban-separator--${t}`,e),...o}));Is.displayName=Mi.displayName;var E=require("react/jsx-runtime");function Am({open:e,workspaceId:t,onOpenChange:a}){let o=De(),r=(0,xt.useId)(),n=(0,xt.useId)(),l=(0,xt.useId)(),[s,i]=(0,xt.useState)(null),[u,c]=(0,xt.useState)(null),[d,f]=(0,xt.useState)(""),[m,h]=(0,xt.useState)(!1),[p,g]=(0,xt.useState)(!1),x=(0,xt.useCallback)(async()=>{try{let I=await vs(t);i(I),c(I.config),f("")}catch(I){f(o("loadFailed")+String(I instanceof Error?I.message:I))}},[t,o]);if((0,xt.useEffect)(()=>{e&&(h(!1),x())},[e,x]),!e)return null;let L=I=>c(w=>w&&{...w,...I}),C=u?.dispatchModel?[u.dispatchModel.provider,u.dispatchModel.model].filter(Boolean).join("/"):"",v=I=>{let w=I.trim();if(!w)return L({dispatchModel:null});let P=w.indexOf("/");return L({dispatchModel:P>0?{provider:w.slice(0,P),model:w.slice(P+1)}:{provider:"",model:w}})},y=async()=>{if(!(!u||p)){g(!0),f("");try{await La("saveConfig",{workspaceId:t,config:u}),h(!0),setTimeout(()=>h(!1),1800),await x()}catch(I){f(String(I instanceof Error?I.message:I))}finally{g(!1)}}},b=async()=>{if(!p){g(!0),f("");try{await La("runNow",{workspaceId:t}),await x()}catch(I){f(String(I instanceof Error?I.message:I))}finally{g(!1)}}},S=(s?.presets??[]).filter(I=>!I.broken),R=(I,w,P)=>(0,E.jsxs)("label",{className:"kanban-orch-check",children:[(0,E.jsx)("input",{type:"checkbox",disabled:p,checked:!!u?.[I],onChange:O=>L({[I]:O.target.checked})}),(0,E.jsxs)("span",{children:[(0,E.jsx)("span",{className:"kanban-orch-check-title",children:o(w)}),P&&(0,E.jsxs)("span",{className:"kanban-muted-small",children:[" ",o(P)]})]})]});return(0,E.jsx)(Fa,{open:e,onOpenChange:I=>{p||a(I)},children:(0,E.jsxs)(pa,{className:"kanban-dialog-medium kanban-editor-dialog kanban-orch-dialog",children:[(0,E.jsxs)(ma,{children:[(0,E.jsx)(xa,{children:o("orchTitle")}),(0,E.jsx)(po,{children:o("orchDesc")})]}),(0,E.jsxs)(ha,{className:"kanban-editor-body",children:[d&&(0,E.jsx)("p",{className:"kanban-dialog-error",role:"alert",children:d}),!u&&(0,E.jsx)("p",{className:"kanban-muted-small",children:o("loading")}),u&&(0,E.jsxs)(E.Fragment,{children:[(0,E.jsxs)("section",{className:"kanban-editor-section",children:[(0,E.jsx)("h3",{className:"kanban-editor-caption",children:o("orchTitle")}),R("enabled","orchEnabled"),(0,E.jsxs)("div",{className:"kanban-orch-grid",children:[(0,E.jsxs)("div",{className:"kanban-editor-setting",children:[(0,E.jsxs)("div",{className:"kanban-editor-setting-copy",children:[(0,E.jsx)(Ye,{htmlFor:r,children:o("orchWipLimit")}),(0,E.jsx)("p",{className:"kanban-muted-small",children:o("orchWipHint")})]}),(0,E.jsx)(gt,{id:r,type:"number",min:1,max:20,disabled:p,className:"kanban-orch-wip",value:String(u.wipLimit),onChange:I=>L({wipLimit:Math.max(1,Math.min(20,Number.parseInt(I.target.value,10)||1))})})]}),(0,E.jsxs)("div",{className:"kanban-editor-setting",children:[(0,E.jsxs)("div",{className:"kanban-editor-setting-copy",children:[(0,E.jsx)(Ye,{htmlFor:n,children:o("orchRefreshSec")}),(0,E.jsx)("p",{className:"kanban-muted-small",children:o("orchRefreshHint")})]}),(0,E.jsx)(gt,{id:n,type:"number",min:0,max:3600,disabled:p,className:"kanban-orch-wip",value:String(u.uiRefreshSec??0),onChange:I=>L({uiRefreshSec:Math.max(0,Math.min(3600,Number.parseInt(I.target.value,10)||0))})})]})]}),(0,E.jsxs)("div",{className:"kanban-orch-selects",children:[(0,E.jsxs)("label",{className:"kanban-orch-select",children:[(0,E.jsx)("span",{children:o("orchSourceColumn")}),(0,E.jsxs)(sa,{value:u.sourceColumnIds[0]??"__auto__",disabled:p,onValueChange:I=>L({sourceColumnIds:I==="__auto__"?[]:[I]}),children:[(0,E.jsx)(Kt,{children:(0,E.jsx)(la,{})}),(0,E.jsxs)(Xt,{children:[(0,E.jsx)(Ze,{value:"__auto__",children:o("orchAutoSelect")}),(s?.columns??[]).map(I=>(0,E.jsx)(Ze,{value:I.id,children:I.title},I.id))]})]})]}),(0,E.jsxs)("label",{className:"kanban-orch-select",children:[(0,E.jsx)("span",{children:o("orchEntryColumn")}),(0,E.jsxs)(sa,{value:u.entryColumnId??"__auto__",disabled:p,onValueChange:I=>L({entryColumnId:I==="__auto__"?null:I}),children:[(0,E.jsx)(Kt,{children:(0,E.jsx)(la,{})}),(0,E.jsxs)(Xt,{children:[(0,E.jsx)(Ze,{value:"__auto__",children:o("orchAutoSelect")}),(s?.columns??[]).map(I=>(0,E.jsx)(Ze,{value:I.id,children:I.title},I.id))]})]})]}),(0,E.jsxs)("label",{className:"kanban-orch-select",children:[(0,E.jsx)("span",{children:o("orchPullOrder")}),(0,E.jsxs)(sa,{value:u.pullOrder,disabled:p,onValueChange:I=>L({pullOrder:I==="board"?"board":"priority"}),children:[(0,E.jsx)(Kt,{children:(0,E.jsx)(la,{})}),(0,E.jsxs)(Xt,{children:[(0,E.jsx)(Ze,{value:"priority",children:o("orchPriorityOrder")}),(0,E.jsx)(Ze,{value:"board",children:o("orchBoardOrder")})]})]})]})]}),(0,E.jsxs)("div",{className:"kanban-orch-checks",children:[R("autoPull","orchAutoPull"),R("enforceWip","orchEnforceWip"),R("stampAssignments","orchStamp"),R("labelAssignments","orchLabel"),R("dispatchEnabled","orchDispatch","orchDispatchHint")]}),u.dispatchEnabled&&(0,E.jsxs)("label",{className:"kanban-orch-select",children:[(0,E.jsx)("span",{children:o("orchDispatchModel")}),(0,E.jsx)("input",{id:l,className:"kanban-orch-model-input",placeholder:"provider/model",disabled:p,value:C,onChange:I=>v(I.target.value)}),(0,E.jsx)("span",{className:"kanban-muted-small",children:o("orchDispatchModelHint")})]})]}),(0,E.jsx)(Is,{}),(0,E.jsxs)("section",{className:"kanban-editor-section",children:[(0,E.jsx)("h3",{className:"kanban-editor-caption",children:o("orchColumnRoles")}),(0,E.jsx)("p",{className:"kanban-muted-small kanban-orch-roles-hint",children:o("orchRolesHint")}),(0,E.jsx)("div",{className:"kanban-orch-rows",children:(s?.columns??[]).map(I=>(0,E.jsxs)("div",{className:"kanban-orch-row",children:[(0,E.jsxs)("span",{className:"kanban-orch-col-title",children:[I.title,(0,E.jsx)("span",{className:"kanban-orch-count",children:I.count}),s?.completedColumnId===I.id&&(0,E.jsx)("span",{className:"kanban-orch-done-tag",children:o("completed")})]}),(0,E.jsxs)("span",{className:"kanban-orch-row-controls",children:[(0,E.jsxs)("label",{className:"kanban-orch-check kanban-orch-inline",children:[(0,E.jsx)("input",{type:"checkbox",disabled:p,checked:u.doneColumnIds.includes(I.id)||s?.completedColumnId===I.id,onChange:w=>{let P=u.doneColumnIds.includes(I.id);w.target.checked&&!P&&L({doneColumnIds:[...u.doneColumnIds,I.id]}),!w.target.checked&&P&&L({doneColumnIds:u.doneColumnIds.filter(O=>O!==I.id)})}}),(0,E.jsx)("span",{children:o("orchDoneColumns")})]}),S.length>0?(0,E.jsxs)(sa,{value:u.columnRoles[I.id]??"__none__",disabled:p,onValueChange:w=>{let P={...u.columnRoles};w==="__none__"?delete P[I.id]:P[I.id]=w,L({columnRoles:P})},children:[(0,E.jsx)(Kt,{className:"kanban-orch-role",children:(0,E.jsx)(la,{})}),(0,E.jsxs)(Xt,{children:[(0,E.jsx)(Ze,{value:"__none__",children:o("orchNoRole")}),S.map(w=>(0,E.jsx)(Ze,{value:w.id,children:w.name||w.id},w.id))]})]}):(0,E.jsx)(gt,{className:"kanban-orch-role",placeholder:o("orchNoRole"),disabled:p,value:u.columnRoles[I.id]??"",onChange:w=>{let P={...u.columnRoles},O=w.target.value.trim();O?P[I.id]=O:delete P[I.id],L({columnRoles:P})}})]})]},I.id))})]}),(0,E.jsx)(Is,{}),(0,E.jsxs)("section",{className:"kanban-editor-section",children:[(0,E.jsxs)("h3",{className:"kanban-editor-caption",children:[o("orchStatus"),(0,E.jsxs)("span",{className:"kanban-orch-badge",children:[o("orchActiveInFlow"),": ",s?.status?.activeCount??0,"/",u.wipLimit]})]}),(s?.status?.active?.length??0)>0&&(0,E.jsx)("ul",{className:"kanban-orch-active",children:(s?.status?.active??[]).map(I=>(0,E.jsxs)("li",{children:["[",I.id,"] ",I.title]},I.id))}),(0,E.jsx)("div",{className:"kanban-orch-log",children:(s?.status?.log??[]).map((I,w)=>(0,E.jsxs)("p",{className:"kanban-orch-log-line",children:[(0,E.jsx)("span",{className:"kanban-orch-log-ts",children:I.ts.slice(11,19)}),(0,E.jsx)("span",{className:"kanban-orch-log-type",children:I.type}),(0,E.jsx)("span",{children:I.text})]},w))})]})]})]}),(0,E.jsx)(ga,{children:(0,E.jsxs)("div",{className:"kanban-orch-footer",children:[m&&(0,E.jsx)("span",{className:"kanban-orch-saved",role:"status",children:o("orchSaved")}),(0,E.jsxs)("div",{className:"kanban-orch-footer-actions",children:[(0,E.jsxs)(de,{variant:"ghost",size:"sm",disabled:p,onClick:()=>{x()},children:[(0,E.jsx)(ja,{className:"kanban-icon"}),o("refresh")]}),(0,E.jsxs)(de,{variant:"outline",size:"sm",disabled:p||!u?.enabled,onClick:()=>{b()},children:[(0,E.jsx)(Sr,{className:"kanban-icon"}),o("orchRunNow")]}),(0,E.jsx)(de,{size:"sm",disabled:p||!u,onClick:()=>{y()},children:o("save")})]})]})})]})})}var Ai=new Map,Ti=0,ws=new Set;function Tm(e,t){Ai.set(e,t),Ti++;for(let a of ws)a()}function Em(e){let t=Ai.get(e);if(t==null)return null;Ai.delete(e),Ti++;for(let a of ws)a();return t}function Om(e){return ws.add(e),()=>{ws.delete(e)}}function Fm(){return Ti}function Bm(e){let t=(e.id??"").trim(),a=(e.title??"").trim(),o=(e.note??"").trim(),r=(e.label??"").trim(),n=[];return t&&n.push(ea("fieldId")+": "+t),a&&n.push(a),r&&n.push(ea("fieldLabel")+": "+r),e.dueDate&&n.push(ea("fieldDueDate")+": "+e.dueDate),e.completed!==void 0&&n.push(ea("completionStatus")+": "+ea(e.completed?"completed":"incomplete")),o&&n.push(o),n.join(`

`)}var W=require("react/jsx-runtime");function Nm(e,t,a,o,r){let n=e.find(g=>g.id===t);if(!n)return{cards:e,toIndex:-1};let l=e.filter(g=>g.columnId===n.columnId).findIndex(g=>g.id===t);if(o===t&&n.columnId===a)return{cards:e,toIndex:l};let s=e.filter(g=>g.id!==t),i=s.filter(g=>g.columnId===a),u=o?i.findIndex(g=>g.id===o):-1,c=u<0?i.length:u+(r?1:0),d=[...s],f=i[c],m=i[i.length-1],h=f?d.indexOf(f):m?d.indexOf(m)+1:d.length;return d.splice(h,0,{...n,columnId:a}),{cards:d.every((g,x)=>g.id===e[x]?.id&&g.columnId===e[x]?.columnId)?e:d,toIndex:c}}function Ss(e){let{sessionId:t}=e;window.__kanbanSessionId=t||"",a=e.useWorkspaces,o=e.inputActions,r=e.uiWorkspace,n=a?a(k=>k.items):[],kanbanLineageIds=[e.parentSessionId,e.session&&e.session.parentSessionId,e.session&&e.session.header&&e.session.header.parentSession,e.sessionHeader&&e.sessionHeader.parentSession].filter(Boolean),l=Array.isArray(n)?n.find(k=>Array.isArray(k.sessionIds)&&k.sessionIds.includes(t))||(kanbanLineageIds.length?n.find(k=>Array.isArray(k.sessionIds)&&kanbanLineageIds.some(x=>k.sessionIds.includes(x))):void 0):void 0,s=e.forcedWorkspaceId||(l?l.workspaceId:"default"),i=De(),[u,c]=(0,pe.useState)(null),[d,f]=(0,pe.useState)(""),[m,h]=(0,pe.useState)([]),[p,g]=(0,pe.useState)(null),[x,L]=(0,pe.useState)(null),[C,v]=(0,pe.useState)(!1),[y,b]=(0,pe.useState)(!1),[S,R]=(0,pe.useState)(!1),[I,w]=(0,pe.useState)(5),[P,O]=(0,pe.useState)(!1),V=pm(),[A,N]=(0,pe.useState)(""),[H,j]=(0,pe.useState)(""),[U,X]=(0,pe.useState)(null),G=(0,pe.useRef)(null),te=(0,pe.useRef)(u),ee=(0,pe.useRef)(null),ce=(0,pe.useRef)(s),Re=(0,pe.useRef)(!1),Ce=(0,pe.useRef)(0),q=(0,pe.useRef)(0);te.current=u,ce.current=s,Re.current=x!==null||C||y||S||p!==null,l&&l.title&&(window.__kanbanWsTitle=l.title),l&&!l.title&&l.path&&(window.__kanbanWsTitle=l.path);let[Le,ve]=(0,pe.useState)(null),xe=bn(ro(Br,{activationConstraint:{distance:8}}),ro(Nr,{activationConstraint:{delay:250,tolerance:5}}),ro(Ea,{coordinateGetter:Mn})),B=(0,pe.useCallback)((k,z,K)=>{ce.current!==z||K<q.current||(q.current=K,k&&k.workspace&&(window.__kanbanWsTitle=k.workspace.title||k.workspace.path,window.__kanbanWsPath=k.workspace.path),k&&k.board&&(c({...k.board,completedColumnId:k.board.completedColumnId??null,cards:Array.isArray(k.board.cards)?k.board.cards.map(ae=>({...ae,dueDate:ae.dueDate??null,comments:Array.isArray(ae.comments)?ae.comments:[]})):[],activities:Array.isArray(k.board.activities)?k.board.activities:[]}),f("")),Array.isArray(k&&k.warnings)&&k.warnings.length>0&&h(ae=>[...ae,...k.warnings]))},[]),J=(0,pe.useCallback)(async(k,z={})=>{let K=++Ce.current;f("");try{let ae=await un(k,z,s);return B(ae,s,K),!0}catch(ae){return f(i("actionFailed")+String(ae&&ae.message||ae)),!1}},[s,B,i]),le=(0,pe.useCallback)(()=>{let k=++Ce.current;O(!0),un("get",{},s).then(z=>B(z,s,k)).catch(z=>f(i("loadFailed")+String(z&&z.message||z))).finally(()=>O(!1))},[s,B,i]),M=(0,pe.useCallback)(()=>{let k=++Ce.current;un("get",{},s).then(z=>B(z,s,k)).catch(()=>{})},[s,B]);(0,pe.useEffect)(()=>{let k=!0;return vs(s).then(z=>{k&&z&&z.config&&typeof z.config.uiRefreshSec=="number"&&w(z.config.uiRefreshSec)}).catch(()=>{}),un("roles",{},s).then(z=>{k&&z&&Array.isArray(z.roles)&&(window.__kanbanRoles=z.roles.filter((x)=>/^(team-)?(manager|developer|tester|reviewer|designer|researcher)$/.test(String(x))))}).catch(()=>{}),()=>{k=!1}},[s]),(0,pe.useEffect)(()=>{if(!I)return;let k=setInterval(()=>{Re.current||M()},Math.max(2,I)*1e3);return()=>clearInterval(k)},[I,M]),(0,pe.useEffect)(()=>{let k=!0,z=++Ce.current;return c(null),X(null),j(""),N(""),L(null),g(null),f(""),h([]),un("get",{},s).then(K=>{k&&B(K,s,z)}).catch(K=>{k&&f(i("loadFailed")+String(K&&K.message||K))}),()=>{k=!1}},[s,B,i]),(0,pe.useEffect)(()=>{u&&X(k=>k&&!u.labels.some(z=>z.name===k)?null:k)},[u?.labels]),(0,pe.useLayoutEffect)(()=>{let k=Te=>{let fe=Te;for(;fe;){let Se=getComputedStyle(fe).overflowY;if(Se==="auto"||Se==="scroll")return fe;fe=fe.parentElement}return null},z=()=>{let Te=G.current;if(!Te)return;let fe=k(Te.parentElement),Se=Te.getBoundingClientRect().top+(fe?.scrollTop??0),_e=window.innerHeight;if(fe){let Bt=fe.querySelector("[data-composer-seat]"),We=Bt?Bt.getBoundingClientRect().top:0;Bt&&Bt.offsetHeight>0&&We>Se?_e=We:_e=fe.getBoundingClientRect().bottom}ve(Math.max(0,Math.floor(_e-Se)))};z();let K=k(G.current?.parentElement??null),ae=new ResizeObserver(z);if(ae.observe(document.documentElement),K){ae.observe(K);let Te=K.querySelector("[data-composer-seat]");Te&&ae.observe(Te)}return window.addEventListener("resize",z),()=>{ae.disconnect(),window.removeEventListener("resize",z)}},[u!==null]);let F=(0,pe.useCallback)(k=>{let z=Hu(k),K=z.length>0?z:Ws(k),ae=Hr(K,"id");if(ae==null)return[];if(new Set((u?.columns??[]).map(fe=>fe.id)).has(String(ae))){let fe=(u?.cards??[]).filter(Se=>Se.columnId===ae).map(Se=>Se.id);if(fe.length>0){let Se=Cn({...k,droppableContainers:k.droppableContainers.filter(_e=>_e.id!==ae&&fe.includes(String(_e.id)))});Se.length>0&&(ae=Se[0].id)}}return[{id:ae}]},[u]),Q=k=>{let z=te.current;if(!z||z.cards===k)return;let K={...z,cards:k};te.current=K,c(K)},Pt=k=>{if(k.active.data.current?.type!=="card")return;let z=te.current,K=z?.cards.find(ae=>ae.id===k.active.id);!K||!z||(ee.current=z.cards,g(K))},wa=({active:k,over:z})=>{let K=te.current;if(!z||!K||k.data.current?.type!=="card")return;let ae=String(k.id),Te=K.cards.find(We=>We.id===ae),fe=K.cards.find(We=>We.id===z.id),Se=fe?.columnId??(z.data.current?.type==="column"?String(z.id):null);if(!Te||!Se||Te.columnId===Se)return;let _e=k.rect.current.translated,Bt=!!(fe&&_e&&_e.top+_e.height/2>z.rect.top+z.rect.height/2);Q(Nm(K.cards,ae,Se,fe?.id??null,Bt).cards)},Sa=({active:k,over:z})=>{let K=te.current,ae=ee.current;if(ee.current=null,!z||!K||k.data.current?.type!=="card"){ae&&Q(ae),g(null);return}let Te=String(k.id),fe=K.cards.find(ya=>ya.id===z.id),Se=fe?.columnId??(z.data.current?.type==="column"?String(z.id):null);if(!Se){ae&&Q(ae),g(null);return}let _e=k.rect.current.translated,Bt=!!(fe&&_e&&_e.top+_e.height/2>z.rect.top+z.rect.height/2),We=Nm(K.cards,Te,Se,fe?.id??null,Bt);Q(We.cards),g(null),(!ae||We.cards.some((ya,dn)=>ya.id!==ae[dn]?.id||ya.columnId!==ae[dn]?.columnId))&&J("moveCard",{id:Te,columnId:Se,toIndex:We.toIndex}).then(ya=>{ya||le()})},cr=()=>{ee.current&&Q(ee.current),ee.current=null,g(null)},$t=k=>{if(!x)return Promise.resolve(!1);if(x.card){let z=te.current?.cards.find(ae=>ae.id===x.card.id)??x.card,K={id:z.id};return k.title!==z.title&&(K.title=k.title),k.note!==z.note&&(K.note=k.note),k.label!==(z.label??"")&&(K.label=k.label),k.priority!==(z.priority??"")&&(K.priority=k.priority),k.dueDate!==(z.dueDate??"")&&(K.dueDate=k.dueDate||null),k.assignee!==(z.assignee??"")&&(K.assignee=k.assignee||null),k.parent!==(z.parent??"")&&(K.parent=k.parent||null),k.milestone!==(z.milestone===true)&&(K.milestone=k.milestone),J("updateCard",K)}return J("addCard",{columnId:x.columnId,title:k.title,note:k.note,label:k.label||void 0,priority:k.priority||void 0,dueDate:k.dueDate||null,assignee:k.assignee||void 0,parent:k.parent||void 0,milestone:k.milestone===true?true:void 0})},Oo=(0,pe.useCallback)(async(k,z)=>{let K=te.current,ae=K?.cards.find(fe=>fe.id===k.id),Te=Bm({...k,completed:ae&&K?.completedColumnId?ae.columnId===K.completedColumnId:void 0});if(!Te)return!1;f("");try{return z==="current"?o?(await o.setDraft(Te),!0):!1:r?.openWorkspace?(await r.openWorkspace(s,fe=>Tm(fe,Te)),!0):!1}catch(fe){return f(i("actionFailed")+String(fe&&fe.message||fe)),!1}},[o,r,s,i]);return u?(0,W.jsxs)("div",{ref:G,className:"kanban-root kanban-view",style:Le!=null?{height:Le}:void 0,children:[d&&!x&&!C&&!y&&(0,W.jsx)("p",{className:"kanban-error",role:"alert",children:d}),(H||U!==null||A)&&(0,W.jsxs)("div",{className:"kanban-filter-summary","aria-label":i("clearFilter"),children:[A&&(0,W.jsxs)(de,{variant:"ghost",size:"sm",className:"kanban-filter-chip","aria-label":`${i("clearFilter")}: ${i(A==="today"?"dueToday":"overdue")}`,onClick:()=>N(""),children:[i(A==="today"?"dueToday":"overdue"),(0,W.jsx)(ua,{className:"kanban-tiny-icon","aria-hidden":"true"})]}),H&&(0,W.jsxs)(de,{variant:"ghost",size:"sm",className:"kanban-filter-chip","aria-label":`${i("clearFilter")}: ${jt[H].label}`,onClick:()=>j(""),children:[i("fieldPriority"),": ",jt[H].label,(0,W.jsx)(ua,{className:"kanban-tiny-icon","aria-hidden":"true"})]}),U!==null&&(0,W.jsxs)(de,{variant:"ghost",size:"sm",className:"kanban-filter-chip","aria-label":`${i("clearFilter")}: ${U||i("noLabel")}`,onClick:()=>X(null),children:[i("fieldLabel"),": ",U||i("noLabel"),(0,W.jsx)(ua,{className:"kanban-tiny-icon","aria-hidden":"true"})]})]}),m.length>0&&(0,W.jsxs)("div",{className:"kanban-warning",children:[(0,W.jsxs)("div",{className:"kanban-warning-body",children:[(0,W.jsx)("p",{className:"kanban-warning-title",children:i("warnings")}),m.map((k,z)=>(0,W.jsx)("p",{className:"kanban-warning-item",children:k},z))]}),(0,W.jsx)(de,{variant:"ghost",size:"sm",className:"kanban-warning-dismiss",onClick:()=>h([]),children:i("dismiss")})]}),(0,W.jsxs)(In,{sensors:xe,collisionDetection:F,onDragStart:Pt,onDragOver:wa,onDragEnd:Sa,onDragCancel:cr,children:[(0,W.jsxs)("div",{className:"kanban-content",children:[(0,W.jsxs)("div",{className:"kanban-toolbar",children:[(0,W.jsx)("span",{className:"kanban-toolbar-board-name"+(window.__kanbanWsTitle?"":" is-skeleton"),title:window.__kanbanWsTitle||"",children:window.__kanbanWsTitle||""}),(0,W.jsx)(de,{variant:"ghost",size:"icon",className:"kanban-toolbar-button",title:i("refresh"),"aria-label":i("refresh"),disabled:P,onClick:le,children:(0,W.jsx)(ja,{className:P?"kanban-animate-spin":void 0})}),(0,W.jsxs)(ko,{children:[(0,W.jsx)(Ro,{asChild:!0,children:(0,W.jsx)(de,{variant:"ghost",size:"icon",className:"kanban-toolbar-button",title:i("settings"),children:(0,W.jsx)(kr,{className:"kanban-icon"})})}),(0,W.jsxs)(Wa,{align:"start",children:[,(0,W.jsxs)(ht,{onClick:()=>{f(""),b(!0)},children:[(0,W.jsx)(_o,{className:"kanban-icon"}),i("labelEdit")]}),(0,W.jsxs)(ht,{onClick:()=>{f(""),R(!0)},children:[(0,W.jsx)(xr,{className:"kanban-icon"}),i("wfTitle")]})]})]}),(0,W.jsxs)(ko,{children:[(0,W.jsx)(Ro,{asChild:!0,children:(0,W.jsx)(de,{variant:"ghost",size:"icon",className:`kanban-toolbar-button${H?" is-active":""}`,title:i("priorityFilter"),"aria-label":i("priorityFilter"),"aria-pressed":!!H,children:(0,W.jsx)(Ma,{className:"kanban-icon"})})}),(0,W.jsxs)(Wa,{align:"start",children:[(0,W.jsxs)(ht,{role:"menuitemradio","aria-checked":!H,onSelect:()=>j(""),children:[(0,W.jsx)("span",{className:"kanban-filter-check",children:!H&&(0,W.jsx)(ft,{className:"kanban-icon"})}),i("all")]}),bs.map(k=>(0,W.jsxs)(ht,{role:"menuitemradio","aria-checked":H===k,onSelect:()=>j(k),children:[(0,W.jsx)("span",{className:"kanban-filter-check",children:H===k&&(0,W.jsx)(ft,{className:"kanban-icon"})}),(0,W.jsx)("span",{className:"kanban-priority-dot",style:{background:jt[k].color}}),jt[k].label]},k))]})]}),(0,W.jsxs)(ko,{children:[(0,W.jsx)(Ro,{asChild:!0,children:(0,W.jsx)(de,{variant:"ghost",size:"icon",className:`kanban-toolbar-button${U!==null?" is-active":""}`,title:U===null?i("labelFilter"):`${i("labelFilter")}: ${U||i("noLabel")}`,"aria-label":i("labelFilter"),"aria-pressed":U!==null,children:(0,W.jsx)(_o,{className:"kanban-icon"})})}),(0,W.jsxs)(Wa,{align:"start",children:[(0,W.jsxs)(ht,{role:"menuitemradio","aria-checked":U===null,onSelect:()=>X(null),children:[(0,W.jsx)("span",{className:"kanban-filter-check",children:U===null&&(0,W.jsx)(ft,{className:"kanban-icon"})}),i("all")]}),(0,W.jsxs)(ht,{role:"menuitemradio","aria-checked":U==="",onSelect:()=>X(""),children:[(0,W.jsx)("span",{className:"kanban-filter-check",children:U===""&&(0,W.jsx)(ft,{className:"kanban-icon"})}),i("noLabel")]}),u.labels.map(k=>(0,W.jsxs)(ht,{role:"menuitemradio","aria-checked":U===k.name,onSelect:()=>X(k.name),children:[(0,W.jsx)("span",{className:"kanban-filter-check",children:U===k.name&&(0,W.jsx)(ft,{className:"kanban-icon"})}),(0,W.jsx)("span",{className:"kanban-label-dot",style:{background:k.color}}),k.name]},k.name))]})]}),(0,W.jsxs)(ko,{children:[(0,W.jsx)(Ro,{asChild:!0,children:(0,W.jsx)(de,{variant:"ghost",size:"icon",className:`kanban-toolbar-button${A?" is-active":""}`,title:i("dueDateFilter"),"aria-label":i("dueDateFilter"),"aria-pressed":!!A,children:(0,W.jsx)(Ga,{className:"kanban-icon"})})}),(0,W.jsx)(Wa,{align:"start",children:["","today","overdue"].map(k=>(0,W.jsxs)(ht,{role:"menuitemradio","aria-checked":A===k,onSelect:()=>N(k),children:[(0,W.jsx)("span",{className:"kanban-filter-check",children:A===k&&(0,W.jsx)(ft,{className:"kanban-icon"})}),i(k==="today"?"dueToday":k==="overdue"?"overdue":"all")]},k))})]})]}),(0,W.jsx)("div",{className:"kanban-board-scroll",children:u.columns.map(k=>{let z=u.cards.filter(K=>K.columnId===k.id&&(!H||K.priority===H)&&(U===null||(K.label??"")===U)&&(K.id===p?.id||cm(K,A,u.completedColumnId,V)));return(0,W.jsx)(vm,{column:k,cards:z,totalCount:u.cards.filter(K=>K.columnId===k.id).length,filtered:!!(H||A)||U!==null,completed:k.id===u.completedColumnId,today:V,labels:u.labels,onAddCard:K=>{f(""),L({card:null,columnId:K.id})},onOpenCard:K=>{f(""),L({card:K,columnId:K.columnId})}},k.id)})})]}),(0,W.jsx)(ad,{children:p?(0,W.jsx)("div",{className:"kanban-drag-preview",children:(0,W.jsx)(Pi,{card:p,labels:u.labels,completed:p.columnId===u.completedColumnId,today:V})}):null})]}),(0,W.jsx)(xm,{error:d,open:x!==null,card:x?.card??null,labels:u.labels,workspaceId:s,comments:x?.card?u.cards.find(k=>k.id===x.card.id)?.comments??[]:[],activities:x?.card?u.activities.filter(k=>k.cardId===x.card.id):[],kids:x?.card?u.cards.filter(k=>k.parent===x.card.id):[],onOpenChange:k=>{k||L(null)},onSave:$t,onAddComment:(k,z)=>J("addComment",{id:k,content:z}),onDelete:k=>J("deleteCard",{id:k.id}),onChatWithAgent:Oo,onOpenSession:k=>{r&&typeof r.openSession=="function"&&r.openSession(k)}}),null,(0,W.jsx)(wm,{error:d,open:y,labels:u.labels,onOpenChange:b,onAdd:(k,z)=>J("addLabel",{name:k,color:z}),onUpdate:(k,z,K)=>J("updateLabel",{name:k,newName:z,color:K}),onDelete:k=>J("deleteLabel",{name:k})}),(0,W.jsx)(KanbanWorkflowEditor,{open:S,workspaceId:s,onOpenChange:R,reload:le})]}):(0,W.jsx)("div",{className:"kanban-root kanban-loading",children:[(0,W.jsx)("div",{className:"kanban-toolbar",children:(0,W.jsx)("span",{className:"kanban-toolbar-board-name"+(window.__kanbanWsTitle?"":" is-skeleton"),title:window.__kanbanWsTitle||"",children:window.__kanbanWsTitle||""})}),d?(0,W.jsx)("p",{className:"kanban-error",children:d}):(0,W.jsx)("p",{className:"kanban-muted-text",children:i("loading")})]})}var Ia=require("react"),ur=require("react");function _m({uiWorkspace:e}){let t=De(),[a,o]=(0,ur.useState)([]),[r,n]=(0,ur.useState)(""),[l,s]=(0,ur.useState)("");return(0,ur.useEffect)(()=>{let i=!0;return La("workspaces",{}).then(u=>{if(!i)return;let c=Array.isArray(u&&u.workspaces)?u.workspaces:[];o(c),n(d=>d||(c.length>0?c[0].id:""))}).catch(u=>{i&&s(t("loadFailed")+String(u&&u.message||u))}),()=>{i=!1}},[]),(0,Ia.createElement)("div",{className:"kanban-root kanban-page"},a.length>1&&(0,Ia.createElement)("div",{className:"kanban-page-head"},(0,Ia.createElement)("label",{className:"kanban-page-label"},t("workspaceLabel")," "),(0,Ia.createElement)("select",{className:"kanban-page-select",value:r,onChange:i=>n(i.target.value)},a.map(i=>(0,Ia.createElement)("option",{key:i.id,value:i.id},i.title)))),l&&(0,Ia.createElement)("p",{className:"kanban-error",role:"alert"},l),r?(0,Ia.createElement)(Ss,{sessionId:"",forcedWorkspaceId:r,uiWorkspace:e}):(0,Ia.createElement)("p",{className:"kanban-muted-text"},t("loading")))}var ys=require("react");function Hm({sessionId:e,inputActions:t}){let a=(0,ys.useSyncExternalStore)(Om,Fm);return(0,ys.useEffect)(()=>{if(!e||!t?.setDraft)return;let o=Em(e);o!=null&&t.setDraft(o)},[a,e,t]),null}var Um="kanban-board",qm={name:"dsh-kanban",inject:["slots","locale","uiWorkspace"],apply(e){Bc(e);let t=e.get("slots");if(t===void 0)return;let a=e.get("uiWorkspace");t.inject("conversation.view",()=>t.register({name:"conversation.view",id:"kanban",order:20,label:()=>ea("boardTab")},r=>(0,dr.createElement)(Ss,{...r,uiWorkspace:a}))),t.inject("conversation.input.dock",()=>t.register({name:"conversation.input.dock",id:"kanban-chat-draft",order:100},r=>(0,dr.createElement)(Hm,r)));let o=e.inject;typeof o=="function"&&o.call(e,["layout"],r=>{let n=r.slots.inject("main",()=>r.slots.register({name:"main",key:Um,locale:co,inject:()=>({renderPanel:()=>(0,dr.createElement)(_m,{uiWorkspace:a})})},s=>(0,dr.createElement)("div",{className:"kanban-main-shell"},s.renderPanel?s.renderPanel():null))),l=r.slots.inject("sidebar.panellist",()=>r.slots.register({name:"sidebar.panellist",id:Um,order:15,label:()=>ea("boardTab"),locale:co},s=>(0,dr.createElement)(Aa,{size:s.size??16})));return()=>{l(),n()}})}};var Wm="data-dsh-kanban-style";if(typeof document<"u"&&!document.querySelector("style["+Wm+"]")){let e=document.createElement("style");e.setAttribute(Wm,""),e.textContent=Hi+WF_STYLE,document.head.appendChild(e)}function KanbanWorkflowEditor(e){
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
  var lv = (0, pe.useState)(''), live = lv[0], setLive = lv[1];
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

  // R3.7 (our fork): opening the screen puts the caret in the first column field; the marker focus trick keeps
  // it from stealing focus again after every keystroke.
  (0, pe.useEffect)(function () {
    if (rows === null) return;
    var field = document.querySelector('.kanban-wf-row input');
    if (field && !field.dataset.wfFocused) { field.dataset.wfFocused = '1'; field.focus(); }
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
  }
  // `to` is a boundary index (0..length): where the row is inserted, counted before the move.
  function applyMove(from, to) {
    var list = (rows || []).slice();
    if (from < 0 || from >= list.length || to < 0 || to > list.length) return false;
    var item = list.splice(from, 1)[0];
    var target = to > from ? to - 1 : to;
    if (target === from) return false;
    list.splice(target, 0, item);
    setDirty(true); setRows(list);
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
    for (var i = 0; i < kids.length; i++) {
      var rect = kids[i].getBoundingClientRect();
      if (clientY < rect.top + rect.height / 2) return i;
    }
    return kids.length;
  }
  function clearMove() {
    wfDrag.from = -1; wfDrag.over = -1; wfDrag.grab = -1; wfDrag.pos = -1; wfDrag.committed = false;
    setDragIdx(-1); setGrabIdx(-1); setDropAt(-1); paintDropline(-1);
  }
  function cancelMove() {
    var name = rowTitle(wfDrag.from >= 0 ? wfDrag.from : wfDrag.grab);
    announce('wfDragCancel', '{name}: move cancelled', name);
    clearMove();
  }
  function startDrag(i, ev) {
    wfDrag.from = i; wfDrag.over = -1; wfDrag.committed = false;
    setDragIdx(i); setDropAt(-1);
    announce('wfDragStart', '{name}: moving…', rowTitle(i));
    if (ev.dataTransfer) {
      ev.dataTransfer.effectAllowed = 'move';
      try { ev.dataTransfer.setData('text/plain', String(i)); } catch (ignored) {}
    }
  }
  function overRows(ev) {
    if (wfDrag.from < 0 && wfDrag.grab < 0) return;
    ev.preventDefault();
    var index = boundaryAt(ev.clientY);
    if (index < 0) return;
    if (ev.dataTransfer) ev.dataTransfer.dropEffect = 'move';
    if (index === wfDrag.over) return;
    wfDrag.over = index; setDropAt(index); paintDropline(index);
    var total = (rows || []).length;
    announce('wfDragPosition', '{name}: position {n} of {N}', rowTitle(wfDrag.from >= 0 ? wfDrag.from : wfDrag.grab),
             index > total ? total : index + 1 > total ? total : index + 1, total);
  }
  function commitMove() {
    var from = wfDrag.from >= 0 ? wfDrag.from : wfDrag.grab;
    var name = rowTitle(from);
    if (from < 0 || wfDrag.over < 0) { clearMove(); return; }
    var target = applyMove(from, wfDrag.over);
    wfDrag.committed = true;
    clearMove();
    if (target === false) announce('wfDragCancel', '{name}: move cancelled', name);
    else announce('wfDragDrop', '{name}: moved to position {n}', name, target + 1);
  }
  function dropRows(ev) { ev.preventDefault(); commitMove(); }
  function endDrag() {
    if (wfDrag.from >= 0 && !wfDrag.committed) { cancelMove(); return; }
    clearMove();
  }
  function gripKey(i, ev) {
    var key = ev.key;
    if (wfDrag.grab === i && (key === 'ArrowUp' || key === 'ArrowDown')) {
      ev.preventDefault();
      var total = (rows || []).length;
      var pos = wfDrag.pos;
      if (key === 'ArrowDown') pos = Math.min(pos + 1, total - 1);
      else pos = Math.max(pos - 1, 0);
      wfDrag.pos = pos;
      wfDrag.over = key === 'ArrowDown' ? pos + 1 : pos;
      setDropAt(wfDrag.over); paintDropline(wfDrag.over);
      announce('wfDragPosition', '{name}: position {n} of {N}', rowTitle(i), pos + 1, total);
      return;
    }
    if (key === ' ' || key === 'Enter') {
      ev.preventDefault();
      if (wfDrag.grab < 0) {
        wfDrag.grab = i; wfDrag.over = i; wfDrag.pos = i; wfDrag.committed = false;
        setGrabIdx(i); setDropAt(i); paintDropline(i);
        announce('wfDragStart', '{name}: moving…', rowTitle(i));
      } else { commitMove(); }
      return;
    }
    if (key === 'Escape' && wfDrag.grab === i) { ev.preventDefault(); cancelMove(); }
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
  function onBoard(title) { var needle = String(title).trim().toLowerCase(); return boardCols.some(function (c) { return c.toLowerCase() === needle; }); }
  var extraCols = boardCols.filter(function (title) { var needle = String(title).trim().toLowerCase(); return title && (rows || []).every(function (r) { return r.title.trim().toLowerCase() !== needle; }); });
  function switchRow(key, fallback, on, field) {
    return (0, W.jsxs)('label', { className: 'kanban-wf-note', children: [
      (0, W.jsx)('input', { type: 'checkbox', checked: !!on, onChange: function (ev) { setDirty(true); setExtra(Object.assign({}, extra, (function () { var o = {}; o[field] = ev.target.checked; return o; })())); } }),
      text(key, fallback)
    ] }, key);
  }
  var kinds = [['entry', 'wfKindEntry', 'First stop'], ['source', 'wfKindSource', 'Taken from'], ['flow', 'wfKindFlow', 'Middle step'], ['done', 'wfKindDone', 'Done']];
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
        (0, W.jsx)('p', { className: 'kanban-wf-error', role: 'alert', children: fill(text('wfLoadFailed', 'Could not read the settings: {detail}'), 'detail', fatal) }),
        (0, W.jsx)('button', { className: 'kanban-toolbar-button', type: 'button', onClick: load, children: text('wfRetry', 'Retry') })
      ] }, 'fatal') : null,
      err ? (0, W.jsx)('p', { id: 'kanban-wf-error', className: 'kanban-wf-error', role: 'alert', children: err }, 'inline') : null,
      (0, W.jsxs)('div', { className: 'kanban-wf-section', children: [
        (0, W.jsxs)('div', { className: 'kanban-wf-section-head', children: [
          (0, W.jsxs)('div', { children: [
            (0, W.jsx)('div', { className: 'kanban-wf-caption', children: text('wfColumns', 'Columns') }),
            (0, W.jsx)('p', { className: 'kanban-wf-section-sub', children: text('wfDragHint', 'Drag a row to reorder') }),
            (0, W.jsx)('p', { className: 'kanban-wf-section-sub', children: text('wfStepExplain', 'Taken from: cards are pulled from this column. First stop: a pulled card is placed here first.') })
          ] }),
          (0, W.jsx)('span', { className: 'kanban-wf-scope', children: text('wfScopeAll', 'all boards') })
        ] }),
        rows !== null && rows.length === 0 ? (0, W.jsx)('p', { className: 'kanban-wf-muted', children: text('wfColumnsEmpty', 'The workflow needs at least one column') }, 'empty') : null,
        (0, W.jsxs)('div', { className: 'kanban-wf-headrow', 'aria-hidden': 'true', children: [
          (0, W.jsx)('span', { className: 'h-grip' }, 'hd-grip'),
          (0, W.jsx)('span', { className: 'h-dot', children: text('wfColOnBoard', 'On board') }, 'hd-dot'),
          (0, W.jsx)('span', { className: 'h-name', children: text('wfColName', 'Column') }, 'hd-name'),
          (0, W.jsx)('span', { className: 'h-role', children: text('wfColRole', 'Team role') }, 'hd-role'),
          (0, W.jsx)('span', { className: 'h-step', children: text('wfColStep', 'Pipeline step') }, 'hd-step'),
          (0, W.jsx)('span', { className: 'h-del' }, 'hd-del')
        ] }, 'headrow'),
        (0, W.jsxs)('div', { className: 'kanban-wf-rows', onDragOver: overRows, onDrop: dropRows, children: [
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
                (0, W.jsxs)('select', { className: 'kanban-orch-select kanban-wf-a-step', value: r.kind, draggable: false, 'aria-label': text('wfColStep', 'Pipeline step'), onChange: function (ev) { patchRow(i, { kind: ev.target.value }); }, children: kinds.map(function (k) { return (0, W.jsx)('option', { value: k[0], children: text(k[1], k[2]) }, k[0]); }) }),
                (0, W.jsxs)('span', { className: 'kanban-wf-del kanban-wf-a-del', children: [
                  (0, W.jsx)('button', { className: 'kanban-toolbar-button', type: 'button', draggable: false, 'aria-label': text('wfRemove', 'Remove column'), title: text('wfRemove', 'Remove column'), onClick: function () { removeRow(i); }, children: '\u2715' })
                ] })
              ]
            }, r.title + ':' + i);
          })
        ] }, 'rows'),
        extraCols.length ? (0, W.jsx)('p', { className: 'kanban-wf-muted', children: fill(text('wfExtraColumns', 'This board has columns outside the rule: {names}. They stay on the board but are not automated.'), 'names', extraCols.join(', ')) }, 'extra') : null,
        atLimit ? (0, W.jsx)('p', { className: 'kanban-wf-muted', children: text('wfMaxColumns', 'Maximum 12 columns') }, 'limit') : (0, W.jsxs)('div', { className: 'kanban-wf-tools', children: [
          (0, W.jsx)('input', { value: newTitle, maxLength: 60, 'aria-label': text('wfAdd', 'Add column'), placeholder: text('wfAdd', 'Add column'), onChange: function (ev) { setNewTitle(ev.target.value); }, onKeyDown: function (ev) { if (ev.key === 'Enter') addColumn(); } }),
          (0, W.jsx)('button', { className: 'kanban-toolbar-button', type: 'button', disabled: !String(newTitle || '').trim(), onClick: addColumn, children: text('wfAdd', 'Add column') })
        ] }, 'add'),
        (0, W.jsx)('div', { className: 'kanban-wf-live', 'aria-live': 'polite', children: live }, 'live')
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
          (0, W.jsx)('option', { value: 'created', children: text('wfPullCreated', 'by creation') }, 'c'),
          (0, W.jsx)('option', { value: 'board', children: text('wfPullBoard', 'board order') }, 'b')
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

var bL=qm;
/*! Bundled license information:

lucide-react/dist/esm/shared/src/utils/toKebabCase.mjs:
lucide-react/dist/esm/shared/src/utils/toLucideIconData.mjs:
lucide-react/dist/esm/shared/src/utils/toCamelCase.mjs:
lucide-react/dist/esm/shared/src/utils/toPascalCase.mjs:
lucide-react/dist/esm/shared/src/utils/mergeClasses.mjs:
lucide-react/dist/esm/shared/src/build/defaultAttributes.mjs:
lucide-react/dist/esm/shared/src/build/buildLucideIconNode.mjs:
lucide-react/dist/esm/shared/src/build/buildLucideIconForReact.mjs:
lucide-react/dist/esm/shared/src/utils/hasA11yProp.mjs:
lucide-react/dist/esm/context.mjs:
lucide-react/dist/esm/Icon.mjs:
lucide-react/dist/esm/createLucideIcon.mjs:
lucide-react/dist/esm/icons/bot.mjs:
lucide-react/dist/esm/icons/calendar-days.mjs:
lucide-react/dist/esm/icons/check.mjs:
lucide-react/dist/esm/icons/chevron-down.mjs:
lucide-react/dist/esm/icons/chevron-up.mjs:
lucide-react/dist/esm/icons/external-link.mjs:
lucide-react/dist/esm/icons/file-text.mjs:
lucide-react/dist/esm/icons/funnel.mjs:
lucide-react/dist/esm/icons/grip-vertical.mjs:
lucide-react/dist/esm/icons/list.mjs:
lucide-react/dist/esm/icons/message-square.mjs:
lucide-react/dist/esm/icons/pencil.mjs:
lucide-react/dist/esm/icons/play.mjs:
lucide-react/dist/esm/icons/plus.mjs:
lucide-react/dist/esm/icons/refresh-cw.mjs:
lucide-react/dist/esm/icons/send.mjs:
lucide-react/dist/esm/icons/settings-2.mjs:
lucide-react/dist/esm/icons/square-kanban.mjs:
lucide-react/dist/esm/icons/tag.mjs:
lucide-react/dist/esm/icons/tags.mjs:
lucide-react/dist/esm/icons/trash.mjs:
lucide-react/dist/esm/icons/x.mjs:
lucide-react/dist/esm/lucide-react.mjs:
  (**
   * @license lucide-react v1.61.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   *)
*/

    return (module.exports && module.exports.default) || module.exports
  },
})