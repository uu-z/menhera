import {$, scanObject, HOOKS, get, set, has, matchPath, uuid} from '.'

export const $str = JSON.stringify

export const $compile = (_, _object) => $exec(_compile, _, _object)

export const _compile = (_, _object) => {
  let ctx = {
    _object,
    _keys: Object.keys(_object)
  }
  $(_._compilers, (k, v) => {
    v(ctx)
  })
  return {...ctx, ...ctx._object}
}

export const $exec = (_method, _, _object) => {
  if (!_method) {
    throw new Error('$exec: _method is invalid')
  }
  if (Array.isArray(_object)) {
    return _object.map(val => _method(_, val))
  }

  return _method(_, _object)
}

export const use = _ => data => {
  $use(_, $compile(_, data))
  return _
}

export const $use = (_, _object) => $exec(_use, _, _object)
export const _use = (_, _object) => {
  !_object.uuid && (_object.uuid = uuid.v1())
  const BindHook = ({hook, object, depth, parentDepth, _key, _val}) => {
    const validHook = has(_[HOOKS], depth)
    const parentValidHook = has(_[HOOKS], parentDepth)
    if (depth != '' && !validHook && !parentValidHook) return

    const scanHooks = _._scanHooks[hook]
    scanHooks &&
      $(scanHooks, (key, shook) => {
        shook({_, hook, object, parentDepth, depth, _key, _val, _object})
      })
  }

  const onObject = data => {
    const {object, hook, depth, parentDepth} = data
    const validHook = has(_[HOOKS], depth)
    const parentValidHook = has(_[HOOKS], parentDepth)

    if (depth != '' && !validHook && !parentValidHook) return
    hook && BindHook(data)

    scanObject({
      object,
      depth,
      onObject,
      onVariable: BindHook,
      onFunction: BindHook,
      onArray: BindHook,
      onAny: BindHook
    })
  }

  onObject({object: _object, depth: ''})
  return _
}

export const unuse = _ => data => {
  $unuse(_, $compile(_, data))
  return _
}

export const $unuse = (_, _object) => $exec(_unuse, _, _object)

export const _unuse = (_, _object) => {
  const {uuid, _hooks} = _object

  use(_, {uuid, _unhooks: _hooks})
  return _
}

export const sSet = (_, _object) => {
  let cache = {}
  const onVariable = ({object, depth, _key, _val}) => {
    if (matchPath.test(_val)) {
      let result = get(_, _val, _val)

      set(_, depth, result)
      set(cache, depth, result)
    } else {
      set(_, depth, _val)
      set(cache, depth, _val)
    }
    return
  }
  const onFunction = ({object, depth, _key, _val}) => {
    set(_, depth, _val)
    set(cache, depth, _val)
    return
  }
  const onObject = ({object, depth, _key, _val}) => {
    if (Object.keys(object).length === 0) {
      set(_, depth, _val)
      set(cache, depth, _val)
      return
    }
    scanObject({
      object,
      depth,
      onObject,
      onVariable,
      onFunction,
      onArray: onVariable
    })
  }
  onObject({object: _object, depth: ''})

  return cache
}

export const aSet = (_, _object) => {
  let cache = {}
  const onVariable = ({object, depth, _key, _val}) => {
    if (matchPath.test(_val)) {
      let result = get(_, _val, _val)
      set(_, depth, result)
      set(cache, depth, result)
    } else {
      set(_, depth, _val)
      set(cache, depth, _val)
    }
    return
  }
  const onFunction = ({object, depth, _key, _val}) => {
    let tar = get(_, depth)
    let result = _val({tar})
    set(_, depth, result)
    set(cache, depth, result)
    return
  }

  const onObject = ({object, depth, _key, _val}) => {
    if (Object.keys(object).length === 0) {
      set(_, depth, _val)
      set(cache, depth, _val)
      return
    }
    scanObject({
      object,
      depth,
      onObject,
      onVariable,
      onFunction,
      onArray: onVariable
    })
  }
  onObject({object: _object, depth: ''})

  return cache
}

export const setMethods = {
  simple: sSet,
  advanced: aSet
}
export const $set = (_, _object, {type = 'simple'} = {}) => $exec(setMethods[type], _, _object)

export const $merge = (_array, options) => {
  let cache = {}
  $(_array, (key, val) => {
    $set(cache, val, options)
  })
  return cache
}

export const $get = (_, _object) => $exec(_get, _, _object)

