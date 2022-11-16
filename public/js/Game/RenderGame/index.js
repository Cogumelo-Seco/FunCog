export default async function renderGame(canvas, game, Listener) {
    if (+new Date()-game.state.fps.split('-')[1] > 1000) {
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
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    switch (game.state.gameStage) {
        case 'game':
            require('./RenderScreenGame').default(canvas, game, Listener)
            require('./RenderArrows').default(canvas, game, Listener)
            require('./RenderNotes').default(canvas, game, Listener)
            require('./RenderBongoCat').default(canvas, game, Listener)
            require('./RenderBars').default(canvas, game, Listener)
            require('./RenderScreenInfoGame').default(canvas, game, Listener)
            require('./RenderPopUps').default(canvas, game, Listener)
            break
        case 'menu':
            require('./RenderMenuScreen').default(canvas, game, Listener)
            break
        case 'settings':
            require('./RenderSettingsScreen').default(canvas, game, Listener)
            break
        case 'onlineServerList':
            require('./RenderOnlineServerListScreen').default(canvas, game, Listener)
            break
        case 'selectMusic':
            require('./RenderMusicSelectScreen').default(canvas, game, Listener)
            break
        case 'dead':
            require('./RenderDeadScreen').default(canvas, game, Listener)
            break
        case 'loading':
            await require('./RenderLoadingScreen').default(canvas, game, Listener)
            break
        case 'test':
            require('./RenderTestScreen').default(canvas, game, Listener)
            break
    }

    require('./RenderScreenInformation').default(canvas, game, Listener)

    let renderFunction = () => {
        game.gameLoop()
        renderGame(canvas, game, Listener) 
    }

    if (game.state.renderType == 'limited') window.requestAnimationFrame(renderFunction)
    else setTimeout(renderFunction, 0)
}