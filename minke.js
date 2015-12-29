Minke = function(el) {
  this.el = el;
  this.bound = false;
  this.handlers = {'*': function() {}};
  this.listener = function(ev) {
    var keys = [];
    if (ev.shiftKey) keys.push(16);
    if (ev.ctrlKey)  keys.push(17);
    if (ev.altKey)   keys.push(18);

    var norm = ev.which || ev.keyCode;
    if (!~keys.indexOf(norm))
      keys.push(norm);

    var hkey = keys.sort().join('+');
    var handler = this.handlers[hkey] || this.handlers['*'];

    handler(ev);
  }.bind(this);
  this.bind();
};

Minke.prototype = {
  bind: function(ev) {
    this.el.addEventListener('keydown', this.listener);
  },

  unbind: function(ev) {
    this.el.removeEventListener('keydown', this.listener);
  },

  on: function(codes, handler) {
    var key = Minke.keys(codes).join('+');
    this.handlers[key] = handler;
    return handler;
  },
};

(function() {
  var number = /[0-9]/;
  var fnkeys = /f1?[0-9]/;
  var lookup = {
    'backspace': 8,
    'tab':       9,
    'enter':     13,
    'shift':     16,
    'ctrl':      17,
    'alt':       18,
    'down':      40,
    'up':        38,
    'left':      37,
    'right':     39,
    ',':         188,
    '.':         190,
    '/':         191,
    '\\':        220,
    '[':         219,
    ']':         221,
    '=':         61,
    '-':         173,
  };

  Minke.keys = function(seq) {
    if (typeof seq === "string")
      return Minke.keys(seq.split('+'));
    var a = [];
    for (var i=seq.length; i--;) {
      var val = seq[i];
      if (typeof val !== 'number') {
        if (val.length === 1 && number.test(val)) val = 48 + (+val);
        else if (fnkeys.test(val)) val = 111 + (+val.slice(1));
        else                       val = lookup[val] || +val;
      }
      a.push(val);
    }
    return a.sort();
  };
})();
