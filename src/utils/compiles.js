export const hooks = ctx => {
  let keys = Object.keys(ctx._object)
  keys = keys.filter(key => key.startsWith('$'))
  if (keys.length > 0) {
    ctx._hooks = {}
    keys.forEach(key => {
      let newKey = key.replace(/\$/, '')
      ctx._hooks[newKey] = ctx._object[key]
      delete ctx._object[key]
    })
  }
}
