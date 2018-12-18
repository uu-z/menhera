const Mhr = require('../dist').default
const {EventEmitter} = require('events')

const event = new EventEmitter()

Mhr.$use({
  $on: {
    $V({_key, _val}) {
      event.on(_key, () => {
        console.log(_val)
      })
    },
    $F({_key, _val}) {
      event.on(_key, _val)
    },
    $O({_key, _val}) {
      for (let [k, v] of Object.entries(_val)) {
        event.on(_key, v)
      }
    },
    $A({_key, _val}) {
      _val.forEach(fn => {
        event.on(_key, fn)
      })
    }
  },
  on: {
    test0: 'test0',
    test1() {
      console.log('test1')
    },
    test2: {
      foo() {
        console.log('test2.foo')
      },
      bar() {
        console.log('test2.bar')
      }
    },
    test3: [
      () => {
        console.log('test3.0')
      },
      () => {
        console.log('test3.1')
      }
    ]
  }
})

event.emit('test0')
event.emit('test1')
event.emit('test2')
event.emit('test3')

// test0
// test1
// test2.foo
// test2.bar
//test3.0
// test3.1
