// 动态加载组件
const Home = lazy(() => import("@/pages/home"));
const Login = lazy(() => import("@/pages/login"));
const Layout = lazy(() => import("@/pages/layout"));
const Err404 = lazy(() => import("@/pages/error/404"));

export const routes: IRoute[] = [
  {
    path: "/",
    element: <Home />
  },
  {
    path: "/login",
    element: <Login />
  },
  {
    path: "/layout",
    element: <Layout />,
    children: [
      {
        path: "",
        element: <Login />
      }
    ]
  },
  {
    path: "/403",
    element: <Err404 />
  },
  {
    path: "*",
    element: <Err404 />
  }
];

// 不需要权限验证的路由加入到这里
export const NoRoleRoute = ["/login", "/404", "/403"];
