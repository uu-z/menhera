import Mhr, {entity, METAS} from '../src'

Mhr.$use({
  _run: {entity},
  entity: [
    {
      a: {
        type: 'int',
        val: 1
      },
      init: {
        type: 'float',
        val: 1
      }
    },
    {
      init: {
        type: 'object',
        val: {
          a: {
            type: 'int',
            val: 1
          },
          b: {
            type: 'int',
            val: 2
          }
        }
      }
    }
  ]
})

// console.log(Mhr)
console.log(Mhr.query(['a']))

console.log(Mhr.queryRaw(['a']))
