import React, { useState } from "react";

import "./Jobdetails.css";
import { SpinnerDotted } from "spinners-react";
import { useNavigate, useLocation } from "react-router-dom";

import app, { db } from "../../../firebase";
import { getFunctions, httpsCallable } from "firebase/functions";
const functions = getFunctions(app, "asia-southeast2");
const requestCompleteMoney = httpsCallable(functions, "requestCompleteMoney");

export default function RequestComplete(props) {
  const [loadingState, setLoadingState] = useState(false);

  function calculate() {
    console.log("calculate");
    document.getElementById("total_amt").innerHTML =
      Number(document.getElementById("total_hour").value) * props?.rate * 0.8;
  }
  const clickhandler = () => {
    setLoadingState(true);
    requestCompleteMoney({
      jobID: props.job.job_id,
      hours: document.getElementById("total_hour").value,
    })
      .then((result) => {
        console.log(result);
        if (result.data.status == 1) {
          window.location.reload();
        } else {
          alert(result.data.desc);
        }
        setLoadingState(false);
      })
      .catch((error) => {
        alert(error);
        setLoadingState(false);
      });
  };
  return (
    <>
      <p style={{ margin: "1rem 0", fontSize: "1.1rem" }}>
        Your Proposed Rate : ${props?.rate}
      </p>
      <p
        style={{
          width: "100%",
          textAlign: "right",
          paddingRight: "6rem",
          fontSize: "1rem",
        }}
      >
        Amount Recieved : {props?.proposal?.recieved_amount || 0}
      </p>
      <div className="hourreq">
        <p style={{ margin: "1rem 0 0 0", fontSize: "1.1rem" }}>
          Request Amount
        </p>
        <div className="d-flex">
          <div style={{ margin: "1rem" }} className="">
            <p style={{ fontSize: "1rem", visibility: "hidden" }}>hidden</p>
            <input
              id="total_hour"
              onChange={calculate}
              value={props?.rate}
              disabled
              style={{
                cursor: "not-allowed",
                marginTop: "0.4rem",
                border: "0.05rem solid rgba(0,0,0,0.3)",
                borderRadius: "0.4rem",
                padding: "0.3rem",
                fontSize: "1rem",
                width: "10rem",
                height: "2.2rem",
              }}
              placeholder="0"
              type="text"
            />
          </div>

          <div style={{ margin: "1rem 4rem" }} className="btns">
            <p style={{ fontSize: "1rem", visibility: "hidden" }}>hidden</p>
            {props?.proposal?.Request == props?.rate ? (
              <>
                <>
                  <div
                    className="request-btn"
                    style={{
                      background: " #006872",
                      color: "white",
                      border: "none",
                      boxShadow: " 0px 4px 4px rgba(0, 0, 0, 0.25)",
                      borderRadius: " 0.4rem",
                      padding: "0.5rem",
                      fontSize: "1rem",
                      width: "13rem",
                    }}
                  >
                    Payment Requested
                  </div>
                </>
              </>
            ) : Number(props?.rate) <=
              Number(props?.proposal?.recieved_amount) ? (
              <>
                <div
                  className="request-btn"
                  style={{
                    background: " #006872",
                    color: "white",
                    border: "none",
                    boxShadow: " 0px 4px 4px rgba(0, 0, 0, 0.25)",
                    borderRadius: " 0.4rem",
                    padding: "0.5rem",
                    fontSize: "1rem",
                    width: "13rem",
                  }}
                >
                  Payment Completed
                </div>
              </>
            ) : (
              <>
                {loadingState && <SpinnerDotted style={{ height: "2rem" }} />}
                {!loadingState && (
                  <button
                    onClick={() => clickhandler()}
                    className="request-btn"
                    style={{
                      background: " #006872",
                      color: "white",
                      border: "none",
                      boxShadow: " 0px 4px 4px rgba(0, 0, 0, 0.25)",
                      borderRadius: " 0.4rem",
                      padding: "0.5rem",
                      fontSize: "1rem",
                      width: "8rem",
                    }}
                  >
                    Request
                  </button>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
