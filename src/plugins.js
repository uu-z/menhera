export const Init = ({ _ }) => ({
  name: "Init",
  _awake() {
    _.hooks._hooks = ({ name, event, cp }) => {
      if (event) {
        if (!_.hooks[name]) {
          _.hooks[name] = [];
        }
        _.hooks[name].push(event.bind(cp));
      }
    };
    _.hooks._methods = ({ name, event, cp }) => {
      if (!_.methods[name]) {
        _.methods[name] = event.bind(cp);
      } else {
        console.warn(
          `${cp.name} : "${name}"  in methods is valid, Please use another one`
        );
      }
    };
  }
});
