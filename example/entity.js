import Mhr, {entity} from '../src'

Mhr.$use({
  _run: {entity},
  entity: [
    {
      foo: 1
    },
    {
      bar: 2
    }
  ]
})

console.log(Mhr)
console.log(Mhr.scan(['foo', 'bar']))
