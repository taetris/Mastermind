import React from "react";
import Color from "../atoms/color";
export default function PossibleColors(props) {
    
    let slotColorwithClick    
    let slotColors = []

    for(let i=0; i<props.colorCount; i++){

        slotColorwithClick =  <button style={{border: "none", borderRadius: "50%", background: "none", padding: "0"}} onClick={props.colorSelectHandler}><Color color={props.colors[i]} size="50px"/></button>
        console.log(props.colors[i])
        slotColors.push(slotColorwithClick)
    }

    return (
        <div 
            className="color-slot"
            style={{
                    width: "70%",
                    display: "flex",
                    justifyContent: "space-evenly",
                    
            }}>
            {slotColors}
        </div>
    )   
}