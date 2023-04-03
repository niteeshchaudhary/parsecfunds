import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { getFunctions, httpsCallable } from "firebase/functions";
import { useNavigate, useLocation } from "react-router-dom";
import { SpinnerDotted } from "spinners-react";
import ProposalListItem from "./ProposalListItem";

import app from "../../../firebase";

const functions = getFunctions(app, "asia-southeast2");
const getMyProposals = httpsCallable(functions, "getMyProposals");

function LatestProposal() {
  const commonstyle = {
    background: "#FFFFFF",
    boxShadow: " 0rem 0.25rem 0.25rem rgba(0, 0, 0, 0.25)",
    fontSize: "1.4rem",
    margin: "1rem",
    borderRadius: "1rem",
    padding: "1rem",
    fontWeight: "600",
    width: "97vw",
  };
  const [loadingState, setLoadingState] = useState(true);
  const [allProposals, setAllProposals] = useState([]);
  const [rejectedProposals, setRejectedProposals] = useState([]);
  const [activeProposals, setActiveProposals] = useState([]);
  const [submittedProposals, setSubmittedProposals] = useState([]);
  const { state } = useLocation();
  const navigate = useNavigate();
  const gotoProposal = (e) => {
    var info = state || {};
    console.log(state, e);
    info["jbid"] = e?.jbid;
    info["status"] = e.status;
    if (e.status == "active") {
      navigate("/RequestMoney", { state: info });
    } else {
      navigate("/Proposal", { state: info });
    }
  };
  useEffect(() => {
    getMyProposals().then((result) => {
      console.log(result);
      if (result.data.status === "1") {
        setAllProposals(Object.values(result.data.desc));
        setActiveProposals(
          Object.values(result.data.desc).filter((e) => e.status === "active")
        );
        setRejectedProposals(
          Object.values(result.data.desc).filter((e) => e.status === "rejected")
        );
        setSubmittedProposals(
          Object.values(result.data.desc).filter((e) => e.status === "submit")
        );
      }
      setLoadingState(false);
    });
  }, []);
  return (
    <>
      <p style={commonstyle}>My proposals</p>
      {loadingState ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            alignItems: "center",
            height: "20rem",
          }}
        >
          <SpinnerDotted style={{ height: "3rem" }} />
        </div>
      ) : (
        <>
          {activeProposals.length != 0 ? (
            <div style={commonstyle} className="">
              <p>
                Active proposals{" "}
                <span style={{ marginLeft: "1rem" }}>
                  ({activeProposals.length})
                </span>{" "}
              </p>
              <div
                style={{
                  borderBottom: "0.05rem solid rgba(0,0,0,0.3)",
                  margin: "1rem 0",
                  width: "100%",
                }}
                className="line"
              ></div>
              {activeProposals.map((data, index) => (
                <ProposalListItem
                  props={data}
                  key={index}
                  gotoProposal={gotoProposal}
                  status={"active"}
                />
              ))}
            </div>
          ) : (
            ""
          )}
          {submittedProposals.length != 0 ? (
            <div style={commonstyle} className="">
              <p>
                Submitted proposals{" "}
                <span style={{ marginLeft: "1rem" }}>
                  ({submittedProposals.length})
                </span>{" "}
              </p>
              <div
                style={{
                  borderBottom: "0.05rem solid rgba(0,0,0,0.3)",
                  margin: "1rem 0",
                  width: "100%",
                }}
                className="line"
              ></div>
              {submittedProposals.map((data, index) => (
                <ProposalListItem
                  props={data}
                  key={index}
                  gotoProposal={gotoProposal}
                  status={"submit"}
                />
              ))}
            </div>
          ) : (
            ""
          )}
          {rejectedProposals.length != 0 ? (
            <div style={commonstyle} className="">
              <p>
                Rejected proposals{" "}
                <span style={{ marginLeft: "1rem" }}>
                  ({rejectedProposals.length})
                </span>{" "}
              </p>
              <div
                style={{
                  borderBottom: "0.05rem solid rgba(0,0,0,0.3)",
                  margin: "1rem 0",
                  width: "100%",
                }}
                className="line"
              ></div>
              {rejectedProposals.map((data, index) => (
                <ProposalListItem
                  props={data}
                  key={index}
                  gotoProposal={gotoProposal}
                  status={"rejected"}
                />
              ))}
            </div>
          ) : (
            ""
          )}
          {allProposals.length != 0 ? (
            <div style={commonstyle} className="">
              <p>
                All proposals{" "}
                <span style={{ marginLeft: "1rem" }}>
                  ({allProposals.length})
                </span>{" "}
              </p>
              <div
                style={{
                  borderBottom: "0.05rem solid rgba(0,0,0,0.3)",
                  margin: "1rem 0",
                  width: "100%",
                }}
                className="line"
              ></div>
              {allProposals.map((data, index) => (
                <ProposalListItem
                  props={data}
                  key={index}
                  gotoProposal={gotoProposal}
                />
              ))}
            </div>
          ) : (
            <div style={commonstyle} className="">
              <h6>"You haven't Submitted any Proposal yet!"</h6>
            </div>
          )}
        </>
      )}
    </>
  );
}

export default LatestProposal;
