<!--

 * @Author: zi.yang
 * @Date: 2020-07-28 08:25:54
 * @LastEditTime: 2020-07-28 13:47:47
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \ToyReact\demo\basic\README.md
-->

# Basic 介绍

## 本篇概述

Toy-React 的基础实现及思想

## 实现自定义 Toy-React 的关键

Babel 默认使用 React.createElement 编译 JSX 为 JS。

所以，需要通过使用 Babel 插件,改变默认的编译方式。

```shell
# 1.安装插件
npm install @babel/plugin-transform-react-jsx
# 2.在.babelrc中配置插件
"plugins": [[
    "@babel/plugin-transform-react-jsx",
    {"pragma":"ToyReact.createElement"}
 ]]
```

*注：课程中 winter 老师配置在 webpack 内，这里只是单独抽离出来，效果一致*

pragma 指定 Babel 编译 JSX 的方式，ToyReact.createElement 将是我们接下来需要实现的对象

## ToyReact.createElement 的简单实现

### 0. Babel 编译 JSX 思想

> Babel编译JSX可以分为两个步骤
>
> 1.当代码运行编译时，发现JSX代码，Babel 会将JSX 编译成 JS 对象。
>
> 2.将编译后的对象自动调用 React.createElement 实现编译后的JS。
>
> 编译前：
>
> ``` html
> <div name="test">content</div>
> ```
>
> 编译后：
>
> ``` js
> React.createElement('div',{name:"test"},'content')
> ```
>
> Babel 将一个 JSX 元素 分成了：元素类型，元素属性，子节点（元素）
>
> React.createElement 将生产出对应类型、属性、子节点的虚拟Dom。

### 1.创建 createElement 方法

> 本篇核心思想，后面的代码只是进一步完善和优化

```js
export const ToyReact = {
  createElement(type,attributes,...children){
      let element = document.createElement(type);
      for(let name in attributes){
          element.setAttribute(name,attributes[name]);
      }
      for(let child of children){
          if(typeof child === "string"){
              child = document.createTextNode(child);
          }
          element.appendChild(child)
      }
      return element;
  }
}
```

### 2.创建实例

```jsx
// 1.引入 toy-react 库
import {ToyReact} from "./toy-react.js";
// 2.使用 Jsx 语法
const component = <div id="div" name="div"><span>my-</span><span>component</span></div>;
/**
 * 编译后：
 *      ToyReact.createElement('div',{ id:'div' , name:'div' },
 *          ToyReact.createElement('span',null, 'my-'),
 *          ToyReact.createElement('span',null, 'component')
 *       )
 */
// 3.插入 Dom 元素
document.body.appendChild(component);
```

## ToyReact 基本原理

* 因为通过 @babel/plugin-transform-react-jsx 插件改变了 JSX 编译方法，并使用 ToyReact.createElement 作为编译方法，所以当 Babel 将编译好的 JSX 对象,会调用我们自己定义的 ToyReact.createElement 方法 。
* 跟随 Babel 的规则，JSX 拆分成 元素类型、元素属性、子元素 ，并传入ToyReact.createElement。
* 所以自定义的 ToyReact.createElement 也必须有三个参数，用于生成 DOM 元素。
* 因为是真实DOM元素，所以 ToyReact 中可以直接通过 DOM 的方法去处理，合成元素。 
* 因为 Babel 会将所有的 JSX 编译成 JS 所以这里可以直接插入子元素，从而不需要递归查询