import { createRef } from '@seismic/snabbdom-renderer';
import mCanvas from './mCanvas';
import Particle from './Particle';




const height = "100vh";
const width = "100vw";

export default (state, { dispatch }) => {

	const canvasRef = createRef();
	const canvas = canvasRef.current;

	let mcanvas;
	let frameCount = 0;
	let animationFrameId = 0;


	const gravity = 0.03
	const friction = 0.99

	function render() {
		frameCount++
		mcanvas.draw(frameCount)

		let center = mcanvas.getCenter();
		//console.log(center);
		const context = mcanvas.getContext();
		const particleCount = 500
		const power = 12
		let radians = (Math.PI * 2) / particleCount;

		let i = 1;
		
		let particle = new Particle(
			center.x,
			center.y,
			3,
			`hsl(${Math.random() * 360}, 50%, 50%)`,
			{
				x: Math.cos(radians * i) * (Math.random() * power),
				y: Math.sin(radians * i) * (Math.random() * power)
			}
		);
		particle.update(gravity, friction);
		particle.draw(context);

		animationFrameId = window.requestAnimationFrame(render)
	}


	function initCanvas() {
		mcanvas = mCanvas({ canvas: canvasRef.current });
		render()
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