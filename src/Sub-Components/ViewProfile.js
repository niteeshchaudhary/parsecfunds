import React from "react";
import "./ViewProfile.css";

function ViewProfile() {
  return (
    <div className="main-log6">
      <div
        style={{
          width: "40vw",
          height: "150vh",
          marginLeft: "2vw",
          borderRadius: "10px",
          marginTop: "60px",
          backgroundColor: "white",
          textAlign: "center",
          paddingTop: "30px",
        }}
      >
        <div
          style={{
            backgroundColor: "gray",
            width: "150px",
            marginLeft: "175px",
            height: "150px",
            borderRadius: "100px",
          }}
        ></div>
        <img
          src="ic-view.png"
          style={{ width: "30px", height: "30px", marginTop: "10px" }}
        ></img>
        <h5>Jonathan Higgins</h5>
        <p>
          0.0/5(
          <small style={{ color: "#006872", fontSize: "15px" }}>
            0 Feedback
          </small>
          )
        </p>
        <p style={{ marginTop: "-10px" }}>Member since january 5th, 2022</p>
        <hr />
        <p>
          <img src="Rectangle 617.png" /> India
        </p>
        <p>
          <img src="heart.png" className="mb-3" /> Save
        </p>
        <h4 className="mt-5" style={{ marginLeft: "-180px" }}>
          Report this Freelancer
        </h4>
        <select
          id="cars"
          name="cars"
          placeholder="id proof"
          style={{
            marginLeft: "-30px",
            width: "30vw",
            padding: "5px",
            borderRadius: "7px",
          }}
        >
          <option value="null" disabled selected hidden>
            Select reason
          </option>
          <option value="reason1" style={{ width: "30vw", height: "60px" }}>
            reason1
          </option>
          <option value="reason2">reason2</option>
          <option value="reason3">reason3</option>
        </select>
        <textarea
          className="mt-3"
          style={{
            marginLeft: "-30px",
            width: "30vw",
            height: "200px",
            borderRadius: "15px",
            padding: "10px",
          }}
          placeholder="Report description"
        ></textarea>
        <p></p>
        <button
          type="submit"
          class="btn btn-primary"
          style={{
            width: "18vw",
            borderRadius: "5px",
            backgroundColor: "#006872",
            border: "0px",
          }}
        >
          Report now
        </button>
      </div>

      <div>
        <div
          style={{
            width: "54vw",
            // marginTop: "30px",
            marginLeft: "2vw",
            borderRadius: "10px",
            marginTop: "60px",
            marginRight: "2vw",
            backgroundColor: "white",
            height: "50vh",
            padding: "60px",
          }}
        >
          <h3>Projects</h3>
          <div style={{ display: "flex", marginLeft: "-20px" }}>
            <div className="boxcust3" style={{ marginLeft: "20px" }}>
              <div className="minboxcust3">0</div>
              <p style={{ fontSize: "15px" }} className="mt-2 mb-3">
                Completed projects
              </p>
              <p style={{ color: "#006872", fontSize: "12px" }}>
                Click to view
              </p>
            </div>
            <div className="boxcust3" style={{ marginLeft: "20px" }}>
              <div className="minboxcust3">0</div>
              <p style={{ fontSize: "15px" }} className="mt-2 mb-3">
                Cancelled projects
              </p>
              <p style={{ color: "#006872", fontSize: "12px" }}>
                Click to view
              </p>
            </div>
            <div className="boxcust3" style={{ marginLeft: "20px" }}>
              <div className="minboxcust3">0</div>
              <p style={{ fontSize: "15px" }} className="mt-2 mb-3">
                Ongoing projects
              </p>
              <p style={{ color: "#006872", fontSize: "12px" }}>
                Click to view
              </p>
            </div>
          </div>
        </div>
        <div
          style={{
            width: "54vw",
            // marginTop: "30px",
            marginLeft: "2vw",
            borderRadius: "10px",
            marginTop: "30px",
            marginRight: "2vw",
            backgroundColor: "white",
            height: "50vh",
            padding: "60px",
          }}
        >
          <h3>Services</h3>
          <div style={{ display: "flex", marginLeft: "-20px" }}>
            <div className="boxcust3" style={{ marginLeft: "20px" }}>
              <div className="minboxcust3">0</div>
              <p style={{ fontSize: "15px" }} className="mt-2 mb-3">
                Completed services
              </p>
              <p style={{ color: "#006872", fontSize: "12px" }}>
                Click to view
              </p>
            </div>

            <div className="boxcust3" style={{ marginLeft: "20px" }}>
              <div className="minboxcust3">0</div>
              <p style={{ fontSize: "15px" }} className="mt-2 mb-3">
                Ongoing services
              </p>
              <p style={{ color: "#006872", fontSize: "12px" }}>
                Click to view
              </p>
            </div>
          </div>
        </div>
        <div
          style={{
            width: "54vw",
            marginLeft: "2vw",
            // marginTop: "30px",
            borderRadius: "10px",
            marginTop: "30px",
            marginRight: "2vw",
            backgroundColor: "white",
            height: "41.7vh",
            padding: "60px",
          }}
        >
          <h4>Total earnings</h4>
          <h3 style={{ color: "#006872", paddingTop: "20px" }}>$0.00</h3>
          <button
            type="submit"
            class="btn btn-primary"
            style={{
              width: "10vw",
              borderRadius: "5px",
              backgroundColor: "#FFC727",
              border: "0px",
              marginTop: "0px",
            }}
          >
            send offer
          </button>
        </div>
      </div>
    </div>
  );
}

export default ViewProfile;
