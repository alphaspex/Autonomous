import React from 'react';

export default function Controls({ rawInput, setRawInput, onConfirm, onClear, isLoading }) {
  return (
    <div className="controls-container" style={{ flexDirection: 'column', alignItems: 'stretch' }}>
      <textarea 
        value={rawInput}
        onChange={(e) => setRawInput(e.target.value)}
        placeholder="Paste AI output here: [ draw (x, y, thickness) // t1, t2, ... ]"
        rows={4}
        style={{ fontFamily: 'monospace', padding: '0.5rem', width: '100%', resize: 'vertical' }}
      />
      <div style={{ display: 'flex', gap: '1rem', marginTop: '0.5rem' }}>
        <button onClick={onConfirm} disabled={isLoading}>
          {isLoading ? 'Processing...' : 'Confirm & Draw'}
        </button>
        <button onClick={onClear} disabled={isLoading}>
          Reset Canvas
        </button>
      </div>
    </div>
  );
}
