import { Suspense } from "react";
import { BrowserRouter } from "react-router-dom";
import DynamicRoutes from "@/route/DynamicRoutes";

// 加载组件
const Loading = () => <div>Loading...</div>;
const Loading2 = () => <div>Loading222</div>;

function App() {
  return (
    <BrowserRouter>
      <Suspense
        fallback={window.location.pathname === "/" ? <Loading /> : <Loading2 />}
      >
        <DynamicRoutes />
      </Suspense>
    </BrowserRouter>
  );
}
export default App;
