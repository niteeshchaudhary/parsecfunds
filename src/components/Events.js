import { DatePicker } from "antd";
import React, { useEffect, useState } from "react";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import { Layout, Menu, theme, Typography } from "antd";
import LoginForm from "./Loginform";
import Signupform from "./Signupform";
import CNavbaar from "./CNavbaar";
import CNavbaar2 from "./CNavbaar2";
import ForgotPass from "./ForgotPass";
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
import { Card, Select } from "antd";
import { reload } from "firebase/auth";
import EventDetails from "./EventDetails";
const { Text, Link } = Typography;

const { Meta } = Card;

const { Header, Sider, Content } = Layout;
export default function Events({ userprofile, frm, fmn }) {
  const [eventd, seteventd] = useState(true);
  const [eventdetails, seteventdetails] = useState({
    name: "",
    details: "",
    date: [0, 0],
    image: "",
  });
  const [year, setyear] = useState(new Date().getFullYear());
  const db = getDatabase(app);
  const [events, setevents] = useState([]);
  const [len, lastlen] = useState(0);

  onValue(ref(db, "parsec" + year + "/"), (snapshot) => {
    const data = snapshot.val();
    if (data) {
      var k = Object.keys(data).length;
      if (len !== k) {
        lastlen(k);
        setevents(Object.values(data));
        console.log(Object.values(data));
      }
    } else {
      if (len !== 0) {
        setevents([]);
        lastlen(0);
      }
    }
  });

  const handleChange = (value) => {
    setyear(value.slice(6, 10));
  };
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  return (
    <Layout>
      <Layout className="site-layout">
        {userprofile ? <CNavbaar2 userprofile={userprofile} /> : <CNavbaar />}
        {eventd ? (
          <>
            <Select
              defaultValue="parsec2023"
              style={{ width: 120 }}
              onChange={handleChange}
              options={[
                { value: "parsec2023", label: "Parsec 2023" },
                { value: "parsec2022", label: "Parsec 2022" },
                { value: "parsec2021", label: "Parsec 2021" },
                { value: "parsec2020", label: "Parsec 2020" },
              ]}
            />
            <Content
              style={{
                margin: "24px 16px",
                padding: "3% 28%",
                minHeight: 780,
                height: "100%",
                background: colorBgContainer,
              }}
            >
              <h1>Events:</h1>
              <div style={{ display: "flex", flexWrap: "wrap" }}>
                {events.map((event) => {
                  return (
                    <Card
                      hoverable
                      style={{ width: 240 }}
                      cover={<img alt="example" src={event.image} />}
                      onClick={() => {
                        seteventdetails(event);
                        seteventd(false);
                      }}
                    >
                      {event.date[0].slice(7, 15) +
                        "-" +
                        event.date[1].slice(7, 15)}
                      <br />
                      &nbsp;
                      <Meta title={event.name} description={event.details} />
                    </Card>
                  );
                })}
              </div>
            </Content>
          </>
        ) : (
          <Content
            style={{
              margin: "24px 16px",
              padding: "3% 28%",
              minHeight: 780,
              height: "100%",
              background: colorBgContainer,
            }}
          >
            <p
              style={{
                fontSize: "2rem",
                fontWeight: "500",
                marginBottom: "1.5rem",
              }}
            >
              {eventdetails?.name}
            </p>
            <EventDetails edata={eventdetails} setactv={seteventd} userprofile={userprofile} />
          </Content>
        )}
        ;
      </Layout>
    </Layout>
  );
}
