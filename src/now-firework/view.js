import { createRef } from '@seismic/snabbdom-renderer';
import setupCanvas from './setupCanvas';


const height = "100vh";
const width = "100vw";

export default (state, { dispatch }) => {

	const canvasRef = createRef();
	const canvas = canvasRef.current;
	
	console.log("canvasRef")
	console.log(canvasRef);
	console.log("IN VIEW")
	console.log("canvas")
	console.log(canvas);

	function initCanvas() {
		console.log("INIT CANVAS - start")
		//console.log("canvas")
		//console.log(canvas);
		setupCanvas({ canvas: canvasRef.current });
		console.log("INIT CANVAS - END")
	}


	return (
		<div className="root"
			style={{ height: '100%', width: '100%' }}>
			<div>Firework will launch here</div>

			<canvas id="myCanvas"
				ref={canvasRef}
				hook-insert={initCanvas}
				height = { height }
				width = { width }
				style={{ 'border-style': 'solid', 'border-width': '2px', 'border-color': 'blue' }}>
			</canvas>
		</div >)
};