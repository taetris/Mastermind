import React from "react";
import Attempt from "../organisms/attempt"

export default function Board(props) {

    let renderMadeAttempts = []


    // make the baseline board
    // useeffect jalle read garxa props

    for (let attempt of props.totalUserAttempts) {
        // console.log("attempt", attempt)
        renderMadeAttempts.push(<Attempt userAttempt={attempt}/>)
    }

    React.useEffect(() => {
        console.log("totalUserAttempts", props.totalUserAttempts)

    }, [props.totalUserAttempts])

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
            {renderMadeAttempts}
            
        </div>
    )
}