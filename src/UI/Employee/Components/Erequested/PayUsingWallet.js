import React, { useState } from "react";
import Wallet from "./wallet";

export default function PayUsingWallet(props) {
  const styles = {
    container: {
      display: "flex",
      flexDirection: "column",
      backgroundColor: "#006872",
      width: "2rem",
      cursor: "pointer",
      justifyContent: "center",
      alignItems: "center",
      boxShadow: "0.06rem 0.06rem 0.06rem 0.1rem rgba(200, 250, 200, 0.15)",
      borderRadius: "1rem",
      fontSize: "1rem",
      height: "2rem",
    },
    hover: {
      display: "flex",
      flexDirection: "column",
      backgroundColor: "#009089",
      width: "2rem",
      cursor: "pointer",
      justifyContent: "center",
      alignItems: "center",
      boxShadow: "0.06rem 0.06rem 0.06rem rgba(200, 250, 200, 0.15)",
      borderRadius: "1rem",
      fontSize: "0.8rem",
      height: "2rem",
    },
  };
  const [hover, sethover] = useState(false);
  return (
    <div
      style={hover ? styles.hover : styles.container}
      onClick={() => {
        props.startWalletTransaction();
      }}
      onMouseEnter={() => sethover(true)}
      onMouseLeave={() => sethover(false)}
      on
    >
      {/* <img
        src={walletimg}
        height="15rem"
        width="15rem"
        style={{ color: "#cec" }}
      /> */}
      <Wallet file={"#cec"} stroke={"#ece"} height={"1rem"} width={"1rem"} />
    </div>
  );
}
