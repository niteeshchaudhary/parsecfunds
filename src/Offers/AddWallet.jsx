import React, { useState } from "react";
import { SpinnerDotted } from "spinners-react";
import { getFunctions, httpsCallable } from "firebase/functions";
import { useNavigate } from "react-router-dom";
import app from "../firebase";

const functions = getFunctions(app, "asia-southeast2");
const addMoneyWallet = httpsCallable(functions, "addMoneyWallet");

function AddWallet(props) {
  const [loadingState, setLoadingState] = useState(false);
  const [amount, setAmount] = useState(100);
  const commonstyle = {
    background: "#FFFFFF",
    boxShadow: " 0rem 0.25rem 0.25rem rgba(0, 0, 0, 0.25)",
    fontSize: "1rem",
    borderRadius: "1rem",
    padding: "1rem",
    fontWeight: "600",
    width: "30vw",
    margin: "auto",
  };
  const clickhandler = (e) => {
    e.preventDefault();
    setLoadingState(true);
    addMoneyWallet({
      currency1: "LTCT",
      currency2: "LTCT",
      amount: amount,
    }).then((result) => {
      console.log(result);
      window.open(result?.data?.checkout_url);
      props.handleClose();
    });
  };

  return (
    <>
      <form onSubmit={clickhandler}>
        <div style={commonstyle} className="work-exp">
          <div className="d-flex flex-column align-items-center ">
            <p style={{ fontSize: "1.2rem", margin: "1rem" }}>
              Add money to your Wallet
            </p>
            <div
              style={{
                background: "#F0EDED",
                border: "1px solid rgba(0, 0, 0, 0.4)",
                width: "15rem",
                borderRadius: " 0.6rem",
              }}
              className="hourly-input-img"
            >
              <span>
                <img
                  style={{ padding: "0.2rem 0.0rem" }}
                  src={require("../imges/currency-dollar.svg").default}
                  alt=""
                />
              </span>

              <input
                className=" "
                min="1"
                defaultValue={amount}
                onChange={(e) => setAmount(e.currentTarget.value)}
                style={{
                  background: "#F0EDED",
                  borderRadius: "0.6rem",
                  border: "0",
                  outline: "none",
                }}
                id="addamount"
                type="number"
                placeholder="0.00"
                required
              />
            </div>
            <div className="d-flex flex-row">
              <p
                onClick={(e) => {
                  document.getElementById("addamount").value = 100;
                  setAmount(100);
                }}
                style={{
                  cursor: "pointer",
                  margin: "1rem 0.2rem",
                  border: "0.05rem solid rgba(0,0,0,0.3)",
                  padding: "0.2rem 0.5rem",
                  borderRadius: "1rem",
                  fontSize: "0.9rem",
                }}
              >
                $100
              </p>
              <p
                onClick={(e) => {
                  document.getElementById("addamount").value = 500;
                  setAmount(500);
                }}
                style={{
                  cursor: "pointer",
                  margin: "1rem 0.2rem",
                  border: "0.05rem solid rgba(0,0,0,0.3)",
                  padding: "0.2rem 0.5rem",
                  borderRadius: "1rem",
                  fontSize: "0.9rem",
                }}
              >
                $500
              </p>
              <p
                onClick={(e) => {
                  document.getElementById("addamount").value = 1000;
                  setAmount(1000);
                }}
                style={{
                  cursor: "pointer",
                  margin: "1rem 0.2rem",
                  border: "0.05rem solid rgba(0,0,0,0.3)",
                  padding: "0.2rem 0.5rem",
                  borderRadius: "1rem",
                  fontSize: "0.9rem",
                }}
              >
                $1000
              </p>
              <p
                onClick={(e) => {
                  document.getElementById("addamount").value = 2000;
                  setAmount(2000);
                }}
                style={{
                  cursor: "pointer",
                  margin: "1rem 0.2rem",
                  border: "0.05rem solid rgba(0,0,0,0.3)",
                  padding: "0.2rem 0.5rem",
                  borderRadius: "1rem",
                  fontSize: "0.9rem",
                }}
              >
                $2000
              </p>
              <p
                onClick={(e) => {
                  document.getElementById("addamount").value = 5000;
                  setAmount(5000);
                }}
                style={{
                  cursor: "pointer",
                  margin: "1rem 0.2rem",
                  border: "0.05rem solid rgba(0,0,0,0.3)",
                  padding: "0.2rem 0.5rem",
                  borderRadius: "1rem",
                  fontSize: "0.9rem",
                }}
              >
                $5000
              </p>
            </div>
            {!loadingState && (
              <button
                style={{
                  margin: "2rem",
                  fontWeight: "600",
                  border: "0.05rem solid rgba(0, 0, 0, 0.1)",
                  width: "15rem",
                  padding: "0.5rem",
                  fontSize: "1rem",
                  borderRadius: "0.6rem",
                  background: "#006872",
                  color: "#FFFFFF",
                }}
                type="submit"
              >
                Proceed to add <span>${amount || "0"}</span>
              </button>
            )}
            {loadingState && (
              <SpinnerDotted
                style={{
                  height: "2rem",
                  margin: "2rem",
                }}
              />
            )}
          </div>
        </div>
      </form>
    </>
  );
}

export default AddWallet;
