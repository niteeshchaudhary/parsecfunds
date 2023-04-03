import React, { useEffect, useState } from "react";
import {
  BrowserRouter,
  Route,
  Routes,
  useLocation,
  useParams,
  useMatch,
} from "react-router-dom";
import { SpinnerDotted } from "spinners-react";

function Error() {
  const dest = useLocation();
  console.log(dest.pathname.toLowerCase());
  const [load, setLoad] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setLoad(false);
    }, 5000);
  }, []);
  return (
    <>
      {load ? (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            height: "100vh",
            width: "100%",
            alignItems: "center",
          }}
        >
          {" "}
          <SpinnerDotted />
        </div>
      ) : (
        <div className="d-flex justify-content-center align-items-center">
          <img
            style={{ height: "100vh" }}
            src={require("../imges/Error_page.svg").default}
            alt=""
          />
        </div>
      )}
    </>
  );
}

export default Error;
