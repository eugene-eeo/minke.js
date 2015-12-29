# minke.js

A fun little JS microlibrary for the browser to handle
keyboard shortcuts without driving you insane.

```js
var minke = new Minke(el);
minke.on(['ctrl', 'shift', 188], function(ev) {
  console.log(ev.target);
  ev.preventDefault();
});
// el now responds to Ctrl+Shift+,
```
