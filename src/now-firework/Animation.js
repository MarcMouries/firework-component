export default class Animation {
    constructor(duration) {
		this.duration = duration;
        this.startTime = performance.now();
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
        console.log("needs to be implemented")
    }
}