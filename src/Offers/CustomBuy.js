import React, { useState } from "react";
import moneySvg from "../imges/money.svg";
import "./custombuy.css";

export default function CustomBuy(props) {
  const style = {
    cboxinp: {
      padding: "3% 4%",
      backgroundColor: "#F0EDED",
      height: "2.8rem",
      textAlign: "center",
      borderRadius: "10px",
      width: "30%",
      border: "0",
    },
    cboxlabel: {
      padding: "1.6% 4% 1.6% 4%",
      backgroundColor: "#F0EDED",
      height: "2.8rem",
      textAlign: "center",
      borderRadius: "10px",
      width: "30%",
      border: "0",
    },
  };
  const [connects, setconnects] = useState(0);
  function numOnly(e) {
    var key = e.key.match("[^0-9]");

    if (!key || e.key === "Backspace") {
      console.log(e.key);
      return true;
    }
    e.preventDefault();
  }
  return (
    <div className="cbox">
      <div className="cboxrow">
        <div className="cflexspan">
          <h5>Buy connects</h5>
        </div>
        <input
          type="text"
          onKeyDown={(e) => {
            return numOnly(e);
          }}
          onChange={(e) => {
            setconnects(e.currentTarget.value);
          }}
          defaultValue="0"
          style={style.cboxinp}
        />
      </div>
      <div className="cboxrow">
        <div className="cflexspan">
          <h5>Amount</h5>
        </div>
        <label style={style.cboxlabel}>$ {connects / 2}</label>
      </div>
      <div className="cboxrow">
        <input
          type="submit"
          disabled={connects <= 0}
          style={{ backgroundColor: connects > 0 ? "#006872" : "#526872" }}
          onClick={() => {
            if (connects > 0) {
              props.function({
                connects: connects,
                amount: connects / 2,
                offer: "None",
              });
            }
          }}
          className="cboxbutton"
          value="Buy"
        />
      </div>
    </div>
  );
}
