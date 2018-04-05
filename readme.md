# Menhera

an experimental lovely frame

```bash
yarn add menhera
```

```js
import Menhera from "menhera";

const _data = ({ _key, _val, _cp }) => {
  const { helloWorld } = _val;
  console.log(helloWorld);
};

const _ = new Menhera({
  _hooks: () => ({
    _data
  }),
  _data: {
    helloWorld: "hello World"
  }
}).$use({
  _command: {
    run: true
  }
});
```
