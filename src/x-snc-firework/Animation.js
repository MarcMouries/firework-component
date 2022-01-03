export default class Animation {
    constructor(name, duration, mcanvas) {
		this.name = name;
        this.mcanvas = mcanvas;
		this.duration = duration;
        this.startTime = performance.now();
        console.log(mcanvas);
    }

    start() {
        requestAnimationFrame(this.tick.bind(this));
    }

    tick () {
            var now = performance.now();
            var elapsed = now - this.startTime;
            if (elapsed > this.duration ) {
                console.log("animation ends")
            //  this.dispatchEvent("ended");
              return;
            }
             //...
             console.log("elapsed : " + elapsed)
            this.render();
            requestAnimationFrame(this.tick.bind(this));
         }

    render () {
        console.log(this.name + " needs to be implemented")
    }
}