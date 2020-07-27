/*
 * @Author: zi.yang
 * @Date: 2020-07-27 21:23:05
 * @LastEditTime: 2020-07-27 23:10:13
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \ToyReact\index.js
 */

const { ToyReact ,Component} = require("@/ToyReact");

class MyComponent extends Component {
  render(){
    console.log(<div><span></span></div>)
    return (
      <div><span>Hello! </span> My Component</div>
    )
  }
}
console.log(<MyComponent/>)
const component = <MyComponent name="myComponet" id="test"></MyComponent>;

ToyReact.render(component,document.body)