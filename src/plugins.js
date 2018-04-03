export const INIT = ({ _ }) => ({
  name: "INIT",
  _awake() {
    _.hooks._hooks = ({ key, val, cp }) => {
      if (val) {
        if (!_.hooks[key]) {
          _.hooks[key] = [];
        }
        _.hooks[key].push(val);
      }
    };
    _.hooks._methods = ({ key, val, cp }) => {
      if (!cp[key]) {
        cp[key] = val;
      } else {
        console.warn(
          `${cp.name} : "${key}"  in methods is valid, Please use another one`
        );
      }
    };
    _.hooks._data = ({ _val, cp }) => {
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
    };
  }
});
