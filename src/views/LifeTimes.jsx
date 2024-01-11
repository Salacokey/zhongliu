import React from "react";
import { Button } from "antd-mobile";
import { root } from "..";

class LifeTimes extends React.Component {
  //如果只是单纯的定义一个组件的状态 不必要使用constructor函数
  //只执行一次
  constructor(props) {
    super(props);
    this.state = { count: 0 };
    console.log("constructor...");
  }
  //   //默认返回true 只要props/state发生变化 就执行render + componentDidUpdate
  //   shouldComponentUpdate(nextProps, nextState) {
  //     console.log(this.props, nextProps);
  //     console.log(this.state, nextState);
  //     console.log("shouldComponentUpdate...");
  //     return false;
  //   }

  //   shouldComponentUpdate(nextProps, nextState) {
  //     return this.props.index !== nextProps.index;
  //   }
  //执行若干次
  render() {
    console.log("render...");
    return (
      <>
        <h1 onClick={() => this.setState({ count: {} })}>生命周期函数</h1>
        <div>{this.props.children}</div>
        <div>props:{this.props.index}</div>
        <div>state:{this.state.count}</div>
        <Button
          color='danger'
          onClick={() => root.unmount()}
        >
          销毁组件
        </Button>
      </>
    );
  }
  //执行若干次
  componentDidUpdate(prevProps, prevState) {
    console.log(prevProps, this.props);
    console.log(prevState, this.state);
    //避免死循环
    console.log("componentDidUpdate...");
    // if(prevState.id!==this.state.id){
    //     console.log("请求发送");
    // }
  }
  //只执行一次
  componentDidMount() {
    console.log("componentDidMount...");
  }
  //销毁
  componentWillUnmount() {
    //清除定时器 解绑时间 销毁变量
    console.log("componentWillUnmount...");
  }
}

export default LifeTimes;

//#region
// var a = 1;
// function shouldUpdate(nextVale) {
//   return true;
// }
// function update(v) {
//   a = v;
//   if (shouldUpdate(v)) {
//     console.log("更新UI", a);
//   }
// }
// update(123);

//#endregion

/* 
 1. 组件首次渲染会依次触发3个函数 constructor render componentDidMount 
    ①其中constructor and componentDidMount 在整个组件的生命周期中只执行一次 
    ②constructor函数具有一个形参 其作用是收集组件的props属性和子节点(props.children) (类似于vue插槽)
 2.组件的props/state发生更新时会依次触发： shouldComponentUpdate render componentDidUpdate
    ①其中shouldComponentUpdate这个函数必须具备返回值且其类型为boolean 用于控制后续的render和componentDidUpdate是否执行
    ②如果shouldComponentUpdate返回false 只是UI更新被拦截 props/state的值依然会变化
    ③shouldComponentUpdate函数具备两个参数 分别是即将更新的props和即将更新state
    ④shouldComponentUpdate核心功能 性能优化避免不必要的更新render
    ⑤componentDidUpdate函数具备两个参数 分别是上一次的props和上一次的state
 3.React.PureComponent = React.Component + shouldComponentUpdate
 4.componentDidCatch 捕获组件运行时的异常
*/
