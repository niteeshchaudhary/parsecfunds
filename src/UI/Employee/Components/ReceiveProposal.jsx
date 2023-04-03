import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { getFunctions, httpsCallable } from "firebase/functions";
import { useNavigate, useLocation } from "react-router-dom";

import { SpinnerDotted } from "spinners-react";
import ProposalProfileList from "./ProposalProfileList";
import app from "../../../firebase";

const functions = getFunctions(app, "asia-southeast2");
const getReceivedProposal = httpsCallable(functions, "getReceivedProposal");

function ReceiveProposal() {
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
  const { state } = useLocation();
  const navigate = useNavigate();
  const job = state?.job;
  const [loadingState, setLoadingState] = useState(true);
  const [allProposals, setAllProposals] = useState(
    JSON.parse(localStorage.getItem(job?.job_id + "Pro")) || []
  );

  const gotoEjobdetail = () => {
    var info = state || {};
    info["job"] = job;
    info["returnback"] = "/ReceiveProposal";
    navigate("/EJobdetails", { state: info });
  };
  const gotoChats = (data, job) => {
    var info = state || {};
    info["job"] = job;
    info["proposal"] = data;
    navigate("/chats", { state: info });
  };
  const gotoHire = (data, job) => {
    var info = state || {};
    info["job"] = job;
    info["proposal"] = data;
    navigate("/hire", { state: info });
  };
  useEffect(() => {
    getReceivedProposal({ id: job?.job_id }).then((result) => {
      if (result.data.status == 1) {
        setAllProposals(Object.values(result?.data?.desc));
        localStorage.setItem(
          job?.job_id + "Pro",
          JSON.stringify(Object.values(result?.data?.desc))
        );
      } else {
        alert("Something went Wrong");
        console.log(result.data.result.desc);
      }
      setLoadingState(false);
    });
  }, []);
  return (
    <>
      <div className="jobdetail-box">
        <div className="d-flex flex-row justify-content-between align-items-center">
          <p
            style={{ fontSize: "1.4rem", fontWeight: "600", padding: "0.8rem" }}
          >
            Job details
          </p>
          <div
            onClick={() => gotoEjobdetail()}
            style={{
              cursor: "pointer",
              color: "#006872",
              fontWeight: "600",
              fontSize: "1rem",
              borderBottom: "0.1rem solid #006872 ",
            }}
          >
            View details
          </div>
        </div>
        <p style={{ fontSize: "1rem", color: "#006872", fontWeight: "600" }}>
          {job?.title}
        </p>
        <p style={{ fontSize: "1rem" }}>{job?.details}</p>
      </div>
      <div className="jobdetail-box">
        <p style={{ fontSize: "1.4rem", fontWeight: "600", padding: "0.8rem" }}>
          Received Proposals
        </p>
        {allProposals.map((pro, index) => (
          <ProposalProfileList
            data={pro.data}
            key={index}
            job={job}
            gotoChats={gotoChats}
            gotoHire={gotoHire}
          />
        ))}
        {loadingState ? (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
              alignItems: "center",
              height: "5rem",
            }}
          >
            <SpinnerDotted style={{ height: "3rem" }} />
          </div>
        ) : (
          ""
        )}
        {allProposals.length == 0 && !loadingState ? (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
              alignItems: "center",
              height: "5rem",
            }}
          >
            <h5> You don't have any proposal yet</h5>
          </div>
        ) : (
          ""
        )}
      </div>
    </>
  );
}

export default ReceiveProposal;
