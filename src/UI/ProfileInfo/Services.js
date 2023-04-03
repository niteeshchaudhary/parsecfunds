import React, { useState, useEffect } from "react";
import resumeimg from "../../imges/service.svg";
import { SpinnerDotted } from "spinners-react";
import Card from "./card";
import "./Resume.css";
import app, { db } from "../../firebase";
import { getFunctions, httpsCallable } from "firebase/functions";
import { ref, getDatabase } from "firebase/database";
import { useList } from "react-firebase-hooks/database";
import { useNavigate, useLocation } from "react-router-dom";

const functions = getFunctions(app, "asia-southeast2");
const addYourService = httpsCallable(functions, "addYourService");
const database = getDatabase();

export default function Services(props) {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [loadingState, setLoadingState] = useState(false);
  const [category, loading, snperror] = useList(ref(database, "category"));
  const [subcategory, subloading, subperror] = useList(
    ref(database, "subcategory")
  );

  const [subcategies, setSubcategies] = useState([]);

  const handleCategory = (id) => {
    const dt = subcategory.flat()[id];
    setSubcategies(dt.val());
  };

  function clickhandler(e) {
    const catval = document.getElementById("cat").value;
    const subcatval = document.getElementById("subcat").value;
    setLoadingState(true);
    if (catval != "" && subcatval != "") {
      addYourService({
        category: document.getElementById("cat").value,
        subcategory: document.getElementById("subcat").value,
      }).then((result) => {
        if (result.data.status == 1) {
          const profile = state?.profile;
          profile["screen"] = 8;
          props.fun1();
          navigate("/ProfileInfo", { state: { profile: profile } });
        } else {
          console.log(result.data);
          alert(result.data.description);
          setLoadingState(false);
        }
      });
    }
  }

  return (
    <>
      <div className="main-logr">
        <div
          className="Scroll"
          style={{
            overflow: "auto",
            width: "50%",
            padding: "6% 2% 2% 6%",
            height: "100%",
          }}
        >
          <h1
            style={{
              width: "90%",
              fontFamily: "PT Serif",
              fontStyle: "normal",
              fontWeight: "700",
              fontSize: "1.9rem",
              textAlign: "justify",
              textJustify: "inter-word",
              lineHeight: "2.3rem",
            }}
          >
            What is the services you provide?
          </h1>
          <p
            style={{
              width: "90%",
              fontFamily: "Roboto",
              fontStyle: "normal",
              fontWeight: "400",
              marginTop: "1%",
              marginBottom: "1%",
              textAlign: "justify",
              textJustify: "inter-word",
              fontSize: "1.1rem",
              lineHeight: "1.4rem",
            }}
          >
            Select the categories that best represent the type of work you do so
            that we can match you with the right clients in search results.
          </p>
          <select
            name="catt"
            id="cat"
            onChange={(e) => handleCategory(e.target.value)}
            style={{
              width: "90%",
              padding: "0.2rem 1rem",
              height: "2.8rem",
              margin: "0.8rem 0px 0.8rem 0",
              fontSize: "1rem",
              boxSizing: "border-box",
              border: "0.1rem solid rgba(90, 90, 90, 0.4)",
              borderRadius: "0.8rem",
            }}
            defaultValue=""
            required
          >
            <option disabled value="">
              Select a Category
            </option>
            {category && category !== undefined
              ? category.map((ctr, index) => {
                  return (
                    <option key={index} value={ctr.key}>
                      {ctr.val()}
                    </option>
                  );
                })
              : "No category"}
            {/* <option value="">Select a Category</option>
            <option value="A">Vulnerability accessment and penetration testing</option>
            <option value="B">Forensics</option>
            <option value="C">Consultancy</option> */}
            {/* <option value="D">D</option> */}
          </select>
          <select
            placeholder="Level"
            id="subcat"
            style={{
              width: "90%",
              padding: "0.2rem 1rem",
              height: "2.8rem",
              margin: "0.8rem 0px 0.8rem 0",
              fontSize: "1rem",
              boxSizing: "border-box",
              border: "0.1rem solid rgba(90, 90, 90, 0.4)",
              borderRadius: "0.8rem",
            }}
            defaultValue=""
            required
            // onChange={(e)=> handleSubcategory(e.target.value)}
          >
            <option disabled value="">
              Select a subcategory
            </option>

            {subcategies && subcategies !== undefined
              ? subcategies.map((ctr, index) => {
                  return (
                    <option key={index} value={index}>
                      {ctr}
                    </option>
                  );
                })
              : "No category"}
          </select>
        </div>
        <div className="rightbarr">
          <img src={resumeimg} className="imglog1r" alt="resume"></img>
        </div>
      </div>
      <div>
        <progress
          id="progr"
          value="80"
          max="100"
          style={{
            accentColor: "#FFC727",
            height: "0.26rem",
            width: "100%",
          }}
        >
          80%
        </progress>
        <div
          style={{
            display: "flex",
            height: "3.1rem",
            justifyContent: "right",
            paddingRight: "10%",
          }}
        >
          {loadingState && <SpinnerDotted />}
          {!loadingState && (
            <button
              type="submit"
              onClick={clickhandler}
              className="btn btn-primary"
              style={{
                width: "15%",
                height: "3rem",
                background: "#006872",
                boxShadow: "0px 0.2rem 0.2rem rgba(0, 0, 0, 0.25)",
                borderRadius: "2rem",
              }}
            >
              Next
            </button>
          )}
        </div>
      </div>
    </>
  );
}
