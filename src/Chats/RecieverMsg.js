import React from "react";

export default function RecieverMsg({ props }) {
  const time = new Date();
  return (
    <div className="left-msg">
      <p>{props.message}</p>
      <span
        style={{
          fontSize: "0.6rem",
          marginLeft: "2rem",
          color: "#707070",
        }}
      >
        {props.date ==
        time.getUTCFullYear() +
          "-" +
          time.getUTCMonth() +
          "-" +
          time.getUTCDate()
          ? "Today " + props.time
          : props.date + " " + props.time}
        {/* 8.33pm */}
      </span>
    </div>
  );
}
