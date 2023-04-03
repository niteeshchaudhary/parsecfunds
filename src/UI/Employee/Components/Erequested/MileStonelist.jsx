import React, { useState, useEffect } from "react";
import dollar from "../../../../imges/dollar.svg";
import app, { db } from "../../../../firebase";
import { getFunctions, httpsCallable } from "firebase/functions";
import { SpinnerDotted } from "spinners-react";
import Wallet from "./PayUsingWallet";
const functions = getFunctions(app, "asia-southeast2");
const sendMoney = httpsCallable(functions, "sendMoney");
const sendMoneyWallet = httpsCallable(functions, "sendMoneyWallet");

export default function MileStoneList(props) {
  const backcolor =
    props?.status == "pending"
      ? "#275897"
      : props?.status == "process"
      ? "#006872"
      : props?.status == "paid"
      ? "#fff"
      : "#356872";
  const color =
    props?.status == "pending"
      ? "#fff"
      : props?.status == "process"
      ? "#fff"
      : props?.status == "paid"
      ? "#000"
      : "#726835";

  const [loadingState, setLoadingState] = useState(false);

  function startWalletTransaction() {
    setLoadingState(true);
    var data = {
      jobID: props?.jbid,
      index: props?.index,
      amount: props?.itm?.amount,
      reciever: props?.to,
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
          alert(result.data.desc + " or milestone not requested");
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
      jobID: props?.jbid,
      currency1: "LTCT",
      currency2: "LTCT",
      index: props?.index,
      amount: props?.itm?.amount,
      reciever: props?.to,
    };
    console.log(data, "Hey NKC!");
    sendMoney(data)
      .then((result) => {
        console.log(result);
        if (result?.data?.checkout_url) {
          window.open(result?.data?.checkout_url);
        } else {
          alert("Unable to Create Transaction " + result.data?.desc);
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
      <div className=" d-flex flex-row justify-content-start">
        <div className="desc">
          <p
            style={{
              fontSize: "1rem",
              margin: "0rem 1rem ",
              fontWeight: "400",
              width: "fit-content",
              maxWidth: "15rem",
            }}
          >
            {props?.itm?.description}
          </p>
        </div>
        <div>
          <input
            name="amount"
            defaultValue={props?.itm?.amount}
            disabled
            style={{
              paddingLeft: "2.1rem",
              background: `url(${dollar}) no-repeat left`,
              height: "2.2rem",
              cursor: "not-allowed",
              backgroundImage: `url(${dollar})`,
              backgroundSize: "1rem",
              textAlign: "center",
              width: "10vw",
              margin: "1rem 1rem ",
              padding: "1rem",
              fontSize: "1rem",
              borderRadius: "0.4rem",
              border: "0.05rem solid rgba(0,0,0,0.4)",
            }}
            type="text"
          />
        </div>
        <div style={{ margin: "1rem 2rem", width: "8rem" }} className="btns">
          <p style={{ fontSize: "1rem" }}>Completion Date</p>
          <p style={{ fontSize: "1rem" }}>{props?.itm?.date}</p>
        </div>
        <div style={{ margin: "1rem 2rem", width: "4rem" }} className="btns">
          <p style={{ fontSize: "1rem" }}>Status</p>
          <p style={{ fontSize: "1rem" }}>
            {props?.status == "pending"
              ? "Approaching"
              : props?.status == "process"
              ? "Requested"
              : props?.status == "paid"
              ? "Paid"
              : "Unknown"}
          </p>
        </div>
        <div style={{ margin: "1rem 2rem" }} className="btns">
          <p style={{ fontSize: "1rem", visibility: "hidden" }}>hidden</p>
          {loadingState && <SpinnerDotted style={{ height: "2rem" }} />}
          {!loadingState && (
            <>
              <button
                className="request-btn"
                disabled={props.status == "paid"}
                onClick={startTransaction}
                style={{
                  background: backcolor,
                  color: color,
                  border: "none",
                  boxShadow: " 0px 4px 4px rgba(0, 0, 0, 0.25)",
                  borderRadius: " 0.4rem",
                  padding: "0.5rem",
                  fontSize: "1rem",
                  width: "8rem",
                }}
              >
                {props.status == "paid" ? "Paid" : "Pay"}
              </button>
              {props?.status == "pending" || props?.status == "process" ? (
                <Wallet startWalletTransaction={startWalletTransaction} />
              ) : (
                ""
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
}
