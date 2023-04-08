import React, { useState, useEffect } from "react";
import {
  BrowserRouter,
  Route,
  Routes,
  useLocation,
  useParams,
  useMatch,
} from "react-router-dom";
import CNavbaar2 from "./components/CNavbaar2";

import ODashboard from "./components/ODashboard";
import PDashboard from "./components/PDashboard";
import ADashboard from "./components/ADashboard";

import { useUserAuth } from "./context/UserAuthContext";
import Error from "./Error/Error";

import { useAuthState } from "react-firebase-hooks/auth";

import Events from "./components/Events";
import FundForm from "./components/FundForm";
export default function UserRoutes({ userprofile, setUserStatus }) {
  return (
    <>
      <CNavbaar2 userprofile={userprofile} />
      <Routes>
        {userprofile?.organisation === "Parsec" ? (
          <>
            <Route
              path="/dashboard"
              element={<PDashboard userprofile={userprofile} funfrm={0} />}
            />
            <Route
              path="/funds"
              element={<PDashboard userprofile={userprofile} funfrm={2} />}
            />
          </>
        ) :
          userprofile?.organisation === "Admin" ? (
            <>
              <Route
                path="/funds"
                element={<ADashboard userprofile={userprofile}  />}
              />
              <Route
                path="/dashboard"
                element={<ADashboard userprofile={userprofile}  />}
              />
            </>
          )
        : (
          userprofile?.organisation &&
          userprofile?.organisation !== "Parsec" && (
            <>
              <Route
                path="/funds"
                element={<ODashboard userprofile={userprofile} funfrm={2} />}
              />
              <Route
                path="/sponsor"
                element={<FundForm userprofile={userprofile} />}
              />
              <Route
                path="/dashboard"
                element={<ODashboard userprofile={userprofile} funfrm={0} />}
              />
            </>
          )
        )}

        <Route path="*" element={<Error />} />
      </Routes>
    </>
  );
}
