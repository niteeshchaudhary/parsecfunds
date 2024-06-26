import React, { useState, useEffect, useRef } from "react";
import {
  Button,
  Checkbox,
  Form,
  Input,
  InputNumber,
  Select,
  Divider,
  Modal,
  Space,
} from "antd";
import { Radio, Cascader, DatePicker, TreeSelect, Switch, Upload } from "antd";
import { PlusOutlined, UploadOutlined } from "@ant-design/icons";
import { SpinnerCircular } from "spinners-react";
import { useUserAuth } from "../context/UserAuthContext";
import { useNavigate } from "react-router-dom";
import { db } from "../firebase";
import { auth } from "../firebase";
import app from "../firebase";
import {
  getDatabase,
  push,
  ref,
  set,
  update,
  get,
  child,
} from "firebase/database";

let index = 0;

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const onFinishFailed = (errorInfo) => {
  console.log("Failed:", errorInfo);
};

const validateMessages = {
  required: "${label} is required!",
  types: {
    email: "${label} is not a valid email!",
  },
};
const options = [];
const { RangePicker } = DatePicker;
const { TextArea } = Input;

// for (let i = 10; i < 36; i++) {
//   options.push({
//     value: i.toString(36) + i,
//     label: i.toString(36) + i,
//   });
// }
const fileList = [];

export default function EventForm({ web3state, setCform }) {
  const [loadingState, setLoadingState] = useState(false);
  const [componentDisabled, setComponentDisabled] = useState(false);

  const [error, setError] = useState("");
  const { user, w3state, loadWeb3, loadBlockchain } = useUserAuth();
  const navigate = useNavigate();
  const [items, setItems] = useState(["Parsec", "Other"]);
  const [pic, setpic] = useState("");
  const [tm, settm] = useState("");
  // const [lname, setlName] = useState("");
  // const inputRef = useRef(null);
  // const addItem = (e) => {
  //   e.preventDefault();
  //   setItems([...items, lname || `Organisation ${index++}`]);
  //   setlName("");
  //   setTimeout(() => {
  //     inputRef.current?.focus();
  //   }, 0);
  // };
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

  const handleChange = (value) => {
    console.log(`selected ${value}`);
    settm(value);
    // options.push({
    //       value: value.lowerCase(),
    //       label:value,
    //     });
  };
  function pichandler(e) {
    // if (e.target.files[0]) {
    //   setpic(e.target.files[0]);
    // }
    var reader = new FileReader();
    reader.addEventListener(
      "load",
      function () {
        setpic(reader.result);
      },
      false
    );
    if (e) {
      reader.readAsDataURL(e);
    }
  }
  const handleSubmit = async (values) => {
    console.log(w3state.accounts);
    setError("");
    try {
      // console.log(/^[a-zA-Z ]*$/i.test(values.name));
      // if (!/^[a-zA-Z ]*$/i.test(values.name)) {
      //   throw new Error("Name can be alphabetic only");
      // }
      // if (values.password !== values.cpassword) {
      //   throw new Error("confirm password doesn't match with the password.");
      // }
      values["teammembers"] = tm;
      values["date"] = [
        String(values.date[0]["$d"]),
        String(values.date[1]["$d"]),
      ];
      values["image"] = pic;
      console.log(values);
      setComponentDisabled(true);

      if (w3state?.accounts) {
        w3state.events.methods
          .createEvent(values.name, new Date().getFullYear(), user.profile.name)
          .send({ from: w3state.accounts })
          .then((res) => {
            values["owner"] = {
              name: user.profile.name,
              email: user.profile.email,
            };
            values["address"] = w3state.accounts;

            set(
              ref(db, "parsec" + new Date().getFullYear() + "/" + values.name),
              values
            )
              .then((r) => {
                console.log(w3state, user.profile.name);

                console.log("____", r);
                setCform(0);

                console.log("** ", res);
              })
              .catch((e) => {
                console.log(e);
              });
          })
          .catch((e) => {
            
            countDown();
            setError(
              "Error Connecting to Metamask. Please Connect to Metamask wallet and try again."
            );
            setComponentDisabled(false);
          });
      }
    } catch (err) {
      var error = err.message.includes(":")
        ? err.message.slice(err.message.indexOf(":") + 1)
        : err.message;
      setError(error);
      setComponentDisabled(false);
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
            name={"teamsize"}
            label="Team Size"
            rules={[{ required: true, type: "number", min: 0, max: 30 }]}
          >
            <InputNumber />
          </Form.Item>
          <Form.Item
            name={"teammembers"}
            label="Team Members"
            rules={[{ message: "Please Select your Team Members!" }]}
          >
            {" "}
            <Select
              mode="tags"
              style={{ width: "100%" }}
              onChange={handleChange}
              tokenSeparators={[","]}
              options={options}
            />
          </Form.Item>

          <Form.Item
            name={"date"}
            label="Date"
            rules={[{ required: true, message: "Please Select Event Date!" }]}
          >
            <RangePicker />
          </Form.Item>
          <Form.Item name={"details"} label="Detail">
            <TextArea rows={4} />
          </Form.Item>
          <Form.Item name={"image"} label="Add Image" valuePropName={fileList}>
            <Upload
              action={(e) => {
                pichandler(e);
              }}
              listType="picture-card"
              defaultFileList={fileList}
            >
              {fileList.length > 1 ? null : (
                <div>
                  <PlusOutlined />
                  <div style={{ marginTop: 8 }}>Upload</div>
                </div>
              )}
            </Upload>
          </Form.Item>
          <Form.Item>
            <p style={{ color: "red", width: "100%", textAlign: "center" }}>
              {error}
            </p>
          </Form.Item>
          <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
            <Button type="primary" htmlType="submit">
              Add Event
            </Button>
            <Divider type="vertical" />
            <Button
              type="secondry"
              style={{ border: "0.1rem black solid" }}
              onClick={() => setCform(0)}
            >
              Back
            </Button>
          </Form.Item>
        </Form>
      )}
    </>
  );
}
