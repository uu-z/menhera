export const bindHook = ({ _, hook, prop, cp }) => {
  const { name } = cp;

  if (typeof hook === "function") {
    if (typeof cp[prop] === "object") {
      for (const [name, value] of Object.entries(cp[prop])) {
        if (typeof value === "function") {
          hook({ name, event: value, cp });
        } else {
          hook({ name, props: value, cp });
        }
      }
    } else if (typeof cp[prop] === "function") {
      hook({ name, event: cp[prop], cp });
    } else {
      hook({ name, props: cp[prop], cp });
    }
  }
};
