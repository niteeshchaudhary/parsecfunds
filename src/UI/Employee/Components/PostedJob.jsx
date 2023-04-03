import React, { useEffect, useState } from "react";

import { useNavigate, useLocation } from "react-router-dom";
import PostedJobList from "./PostedJobList";
import { SpinnerDotted } from "spinners-react";
import app, { db, storage, auth } from "../../../firebase";
import { getFunctions, httpsCallable } from "firebase/functions";
const functions = getFunctions(app, "asia-southeast2");
const getPostedJobs = httpsCallable(functions, "getPostedJobs");

function PostedJob() {
  const { state } = useLocation();
  const [loadingState, setLoadingState] = useState(true);
  const [jobs, setjobs] = useState(
    JSON.parse(localStorage.getItem("PostedJobs")) || []
  );
  const postedcss = {
    background:
      " linear-gradient(180deg, #FFFFFF 0%, rgba(255, 255, 255, 0) 100%)",
    border: "0.1rem solid rgba(0, 0, 0, 0.3)",
    filter: " drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))",
    fontSize: "1rem",
    width: "70vw",
    borderRadius: "1rem",
    padding: "1.5rem",
    margin: "1rem",
  };
  const proposalcount = {
    background:
      " linear-gradient(180deg, #FFFFFF 0%, rgba(255, 255, 255, 0) 100%)",
    border: "0.1rem solid rgba(0, 0, 0, 0.3)",
    filter: " drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))",

    width: "15vw",
    borderRadius: "1rem",
    padding: "3.6rem",
    margin: "1rem",
  };
  useEffect(() => {
    getPostedJobs()
      .then((result) => {
        console.log(result);
        if (result.data.result.status == 1) {
          const arr = Object.values(result.data.result.desc);
          console.log(arr);
          setjobs(arr);
          localStorage.setItem("PostedJobs", JSON.stringify(arr));
          setLoadingState(false);
        } else {
          setLoadingState(false);
          alert("Something went Wrong");
          console.log(result.data.result.desc);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  return (
    <>
      {state?.job && (
        <div className="jobdetail-box d-flex flex-row justify-content-start">
          <img
            style={{ width: "1.2rem", marginRight: "0.5rem" }}
            src={require("../../../imges/tick-solid.svg").default}
            alt=""
          />
          <p
            style={{
              fontSize: "1.2rem",
              fontWeight: "600",
              color: "#006872",
              padding: "0.5rem",
            }}
            className=""
          >
            Congratulations, your job has been posted!{" "}
          </p>
        </div>
      )}
      <div className="jobdetail-box">
        <p
          style={{
            fontSize: "1.4rem",
            margin: "1rem 1.5rem",
            fontWeight: "600",
          }}
        >
          Manage Jobs
        </p>
        <div
          style={{ borderBottom: "0.1rem solid rgba(0,0,0,0.2)" }}
          className=""
        ></div>
        <p style={{ fontSize: "1.2rem", margin: "1.5rem" }}>Posted Jobs</p>

        {jobs.map((data, index) => (
          <PostedJobList key={index} data={data} />
        ))}

        {loadingState && (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              width: "100%",
              height: "20vh",
              alignItems: "center",
            }}
          >
            <SpinnerDotted style={{ height: "3rem" }} />
          </div>
        )}

        {/* <div className="d-flex flex-row justify-content-start">
          <div className="postedjob-wrapper">
            <div
              style={postedcss}
              className=" d-flex flex-row justify-content-between"
            >
              <div className="">
                <div className="d-flex email-img mx-2">
                  <h5 style={{ fontWeight: "600", marginRight: "0.3rem" }}>
                    Kate Tanner
                  </h5>
                  <img
                    style={{ width: "1.2rem" }}
                    src={require("../../../imges/emailtick.svg").default}
                    alt=""
                  />
                </div>
                <h6 style={{ color: "#006872" }} className="mx-2 ">
                  Web designer
                </h6>
                <div className="d-flex flex-row justify-content-start m-1 mx-2">
                  <img
                    style={{ width: "1.1rem", marginRight: "0.5rem" }}
                    src={require("../../../imges/basic_level.svg").default}
                    alt=""
                  />
                  <p>Entry level</p>
                </div>
                <div className="d-flex flex-row justify-content-start m-1 mx-2">
                  <img
                    style={{ width: "1.2rem", marginRight: "0.5rem" }}
                    src={require("../../../imges/jobtype.svg").default}
                    alt=""
                  />
                  <p>Job type: Remote</p>
                </div>
                <div className="d-flex flex-row justify-content-start m-1 mx-2">
                  <img
                    style={{
                      width: "0.8rem",
                      marginLeft: "0.2rem",
                      marginRight: "0.6rem",
                    }}
                    src={require("../../../imges/location.svg").default}
                    alt=""
                  />
                  <p>Canada</p>
                </div>
              </div>
              <div className="buttons d-flex flex-row">
                <button
                  style={{
                    width: "7vw",
                    fontSize: "1rem",
                    padding: "0.5rem",
                    background: "#006872",
                    color: "white",
                    margin: "1rem 0.5rem",
                    border: "none",
                    boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
                    borderRadius: "0.4rem",
                  }}
                  clasName="btn"
                >
                  View{" "}
                </button>
                <button
                  style={{
                    width: "7vw",
                    fontSize: "1rem",
                    padding: "0.5rem",
                    background: "#C7C7C7",
                    color: "white",
                    margin: "1rem 0.5rem",
                    border: "none",
                    boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
                    borderRadius: "0.4rem",
                  }}
                  clasName="btn btn-primary"
                >
                  Edit job
                </button>
              </div>
            </div>
          </div>
          <div
            style={proposalcount}
            className="proposals-count d-flex flex-column align-items-center justify-content-center"
          >
            <p style={{ color: "#006872" }}>2</p>
            <p style={{ fontSize: "1.1rem", color: "#000000B2" }}>Proposals</p>
          </div>
        </div>

        <div className="d-flex flex-row justify-content-start">
          <div className="postedjob-wrapper">
            <div
              style={postedcss}
              className=" d-flex flex-row justify-content-between"
            >
              <div className="">
                <div className="d-flex email-img mx-2">
                  <h5 style={{ fontWeight: "600", marginRight: "0.3rem" }}>
                    Kate Tanner
                  </h5>
                  <img
                    style={{ width: "1.2rem" }}
                    src={require("../../../imges/emailtick.svg").default}
                    alt=""
                  />
                </div>
                <h6 style={{ color: "#006872" }} className="mx-2 ">
                  Web designer
                </h6>
                <div className="d-flex flex-row justify-content-start m-1 mx-2">
                  <img
                    style={{ width: "1.1rem", marginRight: "0.5rem" }}
                    src={require("../../../imges/basic_level.svg").default}
                    alt=""
                  />
                  <p>Entry level</p>
                </div>
                <div className="d-flex flex-row justify-content-start m-1 mx-2">
                  <img
                    style={{ width: "1.2rem", marginRight: "0.5rem" }}
                    src={require("../../../imges/jobtype.svg").default}
                    alt=""
                  />
                  <p>Job type: Remote</p>
                </div>
                <div className="d-flex flex-row justify-content-start m-1 mx-2">
                  <img
                    style={{
                      width: "0.8rem",
                      marginLeft: "0.2rem",
                      marginRight: "0.6rem",
                    }}
                    src={require("../../../imges/location.svg").default}
                    alt=""
                  />
                  <p>Canada</p>
                </div>
              </div>
              <div className="buttons d-flex flex-row">
                <button
                  style={{
                    width: "7vw",
                    fontSize: "1rem",
                    padding: "0.5rem",
                    background: "#006872",
                    color: "white",
                    margin: "1rem 0.5rem",
                    border: "none",
                    boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
                    borderRadius: "0.4rem",
                  }}
                  clasName="btn"
                >
                  View{" "}
                </button>
                <button
                  style={{
                    width: "7vw",
                    fontSize: "1rem",
                    padding: "0.5rem",
                    background: "#C7C7C7",
                    color: "white",
                    margin: "1rem 0.5rem",
                    border: "none",
                    boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
                    borderRadius: "0.4rem",
                  }}
                  clasName="btn btn-primary"
                >
                  Edit job
                </button>
              </div>
            </div>
          </div>
          <div
            style={proposalcount}
            className="proposals-count d-flex flex-column align-items-center justify-content-center"
          >
            <p style={{ color: "#006872" }}>2</p>
            <p style={{ fontSize: "1.1rem", color: "#000000B2" }}>Proposals</p>
          </div>
        </div>

        <div className="d-flex flex-row justify-content-start">
          <div className="postedjob-wrapper">
            <div
              style={postedcss}
              className=" d-flex flex-row justify-content-between"
            >
              <div className="">
                <div className="d-flex email-img mx-2">
                  <h5 style={{ fontWeight: "600", marginRight: "0.3rem" }}>
                    Kate Tanner
                  </h5>
                  <img
                    style={{ width: "1.2rem" }}
                    src={require("../../../imges/emailtick.svg").default}
                    alt=""
                  />
                </div>
                <h6 style={{ color: "#006872" }} className="mx-2 ">
                  Web designer
                </h6>
                <div className="d-flex flex-row justify-content-start m-1 mx-2">
                  <img
                    style={{ width: "1.1rem", marginRight: "0.5rem" }}
                    src={require("../../../imges/basic_level.svg").default}
                    alt=""
                  />
                  <p>Entry level</p>
                </div>
                <div className="d-flex flex-row justify-content-start m-1 mx-2">
                  <img
                    style={{ width: "1.2rem", marginRight: "0.5rem" }}
                    src={require("../../../imges/jobtype.svg").default}
                    alt=""
                  />
                  <p>Job type: Remote</p>
                </div>
                <div className="d-flex flex-row justify-content-start m-1 mx-2">
                  <img
                    style={{
                      width: "0.8rem",
                      marginLeft: "0.2rem",
                      marginRight: "0.6rem",
                    }}
                    src={require("../../../imges/location.svg").default}
                    alt=""
                  />
                  <p>Canada</p>
                </div>
              </div>
              <div className="buttons d-flex flex-row">
                <button
                  style={{
                    width: "7vw",
                    fontSize: "1rem",
                    padding: "0.5rem",
                    background: "#006872",
                    color: "white",
                    margin: "1rem 0.5rem",
                    border: "none",
                    boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
                    borderRadius: "0.4rem",
                  }}
                  clasName="btn"
                >
                  View{" "}
                </button>
                <button
                  style={{
                    width: "7vw",
                    fontSize: "1rem",
                    padding: "0.5rem",
                    background: "#C7C7C7",
                    color: "white",
                    margin: "1rem 0.5rem",
                    border: "none",
                    boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
                    borderRadius: "0.4rem",
                  }}
                  clasName="btn btn-primary"
                >
                  Edit job
                </button>
              </div>
            </div>
          </div>
          <div
            style={proposalcount}
            className="proposals-count d-flex flex-column align-items-center justify-content-center"
          >
            <p style={{ color: "#006872" }}>2</p>
            <p style={{ fontSize: "1.1rem", color: "#000000B2" }}>Proposals</p>
          </div>
        </div> */}
      </div>
    </>
  );
}

export default PostedJob;
