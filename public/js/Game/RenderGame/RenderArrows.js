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

        if (Listener.state.arrows[arrowID]?.click) {
            let onNote = Listener.state.arrows[arrowID]?.state == 'onNote'
            if (Listener.state.arrows[arrowID]?.state == 'onNoteKill') arrowImage = game.state.images[`Arrows/deathnotes/Arrow-${arrowID}-press-deathnote-${game.state.animations.arrows.frame}.png`]
            else arrowImage = game.state.images[`${game.state.notesImageDir}Arrow-${arrowID}-press-${onNote ? game.state.animations.arrows.frame : game.state.animations.arrows.frame%2}${onNote ? '' : '-no'}.png`]
        }

        if (arrowImage) {
            ctx.drawImage(arrowImage, arrowX-((arrowImage.width**resizeNote-arrowsSize**resizeNote)/2)+game.state.arrowsXLineMovement, arrowY-((arrowImage.height**resizeNote-arrowsSize**resizeNote)/2)+game.state.arrowsYLineMovement, arrowImage.width**resizeNote, arrowImage.height**resizeNote)
            if (!arrowImage.id.includes('press')) game.state.positionArrow[arrowID] = arrowX+game.state.arrowsXLineMovement
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
            if (note.type == 'hitKill' || note.type == 'fireNote') arrowImage = game.state.images[`Arrows/deathnotes/Arrow-${arrowID}-press-deathnote-${game.state.animations.arrows.frame}.png`]
            else arrowImage = game.state.images[`${game.state.notesImageDir}Arrow-${arrowID}-press-${game.state.animations.arrows.frame}.png`]
        }

        if (arrowImage) {
            ctx.drawImage(arrowImage, arrowXOpponent-((arrowImage.width**resizeNoteOpponent-arrowsSize**resizeNoteOpponent)/2)+game.state.arrowsXLineMovementOpponent, arrowYOpponent-((arrowImage.height**resizeNoteOpponent-arrowsSize**resizeNoteOpponent)/2)+game.state.arrowsYLineMovementOpponent, arrowImage.width**resizeNoteOpponent, arrowImage.height**resizeNoteOpponent)
            if (!arrowImage.id.includes('press')) game.state.positionArrowOpponent[arrowID] = arrowXOpponent+game.state.arrowsXLineMovementOpponent
        }

        arrowXOpponent += arrowsSize**resizeNoteOpponent+spaceBetweenArrows
    }
}