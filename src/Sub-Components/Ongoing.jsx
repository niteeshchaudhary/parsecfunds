import React from 'react'

function Ongoing() {
  return (
    <>
      <div style={{width:"75vw",margin:"auto"}} className="ongoing">
            <p style={{background:" #FFFFFF",
border: "0.05rem solid rgba(0, 0, 0, 0.3)", padding:"0.5rem",
borderRadius: "1rem"}}>All Ongoing Project</p>
<div style={{background:" linear-gradient(180deg, #FFFFFF 0%, rgba(255, 255, 255, 0) 100%)",
border: "0.05rem dashed rgba(0, 0, 0, 0.4)", padding:"2rem 1rem", margin:"1rem 0",
borderRadius: "0.4rem"}} className="-all-ongoing-list">
  <div style={{margin:"1rem 0",paddingBottom:"2rem",borderBottom:"0.05rem solid rgba(0,0,0,0.2)"}} className="listitem">
    <p style={{fontSize:"1.2rem",fontWeight:"600"}}>Full stack development</p>
    <p style={{fontSize:"1rem",color:"rgba(0,0,0,0.7)"}}>  Est. Budget: $4,000, Hourly rate-$45.00 </p>
    <p style={{fontSize:"1rem",color:"rgba(0,0,0,1)",marginTop:"1rem"}}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vitae cursus nulla augue sapien. 
      Vitae facilisis imperdiet sed nunc. Pellentesque magna tempus aliquet eget amet. Vitae ipsum nisl sit nam nulla proin consectetur vitae vel. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
       Vitae cursus nulla augue sapien. Vitae facilisis imperdiet sed nunc. </p>
  </div>
  <div style={{margin:"1rem 0",paddingBottom:"2rem",borderBottom:"0.05rem solid rgba(0,0,0,0.2)"}} className="listitem">
    <p style={{fontSize:"1.2rem",fontWeight:"600"}}>Create a logo</p>
    <p style={{fontSize:"1rem",color:"rgba(0,0,0,0.7)"}}>  Est. Budget: $4,000, Hourly rate-$45.00 </p>
    <p style={{fontSize:"1rem",color:"rgba(0,0,0,1)",marginTop:"1rem"}}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vitae cursus nulla augue sapien. 
      Vitae facilisis imperdiet sed nunc. Pellentesque magna tempus aliquet eget amet. Vitae ipsum nisl sit nam nulla proin consectetur vitae vel. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
       Vitae cursus nulla augue sapien. Vitae facilisis imperdiet sed nunc. </p>
  </div>

</div>
          </div>
    </>
  )
}

export default Ongoing