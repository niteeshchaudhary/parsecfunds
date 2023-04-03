import React,{useState} from 'react'

function Congrats() {
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
            <img style={{width:"5rem",marginTop:"4rem"}} src={require("../../../imges/job-posted.svg").default} alt="" />
        <p style={{fontSize:"1.1rem",margin:"2rem",textAlign:"center"}}>Congratulations! your job is posted successfully</p>
 
   </div>
      </div>
    )}
    
    </>
  )
}

export default Congrats