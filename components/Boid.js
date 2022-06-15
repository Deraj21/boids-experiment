import Vector from './Vector.js'
import Draw from './Draw.js'
import Input from './Input.js'
import globals from '../globals.js'
const { wraparound } = globals

const boidPoints = [
        { x:  0, y: -2 },
        { x:  1, y:  1 },
        { x: -1, y:  1 }
    ],
    scale = 5,
    turnSpeed = .06,
    speed = 4,
    NINETY = Math.PI / 2,
    sightRange = 70,
    seperateDistance = 15,
    mousePull = 5

class Boid {
    constructor(x, y, r, followMouse, debug){
        this.position = new Vector(x || 0, y || 0)
        this.rotation = r || 0
        this.followMouse = followMouse || false,
        this.debug = debug || false

        this.color = this.debug ? "blue" : "black"
    }

    separation(boids){
        let positionTotal = new Vector(0, 0)
        let n = 0

        boids.forEach(b => {
            let distance = this.position.subtract(b.position).magnitude()

            if (distance < 2){
                console.log('hi')
            } else if (distance < seperateDistance){
                positionTotal.add( this.position.subtract(b.position) )
                n++
            }
        })

        return positionTotal//.scale(1 / n)
    }

    alignment(boids) {

    }

    cohesion(boids) {
        let positionTotal = new Vector(0, 0)
        let n = 0

        boids.forEach(b => {
            let distance = this.position.subtract(b.position).magnitude()
            if (distance < sightRange){
                positionTotal = positionTotal.add(b.position)
                n++
            } else {
                
            }
        })

        return positionTotal.scale(1 / n)
    }

    updateRotation(boids){
        const { rotation, position, followMouse, debug } = this
        let newPosition = new Vector(0, 0)
        let changeRotation = false

        this.cohesionVector = this.cohesion(boids).subtract(position)
        newPosition = newPosition.add(this.cohesionVector)
        changeRotation = true

        if (debug){
            this.separationVector = this.separation(boids)//.subtract(position)
            this.separationVector.print()
        }

        if (followMouse){
            this.mouseVector = Input.mouse.position.subtract(position).normalize().scale(mousePull)
            newPosition = newPosition.add( this.mouseVector )
            changeRotation = true
        }

        this.newPosition = newPosition

        if (changeRotation){
            // get 'right' vector
            let right = new Vector(rotation)
            // call dot product on it to get the sign
            let dotProd = right.dot(newPosition)
            let sign = dotProd > 0 ? 1 : dotProd < 0 ? -1 : 0
            // apply rotation
            this.rotation += turnSpeed * sign
        }
        
    }

    updatePosition(){
        let positionChange = new Vector(this.rotation - NINETY).scale(speed)

        this.position = this.position.add(positionChange)

        this.position = wraparound(this.position)
    }

    draw(){
        Draw.transform(this.position, this.rotation)
        Draw.drawPoly(boidPoints, scale, this.color)

        Draw.restore()

        if (this.debug){
            Draw.transform(this.position, 0)
            this.separationVector.draw()
            Draw.drawShield({X:0, y:0}, 0, seperateDistance / 6)
            Draw.restore()
        }
    }
}

export default Boid