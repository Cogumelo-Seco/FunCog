module.exports = function renderGame(canvas, game, Listener) {
    const ctx = canvas.getContext('2d')

    let BFImage = game.state.images[`BF/BF Dead Loop000${game.state.animations.BFDead.frame}.png`]
    if (BFImage) {
        let BFImageWidth = BFImage.width*0.5
        let BFImageHeight = BFImage.height*0.5
        ctx.drawImage(BFImage, canvas.width/2-(BFImageWidth/2), canvas.height/2-(BFImageHeight/2), BFImageWidth, BFImageHeight)
    }
}