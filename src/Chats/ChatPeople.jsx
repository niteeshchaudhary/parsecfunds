import React, { useEffect, useState } from "react";
import ChatListItem from "./ChatListItem";
import { useList } from "react-firebase-hooks/database";
import { getDatabase, ref, set, onValue, get } from "firebase/database";
import { getFunctions, httpsCallable } from "firebase/functions";
import app from "../firebase";

const functions = getFunctions(app, "asia-southeast2");
//const getCountUnseen = httpsCallable(functions, "getCountUnseen");
const getChatAddress = httpsCallable(functions, "getChatAddress");
function ChatPeople({ auth, setCurrentUser }) {
  const db = getDatabase();
  const [sndata, setsndata] = useState([]);
  const [snapshots, loading, error] = useList(
    ref(db, `/user/${auth?.currentUser?.uid}/`)
  );
  function listner(lst, result, index) {
    const starCountRef = ref(db, `/chats/${result.data.desc}/`);
    onValue(starCountRef, (snapshot) => {
      var cnt = 0;
      snapshot.forEach((chld) => {
        chld.forEach((msg) => {
          if (
            msg.val().status == "notseen" &&
            msg.val().to == auth?.currentUser?.email
          ) {
            cnt++;
          }
        });
      });
      lst[index] = cnt;
      setsndata(lst);
      console.log(lst);
    });
  }
  useEffect(() => {
    if (snapshots.flat().length != 0) {
      var lst = new Array(snapshots.flat().length);

      snapshots.forEach((ele, index) => {
        getChatAddress({ toemail: ele.val()?.email }).then((result) => {
          listner(lst, result, index);
        });
      });
    }
  }, [snapshots]);

  return (
    <>
      <div className="chatpeople-wrap">
        <div className="d-flex flex-row align-items-center search-jobs">
          <img
            style={{
              width: "1.4rem",
              marginRight: "1rem",
              marginLeft: "1rem",
              color: "#006872",
            }}
            src={require("../imges/searchicon.svg").default}
            alt=""
          />
          <input
            style={{ color: "000000B2", border: "none", fontSize: "1.1rem" }}
            type="text"
            placeholder=" "
          />
        </div>
        <div className="people-list my-2">
          <p
            style={{
              fontSize: "1.2rem",
              fontWeight: "500",
              margin: "0.5rem 1rem 1rem 1rem",
            }}
          >
            People &nbsp;{loading && <span> Loading...</span>}
          </p>
          <div className="Scroll" style={{ height: "25rem", overflow: "auto" }}>
            {error && <strong>Error: {error}</strong>}

            {!loading && snapshots && (
              <div>
                <span>
                  {snapshots.map((v, index) => {
                    return (
                      <ChatListItem
                        user={v.val()}
                        key={index}
                        setCurrentUser={setCurrentUser}
                        unseen={sndata[index]}
                      />
                    );
                  })}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default ChatPeople;
