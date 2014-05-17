# deepval [![](https://travis-ci.org/diffsky/deepval.png)](https://travis-ci.org/diffsky/deepval)

Get, Set and Remove object values using dot-delimited key strings

```
deepval(<object to inspect>, <string path>, [value to set], [boolean: remove])
```

```
var obj = {
  a: {
    b: {
      c: 'deep'
    }
  }
};

console.log(deepval(obj, 'a.b.c'))  // 'deep'
deepval(obj, 'a.b.c', 'something');
console.log(deepval(obj, 'a.b.c'))  // 'something'
deepval(obj, 'a.b.c', null, true);
console.log(deepval(obj, 'a.b.c'))  // undefined
```
