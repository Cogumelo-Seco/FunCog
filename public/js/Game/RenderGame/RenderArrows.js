module.exports = async (canvas, game, Listener) => {
    const ctx = canvas.getContext('2d')

    ctx.fillStyle = 'red'
    //ctx.fillRect(0, game.state.arrowsYLine, canvas.width, 1)

    let amountOfArrows = game.state.amountOfArrows
    let spaceBetweenArrows = game.state.spaceBetweenArrows
    let resizeNote = game.state.resizeNote
    let arrowsSize = game.state.arrowsSize || 100
    if (!game.state.arrowsSize) game.state.arrowsSize = game.state.images[`Arrows/Arrow-0.png`]?.width
    let arrowX = canvas.width/2-((arrowsSize**resizeNote+spaceBetweenArrows)*(amountOfArrows+1)/2)
    let arrowY = game.state.arrowsYLine
    

    for (let arrowID = 0;arrowID <= amountOfArrows;arrowID++) {
        let arrowImage = game.state.images[`Arrows/Arrow-${arrowID}.png`]

        if (Listener.state.arrows[arrowID]?.click) {
            let onNote = Listener.state.arrows[arrowID]?.state != 'onNote'
            arrowImage = game.state.images[`Arrows/Arrow-${arrowID}-press-${onNote ? game.state.animations.arrows.frame+2 : game.state.animations.arrows.frame}.png`]
        }

        if (arrowImage) {
            ctx.drawImage(arrowImage, arrowX-((arrowImage.height**resizeNote-arrowsSize**resizeNote)/2), arrowY-((arrowImage.width**resizeNote-arrowsSize**resizeNote)/2), arrowImage.width**resizeNote, arrowImage.height**resizeNote)
            if (!arrowImage.id.includes('press')) game.state.positionArrow[arrowID] = arrowX
        }

        arrowX += arrowsSize**resizeNote+spaceBetweenArrows
    }

    let amountOfArrowsOpponent = game.state.amountOfArrowsOpponent
    let resizeNoteOpponent = game.state.resizeNoteOpponent
    let arrowXOpponent = canvas.width/6-((arrowsSize**resizeNoteOpponent+spaceBetweenArrows)*(amountOfArrowsOpponent+1)/2)
    let arrowYOpponent = game.state.arrowsYLineOpponent

    for (let arrowID = 0;arrowID <= amountOfArrowsOpponent;arrowID++) {
        let arrowImage = game.state.images[`Arrows/Arrow-${arrowID}.png`]

        if (game.state.musicOpponentNotes.filter(n => n.arrowID == arrowID && n.Y >= 0 && n.Y <= n.hold * (resizeNoteOpponent-0.1) ** resizeNoteOpponent)[0]) arrowImage = game.state.images[`Arrows/Arrow-${arrowID}-press-${game.state.animations.arrows.frame}.png`]

        if (arrowImage) {
            ctx.drawImage(arrowImage, arrowXOpponent-((arrowImage.height**resizeNoteOpponent-arrowsSize**resizeNoteOpponent)/2), arrowYOpponent-((arrowImage.width**resizeNoteOpponent-arrowsSize**resizeNoteOpponent)/2), arrowImage.width**resizeNoteOpponent, arrowImage.height**resizeNoteOpponent)
            if (!arrowImage.id.includes('press')) game.state.positionArrowOpponent[arrowID] = arrowXOpponent
        }

        arrowXOpponent += arrowsSize**resizeNoteOpponent+spaceBetweenArrows
    }
}