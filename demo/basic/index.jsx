/*
 * @Author: zi.yang
 * @Date: 2020-07-27 21:23:05
 * @LastEditTime: 2020-07-28 13:43:55
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \ToyReact\demo\basic\index.jsx
 */

const { ToyReact } = require("@/ToyReact");

const component = (
  <div id="div" name="div">
    <span>Hello ! </span>
    <span>My Component</span>
  </div>
);

document.body.appendChild(component)

// var component = ToyReact.createElement("div", null, 
//     ToyReact.createElement("span", null, "Hello ! "), 
//     ToyReact.createElement("span", null, "My Component"));
