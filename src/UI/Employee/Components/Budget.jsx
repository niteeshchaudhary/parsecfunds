import React, { useState } from "react";
import "./budget.css";
import Userdiv from "./Userdiv";
import app, { db } from "../../../firebase";
import { useNavigate, useLocation } from "react-router-dom";
import { getFunctions, httpsCallable } from "firebase/functions";

const functions = getFunctions(app, "asia-southeast2");
const setRequirements = httpsCallable(functions, "setRequirements");

function Budget() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [show, setshow] = useState(true);
  const [show1, setshow1] = useState(false);
  const change = () => {
    setshow(true);
    setshow1(false);
  };
  const changeAgain = () => {
    setshow(false);
    setshow1(true);
  };
  function numOnly(e) {
    var key = e.key.match("[^0-9]");

    if (!key || e.key === "Backspace") {
      console.log(e.key);
      return true;
    }
    e.preventDefault();
  }
  function toOther() {
    if (show) {
      const sbudget = Number(document.getElementById("sdata").value);
      const ebudget = Number(document.getElementById("edata").value);
      if (sbudget <= ebudget) {
        console.log(sbudget, ebudget);
        state.edata["sbudget"] = sbudget;
        state.edata["ebudget"] = ebudget;
        state.edata["budget"] = sbudget + "-" + ebudget;
        setRequirements(state.edata);
        console.log(state.edata);
        navigate("/Postjob", {
          state: { profile: state?.profile, edata: state.edata },
        });
      } else {
        alert("to should be greater than from");
      }
    } else {
      const fbudget = document.getElementById("fdata").value;
      if (fbudget > 0) {
        console.log(fbudget);
        state.edata["fbudget"] = fbudget;
        state.edata["budget"] = fbudget;
        setRequirements(state.edata);
        console.log(state.edata);
        navigate("/Postjob", {
          state: { profile: state?.profile, edata: state.edata },
        });
      } else {
        alert("Enter value greater than 0");
      }
    }
  }

  return (
    <>
      <div className="budget-wrap">
        <div className="budget-container">
          <h3>Add a Budget, for your project</h3>
          <div className="d-flex flex-row">
            <button
              onClick={change}
              className="hourly-rate-label"
              style={{
                backgroundColor: show1 ? "#fff" : "#006872",
                color: show1 ? "#006872" : "#fff",
              }}
              htmlFor=""
            >
              Hourly Rate
            </button>
            <button
              onClick={changeAgain}
              className="hourly-rate-label"
              style={{
                backgroundColor: show1 ? "#006872" : "#fff",
                color: show1 ? "#fff" : "#006872",
              }}
              htmlFor=""
            >
              Fixed Rate
            </button>
          </div>
          {show1 ? (
            <div className="fixed-rating">
              <div className="d-flex justify-center align-items-center">
                <div className="hourly-input-img">
                  <span>
                    <img
                      style={{ padding: "0.2rem 0.5rem" }}
                      src={
                        require("../../../imges/currency-dollar.svg").default
                      }
                      alt=""
                    />
                  </span>
                  <input
                    className=" "
                    onKeyDown={(e) => {
                      return numOnly(e);
                    }}
                    id="fdata"
                    type="text"
                    placeholder="0.00"
                  />
                </div>
                {/* <h5>/hr</h5> */}
              </div>
            </div>
          ) : null}
          {show ? (
            <div className="hourly-rating">
              <h5>From</h5>
              <div className="d-flex justify-center align-items-center">
                <div className="hourly-input-img">
                  <span>
                    <img
                      style={{ padding: "0.2rem 0.5rem" }}
                      src={
                        require("../../../imges/currency-dollar.svg").default
                      }
                      alt=""
                    />
                  </span>

                  <input
                    className=" "
                    id="sdata"
                    onKeyDown={(e) => {
                      return numOnly(e);
                    }}
                    type="text"
                    placeholder="0.00"
                  />
                </div>
                <h5>/hr</h5>
              </div>
              <h5>To</h5>
              <div className="d-flex justify-center align-items-center">
                <div className="hourly-input-img">
                  <span>
                    <img
                      style={{ padding: "0.2rem 0.5rem" }}
                      src={
                        require("../../../imges/currency-dollar.svg").default
                      }
                      alt=""
                    />
                  </span>

                  <input
                    className=" "
                    onKeyDown={(e) => {
                      return numOnly(e);
                    }}
                    id="edata"
                    type="text"
                    placeholder="0.00"
                  />
                </div>
                <h5>/hr</h5>
              </div>
            </div>
          ) : null}
          <h5 style={{ marginTop: "3rem" }}>
            <input type="checkbox" name="budget_not_set" />
            <label
              style={{
                fontSize: "1.1rem",
                marginLeft: "0.5rem",
                fontWeight: "normal",
              }}
              for="budget_not_set"
            >
              Not ready to set a budget?
            </label>
          </h5>
          <button onClick={toOther} className="btn-proposal btn " type="submit">
            Post Job
          </button>
        </div>
        <Userdiv />
      </div>
    </>
  );
}

export default Budget;
