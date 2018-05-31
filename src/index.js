import {initHooks, HOOKS, $use, $unuse} from './utils'
import {EventEmitter} from 'events'
const {assign} = Object

export * from './utils'
export * from './plugins'

export const $core = (_, _object) => {
  assign(_, {
    [HOOKS]: initHooks(_),
    _events: new EventEmitter(),
    $use: _object => {
      _._events.emit('$use', _object)
      return _
    },
    $unuse: _object => {
      _._events.emit('$unuse', _object)
      return _
    }
  })
  _._events.on('$use', _object => $use(_, _object))
  _._events.on('$unuse', _object => $unuse(_, _object))
  _.$use(_object)
  return _
}

export default $core(_object => $core({}, _object), {})
