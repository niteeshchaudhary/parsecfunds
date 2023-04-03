import React, { useState } from "react";

import { Layout, Menu, theme } from "antd";

import { Card, Col, Row } from "antd";
import EventForm from "./EventForm";

const { Header, Sider, Content } = Layout;

export default function PDashboard({ frm, fmn }) {
  const [cform, setCform] = useState(0);

  const {
    token: { colorBgContainer },
  } = theme.useToken();
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
                  style={{ cursor: "pointer" }}
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
                  style={{ cursor: "pointer" }}
                >
                  Add Funds to be Raised
                  <br />
                  &nbsp;
                </Card>
              </Col>
              <Col span={8}>
                <Card
                  hoverable
                  title="See Details"
                  bordered={false}
                  style={{ cursor: "pointer" }}
                >
                  See Details of Events and Funds
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
              <EventForm />
            </Content>
          </>
        ) : cform === 2 ? (
          <Content></Content>
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
