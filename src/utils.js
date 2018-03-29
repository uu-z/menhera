export const keyParser = ({
  obj,
  struct = {},
  ...other
}= {}) => {
  Object.keys(other).forEach(key => {
    if (Array.isArray(other[key])) {
      if (!struct[key]) {
        struct[key] = {}
      }

      other[key].forEach(keyword => {
        struct[key][keyword] = obj[keyword]
      })
    }
  })
  return struct
}

export const typeParser = ({
  obj,
  struct = {},
} = {}) => {
  struct = {...struct, props:{}, events:{}}
  Object.keys(obj).forEach(key => {
    if (typeof obj[key] === 'function') {
      struct["events"][key] = obj[key]
    } else {
      struct["props"][key] = obj[key]
    }
  })
  return struct
}

export const ConfigMerger = (Obj1, Obj2) => {
  let cache = Obj1
  Object.keys(Obj2).forEach(key => {
    cache[key] = [...Obj1[key] || [], ...Obj2[key]]
  })
  return cache
}