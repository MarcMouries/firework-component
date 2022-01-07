import { createRef } from '@seismic/snabbdom-renderer';
import mCanvas from './mCanvas';
import Particle from './Particle';
import Firework from './Firework';
import LogoAnimation from './LogoAnimation';
import {COLOR} from './Colors';
import AnimationSequence from './AnimationSequence';




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
	const SPEED = 12;
	const PARTICLE_COUNT = 400;
	const PARTICLE_RADIUS = 3;

	// spread particle around the circle
	let ANGLE_PARTICLE = (Math.PI * 2) / PARTICLE_COUNT;

	/* To control the animation */
	
	let startTime = Date.now();
	let elapsedSinceLastFrame;
	let elapsedSinceStart;
	let previousTimeStamp = +new Date;
	let fps;

	let animation_list = [];



	function pause_setTimeout(duration_MS) {
		return new Promise((resolve) => {
		  setTimeout(resolve, duration_MS);
		});
	  }



	  async function  fadeToWhite() {
		//context
		
	  }

	async function draw_Logo() {

		let center = mcanvas.getCenter();
		var radius = 80;
		var margin = 20;
		var diam = (2 * radius) ;
		diam += margin;

		console.log("colors");
		//console.log(COLOR.red);
		console.log(COLOR.red);
		console.log(COLOR["Light Green"]);
	//	mcanvas.drawCircle( center.x, center.y, radius, 2, COLOR.red);   // CENTER
	//	mcanvas.drawCircle( center.x, center.y, radius, 2, COLOR["Dark Green"]);   // CENTER

		await pause_setTimeout(1000);

		//   "Light Green": "#80B6A1",


        mcanvas.drawCircle( center.x, center.y - diam,  radius, 2, "#80B6A1"); // NORTH
//        mcanvas.drawCircle( center.x, center.y - diam,  radius, 2, COLOR["Light Green"]); // NORTH

		await pause_setTimeout(1000);

		mcanvas.drawCircle( center.x, center.y + diam, radius, 2, COLOR["Light Green"]);  // SOUTH
		mcanvas.drawCircle( center.x - diam, center.y, radius, 2, COLOR["Light Green"]); // EAST
		mcanvas.drawCircle( center.x + diam, center.y, radius, 2, COLOR["Light Green"]);  // WEST

		
		mcanvas.drawText(center.x, center.y - diam, "Happy");
		mcanvas.drawText(center.x - diam, center.y, "New");
		mcanvas.drawText(center.x + diam, center.y, "Year");
		mcanvas.drawText(center.x, center.y + diam, "2022");



		mcanvas.drawText(center.x, center.y + ( 1.7*diam), "Creator");
		mcanvas.drawText(center.x, center.y + ( 1.7*diam) + 50, "Workflows");
	}


	function initCanvas() {
		mcanvas = mCanvas({ canvas: canvasRef.current });
		context = mcanvas.getContext();
		canvas = mcanvas.getCanvas();

		let as = new AnimationSequence(canvas, animation_list);


		var myLogoAnim= new LogoAnimation(1000, mcanvas);
		myLogoAnim.start();


		var myAnim= new Firework(1000, mcanvas);
		myAnim.start();

		


		canvas.addEventListener('click', (event) => {
			const canvasBound = mcanvas.getCanvas().getBoundingClientRect();
			mouse.x = event.clientX - canvasBound.left;
			mouse.y = event.clientY - canvasBound.top;
			createParticles(mouse)

		})

		renderingLoop()
		//await pause_setTimeout(2000);

		draw_Logo();

	}

	function createParticles(mouse) {

		for (let i = 0; i < PARTICLE_COUNT; i++) {
			let color = `hsl(${Math.random() * 360}, 50%, 50%)`;
			// spread particles evenly around the circle
			let angle = (ANGLE_PARTICLE * i) 
			//let velocity = { x: Math.cos(angle ), y: Math.sin(angle ) };
			let velocity = {
				x: Math.cos( ANGLE_PARTICLE * i)  * (Math.random() * SPEED),  
				y: Math.sin( ANGLE_PARTICLE * i)  * (Math.random() * SPEED)
			  }

			let particle = new Particle(mouse.x, mouse.y, PARTICLE_RADIUS, color, velocity);
			particles.push(particle)
		}
	}

	function renderingLoop(timestamp) {
		animationFrameId = window.requestAnimationFrame(renderingLoop)
		
		//console.log("timestamp: " + timestamp)

		// Calculate how much time has passed
		// 60 fps translates to 16.7ms per frame
        elapsedSinceLastFrame = (timestamp - previousTimeStamp);
		fps = 1000/elapsedSinceLastFrame;
        previousTimeStamp = timestamp;
	

		//frameCount++;

		// Clear the entire canvas
		context.fillStyle = 'rgba(0,0,0, 0.05)'; // alpha value provides trailing effect
	//	context.fillRect(0, 0, canvas.width, canvas.height);

		// Perform the drawing operation
		draw();

		elapsedSinceStart = (timestamp - startTime);

		drawFPS();

		if (elapsedSinceStart < 2000) { // Stop the animation after 2 seconds
		}
	}

	function drawFPS() {
		// Draw number to the screen
		context.fillStyle = 'white';
		context.fillRect(0, 0, 200, 100);
		context.font = '16px Arial';
		context.fillStyle = 'black';
		context.fillText("Frame/s: " + fps, 10, 30);
		//context.fillText("Elapsed: " + elapsedSinceLastFrame, 10, 50);
		context.fillText("Elapsed: " + elapsedSinceStart, 10, 70);
	}

	function draw() {
		//	mcanvas.draw(frameCount)
		particles.forEach((particle, index) => {
			// as opacity is continuously decreased when it's below zero it's reset 
			if (particle.opacity > 0) {
				particle.draw(context)
				particle.update(gravity, friction);
			}
			else {
				particles.splice(index, 1)
			}
		})
	}

	function cancelAnimationFrame() {
		window.cancelAnimationFrame(animationFrameId)
	}

	return (
		<div className="root"
			style={{ height: '100%', width: '100%' }}>
			<canvas id="myCanvas"
				ref={canvasRef}
				hook-insert={initCanvas}
				hook-destroy={cancelAnimationFrame}
				style={{ 'border-style': 'solid', 'border-width': '0px', 'border-color': 'blue' }}>
			</canvas>
		</div >)
};