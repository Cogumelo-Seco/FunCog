export default async (canvas, game, Listener) => {
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
        let arrowInfo = game.state.arrowsInfo[arrowID]
        let arrowImage = game.state.images[`${game.state.musicInfo.notesImageDir}Arrow-${arrowID}.png`]
        let splashInfo = game.state.splash[arrowInfo?.splashType]//[game.state.musicInfo.splashType]

        let splashImage = game.state.images[splashInfo?.dir.replace(/{{arrowID}}/g, arrowID).replace(/{{frame}}/g, arrowInfo?.splashFrame)]
        if (arrowInfo && splashInfo && arrowInfo.splashFrame <= arrowInfo.splashMaxFrame && arrowInfo.splashTime+40 <= +new Date()) {
            arrowInfo.splashMaxFrame = splashInfo.maxFrame
            arrowInfo.splashFrame += 1
            arrowInfo.splashTime = +new Date()
        } //else if (game.state.musicInfo.splashType != game.state.musicInfo.splashDefaultType) game.state.musicInfo.splashType = game.state.musicInfo.splashDefaultType

        let autoClickNote = game.state.musicNotes.find(n => 
            n.autoClick && !n.disabled && n.arrowID == arrowID && n.Y >= 0 && n.Y <= (game.state.holdHeight**resizeNote)*(n.hold/(game.state.holdHeight))+(game.state.holdHeight/2) ||
            game.state.botPlay && n.errorWhenNotClicking && !n.disabled && n.arrowID == arrowID && n.Y >= 0 && n.Y <= (game.state.holdHeight**resizeNote)*(n.hold/(game.state.holdHeight))+(game.state.holdHeight/2)
        )

        if (game.state.botPlay) Listener.state.arrows[arrowID].click = false
        if (Listener.state.arrows[arrowID]?.click || autoClickNote) {
            if (game.state.botPlay) {
                if (!autoClickNote.clicked) game.verifyClick({ arrowID, listenerState: Listener.state, bot: true })
                Listener.state.arrows[arrowID].state = 'onNote'
                Listener.state.arrows[arrowID].click = true
            }
            /*
                if (!autoClickNote.clicked) {
                    autoClickNote.clicked = true
                    game.state.musicEventListener('noteClick', { noteClickAuthor: 'player', note: autoClickNote }, game.state)
                    
                    game.state.animations.ratingImage.frame = 0
                    game.state.calculateRating(0)
                    game.state.musicInfo.accuracyMedia = [ 100 ]
                    game.state.musicInfo.hitNote = Math.random()*10-5
                    game.state.musicInfo.score += 200
    
                    game.state.musicInfo.health += 2
                    game.state.musicInfo.combo += 1
                } else {
                    game.state.musicInfo.health += 0.05
                }
            }*/
            let onNote = Listener.state.arrows[arrowID]?.state == 'onNote' || autoClickNote

            if (onNote || Listener.state.arrows[arrowID]?.state == 'noNote') arrowImage = game.state.images[`${game.state.musicInfo.notesImageDir}Arrow-${arrowID}-press-${onNote ? game.state.animations.arrows.frame : game.state.animations.arrows.frame%2}${onNote ? '' : '-no'}.png`]
            else arrowImage = game.state.images[Listener.state.arrows[arrowID].state.replace(/{{arrowID}}/g, arrowID).replace(/{{frame}}/g, game.state.animations.arrows.frame)]
        }

        if (arrowImage && arrowInfo) {
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

            let arrowWidth = arrowImage.width**resizeNote
            let arrowHeight = arrowImage.height**resizeNote
            let currentArrowX = arrowInfo.X-((arrowImage.width**resizeNote-arrowsSize**resizeNote)/2)
            let currentArrowY = arrowInfo.Y-((arrowImage.height**resizeNote-arrowsSize**resizeNote)/2)

            ctx.translate(currentArrowX+(arrowWidth/2), currentArrowY+(arrowHeight/2));
            ctx.rotate((arrowInfo.rotation)*Math.PI/180);
            
            if (game.state.countdown < 0) {
                ctx.drawImage(arrowImage, -(arrowWidth/2), -(arrowHeight/2), arrowWidth, arrowHeight)
                if (splashImage) ctx.drawImage(splashImage, -((arrowWidth*game.state.musicInfo.splashResize)/2), -((arrowHeight*game.state.musicInfo.splashResize)/2), arrowWidth*game.state.musicInfo.splashResize, arrowHeight*game.state.musicInfo.splashResize)
            }

            ctx.restore()
            ctx.globalAlpha = 1
        }

        arrowX += arrowsSize**resizeNote+spaceBetweenArrows
    }

    let amountOfArrowsOpponent = game.state.amountOfArrowsOpponent
    let resizeNoteOpponent = game.state.resizeNoteOpponent
    let arrowXOpponent = game.state.middleScroll ? canvas.width/6-((arrowsSize**resizeNoteOpponent+spaceBetweenArrows)*(amountOfArrowsOpponent+1)/2) : arrowsSize**resizeNoteOpponent+spaceBetweenArrows
    let arrowYOpponent = game.state.arrowsYLineOpponent

    for (let arrowID = 0;arrowID <= amountOfArrowsOpponent;arrowID++) {
        let arrowImage = game.state.images[`${game.state.musicInfo.notesImageDir}Arrow-${arrowID}.png`]
        let arrowInfo = game.state.arrowsInfoOpponent[arrowID]

        let note = game.state.musicOpponentNotes.find(n => n.errorWhenNotClicking && !n.disabled && n.arrowID == arrowID && n.Y >= 0 && n.Y <= (game.state.holdHeight**resizeNoteOpponent)*(n.hold/(game.state.holdHeight))+(game.state.holdHeight/2))
        let onClickNoteOpponent = game.state.musicInfoOpponent.arrows && game.state.musicInfoOpponent.arrows[arrowID]?.click
        if (note || onClickNoteOpponent) {
            let pressImage = game.state.personalizedNotes[note?.type]?.pressImage
            if (pressImage) arrowImage = game.state.images[pressImage.replace(/{{arrowID}}/g, arrowID).replace(/{{frame}}/g, game.state.animations.arrows.frame)]
            else arrowImage = game.state.images[`${game.state.musicInfo.notesImageDir}Arrow-${arrowID}-press-${note ? game.state.animations.arrows.frame : game.state.animations.arrows.frame%2}${note ? '' : '-no'}.png`]//arrowImage = game.state.images[`${game.state.musicInfo.notesImageDir}Arrow-${arrowID}-press-${game.state.animations.arrows.frame}.png`]
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

            let arrowWidth = arrowImage.width**resizeNoteOpponent
            let arrowHeight = arrowImage.height**resizeNoteOpponent
            let currentArrowX = arrowInfo.X-((arrowImage.width**resizeNoteOpponent-arrowsSize**resizeNoteOpponent)/2)
            let currentArrowY = arrowInfo.Y-((arrowImage.height**resizeNoteOpponent-arrowsSize**resizeNoteOpponent)/2)

            ctx.translate(currentArrowX+(arrowWidth/2), currentArrowY+(arrowHeight/2));
            ctx.rotate((arrowInfo.rotation)*Math.PI/180);
            
            if (game.state.countdown < 0)  ctx.drawImage(arrowImage, -(arrowWidth/2), -(arrowHeight/2), arrowWidth, arrowHeight)

            ctx.restore()
            ctx.globalAlpha = 1
        }

        arrowXOpponent += arrowsSize**resizeNoteOpponent+spaceBetweenArrows
    }

    ctx.shadowBlur = 0;
}