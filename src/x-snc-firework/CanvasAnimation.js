export default class CanvasAnimation {
    constructor(name, duration, mcanvas) {
		this.name = name;
        this.mcanvas = mcanvas;
		this.duration = duration;
        this.startTime = performance.now();
    }

    start() {
        this.animationFrameId = requestAnimationFrame(this.tick.bind(this));

    }
    stop() {
        cancelAnimationFrame(this.animationFrameId)
    }

    tick () {
            var now = performance.now();
            var elapsed = now - this.startTime;
            if (elapsed > this.duration ) {
                console.log("animation ends")
              return;
            }
             //...
             console.log("Animation: elapsed : " + elapsed)
            this.render();
            requestAnimationFrame(this.tick.bind(this));
         }

    render () {
        console.log(this.name + " needs to be implemented")
    }
}