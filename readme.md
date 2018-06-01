# Menhera

an experimental lovely framework

### Install

```bash
yarn add menhera
```

### Example

```js
import Mhr from 'menhera'

Mhr.$use({
  '$foo.bar': {
    test: ({_val}) => console.log(_val),
    testFn: ({_val}) => console.log(_val())
  },
  'foo.bar': {
    test: 'foo bar',
    testFn: () => 'foo bar'
  }
})
```
