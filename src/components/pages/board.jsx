import React from "react";
import Attempt from "../organisms/attempt"

export default function Board(props) {
    let totalUserAttempts = []
    let totalUpdatedAttempts = []
    for(let i=10; i>0; i--){
        const updatedAttempt = {...props.userAttempt, id: i}
        totalUpdatedAttempts.push(updatedAttempt)
        totalUserAttempts.push(<Attempt userAttempt={props.userAttempt}/>)
    }

    // props.setUserAttempt(prevAttempt => ({...prevAttempt, id: i}))

    return (
        <div className="board"
            style={{display:"flex",
                flexDirection: "column",
                justifyContent: "center",
                width: "100%",
                alignItems: "center"
            }}>
            
            <h1>Mastermind</h1>
            {totalUserAttempts}
            
        </div>
    )
}