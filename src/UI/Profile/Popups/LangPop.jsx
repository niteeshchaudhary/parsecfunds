import React, { useState, useEffect } from "react";
import Card from "./card";
import app, { db } from "../../../firebase";
import { getFunctions, httpsCallable } from "firebase/functions";

const functions = getFunctions(app, "asia-southeast2");
const addPrefferedLanguage = httpsCallable(functions, "addPrefferedLanguage");

export default function LangPop(props) {
  const [card, setcard] = useState(props.languages);
  const [count, setCount] = useState(1);

  const commonstyle = {
    background: "#FFFFFF",
    boxShadow: " 0rem 0.25rem 0.25rem rgba(0, 0, 0, 0.25)",
    fontSize: "1rem",
    margin: "1.5rem",
    borderRadius: "1rem",
    padding: "1rem",
    fontWeight: "600",
    width: "30vw",
    margin: "auto",
  };
  useEffect(() => {
    setCount(props.languages.length);
  }, []);

  function removeLang(e) {
    e.currentTarget.parentElement.style.display = "none";
    document.getElementById("langadder").style.display = "flex";
    if (count > 0) {
      setCount(count - 1);
    }
    console.log(count);
  }
  function clickhandler(e) {
    const arr = document.getElementById("cardholder");
    const data = [];
    Array.prototype.forEach.call(arr.children, (child) => {
      if (child.style.display !== "none") {
        data.push({
          Language: child.children[0].value,
          level: child.children[1].value,
        });
      }
    });
    props.setLang(data);
    addPrefferedLanguage(data);
    props.setIsOpen(false);
  }
  function addLang(e) {
    if (count < 3) {
      setCount(count + 1);
      setcard([...card, "b"]);
    }
  }
  useEffect(() => {
    if (count === 3) {
      document.getElementById("langadder").style.display = "none";
    }
  }, [count]);
  return (
    <div style={{ backgroundColor: "#fefefe", borderRadius: "0.2rem" }}>
      <div
        style={{
          padding: "1rem",
          margin: "1rem",
        }}
      >
        <div id="cardholder">
          {card.map((abc, index) => (
            <Card
              function={removeLang}
              lang={abc.Language}
              level={abc.level}
              key={index}
            />
          ))}
        </div>
        <div
          onClick={addLang}
          id="langadder"
          style={{ display: "flex", cursor: "pointer", width: "50%" }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: "50%",
              height: "3rem",
              width: "3rem",
              border: "0px",
              background: "#006872",
              alignSelf: "middle",
              fontSize: "1.5rem",
              color: "#fff",
              fontWeight: "600",
            }}
          >
            +
          </div>
          <p
            style={{
              fontSize: "1.1rem",
              fontWeight: "500",
              margin: "0.6rem 0px 0px 0.7rem",
            }}
          >
            Add languages
          </p>
        </div>
      </div>
      <div style={{ display: "flex", justifyContent: "center", width: "100%" }}>
        <div
          onClick={clickhandler}
          style={{
            cursor: "pointer",
            textAlign: "center",
            width: "30%",
            border: "0px",
            padding: "1rem",
            background: "#006872",
            fontSize: "1rem",
            color: "#fff",
            borderRadius: "1rem",
            fontWeight: "600",
          }}
        >
          Confirm
        </div>
      </div>
    </div>
  );
}
