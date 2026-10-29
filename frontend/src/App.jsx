import React, { useState } from 'react';
import Controls from './components/Controls';
import Whiteboard from './components/Whiteboard';
import { fetchSampleSketch } from './utils/api';

function App() {
  const [sketchData, setSketchData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [shouldClear, setShouldClear] = useState(false);

  const handleFetchSketch = async () => {
    setIsLoading(true);
    setShouldClear(false);
    const data = await fetchSampleSketch();
    if (data) {
      setSketchData(data);
    }
    setIsLoading(false);
  };

  const handleClear = () => {
    setShouldClear(true);
    setSketchData(null);
  };

  return (
    <>
      <Controls 
        onFetchSketch={handleFetchSketch} 
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
