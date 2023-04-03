import penimg from "../../imges/pen.svg";
import Dustbin from "./dustbin";
import { SpinnerDotted } from "spinners-react";
export default function Sqcard(props) {
  return (
    <div
      type="text"
      style={{
        display: "flex",
        width: "40%",
        padding: "0.9rem",
        height: "34%",
        minWidth: "15rem",
        minHeight: "12rem",
        marginRight: "0.7rem",
        marginBottom: "0.7rem",
        fontSize: "1.6rem",
        boxSizing: "border-box",
        background: "transparent",
        border: "0.1rem solid rgba(90, 90, 90, 0.4)",
        borderRadius: "0.8rem",
      }}
    >
      <span style={{ width: "20%", minWidth: "1rem" }}>
        <SpinnerDotted size="85%" />
      </span>

      <div style={{ width: "80%" }}>
        <p
          style={{
            fontStyle: "normal",
            fontWeight: "600",
            fontSize: "1.2rem",
            lineHeight: "1.8rem",
            padding: "0 0 0 0.8rem",
            textAlign: "left",
            margin: "0",
          }}
        >
          {props.title}
        </p>
        <p
          style={{
            fontStyle: "normal",
            fontSize: "1rem",
            lineHeight: "1.2rem",
            textAlign: "left",
            padding: "0 0 0 0.8rem",
            margin: "0",
          }}
        >
          {props.mid}
        </p>
        <p
          style={{
            fontStyle: "normal",
            fontSize: "1rem",
            lineHeight: "1.2rem",
            textAlign: "left",
            padding: "0 0 0 0.8rem",
            margin: "0",
          }}
        >
          {props.time}
        </p>
        <p style={{ display: "none" }}>{props.id}</p>
      </div>
    </div>
  );
}
