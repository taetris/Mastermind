import React from "react";
import Color from "../atoms/color"

export default function Result(props) {
    let possibleColors = []
    for(let i=0; i<props.colorCount; i++){
        possibleColors.push(
                <div style={{}}>
                    <Color color="red" size="20px"/>
                </div>)
    }
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