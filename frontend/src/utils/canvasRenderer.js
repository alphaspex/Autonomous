/**
 * Renders absolute (X, Y) coordinate points onto the HTML5 Canvas
 */
export function renderSketch(canvas, sketchData) {
  if (!canvas || !sketchData || !sketchData.sessions) return;
  
  const ctx = canvas.getContext('2d');
  const CM_TO_PX = 40; // 1 cm = 40 pixels on screen

  sketchData.sessions.forEach(session => {
    if (!session.points || session.points.length === 0) return;

    ctx.beginPath();
    ctx.lineWidth = session.thickness_mm * 2; // Convert mm thickness to px
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.strokeStyle = '#222222';

    // Move to the first point
    const startPt = session.points[0];
    ctx.moveTo(startPt.x * CM_TO_PX, startPt.y * CM_TO_PX);

    // Connect sequential points in order
    for (let i = 1; i < session.points.length; i++) {
      const pt = session.points[i];
      ctx.lineTo(pt.x * CM_TO_PX, pt.y * CM_TO_PX);
    }

    ctx.stroke();
  });
}
