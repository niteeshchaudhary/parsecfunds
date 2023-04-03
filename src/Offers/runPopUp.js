import React, { useState } from "react";
import moneySvg from "../imges/money.svg";
import "./custombuy.css";
import Popup from "./PopUp";
import { getFunctions, httpsCallable } from "firebase/functions";
import Popd from "./Popd";
import app from "../firebase";

export default function RunPopUp(props) {
  const [isOpen, setIsOpen] = useState(false);

  const togglePopup = async () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="cbox">
      <div className="cboxrow">
        <input
          type="submit"
          onClick={async () => {
            togglePopup();
          }}
          className="cboxbutton"
          value="Buy"
        />
      </div>
      {isOpen && (
        <Popup
          content={
            <>
              <Popd />
            </>
          }
          handleClose={togglePopup}
        />
      )}
    </div>
  );
}
// currency: "LTCT",
// currency1: "LTCT",
// currency2: "LTCT",
// from: "LTCT", //data.currency
// to: "LTCT",
// amount: "1",
