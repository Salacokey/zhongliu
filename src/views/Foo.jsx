import { useNavigate } from "react-router-dom";
import { Button } from "antd";
// useNavigate 是react-router-dom提供的hook
// 此hook可以返回一个跳转页面的方法
export default function Foo() {
  const navigate = useNavigate();
  return (
    <div>
      <Button type="primary" danger onClick={() => navigate("/index")}>
        to Index
      </Button>
      <Button type="info" danger onClick={() => navigate("/bar/123")}>
        to Bar
      </Button>
    </div>
  );
}
