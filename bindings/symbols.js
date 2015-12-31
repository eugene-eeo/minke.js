(function() {
  var isFF = navigator.userAgent.match('Firefox');
  var keys = {
    ',':  188,
    '.':  190,
    '/':  191,
    '`':  192,
    '\\': 220,
    '[':  219,
    ']':  221,
    '-':  173,
    ';':  isFF ? 59  : 186,
    '=':  isFF ? 61  : 187,
    '-':  isFF ? 173 : 189,
  };
  for (var o in keys)
    Minke.keys[o] = keys[o];
})();
