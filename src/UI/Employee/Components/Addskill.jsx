import React, { useState } from "react";
import descimg from "../../../imges/skills.svg";
import Chips from "../../ProfileInfo/chips";
import "../../ProfileInfo/Resume.css";
import "../../ProfileInfo/chips.css";
import "../Services/Service.css";
import app, { db } from "../../../firebase";
import { ref, getDatabase } from "firebase/database";
import { useList } from "react-firebase-hooks/database";
import { getFunctions, httpsCallable } from "firebase/functions";
import Userdiv from "../Components/Userdiv";

import { useNavigate, useLocation } from "react-router-dom";

const database = getDatabase();
export default function Addskill(props) {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [chipsarr, setchipsarr] = useState([]);
  const [onstate, setonstate] = useState(true);
  const [suggestions, loading, snperror] = useList(ref(database, "skills"));

  function chipadder(e) {
    //document.querySelector("#chipholder");
    if (
      e.key == "Enter" ||
      suggestions.map((ele) => ele.val()).includes(e.currentTarget.value)
    ) {
      console.log(e.currentTarget.value);
      setonstate(false);
      if (!chipsarr.includes(e.currentTarget.value) && chipsarr.length < 5) {
        setchipsarr(
          [...chipsarr, e.currentTarget.value],
          (e.currentTarget.value = "")
        );
      } else {
        e.currentTarget.value = "";
      }
      console.log(chipsarr);
    }
  }
  function removeChips(e, text) {
    e.currentTarget.parentElement.style.display = "none";
    console.log(text);
    setchipsarr(
      chipsarr.filter((x) => x !== text),
      (e.currentTarget.value = "")
    );
    setonstate(false);
  }
  function toOther(e) {
    // const subservice = e.currentTarget.children[1].innerText;
    // console.log(subservice);
    state.edata["skills"] = chipsarr;
    console.log(state?.edata);
    navigate("/estimate_project", {
      state: { profile: state?.profile, edata: state?.edata },
    });
  }
  return (
    <>
      <div className="d-flex flex-row justify-content-around">
        <div className="d-flex flex-column">
          <div className="main-logr">
            <div
              className="Scroll"
              style={{
                overflow: "auto",
                minWidth: "50%",
                width: "50rem",
                padding: "4% 2% 2% 6%",
                height: "100%",
              }}
            >
              <h1
                style={{
                  fontFamily: "PT Serif",
                  fontStyle: "normal",
                  marginTop: "4rem",
                  marginBottom: "2rem",
                  fontWeight: "700",
                  textAlign: "justify",
                  textJustify: "inter-word",
                  lineHeight: "44px",
                }}
              >
                To see relevant talent, add skills.
              </h1>
              {/* <p
            style={{
              fontStyle: "normal",
              width: "80%",
              fontWeight: "400",
              marginTop: "1%",
              marginBottom: "1%",
              textAlign: "justify",
              textJustify: "inter-word",
              fontSize: "19px",
              lineHeight: "25px",
            }}
          >
            The skills section shows employers you have the abilities required
            to succeed in the role. Often, employers pay special attention to
            the skills section to determine who should move on to the next step.
          </p> */}
              {/* <input
                className="mt-5 searchicon"
                type="text"
                placeholder="Search"
              /> */}
              <div
                className="text-container"
                style={{ margin: "20px 0px 30px 0" }}
              >
                <input
                  type="text"
                  list="programmingLanguages"
                  placeholder="Ex. UI/UX, Web Design"
                  onChange={chipadder}
                  style={{
                    width: "40rem",
                    padding: "0.2rem 1.5rem",
                    height: "3rem",
                    fontSize: "1.1rem",
                    boxSizing: "border-box",
                    border: "0.1rem solid rgba(90, 90, 90, 0.4)",
                    borderRadius: "1rem",
                  }}
                />
                <datalist id="programmingLanguages">
                  {suggestions.map((sugg, index) => (
                    <option value={sugg.val()} key={index}>
                      {sugg.val()}
                    </option>
                  ))}
                </datalist>
                <p style={{ width: "80%", textAlign: "right" }}>Max 5 skills</p>
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
          </div>
          <button
            type="submit"
            className="btn btn-primary"
            disabled={onstate}
            onClick={toOther}
            style={{
              width: "25%",
              height: "3rem",
              background: "#006872",
              marginLeft: "75%",
              boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
              borderRadius: "1rem",
            }}
          >
            Next
          </button>
        </div>
        {/* <progress
          id="progr"
          value="80"
          max="100"
          style={{
            accentColor: "#FFC727",
            height: "5px",
            width: "100%",
          }}
        >
          80%
        </progress> */}
        <Userdiv />
      </div>
    </>
  );
}
