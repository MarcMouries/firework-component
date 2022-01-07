
export default class AnimationSequence {
    constructor(canvas, animation_list) {
      this.canvas = canvas;
      this.context = this.canvas.getContext("2d");
      this.animation_list = animation_list;
    }
  
    start() {
      this.startTime = performance.now();
      this.previousTime = performance.now();
      this.elapsedSinceLast;
      this.render();
      this.running = true;
  
      console.log("Starting sequence with ");
      console.log(this.animation_list);
    }
  
    async render() {
      do {
        this.tick(); // start the animation
        await this.waitUntilNextFrame(); // wait until next repaint
      } while (this.running); // keep going until asked to stop
    }
  
    tick() {
      let now = performance.now();
      this.elapsedSinceLast = now - this.previousTime;
      let elapsed = ~~(now - this.startTime);
  
      this.animation_list.forEach(function (anim) {
        if (anim.start_time < elapsed   && anim.end_time > elapsed ) {
  //      if (elapsed > anim.start_time && elapsed < anim.end_time) {
          anim.render();
        } 
      });
    }
  
    waitUntilNextFrame() {
      return new Promise(requestAnimationFrame);
    }
  
    stop() {
      this.running = false;
    }
  }