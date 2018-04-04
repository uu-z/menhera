import { bindHook, ConfigMerger } from "./utils";

export const v000 = ({ _ }) => ({
  name: "v000",
  _hooks() {
    return {
      _config: ({ _key, _val, cp }) => {
        _.config = ConfigMerger(_.config, _val);
      },
      _command: ({ _key, _val, cp }) => {
        const { run } = _val;
        if (run) {
          const { lifeCycle = [] } = _.config;
          Object.values(_.components).forEach(async cp => {
            await Object.keys(cp).forEach(_key => {
              if (!_key.startsWith("_")) {
                bindHook({ _, _key, cp });
              }
            });

            lifeCycle.forEach(key => {
              if (!key.startsWith("_")) {
                cp[key] && cp[key]();
              }
            });
          });
        }
      }
    };
  }
});

export const v001 = ({ _ }) => ({
  name: "v001",
  _hooks() {
    return {
      _methods({ _key, _val, cp }) {
        for (let [key, val] of Object.entries(_val)) {
          if (!cp[key]) {
            cp[key] = val.bind(cp);
          } else {
            console.warn(
              `${
                cp.name
              } : "${key}"  in methods is valid, Please use another one`
            );
          }
        }
      },
      _data({ _val, cp }) {
        const props = _val.bind(cp)();
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

export const Optional = [v001];
