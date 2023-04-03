import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Link, useNavigate } from "react-router-dom";
import { useUserAuth } from "../context/UserAuthContext";
import Error from "../Error/Error";
import { SpinnerDotted } from "spinners-react";
import "./Forgot.css";
import forgotpass from "../imges/forgotpass.svg";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { verifyPasswordResetCode, confirmPasswordReset } from "firebase/auth";
import {
  checkActionCode,
  applyActionCode,
  sendPasswordResetEmail,
} from "firebase/auth";
import verification from "../imges/verification.svg";

export default function Action() {
  const config = {
    apiKey: "AIzaSyDwXeCeHXlTyfcabj-daRTA_SVm128ocNs",
  authDomain: "parsecfunds.firebaseapp.com",
  databaseURL: "https://parsecfunds-default-rtdb.firebaseio.com",
  projectId: "parsecfunds",
  storageBucket: "parsecfunds.appspot.com",
  messagingSenderId: "574572901183",
  appId: "1:574572901183:web:e1772d29554c08cafa598a",
  measurementId: "G-BDXCM9VQV9"
  };
  const app = initializeApp(config);
  const auth = getAuth(app);

  const [searchParams, setSearchParams] = useSearchParams();
  const [resetPasswordui, setresetPasswordui] = useState(false);
  const [emailVerificationui, setEmailVerificationui] = useState(false);
  const [actionCode, setActionCode] = useState();
  const [errorui, setErrorui] = useState(false);

  useEffect(() => {
    // TODO: Implement getParameterByName()

    // Get the action to complete.
    const mode = searchParams.get("mode");
    // Get the one-time code from the query parameter.
    setActionCode(searchParams.get("oobCode"));
    // (Optional) Get the continue URL from the query parameter if available.
    const continueUrl = searchParams.get("continueUrl");
    // (Optional) Get the language code if available.
    const lang = searchParams.get("lang") || "en";

    // Configure the Firebase SDK.
    // This is the minimum configuration required for the API to be used.
    console.log("md", mode);
    // Handle the user management action.
    switch (mode) {
      case "resetPassword":
        setresetPasswordui(true);
        break;
      case "verifyEmail":
        setEmailVerificationui(true);
        break;
      default:
        setErrorui(true);
    }
  }, []);

  return (
    <>
      {!resetPasswordui && !emailVerificationui && !errorui && (
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
      {emailVerificationui && (
        <EmailVerificationUI auth={auth} actionCode={actionCode} />
      )}
      {resetPasswordui && (
        <ResetPasswordUI auth={auth} actionCode={actionCode} />
      )}
      {errorui && <Error />}
    </>
  );
}
function EmailVerificationUI(props) {
  const congo = "Congratulations!";
  const msg = `Your email was verified!`;
  const [loader, setloader] = useState(true);
  const [error, setError] = useState("");
  const [status, setStatus] = useState(false);
  const navigate = useNavigate();
  function handleVerifyEmail(auth, actionCode, continueUrl, lang) {
    // Localize the UI to the selected language as determined by the lang
    // parameter.
    // Try to apply the email verification code.
    applyActionCode(auth, actionCode)
      .then((resp) => {
        setStatus(true);
        // Email address has been verified.
        // TODO: Display a confirmation message to the user.
        // You could also provide the user with a link back to the app.
        // TODO: If a continue URL is available, display a button which on
        // click redirects the user back to the app via continueUrl with
        // additional state determined from that URL's parameters.
        setloader(false);
      })
      .catch((error) => {
        // Code is invalid or expired. Ask the user to verify their email address
        // again.
        setError(
          "Code is invalid or expired. Ask the user to verify their email address again."
        );
        setloader(false);
      });
  }
  useEffect(() => {
    handleVerifyEmail(props.auth, props.actionCode);
  }, []);
  return (
    <>
      {loader && (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            height: "100%",
            width: "100%",
          }}
        >
          <div
            style={{ display: "flex", width: "100%", justifyContent: "center" }}
          >
            <SpinnerDotted />
          </div>
        </div>
      )}
      {!loader && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            width: "100%",
            height: "100vh",
            backgroundImage: `url(${verification})`,
            backgroundSize: "110% 110%",
          }}
        >
          {/* <img src={verification} style={{ height: "100%", width: "100%" }}></img> */}
          <div
            style={{
              border: "2px solid black",
              width: "36rem",
              height: "10rem",
              alignSelf: "center",
              justifyContent: "center",
              padding: "2rem",
              background: "#fff",
              boxShadow: "5px 5px green, 10px 10px red, 15px 15px yellow",
              fontSize: "1rem",
            }}
          >
            <b>{status ? congo : "Oops! Error Occured"}</b>
            {status ? msg : error}
          </div>
          <div onClick={() => navigate("/")} style={{ cursor: "pointer" }}>
            Return Back
          </div>
        </div>
      )}
    </>
  );
}

