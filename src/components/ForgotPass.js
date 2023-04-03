import React, { useState } from "react";
import { Button, Checkbox, Form, Input } from "antd";
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
export default function ForgotPass({ actv, setactv }) {
  const [error, setError] = useState("");
  const { reset } = useUserAuth();
  let navigate = useNavigate();

  const onFinish = async (values) => {
    setError("");
    try {
      await reset(values.email);
      navigate("/login");
    } catch (err) {
      console.log(err.message);
      setError(err.message);
    }
  };

  const signup = () => {
    setactv(1);
  };
  const signin = () => {
    setactv(0);
  };
  return (
    <Form
      name="basic"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      style={{ maxWidth: 600, height: 600 }}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item
        label="Email"
        name="email"
        rules={[
          {
            required: true,
            type: "email",
            message: "Please input your email!",
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item>
        <p style={{ color: "red", width: "100%", textAlign: "center" }}>
          {error}
        </p>
      </Form.Item>
      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit">
          Send Email
        </Button>
      </Form.Item>
      Create an account
      <Button type="secondry" onClick={signup}>
        Signup
      </Button>{" "}
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Back to Login
      <Button type="secondry" onClick={signin}>
        Signin
      </Button>{" "}
    </Form>
  );
}
