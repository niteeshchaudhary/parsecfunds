import React, { useEffect } from "react";
import "./popup.css";

const Popup = (props) => {
  return (
    <div className="popup-box">
      <div className="box" style={{ padding: "0.3rem" }}>
        <span className="popb">{props.content}</span>
        {/* <span
          className="close-icon"
          onClick={props.handleClose}
          style={{ color: "#aa6", left: props?.left }}
        >
          x
        </span> */}
      </div>
    </div>
  );
};

export default Popup;
