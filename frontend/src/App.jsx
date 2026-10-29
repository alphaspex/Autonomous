import React, { useState } from 'react';
import Controls from './components/Controls';
import Whiteboard from './components/Whiteboard';
import { generateSketch } from './utils/api';

function App() {
  const [rawInput, setRawInput] = useState('');
  const [sketchData, setSketchData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [shouldClear, setShouldClear] = useState(false);

  const handleConfirm = async () => {
    if (!rawInput.trim()) return;
    
    setIsLoading(true);
    setShouldClear(false);
    
    // Send text to Python!
    const data = await generateSketch(rawInput);
    
    if (data) {
      setSketchData(data);
    } else {
      try {
        alert("Python could not parse the text. Make sure the syntax is exactly: [ draw (x, y, thickness) // tick1, tick2... ]");
      } catch {
        console.error("Python could not parse the text. Make sure the syntax is exactly: [ draw (x, y, thickness) // tick1, tick2... ]");
      }
    }
    
    setIsLoading(false);
  };

  const handleClear = () => {
    setShouldClear(true);
    setSketchData(null);
    setRawInput(''); 
  };

  return (
    <>
      <Controls 
        rawInput={rawInput}
        setRawInput={setRawInput}
        onConfirm={handleConfirm} 
        onClear={handleClear}
        isLoading={isLoading}
      />
      <Whiteboard 
        sketchData={sketchData} 
        shouldClear={shouldClear}
        onClearComplete={() => setShouldClear(false)}
      />
    </>
  );
}

export default App;
