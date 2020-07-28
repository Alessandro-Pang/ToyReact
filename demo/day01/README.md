<!--

 * @Author: zi.yang
 * @Date: 2020-07-28 08:25:54
 * @LastEditTime: 2020-07-28 08:37:57
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \ToyReact\demo\day01\README.md
-->

# Day 01 介绍

## 本篇概述

完成基于实 DOM 体系的 toy-react 的 component 的设定。

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
        let element = document.createElement
    }
}
```











