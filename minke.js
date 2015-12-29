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
    this.el.addEventListener(ev || 'keydown', this.listener);
  },

  unbind: function(ev) {
    this.el.removeEventListener(ev || 'keydown', this.listener);
  },

  on: function(codes, handler) {
    var key = codes.concat([]).sort().join('+');
    this.handlers[key] = handler;
    return handler;
  },
};
