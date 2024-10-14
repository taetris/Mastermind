import React from "react";
import Attempt from "../organisms/attempt";
import Slot from "../molecules/slot"
import Color from "../atoms/color"
import PossibleColors from "../molecules/possibleColors";

export default function UserInput(props) {
    let colorArray = props.colorArray
 
    // React.useEffect(() => {
    //     if(selectedColors.length === 4){
    //             if next click is enter, select all and push to userAttempt
    //     }
    // }, [])



    return (
        <div className="user=input"
            style={{display: "flex",
                gap: "100px",
                padding: "20px"
            }}>
                
            <PossibleColors colors={colorArray} colorCount={colorArray.length} isClickable={true} colorSelectHandler={props.colorSelectHandler} />
            <button className="go-button"
                onClick={props.checkUserAttempt}>GO!</button>
        </div>
    )
}