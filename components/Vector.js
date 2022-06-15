import globals from '../globals.js'
const { ctx, STROKE_STYLE } = globals

class Vector {
    /**
     * @param {Number} x
     * @param {Number} y
     * 
     * @also
     * 
     * @param {Number} x - angle for unit vector
     */
    constructor(x, y = false) {
        if (y){
            this.x = x
            this.y = y
        } else {
            this.x = Math.cos(x)
            this.y = Math.sin(x)
        }
    }

    /**
     * @returns magnitude; always positive
     */
    magnitude() {
        const { x, y } = this
        return Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2))
    }

    dot(v) {
        const { x, y } = this
        return x * v.x + y * v.y
    }

    /**
     * @returns unit vector (vector with magnitude 1 of same direction)
     */
    normalize() {
        const { x, y } = this
        let mag = this.magnitude()
        if (mag === 0) {
            return null
        } else {
            return new Vector(
                x / mag,
                y / mag
            )
        }
    }

    /**
     * scalar multiplication
     * @param {Number} scalar
     */
    scale(scalar) {
        const { x, y } = this
        return new Vector(x * scalar, y * scalar)
    }

    slope() {
        const { x, y } = this
        return x === 0 ? null : y / x
    }

    /**
     * @returns a perpendicular vector of the same magnitude as the original
     */
    perpendicular() {
        const { x, y } = this
        return new Vector(y, -x)
    }

    add(vector) {
        const { x, y } = this
        return new Vector( x + vector.x, y + vector.y )
    }

    subtract(v) {
        const { x, y } = this
        return new Vector( x - v.x, y - v.y )
    }

    draw(color) {
        const { x, y } = this

        ctx.beginPath()
        ctx.moveTo(0, 0)
        ctx.lineTo(x, y)
        ctx.strokeStyle = color || STROKE_STYLE
        ctx.stroke()
        ctx.strokeStyle = STROKE_STYLE
    }

    /**
     * @param {Integer} floatingPoints - number of floating points to round to
     */
    print(floatingPoints) {
        const { x, y } = this

        if (floatingPoints === undefined) {
            console.log(`(${x}, ${y})`)
        } else {
            console.log(`(${x.toPrecision(floatingPoints)}, ${y.toPrecision(floatingPoints)})`)
        }
    }

    intersects(v) {
        let { p1, p2 } = this

        let m1 = this.getSlope()
        let m2 = v.getSlope()
        let b1 = p1.y - m1 * p1.x
        let b2 = v.p1.y - m2 * v.p1.x
        let x, y
        // handle vertical lines
        if (m1 === Infinity || m1 === -Infinity) {
            x = p1.x
            y = m2 * x + b2
        } else if (m2 === Infinity || m2 === -Infinity) {
            x = v.p1.x
            y = m1 * x + b1
        } else {
            x = (m2 - m1 !== 0) ? (b1 - b2) / (m2 - m1) : null
            y = m2 * x + b2
            if (x === null) { return false } // slopes are the same
        }

        if (
            x <= Math.max(p1.x, p2.x) && x >= Math.min(p1.x, p2.x)
            &&
            x <= Math.max(v.p1.x, v.p2.x) && x >= Math.min(v.p1.x, v.p2.x)
            &&
            y <= Math.max(p1.y, p2.y) && y >= Math.min(p1.y, p2.y)
            &&
            y <= Math.max(v.p1.y, v.p2.y) && y >= Math.min(v.p1.y, v.p2.y)
        ) {
            return true
        }

        return false
    }
}

export default Vector