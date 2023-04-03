import React, { useState } from "react";

export default function NormalMsg({ props }) {
  const time = new Date();
  console.log();
  return (
    <div className="normal">
      <p>
        {typeof props == "string"
          ? props ==
            time.getUTCFullYear() +
              "-" +
              (time.getUTCMonth() + 1) +
              "-" +
              time.getUTCDate()
            ? "Today "
            : props
          : ""}
      </p>
    </div>
  );
}
