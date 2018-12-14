import {HOOKS, initHooks, $use, $compile, _scanHooks, sugar, _compilers} from './utils'

let core = {
  [HOOKS]: initHooks(),
  _scanHooks,
  _compilers,
  $compile,
  $use: data => {
    $use(core, core.$compile(core, data))
    return core
  }
}

core.$use({
  $compilers: sugar.injectObject('_compilers'),
  $scanHooks: sugar.injectObjectDeep('_scanHooks')
})

export default core
export * from './utils'
