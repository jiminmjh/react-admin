import { Route } from "react-router-dom";
import type { IRoute } from "@/types/global";

const DynamicRoutes = (routes: IRoute[]) => {
  return routes.map((route) => (
    <Route path={route.path} element={route.element}>
      {route.children && route.children.length > 0
        ? DynamicRoutes(route?.children)
        : null}
    </Route>
  ));
};

export { DynamicRoutes };
