import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useUserAuth } from "../context/UserAuthContext";
import { useNavigate } from "react-router-dom";
import { type } from "@testing-library/user-event/dist/type";
import "./Profile.css";
import Personal from "./Profile/Personal";
import Educational from "./Profile/Educational";
import { getFunctions, httpsCallable } from "firebase/functions";
import app from "../firebase";

function Profile() {
  const [personal, setpersonal] = useState(true);
  const [name, setname] = useState("");
  const [sex, setsex] = useState("");
  const [id, setid] = useState("");
  const [haddress, sethaddress] = useState("");
  const [birth, setbirth] = useState("");
  const [pic, setpic] = useState("");
  const [degree, setdegree] = useState("");
  const [Qualification, setQualification] = useState("");
  const [institute, setinstitute] = useState("");
  const [instaddress, setinstaddress] = useState("");

  function getname(val) {
    setname(val);
  }
  function getsex(val) {
    setsex(val);
  }
  function getid(val) {
    setid(val);
  }
  function gethaddress(val) {
    sethaddress(val);
  }
  function getbirth(val) {
    setbirth(val);
  }
  function getpic(val) {
    setpic(val);
  }
  function getdegree(val) {
    setdegree(val);
  }
  function getQualification(val) {
    setQualification(val);
  }
  function getinstitute(val) {
    setinstitute(val);
  }
  function getinstaddress(val) {
    setinstaddress(val);
  }

  function clickeduhandler() {
    setpersonal(false);
    document.getElementById("2").style.borderBottom = "2px solid #FFC727";
    document.getElementById("1").style.borderBottom = null;
  }
  function clickperhandler() {
    setpersonal(true);
    document.getElementById("1").style.borderBottom = "2px solid #FFC727";
    document.getElementById("2").style.borderBottom = null;
  }

  // const functions = getFunctions(app, "asia-southeast2");

  // const updateProfile = httpsCallable(functions, "updateProfile");

  // updateProfile({
  //   // sex: sex,
  //   // name: name,
  //   // dob: dob,
  //   // pic: URL.createObjectURL(fl2), //URL.createObjectURL(fl2),
  //   // address: address,
  //   // id: idproof,
  //   // degree: degree,
  //   // qualification: qualify,
  //   // institute: insti,
  //   // instaddress: address,

  // })
  //   .then((result) => {
  //     console.log(result);});

  // function finalsubmit() {
  //   updateProfile({
  //     sex: sex,
  //     name: name,
  //     dob: birth,
  //     // pic: URL.createObjectURL(pic), //URL.createObjectURL(fl2),
  //     address: haddress,
  //     id: id,
  //     degree: degree,
  //     qualification: Qualification,
  //     institute: institute,
  //     instaddress: instaddress,
  //   }).then((result) => {
  //     console.log(result);
  //   });
  // }

  return (
    <>
      <div className="main-log23">
        <div>
          {/* <img src="pic4.png" className="imglog123"></img> */}
          {personal ? (
            <img src="pic4.png" className="imglog123" />
          ) : (
            <img src="pic5.png" className="imglog123" />
          )}
        </div>
        <div className="seconddiv2">
          <div className="mb-5 prof1">
            <h4
              id="1"
              onClick={clickperhandler}
              style={{ borderBottom: "2px solid #FFC727" }}
            >
              Personal
            </h4>
            <h4 id="2" style={{ marginLeft: "30px" }} onClick={clickeduhandler}>
              Education
            </h4>
          </div>
          {personal ? (
            <Personal
              fun1={clickeduhandler}
              getname={getname}
              getid={getid}
              getsex={getsex}
              gethaddress={gethaddress}
              getbirth={getbirth}
              getpic={getpic}
            />
          ) : (
            <Educational
            name={name} sex={sex} id={id} haddress={haddress} birth={birth} pic={pic}
            />
          )}
          {/* name={name} sex={sex} id={id} haddress={haddress} birth={birth} pic={pic} */}
        </div>
      </div>
    </>
  );
}

export default Profile;
