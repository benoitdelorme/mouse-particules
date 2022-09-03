import './style.css'
import Particle from './particle.js'

class Sketch {
    constructor() {
        this.canvas = document.createElement('canvas')
        this.context = this.canvas.getContext('2d')
        
        document.body.append(this.canvas)
        
        this.width = document.documentElement.clientWidth
        this.height = document.documentElement.clientHeight
        
        this.canvas.width = this.width
        this.canvas.height = this.height

        this.time = 0

        this.x = 0
        this.y = 0
        this.colors = [
            "#e154ed",
            "#63d62b",
            "#23b1b6",
            "#ebbd3e",
            "#000000",
        ]

        this.particles = []

        this.raf()
        this.mouseMove()
    }

    randomColor() {
        return this.colors[Math.floor(Math.random()*this.colors.length)]
    }

    mouseMove() {
        this.canvas.addEventListener('mousemove', (e) => {
            let x = e.clientX
            let y = e.clientY

            let dx = x - this.x
            let dy = y - this.y

            console.log(dx, dy)

            for(let i = 0; i < 6; i++) {
                let velX = Math.floor(dx / 5 + 3 * (Math.random() - 0.5))
                let velY = Math.floor(dy / 5 + 3 * (Math.random() - 0.5))

                this.particles.push(
                    new Particle(
                        x, y, this.randomColor(), velX, velY
                    )
                )
            }

            this.x = x
            this.y = y
        })
    }

    raf() {
        this.time++

        this.context.clearRect(0, 0, this.width, this.height)
        /* this.context.fillRect(this.x, this.y, 100, 100) */

        this.particles.forEach((p, index) => {
            if(p.life > 0) {
                p.draw(this.context)
            }else {
                this.particles.splice(index, 1)
            }
        })

        window.requestAnimationFrame(this.raf.bind(this))
    }
}

new Sketch()