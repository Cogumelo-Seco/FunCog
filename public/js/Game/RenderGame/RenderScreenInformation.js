module.exports = async (canvas, game, Listener) => {
    const ctx = canvas.getContext('2d')

    if (+new Date()-game.state.fps.split('-')[1] > 1000) {
        game.state.fpsDisplay = game.state.fps.split('-')[0]
        game.state.fps = `0-${+new Date()}`
    }

    ctx.fillStyle = `hsl(${game.state.rainbowColor}, 100%, 40%)`//'rgb(200, 200, 200)'
    ctx.font = `bold 10px Arial`
    ctx.fillText(`${game.state.fpsDisplay}FPS`, (canvas.width-5)-ctx.measureText(`${game.state.fpsDisplay}FPS`).width, 15);

    ctx.fillText(`Mouse: X: ${Listener.state.mouseInfo.mouseInfoType == 'percent' ? Number.parseInt(Listener.state.mouseInfo.x*100)+'%' : Number.parseInt(Listener.state.mouseInfo.x*1000)} Y: ${Listener.state.mouseInfo.mouseInfoType == 'percent' ? Number.parseInt(Listener.state.mouseInfo.y*100)+'%' : Number.parseInt(Listener.state.mouseInfo.y*1000)}`, 2, 15)
    ctx.fillText(`Debug: ${game.state.debug}`, 2, 30)
    ctx.fillText(`BotPlay: ${game.state.botPlay}`, 2, 45)

    ctx.fillText('Created by: Cogu', canvas.width-ctx.measureText('Created by: Cogu').width-5, canvas.height-5);

    let cursorX = window.innerWidth*Listener.state.mouseInfo.x
    let cursorY = window.innerHeight*Listener.state.mouseInfo.y

    let cursorImage = game.state.images[`imgs/cursor${Listener.state.mouseInfo.mouseOnHover ? '-hover' : ''}.png`]
    if (cursorImage) ctx.drawImage(cursorImage, cursorX, cursorY, 30, 30)
}