module.exports = async (canvas, game, Listener) => {
    const ctx = canvas.getContext('2d')
    
    canvas.style.backgroundImage = `url(../../imgs/${game.state.musicInfo.backgroundImage})`

    ctx.fillStyle = `rgba(0, 0, 0, 0.7)`
    ctx.fillRect(0, 0, canvas.width, canvas.height)
}