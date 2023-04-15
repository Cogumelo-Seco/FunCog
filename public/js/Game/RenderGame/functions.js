export default (ctx, canvas, game, Listener) => {
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
    }
}