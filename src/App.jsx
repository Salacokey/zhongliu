import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { lazyload } from "./utils/lazyload";
import Login from "./views/Login";
import Lizi from "./views/Lizi";
const Layout = lazyload("Layout");
const App = () => (
  <div>
    <BrowserRouter>
      {/* <Link to="/index">首页</Link> */}
      {/* <NavLink
        to="/index"
        style={({ isActive }) => ({
          background: isActive ? "red" : "white",
        })}
      >
        INDEX
      </NavLink>
      <NavLink
        to="/foo"
        style={({ isActive }) => ({
          background: isActive ? "red" : "white",
        })}
      >
        FOO
      </NavLink>
      <NavLink
        to="/bar"
        style={({ isActive }) => ({
          background: isActive ? "red" : "white",
        })}
      >
        BAR
      </NavLink> */}
      <Routes>
        <Route path="/" element={<Navigate to="/login" />}></Route>
        <Route path="/layout/*" element={<Layout />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/lizi" element={<Lizi />}></Route>
      </Routes>
    </BrowserRouter>
  </div>
);
export default App;

/**
 * BrowserRouter 基于历史记录模式的路由
 * HashRouter
 * Routes
 * Route
 * Link
 */
