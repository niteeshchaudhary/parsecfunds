import React, { useEffect, useState } from "react";
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
  Modal,
  Select,
} from "antd";
import { db } from "../firebase";
import { auth } from "../firebase";
import app from "../firebase";
import {
  getDatabase,
  onValue,
  push,
  ref,
  set,
  update,
  get,
  child,
} from "firebase/database";
import { useUserAuth } from "../context/UserAuthContext";
import { useNavigate } from "react-router-dom";

const { Option } = Select;
const { Header, Sider, Content } = Layout;

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
  const { user, w3state } = useUserAuth();
  const db = getDatabase(app);
  const { wallet, setwallet } = useUserAuth(w3state.accounts);
  const [eventlist, seteventlist] = useState([]);
  const [ulist, setulist] = useState([
    {
      value: "",
      label: "",
    },
  ]);
  const [modal, contextHolder] = Modal.useModal();
  const countDown = () => {
    let secondsToGo = 5;
    window.ethereum.request({ method: "eth_requestAccounts" }).then((res) => {
      // Return the address of the wallet
      console.log(res);
    });
    const instance = modal.error({
      title: "Wallet not connected",
      content: `MetaMask is not connected.`,
    });
    const timer = setInterval(() => {
      secondsToGo -= 1;
      instance.update({
        content: `Please connect your wallet to Metamask to continue.`,
      });
    }, 1000);
    setTimeout(() => {
      clearInterval(timer);
      instance.destroy();
    }, secondsToGo * 1000);
  };
  const navigate = useNavigate();

  onValue(ref(db, "parsec" + new Date().getFullYear() + "/"), (snapshot) => {
    const data = snapshot.val();
    if (data) {
      var k = Object.keys(data).length;
      if (eventlist?.length !== k) {
        var p = Object.values(data).map((e) => {
          return {
            value: e.name,
            label: e.name,
            key: e.name,
            organiser: e?.address || "",
          };
        });
        seteventlist(p);
        console.log(p);
      }
    } else {
    }
  });

  useEffect(() => {
    console.log(ulist);
    if (w3state && ulist[0].value !== w3state.accounts) {
      setulist([
        {
          value: w3state.accounts,
          label: w3state.accounts,
        },
      ]);
    }
  }, []);

  const onFinish = async (values) => {
    if (values.wallet === undefined) {
      if (wallet === undefined) {
        values.wallet = w3state.accounts;
      } else {
        values.wallet = wallet;
      }
    }
    if (values.website === undefined) {
      values.website = "";
    }

    if (w3state) {
      // const bc_events = await w3state.funds.methods.getEvents().call();
      // const myevent = bc_events.filter((e) => e.name === values.event);
      const id = 1;
      const iitdhaccount = await w3state.funds.methods.iitdh().call();
      const amount = window.web3.utils.toWei(
        values.donation.toString(),
        "ether"
      );
      console.log("_)", amount);

      await w3state.funds.methods
        .sponsorThis(iitdhaccount, id,  amount)
        .send({ from: w3state.accounts, value: amount })
        .then((res) => {
          console.log("____", res);
          values["blockNumber"] = res.blockNumber;
          values["time"] = new Date().getTime();
          values["organiser"] = eventlist.filter(
            (e) => e.value === values.event
          )[0].organiser;
          push(ref(db, "parsec" + new Date().getFullYear() + "funds"), values)
            .then(async (r) => {
              console.log(w3state, user.profile.name);

              navigate("/dashboard");
              console.log("** ", r);
            })
            .catch((e) => {
              
              console.log(e);
            });
        })
        .catch((e) => {
          //showModal();
          countDown();
          
          console.log(e);
        });
    }
    console.log("Received values of form: ", values);
  };

  const handleChange = (value) => {
    setwallet(value);
  };
  const handleChange2 = (value) => {
    console.log(value);
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
        <Option value="ETH">ETH</Option>
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
      {contextHolder}
      <Form
        {...formItemLayout}
        form={form}
        name="register"
        onFinish={onFinish}
        initialValues={{
          residence: ["India", "Karnataka", "Dharwad"],
          prefix: "91",
          suffix: "ETH",
          wallet: w3state.accounts,
        }}
        style={{ maxWidth: 600 }}
        scrollToFirstError
      >
        <Form.Item name="wallet" label="wallet address">
          <Select
            defaultValue={w3state.accounts}
            onChange={handleChange}
            options={ulist}
          />
        </Form.Item>
        <Form.Item
          name="event"
          label="Select Event"
          rules={[{ required: true, message: "Please Select Events!" }]}
        >
          <Select onChange={handleChange2} options={eventlist} />
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
          rules={[{ message: "Please input website!" }]}
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
          name="note"
          label="Note"
          rules={[{ required: true, message: "Please input Note" }]}
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
            I have read the <a href="#">agreement</a>
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
