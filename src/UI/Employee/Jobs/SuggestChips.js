import React, { useState, useEffect } from "react";
import "./chips.css";
import Chips from "./Chips";
export default function MyOwn(props) {
  const [chipsarr, setChipsarr] = useState(props?.chparr || []);
  function removeChips(e, text) {
    setChipsarr([...chipsarr.filter((x) => x != text)]);
  }
  function check(e) {
    const target = e.currentTarget; //document.querySelector('input[name="inp"]');
    if (
      e.key == "Enter" &&
      props.suggestions.includes(e.currentTarget.value) &&
      !chipsarr.includes(target?.value) &&
      target?.value.trim() != ""
    ) {
      setChipsarr([...chipsarr, target?.value]);
      console.log(chipsarr);
      target.value = "";
    }
  }
  useEffect(() => {
    props.onChange(chipsarr);
  }, [chipsarr]);
  function checkd(e) {
    const target = e.currentTarget;
    if (e.key == "Backspace" && target.value === "") {
      setChipsarr([
        ...chipsarr.filter((x) => x != chipsarr[chipsarr.length - 1]),
      ]);
    }
  }
  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        width: "100%",
        padding: "0.5rem 0.2rem",
        height: "auto",
        margin: "0.3rem 1rem 1.4rem 1rem",
        fontSize: "1.1rem",
        boxSizing: "border-box",
        border: "0.1rem solid rgba(90, 90, 90, 0.4)",
        borderRadius: "0.4rem",
      }}
    >
      {chipsarr.map((itm) => {
        {
          return <Chips text={itm} key={itm} removeChips={removeChips} />;
        }
      })}
      <input
        type="text"
        list={props.suggestionsid}
        name="inp"
        onKeyUp={check}
        onKeyDown={checkd}
        className="mysugimp"
        style={{
          border: "0px solid #cccccc",
          outline: "0",
        }}
      />
      <datalist id={props.suggestionsid}>
        {props.suggestions.map((sugg, index) => (
          <option value={sugg} key={index}>
            {sugg}
          </option>
        ))}
      </datalist>
    </div>
  );
}
