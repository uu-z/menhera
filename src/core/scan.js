import {$, $M, HOOKS, get, set} from '.'
import _ from '../index'

// // koa-compose
// const compose = middleware => {
//   return (ctx, next) => {
//     let index = -1
//     return dispatch(0)
//     function dispatch(i) {
//       if (i <= index) return Promise.reject(new Error('next() called multiple times'))
//       index = i
//       let fn = middleware[i]
//       if (i === middleware.length) fn = next
//       if (!fn) return Promise.resolve()
//       try {
//         return Promise.resolve(fn(ctx, () => dispatch(i + 1)))
//       } catch (e) {
//         return Promise.reject(e)
//       }
//     }
//   }
// }

const handleHooks = ({object, depth, key, _key, _val, _object}) => {
  const hooks = get(_[HOOKS], key)
  hooks instanceof Map &&
    hooks &&
    $M(hooks, (uuid, h) => {
      if (h instanceof Set) {
        for (let fn of h) {
          fn({depth, _key, _val, cp: _object, parent: object})
        }
      } else {
        h({depth, _key, _val, cp: _object, parent: object})
      }
    })
}

const handleEachHooks = ({object, depth, key, _val, _object}) => {
  const hooks = get(_[HOOKS], key)
  hooks instanceof Map &&
    hooks &&
    $(_val, (key, val) => {
      $M(hooks, (uuid, h) => {
        if (h instanceof Set) {
          for (let fn of h) {
            fn({depth, _key: key, _val: val, cp: _object, parent: object})
          }
        } else {
          h({depth, _key: key, _val: val, cp: _object, parent: object})
        }
      })
    })
}

export const _scanHooks = {
  onAny: {
    any({object, parentDepth, depth, _key, _val, _object}) {
      const key = `${depth}`
      handleHooks({object, depth, key, _key, _val, _object})
    },
    _({object, depth, _key, _val, _object}) {
      const key = `${depth}._`
      handleHooks({object, depth, key, _key, _val, _object})
    }
  },
  onObject: {
    O({object, depth, _key, _val, _object}) {
      const key = `${depth}.O`
      handleHooks({object, depth, key, _key, _val, _object})
    },
    $({object, depth, _key, _val, _object}) {
      const key = `${depth}.$`
      handleEachHooks({object, depth, key, _val, _object})
    },
    O$({object, depth, _key, _val, _object}) {
      const key = `${depth}.O$`
      handleEachHooks({object, depth, key, _val, _object})
    },
    $O({object, parentDepth, depth, _key, _val, _object}) {
      const key = `${parentDepth}.$O`
      handleHooks({object, depth, key, _key, _val, _object})
    },
    $I({object, parentDepth, depth, _key, _val, _object}) {
      const key = `${parentDepth}.$I`
      handleHooks({object, depth, key, _key, _val, _object})
    }
  },
  onArray: {
    A({object, depth, _key, _val, _object}) {
      const key = `${depth}.A`
      handleHooks({object, depth, key, _key, _val, _object})
    },
    $({object, depth, _key, _val, _object}) {
      const key = `${depth}.$`
      handleEachHooks({object, depth, key, _val, _object})
    },
    A$({object, depth, _key, _val, _object}) {
      const key = `${depth}.A$`
      handleEachHooks({object, depth, key, _val, _object})
    },
    $A({object, parentDepth, depth, _key, _val, _object}) {
      const key = `${parentDepth}.$A`
      handleHooks({object, depth, key, _key, _val, _object})
    },
    $I({object, parentDepth, depth, _key, _val, _object}) {
      const key = `${parentDepth}.$I`
      handleHooks({object, depth, key, _key, _val, _object})
    }
  },
  onFunction: {
    F({object, depth, _key, _val, _object}) {
      const key = `${depth}.F`
      handleHooks({object, depth, key, _key, _val, _object})
    },
    I({object, parentDepth, depth, _key, _val, _object}) {
      const key = `${parentDepth}.I`
      handleHooks({object, depth, key, _key, _val, _object})
    },
    $F({object, parentDepth, depth, _key, _val, _object}) {
      const key = `${parentDepth}.$F`
      handleHooks({object, depth, key, _key, _val, _object})
    }
  },
  onVariable: {
    V({object, depth, _key, _val, _object}) {
      const key = `${depth}.V`
      handleHooks({object, depth, key, _key, _val, _object})
    },
    I({object, parentDepth, depth, _key, _val, _object}) {
      const key = `${parentDepth}.I`
      handleHooks({object, depth, key, _key, _val, _object})
    },
    $V({object, parentDepth, depth, _key, _val, _object}) {
      const key = `${parentDepth}.$V`
      handleHooks({object, depth, key, _key, _val, _object})
    }
  }
}
