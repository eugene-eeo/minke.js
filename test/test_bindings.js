describe('Minke.parse', function() {
  var parse = Minke.parse;

  it('supports space delimited combos', function() {
    assert.deepEqual(parse('ctrl alt tab'),  [17, 18, 9]);
    assert.deepEqual(parse('ctrl  alt tab'), [17, 18, 9]);
  });

  it('works for alphabets', function() {
    for (var i = 97; i <= 112; i++) {
      var letter = String.fromCharCode(i);
      var keys   = parse(letter);
      assert.deepEqual(keys, [i-32]);
    }
  });

  it('works for single numbers', function() {
    for (var i = 0; i <= 9; i++)
      assert.deepEqual(parse(i.toString()), [48+i]);
  });

  it('works for function keys', function() {
    for (var i = 1; i <= 12; i++) {
      assert.deepEqual(parse('f'+i), [111+i]);
    }
  });

  it('works for raw digits', function() {
    assert.deepEqual(parse('100'), [100]);
  });

  it('returns the normalised meta key', function() {
    assert.deepEqual(parse('meta'), ['meta']);
  });

  it('supports adding new keys', function() {
    Minke.keys['π'] = 'pi';
    assert.deepEqual(parse('π'), ['pi']);
    assert.deepEqual(parse('1 π'), [49, 'pi']);
  });
});
