import React, { useState } from "react";
import descimg from "../../imges/socialbio.svg";
import { SpinnerDotted } from "spinners-react";
import { useNavigate, useLocation } from "react-router-dom";
import Chips from "./chips";
import "./Resume.css";
import "./chips.css";
import app, { db } from "../../firebase";
import { getFunctions, httpsCallable } from "firebase/functions";

const functions = getFunctions(app, "asia-southeast2");
const addAbout = httpsCallable(functions, "addAbout");

export default function AboutYourself(props) {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [onstate, setonstate] = useState(true);
  const [loadingState, setLoadingState] = useState(false);
  const [error, setError] = useState("");
  function clickhandler(e) {
    setLoadingState(true);
    addAbout(document.getElementById("aboutbox").value).then((result) => {
      if (result.data.status == "1") {
        const profile = state?.profile;
        profile["screen"] = 7;
        props.fun1();
        navigate("/ProfileInfo", { state: { profile: profile } });
      } else {
        alert(result.data.desc);
      }
    });
  }
  var wordLen = 10; // Minimum word length
  function checkWordLen(obj) {
    const value = obj.currentTarget.value;
    const regex = /^[a-zA-Z0-9.'", \n]*$/i;
    var len = obj.currentTarget.value.trim().split(/[\s]+/).length;
    if (obj.currentTarget.value === "") {
      len = 0;
      console.log(1);
      setonstate(true);
    }
    document.getElementById("wordcount").innerHTML = len;
    if (obj.currentTarget.value.length > 700) {
      console.log(3);
      setError("Character length exceed 700");
      setonstate(true);
      return false;
    } else if (len >= wordLen && value.match(regex)) {
      setError("");
      setonstate(false);
      console.log(2);
      // obj.oldValue = obj.value != obj.oldValue ? obj.value : obj.oldValue;
      // obj.value = obj.oldValue ? obj.oldValue : "";
      return true;
    } else if (!value.match(regex)) {
      setError("a-zA-Z0-9.' \", are only allowed");
      setonstate(true);
      console.log(2);
      // obj.oldValue = obj.value != obj.oldValue ? obj.value : obj.oldValue;
      // obj.value = obj.oldValue ? obj.oldValue : "";
      return true;
    } else {
      console.log(5);
      setonstate(true);
    }

    return false;
  }
  // const onBlurValidateFormat =((e)=> {
  //   const value = e.target.value;
  //   const regex = /([a-zA-Z]{4})+-([0-9]{3})+([a-zA-Z]{2})+$/g;
  //   if (!value.match(regex)) {
  //    setError(true);
  //   }
  // });

  return (
    <>
      <div className="main-logr">
        <div
          className="Scroll"
          style={{
            overflow: "auto",
            width: "50%",
            padding: "4% 2% 2% 6%",
            height: "100%",
          }}
        >
          <h1
            style={{
              fontFamily: "PT Serif",
              fontStyle: "normal",
              width: "80%",
              fontWeight: "700",
              fontSize: "1.8rem",
              textAlign: "justify",
              textJustify: "inter-word",
              lineHeight: "2.6rem",
            }}
          >
            Tell us about yourself
          </h1>
          <p
            style={{
              fontStyle: "normal",
              width: "90%",
              fontWeight: "400",
              marginTop: "1%",
              marginBottom: "1%",
              textAlign: "justify",
              textJustify: "inter-word",
              fontSize: "1.1rem",
              lineHeight: "1.5rem",
            }}
          >
            What kind of job do you enjoy doing the most? Use paragraphs or
            bullet points to clearly communicate with them.
          </p>
          <textarea
            onChange={checkWordLen}
            id="aboutbox"
            style={{
              width: "90%",
              padding: "0.8rem 1rem",
              minHeight: "15rem",
              margin: "0.3rem 0px 0.1rem 0",
              fontSize: "1.3rem",
              boxSizing: "border-box",
              border: "0.1rem solid rgba(90, 90, 90, 0.4)",
              borderRadius: "1rem",
            }}
          ></textarea>
          <div style={{ display: "flex", width: "90%" }}>
            <p
              style={{
                textAlign: "left",
                width: "70px",
                fontStyle: "normal",
                fontWeight: "500",
                fontSize: "1rem",
                lineHeight: "2.3rem",
                letterSpacing: "0.2px",
                color: "rgba(0, 0, 0, 0.4)",
              }}
            >
              Words :
            </p>
            <p
              id="wordcount"
              style={{
                textAlign: "left",
                width: "40%",
                fontStyle: "normal",
                fontWeight: "500",
                fontSize: "0.9rem",
                lineHeight: "2.3rem",
                letterSpacing: "0.2px",
                color: "rgba(0, 0, 0, 0.4)",
              }}
            >
              0
            </p>
            <p style={{ color: "red" }}>{error}</p>
            <p
              style={{
                textAlign: "right",
                width: "50%",
                fontStyle: "normal",
                fontWeight: "500",
                fontSize: "0.9rem",
                lineHeight: "2.3rem",
                letterSpacing: "0.2px",
                color: "rgba(0, 0, 0, 0.4)",
              }}
            >
              At least {wordLen} words
            </p>
          </div>
        </div>
        <div className="rightbarr">
          <img src={descimg} className="imglog1r" alt="desc img"></img>
        </div>
      </div>
      <div style={{ height: "10vh" }}>
        <progress
          id="progr"
          value="70"
          max="100"
          style={{
            accentColor: "#FFC727",
            height: "0.26rem",
            width: "100%",
          }}
        >
          70%
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
              id="submitbutton"
              className="btn btn-primary"
              disabled={onstate}
              onClick={clickhandler}
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
