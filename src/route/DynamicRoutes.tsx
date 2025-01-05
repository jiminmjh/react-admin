import React from 'react'
import { Route, Routes, Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { RootState } from '@/stores'
import { routes, NoRoleRoute } from './index'
import storage from '@/utils/storage'

const PrivateRoute = React.memo(({ path, element }: { path: string; element: JSX.Element }) => {
  // 如果是无需权限的路由，直接渲染
  if (NoRoleRoute.includes(path) && path !== '/') {
    return element
  }
  const { menus } = useSelector((state: RootState) => state.user)
  let userRoles = menus
    .map(e => {
      if (e.type != 2) return e.router
    })
    .filter(e => e)
  // 未登录跳转到登录页
  const isAuthenticated = !!storage.get('token')
  if (!isAuthenticated) return <Navigate to="/login" />
  // 权限校验
  if (path == '/') return element
  if (![...NoRoleRoute, ...userRoles].includes(path)) return <Navigate to="/403" />
  return element
})

const DynamicRoutes = () => {
  const renderRoutes = (routes: any[]) =>
    routes.map((route, index) => (
      <Route key={index} path={route.path} element={<PrivateRoute path={route.path} element={route.element} />}>
        {/*递归多层子路由*/}
        {route.children && renderRoutes(route.children)}
      </Route>
    ))

  return <Routes>{renderRoutes(routes)}</Routes>
}

export default React.memo(DynamicRoutes)
