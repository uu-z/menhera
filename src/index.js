import {HOOKS, initHooks, $use, $compile, _scanHooks} from './utils'

let core = {
  [HOOKS]: initHooks(),
  _scanHooks,
  _compilers: {
    hooks: ctx => {
      let keys = ctx._keys
      keys = keys.filter(key => key.startsWith('$'))
      if (keys.length > 0) {
        ctx._hooks = {}
        keys.forEach(key => {
          let newKey = key.replace(/\$/, '')
          ctx._hooks[newKey] = ctx._object[key]
        })
      }
    }
  },
  $compile,
  $use: data => {
    $use(core, core.$compile(core, data))
    return core
  }
}

export default core
