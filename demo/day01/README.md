<!--

 * @Author: zi.yang
 * @Date: 2020-07-28 08:25:54
 * @LastEditTime: 2020-07-28 13:47:05
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \ToyReact\demo\day01\README.md
-->

# Day 01 介绍

## 本篇概述

完成基于实 DOM 体系的 toy-react 的 component 的设定。

## 基本实现

本篇基于ToyReact基本实现，如果不理解基本思想，请查阅[Toy-React Basic](../basic);

## ToyReact 组件化

基于 ToyReact.createElement 基本实现中的思想，通过继承类实现 component 的设定

### 0. Component 自定义组件类

> Component 组件类封装了生命周期，Dom渲染等一系列操作
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



## 运行代码

``` shell
# 1. 安装依赖项
npm install
# 2. 运行代码
npm run dev
```