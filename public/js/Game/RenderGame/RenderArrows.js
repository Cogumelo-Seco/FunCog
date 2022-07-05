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
    

    for (let arrowID = 0;arrowID <= amountOfArrows;arrowID++) {
        let arrowImage = game.state.images[`${game.state.notesImageDir}Arrow-${arrowID}.png`]

        let autoClickNote = game.state.musicNotes.find(n => n.autoClick && !n.disabled && n.arrowID == arrowID && n.Y >= 0 && n.Y <= (game.state.holdHeight**resizeNote)*(n.hold/(game.state.holdHeight))+(game.state.holdHeight/2*2))
        if (Listener.state.arrows[arrowID]?.click || autoClickNote) {
            let onNote = Listener.state.arrows[arrowID]?.state == 'onNote' || autoClickNote

            if (onNote || Listener.state.arrows[arrowID]?.state == 'noNote') arrowImage = game.state.images[`${game.state.notesImageDir}Arrow-${arrowID}-press-${onNote ? game.state.animations.arrows.frame : game.state.animations.arrows.frame%2}${onNote ? '' : '-no'}.png`]
            else arrowImage = game.state.images[Listener.state.arrows[arrowID].state.replace(/{{arrowID}}/g, arrowID).replace(/{{frame}}/g, game.state.animations.arrows.frame)]
            /*if (game.state.personalizedNotes[note.type] && onNote) {
                let { newArrowImage, newHoldImage, newHoldEndImage } = await game.state.personalizedNotes[note.type]({ arrowID: note.arrowID })
                arrowImage = newArrowImage ? newArrowImage : arrowImage
                holdImage = newHoldImage ? newHoldImage : holdImage
                holdEndImage = newHoldEndImage ? newHoldEndImage : holdEndImage
            } else arrowImage = game.state.images[`${game.state.notesImageDir}Arrow-${arrowID}-press-${onNote ? game.state.animations.arrows.frame : game.state.animations.arrows.frame%2}${onNote ? '' : '-no'}.png`]*/
            //if (Listener.state.arrows[arrowID]?.state == 'onNoteKill') arrowImage = game.state.images[`Arrows/deathnotes/Arrow-${arrowID}-press-deathnote-${game.state.animations.arrows.frame}.png`]
            //else arrowImage = game.state.images[`${game.state.notesImageDir}Arrow-${arrowID}-press-${onNote ? game.state.animations.arrows.frame : game.state.animations.arrows.frame%2}${onNote ? '' : '-no'}.png`]
        }

        if (arrowImage) {
            ctx.globalAlpha = game.state.arrowsAlpha

            ctx.save()

            let arrowWidth = arrowImage.width**resizeNote
            let arrowHeight = arrowImage.height**resizeNote
            let currentArrowX = arrowX-((arrowImage.width**resizeNote-arrowsSize**resizeNote)/2)+game.state.arrowsXLineMovement
            let currentArrowY = arrowY-((arrowImage.height**resizeNote-arrowsSize**resizeNote)/2)+game.state.arrowsYLineMovement

            ctx.translate(currentArrowX+(arrowWidth/2), currentArrowY+(arrowHeight/2));
            ctx.rotate((game.state.arrowsRotation[arrowID] || 0)*Math.PI/180);
            
            ctx.drawImage(arrowImage, -(arrowWidth/2), -(arrowHeight/2), arrowWidth, arrowHeight)

            ctx.restore()
            if (!arrowImage.id.includes('press')) game.state.positionArrow[arrowID] = arrowX+game.state.arrowsXLineMovement
            ctx.globalAlpha = 1
        }

        arrowX += arrowsSize**resizeNote+spaceBetweenArrows
    }

    let amountOfArrowsOpponent = game.state.amountOfArrowsOpponent
    let resizeNoteOpponent = game.state.resizeNoteOpponent
    let arrowXOpponent = game.state.middleScroll ? canvas.width/6-((arrowsSize**resizeNoteOpponent+spaceBetweenArrows)*(amountOfArrowsOpponent+1)/2) : arrowsSize**resizeNoteOpponent+spaceBetweenArrows
    let arrowYOpponent = game.state.arrowsYLineOpponent

    for (let arrowID = 0;arrowID <= amountOfArrowsOpponent;arrowID++) {
        let arrowImage = game.state.images[`${game.state.notesImageDir}Arrow-${arrowID}.png`]

        let note = game.state.musicOpponentNotes.find(n => !n.disabled && n.arrowID == arrowID && n.Y >= 0 && n.Y <= (game.state.holdHeight**resizeNoteOpponent)*(n.hold/(game.state.holdHeight))+(game.state.holdHeight/2*2))
        if (note) {
            let pressImage = game.state.personalizedNotes[note.type]?.pressImage
            if (pressImage) arrowImage = game.state.images[pressImage.replace(/{{arrowID}}/g, arrowID).replace(/{{frame}}/g, game.state.animations.arrows.frame)]
            else arrowImage = game.state.images[`${game.state.notesImageDir}Arrow-${arrowID}-press-${game.state.animations.arrows.frame}.png`]
        }

        if (arrowImage) {
            ctx.globalAlpha = game.state.arrowsAlphaOpponent

            ctx.save()

            let arrowWidth = arrowImage.width**resizeNoteOpponent
            let arrowHeight = arrowImage.height**resizeNoteOpponent
            let currentArrowX = arrowXOpponent-((arrowImage.width**resizeNoteOpponent-arrowsSize**resizeNoteOpponent)/2)+game.state.arrowsXLineMovementOpponent
            let currentArrowY = arrowYOpponent-((arrowImage.height**resizeNoteOpponent-arrowsSize**resizeNoteOpponent)/2)+game.state.arrowsYLineMovementOpponent

            ctx.translate(currentArrowX+(arrowWidth/2), currentArrowY+(arrowHeight/2));
            ctx.rotate((game.state.arrowsRotationOpponent[arrowID] || 0)*Math.PI/180);
            
            ctx.drawImage(arrowImage, -(arrowWidth/2), -(arrowHeight/2), arrowWidth, arrowHeight)

            ctx.restore()
            if (!arrowImage.id.includes('press')) game.state.positionArrowOpponent[arrowID] = arrowXOpponent+game.state.arrowsXLineMovementOpponent
            ctx.globalAlpha = 1

            /*ctx.globalAlpha = game.state.arrowsAlphaOpponent
            ctx.drawImage(arrowImage, arrowXOpponent-((arrowImage.width**resizeNoteOpponent-arrowsSize**resizeNoteOpponent)/2)+game.state.arrowsXLineMovementOpponent, arrowYOpponent-((arrowImage.height**resizeNoteOpponent-arrowsSize**resizeNoteOpponent)/2)+game.state.arrowsYLineMovementOpponent, arrowImage.width**resizeNoteOpponent, arrowImage.height**resizeNoteOpponent)
            if (!arrowImage.id.includes('press')) game.state.positionArrowOpponent[arrowID] = arrowXOpponent+game.state.arrowsXLineMovementOpponent
            ctx.globalAlpha = 1*/
        }

        arrowXOpponent += arrowsSize**resizeNoteOpponent+spaceBetweenArrows
    }
}