import { BrowserRouter, Routes } from "react-router-dom";
import Home from "@/pages/home";
import Login from "@/pages/login";
import Layout from "@/pages/layout";
import { DynamicRoutes } from "@/utils/route";
import type { IRoute } from "@/types/global";

const routes: IRoute[] = [
  {
    path: "/",
    element: <Home />,
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
  return (
    <BrowserRouter>
      <Routes>{DynamicRoutes(routes)}</Routes>
    </BrowserRouter>
  );
}
export default App;
