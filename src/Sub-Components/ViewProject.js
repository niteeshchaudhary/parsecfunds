import React from "react";
import { Link } from "react-router-dom";
import "./ViewProject.css";

function ViewProject() {
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
            <div
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
              <Link to='/bid' style={{color: "white"}}>
                Send Proposal
                </Link>
            </div>
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

        <div style={{ display: "flex", marginTop: "40px" }}>
          <div className="b-1">
            <h5>Project details</h5>
            <div
              className="mb-4"
              style={{
                border: "1px solid black",
                padding: "10px",
                borderRadius: "10px",
              }}
            >
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </div>
            <h5>Project FAQ</h5>
            <div
              className="mb-4"
              style={{
                border: "1px solid black",
                padding: "10px",
                borderRadius: "10px",
              }}
            >
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </div>
            <div className="mb-4">
              <h5>Skills required</h5>
              <div style={{ display: "flex" }}>
                <div className="mini-box"></div>
                <div className="mini-box" style={{ marginLeft: "10px" }}></div>
                <div className="mini-box" style={{ marginLeft: "10px" }}></div>
                <div className="mini-box" style={{ marginLeft: "10px" }}></div>
                <div className="mini-box" style={{ marginLeft: "10px" }}></div>
              </div>
            </div>
            <div className="mb-4">
              <h5>Industry category</h5>
              <div style={{ display: "flex" }}>
                <div className="mini-box"></div>
                {/* <div className="mini-box" style={{ marginLeft: "10px" }}></div> */}
                {/* <div className="mini-box" style={{ marginLeft: "10px" }}></div>
                <div className="mini-box" style={{ marginLeft: "10px" }}></div>
                <div className="mini-box" style={{ marginLeft: "10px" }}></div> */}
              </div>
            </div>
            <div className="mb-4">
              <h5>Language required</h5>
              <div style={{ display: "flex" }}>
                <div className="mini-box"></div>
                <div className="mini-box" style={{ marginLeft: "10px" }}></div>
                {/* <div className="mini-box" style={{ marginLeft: "10px" }}></div> */}
                {/* <div className="mini-box" style={{ marginLeft: "10px" }}></div>
                <div className="mini-box" style={{ marginLeft: "10px" }}></div> */}
              </div>
            </div>
            <div className="mb-4">
              <h5>Project completion deadline</h5>
              <div style={{ display: "flex" }}>
                <div className="mini-box"></div>
                {/* <div className="mini-box" style={{ marginLeft: "10px" }}></div> */}
                {/* <div className="mini-box" style={{ marginLeft: "10px" }}></div>
                <div className="mini-box" style={{ marginLeft: "10px" }}></div>
                <div className="mini-box" style={{ marginLeft: "10px" }}></div> */}
              </div>
            </div>
          </div>
          <div className="b-2">
            <div className="col-box mb-4">
              <div style={{ display: "flex" }}>
                <img
                  src="Vector.png"
                  style={{ width: "40px", height: "30px" ,marginLeft: "90px" }}
                />
                <div style={{marginLeft: "40px" , marginTop: "-5px"}}>
                    <h5 style={{color: "#006872"}}>$10.00 - $20.00</h5>
                    <p style={{textAlign: "left"}}>Cost</p>
                </div>
              </div>
            </div>
            <div className="col-box mb-4">
              <div style={{ display: "flex" }}>
                <img
                  src="Vector.png"
                  style={{ width: "40px", height: "30px" ,marginLeft: "90px" }}
                />
                <div style={{marginLeft: "40px" , marginTop: "-5px"}}>
                    <h5 style={{color: "#006872" , textAlign: "left"}}>Expiry date</h5>
                    <p style={{textAlign: "left"}}>March 23,2022</p>
                </div>
              </div>
            </div>
            <div className="col-box mb-4">
              <div style={{ display: "flex" }}>
                <img
                  src="Vector.png"
                  style={{ width: "40px", height: "30px" ,marginLeft: "90px" }}
                />
                <div style={{marginLeft: "40px" , marginTop: "-5px"}}>
                    <h5 style={{color: "#006872", textAlign: "left"}}>Proposal</h5>
                    <p style={{textAlign: "left"}}>Recieved Proposals</p>
                </div>
              </div>
            </div>
            <button className="subfinal" style={{paddingLeft: "70px" , paddingRight: "70px" , marginLeft: "110px"}}>Save</button>
          </div>

        </div>
      </div>
    </div>
  );
}

export default ViewProject;
