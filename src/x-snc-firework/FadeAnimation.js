import CanvasAnimation from './CanvasAnimation';
import {COLOR} from './Colors';

export default class FadeAnimation extends CanvasAnimation {
    constructor(mcanvas, start_time, end_time) {
        super(mcanvas, "FadeAnimation", start_time, end_time)
        
    }
  /**
   *  Fade
   *  toBlack
   */
   fade(mcanvas, mode) {
    let canvas = mcanvas.getCanvas()
    let width = mcanvas.getWidth();
    let height = mcanvas.getHeight();


    if (this.iterations > 255) return;
    let toBlack = mode === "toBlack";
    let imgData = this.context.getImageData(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < imgData.data.length; i += 4) {
      let r = imgData.data[i];
      let g = imgData.data[i + 1];
      let b = imgData.data[i + 2];

      if (toBlack) {
        if (r > 0) r = r - 1;
        if (g > 0) g = g - 1;
        if (b > 0) b = b - 1;
      } else {
        if (r < 255) r = r + 2; 
        if (g < 255) g = g + 2;
        if (b < 255) b = b + 2;
      }
      imgData.data[i] = r;
      imgData.data[i + 1] = g;
      imgData.data[i + 2] = b;
    }
    this.context.putImageData(imgData, 0, 0);
    this.iterations++;
  }
  render(mcanvas) {
    this.iterations = 0;
    //this.fade(mcanvas, "toBlack");
    this.fade(mcanvas, "toWhite");
  }
}