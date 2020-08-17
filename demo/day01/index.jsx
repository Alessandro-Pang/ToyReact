/**
 * @ Author: zy.yang
 * @ Create Time: 2020-08-07 08:24:42
 * @ Modified by: zi.yang
 * @ Modified time: 2020-08-17 07:43:43
 * @ Description:
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
/**
 * babel 会将所有的 jsx 先编译成 js 对象
 */
ToyReact.render(component, document.body);
