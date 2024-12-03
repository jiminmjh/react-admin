import { Outlet } from "react-router-dom";
const Layout = () => (
  <div className="con">
    <h1>Layout</h1>
    <Outlet /> {/* 子路由渲染位置 */}
  </div>
);
export default Layout;
