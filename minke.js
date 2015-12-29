var Minke = function(el) {
  this.el = el;
  this.bound = false;
  this.handlers = {'*': function() {}};
  this.listener = function(ev) {
    var keys = [];
    if (ev.ctrlKey)  keys.push('ctrl');
    if (ev.altKey)   keys.push('alt');
    if (ev.shiftKey) keys.push('shift');
    if (ev.metaKey)  keys.push('meta');

    var norm = ev.which || ev.keyCode;
    switch (norm) {
      case 16:
      case 17:
      case 18:
      case 224:
        break;
      default:
        keys.push(norm);
    };

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
  var shorts = /ctrl|alt|meta|shift/;
  var lookup = {
    'backspace': 8,
    'tab':       9,
    'enter':     13,
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
        else if (shorts.test(val)) val = val;
        else                       val = lookup[val] || +val;
      }
      a.push(val);
    }
    return a.sort();
  };
})();
