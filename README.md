<!--
 * @Author: zi.yang
 * @Date: 2020-07-28 08:03:11
 * @LastEditTime: 2020-07-28 08:34:47
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \ToyReact\README.md
-->

# Toy-React

## 介绍

* Toy React 是跟随 极客时间 的 winter 老师开发的 一个简单的 React 框架
* Toy React 用于学习 React  框架背后的原理及实现方式
* 这个项目用于了解一个 Toy React 框架搭建的全过程
* 这个项目记录了课程笔记、注释，以及尝试用最简单的方式解释原理
* 每一个demo下的代码，都是一个可以单独运行的源码

## 极客时间

课程地址：[Toy React](https://u.geekbang.org/subject/priorfe?utm_source=baidu-ad&utm_medium=ppzq-pc&utm_term=baidu-ad-ppzq-title&utm_campaign=guanwang&utm_content=title);

## 项目结构

目录结构

```js
.
│
├─webpack.config.js     // 构建 webpack 配置
├─mian.js               // Toy-React的实例
├─public                // html 入口
└─src                   // Toy-React源码实现
    ├─ToyReact.js       // Toy-React实现
    └─...
│
└─demo                  // 每日代码归类总结
   ├─basic              // Toy-react 基础实现
   ├─day01              // 第一天源码
   ├─day02              // 第二天源码
   ├─day03              // 第三天源码
   └─...
│
├─ .babelrc             // babel配置文件
├─ .gitignore           // git 配置文件
```

## 运行代码

``` shell
# 1. 安装依赖项
npm install
# 2. 运行代码
npm run dev
```
