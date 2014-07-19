'use strict';

var assert = require('chai').assert;
var deepval = require('./index');

var test = {
  foo: 'bar',
  a: {
    b: {
      c: 'deep'
    },
    d: ['foo'],
    e: [['bar']]
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
  },
  h: ['foo'],
  i: [['bar'], ['zzz']]
};

describe('getting values returns correct key value', function () {
  it('shallow values', function () {
    assert.equal(deepval(test, 'foo'), 'bar', 'shallow value get');
  });
  it('deep values', function () {
    assert.equal(deepval(test, 'a.b.c'), 'deep', 'deep value get');
  });
});

describe('getting values in arrays returns correct key value', function () {
  it('shallow array value', function () {
    assert.equal(deepval(test, 'a.d.0'), 'foo', 'shallow array value get');
  });
  it('nested array values', function () {
    assert.equal(deepval(test, 'a.e.0.0'), 'bar', 'nested array value get');
  });
});

describe('setting values in arrays works', function () {
  it('set shallow array value', function () {
    assert.equal(deepval(test, 'h', ['foo'])[0], testExpected.h[0], 'shallow array value set');
  });

  it('set nested array value', function () {
    deepval(test, 'i.0.0', 'bar');
    deepval(test, 'i.0.1', 'zzz');
    assert.equal(deepval(test, 'i.0.0'), 'bar', 'first nested array value set');
    assert.equal(deepval(test, 'i.0.1'), 'zzz', 'second nested array value set');
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
