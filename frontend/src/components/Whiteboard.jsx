import React, { useRef, useEffect, useCallback } from 'react';
import { renderSketch } from '../utils/canvasRenderer';

export default function Whiteboard({ sketchData, shouldClear, onClearComplete }) {
  const canvasRef = useRef(null);

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas || !canvas.parentElement) return;
    const ctx = canvas.getContext('2d');
    const rect = canvas.parentElement.getBoundingClientRect();

    canvas.width = rect.width;
    canvas.height = rect.height;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (shouldClear) {
      if (onClearComplete) onClearComplete();
      return;
    }

    if (sketchData && sketchData.sessions) {
      renderSketch(canvas, sketchData);
    }
  }, [sketchData, shouldClear, onClearComplete]);

  useEffect(() => {
    draw();
    window.addEventListener('resize', draw);
    return () => window.removeEventListener('resize', draw);
  }, [draw]);

  return (
    <div className="whiteboard-container">
      <canvas ref={canvasRef} />
    </div>
  );
}
