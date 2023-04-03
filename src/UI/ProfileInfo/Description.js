import React, { useState, useEffect } from "react";
import descimg from "../../imges/desc.svg";
import { SpinnerDotted } from "spinners-react";
import Chips from "./chips";
import "./Resume.css";
import "./chips.css";
import app from "../../firebase";
import { getFunctions, httpsCallable } from "firebase/functions";
import { ref, getDatabase } from "firebase/database";
import { useList } from "react-firebase-hooks/database";
const functions = getFunctions(app, "asia-southeast2");
const addTitle = httpsCallable(functions, "addTitle");

const database = getDatabase();
export default function Description(props) {
  const [loadingState, setLoadingState] = useState(false);
  const [snapshots, loading, error] = useList(ref(database, "title"));
  const [onstate, setonstate] = useState(true);
  const [suggestions, setsuggestions] = useState(
    snapshots.flat().map((vl) => vl.val()) || []
  );

  useEffect(() => {
    setsuggestions(snapshots.flat().map((vl) => vl.val()));
  }, [snapshots]);
  function clickhandler(e) {
    var ttl = document.getElementById("selecttitle").value;
    if (ttl != null && ttl != "") {
      setLoadingState(true);
      addTitle({ title: ttl }).then((result) => {
        console.log("*************************");
        if (result.data.status == 1) {
          props.fun1();
        } else {
          alert(result.data.desc);
          setLoadingState(false);
        }
      });
    }
  }

  return (
    <>
      <div className="main-logr">
        <div
          className="Scroll"
          style={{
            overflow: "auto",
            width: "50%",
            padding: "7% 2% 2% 6%",
            height: "100%",
          }}
        >
          <h1
            style={{
              fontFamily: "PT Serif",
              fontStyle: "normal",
              fontWeight: "700",
              fontSize: "2.3rem",
              textAlign: "justify",
              textJustify: "inter-word",
              lineHeight: "2.5rem",
            }}
          >
            Add a title to describe what you do.
          </h1>
          <p
            style={{
              fontStyle: "normal",
              width: "80%",
              fontWeight: "400",
              marginTop: "3%",
              marginBottom: "3%",
              textAlign: "justify",
              textJustify: "inter-word",
              fontSize: "1.1rem",
              lineHeight: "1.3rem",
            }}
          >
            Make it count because it's the first thing clients see. Make your
            expertise stand out by describing it in your own words.
          </p>
          <div className="text-container">
            <input
              type="text"
              list="suggestion"
              id="selecttitle"
              placeholder="Ex. Graphic designer"
              disabled={loadingState}
              onChange={(e) => {
                e.currentTarget.value != ""
                  ? setonstate(false)
                  : setonstate(true);
              }}
              style={{
                width: "80%",
                padding: "1rem 1.2rem",
                height: "3rem",
                margin: "1.3rem 0px 2rem 0",
                fontSize: "1rem",
                boxSizing: "border-box",
                border: "0.02rem solid rgba(90, 90, 90, 0.4)",
                borderRadius: "1rem",
              }}
            />
            <datalist id="suggestion">
              {suggestions.map((sugg, index) => (
                <option value={sugg} key={index}>
                  {sugg}
                </option>
              ))}
            </datalist>
          </div>
          {/* <input
            type="text"
            id="exampleInputtags"
            aria-describedby="emailHelp"
            placeholder="Ex. Graphic designer"
            style={{
              width: "70%",
              padding: "12px 20px",
              height: "60px",
              margin: "20px 0px 30px 0",
              fontSize: "22px",
              boxSizing: "border-box",
              border: "2px solid rgba(90, 90, 90, 0.4)",
              borderRadius: "20px",
            }}
          /> */}
        </div>
        <div className="rightbarr">
          <img src={descimg} className="imglog1r" alt="desc img"></img>
        </div>
      </div>
      <div style={{ height: "10vh" }}>
        <progress
          id="progr"
          value="16"
          max="100"
          style={{
            accentColor: "#FFC727",
            height: "0.26rem",
            width: "100%",
          }}
        >
          16%
        </progress>
        <div
          style={{
            display: "flex",
            height: "3.1rem",
            justifyContent: "right",
            paddingRight: "10%",
          }}
        >
          {loadingState && <SpinnerDotted />}
          {!loadingState && (
            <button
              type="submit"
              className="btn btn-primary"
              onClick={clickhandler}
              disabled={onstate}
              style={{
                width: "15%",
                height: "3rem",
                background: "#006872",
                boxShadow: "0px 0.2rem 0.2rem rgba(0, 0, 0, 0.25)",
                borderRadius: "2rem",
              }}
            >
              Next
            </button>
          )}
        </div>
      </div>
    </>
  );
}
