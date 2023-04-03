import React from "react";
import { NavLink } from "react-router-dom";

import "../UI/ProfileInfo/Resume.css";
import "../UI/Employee/Components/SubmitProposal.css";
import { useState } from "react";
import app, { db } from "../firebase";
import { getFunctions, httpsCallable } from "firebase/functions";
import { storage, auth } from "../firebase";
const functions = getFunctions(app, "asia-southeast2");
const addProposedRate = httpsCallable(functions, "addProposedRate");
function ViewProposal() {
  const styleabsolute = {
    position: "fixed",
    padding: "1rem",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  };

  const [showconfirm, setShowConfirm] = useState(false);
  function clickhandler(e) {
    setShowConfirm(true);
  }
  return (
    <>
      <div
        style={{ padding: "1rem" }}
        className="jobdetail-box d-flex flex-row justify-content-start align-items-center"
      >
        {/* <img  style={{width:"1rem",marginRight:"1rem" }} src={require("../imges/tick-solid.svg").default} alt="" /> */}
        <p style={{ fontSize: "1.4rem", fontWeight: "600" }} className="">
          Job details
        </p>
      </div>

      <div className="jobdetail-box">
        <p
          style={{
            color: "#006872",
            fontSize: "1.4rem",
            marginTop: "1rem",
            marginBottom: "2rem",
            fontWeight: "600",
          }}
        >
          Full stack Developer
        </p>
        <div className="d-flex flex-row justify-content-start">
          <h4
            style={{
              color: "#006872",
              fontSize: "1.2rem",
              marginTop: "1rem",
              fontWeight: "600",
            }}
          >
            Full stack Developer
          </h4>
          <h6
            style={{
              marginTop: "0.5rem",
              marginLeft: "3rem",
              fontWeight: "normal",
            }}
          >
            Posted 43 minutes ago
          </h6>
        </div>
        {/* <div
            className=" d-flex flex-row mt-1 justify-content-start"
            style={{
              paddingBottom: "2rem",
              borderBottom: "0.05rem solid rgba(0, 0, 0, 0.2)",
            }}
          >
            <img
              style={{ width: "1rem" }}
              src={require("../imges/worldwide.svg").default}
              alt=""
            />
            <p style={{ fontWeight: "normal",fontSize:"1rem", marginLeft: "0.5rem" }}>
              Worldwide
            </p>
          </div> */}

        <p style={{ marginTop: "2rem", fontSize: "1rem" }}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vitae cursus
          nulla augue sapien. Vitae facilisis imperdiet sed nunc. Pellentesque
          magna tempus aliquet eget amet. Vitae ipsum nisl sit nam nulla proin
          consectetur vitae vel. Lorem ipsum dolor sit amet, consectetur
          adipiscing elit. Vitae cursus nulla augue sapien. Vitae facilisis
          imperdiet sed nunc. Pellentesque magna tempus aliquet eget amet. Vitae
          ipsum nisl sit nam nulla proin consectetur vitae vel.Lorem ipsum dolor
          sit amet, consectetur adipiscing elit. Vitae cursus nulla augue
          sapien. Vitae facilisis imperdiet sed nunc. Pellentesque magna tempus
          aliquet eget amet. Vitae ipsum nisl sit nam nulla proin consectetur
          vitae vel.
        </p>
        <p style={{ margin: "1rem 0", fontSize: "1rem" }}>
          PLEASE INCLUDE A TIMESCALE AND SUGGESTED BUDGET IN YOUR OFFER
        </p>
        <p
          style={{
            paddingBottom: "1.5rem",
            fontSize: "1rem",
          }}
        >
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vitae cursus
          nulla augue sapien. Vitae facilisis imperdiet sed nunc. Pellentesque
          magna tempus aliquet eget amet. Vitae ipsum nisl sit nam nulla proin
          consectetur vitae vel. Lorem ipsum dolor sit amet, consectetur
          adipiscing elit. Vitae cursus nulla augue sapien. Vitae facilisis
          imperdiet sed nunc. Pellentesque magna tempus aliquet eget amet. Vitae
          ipsum nisl sit nam nulla proin consectetur vitae vel.Lorem ipsum dolor
          sit amet, consectetur adipiscing elit. Vitae cursus nulla augue
          sapien. Vitae facilisis imperdiet sed nunc. Pellentesque magna tempus
          aliquet eget amet. Vitae ipsum nisl sit nam nulla proin consectetur
          vitae vel. ae ipsum nisl sit nam nulla proin consectetur vitae vel.
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vitae cursus
          nulla augue sapien. Vitae facilisis imperdiet sed nunc. Pellentesque
          magna tempus aliquet eget amet. Vitae ipsum nisl sit nam nulla proin
          consectetur vitae vel.dolor sit amet, consectetur adipiscing elit.
          Vitae cursus nulla augue sapien. Vitae facilisis imperdiet sed nunc.
          Pellentesque magna tempus aliquet eget amet. Vitae ipsum nisl sit nam
          nulla proin consectetur vitae vel.
        </p>

        <div
          style={{
            paddingBottom: "1.5rem",
            borderBottom: "0.05rem solid rgba(0, 0, 0, 0.2)",
          }}
          className="d-flex flex-row justify-content-start"
        >
          <div className="partition  ">
            <div className="d-flex flex-row">
              <img
                style={{ width: "0.8rem", marginRight: "0.5rem" }}
                src={require("../imges/clock.svg").default}
                alt=""
              />
              <p style={{ fontWeight: "600", fontSize: "1.2rem" }}>
                Less than 30 hrs/week
              </p>
            </div>
            <p
              style={{
                color: "#000000B2",
                fontSize: "1.1rem",
                marginLeft: "1.3rem",
                fontSize: "1.2rem",
              }}
            >
              Hourly
            </p>
          </div>
          <div className="partition mx-4 ">
            <div className="d-flex flex-row">
              <img
                style={{ width: "0.8rem", marginRight: "0.5rem" }}
                src={require("../imges/calendar.svg").default}
                alt=""
              />
              <p style={{ fontWeight: "600", fontSize: "1.2rem" }}>
                1 to 3 months
              </p>
            </div>
            <p
              style={{
                color: "#000000B2",
                fontSize: "1.1rem",
                marginLeft: "1.3rem",
              }}
            >
              Project Length
            </p>
          </div>
          <div className="partition mx-2  ">
            <div
              style={{ marginTop: "2rem" }}
              className="d-flex flex-row justify-content-start"
            >
              <img
                style={{ width: "0.8rem", marginRight: "0.5rem" }}
                src={require("../imges/intermediate.svg").default}
                alt=""
              />
              <p style={{ fontWeight: "600", fontSize: "1.2rem" }}>
                Intermediate
              </p>
            </div>
            <p
              style={{
                color: "#000000B2",
                fontSize: "1.1rem",
                marginLeft: "1.3rem",
              }}
            >
              I am looking for a mix of <br /> experience and value
            </p>
          </div>
        </div>

        {/* <div
            style={{
              paddingBottom: "4rem",
              paddingTop: "2rem",
              borderBottom: "0.05rem solid rgba(0, 0, 0, 0.2)",
            }}
            className="skill-expert"
          >
            <p style={{ fontWeight: "600",fontSize:"1.2rem" }}>Skills and Expertise</p>

            <div className="skill-button">
              <p>Web design</p>
              <p>Web design</p>
              <p>Web design</p>
              <p>Web design</p>
              <p>Web design</p>
              <p>Web design</p>
            </div>
          </div> */}

        <div
          className="terms"
          style={{
            paddingBottom: "2rem",
          }}
        >
          <p
            style={{ fontWeight: "600", fontSize: "1.2rem", marginTop: "1rem" }}
          >
            Your proposed terms
          </p>
          <div className="hr">
            <p style={{ fontSize: "1rem", marginTop: "1rem" }}>Hourly Rate</p>
            <p style={{ fontSize: "1rem" }}>
              Total amount the client will see on your proposal
            </p>
            <p style={{ fontSize: "1rem" }}>$50.00/hr</p>
          </div>
          <div className="rcv">
            <p style={{ fontSize: "1rem", marginTop: "1rem" }}>
              You'll Receive
            </p>
            <p style={{ fontSize: "1rem" }}>
              The estimated amount you'll receive after service fees
            </p>
            <p style={{ fontSize: "1rem" }}>$40.00/hr</p>
          </div>
        </div>

        <div className="">
          <p
            style={{
              fontWeight: "600",
              fontSize: "1.2rem",
              marginBottom: "1rem",
              marginTop: "2rem",
            }}
          >
            Cover Letter
          </p>
          <p
            style={{
              fontSize: "1rem",
              marginBottom: "1rem",
              marginTop: "1rem",
            }}
          >
            vdbibviovb sidvbiuvb ievoevob levoie o obeoil lnn oinelk io k n
            efowwwwwwwwwwwwwwwwww opwefwpn
          </p>
        </div>

        <div
          style={{
            display: "flex",
            height: "10vh",
            justifyContent: "left",
            paddingRight: "10%",
            marginTop: "5rem",
          }}
        >
          <NavLink to="/SubmitProposals">
            <button
              type="submit"
              className="btn btn-primary"
              style={{
                width: "100%",
                height: "3rem",
                background: "#ffffff",
                color: "black",
                marginLeft: "5rem",

                border: " 0.1rem solid rgba(0, 0, 0, 0.4)",
                fontWeight: "600",
                boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
                borderRadius: "0.4rem",
              }}
            >
              Edit Proposal
            </button>
          </NavLink>
          <button
            type="submit"
            onClick={clickhandler}
            className="btn btn-primary"
            style={{
              width: "15%",
              height: "3rem",
              background: "#006872",
              marginLeft: "10rem",
              boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
              borderRadius: "0.4rem",
            }}
          >
            Withdraw Proposal
          </button>
        </div>
        {showconfirm && (
          <div style={styleabsolute} className="absolute-div jobdetail-box">
            <div
              style={{
                borderBottom: " 0.05rem solid rgba(0,0,0,0.2)",
                padding: "0.8rem",
                marginBottom: "1.5rem",
              }}
              className="d-flex flex-row justify-content-between"
            >
              <p style={{ fontSize: "1.2rem", fontWeight: "600" }}>
                Withdraw proposal
              </p>
              <img
                onClick={() => setShowConfirm(false)}
                style={{ width: "1rem", cursor: "pointer" }}
                src={require("../imges/cross-icon.svg").default}
                alt=""
              />
            </div>
            <div className=" d-flex flex-column justify-content-center align-items-center">
              <img
                style={{ width: "4rem" }}
                src={require("../imges/withdraw-proposal-icon.svg").default}
                alt=""
              />
              <p style={{ fontSize: "1.1rem" }}>
                We will notify the client that you are not interested.{" "}
              </p>

              <button
                type="submit"
                onClick=""
                className="btn btn-primary"
                style={{
                  width: "40%",
                  height: "2.5rem",
                  background: "#006872",
                  margin: "1.5rem",
                  boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
                  borderRadius: "0.4rem",
                }}
              >
                {" "}
                Withdraw{" "}
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default ViewProposal;
