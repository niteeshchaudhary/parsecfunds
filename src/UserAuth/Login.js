import React, { useState, useEffect } from "react";
import { SpinnerDotted } from "spinners-react";
import { Link } from "react-router-dom";
import { useUserAuth } from "../context/UserAuthContext";
import { useNavigate } from "react-router-dom";
import { type } from "@testing-library/user-event/dist/type";
import loginSvg from "../imges/login.svg";
import googleSvg from "../imges/googleico.svg";
import linkedinSvg from "../imges/linkedinico.svg";
import facebookSvg from "../imges/facebook.svg";
import gitSvg from "../imges/github.svg";
import { getFunctions, httpsCallable } from "firebase/functions";
// import { db, onMessageListener } from "../firebase";
import Layout1 from "../components/Layout1";
import { auth } from "../firebase";
import app from "../firebase";

import "./Login.css";

function Login() {
  const [loadingState, setLoadingState] = useState(false);
  const [email, setEmail] = useState("");
  const [password2, setPassword] = useState("");
  const [error, setError] = useState("");
  const { user, logIn, googleSignIn, facebookSignIn, gitSignIn } =
    useUserAuth();
  const navigate = useNavigate();

  const functions = getFunctions(app, "asia-southeast2");

  const getUserProfile = httpsCallable(functions, "getUserProfile");
  const userLogin = httpsCallable(functions, "userLogin");

  const handleSubmit = async (e) => {
    console.log(4);
    e.preventDefault();
    setError("");
    console.log(5);
    try {
      await logIn(email, password2).then((res) => {
        console.log(res);
        if (!res) {
          throw new Error("email/pass din't match");
        }
        setLoadingState(true);
        userLogin();
        console.log(6);
        console.log(7);
        getUserProfile().then((result) => {
          console.log(result);
          if (result.data.result.desc.profilestatus === false) {
            if (result.data.result.desc.role === "Freelancer") {
              navigate("/ProfileInfo", {
                state: { profile: result.data.result.desc },
              });
            } else {
              navigate("/service", {
                state: { profile: result.data.result.desc },
              });
            }
          } else {
            if (result.data.result.desc.role === "Freelancer") {
              navigate("/dashboard", {
                state: { profile: result.data.result.desc },
              });
            } else {
              navigate("/Edashboard", {
                state: { profile: result.data.result.desc },
              });
            }
          }
        });
        console.log(8);
      });
    } catch (err) {
      console.log(err);
      setLoadingState(false);

      setError(err.message);
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
        <Layout1  frm={1}/>

        // <div className="main-log2">
        //   <div className="leftbar">
        //     <div style={{ height: "44rem" }}>
        //       <img src={loginSvg} className="imglog12" alt="React Logo" />
        //     </div>
        //   </div>
        //   <div
        //     className="Scroll"
        //     style={{
        //       overflow: "auto",
        //       minWidth: "50%",
        //       padding: "2% 2% 2% 2%",
        //       height: "100vh",
        //     }}
        //   >
        //     <p style={{ width: "100%", textAlign: "right" }}>
        //       Not a member?&nbsp;&nbsp;<Link to="/signup">SignUp</Link>{" "}
        //     </p>
        //     <h4 className="mb-4" style={{ marginTop: "6%" }}>
        //       Login to your account
        //     </h4>
        //     <form onSubmit={handleSubmit}>
        //       <div className="mb-4 cus">
        //         <input
        //           type="email"
        //           id="exampleInputEmail1"
        //           aria-describedby="emailHelp"
        //           placeholder="Email Address"
        //           style={{
        //             width: "95%",
        //             padding: "3% 3%",
        //             height: "3.1rem",
        //             margin: "0.6rem 0 0 0",
        //             boxSizing: "border-box",
        //             border: "0.1rem solid rgba(90, 90, 90, 0.4)",
        //             borderRadius: "20px",
        //           }}
        //           onChange={(e) => setEmail(e.target.value)}
        //           required
        //         />
        //       </div>
        //       <div className="mb-4">
        //         <input
        //           type="password"
        //           name="password"
        //           placeholder="Password"
        //           autoComplete="current-password"
        //           required
        //           id="id_password"
        //           style={{
        //             width: "95%",
        //             padding: "3% 3%",
        //             height: "3.1rem",
        //             margin: "-0.6rem 0 0 0",
        //             boxSizing: "border-box",
        //             border: "0.1rem solid rgba(90, 90, 90, 0.4)",
        //             borderRadius: "20px",
        //           }}
        //           onChange={(e) => setPassword(e.target.value)}
        //         />
        //         <i
        //           className="far fa-eye"
        //           id="togglePassword"
        //           style={{ marginLeft: "-4rem", cursor: "pointer" }}
        //           onClick={togglepass}
        //         />
        //       </div>
        //       <div style={{ marginBottom: "3%" }}>
        //         <h5 style={{ width: "95%", textAlign: "center" }}>-- OR --</h5>
        //       </div>

        //       <div
        //         style={{
        //           display: "flex",
        //           flexDirection: "row",
        //           justifyContent: "center",
        //           flexWrap: "wrap",
        //           margin: "3% 0 4% 0",
        //           width: "95%",
        //         }}
        //       >
        //         <div className="icon2" onClick={handleGoogleSignIn}>
        //           {/* <i className="fa fa-google fa-lg" /> */}
        //           <img
        //             src={googleSvg}
        //             style={{ width: "2.5rem", height: "100%" }}
        //           />
        //           <span
        //             style={{
        //               width: "100%",
        //               paddingLeft: "3%",
        //               alignSelf: "center",
        //               fontWeight: "bold",
        //             }}
        //           >
        //             Google
        //           </span>
        //         </div>
        //         <div className="icon2" onClick={handleFacebookSignIn}>
        //           {/* <i className="fa fa-facebook fa-lg" /> */}
        //           <img
        //             src={facebookSvg}
        //             style={{ width: "2.5rem", height: "100%" }}
        //           />
        //           <span
        //             style={{
        //               width: "100%",
        //               paddingLeft: "3%",
        //               alignSelf: "center",
        //               fontWeight: "bold",
        //             }}
        //           >
        //             Facebook
        //           </span>
        //         </div>

        //         <div className="icon2" onClick={handleLinkedInSignIn}>
        //           {/* <i className="fa fa-linkedin fa-lg" /> */}
        //           <img
        //             src={linkedinSvg}
        //             style={{ width: "2.5rem", height: "100%" }}
        //           />
        //           <span
        //             style={{
        //               width: "100%",
        //               paddingLeft: "3%",
        //               alignSelf: "center",
        //               fontWeight: "bold",
        //             }}
        //           >
        //             LinkedIn
        //           </span>
        //         </div>
        //       </div>
        //       {error && (
        //         <div
        //           className="alert"
        //           role="alert"
        //           style={{
        //             color: "#006872",
        //             padding: "0% 2%",
        //             margin: "3% 1%",
        //             backgroundColor: "#FEFCC5",
        //             height: "1.8rem",
        //             width: "95%",
        //           }}
        //         >
        //           {error}
        //           {error == "verify the email first"
        //             ? ". if verified it may take 5-10 min to activate."
        //             : ""}
        //         </div>
        //       )}
        //       <div
        //         className="mb-5"
        //         style={{ display: "flex", justifyContent: "space-around" }}
        //       >
        //         <div>
        //           <input
        //             type="checkbox"
        //             className="form-check-input"
        //             id="exampleCheck1"
        //           />
        //           <label className="form-check-label" htmlFor="exampleCheck1">
        //             &nbsp;&nbsp;Remember me
        //           </label>
        //         </div>
        //         <div>
        //           <Link to="/forgot">Forgot Password?</Link>
        //         </div>
        //       </div>
        //       <div
        //         style={{
        //           width: "100%",
        //           display: "flex",
        //           marginBottom: "-40px",
        //           justifyContent: "center",
        //         }}
        //       >
        //         <button
        //           type="submit"
        //           className="btn btn-primary"
        //           id="loginbut"
        //           style={{
        //             width: "40%",
        //             height: "3.2rem",
        //             background: "#006872",
        //             boxShadow: "0px 0.4rem 0.4rem rgba(0, 0, 0, 0.25)",
        //             borderRadius: "20px",
        //           }}
        //         >
        //           <b>Log In</b>
        //         </button>
        //       </div>
        //     </form>
        //   </div>
        // </div>
      )}
    </>
  );
}

export default Login;
