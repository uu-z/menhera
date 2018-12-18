import {HOOKS, initHooks, use, $compile, _scanHooks, sugar, _compilers} from './utils'

let core = {
  [HOOKS]: initHooks(),
  _scanHooks,
  _compilers,
  use,
  $use: use
}

core.use({
  $compilers: sugar.injectObject('_compilers'),
  $scanHooks: sugar.injectObjectDeep('_scanHooks')
})

export default core
export * from './utils'
