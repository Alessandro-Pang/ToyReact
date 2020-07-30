/*
 * @Author: zi.yang
 * @Date: 2020-07-27 21:43:49
 * @LastEditTime: 2020-07-29 23:37:23
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \ToyReact\demo\day02\src\ToyReact.js
 */

class ElementWrapper {
  constructor(type) {
    this.root = document.createElement(type);
  }
  setAttribute(name, value) {
    // 处理 className , 修正为 class
    if (name === "className") {
      this.root.setAttribute("class", value);
      return;
    }
    // 捕获自定义事件
    if (name.match(/^on([A-Z]([a-z]+))$/)) {
      // 修正事件名称
      const eventName = RegExp.$1.replace(/^[A-Z]/, (e) => e.toLowerCase());
      // 添加DOM事件监听
      this.root.addEventListener(eventName, value);
      return;
    }
    // 添加属性
    this.root.setAttribute(name, value);
  }
  appendChild(vchild) {
    const range = document.createRange();
    if (this.root.children.length) {
      range.setStartAfter(this.root.lastChild);
      range.setEndAfter(this.root.lastChild);
    } else {
      range.setStart(this.root, 0);
      range.setEnd(this.root, 0);
    }

    vchild.mountTo(range);
  }
  mountTo(range) {
    range.deleteContents();
    range.insertNode(this.root);
  }
}

class TextWrapper {
  constructor(content) {
    this.root = document.createTextNode(content);
  }
  mountTo(range) {
    range.deleteContents();
    range.insertNode(this.root);
  }
}
class Component {
  constructor() {
    this.children = [];
    this.comment = false;
    this.props = Object.create(null);
  }
  setAttribute(name, value) {
    this.props[name] = value;
    this[name] = value;
  }
  mountTo(range) {
    // 保存内容
    this.range = range;
    this.update();
  }
  appendChild(vchild) {
    this.children.push(vchild);
  }
  update() {
    // 处理 Range 节点修复
    if (!this.comment) {
      //占位符，确保删除元素后 range 没有变化
      const placholder = document.createComment("placholder");
      //创建一个 Range 对象，接口表示一个包含节点与文本节点的一部分的文档片段。
      const range = document.createRange();
      // endContainer 返回包含 Range 终点的节点。
      // endOffset 返回一个表示 Range 终点在 endContainer 中的位置的数字。
      range.setStart(this.range.endContainer, this.range.endOffset);
      range.setEnd(this.range.endContainer, this.range.endOffset);
      // 插入占位符
      range.insertNode(placholder);
      this.comment = true;
    }
    // 删除原有内容
    this.range.deleteContents();
    // 渲染新的 DOM
    const vdom = this.render();
    vdom.mountTo(this.range);

    // 目前不能删除，会影响DOM渲染
    // placholder.parentNode.removeChild(placholder);
  }
  setState(state) {
    // merge 合并新状态
    const merge = (oldState, newState) => {
      // 遍历 state 对象
      for (let p in newState) {
        // 如果新状态中包含对象则递归遍历
        if (typeof newState[p] === "object") {
          // 如果过去的状态没有对象，则赋空对象，避免递归报错
          if (typeof oldState[p] !== "object") oldState[p] = {};
          merge(oldState[p], newState[p]);
        } else {
          // 状态合并
          oldState[p] = newState[p];
        }
      }
    };
    // 如果初始状态为空，并且有新状态，初始化 state 为空对象
    if (!this.state && state) this.state = {};
    // 合并 State
    merge(this.state, state);
    this.update();
  }
}

const ToyReact = {
  createElement(type, attributes, ...children) {
    let element =
      typeof type === "string" ? new ElementWrapper(type) : new type();

    for (let name in attributes) {
      element.setAttribute(name, attributes[name]);
    }
    const insertChildren = (children) => {
      for (let child of children) {
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
    const range = document.createRange();
    if (element.children.length) {
      range.setStartAfter(element.lastChild);
      range.setEndAfter(element.lastChild);
    } else {
      range.setStart(element, 0);
      range.setEnd(element, 0);
    }

    vdom.mountTo(range);
  },
};

exports.ToyReact = ToyReact;
exports.Component = Component;
