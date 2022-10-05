export default async (canvas, game, Listener) => {
    const ctx = canvas.getContext('2d')

    let BFImageData = game.state.images['imgs/BF/Dead.png']
    let BFImage = BFImageData.image
    let BFImageConfig = BFImageData.animationConfig

    if (game.state.animations.BFDead.frame === game.state.animations.BFDead.endFrame) {
        let frame = game.state.animations.BFDeadLoop.frame
        console.log(frame)
        let imageConfig = BFImageConfig.loop[frame]

        let BFImageWidth = imageConfig.width*0.5
        let BFImageHeight = imageConfig.height*0.5
        ctx.drawImage(BFImage, imageConfig.x, imageConfig.y, imageConfig.width, imageConfig.height, canvas.width/2-(BFImageWidth/2), canvas.height/2-(BFImageHeight/2), BFImageWidth, BFImageHeight)
    } else {
        let frame = game.state.animations.BFDead.frame
        let imageConfig = BFImageConfig.death[frame]

        let BFImageWidth = imageConfig.width*0.5
        let BFImageHeight = imageConfig.height*0.5
        ctx.drawImage(BFImage, imageConfig.x, imageConfig.y, imageConfig.width, imageConfig.height, canvas.width/2-(BFImageWidth/2), canvas.height/2-(BFImageHeight/2), BFImageWidth, BFImageHeight)
    }
    /*let BFImage = game.state.images[`BF/BF Dead Loop000${game.state.animations.BFDead.frame}.png`]
    if (BFImage) {
        let BFImageWidth = BFImage.width*0.5
        let BFImageHeight = BFImage.height*0.5
        ctx.drawImage(BFImage, canvas.width/2-(BFImageWidth/2), canvas.height/2-(BFImageHeight/2), BFImageWidth, BFImageHeight)
    }*/
}