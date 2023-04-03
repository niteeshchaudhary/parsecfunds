import React, { useState, useEffect } from "react";
import { SpinnerDotted } from "spinners-react";
import "../Profile/previewProfile.css";
import app from "../../firebase";
import { getFunctions, httpsCallable } from "firebase/functions";
import Previewprofile from "./Previewprofile";

const functions = getFunctions(app, "asia-southeast2");
const getUserCompleteProfile = httpsCallable(
  functions,
  "getUserCompleteProfile"
);
function MainPreview() {
  const [loadingState, setLoadingState] = useState(true);
  const [name, setname] = useState("");
  const [title, settitle] = useState("");
  const [role, setrole] = useState("");
  const [email, setemail] = useState("");
  const [pic, setpic] = useState("");
  const [rate, setrate] = useState("");
  const [about, setAbout] = useState("");
  const [education, setEducation] = useState("");
  const [skills, setSkills] = useState([]);
  const [experience, setExperience] = useState("");
  const [languages, setlanguages] = useState([]);

  useEffect(() => {
    getUserCompleteProfile().then((result) => {
      if (result.data.result.status === 1) {
        setname(result.data.result.desc.profile.name);
        setemail(result.data.result.desc.profile.email);
        setpic(result.data.result.desc.profile.pic);
        setrole(result.data.result.desc.profile.role);
        settitle(result.data.result.desc.profile.Title);
        setAbout(result.data.result.desc.about);
        setlanguages(result.data.result.desc.preferedLanguages);
        setSkills(result.data.result.desc.skills);
        setEducation(result.data.result.desc.education);
        setExperience(result.data.result.desc.experience);
        setrate(result.data.result.desc.ProposedRate.hourly);
        setLoadingState(false);
      }
    });
  }, []);
  return (
    <>
      {loadingState && (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            width: "100%",
            height: "100%",
            alignItems: "center",
          }}
        >
          <SpinnerDotted />
        </div>
      )}
      {!loadingState && (
        <Previewprofile
          name={name}
          email={email}
          title={title}
          role={role}
          pic={pic}
          rate={rate}
          about={about}
          skills={skills}
          workExperience={experience}
          education={education}
          languages={languages}
        />
      )}
    </>
  );
}

export default MainPreview;
