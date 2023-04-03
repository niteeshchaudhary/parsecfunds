import React from 'react'
import { useState } from 'react'

function Workpopup(props) {
  const [close,setClose]=useState(true);
  const commonstyle={
    background: "#FFFFFF",
    boxShadow:" 0rem 0.25rem 0.25rem rgba(0, 0, 0, 0.25)", fontSize:"1rem",margin:"1.5rem",
    borderRadius: "1rem", padding:"1rem", fontWeight:"600", width:"30vw",margin:"auto"
  }
  return (
    <>
    {close && (
      <div style={commonstyle} className="work-exp">
        <img style={{width:"1rem",marginLeft:"25vw",cursor:"pointer"}} onClick={()=> setClose(false)} src={require("../../../imges/cross-icon.svg").default} alt="" />
      <div className="d-flex flex-column align-items-center ">
      <input style={{height:"2.5rem",width:"18vw",border:"0.04rem solid rgba(0,0,0,0.4)",borderRadius:"0.5rem"}} placeholder='Position' type="text" />
      <input style={{height:"2.5rem",width:"18vw",border:"0.04rem solid rgba(0,0,0,0.4)",borderRadius:"0.5rem"}} placeholder='Company ' type="text" />
      <input style={{height:"2.5rem",width:"18vw",border:"0.04rem solid rgba(0,0,0,0.4)",borderRadius:"0.5rem"}} placeholder='Tenure
      ' type="text" />
      <button style={{margin:"2rem",fontWeight:"600",border:"0.05rem solid rgba(0, 0, 0, 0.1)",width:"8rem",padding:"0.5rem",fontSize:"1rem", 
borderRadius:"0.6rem",background:"#006872",color:"#FFFFFF"}} type="submit">Update</button>
      </div>
      </div>
    )}
    
    </>
  )
}

export default Workpopup