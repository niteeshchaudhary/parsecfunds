import React, { useState } from "react";
import { getFunctions, httpsCallable } from "firebase/functions";
import { useNavigate } from "react-router-dom";
import app from "../firebase";
import "./Proposal.css";

function Proposal() {
  const [propamount, setpropamount] = useState();
  const [time,settime]= useState("");
  const [updoc,setupdoc]= useState("");
  const [desc,setdesc]= useState("");
  const [file, setfile] = useState();
  const navigate = useNavigate();

  const functions = getFunctions(app, "asia-southeast2");

  const postProposal = httpsCallable(functions, "postProposal");


  function timehandler(e){
      settime(e.target.value);
  }
  function deschandler(e){
      setdesc(e.target.value);
  }

  function submitdata(){
    postProposal({
      duration: time,
      proposalamount: propamount,
      description: desc,
      file: updoc

    }).then((result) => {
      navigate("/manage");
      console.log(result);
    });
  }

  function filehandler(e) {
    console.log(e);
    // if (e.target.files[0]) {
    //   setfile(e.target.files[0].name);
    // }

    var reader = new FileReader();
    reader.addEventListener(
      "load",
      function () {
        setupdoc(reader.result);
      },
      false
    );
    if (e.target.files[0]) {
      setfile(e.target.files[0].name);
      reader.readAsDataURL(e.target.files[0]);
    }

  }

  function optionhandler(e) {
    setpropamount(parseInt(e.target.value));
  }

  return (
    <div className="divview1">
      <div className="container mb-5">
        <br />
        <br />
        <br />
        <div className="divview2">
          <div
            className="mb-5"
            style={{ display: "flex", justifyContent: "space-between" }}
          >
            <h3>Web designing role</h3>
          </div>
          <div style={{ display: "flex" }}>
            <div className="box-icon">Jobtype: remote</div>
            <div style={{ marginLeft: "30px" }} className="box-icon">
              01 to 03 months
            </div>
            <div style={{ marginLeft: "30px" }} className="box-icon">
              Basic Level
            </div>
            <div style={{ marginLeft: "30px" }} className="box-icon">
              March 23, 2022
            </div>
          </div>
        </div>

        <div className="propsecdiv">
          <h4 className="mb-4">Proposal amount</h4>
          <select
            id="cars"
            name="cars"
            placeholder="id proof"
            style={{ width: "82.5vw", padding: "5px", borderRadius: "7px" }}
            onChange={optionhandler}
          >
            <option value="null" disabled selected hidden>
              Enter your proposal amount
            </option>
            <option value="10" style={{ width: "80vw", height: "60px" }}>
              $10
            </option>
            <option value="15">$15</option>
            <option value="20">$20</option>
          </select>
          {/* <input type="text" placeholder="Enter your proposal amount" style={{border: "1px solid #006872", padding: "10px" , borderRadius: "10px" , width: "80vw"}}></input> */}
          <small
            style={{ color: "gray", fontSize: "10px", paddingLeft: "33px" }}
          >
            Total amount client will see on your proposal
          </small>

          <div className="border-prop mt-4">
            <p style={{ paddingTop: "10px", marginLeft: "7px" }}>$10-$20</p>
            <small style={{ marginRight: "5px" }}>
              Employer's proposed amount
            </small>
          </div>
          <div className="border-prop mt-2">
            <p style={{ paddingTop: "10px", marginLeft: "7px" }}>
              ${propamount ? propamount : "0"}
            </p>
            <small style={{ marginRight: "5px" }}>Your proposed amount</small>
          </div>
          <div className="border-prop mt-2">
            <p style={{ paddingTop: "10px", marginLeft: "7px" }}>$5</p>
            <small style={{ marginRight: "5px" }}>Service fee</small>
          </div>
          <div className="border-prop mt-2">
            <p style={{ paddingTop: "10px", marginLeft: "7px" }}>
              ${propamount - 5}-$20
            </p>
            <small style={{ marginRight: "5px" }}>
              Amount, You'll recieve after service deduction
            </small>
          </div>
        </div>
        <div className="propsecdiv2">
          {/* <input
            className="mb-3"
            type="text"
            placeholder="Select time period"
            style={{
              border: "1px solid gray",
              padding: "10px",
              color: "black",
              borderRadius: "10px",
              width: "80vw",
            }}
          ></input> */}

          <select
            className="mb-3"
            id="cars"
            name="cars"
            placeholder="id proof"
            style={{
              border: "1px solid gray",
              padding: "10px",
              color: "black",
              borderRadius: "10px",
              width: "82.5vw",
            }}
            onChange={timehandler}
          >
            <option value="null" disabled selected hidden>
              Select time period
            </option>
            <option value="01 month" style={{ width: "80vw", height: "60px" }}>
              01 month
            </option>
            <option value="02 month">02 month</option>
            <option value="03 month">03 month</option>
          </select>

          <textarea
            placeholder="Add description"
            style={{
              border: "1px solid gray",
              color: "black",
              padding: "10px",
              borderRadius: "10px",
              width: "82.5vw",
              height: "200px",
            }}
            onChange={deschandler}
          ></textarea>
          <div
            className="mt-4 mb-3"
            style={{
              borderRadius: "3px",
              border: "1px dashed grey",
              height: "40px",
              width: "82.5vw",
              display: "flex",
            }}
          >
            <label
              style={{
                margin: "2px",
                paddingLeft: "55px",
                paddingTop: "5px",
                // padding: "5px ",
                backgroundColor: "#FFC727",
                border: "none",
                color: "white",
                borderRadius: "5px",
                width: "200px",
                fontWeight: "700",
              }}
            >
              <input type="file" onChange={filehandler} />
              Upload file
            </label>
            <p style={{ marginTop: "7px", marginLeft: "10px" }}>{file}</p>
          </div>
          <button
            className="mt-4"
            type="submit"
            class="btn btn-primary"
            style={{
              width: "15.9vw",
              height: "5vh",
              borderRadius: "5px",
              backgroundColor: "#006872",
              border: "0px",
              color: "white",
              fontWeight: "600",
            }}
            onClick={submitdata}
          >
            Send now
          </button>
        </div>
      </div>
    </div>
  );
}

export default Proposal;
