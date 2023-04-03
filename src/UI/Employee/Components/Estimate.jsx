import React from "react";
import Userdiv from "./Userdiv";
import "./estimate.css";

import { NavLink } from "react-router-dom";
import { useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
function Estimate() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [onstate, setonstate] = useState(true);
  function check() {
    const scope = document.getElementsByName("scope");
    const entry = document.getElementsByName("entry");
    if (!scope.value && !entry.value) {
      setonstate(false);
    }
  }
  function toOther() {
    const timeduration = document.querySelector(
      'input[name="scope"]:checked'
    ).value;
    const level = document.querySelector('input[name="lvl"]:checked').value;
    console.log(timeduration, level);
    state.edata["timeduration"] = timeduration;
    state.edata["level"] = level;
    console.log(state.edata);
    navigate("/EProfiledetails", {
      state: { profile: state?.profile, edata: state.edata },
    });
  }
  function toOtherback() {
    const timeduration = document.querySelector(
      'input[name="scope"]:checked'
    ).value;
    const level = document.querySelector('input[name="lvl"]:checked').value;
    console.log(timeduration, level);
    state.edata["timeduration"] = timeduration;
    state.edata["level"] = level;
    console.log(state.edata);
    navigate("/addskill", {
      state: { profile: state?.profile, edata: state?.edata },
    });
  }

  return (
    <>
      <div className="d-flex justify-content-around">
        <div className="estimate-wrap">
          <h1 className="mt-5">
            Estimate the scope of your <br /> project.
          </h1>
          <h5 className="mt-5">
            How long will it take you to complete your project?
          </h5>
          <div className="radio mb-5 d-flex flex-column">
            <label>
              <input
                className="mt-1"
                type="radio"
                value="More than 6 months"
                name="scope"
                defaultChecked
              />{" "}
              More than 6 months
            </label>
            <label>
              <input
                className="mt-1"
                type="radio"
                value="3 to 6 months"
                name="scope"
              />{" "}
              3 to 6 months
            </label>
            <label>
              <input
                className="mt-1"
                type="radio"
                value="1 to 3 months"
                name="scope"
              />{" "}
              1 to 3 months
            </label>
          </div>

          <h5>What level of experience is required?</h5>
          <div className="radio mb-5 d-flex flex-column">
            <label>
              <input
                className="mt-1"
                type="radio"
                value="entry"
                name="lvl"
                defaultChecked
              />{" "}
              Entry
            </label>
            <label>
              <input
                className="mt-1"
                type="radio"
                value="intermediate"
                name="lvl"
              />{" "}
              Intermediate
            </label>
            <label>
              <input className="mt-1" type="radio" value="expert" name="lvl" />{" "}
              Expert
            </label>
          </div>

          <div className="button-wrap">
            <div onClick={toOtherback} style={{ cursor: "pointer" }}>
              <button className="btn btn-back">Back</button>
            </div>
            <div onClick={toOther} style={{ cursor: "pointer" }}>
              <button className="btn btn-next">Next</button>
            </div>
          </div>
        </div>
        <Userdiv />
      </div>
    </>
  );
}

export default Estimate;
