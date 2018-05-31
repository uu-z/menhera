import {$, get, set, uuid, scanObject} from '../utils'

export const COMPONENTS = Symbol('components')
export const ENTITIES = Symbol('entities')

export const trigger = (triggers, _, data) => {
  let type = typeof data
  if (type == 'object') {
    if (Array.isArray(data)) {
      type = 'array'
    }
  }
  const trigger = triggers[type]
  if (trigger) {
    return trigger(_, data) || {}
  }
  return {}
}

export const scan = (_, _object) => trigger(uScan, _, _object)

export const uScan = {
  string(_, depth) {
    let cache = new Set()
    let uuids = get(_[COMPONENTS], depth)
    uuids.forEach(_uuid => {
      cache.add(_[ENTITIES][_uuid])
    })
    return cache
  },
  array(_, depths) {
    let cache = {}
    depths.forEach(depth => {
      cache[depth] = uScan.string(_, depth)
    })
    return cache
  },
  object(_, depths) {
    let cache = {}
    $(depths, (k, depth) => {
      cache[k] = uScan.string(_, depth)
    })
    return cache
  }
}
export const entity = ({_}) => {
  Object.assign(_, {
    [COMPONENTS]: {},
    [ENTITIES]: {},
    scan: _object => scan(_, _object)
  })
  return {
    name: 'entity',
    _hooks: {
      entity: {
        $({_, _val, cp}) {
          let _uuid = uuid.v1()
          _val._uuid = _uuid
          const onAny = ({object, depth, _key, _val}) => {
            let target = get(_[COMPONENTS], depth)
            if (!target) {
              target = new Set([_uuid])
              set(_[COMPONENTS], depth, target)
            } else {
              target.add(_uuid, _val)
            }
          }
          const onObject = ({object, depth, _key, _val}) => {
            scanObject({object, depth, onObject, onAny})
          }
          _[ENTITIES][_uuid] = _val
          onObject({object: _val, depth: ''})
        }
      }
    }
  }
}
