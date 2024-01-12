import { BrowserRouter, Routes, Route, Link, NavLink } from "react-router-dom";
import Index from "./views/Index";
import Foo from "./views/Foo";
import Bar from "./views/Bar";
import Abc from "./views/Abc";
import Line from "./views/Line";
import Lei from "./views/Lei";
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
        <Route path="/index" element={<Index />}></Route>
        <Route path="/foo" element={<Foo />}></Route>
        <Route path="/bar/:id" element={<Bar />}></Route>
        <Route path="/bar/abc" element={<Abc />}></Route>
        <Route path="/line/:id" element={<Line />}></Route>
        <Route path="/lei" element={<Lei />}></Route>
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
