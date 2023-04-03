import React, { useState, useEffect } from "react";
import { SpinnerDotted } from "spinners-react";
import ERequestMilestone from "./ERequestMilestone";
import "../Jobdetails.css";
import { useNavigate, useLocation } from "react-router-dom";
import ERequestHourly from "./ERequestHourly";

import app, { db } from "../../../../firebase";
import { getFunctions, httpsCallable } from "firebase/functions";
import { storage, auth } from "../../../../firebase";

const functions = getFunctions(app, "asia-southeast2");
const getProposal = httpsCallable(functions, "getProposal");
const getJobById = httpsCallable(functions, "getJobById");
const raiseDispute = httpsCallable(functions, "raiseDispute");

function ERequestMoney() {
  const navigate = useNavigate();
  const { state } = useLocation();

  const [progress, setProgress] = useState(0);
  const [close, setclose] = useState(0);
  const [loadingState, setLoadingState] = useState(false);
  const [loadreason, setloadreason] = useState(false);

  const job = state?.job;
  var today = new Date();
  const profile = state?.profile;
  const proposal = state?.proposal;
  const jbid = state?.jbid;
  console.log(proposal, jbid, job);

  const [loadJob, setloadJob] = useState(job || {});
  const [loadProposal, setloadProposal] = useState(proposal || {});

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

  const [status, setStatus] = useState(state?.status || "");
  console.log(state?.status);
  useEffect(() => {
    window.scrollBy(0, 400);
  }, [loadreason]);
  useEffect(() => {
    if (!job) {
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
    if (jbid || loadJob?.job_id) {
      getProposal({
        id: jbid || job?.job_id || loadJob?.job_id,
        proposalid: job?.to || loadJob?.to,
      }).then((result) => {
        console.log(result.data);
        if (result.data.status === "1") {
          setloadProposal(result.data.desc.data);
          if (status === "") {
            setStatus(result.data.desc?.data?.info?.status);
          }
        }
      });
    } else if (jbid) {
      navigate("/PostedJob", { state: state });
    }
  }, []);
  console.log(loadJob);

  return (
    <>
      <p className="jobdetail-box">Job details</p>
      {job?.title || loadJob?.title ? (
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
                src={require("../../../../imges/worldwide.svg").default}
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

            {/* <RequestMoney /> */}
            {/* <ERequestMilestone/> */}
            {loadProposal?.milestone ? (
              <ERequestMilestone proposal={loadProposal} />
            ) : loadProposal?.hourly_rate ? (
              <ERequestHourly proposal={loadProposal} />
            ) : (
              <SpinnerDotted style={{ height: "2.5rem" }} />
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
              {loadreason ? "Cancel" : "Mark Dispute"}
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

export default ERequestMoney;
