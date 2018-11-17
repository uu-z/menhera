import lget from 'lodash.get'
import lset from 'lodash.set'
import lhas from 'lodash.has'
import uuid from 'uuid'
import * as hooks from './hooks'
import * as compiles from './compiles'

export * from './methods'
export {uuid}
export const HOOKS = Symbol('hooks')

export const matchSlashPath = /\//g
export const matchPath = /\/|\./

export const compile = _object => {
  let ctx = {
    _object,
    _keys: Object.keys(_object)
  }
  $(compiles, (k, v) => {
    v(ctx)
  })
  return {...ctx, ...ctx._object}
}

export const initHooks = () => {
  let cache = {}
  let _uuid = uuid.v1()

  $(hooks, (key, val) => {
    $(val, (hookKey, hookVal) => {
      let _val = new Map().set(_uuid, hookVal)
      set(cache, `${key}.${hookKey}`, _val)
    })
  })
  return cache
}

export const get = (obj, path, def) => {
  if (matchSlashPath.test(path)) {
    path = path.replace(matchSlashPath, '.')
  }
  let result = lget(obj, path, def)

  if (typeof result === 'string' && matchPath.test(result)) {
    return get(obj, result, def)
  } else {
    return result
  }
}

export const set = (obj, path, def) => {
  if (matchSlashPath.test(path)) {
    path = path.replace(matchSlashPath, '.')
  }
  return lset(obj, path, def)
}

export const has = (obj, path, def) => {
  if (matchSlashPath.test(path)) {
    path = path.replace(matchSlashPath, '.')
  }
  return lhas(obj, path, def)
}

export const $ = (obj, cb) => {
  for (let [key, val] of Object.entries(obj)) {
    cb(key, val)
  }
}

export const $M = (map, cb) => {
  for (let [key, val] of map) {
    cb(key, val)
  }
}

export const scanObject = ({object, depth = '', onObject, onArray, onFunction, onVariable, onAny}) => {
  if (object) {
    $(object, (_key, _val) => {
      let parentDepth = depth
      const newDepth = depth ? depth + `.${_key}` : _key
      onAny &&
        onAny({
          hook: 'onAny',
          object,
          depth: newDepth,
          parentDepth,
          _key,
          _val
        })
      if (_val) {
        if (onFunction && typeof _val === 'function') {
          onFunction({
            hook: 'onFunction',
            object,
            depth: newDepth,
            parentDepth,
            _key,
            _val
          })
        } else if ((onArray || onObject) && typeof _val === 'object') {
          if (onArray && Array.isArray(_val)) {
            onArray({
              hook: 'onArray',
              object: object,
              depth: newDepth,
              parentDepth,
              _key,
              _val
            })
          } else {
            onObject &&
              onObject({
                hook: 'onObject',
                object: object[_key],
                depth: newDepth,
                parentDepth,
                _key,
                _val
              })
          }
        } else {
          onVariable &&
            onVariable({
              hook: 'onVariable',
              object,
              depth: newDepth,
              parentDepth,
              _key,
              _val
            })
        }
      } else {
        onVariable &&
          onVariable({
            hook: 'onVariable',
            object,
            depth: newDepth,
            parentDepth,
            _key,
            _val
          })
      }
    })
  } else {
    console.warn(`scanObject: object must be valid`)
  }
}
