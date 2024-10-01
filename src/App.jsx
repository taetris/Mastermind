import React from 'react'
import './App.css'
import UserInput from './components/pages/userinput'
import Board from './components/pages/board'
import Slot from './components/molecules/slot'

export default function App() {

  const [correctValues, setCorrectValues] = React.useState(["orange", "pink", "blue", "black"]);
  
  const [clickCount, setClickCount] = React.useState(0);
  const [attemptCount, setAttemptCount] = React.useState(0);

  const [tempSelectedColors, setTempSelectedColors] = React.useState(["#ddd", "#ddd", "#ddd", "#ddd"]);
  const [tempResult, setTempResult] = React.useState(["#ddd", "#ddd", "#ddd", "#ddd"]);
  const [userAttempt, setUserAttempt] = React.useState({});

  const [totalUserAttempts, setTotalUserAttempts] = React.useState([]);

  // Initialize the totalUserAttempts array once when the component mounts
  React.useEffect(() => {
    const initialAttempts = Array.from({ length: 10 }, (_, i) => ({
      id: i,
      value: ["#ddd", "#ddd", "#ddd", "#ddd"],
      result: ["#ddd", "#ddd", "#ddd", "#ddd"]
    }));
    // setTotalUserAttempts(initialAttempts);
  }, []); // This ensures the array is initialized only once


  function colorSelectHandler(event) {
    // Increment clickCount
    setClickCount((prevCount) => prevCount + 1);

    event.currentTarget.style.backgroundColor = "black"
    // Prevent selection beyond 4 colors
    if (clickCount >= 4) return;
  
    const selectedColor = event.target.style.backgroundColor;
  
    setTempSelectedColors((prevSelectedColors) => {
      const newColors = [...prevSelectedColors];
      newColors[clickCount] = selectedColor; // Update the current slot
      return newColors;
    });
  }
  

  function checkUserAttempt() {
    let redCount = 0;
    let whiteCount = 0;
  
    // Ensure the user has selected all colors
    if (clickCount < 4) {
      alert("Please select all colors");
      return;
    }

    setClickCount(0);

    // Increment attemptCount
    if (attemptCount === 10) {
      alert("Game Over");
      return;
    }
    
    setAttemptCount((prevCount) => prevCount + 1);

    // Use tempSelectedColors for current attempt
    const currentAttempt = tempSelectedColors;
    const tempCorrectValues = [...correctValues]; // Copy to avoid mutation

    // Check logic for red and white
    for (let i = 0; i < 4; i++) {
      // If color matches in the correct position
      if (currentAttempt[i] === tempCorrectValues[i]) {
        redCount += 1;
        tempCorrectValues[i] = null; // Remove matched color
      }
    }
  
    // Check for white matches (correct color, wrong position)
    for (let i = 0; i < 4; i++) {
      if (currentAttempt[i] !== tempCorrectValues[i]) { // Avoid double counting reds
        for (let j = 0; j < 4; j++) {
          if (currentAttempt[i] === tempCorrectValues[j]) {
            whiteCount += 1;
            tempCorrectValues[j] = null; // Remove matched color
            break;
          }
        }
      }
    }

    // Update tempResult with red and white counts
    const resultArray = Array(4).fill("#ddd");
    let i = 0;
    for (; i < redCount; i++) {
      resultArray[i] = "red";
    }
    for (; i < redCount + whiteCount; i++) {
      resultArray[i] = "white";
    }

    setTempResult(resultArray);

    // Save the current attempt
    setTotalUserAttempts((prevAttempts) => {
      const updatedAttempts = [...prevAttempts];
      updatedAttempts[attemptCount] = {
        id: attemptCount,
        value: currentAttempt,
        result: resultArray
      };
      return updatedAttempts;
    });

    // Reset for the next attempt
    setTempSelectedColors(["#ddd", "#ddd", "#ddd", "#ddd"]);
  }
  
  
  return (
    <div className="app" style={{ maxHeight: "100vh" }}>
      <Slot colors={correctValues} colorCount={4} isClickable={false} />
      <Board totalUserAttempts={totalUserAttempts} />
      <UserInput checkUserAttempt={checkUserAttempt} colorSelectHandler={colorSelectHandler} />
    </div>
  )
}
