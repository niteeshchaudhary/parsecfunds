import React from "react";
import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";

import { ref, getDatabase } from "firebase/database";
import { useList } from "react-firebase-hooks/database";
import { useNavigate, useLocation } from "react-router-dom";
import "./Service.css";

const database = getDatabase();
function Service() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const profile = state?.profile;
  console.log(profile);

  function toTesting(e) {
    const service = e.currentTarget.children[1].innerText;
    console.log(service);
    navigate("/Testing", {
      state: { profile: profile, edata: { service: service } },
    });
  }
  function toForensic(e) {
    const service = e.currentTarget.children[1].innerText;
    console.log(service);
    navigate("/Forensic", {
      state: { profile: profile, edata: { service: service } },
    });
  }
  function toConsultancy(e) {
    const service = e.currentTarget.children[1].innerText;
    console.log(service);
    navigate("/Consultancy", {
      state: { profile: profile, edata: { service: service } },
    });
  }
  function toSubCat(e) {
    const service = e.currentTarget.children[1].innerText;
    console.log(service);
    navigate("/subcategories", {
      state: { profile: profile, edata: { service: service } },
    });
  }

  return (
    <>
      <div className="wrap-it">
        <h1 className="" style={{ fontWeight: "bold" }}>
          We provide a number of popular
          <br /> services.
        </h1>
        {/* <input className="mt-5 searchicon" type="text" placeholder="Search" /> */}
        <div className="d-flex mt-4">
          {/* {category.map((items,index)=>{
            console.log(items.name);
            <div key={index} style={{ cursor: "pointer" }}>
            <div className="dropshadow-box" onClick={toOther}>
              <img src={require("../../../imges/IT.svg").default} alt="" />
              <h5>{items.name}</h5>
              console.log({items.name});
            </div>
          </div>
          })} */}
          <div style={{ cursor: "pointer" }}>
            <div className="dropshadow-box" onClick={toTesting}>
              <img src={require("../../../imges/testing.svg").default} alt="" />
              <h5 style={{ textAlign: "center" }}>
                Vulnerability accessment & penetration testing
              </h5>
            </div>
          </div>

          <div style={{ cursor: "pointer" }}>
            <div className="dropshadow-box" onClick={toForensic}>
              <img
                src={require("../../../imges/forensic.svg").default}
                alt=""
              />
              <h5>Forensic</h5>
            </div>
          </div>
          <div style={{ cursor: "pointer" }}>
            <div className="dropshadow-box" onClick={toConsultancy}>
              <img
                src={require("../../../imges/consultancy.svg").default}
                alt=""
              />
              <h5>Consultancy</h5>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Service;
