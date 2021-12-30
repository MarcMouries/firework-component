/**
 * Initialize the canvas
 */
export default function mCanvas({ canvas }) {
  // Get the device pixel ratio, falling back to 1.
  var dpr = window.devicePixelRatio || 1;
  // Get the size of the canvas in CSS pixels.
  var canvasRect = canvas.getBoundingClientRect();

  // Give the canvas pixel dimensions of their CSS
  // size * the device pixel ratio.
  canvas.width = canvasRect.width * dpr;
  canvas.height = canvasRect.height * dpr;

  const ctx = canvas.getContext('2d')

  // Scale all drawing operations by the dpr, so you 
  // don't have to worry about the difference.
  ctx.scale(dpr, dpr);

  let center = { x: canvas.width / 2, y: canvas.height / 2 };


  const draw = (frameCount) => {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
    ctx.fillStyle = '#000000'
    ctx.beginPath()
    let start_angle = 0;
    let end_angle = 2 * Math.PI;
    let radius = 20 * Math.sin(frameCount * 0.05) ** 2;
    ctx.arc(center.x, center.y, radius, start_angle, end_angle);
    ctx.fill()
  }

  return {
    draw
  };
}