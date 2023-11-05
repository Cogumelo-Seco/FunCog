export default async (ctx, canvas, game, Listener, functions) => {
    ctx.globalAlpha = game.state.alphaHUD
    ctx.font = `bold 11px Arial`
    functions.fillText({
        style: `hsl(${game.state.rainbowColor}, 100%, 40%)`,
        style2: `hsl(${game.state.rainbowColor+180}, 100%, 40%)`,
        text: 'Created by: Kogu',
        font: 'bold 11px Arial',
        x: canvas.width-ctx.measureText('Created by: Kogu').width-5,
        y: canvas.height-5,
        add: 1
    })

    if (game.state.smallFunctions.getConfig('GameInfo')) {
        functions.fillText({
            style: `hsl(${game.state.rainbowColor}, 100%, 40%)`,
            style2: `hsl(${game.state.rainbowColor+180}, 100%, 40%)`,
            text: `${game.state.fpsDisplay}FPS`,
            font: 'bold 11px Arial',
            x: (canvas.width-5)-ctx.measureText(`${game.state.fpsDisplay}FPS`).width,
            y: 15,
            add: 1
        })
        functions.fillText({
            style: `hsl(${game.state.rainbowColor}, 100%, 40%)`,
            style2: `hsl(${game.state.rainbowColor+180}, 100%, 40%)`,
            text: `${game.state.ping || '???'}Ping`,
            font: 'bold 11px Arial',
            x: (canvas.width-5)-ctx.measureText(`${game.state.ping}Ping`).width,
            y: 30,
            add: 1
        })

        functions.fillText({
            alpha: (game.state.animations.code.frame/game.state.animations.code.endFrame) > 0.5 ? 1-((game.state.animations.code.frame/game.state.animations.code.endFrame)-0.5)/0.5 : game.state.alphaHUD,
            style: `rgb(255, 255, 255)`,
            font: 'bold 11px Arial',
            text: `Code Detected - §b${game.state.animations.code.on ? 'ON' : 'OFF'}`,
            x: 5,
            y: 60,
            add: 2
        })
    }

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

    /*let cursorX = window.innerWidth*Listener.state.mouseInfo.x
    let cursorY = window.innerHeight*Listener.state.mouseInfo.y

    /*let cursorImage = game.state.images[`imgs/cursor${Listener.state.mouseInfo.mouseOnHover ? '-hover' : ''}.png`]
    if (cursorImage && (Listener.state.mouseInfo.mouseOnHover || Listener.state.mouseInfo.lastMoveTime+3000 >= +new Date())) ctx.drawImage(cursorImage.image, cursorX, cursorY, 30, 30)*/
    let cursorType = (Listener.state.mouseInfo.mouseOnHover || Listener.state.mouseInfo.lastMoveTime+3000 >= +new Date()) ? Listener.state.mouseInfo.mouseOnHover ? 'pointer' : 'default' : 'none'
    document.body.style.cursor = cursorType

    let transitionAnimation = game.state.animations.transition

    ctx.globalAlpha = 1-transitionAnimation.frame/10
    ctx.fillStyle = `black`
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    ctx.globalAlpha = 1
}