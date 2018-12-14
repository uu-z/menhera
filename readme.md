# Menhera

an experimental lovely framework

### Install

```bash
yarn add menhera
```

### Example

```js
const Mhr = require('menhera').default
const {sugar} = require('menhera')

Mhr.$use({
  $foo: sugar.relay('bar'),
  $bar({_val}) {
    console.log(_val)
  },
  foo: [{a: 1, b: 2}, {a: 2, b: 3}, {a: 3, b: 4}]
})

// { a: 1, b: 2 }
// { a: 2, b: 3 }
// { a: 3, b: 4 }
```
