import React, { useState, useEffect } from "react";
import { ref, getDatabase, query, orderByKey, get } from "firebase/database";
import ChatBoard from "./ChatBoard";
import frb, { auth } from "./firebase_dep";

var db = getDatabase();
var dbc = ref(db, "chatMessages");
export default function ChatOuterCover(props) {
  const [msglist, setmsglist] = useState([]);
  const [msglast, setmsglast] = useState("");
  const [plast, setplast] = useState("");

  useEffect(() => {
    const qry = query(dbc, orderByKey());

    get(dbc)
      .then((result) => {
        if (result.exists()) {
          console.log(result.val());
          setmsglist(Object.values(result.toJSON()));
          var karr = Object.keys(result.toJSON());
          //setlastmsg(karr[karr.length - 1]);
        } else {
          console.log("No data available");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return <ChatBoard user={props.user} id={props.id} msglist={msglist} />;
}
