import React, { useState } from "react";
import { SpinnerDotted } from "spinners-react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useUserAuth } from "../context/UserAuthContext";
import { type } from "@testing-library/user-event/dist/type";
import "./SignUp.css";
import { getFunctions, httpsCallable } from "firebase/functions";
import SignupSvg from "../imges/Signup.svg";
import linkedinSvg from "../imges/linkedinico.svg";
import googleSvg from "../imges/googleico.svg";
import facebookSvg from "../imges/facebook.svg";
import gitSvg from "../imges/github.svg";
import app from "../firebase";

function SignUp() {
  const [loadingState, setLoadingState] = useState(false);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [password, setPassword] = useState("");
  const [role, setrole] = useState("Freelancer");
  const { googleSignIn, facebookSignIn, gitSignIn } = useUserAuth();
  const [confirmpassword, setconfirmPassword] = useState("");
  const { signUp } = useUserAuth();
  let navigate = useNavigate();

  const functions = getFunctions(app, "asia-southeast2");

  const getUserProfile = httpsCallable(functions, "getUserProfile");
  const userLogin = httpsCallable(functions, "userLogin");

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(email, name, role, password);
    setError("");
    try {
      console.log(/^[a-zA-Z ]*$/i.test(name));
      if (!/^[a-zA-Z ]*$/i.test(name)) {
        throw new Error("Name can be alphabetic only");
      }
      if (password !== confirmpassword) {
        throw new Error("confirm password doesn't match with the password.");
      }
      document.getElementById("signUpbutton").disabled = true;
      await signUp(email, name, role, password);
      navigate("/verification", { state: 1 });
    } catch (err) {
      var error = err.message.includes(":")
        ? err.message.slice(err.message.indexOf(":") + 1)
        : err.message;
      setError(error);
      document.getElementById("signUpbutton").disabled = false;
    }
  };
  async function socialLogin() {
    try {
      console.log(await userLogin());
      document.getElementById("signUpbutton").disabled = true;
      console.log(7);
      getUserProfile().then((result) => {
        console.log(result);
        if (result.data.result.desc.profilestatus === false) {
          if (result.data.result.desc.role === "Freelancer") {
            navigate("/ProfileInfo", {
              state: { profile: result.data.result.desc },
            });
          } else if (result.data.result.desc.role === "Employer") {
            navigate("/service", {
              state: { profile: result.data.result.desc },
            });
          } else {
            navigate("/chooser", {
              state: { profile: result.data.result.desc },
            });
          }
        } else {
          if (result.data.result.desc.role === "Freelancer") {
            navigate("/dashboard", {
              state: { profile: result.data.result.desc },
            });
          } else if (result.data.result.desc.role === "Employer") {
            navigate("/Edashboard", {
              state: { profile: result.data.result.desc },
            });
          } else {
            navigate("/chooser", {
              state: { profile: result.data.result.desc },
            });
          }
        }
      });
      console.log(8);
    } catch (e) {
      console.log(e.message);
    }
  }

  const handleGoogleSignIn = async (e) => {
    e.preventDefault();
    try {
      await googleSignIn().then(async (result) => {
        if (result) {
          await socialLogin();
        } else {
          throw new Error("Error in login, try another way");
        }
      });
    } catch (error) {
      console.log(error.message);
      document.getElementById("signUpbutton").disabled = false;
      setError(error.message);
    }
  };
  const handleFacebookSignIn = async (e) => {
    e.preventDefault();
    try {
      await facebookSignIn().then(async (result) => {
        if (result) {
          await socialLogin();
        } else {
          throw new Error("Error in login, try another way");
        }
      });
    } catch (error) {
      console.log(error.message);
      document.getElementById("signUpbutton").disabled = false;
      setError(error.message);
    }
  };
  const handlegitSignIn = async (e) => {
    e.preventDefault();
    try {
      await gitSignIn().then(async (result) => {
        if (result) {
          await socialLogin();
        } else {
          throw new Error("Error in login, try another way");
        }
      });
    } catch (error) {
      console.log(error.message);
      document.getElementById("signUpbutton").disabled = false;
      setError(error.message);
    }
  };
  const handleLinkedInSignIn = async (e) => {
    e.preventDefault();
    try {
      const win = window.open("popup.html", "name", "height=585,width=400");
      localStorage.setItem("logged", "false");
      var timer = setInterval(async function () {
        if (win.closed) {
          clearInterval(timer);
          console.log(localStorage.getItem("logged"));
          if (localStorage.getItem("loggeded") == "true") {
            await socialLogin();
          }
        }
      }, 1000);
    } catch (error) {
      console.log(error.message);
    }
  };

  function togglepass() {
    const password1 = document.querySelector("#id_password");
    password1.getAttribute("type") === "password"
      ? password1.setAttribute("type", type)
      : password1.setAttribute("type", "password");
  }

  function fhan() {
    setrole("Freelancer");
  }
  function ehan() {
    setrole("Employer");
  }
  return (
    <>
      {loadingState && (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            width: "100%",
            height: "100%",
            alignItems: "center",
          }}
        >
          <SpinnerDotted />
        </div>
      )}
      {!loadingState && (
        <div className="main-log">
          <div className="leftbar">
            <div style={{ height: "44rem" }}>
              <img src={SignupSvg} className="imglog1" alt="React Logo" />
            </div>
          </div>
          <div
            className="Scroll"
            style={{
              overflow: "auto",
              Width: "50%",
              padding: "1% 2% 2% 2%",
              height: "100vh",
            }}
          >
            <p
              style={{
                width: "100%",
                textAlign: "right",
                marginBottom: "5px",
              }}
            >
              {/* style={{paddingTop: "40px"}} */}
              Already a member?&nbsp;&nbsp;<Link to="/">SignIn</Link>
            </p>
            <h4>
              <b>Create account</b>
            </h4>
            <form onSubmit={handleSubmit} style={{ marginTop: "3%" }}>
              <h6>Join as Employer or Freelancer</h6>
              <div
                style={{ display: "flex", height: "1.8rem", margin: "1% 1%" }}
              >
                <input
                  type="radio"
                  id="html"
                  name="fav_language"
                  style={{
                    accentColor: "#ffcc00",
                    width: "1.5rem",
                    alignSelf: "center",
                  }}
                  value="Freelancer"
                  onClick={fhan}
                  defaultChecked="checked"
                />
                <label
                  className="form-check-label"
                  htmlFor="html"
                  style={{ margin: 0, padding: 0, marginLeft: "0.5rem" }}
                >
                  <b>Freelancer</b>
                </label>
                &nbsp;&nbsp;&nbsp;&nbsp;
                <input
                  style={{
                    marginLeft: "2rem",
                    width: "1.5rem",
                    alignSelf: "center",
                    accentColor: "#ffcc00",
                  }}
                  type="radio"
                  id="html2"
                  name="fav_language"
                  value="Employer"
                  onClick={ehan}
                />
                <label
                  className="form-check-label"
                  htmlFor="html2"
                  style={{ margin: 0, padding: 0, marginLeft: "0.5rem" }}
                >
                  <b>Employer</b>
                </label>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "center",
                  flexWrap: "wrap",
                  margin: "1% 0px 2% 0px",
                  width: "95%",
                }}
              >
                <div className="icon2" onClick={handleGoogleSignIn}>
                  {/* <i className="fa fa-google fa-lg" /> */}
                  <img
                    src={googleSvg}
                    style={{ width: "2.5rem", height: "100%" }}
                  />
                  <span
                    style={{
                      width: "100%",
                      paddingLeft: "3%",
                      alignSelf: "center",
                      fontWeight: "bold",
                    }}
                  >
                    Google
                  </span>
                </div>
                <div className="icon2" onClick={handleFacebookSignIn}>
                  {/* <i className="fa fa-facebook fa-lg" /> */}
                  <img
                    src={facebookSvg}
                    style={{ width: "2.5rem", height: "100%" }}
                  />
                  <span
                    style={{
                      width: "100%",
                      paddingLeft: "3%",
                      alignSelf: "center",
                      fontWeight: "bold",
                    }}
                  >
                    Facebook
                  </span>
                </div>
                <div className="icon2" onClick={handleLinkedInSignIn}>
                  {/* <i className="fa fa-linkedin fa-lg" /> */}
                  <img
                    src={linkedinSvg}
                    style={{ width: "2.5rem", height: "100%" }}
                  />
                  <span
                    style={{
                      width: "100%",
                      paddingLeft: "3%",
                      alignSelf: "center",
                      fontWeight: "bold",
                    }}
                  >
                    LinkedIn
                  </span>
                </div>
              </div>

              <h5
                style={{
                  width: "95%",
                  textAlign: "center",
                  margin: "2% 0 4% 0",
                }}
              >
                -- OR --
              </h5>

              <div style={{ width: "100%" }}>
                <div className="mb-4 cus">
                  <input
                    type="text"
                    id="exampleInputName"
                    aria-describedby="emailHelp"
                    minLength="3"
                    placeholder="Full Name"
                    style={{
                      width: "95%",
                      padding: "3% 3%",
                      height: "3.1rem",
                      margin: "-0.6rem 0 0 0",
                      boxSizing: "border-box",
                      border: "0.1rem solid rgba(90, 90, 90, 0.4)",
                      borderRadius: "20px",
                    }}
                    onChange={(e) => setName(e.target.value)}
                    onKeyDown={(e) => {
                      if (/[a-z ]/i.test(e.key)) {
                        return true;
                      } else {
                        e.preventDefault();
                      }
                    }}
                    required
                  />
                </div>
                <div className="mb-4 cus">
                  <input
                    type="email"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    placeholder="Email Address"
                    style={{
                      width: "95%",
                      padding: "3% 3%",
                      height: "3.1rem",
                      margin: "-0.6rem 0 0 0",
                      boxSizing: "border-box",
                      border: "0.1rem solid rgba(90, 90, 90, 0.4)",
                      borderRadius: "20px",
                    }}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-4">
                  <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    autoComplete="current-password"
                    required
                    id="id_password"
                    style={{
                      width: "95%",
                      padding: "3% 3%",
                      height: "3.1rem",
                      margin: "-0.6rem 0 0 0",
                      boxSizing: "border-box",
                      border: "0.1rem solid rgba(90, 90, 90, 0.4)",
                      borderRadius: "20px",
                    }}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <i
                    className="far fa-eye"
                    id="togglePassword"
                    style={{ marginLeft: "-4rem", cursor: "pointer" }}
                    onClick={togglepass}
                  />
                </div>
                <div className="mb-4">
                  <input
                    type="password"
                    name="cpassword"
                    placeholder="Confirm Password"
                    autoComplete="current-password"
                    required
                    id="cid_password"
                    style={{
                      width: "95%",
                      padding: "3% 3%",
                      height: "3.1rem",
                      margin: "-0.6rem 0 0 0",
                      boxSizing: "border-box",
                      border: "0.1rem solid rgba(90, 90, 90, 0.4)",
                      borderRadius: "20px",
                    }}
                    onChange={(e) => setconfirmPassword(e.target.value)}
                  />
                </div>
                {error && (
                  <div
                    role="alert"
                    style={{
                      color: "#006872",
                      padding: "0% 2%",
                      margin: "3% 1%",
                      backgroundColor: "#FEFCC5",
                      height: "1.8rem",
                      width: "95%",
                    }}
                  >
                    {error}
                  </div>
                )}
                <div style={{ display: "flex", marginTop: "-0.1rem" }}>
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="exampleCheck1"
                    required
                  />
                  <label
                    className="form-check-label mb-5"
                    htmlFor="exampleCheck1"
                    style={{ fontSize: "0.9rem", paddingLeft: "5px" }}
                  >
                    &nbsp; By creating an account you are agreeing to the terms
                    and conditions{" "}
                    <NavLink to="/Terms" style={{ color: "#FFC727" }}>
                      Terms and Conditions
                    </NavLink>
                  </label>
                </div>
                <div
                  style={{
                    width: "100%",
                    display: "flex",
                    marginTop: "-1rem",
                    justifyContent: "center",
                  }}
                >
                  <button
                    type="submit"
                    id="signUpbutton"
                    className="btn btn-primary"
                    style={{
                      width: "13rem",
                      height: "3.2rem",
                      background: "#006872",
                      boxShadow: "0px 0.3rem 0.3rem rgba(0, 0, 0, 0.25)",
                      borderRadius: "20px",
                    }}
                  >
                    Create Account
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default SignUp;
