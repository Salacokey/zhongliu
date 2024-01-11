import { useEffect, useRef } from "react";
// 基于useEffect封装useComponentDidMount
export function useComponentDidMount(callback) {
  useEffect(() => {
    typeof callback === "function" && callback();
  }, [callback]);
}
export function useBeforeDestory(callback) {
  useEffect(() => {
    return () => typeof callback === "function" && callback();
  }, [callback]);
}
// useUpdate 第一次不执行 只在组件更新时
export function useUpdate(callback) {
  // useRef也可以存储数据 hook或组件重新执行 但是值不会被重新初始化 保留最后的操作结果
  // ref变量的变化不会触发组件的重新渲染 但是 可以在多次渲染之间共享数据
  // ref变量的引用没有发生变化 ref是非常少见的可变数据 但是react并不会跟踪变化而重新渲染组件
  let isMount = useRef(false);
  useEffect(() => {
    if (isMount.current) {
      typeof callback === "function" && callback();
    } else {
      isMount.current = true;
    }
  });
}
// 在第一次渲染时 isMount.current = true
// 第二次渲染时 读取的 isMount.current
// ref变量的引用没有发生变化 ref是非常少见的可变数据 但是react并不会跟踪变化而重新渲染组件
