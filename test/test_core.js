describe('Minke(ev)', function() {
  var minke = Minke();

  it('matches combos to events', function(done) {
    minke.on('ctrl tab', function(ev) {
      done();
    });
    minke($kbd({
      ctrlKey: true,
      keyCode: 9
    }));
  });

  it('works for multiple modifier keys', function(done) {
    minke.on('ctrl alt meta shift tab', function(ev) {
      done();
    });
    minke($kbd({
      ctrlKey: true,
      altKey: true,
      metaKey: true,
      shiftKey: true,
      keyCode: 9
    }));
  });

  it('works for a single non-modifier key', function(done) {
    minke.on('tab', function() {
      done();
    });
    minke($kbd({
      keyCode: 9
    }));
  });

  it('can be used as an event handler', function(done) {
    minke.on('enter', function() {
      done();
    });
    var el = $('input');
    el.onkeydown = minke;
    el.dispatchEvent($kbd({
      keyCode: 13
    }));
  });

  it("doesn't fire if the keybindings do not match", function() {
    var minke = Minke();
    minke.on('tab', function() { assert(false); });
    minke($kbd({
      keyCode: Minke.keys['a']
    }));
  });
});

describe('Minke.on', function() {
  it('returns the minke instance for chaining', function() {
    var fn = function() {};
    var minke = Minke();
    assert(minke.on('tab', fn) === minke);
  });
  
  it('accepts a list of combos', function() {
    var da = [];
    var minke = Minke().on(['tab', 'enter'], function() {
      da.push(1);
    });
    ['tab', 'enter'].forEach(function(key) {
      minke($kbd({
        keyCode: Minke.keys[key]
      }));
    })
    assert(da.length === 2);
  });
});
