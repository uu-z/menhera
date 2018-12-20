export const _compilers = {
  _hooks: ctx => {
    let keys = ctx._keys
    keys = keys.filter(key => key.startsWith('$'))
    if (keys.length > 0) {
      ctx._hooks = {}
      keys.forEach(key => {
        let newKey = key.replace(/\$/, '')
        ctx._hooks[newKey] = ctx._object[key]
      })
    }
  },
  _metas: ctx => {
    let keys = ctx._keys
    keys = keys.filter(key => key.startsWith('__'))
    if (keys.length > 0) {
      ctx._metas = {}
      keys.forEach(key => {
        let newKey = key.replace(/__/, '')
        ctx._metas[newKey] = ctx._object[key]
      })
    }
  }
}
