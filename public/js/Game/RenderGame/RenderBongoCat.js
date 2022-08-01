module.exports = async (canvas, game, Listener) => {
    const ctx = canvas.getContext('2d')

    let bg = game.state.images['BongoCat/bg.png']
    if (!game.state.botPlay || !bg) return
    let width = bg.width*0.5
    let height = bg.height*0.5
    let X = game.state.middleScroll ? canvas.width-width-20 : canvas.width/2-(width/2)
    let Y = canvas.height/2-(height/2)

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
    
    if (bg) ctx.drawImage(bg, X, Y, width, height)

    if (arrow0 && Listener.state.arrows[0]?.click) {
        ctx.drawImage(arrow0, X, Y, width, height)
        leftHand = 1
    }

    if (arrow1 && Listener.state.arrows[1]?.click) {
        ctx.drawImage(arrow1, X, Y, width, height)
        if (!leftHand) leftHand = 2
        else leftHand = 3
    }

    if (arrow2 && Listener.state.arrows[2]?.click) {
        ctx.drawImage(arrow2, X, Y, width, height)
        rightHand = 1
    }

    if (arrow3 && Listener.state.arrows[3]?.click) {
        ctx.drawImage(arrow3, X, Y, width, height)
        if (!rightHand) rightHand = 2
        else rightHand = 3
    }

    if (leftHands[leftHand]) ctx.drawImage(leftHands[leftHand], X, Y, width, height)
    else ctx.drawImage(leftHandUp, X, Y, width, height)

    if (rightHands[rightHand]) ctx.drawImage(rightHands[rightHand], X, Y, width, height)
    else ctx.drawImage(rightHandUp, X, Y, width, height)
}