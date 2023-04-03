import React, { useState, useEffect } from "react";
import noteimg from "../../imges/note.svg";
import { SpinnerDotted } from "spinners-react";
import { useNavigate, useLocation } from "react-router-dom";
import classroomimg from "../../imges/classroom.svg";
import penimg from "../../imges/pen.svg";
import Dustbin from "./dustbin";
import Card from "./card";
import Lodash from "lodash";
import Sqcard from "./Sqcard";
import Sqcard2 from "./Sqcard2";
import "./Resume.css";
import app, { db } from "../../firebase";
import { getFunctions, httpsCallable } from "firebase/functions";

const functions = getFunctions(app, "asia-southeast2");
const getEducation = httpsCallable(functions, "getEducation");
const deleteEducation = httpsCallable(functions, "deleteEducation");
const nextScreen = httpsCallable(functions, "nextScreen");

var count = 1;
export default function Educationadder(props) {
  const navigate = useNavigate();
  const [loadingState, setLoadingState] = useState(false);
  const { state } = useLocation();
  const [edulist, setedulist] = useState(state?.list ? state.list : []);
  const profile = state?.profile;
  const [loadstatus, setloadstatus] = useState(true);
  const time = new Date();

  function clickhandler(e) {
    setLoadingState(true);

    nextScreen().then((result) => {
      if (result.data.status == 1) {
        profile["screen"] = 4;
        props.fun1();
        navigate("/ProfileInfo", { state: { profile: profile } });
      } else {
        setLoadingState(false);
        alert(result.data.desc);
      }
    });
  }
  function removeEdu(e) {
    e.currentTarget.parentElement.style.display = "none";
    // const time_ =
    //   e.currentTarget.parentElement.children[1].children[2].innerHTML;
    // const thiselement = {
    //   institute:
    //     e.currentTarget.parentElement.children[1].children[0].innerHTML,
    //   degree: e.currentTarget.parentElement.children[1].children[1].innerHTML,
    //   startdate: time_.split(" - ")[0],
    //   enddate: time_.split(" - ")[1],
    //   time: time_,
    // };
    if (e.currentTarget.parentElement.children[1].children[4].innerHTML) {
      const id =
        e.currentTarget.parentElement.children[1].children[4].innerHTML;
      // thiselement["id"] = id;
      deleteEducation({
        id: id,
      });
      console.log(id);
      const arr = edulist.filter((x) => x.id !== id);
      console.log("delet", arr);
      setedulist(arr);
      navigate("/ProfileInfo", { state: { profile: profile } });
    }
  }

  function updateEdu(e) {
    const time_ =
      e.currentTarget.parentElement.parentElement.children[1].children[3]
        .innerHTML;
    const thiselement = {
      institute:
        e.currentTarget.parentElement.parentElement.children[1].children[0]
          .innerHTML,
      degree:
        e.currentTarget.parentElement.parentElement.children[1].children[1]
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
      navigate("/ProfileInfo/eadder", {
        state: { profile: profile, list: edulist, element: thiselement },
      });
    }
  }

  function addbutton() {
    navigate("./eadder", { state: { profile: profile, list: edulist } });
    //props.fun2()
  }
  if (!loadstatus && count === 1 && !state?.element) {
    setTimeout(() => {
      if (!loadstatus && count === 1) {
        getEducation().then((result) => {
          console.log(result);
          if (result.data.result.status === 1) {
            const arr = Object.values(result.data.result.desc);
            console.log(arr.length === edulist.length, loadstatus);

            if (arr.length < edulist.length) {
              setedulist(edulist);
              setloadstatus(false);
            } else {
              setloadstatus(true);
              setedulist(arr);
              count = 2;
              console.log(loadstatus, "yeh");
            }
          }
          return null;
        });
      }
    }, 3000);
  }
  useEffect(() => {
    getEducation().then((result) => {
      count = 1;
      console.log(result);
      if (result.data.result.status === 1 && !state?.element) {
        const arr = Object.values(result.data.result.desc);
        //console.log(arr.filter((x) => !edulist.includes(x)))
        console.log(arr.length);
        if (arr.length < edulist.length) {
          setedulist(edulist);
          setloadstatus(false);
        } else {
          setedulist(arr);
          setloadstatus(true);
        }
      }
      return null;
    });
  }, []);

  // if (!loadstatus) {
  //   getEducation().then((result) => {
  //     console.log(result);
  //     if (result.data.result.status === 1) {
  //       const arr = Object.values(result.data.result.desc);
  //       setloadstatus(true);
  //       setedulist(...edulist, arr);
  //     }
  //     return null;
  //   });
  // }
  // if (edulist.length === 0) {
  //   setTimeout(() => {
  //     getEducation().then((result) => {
  //       console.log(result);
  //       if (result.data.result.status === 1) {
  //         const arr = Object.values(result.data.result.desc);
  //         setloadstatus(true);
  //         setedulist(...edulist, arr);
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
              width: "95%",
              fontFamily: "PT Serif",
              fontStyle: "normal",
              fontWeight: "700",
              fontSize: "1.8rem",
              textAlign: "justify",
              textJustify: "inter-word",
              lineHeight: "2.8rem",
            }}
          >
            Add your education here
          </h1>
          <p
            style={{
              width: "95%",
              fontFamily: "Roboto",
              fontStyle: "normal",
              fontWeight: "400",
              marginTop: "2%",
              marginBottom: "4%",
              textAlign: "justify",
              textJustify: "inter-word",
              fontSize: "1.1rem",
              lineHeight: "1.6rem",
            }}
          >
            You don't need a college degree. Including any relevant education
            enhances the visibility of your profile.
          </p>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              width: "95%",
            }}
          >
            {edulist.map((edu, index) => {
              return edu.id ? (
                <Sqcard
                  image={noteimg}
                  title={edu.institute}
                  mid={edu.degree}
                  time={edu.time}
                  id={edu.id}
                  editfunction={updateEdu}
                  function={removeEdu}
                  key={edu.id}
                />
              ) : (
                <Sqcard2
                  image={noteimg}
                  title={edu.institute}
                  mid={edu.degree}
                  time={edu.time}
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
                paddingTop: "-0.8rem",
                fontSize: "1.9rem",
                color: "#006872",
                fontWeight: "650",
              }}
            >
              +
            </button>
          </div>
        </div>
        <div className="rightbarr">
          <img src={classroomimg} className="imglog1r" alt="resume"></img>
        </div>
      </div>
      <div>
        <progress
          id="progr"
          value="40"
          max="100"
          style={{
            accentColor: "#FFC727",
            height: "0.26rem",
            width: "100%",
          }}
        >
          40%
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
