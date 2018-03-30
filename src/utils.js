export const keyParser = ({ obj, structs = {}, ...other } = {}) => {
  Object.keys(other).forEach(key => {
    if (Array.isArray(other[key])) {
      if (!structs[key]) {
        structs[key] = {};
      }

      other[key].forEach(keyword => {
        structs[key][keyword] = obj[keyword];
      });
    }
  });
  return structs;
};

export const typeParser = ({ obj, structs = {} } = {}) => {
  structs = { ...structs, props: {}, events: {} };
  Object.keys(obj).forEach(key => {
    if (typeof obj[key] === "function") {
      structs["events"][key] = obj[key];
    } else {
      structs["props"][key] = obj[key];
    }
  });
  return structs;
};

export const ConfigMerger = (Obj1, Obj2) => {
  let cache = Obj1;
  Object.keys(Obj2).forEach(key => {
    cache[key] = Array.from(new Set([...(Obj1[key] || []), ...Obj2[key]]));
  });
  return cache;
};
