import "./chips.css";
export default function Chips(props) {
  return (
    <div className="tag">
      {props.text}
      <span
        className="closebtn"
        onClick={(e) => {
          props.removeChips(e, props.text);
        }}
        style={{
          marginTop: "0.1rem",
          color: "#dddddd",
          fontSize: "1rem",
          borderRadius: "50%",
        }}
      >
        x{/* &times; */}
      </span>
    </div>
  );
}
// (e) => {
//     e.currentTarget.parentElement.style.display = "none";
//   }}
