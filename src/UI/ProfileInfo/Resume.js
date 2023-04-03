import { useState } from "react";
import resumeimg from "../../imges/resume.svg";
import { storage, auth } from "../../firebase";
import "./Resume.css";
import app from "../../firebase";
import { getFunctions, httpsCallable } from "firebase/functions";

const functions = getFunctions(app, "asia-southeast2");
const resumeadded = httpsCallable(functions, "resumeadded");

function Resume(props) {
  const [onstate, setonstate] = useState(true);
  const [progress, setProgress] = useState(0);

  function clickhandler(e) {
    props.fun1();
  }

  const filechoose = (e) => {
    const file = e.currentTarget.files[0];
    uploadFiles(file);
  };

  const uploadFiles = (file) => {
    //temp/uid/uid.pdf/image/video
    document.getElementById("errordisp").innerHTML = "";
    const flarr = file.name.split(".");
    const ext = flarr[flarr.length - 1];
    console.log(ext, file.name, flarr.length);
    if (ext == "pdf") {
      const uploadTask = storage
        .ref(`temp/${auth.currentUser.email}/resume.pdf`)
        .put(file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          //
          const prog = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          setProgress(prog);
        },
        (error) => {
          console.log(error);
          document.getElementById("errordisp").innerHTML = error.code;
        },
        () => {
          console.log("done");
          setonstate(false);
          resumeadded();
          document.getElementById("showprogper").innerHTML = "Completed";
        }
      );
    } else {
      document.getElementById("errordisp").innerHTML = "upload pdf file only";
    }
  };
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
            How would you like to introduce yourself to us?
          </h1>
          <p
            style={{
              fontFamily: "Roboto",
              fontStyle: "normal",
              fontWeight: "400",
              marginTop: "3%",
              marginBottom: "3%",
              textAlign: "justify",
              textJustify: "inter-word",
              fontSize: "1.1rem",
              lineHeight: "1.3rem",
            }}
          >
            We need to know about your education, experience, and abilities. You
            can modify your information at any time you need.
          </p>
          <input
            type="file"
            name="filechooser"
            id="filechooser"
            className="input"
            onChange={filechoose}
            style={{ display: "none" }}
          />
          <button
            onClick={() => {
              document.getElementById("filechooser").click();
            }}
            className="btn btn-primary"
            style={{
              width: "100%",
              height: "3rem",
              fontFamily: "Roboto",
              fontStyle: "normal",
              fontWeight: "500",
              fontSize: "1.2rem",
              lineHeight: "2rem",
              color: "#006872",
              paddingLeft: "5%",
              textAlign: "left",
              background: "#fff",
              border: "0.1rem solid rgba(0, 0, 0, 0.4)",
              borderRadius: "1rem",
            }}
          >
            Upload Resume
          </button>
          <progress
            id="progr"
            value={progress}
            className="progress"
            max="100"
            style={{
              accentColor: "#006872",
              margin: "0.5rem 0 0 1.5%",
              height: "0.2rem",
              width: "97%",
            }}
          >
            {progress}%
          </progress>
          <p id="showprogper" style={{ width: "97%", textAlign: "right" }}>
            {progress}%
          </p>
          <h2 id="errordisp" style={{ width: "100%", color: " #FFC727" }}></h2>
        </div>
        <div className="rightbarr">
          <img src={resumeimg} className="imglog1r" alt="resume"></img>
        </div>
      </div>
      <div>
        <progress
          id="progr"
          value="8"
          max="100"
          style={{
            accentColor: "#FFC727",
            height: "0.26rem",
            width: "100%",
          }}
        >
          8%
        </progress>
        <div
          style={{
            display: "flex",
            height: "3.1rem",
            justifyContent: "right",
            paddingRight: "10%",
          }}
        >
          <button
            type="submit"
            onClick={clickhandler}
            className="btn btn-primary"
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
        </div>
      </div>
    </>
  );
}
export default Resume;
