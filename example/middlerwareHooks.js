import Mhr from '../dist'

let add = val => async (ctx, next) => {
  ctx._val += val
  console.log(ctx._val)
  await next()
}

Mhr.$use({
  _hooks: {
    foo: {
      bar: [add(1), add(2), add(3), add(4)]
    }
  },
  'foo.bar': 1
})
