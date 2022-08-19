module.exports = async (canvas, game, Listener) => {
    const ctx = canvas.getContext('2d')

    for (let i in game.state.musicInfo.popups) {
        let popup = game.state.musicInfo.popups[i]
        let image = popup.image
        image = game.state.images[image]
        if (image) {
            let popupWidth = (popup.width || image.width)*(popup.resize || 1)
            let popupHeight = (popup.height || image.height)*(popup.resize || 1)
            let popupX = popup.x
            let popupY = popup.y

            if (popup.alphaRandom) {
                ctx.globalAlpha =  (Math.random()*(Number(popup.alpha.split('-')[1])-Number(popup.alpha.split('-')[0])))+Number(popup.alpha.split('-')[0])
            } else ctx.globalAlpha = popup.alpha == undefined ? 1 : popup.alpha
            if (popup.rotation) {
                ctx.save()

                ctx.translate(popupX+(popupWidth/2), popupY+(popupHeight/2));
                ctx.rotate((popup.rotation || 0)*Math.PI/180);
                
                ctx.drawImage(image, -(popupWidth/2), -(popupHeight/2), popupWidth, popupHeight)

                ctx.restore()
            } else {
                let scaleH = popup.flipY ? -1 : 1
                let scaleV = popup.flipX ? -1 : 1
                let posX = popup.flipY ? (popupWidth+popupX)* -1 : popupX
                let posY = popup.flipX ? (popupHeight+popupY) * -1 : popupY

                ctx.save();
                ctx.scale(scaleH, scaleV);
                
                ctx.drawImage(image, posX, posY, popupWidth, popupHeight)

                ctx.restore();
            }
            ctx.globalAlpha = 1
        }
    }
}