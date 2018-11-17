import {initHooks, HOOKS, $, $use, $unuse, compile} from './utils'
import {EventEmitter} from 'events'
const {assign} = Object

export * from './utils'

export const $core = (_, _object) => {
  assign(_, {
    [HOOKS]: initHooks(_),
    _events: new EventEmitter(),
    $use: object => {
      _._events.emit('$use', compile(object))
      return _
    },
    $unuse: object => {
      _._events.emit('$unuse', compile(object))
      return _
    }
  })
  _._events.on('$use', object => $use(_, object))
  _._events.on('$unuse', object => $unuse(_, object))
  _.$use(_object)
  return _
}

export default $core(_object => $core({}, _object), {})
