import Vector from './Vector.js'

class Input {
    constructor() {
        this.keysDown = {}
        this.mouse = {
            position: new Vector(0, 0),
            down: false
        }

        this._handleKeyDown = this._handleKeyDown.bind(this)
        this._handleKeyUp = this._handleKeyUp.bind(this)
        this._handleMouseMove = this._handleMouseMove.bind(this)

        window.addEventListener("keydown", this._handleKeyDown)
        window.addEventListener("keyup", this._handleKeyUp)
        canvas.addEventListener("mousemove", this._handleMouseMove)

        window.focus()
    }

    _handleKeyDown(e){ this.keysDown[e.key] = true }
    _handleKeyUp(e){ this.keysDown[e.key] = false }

    _handleMouseMove(e){
        this.mouse.position.x = e.offsetX
        this.mouse.position.y = e.offsetY
    }
}

const instance = new Input()
Object.freeze(instance)

export default instance