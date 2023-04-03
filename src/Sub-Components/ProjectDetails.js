import React, { useState } from "react";
import "./ProjectDetails.css";

function ProjectDetails() {
  const [pic, setpic] = useState("");

  function pichandler(e) {
    console.log(e);
    if (e.target.files[0]) {
      setpic(e.target.files[0].name);
    }
  }
  return (
    <div style={{ paddingLeft: "150px", paddingTop: "100px" }}>
      <h3>Project details</h3>
      <hr style={{ width: "80vw" }} className="mb-5" />

      <form>
        <select
          id="cars"
          name="cars"
          placeholder="id proof"
          style={{ width: "80vw", padding: "5px", borderRadius: "7px" }}
          className="mb-4"
        >
          <option value="null" disabled selected hidden>
            Project FAQ
          </option>
          <option value="Aadhar Card" style={{width: "80vw" , height: "60px"}}>
            How do i sign up?
          </option>
          <option value="Pan Card">How do I get more information?</option>
          <option value="Driving License">How do I edit a project after bidding starts?</option>
        </select>
        <div className="mb-4" style={{ display: "flex" }}>
          <div>
            <input
              type="text"
              style={{
                width: "40vw",
                border: "1px solid grey",
                padding: "5px",
                borderRadius: "7px",
              }}
              placeholder="Skills required"
            />
          </div>
          <div style={{ marginLeft: "50px" }}>
            <input
              type="text"
              style={{
                width: "38vw",
                border: "1px solid grey",
                marginLeft: "-26px",
                padding: "5px",
                borderRadius: "7px",
              }}
              placeholder="Industry Categories"
            />
          </div>
        </div>
        <div className="mb-4" style={{ display: "flex" }}>
          <div>
            <select
              id="cars"
              name="cars"
              placeholder="id proof"
              style={{
                width: "40vw",
                border: "1px solid grey",
                padding: "5px",
                borderRadius: "7px",
              }}
            >
              <option value="null" disabled selected hidden>
                *
              </option>
              <option value="Option1">Option1</option>
              <option value="Option2">Option2</option>
              <option value="Option3">Option3</option>
            </select>
          </div>
          <div style={{ marginLeft: "24px" }}>
            <select
              id="cars"
              name="cars"
              placeholder="id proof"
              style={{
                width: "38vw",
                border: "1px solid grey",
                padding: "5px",
                borderRadius: "7px",
              }}
            >
              <option value="null" disabled selected hidden>
                language required
              </option>
              <option value="English">English</option>
              <option value="Hindi">Hindi</option>
              <option value="French">French</option>
            </select>
          </div>
        </div>
        <div className="mb-4" style={{ display: "flex" }}>
          <div>
            <input
              type="date"
              style={{
                width: "40vw",
                border: "1px solid grey",
                padding: "5px",
                borderRadius: "7px",
              }}
              min="1950-01-01"
              placeholder="Project completion deadline"
            />
          </div>
          <div style={{ marginLeft: "50px" }}>
            <input
              type="number"
              style={{
                width: "38vw",
                border: "1px solid grey",
                marginLeft: "-26px",
                padding: "5px",
                borderRadius: "7px",
              }}
              placeholder="Range of Amount"
              min="0"
            />
          </div>
        </div>
        <div className="mb-4" style={{ display: "flex" }}>
          <div>
            <input
              type="date"
              style={{
                width: "40vw",
                border: "1px solid grey",
                padding: "5px",
                borderRadius: "7px",
              }}
              min="1950-01-01"
              placeholder="Expiry date"
            />
          </div>
          <div style={{ marginLeft: "50px" }}>
            <input
              type="number"
              style={{
                width: "38vw",
                border: "1px solid grey",
                marginLeft: "-26px",
                padding: "5px",
                borderRadius: "7px",
              }}
              placeholder="Number of Proposals"
              min="0"
            />
          </div>
        </div>
        <div className="mb-4">
          <p
            className="mb-3"
            style={{ marginLeft: "15px", color: "#000000", opacity: "50%" }}
          >
            Attachments
          </p>
          <div
            style={{
              borderRadius: "3px",
              border: "1px dashed grey",
              height: "40px",
              width: "80vw",
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
              <input type="file" onChange={pichandler} />
              Upload Pdf
            </label>
            <p style={{ marginTop: "7px", marginLeft: "10px" }}>{pic}</p>
          </div>
        </div>
        {/* <p style={{ marginLeft: "15px", color: "#000000", opacity: "50%" }}>
          Project ID: 11
        </p> */}
        <button className="subfinal">Submit Project</button>
      </form>
    </div>
  );
}

export default ProjectDetails;
