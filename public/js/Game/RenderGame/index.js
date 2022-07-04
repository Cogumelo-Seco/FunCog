module.exports = async function renderGame(canvas, game, Listener) {
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
            require('./RenderScreenGame')(canvas, game, Listener)
            require('./RenderArrows')(canvas, game, Listener)
            await require('./RenderNotes')(canvas, game, Listener)
            require('./RenderScreenInfoGame')(canvas, game, Listener)
            require('./RenderBars')(canvas, game, Listener)
            require('./RenderJumpscares')(canvas, game, Listener)
            break
        case 'selectMusic':
            require('./RenderMusicSelectScreen')(canvas, game, Listener)
            break
        case 'dead':
            require('./RenderDeadScreen')(canvas, game, Listener)
            break
        case 'loading':
            require('./RenderLoadingScreen')(canvas, game, Listener)
            break
    }

    require('./RenderScreenInformation')(canvas, game, Listener)

    setTimeout(() => renderGame(canvas, game, Listener), 0)
}