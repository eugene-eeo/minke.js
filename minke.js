Minke = function(el) {
  this.el = el;
  this.bound = false;
  this.handlers = {'*': function() {}};
  this.listener = function(ev) {
    var keys = [];
    if (ev.shiftKey) keys.push(16);
    if (ev.ctrlKey)  keys.push(17);
    if (ev.altKey)   keys.push(18);
    if (ev.metaKey)  keys.push('meta');

    var norm = ev.which || ev.keyCode;
    if (!~keys.indexOf(norm) && !~Minke.keys.metas.indexOf(norm))
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
  var alphas = /^[a-zA-Z]$/;
  var number = /^[0-9]$/;
  var fnkeys = /^f1?[0-9]$/;
  var lookup = {
    'backspace': 8,
    'tab':       9,
    'enter':     13,
    'meta':      'meta',
    'shift':     16,
    'ctrl':      17,
    'alt':       18,
    'left':      37,
    'up':        38,
    'right':     39,
    'down':      40,
    ',':         188,
    '.':         190,
    '/':         191,
    '\\':        220,
    '[':         219,
    ']':         221,
    '-':         173,
  };

  Minke.keys = function(seq) {
    if (typeof seq === "string")
      return Minke.keys(seq.split(' '));
    var a = [];
    for (var i=seq.length; i--;) {
      var val = seq[i];
      if (typeof val !== 'number') {
        console.log(alphas.test(val));
        if      (number.test(val)) val = 48 + (+val);
        else if (alphas.test(val)) val = val.toUpperCase().charCodeAt(0);
        else if (fnkeys.test(val)) val = 111 + (+val.slice(1));
        else                       val = lookup[val] || +val;
      }
      a.push(val);
    }
    console.log(a);
    return a.sort();
  };

  var userAgent = navigator.userAgent;
  var isMac = userAgent.match('Mac');
  var isFF  = userAgent.match('Firefox');
  var isWK  = userAgent.match(/Safari|Chrome/);
  var isOP  = userAgent.match('Opera');

  var lMeta = 93;
  var rMeta = 93;
  if (isMac) {
    if (isFF)      { lMeta = rMeta = 224; }
    else if (isWK) { lMeta = 91; rMeta = 93; }
    else if (isOP) { lMeta = rMeta = 17; }
  }

  lookup[';'] = isFF ? 59  : 186;
  lookup['='] = isFF ? 61  : 187;
  lookup['-'] = isFF ? 173 : 189;

  Minke.lookup = lookup;
  Minke.keys.metas = [rMeta, lMeta];
})();
