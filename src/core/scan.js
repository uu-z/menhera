import {$, $M, HOOKS, get, set} from '.'

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

const handleHooks = ({_, object, depth, key, _key, _val, _object}) => {
  const hooks = get(_[HOOKS], key)
  if (!hooks) return

  $M(hooks, (uuid, h) => {
    if (h instanceof Set) {
      for (let fn of h) {
        fn({_, depth, _key, _val, cp: _object, parent: object})
      }
    } else if (typeof h == 'function') {
      h({_, depth, _key, _val, cp: _object, parent: object})
    } else {
    }
  })
}

const handleEachHooks = ({_, object, depth, _key, key, _val, _object}) => {
  const hooks = get(_[HOOKS], key)
  if (!hooks) return

  $(_val, (k, v) => {
    $M(hooks, (uuid, h) => {
      if (h instanceof Set) {
        for (let fn of h) {
          fn({_, depth, _key: k, _val: v, cp: _object, parent: object})
        }
      } else if (typeof h == 'function') {
        h({_, depth, _key: k, _val: v, cp: _object, parent: object})
      } else {
        _.use({
          [key]: v
        })
      }
    })
  })
}

export const _scanHooks = {
  onAny: {
    any({_, object, parentDepth, depth, _key, _val, _object}) {
      const key = `${depth}`
      handleHooks({_, object, depth, key, _key, _val, _object})
    },
    _({_, object, depth, _key, _val, _object}) {
      const key = `${depth}._`
      handleHooks({_, object, depth, key, _key, _val, _object})
    }
  },
  onObject: {
    O({_, object, depth, _key, _val, _object}) {
      const key = `${depth}.O`
      handleHooks({_, object, depth, key, _key, _val, _object})
    },
    $({_, object, depth, _key, _val, _object}) {
      const key = `${depth}.$`
      handleEachHooks({_, object, depth, _key, key, _val, _object})
    },
    O$({_, object, depth, _key, _val, _object}) {
      const key = `${depth}.O$`
      handleEachHooks({_, object, depth, _key, key, _val, _object})
    },
    $O({_, object, parentDepth, depth, _key, _val, _object}) {
      const key = `${parentDepth}.$O`
      handleHooks({_, object, depth, key, _key, _val, _object})
    },
    $I({_, object, parentDepth, depth, _key, _val, _object}) {
      const key = `${parentDepth}.$I`
      handleHooks({_, object, depth, key, _key, _val, _object})
    }
  },
  onArray: {
    A({_, object, depth, _key, _val, _object}) {
      const key = `${depth}.A`
      handleHooks({_, object, depth, key, _key, _val, _object})
    },
    $({_, object, depth, _key, _val, _object}) {
      const key = `${depth}.$`
      handleEachHooks({_, object, depth, _key, key, _val, _object})
    },
    A$({_, object, depth, _key, _val, _object}) {
      const key = `${depth}.A$`
      handleEachHooks({_, object, depth, _key, key, _val, _object})
    },
    $A({_, object, parentDepth, depth, _key, _val, _object}) {
      const key = `${parentDepth}.$A`
      handleHooks({_, object, depth, key, _key, _val, _object})
    },
    $I({_, object, parentDepth, depth, _key, _val, _object}) {
      const key = `${parentDepth}.$I`
      handleHooks({_, object, depth, key, _key, _val, _object})
    }
  },
  onFunction: {
    F({_, object, depth, _key, _val, _object}) {
      const key = `${depth}.F`
      handleHooks({_, object, depth, key, _key, _val, _object})
    },
    I({_, object, parentDepth, depth, _key, _val, _object}) {
      const key = `${parentDepth}.I`
      handleHooks({_, object, depth, key, _key, _val, _object})
    },
    $F({_, object, parentDepth, depth, _key, _val, _object}) {
      const key = `${parentDepth}.$F`
      handleHooks({_, object, depth, key, _key, _val, _object})
    }
  },
  onVariable: {
    V({_, object, depth, _key, _val, _object}) {
      const key = `${depth}.V`
      handleHooks({_, object, depth, key, _key, _val, _object})
    },
    I({_, object, parentDepth, depth, _key, _val, _object}) {
      const key = `${parentDepth}.I`
      handleHooks({_, object, depth, key, _key, _val, _object})
    },
    $V({_, object, parentDepth, depth, _key, _val, _object}) {
      const key = `${parentDepth}.$V`
      handleHooks({_, object, depth, key, _key, _val, _object})
    }
  }
}
