var assert = require('chai').assert,
    deepval = require('./index');

var test = {
  foo: 'bar',
  a: {
    b: {
      c: 'deep'
    }
  }
};

var testExpected = {
  foo: 'voo',
  a: {
    b: {
      c: 'voo'
    },
    d: {
      e: {
        f: 'foo'
      }
    }
  },
  g: {
    empty: 'ok'
  }
};

describe('getting values returns correct key value', function () {
  it('shallow values', function () {
    assert.equal(deepval(test, 'foo'), 'bar', 'shallow value get');
  });
  it('deep values', function () {
    assert.equal(deepval(test, 'a.b.c'), 'deep', 'deep value get');
  });
});

describe('getting non-existent values return undefined', function () {
  it('shallow values', function () {
    assert.equal(deepval(test, 'z'), undefined, 'shallow undefined get');
  });
  it('middle deep values', function () {
    assert.equal(deepval(test, 'a.e.c'), undefined, 'deep undefined get');
  });
  it('end deep values', function () {
    assert.equal(deepval(test, 'a.b.d'), undefined, 'end deep undefined get');
  });
});

describe('setting values sets correct value', function () {
  it('shallow set', function () {
    assert.equal(deepval(test, 'foo', 'voo'), testExpected.foo, 'shallow value set');
  });
  it('deep set', function () {
    assert.equal(deepval(test, 'a.b.c', 'voo'), testExpected.a.b.c, 'deep value set');
  });
});

describe('setting values on non-existent paths', function () {
  it('creates the parent objects', function () {
    assert.equal(deepval(test, 'a.d.e.f', 'foo'), testExpected.a.d.e.f, 'intermediate non-existent objects created');
  });
});

describe('can set deep values that are empty', function () {
  it('deep values that are empty', function () {
    assert.equal(deepval(test, 'g.empty', 'ok'), testExpected.g.empty, 'deep value set empty');
  });
});

describe('can remove values', function () {
  it('values are removed', function () {
    deepval(test, 'foo', null, true);
    assert.equal(deepval(test, 'foo'), undefined, 'value is undefined');
  });
});
