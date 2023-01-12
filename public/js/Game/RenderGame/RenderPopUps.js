export default async (canvas, game, Listener, functions) => {
    const ctx = canvas.getContext('2d')

    for (let i in game.state.musicInfo.popups) {
        let popup = game.state.musicInfo.popups[i]
        let image = game.state.images[popup.image]?.image
        let imagePos = null
        if (popup.animationDir && popup.image && popup.frame != undefined) imagePos = game.state.images[popup.image]?.animationConfig[popup.animationDir][typeof(popup.frame) == 'number' ? popup.frame : popup.frame.replace(/{{frame}}/g, game.state.animations[popup.animation]?.frame)]

        if ((!i.toLowerCase().includes('jumpscare') || game.state.smallFunctions.getConfig('Jumpscare')) && image && game.state.images[popup.image]?.animationConfig && imagePos || (!i.toLowerCase().includes('jumpscare') || game.state.smallFunctions.getConfig('Jumpscare')) && image) {
            let popupWidth = (popup.width || imagePos?.width || image.width)*(popup.resize || 1)
            let popupHeight = (popup.height || imagePos?.height || image.height)*(popup.resize || 1)
            let popupX = popup.x
            let popupY = popup.y

            if (popup.alphaRandom && game.state.alphaHUD == 1) {
                ctx.globalAlpha = (Math.random()*(Number(popup.alpha.split('-')[1])-Number(popup.alpha.split('-')[0])))+Number(popup.alpha.split('-')[0])
            } else ctx.globalAlpha = popup.alpha == undefined ? game.state.alphaHUD : popup.alpha == 1 ? game.state.alphaHUD : popup.alpha
            
            let scaleH = popup.flipY ? -1 : 1
            let scaleV = popup.flipX ? -1 : 1
            let posX = popup.flipY ? (popupWidth+popupX)* -1 : popupX
            let posY = popup.flipX ? (popupHeight+popupY) * -1 : popupY

            ctx.save();
            ctx.scale(scaleH, scaleV);
            
            if (!popup.rotation) {
                if (imagePos) ctx.drawImage(image, imagePos.x, imagePos.y, imagePos.width, imagePos.height, posX, posY, popupWidth, popupHeight)
                else if (popup.frame == undefined) ctx.drawImage(image, posX, posY, popupWidth, popupHeight)
            } else {
                ctx.translate(posX+(popupWidth/2), posY+(popupHeight/2));
                ctx.rotate((popup.rotation || 0)*Math.PI/180);

                if (imagePos) ctx.drawImage(image, imagePos.x, imagePos.y, imagePos.width, imagePos.height, -(popupWidth/2), -(popupHeight/2), popupWidth, popupHeight)
                else if (popup.frame == undefined) ctx.drawImage(image, -(popupWidth/2), -(popupHeight/2), popupWidth, popupHeight)
            }

            ctx.restore();
            ctx.globalAlpha = 1
        }
    }
}