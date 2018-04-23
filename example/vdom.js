import "babel-polyfill";
import Menehra, { $ } from "../dist";

export const h = _val => {
  const { name, children, props } = _val;
  const el = document.createElement(name);

  $(props, (key, val) => {
    switch (key) {
      case "style":
        el.style.cssText = val;
        break;
      default:
        el.setAttribute(key, val);
        break;
    }
  });

  children.forEach(child => {
    const childEl = child.children ? h(child) : document.createTextNode(child);
    el.appendChild(childEl);
  });
  return el;
};

const Vdom = {
  name: "Vdom",
  _hooks: {
    Vdom: {
      mount({ _val }) {
        this.root = _val;
      },
      h: {
        _({ _val }) {
          const { mount, children } = _val;
          const root = document.querySelector(this.root);
          let dom = h(_val);
          root.appendChild(dom);
        }
      }
    }
  }
};

const _ = new Menehra({
  _mount: {
    core: [Vdom]
  },
  Vdom: {
    mount: "#root",
    h: {
      name: "div",
      props: { style: "background-color:black", id: "test" },
      children: [
        {
          name: "div",
          props: {
            style: "color:red"
          },
          children: ["test"]
        }
      ]
    }
  }
});
