import Animation from './Animation';

export default class LogoAnimation extends Animation {
    constructor(duration, mcanvas) {
        super("LogoAnimation", duration, mcanvas)
        
    }
    render () {
        console.log("LogoAnimation to be implemented")
    }
}