import React, { useState } from "react";
import { NavLink } from "react-router-dom";

export default function ProposalListItem({ props, gotoProposal, status }) {
  return (
    <div
      style={{ borderBottom: "0.05rem solid rgba(0,0,0,0.3)" }}
      className="d-flex flex-row justify-content-start my-4 pb-4"
    >
      <div className="">
        <p
          style={{
            color: "#006872",
            fontSize: "1.1rem",
            width: "20vw",
            margin: "0",
            fontWeight: "500",
          }}
        >
          {props?.title}
        </p>
        <p style={{ fontSize: "1rem", fontWeight: "normal" }}>
          {" "}
          Est. Budget: $ {props?.budget}{" "}
        </p>
      </div>
      <p
        style={{
          fontSize: "1.1rem",
          margin: "0 15rem",
          fontWeight: "normal",
          width: "20vw",
        }}
      >
        Initiated on {props?.date}
      </p>
      <div
        onClick={() => {
          console.log("plsl ", props?.id);
          gotoProposal({ jbid: props?.id, status });
        }}
        style={{
          cursor: "pointer",
          fontSize: "1rem",
          width: "10vw",
          textDecoration: "none",
          color: "#006872",
          fontWeight: "normal",
        }}
      >
        View Proposal
      </div>
    </div>
  );
}
