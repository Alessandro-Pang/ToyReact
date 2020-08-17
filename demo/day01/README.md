# Day 01 介绍

## 本篇概述

完成基于实 DOM 体系的 toy-react 的 component 的设定。

## 基本实现

本篇基于ToyReact基本实现，如果不理解基本思想，请查阅[Toy-React Basic](../basic);

## ToyReact 组件化

基于 ToyReact.createElement 基本实现中的思想，通过继承类实现 component 的设定

### 0. Component 自定义组件类

> Component 组件类封装了自定义组件的生命周期，Dom渲染等一系列操作
>
> 当组件继承了 Component 时，会同时继承他的方法与生命周期 

在创建组件之前，我们需要先知道类继承是怎么一回事！

* 继承类的作用

```js
/*关于 原型继承、类的基础知识不做讲解，只简单介绍类的继承的作用和使用*/

// 1.先创建一个父类
class ParentComponent {
    // 创建构造器
    constructor(name,age){
        this.name = name;
        this.age = age;
    }
	// 创建一个 echo 方法
    echo(text){
        console.log(text);
    }
    // 创建 toString 方法，用于输出参数
    toString(){
        console.log(this.name+'---'+this.age)
    }
}

// 2.创建子类，继承父类
class subClassComponent extends ParentComponent{
    // 继承父类构造器
    constructor(...props){
        super(...props)
    }
    // 创建一个 subEcho 方法
    subEcho(text){
        text = text ? text : "默认输出一句话";
        // 调用父类方法
        this.echo(text);
    }
}
// 3.创建 子类 实例
const demo = new subClassComponent('ali',18);
// 4. 通过子类实例直接调用父类方法
demo.echo(); // --> undefiend
demo.echo('echo parent Methods...'); // ---> echo parent Methods...
// 5. 调用子类本身方法
demo.subEcho(); // --> 默认输出一句话
demo.subEcho("echo subClass Methods...") // --> echo subClass Methods...
// 6. 调用父类 toString 观察从子类传入父类构造其中的参数
demo.toString() // --> ali---18
```

上面的实例只是简单的实现和演示了，类继承的实现和作用

我们可以通过类的继承调用父类中封装的方法，也可以继承父类中的构造器

我们在子类内部也可以使用父类中封装的方法，这样可以进一步封装代码

总结：当子类继承父类后，子类就有了父类中的方法，可以直接在子类的内部或者实例对象中调用。

* ToyReact 中继承Component

``` js
// 1.引入 ToyReact
import {ToyReact,Component} from "react";
// 2. 继承自定义 Componet 类
class Demo extends Component{/* pass */}
// 3. 使用組件
const ele = <Demo />;
```

* Component 类实现

```js
class Component{
  constructor() {
    // 子元素列表
    this.children = [];
  }
  // 设置属性
  setAttribute(name, value) {
    this[name] = value;
  }
  // 挂载元素
  mountTo(parent) {
    let vdom = this.render();
    vdom.mountTo(parent);
  }
  // 追加元素
  appendChild(vchild) {
    this.children.push(vchild);
  }
}
```

当我们使用继承过 Component 类的组件时，该组件就已经挂载了 Component 中的方法

### 1. ElementWrapper 与 TextWrapper 类 

> Document 中，有 元素节点 和 文本节点 两种基本类型
>
> 所以通过 ElementWrapper 和 TextWrapper 转换成相应的节点插入DOM

* ElementWrapper 的实现

```js
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
    // this.root == parent
    parent.appendChild(this.root);
  }
}
```

* TextWrapper 的实现

```js
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
```

### 2. Component 、ElementWrapper  、 TextWrapper  的关系

> 这里令人迷惑的地方就是他们三者之间的关系，或者说是 Component 与二者的关系
>
> ToyReact 中 Component 类 其实与 二者是并列关系，他们都是 JSX(Dom 节点) 元素组件的实现类 
>
> 1. Component 用于处理 自定义元素组件
> 2. ElementWrapper 用于处理HTML元素组件
> 3. TextWrapper 用于处理 Text 文本的组件

### 3. ToyReact 对象

```js
const ToyReact = {
  createElement(type, attributes, ...children) {
    /**
     * 创建元素：
     *    如果传入的是字符串，即HTML类型，则调用 ElementWrapper 创建元素
     *    如果传入的不是字符串，则是自定义的 jsx 组件对象，则直接 new 对象
     */
    const element =
      typeof type === "string" ? new ElementWrapper(type) : new type();
	
    /**
     * type == 'div'
     * new ElementWrapper('div')
     *
     * type == MyComponent
     * new MyComponent()
     */
      
    // 设置元素属性
    for (let name in attributes) {
      // 调用 Component 类中 SetAttribute 方法
      element.setAttribute(name, attributes[name]);
    }

    // 插入子元素
    const insertChildren = (children) => {
      //递归查询子元素，插入子元素
      for (let child of children) {
        // 判断是否是对象,并且对象来自数组
        if (typeof child === "object" && child instanceof Array) {
           // 满足条件,我们判定他是自定义组件,递归执行
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
          // 如果是一个字符串，我们将它转化为 文本节点
          if (typeof child === "string") {
            child = new TextWrapper(child);
          }
          /**
           * 通过ElementWarpper 中的appendChild 方法插入子元素
           * 这时的节点只有 文本节点 和 DOM 节点
           */
          element.appendChild(child);
        }
      }
    };
    insertChildren(children);
    return element;
  },

  render(vdom, element) {
    vdom.mountTo(element);
  },
};
```

* 根据 JSX 规则最外层必须是被单个Dom(VDom)元素包裹，所以在 我们可以直接通过 `typeof type`来判断是否是DOM类型，如果传入的不是一个字符串，而是一个类、对象，那么我们就认为他是我们的自定义组件，从而通过new递归调用
* insertChildren 方法是封装了插入虚拟DOM的方法，当 child 元素中，还有子元素时，就会递归调用。当他不是自定义组件，同时不是 文本节点和元素节点，则认定为非法元素，处理成文本节点。

## 运行代码

``` shell
# 1. 安装依赖项
npm install
# 2. 运行代码
npm run dev
```
