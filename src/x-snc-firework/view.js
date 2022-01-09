import { createRef } from '@seismic/snabbdom-renderer';

import AnimationSequence from './AnimationSequence';
import mCanvas from './mCanvas';
import { COLOR, COLOR_VALUES } from './Colors';

import Firework from './Firework';
import LogoAnimation from './LogoAnimation';
import FadeAnimation from './FadeAnimation';
import TextAnimation from './TextAnimation';


export default (state, { dispatch }) => {

	const canvasRef = createRef();
	let mcanvas;
	let frameCount = 0;
	let animationFrameId = 0;

	let context;
	let canvas;

	const mouse = { x: 0, y: 0 }

	/* To control the animation */
	
	let startTime = Date.now();
	let elapsedSinceLastFrame;
	let elapsedSinceStart;
	let previousTimeStamp = +new Date;
	let fps;
    let color_index = 0;

	function pause_setTimeout(duration_MS) {
		return new Promise((resolve) => {
		  setTimeout(resolve, duration_MS);
		});
	  }

	  function getColor() {
		let color = COLOR_VALUES[color_index % COLOR_VALUES.length] ;
		color_index ++;
		return color;
	  }
	function initCanvas() {
		mcanvas = mCanvas({ canvas: canvasRef.current });
		context = mcanvas.getContext();
		canvas = mcanvas.getCanvas();

		canvas.addEventListener('click', (event) => {
			const canvasBound = mcanvas.getCanvas().getBoundingClientRect();
			mouse.x = event.clientX - canvasBound.left;
			mouse.y = event.clientY - canvasBound.top;
			firework.createParticles(mouse)

		})
		let sequence = new AnimationSequence(mcanvas);

		let firework = new Firework(mcanvas, 0, 9000);
		sequence.addAnimation(firework);

		let position = mcanvas.getCenter();
		let wordList = [ "Happy", "New", "Year", "2022"];
		let logoAnim= new LogoAnimation(mcanvas, 6000, 9000, 80, position, wordList);
		sequence.addAnimation(logoAnim);

		let fadeAnim= new FadeAnimation(mcanvas, 8000, 10000);
		sequence.addAnimation(fadeAnim);

		position = mcanvas.getCenter();
		let clearFirst = true;
		let outro_textAnim1= new TextAnimation(mcanvas, "In 2022, What will you ", 9000, 14000, position, clearFirst);
		let words_pos = mcanvas.getCenter();
		words_pos.x = words_pos.x + 220;
		clearFirst = false;
		let outro_textAnim2= new TextAnimation(mcanvas, " Automate ?", 9000, 10000, words_pos, clearFirst, "start", getColor());
		let outro_textAnim3= new TextAnimation(mcanvas, " Build ?", 10000, 11000, words_pos, clearFirst,  "start", getColor());
		let outro_textAnim4= new TextAnimation(mcanvas, " Create ?", 11000, 12000, words_pos, clearFirst,  "start", getColor());
		let outro_textAnim5= new TextAnimation(mcanvas, " Imagine ?", 12000, 13000, words_pos, clearFirst,  "start", getColor());
		let outro_textAnim6= new TextAnimation(mcanvas, " Transform ?", 13000, 14000, words_pos, clearFirst,  "start", getColor());
		sequence.addAnimation(outro_textAnim1);
		sequence.addAnimation(outro_textAnim2);
		sequence.addAnimation(outro_textAnim3);
		sequence.addAnimation(outro_textAnim4);
		sequence.addAnimation(outro_textAnim5);
		sequence.addAnimation(outro_textAnim6);
		position = mcanvas.getCenter();
		let logoAnim2= new LogoAnimation(mcanvas, 14000, 15000, 40, position, null, true);
		sequence.addAnimation(logoAnim2);

		sequence.start();
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