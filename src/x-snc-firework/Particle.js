import Vector from './Vector'

export default class Particle {
  constructor(position, radius, color, velocity) {
    this.pos = position
    this.radius = radius
    this.color = color
    this.velocity = velocity;
    this.opacity = 1
  }

  draw(context) {
    context.save()
    context.globalAlpha = this.opacity
    context.beginPath()
    context.arc(this.pos.x, this.pos.y, this.radius, 0, Math.PI * 2, false)
    context.fillStyle = this.color
    context.fill()
    context.closePath()
    context.restore()
  }

  update(gravity, friction) {
    this.velocity.mult(friction);

    this.velocity.add(gravity);

    this.pos.add(this.velocity)

    this.opacity -= 0.003
  }
}