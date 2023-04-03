import React, { useState, useEffect } from "react";
import Dustbin from "./dustbin";
import app, { db } from "../../firebase";
import { ref, getDatabase } from "firebase/database";
import { useList } from "react-firebase-hooks/database";

const database = getDatabase();
export default function Card(props) {
  const [level, loading, snperror] = useList(ref(database, "level"));
  const [LanguageList, languageloading, languageerror] = useList(
    ref(database, "language")
  );

  return (
    <div>
      <select
        name="language-picker-select"
        id="language-picker-select"
        placeholder="Language"
        style={{
          width: "44%",
          padding: "0.2rem 1.2rem",
          height: "3rem",
          margin: "0.3rem 0px 1.4rem 0",
          fontSize: "1.1rem",
          boxSizing: "border-box",
          border: "0.1rem solid rgba(90, 90, 90, 0.4)",
          borderRadius: "1rem",
        }}
      >
        {LanguageList.map((result) => (
          <option text={result.val()} value={result.val()}>
            {result.val()}
          </option>
        ))}
      </select>
      <select
        name="level-picker-select"
        id="level-picker-select"
        placeholder="Level"
        style={{
          width: "44%",
          padding: "0.2rem 1.2rem",
          height: "3rem",
          margin: "0.3rem 2% 1.4rem 2%",
          fontSize: "1.1rem",
          boxSizing: "border-box",
          border: "0.1rem solid rgba(90, 90, 90, 0.4)",
          borderRadius: "1rem",
        }}
      >
        {level.map((lvl, index) => (
          <option value={lvl.val()} key={index}>
            {lvl.val()}
          </option>
        ))}
      </select>
      <Dustbin height="2rem" width="1.2rem" function={props.function} />
    </div>
  );
}
