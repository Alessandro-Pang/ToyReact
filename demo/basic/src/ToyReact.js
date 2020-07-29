/*
 * @Author: zi.yang
 * @Date: 2020-07-28 13:10:54
 * @LastEditTime: 2020-07-28 13:44:29
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \ToyReact\demo\basic\src\ToyReact.js
 */ 
export const ToyReact = {
  createElement(type,attributes,...children){
  	  // 创建DOM元素
      let element = document.createElement(type);
      // 遍历DOM属性，并通过setArrtibute设置
      for(let name in attributes){
          element.setAttribute(name,attributes[name]);
      }
      // 遍历并插入子元素,如果是字符串则生成字符串节点。
      for(let child of children){
          if(typeof child === "string"){
              child = document.createTextNode(child);
          }
          element.appendChild(child)
      }
      // 返回DOM元素
      return element;
  }
}