import React, { useState } from "react";
import {
  AutoComplete,
  Button,
  Cascader,
  Checkbox,
  Col,
  Form,
  Input,
  InputNumber,
  Layout,
  Row,
  Select,
} from "antd";

const { Option } = Select;
const { Header, Sider, Content } = Layout;
interface DataNodeType {
  value: string;
  label: string;
  children?: DataNodeType[];
}

const residences = [
  {
    value: "India",
    label: "India",
    children: [
      {
        value: "Karnataka",
        label: "Karnataka",
        children: [
          {
            value: "Dharwad",
            label: "Dharwad",
          },
        ],
      },
      {
        value: "Rajasthan",
        label: "Rajasthan",
        children: [
          {
            value: "Jaipur",
            label: "Jaipur",
          },
        ],
      },
    ],
  },
  {
    value: "USA",
    label: "USA",
    children: [
      {
        value: "California",
        label: "California",
        children: [
          {
            value: "San Francisco",
            label: "San Francisco",
          },
        ],
      },
    ],
  },
];

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};

const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};

export default function FundForm() {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    console.log("Received values of form: ", values);
  };

  const prefixSelector = (
    <Form.Item name="prefix" noStyle>
      <Select style={{ width: 70 }}>
        <Option value="+91">+91</Option>
        <Option value="+1">+1</Option>
      </Select>
    </Form.Item>
  );

  const suffixSelector = (
    <Form.Item name="suffix" noStyle>
      <Select style={{ width: 70 }}>
        <Option value="USD">$</Option>
        <Option value="RUP">₹</Option>
      </Select>
    </Form.Item>
  );

  const [autoCompleteResult, setAutoCompleteResult] = useState([]);

  const onWebsiteChange = (value) => {
    if (!value) {
      setAutoCompleteResult([]);
    } else {
      setAutoCompleteResult(
        [".com", ".org", ".net"].map((domain) => `${value}${domain}`)
      );
    }
  };

  const websiteOptions = autoCompleteResult.map((website) => ({
    label: website,
    value: website,
  }));

  return (
    <Content
      style={{
        margin: "24px 16px",
        padding: "3% 28%",
        minHeight: 280,
        height: "100%",
      }}
    >
      <Form
        {...formItemLayout}
        form={form}
        name="register"
        onFinish={onFinish}
        initialValues={{
          residence: ["India", "Karnataka", "Dharwad"],
          prefix: "91",
        }}
        style={{ maxWidth: 600 }}
        scrollToFirstError
      >
        <Form.Item
          name="wallet"
          label="wallet address"
          rules={[
            {
              type: "email",
              message: "The input is not valid E-mail!",
            },
            {
              required: true,
              message: "Please input your E-mail!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="password"
          label="Key"
          rules={[
            {
              required: true,
              message: "Please input your wallet Key!",
            },
          ]}
          hasFeedback
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          name="sendername"
          label="Your Name"
          rules={[
            {
              required: true,
              message: "Please input your name as sender!",
              whitespace: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="gender"
          label="Gender"
          rules={[{ required: true, message: "Please select gender!" }]}
        >
          <Select placeholder="select your gender">
            <Option value="male">Male</Option>
            <Option value="female">Female</Option>
            <Option value="other">Other</Option>
          </Select>
        </Form.Item>

        <Form.Item
          name="residence"
          label="Habitual Residence"
          rules={[
            {
              type: "array",
              required: true,
              message: "Please select your habitual residence!",
            },
          ]}
        >
          <Cascader options={residences} />
        </Form.Item>

        <Form.Item
          name="phone"
          label="Phone Number"
          rules={[
            { required: true, message: "Please input your phone number!" },
          ]}
        >
          <Input addonBefore={prefixSelector} style={{ width: "100%" }} />
        </Form.Item>

        <Form.Item
          name="donation"
          label="Donation"
          rules={[{ required: true, message: "Please input donation amount!" }]}
        >
          <InputNumber addonAfter={suffixSelector} style={{ width: "100%" }} />
        </Form.Item>

        <Form.Item
          name="website"
          label="Website"
          rules={[{ required: true, message: "Please input website!" }]}
        >
          <AutoComplete
            options={websiteOptions}
            onChange={onWebsiteChange}
            placeholder="website"
          >
            <Input />
          </AutoComplete>
        </Form.Item>

        <Form.Item
          name="intro"
          label="Intro"
          rules={[{ required: true, message: "Please input Intro" }]}
        >
          <Input.TextArea showCount maxLength={100} />
        </Form.Item>

        <Form.Item
          name="agreement"
          valuePropName="checked"
          rules={[
            {
              validator: (_, value) =>
                value
                  ? Promise.resolve()
                  : Promise.reject(new Error("Should accept agreement")),
            },
          ]}
          {...tailFormItemLayout}
        >
          <Checkbox>
            I have read the <a href="">agreement</a>
          </Checkbox>
        </Form.Item>
        <Form.Item {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit">
            Send Money
          </Button>
        </Form.Item>
      </Form>
    </Content>
  );
}
