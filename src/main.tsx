import { createRoot } from "react-dom/client";
import "./styles/index.scss";
import App from "./App.tsx";
import { store } from "./stores";
import { Provider } from "react-redux";
/* 清除浏览器默认样式 */
import "normalize.css";

createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <App />
  </Provider>
);
