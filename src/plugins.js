export const Init = ({ _ }) => ({
  name: "Init",
  _awake() {
    _.hooks._hooks = ({ name, event }) => {
      if (!_.hooks[name] && event) {
        _.hooks[name] = event;
      }
    };
    _.hooks._methods = ({ name, event }) => {
      if (!_.methods[name] && event) {
        _.methods[name] = event;
      }
    };
  }
});
