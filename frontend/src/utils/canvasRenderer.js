/**
 * Isolated Canvas Drawing Driver
 */
export function drawSegments(ctx, segments) {
  if (!segments || segments.length === 0) return;
  
  ctx.beginPath();
  
  // Move to start of first segment
  ctx.moveTo(segments[0].x1, segments[0].y1);
  
  for (const seg of segments) {
    ctx.lineTo(seg.x2, seg.y2);
  }
  
  // Assume uniform thickness for the session
  ctx.lineWidth = segments[0].thickness;
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';
  ctx.strokeStyle = '#333';
  ctx.stroke();
}

export function clearCanvas(ctx, canvasWidth, canvasHeight) {
  ctx.clearRect(0, 0, canvasWidth, canvasHeight);
}
