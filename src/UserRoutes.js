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

import BuyConnects from "./Offers/BuyConnects";

import ODashboard from "./components/ODashboard";
import PDashboard from "./components/PDashboard";
import Success from "./Offers/Success";

import Postjob from "./UI/Employee/Jobs/Postjob";
import UpdatePostedJob from "./UI/Employee/Jobs/UpdatePostjob";

import MainPreview from "./UI/Profile/MainPreview";

import Edashboard from "./UI/Employee/EDashboard/Edashboard";

import Searchjob from "./UI/Employee/Components/Searchjob";
import Jobdetails from "./UI/Employee/Components/Jobdetails";

import SubmitProposal from "./UI/Employee/Components/SubmitProposal";
import SubmittedProposal from "./UI/Employee/Components/SubmittedProposal";

import ViewProposal from "./UI/Employee/Components/ViewProposal";
import ReceiveProposal from "./UI/Employee/Components/ReceiveProposal";
import EJobdetails from "./UI/Employee/Components/Ejobdetails";

import PostedJob from "./UI/Employee/Components/PostedJob";

import Chatbox from "./Chats/Chatbox";
import ChatOuterCover from "./Chats/ChatOuterCover";
import Hire from "./UI/Employee/Components/Hire";
import ProposalFixed from "./UI/Employee/Components/ProposalFixed";
import LatestProposal from "./UI/Employee/Components/LatestProposal";

import AddWallet from "./Offers/AddWallet";
import Withdrawal from "./Offers/Withdrawal";
import ManageServices from "./Sub-Components/ManageServices";

import SavedJobs from "./UI/SavedJobs";
import { useUserAuth } from "./context/UserAuthContext";
import Error from "./Error/Error";
import RequestAll from "./UI/Employee/Components/RequestAll";
import ERequestMoney from "./UI/Employee/Components/Erequested/ERequestMoney";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./Chats/firebase_dep";
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
              element={<PDashboard userprofile={userprofile} />}
            />
            <Route path="/previewProfile" element={<MainPreview />} />
          </>
        ) : (
          userprofile?.organisation &&
          userprofile?.organisation !== "Parsec" && (
            <>
              <Route
                path="/funds"
                element={<FundForm userprofile={userprofile} />}
              />
              <Route
                path="/dashboard"
                element={<ODashboard userprofile={userprofile} />}
              />
            </>
          )
        )}

        <Route path="*" element={<Error />} />
      </Routes>
    </>
  );
}
