import penimg from "../../imges/pen.svg";
import Dustbin from "./dustbin";
import Edit from "./Edit";
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
      <span style={{ width: "13%", minWidth: "1rem" }}>
        <img src={props.image} alt="" style={{ width: "1.4rem" }} />
      </span>
      <div style={{ width: "61%" }}>
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
            display: "none",
            fontStyle: "normal",
            fontSize: "1rem",
            lineHeight: "1.2rem",
            textAlign: "left",
            padding: "0 0 0 0.8rem",
            margin: "0",
          }}
        >
          {props?.loc}
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
      <span
        style={{
          width: "13%",
          minWidth: "1.2rem",
          padding: "0 0.1rem",
          marginRight: "0.1rem",
        }}
      >
        <Edit height="1rem" width="1rem" function={props.editfunction} />
        {/* <img src={penimg} alt="" style={{ width: "70%", minWidth: "20px" }} /> */}
      </span>
      <Dustbin height="2.5rem" width="1rem" function={props.function} />
    </div>
  );
}
