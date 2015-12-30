Minke = function(el) {
  this.el = el;
  this.handlers = {};
  this.listener = function(ev) {
    var keys = [];
    if (ev.shiftKey) keys.push(16);
    if (ev.ctrlKey)  keys.push(17);
    if (ev.altKey)   keys.push(18);
    if (ev.metaKey)  keys.push('meta');
    keys.push(ev.which || ev.keyCode);

    var handler = this.handlers[keys.sort().join('+')] || function(){};
    handler(ev);
  }.bind(this);
  this.bind();
};

Minke.prototype = {
  bind: function() {
    this.el.addEventListener('keydown', this.listener);
  },

  unbind: function() {
    this.el.removeEventListener('keydown', this.listener);
  },

  on: function(codes, handler) {
    var key = Minke.keys(codes).sort().join('+');
    this.handlers[key] = handler;
    return handler;
  },
};

(function() {
  Minke.keys = function keys(seq) {
    if (typeof seq === "string")
      return keys(seq.split(' '));
    return seq.map(function(val) {
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
