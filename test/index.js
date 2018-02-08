'use strict';

var test = require('tape');
var deepval = require('..');

var data = {
  foo: 'bar',
  del: [
    'a',
    'b',
    'c'
  ],
  a: {
    b: {
      c: 'deep'
    },
    d: ['foo'],
    e: [
      ['bar']
    ]
  },
  nulls: null
};

var expect = {
  foo: 'voo',
  del: [
    'a',
    'b'
  ],
  a: {
    b: {
      c: 'voo',
      c1: 'voo'
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
  i: [
    ['bar'],
    ['zzz']
  ]
};

test('getting values returns correct key value', function (t) {
  t.plan(4);
  t.equal(deepval(data, 'foo'), 'bar', 'shallow value get');
  t.equal(deepval(data, 'a.b.c'), 'deep', 'deep value get');
  t.equal(deepval(data, 'foo'), 'bar', 'shallow value get');
  t.equal(deepval(data, 'a.b.c'), 'deep', 'deep value get');
});

test('getting values via .get returns correct key value', function (t) {
  t.plan(2);
  t.equal(deepval.get(data, 'foo'), 'bar', 'shallow value get');
  t.equal(deepval.get(data, 'a.b.c'), 'deep', 'deep value get');
});

test('getting values in arrays returns correct key value', function (t) {
  t.plan(3);
  t.equal(deepval(data, 'a.d.0'), 'foo', 'shallow array value get');
  t.equal(deepval(data, ['a', 'd', 0]), 'foo', 'shallow array value get with array path');
  t.equal(deepval(data, 'a.e.0.0'), 'bar', 'nested array value get');
});

test('setting values in arrays works', function (t) {
  t.plan(3);
  t.equal(deepval(data, 'h', ['foo'])[0], expect.h[0], 'shallow array value set');

  deepval(data, 'i.0.0', 'bar');
  deepval(data, 'i.0.1', 'zzz');
  t.equal(deepval(data, 'i.0.0'), 'bar', 'first nested array value set');
  t.equal(deepval(data, 'i.0.1'), 'zzz', 'second nested array value set');
});

test('getting non-existent values return undefined', function (t) {
  t.plan(6);
  t.equal(deepval(data, 'z'), undefined, 'shallow undefined get');
  t.equal(deepval(data, 'a.e.c'), undefined, 'deep undefined get');
  t.equal(deepval(data, 'a.b.d'), undefined, 'end deep undefined get');
  t.equal(deepval.get(undefined, 'nothing.here'), undefined, 'undefined returned when no object passed');
  t.equal(deepval.get(data, 'nulls.nothing.here'), undefined, 'undefined returned when intermediate key is null');
  t.equal(deepval(data, 'nulls'), null, 'but can get a null value');
});

test('setting values sets correct value', function (t) {
  t.plan(3);
  t.equal(deepval(data, 'foo', 'voo'), expect.foo, 'shallow value set');
  t.equal(deepval(data, 'a.b.c', 'voo'), expect.a.b.c, 'deep value set');
  t.equal(deepval(data, ['a', 'b', 'c1'], 'voo'), expect.a.b.c1, 'deep value set via an array');
});

test('setting values via .set sets correct value', function (t) {
  t.plan(2);
  t.equal(deepval.set(data, 'foo', 'voo'), expect.foo, 'shallow value set');
  t.equal(deepval.set(data, 'a.b.c', 'voo'), expect.a.b.c, 'deep value set');
});

test('setting values on non-existent paths', function (t) {
  t.plan(1);
  t.equal(deepval(data, 'a.d.e.f', 'foo'), expect.a.d.e.f, 'intermediate non-existent objects created');
});

test('can set deep values that are empty', function (t) {
  t.plan(1);
  t.equal(deepval(data, 'g.empty', 'ok'), expect.g.empty, 'deep value set empty');
});

test('can remove values', function (t) {
  t.plan(2);
  deepval(data, 'foo', null, true);
  t.equal(data.foo, undefined, 'value is undefined');
  deepval.del(data, 'del.2');
  t.equal(data.del.length, 2, 'deleted array values are re-indexed');
});

test('can remove values via .del', function (t) {
  t.plan(1);
  deepval.del(data, 'foo');
  t.equal(data.foo, undefined, 'value is undefined');
});

test('provides a utlity function to join variables as a dotpath', function (t) {
  t.plan(1);
  var a = 'hello';
  var b = 'test';
  deepval.dotpath(a, 'world', b);
  t.equal(deepval.dotpath(a, 'world', b), 'hello.world.test', 'dotpath is created correctly');
});
