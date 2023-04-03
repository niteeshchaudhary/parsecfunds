import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useNavigate, useLocation } from "react-router-dom";
import { storage, auth } from "../../../firebase";

export default function ProposalProfileList({
  data,
  job,
  gotoChats,
  gotoHire,
}) {
  const profilebox = {
    width: "60%",
    height: "10rem",
    background: "#FFFFFF",
    boxShadow:
      "0px 0.25rem 0.25rem rgba(0, 0, 0, 0.25), 0px 4px 4px rgba(0, 0, 0, 0.25)",
    borderRadius: "1rem",
    fontSize: "1.8rem",
    margin: "1rem 0.5rem",
    padding: " 0rem",
  };
  const threebox = {
    width: "13vw",
    height: "10rem",
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    alignItems: "center",
    background: "#FFFFFF",
    boxShadow:
      "0px 0.25rem 0.25rem rgba(0, 0, 0, 0.25), 0px 4px 4px rgba(0, 0, 0, 0.25)",
    borderRadius: "1rem",

    margin: "1rem 0.5rem",
    padding: " 0rem",
  };
  const navigate = useNavigate();
  const { state } = useLocation();

  function gotoProposal() {
    const info = state || {};
    navigate("/ViewProposal", {
      state: { ...info, job: job, jbid: job.job_id, proposal: data },
    });
  }
  function getfile() {
    const downloadTask = storage
      .ref(
        `file/${auth.currentUser.email}/${job.job_id}/${data.info.from}/${job.file_name}`
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

  return (
    <div className="d-flex flex-row">
      <div style={profilebox} className="jobdetail-box-profile ">
        <div className="d-flex flex-row justify-content-start">
          <img
            style={{ width: "10.8rem", height: "9.9rem", borderRadius: "1rem" }}
            src={data?.user?.pic}
            alt=""
          />
          <div className="content d-flex flex-column justify-content-start align-items-start  mx-5 ">
            <div className="d-flex email-img ">
              <p
                style={{
                  marginRight: "0.4rem",
                  fontSize: "1rem",
                  width: "9vw",
                }}
              >
                {data?.user?.name}
              </p>
              <img
                style={{ width: "1rem" }}
                src={require("../../../imges/emailtick.svg").default}
                alt=""
              />
            </div>
            <p
              style={{
                fontWeight: "600",
                fontSize: "1rem",
                color: "#006872",
              }}
              className=" "
            >
              {data?.user?.title}
            </p>
            <p style={{ fontSize: "1rem" }}>
              {/* 0.0/5 <span style={{ color: "#006872" }}>(No feedback)</span> */}
              &nbsp;
            </p>
          </div>
          <div
            onClick={() => gotoChats(data, job)}
            style={{
              width: "15%",
              height: "2.6rem",
              background: "#006872",
              color: "white",
              cursor: "pointer",
              marginLeft: "0rem",
              boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
              borderRadius: "0.4rem",
            }}
            className="btn btn-primary"
          >
            Chat
          </div>
          <div
            onClick={() => gotoHire(data, job)}
            style={{
              width: "15%",
              height: "2.6rem",
              color: "white",
              cursor: "pointer",
              background: "#006872",
              marginLeft: "1rem",
              boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
              borderRadius: "0.4rem",
            }}
            className="btn btn-primary"
          >
            Hire
          </div>
        </div>
      </div>
      <div style={threebox} className="three-boxes">
        {job.job_type == "fixed" ? (
          <>
            <p style={{ fontSize: "1.2rem", fontWeight: "600" }}>
              ${data.hourly_rate}
            </p>
            <p style={{ color: "#006872", fontSize: "0.8rem" }}>
              Expected Time: {data.expected_time}
            </p>
          </>
        ) : job.job_type == "hourly" ? (
          <>
            <p style={{ fontSize: "1.2rem", fontWeight: "600" }}>
              ${data.hourly_rate}/hr
            </p>

            <p style={{ color: "#006872", fontSize: "0.8rem" }}>
              Expected Time: {data.expected_time || job.duration}
            </p>
          </>
        ) : (
          ""
        )}
      </div>
      <div
        onClick={gotoProposal}
        style={{ ...threebox, cursor: "pointer" }}
        className="three-boxes"
      >
        <img
          style={{ width: "2.5rem" }}
          src={require("../../../imges/cover_letter.svg").default}
          alt=""
        />
        <p style={{ color: "#006872", fontSize: "0.8rem" }}>Show Proposal</p>
      </div>
      {data?.documentPath != "" ? (
        <div
          onClick={getfile}
          style={{ ...threebox, cursor: "pointer" }}
          className="three-boxes"
        >
          <img
            style={{ width: "2.5rem" }}
            src={require("../../../imges/attachment.svg").default}
            alt=""
          />
          <p style={{ color: "#006872", fontSize: "0.8rem" }}>files attached</p>
        </div>
      ) : (
        <div style={threebox} className="three-boxes">
          <img
            style={{ width: "2.5rem" }}
            src={require("../../../imges/attachment.svg").default}
            alt=""
          />
          <p style={{ color: "#006872", fontSize: "0.8rem" }}>
            No file attached
          </p>
        </div>
      )}
    </div>
  );
}
