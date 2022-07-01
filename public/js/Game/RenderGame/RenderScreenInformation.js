module.exports = async (canvas, game, Listener) => {
    const ctx = canvas.getContext('2d')

    if (+new Date()-game.state.fps.split('-')[1] > 1000) {
        game.state.fpsDisplay = game.state.fps.split('-')[0]
        game.state.fps = `0-${+new Date()}`
    }

    ctx.fillStyle = 'rgb(200, 200, 200)'
    ctx.font = `bold 15px Arial`
    ctx.fillText(`${game.state.fpsDisplay}FPS`, (canvas.width-5)-ctx.measureText(`${game.state.fpsDisplay}FPS`).width, 20);
}