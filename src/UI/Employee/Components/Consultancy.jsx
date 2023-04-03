import React from "react";
import { NavLink } from "react-router-dom";

import { useNavigate, useLocation } from "react-router-dom";

function Consultancy() {
  const navigate = useNavigate();
  const { state } = useLocation();

  function toOther(e) {
    const subservice = e.currentTarget.children[1].innerText;
    console.log(subservice);
    state.edata["subservice"] = subservice;
    console.log(state.edata);
    navigate("/addskill", {
      state: { profile: state?.profile, edata: state.edata },
    });
  }
  return (
    <>
      <div className="wrap-it">
        <h1 className="" style={{ fontWeight: "bold", width: "55vw" }}>
          We provide a number of popular
          <br /> services.
        </h1>
        {/* <input className="mt-5 searchicon" type="text" placeholder="Search" /> */}
        <div style={{ fontSize: "1.2rem", fontWeight: "600" }} className="">
          <p style={{ fontSize: "1rem", fontWeight: "normal" }}>
            <span style={{ color: "#006872", fontWeight: "600" }}>
              Categories:
            </span>
            {""}
            {state?.edata?.service}
          </p>
        </div>
        <div className="d-flex flex-wrap mt-4">
          <div style={{ cursor: "pointer" }}>
            <div className="dropshadow-box-1 mx-5" onClick={toOther}>
              <img
                src={require("../../../imges/blockchain.svg").default}
                alt=""
              />
              <h5>Block Chain</h5>
            </div>
          </div>
          <div style={{ cursor: "pointer" }}>
            <div className="dropshadow-box-1 mx-5" onClick={toOther}>
              <img src={require("../../../imges/appsec.svg").default} alt="" />
              <h5>Appsec</h5>
            </div>
          </div>
          <div style={{ cursor: "pointer" }}>
            <div className="dropshadow-box-1 mx-5" onClick={toOther}>
              <img
                src={require("../../../imges/IOT_embedded.svg").default}
                alt=""
              />
              <h5>IOT & Embedded System</h5>
            </div>
          </div>
          <div style={{ cursor: "pointer" }}>
            <div className="dropshadow-box-1 mx-5" onClick={toOther}>
              <img src={require("../../../imges/cloud.svg").default} alt="" />
              <h5>Cloud & Network</h5>
            </div>
          </div>
          <div style={{ cursor: "pointer" }}>
            <div className="dropshadow-box-1 mx-5" onClick={toOther}>
              <img
                src={require("../../../imges/embedded.svg").default}
                alt=""
              />
              <h5>Embedded System</h5>
            </div>
          </div>
          <div style={{ cursor: "pointer" }}>
            <div className="dropshadow-box-1 mx-5" onClick={toOther}>
              <img src={require("../../../imges/custom.svg").default} alt="" />
              <h5>Custom/Other</h5>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Consultancy;
