export default class Particle {
    constructor(x, y, color, velX, velY) {
        this.x = x
        this.y = y
        this.color = color
        /* this.velX = 4 * (Math.random() - 0.5)
        this.velY = 4 * (Math.random() - 0.5) */
        this.velX = velX
        this.velY = velY

        this.defaultSize = 10
        this.maxLife = 10
        this.life = 10
        this.gravity = 0
    }

    draw(ctx) {
        this.x += this.velX
        this.y += this.velY + this.gravity

        this.velX *=0.99
        this.velY *=0.99

        this.gravity +=0.01
        this.life -= 0.1
        
        this.size = this.defaultSize*this.life/this.maxLife
        
        ctx.fillStyle = this.color
        ctx.save()
        ctx.translate(this.x, this.y)
        ctx.fillRect(0, 0, this.size, this.size)
        ctx.restore()
    }
}