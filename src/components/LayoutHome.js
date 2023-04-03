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
export default function Layout1({ frm }) {
  const [signInUP, setsignInUP] = useState(0);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  return (
    <Layout>
      <Layout className="site-layout">
        <CNavbaar />
        <Content
          style={{
            margin: "24px 16px",
            padding: "12% 28%",
            minHeight: 280,
            height: "100%",
            background: colorBgContainer,
          }}
        >
          {frm === 1 && signInUP === 0 ? (
            <LoginForm actv={signInUP} setactv={setsignInUP} />
          ) : frm === 1 && signInUP === 1 ? (
            <Signupform actv={signInUP} setactv={setsignInUP} />
          ) : frm === 1 && signInUP === 2 ? (
            <ForgotPass actv={signInUP} setactv={setsignInUP} />
          ) : (
            <></>
          )}
        </Content>
      </Layout>
    </Layout>
  );
}


