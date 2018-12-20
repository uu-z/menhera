import {HOOKS, initHooks, use, unuse, _scanHooks, utils, _compilers} from './core'

let menhera = {
  [HOOKS]: initHooks(),
  _scanHooks,
  _compilers,
  use,
  $use: use,
  unuse
}

menhera.use({
  $compilers: utils.injectObject('_compilers'),
  $scanHooks: utils.injectObjectDeep('_scanHooks')
})

export default menhera
export * from './core'
