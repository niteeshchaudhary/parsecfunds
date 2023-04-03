import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUserAuth } from "../context/UserAuthContext";
import "./Forgot.css";
import forgotpass from "../imges/forgotpass.svg";

function Forgot() {
  // const [a, seta] = useState(true);
  const [a, seta] = useState(true);
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const { reset } = useUserAuth();
  let navigate = useNavigate();

  const submithandler3 = async (e) => {
    e.preventDefault();
    seta(false);
    setError("");
    try {
      await reset(email);
    } catch (err) {
      setError(err.message);
    }
  };

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
    <div className="main-log3">
      <div className="leftbar">
        <img src={forgotpass} className="imglog1" alt="forgotpass"></img>
      </div>
      <div className="rightbar">
        <p className="mb-5" style={{ width: "100%", textAlign: "right" }}>
          Not a member?&nbsp;&nbsp;
          <a
            href="/signup"
            style={{ color: "#FFC727", textDecoration: "none" }}
          >
            SignUp
          </a>
        </p>
        <div style={{ width: "100%", margin: "24% 0% 0% 0%" }}>
          <h4 className="mb-5">Forgot Password?</h4>
          {a ? (
            <div>
              <div
                class="alert mb-5"
                role="alert"
                style={{ color: "#006872", backgroundColor: "#FEFCC5" }}
              >
                Please enter your email address. You will recieve an email with
                instructions on how to reset your password.
              </div>
              <form onSubmit={submithandler3}>
                <div class="mb-4 cus">
                  <input
                    type="email"
                    className="mb-4 form-control3"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    placeholder="Email Address"
                    style={{
                      width: "95%",
                      padding: "12px 20px",
                      height: "60px",
                      margin: "-6px 0 0 0",
                      boxSizing: "border-box",
                      border: "2px solid rgba(90, 90, 90, 0.4)",
                      borderRadius: "20px",
                    }}
                    onChange={(e) => setEmail(e.target.value)}
                  />
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
                    class="btn btn-primary"
                    style={{
                      width: "40%",
                      height: "61px",
                      background: "#006872",
                      boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
                      borderRadius: "20px",
                    }}
                  >
                    Reset Password
                  </button>
                </div>
              </form>
            </div>
          ) : (
            <div
              class="alert mb-5"
              role="alert"
              style={{ color: "#006872", backgroundColor: "#FEFCC5" }}
            >
              A Password reset link was set to your email id.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Forgot;
