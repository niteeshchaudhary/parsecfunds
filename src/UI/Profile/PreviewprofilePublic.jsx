import { React, useState, useEffect } from "react";
import NavbarCollapse from "react-bootstrap/esm/NavbarCollapse";
import { NavLink } from "react-router-dom";
import "../Profile/previewProfile.css";
import Chip from "./Chip";
import ChipInput from "material-ui-chip-input";
import app, { db } from "../../firebase";
import { getFunctions, httpsCallable } from "firebase/functions";
import Popup from "../../Offers/PopUp";
import LangPop from "./Popups/LangPop";
import EditWCard from "./Popups/EditWCard";
import EditECard from "./Popups/EditECard";
import { useUserAuth } from "../../context/UserAuthContext";
import SuggestChips from "./SuggestChips";

const functions = getFunctions(app, "asia-southeast2");
const addSkills = httpsCallable(functions, "addSkills");
const addProfilePic = httpsCallable(functions, "addProfilePic");

function Previewprofile(props) {
  const [pic, setpic] = useState(props?.pic);
  const [skills, setSkills] = useState(props?.skills ? props?.skills : []);
  const [educat, setEducat] = useState(
    props.education ? Object.values(props.education) : []
  );
  const [wexp, setWexp] = useState(
    props?.experience ? Object.values(props.experience) : []
  );
  const [lang, setLang] = useState(props?.languages ? props?.languages : []);

  const commonstyle = {
    background: "#FFFFFF",
    boxShadow: " 0rem 0.25rem 0.25rem rgba(0, 0, 0, 0.25)",
    fontSize: "1rem",
    margin: "1.5rem",
    borderRadius: "1rem",
    padding: "1rem",
    fontWeight: "600",
    width: "30vw",
    margin: "auto",
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <h3 className="pp-margin" style={{ width: "70vw", textAlign: "left" }}>
          Preview Profile
        </h3>
        <div className="row-flex">
          <div className="leftpimg ">
            <img
              src={
                pic
                  ? pic
                  : props?.pic
                  ? props?.pic
                  : "https://cdn-icons-png.flaticon.com/512/147/147142.png"
              }
              style={{ borderRadius: "50%", height: "10rem", width: "10rem" }}
              alt=""
            />
            <p className="leftpimg-para">
              Hourly rate
              <span style={{ color: "black" }}> ${props.rate} </span>
            </p>
          </div>
          <div className="middle-prt">
            <h3>{props.name}</h3>
            <h4>
              <i>{props.title}</i>
            </h4>
            <p>
              {/* Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Pellentesque auctor volutpat felis tellus tempus, diam magna
            iaculis. Arcu molestie nam est tincidunt sit integer ornare dolor
            eget. Ornare elementum diam venenatis scelerisque duis dictum.
            Semper tincidunt ante non elit nibh erat. */}
              {props.about}
            </p>
          </div>
          {/* <div className="edit-profile">
          <h5>
            Edit Profile{" "}
            <img src={require("../../imges/editpen.svg").default} alt="" />
          </h5>
        </div> */}
        </div>

        <div className="box-cont">
          <div style={{ display: "flex" }}>
            <h5>Work Experience</h5>
          </div>
          <div className="column-flex">
            {props?.workExperience &&
              Object.values(props.workExperience).map((exp, index) => (
                <span
                  key={index}
                  style={{
                    marginRight: "0.5rem",
                    width: "100%",
                    borderRadius: "20px",
                    padding: "0.1rem 0.5rem",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      width: "100%",
                      justifyContent: "right",
                    }}
                  ></div>
                  <h5>{exp.title}</h5>
                  <h6>{exp.company}</h6>
                  {exp.location}
                  <br />
                  {exp.time}
                  <hr />
                </span>
              ))}
          </div>
        </div>

        <div className="box-cont">
          <div style={{ display: "flex" }}>
            <h5>Education</h5>{" "}
          </div>
          <div className="column-flex">
            {props?.education &&
              Object.values(props.education).map((edu, index) => (
                <span
                  key={index}
                  style={{
                    marginRight: "0.5rem",
                    width: "100%",
                    borderRadius: "20px",
                    padding: "0.1rem 0.5rem",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      width: "100%",
                      justifyContent: "right",
                    }}
                  ></div>
                  <h5>{edu.institute}</h5>
                  {edu.degree}
                  <br />
                  {edu.time}
                  <hr />
                </span>
              ))}
          </div>
        </div>

        <div className="box-cont">
          <h5>Skills</h5>
          <div
            className="row-flex"
            style={{ marginLeft: "0rem", padding: "0rem" }}
          >
            {props.skills.map((skl, index) => (
              <span
                style={{
                  marginRight: "0.5rem",
                  border: "0.01rem solid #006872",
                  borderRadius: "1.2rem",
                  padding: "0.1rem 0.8rem",
                }}
                key={index}
              >
                {skl}
              </span>
            ))}
          </div>
          {/* <h6>year</h6> */}
        </div>

        <div className="box-cont">
          <h5>Languages</h5>
          <div
            className="row-flex"
            style={{ marginLeft: "0rem", padding: "0rem" }}
          >
            {props.languages.map((lang, index) => (
              <span
                key={index}
                style={{
                  marginRight: "0.5rem",
                  border: "0.01rem solid #006872",
                  borderRadius: "20px",
                  padding: "0.1rem 0.4rem",
                }}
              >
                {" "}
                {lang.Language}{" "}
              </span>
            ))}
          </div>
          {/* <h6>year</h6> */}
        </div>
        <NavLink to="/Edashboard">
          <div className="text-center">
            <button className=" btn-g">Back</button>
          </div>
        </NavLink>
        {/* Popups */}
      </div>
    </>
  );
}

export default Previewprofile;
