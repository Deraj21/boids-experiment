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
    turnSpeed = 1 / 500,
    speed = 3,
    NINETY = Math.PI / 2,
    sightRange = 70,
    separateDistance = 20,
    separateScale = 7,
    cohesionScale = 1,
    alignScale = 20,
    mousePull = 15

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
            if (this.position.x === b.position.x && this.position.y === b.position.y){
            } else if (distance < separateDistance){
                positionTotal = positionTotal.add( this.position.subtract(b.position) )
                n++
            } else {
            }
        })

        return positionTotal
    }

    alignment(boids) {
        let rotationTotal = 0
        let n = 0

        boids.forEach(b => {
            let distance = this.position.subtract(b.position).magnitude()
            if (distance < sightRange){
                rotationTotal += b.rotation
                n++
            }
        })

        return new Vector(rotationTotal / n)
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

    applyRules(boids) {
        let cohesionTotal = new Vector(0, 0)
        let rotationTotal = 0
        let separationTotal = new Vector(0, 0)

        let numWithinSight = 0
        let numWithinSeparate = 0

        boids.forEach(b => {
            let distance = this.position.subtract(b.position).magnitude()
            if (this.position.x === b.position.x && this.position.y === b.position.y){
                // skip
            } else if (distance < separateDistance){
                separationTotal = separationTotal.add( this.position.subtract(b.position) )
                numWithinSeparate++
            }
            if (distance < sightRange){
                cohesionTotal = cohesionTotal.add(b.position)
                rotationTotal += b.rotation
                numWithinSight++
            }
        })

        let cohesionVector = cohesionTotal.subtract(this.position).scale(1 / numWithinSight * cohesionScale)
        let alignmentVector = new Vector(rotationTotal / numWithinSight).scale(alignScale)
        let separationVector = separationTotal.scale(separateScale)

        return cohesionVector.add(alignmentVector).add(separationVector)
    }

    updateRotation(boids){
        const { rotation, position, followMouse, debug } = this
        let newPosition = new Vector(0, 0)
        // let changeRotation = false

        // this.cohesionVector = this.cohesion(boids).subtract(position).scale(cohesionScale)
        // newPosition = newPosition.add(this.cohesionVector)
        // changeRotation = true

        // this.separationVector = this.separation(boids).scale(separateScale)
        // newPosition = newPosition.add(this.separationVector)

        // this.alignmentVector = this.alignment(boids).scale(alignScale)
        // newPosition = newPosition.add(this.alignmentVector)
        
        newPosition = newPosition.add( this.applyRules(boids) )

        if (followMouse){
            this.mouseVector = Input.mouse.position.subtract(position).normalize().scale(mousePull)
            newPosition = newPosition.add( this.mouseVector )
            changeRotation = true
        }


        // get 'right' vector
        let right = new Vector(rotation)
        // call dot product on it to get the sign
        let dotProd = right.dot(newPosition)
        let sign = dotProd > 0 ? 1 : dotProd < 0 ? -1 : 0
        // apply rotation
        this.rotation += turnSpeed * dotProd
        
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

        // if (this.debug){
        //     Draw.transform(this.position, 0)
        //     this.alignmentVector.draw("green")
        //     Draw.drawShield({X:0, y:0}, 0, sightRange / 6)
        //     Draw.restore()
        // }
    }
}

export default Boid