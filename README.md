# deepval [![](https://travis-ci.org/diffsky/deepval.png)](https://travis-ci.org/diffsky/deepval)

Get, Set and Remove object values using dot-delimited key strings


```
deepval(<object to inspect>, <string path>, [value to set], [boolean: remove])
```

```
var test = {
  foo: 'bar',
  a: {
    b: {
      c: 'deep'
    }
  }
};

console.log(deepval(test, 'a.b.c'))  // 'deep'
deepval(test, 'a.b.c', 'something');
console.log(deepval(test, 'a.b.c'))  // 'something'
deepval(test, 'a.b.c', null, true);
console.log(deepval(test, 'a.b.c'))  // undefined
```
