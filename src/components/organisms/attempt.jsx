import React from "react";
import Result from "../molecules/result"
import Slot from "../molecules/slot"
export default function Attempt(props) {
    let userAttempt = props.userAttempt
 
    
    // setUserAttempt((prevAttempt) => {return{...prevAttempt, value: ["red", "blue", "pink", "orange"]}})
    // let userAttempt = ["red", "blue", "pink", "orange"]

    // let tempUserAttempt

    // let correctValues = ["blue", "green", "red", "yellow"]
    // let redCount, whiteCount

    return ( 
        <div className="attempt"
        style={{display: "flex",
            border: "1px solid #bbb",
            padding: "12px",
            width: "500px",
            alignItems: "center",
            borderRadius: "10px"
        }}>          
            <p>#{props.userAttempt.id}</p>
            <Slot colors={props.userAttempt.value} colorCount={props.userAttempt.value.length} isClickable={false}/>
      
            <Result colorCount={4}/>        

        </div>
    )
}