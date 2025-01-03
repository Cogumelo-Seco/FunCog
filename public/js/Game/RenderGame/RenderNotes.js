export default async (ctx, canvas, game, Listener, functions) => {
    var DownScroll = game.state.smallFunctions.getConfig('DownScroll')
    let middleScroll = game.state.smallFunctions.getConfig('MiddleScroll')

    if (!game.state.holdHeight) game.state.holdHeight = game.state.images[`Arrows/Arrows.png`]?.animationConfig['Arrow-0']['Arrow-0-hold-piece']?.height
    let resizeNote = (game.state.resizeNote*game.state.musicInfo.noteResize)*(1-0.1*(100-game.state.smallFunctions.getConfig('ArrowSize'))/100)
    let arrowY = DownScroll ? canvas.height-game.state.arrowsMargin : game.state.arrowsMargin

    let resizeNoteOpponent = (game.state.resizeNoteOpponent*game.state.musicInfo.noteResize)*(1-0.1*(100-game.state.smallFunctions.getConfig('ArrowSize'))/100)
    let arrowYOpponent = middleScroll ? DownScroll ? (canvas.height-canvas.height/3) : canvas.height/3 : DownScroll ? canvas.height-game.state.arrowsMargin : game.state.arrowsMargin

    let arrowsInfo = game.state.arrowsInfo
    let arrowsInfoOpponent = game.state.arrowsInfoOpponent
    let musicNotes = game.state.musicNotes
    let musicOpponentNotes = game.state.musicOpponentNotes

    for (let i in musicNotes) {
        let note = musicNotes[i]
        let arrowInfo = arrowsInfo[note.arrowID]

        let downScroll = arrowInfo?.forceScroll ? arrowInfo?.forceScrollDown : DownScroll
        let noteY = downScroll ? (arrowInfo?.Y || arrowY)+note.Y : (arrowInfo?.Y || arrowY)-note.Y

        if (arrowInfo && noteY-(note.hold) < canvas.height && noteY+(note.hold) > 0) {
            let arrowImageData = game.state.personalizedNotes[note.type] ? game.state.images[game.state.personalizedNotes[note.type].newArrowImage] : game.state.images[arrowInfo.imageDir || `${game.state.musicInfo.notesImageDir}Arrows.png`]
            let arrowImage = arrowImageData?.image
            let arrowFrames = arrowImageData?.animationConfig[`Arrow-${arrowInfo.arrowFrameID}`]
            if (!arrowFrames) return
            let arrowImagePos = arrowFrames[`Arrow-${arrowInfo.arrowFrameID}-note${game.state.animations[note.type] ? '-'+game.state.animations[note.type]?.frame : ''}`]

            let holdImagePos = arrowFrames[`Arrow-${arrowInfo.arrowFrameID}-hold-piece`]
            let holdEndImagePos = arrowFrames[`Arrow-${arrowInfo.arrowFrameID}-hold-end`]

            ctx.shadowColor = game.state.personalizedNotes[note.type]?.noteShadowColor || arrowInfo.noteShadowColor
            ctx.shadowBlur = game.state.personalizedNotes[note.type]?.noteShadowBlur || arrowInfo.noteShadowBlur

            if (note.hold && arrowImage && holdImagePos && holdEndImagePos && arrowImagePos) {
                let holdY = noteY-(game.state.holdHeight/2)
                let holdX = (arrowInfo.X)+(arrowImagePos.width**resizeNote/2)-(holdImagePos.width**resizeNote/2)
                if (!note.holdHeight) note.holdHeight = game.state.holdHeight

                for (let i = 0;i <= note.hold;i += game.state.holdHeight) {
                    holdY = downScroll ? holdY-(game.state.holdHeight**resizeNote) : holdY+(game.state.holdHeight**resizeNote)
                    let holdYInRelationToTheLine = downScroll ? (holdY+(game.state.holdHeight/2))-arrowInfo?.Y : arrowInfo?.Y-holdY

                    let alphaHUD = game.state.alphaHUD >= 1 ? 1 : game.state.alphaHUD <= 0 ? 0 : game.state.alphaHUD
                    let noteAlpha = arrowInfo.noteAlpha >= 1 ? 1 : arrowInfo.noteAlpha <= 0 ? 0 : arrowInfo.noteAlpha
                    ctx.globalAlpha = holdYInRelationToTheLine > 0 || (note.disabled || (note.time < game.state.musicInfo.oldPauseTime)) ? 0.2 : noteAlpha <= alphaHUD ? noteAlpha : alphaHUD

                    if (note.clicked ? holdYInRelationToTheLine < 0 : true) {
                        if (i+game.state.holdHeight >= note.hold) {
                            let holdWidth = holdEndImagePos.width**resizeNote
                            let holdHeight = holdEndImagePos.height**resizeNote
                            let scaleV = downScroll ? -1 : 1
                            let posY = downScroll ? (holdHeight+holdY) * -1 : holdY

                            ctx.save();
                            ctx.scale(1, scaleV);

                            ctx.drawImage(arrowImage, holdEndImagePos.x, holdEndImagePos.y, holdEndImagePos.width, holdEndImagePos.height, holdX, posY, holdWidth, holdHeight)
                            
                            ctx.restore()
                        } else {
                            ctx.drawImage(arrowImage, holdImagePos.x, holdImagePos.y, holdImagePos.width, game.state.holdHeight, holdX, holdY, holdImagePos.width**resizeNote, game.state.holdHeight**resizeNote+2)
                        }
                    }
                }
            }

            if (!note.clicked && arrowImage || note.clicked && note.Y <= 0 && arrowImage && arrowImagePos) {
                let alphaHUD = game.state.alphaHUD >= 1 ? 1 : game.state.alphaHUD <= 0 ? 0 : game.state.alphaHUD
                let noteAlpha = arrowInfo.noteAlpha >= 1 ? 1 : arrowInfo.noteAlpha <= 0 ? 0 : arrowInfo.noteAlpha
                ctx.globalAlpha = note.Y > 0 || (note.disabled || (note.time < game.state.musicInfo.oldPauseTime)) ? 0.2 : noteAlpha <= alphaHUD ? noteAlpha : alphaHUD

                let currentArrowWidth = arrowImagePos?.width**resizeNote
                let currentArrowHeight = arrowImagePos?.height**resizeNote
                let currentArrowX = arrowInfo.X-((arrowImagePos.width**resizeNote-arrowInfo.width**resizeNote)/2)
                let currentArrowY = noteY-(arrowImagePos.height**resizeNote/2)

                ctx.save()
                ctx.translate(currentArrowX+(currentArrowWidth/2), currentArrowY+(currentArrowHeight/2));
                ctx.rotate((arrowInfo.noteRotation)*Math.PI/180);
                
                ctx.drawImage(arrowImage, arrowImagePos.x, arrowImagePos.y, arrowImagePos.width, arrowImagePos.height, -(currentArrowWidth/2), -(currentArrowHeight/2), currentArrowWidth, currentArrowHeight)

                ctx.restore()
            }

            ctx.globalAlpha = game.state.alphaHUD
            ctx.shadowBlur = 0
        }
    }

    if (game.state.smallFunctions.getConfig('OpponentNotes')) for (let i in musicOpponentNotes) {
        let note = musicOpponentNotes[i]
        let arrowInfo = arrowsInfoOpponent[note.arrowID]

        let downScroll = arrowInfo?.forceScroll ? arrowInfo?.forceScrollDown : DownScroll
        let noteY = downScroll ? (arrowInfo?.Y || arrowYOpponent)+note.Y : (arrowInfo?.Y || arrowYOpponent)-note.Y

        if (arrowInfo && noteY-(note.hold) < canvas.height && noteY+(note.hold) > 0) {
            let arrowImageData = game.state.personalizedNotes[note.type] ? game.state.images[game.state.personalizedNotes[note.type].newArrowImage] : game.state.images[arrowInfo.imageDir || `${game.state.musicInfo.notesImageDir}Arrows.png`]
            let arrowImage = arrowImageData?.image
            let arrowFrames = arrowImageData?.animationConfig[`Arrow-${arrowInfo.arrowFrameID}`]
            if (!arrowFrames) return
            let arrowImagePos = arrowFrames[`Arrow-${arrowInfo.arrowFrameID}-note${game.state.animations[note.type] ? '-'+game.state.animations[note.type]?.frame : ''}`]

            let holdImagePos = arrowFrames[`Arrow-${arrowInfo.arrowFrameID}-hold-piece`]
            let holdEndImagePos = arrowFrames[`Arrow-${arrowInfo.arrowFrameID}-hold-end`]

            ctx.shadowColor = game.state.personalizedNotes[note.type]?.noteShadowColor || arrowInfo.noteShadowColor
            ctx.shadowBlur = game.state.personalizedNotes[note.type]?.noteShadowBlur || arrowInfo.noteShadowBlur

            if (note.hold && arrowImage && holdImagePos && holdEndImagePos && arrowImagePos) {
                let holdY = noteY-(game.state.holdHeight/2)
                let holdX = (arrowInfo.X)+(arrowImagePos.width**resizeNoteOpponent/2)-(holdImagePos.width**resizeNoteOpponent/2)
                if (!note.holdHeight) note.holdHeight = game.state.holdHeight

                for (let i = 0;i <= note.hold;i += game.state.holdHeight) {
                    holdY = downScroll ? holdY-(game.state.holdHeight**resizeNoteOpponent) : holdY+(game.state.holdHeight**resizeNoteOpponent)
                    let holdYInRelationToTheLine = downScroll ? (holdY+(game.state.holdHeight/2))-arrowInfo?.Y : arrowInfo?.Y-holdY
                    
                    let alphaHUD = game.state.alphaHUD >= 1 ? 1 : game.state.alphaHUD <= 0 ? 0 : game.state.alphaHUD
                    let noteAlpha = arrowInfo.noteAlpha >= 1 ? 1 : arrowInfo.noteAlpha <= 0 ? 0 : arrowInfo.noteAlpha
                    ctx.globalAlpha = holdYInRelationToTheLine > 0 || (note.disabled || (note.time < game.state.musicInfo.oldPauseTime)) ? 0.2 : noteAlpha <= alphaHUD ? noteAlpha : alphaHUD

                    if (note.clicked ? holdYInRelationToTheLine < 0 : true) {
                        if (i+game.state.holdHeight >= note.hold) {
                            let holdWidth = holdEndImagePos.width**resizeNoteOpponent
                            let holdHeight = holdEndImagePos.height**resizeNoteOpponent
                            let scaleV = downScroll ? -1 : 1
                            let posY = downScroll ? (holdHeight+holdY) * -1 : holdY

                            ctx.save();
                            ctx.scale(1, scaleV);

                            ctx.drawImage(arrowImage, holdEndImagePos.x, holdEndImagePos.y, holdEndImagePos.width, holdEndImagePos.height, holdX, posY, holdWidth, holdHeight)
                            
                            ctx.restore()
                        } else {
                            ctx.drawImage(arrowImage, holdImagePos.x, holdImagePos.y, holdImagePos.width, game.state.holdHeight, holdX, holdY-2, holdImagePos.width**resizeNoteOpponent, game.state.holdHeight**resizeNoteOpponent+2)
                        }
                    }
                }
            }

            if (!note.clicked && arrowImage || note.clicked && note.Y <= 0 && arrowImage && arrowImagePos) {
                let alphaHUD = game.state.alphaHUD >= 1 ? 1 : game.state.alphaHUD <= 0 ? 0 : game.state.alphaHUD
                let noteAlpha = arrowInfo.noteAlpha >= 1 ? 1 : arrowInfo.noteAlpha <= 0 ? 0 : arrowInfo.noteAlpha
                ctx.globalAlpha = note.Y > 0 || (note.disabled || (note.time < game.state.musicInfo.oldPauseTime)) ? 0.2 : noteAlpha <= alphaHUD ? noteAlpha : alphaHUD

                let currentArrowWidth = arrowImagePos?.width**resizeNoteOpponent
                let currentArrowHeight = arrowImagePos?.height**resizeNoteOpponent
                let currentArrowX = arrowInfo.X-((arrowImagePos.width**resizeNoteOpponent-arrowInfo.width**resizeNoteOpponent)/2)
                let currentArrowY = noteY-(arrowImagePos.height**resizeNoteOpponent/2)

                ctx.save()
                ctx.translate(currentArrowX+(currentArrowWidth/2), currentArrowY+(currentArrowHeight/2));
                ctx.rotate((arrowInfo.noteRotation)*Math.PI/180);
                
                ctx.drawImage(arrowImage, arrowImagePos.x, arrowImagePos.y, arrowImagePos.width, arrowImagePos.height, -(currentArrowWidth/2), -(currentArrowHeight/2), currentArrowWidth, currentArrowHeight)

                ctx.restore()
            }

            ctx.globalAlpha = game.state.alphaHUD
            ctx.shadowBlur = 0
        }
    }
}