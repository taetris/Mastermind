import React from 'react'
import './App.css'
import UserInput from './components/pages/userinput'
import Board from './components/pages/board'
import Confetti from 'react-confetti';
import Slot from './components/molecules/slot'
export default function App() {

  const selectedColor = "#5c5a61"; // Default placeholder for unselected colors
  const defaultResultColor = "#959396"; // Default placeholder for results

  function getRandomValues(arr, count) {
    const copy = [...arr];
    const shuffled = copy.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  }

  const colorArray = ["orange", "pink", "blue", "indigo", "green", "red"];
  const [correctValues, setCorrectValues] = React.useState(() => getRandomValues(colorArray, 4));

  const [clickCount, setClickCount] = React.useState(0);
  const [attemptCount, setAttemptCount] = React.useState(0);

  const [tempSelectedColors, setTempSelectedColors] = React.useState([selectedColor, selectedColor, selectedColor, selectedColor]);
  const [tempResult, setTempResult] = React.useState([defaultResultColor, defaultResultColor, defaultResultColor, defaultResultColor]);
  const [totalUserAttempts, setTotalUserAttempts] = React.useState([]);

  const [isWinner, setIsWinner] = React.useState(false); // State to trigger confetti

  React.useEffect(() => {
    let initialAttempts = Array.from({ length: 10 }, (_, i) => ({
      id: i,
      value: [selectedColor, selectedColor, selectedColor, selectedColor],
      result: [defaultResultColor, defaultResultColor, defaultResultColor, defaultResultColor]
    }));
    setTotalUserAttempts(initialAttempts);
  }, []);

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
    if (clickCount > 0) {
      setClickCount(clickCount - 1);
      const newSelection = [...tempSelectedColors];
      newSelection[clickCount - 1] = selectedColor;

      setTempSelectedColors(newSelection);
      setTotalUserAttempts((prevAttempts) => {
        const newAttempts = [...prevAttempts];
        newAttempts[attemptCount].value = newSelection;
        return newAttempts;
      });
    }
  };

  function colorSelectHandler(event) {
    if (clickCount >= 4) return;

    const selectedColor = event.target.tagName === "BUTTON"
      ? event.target.firstChild.style.backgroundColor
      : event.target.style.backgroundColor;

    const newColors = [...tempSelectedColors];
    newColors[clickCount] = selectedColor;

    setTempSelectedColors(newColors);
    setTotalUserAttempts((prevAttempts) => {
      const newAttempts = [...prevAttempts];
      newAttempts[attemptCount].value = newColors;
      return newAttempts;
    });

    setClickCount(clickCount + 1);
  }

  function checkUserAttempt() {
    if (clickCount < 4) {
      alert("Please select all colors");
      return;
    }

    setClickCount(0);

    if (attemptCount === 10) {
      alert("Game Over");
      return;
    }

    const currentAttempt = tempSelectedColors;
    const tempCorrectValues = [...correctValues];

    let redCount = 0;
    let whiteCount = 0;

    currentAttempt.forEach((color, index) => {
      if (color === tempCorrectValues[index]) {
        redCount++;
        tempCorrectValues[index] = null;
      }
    });

    currentAttempt.forEach((color, index) => {
      if (color !== tempCorrectValues[index]) {
        const whiteIndex = tempCorrectValues.indexOf(color);
        if (whiteIndex !== -1) {
          whiteCount++;
          tempCorrectValues[whiteIndex] = null;
        }
      }
    });

    const resultArray = Array(4).fill(defaultResultColor);
    let i = 0;
    for (; i < redCount; i++) {
      resultArray[i] = "red";
    }
    for (; i < redCount + whiteCount; i++) {
      resultArray[i] = "white";
    }

    setTempResult(resultArray);
    setTotalUserAttempts((prevAttempts) => {
      const updatedAttempts = [...prevAttempts];
      updatedAttempts[attemptCount] = {
        id: attemptCount,
        value: currentAttempt,
        result: resultArray
      };
      return updatedAttempts;
    });

    if (redCount === 4) {
      setIsWinner(true); // Trigger confetti
      return;
    }

    setAttemptCount(attemptCount + 1);
    setTempSelectedColors([selectedColor, selectedColor, selectedColor, selectedColor]);
    setTempResult([defaultResultColor, defaultResultColor, defaultResultColor, defaultResultColor]);
  }

  return (
    <div className="app" style={{ maxHeight: "90vh", display: "flex", flexDirection: "column", alignItems: "center", gap: "20px"   }}>
      <h1> MASTER MIND </h1>
      {/* <Slot colors={correctValues} colorCount={4} />   */}
      {isWinner && <Confetti />} 
      <Board totalUserAttempts={totalUserAttempts} />
      <UserInput checkUserAttempt={checkUserAttempt} colorSelectHandler={colorSelectHandler} colorArray={colorArray} />
    </div>
  );
}
