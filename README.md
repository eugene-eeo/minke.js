# minke.js

A fast, fun little JS microlibrary that helps you handle
keyboard shortcuts and key presses (e.g. Ctrl + B, Tab,
Enter, etc.) without driving you insane.

```js
var minke = new Minke(el);
minke.on('ctrl shift ,', function(ev) {
});

minke.on('ctrl B', toggleBold);    // Ctrl+B
minke.on('meta B', toggleBold);    // ⌘ +B
minke.unbind();
```
