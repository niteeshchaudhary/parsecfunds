import React, { useState } from "react";

export default function SenderMsg({ props }) {
  const time = new Date();

  //{Number(props.time/86400000)==Number(time.getTime()/86400000)?"Today",}
  return (
    <div className="right-msg">
      <p>{props?.message}</p>
      {props?.time && (
        <h6>
          {props.date ==
          time.getUTCFullYear() +
            "-" +
            (time.getUTCMonth() + 1) +
            "-" +
            time.getUTCDate()
            ? "Today " + props.time
            : props.date + " " + props.time}
          {/* 8.33pm */}
        </h6>
      )}
      {!props?.time && <h6>🕛</h6>}
    </div>
  );
}
