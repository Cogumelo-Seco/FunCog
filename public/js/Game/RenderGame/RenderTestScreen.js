export default async (canvas, game, Listener) => {
    const ctx = canvas.getContext('2d')

    let imageData = game.state.images['BongoCat/BongoCat.png']
    let image = imageData.image
    let imageConfig = imageData.animationConfig

    let bgConfig = imageConfig.bg
    let width = bgConfig.width*0.5
    let height = bgConfig.height*0.5
    let X = game.state.smallFunctions.getConfig('MiddleScroll') ? canvas.width-width-20 : canvas.width/2-(width/2)
    let Y = canvas.height/2-(height/2)

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
/*

    /*let bg = game.state.images['BongoCat/bg.png']
    //if (!game.state.botPlay || !bg) return
    let width = bg.image.width*0.5
    let height = bg.image.height*0.5
    let X = 0//game.state.smallFunctions.getConfig('MiddleScroll') ? canvas.width-width-20 : canvas.width/2-(width/2)
    let Y = 0//canvas.height/2-(height/2)

    let leftHand = false
    let rightHand = false

    let arrow0 = game.state.images['BongoCat/arrow-0.png']
    let arrow1 = game.state.images['BongoCat/arrow-1.png']
    let arrow2 = game.state.images['BongoCat/arrow-2.png']
    let arrow3 = game.state.images['BongoCat/arrow-3.png']

    let leftHands = {
        1: game.state.images['BongoCat/leftHand1.png'],
        2: game.state.images['BongoCat/leftHand2.png'],
        3: game.state.images['BongoCat/leftHand3.png'],
    }
    let rightHands = {
        1: game.state.images['BongoCat/rightHand1.png'],
        2: game.state.images['BongoCat/rightHand2.png'],
        3: game.state.images['BongoCat/rightHand3.png'],
    }
    let leftHandUp = game.state.images['BongoCat/leftHandUp.png']
    let rightHandUp = game.state.images['BongoCat/rightHandUp.png']
    
    if (bg) ctx.drawImage(bg.image, X, Y, width, height)

    if (arrow0 && Listener.state.arrows[0]?.click) {
        ctx.drawImage(arrow0.image, X, Y, width, height)
        leftHand = 1
    }

    if (arrow1 && Listener.state.arrows[1]?.click) {
        ctx.drawImage(arrow1.image, X, Y, width, height)
        if (!leftHand) leftHand = 2
        else leftHand = 3
    }

    if (arrow2 && Listener.state.arrows[2]?.click) {
        ctx.drawImage(arrow2.image, X, Y, width, height)
        rightHand = 1
    }

    if (arrow3 && Listener.state.arrows[3]?.click) {
        ctx.drawImage(arrow3.image, X, Y, width, height)
        if (!rightHand) rightHand = 2
        else rightHand = 3
    }

    if (leftHands[leftHand]) ctx.drawImage(leftHands[leftHand].image, X, Y, width, height)
    else ctx.drawImage(leftHandUp.image, X, Y, width, height)

    if (rightHands[rightHand]) ctx.drawImage(rightHands[rightHand].image, X, Y, width, height)
    else ctx.drawImage(rightHandUp.image, X, Y, width, height)*/
}