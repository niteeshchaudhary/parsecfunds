import React from "react";
import { useNavigate } from "react-router-dom";

export default function NotificationEle(props) {
  const navigate = useNavigate();
  const bgcolor = props.status === "new" ? "#eee" : "#fff";
  function goto() {
    navigate(props?.link);
    //setOld()
  }
  return (
    <>
      {props?.link && (
        <div
          onClick={goto}
          style={{
            backgroundColor: bgcolor,
            cursor: "pointer",
            display: "flex",
            gap: "1rem",
            margin: "0.3em 0",
            padding: "0.5rem",
            borderRadius: "0.6rem",
          }}
        >
          {props?.image && (
            <div>
              <img src={props?.image} style={{ width: "2rem" }} />
            </div>
          )}
          <div style={{ display: "flex", flexDirection: "column" }}>
            <h6 style={{ fontWeight: "600" }}>{props?.title}</h6>
            <p style={{ fontSize: "0.8rem" }}>{props?.details}</p>
          </div>
        </div>
      )}
      {!props?.link && (
        <div
          style={{
            display: "flex",
            gap: "1rem",
            margin: "0.2em 0",
            borderRadius: "0.6rem",
            padding: "0.5rem",
            backgroundColor: bgcolor,
          }}
        >
          {props?.image && (
            <div>
              <img src={props?.image} style={{ width: "2rem" }} />
            </div>
          )}
          <div style={{ display: "flex", flexDirection: "column" }}>
            <h6 style={{ fontWeight: "600" }}>{props?.title}</h6>
            <p style={{ fontSize: "0.8rem" }}>{props?.details}</p>
          </div>
        </div>
      )}
    </>
  );
}
