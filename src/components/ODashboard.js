import { DatePicker } from "antd";
import React, { useState } from "react";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import { Layout, Menu, theme } from "antd";
import LoginForm from "./Loginform";
import Signupform from "./Signupform";
import CNavbaar from "./CNavbaar";
import ForgotPass from "./ForgotPass";

const { Header, Sider, Content } = Layout;
export default function ODashboard({ frm, fmn }) {
  const [signInUP, setsignInUP] = useState(fmn);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  return (
    <Layout>
      <Layout className="site-layout">

        <Content
          style={{
            margin: "24px 16px",
            padding: "12% 28%",
            minHeight: 280,
            height: "100%",
            background: colorBgContainer,
          }}
        ></Content>
      </Layout>
    </Layout>
  );
}
