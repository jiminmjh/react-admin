import { Form } from "antd";
import "./login.scss";
import LoginForm from "./components/LoginForm";

function Login() {
  const [form] = Form.useForm();
  return (
    <div className="main">
      <LoginForm form={form} />
      <h1>Login</h1>
    </div>
  );
}
export default Login;
