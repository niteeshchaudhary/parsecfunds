import React, { useState, useEffect } from "react";
import resumeimg from "../../imges/workexp.svg";
import { SpinnerDotted } from "spinners-react";
import { useNavigate, useLocation } from "react-router-dom";
import travelimg from "../../imges/travel.svg";
import Lodash from "lodash";
import penimg from "../../imges/pen.svg";
import Dustbin from "./dustbin";
import Card from "./card";
import WorkExp from "./WorkExp";
import Sqcard from "./Sqcard";
import Sqcard2 from "./Sqcard2";
import "./Resume.css";
import app, { db } from "../../firebase";
import { getFunctions, httpsCallable } from "firebase/functions";

const functions = getFunctions(app, "asia-southeast2");
const getWorkExperience = httpsCallable(functions, "getWorkExperience");
const deleteWorkExperience = httpsCallable(functions, "deleteWorkExperience");
const nextScreen = httpsCallable(functions, "nextScreen");

var counter = 1;
export default function WorkExpadder(props) {
  const navigate = useNavigate();
  const [loadingState, setLoadingState] = useState(false);
  const { state } = useLocation();
  const [worklist, setworklist] = useState(state?.list ? state.list : []);
  const profile = state?.profile;
  const [loadstatus, setloadstatus] = useState(true);
  const time = new Date();
  console.log("addder", state);

  function clickhandler(e) {
    setLoadingState(true);
    nextScreen().then((result) => {
      if (result.data.status == 1) {
        profile["screen"] = 3;
        navigate("/ProfileInfo", { state: { profile: profile } });
        props.fun1();
      } else {
        setLoadingState(false);
        alert(result.data.desc);
      }
    });
  }

  function removeExp(e) {
    e.currentTarget.parentElement.style.display = "none";
    // const time_ =
    //   e.currentTarget.parentElement.children[1].children[2].innerHTML;
    // const thiselement = {
    //   title: e.currentTarget.parentElement.children[1].children[0].innerHTML,
    //   company: e.currentTarget.parentElement.children[1].children[1].innerHTML,
    //   startdate: time_.split(" - ")[0],
    //   enddate: time_.split(" - ")[1],
    //   time: time_,
    // };
    if (e.currentTarget.parentElement.children[1].children[4].innerHTML) {
      const id =
        e.currentTarget.parentElement.children[1].children[4].innerHTML;
      //thiselement["id"] =id;
      deleteWorkExperience({
        id: id,
      });
      console.log(id);
      const arr = worklist.filter((x) => x.id !== id);
      console.log("del ", arr);
      setworklist(arr);
      navigate("/ProfileInfo", { state: { profile: profile } });
    }
  }

  function updateExp(e) {
    const time_ =
      e.currentTarget.parentElement.parentElement.children[1].children[3]
        .innerHTML;
    const thiselement = {
      title:
        e.currentTarget.parentElement.parentElement.children[1].children[0]
          .innerHTML,
      company:
        e.currentTarget.parentElement.parentElement.children[1].children[1]
          .innerHTML,
      location:
        e.currentTarget.parentElement.parentElement.children[1].children[2]
          .innerHTML,
      startdate: time_.split(" - ")[0],
      enddate: time_.split(" - ")[1],
      time: time_,
    };
    if (
      e.currentTarget.parentElement.parentElement.children[1].children[4]
        .innerHTML
    ) {
      const id =
        e.currentTarget.parentElement.parentElement.children[1].children[4]
          .innerHTML;
      thiselement["id"] = id;
      console.log(id);
      navigate("/ProfileInfo/wadder", {
        state: { profile: profile, list: worklist, element: thiselement },
      });
    }
  }

  function addbutton() {
    navigate("./wadder", { state: { profile: profile, list: worklist } });
  }

  if (!loadstatus && counter === 1 && !state?.element) {
    setTimeout(() => {
      if (!loadstatus && counter === 1) {
        getWorkExperience().then((result) => {
          console.log(result);
          if (result.data.result.status === 1) {
            const arr = Object.values(result.data.result.desc);
            if (arr.length < worklist.length) {
              setworklist(worklist);
              setloadstatus(false);
            } else {
              setworklist(arr);
              setloadstatus(true);
              counter = 2;
              console.log(loadstatus, "yeh");
            }
          }
          return null;
        });
      }
    }, 3000);
  }
  useEffect(() => {
    getWorkExperience().then((result) => {
      counter = 1;
      console.log(result);
      if (result.data.result.status === 1 && !state?.element) {
        const arr = Object.values(result.data.result.desc);
        //console.log(arr.filter((x) => !edulist.includes(x)))
        if (arr.length < worklist.length) {
          setworklist(worklist);
          setloadstatus(false);
        } else {
          setworklist(arr);
          setloadstatus(true);
        }
      }
      return null;
    });
  }, []);

  // if (!loadstatus) {
  //   getWorkExperience().then((result) => {
  //     console.log(result);
  //     if (result.data.result.status === 1) {
  //       const arr = Object.values(result.data.result.desc);
  //       setloadstatus(true);
  //       setworklist(...worklist, arr);
  //     }
  //     return null;
  //   });
  // }
  // if (worklist.length === 0) {
  //   setTimeout(() => {
  //     getWorkExperience().then((result) => {
  //       console.log(result);
  //       if (result.data.result.status === 1) {
  //         const arr = Object.values(result.data.result.desc);
  //         setloadstatus(true);
  //         setworklist(...worklist, arr);
  //       }
  //       return null;
  //     });
  //   }, 3000);
  // }
  return (
    <>
      <div
        style={{
          display: "flex",
          height: "75vh",
          overflow: "hidden",
          margin: "0 0 0 0",
        }}
      >
        <div
          className="Scroll"
          style={{
            overflow: "auto",
            width: "50%",
            padding: "2% 2% 2% 4%",
            height: "100%",
          }}
        >
          <h1
            style={{
              width: "100%",
              fontFamily: "roboto",
              fontStyle: "normal",
              fontWeight: "700",
              fontSize: "1.8rem",
              textAlign: "justify",
              textJustify: "inter-word",
            }}
          >
            Add relevant work experience here if you have it.
          </h1>
          <p
            style={{
              width: "100%",
              fontFamily: "Roboto",
              fontStyle: "normal",
              fontWeight: "400",
              marginTop: "2%",
              marginBottom: "4%",
              textAlign: "justify",
              textJustify: "inter-word",
              fontSize: "1.1rem",
            }}
          >
            Experienced freelancers are twice as likely to be hired. You can
            still develop a terrific profile if you're just starting off. Simply
            go to the next page.
          </p>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              width: "95%",
            }}
          >
            {worklist.map((exp, index) => {
              return exp.id ? (
                <Sqcard
                  image={travelimg}
                  title={exp.title}
                  mid={exp.company}
                  loc={exp.location}
                  time={exp.time}
                  id={exp.id}
                  editfunction={updateExp}
                  function={removeExp}
                  key={exp.id}
                />
              ) : (
                <Sqcard2
                  image={travelimg}
                  title={exp.title}
                  mid={exp.company}
                  time={exp.time}
                  id={""}
                  key={index}
                />
              );
            })}

            <button
              onClick={addbutton}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                marginLeft: "1rem",
                borderRadius: "50%",
                height: "3rem",
                width: "3rem",
                background: "#fff",
                border: "0.15rem solid #006872",
                marginTop: "8%",
                // paddingTop: "-10px",
                fontSize: "1.5rem",
                color: "#006872",
                fontWeight: "650",
              }}
            >
              +
            </button>
          </div>
        </div>
        <div className="rightbarr">
          <img src={resumeimg} className="imglog1r" alt="resume"></img>
        </div>
      </div>
      <div>
        <progress
          id="progr"
          value="30"
          max="100"
          style={{
            accentColor: "#FFC727",
            height: "0.26rem",
            width: "100%",
          }}
        >
          30%
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
