import React from 'react';

export default function Controls({ onFetchSketch, onClear, isLoading }) {
  return (
    <div className="controls-container">
      <button onClick={onFetchSketch} disabled={isLoading}>
        {isLoading ? 'Loading...' : 'Draw Sample Sketch'}
      </button>
      <button onClick={onClear} disabled={isLoading}>
        Clear Canvas
      </button>
    </div>
  );
}
