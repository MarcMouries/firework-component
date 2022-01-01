/**
 * Initialize the canvas
 */
export default function mCanvas({ canvas }) {

  // Get the device pixel ratio, falling back to 1.
  const dpr = window.devicePixelRatio || 1;

  // set the dimensions temporarily to 100% to get the full size dimentions 
  //canvas.style.width = "100%"; 
  //canvas.style.height = "100%";

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  // Get the size of the canvas in CSS pixels.
  let canvasRect = canvas.getBoundingClientRect();

  // Give the canvas pixel dimensions of their CSS
  // size * the device pixel ratio.
  canvas.width = canvasRect.width * dpr;
  canvas.height = canvasRect.height * dpr;

  canvas.style.width = canvasRect.width + 'px';
  canvas.style.height = canvasRect.height + 'px';

  const ctx = canvas.getContext('2d')

  // Scale all drawing operations by the dpr, so we don't have to worry about the difference.
 // ctx.scale(dpr, dpr);

  const mouse = { x: 0, y: 0 }


  canvas.addEventListener('mousemove', (event) => {
    mouse.x = event.clientX
    mouse.y = event.clientY
    console.log("INSIDE mCANVAS")
    mcanvas.drawCircle(mouse.x, mouse.y, radius, 3, "red");
    console.log(event)
  })

  console.log('addEventListener');
  console.log(canvas)


  function draw(frameCount) {
    ctx.fillStyle = '#333';
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    ctx.fillStyle = '#fff';
    ctx.beginPath()
    let start_angle = 0;
    let end_angle = 2 * Math.PI;
    let radius = 20 * Math.sin(frameCount * 0.05) ** 2;
    let center = getCenter();
    ctx.arc(center.x, center.y, radius, start_angle, end_angle);
    ctx.fill();
  }


	const drawCircle = (x, y, radius, lineWidth, color) => {
		ctx.beginPath();
		ctx.arc(x, y, radius, 0, 2 * Math.PI, true);
		ctx.fillStyle = color;
		ctx.fill();

		// draw the stroke
		ctx.lineWidth = lineWidth;
		//ctx.strokeStyle = color_Acapulco;
		ctx.strokeStyle = color;
		ctx.stroke();
	};


  function getHeight() {
    return canvas.height / dpr;
  };


  function getWidth() {
    return canvas.width / dpr;
  };

  function getContext() {
    return ctx;
  }

  function getCanvas() {
    return canvas;
  }

  function getCenter() {
    var cx = getWidth() / 2;
    var cy = getHeight() / 2;
    return {
      x: cx,
      y: cy,
    };
  };

  return {
    draw,
    drawCircle,
    getCenter,
    getCanvas,
    getContext
  };
}