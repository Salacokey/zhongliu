import React from "react";
import { produce } from "immer";
import styled from "styled-components";
import { getFundRank } from "../service";

import { CapsuleTabs } from "antd-mobile";
import SvgIcon from "../components/SvgIcon/SvgIcon.jsx";

//通过 styled 定义样式组件
const WrapperUl = styled.ul`
  background-color: #faf9de;
  padding: 10px 5px;
  li {
    color: #333;
    font-size: 16px;
    list-style-type: none;
    margin: 15px 0;
  }
`;

class FundOrder extends React.Component {
  constructor() {
    super();
    this.state = {
      incomeDuration: "SYL_1N",
      data: [],
    };
    this.incomeTabs = {
      近1周: "SYL_Z",
      近1月: "SYL_Y",
      近3月: "SYL_3Y",
      近6月: "SYL_6Y",
      今年来: "SYL_JN",
      近1年: "SYL_1N",
      近2年: "SYL_2N",
      近3年: "SYL_3N",
      近5年: "SYL_5N",
      成立以来: "SYL_LN",
    };
  }
  async getFund() {
    const data = await getFundRank({ SortColumn: this.state.incomeDuration });
    this.setState(
      produce((draft) => {
        draft.data = data.data.Datas;
      }),
    );
  }

  componentDidUpdate(_, prevState) {
    if (prevState.incomeDuration !== this.state.incomeDuration) {
      this.getFund();
    }
  }
  componentDidMount() {
    this.getFund();
  }

  //通过逻辑业务返回boolean 控制更新流程是否继续 true继续 false代表终止
  //控制更新流程是否开始的阀门
  // shouldComponentUpdate(_, nextState) {
  //   //如果组件的incomeDuration状态发生改变 组件的更新流程开始（shouldComponentUpdate -> componentWillUpdate -> render -> componentDidUpdate）
  //   //否则忽略本次不必要的更新
  //   //shouldComponentUpdate -> 终止
  //   //通过shouldComponentUpdate中的逻辑判定组件的更新与哪些状态有关 与哪些状态无关
  //   //只与incomeDuration有关 与其他状态无关
  //   return this.state.incomeDuration !== nextState.incomeDuration;
  // }
  render() {
    // console.log(this.state.data);
    const { data, incomeDuration } = this.state;
    const renderFundList = (
      <WrapperUl>
        {data.map((item) => {
          return <li key={item.FCODE}>{item.SHORTNAME}</li>;
        })}
      </WrapperUl>
    );
    return (
      <>
        <SvgIcon icon={"test"} ></SvgIcon>
        <CapsuleTabs
          defaultActiveKey={incomeDuration}
          onChange={(e) => this.setState({ incomeDuration: e })}
        >
          {Object.entries(this.incomeTabs).map(([title, value]) => (
            <CapsuleTabs.Tab
              title={title}
              key={value}
            ></CapsuleTabs.Tab>
          ))}
        </CapsuleTabs>
        {renderFundList}
      </>
    );
  }
}

export default FundOrder;
