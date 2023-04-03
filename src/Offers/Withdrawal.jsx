import React, { useState } from "react";
import { SpinnerDotted } from "spinners-react";
import app, { db } from "../firebase";
import { useValidator } from "react-joi";
import { getFunctions, httpsCallable } from "firebase/functions";
const functions = getFunctions(app, "asia-southeast2");
const requestWithdrawal = httpsCallable(functions, "requestWithdrawal");

function Withdrawal(props) {
  const commonstyle = {
    background: "#FFFFFF",
    boxShadow: " 0rem 0.25rem 0.25rem rgba(0, 0, 0, 0.25)",
    fontSize: "1rem",
    borderRadius: "1rem",
    padding: "1rem",
    fontWeight: "600",
    width: "40vw",
    margin: "auto",
  };
  const [loadingState, setLoadingState] = useState(false);

  const clickhandler = (e) => {
    e.preventDefault();
    const data = {
      walletaddress: document.getElementById("walletaddress"),
      amount: document.getElementById("withdrawamount"),
    };

    setLoadingState(true);
    requestWithdrawal(data).then((result) => {
      console.log(result);
      props.handleClose();
    });
  };

  return (
    <>
      <form onSubmit={clickhandler}>
        <div style={commonstyle} className="work-exp">
          {/* <img
            style={{ width: "1rem", marginLeft: "35vw", cursor: "pointer" }}
            onClick={() => setClose(false)}
            src={require("../imges/cross-icon.svg").default}
            alt=""
          /> */}
          <div className="d-flex flex-column align-items-start ">
            <p style={{ margin: "1rem 3.1rem", fontSize: "1.2rem" }}>
              Request Withdrawal
            </p>
          </div>
          <div
            style={{ margin: "2rem 1rem" }}
            className="d-flex flex-row justify-content-around align-items-start"
          >
            <div className="">
              <p style={{ fontSize: "1rem", fontWeight: "400" }}>
                Withdraw wallet address
              </p>
              <input
                placeholder="Wallet Address"
                id="walletaddress"
                required
                style={{
                  background: " #FFFFFF",
                  border: " 0.05rem solid rgba(0, 0, 0, 0.2)",
                  borderRadius: "0.3rem",
                  width: "15vw",
                  padding: "0.5rem",
                }}
                type="text"
              />
              <p
                style={{
                  fontSize: "1rem",
                  fontWeight: "400",
                  marginTop: "1rem",
                }}
              >
                Withdrawal amount
              </p>
              <input
                id="withdrawamount"
                placeholder="BTC"
                style={{
                  background: " #FFFFFF",
                  border: " 0.05rem solid rgba(0, 0, 0, 0.2)",
                  borderRadius: "0.3rem",
                  width: "15vw",
                  padding: "0.5rem",
                }}
                min="0"
                required
                type="number"
              />
            </div>
            <div className="d-flex flex-column justify-content-center align-items-center">
              <img
                style={{ width: "4.5rem" }}
                src={require("../imges/wallet.svg").default}
                alt=""
              />
              <p
                style={{
                  fontSize: "0.9rem",
                  fontWeight: "500",
                  margin: "1rem 0",
                }}
              >
                Available Balance: ${props?.available}
              </p>
              {!loadingState && (
                <button
                  style={{
                    background: "#006872",
                    color: "white",
                    border: "none",
                    padding: "0.5rem ",
                    width: "8rem",
                    fontSize: "1rem",
                    fontWeight: "500",
                    borderRadius: "0.4rem",
                    margin: "2.5rem 0 1rem 0",
                  }}
                >
                  Request
                </button>
              )}
              {loadingState && (
                <SpinnerDotted
                  style={{
                    height: "2rem",
                    margin: "2.5rem 0 1rem 0",
                  }}
                />
              )}
            </div>
          </div>
        </div>
      </form>
    </>
  );
}

export default Withdrawal;
