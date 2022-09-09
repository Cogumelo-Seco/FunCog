export default async (canvas, game, Listener) => {
    const ctx = canvas.getContext('2d')

    if (!game.state.holdHeight) game.state.holdHeight = game.state.images[`Arrows/Arrow-0.png`]?.height
    let arrowsSize = game.state.arrowsSize || 100
    let resizeNote = game.state.resizeNote
    let arrowY = game.state.arrowsYLine

    if (game.state.countdown < 0) for (let i in game.state.musicNotes) {
        let note = game.state.musicNotes[i]
        let arrowInfo = game.state.arrowsInfo[note.arrowID]

        if (note.autoClick && note.Y >= 0 && !note.clicked && !note.disabled) note.clicked = true
        
        let noteY = game.state.downScroll ? (arrowInfo?.Y || arrowY)+note.Y : (arrowInfo?.Y || arrowY)-note.Y

        if (noteY-(note.hold) < canvas.height && noteY+(note.hold) > -game.state.arrowsSize && arrowInfo) {
            let arrowImage = game.state.images[`${game.state.notesImageDir}Arrow-${note.arrowID}-note.png`]
            let holdImage = game.state.images[`${game.state.notesImageDir}Arrow-${note.arrowID}-hold-piece.png`]
            let holdEndImage = game.state.images[`${game.state.notesImageDir}Arrow-${note.arrowID}-hold-end.png`]

            if (game.state.personalizedNotes[note.type]) {
                let newArrowImage = game.state.personalizedNotes[note.type].newArrowImage
                let newHoldImage = game.state.personalizedNotes[note.type].newHoldImage
                let newHoldEndImage = game.state.personalizedNotes[note.type].newHoldEndImage
                arrowImage = newArrowImage ? game.state.images[newArrowImage.replace(/{{arrowID}}/g, note.arrowID).replace(/{{frame}}/g, game.state.animations[note.type]?.frame)] : arrowImage
                holdImage = newHoldImage ? game.state.images[newHoldImage.replace(/{{arrowID}}/g, note.arrowID).replace(/{{frame}}/g, game.state.animations[note.type]?.frame)] : holdImage
                holdEndImage = newHoldEndImage ? game.state.images[newHoldEndImage.replace(/{{arrowID}}/g, note.arrowID).replace(/{{frame}}/g, game.state.animations[note.type]?.frame)] : holdEndImage
            }

            if (note.hold && arrowImage && holdImage && holdEndImage) {
                let holdY = noteY
                let holdX = arrowInfo.X+(arrowImage.height**resizeNote/2)-(holdImage.width**resizeNote/2)
                let holdYInRelationToTheLine = null
                if (!note.holdHeight) note.holdHeight = holdImage.height

                for (let i = 0;i <= note.hold;i += holdImage?.height) {
                    holdY = game.state.downScroll ? holdY-(holdImage.height**resizeNote) : holdY+(holdImage.height**resizeNote)
                    holdYInRelationToTheLine = game.state.downScroll ? holdY-arrowY : arrowY-holdY
                    ctx.globalAlpha = holdYInRelationToTheLine > 0 || note.disabled ? 0.2 : arrowInfo.noteAlpha

                    if (note.clicked ? holdYInRelationToTheLine < 0 : true) {
                        if (i+holdImage?.height >= note.hold) {
                            let holdWidth = holdEndImage.width**resizeNote
                            let holdHeight = holdEndImage.height**resizeNote
                            let scaleV = game.state.downScroll ? -1 : 1
                            let posY = game.state.downScroll ? (holdHeight+holdY) * -1 : holdY

                            ctx.save();
                            ctx.scale(1, scaleV);

                            ctx.drawImage(holdEndImage, holdX, posY, holdWidth, holdHeight)
                            
                            ctx.restore()
                        } else ctx.drawImage(holdImage, holdX, holdY, holdImage.width**resizeNote, holdImage.height**resizeNote)
                    }
                }
            }

            if (!note.clicked && arrowImage || note.clicked && note.Y <= 0 && arrowImage) {
                ctx.globalAlpha = note.Y > 0 || note.disabled ? 0.2 : arrowInfo.noteAlpha

                let arrowWidth = arrowImage.width**resizeNote
                let arrowHeight = arrowImage.height**resizeNote
                let currentArrowX = arrowInfo.X-((arrowImage.width**resizeNote-arrowsSize**resizeNote)/2)
                let currentArrowY = noteY-((arrowImage.height**resizeNote-arrowsSize**resizeNote)/2)

                ctx.save()
                ctx.translate(currentArrowX+(arrowWidth/2), currentArrowY+(arrowHeight/2));
                ctx.rotate((arrowInfo.rotation)*Math.PI/180);
                
                ctx.drawImage(arrowImage, -(arrowWidth/2), -(arrowHeight/2), arrowWidth, arrowHeight)

                ctx.restore()
            }

            ctx.globalAlpha = 1
        }
    }

    let arrowYOpponent = game.state.arrowsYLineOpponent
    let resizeNoteOpponent = game.state.resizeNoteOpponent

    if (game.state.countdown < 0) for (let i in game.state.musicOpponentNotes) {
        let note = game.state.musicOpponentNotes[i]
        let arrowInfo = game.state.arrowsInfoOpponent[note.arrowID]
        
        let noteY = game.state.downScroll ? (arrowInfo?.Y || arrowYOpponent)+note.Y : (arrowInfo?.Y || arrowYOpponent)-note.Y
        if (note.Y >= 0 && game.state.opponentArrows[note.arrowID] && !note.clicked && !note.disabled && note.errorWhenNotClicking) {
            game.state.musicEventListener('noteClick', { noteClickAuthor: 'bot' }, game.state)
            note.clicked = true
            if (game.state.musicInfo.health > 5 && game.state.music?.currentTime > 1) game.state.musicInfo.health -= 0.15
        }

        if (noteY-(note.hold) < canvas.height && noteY+(note.hold) > -game.state.arrowsSize && arrowInfo) {
            let arrowImage = game.state.images[`${game.state.notesImageDir}Arrow-${note.arrowID}-note.png`]
            let holdImage = game.state.images[`${game.state.notesImageDir}Arrow-${note.arrowID}-hold-piece.png`]
            let holdEndImage = game.state.images[`${game.state.notesImageDir}Arrow-${note.arrowID}-hold-end.png`]

            if (game.state.personalizedNotes[note.type]) {
                let newArrowImage = game.state.personalizedNotes[note.type].newArrowImage
                let newHoldImage = game.state.personalizedNotes[note.type].newHoldImage
                let newHoldEndImage = game.state.personalizedNotes[note.type].newHoldEndImage
                arrowImage = newArrowImage ? game.state.images[newArrowImage.replace(/{{arrowID}}/g, note.arrowID).replace(/{{frame}}/g, game.state.animations[note.type]?.frame)] : arrowImage
                holdImage = newHoldImage ? game.state.images[newHoldImage.replace(/{{arrowID}}/g, note.arrowID).replace(/{{frame}}/g, game.state.animations[note.type]?.frame)] : holdImage
                holdEndImage = newHoldEndImage ? game.state.images[newHoldEndImage.replace(/{{arrowID}}/g, note.arrowID).replace(/{{frame}}/g, game.state.animations[note.type]?.frame)] : holdEndImage
            }

            if (note.hold && arrowImage && holdImage && holdEndImage) {
                let holdY = noteY
                let holdX = arrowInfo.X+(arrowImage.height**resizeNoteOpponent/2)-(holdImage.width**resizeNoteOpponent/2)
                let holdYInRelationToTheLine = null
                if (!note.holdHeight) note.holdHeight = holdImage.height

                for (let i = 0;i <= note.hold;i += holdImage?.height) {
                    holdY = game.state.downScroll ? holdY-(holdImage.height**resizeNoteOpponent) : holdY+holdImage.height**resizeNoteOpponent
                    holdYInRelationToTheLine = game.state.downScroll ? holdY-arrowYOpponent : arrowYOpponent-holdY
                    ctx.globalAlpha = holdYInRelationToTheLine > 0 || note.disabled ? 0.2 : arrowInfo.noteAlpha

                    if (note.clicked ? holdYInRelationToTheLine < 0 : true) {
                        if (i+holdImage?.height >= note.hold) {
                            let holdWidth = holdEndImage.width**resizeNoteOpponent
                            let holdHeight = holdEndImage.height**resizeNoteOpponent
                            let scaleV = game.state.downScroll ? -1 : 1
                            let posY = game.state.downScroll ? (holdHeight+holdY) * -1 : holdY

                            ctx.save();
                            ctx.scale(1, scaleV);

                            ctx.drawImage(holdEndImage, holdX, posY, holdWidth, holdHeight)

                            ctx.restore()
                        } else ctx.drawImage(holdImage, holdX, holdY, holdImage.width**resizeNoteOpponent, holdImage.height**resizeNoteOpponent)
                    }
                }
            }

            if (!note.clicked && arrowImage || note.clicked && note.Y <= 0 && arrowImage) {
                ctx.globalAlpha = note.Y > 0 || note.disabled ? 0.2 : arrowInfo.noteAlpha
                
                let arrowWidth = arrowImage.width**resizeNoteOpponent
                let arrowHeight = arrowImage.height**resizeNoteOpponent
                let currentArrowX = arrowInfo.X-((arrowImage.width**resizeNoteOpponent-arrowsSize**resizeNoteOpponent)/2)
                let currentArrowY = noteY-((arrowImage.height**resizeNoteOpponent-arrowsSize**resizeNoteOpponent)/2)

                ctx.save()
                ctx.translate(currentArrowX+(arrowWidth/2), currentArrowY+(arrowHeight/2));
                ctx.rotate((arrowInfo.rotation)*Math.PI/180);
                
                ctx.drawImage(arrowImage, -(arrowWidth/2), -(arrowHeight/2), arrowWidth, arrowHeight)

                ctx.restore()
            }

            ctx.globalAlpha = 1
        }
    }
}