export const _get = (_, args) => {
  let cache = {}
  const onVariable = ({object, depth, _key, _val}) => {
    let result
    if (matchPath.test(_val)) {
      result = get(_, _val)
      result && set(cache, depth, result)
    } else {
      result = get(_, depth)
      result && set(cache, depth, result)
      !result && set(cache, depth, _val)
    }
    return
  }

  const onFunction = ({object, depth, _key, _val}) => {
    let tar = get(_, depth)
    let result = _val({tar})
    result && set(cache, depth, result)
    !result && set(cache, depth, _val)
    return
  }

  const onObject = ({object, depth, _key, _val}) => {
    if (Object.keys(object).length === 0) {
      let result = get(_, depth)
      result && set(cache, depth, result)
      !result && set(cache, depth, _val)
      return
    }

    scanObject({
      object,
      depth,
      onObject,
      onFunction,
      onVariable,
      onArray: onVariable
    })
  }
  typeof args === 'object' && onObject({object: args, depth: ''})
  typeof args !== 'object' && onVariable({depth: args})
  return cache
}

export const $diff = (_, _object) => $exec(_diff, _, _object)

export const _diff = (_, _object) => {
  let cache = {}
  const onObject = ({object, depth, _key, _val}) => {
    let target = get(_, depth, {})
    $(object, (key, val) => {
      if (typeof val === 'object') {
        return
      }
      let result = target[key]
      if (result !== val) {
        const newDepth = `${depth}.${key}`
        set(cache, newDepth, val)
      }
      return
    })

    scanObject({
      object,
      depth,
      onObject
    })
  }
  onObject({object: _object, depth: ''})

  return cache
}

export const $has = (_, _object) => $exec(_has, _, _object)
export const _has = (_, _object) => {
  let cache = {}
  const onObject = ({object, depth, _key, _val}) => {
    let target = get(_, depth, {})
    $(object, (key, val) => {
      if (typeof val === 'object') {
        return
      }
      const newDepth = `${depth}.${key}`
      let result = target[key]

      result && set(cache, newDepth, true)
      !result && set(cache, newDepth, false)

      return
    })

    scanObject({
      object,
      depth,
      onObject
    })
  }
  onObject({object: _object, depth: ''})

  return cache
}

// //
// export const _matchSimple = (_, _array) => {
//   console.log(JSON.stringify(_array))
//   throw new Error('not implemented')
// }

// export const _matchAdvanced = (_, _object) => {
//   $(_object, (_key, _val) => {
//     const {invalid, valid, equal, get: __get} = JSON.parse(_key)
//     let isinvalid = true
//     let isValid = true
//     let isEqual = true
//     let cache = {}

//     invalid && (isinvalid = $invalid(_, invalid))
//     valid && (isValid = $valid(_, valid))
//     equal && (isEqual = $equal(_, equal))

//     if (!isEqual || !isValid || !isinvalid) {
//       return
//     }
//     __get && $set(cache, $get(_, __get))

//     _val(cache)
//   })
// }

// export const matchMethods = {
//   simple: _matchSimple,
//   advanced: _matchAdvanced
// }
// export const $match = (target, _object, {type = 'simple'} = {}) => $exec(matchMethods[type], target, _object)

// export const $invalid = (_, _object) => $exec(_invalid, _, _object)
// export const _invalid = (_, _object) => {
//   let isinValid = true
//   const onObject = ({object, depth, _key, _val}) => {
//     $(object, (key, val) => {
//       if (typeof val === 'object' || !isinValid) {
//         return
//       }
//       let newDepth = depth ? `${depth}.${key}` : key
//       let target = get(_, newDepth)
//       if (target) {
//         isinValid = false
//         return
//       }
//     })
//     scanObject({object, depth, onObject})
//   }
//   onObject({object: _object, depth: ''})
//   return isinValid
// }

// export const $valid = (_, _object) => $exec(_valid, _, _object)
// export const _valid = (_, _object) => {
//   let isValid = true
//   const onObject = ({object, depth, _key, _val}) => {
//     $(object, (key, val) => {
//       if (typeof val === 'object' || !isValid) {
//         return
//       }
//       let newDepth = depth ? `${depth}.${key}` : key
//       let target = get(_, newDepth)
//       if (!target) {
//         isValid = false
//         return
//       }
//     })
//     scanObject({object, depth, onObject})
//   }
//   onObject({object: _object, depth: ''})
//   return isValid
// }

// export const $equal = (_, _object) => $exec(_equal, _, _object)
// export const _equal = (_, _object) => {
//   let isEqual = true
//   const onObject = ({object, depth, _key, _val}) => {
//     $(object, (key, val) => {
//       if (typeof val === 'object' || isEqual) {
//         return
//       }
//       let newDepth = depth ? `${depth}.${key}` : key
//       let target = get(_, newDepth)
//       if (val !== target) {
//         isEqual = false
//         return
//       }
//     })
//     scanObject({object, depth, onObject})
//   }
//   onObject({object: _object, depth: ''})
//   return isEqual
// }
