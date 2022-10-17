export default async (canvas, game, Listener) => {
    const ctx = canvas.getContext('2d')

    ctx.fillStyle = `hsl(${game.state.rainbowColor}, 100%, 40%)`//'rgb(200, 200, 200)'
    ctx.font = `bold 10px Arial`
    ctx.fillText(`${game.state.fpsDisplay}FPS`, (canvas.width-5)-ctx.measureText(`${game.state.fpsDisplay}FPS`).width, 15);
    ctx.fillText(`${game.state.ping}Ping`, (canvas.width-5)-ctx.measureText(`${game.state.ping}Ping`).width, 30);

    ctx.fillText(`Mouse: X: ${Listener.state.mouseInfo.mouseInfoType == 'percent' ? Number.parseInt(Listener.state.mouseInfo.x*100)+'%' : Number.parseInt(Listener.state.mouseInfo.x*1000)} Y: ${Listener.state.mouseInfo.mouseInfoType == 'percent' ? Number.parseInt(Listener.state.mouseInfo.y*100)+'%' : Number.parseInt(Listener.state.mouseInfo.y*1000)}`, 2, 15)
    ctx.fillText(`Debug: ${game.state.debug}`, 2, 30)
    ctx.fillText(`BotPlay: ${game.state.botPlay}`, 2, 45)

    ctx.fillText('Created by: Cogu', canvas.width-ctx.measureText('Created by: Cogu').width-5, canvas.height-5);

    let ReturnPageButton = Listener.state.buttons['ReturnPageButton']
    if (ReturnPageButton.gameStage.includes(game.state.gameStage)) {
        let returnButtonX = canvas.width*(ReturnPageButton.minX/1000)
        let returnButtonY = canvas.height*(ReturnPageButton.minY/1000)
        let returnButtonWidth = canvas.width*(ReturnPageButton.maxX/1000)-(canvas.width*(ReturnPageButton.minX/1000))
        let returnButtonHeight = canvas.height*(ReturnPageButton.maxY/1000)-(canvas.height*(ReturnPageButton.minY/1000))

        ctx.fillStyle = Listener.state.buttons['ReturnPageButton'].over ? 'rgb(40, 40, 90)' : 'rgb(50, 50, 50)'
        ctx.strokeStyle = 'white'
        ctx.fillRect(returnButtonX, returnButtonY, returnButtonWidth, returnButtonHeight)
        ctx.rect(returnButtonX, returnButtonY, returnButtonWidth, returnButtonHeight)
        ctx.stroke()

        ctx.fillStyle = 'white'
        ctx.font = `bold ${returnButtonWidth*0.15}px Arial`
        ctx.fillText(`[Q] Return`, returnButtonX+(returnButtonWidth/2)-(ctx.measureText(`[Q] Return`).width/2), returnButtonY+(returnButtonWidth*0.19))
    }

    let cursorX = window.innerWidth*Listener.state.mouseInfo.x
    let cursorY = window.innerHeight*Listener.state.mouseInfo.y

    let cursorImage = game.state.images[`imgs/cursor${Listener.state.mouseInfo.mouseOnHover ? '-hover' : ''}.png`]
    if (cursorImage) ctx.drawImage(cursorImage.image, cursorX, cursorY, 30, 30)
}