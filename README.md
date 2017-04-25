# deepval [![](https://travis-ci.org/diffsky/deepval.svg)](https://travis-ci.org/diffsky/deepval)

Get, Set and Remove object values using dot-delimited key strings

```
deepval(<object to inspect>, <string path> or <array of string keys>, [value to set], [boolean: remove])
```

or:
```
deepval.get(obj, path);
deepval.set(obj, path, value);
deepval.del(obj, path);
```

examples:
```
var obj = {
  a: {
    b: {
      c: 'deep'
    },
    d: ['foo'],
    e: ['bar', ['aaa', 'bbb']]
  }
};

// get a value
console.log(deepval(obj, 'a.b.c'));   // 'deep'
// set a value
deepval(obj, 'a.b.c', 'something');
console.log(deepval(obj, 'a.b.c'));   // 'something'
// remove a value
deepval(obj, 'a.b.c', null, true);
console.log(deepval(obj, 'a.b.c'));   // undefined
// read array values
console.log(deepval(obj, 'a.d.0'));   // 'foo'
console.log(deepval(obj, ['a', 'd', 0]));   // 'foo'
console.log(deepval(obj, 'a.e.1.0')); // 'aaa'
```

deepval provides a utility function `dotpath` to create a dot-delimited string
from a set of passed arguments:
```
console.log(deepval.dotpath('hello', a.b.0))  //  'hello.foo'
```
