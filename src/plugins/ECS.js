import {$, get, set, uuid, scanObject} from '../utils'

export const ECS = Symbol('ecs')
export const query = (_, datas) => {
  const {entities, components} = _[ECS]
  datas = Array.isArray(datas) ? datas : [datas]
  let valid = true
  let _entities = new Map()
  let cps = datas.map(cp => components[cp] || (valid = false))

  if (!valid) return []

  const [filter = []] = cps
  filter.forEach(id => {
    cps.forEach(c => {
      if (!c.has(id)) {
        filter.delete(id)
      }
    })
  })
  filter.forEach(id => {
    _entities.set(id, entities[id])
  })
  return _entities
}

export const queryRaw = (_, datas) => {
  const {raws, components} = _[ECS]
  datas = Array.isArray(datas) ? datas : [datas]
  let valid = true
  let _entities = new Map()
  let cps = datas.map(cp => components[cp] || (valid = false))

  if (!valid) return []

  const [filter = []] = cps
  filter.forEach(id => {
    cps.forEach(c => {
      if (!c.has(id)) {
        filter.delete(id)
      }
    })
  })
  filter.forEach(id => {
    _entities.set(id, raws[id])
  })
  return _entities
}
export const entity = ({_}) => {
  Object.assign(_, {
    [ECS]: {
      raws: {},
      entities: {},
      components: {}
    },
    query: _object => query(_, _object),
    queryRaw: _object => queryRaw(_, _object)
  })
  const {entities, components, raws} = _[ECS]
  return {
    name: 'entity',
    $entity: {
      $({_val, cp}) {
        let cache = {}
        const entitiyID = uuid.v1()
        raws[entitiyID] = _val

        const onAny = ({object, parentDepth, depth, _key, _val}) => {
          if (_key === 'val') {
            set(cache, parentDepth, _val)
          }
        }
        const onObject = ({object, depth, _key, _val}) => {
          scanObject({object, depth, onObject, onAny})
        }
        onObject({object: _val, depth: ''})

        $(cache, (k, v) => {
          let target = components[k]
          if (!target) {
            target = new Set([entitiyID])
            set(components, k, target)
          } else {
            target.add(entitiyID, v)
          }
        })
        entities[entitiyID] = cache
      }
    }
  }
}
