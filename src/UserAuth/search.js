import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useUserAuth } from "../context/UserAuthContext";
import { useNavigate } from "react-router-dom";
import { type } from "@testing-library/user-event/dist/type";
import loginSvg from "../imges/login.svg";
import googleSvg from "../imges/googleico.svg";
import linkedinSvg from "../imges/linkedinico.svg";
import facebookSvg from "../imges/facebook.svg";
import gitSvg from "../imges/github.svg";
import { getFunctions, httpsCallable } from "firebase/functions";
import { db } from "../firebase";
import { auth } from "../firebase";
import app from "../firebase";
import ChipInput from "material-ui-chip-input";

import "./Login.css";
import "./search.css";
export default function Search() {
  const [email, setEmail] = useState("");
  const [password2, setPassword] = useState("");
  const [error, setError] = useState("");
  const { logIn, googleSignIn, facebookSignIn, gitSignIn } = useUserAuth();
  const navigate = useNavigate();

  const functions = getFunctions(app, "asia-southeast2");

  const getUserProfile = httpsCallable(functions, "getUserProfile");
  const searchJob = httpsCallable(functions, "searchJob");
  const hello = httpsCallable(functions, "hello");
  function search(expr) {
    console.log(document.getElementById("tok").innerHTML);
    console.log(hello({ token: document.getElementById("tok").innerHTML }));
    searchJob({ exp: expr }).then((result) => {
      console.log(result);
    });
  }
  useEffect(() => {
    const chips$ = document.querySelector(".chips");
    const chipDelBtn$ = document.querySelectorAll(".delete-chip");
    const chipInput$ = document.getElementById("chip-input");

    // Event Listeners

    chips$.addEventListener("click", (e) => deleteChip(e.target));
    chipInput$.addEventListener("keyup", (e) => addChip(e.code));
    // Functions

    function deleteChip(target) {
      if (target.classList.contains("delete-chip")) {
        target.parentElement.remove();
      }
    }

    function addChip(e) {
      if (
        (chipInput$.value !== "" && e === "Enter") ||
        (chipInput$.value !== "" && e === "Comma")
      ) {
        // Create new chip
        const newChip = document.createElement("div");
        newChip.classList.add("added-chip");
        if (e === "Comma") {
          newChip.innerHTML = `<span>${chipInput$.value.split(",")[0]}</span>
                      <button class="delete-chip">x</button>`;
        } else {
          newChip.innerHTML = `<span>${chipInput$.value}</span>
                      <button class="delete-chip">x</button>`;
        }
        chips$.insertBefore(newChip, chipInput$);
        // Reset input
        chipInput$.value = "";
      }
    }

    function getChipValues() {
      const chipValues$ = document.querySelectorAll(".added-chip span");
      let totalChips = [];
      chipValues$.forEach((chip) => totalChips.push(chip.textContent));
      return totalChips;
    }
  });

  return (
    <div className="main-log2">
      <div className="leftbar">
        <div className="mb-4 cus">
          <input
            type="email"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            placeholder="Email Address"
            style={{
              width: "95%",
              padding: "12px 20px",
              height: "50px",
              margin: "10px 0 0 0",
              boxSizing: "border-box",
              border: "2px solid rgba(90, 90, 90, 0.4)",
              borderRadius: "20px",
            }}
            onChange={(e) => search(e.currentTarget.value)}
          />
        </div>

        <button
          type="submit"
          className="btn btn-primary"
          id="loginbut"
          style={{
            width: "40%",
            height: "51px",
            background: "#006872",
            boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
            borderRadius: "20px",
          }}
        >
          <b>Log In</b>
        </button>
      </div>
      <div class="chips">
        <div class="added-chip" data-chip-index="1">
          <span>Chip 1</span>
          <button class="delete-chip">x</button>
        </div>
        <div class="added-chip" data-chip-index="2">
          <span>Chip 2</span>
          <button class="delete-chip">x</button>
        </div>
        <input
          type="text"
          placeholder="Type Here and Hit Enter"
          id="chip-input"
        />
      </div>
    </div>
  );
}
