# Day 02介绍

## 本篇概述

完成基于 虚拟DOM 的 toy-react 事件绑定与生命周期

## 基本实现

本篇基于 Day01 ToyReact组件化基本实现，如果不理解组件化基本思想，请查阅[Toy-React Day01](../day01);

## 本篇核心思想

通过 Doucument.createRange 实现虚拟DOM ，从而不直接修改真实DOM。（*关于 Range 对象实现虚拟 DOM 抱有疑惑，虽然通过 Range 对象也可以实现不直接修改 真实DOM ，但其行为和效率及功能无法苟同*）

## Range 对象简单实用

Range 接口表示一个包含节点与文本节点的一部分的文档片段。可以用 [`Document`](https://developer.mozilla.org/zh-CN/docs/Web/API/Document) 对象的 [`Document.createRange`](https://developer.mozilla.org/zh-CN/docs/Web/API/Document/createRange) 方法创建 Range，也可以用 [`Selection`](https://developer.mozilla.org/zh-CN/docs/Web/API/Selection) 对象的 [`getRangeAt`](https://developer.mozilla.org/zh-CN/docs/Web/API/Selection/getRangeAt) 方法获取 Range。另外，还可以通过 [`Document`](https://developer.mozilla.org/zh-CN/docs/Web/API/Document) 对象的构造函数 [`Range()`](https://developer.mozilla.org/zh-CN/docs/Web/API/Range/Range) 来得到 Range。

```js
/**
   语法：
   	通过 document.createRange 创建一个Range 对象
 */
const range  = document.createRange();

/**
	Rnage.setStart : 设置 Range 的起点
	Range.setEnd : 设置 Range 的中电
	startNode/endNode : 起点/终点元素
	startOffset/endOffset:起点偏移数量/终点偏移数量
 */
range.setStart(startNode,startOffset);
range.setEnd(endNode,endOffset);

/* Range 的具体方法、属性，因篇幅过长，所以放在末尾 */
```

## ElementWrapper 类重构

在 setAttribute 方法中对元素事件、属性进行处理和监听，在 appendChild 方法中使用 Range 对象重构。

```JS
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
    // 捕获自定义事件: onClick onMouseMove
    if (name.match(/^on([A-Z]([A-Za-z]+))$/)) {
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
```

* 将 className 处理成 class 并将其设置为元素属性
* 通过正则表达式捕获元素事件，其中命名方式为驼峰命名法，onClick、onMouseMove
* 不属于 class 和 事件的，我们将其认定为自定义属性。

## Component 类重构

```js
class Component {
  constructor() {
    // 子元素列表
    this.children = [];
    // 是否创建过占位元素
    this.comment = false;
    // 创建一个空的属性对象
    this.props = Object.create(null);
  }
  setAttribute(name, value) {
    // 处理父级元素传入的属性
    this.props[name] = value;
    // 处理元素属性
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
```



## Range 对象 的方法与属性

> 该段落摘自 MDN ,如果需要查阅 MDN 请点击转往 [MDN Range](https://developer.mozilla.org/zh-CN/docs/Web/API/Range)

```js
/**
   属性
*/
// 返回一个表示 Range 的起始位置和终止位置是否相同的布尔值。
Range.collapsed
// 返回完整包含 startContainer 和 endContainer 的最深一级节点
Range.commonAncestorContainer
// 返回包含 Range 开始的节点
Range.startContainer
// 返回 一个表示 Range 起点在 startContainer 中的位置数字。
Range.startOffset
// 返回包含 Rnage 终点的节点
Range.endContainer
// 返回一个表示 Range 终点在 endContainer 中的位置的数字
Range.endOffset

/**
   方法
*/
// 设置 Range 的起点。
Range.setStart()
// 设置 Range 的终点。
Range.setEnd()
// 以其他节点为基准，设置Range的起点
Range.setStartBefore()
// 以其它节点为基准，设置 Range 的起点。
Range.setStartAfter()
// 以其它节点为基准，设置 Range 的起点。
Range.setEndBefore()
// 以其它节点为基准，设置 Range 的起点。
Range.setEndAfter()
// 使 Range 包含某个节点及其内容。
Range.selectNode()
// 使 Range 包含某个节点的内容。
Range.selectNodeContents()
// 将 Range 折叠至其端点（boundary points，起止点，指起点或终点，下同）之一。
Range.collapse()

/**
   编辑方法
   通过以下方法，可以从 Range 中获得节点，改变 Range 的内容。
*/
//返回一个包含 Range 中所有节点的文档片段。
Range.cloneContents()
//从文档中移除 Range 包含的内容。
Range.deleteContents()
//把 Range 的内容从文档树移动到一个文档片段中。
Range.extractContents()
//在 Range 的起点处插入一个节点。
Range.insertNode()
//将 Range 的内容移动到一个新的节点中。
Range.surroundContents()

/**
   其他方法
*/
//比较两个 Range 的端点。
Range.compareBoundaryPoints()
//返回拥有和原 Range 相同的端点的克隆 Range 对象。
Range.cloneRange()
//将 Range 从使用状态中释放，改善性能。
Range.detach()
//把 Range 的内容作为字符串返回。
Range.toString()
```

