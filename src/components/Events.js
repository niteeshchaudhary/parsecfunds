import { DatePicker } from "antd";
import React, { useEffect, useState } from "react";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import { SpinnerCircular } from "spinners-react";
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
import { useNavigate } from "react-router-dom";
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
  const navigate = useNavigate();
  const [year, setyear] = useState(new Date().getFullYear());
  const db = getDatabase(app);
  const [events, setevents] = useState([]);
  const [len, lastlen] = useState(0);

  onValue(ref(db, "parsec" + year + "/"), (snapshot) => {
    const data = snapshot.val();
    if (data) {
      var k = Object.keys(data).length;
      if (events.length !== k || events[0]?.name === "No Events Found") {
        setevents(Object.values(data));
      }
    } else {
      if (events.length === 0 || events[0]?.name !== "No Events Found") {
        setevents([
          {
            name: "No Events Found",
            details: "",
            date: ["..................", "......................"],
            image: "",
          },
        ]);
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
                padding: "3% 3%",
                minHeight: 780,
                height: "100%",
                background: colorBgContainer,
              }}
            >
              {" "}
              {events.length > 0 ? (
                <>
                  <h1>Events:</h1>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      width: "100%",
                      flexWrap: "wrap",
                    }}
                  >
                    {events.map((event, index) => {
                      return (
                        <Card
                          hoverable
                          key={index}
                          style={{ width: 240, margin: "1rem" }}
                          cover={
                            event.image && <img alt="" src={event.image} />
                          }
                          onClick={() => {
                            if (event.name === "No Events Found") {
                              navigate("/events");
                            } else {
                              seteventdetails(event);
                              seteventd(false);
                            }
                          }}
                        >
                          {event.date[0].slice(7, 15) +
                            "-" +
                            event.date[1].slice(7, 15)}
                          <br />
                          &nbsp;
                          <Meta
                            title={event.name}
                            description={event.details}
                          />
                        </Card>
                      );
                    })}
                  </div>
                </>
              ) : (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    height: "10vh",
                    width: "100%",
                    alignItems: "center",
                  }}
                >
                  {" "}
                  <SpinnerCircular
                    size={38}
                    thickness={180}
                    speed={97}
                    color="rgba(57, 80, 172, 0.52)"
                    secondaryColor="rgba(57, 164, 172, 1)"
                  />
                </div>
              )}
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
            <EventDetails
              edata={eventdetails}
              setactv={seteventd}
              userprofile={userprofile}
            />
          </Content>
        )}
      </Layout>
    </Layout>
  );
}
