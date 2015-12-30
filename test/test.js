var assert = chai.assert;

describe('Minke#on', function() {
  var el = $('input');
  var minke = new Minke(el);

  it('supports modifier + normal key', function(done) {
    minke.on('ctrl s', function(ev) {
      done();
    });
    var ev = $kbd({ctrlKey: true, keyCode: 83});
    el.dispatchEvent(ev);
  });

  it('supports normal keys', function(done) {
    minke.on('tab', function(ev) {
      done();
    });
    var ev = $kbd({keyCode: 9});
    el.dispatchEvent(ev);
  });
});

describe('Minke#unbind', function() {
  var el = $('input');
  var minke = new Minke(el);

  it('unbinds the main handler', function() {
    var d;
    minke.on('tab', function(ev) {
      d = 1;
    });
    minke.unbind();
    var ev = $kbd({keyCode: 9});
    el.dispatchEvent(ev);
    assert(d !== 1);
  });
});

describe('Minke.keys', function() {
  it('supports space delimited combos', function() {
    var keys = Minke.keys('ctrl alt tab');
    assert.deepEqual(keys, [17, 18, 9]);
  });
  it('supports a normal array of numbers', function() {
    var keys = [1,2,3];
    assert.deepEqual(Minke.keys(keys), keys);
  });
  it('works for alphabets', function() {
    for (var i = 97; i <= 112; i++) {
      var c = String.fromCharCode(i);
      var s = Minke.keys(c);
      assert.deepEqual(s, [i-32]);
    }
  });
  it('works for single numbers', function() {
    for (var i = 0; i <= 9; i++)
      assert.deepEqual(Minke.keys(i.toString()), [48+i]);
  });
  it('works for function keys', function() {
    for (var i = 1; i <= 12; i++) {
      assert.deepEqual(Minke.keys('f'+i), [111+i]);
    }
  });
  it('works for raw digits', function() {
    assert.deepEqual(Minke.keys('100'), [100]);
  });
});
