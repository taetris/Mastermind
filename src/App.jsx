import React from 'react'
import './App.css'
import UserInput from './components/pages/userinput'
import Board from './components/pages/board'
import Slot from './components/molecules/slot'

export default function App() {

  function getRandomValues(arr, count) {
    // Make a copy of the array
    const copy = [...arr];
    // Shuffle the array randomly
    const shuffled = copy.sort(() => 0.5 - Math.random());
    // Return the first 'count' elements
    return shuffled.slice(0, count);
  }
  
  // const colorArray = ['#FF5733', '#33FF57', '#3357FF', '#F5B041', '#AF7AC5', '#1ABC9C'];
  const colorArray = ["orange", "pink", "blue", "black", "green", "red"]
  const [correctValues, setCorrectValues] = React.useState(() => getRandomValues(colorArray, 4));
  
  const [clickCount, setClickCount] = React.useState(0);
  const [attemptCount, setAttemptCount] = React.useState(0);

  // rename to tempUserAttempt
  const [tempSelectedColors, setTempSelectedColors] = React.useState( ["#ddd", "#ddd", "#ddd", "#ddd"]);
  
  const [tempResult, setTempResult] = React.useState(["#ddd", "#ddd", "#ddd", "#ddd"]);
  const [userAttempt, setUserAttempt] = React.useState({});

  const [totalUserAttempts, setTotalUserAttempts] = React.useState([]);
  
  const [refresh, setRefresh] = React.useState(false);

  // Initialize the totalUserAttempts array once when the component mounts

  React.useEffect(() => {
    let initialAttempts = Array.from({ length: 10 }, (_, i) => ({
      id: i,
      value: ["#ddd", "#ddd", "#ddd", "#ddd"],
      result: ["#ddd", "#ddd", "#ddd", "#ddd"]
    }));
    setTotalUserAttempts(initialAttempts);
  }, []); // This ensures the array is initialized only once

  // Add this useEffect to log the updated state
  React.useEffect(() => {
    setRefresh((prev) => !prev);
    console.log(tempSelectedColors, "Updated tempSelectedColors");
  }, [tempSelectedColors]);  // This will log the updated value whenever tempSelectedColors changes
  

  React.useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Backspace') {
        
        handleBackspace();
      }
    };
  
    window.addEventListener('keydown', handleKeyDown);
  
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [tempSelectedColors]);
  

  const handleBackspace = () => {
    console.log(clickCount, "clickCount");
    if (clickCount > 0) {
      // Decrease the clickCount by 1 to reflect the removal
      setClickCount(clickCount - 1);
  
      // Create a copy of the current tempSelectedColors
      const newSelection = [...tempSelectedColors];
  
      // Set the last selected color slot to "#ddd" (remove the color)
      newSelection[clickCount - 1] = "#ddd";
  

      setTempSelectedColors((prevSelectedColors) => {
  
        setTotalUserAttempts((prevAttempts) => {
          const newAttempts = [...prevAttempts];
          newAttempts[attemptCount] = {
            ...prevAttempts[attemptCount],
            value: newSelection,
 
          };
          return newAttempts;
        });
    
        return newSelection;
      });
    }
  };
    

  
  function colorSelectHandler(event) {
    // Prevent selection beyond 4 colors
    if (clickCount >= 4) return;
  
    let selectedColor;
    // If the event target is the button, we need to check its child (which has the background color)
    if (event.target.tagName === "BUTTON") {
      selectedColor = event.target.firstChild.style.backgroundColor;
    } else {
      // If clicked directly on the inner Color div (edge case)
      selectedColor = event.target.style.backgroundColor;
    }
  
    // Correctly update the clickCount after updating the selected color
    setTempSelectedColors((prevSelectedColors) => {
      const newColors = [...prevSelectedColors];
      newColors[clickCount] = selectedColor; // Update the current slot
  
      setTotalUserAttempts((prevAttempts) => {
        const newAttempts = [...prevAttempts];
        newAttempts[attemptCount] = {
          ...prevAttempts[attemptCount],
          value: newColors,
          result: tempResult
        };
        return newAttempts;
      });
  
      return newColors;
    });
  
    // Increment the click count after updating the color
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


    //for each

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

    if(redCount === 4){
      alert("You Win!");
      return;
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
    setTempResult(["#ddd", "#ddd", "#ddd", "#ddd"]);
  }
  
  
  return (
    <div className="app" style={{ maxHeight: "100vh" }}>
      {/* <Slot colors={correctValues} colorCount={4}/> */}
      <Board totalUserAttempts={totalUserAttempts} />
      <UserInput checkUserAttempt={checkUserAttempt} colorSelectHandler={colorSelectHandler} colorArray={colorArray}/>
    </div>
  )
}
