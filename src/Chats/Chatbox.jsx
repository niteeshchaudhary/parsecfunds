import React, { useState } from "react";
import "./Chatbox.css";
import ChatPeople from "./ChatPeople";

import { getAuth } from "firebase/auth";
import { useNavigate, useLocation } from "react-router-dom";
import IndividualChat from "./IndividualChat";
function Chatbox() {
  const auth = getAuth();

  const { state } = useLocation();
  const proposal = state?.proposal;
  const cuser = { ...proposal?.user, email: proposal?.info?.from };
  const [currentUser, setCurrentUser] = useState(cuser || {});
  const profile = state?.profile;
  console.log("&&&&&&&&&&&&&*", currentUser);
  console.log(profile);

  return (
    <>
      <div className="d-flex flex-row align-items-start">
        {currentUser?.email ? (
          <IndividualChat
            currentUser={currentUser}
            setCurrentUser={setCurrentUser}
            auth={auth}
          />
        ) : (
          <ChatPeople setCurrentUser={setCurrentUser} auth={auth} />
        )}
      </div>
    </>
  );
}

export default Chatbox;
