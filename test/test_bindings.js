describe('Minke.parse', function() {

  it('supports space delimited combos', function() {
    var keys = Minke.parse('ctrl alt tab');
    assert.deepEqual(keys, [17, 18, 9]);
  });

  it('works for alphabets', function() {
    for (var i = 97; i <= 112; i++) {
      var letter = String.fromCharCode(i);
      var keys   = Minke.parse(letter);
      assert.deepEqual(keys, [i-32]);
    }
  });

  it('works for single numbers', function() {
    for (var i = 0; i <= 9; i++)
      assert.deepEqual(Minke.parse(i.toString()), [48+i]);
  });

  it('works for function keys', function() {
    for (var i = 1; i <= 12; i++) {
      assert.deepEqual(Minke.parse('f'+i), [111+i]);
    }
  });

  it('works for raw digits', function() {
    assert.deepEqual(Minke.parse('100'), [100]);
  });

  it('returns the normalised meta key', function() {
    assert.deepEqual(Minke.parse('meta'), ['meta']);
  });
});
