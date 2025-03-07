import React from "react";
import { Button, Result } from "antd";
import { useNavigate } from "react-router-dom";

const App: React.FC = () => {
  const navigate = useNavigate();
  const goHome = () => {
    //todo 后期优化根据用户是否有home页面权限进行跳转
    navigate("/login");
  };

  return (
    <Result
      status="404"
      title="404"
      subTitle="Sorry, the page you visited does not exist."
      extra={
        <Button type="primary" onClick={goHome}>
          Back Home
        </Button>
      }
    />
  );
};

export default App;
