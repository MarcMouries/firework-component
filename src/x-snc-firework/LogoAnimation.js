import CanvasAnimation from './CanvasAnimation';
import {COLOR} from './Colors';

export default class LogoAnimation extends CanvasAnimation {
    constructor(mcanvas, start_time, end_time, radius, position, wordList, clearFirst) {
        super(mcanvas, "LogoAnimation", start_time, end_time)
        this.radius = radius;
		this.pos = position;
		this.wordList = wordList;
		this.clearFirst = clearFirst || false;
    }
    render(mcanvas) {
		var margin = 20;
		let radius = this.radius;
		var diam = (2 * radius) ;
		diam += margin;

		if (this.clearFirst) {
			        // Clear the entire canvas
		this.context.fillStyle = 'white'; // alpha value provides trailing effect
		this.context.fillRect(0, 0, mcanvas.getWidth(), mcanvas.getHeight());
		}

		mcanvas.drawCircle( this.pos.x, this.pos.y, radius, 2, COLOR["Dark Green"]);   // CENTER

        mcanvas.drawCircle( this.pos.x, this.pos.y - diam,  radius, 2, "#80B6A1"); // NORTH

		mcanvas.drawCircle( this.pos.x, this.pos.y + diam, radius, 2, COLOR["Light Green"]);  // SOUTH
		mcanvas.drawCircle( this.pos.x - diam, this.pos.y, radius, 2, COLOR["Light Green"]); // EAST
		mcanvas.drawCircle( this.pos.x + diam, this.pos.y, radius, 2, COLOR["Light Green"]);  // WEST
		
		if (this.wordList) {
			mcanvas.drawText(this.pos.x, this.pos.y - diam, this.wordList[0]);
			mcanvas.drawText(this.pos.x - diam, this.pos.y, this.wordList[1]);
			mcanvas.drawText(this.pos.x + diam, this.pos.y, this.wordList[2]);
			mcanvas.drawText(this.pos.x, this.pos.y + diam, this.wordList[3]);
		}


		mcanvas.drawText(this.pos.x, this.pos.y + ( 1.7*diam), "Creator");
		mcanvas.drawText(this.pos.x, this.pos.y + ( 1.7*diam) + 50, "Workflows");    }
}