import React from "react";
import withRouter from "@/components/withRouter";
// 类组件不能使用hook
// 高阶组件HOC（High Order Component）
// 一种渲染其他组件的组件
class Line extends React.Component {
  constructor() {
    super();
    this.state = {};
  }
  render() {
    console.log(this.props.id);
    return <div>line</div>;
  }
}
export default withRouter(Line);
