import React, { useState, useEffect } from "react";

import "./Jobdetails.css";
import { useNavigate, useLocation } from "react-router-dom";
import app, { db } from "../../../firebase";
import { storage, auth } from "../../../firebase";
import { getFunctions, httpsCallable } from "firebase/functions";
const functions = getFunctions(app, "asia-southeast2");
const getWallet = httpsCallable(functions, "getWallet");
const addToFavourites = httpsCallable(functions, "addToFavourites");
const removeFavourite = httpsCallable(functions, "removeFavourite");

function Jobdetails() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [cstate, setcstate] = useState(state?.isfav || false);
  const [Pending, setPending] = useState("");
  const [Available, setAvailable] = useState("");
  const [connects, setConnects] = useState(0);

  const job = state?.job;
  console.log(job.file_name);
  var today = new Date();
  var t = Math.round((Number(today.getTime()) - Number(job?.time)) / 60000);
  const labels = ["minutes", "hours", "days", "months", "years"];
  const [timepast, settimepast] = useState(
    Math.round(t / 512400)
      ? Math.round(t / 512400)
      : Math.round(t / 42700)
      ? Math.round(t / 42700)
      : Math.round(t / 1400)
      ? Math.round(t / 1400)
      : Math.round(t / 60)
      ? Math.round(t / 60)
      : t
  );
  const [unit, setunit] = useState(
    Math.round(t / 512400)
      ? labels[4]
      : Math.round(t / 42700)
      ? labels[3]
      : Math.round(t / 1400)
      ? labels[2]
      : Math.round(t / 60)
      ? labels[1]
      : labels[0]
  );

  function gotoProposals() {
    const st = {};
    st["job"] = job;
    st["profile"] = state?.profile;
    if (job?.job_type == "hourly") {
      navigate("/SubmitProposals", { state: st });
    } else if (job?.job_type == "fixed") {
      navigate("/SubmitProposalbyfixed", {
        state: st,
      });
    }
  }
  function getfile() {
    const downloadTask = storage
      .ref(`file/${job.from}/${job.job_id}/${job.file_name}`)
      .getDownloadURL();
    downloadTask
      .then((dat) => {
        window.open(dat);
      })
      .catch((err) => {
        alert("Files missing or unable to load");
      });
  }
  useEffect(() => {
    getWallet().then((result) => {
      if (result.data.result.status == 1) {
        setConnects(result.data.result.desc.connects);
        setPending(result.data.result.desc.shadow_wallet);
        setAvailable(result.data.result.desc.wallet);
      }
    });
  });
  useEffect(() => {
    setcstate(state?.isfav);
  }, [state?.isfav]);

  function changeFavourite(e) {
    e.preventDefault();
    if (!cstate) {
      setcstate(true);
      addToFavourites({
        JobId: job.job_id,
      }).then((result) => {
        console.log(result.data);
        if (result?.data?.status == 1) {
          console.log("ok");
          // props.setchng(!props.chng);
          //setcstate(true);
        } else {
          setcstate(false);
          alert(result?.data?.desc);
        }
      });
    } else {
      setcstate(false);
      removeFavourite({
        JobID: job?.job_id,
      }).then((result) => {
        console.log(result.data);
        if (result?.data?.status == 1) {
          // props.setchng(!props.chng);
          //setcstate(false);
        } else {
          setcstate(true);
          alert(result?.data?.desc);
        }
      });
    }
  }

  return (
    <>
      <p className="jobdetail-box">Job details</p>
      <div className="jobdetail-wrapper ">
        <div className="jobdetail-left-box">
          <p
            style={{
              fontSize: "1.8rem",
              fontWeight: "600",
              paddingBottom: "1rem",
              borderBottom: "0.05rem solid rgba(0, 0, 0, 0.2)",
            }}
          >
            {job?.title}
          </p>
          <h4 style={{ color: "#006872", marginTop: "1rem" }}>{job?.role}</h4>
          <h6 style={{ marginTop: "0.5rem" }}>
            Posted {timepast} {unit} ago
          </h6>
          <div
            className="  "
            style={{
              display: "flex",
              flexDirection: "row",
              marginTop: "1rem",
              paddingBottom: "2rem",
              borderBottom: "0.05rem solid rgba(0, 0, 0, 0.2)",
            }}
          >
            <img
              style={{ width: "1rem" }}
              src={require("../../../imges/worldwide.svg").default}
              alt=""
            />
            <h6 style={{ fontWeight: "normal", marginLeft: "0.5rem" }}>
              Worldwide
            </h6>
          </div>
          <p style={{ marginTop: "2rem" }}>{job?.details}</p>
          <p style={{ margin: "1rem 0" }}>
            {/* PLEASE INCLUDE A TIMESCALE AND SUGGESTED BUDGET IN YOUR OFFER */}
          </p>
          <p
            style={{
              paddingBottom: "1.5rem",
              borderBottom: "0.05rem solid rgba(0, 0, 0, 0.2)",
            }}
          >
            {/*  */}
          </p>
          <div
            style={{
              paddingBottom: "1.5rem",
              borderBottom: "0.05rem solid rgba(0, 0, 0, 0.2)",
            }}
            className="d-flex flex-row justify-content-around"
          >
            <div className="partition ">
              <div className="d-flex flex-row">
                <img
                  style={{ width: "0.8rem", marginRight: "0.5rem" }}
                  src={require("../../../imges/clock.svg").default}
                  alt=""
                />
                <p style={{ fontWeight: "600" }}>{job?.job_type}</p>
              </div>
              <p
                style={{
                  color: "#000000B2",
                  fontSize: "1.1rem",
                  marginLeft: "1.3rem",
                }}
              >
                {/* Hourly */}
              </p>
            </div>
            <div className="partition ">
              <div className="d-flex flex-row">
                <img
                  style={{ width: "0.8rem", marginRight: "0.5rem" }}
                  src={require("../../../imges/calendar.svg").default}
                  alt=""
                />
                <p style={{ fontWeight: "600" }}>{job?.duration}</p>
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
            <div className="partition  ">
              <div style={{ marginTop: "2rem" }} className="d-flex flex-row">
                <img
                  style={{ width: "0.8rem", marginRight: "0.5rem" }}
                  src={require("../../../imges/intermediate.svg").default}
                  alt=""
                />
                <p style={{ fontWeight: "600" }}>{job?.level}</p>
              </div>
              <p
                style={{
                  color: "#000000B2",
                  fontSize: "1.1rem",
                  marginLeft: "1.3rem",
                }}
              >
                {/* I am looking for a mix of experience and value */}
              </p>
            </div>
          </div>
          <p
            style={{
              paddingBottom: "5rem",
              paddingTop: "2rem",
              borderBottom: "0.05rem solid rgba(0, 0, 0, 0.2)",
            }}
          >
            <span style={{ fontWeight: "600" }}>Project Type:</span>{" "}
            {job?.job_category}
          </p>

          <div
            style={{
              paddingBottom: "4rem",
              paddingTop: "2rem",
              borderBottom: "0.05rem solid rgba(0, 0, 0, 0.2)",
            }}
            className="skill-expert"
          >
            <p style={{ fontWeight: "600" }}>Skills and Expertise</p>

            <div className="skill-button">
              {job?.skill_required.map((skill, index) => (
                <p key={index}>{skill}</p>
              ))}
            </div>
            {job.file_name != "" ? (
              <>
                <p
                  style={{ borderBottom: "0.05rem solid rgba(0, 0, 0, 0.2)" }}
                ></p>
                <p style={{ fontWeight: "600", paddingTop: "2rem" }}>
                  Attachments
                </p>
                <div className="skill-button">
                  <button
                    onClick={getfile}
                    style={{
                      fontSize: "1rem",
                      fontWeight: "600",
                      padding: "0.2rem 0.2rem 0rem 0.2rem",
                      width: "10rem",
                      alignSelf: "center",
                      borderRadius: "0.7rem",
                    }}
                  >
                    Download/View
                  </button>
                </div>
              </>
            ) : (
              ""
            )}
          </div>
          <div className="activity">
            <p style={{ fontWeight: "600", marginBlock: "1rem" }}>
              Activity on this job
            </p>
            <p style={{ fontSize: "1rem", fontWeight: "600" }}>
              <span style={{ color: "#000000B2" }}>Proposals:</span> {job?.bidc}
            </p>
            {/* <p style={{ fontSize: "1rem", fontWeight: "600" }}>
              <span style={{ color: "#000000B2" }}>Last viewed by client:</span>{" "}
              4 minutes ago
            </p>
            <p style={{ fontSize: "1rem", fontWeight: "600" }}>
              <span style={{ color: "#000000B2" }}>Interviewing:</span> 0
            </p>
            <p style={{ fontSize: "1rem", fontWeight: "600" }}>
              <span style={{ color: "#000000B2" }}>Invites sent:</span> 0
            </p>
            <p style={{ fontSize: "1rem", fontWeight: "600" }}>
              <span style={{ color: "#000000B2" }}>Unanswered invites:</span> 0
            </p> */}
          </div>
        </div>
        <div className="jobdetail-right-box">
          <button
            className="btn"
            onClick={gotoProposals}
            style={{
              width: "16vw",
              fontSize: "1rem",
              padding: "0.5rem",
              background: "#006872",
              color: "white",
              margin: "1.2rem 2rem 0.8rem 2rem",
              border: "0.1rem solid #FFFFFF",
              boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
              borderRadius: "0.4rem",
            }}
          >
            Submit Proposal
          </button>
          <button
            className="btn"
            onClick={changeFavourite}
            style={{
              width: "16vw",
              fontSize: "1rem",
              padding: "0.5rem",
              background: cstate ? "#a99" : "white",
              color: cstate ? "white" : "#006872",
              border: " 1px solid rgba(0, 0, 0, 0.4)",
              boxShadow: " 0px 4px 4px rgba(0, 0, 0, 0.25)",
              borderRadius: "0.4rem",
              margin: "1rem 2rem",
            }}
          >
            <span>
              <img src="" alt="" />
            </span>{" "}
            {cstate ? "Remove from Saved Jobs" : "Save jobs"}
          </button>

          <p
            style={{
              fontSize: "1rem",
              marginTop: "1rem",
              marginBottom: "0.5rem",
            }}
          >
            Send a proposal for: 1 Connects
          </p>
          <p
            style={{
              fontSize: "1rem",
              paddingBottom: "2rem",
              borderBottom: "0.05rem solid rgba(0, 0, 0, 0.2)",
            }}
          >
            Available Connects: {connects}
          </p>

          <h5 style={{ marginTop: "1rem" }}>About the Employer</h5>
          <p style={{ fontSize: "1rem", fontWeight: "600" }}>
            <span>
              <img
                style={{ width: "1rem", marginRight: "0.5rem" }}
                src={require("../../../imges/payment.svg").default}
                alt=""
              />
            </span>
            Payment verified
          </p>

          {/* <p style={{ fontSize: "1rem", fontWeight: "600" }}>United Kingdom</p>
          <p
            style={{ color: "#000000B2", fontSize: "1rem", fontWeight: "600" }}
          >
            Bath 11:09 am
          </p>
          <p style={{ fontSize: "1rem", fontWeight: "600" }}>42 jobs posted</p>
          <p
            style={{ color: "#000000B2", fontSize: "1rem", fontWeight: "600" }}
          >
            {" "}
            72% hire rate, 1 open job
          </p>
          <p style={{ fontSize: "1rem", fontWeight: "600" }}>
            $5k+ total spent
          </p>
          <p
            style={{ color: "#000000B2", fontSize: "1rem", fontWeight: "600" }}
          >
            30 hires, 10 active
          </p>
          <p style={{ fontSize: "1rem", fontWeight: "600" }}>
            25.00 /hr avg hourly rate paid
          </p>
          <p
            style={{ color: "#000000B2", fontSize: "1rem", fontWeight: "600" }}
          >
            54 hours
          </p>
          <p
            style={{
              color: "#000000B2",
              fontSize: "0.8rem",
              fontWeight: "600",
            }}
          >
            Member since Dec 17,2015
          </p>

          <p style={{ fontSize: "1rem", fontWeight: "normal" }}>
            <span style={{ color: "#000000B2" }}>Proposals:</span> 20 to 50
          </p>
        */}
        </div>
      </div>
    </>
  );
}

export default Jobdetails;
