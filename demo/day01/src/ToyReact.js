/*
 * @Author: zi.yang
 * @Date: 2020-07-27 21:43:49
 * @LastEditTime: 2020-07-28 14:16:42
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \ToyReact\demo\day01\src\ToyReact.js
 */

class ElementWrapper {
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

class TextWrapper {
  constructor(content) {
    this.root = document.createTextNode(content);
  }
  mountTo(parent) {
    parent.appendChild(this.root);
  }
}
class Component {
  constructor() {
    this.children = [];
  }
  setAttribute(name, value) {
    this[name] = value;
  }
  mountTo(parent) {
    let vdom = this.render();
    vdom.mountTo(parent);
  }
  appendChild(vchild) {
    this.children.push(vchild);
  }
};

const ToyReact = {
  createElement(type, attributes, ...children) {
    /**
     * 创建元素：
     *    如果传入的是字符串，即HTML类型，则调用 ElementWrapper 创建元素
     *    如果传入的不是字符串，则是自定义的 jsx 组件对象，则直接 new 对象
     */
    let element =
      typeof type === "string" ? new ElementWrapper(type) : new type();
    
    // 设置元素属性
    for (let name in attributes) {
      element.setAttribute(name, attributes[name]);
    }
    
    // 插入子元素
    const insertChildren = (children) => {
      //递归查询子元素，插入子元素
      for (let child of children) {
        // 判断是否是对象,
        if (typeof child === "object" && child instanceof Array) {
          insertChildren(child);
        } else {
          if (
            !(child instanceof Component) &&
            !(child instanceof ElementWrapper) &&
            !(child instanceof TextWrapper)
          ) {
            child = String(child);
          }
          if (typeof child === "string") {
            child = new TextWrapper(child);
          }
          element.appendChild(child);
        }
      }
    };
    insertChildren(children);
    return element;
  },

  render(vdom, element) {
    vdom.mountTo(element);
    // element.appendChild(vdom)
  },
};

exports.ToyReact = ToyReact;
exports.Component = Component;
