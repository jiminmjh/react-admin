import { Form, Button } from "antd";
import "./login.scss";
import LoginForm from "./components/LoginForm";

function Login() {
  const [form] = Form.useForm();
  return (
    <div className="main">
      <h1 style={{ textAlign: "center" }}>Login</h1>
      <LoginForm form={form} />
      <div className="button-group">
        <Button className="submit" type="primary">
          登陆
        </Button>
      </div>
    </div>
  );
}
export default Login;
