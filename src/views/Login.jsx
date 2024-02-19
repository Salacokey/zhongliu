import { Button, Form, Input, Checkbox, Row, Col } from "antd";
import { useState, useRef, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import Captcha from "react-captcha-code";
// import { UserOutlined } from "@ant-design/icons";
import { Icon } from "@iconify/react";
import { postLogin, getUserInfo, getRoutes, getCaptchaImage } from "@/service";
function Login() {
  const navigate = useNavigate();
  const [check_flag, set_check_flag] = useState(
    localStorage.getItem("pwd_val") !== "undefined" &&
      localStorage.getItem("pwd_val") != null
  );
  const [psd_value, set_psd_value] = useState(
    check_flag ? localStorage.getItem("pwd_val") : ""
  );

  //   console.log(localStorage.getItem("pwd_val"));
  useEffect(() => {
    // console.log(psd_inp.current);
    // psd_inp.current.value = psd_value;
    if (check_flag) {
      console.log(psd_value);
      localStorage.setItem("pwd_val", psd_value);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [check_flag, psd_value]);
  const psd_inp = useRef();
  //   psd_value = localStorage.getItem("doc_tocken");
  const [code, setCode] = useState("");
  const handleChange = useCallback((captcha) => {
    console.log("captcha", captcha);
    setCode(captcha);
  }, []);
  const captchaRef = useRef(null);
  const handleClick = () => {
    captchaRef.current.refresh();
  };
  const onFinish = (values) => {
    console.log("Success:", values);
    if (code === values.code) {
      postLogin(values)
        .then((res) => {
          // console.log(res);
          if (res.data.data) {
            localStorage.setItem("doc_tocken", res.data.data);
            getUserInfo()
              .then((res) => {
                console.log(res);
                navigate("/layout");
              })
              .catch((err) => {
                console.log(err);
              });
            getRoutes()
              .then((res) => {
                localStorage.setItem("auth", JSON.stringify(res.data.data));
                console.log(res);
              })
              .catch((err) => console.log(err));
          }
        })
        .catch((err) => console.log(err));
    } else {
      window.alert("验证码输入错误");
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  const check__change = () => {
    if (check_flag) {
      localStorage.setItem("pwd_val", undefined);
    } else {
      localStorage.setItem("pwd_val", psd_value);
    }
    set_check_flag(!check_flag);
  };
  // const getCaptcha = () => {
  //   getCaptchaImage()
  //     .then((res) => console.log(res))
  //     .catch((err) => console.log(err));
  // };
  return (
    <div
      className=" bg-gray-200 h-[100vh] relative "
      style={{
        backgroundImage: `url("https://pe.xzzl120.com/admin/static/img/bg.3d9a89e4.jpg")`,
        backgroundSize: "cover",
      }}
    >
      <div className=" absolute bg-white  rounded-md left-[50%] p-[20px] top-[50%] translate-x-[-50%] w-[350px] h-[350px] translate-y-[-50%]">
        <h2 className="text-center text-gray-400 mb-[20px]">
          {" "}
          西藏阜康肿瘤医院 管理系统
        </h2>
        <Form
          name="basic"
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label=""
            name="username"
            rules={[
              {
                required: true,
                message: "请输入你的用户名",
              },
            ]}
          >
            <Input
              size="large"
              placeholder="用户名"
              prefix={
                <Icon icon="icon-park-solid:people" className="text-gray-400" />
              }
            />
          </Form.Item>
          <Form.Item
            label=""
            name="password"
            rules={[
              {
                required: true,
                message: "请输入你的密码",
              },
            ]}
          >
            <Input.Password
              ref={psd_inp}
              value={psd_value}
              placeholder="密码"
              onChange={(e) => {
                set_psd_value(e.target.value);

                // console.log(e.target.value);
              }}
              prefix={
                <Icon icon="solar:lock-outline" className="text-gray-400" />
              }
            />
          </Form.Item>
          <Form.Item>
            <Row gutter={8}>
              <Col span={12}>
                <Form.Item
                  name="code"
                  noStyle
                  rules={[
                    {
                      required: true,
                      message: "请输入验证码",
                    },
                  ]}
                >
                  <Input
                    placeholder="验证码"
                    prefix={<Icon icon="iconamoon:shield-yes-light" />}
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Captcha
                  ref={captchaRef}
                  fontSize={30}
                  charNum={4}
                  onChange={handleChange}
                  onClick={handleClick}
                />
              </Col>
            </Row>
          </Form.Item>
          <div>
            <Checkbox checked={check_flag} onChange={() => check__change()}>
              记住密码
            </Checkbox>
          </div>
          <div className="flex justify-center">
            <Button type="primary" danger htmlType="submit">
              登录
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
}

export default Login;
