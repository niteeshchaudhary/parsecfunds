import React, { useEffect, useState } from "react";

import { Layout, Menu, theme } from "antd";

import { Card, Col, Row, Button } from "antd";
import EventForm from "./EventForm";
import ShowFundsParsec from "./ShowFundsParsec";
import { useUserAuth } from "../context/UserAuthContext";
import { useNavigate } from "react-router-dom";
import ShowFundsAdmin from "./ShowFundsAdmin";

const { Header, Sider, Content } = Layout;

export default function ADashboard({ funfrm, fmn }) {
  const [cform, setCform] = useState(funfrm);
  const [wholder, setwholder] = useState("");
  const { user, loadWeb3, loadBlockchain, w3state } = useUserAuth();

  const {
    token: { colorBgContainer },
  } = theme.useToken();
  useEffect(() => {
    loadWeb3();
    const hldr = loadBlockchain();
    if (wholder === "") {
      setwholder(hldr);
    }
  }, [user, loadWeb3, loadBlockchain, wholder]);
  return (
    <Layout>
      <Layout className="site-layout">
        <Content
          style={{
            margin: "24px 16px",
            padding: "3% 1%",
            minHeight: 580,
            height: "100%",
            background: colorBgContainer,
          }}
        >
          <ShowFundsAdmin />
        </Content>
      </Layout>
    </Layout>
  );
}

// <Layout>
//   <Header>header</Header>
//   <Layout>
//     <Sider>left sidebar</Sider>
//     <Content>main content</Content>
//     <Sider>right sidebar</Sider>
//   </Layout>
//   <Footer>footer</Footer>
// </Layout>
