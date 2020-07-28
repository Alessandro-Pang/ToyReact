/*
 * @Author: zi.yang
 * @Date: 2020-07-27 21:23:05
 * @LastEditTime: 2020-07-28 00:30:26
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \ToyReact\index.js
 */

const { ToyReact, Component } = require("@/ToyReact");

class MyComponent extends Component {
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
      <div>Hi, i am the child components</div>
    </MyComponent>
  </MyComponent>
);

ToyReact.render(component, document.body);
