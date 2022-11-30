export default async (canvas, game, Listener) => {
    const ctx = canvas.getContext('2d')

    let amountOfArrows = game.state.amountOfArrows
    let spaceBetweenArrows = game.state.spaceBetweenArrows
    let resizeNote = game.state.resizeNote
    let arrowsSize = game.state.arrowsSize || 100
    if (!game.state.arrowsSize) return game.state.arrowsSize = game.state.images[`Arrows/Arrows.png`]?.animationConfig['Arrow-0']['Arrow-0'].width
    let arrowX = game.state.smallFunctions.getConfig('MiddleScroll') ? canvas.width/2-((arrowsSize**resizeNote+spaceBetweenArrows)*(amountOfArrows+1)/2) : canvas.width-((arrowsSize**resizeNote+spaceBetweenArrows)*(amountOfArrows+2))
    let arrowY = game.state.arrowsYLine
    

    if (game.state.musicInfo.notesImageDir) for (let arrowID = 0;arrowID <= amountOfArrows;arrowID++) {
        let arrowInfo = game.state.arrowsInfo[arrowID]

        let arrowImageData = game.state.images[`${game.state.musicInfo.notesImageDir}Arrows.png`]
        let arrowImage = arrowImageData?.image
        let arrowFrames = arrowImageData?.animationConfig[`Arrow-${arrowID}`]
        if (!arrowFrames) return
        let arrowImagePos = arrowFrames[`Arrow-${arrowID}`]
        
        let splashImageData = game.state.images[arrowInfo?.splashDir]
        let splashImage = splashImageData?.image
        let splashFrames = splashImageData?.animationConfig[`Arrow-${arrowID}`]
        let splashImagePos = splashFrames ? splashFrames[`Arrow-${arrowID}-splash-${arrowInfo.splashFrame}`] : null

        if (arrowInfo && splashFrames && arrowInfo.splashFrame <= Object.keys(splashFrames).length && arrowInfo.splashTime+30 <= +new Date()) {
            arrowInfo.splashFrame += 1
            arrowInfo.splashTime = +new Date()
        }

        if (Listener.state.arrows[arrowID]?.click) {
            let note = game.state.musicNotes.find(n => (n.errorWhenNotClicking || n.autoClick) && !n.disabled && n.arrowID == arrowID && n.Y >= -(game.state.arrowsSize**game.state.resizeNote) && n.Y <= (game.state.holdHeight**resizeNote)*(n.hold/(game.state.holdHeight))+(game.state.holdHeight*2))
            let onNote = Listener.state.arrows[arrowID]?.state == 'onNote' && note ? true : false

            if (Listener.state.arrows[arrowID]?.state == 'onNote' || Listener.state.arrows[arrowID]?.state == 'noNote') arrowImagePos = arrowFrames[`Arrow-${arrowID}-press-${game.state.animations.arrows.frame}${onNote ? '' : '-no'}`]
            else {
                arrowImageData = game.state.images[Listener.state.arrows[arrowID]?.state]
                arrowImage = arrowImageData?.image
                arrowFrames = arrowImageData?.animationConfig[`Arrow-${arrowID}`]
                arrowImagePos = arrowFrames[`Arrow-${arrowID}-press-${game.state.animations.arrows.frame}`] || arrowImagePos
            }
        }

        if (arrowImage && arrowImagePos && arrowInfo) {
            ctx.globalAlpha = arrowInfo.alpha > 1 ? 1 : arrowInfo.alpha < 0 ? 0 : arrowInfo.alpha
            ctx.shadowColor = arrowInfo.shadowColor
            ctx.shadowBlur = arrowInfo.shadowBlur

            ctx.save()
            
            if (arrowInfo.resetX) {
                arrowInfo.X = arrowX
                arrowInfo.defaultX = arrowX
                arrowInfo.resetX = false
            }
            if (arrowInfo.resetY) {
                arrowInfo.Y = arrowY
                arrowInfo.defaultY = arrowY
                arrowInfo.resetY = false
            }

            let arrowWidth = arrowImagePos.width**resizeNote
            let arrowHeight = arrowImagePos.height**resizeNote
            let currentArrowX = arrowInfo.X-((arrowImagePos.width**resizeNote-arrowsSize**resizeNote)/2)
            let currentArrowY = arrowInfo.Y-((arrowImagePos.height**resizeNote-arrowsSize**resizeNote)/2)

            ctx.translate(currentArrowX+(arrowWidth/2), currentArrowY+(arrowHeight/2));
            ctx.rotate((arrowInfo.rotation)*Math.PI/180);
            
            ctx.drawImage(arrowImage, arrowImagePos.x, arrowImagePos.y, arrowImagePos.width, arrowImagePos.height, -(arrowWidth/2), -(arrowHeight/2), arrowWidth, arrowHeight)
            if (splashImage && splashImagePos) ctx.drawImage(splashImage, splashImagePos.x, splashImagePos.y, splashImagePos.width, splashImagePos.height, -((arrowWidth*game.state.musicInfo.splashResize)/2), -((arrowHeight*game.state.musicInfo.splashResize)/2), arrowWidth*game.state.musicInfo.splashResize, arrowHeight*game.state.musicInfo.splashResize)

            ctx.restore()
            ctx.globalAlpha = 1
        }

        arrowX += arrowsSize**resizeNote+spaceBetweenArrows
    }

    let amountOfArrowsOpponent = game.state.amountOfArrowsOpponent
    let resizeNoteOpponent = game.state.resizeNoteOpponent
    let arrowXOpponent = game.state.smallFunctions.getConfig('MiddleScroll') ? canvas.width/6-((arrowsSize**resizeNoteOpponent+spaceBetweenArrows)*(amountOfArrowsOpponent+1)/2) : arrowsSize**resizeNoteOpponent+spaceBetweenArrows
    let arrowYOpponent = game.state.arrowsYLineOpponent

    if (game.state.musicInfo.notesImageDir) for (let arrowID = 0;arrowID <= amountOfArrowsOpponent;arrowID++) {
        let arrowImageData = game.state.images[`${game.state.musicInfo.notesImageDir}Arrows.png`]
        let arrowImage = arrowImageData?.image
        let arrowFrames = arrowImageData?.animationConfig[`Arrow-${arrowID}`]
        if (!arrowFrames) return
        let arrowImagePos = arrowFrames[`Arrow-${arrowID}`]
        
        let arrowInfo = game.state.arrowsInfoOpponent[arrowID]

        let note = game.state.musicOpponentNotes.find(n => (n.errorWhenNotClicking || n.autoClick) && !n.disabled && n.arrowID == arrowID && n.Y >= 0 && n.Y <= (game.state.holdHeight**resizeNoteOpponent)*(n.hold/(game.state.holdHeight))+(game.state.holdHeight*2))
        let onClickNoteOpponent = game.state.musicInfoOpponent.arrows && game.state.musicInfoOpponent.arrows[arrowID]?.click
        if (note || onClickNoteOpponent) {
            let pressImage = game.state.personalizedNotes[note?.type]?.pressImage
            if (pressImage) {
                arrowImageData = game.state.images[Listener.state.arrows[arrowID]?.state]
                arrowImage = arrowImageData?.image
                arrowFrames = arrowImageData?.animationConfig[`Arrow-${arrowID}`]
                arrowImagePos = arrowFrames[`Arrow-${arrowID}-press-${game.state.animations.arrows.frame}`] || arrowImagePos
            } else arrowImagePos = arrowFrames[`Arrow-${arrowID}-press-${game.state.animations.arrows.frame}${onClickNoteOpponent ? '-no' : ''}`]
        }

        if (arrowImage && arrowInfo) {
            ctx.globalAlpha = arrowInfo.alpha > 1 ? 1 : arrowInfo.alpha < 0 ? 0 : arrowInfo.alpha
            ctx.shadowColor = arrowInfo.shadowColor
            ctx.shadowBlur = arrowInfo.shadowBlur

            ctx.save()

            if (arrowInfo.resetX) {
                arrowInfo.X = arrowXOpponent
                arrowInfo.defaultX = arrowXOpponent
                arrowInfo.resetX = false
            }
            if (arrowInfo.resetY) {
                arrowInfo.Y = arrowYOpponent
                arrowInfo.defaultY = arrowYOpponent
                arrowInfo.resetY = false
            }

            let arrowWidth = arrowImagePos.width**resizeNoteOpponent
            let arrowHeight = arrowImagePos.height**resizeNoteOpponent
            let currentArrowX = arrowInfo.X-((arrowImagePos.width**resizeNoteOpponent-arrowsSize**resizeNoteOpponent)/2)
            let currentArrowY = arrowInfo.Y-((arrowImagePos.height**resizeNoteOpponent-arrowsSize**resizeNoteOpponent)/2)

            ctx.translate(currentArrowX+(arrowWidth/2), currentArrowY+(arrowHeight/2));
            ctx.rotate((arrowInfo.rotation)*Math.PI/180);
            
            ctx.drawImage(arrowImage, arrowImagePos.x, arrowImagePos.y, arrowImagePos.width, arrowImagePos.height, -(arrowWidth/2), -(arrowHeight/2), arrowWidth, arrowHeight)

            ctx.restore()
            ctx.globalAlpha = 1
        }

        arrowXOpponent += arrowsSize**resizeNoteOpponent+spaceBetweenArrows
    }

    ctx.shadowBlur = 0;
}