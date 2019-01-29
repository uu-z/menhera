import Mhr from '../../index'
import {get, set} from '.'

export default {
  injectVar(name) {
    return {
      $V({_key, _val}) {
        const key = `${name}.${_key}`
        set(Mhr, key, _val)
      }
    }
  },
  injectFn(name) {
    return {
      $F({_key, _val}) {
        const key = `${name}.${_key}`
        set(Mhr, key, _val)
      }
    }
  },
  injectFunctionArray(name) {
    return {
      F({_val}) {
        let target = get(Mhr, name, [])
        set(Mhr, name, [...target, _val])
      }
    }
  },
  injectObject(name) {
    return {
      O({_val}) {
        let target = get(Mhr, name, {})
        set(Mhr, name, {...target, ..._val})
      }
    }
  },
  injectObjectArray(name) {
    return {
      $({_key, _val}) {
        const key = `${name}.${_key}`
        const target = get(Mhr, key, [])
        set(Mhr, key, [...target, ..._val])
      }
    }
  },
  injectObjectDeep(name) {
    return {
      $O({_key, _val}) {
        const key = `${name}.${_key}`
        const target = get(Mhr, key, {})
        set(Mhr, key, {...target, ..._val})
      }
    }
  },
  injectVariableDeep(name) {
    return {
      $V({_key, _val}) {
        const key = `${name}.${_key}`
        set(Mhr, key, _val)
      }
    }
  },
  injectArray(name) {
    return {
      _({_val}) {
        let target = get(Mhr, name, [])
        set(Mhr, name, [...target, ..._val])
      }
    }
  },
  relay(key) {
    return {
      $: ({_key, _val}) =>
        Mhr.use({
          [key]: _val
        })
    }
  }
}
