module.exports = function renderGame(canvas, game, Listener) {
    game.state.fps = `${Number(game.state.fps.split('-')[0]) + 1}-${game.state.fps.split('-')[1]}`

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
    const ctx = canvas.getContext('2d')
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    switch (game.state.gameStage) {
        case 'game':
            require('./RenderScreenGame')(canvas, game, Listener)
            require('./RenderNotes')(canvas, game, Listener)
            require('./RenderArrows')(canvas, game, Listener)
            require('./RenderBars')(canvas, game, Listener)
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