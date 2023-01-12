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
    canvas.style.filter = game.state.screenFilter
    canvas.width = window.innerWidth+(game.state.screenZoom/2)
    canvas.height = window.innerHeight+(game.state.screenZoom/2)
    canvas.style.backgroundImage = 'none'
    const ctx = canvas.getContext('2d')
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    ctx.imageSmoothingEnabled = game.state.smallFunctions.getConfig('anti-aliasing')

    if (game.state.music?.currentTime > 0 && game.state.music?.currentTime < game.state.music?.duration) game.state.musicEventListener('gameLoopFullFPSBackground', { listenerState: Listener.state }, game.state)
    //require('./RenderScreenGame').default(canvas, game, Listener)

    const functions = require('./functions').default(canvas, game, Listener)
    switch (game.state.gameStage) {
        case 'game':
            require('./RenderScreenGame').default(canvas, game, Listener, functions)
            require('./RenderPopUpsBackground').default(canvas, game, Listener, functions)
            require('./RenderArrows').default(canvas, game, Listener, functions)
            require('./RenderNotes').default(canvas, game, Listener, functions)
            require('./RenderBongoCat').default(canvas, game, Listener, functions)
            require('./RenderScreenInfoGame').default(canvas, game, Listener, functions)
            require('./RenderBars').default(canvas, game, Listener, functions)
            require('./RenderPopUps').default(canvas, game, Listener, functions)
            break
        case 'menu':
            require('./RenderMenuScreen').default(canvas, game, Listener, functions)
            break
        case 'settings':
            require('./RenderSettingsScreen').default(canvas, game, Listener, functions)
            break
        case 'onlineServerList':
            require('./RenderOnlineServerListScreen').default(canvas, game, Listener, functions)
            break
        case 'selectMusic':
            require('./RenderMusicSelectScreen').default(canvas, game, Listener, functions)
            break
        case 'dead':
            require('./RenderDeadScreen').default(canvas, game, Listener, functions)
            break
        case 'loading':
            await require('./RenderLoadingScreen').default(canvas, game, Listener, functions)
            break
        case 'score':
            require('./RenderScoreScreen').default(canvas, game, Listener, functions)
            break
        case 'test':
            require('./RenderTestScreen').default(canvas, game, Listener, functions)
            break
    }

    //require('./RenderChat').default(canvas, game, Listener)
    require('./RenderScreenInformation').default(canvas, game, Listener, functions)

    game.gameLoop()
    if (game.state.music?.currentTime > 0 && game.state.music?.currentTime < game.state.music?.duration) game.state.musicEventListener('gameLoopFullFPS', { listenerState: Listener.state }, game.state)

    if (game.state.renderType == 'limited') window.requestAnimationFrame(() => renderGame(canvas, game, Listener))
    else setTimeout(() => renderGame(canvas, game, Listener), 0)
}