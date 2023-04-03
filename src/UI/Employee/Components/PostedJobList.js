import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

export default function PostJobList({ data }) {
  const postedcss = {
    background:
      " linear-gradient(180deg, #FFFFFF 0%, rgba(255, 255, 255, 0) 100%)",
    border: "0.1rem solid rgba(0, 0, 0, 0.3)",
    filter: " drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))",
    fontSize: "1rem",
    width: "70vw",
    borderRadius: "1rem",
    padding: "1.5rem",
    margin: "1rem",
  };
  const proposalcount = {
    background:
      " linear-gradient(180deg, #FFFFFF 0%, rgba(255, 255, 255, 0) 100%)",
    border: "0.1rem solid rgba(0, 0, 0, 0.3)",
    filter: " drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))",
    cursor: "pointer",
    width: "15vw",
    textAlign: "center",
    borderRadius: "1rem",
    padding: "3.6rem",
    margin: "1rem",
  };
  const { state } = useLocation();
  const navigate = useNavigate();
  function gotoProposals() {
    const info = state || {};
    info["job"] = data;
    navigate("/ReceiveProposal", { state: info });
  }
  function gotoJob() {
    const info = state || {};
    info["job"] = data;
    info["returnback"] = "/Postedjob";
    navigate("/EJobdetails", { state: info });
  }

  function gotoHiredProposals() {
    const info = state || {};
    info["job"] = data;
    info["jbid"] = data.job_id;
    navigate("/ERequests", { state: info });
  }

  function gotoEditJob() {
    const info = state || {};
    info["job"] = data;
    info["jbid"] = data.job_id;
    navigate("/UpdatePostedjob", { state: info });
  }

  return (
    <div className="d-flex flex-row justify-content-start">
      <div className="postedjob-wrapper">
        <div
          style={postedcss}
          className=" d-flex flex-row justify-content-between"
        >
          <div className="">
            <div className="d-flex email-img mx-2">
              <h5 style={{ fontWeight: "600", marginRight: "0.3rem" }}>
                {data?.title}
              </h5>
              <img
                style={{ width: "1.2rem" }}
                src={require("../../../imges/emailtick.svg").default}
                alt=""
              />
            </div>
            <h6 style={{ color: "#006872" }} className="mx-2 ">
              {data?.role}
            </h6>
            <div className="d-flex flex-row justify-content-start m-1 mx-2">
              <img
                style={{ width: "1.1rem", marginRight: "0.5rem" }}
                src={require("../../../imges/basic_level.svg").default}
                alt=""
              />
              <p>{data?.level}</p>
            </div>
            <div className="d-flex flex-row justify-content-start m-1 mx-2">
              <img
                style={{ width: "1.2rem", marginRight: "0.5rem" }}
                src={require("../../../imges/jobtype.svg").default}
                alt=""
              />
              <p>Job type: {data?.job_type}</p>
            </div>
            <div className="d-flex flex-row justify-content-start m-1 mx-2">
              <img
                style={{
                  width: "0.8rem",
                  marginLeft: "0.2rem",
                  marginRight: "0.6rem",
                }}
                src={require("../../../imges/location.svg").default}
                alt=""
              />
              <p>{data?.location || "Remote"}</p>
            </div>
          </div>
          <div className="buttons d-flex flex-row">
            <button
              onClick={gotoJob}
              style={{
                width: "7vw",
                fontSize: "1rem",
                padding: "0.5rem",
                background: "#006872",
                color: "white",
                margin: "1rem 0.5rem",
                border: "none",
                boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
                borderRadius: "0.4rem",
              }}
              className="btn"
            >
              View{" "}
            </button>
            <button
              onClick={() => gotoEditJob()}
              style={{
                width: "7vw",
                fontSize: "1rem",
                padding: "0.5rem",
                background: "#C7C7C7",
                color: "white",
                margin: "1rem 0.5rem",
                border: "none",
                boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
                borderRadius: "0.4rem",
              }}
              className="btn btn-primary"
            >
              Edit job
            </button>
          </div>
        </div>
      </div>
      {data?.status == "new" ? (
        <div
          style={proposalcount}
          onClick={() => gotoProposals()}
          className="proposals-count d-flex flex-column align-items-center justify-content-center"
        >
          <p style={{ color: "#006872" }}>{data?.bidc}</p>
          <p style={{ fontSize: "1.1rem", color: "#000000B2" }}>Proposals</p>
        </div>
      ) : data?.status == "hired" ? (
        <div
          style={proposalcount}
          onClick={() => gotoHiredProposals()}
          className="proposals-count d-flex flex-column align-items-center justify-content-center"
        >
          <p style={{ color: "#006872", fontSize: "1.5rem" }}>Check Status</p>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
