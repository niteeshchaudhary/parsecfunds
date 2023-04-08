import React, { useState, useRef } from "react";
import { Button, Form, Input, InputNumber } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { Divider, Select, Space } from "antd";
import { SpinnerDotted } from "spinners-react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useUserAuth } from "../context/UserAuthContext";
import app from "../firebase";

let index = 0;

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

/* eslint-disable no-template-curly-in-string */
const validateMessages = {
  required: "${label} is required!",
  types: {
    email: "${label} is not a valid email!",
    number: "${label} is not a valid number!",
  },
  number: {
    range: "${label} must be between ${min} and ${max}",
  },
};
/* eslint-enable no-template-curly-in-string */

const Signupform = ({ actv, setactv }) => {
  const [componentDisabled, setComponentDisabled] = useState(false);

  const [loadingState, setLoadingState] = useState(false);
  const [error, setError] = useState("");
  const { signUp } = useUserAuth();
  let navigate = useNavigate();

  const [items, setItems] = useState(["Parsec", "Other"]);
  const [lname, setlName] = useState("");
  const inputRef = useRef(null);

  const addItem = (e) => {
    e.preventDefault();
    if (lname === "Admin") {
      alert("Admin is not allowed as an organisation name");
      return;
    }
    setItems([...items, lname || `Organisation ${index++}`]);
    setlName("");
    setTimeout(() => {
      inputRef.current?.focus();
    }, 0);
  };

  const handleSubmit = async (values) => {
    console.log(values);
    setError("");
    try {
      console.log(/^[a-zA-Z ]*$/i.test(values.name));
      if (!/^[a-zA-Z ]*$/i.test(values.name)) {
        throw new Error("Name can be alphabetic only");
      }
      if (values.password !== values.cpassword) {
        throw new Error("confirm password doesn't match with the password.");
      }
      setComponentDisabled(true);
      await signUp(values);
      navigate("/dashboard");
    } catch (err) {
      var error = err.message.includes(":")
        ? err.message.slice(err.message.indexOf(":") + 1)
        : err.message;
      setError(error);
      setComponentDisabled(false);
    }
  };

  const signin = () => {
    setactv(0);
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
          <SpinnerDotted />
        </div>
      )}
      {!loadingState && (
        <Form
          {...layout}
          name="nest-messages"
          disabled={componentDisabled}
          onFinish={handleSubmit}
          style={{ maxWidth: 600 }}
          validateMessages={validateMessages}
        >
          <Form.Item name={"name"} label="Name" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item
            name={"email"}
            label="Email"
            rules={[{ type: "email" }, { required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            label="Confirm Password"
            name="cpassword"
            dependencies={["password"]}
            hasFeedback
            rules={[
              { required: true, message: "Please re enter your password!" },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error(
                      "The two passwords that you entered do not match!"
                    )
                  );
                },
              }),
            ]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            name={"age"}
            label="Age"
            rules={[{ required: true, type: "number", min: 0, max: 99 }]}
          >
            <InputNumber />
          </Form.Item>
          <Form.Item
            name={"organisation"}
            label="organisation"
            rules={[
              { required: true, message: "Please Select your Organisation!" },
            ]}
          >
            <Select
              style={{ width: 300 }}
              placeholder="custom dropdown render"
              dropdownRender={(menu) => (
                <>
                  {menu}
                  <Divider style={{ margin: "8px 0" }} />
                  <Space style={{ padding: "0 8px 4px" }}>
                    <Input
                      placeholder="Select your Organisation"
                      ref={inputRef}
                      value={lname}
                      onChange={(e) => {
                        setlName(e.currentTarget.value);
                      }}
                    />
                    <Button
                      type="text"
                      icon={<PlusOutlined />}
                      onClick={addItem}
                    >
                      Add Organisation
                    </Button>
                  </Space>
                </>
              )}
              options={items.map((item) => ({ label: item, value: item }))}
            />
          </Form.Item>
          <Form.Item>
            <p style={{ color: "red", width: "100%", textAlign: "center" }}>
              {error}
            </p>
          </Form.Item>
          <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
            <Button type="primary" htmlType="submit">
              Signup
            </Button>
          </Form.Item>
          Already account
          <Button type="secondry" onClick={signin}>
            SignIn
          </Button>{" "}
        </Form>
      )}
    </>
  );
};
export default Signupform;
