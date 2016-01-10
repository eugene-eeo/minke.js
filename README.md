# minke.js

<img src='media/minke.png' align='right'/>

A fast, fun little JS microlibrary that helps you handle
keyboard shortcuts (zero or more modifier keys followed by a
non-modifier key, e.g. Ctrl + B, Tab, Enter, etc.) without
driving you insane.

```js
var minke = Minke();
minke.on('tab', fn)
     .on('ctrl alt ,', fn)
     .on(['ctrl b', 'meta b'], toggleBold)
el.onkeydown = minke;
```

Currently Minke does not support multiple handlers to be bound
under the same shortcut. This is because I don't usually find
myself binding multiple callbacks on a single shortcut.

### Default key names

|         | Description                    | KeyCode(s) |
|:-------:|:------------------------------ |:----------:|
| `[a-z]` | Alphabets                      | 65-90      |
| `[0-9]` | Numbers on the number row      | 48-57      |
| `shift` | Shift key                      | 16         |
| `ctrl`  | Control key (not ⌘ key on Mac) | 17         |
| `meta`  | Meta key (windows key, etc.)   | normalised |
| `alt`   | Alt key                        | 18         |
| `up,down,left,right` | Arrow keys        | 37-40      |
| `f[1-12]` | Function keys                | 112-123    |

The only special key is the meta key- rather than using
the browser-specific keycodes, internally Minke normalises
it to 'meta'. You can add your custom key names:

```js
Minke.keys['customKey'] = keyCode;
Minke.keys['⌘'] = 'meta';
minke.on('ctrl customKey', fn);
minke.on('⌘ B', fn);
```

You can see an example of how it's done in the
[symbol bindings](bindings/symbols.js).
