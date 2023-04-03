import React, { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
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
      console.log(e);
      await reset(email);
    } catch (err) {
      console.log(err.message);
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
          <h4 className="mb-5">Forgot Password?</h4>
          {a ? (
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
                Please enter your email address. You will recieve an email with
                instructions on how to reset your password.
              </div>
              <form>
                <div class="mb-4 cus">
                  <input
                    type="email"
                    className="mb-4 form-control3"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    placeholder="Email Address"
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
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  {error && (
                    <div
                      class="alert mb-6"
                      style={{
                        color: "#006872",
                        backgroundColor: "#FEFCC5",
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
                    onClick={submithandler3}
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
              </form>
            </div>
          ) : (
            <div>
              <div
                class="alert mb-5"
                role="alert"
                style={{ color: "#006872", backgroundColor: "#FEFCC5" }}
              >
                A Password reset link was set to your email id.
              </div>
              <NavLink
                to="/"
                style={{
                  backgroundColor: "#FFC727",
                  textDecoration: "none",
                  color: "white",
                  padding: "0.8rem 2rem",
                  borderRadius: "0.4rem",
                }}
              >
                Login
              </NavLink>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Forgot;
