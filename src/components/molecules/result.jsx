import React from "react";
import Color from "../atoms/color"

export default function Result(props) {
    let possibleColors = []

    for(let i=0; i<props.colorCount; i++){
        possibleColors.push(<Color color={props.colors[i]} size="20px"/>)
        

    }

    console.log(possibleColors)
    return (
        <div className="result"
            style={{width: "30%",
                display: "flex",
                justifyContent:"space-evenly",
                alignItems: "center"
            }}>
            {possibleColors}
        </div>
    )
}