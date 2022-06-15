import Input from './Input.js'
import Boid from './Boid.js'
import Vector from './Vector.js'
import globals from '../globals.js'
const { ctx, W, H, randomPosition, randomRotation, FPS } = globals

class Game {
    constructor(config, elements) {
        let { } = config
        let { } = elements

        this.draw = this.draw.bind(this)
        this.loop = this.loop.bind(this)
        this.paused = false
        
        this.newGame()
    }

    pause(){
        this.paused = !this.paused
    }

    loop() {
        if (!this.paused){
            // get input
    
            // apply inputs
            this.boids.forEach(b => {
                b.updateRotation(this.boids)
                b.updatePosition()
            })
    
            // draw
            this.draw()
        }
    }

    newGame() {
        this.paused = false

        let numBoids = 100
        this.boids = []
        for (let i = 0; i < numBoids; i++){
            let { x, y } = randomPosition()
            this.boids.push( new Boid(x, y, randomRotation(), false, i == 0 ) )
        }
    }

    draw() {
        ctx.clearRect(0, 0, W, H)

        this.boids.forEach(boid => {
            boid.draw()
        })

    }
}

export default Game