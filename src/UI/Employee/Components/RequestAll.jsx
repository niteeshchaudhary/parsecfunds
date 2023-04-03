import React, { useState, useEffect } from "react";
import { SpinnerDotted } from "spinners-react";
import Requestbyhour from "./Requestbyhour";
import RequestComplete from "./RequestComplete";
import RequestMilestone from "./RequestMilestone";

import "./Jobdetails.css";

import app, { db } from "../../../firebase";
import { getFunctions, httpsCallable } from "firebase/functions";
import { storage, auth } from "../../../firebase";
import { useNavigate, useLocation } from "react-router-dom";

const functions = getFunctions(app, "asia-southeast2");
const getMyProposal = httpsCallable(functions, "getMyProposal");
const getJobById = httpsCallable(functions, "getJobById");
const raiseDispute = httpsCallable(functions, "raiseDispute");

function RequestAll() {
  const navigate = useNavigate();
  const { state } = useLocation();

  const [progress, setProgress] = useState(0);
  const [close, setclose] = useState(0);

  const job = state?.job;
  var today = new Date();
  const profile = state?.profile;
  const proposal = state?.proposal;
  const jbid = state?.jbid;
  console.log(proposal, jbid, job);

  const [loadJob, setloadJob] = useState(job || {});
  const [loadProposal, setloadProposal] = useState(proposal || {});
  const [loadingState, setLoadingState] = useState(false);
  const [loadreason, setloadreason] = useState(false);

  var t = Math.round((Number(today.getTime()) - Number(job?.time)) / 60000);
  //|| loadJob.title
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
    if (job?.job_type == "hourly") {
      navigate("/SubmitProposals", { state: st });
    } else if (job?.job_type == "fixed") {
      navigate("/SubmitProposalbyfixed", { state: st });
    }
  }

  const [status, setStatus] = useState(state?.status || "");
  console.log(state?.status);
  useEffect(() => {
    if (!jbid && !proposal) {
      navigate("/LatestProposal", { state: state });
    } else if (jbid) {
      getMyProposal({ id: jbid }).then((result) => {
        if (result.data.status === "1") {
          setloadProposal(result.data.desc.data);
          if (status === "") {
            setStatus(result.data.desc?.data?.info?.status);
          }
        }
      });
      getJobById({ id: jbid }).then((result) => {
        if (result.data.status == "1") {
          setloadJob(result.data.desc);
          t = Math.round(
            (Number(today.getTime()) - Number(result.data.desc?.time)) / 60000
          );
          settimepast(
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
          setunit(
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
        }
      });
    }
  }, []);

  function disputed() {
    setLoadingState(true);
    console.log(document.getElementById("disputereason").value);
    raiseDispute({
      proposalid: loadProposal?.info?.from,
      reason: document.getElementById("disputereason").value || "",
      jobID: loadJob.job_id,
      job_title: loadJob.title,
    })
      .then((result) => {
        if (result.data.status == 1) {
          alert("dispute raised");
          setloadreason(false);
        } else {
          alert(result.data.desc);
        }
        setLoadingState(false);
      })
      .catch((err) => {
        console.log(err);
        setLoadingState(false);
      });
  }

  useEffect(() => {
    window.scrollBy(0, 400);
  }, [loadreason]);

  console.log(loadJob);

  return (
    <>
      <p className="jobdetail-box">Job details</p>
      {job?.title || loadJob.title ? (
        <>
          <div className="jobdetail-box">
            <p
              style={{
                fontSize: "1.4rem",
                fontWeight: "500",
                paddingBottom: "1rem",
                borderBottom: "0.05rem solid rgba(0, 0, 0, 0.2)",
              }}
            >
              {job?.title || loadJob.title}
            </p>
            <h4 style={{ color: "#006872", marginTop: "1rem" }}>
              {job?.role || loadJob.role}
            </h4>
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
            <p
              style={{
                marginTop: "2rem",
                fontSize: "1rem",
                marginBottom: "2rem",
                paddingBottom: "2rem",
                borderBottom: "0.05rem solid rgba(0, 0, 0, 0.2)",
              }}
            >
              {job?.details || loadJob?.details}
            </p>

            {job?.job_type == "hourly" || loadJob?.job_type == "hourly" ? (
              <Requestbyhour
                rate={proposal?.hourly_rate || loadProposal?.hourly_rate}
                job={job || loadJob}
                proposal={proposal || loadProposal}
              />
            ) : job?.job_type == "fixed" || loadJob?.job_type == "fixed" ? (
              loadProposal?.milestone || proposal?.milestone ? (
                <RequestMilestone
                  proposal={proposal || loadProposal}
                  job={job || loadJob}
                />
              ) : (
                <RequestComplete
                  rate={proposal?.hourly_rate || loadProposal?.hourly_rate}
                  job={job || loadJob}
                  proposal={proposal || loadProposal}
                />
              )
            ) : (
              ""
            )}
          </div>
          <div
            className="jobdetail-box"
            style={{ display: "flex", gap: "1rem" }}
          >
            <button
              className="request-btn"
              onClick={() => {
                setloadreason(!loadreason);
              }}
              style={{
                background: "#7268",
                color: "#fff",
                border: "none",
                boxShadow: " 0px 4px 4px rgba(0, 0, 0, 0.25)",
                borderRadius: " 0.4rem",
                padding: "0.5rem",
                fontSize: "1rem",
                width: "8rem",
              }}
            >
              Mark Dispute
            </button>
          </div>
          {loadreason && (
            <div
              className="jobdetail-box"
              style={{ display: "flex", flexDirection: "column" }}
            >
              <p>Reason to Raise Dispute</p>
              <textarea
                id="disputereason"
                style={{
                  height: "10rem",
                  width: "50rem",
                  borderRadius: "0.5rem",
                }}
              ></textarea>
              {loadingState && <SpinnerDotted style={{ height: "2rem" }} />}
              {!loadingState && (
                <button
                  className="request-btn"
                  onClick={disputed}
                  style={{
                    background: "#7268",
                    color: "#fff",
                    border: "none",
                    margin: "1rem 0",
                    boxShadow: " 0px 4px 4px rgba(0, 0, 0, 0.25)",
                    borderRadius: " 0.4rem",
                    padding: "0.5rem",
                    fontSize: "1rem",
                    width: "8rem",
                  }}
                >
                  Raise
                </button>
              )}
            </div>
          )}
          <div style={{ display: "flex", height: "1rem" }}></div>
        </>
      ) : (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <SpinnerDotted style={{ height: "2.5rem" }} />
        </div>
      )}
    </>
  );
}

export default RequestAll;
