import FormUi from "@/components/FormUi";
import { Form } from "antd";
import "./login.scss";

const formList = [
  { type: "input", label: "用户名", name: "username" },
  { type: "input", label: "密码", name: "passwpd" }
];

const formLayout = {
  labelCol: { span: 8 }, // 标签占据8个网格
  wrapperCol: { span: 16 }
};

function Login() {
  const [form] = Form.useForm();
  return (
    <div className="main">
      <FormUi
        form={form}
        formList={formList}
        formLayout={formLayout}
        colSpan={24}
      />
      <h1>Login</h1>
    </div>
  );
}
export default Login;
