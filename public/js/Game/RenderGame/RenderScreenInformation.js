module.exports = async (canvas, game, Listener) => {
    const ctx = canvas.getContext('2d')

    if (+new Date()-game.state.fps.split('-')[1] > 1000) {
        game.state.fpsDisplay = game.state.fps.split('-')[0]
        game.state.fps = `0-${+new Date()}`
    }

    ctx.fillStyle = 'rgb(200, 200, 200)'
    ctx.font = `bold 15px Arial`
    ctx.fillText(`${game.state.fpsDisplay}FPS`, (canvas.width-5)-ctx.measureText(`${game.state.fpsDisplay}FPS`).width, 20);

    let musicInfoTxt = `SCORE: ${game.state.musicInfo.score} | MISSES: ${game.state.musicInfo.misses} | ACCURANCY: ${game.state.musicInfo.accuracy.toFixed(2)}%`
    
    ctx.fillText(musicInfoTxt, canvas.width/2-(ctx.measureText(musicInfoTxt).width/2), canvas.height-20);

    ctx.fillText(`Difficulty: ${game.state.musicInfo.difficulty}`, 5, canvas.height-20);

    ctx.fillStyle = Math.abs(game.state.musicInfo.hitNote) > 25 ? 'rgb(220, 0, 0)' : 'rgb(19, 189, 0)'
    ctx.fillText(game.state.musicInfo.hitNote.toFixed(2), Object.values(game.state.positionArrow)[Object.values(game.state.positionArrow).length-1]+(game.state.arrowsSize**game.state.resizeNote)+game.state.spaceBetweenArrows, game.state.arrowsYLine+7.5+(game.state.arrowsSize**game.state.resizeNote/2));
}