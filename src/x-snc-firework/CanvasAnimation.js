/** 
 * Base class for rendering a canvas animation 
 */
export default class CanvasAnimation {
    constructor(mcanvas, name, start_time, end_time) {
        this.name = name;
        this.mcanvas = mcanvas;
        this.context = this.mcanvas.getContext();
        this.start_time = start_time;
        this.end_time = end_time;
    }
    render(mcanvas) {
        console.error(this.name + " needs to be implemented")
    }
    toString() {
		return "[" + this.name + ", " + this.start_time + " - " + this.end_time + "]";
	}
}