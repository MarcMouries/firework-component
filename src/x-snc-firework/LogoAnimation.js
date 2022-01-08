import CanvasAnimation from './CanvasAnimation';

export default class LogoAnimation extends CanvasAnimation {
    constructor(duration, mcanvas) {
        super("LogoAnimation", duration, mcanvas)
        
    }
    render () {
        console.log("LogoAnimation to be implemented")
    }
}