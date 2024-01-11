// use开头的函数 hook函数
// useEffect === componentDidMount + componentDidUpdate + componentWillUnmount
import { useState, useEffect, useRef } from "react";
import { root } from "../index";
import { useComponentDidMount, useBeforeDestory, useUpdate } from "@/hooks";
function Foo() {
  let [count, setCount] = useState(123);
  const divRef = useRef();
  /*
  // 使用useEffect实现componentDidMount
  useEffect(() => {
    console.log("componentDidMount");
  }, []);
  // 使用useEffect 实现 componentDidMount + componentDidUpdate
  useEffect(() => {
    console.log("componentDidMount + componentDidUpdate");
  }, [count]);
  // 使用useEffect 实现 componentWillUnmount
  useEffect(() => {
    return () => {
      console.log("componentWillUnmount");
    };
  }, []);
  */
  useComponentDidMount(() => {
    console.log("useComponentDidMount123");
  });
  useBeforeDestory(() => {
    console.log("useBeforeDestory");
  });
  useUpdate(() => {
    console.log("useUpdate!!!");
  });
  // 组件第一次执行 打印1 组件更新 打印1 组件卸载 打印1
  useEffect(() => {
    console.log(1);
    return () => {
      console.log(2);
    };
  });
  // 组件第一次执行 打印1 组件更新 不打印 组件卸载 打印2
  useEffect(() => {
    console.log(1);
    return () => {
      console.log(2);
    };
  }, []);
  // divRef的值 如何获取？
  useEffect(() => {
    console.log(divRef.current);
  }, [divRef]);
  return (
    <div>
      <div ref={divRef} onClick={() => setCount(count++)}>
        {count}
      </div>
      <button
        onClick={() => {
          root.unmount();
        }}
      >
        卸载
      </button>
    </div>
  );
}
export default Foo;

// react hooks是什么？ 一组能够模拟类组件功能的函数
// react hook是一组函数
// 为什么要有react hooks呢？
// 为了让函数组件的功能和类组件相当 但是 学习复杂度+记忆成本 直线降低！
// 类组件 === 函数式组件 + hooks
/**
 * hook使用的条件：
 * hook在组件中使用时必须在组件的顶层 不得出现在任何嵌套结构（if条件判断 for循环）中
 * react允许你基于官方的hook函数封装你自己的自定义的hook函数(hook可以在任何自定义hook函数中的顶层使用)
 */
