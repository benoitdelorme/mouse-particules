import Particle from './Particle'
import { offset } from './global'

export default class MouseParticlesEffect {
    constructor(dom, parent) {
        this.DOM = {}
        this.DOM.root = dom
        this.DOM.parent = parent || dom

        this.canvas = document.createElement('canvas')
        this.canvas.classList.add('c-mouse-particles')
        this.context = this.canvas.getContext('2d')
        
        this.DOM.root.prepend(this.canvas)
        
        this.size = {
            x: document.documentElement.clientWidth,
            y: document.documentElement.clientHeight
        }
        
        this.canvas.width = this.size.x
        this.canvas.height = this.size.y

        this.time = 0

        this.x = 0
        this.y = 0
        /* this.colors = [
            "#e154ed",
            "#63d62b",
            "#23b1b6",
            "#ebbd3e",
            "#000000",
        ] */

        this.colors = [
            "rgba(255, 255, 255, 0.3)",
            "rgba(255, 255, 255, 0.6)",
            /* "#59245c",
            "#d76669",
            "#f6cc71",
            "#1d1749", */
            "rgba(255, 255, 255, 0.8)",
        ]

        this.particles = []

        this.mouseMove()
    }

    randomColor() {
        return this.colors[Math.floor(Math.random()*this.colors.length)]
    }

    mouseMove() {
        this.DOM.parent.addEventListener('mousemove', (e) => {
            let x = e.pageX - offset(this.DOM.parent).left
            let y = e.pageY - offset(this.DOM.parent).top

            let dx = x - this.x
            let dy = y - this.y

            /* console.log(dx, dy) */

            for(let i = 0; i < 6; i++) {
                let velX = Math.floor(dx / 1000000 + 3 * (Math.random() - 0.5))
                let velY = Math.floor(dy / 1000000 + 3 * (Math.random() - 0.5))

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

        this.context.clearRect(0, 0, this.size.x, this.size.y)

        this.particles.forEach((p, index) => {
            if(p.life > 0) {
                p.draw(this.context)
            }else {
                this.particles.splice(index, 1)
            }
        })
    }

    resize(size) {
        this.size = size
        this.canvas.width = size.x
        this.canvas.height = size.y
    }
}