import React, { useState, useEffect } from "react";
import Body from "./Dashboard/Body";
import Sidebar from "./Dashboard/Sidebar";
import { getFunctions, httpsCallable } from "firebase/functions";
import app from "../firebase";
import { useNavigate } from "react-router-dom";
import Resume from "./ProfileInfo/Resume";
import Description from "./ProfileInfo/Description";
import AboutYourself from "./ProfileInfo/AboutYourself";
import Skills from "./ProfileInfo/Skills";
import WorkExpadder from "./ProfileInfo/WorkExpadder";
import WorkExp from "./ProfileInfo/WorkExp";
import Rates from "./ProfileInfo/Rates";
import Education from "./ProfileInfo/Education";
import Educationadder from "./ProfileInfo/Educationdder";
import Services from "./ProfileInfo/Services";
import PreferedLang from "./ProfileInfo/PreferedLang";
import Profiledetails from "./ProfileInfo/Profiledetails";
import { useLocation } from "react-router-dom";
import "./ProfileInfo.css";

export default function ProfileInfo({ setUserStatus }) {
  const navigate = useNavigate();
  const { state } = useLocation();
  console.log(state);
  const [name, setname] = useState(state?.profile?.name);
  const [pic, setpic] = useState(state?.profile?.pic);
  const [role, setrole] = useState(state?.profile?.role);
  const [screen, setscreen] = useState(state?.profile?.screen);
  const [profilestatus, setprofilestatus] = useState(
    state?.profile?.profilestatus
  );

  const functions = getFunctions(app, "asia-southeast2");

  const getUserProfile = httpsCallable(functions, "getUserProfile");
  useEffect(() => {
    getUserProfile().then((result) => {
      console.log(result);
      if (result.data.result.status === 1) {
        setname(result.data.result.desc.name);
        setpic(result.data.result.desc.pic);
        setrole(result.data.result.desc.role);
        setscreen(result.data.result.desc.screen); //result.data.result.desc.screen);
        setprofilestatus(result.data.result.desc.profilestatus); //result.data.result.desc.profilestatus);
      }
    });
  }, []);

  function clickresumehandler() {
    setscreen(1);
  }
  function clickdeschandler() {
    setscreen(2);
  }
  function clickworkadderhandler() {
    setscreen(3);
  }
  function clickworkhandler() {
    setscreen(21);
  }
  function clickeduadderhandler() {
    setscreen(4);
  }
  function clickeduhandler() {
    setscreen(31);
  }
  function clicksLanghandler() {
    setscreen(5);
  }
  function clickskillhandler() {
    setscreen(6);
  }
  function clicksAbouthandler() {
    setscreen(7);
  }
  function clicksServicehandler() {
    setscreen(8);
  }
  function clicksRatehandler() {
    setscreen(9);
  }
  function clicksProfiledetailshandler() {
    setscreen(10);
    navigate("/previewProfile", {
      state: { profile: state.profile },
    });
  }

  //<div style={{ display: "flex" }}>
  return (
    <>
      {!profilestatus ? (
        screen === 0 ? (
          <Resume fun1={clickresumehandler} />
        ) : screen === 1 ? (
          <Description fun1={clickdeschandler} />
        ) : screen === 2 ? (
          <WorkExpadder fun1={clickworkadderhandler} fun2={clickworkhandler} />
        ) : screen === 21 ? (
          <WorkExp fun1={clickdeschandler} />
        ) : screen === 3 ? (
          <Educationadder fun1={clickeduadderhandler} fun2={clickeduhandler} />
        ) : screen === 31 ? (
          <Education fun1={clickworkadderhandler} />
        ) : screen === 4 ? (
          <PreferedLang fun1={clicksLanghandler} />
        ) : screen === 5 ? (
          <Skills fun1={clickskillhandler} />
        ) : screen === 6 ? (
          <AboutYourself fun1={clicksAbouthandler} />
        ) : screen === 7 ? (
          <Services fun1={clicksServicehandler} />
        ) : screen === 8 ? (
          <Rates fun1={clicksRatehandler} />
        ) : screen === 9 ? (
          <Profiledetails
            fun1={clicksProfiledetailshandler}
            setUserStatus={setUserStatus}
          />
        ) : (
          console.log("hello")
        )
      ) : (
        navigate("/")
      )}
    </>
  );
}
