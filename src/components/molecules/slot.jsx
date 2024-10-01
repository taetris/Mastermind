import React from "react";
import Color from "../atoms/color";
export default function Slot(props) {
    
    let slotColorwithClick    
    let slotColors = []

    for(let i=0; i<props.colorCount; i++){
        if(props.isClickable){
            slotColorwithClick =  <button onClick={props.colorSelectHandler}><Color color={props.colors[i]} size="50px"/></button>
        }
        else{
            slotColorwithClick = <Color color={props.colors[i]} size="50px"/>
        }
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