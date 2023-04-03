import React, { useState } from "react";
import dollar from "../../../../imges/dollar.svg";
import app, { db } from "../../../../firebase";
import { getFunctions, httpsCallable } from "firebase/functions";
import Wallet from "./PayUsingWallet";
import { SpinnerDotted } from "spinners-react";
const functions = getFunctions(app, "asia-southeast2");
const sendMoney = httpsCallable(functions, "sendMoney");
const sendMoneyWallet = httpsCallable(functions, "sendMoneyWallet");

function ERequestHourly(props) {
  const [loadingState, setLoadingState] = useState(false);
  console.log(props);

  function startWalletTransaction() {
    setLoadingState(true);
    var data = {
      jobID: props?.proposal?.jobID,
      index: 0,
      amount: props?.proposal?.Request,
      reciever: props?.proposal?.info?.from,
    };
    console.log(data, "Hey NKC!");
    sendMoneyWallet(data)
      .then((result) => {
        console.log(result);
        if (result.data.status == "1") {
          console.log(result.data.desc);
          window.location.reload();
        } else {
          console.log(result.data.desc);
          alert("Unable to Create Transaction");
        }
        setLoadingState(false);
      })
      .catch((error) => {
        console.log(error);
        setLoadingState(false);
      });
  }

  function startTransaction() {
    setLoadingState(true);
    var data = {
      jobID: props?.proposal?.jobID,
      currency1: "LTCT",
      currency2: "LTCT",
      index: 0,
      amount: props?.proposal?.Request,
      reciever: props?.proposal?.info?.from,
    };
    console.log(data, "Hey NKC!");
    sendMoney(data)
      .then((result) => {
        console.log(result);
        if (result?.data?.checkout_url) {
          window.open(result?.data?.checkout_url);
        } else {
          console.log("Unable to Create Transaction");
          alert("Unable to Create Transaction");
        }
        setLoadingState(false);
      })
      .catch((error) => {
        console.log(error);
        setLoadingState(false);
      });
  }
  return (
    <>
      <div className="hourly">
        <p style={{ margin: "1rem", marginBottom: "0", fontSize: "1.1rem" }}>
          Hourly Price
        </p>
        <p
          style={{
            width: "100%",
            textAlign: "right",
            paddingRight: "6rem",
            fontSize: "1rem",
          }}
        >
          Amount Paid : {props?.proposal?.recieved_amount || 0}
        </p>
        <div className=" d-flex flex-row justify-content-start">
          <div style={{ margin: "1rem 1rem" }} className="btns">
            <p style={{ fontSize: "1rem", visibility: "hidden" }}>hidden</p>
            <p style={{ fontSize: "1rem" }}>Amount Requested</p>
          </div>
          <div style={{ margin: "1rem 8rem" }} className="btns">
            <p style={{ fontSize: "1rem", visibility: "hidden" }}>hidden</p>

            <input
              disabled
              value={props.proposal?.Request || 0}
              name="amount"
              style={{
                textAlign: "center",
                cursor: "not-allowed",
                paddingLeft: "1.5rem",
                background: `url(${dollar}) no-repeat left`,
                height: "2.2rem",
                backgroundImage: `url(${dollar})`,
                backgroundSize: "1rem",
                width: "15vw",
                margin: "1rem 1rem ",
                padding: "1rem",
                fontSize: "1rem",
                borderRadius: "0.4rem",
                border: "0.05rem solid rgba(0,0,0,0.4)",
              }}
              type="text"
            />
          </div>
          {props.proposal?.Request && props.proposal?.Request > 0 ? (
            <>
              {loadingState && <SpinnerDotted style={{ height: "2rem" }} />}
              {!loadingState && (
                <>
                  <div style={{ margin: "1rem 1rem" }} className="btns">
                    <p style={{ fontSize: "1rem", visibility: "hidden" }}>
                      hidden
                    </p>
                    <button
                      className="request-btn"
                      onClick={startTransaction}
                      style={{
                        background: " #006872",
                        color: "white",
                        border: "none",
                        boxShadow: " 0px 4px 4px rgba(0, 0, 0, 0.25)",
                        borderRadius: " 0.4rem",
                        padding: "0.5rem",
                        fontSize: "1rem",
                        width: "8rem",
                      }}
                    >
                      Pay
                    </button>
                  </div>
                  <Wallet startWalletTransaction={startWalletTransaction} />
                </>
              )}
            </>
          ) : (
            ""
          )}
        </div>
      </div>
    </>
  );
}

export default ERequestHourly;
