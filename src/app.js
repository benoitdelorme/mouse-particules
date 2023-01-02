import MouseParticlesEffect from './MouseParticlesEffect'
import './style.css'

class App {
    constructor() {
        this.size = {}

        this.mouseParticlesEffect = new MouseParticlesEffect(
            document.querySelector('.c-container'),
            document.body
        )

        window.addEventListener('resize', () => {
            this.resize()
        })

        requestAnimationFrame(this.update.bind(this))
    }

    update() {
        this.mouseParticlesEffect.raf()
        requestAnimationFrame(this.update.bind(this))
    }

    resize() {
        this.size.x = window.innerWidth
        this.size.y = window.innerHeight

        if(this.mouseParticlesEffect) {
            this.mouseParticlesEffect.resize(this.size)
        }
    }
}

new App()