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
      status="403"
      title="403"
      subTitle="Sorry, you are not authorized to access this page."
      extra={
        <Button type="primary" onClick={goHome}>
          Back Home
        </Button>
      }
    />
  );
};

export default App;
