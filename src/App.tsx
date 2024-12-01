import { BrowserRouter, Routes } from "react-router-dom";
import { DynamicRoutes } from "@/utils/route";
import Home from "@/pages/home";
import Login from "@/pages/login";
import Layout from "@/pages/layout";

const routes: IRoute[] = [
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/layout1",
    element: <Layout />,
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
