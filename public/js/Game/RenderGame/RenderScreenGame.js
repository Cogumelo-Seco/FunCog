module.exports = async (canvas, game, Listener) => {
    const ctx = canvas.getContext('2d')
    ctx.fillStyle = '#111'
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    ctx.fillStyle = 'rgb(200, 200, 200)'
    ctx.font = `bold 15px Arial`

    let musicInfoTxt = `SCORE: ${game.state.musicInfo.score} | MISSES: ${game.state.musicInfo.misses} | HEALTH: ${Number.parseInt(game.state.musicInfo.health)}% | ACCURANCY: ${game.state.musicInfo.accuracy.toFixed(2)}%`
    
    ctx.fillText(musicInfoTxt, canvas.width/2-(ctx.measureText(musicInfoTxt).width/2), canvas.height-20);

    ctx.fillText(`Difficulty: ${game.state.musicInfo.difficulty}`, 5, canvas.height-20);

    ctx.fillStyle = Math.abs(game.state.musicInfo.hitNote) > 50 ? 'rgb(220, 0, 0)' : 'rgb(19, 189, 0)'
    ctx.fillText(game.state.musicInfo.hitNote.toFixed(2)+'ms', Object.values(game.state.positionArrow)[0]-game.state.spaceBetweenArrows-ctx.measureText(game.state.musicInfo.hitNote.toFixed(2)+'ms').width, game.state.arrowsYLine+7.5+(game.state.arrowsSize**game.state.resizeNote/2));
}