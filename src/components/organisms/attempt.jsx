import React from "react";
import Result from "../molecules/result"
import Slot from "../molecules/slot"
export default function Attempt(props) {
    let userAttempt = props.userAttempt
 
    return ( 
        <div className="attempt"
        style={{display: "flex",
            border: "1px solid #bbb",
            padding: "12px",
            width: "500px",
            alignItems: "center",
            borderRadius: "10px",
            background: "grey"
        }}>          
            <p>#{userAttempt.id}</p>
            <Slot colors={userAttempt.value} colorCount={userAttempt.value.length} isClickable={false}/>
      
            <Result colors={userAttempt.result} colorCount={userAttempt.result.length} />        

        </div>
    )
}