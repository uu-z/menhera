import {HOOKS, initHooks, $use, $compile, _scanHooks, inject, _compilers} from './utils'

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
  $compilers: inject.injectObject('_compilers'),
  $scanHooks: inject.injectObjectDeep('_scanHooks')
})

export default core
export * from './utils'
