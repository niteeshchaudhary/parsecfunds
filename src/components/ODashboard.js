import React, { useEffect, useState } from "react";

import { Layout, Menu, theme } from "antd";

import { Button, Card, Col, Row } from "antd";
import EventForm from "./EventForm";
import ShowFunds from "./ShowFunds";
import { useUserAuth } from "../context/UserAuthContext";
import { useNavigate } from "react-router-dom";

const { Header, Sider, Content } = Layout;

export default function PDashboard({ funfrm, fmn }) {
  const [cform, setCform] = useState(funfrm);
  const [wholder, setwholder] = useState("");
  const { user, loadWeb3, loadBlockchain, w3state } = useUserAuth();
  const navigate = useNavigate();
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
                  title="View Events"
                  bordered={false}
                  style={{ cursor: "pointer", minHeight: "2rem" }}
                  onClick={() => {
                    navigate("/events");
                  }}
                >
                  View Available Events
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
                    loadBlockchain().then((res) => {
                      navigate("/sponsor");
                    });
                  }}
                >
                  Sponsor Event
                  <br />
                  &nbsp;
                </Card>
              </Col>
              <Col span={8}>
                <Card
                  hoverable
                  title="See Details"
                  bordered={false}
                  style={{ cursor: "pointer", minHeight: "2rem" }}
                  onClick={() => {
                    loadBlockchain().then((res) => {
                      setCform(2);
                    });
                  }}
                >
                  See Details of Funds
                  <br />
                  &nbsp;
                </Card>
              </Col>
            </Row>
          </Content>
        ) : cform === 2 ? (
          <>
            <ShowFunds w3state={w3state} />
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
