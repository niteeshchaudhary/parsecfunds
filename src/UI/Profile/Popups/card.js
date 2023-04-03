import React, { useEffect } from "react";
import Dustbin from "./dustbin";
import { ref, getDatabase } from "firebase/database";
import { useList } from "react-firebase-hooks/database";

const database = getDatabase();
export default function Card(props) {
  console.log(props);
  const [level, plloading, plerror] = useList(ref(database, "level"));
  const [LanguageList, loading, error] = useList(ref(database, "language"));
  useEffect(
    () => {
      document.getElementById("language-picker-select").value = props.lang;
      document.getElementById("language-level-select").value = props.level;
    },
    [level],
    [LanguageList]
  );
  return (
    <div>
      <select
        name="language-picker-select"
        id="language-picker-select"
        placeholder="Language"
        style={{
          width: "40%",
          padding: "0.2rem 1.2rem",
          height: "3rem",
          margin: "0.3rem 0px 1.4rem 0",
          fontSize: "1.1rem",
          boxSizing: "border-box",
          border: "0.1rem solid rgba(90, 90, 90, 0.4)",
          borderRadius: "1rem",
        }}
        defaultValue={props.lang}
      >
        {LanguageList.map((result, index) => (
          <option text={result.val()} value={result.val()} key={index}>
            {result.val()}
          </option>
        ))}
        {/* <option lang="de" value="deutsch">
            Deutsch
          </option>
          <option lang="en" value="english">
            English
          </option>
          <option lang="fr" value="francais">
            Français
          </option>
          <option lang="it" value="italiano">
            Italiano
          </option> */}
      </select>
      <select
        name="language-level-select"
        id="language-level-select"
        placeholder="Level"
        style={{
          width: "40%",
          padding: "0.2rem 1.2rem",
          height: "3rem",
          margin: "0.3rem 5% 1.4rem 5%",
          fontSize: "1.1rem",
          boxSizing: "border-box",
          border: "0.1rem solid rgba(90, 90, 90, 0.4)",
          borderRadius: "1rem",
        }}
        defaultValue={props.level}
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
