import React, { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";


import { useUserAuth } from "./context/UserAuthContext";
import Error from "./Error/LoadError";
import UserRoutes from "./UserRoutes";
import LoginForm from "./components/Loginform";
import Signupform from "./components/Signupform";
import ForgotPass from "./components/ForgotPass";
import Layout1 from "./components/Layout1";
import Events from "./components/Events";
import CNavbaar from "./components/CNavbaar";

export default function AllRoutes() {
  const { user, setUserStatus } = useUserAuth();
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout1 frm={1} fmn={0} />} />
        <Route path="/login" element={<Layout1 frm={1} fmn={0} />} />
        <Route path="/signup" element={<Layout1 frm={1} fmn={1} />} />
        <Route path="/forgot" element={<Layout1 frm={1} fmn={2} />} />
        <Route
          path="/events"
          element={<Events userprofile={user?.profile} />}
        />
        {user ? (
          <Route
            path="*"
            element={
              <UserRoutes
                userprofile={user?.profile}
                setUserStatus={setUserStatus}
              />
            }
          />
        ) : (
          <>
            <Route path="*" element={<Error />} />
          </>
        )}
      </Routes>
    </>
  );
}
