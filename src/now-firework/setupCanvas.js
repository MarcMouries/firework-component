/**
 * Initialize the canvas
 */
export default function setupCanvas({ canvas }) {
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
    ctx.arc(center.x, center.y, 20 * Math.sin(frameCount * 0.05) ** 2, 0, 2 * Math.PI)
    ctx.fill()
  }

  return {
    draw
  };
}