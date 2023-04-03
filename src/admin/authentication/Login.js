import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useUserAuth } from "../context/UserAuthContext";
import { useNavigate } from "react-router-dom";
import { type } from "@testing-library/user-event/dist/type";
import loginSvg from "../imges/login.svg";
import googleSvg from "../imges/googleico.svg";
import linkedinSvg from "../imges/linkedinico.svg";
import appleSvg from "../imges/appleico.svg";
import { getFunctions, httpsCallable } from "firebase/functions";
import { db } from "../firebase";
import { auth } from "../firebase";
import app from "../firebase";

import "./Login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password2, setPassword] = useState("");
  const [error, setError] = useState("");
  const { logIn, googleSignIn, facebookSignIn } = useUserAuth();
  const navigate = useNavigate();

  const functions = getFunctions(app, "asia-southeast2");

  const getUserProfile = httpsCallable(functions, "getUserProfile");

  const handleSubmit = async (e) => {
    console.log(4);
    e.preventDefault();
    setError("");
    console.log(5);
    try {
      await logIn(email, password2);
      console.log(6);
      document.getElementById("loginbut").disabled = true;
      console.log(7);
      getUserProfile().then((result) => {
        console.log(result);
        if (result.data.result.desc.profilestatus === false) {
          navigate("/ProfileInfo", {
            state: { profile: result.data.result.desc },
          });
        } else {
          navigate("/dashboard");
        }
      });
      console.log(8);
    } catch (err) {
      console.log(err);
      setError(err.message);
    }
  };

  const handleGoogleSignIn = async (e) => {
    e.preventDefault();
    try {
      await googleSignIn();
      navigate("/ProfileInfo");
    } catch (error) {
      console.log(error.message);
    }
  };
  const handleFacebookSignIn = async (e) => {
    e.preventDefault();
    try {
      await facebookSignIn();
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
    password1.classList.remove("fa-eye");
    password1.classList.add("fa-eye-slash");
    password1.getAttribute("type") === "password"
      ? password1.setAttribute("type", type)
      : password1.setAttribute("type", "password");
  }

  return (
    <div className="main-log2">
      <div className="leftbar">
        <img src={loginSvg} className="imglog12" alt="React Logo" />
      </div>
      <div
        className="Scroll"
        style={{
          overflow: "auto",
          minWidth: "50%",
          padding: "2% 2% 2% 2%",
          height: "100vh",
        }}
      >
        <p style={{ width: "100%", textAlign: "right" }}>
          Not a member?&nbsp;&nbsp;<Link to="/signup">SignUp</Link>{" "}
        </p>
        <h4 className="mb-4">Login to your account</h4>
        <form onSubmit={handleSubmit}>
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
                margin: "10px 0 0 0",
                boxSizing: "border-box",
                border: "2px solid rgba(90, 90, 90, 0.4)",
                borderRadius: "20px",
              }}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <input
              type="password"
              name="password"
              placeholder="Password"
              autoComplete="current-password"
              required=""
              id="id_password"
              style={{
                width: "95%",
                padding: "12px 20px",
                height: "50px",
                margin: "-6px 0 0 0",
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
          <div style={{ marginBottom: "3%" }}>
            <h4 style={{ width: "100%", textAlign: "center" }}>-- OR --</h4>
          </div>
          <div className="mb-4" style={{ width: "95%" }}>
            <div className="icon2" onClick={handleGoogleSignIn}>
              {/* <i className="fa fa-google fa-lg" /> */}
              <img src={googleSvg} style={{ width: "40px", height: "95%" }} />
              <span
                style={{
                  width: "100%",
                  textAlign: "center",
                  paddingTop: "1.6%",
                  fontWeight: "bold",
                }}
              >
                Continue with Google
              </span>
            </div>
            <div className="icon2" onClick={handleLinkedInSignIn}>
              {/* <i className="fa fa-facebook fa-lg" /> */}
              <img src={linkedinSvg} style={{ width: "40px", height: "80%" }} />
              <span
                style={{
                  width: "100%",
                  textAlign: "center",
                  paddingTop: "1.6%",
                  fontWeight: "bold",
                }}
              >
                Continue with LinkedIn
              </span>
            </div>
            <div className="icon2" onClick={handleAppleSignIn}>
              {/* <i className="fa fa-linkedin fa-lg" /> */}
              <img src={appleSvg} style={{ width: "40px", height: "80%" }} />
              <span
                style={{
                  width: "100%",
                  textAlign: "center",
                  paddingTop: "1.6%",
                  fontWeight: "bold",
                }}
              >
                Continue with Apple
              </span>
            </div>
          </div>
          {error && (
            <div
              className="alert"
              role="alert"
              style={{
                color: "#006872",
                padding: "0",
                backgroundColor: "#FEFCC5",
                height: "30px",
                width: "95%",
              }}
            >
              {error}
              {error == "verify the email first"
                ? ". if verified it may take 5-10 min to activate."
                : ""}
            </div>
          )}
          <div
            className="mb-5"
            style={{ display: "flex", justifyContent: "space-around" }}
          >
            <div>
              <input
                type="checkbox"
                className="form-check-input"
                id="exampleCheck1"
              />
              <label className="form-check-label" htmlFor="exampleCheck1">
                &nbsp;&nbsp;Remember me
              </label>
            </div>
            <div>
              <Link to="/forgot">Forgot Password?</Link>
            </div>
          </div>
          <div
            style={{
              width: "100%",
              display: "flex",
              marginBottom: "-40px",
              justifyContent: "center",
            }}
          >
            <button
              type="submit"
              className="btn btn-primary"
              id="loginbut"
              style={{
                width: "40%",
                height: "51px",
                background: "#006872",
                boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
                borderRadius: "20px",
              }}
            >
              <b>Log In</b>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
