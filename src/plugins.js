export const Init = ({ _ }) => ({
  name: "Init",
  _awake() {
    _.hooks._hooks = ({ name, event, cp }) => {
      if (event) {
        if (!_.hooks[name]) {
          _.hooks[name] = [];
        }
        _.hooks[name].push(event);
      }
    };
    _.hooks._methods = ({ name, event, cp }) => {
      if (!cp[name]) {
        cp[name] = event;
      } else {
        console.warn(
          `${cp.name} : "${name}"  in methods is valid, Please use another one`
        );
      }
    };
    _.hooks._data = ({ name, event, cp }) => {
      const props = event();
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
