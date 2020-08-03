/*
 * @Author: zi.yang
 * @Date: 2020-07-27 21:43:49
 * @LastEditTime: 2020-08-03 09:05:41
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \ToyReact\demo\day01\src\ToyReact.js
 */
/**
 * 元素实例封装
 */
class ElementWrapper {
  constructor(type) {
  	// 创建 DOM 元素
    this.root = document.createElement(type);
  }
  
  // 封装设置属性方法
  setAttribute(name, value) {
    this.root.setAttribute(name, value);
  }

  // 封装插入虚拟DOM方法
  appendChild(vchild) {
    vchild.mountTo(this.root);
  }

  // 封装插入DOM元素方法
  mountTo(parent) {
    parent.appendChild(this.root);
  }
}

/**
 * 文本实例封装
 */
class TextWrapper {
  constructor(content) {
  	// 将文本转换成 文本节点，用于appndChild
    this.root = document.createTextNode(content);
  }

  // 封装插入DOM元素方法
  mountTo(parent) {
    parent.appendChild(this.root);
  }
}

/**
 * 自定义组件实体类
 */
class Component {
  constructor() {
    this.children = [];
  }
  
  // 给自定义组件加入属性
  setAttribute(name, value) {
    this[name] = value;
  }
  mountTo(parent) {
    const vdom = this.render();
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
    const element =
      typeof type === "string" ? new ElementWrapper(type) : new type();

    // 设置元素属性
    for (let name in attributes) {
      // 调用 Component 类中 SetAttribute 方法
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
            /**
             * 安全检查：
             *  将非法属性、类型通过 toString 转换成 字符串
             *  如：boolean、function、string 等
             */
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
    // Component
    vdom.mountTo(element);
    // element.appendChild(vdom)
  },
};

exports.ToyReact = ToyReact;
exports.Component = Component;
