export default class Particle {
    constructor(x, y, radius, color, velocity) {
      this.x = x
      this.y = y
      this.radius = radius
      this.color = color
      this.velocity = {
        x: velocity.x,
        y: velocity.y
      }
      this.opacity = 1
    }
  
    draw(context) {
      context.save()
      context.globalAlpha = this.opacity
      context.beginPath()
      context.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
      context.fillStyle = this.color
      context.fill()
      context.closePath()
      context.restore()
    }
  
    update(gravity, friction) {
      this.velocity.x *= friction
      this.velocity.y *= friction
      this.velocity.y += gravity
      this.x += this.velocity.x
      this.y += this.velocity.y
      this.opacity -= 0.003
    }
  }