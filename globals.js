import Vector from "./components/Vector.js"

const canvas = document.querySelector("canvas"),
    ctx = canvas.getContext("2d"),
    H = parseFloat(canvas.getAttribute("height")),
    W = parseFloat(canvas.getAttribute("width"))

export default {
    canvas, ctx, H, W,
    FPS: 60,
    STROKE_STYLE: "black",
    FILL_STYLE: "black",
    FONT: {
        size: 40,
        family: "Arial",
        bold: true
    },
    FLIP_ANGLE: Math.PI,
    /**
     * restrict value to a range
     * @param {Number} value
     * @param {Number} min - bottom range
     * @param {Number} max - top range
     */
    clamp: function(value, min, max){
        return value < min ? min : value > max ? max : value
    },
    randomRotation: () => Math.random() * Math.PI * 2,
    randomPosition: () => { return { x: Math.random() * W, y: Math.random() * H} },
    /**
     * 
     * @param {Vector} position
     * @param {Number} position.x
     * @param {Number} position.y
     * @returns {Vector}
     */
    wraparound: function(position){
        position.x = (
            position.x < 0 ? position.x + W :
            position.x > W ? position.x - W :
            position.x
        )
        position.y = (
            position.y < 0 ? position.y + H :
            position.y > H ? position.y - H :
            position.y
        )

        return position
    }

}
