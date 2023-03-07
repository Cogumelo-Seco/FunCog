export default (canvas, game, Listener) => {
    const ctx = canvas.getContext('2d')

    return {
        fillText: async ({ alpha, style, style2, text, x, y, add, font }) => {
            let oldAlpha = Number(String(ctx.globalAlpha))
            ctx.globalAlpha = isNaN(Number(alpha)) ? game.state.alphaHUD : alpha
            ctx.font = font
            if (add) {
                ctx.fillStyle = style2 || 'black'
                ctx.fillText(text, x+add, y+add);
            }
            ctx.fillStyle = style || 'white'
            ctx.fillText(text, x, y);
            ctx.globalAlpha = oldAlpha
        }
/*fillText({
        style: `hsl(${game.state.rainbowColor}, 100%, 40%)`,
        style2: `hsl(${game.state.rainbowColor+180}, 100%, 40%)`,
        text: 'Created by: Cogu',
        x: canvas.width-ctx.measureText('Created by: Cogu').width-5,
        y: canvas.width-ctx.measureText('Created by: Cogu').width-5,
        add: 1
    })*/
    }
}