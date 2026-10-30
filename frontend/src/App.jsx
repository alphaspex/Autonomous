import React, { useState } from 'react';
import Controls from './components/Controls';
import Whiteboard from './components/Whiteboard';
import { generateSketch, fetchSampleSketch } from './utils/api';

function App() {
  const [rawInput, setRawInput] = useState('');
  const [sketchData, setSketchData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [shouldClear, setShouldClear] = useState(false);

  const handleConfirm = async () => {
    if (!rawInput.trim()) return;
    
    setIsLoading(true);
    setErrorMessage('');
    setShouldClear(false);
    
    const data = await generateSketch(rawInput);
    
    if (data && data.sessions && data.sessions.length > 0) {
      setSketchData(data);
    } else {
      setErrorMessage("Could not parse drawing text. Expected format: [ draw (thickness) // (x1, y1), (x2, y2), ... ]");
    }
    
    setIsLoading(false);
  };

  const handleLoadSample = async () => {
    setIsLoading(true);
    setErrorMessage('');
    const sample = await fetchSampleSketch();
    if (sample) {
      setSketchData(sample);
      setRawInput('[ draw (1.5) // (2.0, 2.0), (6.0, 2.0), (6.0, 6.0), (2.0, 6.0), (2.0, 2.0) ]');
    } else {
      setErrorMessage("Failed to load sample from server.");
    }
    setIsLoading(false);
  };

  const handleClear = () => {
    setShouldClear(true);
    setSketchData(null);
    setRawInput(''); 
    setErrorMessage('');
  };

  return (
    <>
      <Controls 
        rawInput={rawInput}
        setRawInput={setRawInput}
        onConfirm={handleConfirm} 
        onLoadSample={handleLoadSample}
        onClear={handleClear}
        isLoading={isLoading}
        errorMessage={errorMessage}
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
