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

    if (game.state.smallFunctions.getConfig('anti-aliasing')) {
        ctx.imageSmoothingEnabled = true
        canvas.style.imageRendering = 'auto'
        document.body.style.imageRendering = 'auto'
    } else {
        ctx.imageSmoothingEnabled = false
        canvas.style.imageRendering = 'pixelated'
        document.body.style.imageRendering = 'pixelated'
    }

    if (game.state.music?.currentTime > 0 && game.state.music?.currentTime < game.state.music?.duration && !game.state.music.paused) game.state.musicEventListener('gameLoopFullFPSBackground', { listenerState: Listener.state }, game.state)
    //require('./RenderScreenGame').default(ctx, canvas, game, Listener)

    const functions = require('./functions').default(ctx, canvas, game.state, Listener)
    switch (game.state.gameStage) {
        case 'game':
            require('./RenderScreenGame').default(ctx, canvas, game, Listener, functions)
            require('./RenderPopUpsBackground').default(ctx, canvas, game, Listener, functions)
            require('./RenderArrows').default(ctx, canvas, game, Listener, functions)
            require('./RenderNotes').default(ctx, canvas, game, Listener, functions)
            require('./RenderBongoCat').default(ctx, canvas, game, Listener, functions)
            require('./RenderScreenInfoGame').default(ctx, canvas, game, Listener, functions)
            require('./RenderBars').default(ctx, canvas, game, Listener, functions)
            require('./RenderPopUps').default(ctx, canvas, game, Listener, functions)
            if (game.state.music && game.state.music.paused && game.state.music.currentTime > 0) require('./RenderPause').default(ctx, canvas, game, Listener, functions)
            break
        case 'menu':
            require('./RenderMenuScreen').default(ctx, canvas, game, Listener, functions)
            break
        case 'settings':
            require('./RenderSettingsScreen').default(ctx, canvas, game, Listener, functions)
            break
        case 'onlineServerList':
            require('./RenderOnlineServerListScreen').default(ctx, canvas, game, Listener, functions)
            break
        case 'selectMusic':
            require('./RenderMusicSelectScreen').default(ctx, canvas, game, Listener, functions)
            break
        case 'dead':
            require('./RenderDeadScreen').default(ctx, canvas, game, Listener, functions)
            break
        case 'loading':
            await require('./RenderLoadingScreen').default(ctx, canvas, game, Listener, functions)
            break
        case 'score':
            require('./RenderScoreScreen').default(ctx, canvas, game, Listener, functions)
            break
        case 'test':
            require('./RenderTestScreen').default(ctx, canvas, game, Listener, functions)
            break
    }

    //require('./RenderChat').default(ctx, canvas, game, Listener)
    require('./RenderScreenInformation').default(ctx, canvas, game, Listener, functions)

    game.gameLoop()
    if (game.state.music?.currentTime > 0 && game.state.music?.currentTime < game.state.music?.duration && !game.state.music.paused) game.state.musicEventListener('gameLoopFullFPS', { listenerState: Listener.state }, game.state)

    if (game.state.smallFunctions.getConfig('VSync')) window.requestAnimationFrame(() => renderGame(canvas, game, Listener))
    else setTimeout(() => renderGame(canvas, game, Listener), 0)
}