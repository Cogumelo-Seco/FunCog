module.exports = async (canvas, game, Listener) => {
    const ctx = canvas.getContext('2d')

    if (!game.state.holdHeight) game.state.holdHeight = game.state.images[`Arrows/Arrow-0.png`]?.height
    let arrowsSize = game.state.arrowsSize || 100
    let resizeNote = game.state.resizeNote
    let arrowY = game.state.arrowsYLine

    for (let i in game.state.musicNotes) {
        let note = game.state.musicNotes[i]

        //note.Y = -(game.state.arrowsSize**game.state.resizeNote*1.5)
        
        let noteY = game.state.downScroll ? arrowY+note.Y : arrowY-note.Y

        if (noteY-(note.hold) < canvas.height && noteY+(note.hold) > -game.state.arrowsSize) {
            let arrowImage = game.state.images[`${game.state.notesImageDir}Arrow-${note.arrowID}-note.png`]
            let holdImage = game.state.images[`${game.state.notesImageDir}Arrow-${note.arrowID}-hold-piece.png`]
            let holdEndImage = game.state.images[`${game.state.notesImageDir}Arrow-${note.arrowID}-hold-end.png`]

            if (note.type == 'hitKill') arrowImage = game.state.images[`Arrows/deathnotes/Arrow-${note.arrowID}-deathnote-${game.state.animations.deathnotes.frame}.png`]
            if (note.type == 'fireNote') arrowImage = game.state.images[`Arrows/firenotes/Arrow-${note.arrowID}-firenote-${game.state.animations.firenotes.frame}.png`]
            if (note.type == 'hurtNote') {
                arrowImage = game.state.images[`Arrows/hurtnotes/Arrow-${note.arrowID}-hurtnote.png`]
                holdImage = game.state.images[`Arrows/hurtnotes/Arrow-hurtnote-hold-piece.png`]
                holdEndImage = game.state.images[`Arrows/hurtnotes/Arrow-hurtnote-hold-end.png`]
            }

            if (note.hold && arrowImage && holdImage && holdEndImage) {
                let holdY = noteY
                let holdX = game.state.positionArrow[note.arrowID]+(arrowImage.height**resizeNote/2)-(holdImage.width**resizeNote/2)
                let holdYInRelationToTheLine = null
                if (!note.holdHeight) note.holdHeight = holdImage.height

                for (let i = 0;i <= note.hold;i += holdImage?.height) {
                    holdY = game.state.downScroll ? holdY-(holdImage.height**resizeNote) : holdY+(holdImage.height**resizeNote)
                    holdYInRelationToTheLine = game.state.downScroll ? holdY-arrowY : arrowY-holdY
                    ctx.globalAlpha = holdYInRelationToTheLine > 0 || note.disabled ? 0.2 : 1

                    if (note.clicked ? holdYInRelationToTheLine < 0 : true) {
                        if (i+holdImage?.height >= note.hold) {
                            ctx.save()

                            let degRotate = game.state.downScroll ? 180 : 0
                            let newHoldX = game.state.downScroll ? 0 : -(holdEndImage.width**resizeNote)
                            let newHoldY = game.state.downScroll ? 0 : -(holdEndImage.height**resizeNote)

                            ctx.setTransform(1, 0, 0, 1, holdX+(holdEndImage.width**resizeNote), holdY+(holdEndImage.height**resizeNote));
                            ctx.rotate(degRotate*Math.PI/180);

                            ctx.drawImage(holdEndImage, newHoldX, newHoldY, holdEndImage.width**resizeNote, holdEndImage.height**resizeNote)

                            ctx.restore()
                        } else ctx.drawImage(holdImage, holdX, holdY, holdImage.width**resizeNote, holdImage.height**resizeNote)
                    }
                }
            }

            if (!note.clicked && arrowImage || note.clicked && note.Y <= 0 && arrowImage) {
                ctx.globalAlpha = note.Y > 0 || note.disabled ? 0.2 : 1
                ctx.drawImage(arrowImage, game.state.positionArrow[note.arrowID]-((arrowImage.width**resizeNote-arrowsSize**resizeNote)/2), noteY-((arrowImage.height**resizeNote-arrowsSize**resizeNote)/2), arrowImage.width**resizeNote, arrowImage.height**resizeNote)
            }

            ctx.globalAlpha = 1
        }
    }

    let arrowYOpponent = game.state.arrowsYLineOpponent
    let resizeNoteOpponent = game.state.resizeNoteOpponent

    for (let i in game.state.musicOpponentNotes) {
        let note = game.state.musicOpponentNotes[i]
        
        let noteY = game.state.downScroll ? arrowYOpponent+note.Y : arrowYOpponent-note.Y
        if (note.Y >= 0 && game.state.opponentArrows[note.arrowID] && !note.clicked && !note.disabled) {
            game.state.musicEventListener('noteClick', { noteClickAuthor: 'bot' }, game.state)
            note.clicked = true
        }

        if (noteY-(note.hold) < canvas.height && noteY+(note.hold) > -game.state.arrowsSize) {
            let arrowImage = game.state.images[`${game.state.notesImageDir}Arrow-${note.arrowID}-note.png`]
            let holdImage = game.state.images[`${game.state.notesImageDir}Arrow-${note.arrowID}-hold-piece.png`]
            let holdEndImage = game.state.images[`${game.state.notesImageDir}Arrow-${note.arrowID}-hold-end.png`]

            if (note.type == 'hitKill') arrowImage = game.state.images[`Arrows/deathnotes/Arrow-${note.arrowID}-deathnote-${game.state.animations.deathnotes.frame}.png`]
            if (note.type == 'fireNote') arrowImage = game.state.images[`Arrows/firenotes/Arrow-${note.arrowID}-firenote-${game.state.animations.firenotes.frame}.png`]
            if (note.type == 'hurtNote') {
                arrowImage = game.state.images[`Arrows/hurtnotes/Arrow-${note.arrowID}-hurtnote.png`]
                holdImage = game.state.images[`Arrows/hurtnotes/Arrow-hurtnote-hold-piece.png`]
                holdEndImage = game.state.images[`Arrows/hurtnotes/Arrow-hurtnote-hold-end.png`]
            }
            ctx.globalAlpha = note.disabled ? 0.2 : 1

            if (note.hold && arrowImage && holdImage && holdEndImage) {
                let holdY = noteY
                let holdX = game.state.positionArrowOpponent[note.arrowID]+(arrowImage.height**resizeNoteOpponent/2)-(holdImage.width**resizeNoteOpponent/2)
                let holdYInRelationToTheLine = null
                if (!note.holdHeight) note.holdHeight = holdImage.height

                for (let i = 0;i <= note.hold;i += holdImage?.height) {
                    holdY = game.state.downScroll ? holdY-(holdImage.height**resizeNoteOpponent) : holdY+holdImage.height**resizeNoteOpponent
                    holdYInRelationToTheLine = game.state.downScroll ? holdY-arrowYOpponent : arrowYOpponent-holdY

                    if (note.clicked ? holdYInRelationToTheLine < 0 : true) {
                        if (i+holdImage?.height >= note.hold) {
                            ctx.save()

                            let degRotate = game.state.downScroll ? 180 : 0
                            let newHoldX = game.state.downScroll ? 0 : -(holdEndImage.width**resizeNoteOpponent)
                            let newHoldY = game.state.downScroll ? 0 : -(holdEndImage.height**resizeNoteOpponent)
        
                            ctx.setTransform(1, 0, 0, 1, holdX+(holdEndImage.width**resizeNoteOpponent), holdY+(holdEndImage.height**resizeNoteOpponent));
                            ctx.rotate(degRotate*Math.PI/180);
        
                            ctx.drawImage(holdEndImage, newHoldX, newHoldY, holdEndImage.width**resizeNoteOpponent, holdEndImage.height**resizeNoteOpponent)
        
                            ctx.restore()
                        } else ctx.drawImage(holdImage, holdX, holdY, holdImage.width**resizeNoteOpponent, holdImage.height**resizeNoteOpponent)
                    }
                }
            }

            if (!note.clicked && arrowImage || note.clicked && note.Y <= 0 && arrowImage)
                ctx.drawImage(arrowImage, game.state.positionArrowOpponent[note.arrowID]-((arrowImage.width**resizeNoteOpponent-arrowsSize**resizeNoteOpponent)/2), noteY, arrowImage.width**resizeNoteOpponent, arrowImage.height**resizeNoteOpponent)

            ctx.globalAlpha = 1
        }
    }
}