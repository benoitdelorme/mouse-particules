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

        this.colors = [
            "#B5FFE1",
            "#93E5AB",
            "#65B891",
            "#4E878C",
            "#00241B",
        ]

        this.colorsClick = [
            "#59245c",
            "#d76669",
            "#f6cc71",
            "#1d1749",
        ]

        this.particles = []

        this.mouseMove()
        this.mouseClick()
    }

    randomColor() {
        return this.colors[Math.floor(Math.random()*this.colors.length)]
    }

    randomColorClick() {
        return this.colorsClick[Math.floor(Math.random()*this.colorsClick.length)]
    }

    mouseClick() {
        this.DOM.parent.addEventListener('click', (e) => {
            let x = e.pageX - offset(this.DOM.parent).left
            let y = e.pageY - offset(this.DOM.parent).top

            let dx = x - this.x
            let dy = y - this.y

            for(let i = 0; i < 60; i++) {
                let velX = Math.floor(dx / 10 + Math.random() * 60 * (Math.random() - 0.5))
                let velY = Math.floor(dy / 10 + Math.random() * 60 * (Math.random() - 0.5))
                
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

    mouseMove() {
        this.DOM.parent.addEventListener('mousemove', (e) => {
            let x = e.pageX - offset(this.DOM.parent).left
            let y = e.pageY - offset(this.DOM.parent).top

            let dx = x - this.x
            let dy = y - this.y

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