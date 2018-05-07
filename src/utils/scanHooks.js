import {$, $M, HOOKS, get, set} from '../utils'

// koa-compose
const compose = middleware => {
  return (ctx, next) => {
    let index = -1
    return dispatch(0)
    function dispatch(i) {
      if (i <= index) return Promise.reject(new Error('next() called multiple times'))
      index = i
      let fn = middleware[i]
      if (i === middleware.length) fn = next
      if (!fn) return Promise.resolve()
      try {
        return Promise.resolve(fn(ctx, () => dispatch(i + 1)))
      } catch (e) {
        return Promise.reject(e)
      }
    }
  }
}

const handleHooks = ({depth, key, _key, _, _val, _object}) => {
  const hooks = get(_[HOOKS], key)
  hooks &&
    $M(hooks, (uuid, h) => {
      if (h instanceof Set) {
        let fns = compose([...h])
        console.log(fns)
        fns({depth, _, _key, _val, cp: _object})
        return
      }
      h({depth, _, _key, _val, cp: _object})
    })
}

const handleEachHooks = ({depth, _, key, _key, _val, _object}) => {
  const hooks = get(_[HOOKS], key)
  hooks &&
    $(_val, (key, val) => {
      $M(hooks, (uuid, h) => h({depth, _, _key: key, _val: val, cp: _object}))
    })
}

export const useHooks = _ => ({
  onAny: {
    any({object, parentDepth, depth, _key, _val, _object}) {
      if (typeof _val === 'object') return
      const key = `${depth}`
      handleHooks({depth, key, _, _key, _val, _object})
    },
    _({object, depth, _key, _val, _object}) {
      const key = `${depth}._`
      handleHooks({depth, key, _, _key, _val, _object})
    }
  },
  onObject: {
    O({object, parentDepth, depth, _key, _val, _object}) {
      const key = `${depth}.O`
      handleHooks({depth, key, _, _key, _val, _object})
    },
    $({object, depth, _key, _val, _object}) {
      const key = `${depth}.$`
      handleEachHooks({depth, key, _, _val, _object})
    },
    O$({object, depth, _key, _val, _object}) {
      const key = `${depth}.O$`
      handleEachHooks({depth, key, _, _val, _object})
    },
    $O({object, parentDepth, depth, _key, _val, _object}) {
      const key = `${parentDepth}.$O`
      handleHooks({depth, key, _, _key, _val, _object})
    }
  },
  onArray: {
    A({object, parentDepth, depth, _key, _val, _object}) {
      const key = `${depth}.A`
      handleHooks({depth, key, _, _key, _val, _object})
    },
    A$({object, parentDepth, depth, _key, _val, _object}) {
      const key = `${depth}.A$`
      handleEachHooks({depth, key, _, _val, _object})
    },
    $A({object, parentDepth, depth, _key, _val, _object}) {
      const key = `${parentDepth}.$A`
      handleHooks({depth, key, _, _key, _val, _object})
    }
  },
  onFunction: {
    F({object, parentDepth, depth, _key, _val, _object}) {
      const key = `${depth}.F`
      handleHooks({depth, key, _, _key, _val, _object})
    },
    $F({object, parentDepth, depth, _key, _val, _object}) {
      const key = `${parentDepth}.$F`
      handleHooks({depth, key, _, _key, _val, _object})
    }
  },
  onVariable: {
    V({object, parentDepth, depth, _key, _val, _object}) {
      const key = `${depth}.V`
      handleHooks({depth, key, _, _key, _val, _object})
    },
    $V({object, parentDepth, depth, _key, _val, _object}) {
      const key = `${parentDepth}.$V`
      handleHooks({depth, key, _, _key, _val, _object})
    }
  }
})
