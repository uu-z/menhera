export const v0 = ({ _, $ }) => ({
  name: "v0",
  [$[0]]() {
    _.hooks._hooks = [
      ({ _key, _val, cp }) => {
        for (let [key, val] of Object.entries(_val())) {
          if (val) {
            if (!_.hooks[key]) {
              _.hooks[key] = [];
            }
            _.hooks[key].push(val.bind(cp));
          }
        }
      }
    ];
  }
});

export const v1 = ({ _ }) => ({
  name: "v1",
  _hooks() {
    return {
      _methods({ key, val, cp }) {
        if (!cp[key]) {
          cp[key] = val;
        } else {
          console.warn(
            `${cp.name} : "${key}"  in methods is valid, Please use another one`
          );
        }
      },
      _data({ _val, cp }) {
        const props = _val();
        for (let [key, val] of Object.entries(props)) {
          if (!cp[key]) {
            cp[key] = val;
          } else {
            console.warn(
              `${cp.name} : "${key} " is data is valid, Please use another one`
            );
          }
        }
      }
    };
  }
});
