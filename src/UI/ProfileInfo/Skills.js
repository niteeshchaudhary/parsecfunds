import React, { useState, useEffect } from "react";
import descimg from "../../imges/skills.svg";
import { SpinnerDotted } from "spinners-react";
import { useNavigate, useLocation } from "react-router-dom";
import Chips from "./chips";
import "./Resume.css";
import "./chips.css";
import app, { db } from "../../firebase";
import { getFunctions, httpsCallable } from "firebase/functions";
import { ref, getDatabase } from "firebase/database";
import { useList } from "react-firebase-hooks/database";

const functions = getFunctions(app, "asia-southeast2");
const addSkills = httpsCallable(functions, "addSkills");

const database = getDatabase();
export default function Skills(props) {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [loadingState, setLoadingState] = useState(false);
  const [onstate, setonstate] = useState(true);
  const [chipsarr, setchipsarr] = useState([]);
  const [skills, loading, snperror] = useList(ref(database, "skills"));
  // const suggestions = ["Java", "Kobol", "programming", "javaScript", "React"];

  function clickhandler(e) {
    setLoadingState(true);
    addSkills(chipsarr).then((result) => {
      if (result.data.status == 1) {
        const profile = state?.profile;
        profile["screen"] = 6;
        props.fun1();
        navigate("/ProfileInfo", { state: { profile: profile } });
      } else {
        alert(result.data.desc);
      }
      setLoadingState(false);
    });
  }
  function chipadder(e) {
    //document.querySelector("#chipholder");
    if (
      e.key == "Enter" ||
      skills
        .flat()
        .map((x) => x.val())
        .includes(e.currentTarget.value)
    ) {
      console.log(e.currentTarget.value);
      if (!chipsarr.includes(e.currentTarget.value) && chipsarr.length < 5) {
        setchipsarr(
          [...chipsarr, e.currentTarget.value],
          (e.currentTarget.value = "")
        );

        setonstate(false);
      } else {
        e.currentTarget.value = "";
      }

      //  if(chipsarr.length>4){
      //   setonstate(true);
      //   console.log("2",chipsarr.length);
      //  }
      //  else{
      //   setonstate(false);
      //  }
    }
    console.log("outside");
    console.log(chipsarr);
  }
  function removeChips(e, text) {
    e.currentTarget.parentElement.style.display = "none";
    console.log(text);
    setchipsarr(
      chipsarr.filter((x) => x !== text),
      (e.currentTarget.value = "")
    );
    console.log(chipsarr.length);
  }

  return (
    <>
      <div className="main-logr">
        <div
          className="Scroll"
          style={{
            overflow: "auto",
            width: "60%",
            padding: "4% 2% 2% 5%",
            height: "100%",
          }}
        >
          <h1
            style={{
              fontFamily: "PT Serif",
              fontStyle: "normal",
              fontWeight: "700",
              fontSize: "1.8rem",
              textAlign: "justify",
              textJustify: "inter-word",
              lineHeight: "2.5rem",
            }}
          >
            Now, Share your skills.
          </h1>
          <p
            style={{
              fontStyle: "normal",
              width: "80%",
              fontWeight: "400",
              marginTop: "1%",
              marginBottom: "1%",
              textAlign: "justify",
              textJustify: "inter-word",
              fontSize: "1.1rem",
              lineHeight: "1.4rem",
            }}
          >
            The skills section shows employers you have the abilities required
            to succeed in the role. Often, employers pay special attention to
            the skills section to determine who should move on to the next step.
          </p>
          <div
            className="text-container"
            style={{ margin: "1.2rem 0px 1.8rem 0" }}
          >
            <input
              type="text"
              list="programmingLanguages"
              placeholder="Ex. UI/UX, Web Design"
              onChange={chipadder}
              name="prog_lang"
              style={{
                width: "80%",
                padding: "0.2rem 1.1rem",
                height: "3rem",
                fontSize: "1.1rem",
                boxSizing: "border-box",
                border: "0.1rem solid rgba(90, 90, 90, 0.4)",
                borderRadius: "1.1rem",
              }}
            />
            <datalist id="programmingLanguages">
              {skills.map((sugg, index) => (
                <option value={sugg.val()} key={index}>
                  {sugg.val()}
                </option>
              ))}
            </datalist>
            <p style={{ width: "80%", textAlign: "right" }}>Max 5 skills</p>
          </div>
          <div
            id="chipholder"
            style={{
              display: "flex",
              flexDirection: "row",
              flexWrap: "wrap",
              width: "80%",
              justifyContent: "center",
            }}
          >
            {chipsarr.map((skl) => (
              <Chips removeChips={removeChips} text={skl} key={skl} />
            ))}
          </div>
        </div>
        <div className="rightbarr" style={{ width: "40%" }}>
          <img src={descimg} className="imglog1r" alt="desc img"></img>
        </div>
      </div>
      <div style={{ height: "10vh" }}>
        <progress
          id="progr"
          value="60"
          max="100"
          style={{
            accentColor: "#FFC727",
            height: "0.22rem",
            width: "100%",
          }}
        >
          60%
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
