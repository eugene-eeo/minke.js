# minke.js

<img src='media/minke.png' align='right'/>

A fast, fun little JS microlibrary that helps you handle
keyboard shortcuts (any number of modifier keys and a non-modifier
key, e.g. Ctrl + B, Tab, Enter, etc.) without driving you insane.

```js
var minke = new Minke(el);
minke.on('tab',   fn);
minke.on('enter', fn);

minke.on('ctrl b', toggleBold);    // Ctrl+B
minke.on('meta b', toggleBold);    // ⌘ +B
minke.unbind();
```

Currently Minke does not support multiple handlers to be bound
under the same shortcut. This is because I don't usually find
myself binding multiple callbacks on a single shortcut.

### adding custom key names

The only special key is the meta key- rather than using
the browser-specific keycodes, internally Minke normalises
it to 'meta'.

```js
Minke.lookup['customKey'] = keyCode;
Minke.lookup['⌘'] = 'meta';
minke.on('ctrl customKey', fn);
minke.on('⌘ B', fn);
```

You can see an example of how it's done in the
[symbol bindings](bindings/symbols.js).
