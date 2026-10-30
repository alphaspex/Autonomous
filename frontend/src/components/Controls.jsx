import React from 'react';

export default function Controls({ rawInput, setRawInput, onConfirm, onLoadSample, onClear, isLoading, errorMessage }) {
  return (
    <div className="controls-container" style={{ flexDirection: 'column', alignItems: 'stretch' }}>
      <textarea 
        value={rawInput}
        onChange={(e) => setRawInput(e.target.value)}
        placeholder="Enter stroke commands: [ draw (thickness_mm) // (x1, y1), (x2, y2), ... ]"
        rows={4}
        style={{ fontFamily: 'monospace', padding: '0.5rem', width: '100%', resize: 'vertical', boxSizing: 'border-box' }}
      />
      {errorMessage && (
        <div style={{ color: '#d32f2f', fontSize: '0.875rem', marginTop: '0.25rem' }}>
          {errorMessage}
        </div>
      )}
      <div style={{ display: 'flex', gap: '0.75rem', marginTop: '0.5rem', flexWrap: 'wrap' }}>
        <button onClick={onConfirm} disabled={isLoading}>
          {isLoading ? 'Processing...' : 'Confirm & Draw'}
        </button>
        {onLoadSample && (
          <button type="button" onClick={onLoadSample} disabled={isLoading}>
            Load Sample
          </button>
        )}
        <button type="button" onClick={onClear} disabled={isLoading}>
          Reset Canvas
        </button>
      </div>
    </div>
  );
}
