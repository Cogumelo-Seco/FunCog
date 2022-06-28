module.exports = async (canvas, game, Listener) => {
    const ctx = canvas.getContext('2d')

    let arrowsSize = game.state.arrowsSize || 100
    let resizeNote = game.state.resizeNote
    let arrowY = game.state.arrowsYLine

    for (let i in game.state.musicNotes) {
        let note = game.state.musicNotes[i]
        
        let noteY = game.state.downScroll ? arrowY+note.Y : arrowY-note.Y

        if (noteY-(note.hold) < canvas.height && noteY+(note.hold) > -game.state.arrowsSize) {
            let arrowImage = game.state.images[`Arrows/Arrow-${note.arrowID}-note.png`]
            let holdImage = game.state.images[`Arrows/Arrow-${note.arrowID}-hold-piece.png`]
            let holdEndImage = game.state.images[`Arrows/Arrow-${note.arrowID}-hold-end.png`]

            if (note.hold && arrowImage && holdImage && holdEndImage) {
                ctx.fillStyle = 'purple'
                let holdY = noteY
                let holdX = game.state.positionArrow[note.arrowID]+(arrowImage.height**resizeNote/2)-(holdImage.width**resizeNote/2)
                let holdYInRelationToTheLine = null
                if (!note.holdHeight) note.holdHeight = holdImage.height

                //for (let i = 0;i < note.hold*(game.state.musicBPM**0.01)-(holdImage?.width**resizeNote*6)/***game.state.resizeNote*/;i += holdImage?.width**resizeNote) {
                for (let i = 0;i < note.hold * (resizeNote-0.1) ** resizeNote;i += holdImage?.width**resizeNote) {
                    holdY = game.state.downScroll ? holdY-(holdImage.height**resizeNote) : holdY+holdImage.height**resizeNote
                    holdYInRelationToTheLine = game.state.downScroll ? holdY-arrowY : arrowY-holdY
                    ctx.globalAlpha = holdYInRelationToTheLine > 0 || note.disabled ? 0.3 : 1

                    if (note.clicked ? holdYInRelationToTheLine < 0 : true)
                        ctx.drawImage(holdImage, holdX, holdY, holdImage.width**resizeNote, holdImage.height**resizeNote)
                }

                if (note.clicked ? holdYInRelationToTheLine < 0 : true) {
                    holdY = game.state.downScroll ? holdY-(holdImage.height**resizeNote) : holdY+holdImage.height**resizeNote
                    ctx.save()

                    let degRotate = game.state.downScroll ? 180 : 0
                    let newHoldX = game.state.downScroll ? 0 : -(holdEndImage.width**resizeNote)
                    let newHoldY = game.state.downScroll ? 0 : -(holdEndImage.height**resizeNote)

                    ctx.setTransform(1, 0, 0, 1, holdX+(holdEndImage.width**resizeNote), holdY+(holdEndImage.height**resizeNote));
                    ctx.rotate(degRotate*Math.PI/180);

                    ctx.drawImage(holdEndImage, newHoldX, newHoldY, holdEndImage.width**resizeNote, holdEndImage.height**resizeNote)

                    ctx.restore()
                }
            }

            if (!note.clicked && arrowImage) {
                ctx.globalAlpha = note.Y > 0 ? 0.3 : 1
                ctx.drawImage(arrowImage, game.state.positionArrow[note.arrowID], noteY, arrowImage.width**resizeNote, arrowImage.height**resizeNote)
            }

            ctx.globalAlpha = 1
        }
    }

    let arrowYOpponent = game.state.arrowsYLineOpponent
    let resizeNoteOpponent = game.state.resizeNoteOpponent

    for (let i in game.state.musicOpponentNotes) {
        let note = game.state.musicOpponentNotes[i]
        
        let noteY = game.state.downScroll ? arrowYOpponent+note.Y : arrowYOpponent-note.Y
        if (note.Y >= 0 && game.state.opponentArrows[note.arrowID]) note.clicked = true

        if (noteY-(note.hold) < canvas.height && noteY+(note.hold) > -game.state.arrowsSize) {
            let arrowImage = game.state.images[`Arrows/Arrow-${note.arrowID}-note.png`]
            let holdImage = game.state.images[`Arrows/Arrow-${note.arrowID}-hold-piece.png`]
            let holdEndImage = game.state.images[`Arrows/Arrow-${note.arrowID}-hold-end.png`]

            if (note.hold && arrowImage && holdImage && holdEndImage) {
                ctx.fillStyle = 'purple'
                let holdY = noteY
                let holdX = game.state.positionArrowOpponent[note.arrowID]+(arrowImage.height**resizeNoteOpponent/2)-(holdImage.width**resizeNoteOpponent/2)
                let holdYInRelationToTheLine = null
                if (!note.holdHeight) note.holdHeight = holdImage.height

                for (let i = 0;i < note.hold * (resizeNoteOpponent-0.1) ** resizeNoteOpponent;i += holdImage?.width**resizeNoteOpponent) {
                    holdY = game.state.downScroll ? holdY-(holdImage.height**resizeNoteOpponent) : holdY+holdImage.height**resizeNoteOpponent
                    holdYInRelationToTheLine = game.state.downScroll ? holdY-arrowYOpponent : arrowYOpponent-holdY

                    if (note.clicked ? holdYInRelationToTheLine < 0 : true) 
                        ctx.drawImage(holdImage, holdX, holdY, holdImage.width**resizeNoteOpponent, holdImage.height**resizeNoteOpponent)
                }

                if (note.clicked ? holdYInRelationToTheLine < 0 : true) {
                    holdY = game.state.downScroll ? holdY-(holdImage.height**resizeNoteOpponent) : holdY+holdImage.height**resizeNoteOpponent
                    ctx.save()

                    let degRotate = game.state.downScroll ? 180 : 0
                    let newHoldX = game.state.downScroll ? 0 : -(holdEndImage.width**resizeNoteOpponent)
                    let newHoldY = game.state.downScroll ? 0 : -(holdEndImage.height**resizeNoteOpponent)

                    ctx.setTransform(1, 0, 0, 1, holdX+(holdEndImage.width**resizeNoteOpponent), holdY+(holdEndImage.height**resizeNoteOpponent));
                    ctx.rotate(degRotate*Math.PI/180);

                    ctx.drawImage(holdEndImage, newHoldX, newHoldY, holdEndImage.width**resizeNoteOpponent, holdEndImage.height**resizeNoteOpponent)

                    ctx.restore()
                }
            }

            if (!note.clicked && arrowImage) 
                ctx.drawImage(arrowImage, game.state.positionArrowOpponent[note.arrowID], noteY, arrowImage.width**resizeNoteOpponent, arrowImage.height**resizeNoteOpponent)
        }
    }
}