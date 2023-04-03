import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUserAuth } from "../context/UserAuthContext";
import { type } from "@testing-library/user-event/dist/type";
import "./SignUp.css";
import SignupSvg from "../imges/Signup.svg";
import googleSvg from "../imges/googleico.svg";
import linkedinSvg from "../imges/linkedinico.svg";
import appleSvg from "../imges/appleico.svg";

function SignUp() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [password, setPassword] = useState("");
  const [role, setrole] = useState("Freelancer");
  const [confirmpassword, setconfirmPassword] = useState("");
  const { signUp } = useUserAuth();
  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      if (password !== confirmpassword) {
        throw new Error("confirm password doesn't match with the password.");
      }
      document.getElementById("signUpbutton").disabled = true;
      await signUp(email, name, role, password);
      navigate("/verification", { state: 1 });
    } catch (err) {
      setError(err.message);
      document.getElementById("signUpbutton").disabled = false;
    }
  };

  const handleGoogleSignIn = async (e) => {
    e.preventDefault();
    try {
      //await googleSignIn();
      navigate("/dashboard");
    } catch (error) {
      console.log(error.message);
    }
  };
  const handleFacebookSignIn = async (e) => {
    e.preventDefault();
    try {
      //await facebookSignIn();
      navigate("/dashboard");
    } catch (error) {
      console.log(error.message);
    }
  };
  const handleAppleSignIn = async (e) => {
    e.preventDefault();
    try {
      //await appleSignIn();
      navigate("/dashboard");
    } catch (error) {
      console.log(error.message);
    }
  };
  const handleLinkedInSignIn = async (e) => {
    e.preventDefault();
    try {
      //await LinkedInSignIn();
      navigate("/dashboard");
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
    <div className="main-log">
      <div className="leftbar">
        <img src={SignupSvg} className="imglog1" alt="React Logo" />
      </div>
      <div
        className="Scroll"
        style={{
          overflow: "auto",
          minWidth: "50%",
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
        <form onSubmit={handleSubmit}>
          <h6>Join as Employer or Freelancer</h6>
          <div className="mb-5">
            <b>
              <input
                type="radio"
                id="html"
                name="fav_language"
                style={{ accentColor: "#ffcc00" }}
                value="HTML"
                onClick={fhan}
                defaultChecked="checked"
              />
              <label
                className="form-check-label"
                htmlFor="html"
                style={{ marginLeft: "5px" }}
              >
                Freelancer
              </label>
              &nbsp;&nbsp;&nbsp;&nbsp;
              <input
                style={{ marginLeft: "20px", accentColor: "#ffcc00" }}
                type="radio"
                id="html2"
                name="fav_language"
                value="HTML"
                onClick={ehan}
              />
              <label
                className="form-check-label"
                htmlFor="html2"
                style={{ marginLeft: "5px" }}
              >
                Employer
              </label>
            </b>
          </div>
          <div className="mb-4" style={{ width: "96%", marginTop: "-20px" }}>
            <div className="icon2">
              {/* <i className="fa fa-google fa-lg" /> */}
              <img
                src={googleSvg}
                alt="google"
                style={{ width: "40px", height: "95%" }}
              />
              <span
                onClick={handleGoogleSignIn}
                style={{
                  width: "100%",
                  textAlign: "center",
                  paddingTop: "1.5%",
                  fontWeight: "bold",
                }}
              >
                Continue with Google
              </span>
            </div>
            <div className="icon2" style={{ marginTop: "-1px" }}>
              {/* <i className="fa fa-facebook fa-lg" /> */}
              <img
                src={linkedinSvg}
                alt="linkedin"
                style={{ width: "40px", height: "80%" }}
              />
              <span
                onClick={handleLinkedInSignIn}
                style={{
                  width: "100%",
                  textAlign: "center",
                  paddingTop: "1.5%",
                  fontWeight: "bold",
                }}
              >
                Continue with LinkedIn
              </span>
            </div>
            <div className="icon2" style={{ marginTop: "-1px" }}>
              {/* <i className="fa fa-linkedin fa-lg" /> */}
              <img
                src={appleSvg}
                alt="apple"
                style={{ width: "40px", height: "80%" }}
              />
              <span
                onClick={handleAppleSignIn}
                style={{
                  width: "100%",
                  textAlign: "center",
                  paddingTop: "1.5%",
                  fontWeight: "bold",
                }}
              >
                Continue with Apple
              </span>
            </div>
          </div>
          <h5
            style={{
              width: "100%",
              textAlign: "center",
              margin: "-10px 0 20px 0",
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
                placeholder="Full Name"
                style={{
                  width: "95%",
                  padding: "12px 20px",
                  height: "50px",
                  margin: "-6px 0 0 0",
                  boxSizing: "border-box",
                  border: "2px solid rgba(90, 90, 90, 0.4)",
                  borderRadius: "20px",
                }}
                onChange={(e) => setName(e.target.value)}
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
                  padding: "12px 20px",
                  height: "50px",
                  margin: "-6px 0 0 0",
                  marginTop: "-15px",
                  boxSizing: "border-box",
                  border: "2px solid rgba(90, 90, 90, 0.4)",
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
                  padding: "12px 20px",
                  height: "50px",
                  margin: "-6px 0 0 0",
                  marginTop: "-15px",
                  boxSizing: "border-box",
                  border: "2px solid rgba(90, 90, 90, 0.4)",
                  borderRadius: "20px",
                }}
                onChange={(e) => setPassword(e.target.value)}
              />
              <i
                className="far fa-eye"
                id="togglePassword"
                style={{ marginLeft: "-50px", cursor: "pointer" }}
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
                  padding: "12px 20px",
                  height: "50px",
                  margin: "-6px 0 0 0",
                  marginTop: "-15px",
                  boxSizing: "border-box",
                  border: "2px solid rgba(90, 90, 90, 0.4)",
                  borderRadius: "20px",
                }}
                onChange={(e) => setconfirmPassword(e.target.value)}
              />
            </div>
            {error && (
              <div
                className="alert mb-5"
                role="alert"
                style={{
                  color: "#006872",
                  backgroundColor: "#FEFCC5",
                  width: "95%",
                }}
              >
                {error}
              </div>
            )}
            <div style={{ display: "flex" }}>
              <input
                type="checkbox"
                className="form-check-input"
                id="exampleCheck1"
              />
              <label
                className="form-check-label mb-5"
                htmlFor="exampleCheck1"
                style={{ fontSize: "15px", paddingLeft: "5px" }}
              >
                &nbsp; By creating an account you are agreeing to the terms and
                conditions{" "}
                <a style={{ color: "#FFC727" }}>Terms and Conditions</a>
              </label>
            </div>
            <div
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <button
                type="submit"
                id="signUpbutton"
                className="btn btn-primary"
                style={{
                  width: "40%",
                  height: "51px",
                  background: "#006872",
                  boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
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
  );
}

export default SignUp;
