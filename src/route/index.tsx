// 动态加载组件
const Home = lazy(() => import('@/pages/home/index'))
const Login = lazy(() => import('@/pages/login'))
const Layout = lazy(() => import('@/pages/layout'))
const Person = lazy(() => import('@/pages/home/sys/person'))
const User = lazy(() => import('@/pages/home/sys/user'))
const Menu = lazy(() => import('@/pages/home/sys/menu'))
const Role = lazy(() => import('@/pages/home/sys/role'))
const Err403 = lazy(() => import('@/pages/error/403'))
const Err404 = lazy(() => import('@/pages/error/404'))

export const routes: IRoute[] = [
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '/', //默认主页
        element: <Home />
      },
      {
        path: '/sys/person',//个人中心
        element: <Person />
      },
      {
        path: '/sys/user', //用户列表
        element: <User />
      },
      {
        path: '/sys/menu', //菜单列表
        element: <Menu />
      },
      {
        path: '/sys/role', //角色列表
        element: <Role />
      }
    ]
  },
  {
    path: '/403',
    element: <Err403 />
  },
  {
    path: '*',
    element: <Err404 />
  }
]

// 不需要权限验证的路由加入到这里
export const NoRoleRoute = ['/login', '/404', '/403', '/', '/sys/person']
