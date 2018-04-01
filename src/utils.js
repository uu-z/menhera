export const ConfigMerger = (Obj1 = {}, Obj2 = {}) => {
  let cache = Obj1;
  Object.keys(Obj2).forEach(key => {
    if (Array.isArray(Obj2[key])) {
      cache[key] = Array.from(new Set([...(Obj1[key] || []), ...Obj2[key]]));
    } else if (typeof Obj2[key] === "object") {
      cache[key] = ConfigMerger(Obj1[key], Obj2[key]);
    } else {
      cache[key] = Obj2[key];
    }
  });
  return cache;
};

export const bindHook = ({ hook, cp, prop }) => {
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
