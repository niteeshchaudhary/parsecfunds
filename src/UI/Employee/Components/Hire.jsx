import React, { useState, useEffect } from "react";

import { useNavigate, useLocation } from "react-router-dom";
import { NavLink } from "react-router-dom";
import dollar from "../../../imges/dollar.svg";
import { getFunctions, httpsCallable } from "firebase/functions";
import app, { db, auth } from "../../../firebase";
const functions = getFunctions(app, "asia-southeast2");
const getUserProfile = httpsCallable(functions, "getUserProfile");
const hireCandidate = httpsCallable(functions, "hireCandidate");
function Hire() {
  const today = new Date();
  const todayDate =
    today.getUTCFullYear() +
    "-" +
    ((today.getUTCMonth() + 1).toString().length == 1 ? "0" : "") +
    (today.getUTCMonth() + 1) +
    "-" +
    today.getUTCDate();
  console.log(todayDate);
  const commonstyle = {
    background: "#FFFFFF",
    boxShadow: " 0rem 0.25rem 0.25rem rgba(0, 0, 0, 0.25)",
    fontSize: "1.4rem",
    margin: "1.5rem",
    borderRadius: "1rem",
    padding: "1rem",
    fontWeight: "600",
    width: "90vw",
  };
  const navigate = useNavigate();
  const { state } = useLocation();
  const job = state?.job;
  const eproposal = state?.proposal;
  const [profile, setProfile] = useState(state?.profile || {});
  useEffect(() => {
    if (!profile?.name) {
      getUserProfile().then((result) => {
        if (result.data.result.status == 1) {
          setProfile(result.data.result.desc);
        }
      });
    }
  });
  const goBack = () => {
    navigate("/ReceiveProposal", { state: state });
  };
  const confirmHire = () => {
    hireCandidate({
      jobID: job.job_id,
      candidate: eproposal?.info?.from,
    }).then((result) => {
      if (result.data.status == 1) {
        navigate("/Edashboard", { state: state });
      }
      console.log(result.data.desc);
    });
  };

  return (
    <>
      <div className="hire">
        <p style={commonstyle}>Hire</p>
        <div
          style={commonstyle}
          className="d-flex flex-row justify-content-start"
        >
          <div className="jobdetail-box-profile ">
            <div className="d-flex flex-row justify-content-start">
              <img
                style={{
                  width: "10.8rem",
                  height: "10.8rem",
                  borderRadius: "1rem",
                }}
                src={eproposal?.user?.pic}
                alt=""
              />
              <div className="content d-flex flex-column justify-content-start align-items-start  mx-5 ">
                <div className="d-flex email-img ">
                  <p
                    style={{
                      marginRight: "0.4rem",
                      fontSize: "1rem",
                      color: "#006872",
                    }}
                  >
                    {eproposal?.user?.name}
                  </p>
                  <img
                    style={{ width: "1rem" }}
                    src={require("../../../imges/emailtick.svg").default}
                    alt=""
                  />
                </div>
                <p
                  style={{ fontWeight: "400", fontSize: "1rem" }}
                  className=" "
                >
                  {eproposal?.user?.title}
                </p>
                {/* <div className="d-flex">
                  <img
                    style={{ width: "0.7rem", marginRight: "0.5rem" }}
                    src={require("../../../imges/location.svg").default}
                    alt=""
                  />
                  <p style={{ fontSize: "1rem", fontWeight: "400" }}>Canada</p>
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div style={commonstyle} className="">
        <p
          style={{
            borderBottom: "0.01rem solid rgba(0,0,0,0.2)",
            paddingBottom: "1rem",
            margin: "1rem",
          }}
        >
          {" "}
          Job detail
        </p>
        <div style={{ padding: "2rem 0" }} className="job-det ">
          <p style={{ fontSize: "1.1rem", margin: "0rem 1rem 0rem 1rem" }}>
            Hiring team
          </p>
          <select
            style={{
              width: "18vw",
              padding: "0.5rem",
              color: "rgba(0,0,0,0.5)",
              margin: "1rem",
              fontSize: "1rem",
              boxSizing: "border-box",
              border: "0.1rem solid rgba(90, 90, 90, 0.4)",
              borderRadius: "0.6rem",
            }}
          >
            <option value={profile?.name}>{profile?.name}</option>
          </select>
          <p style={{ fontSize: "1.1rem", margin: "0rem 1rem 0rem 1rem" }}>
            Project title
          </p>
          <select
            defaultValue={job.title}
            style={{
              width: "18vw",
              padding: "0.5rem ",
              color: "rgba(0,0,0,0.5)",
              margin: "1rem",
              fontSize: "1rem",
              boxSizing: "border-box",
              border: "0.1rem solid rgba(90, 90, 90, 0.4)",
              borderRadius: "0.6rem",
            }}
          >
            <option value={job.title}>{job.title}</option>
          </select>
        </div>
      </div>

      <div style={commonstyle} className="">
        <p
          style={{
            borderBottom: "0.01rem solid rgba(0,0,0,0.2)",
            paddingBottom: "1rem",
            margin: "1rem",
          }}
        >
          {" "}
          Terms
        </p>
        <div style={{ padding: "2rem 0" }} className="job-det ">
          <p style={{ fontSize: "1rem", margin: "0rem 1rem 0rem 1rem" }}>
            Payment Option
          </p>
          <p
            style={{
              fontWeight: "400",
              fontSize: "1rem",
              margin: "0rem 1rem 0rem 1rem",
            }}
          >
            Hourly
          </p>
          <p
            style={{
              fontWeight: "400",
              color: "rgba(0,0,0,0.7)",
              fontSize: "1rem",
              margin: "0rem 1rem 0rem 1rem",
            }}
          >
            Pay for the number of hours worked on a project
          </p>

          <p style={{ fontSize: "1rem", margin: "1rem 1rem 0rem 1rem" }}>
            Pay by the hour
          </p>
          <input
            type="number"
            placeholder="0.0"
            id="hourlyrate_hire"
            className="icoinp"
            defaultValue={eproposal?.hourly_rate}
            min={eproposal?.hourly_rate}
            style={{
              width: "8rem",
              padding: "0.25rem 1rem",
              margin: "1rem",
              height: "3rem",
              textAlign: "center",
              paddingLeft: "1.2rem",
              background: `url(${dollar}) no-repeat left`,
              backgroundImage: `url(${dollar})`,
              backgroundSize: "1rem",
              fontSize: "1rem",
              boxSizing: "border-box",
              border: "0.06rem solid rgba(90, 90, 90, 0.4)",
              borderRadius: "0.8rem",
            }}
          />
          <span style={{ fontSize: "1rem" }}>/hr</span>
          <p
            style={{
              fontWeight: "normal",
              fontSize: "1rem",
              margin: "0rem 1rem 0rem 1rem",
            }}
          >
            {profile?.name}'s proposed rate is ${eproposal?.hourly_rate} /hr
          </p>
          <p style={{ fontSize: "1rem", margin: "1.5rem 1rem 0rem 1rem" }}>
            Start Date{" "}
            {/* <span style={{ color: "rgba(0,0,0,0.7)" }}>(Optional)</span> */}
          </p>
          <input
            type="date"
            min={todayDate}
            defaultValue={todayDate}
            style={{
              width: "18vw",
              textAlign: "center",
              padding: "0.5rem ",
              color: "rgba(0,0,0,0.5)",
              margin: "1rem",
              fontSize: "1rem",
              boxSizing: "border-box",
              border: "0.1rem solid rgba(90, 90, 90, 0.4)",
              borderRadius: "0.6rem",
            }}
          />
        </div>
      </div>

      <div style={commonstyle} className="">
        <p
          style={{
            borderBottom: "0.01rem solid rgba(0,0,0,0.2)",
            paddingBottom: "1rem",
            margin: "1rem",
          }}
        >
          {" "}
          Work details
        </p>
        <div style={{ padding: "2rem 0" }} className="job-det ">
          <p style={{ fontSize: "1rem", margin: "0rem 1rem 0rem 1rem" }}>
            Description
          </p>
          <p
            style={{
              fontWeight: "400",
              fontSize: "1rem",
              margin: "0rem 1rem 0rem 1rem",
            }}
          >
            {job.details}
          </p>
          {/* <div style={{ margin: "1.5rem 1rem 2.5rem 1rem" }} className="">
            <a
              style={{
                padding: "0.3rem 2rem 0.3rem 1rem",
                borderRadius: "0.6rem",
                border: "0.1rem solid rgba(0,0,0,0.4)",
                color: "rgba(0,0,0,0.5)",
                fontSize: "1rem",
                fontWeight: "normal",
              }}
              href="/Hire"
            >
              Attached file
            </a>
          </div> */}

          <input
            style={{ margin: "0rem 0.5rem 0rem 1rem" }}
            type="checkbox"
            name="terms_condition"
            id=""
          />
          <label
            style={{ fontWeight: "400", fontSize: "1rem" }}
            for="terms_condition"
          >
            Yes, I understand and agree to the Terms of Service and Privacy
            Policy.
          </label>
          <div style={{ margin: "3rem 2rem", width: "40vw" }} className="btns ">
            <button
              onClick={goBack}
              style={{
                fontWeight: "600",
                border: "0.05rem solid rgba(0, 0, 0, 0.4)",
                width: "8rem",
                padding: "0.5rem",
                fontSize: "1rem",
                borderRadius: "0.6rem",
                color: "#006872",
                background: "#FFFFFF",
              }}
              type="submit"
            >
              Cancel
            </button>
            <button
              onClick={confirmHire}
              style={{
                marginLeft: "3rem",
                fontWeight: "600",
                border: "0.05rem solid rgba(0, 0, 0, 0.4)",
                width: "8rem",
                padding: "0.5rem",
                fontSize: "1rem",
                borderRadius: "0.6rem",
                background: "#006872",
                color: "#FFFFFF",
              }}
              type="submit"
            >
              Continue
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Hire;
