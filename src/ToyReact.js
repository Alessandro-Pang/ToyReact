/*
 * @Author: zi.yang
 * @Date: 2020-07-27 21:43:49
 * @LastEditTime: 2020-07-27 23:13:54
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \ToyReact\src\ToyReact.js
 */

class ElementWarpper {
  constructor(type) {
    this.root = document.createElement(type);
  }
  setAttribute(name, value) {
    this.root.setAttribute(name, value);
  }
  appendChild(vchild) {
    vchild.mountTo(this.root);
  }
  mountTo(parent) {
    parent.appendChild(this.root);
  }
}

class TextWarpper {
  constructor(content) {
    this.root = document.createTextNode(content);
  }
  mountTo(parent) {
    parent.appendChild(this.root);
  }
}

exports.Component = class Component {
  setAttribute(name, value) {
    this[name] = value;
  }
  mountTo(parent) {
    let vdom = this.render();
    vdom.mountTo(parent);
  }
};

exports.ToyReact = {
  createElement(type, attributes, ...children) {
    let element =
      typeof type === "string" ? new ElementWarpper(type) : new type();

    for (let name in attributes) {
      element.setAttribute(name, attributes[name]);
    }
    for (let child of children) {
      child = typeof child === "string" && new TextWarpper(child);
      element.appendChild(child);
    }
    return element;
  },

  render(vdom, element) {
    vdom.mountTo(element);
    // element.appendChild(vdom)
  },
};
