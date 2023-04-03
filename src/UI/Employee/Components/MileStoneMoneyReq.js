import React, { useState } from "react";
import dollar from "../../../imges/dollar.svg";
import app, { db } from "../../../firebase";
import { getFunctions, httpsCallable } from "firebase/functions";
import { SpinnerDotted } from "spinners-react";
const functions = getFunctions(app, "asia-southeast2");
const requestMilestone = httpsCallable(functions, "requestMilestone");

export default function MileStoneMoneyReq({ props, status, jbid, index }) {
  const today = new Date();

  const [cstatus, setcStatus] = useState(status);
  const [load, setload] = useState(false);
  const todayDate =
    today.getUTCFullYear() +
    "-" +
    ((today.getUTCMonth() + 1).toString().length == 1 ? "0" : "") +
    (today.getUTCMonth() + 1) +
    "-" +
    today.getUTCDate();
  console.log(status);
  var t1 = new Date(todayDate);
  var t2 = new Date(props?.date);
  console.log(todayDate, props?.date);
  console.log(t1.getTime(), t2.getTime());
  const sendRequest = (e) => {
    setload(true);
    requestMilestone({ jobID: jbid, index: index }).then((result) => {
      setload(false);
      if (result.data?.status == 1) {
        setcStatus("process");
      } else {
        alert("Something went wrong" + result.data?.desc);
      }
    });
  };
  return (
    <div className=" d-flex flex-row justify-content-start">
      <div className="desc" style={{ width: "30rem" }}>
        <p
          style={{ fontSize: "1rem", margin: "0rem 2rem ", fontWeight: "400" }}
        >
          {props?.description}
        </p>
      </div>
      <div className="desc" style={{ width: "15rem" }}>
        <p
          style={{ fontSize: "1rem", margin: "0rem 2rem ", fontWeight: "400" }}
        >
          {props?.date}
        </p>
      </div>
      <div className="desc">
        <input
          name="amount"
          disabled="true"
          defaultValue={props?.amount}
          style={{
            paddingLeft: "2.1rem",
            textAlign: "center",
            background: `url(${dollar}) no-repeat left`,
            height: "2.2rem",
            backgroundImage: `url(${dollar})`,
            backgroundSize: "1rem",
            width: "15vw",
            margin: "1rem 1rem ",
            padding: "1rem",
            fontSize: "1rem",
            borderRadius: "0.4rem",
            border: "0.05rem solid rgba(0,0,0,0.4)",
          }}
          type="text"
        />
      </div>
      <div style={{ margin: "1rem 2rem" }} className="btns">
        {load ? (
          <div
            className="request-btn"
            style={{
              border: "none",
              padding: "0.5rem",
              fontSize: "1rem",
              width: "8rem",
            }}
          >
            <SpinnerDotted style={{ height: "1.7rem" }} />
          </div>
        ) : (
          <button
            className="request-btn"
            disabled={t2.getTime() > t1.getTime() || cstatus != "pending"}
            onClick={(e) => sendRequest(e)}
            style={{
              background: `${
                t2.getTime() > t1.getTime()
                  ? "#fff"
                  : cstatus == "paid"
                  ? "#0068a2"
                  : " #006872"
              }`,
              color: `${t2.getTime() > t1.getTime() ? "#000" : " #fff"}`,
              border: "none",
              boxShadow: " 0px 4px 4px rgba(0, 0, 0, 0.25)",
              borderRadius: " 0.4rem",
              padding: "0.5rem",
              fontSize: "1rem",
              width: "8rem",
            }}
          >
            {t2.getTime() <= t1.getTime() && cstatus == "pending"
              ? "Request"
              : cstatus == "paid"
              ? "Paid"
              : cstatus == "process"
              ? "Request Sent"
              : "Wait"}
          </button>
        )}
      </div>
    </div>
  );
}
