# Menhera

an experimental lovely frame

```bash
yarn add menhera
```

```js
import Menhera from "menhera";

const _data = ({ _val }) => {
  const { data } = _val;
  console.log(data);
};

const _ = new Menhera({
  _hooks: () => ({
    _data
  }),
  _data: {
    data: "foo"
  }
}).$use({
  _data: {
    data: "bar"
  }
});
```

```js
import Menhera from "menhera";

const _data = {
  name: "data",
  _hooks: () => ({
    _data: ({ _val }) => {
      const { data } = _val;
      console.log(data);
    }
  })
};

const _ = new Menhera({
  _mount: {
    foo: [_data]
  },
  _data: {
    data: "foo"
  }
}).$use({
  _data: {
    data: "bar"
  }
});
```
