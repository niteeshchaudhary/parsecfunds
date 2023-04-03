import React, { useState } from "react";
import moneySvg from "../imges/money.svg";

export default function OfferCard(props) {
  const style = {
    box: {
      display: "flex",
      borderRadius: "1rem",
      backgroundColor: "#F0EDED",
      cursor: "pointer",
      border: "1px solid rgba(0, 0, 0, 0.4)",
      boxShadow: "3px 3px 3px #bbb",
      height: "8rem",
      padding: "3% 4%",
      width: "98%",
    },
    boxtext: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      textAlign: "center",
      width: "100%",
    },
  };
  return (
    <div style={style.box}>
      <img src={moneySvg} height="100%" />
      <div style={style.boxtext}>
        <h5>
          Buy {props.connects} connects for ${props.price}
        </h5>
      </div>
    </div>
  );
}
