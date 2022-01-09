import Vector from './Vector'
import Particle from './Particle';

import CanvasAnimation from './CanvasAnimation';

export default class Firework extends CanvasAnimation {

    constructor(mcanvas, start_time, end_time) {
        super(mcanvas, "Firework", start_time, end_time)

        this.gravity = new Vector(0, 0.03);
        this.friction = 0.99;
        this.SPEED = 12;
        this.PARTICLE_COUNT = 400;
        this.PARTICLE_RADIUS = 3;
        // spread particle around the circle
        this.ANGLE_PARTICLE = (Math.PI * 2) / this.PARTICLE_COUNT;
        this.particles = [];

    }
    render(mcanvas) {
        // Clear the entire canvas
		this.context.fillStyle = 'rgba(0,0,0, 0.05)'; // alpha value provides trailing effect
		this.context.fillRect(0, 0, mcanvas.getWidth(), mcanvas.getHeight());

        // draw particles
        this.particles.forEach((particle, index) => {
            // as opacity is continuously decreased when it's below zero it's reset 
            if (particle.opacity > 0) {
                particle.draw(this.context)
                particle.update(this.gravity, this.friction);
            }
            else {
                this.particles.splice(index, 1)
            }
        })
    }

    createParticles(mouse) {

        for (let i = 0; i < this.PARTICLE_COUNT; i++) {
            let color = `hsl(${Math.random() * 360}, 50%, 50%)`;
            // spread particles evenly around the circle
            let angle = (this.ANGLE_PARTICLE * i)

            let velocity = new Vector(
                Math.cos(this.ANGLE_PARTICLE * i) * (Math.random() * this.SPEED),
                Math.sin(this.ANGLE_PARTICLE * i) * (Math.random() * this.SPEED)
            )
            let position = new Vector(mouse.x, mouse.y);
            let particle = new Particle(position, this.PARTICLE_RADIUS, color, velocity);
            this.particles.push(particle)
        }
    }
}