
export default class AnimationSequence {
    constructor(mcanvas) {
      this.mcanvas = mcanvas;
      this.context = this.mcanvas.getContext();
      this.animation_list = [];
    }

    addAnimation( animation ) {
      this.animation_list.push(animation);
    }

    start() {
      this.startTime = performance.now();
      this.previousTime = performance.now();
      this.elapsedSinceLast;
      this.render();
      this.running = true;
  
      console.log("Starting sequence with ");
      console.log(this.animation_list);
      this.animation_list.forEach(function (anim) {
        console.log("" + anim);
      });

    }
  
    async render() {
      do {
        this.renderAll(this.mcanvas); // start the animation
        await this.waitUntilNextFrame(); // wait until next repaint
      } while (this.running); // keep going until asked to stop
    }
  
    renderAll(mcanvas) {
      let now = performance.now();
      this.elapsedSinceLast = now - this.previousTime;
      let elapsed = ~~(now - this.startTime);
  
      this.animation_list.forEach(function (anim) {
        if (anim.start_time < elapsed   && anim.end_time > elapsed ) {
  //      if (elapsed > anim.start_time && elapsed < anim.end_time) {
          anim.render(mcanvas);
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