import CanvasAnimation from './CanvasAnimation';
import { COLOR, COLOR_VALUES } from './Colors';

export default class TextAnimation extends CanvasAnimation {
	constructor(mcanvas, text, start_time, end_time, position, clearFirst, alignment, color) {
		super(mcanvas, "TextAnimation", start_time, end_time)
		this.text = text;
		this.pos = position;
		this.clearFirst = clearFirst || false;
		this.alignment = alignment;
		this.color = color;

	}
	render(mcanvas) {
		var radius = 80;
		var margin = 20;
		var diam = (2 * radius);
		diam += margin;

		if (this.clearFirst) {
			// Clear the entire canvas
			this.context.fillStyle = 'white'; // alpha value provides trailing effect
			this.context.fillRect(0, 0, mcanvas.getWidth(), mcanvas.getHeight());
		}
		// Clear the entire canvas
		//this.context.fillStyle = 'white'; // alpha value provides trailing effect
		//this.context.fillRect(0, 0, mcanvas.getWidth(), mcanvas.getHeight());

		this.mcanvas.drawText(this.pos.x, this.pos.y, this.text, this.alignment, this.color);
	}
}