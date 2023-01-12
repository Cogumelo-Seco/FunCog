export default async (canvas, game, Listener, functions) => {
    if (!game.state.smallFunctions.getConfig('botPlay') || game.state.online) return

    const ctx = canvas.getContext('2d')
    ctx.globalAlpha = game.state.alphaHUD

    let imageData = game.state.images['BongoCat/BongoCat.png']
    let image = imageData.image
    let imageConfig = imageData.animationConfig

    let bgConfig = imageConfig.bg
    let width = bgConfig.width*0.5
    let height = bgConfig.height*0.5
    let Xpint = game.state.customBongPosition.X != null ? game.state.customBongPosition.X : canvas.width/2
    let Ypoint = game.state.customBongPosition.Y != null ? game.state.customBongPosition.Y : canvas.height/2
    let X = game.state.smallFunctions.getConfig('MiddleScroll') && game.state.customBongPosition.X == null ? canvas.width-width-20 : Xpint-(width/2)
    let Y = Ypoint-(height/2)

    ctx.drawImage(image, bgConfig.x, bgConfig.y, bgConfig.width, bgConfig.height, X, Y, width, height)

    let leftHand = 'UP'
    let rightHand = 'UP'

    if (Listener.state.arrows[0]?.click) {
        let arrow0Config = imageConfig['Arrow-0']
        ctx.drawImage(image, arrow0Config.x, arrow0Config.y, arrow0Config.width, arrow0Config.height, X, Y, width, height)
        leftHand = 1
    }

    if (Listener.state.arrows[1]?.click) {
        let arrow1Config = imageConfig['Arrow-1']
        ctx.drawImage(image, arrow1Config.x, arrow1Config.y, arrow1Config.width, arrow1Config.height, X, Y, width, height)
        if (leftHand == 'UP') leftHand = 2
        else leftHand = 3
    }

    if (Listener.state.arrows[2]?.click) {
        let arrow2Config = imageConfig['Arrow-2']
        ctx.drawImage(image, arrow2Config.x, arrow2Config.y, arrow2Config.width, arrow2Config.height, X, Y, width, height)
        rightHand = 1
    }

    if (Listener.state.arrows[3]?.click) {
        let arrow3Config = imageConfig['Arrow-3']
        ctx.drawImage(image, arrow3Config.x, arrow3Config.y, arrow3Config.width, arrow3Config.height, X, Y, width, height)
        if (rightHand == 'UP') rightHand = 2
        else rightHand = 3
    }
    
    let leftHandConfig = imageConfig[`leftHand-${leftHand}`]
    ctx.drawImage(image, leftHandConfig.x, leftHandConfig.y, leftHandConfig.width, leftHandConfig.height, X, Y, width, height)

    let rightHandConfig = imageConfig[`rightHand-${rightHand}`]
    ctx.drawImage(image, rightHandConfig.x, rightHandConfig.y, rightHandConfig.width, rightHandConfig.height, X, Y, width, height)

    ctx.globalAlpha = 1
}