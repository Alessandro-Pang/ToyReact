/*
 * @Author: zi.yang
 * @Date: 2020-07-27 21:23:05
 * @LastEditTime: 2020-08-03 08:40:35
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \ToyReact\demo\day01\index.jsx
 */

const { ToyReact, Component } = require("@/ToyReact");

class MyComponent extends Component {
  // 在这里可以调用 Component 方法
  render() {
    return (
      <div>
        <span>Hello ! </span>
        <span>My Component</span>
        <div>{true}</div>
        <div>{false}</div>
        {this.children}
      </div>
    );
  }
}

const component = (
  <MyComponent name="myComponet" id="test">
    <MyComponent>
      <div zy="1" name="div">Hi, i am the child components</div>
    </MyComponent>
  </MyComponent>
);

ToyReact.render(component, document.body);
