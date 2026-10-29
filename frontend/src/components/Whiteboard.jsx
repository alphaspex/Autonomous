import React, { useRef, useEffect } from 'react';
import { drawSegments, clearCanvas } from '../utils/canvasRenderer';
import { decodeSessionToSegments } from '../utils/clockDecoder';

export default function Whiteboard({ sketchData, shouldClear, onClearComplete }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    // Handle Resize for crisp rendering
    const rect = canvas.parentElement.getBoundingClientRect();
    canvas.width = rect.width * window.devicePixelRatio;
    canvas.height = rect.height * window.devicePixelRatio;
    ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    canvas.style.width = `${rect.width}px`;
    canvas.style.height = `${rect.height}px`;

    if (shouldClear) {
      clearCanvas(ctx, canvas.width, canvas.height);
      onClearComplete();
      return;
    }

    if (sketchData && sketchData.sessions) {
      clearCanvas(ctx, canvas.width, canvas.height); // clear before draw
      
      sketchData.sessions.forEach(session => {
        const segments = decodeSessionToSegments(session, 40); // 40px per cm
        drawSegments(ctx, segments);
      });
    }
  }, [sketchData, shouldClear, onClearComplete]);

  return (
    <div className="whiteboard-container">
      <canvas ref={canvasRef} />
    </div>
  );
}