function ResetPasswordUI(props) {
  // const [a, seta] = useState(true);
  const [pass, setpass] = useState("");
  const [cpass, setcpass] = useState("");
  const [error, setError] = useState("");
  const [prest, setPrest] = useState(false);
  const { reset } = useUserAuth();
  let navigate = useNavigate();

  // const submithandler3 = async (e) => {
  //   e.preventDefault();
  //   seta(false);
  //   setError("");
  //   try {
  //     await reset(email);
  //   } catch (err) {
  //     setError(err.message);
  //   }
  // };
  function handleResetPassword(auth, actionCode) {
    // Localize the UI to the selected language as determined by the lang
    // parameter.

    // Verify the password reset code is valid.
    console.log(pass);
    if (cpass == pass && pass.length >= 6) {
      verifyPasswordResetCode(auth, actionCode)
        .then((email) => {
          const accountEmail = email;

          // TODO: Show the reset screen with the user's email and ask the user for
          // the new password.
          const newPassword = pass;

          // Save the new password.
          confirmPasswordReset(auth, actionCode, newPassword)
            .then((resp) => {
              setPrest(true);
              console.log(resp);
              // password is too weak
            })
            .catch((error) => {
              setError(
                "Error occurred during confirmation. The code might have expired or the password is too weak"
              );
              // Error occurred during confirmation. The code might have expired or the
              // password is too weak.
            });
        })
        .catch((error) => {
          setError(
            "Invalid or expired action code. try to reset the password again"
          );
          // Invalid or expired action code. Ask user to try to reset the password
          // again.
        });
    } else if (pass.length < 6) {
      console.log("Minimun length of password must be greater than 6");
      setError("Minimun length of password must be greater than 6");
    } else if (pass != cpass) {
      console.log("new password and confirm din't match");
      setError("new password and confirm din't match");
    } else {
      console.log("Error occurred while changing password, try again");
      setError("Error occurred while changing password, try again");
    }
  }

  // const [captcha, setcapthca] = useState(false);

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   seta(true);
  //   setError("");
  //   try {
  //     if (!captcha) {
  //       throw new Error("click on captcha first");
  //     }
  //     await reset(email);
  //     navigate("/login");
  //   } catch (err) {
  //     setError(err.message);
  //   }
  // };

  // function captchahandler() {
  //   return setcapthca(true);
  // }
  return (
    <>
      {
        <div className="main-log3">
          <div className="leftbar">
            <div style={{ height: "44rem" }}>
              <img src={forgotpass} className="imglog1" alt="forgotpass"></img>
            </div>
          </div>
          <div className="rightbar">
            <p className="mb-5" style={{ width: "100%", textAlign: "right" }}>
              Not a member?&nbsp;&nbsp;
              <a href="/" style={{ color: "#FFC727", textDecoration: "none" }}>
                Sign In
              </a>
            </p>
            <div style={{ width: "100%", margin: "10% 0% 0% 0%" }}>
              {!prest ? (
                <>
                  <h4 className="mb-5">Reset Password?</h4>
                  <div>
                    <div
                      class="alert mb-5"
                      role="alert"
                      style={{
                        color: "#006872",
                        backgroundColor: "#FEFCC5",
                        margin: "-1rem 0 0 0",
                      }}
                    >
                      Please enter your New Password.
                    </div>
                    {/* <form
                      onSubmit={() =>
                       
                      }
                    > */}
                    <div class="mb-4 cus">
                      <input
                        type="password"
                        className="mb-4 form-control3"
                        id="exampleInput1"
                        aria-describedby="emailHelp"
                        placeholder="New Password"
                        style={{
                          width: "95%",
                          padding: "3% 3%",
                          height: "3.4rem",
                          margin: "-1rem 0 0 0",
                          fontSize: "1.3rem",
                          boxSizing: "border-box",
                          border: "0.1rem solid rgba(90, 90, 90, 0.4)",
                          borderRadius: "20px",
                        }}
                        onChange={(e) => setpass(e.target.value)}
                      />
                      <input
                        type="password"
                        className="mb-4 form-control3"
                        id="exampleInput2"
                        aria-describedby="emailHelp"
                        placeholder="Confirm Password"
                        style={{
                          width: "95%",
                          padding: "3% 3%",
                          height: "3.4rem",
                          margin: "-1rem 0 0 0",
                          fontSize: "1.3rem",
                          boxSizing: "border-box",
                          border: "0.1rem solid rgba(90, 90, 90, 0.4)",
                          borderRadius: "20px",
                        }}
                        onChange={(e) => setcpass(e.target.value)}
                      />
                      {error && (
                        <div
                          className="alert"
                          role="alert"
                          style={{
                            color: "#006872",
                            padding: "0% 2%",
                            margin: "1% 0% 10% 0%",
                            backgroundColor: "#FEFCC5",
                            height: "2rem",
                            width: "100%",
                          }}
                        >
                          {error}
                        </div>
                      )}
                    </div>

                    <div
                      style={{
                        width: "100%",
                        margin: "-1rem 0 0 0",
                        display: "flex",
                        justifyContent: "center",
                      }}
                    >
                      <button
                        type="submit"
                        class="btn btn-primary"
                        onClick={() =>
                          handleResetPassword(props.auth, props.actionCode)
                        }
                        style={{
                          width: "15rem",
                          height: "3.1rem",
                          background: "#006872",
                          boxShadow: "0px 0.4rem 0.4rem rgba(0, 0, 0, 0.25)",
                          borderRadius: "20px",
                        }}
                      >
                        Reset Password
                      </button>
                    </div>
                    {/* </form> */}
                  </div>
                </>
              ) : (
                <>
                  <h4 className="mb-5">Cogratulations</h4>
                  <div
                    class="alert mb-5"
                    role="alert"
                    style={{ color: "#006872", backgroundColor: "#FEFCC5" }}
                  >
                    Your password has been reset Successfully!.
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      }
    </>
  );
}
