import Game from "./components/Game.js"
import Globals from "./globals.js"

const { ctx, STROKE_STYLE, FILL_STYLE, FONT, FPS, canvas } = Globals

ctx.strokeStyle = STROKE_STYLE
ctx.fillStyle = FILL_STYLE
ctx.font = `${FONT.bold ? 'bold ' : ''}${FONT.size}px ${FONT.family}`

// Fullscreen Canvas
// let margin = 10,
//     h = window.innerHeight - margin,
//     w = window.innerWidth - margin
// canvas.setAttribute("height", h)
// canvas.setAttribute("width", w)


// setup game
let game = new Game({
    // config

},{
    // elements

})

setInterval(game.loop, 1000 / FPS)

canvas.addEventListener("click", e => { 
    game.pause()
})