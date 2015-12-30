Minke = function(el) {
  var handlers = {};
  var listener = function(ev) {
    var keys = [];
    if (ev.shiftKey) keys.push(16);
    if (ev.ctrlKey)  keys.push(17);
    if (ev.altKey)   keys.push(18);
    if (ev.metaKey)  keys.push('meta');
    keys.push(ev.which || ev.keyCode);

    var handler = handlers[keys.sort().join('+')] || function(){};
    handler(ev);
  };
  var api = {
    bind:   function() { el.addEventListener('keydown', listener); },
    unbind: function() { el.removeEventListener('keydown', listener); },
    on: function(codes, handler) {
      var key = Minke.keys(codes).sort().join('+');
      handlers[key] = handler;
      return api;
    }
  };
  api.bind();
  return api;
};

(function() {
  Minke.keys = function keys(str) {
    return str.split(' ').map(function(val) {
      return (typeof val === 'string')
        ? lookup[val] || +val
        : val;
    });
  };

  var lookup = Minke.lookup = {
    'backspace': 8,
    'tab':       9,
    'enter':     13,
    'shift':     16,
    'ctrl':      17,
    'alt':       18,
    'left':      37,
    'up':        38,
    'right':     39,
    'down':      40,
  };

  // Alphabets
  for (var i=97; i <= 122; i++)
    lookup[String.fromCharCode(i)] = i - 32;

  // Integers 0-9
  for (var i=0; i <= 9; i++)
    lookup[i] = i + 48;

  // Function keys
  for (var i=1; i <= 12; i++)
    lookup['f'+i] = i+111;
})();
