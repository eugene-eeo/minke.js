# minke.js

A fun little JS microlibrary for the browser to handle
keyboard shortcuts (any number of modifier keys + one
"normal" key) without driving you insane.

```js
var minke = new Minke(el);
minke.on('ctrl shift ,', function(ev) {
});

minke.on('ctrl B', toggleBold);
minke.on('meta B', toggleBold);
```
