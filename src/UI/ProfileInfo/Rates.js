import React, { useState } from "react";
import resumeimg from "../../imges/hourly.svg";
import dollar from "../../imges/dollar.svg";
import { SpinnerDotted } from "spinners-react";
import Card from "./card";
import "./Resume.css";
import app, { db } from "../../firebase";
import { useNavigate, useLocation } from "react-router-dom";
import { getFunctions, httpsCallable } from "firebase/functions";

const functions = getFunctions(app, "asia-southeast2");
const addProposedRate = httpsCallable(functions, "addProposedRate");

var count = 1;
export default function Rates(props) {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [onstate, setOnstate] = useState(false);
  const [loadingState, setLoadingState] = useState(false);
  function clickhandler(e) {
    setLoadingState(true);
    addProposedRate({
      hourly: document.getElementById("hourlyrate").value,
    }).then((result) => {
      if (result.data.status == 1) {
        const profile = state?.profile;
        profile["screen"] = 9;
        props.fun1();
        navigate("/ProfileInfo", { state: { profile: profile } });
      } else {
        alert(result.data.desc);
      }
      setLoadingState(false);
    });
  }
  function calculate() {
    console.log("here");
    if (document.getElementById("hourlyrate").value < 0) {
      setOnstate(true);
    } else {
      setOnstate(false);
    }
    document.getElementById("servicefee").innerHTML =
      (Number(document.getElementById("hourlyrate").value) * 20) / 100;
    document.getElementById("calcamount").innerHTML =
      (Number(document.getElementById("hourlyrate").value) * 80) / 100;
  }

  return (
    <>
      <div className="main-logr">
        <div
          className="Scroll"
          style={{
            overflow: "auto",
            width: "50%",
            padding: "4% 2% 2% 6%",
            height: "100%",
          }}
        >
          <h1
            style={{
              width: "90%",
              fontFamily: "PT Serif",
              fontStyle: "normal",
              fontWeight: "700",
              fontSize: "1.8rem",
              textAlign: "justify",
              textJustify: "inter-word",
              lineHeight: "2.8rem",
            }}
          >
            Your hourly rate
          </h1>
          <p
            style={{
              width: "90%",
              fontFamily: "Roboto",
              fontStyle: "normal",
              fontWeight: "400",
              marginTop: "3%",
              marginBottom: "4%",
              textAlign: "justify",
              textJustify: "inter-word",
              fontSize: "1rem",
              lineHeight: "1.3rem",
            }}
          >
            Once you publish your profile, clients will see this fee on your
            profile and in search results. Every time you submit a proposal, you
            can change your rate.
          </p>
          <div style={{ marginBottom: "1.5rem" }}>
            <label
              style={{
                width: "60%",
                padding: "0.6rem 0.8rem",
                height: "3rem",
                fontSize: "1.1rem",
                boxSizing: "border-box",
                border: "0.1rem solid rgba(90, 90, 90, 0.4)",
                borderRadius: "0.8rem",
              }}
            >
              Hourly Rate
            </label>
            <div
              style={{
                width: "30%",
                float: "right",
                fontWeight: "400",
                fontSize: "1.1rem",
                lineHeight: "100%",
              }}
            >
              <input
                type="number"
                placeholder="0.0"
                defaultValue="0.0"
                id="hourlyrate"
                min="0"
                onChange={calculate}
                className="icoinp"
                style={{
                  width: "70%",
                  padding: "0.6rem 0.8rem",
                  height: "3rem",
                  textAlign: "right",
                  paddingLeft: "1rem",
                  background: `url(${dollar}) no-repeat left`,
                  backgroundImage: `url(${dollar})`,
                  backgroundSize: "1.1rem",
                  fontSize: "1.1rem",
                  boxSizing: "border-box",
                  border: "0.1rem solid rgba(90, 90, 90, 0.4)",
                  borderRadius: "0.8rem",
                }}
              />
              &nbsp;/hr
            </div>
          </div>
          <div style={{ marginBottom: "1.5rem" }}>
            <label
              style={{
                width: "60%",
                padding: "0.6rem 0.8rem",
                height: "3rem",
                fontSize: "1.1rem",
                boxSizing: "border-box",
                border: "0.1rem solid rgba(90, 90, 90, 0.4)",
                borderRadius: "0.8rem",
              }}
            >
              Service fee (20%)
            </label>
            <div
              style={{
                width: "30%",
                float: "right",
                fontWeight: "400",
                fontSize: "1.1rem",
                lineHeight: "100%",
              }}
            >
              <label
                placeholder="0.0"
                className="icoinp"
                onChange={calculate}
                defaultValue="0.0"
                id="servicefee"
                style={{
                  width: "73%",
                  padding: "0.9rem 1rem 0.8rem 0.8rem",
                  height: "3rem",
                  textAlign: "right",
                  paddingLeft: "1rem",
                  background: `url(${dollar}) no-repeat left`,
                  backgroundImage: `url(${dollar})`,
                  backgroundSize: "1rem",
                  fontSize: "1.1rem",
                  boxSizing: "border-box",
                  border: "0.1rem solid rgba(90, 90, 90, 0.4)",
                  borderRadius: "0.8rem",
                }}
              >
                0
              </label>
              &nbsp;/hr
            </div>
          </div>
          <div style={{ marginBottom: "1.5rem" }}>
            <label
              style={{
                width: "60%",
                padding: "0.6rem 0.8rem",
                height: "3rem",
                fontSize: "1.1rem",
                boxSizing: "border-box",
                border: "0.1rem solid rgba(90, 90, 90, 0.4)",
                borderRadius: "0.8rem",
              }}
            >
              Amount you’ll receive
            </label>
            <div
              style={{
                width: "30%",
                float: "right",
                fontWeight: "400",
                fontSize: "1.1rem",
                lineHeight: "100%",
              }}
            >
              <label
                type="currency"
                placeholder="0.0"
                className="icoinp"
                id="calcamount"
                style={{
                  width: "73%",
                  padding: "0.8rem 1rem 0.8rem 0.8rem",
                  height: "3rem",
                  textAlign: "right",
                  paddingLeft: "1rem",
                  background: `url(${dollar}) no-repeat left`,
                  backgroundImage: `url(${dollar})`,
                  backgroundSize: "1.1rem",
                  fontSize: "1.1rem",
                  boxSizing: "border-box",
                  border: "0.1rem solid rgba(90, 90, 90, 0.4)",
                  borderRadius: "0.8rem",
                }}
              >
                0
              </label>
              &nbsp;/hr
            </div>
          </div>
        </div>
        <div className="rightbarr">
          <img src={resumeimg} className="imglog1r" alt="resume"></img>
        </div>
      </div>
      <div>
        <progress
          id="progr"
          value="90"
          max="100"
          style={{
            accentColor: "#FFC727",
            height: "0.26rem",
            width: "100%",
          }}
        >
          90%
        </progress>
        <div
          style={{
            display: "flex",
            height: "3.1rem",
            justifyContent: "right",
            paddingRight: "10%",
          }}
        >
          {loadingState && <SpinnerDotted />}
          {!loadingState && (
            <button
              type="submit"
              disabled={onstate}
              onClick={clickhandler}
              className="btn btn-primary"
              style={{
                width: "15%",
                height: "3rem",
                background: "#006872",
                boxShadow: "0px 0.2rem 0.2rem rgba(0, 0, 0, 0.25)",
                borderRadius: "2rem",
              }}
            >
              Next
            </button>
          )}
        </div>
      </div>
    </>
  );
}
