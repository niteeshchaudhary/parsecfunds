import React, { useEffect, useState } from "react";

import { Layout, Menu, theme } from "antd";

import { Card, Col, Row, Button } from "antd";
import EventForm from "./EventForm";
import ShowFundsParsec from "./ShowFundsParsec";
import { useUserAuth } from "../context/UserAuthContext";
import { useNavigate } from "react-router-dom";

const { Header, Sider, Content } = Layout;

export default function PDashboard({ funfrm, fmn }) {
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
        {cform === 0 ? (
          <Content
            style={{
              margin: "24px 16px",
              padding: "16% 28%",
              minHeight: 580,
              height: "100%",
              background: colorBgContainer,
            }}
          >
            <Row gutter={16}>
              <Col span={8}>
                <Card
                  hoverable
                  title="Add Event"
                  bordered={false}
                  style={{ cursor: "pointer", minHeight: "2rem" }}
                  onClick={() => {
                    setCform(1);
                  }}
                >
                  Add Events to be Organised
                  <br />
                  &nbsp;
                </Card>
              </Col>
              <Col span={8}>
                <Card
                  hoverable
                  title="Funds"
                  bordered={false}
                  style={{ cursor: "pointer", minHeight: "2rem" }}
                  onClick={() => {
                    setCform(2);
                  }}
                >
                  see Funds Raised
                  <br />
                  &nbsp;
                </Card>
              </Col>
            </Row>
          </Content>
        ) : cform === 1 ? (
          <>
            <h1>Parsec {new Date().getFullYear()}</h1>
            <Content
              style={{
                margin: "20px 16px",
                padding: "1% 28%",
                minHeight: 580,
                height: "100%",
                background: colorBgContainer,
              }}
            >
              <h1>Add Event</h1>
              <EventForm web3state={w3state} setCform={setCform} />
            </Content>
          </>
        ) : cform === 2 ? (
          <>
            <ShowFundsParsec web3state={w3state} />
            <Button type="primary" onClick={() => setCform(0)}>
              Back
            </Button>
          </>
        ) : (
          <Content></Content>
        )}
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
