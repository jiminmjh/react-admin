import { Outlet } from "react-router-dom";
const Layout = () => (
  <>
    <h1>Layout</h1>
    <Outlet /> {/* 子路由渲染位置 */}
  </>
);
export default Layout;
