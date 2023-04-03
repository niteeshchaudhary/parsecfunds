import React, { useState } from "react";
import resumeimg from "../../imges/preflang.svg";
import Card from "./card";
import "./Resume.css";
import { SpinnerDotted } from "spinners-react";
import { useNavigate, useLocation } from "react-router-dom";
import app, { db } from "../../firebase";

import { getFunctions, httpsCallable } from "firebase/functions";

const functions = getFunctions(app, "asia-southeast2");
const addPrefferedLanguage = httpsCallable(functions, "addPrefferedLanguage");

var count = 1;
export default function PreferedLang(props) {
  const [card, setcard] = useState(["a"]);
  const [loadingState, setLoadingState] = useState(false);
  const { state } = useLocation();
  const navigate = useNavigate();
  function clickhandler(e) {
    const arr = document.getElementById("cardholder");
    const data = [];
    setLoadingState(true);
    Array.prototype.forEach.call(arr.children, (child) => {
      if (child.style.display !== "none") {
        data.push({
          Language: child.children[0].value,
          level: child.children[1].value,
        });
      }
    });
    addPrefferedLanguage(data).then((result) => {
      if (result.data.status == 1) {
        const profile = state?.profile;
        profile["screen"] = 5;
        props.fun1();
        navigate("/ProfileInfo", { state: { profile: profile } });
      } else {
        alert(result.data.desc);
      }
      setLoadingState(false);
    });
  }
  function removeLang(e) {
    e.currentTarget.parentElement.style.display = "none";
    document.getElementById("langadder").style.display = "flex";
    if (count > 0) {
      count--;
    }
    console.log(count);
  }
  function addLang(e) {
    if (count < 3) {
      count++;
      setcard([...card, "a"]);
    }
    if (count === 3) {
      e.currentTarget.style.display = "none";
    }
    console.log(count);
  }
  return (
    <>
      <div className="main-logr">
        <div
          className="Scroll"
          style={{
            overflow: "auto",
            width: "50%",
            padding: "5% 2% 2% 6%",
            height: "100%",
          }}
        >
          <h1
            style={{
              width: "90%",
              fontFamily: "PT Serif",
              fontStyle: "normal",
              fontWeight: "700",
              fontSize: "1.9rem",
              textAlign: "justify",
              textJustify: "inter-word",
              lineHeight: "2.5rem",
            }}
          >
            What are your preferred languages?
          </h1>
          <p
            style={{
              width: "90%",
              fontFamily: "Roboto",
              fontStyle: "normal",
              fontWeight: "400",
              marginTop: "3%",
              marginBottom: "3%",
              textAlign: "justify",
              textJustify: "inter-word",
              fontSize: "1rem",
              lineHeight: "1.5rem",
            }}
          >
            Telling us the languages that you are proficient in speaking, will
            help us match you with proficient clients.
          </p>
          <div id="cardholder">
            {card.map((abc, index) => (
              <Card function={removeLang} key={index} />
            ))}
          </div>
          <div
            onClick={addLang}
            id="langadder"
            style={{ display: "flex", cursor: "pointer", width: "50%" }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: "50%",
                height: "3rem",
                width: "3rem",
                border: "0px",
                background: "#006872",
                alignSelf: "middle",
                fontSize: "2rem",
                color: "#fff",
                fontWeight: "400",
              }}
            >
              +
            </div>
            <p
              style={{
                fontSize: "1.1rem",
                fontWeight: "500",
                margin: "0.6rem 0px 0px 0.7rem",
              }}
            >
              Add languages
            </p>
          </div>
        </div>
        <div className="rightbarr">
          <img src={resumeimg} className="imglog1r" alt="resume"></img>
        </div>
      </div>
      <div>
        <progress
          id="progr"
          value="50"
          max="100"
          style={{
            accentColor: "#FFC727",
            height: "0.26rem",
            width: "100%",
          }}
        >
          50%
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
              onClick={clickhandler}
              className="btn btn-primary"
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
