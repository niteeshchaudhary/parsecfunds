import React, { useState, useEffect } from "react";
import app from "../../../firebase";
import { getFunctions, httpsCallable } from "firebase/functions";
const functions = getFunctions(app, "asia-southeast2");
const addToFavourites = httpsCallable(functions, "addToFavourites");
const removeFavourite = httpsCallable(functions, "removeFavourite");
export default function Heart(props) {
  const [cstate, setcstate] = useState(props.active);
  console.log(props.active);
  useEffect(() => {
    setcstate(props.active);
  }, [props.active]);
  function changeFavourite(e) {
    e.preventDefault();
    if (!cstate) {
      setcstate(true);
      addToFavourites({
        JobId: props?.jobid,
      }).then((result) => {
        console.log(result.data);
        if (result?.data?.status == 1) {
          console.log(props.chng);
          props.setchng(!props.chng);
          //setcstate(true);
        } else {
          setcstate(false);
          alert(result?.data?.desc);
        }
      });
    } else {
      setcstate(false);
      removeFavourite({
        JobID: props?.jobid,
      }).then((result) => {
        console.log(result.data);
        if (result?.data?.status == 1) {
          props.setchng(!props.chng);
          //setcstate(false);
        } else {
          setcstate(true);
          alert(result?.data?.desc);
        }
      });
    }
  }
  return (
    <div
      className="img-wrap"
      onClick={changeFavourite}
      style={{ cursor: "pointer" }}
    >
      <svg
        width="1.5rem"
        height="1.5rem"
        viewBox="0 0 32 31"
        fill={cstate ? "#f00" : "none"}
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M9.99935 5.16602C5.94935 5.16602 2.66602 8.34675 2.66602 12.2702C2.66602 19.3744 11.3327 25.8327 15.9993 27.3349C20.666 25.8327 29.3327 19.3744 29.3327 12.2702C29.3327 8.34675 26.0493 5.16602 21.9993 5.16602C19.5193 5.16602 17.326 6.35887 15.9993 8.18464C15.3231 7.25155 14.4248 6.49003 13.3804 5.96458C12.336 5.43913 11.1762 5.16521 9.99935 5.16602Z"
          stroke="#006872"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}
