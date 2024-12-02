import { Route, Navigate } from "react-router-dom";
import storage from "@/utils/storage";
import { useSelector } from "react-redux";
import { RootState } from "@/stores";
import { deepTree } from "@/utils";

const Login = lazy(() => import("@/pages/login"));
const DynamicRoutes = (routes: any[]) => {
  const { menus } = useSelector((state: RootState) => state.user);
  const data = deepTree(menus);
  console.log("==data", data);

  const PrivateRoute = (ele: JSX.Element, isAuthenticated: boolean) => {
    if (!isAuthenticated) {
      window.history.pushState({}, "", "/login");
      return <Login />;
    } else return ele;
  };

  return routes.map((route, index) => (
    <Route
      key={index}
      path={route.path}
      element={PrivateRoute(route.element, !!storage.get("token"))}
    >
      {route.children && route.children.length > 0
        ? DynamicRoutes(route.children)
        : null}
    </Route>
  ));
};
export { DynamicRoutes };
