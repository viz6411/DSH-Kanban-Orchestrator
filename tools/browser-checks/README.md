# Проверка UI этого плагина в реальном браузере

Скрипты поднимают headless Chromium через Playwright и открывают живой DSH Web UI.

```bash
LD_LIBRARY_PATH=/home/viz/tools/libs HOME=/home/viz FONTCONFIG_PATH=/home/viz/tools/fontconfig \
  node tools/browser-checks/<скрипт>.mjs
```

- `lab.mjs` — общий хелпер `openGui({width,height})`: берёт launch-token из журнала `dsh-web.service`, поднимает Chromium, подмешивает DejaVu (иначе в headless нет шрифтов и текст не рендерится), возвращает `{browser, context, page}`.
- `wf3.mjs` — полный прогон экрана Workflow: чип, меню доски, структура панели, дубликат имени, сохранение, переключатель доски, закрытие с несохранёнными правками. Требуются **реальные клики** Playwright: Radix-меню не открывается от `element.click()` внутри `page.evaluate`.
- `wf4.mjs` — короткая сводка (7 строк) + скриншоты, в конце возвращает переключатель доски в исходное состояние.
- `wf5.mjs` — поведение при ширине 900px (панель целиком во вьюпорте, горизонтального скролла нет).
- `d1.mjs` — чип при медленном `/api/kanban get` (задержка 3 с): чип обязан присутствовать сразу как skeleton 80px и потом показать имя воркспейса.

Скрины пишутся в `/home/viz/work/shots/`. Процесс DSH падает по V8 heap при больших выводах: скрипты печатают только компактный JSON, содержимое `lib/client.js` не печатать.
