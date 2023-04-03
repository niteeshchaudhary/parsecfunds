import React from "react";
import PayUsingWallet from "./PayUsingWallet";
import { SpinnerDotted } from "spinners-react";

export default function ShowDetails(props) {
  const style = {
    lbl: { fontSize: "1.5rem", alignSelf: "center" },
  };
  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        backgroundColor: "#006872",
        justifyContent: "center",
        borderRadius: "2rem",
        verticalAlign: "center",
        gap: "3rem",
        height: "12rem",
        maxWidth: "99%",
        width: "90rem",
        margin: "0rem 0.001rem 2rem 0.001rem",
        padding: "2rem 2rem",
        color: "#cec",
      }}
    >
      <label style={style.lbl}>
        <b>Item Name:</b> {props.item}
      </label>
      <label style={style.lbl}>
        <b>Quantity:</b> {props.quantity}
      </label>
      <label style={style.lbl}>
        <b>Amount:</b> {props.amount}
      </label>
      <label style={style.lbl}>
        <b>Offers:</b> {props.offer}
      </label>
      <label style={style.lbl}>
        {props.walletload ? (
          <SpinnerDotted style={{ height: "2rem" }} />
        ) : (
          <PayUsingWallet func={props.func} />
        )}
      </label>
    </div>
  );
}
