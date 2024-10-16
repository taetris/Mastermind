import React from "react";
import Result from "../molecules/result"
import Slot from "../molecules/slot"
export default function Attempt(props) {
    const {userAttempt} = props
 
    return ( 
        <div className="attempt"
        style={{display: "flex",
            border: "1px solid rgba(98, 1, 145, 1)",
            padding: "12px",
            width: "500px",
            alignItems: "center",
            borderRadius: "10px",
            background: "#2c2c2c"
        }}>          
            <p>#{userAttempt.id}</p>
            <Slot colors={userAttempt.value} colorCount={userAttempt.value.length}/>
      
            <Result colors={userAttempt.result} colorCount={userAttempt.result.length} />        

        </div>
    )
}