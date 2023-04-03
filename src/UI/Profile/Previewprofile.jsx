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
import { ref, getDatabase } from "firebase/database";
import { useList } from "react-firebase-hooks/database";

const functions = getFunctions(app, "asia-southeast2");
const addSkills = httpsCallable(functions, "addSkills");
const addProfilePic = httpsCallable(functions, "addProfilePic");

const database = getDatabase();
function Previewprofile(props) {
  const { reset } = useUserAuth();
  const [sugskills, loading, snperror] = useList(ref(database, "skills"));
  const [pic, setpic] = useState(props?.pic);
  const [editskills, seteditSkills] = useState(false);
  const [skills, setSkills] = useState(props?.skills ? props?.skills : []);
  const [educat, setEducat] = useState(
    props.education ? Object.values(props.education) : []
  );
  const [wexp, setWexp] = useState(
    props?.experience ? Object.values(props.experience) : []
  );
  const [lang, setLang] = useState(props?.languages ? props?.languages : []);
  const [isOpen, setIsOpen] = useState(false);

  const togglePopup = async () => {
    setIsOpen(!isOpen);
  };
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

  function addtoskills(chip) {
    if (chip && chip.length <= 5) {
      setSkills(chip);
    }
  }
  const sendResetLink = async (e) => {
    e.preventDefault();
    try {
      if (props?.email) {
        await reset(props?.email);
        alert("Password Reset Link Sent Successfully to Your Email");
      } else {
        alert("Sorry Some uUnidentified Error Occured");
      }
    } catch (err) {
      alert(err.message);
    }
  };

  const chipRenderer = (
    { chip, className, handleClick, handleDelete },
    key
  ) => (
    // <div
    //   key={key}
    //   onClick={handleClick}
    //   style={{
    //     height: "2rem",
    //     backgroundColor: "#F5EEEE",
    //     borderRadius: "1rem",
    //     border: "0.1rem solid #000",
    //   }}
    // >
    //   {chip}
    // </div>
    <Chip key={key} text={chip} onClick={handleClick} onDelete={handleDelete} />
    // <Chip
    //   className={className}
    //   key={key}
    //   label={chip}
    //   onClick={handleClick}
    //   onDelete={handleDelete}
    //   size="small"
    // />
  );
  function setImage(e) {
    var reader = new FileReader();
    console.log("entered");
    reader.addEventListener(
      "load",
      function () {
        setpic(reader.result);
        addProfilePic({ pic: reader.result }).then((result) => {
          console.log(result.data);
        });
      },
      false
    );

    if (document.getElementById("contained-button-file").files[0]) {
      if (
        document
          .getElementById("contained-button-file")
          .files[0]?.type.split("/")[0] == "image"
      ) {
        reader.readAsDataURL(
          document.getElementById("contained-button-file").files[0]
        );
      } else {
        alert("Please Upload a valid image file");
      }
    }
    //setpic(URL.createObjectURL(document.getElementById("uploadimg").files[0]));
  }

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
            <input
              type="file"
              onChange={setImage}
              accept="image/*"
              style={{ display: "none" }}
              id="contained-button-file"
            />
            <label className="btn editimg-btn" htmlFor="contained-button-file">
              Edit Image
            </label>

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
            <p
              onClick={sendResetLink}
              style={{ cursor: "pointer", margin: "1rem 0", color: "#345600" }}
            >
              <b>Reset Password</b>
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
            <img
              onClick={(e) => {
                setWexp([...wexp, { new: "edit", tmi: new Date().getTime() }]);
              }}
              style={{
                cursor: "pointer",
                width: "1rem",
                marginLeft: "0.5rem",
                float: "right",
              }}
              src={require("../../imges/add.svg").default}
            />
          </div>
          <div className="column-flex">
            {wexp.length != 0
              ? wexp.map((exp, index) => <EditWCard wexp={exp} key={index} />)
              : props?.workExperience &&
                Object.values(props.workExperience).map((exp, index) => (
                  <EditWCard wexp={exp} key={index} />
                ))}
          </div>
        </div>

        <div className="box-cont">
          <div style={{ display: "flex" }}>
            <h5>Education</h5>{" "}
            <img
              onClick={(e) => {
                setEducat([
                  ...educat,
                  { new: "edit", tmi: new Date().getTime() },
                ]);
              }}
              style={{
                cursor: "pointer",
                width: "1rem",
                marginLeft: "0.5rem",
                float: "right",
              }}
              src={require("../../imges/add.svg").default}
            />
          </div>
          <div className="column-flex">
            {educat.length != 0
              ? educat.map((edu, index) => <EditECard edu={edu} key={index} />)
              : props?.education &&
                Object.values(props.education).map((edu, index) => (
                  <EditECard edu={edu} key={index} />
                ))}
          </div>
        </div>

        <div className="box-cont">
          <h5>Skills</h5>
          <div
            className="row-flex"
            style={{ marginLeft: "0rem", padding: "0rem" }}
          >
            {editskills && (
              <>
                {" "}
                <SuggestChips
                  onChange={addtoskills}
                  key={"sklbox"}
                  skills={skills.length == 0 ? props.skills : skills}
                  suggestionsid="skillsugg"
                  suggestions={sugskills.map((ele) => ele.val())}
                />
                {/* <ChipInput
                  chipRenderer={chipRenderer}
                  classes={{ inputRoot: "inp", input: "inp" }}
                  defaultValue={props.skills}
                  onChange={(chips) => addtoskills(chips)}
                  style={{ height: "2rem" }}
                /> */}
                <img
                  onClick={() => {
                    addSkills(skills);
                    seteditSkills(false);
                  }}
                  style={{ width: "1rem", cursor: "pointer" }}
                  src={require("../../imges/done.svg").default}
                />
              </>
            )}
            {!editskills && skills.length == 0
              ? props.skills.map((skl, index) => (
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
                ))
              : !editskills &&
                skills.map((skl, index) => (
                  <span
                    style={{
                      marginRight: "0.5rem",
                      border: "0.01rem solid #006872",
                      borderRadius: "20px",
                      padding: "0.1rem 0.5rem",
                    }}
                    key={index}
                  >
                    {skl}
                  </span>
                ))}
            {!editskills && (
              <img
                onClick={() => {
                  seteditSkills(true);
                }}
                style={{ width: "1rem", cursor: "pointer" }}
                src={require("../../imges/editpen.svg").default}
              />
            )}
          </div>
          {/* <h6>year</h6> */}
        </div>

        <div className="box-cont">
          <h5>Languages</h5>
          <div
            className="row-flex"
            style={{ marginLeft: "0rem", padding: "0rem" }}
          >
            {lang.length == 0
              ? props.languages.map((lang, index) => (
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
                ))
              : lang.map((lang, index) => (
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

            <img
              onClick={async () => {
                togglePopup();
              }}
              style={{ width: "1rem", cursor: "pointer" }}
              src={require("../../imges/editpen.svg").default}
            />
          </div>
          {/* <h6>year</h6> */}
        </div>
        <NavLink to="/dashboard">
          <div className="text-center">
            <button className=" btn-g">Go to dashboard</button>
          </div>
        </NavLink>

        {/* Popups */}

        {isOpen && (
          <Popup
            content={
              <LangPop
                languages={props.languages}
                setIsOpen={setIsOpen}
                setLang={setLang}
              />
            }
            handleClose={togglePopup}
          />
        )}
      </div>
    </>
  );
}

export default Previewprofile;
