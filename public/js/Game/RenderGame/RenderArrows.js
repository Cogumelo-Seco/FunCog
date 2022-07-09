module.exports = async (canvas, game, Listener) => {
    const ctx = canvas.getContext('2d')

    ctx.fillStyle = 'red'
    //ctx.fillRect(0, game.state.arrowsYLine, canvas.width, 1)

    let amountOfArrows = game.state.amountOfArrows
    let spaceBetweenArrows = game.state.spaceBetweenArrows
    let resizeNote = game.state.resizeNote
    let arrowsSize = game.state.arrowsSize || 100
    if (!game.state.arrowsSize) game.state.arrowsSize = game.state.images[`Arrows/Arrow-0.png`]?.width
    let arrowX = game.state.middleScroll ? canvas.width/2-((arrowsSize**resizeNote+spaceBetweenArrows)*(amountOfArrows+1)/2) : canvas.width-((arrowsSize**resizeNote+spaceBetweenArrows)*(amountOfArrows+2))
    let arrowY = game.state.arrowsYLine
    

    if (game.state.countdown < 0) for (let arrowID = 0;arrowID <= amountOfArrows;arrowID++) {
        let arrowImage = game.state.images[`${game.state.notesImageDir}Arrow-${arrowID}.png`]
        let arrowInfo = game.state.arrowsInfo[arrowID]

        let autoClickNote = game.state.musicNotes.find(n => n.autoClick && !n.disabled && n.arrowID == arrowID && n.Y >= 0 && n.Y <= (game.state.holdHeight**resizeNote)*(n.hold/(game.state.holdHeight))+(game.state.holdHeight/2*2))
        if (Listener.state.arrows[arrowID]?.click || autoClickNote) {
            let onNote = Listener.state.arrows[arrowID]?.state == 'onNote' || autoClickNote

            if (onNote || Listener.state.arrows[arrowID]?.state == 'noNote') arrowImage = game.state.images[`${game.state.notesImageDir}Arrow-${arrowID}-press-${onNote ? game.state.animations.arrows.frame : game.state.animations.arrows.frame%2}${onNote ? '' : '-no'}.png`]
            else arrowImage = game.state.images[Listener.state.arrows[arrowID].state.replace(/{{arrowID}}/g, arrowID).replace(/{{frame}}/g, game.state.animations.arrows.frame)]
        }

        if (arrowImage && arrowInfo) {
            ctx.globalAlpha = arrowInfo.alpha

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

            let arrowWidth = arrowImage.width**resizeNote
            let arrowHeight = arrowImage.height**resizeNote
            let currentArrowX = arrowInfo.X-((arrowImage.width**resizeNote-arrowsSize**resizeNote)/2)
            let currentArrowY = arrowInfo.Y-((arrowImage.height**resizeNote-arrowsSize**resizeNote)/2)

            ctx.translate(currentArrowX+(arrowWidth/2), currentArrowY+(arrowHeight/2));
            ctx.rotate((arrowInfo.rotation)*Math.PI/180);
            
            ctx.drawImage(arrowImage, -(arrowWidth/2), -(arrowHeight/2), arrowWidth, arrowHeight)

            ctx.restore()
            //if (!arrowImage.id.includes('press')) game.state.positionArrow[arrowID] = arrowX
            ctx.globalAlpha = 1
        }

        arrowX += arrowsSize**resizeNote+spaceBetweenArrows
    }

    let amountOfArrowsOpponent = game.state.amountOfArrowsOpponent
    let resizeNoteOpponent = game.state.resizeNoteOpponent
    let arrowXOpponent = game.state.middleScroll ? canvas.width/6-((arrowsSize**resizeNoteOpponent+spaceBetweenArrows)*(amountOfArrowsOpponent+1)/2) : arrowsSize**resizeNoteOpponent+spaceBetweenArrows
    let arrowYOpponent = game.state.arrowsYLineOpponent

    if (game.state.countdown < 0) for (let arrowID = 0;arrowID <= amountOfArrowsOpponent;arrowID++) {
        let arrowImage = game.state.images[`${game.state.notesImageDir}Arrow-${arrowID}.png`]
        let arrowInfo = game.state.arrowsInfoOpponent[arrowID]

        let note = game.state.musicOpponentNotes.find(n => !n.disabled && n.arrowID == arrowID && n.Y >= 0 && n.Y <= (game.state.holdHeight**resizeNoteOpponent)*(n.hold/(game.state.holdHeight))+(game.state.holdHeight/2*2))
        if (note) {
            let pressImage = game.state.personalizedNotes[note.type]?.pressImage
            if (pressImage) arrowImage = game.state.images[pressImage.replace(/{{arrowID}}/g, arrowID).replace(/{{frame}}/g, game.state.animations.arrows.frame)]
            else arrowImage = game.state.images[`${game.state.notesImageDir}Arrow-${arrowID}-press-${game.state.animations.arrows.frame}.png`]
        }

        if (arrowImage && arrowInfo) {
            ctx.globalAlpha = arrowInfo.alpha

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

            let arrowWidth = arrowImage.width**resizeNoteOpponent
            let arrowHeight = arrowImage.height**resizeNoteOpponent
            let currentArrowX = arrowInfo.X-((arrowImage.width**resizeNoteOpponent-arrowsSize**resizeNoteOpponent)/2)
            let currentArrowY = arrowInfo.Y-((arrowImage.height**resizeNoteOpponent-arrowsSize**resizeNoteOpponent)/2)

            ctx.translate(currentArrowX+(arrowWidth/2), currentArrowY+(arrowHeight/2));
            ctx.rotate((arrowInfo.rotation)*Math.PI/180);
            
            ctx.drawImage(arrowImage, -(arrowWidth/2), -(arrowHeight/2), arrowWidth, arrowHeight)

            ctx.restore()
            //if (!arrowImage.id.includes('press')) game.state.positionArrowOpponent[arrowID] = arrowXOpponent
            ctx.globalAlpha = 1

            /*ctx.globalAlpha = game.state.arrowsAlphaOpponent
            ctx.drawImage(arrowImage, arrowXOpponent-((arrowImage.width**resizeNoteOpponent-arrowsSize**resizeNoteOpponent)/2), arrowYOpponent-((arrowImage.height**resizeNoteOpponent-arrowsSize**resizeNoteOpponent)/2), arrowImage.width**resizeNoteOpponent, arrowImage.height**resizeNoteOpponent)
            if (!arrowImage.id.includes('press')) game.state.positionArrowOpponent[arrowID] = arrowXOpponent+
            ctx.globalAlpha = 1*/
        }

        arrowXOpponent += arrowsSize**resizeNoteOpponent+spaceBetweenArrows
    }
}