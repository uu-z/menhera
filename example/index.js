const Mhr = require('../dist').default
const {sugar} = require('../dist')

Mhr.$use({
  $foo: sugar.relay('bar'),
  $bar({_val}) {
    console.log(_val)
  },
  foo: [{a: 1, b: 2}, {a: 2, b: 3}, {a: 3, b: 4}]
})
