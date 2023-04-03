import React from "react";
import { NavLink } from "react-router-dom";

import { useNavigate, useLocation } from "react-router-dom";

function Forensic() {
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
          We provide a number of popular <br /> services.
        </h1>
        {/* <input className="mt-5 searchicon" type="text" placeholder="Search" /> */}
        <div style={{ fontSize: "1rem", fontWeight: "normal" }} className="">
          <p>
            <span style={{ color: "#006872", fontWeight: "600" }}>
              Categories:
            </span>
            {""}
            {state?.edata?.service}
          </p>
        </div>
        <div className="d-flex flex-wrap mt-4">
          <div style={{ cursor: "pointer" }}>
            <div className="dropshadow-box-1" onClick={toOther}>
              <img
                src={require("../../../imges/blockchain.svg").default}
                alt=""
              />
              <h5>Block Chain</h5>
            </div>
          </div>
          <div style={{ cursor: "pointer" }}>
            <div className="dropshadow-box-1" onClick={toOther}>
              <img
                src={require("../../../imges/sc_forensic.svg").default}
                alt=""
              />
              <h5>Service forensics</h5>
            </div>
          </div>
          <div style={{ cursor: "pointer" }}>
            <div className="dropshadow-box-1" onClick={toOther}>
              <img
                src={require("../../../imges/email_forensic.svg").default}
                alt=""
              />
              <h5>Email forensics</h5>
            </div>
          </div>
          <div style={{ cursor: "pointer" }}>
            <div className="dropshadow-box-1" onClick={toOther}>
              <img
                src={require("../../../imges/logo_forensic.svg").default}
                alt=""
              />
              <h5>Logo forensics</h5>
            </div>
          </div>
          <div style={{ cursor: "pointer" }}>
            <div className="dropshadow-box-1" onClick={toOther}>
              <img src={require("../../../imges/cloud.svg").default} alt="" />
              <h5>Cloud</h5>
            </div>
          </div>
          <div style={{ cursor: "pointer" }}>
            <div className="dropshadow-box-1" onClick={toOther}>
              <img src={require("../../../imges/mobile.svg").default} alt="" />
              <h5>Mobile</h5>
            </div>
          </div>
          <div style={{ cursor: "pointer" }}>
            <div className="dropshadow-box-1" onClick={toOther}>
              <img src={require("../../../imges/web.svg").default} alt="" />
              <h5>Desktop/Laptop</h5>
            </div>
          </div>
          <div style={{ cursor: "pointer" }}>
            <div className="dropshadow-box-1" onClick={toOther}>
              <img src={require("../../../imges/custom.svg").default} alt="" />
              <h5>Custom/Other</h5>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Forensic;
