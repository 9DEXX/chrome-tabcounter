## CU-Tab Counter
Minimalistic tab count extension:

- Shows the count of ① tabs in current window, ② tabs in all windows, ③ windows or ④ all tabs + windows.
- You can alternate between four display modes by clicking the icon.
- No tracking or analytics of any kind, no fishing, no injected ads, just a counter.
- Tested in Chrome and Vivaldi.

It's unable to count tabs in a user selection only and I don't know how to do that.

## origins
This is a miraculous fork of Asafh's Tab Counter created in 5 hours without knowledge of Javascript or Chromium APIs.

https://github.com/asafh/chrome-tabcounter

Thanks to original developers both for creating the extension as well as for releasing it as Open Source.

## known issues:
- When you switch to another window, counter in Current Window mode will show number from previously viewed window until you select other tab, close or add one in current window. Such are specifics of Chromium APIs and windows.onFocusChanged: frontmost window does not equal focused window.

- If you keep several windows visible at once, the only working counter will be in active/focused window while a counter in any other window will froze at last shown number until you activate said window.

- Extension badge width is limited. In Tabs+Windows mode you will see text being truncated with "…" (Chrome) or extending beyond the borders of the badge (Vivaldi). Specially for those cases I've added counts to tooltips: hover mouse pointer over the icon without clicking and you will see the number (check screenshot). Current Window and All Tabs modes seem unaffected even for four-digit numbers.

- If you are using Sidewise Tree Style Tabs extension count of windows and all tabs will be off by +1 since dockable sidebar is technically a window.

## license
This extension is dual licensed under [MIT](http://opensource.org/licenses/MIT) and [Apache 2.0](http://www.apache.org/licenses/LICENSE-2.0) licenses.
