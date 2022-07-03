module.exports = async (canvas, game, Listener) => {
    const ctx = canvas.getContext('2d')

    if (game.state.musicInfo.jumpscareImage) {
        let dir = game.state.musicInfo.jumpscareImage.dir
        if (game.state.musicInfo.jumpscareImage.random) dir = dir.replace(/{{frame}}/g, Number.parseInt(Math.random()*(game.state.musicInfo.jumpscareImage.maxFrame-game.state.musicInfo.jumpscareImage.minFrame)+1)+game.state.musicInfo.jumpscareImage.minFrame)
        else {
            let frame = game.state.musicInfo.jumpscareImage.frame
            if (frame > game.state.musicInfo.jumpscareImage.maxFrame) frame = game.state.musicInfo.jumpscareImage.minFrame
            dir = dir.replace(/{{frame}}/g,frame)
        }
        let jumpscareImage = game.state.images[dir]

        if (jumpscareImage) ctx.drawImage(jumpscareImage, 0, 0, canvas.width, canvas.height)
    }
}