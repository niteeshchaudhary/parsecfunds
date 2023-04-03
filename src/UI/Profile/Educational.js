import React from "react";
// import './Educational.css';
import { useState } from "react";
import { getFunctions, httpsCallable } from "firebase/functions";
import app from "../../firebase";
import { useNavigate } from "react-router-dom";

function Educational(props) {
  const [degree, setdegree] = useState("");
  const [Qualification, setQualification] = useState("");
  const [institute, setinstitute] = useState("");
  // const [instaddress, setinstaddress] = useState("");
  const navigate = useNavigate();

  function degreehandler(e) {
    setdegree(e.target.value);
  }
  function Qualificationhandler(e) {
    setQualification(e.target.value);
  }
  function institutehandler(e) {
    setinstitute(e.target.value);
  }
  // function instaddresshandler(e) {
  //   setinstaddress(e.target.value);
  // }


  const functions = getFunctions(app, "asia-southeast2");

  const updateProfile = httpsCallable(functions, "updateProfile");

  function sub(e) {
    e.preventDefault();
    // props.getdegree(degree);
    // props.getQualification(Qualification);
    // props.getinstitute(institute);
    // props.getinstaddress(instaddress);
    // props.finalsubmit();

    updateProfile({
      sex: props.sex,
      name: props.name,
      dob: props.birth,
      pic: props.pic, //URL.createObjectURL(fl2),
      address: props.haddress,
      id: props.id,
      degree: degree,
      qualification: Qualification,
      institute: institute,
      // instaddress: instaddress,
    }).then((result) => {
      // navigate("/dashboard");
      console.log(result);
    });
    navigate("/dashboard");
  }

  return (
    <form onSubmit={sub}>
      <div class="mb-5 cus">
        <input
          type="text"
          class="form-control2"
          id="exampleInputEmail1"
          aria-describedby="emailHelp"
          placeholder="Degree/ Diploma/ Certification"
          style={{ width: "40vw", paddingLeft: "0px" }}
          onChange={degreehandler}
        />
      </div>
      <div class="mb-5 cus">
        <input
          type="text"
          class="form-control2"
          id="exampleInputEmail1"
          aria-describedby="emailHelp"
          placeholder="Qualification"
          style={{ width: "40vw", paddingLeft: "0px" }}
          onChange={Qualificationhandler}
        />
      </div>
      <div class="mb-5 cus">
        <input
          type="text"
          class="form-control2"
          id="exampleInputEmail1"
          aria-describedby="emailHelp"
          placeholder="Institute name"
          style={{ width: "40vw", paddingLeft: "0px" }}
          onChange={institutehandler}
        />
      </div>
      {/* <div class="mb-5 cus">
        <input
          type="text"
          class="form-control2"
          id="exampleInputEmail1"
          aria-describedby="emailHelp"
          placeholder="Address"
          style={{ width: "40vw", paddingLeft: "0px" }}
          onChange={instaddresshandler}
        />
      </div> */}
      <button
        type="submit"
        class="btn btn-primary mt-4"
        style={{
          width: "18vw",
          borderRadius: "5px",
          backgroundColor: "#006872",
          border: "0px",
        }}
      >
        Submit
      </button>
    </form>
  );
}

export default Educational;
