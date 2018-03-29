# Menhera
an experimental lovely frame

```bash
yarn add menhera
```

```js
import Menhera, {Observer, Event} from "menhera"


const menhera = new Menhera({
  keywords:["test"],
  plugins:[Observer, Event],
  components: [{
    name: "test",
    awake(){
      console.log("test0")
    },
    start(){
      this.state.test1 = "test1"
      this.state.test2 = "test2"
      this.emit("test4","test","4")
      this.emit("test5", "test","5")
    },
    observer:{
      test1(val){
        console.log(val)
      },
      test2(val){
        console.log(val)
      }
    },
    on:{
      test4(...val){
        console.log(val.join(""))
      },
      test5(...val){
        console.log(val.join(""))
      }
    }
  }]
}).init()
```