import {scanObject, $, HOOKS, get, set} from '../utils'

export const _hooks = {
  _({_, _val, cp}) {
    const {uuid} = cp
    if (typeof _val === 'object') {
      const onFunction = ({depth, _val}) => {
        let target = get(_[HOOKS], depth)
        if (!target) {
          target = new Map([[uuid, _val.bind(cp)]])
          set(_[HOOKS], depth, target)
        } else {
          target.set(uuid, _val.bind(cp))
        }
      }

      const onArray = ({depth, _val}) => {
        let target = get(_[HOOKS], depth)
        _val = new Set(_val.map(v => v.bind(cp)))

        if (!target) {
          target = new Map([[uuid, _val]])
          set(_[HOOKS], depth, target)
        } else {
          target.set(uuid, _val)
        }
      }

      const onObject = ({object, depth, _key, _val}) => {
        scanObject({object, depth, onObject, onFunction, onArray})
      }
      onObject({object: _val, depth: ''})
    }
  }
}

export const _unhooks = {
  _({_, _val, cp}) {
    const {uuid} = cp

    if (typeof _val === 'object') {
      const onFunction = ({depth, _val}) => {
        let target = get(_[HOOKS], depth)
        if (!target) return
        target.delete(uuid)
      }
      const onObject = ({object, depth, _key, _val}) => {
        scanObject({object, depth, onObject, onFunction})
      }
      onObject({object: _val, depth: ''})
    }
  }
}

export const _mount = {
  $({_, _val, cp}) {
    let cps = Array.isArray(_val) ? _val : [_val]
    $(cps, (key, component) => {
      let cp = typeof component === 'function' ? component({_}) : component
      const {name} = cp
      if (_[name]) {
        console.log(`_mount: name "${name}" exists`)
        return
      }
      _.$use(cp)
      _[name] = cp
    })
  }
}

export const _run = {
  $({_, _val, cp}) {
    let cps = Array.isArray(_val) ? _val : [_val]
    $(cps, (key, component) => {
      let cp = typeof component === 'function' ? component({_}) : component
      _.$use(cp)
    })
  }
}
