import { Suspense } from "react";
import { BrowserRouter, Routes, Navigate } from "react-router-dom";
import { DynamicRoutes } from "@/utils/route";

// 动态加载组件
const Home = lazy(() => import("@/pages/home"));
const Login = lazy(() => import("@/pages/login"));
const Layout = lazy(() => import("@/pages/layout"));

// 加载组件
const Loading = () => <div>Loading...</div>;
const Loading2 = () => <div>Loading222</div>;

const routes: IRoute[] = [
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/layout",
    element: <Layout />,
    children: [
      {
        path: "",
        element: <Login />,
      },
    ],
  },
];

function App() {
  // const isAuthenticated = !!localStorage.getItem('token'); // 判断是否已登录
  // return isAuthenticated ? children : <Navigate to="/login" replace />;
  return (
    <BrowserRouter>
      <Suspense
        fallback={window.location.pathname === "/" ? <Loading /> : <Loading2 />}
      >
        <Routes>{DynamicRoutes(routes)}</Routes>
      </Suspense>
    </BrowserRouter>
  );
}
export default App;
