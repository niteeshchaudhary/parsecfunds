import React, { useState, useEffect } from "react";
import "./userdiv.css";
import app, { db } from "../../../firebase";
import { getFunctions, httpsCallable } from "firebase/functions";
const functions = getFunctions(app, "asia-southeast2");
const fetch3Users = httpsCallable(functions, "fetch3Users");
function Userdiv() {
  const [person1, setperson1] = useState(
    JSON.parse(localStorage.getItem("p0")) || {}
  );
  const [person2, setperson2] = useState(
    JSON.parse(localStorage.getItem("p1")) || {}
  );
  const [person3, setperson3] = useState(
    JSON.parse(localStorage.getItem("p2")) || {}
  );
  console.log(person3?.profile?.name);
  useEffect(() => {
    if (
      !localStorage.getItem("p0") ||
      !localStorage.getItem("p1") ||
      !localStorage.getItem("p2")
    ) {
      fetch3Users().then((result) => {
        console.log(result);
        if (result.data.result.status === 1) {
          setperson1(result.data.result.desc[0]);
          setperson2(result.data.result.desc[1]);
          setperson3(result.data.result.desc[2]);
          localStorage.setItem(
            "p0",
            JSON.stringify(result.data.result.desc[0])
          );
          localStorage.setItem(
            "p1",
            JSON.stringify(result.data.result.desc[1])
          );
          localStorage.setItem(
            "p2",
            JSON.stringify(result.data.result.desc[2])
          );
        }
      });
    }
  }, []);
  return (
    <>
      <div className="userdiv-wrap">
        <div className="user-container">
          <div className="img-box">
            <img
              src={
                person1?.profile?.pic ??
                require("../../../imges/avatar.svg").default
              }
              style={{ borderRadius: "50%" }}
              alt=""
            />
            <div className="name-title ">
              <div className="d-flex email-img mx-2">
                <h5 style={{ fontWeight: "600", marginRight: "0.3rem" }}>
                  {person1?.profile?.name}
                </h5>
                &nbsp;&nbsp;
                <img
                  src={require("../../../imges/emailtick.svg").default}
                  alt=""
                />
              </div>
              <h6 className="mx-2 ">{person1?.profile?.Title}</h6>
              <div className="d-flex">
                <div className="mx-2 avgrate">
                  {person1?.ProposedRate && (
                    <>
                      <h6 style={{ color: "rgba(0, 0, 0, 0.7)" }}>
                        Proposed Rate :&nbsp;{" "}
                      </h6>
                      <h6>${person1?.ProposedRate?.hourly}/hr</h6>
                    </>
                  )}
                </div>
                {/* <div className="mx-2 avgrate">
                  <h6 style={{ color: "rgba(0, 0, 0, 0.7)" }}>
                    Total Earnings
                  </h6>
                  <h6>$76683</h6>
                </div> */}
              </div>
            </div>
          </div>
          <div className="skillset ">
            {person1?.skills &&
              person1?.skills.map((skl, index) => (
                <p key={index} className="skills">
                  {skl}
                </p>
              ))}
          </div>
        </div>
        <div className="user-container">
          <div className="img-box">
            <img
              src={
                person1?.profile?.pic ??
                require("../../../imges/avatar.svg").default
              }
              style={{ borderRadius: "50%" }}
              alt=""
            />
            <div className="name-title">
              <div className="d-flex email-img mx-2">
                <h5 style={{ fontWeight: "600", marginRight: "0.3rem" }}>
                  {person2?.profile?.name}
                </h5>
                &nbsp;&nbsp;
                <img
                  src={require("../../../imges/emailtick.svg").default}
                  alt=""
                />
              </div>
              <h6 className="mx-2">{person2?.profile?.Title}</h6>
              <div className="d-flex ">
                <div className="mx-2 avgrate">
                  {person2?.ProposedRate && (
                    <>
                      <h6 style={{ color: "rgba(0, 0, 0, 0.7)" }}>
                        Proposed Rate :&nbsp;{" "}
                      </h6>
                      <h6>${person2?.ProposedRate?.hourly}/hr</h6>
                    </>
                  )}
                </div>
                <div className="mx-2 avgrate">
                  {/* <h6 style={{ color: "rgba(0, 0, 0, 0.7)" }}>
                    Total Earnings
                  </h6>
                  <h6>$76683</h6> */}
                </div>
              </div>
            </div>
          </div>
          <div className="skillset ">
            {person2?.skills &&
              person2?.skills.map((skl, index) => (
                <p key={index} className="skills">
                  {skl}
                </p>
              ))}
          </div>
        </div>
        <div className="user-container">
          <div className="img-box">
            <img
              src={
                person3?.profile?.pic ??
                require("../../../imges/avatar.svg").default
              }
              style={{ borderRadius: "50%" }}
              alt=""
            />
            <div className="name-title">
              <div className="d-flex email-img mx-2">
                <h5 style={{ fontWeight: "600", marginRight: "0.3rem" }}>
                  {person3?.profile?.name}
                </h5>
                &nbsp;&nbsp;
                <img
                  src={require("../../../imges/emailtick.svg").default}
                  alt=""
                />
              </div>
              <h6 className="mx-2">{person3?.profile?.Title}</h6>
              <div className="d-flex">
                <div className="mx-2 avgrate">
                  {person3?.ProposedRate && (
                    <>
                      <h6 style={{ color: "rgba(0, 0, 0, 0.7)" }}>
                        Proposed Rate :&nbsp;{" "}
                      </h6>
                      <h6>${person3?.ProposedRate?.hourly}/hr</h6>
                    </>
                  )}
                </div>
                <div className="mx-2 avgrate">
                  {/* <h6 style={{ color: "rgba(0, 0, 0, 0.7)" }}>
                    Total Earnings
                  </h6>
                  <h6>$76683</h6> */}
                </div>
              </div>
            </div>
          </div>
          <div className="skillset ">
            {person3?.skills &&
              person3?.skills.map((skl, index) => (
                <p key={index} className="skills">
                  {skl}
                </p>
              ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default Userdiv;
