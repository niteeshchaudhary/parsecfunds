import React, { useState, useEffect } from "react";

import resumeimg from "../../../imges/hourly.svg";
import dollar from "../../../imges/dollar.svg";
import Card from "../../ProfileInfo/card";
import "../../ProfileInfo/Resume.css";
import { SpinnerDotted } from "spinners-react";
import "./SubmitProposal.css";
import app, { db, storage, auth } from "../../../firebase";
import { getFunctions, httpsCallable } from "firebase/functions";
import { useNavigate, useLocation } from "react-router-dom";
const functions = getFunctions(app, "asia-southeast2");
const getMyProposal = httpsCallable(functions, "getMyProposal");
const getJobById = httpsCallable(functions, "getJobById");
const withdrawProposal = httpsCallable(functions, "withdrawProposal");
export default function ViewProposal() {
  const [progress, setProgress] = useState(0);
  const [loadingState, setLoadingState] = useState(false);
  const [close, setclose] = useState(0);
  const [loadJob, setloadJob] = useState({});
  const [loadProposal, setloadProposal] = useState({});

  // const [progress, setProgress] = useState(0);
  const navigate = useNavigate();
  const { state } = useLocation();
  const profile = state?.profile;
  const job = state?.job;
  const proposal = state?.proposal;
  const jbid = state?.jbid || state?.job.job_id;
  console.log(proposal, jbid, job);
  const [status, setStatus] = useState(state?.status || "");
  console.log(state?.status);
  useEffect(() => {
    if (!jbid && !proposal) {
      navigate("/ReceiveProposal", { state: state });
    } else if (jbid) {
      getMyProposal({ id: jbid }).then((result) => {
        if (result.data.status === "1") {
          setloadProposal(result.data.desc);
          if (status === "") {
            setStatus(result.data.desc?.data?.info?.status);
          }
        }
      });
      getJobById({ id: jbid }).then((result) => {
        if (result.data.status == "1") {
          setloadJob(result.data.desc);
        }
      });
    }
  }, []);
  console.log(loadJob);

  function getfile() {
    const downloadTask = storage
      .ref(
        `file/${auth.currentUser.email}/${job.job_id}/${proposal.info.from}/${job.file_name}`
      )
      .getDownloadURL();
    downloadTask
      .then((dat) => {
        window.open(dat);
      })
      .catch((err) => {
        alert("Files missing or unable to load");
      });
  }
  function getfileR() {
    const downloadTask = storage
      .ref(`file/${proposal.info.from}/resume.pdf`)
      .getDownloadURL();
    downloadTask
      .then((dat) => {
        window.open(dat);
      })
      .catch((err) => {
        alert("Files missing or unable to load");
      });
  }

  function clickhandler(e) {
    setLoadingState(true);
    withdrawProposal({ JobID: jbid || loadJob.job_id || state?.job.job_id })
      .then((result) => {
        if (result.data.status == "1") {
          navigate("/LatestProposal", { state: state });
        } else {
          alert(result.data.desc);
        }
        console.log(result);
        setLoadingState(false);
      })
      .catch((err) => {
        alert(err);
        setLoadingState(false);
      });
  }

  function gotodashboard(e) {}

  return (
    <>
      <div className="jobdetail-box">
        <p
          style={{
            color: "#006872",
            fontSize: "1.4rem",
            marginTop: "1rem",
            marginBottom: "1rem",
            fontWeight: "600",
          }}
        >
          {job?.title || loadJob?.title}
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
            {job?.role || loadJob?.role}
          </h4>
          <h6
            style={{
              marginTop: "0.5rem",
              marginLeft: "3rem",
              fontWeight: "normal",
            }}
          >
            {job?.job_category || loadJob?.job_category}
          </h6>
        </div>
        <div
          className=" d-flex flex-row mt-1 justify-content-start"
          style={{
            paddingBottom: "2rem",
            borderBottom: "0.05rem solid rgba(0, 0, 0, 0.2)",
          }}
        >
          <img
            style={{ width: "1rem" }}
            src={require("../../../imges/worldwide.svg").default}
            alt=""
          />
          <p
            style={{
              fontWeight: "normal",
              fontSize: "1rem",
              marginLeft: "0.5rem",
            }}
          >
            Worldwide
          </p>
        </div>

        <p style={{ margin: "1rem 0 1rem 0", fontSize: "1rem" }}>
          {job?.details || loadJob?.details}
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
                src={require("../../../imges/clock.svg").default}
                alt=""
              />
              <p style={{ fontWeight: "600", fontSize: "1.2rem" }}>
                {job?.job_type || loadJob?.job_type}
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
              {/* Hourly */}
            </p>
          </div>
          <div className="partition mx-4 ">
            <div className="d-flex flex-row">
              <img
                style={{ width: "0.8rem", marginRight: "0.5rem" }}
                src={require("../../../imges/calendar.svg").default}
                alt=""
              />
              <p style={{ fontWeight: "600", fontSize: "1.2rem" }}>
                {job?.duration || loadJob?.duration}
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
                src={require("../../../imges/intermediate.svg").default}
                alt=""
              />
              <p style={{ fontWeight: "600", fontSize: "1.2rem" }}>
                {job?.level || loadJob?.level}
              </p>
            </div>
            <p
              style={{
                color: "#000000B2",
                fontSize: "1.1rem",
                marginLeft: "1.3rem",
              }}
            >
              {/* I am looking for a mix of <br /> experience and value */}
            </p>
          </div>
        </div>

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
          {proposal?.jobtype == "hourly" ? (
            <>
              <div className="hr">
                <p style={{ fontSize: "1rem", marginTop: "1rem" }}>
                  Hourly Rate: $
                  {proposal?.hourly_rate || loadProposal?.data?.hourly_rate}
                </p>
                <p style={{ fontSize: "1rem" }}>
                  Total amount the client will see on your proposal
                </p>
                <p style={{ fontSize: "1rem" }}>
                  ${proposal?.hourly_rate || loadProposal?.data?.hourly_rate}/hr
                </p>
              </div>
              <div className="rcv">
                {/* <p style={{ fontSize: "1rem", marginTop: "1rem" }}>
              You'll Receive
            </p> */}
                <p style={{ fontSize: "1rem" }}>
                  The estimated amount you'll receive after service fees
                </p>
                <p style={{ fontSize: "1rem" }}>
                  $
                  {Number((proposal?.hourly_rate * 80) / 100) ||
                    Number((loadProposal?.data?.hourly_rate * 80) / 100)}
                  /hr
                </p>
              </div>
            </>
          ) : (
            <>
              <div className="hr">
                <p style={{ fontSize: "1rem", marginTop: "1rem" }}>
                  Fixed Rate: $
                  {proposal?.hourly_rate || loadProposal?.data?.hourly_rate}
                </p>
                <p style={{ fontSize: "1rem" }}>
                  Total amount the client will see on your proposal
                </p>
                <p style={{ fontSize: "1rem" }}>
                  ${proposal?.hourly_rate || loadProposal?.data?.hourly_rate}
                </p>
              </div>
              <div className="rcv">
                {/* <p style={{ fontSize: "1rem", marginTop: "1rem" }}>
                  You'll Receive
                </p> */}
                <p style={{ fontSize: "1rem" }}>
                  The estimated amount you'll receive after service fees
                </p>
                <p style={{ fontSize: "1rem" }}>
                  $
                  {Number((proposal?.hourly_rate * 80) / 100) ||
                    Number((loadProposal?.data?.hourly_rate * 80) / 100)}
                </p>
              </div>
            </>
          )}
        </div>
        <div
          className="terms"
          style={{
            paddingBottom: "2rem",
          }}
        >
          <p
            style={{ fontWeight: "600", fontSize: "1.2rem", margin: "1rem 0" }}
          >
            Cover Letter
          </p>
          <p style={{ fontSize: "1rem" }}>
            {proposal?.coverletter || loadProposal?.data?.coverletter}
          </p>
        </div>
        <div
          className="terms"
          style={{
            paddingBottom: "2rem",
          }}
        >
          <p
            style={{ fontWeight: "600", fontSize: "1.2rem", margin: "1rem 0" }}
          >
            Experience Info
          </p>
          <p style={{ fontSize: "1rem" }}>
            {proposal?.experience || loadProposal?.data?.experience}
          </p>
        </div>
        {proposal?.documentPath != "" ||
        loadProposal?.data?.documentPath != "" ? (
          <>
            <p
              style={{
                fontWeight: "600",
                fontSize: "1.2rem",
                margin: "1rem 0",
              }}
            >
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
        <div className="skill-button">
          <button
            onClick={getfileR}
            style={{
              fontSize: "1rem",
              fontWeight: "600",
              padding: "0.2rem 0.2rem 0rem 0.2rem",
              width: "10rem",
              alignSelf: "center",
              borderRadius: "0.7rem",
            }}
          >
            Resume/CV
          </button>
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
          <button
            type="submit"
            onClick={() =>
              navigate("/ReceiveProposal", {
                state: { job: job },
              })
            }
            className="btn btn-primary"
            style={{
              width: "15%",
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
            Back
          </button>
        </div>
      </div>
    </>
  );
}
