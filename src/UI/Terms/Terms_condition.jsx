import React from "react";
import { useState } from "react";
import DirectContract from "./DirectContract";
import HireTerms from "./HireTerms";
import TermsOfService from "./TermsOfService";
import TermsOfUse from "./TermsOfUse";
import UserAgreement from "./UserAgreement";

function Terms_condition() {
  const [UserAgreements, setUserAgreements] = useState(false);
  const [TermsUse, setTermsUse] = useState(false);

  const [DirectContracts, setDirectContracts] = useState(false);
  const [HireTerm, setHireTerm] = useState(false);
  const [TermsService, setTermsService] = useState(true);
  const commonStyle = {
    background: "#FFFFFF",
    padding: "1rem",
    margin: "1rem",
    boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
    borderRadius: "0.6rem",
  };
  return (
    <>
      <div style={commonStyle} className="">
        <p style={{ fontWeight: "600", fontSize: "1.2rem" }}>
          Terms & conditions
        </p>
      </div>
      <div style={{ display: "flex", flexDirection: "row" }} className="flexit">
        <div style={commonStyle} className="">
          <div style={{ width: "20vw", padding: "2rem" }} className="left">
            <p
              onClick={() => {
                setHireTerm(false);
                setDirectContracts(false);
                setTermsService(true);
                setUserAgreements(false);
                setTermsUse(false);
              }}
              style={{
                cursor: "pointer",
                color: TermsService ? "#006872" : "",
              }}
            >
              Terms of Service
            </p>
            <p
              onClick={() => {
                setHireTerm(false);
                setDirectContracts(false);
                setTermsService(false);
                setUserAgreements(true);
                setTermsUse(false);
              }}
              style={{
                cursor: "pointer",
                color: UserAgreements ? "#006872" : "",
              }}
            >
              User Agreement
            </p>
            <p
              onClick={() => {
                setHireTerm(false);
                setDirectContracts(false);
                setTermsService(false);
                setUserAgreements(false);
                setTermsUse(true);
              }}
              style={{ cursor: "pointer", color: TermsUse ? "#006872" : "" }}
            >
              Terms of use
            </p>
            <p
              onClick={() => {
                setHireTerm(false);
                setDirectContracts(true);
                setTermsService(false);
                setUserAgreements(false);
                setTermsUse(false);
              }}
              style={{
                cursor: "pointer",
                color: DirectContracts ? "#006872" : "",
              }}
            >
              Direct contracts terms
            </p>
            <p
              onClick={() => {
                setHireTerm(true);
                setDirectContracts(false);
                setTermsService(false);
                setUserAgreements(false);
                setTermsUse(false);
              }}
              style={{ cursor: "pointer", color: HireTerm ? "#006872" : "" }}
            >
              Any hire terms
            </p>
          </div>
        </div>
        {TermsService && <TermsOfService />}
        {UserAgreements && <UserAgreement />}
        {TermsUse && <TermsOfUse />}
        {DirectContracts && <DirectContract />}
        {HireTerm && <HireTerms />}
      </div>
    </>
  );
}

export default Terms_condition;
