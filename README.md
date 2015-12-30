# minke.js

A fast, fun little JS microlibrary that helps you handle
keyboard shortcuts (any number of modifier keys and a 'normal'
key, e.g. Ctrl + B, Tab, Enter, etc.) without driving you insane.

```js
var minke = new Minke(el);
minke.on('ctrl shift ,', function(ev) {
});

minke.on('ctrl B', toggleBold);    // Ctrl+B
minke.on('meta B', toggleBold);    // ⌘ +B
minke.unbind();
```

### adding custom key names

The only special key is the meta key- rather than using
the browser-specific keycodes, internally minke normalises
it to 'meta'.

```js
minke.keys.lookup['customKey'] = keyCode;
minke.keys.lookup['⌘'] = 'meta';
minke.on('ctrl customKey', fn);
minke.on('⌘ B', fn);
```
