import React from "react";

export default function ChatListItem({ user, setCurrentUser, unseen }) {
  return (
    <div
      style={{
        paddingBottom: "1rem",
        borderBottom: "0.05rem solid rgba(0,0,0,0.2)",
        cursor: "pointer",
      }}
      onClick={() => setCurrentUser(user)}
      className="people d-flex flex-row justify-content-start"
    >
      <img
        style={{
          width: "3rem",
          height: "3rem",
          borderRadius: "50%",
          marginLeft: "1rem",
        }}
        src={user?.pic}
        alt=""
      />
      <div style={{ marginLeft: "1rem" }} className="d-flex flex-column mx-3">
        <p style={{ fontSize: "0.8rem", fontWeight: "500" }}>{user?.name}</p>
        {/* <p style={{ fontSize: "0.8rem" }}>lorem ipsum dolar sit amet</p> */}
      </div>
      <div className="d-flex flex-column align-items-end">
        {/* <p style={{ fontSize: "0.8rem" }}>Today, 9.52pm</p> */}
        {/* <img
          style={{ width: "1rem", marginTop: "1rem" }}
          src={require("../imges/double-tick.svg").default}
          alt=""
        /> */}
        {unseen > 0 ? (
          <p
            style={{
              color: "white",
              marginTop: "1rem",
              background: " #F24E1E",
              borderRadius: "50%",
              width: "1.3rem",
              height: "1.3rem",
              textAlign: "center",
              padding: "0rem",
              fontSize: "0.8rem",
              fontWeight: "500",
            }}
          >
            {unseen}
          </p>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}
