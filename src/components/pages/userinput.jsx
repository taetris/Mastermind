import React from "react";
import Attempt from "../organisms/attempt";
import Slot from "../molecules/slot"
import Color from "../atoms/color"

export default function UserInput(props) {
    let colorArray = ["orange", "pink", "blue", "black", "green", "red"]
 
    // React.useEffect(() => {
    //     if(selectedColors.length === 4){
                // if next click is enter, select all and push to userAttempt
    //     }
    // }, [selectedColors])

    return (
        <div className="user=input"
            style={{display: "flex",
                justifyContent: "center",
                padding: "20px"
            }}>
                
            <Slot colors={colorArray} colorCount={colorArray.length} isClickable={true} colorSelectHandler={props.colorSelectHandler}/>
            <button className="go-button"
                style={{padding: "20px"}}
                onClick={props.checkUserAttempt}>GO!</button>
        </div>
    )
}