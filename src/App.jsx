import React from 'react'
import './App.css'
import UserInput from './components/pages/userinput'
import Board from './components/pages/board'
import Slot from './components/molecules/slot'

export default function App() {

  const [correctValues, setCorrectValues] = React.useState(["orange", "pink", "blue", "black"]);
  
  const [clickCount, setClickCount] = React.useState(0);
  const [tempSelectedColors, setTempSelectedColors] = React.useState(["#ddd", "#ddd", "#ddd", "#ddd"]);
  const [userAttempt, setUserAttempt] = React.useState({
    id: 0,
    value: ["#ddd", "#ddd", "#ddd", "#ddd"],
    redCount: 0,
    whiteCount: 0
  });

  const [totalUserAttempts, setTotalUserAttempts] = React.useState([userAttempt]);
  
  let attemptCount = 0

  function colorSelectHandler(event) {
    // Prevent selection beyond 4 colors
    if (clickCount > 3) return;
  
    event.currentTarget.style.background = "rgba(1, 1, 1, 1)";
    
    const selectedColor = event.target.style.backgroundColor;
  
    setTempSelectedColors((prevSelectedColors) => {
      const updatedColors = [...prevSelectedColors];
      updatedColors[clickCount] = selectedColor;
  
      // Update userAttempt with the new color array
      setUserAttempt((prevAttempt) => ({ ...prevAttempt, value: updatedColors }));
      
      return updatedColors;
    });
    
    // Increment clickCount
    setClickCount((prevCount) => prevCount + 1);
  }
  

  
  function checkUserAttempt() {
    let redCount = 0;
    let whiteCount = 0;
  
    // Ensure the user has selected all colors
    if (clickCount < 4) {
      alert("Please select all colors");
      return;
    }

    if(attemptCount === 10){
      alert("Game Over")
      return;
    }
  
    attemptCount += 1
  
    // Create a copy of correctValues to avoid mutation
    const updatedCorrectValues = [...correctValues];
  
    // Loop through the user's current attempt
    for (let i = 0; i < 4; i++) {
      console.log(i, "My color: ", userAttempt.value[i]);
  
      // If color matches in the correct position
      if (userAttempt.value[i] === updatedCorrectValues[i]) {
        redCount += 1;
        updatedCorrectValues[i] = null; // Remove matched color
      }
    }
  
    // Check for white matches (correct color, wrong position)
    for (let i = 0; i < 4; i++) {
      if (userAttempt.value[i] !== updatedCorrectValues[i]) { // Avoid double counting reds
        for (let j = 0; j < 4; j++) {
          // Check for color matches
          if (userAttempt.value[i] === updatedCorrectValues[j]) {
            whiteCount += 1;
            updatedCorrectValues[j] = null; // Remove matched color
            break; // Break to avoid counting the same color again
          }
        }
      }
    }
  
    console.log("Red: ", redCount, "White: ", whiteCount);
  
    // Update userAttempt with red and white counts
    setUserAttempt((prevAttempt) => ({
      ...prevAttempt,
      redCount: redCount,
      whiteCount: whiteCount,
      id: attemptCount
    }));
  

    // Save the current attempt before resetting
    setTotalUserAttempts((prevAttempts) => [...prevAttempts, userAttempt]);
    console.log("from checkUserAttempt: ", totalUserAttempts)
    // Reset state for the next attempt
    setClickCount(0);
    setTempSelectedColors(["#ddd", "#ddd", "#ddd", "#ddd"]);
  }
  
  
  return (
    <>
    <div className="app"
    style={{maxHeight: "100vh"}}>
      <Slot colors={correctValues} colorCount={4} isClickable={false}/>
      <Board totalUserAttempts={totalUserAttempts}  />
      <UserInput checkUserAttempt={checkUserAttempt} colorSelectHandler={colorSelectHandler} />
    </div>
    </> 

  )
}


