// v18.x
import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App";
import ErrorBoundary from "@/components/ErrorBoundary";

export const root = ReactDOM.createRoot(document.getElementById("root"));
export const reRenderUI = () => {
  root.render(
    <ErrorBoundary>
      {/* {App({ a: "1", b: 2, children: [<span>span</span>] })}
      <App {...{ a: "1", b: 2 }}>
        <span>span</span>
      </App> */}
      <App a="1" b={2}>
        <span>span</span>
      </App>
    </ErrorBoundary>
  );
};
reRenderUI();

// 定义函数
// 调用函数
// 函数的形参 和 实参

//v 16.x
/* 
import React from "react";
import ReactDom from "react-dom";
import App from "./App.jsx";
ReactDom.render(<App />, document.getElementById("root"));
*/
