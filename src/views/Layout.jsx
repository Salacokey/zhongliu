import React, { useEffect } from "react";
import { Route, Routes, Navigate, useNavigate } from "react-router-dom";
import { Layout, Menu, theme } from "antd";
// import User from "@/views/system/user";
// import store from "@/pinia";
// import HeaderPath from "@/components/layout/header";
// import { re_render } from "@/index";

const { Header, Content, Footer, Sider } = Layout;

const App = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const navigate = useNavigate();
  // const defalut_key = useRef([]);
  // store.path_key = ["user"];
  // console.log(store);
  // const [is_render, set_is_render] = React.useState(false);
  // console.log(JSON.parse(localStorage.getItem("Router")));
  const routes = JSON.parse(localStorage.getItem("auth"));
  routes.unshift({
    alwaysShow: false,
    meta: {
      title: "首页",
    },
    path: "home",
    name: "home",
    component: "home",
  });
  const route_item = (route) => {
    let arr = [];
    route.forEach((item) => {
      let obj = {
        key: item.path[0] === "/" ? item.path.slice(1) : item.path,
        label: item.meta.title,
        icon: "",
      };
      if (item.children) {
        obj.children = route_item(item.children);
      }
      arr.push(obj);
    });
    return arr;
  };
  // const render = () => {
  //   re_render();
  // };
  // useEffect(() => {
  //   defalut_key.current = ["user"];
  //   console.log(defalut_key.current);
  //   // set_is_render(!is_render);
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [defalut_key]);
  // console.log(route_arr);
  function parseArr(arr, res) {
    var i = 0;
    // console.log(arr);
    for (i = 0; i < arr.length; i++) {
      if (arr[i].children && arr[i].children.length > 0) {
        // console.log(arr[i]);
        // 是数组就递归调用上面的扁平化一层的代码
        // if (arr[i].component !== "Layout")
        //   res.push({ ...arr[i], children: [] });
        parseArr(arr[i].children, res);
      } else {
        // 不是数组，直接通过push添加到返回值数组
        res.push({
          ...arr[i],
          path: arr[i].path[0] === "/" ? arr[i].path.slice(1) : arr[i].path,
        });
      }
    }
  }
  var res = [];
  parseArr(routes, res);
  // console.log(route_item(routes));
  const item = route_item(routes);
  // console.log(item, routes);
  // console.log(res);
  // const create_router = (arr) => {
  //   return arr.map((item1) => {
  //     if (item1.alwaysShow) {
  //       return create_router(item1.children);
  //     } else {
  //       const Component = React.lazy(() =>
  //         import(`@/views/${item1.component}`)
  //       );
  //       return <Route path={item1.path} key={item1} element={<Component />} />;
  //     }
  //   });
  // };
  const create_router = (arr) => {
    return arr.map((item1) => {
      const Component = React.lazy(() => import(`@/views/${item1.component}`));
      return (
        <Route
          path={item1.path}
          key={item1}
          element={
            <React.Suspense fallback={<div>稍等</div>}>
              <Component />
            </React.Suspense>
          }
        />
      );
    });
  };

  // console.log(store);
  // store.path_key = sessionStorage.getItem("path_key") ?? "user";
  // // console.log(store.path_key, store.path_key);
  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    sessionStorage.setItem("routes", JSON.stringify(res));
    if (!sessionStorage.getItem("now_path"))
      sessionStorage.setItem("now_path", "user");

    sessionStorage.setItem(
      "path_arr",
      sessionStorage.getItem("path_arr") ?? JSON.stringify(["home", "user"])
    );
    // console.log(sessionStorage.getItem("now_path"));
    navigate(sessionStorage.getItem("now_path"));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // console.log(sessionStorage.getItem("now_path"));
  return (
    <Layout className="w-[1472px] m-auto">
      <Sider
        style={{
          overflow: "auto",
          height: "100vh",
          position: "fixed",
          left: 0,
          top: 0,
          bottom: 0,
          zIndex: 10,
        }}
      >
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          // defaultSelectedKeys={sessionStorage.getItem("now_path")}
          selectedKeys={sessionStorage.getItem("now_path")}
          mode="inline"
          items={item}
          onClick={(e) => {
            // console.log(e);
            navigate(e.key);
            sessionStorage.setItem("now_path", e.key);
            // console.log(store.path_key);
            const arr = JSON.parse(sessionStorage.getItem("path_arr"));
            console.log(arr);
            if (arr.indexOf(e.key) === -1) arr.push(e.key);
            sessionStorage.setItem("path_arr", JSON.stringify(arr));
            console.log(arr);
          }}
        />
      </Sider>
      <Layout
        style={{
          marginLeft: 200,
        }}
      >
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        >
          {/* <HeaderPath render={render} /> */}
        </Header>
        <Content
          style={{
            margin: "24px 16px 0",
            overflow: "initial",
          }}
        >
          <div
            style={{
              padding: 24,
              // textAlign: "center",
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
              minHeight: "75vh",
            }}
          >
            <Routes>
              <Route
                path="/"
                element={<Navigate to="./user"></Navigate>}
              ></Route>

              {create_router(res)}
            </Routes>
          </div>
        </Content>
        <Footer
          style={{
            textAlign: "center",
          }}
        >
          Ant Design ©{new Date().getFullYear()} Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
  );
};
export default App;
