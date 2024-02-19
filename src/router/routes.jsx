import { Suspense, lazy } from "react";
// 引入
import {
  HashRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

// loading页面
const Loading = () => (
  <>
    <div className="loadsvg">
      <div>loading...</div>
    </div>
  </>
);
// 递归函数
const rotuerViews = (routerItems) => {
  if (routerItems && routerItems.length) {
    return routerItems.map(({ path, component, children, redirect }) => {
      const Component = lazy("@/views/" + component);
      return children && children.length ? (
        <Route
          path={path}
          key={path}
          element={
            <Suspense fallback={<Loading />}>
              <Component />
            </Suspense>
          }
        >
          {rotuerViews(children)}
          {redirect ? (
            <Route path={path} element={<Navigate to={redirect} />}></Route>
          ) : (
            <Route
              path={path}
              element={<Navigate to={children[0].path} />}
            ></Route>
          )}
        </Route>
      ) : (
        <Route
          key={path}
          path={path}
          element={
            <Suspense fallback={<Loading />}>
              <Component />
            </Suspense>
          }
        ></Route>
      );
    });
  }
};
const arr = JSON.parse(localStorage.getItem("auth"));
const PageView = () => {
  return (
    <Router>
      <Routes>{rotuerViews(arr)}</Routes>
    </Router>
  );
};
export default PageView;
