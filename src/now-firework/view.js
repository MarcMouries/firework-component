import { createRef } from '@seismic/snabbdom-renderer';
import mCanvas from './mCanvas';
import Particle from './Particle';

export default (state, { dispatch }) => {

	const canvasRef = createRef();
	let mcanvas;
	let frameCount = 0;
	let animationFrameId = 0;

	let context;
	let canvas;

	const mouse = { x: 0, y: 0 }

	// @todo make them Vector
	const gravity = 0.03
	const friction = 0.99

	let particles = [];
	const power = 12;
	const particleCount = 12
	// spread particle around the circle
	let angle_increment = (Math.PI * 2) / particleCount;

	/* To control the animation */
	let start = 0;
	let previousTimeStamp;
	let fps;


	function initCanvas() {
		mcanvas = mCanvas({ canvas: canvasRef.current });
		context = mcanvas.getContext();
		canvas = mcanvas.getCanvas();

		canvas.addEventListener('click', (event) => {
			const canvasBound = mcanvas.getCanvas().getBoundingClientRect();
			mouse.x = event.clientX - canvasBound.left;
			mouse.y = event.clientY - canvasBound.top;
			createParticles(mouse)

		})
		renderingLoop()
	}

	function createParticles(mouse) {
		let radius = 5;
		let color = `hsl(${Math.random() * 360}, 50%, 50%)`;

		for (let i = 0; i < particleCount; i++) {
			let angle = (angle_increment * i) * (Math.random() * power);
			let velocity = { x: Math.cos(angle_increment*i), y: Math.sin(angle_increment*i)	};//
			let particle = new Particle(mouse.x, mouse.y, radius, color, velocity);
			particles.push(particle)
		}
	}

	function renderingLoop(timestamp) {
		animationFrameId = window.requestAnimationFrame(renderingLoop)

		//console.log("timestamp: " + timestamp)

		// Calculate how much time has passed
		const elapsed = timestamp - start;
		start = timestamp;
		//frameCount++;


		// Clear the entire canvas
		context.fillStyle = 'rgba(0,0,0, 0.05)'; // alpha value provides trailing effect
		context.fillRect(0, 0, canvas.width, canvas.height);

		// Perform the drawing operation
		draw();


		// Draw number to the screen
		context.fillStyle = 'white';
		context.fillRect(0, 0, 200, 100);
		context.font = '25px Arial';
		context.fillStyle = 'black';
		context.fillText("FPS: " + fps, 10, 30);

		if (elapsed < 2000) { // Stop the animation after 2 seconds
		}
	}

	function draw() {
		//	mcanvas.draw(frameCount)
		particles.forEach((particle) => {
			particle.draw(context)
			particle.update(gravity, friction);
		})

	}



	function cancelAnimationFrame() {
		window.cancelAnimationFrame(animationFrameId)
	}

	return (
		<div className="root"
			style={{ height: '100%', width: '100%' }}>
			<div>Firework will launch here</div>

			<canvas id="myCanvas"
				ref={canvasRef}
				hook-insert={initCanvas}
				hook-destroy={cancelAnimationFrame}

				style={{ 'border-style': 'solid', 'border-width': '2px', 'border-color': 'blue' }}>
			</canvas>
		</div >)
};