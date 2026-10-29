/**
 * Pure Mathematical Translator: Clock Ticks -> 2D Coordinates
 */
export function decodeSessionToSegments(session, scalePxPerCm = 40) {
  const { start, thickness_mm, ticks } = session;
  const stepSizeCm = 0.2; // 2mm
  
  // Starting position in Pixels
  let currentX = start.x * scalePxPerCm;
  let currentY = start.y * scalePxPerCm;
  let currentHeadingDeg = 0.0; // 0 = UP (+Y in cartesian, -Y on screen)
  
  const segments = [];
  
  for (const tick of ticks) {
    // 1 tick = 6 degrees
    currentHeadingDeg += (tick * 6.0);
    
    const rad = currentHeadingDeg * (Math.PI / 180.0);
    
    // Calculate delta (Screen coords: +Y is DOWN, so we subtract sin for UP)
    const dx = (stepSizeCm * scalePxPerCm) * Math.sin(rad);
    const dy = (stepSizeCm * scalePxPerCm) * Math.cos(rad);
    
    const nextX = currentX + dx;
    const nextY = currentY - dy; // Invert Y for HTML Canvas
    
    segments.push({
      x1: currentX,
      y1: currentY,
      x2: nextX,
      y2: nextY,
      thickness: thickness_mm * (scalePxPerCm / 10.0) // Scale thickness roughly
    });
    
    currentX = nextX;
    currentY = nextY;
  }
  
  return segments;
}
