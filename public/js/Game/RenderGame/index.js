export default async function renderGame(canvas, game, Listener) {
    if (+new Date()-game.state.fps.split('-')[1] > 1000) {
        game.state.changeRenderTypeCount += 1
        game.state.fpsDisplay = game.state.fps.split('-')[0]
        game.state.fps = `0-${+new Date()}`
    }
    game.state.fps = `${Number(game.state.fps.split('-')[0]) + 1}-${game.state.fps.split('-')[1]}`

    canvas.style.left = game.state.screenXMovement-(game.state.screenZoom/2)+'px'
    canvas.style.top = game.state.screenYMovement-(game.state.screenZoom/2)+'px'
    canvas.style.width = window.innerWidth+(game.state.screenZoom)+'px'
    canvas.style.height = window.innerHeight+(game.state.screenZoom)+'px'
    canvas.style.transform = `rotate(${game.state.screenRotation}deg)`
    canvas.width = window.innerWidth+(game.state.screenZoom/2)
    canvas.height = window.innerHeight+(game.state.screenZoom/2)
    canvas.style.backgroundImage = 'none'
    const ctx = canvas.getContext('2d')
    ctx.fillStyle = `hsl(${360-game.state.rainbowColor}, 100%, 1%)`

    await game.gameLoop()

    switch (game.state.gameStage) {
        case 'game':
            ctx.clearRect(0, 0, canvas.width, canvas.height)
            require('./RenderScreenGame').default(canvas, game, Listener)
            require('./RenderArrows').default(canvas, game, Listener)
            require('./RenderNotes').default(canvas, game, Listener)
            require('./RenderBongoCat').default(canvas, game, Listener)
            require('./RenderScreenInfoGame').default(canvas, game, Listener)
            require('./RenderBars').default(canvas, game, Listener)
            require('./RenderPopUps').default(canvas, game, Listener)
            break
        case 'menu':
            ctx.fillRect(0, 0, canvas.width, canvas.height)
            require('./RenderMenuScreen').default(canvas, game, Listener)
            break
        case 'settings':
            ctx.fillRect(0, 0, canvas.width, canvas.height)
            require('./RenderSettingsScreen').default(canvas, game, Listener)
            break
        case 'onlineServerList':
            ctx.fillRect(0, 0, canvas.width, canvas.height)
            require('./RenderOnlineServerListScreen').default(canvas, game, Listener)
            break
        case 'selectMusic':
            ctx.fillRect(0, 0, canvas.width, canvas.height)
            require('./RenderMusicSelectScreen').default(canvas, game, Listener)
            break
        case 'dead':
            ctx.clearRect(0, 0, canvas.width, canvas.height)
            require('./RenderDeadScreen').default(canvas, game, Listener)
            break
        case 'loading':
            ctx.clearRect(0, 0, canvas.width, canvas.height)
            await require('./RenderLoadingScreen').default(canvas, game, Listener)
            break
        case 'score':
            ctx.fillRect(0, 0, canvas.width, canvas.height)
            require('./RenderScoreScreen').default(canvas, game, Listener)
            break
        case 'test':
            ctx.clearRect(0, 0, canvas.width, canvas.height)
            require('./RenderTestScreen').default(canvas, game, Listener)
            break
    }

    require('./RenderScreenInformation').default(canvas, game, Listener)

    if (game.state.renderType == 'limited') window.requestAnimationFrame(() => renderGame(canvas, game, Listener) )
    else setTimeout(() => renderGame(canvas, game, Listener) , 0)
}