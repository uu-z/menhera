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
