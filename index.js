import {HOOKS, initHooks, use, unuse, _scanHooks, utils, _compilers} from './src/core'

export const core = (_, options) => {
  Object.assign(_, {
    [HOOKS]: initHooks(),
    _scanHooks,
    _compilers,
    use: use(_),
    unuse: unuse(_)
  })
  _.use({
    $compilers: utils.injectObject('_compilers'),
    $scanHooks: utils.injectObjectDeep('_scanHooks')
  })
  return _
}

export default core(options => core({}, options), {})
export * from './src/core'
