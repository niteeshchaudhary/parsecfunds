import React, { useState, useEffect } from "react";
import bg_img from "../imges/emp-free-bg.svg";
import { Link, useNavigate } from "react-router-dom";
import { useUserAuth } from "../context/UserAuthContext";

import app from "../firebase";
import { getFunctions, httpsCallable } from "firebase/functions";

const functions = getFunctions(app, "asia-southeast2");
const getUserProfile = httpsCallable(functions, "getUserProfile");
const setRole = httpsCallable(functions, "setRole");

export default function Chooser() {
  const [userdata, setuserdata] = useState({});
  const [role, setroleloc] = useState("Freelancer");
  const { user } = useUserAuth();
  let navigate = useNavigate();

  const style = {
    panes: {
      // display: "flex",
      // justifyContent: "start",
      // alignItems: "start",
      // minWidth: "18vw",
      height: "15rem",
      // background:"black",
      // overflow: "hidden",
      // cursor: "pointer",
    },
    main: {
      display: "flex",
      justifyContent: "center",
      flexWrap: "wrap",
      height: "34rem",
    },
    cards: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "column",
      flexWrap: "wrap",
      borderRadius: "20px",
      height: "15rem",
      alignSelf: "center",
      width: "25vw",
      margin: "2rem",
      background: "#FFFFFF",
      border: " 1px solid rgba(0, 0, 0, 0.4)",
      padding: "0.5rem",
    },
  };

  const checkdata = () => {
    getUserProfile().then((result) => {
      console.log(result);
      if (result.data.result.status === 1) {
        setuserdata(result.data.result.desc);
        console.log(1);
        // setpic(result.data.result.desc.pic);
        // setrole(result.data.result.desc.role);
        // setscreen(result.data.result.desc.screen); //result.data.result.desc.screen);
        // setprofilestatus(result.data.result.desc.profilestatus); //result.data.result.desc.profilestatus);
      }
    });
  };
  const nextPage = () => {
    setRole({ role: role }).then((result) => {
      if (result.data.status == 1) {
        if (role == "Freelancer") {
          navigate("/ProfileInfo", {
            state: { profile: userdata },
          });
        } else if (role == "Employer") {
          navigate("/service", {
            state: { profile: userdata },
          });
        }
      }
    });
  };
  useEffect(() => {
    checkdata();
  }, []);
  if (userdata?.role == "Freelancer") {
    navigate("/ProfileInfo", {
      state: { profile: userdata },
    });
  } else if (userdata?.role == "Employer") {
    navigate("/service", {
      state: { profile: userdata },
    });
  }

  return (
    <>
      {userdata && !userdata?.role && (
        <>
          <div
            style={{
              backgroundImage: `url(${bg_img})`,
              width: "100vw",
              fontSize: "1rem",
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
            }}
            className="wrapitall"
          >
            <p
              style={{
                textAlign: "center",
                marginTop: "3rem",
                fontWeight: "600",
                fontSize: "1.4rem",
              }}
            >
              Join as a Employer or Freelancer
            </p>
            <div style={style.main}>
              <div style={style.panes}>
                <div style={style.cards}>
                  <img
                    style={{ width: "4rem", marginBottom: "1.5rem" }}
                    src={require("../imges/freelancer-icon.svg").default}
                  />
                  <div className="d-flex flex-row justify-content-center align-items-center">
                    <input
                      onClick={(e) => {
                        e.currentTarget.disabled = true;
                        setroleloc("Freelancer");
                        // console.log(
                        //   setRole({ role: "Freelancer" }).then(() =>
                        //     checkdata()
                        //   )
                        // );
                      }}
                      style={{ marginTop: "0", marginRight: "0.5rem" }}
                      name="freelancer-emp"
                      id="freelancer"
                      type="radio"
                    />
                    <label for="freelancer">I'm a Freelancer</label>
                  </div>
                </div>
              </div>
              <div style={style.panes}>
                <div style={style.cards}>
                  <img
                    style={{ width: "5rem", marginBottom: "2rem" }}
                    src={require("../imges/employee-icon.svg").default}
                  />
                  <div className="d-flex flex-row justify-content-center align-items-center">
                    <input
                      onClick={(e) => {
                        e.currentTarget.disabled = true;
                        setroleloc("Employer");
                        // console.log(
                        //   setRole({ role: "Employer" }).then(() => checkdata())
                        // );
                      }}
                      style={{ marginTop: "0", marginRight: "0.5rem" }}
                      name="freelancer-emp"
                      id="employer"
                      type="radio"
                    />
                    <label for="freelancer">I'm an Employer</label>
                  </div>
                </div>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  width: "100vw",
                }}
              >
                <button
                  onClick={nextPage}
                  style={{
                    width: "18vw",
                    background: "#006872",
                    height: "3rem",
                    bottom: "10%",
                    color: "white",
                    border: "none",
                    borderRadius: "0.4rem",
                    padding: "0.8rem",
                    boxShadow: " 0px 4px 4px rgba(0, 0, 0, 0.25)",
                  }}
                >
                  Next &#187;
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
