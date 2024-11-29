import { HashRouter, Route, Routes } from "react-router-dom";
import Home from "@/pages/home";
import Login from "@/pages/login";
function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </HashRouter>
  );
}
export default App;
