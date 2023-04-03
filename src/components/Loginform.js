import React, { useState, useEffect } from "react";
import { Button, Checkbox, Form, Input } from "antd";
import { SpinnerCircular } from "spinners-react";
import { useUserAuth } from "../context/UserAuthContext";
import { useNavigate } from "react-router-dom";

const onFinishFailed = (errorInfo) => {
  console.log("Failed:", errorInfo);
};

const validateMessages = {
  required: "${label} is required!",
  types: {
    email: "${label} is not a valid email!",
  },
};

export default function LoginForm({ actv, setactv }) {
  const [loadingState, setLoadingState] = useState(false);
  const [error, setError] = useState("");
  const { logIn } = useUserAuth();
  const navigate = useNavigate();
  const signup = () => {
    setactv(1);
  };
  const forgotpass = () => {
    setactv(2);
  };

  const handleSubmit = async (values) => {
    console.log(values);
    setError("");
    console.log(5, values.password);
    try {
      if (values.password == undefined) {
        setError("Password is required");
        return;
      } else if (values.password.length < 6) {
        setError("Password must be at least 6 characters");
        return;
      }
      await logIn(values.username, values.password).then((res) => {
        console.log(res);
        // if (!res) {
        //   throw new Error("email/pass din't match");
        // }
        setLoadingState(true);
        console.log(6);
        console.log(7);
        navigate("/dashboard");
        console.log(8);
      });
    } catch (err) {
      console.log(err.message);
      setLoadingState(false);
      if (err.message == "verify the email first")
        setError("verify the email first");
      else setError("email/pass is not Correct");
    }
  };

  return (
    <>
      {loadingState && (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            width: "100%",
            height: "100%",
            alignItems: "center",
          }}
        >
          <SpinnerCircular
            size={38}
            thickness={180}
            speed={97}
            color="rgba(57, 80, 172, 0.52)"
            secondaryColor="rgba(57, 164, 172, 1)"
          />
        </div>
      )}
      {!loadingState && (
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 600 }}
          initialValues={{ remember: true }}
          onFinish={handleSubmit}
          validateMessages={validateMessages}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="Email"
            name="username"
            rules={[
              {
                required: true,
                type: "email",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                length: 6,
              },
            ]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            name="remember"
            valuePropName="checked"
            wrapperCol={{ offset: 8, span: 16 }}
          >
            <Checkbox>Remember me</Checkbox>
          </Form.Item>
          <Form.Item>
            <p style={{ color: "red", width: "100%", textAlign: "center" }}>
              {error}
            </p>
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
              Login
            </Button>
          </Form.Item>
          Create an account
          <Button type="secondry" onClick={signup}>
            Signup
          </Button>{" "}
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <Button type="secondry" onClick={forgotpass}>
            Forgot Password
          </Button>
        </Form>
      )}
    </>
  );
}
