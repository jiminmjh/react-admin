import FormUi from "@/components/FormUi";
import { FormInstance } from "antd";
import "./login.scss";

type IFormProp = {
  form: FormInstance<{
    username: string;
    passwpd: string;
  }>;
};

const formList = [
  { type: "input", label: "用户名", name: "username" },
  { type: "input", label: "密码", name: "passwpd" }
];

const formLayout = {
  labelCol: { span: 8 }, // 标签占据8个网格
  wrapperCol: { span: 16 }
};

const LoginForm: React.FC<IFormProp> = ({ form }) => {
  return (
    <div className="main">
      <FormUi
        form={form}
        formList={formList}
        formLayout={formLayout}
        colSpan={24}
      />
      <h1>LoginForm</h1>
    </div>
  );
};
export default LoginForm;
