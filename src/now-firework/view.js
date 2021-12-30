import { createRef } from '@seismic/snabbdom-renderer';
import mCanvas from './mCanvas';


const height = "100vh";
const width = "100vw";

export default (state, { dispatch }) => {

	const canvasRef = createRef();
	const canvas = canvasRef.current;

	let mcanvas;
	let frameCount = 0;
	let animationFrameId = 0;


	function render() {
		frameCount++
		mcanvas.draw(frameCount)
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
				height={height}
				width={width}
				style={{ 'border-style': 'solid', 'border-width': '2px', 'border-color': 'blue' }}>
			</canvas>
		</div >)
};