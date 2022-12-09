export default async (canvas, game, Listener) => {
    const ctx = canvas.getContext('2d')

    let performanceMode = game.state.smallFunctions.getConfig('PerformanceMode')

    if (!game.state.holdHeight) game.state.holdHeight = game.state.images[`Arrows/Arrows.png`]?.animationConfig['Arrow-0']['Arrow-0-hold-piece']?.height
    let arrowsSize = game.state.arrowsSize || 100
    let resizeNote = game.state.resizeNote
    let arrowY = game.state.arrowsYLine

    for (let i in game.state.musicNotes) {
        let note = game.state.musicNotes[i]
        let arrowInfo = game.state.arrowsInfo[note.arrowID]
        
        let noteY = game.state.smallFunctions.getConfig('DownScroll') ? (arrowInfo?.Y || arrowY)+note.Y : (arrowInfo?.Y || arrowY)-note.Y

        if (noteY-(note.hold) < canvas.height && noteY+(note.hold) > -game.state.arrowsSize && arrowInfo) {
            let arrowImageData = game.state.personalizedNotes[note.type] ? game.state.images[game.state.personalizedNotes[note.type].newArrowImage] : game.state.images[`${game.state.musicInfo.notesImageDir}Arrows.png`]
            let arrowImage = arrowImageData?.image
            let arrowFrames = arrowImageData?.animationConfig[`Arrow-${note.arrowID}`]
            if (!arrowFrames) return
            let arrowImagePos = arrowFrames[`Arrow-${note.arrowID}-note${game.state.animations[note.type] ? '-'+game.state.animations[note.type]?.frame : ''}`]
            
            let holdImagePos = arrowFrames[`Arrow-${note.arrowID}-hold-piece`]
            let holdEndImagePos = arrowFrames[`Arrow-${note.arrowID}-hold-end`]

            ctx.shadowColor = game.state.personalizedNotes[note.type]?.noteShadowColor || arrowInfo.noteShadowColor
            ctx.shadowBlur = game.state.personalizedNotes[note.type]?.noteShadowBlur || arrowInfo.noteShadowBlur

            if (note.hold && arrowImage && holdImagePos && holdEndImagePos && arrowImagePos) {
                let holdY = noteY
                let holdX = (arrowInfo.X-((arrowImagePos.width**resizeNote-arrowsSize**resizeNote)/2))+(arrowImagePos.width**resizeNote/2)-(holdImagePos.width**resizeNote/2)
                let holdYInRelationToTheLine = null
                if (!note.holdHeight) note.holdHeight = holdImagePos.height

                for (let i = 0;i <= note.hold;i += holdImagePos?.height) {
                    holdY = game.state.smallFunctions.getConfig('DownScroll') ? holdY-(holdImagePos.height**resizeNote) : holdY+(holdImagePos.height**resizeNote)
                    holdYInRelationToTheLine = game.state.smallFunctions.getConfig('DownScroll') ? holdY-arrowY : (arrowY+(arrowImagePos.height**resizeNote/2))-holdY
                    ctx.globalAlpha = holdYInRelationToTheLine > 0 || note.disabled ? 0.2 : arrowInfo.noteAlpha > 1 ? 1 : arrowInfo.noteAlpha < 0 ? 0 : game.state.alphaHUD == 1 ? arrowInfo.noteAlpha : arrowInfo.noteAlpha == 1 ? game.state.alphaHUD : 0

                    if (note.clicked ? holdYInRelationToTheLine < 0 : true) {
                        if (i+holdImagePos?.height >= note.hold) {
                            let holdWidth = holdEndImagePos.width**resizeNote
                            let holdHeight = holdEndImagePos.height**resizeNote
                            let scaleV = game.state.smallFunctions.getConfig('DownScroll') ? -1 : 1
                            let posY = game.state.smallFunctions.getConfig('DownScroll') ? (holdHeight+holdY) * -1 : holdY

                            ctx.save();
                            ctx.scale(1, scaleV);

                            ctx.drawImage(arrowImage, holdEndImagePos.x, holdEndImagePos.y, holdEndImagePos.width, holdEndImagePos.height, holdX, posY, holdWidth, holdHeight)
                            
                            ctx.restore()
                        } else {
                            ctx.drawImage(arrowImage, holdImagePos.x, holdImagePos.y, holdImagePos.width, holdImagePos.height, holdX, holdY, holdImagePos.width**resizeNote, holdImagePos.height**resizeNote)
                        }
                    }
                }
            }

            if (!note.clicked && arrowImage || note.clicked && note.Y <= 0 && arrowImage && arrowImagePos) {
                ctx.globalAlpha = note.Y > 0 || note.disabled ? 0.2 : arrowInfo.noteAlpha > 1 ? 1 : arrowInfo.noteAlpha < 0 ? 0 : game.state.alphaHUD == 1 ? arrowInfo.noteAlpha : arrowInfo.noteAlpha == 1 ? game.state.alphaHUD : 0

                let arrowWidth = arrowImagePos?.width**resizeNote
                let arrowHeight = arrowImagePos?.height**resizeNote
                let currentArrowX = arrowInfo.X-((arrowWidth-arrowsSize**resizeNote)/2)
                let currentArrowY = noteY-((arrowHeight-arrowsSize**resizeNote)/2)

                ctx.save()
                ctx.translate(currentArrowX+(arrowWidth/2), currentArrowY+(arrowHeight/2));
                ctx.rotate((arrowInfo.rotation)*Math.PI/180);
                
                ctx.drawImage(arrowImage, arrowImagePos.x, arrowImagePos.y, arrowImagePos.width, arrowImagePos.height, -(arrowWidth/2), -(arrowHeight/2), arrowWidth, arrowHeight)

                ctx.restore()
            }

            ctx.globalAlpha = game.state.alphaHUD
            ctx.shadowBlur = 0
        }
    }

    let arrowYOpponent = game.state.arrowsYLineOpponent
    let resizeNoteOpponent = game.state.resizeNoteOpponent

    if (game.state.smallFunctions.getConfig('OpponentNotes') && !performanceMode) for (let i in game.state.musicOpponentNotes) {
        let note = game.state.musicOpponentNotes[i]
        let arrowInfo = game.state.arrowsInfoOpponent[note.arrowID]
        
        let noteY = game.state.smallFunctions.getConfig('DownScroll') ? (arrowInfo?.Y || arrowYOpponent)+note.Y : (arrowInfo?.Y || arrowYOpponent)-note.Y

        if (noteY-(note.hold) < canvas.height && noteY+(note.hold) > -game.state.arrowsSize && arrowInfo) {
            let arrowImageData = game.state.personalizedNotes[note.type] ? game.state.images[game.state.personalizedNotes[note.type].newArrowImage] : game.state.images[`${game.state.musicInfo.notesImageDir}Arrows.png`]
            let arrowImage = arrowImageData?.image
            let arrowImageHold = arrowImageData?.image
            let arrowFrames = arrowImageData?.animationConfig[`Arrow-${note.arrowID}`]
            if (!arrowFrames) return
            let arrowImagePos = arrowFrames[`Arrow-${note.arrowID}-note${game.state.animations[note.type] ? '-'+game.state.animations[note.type]?.frame : ''}`]
            let holdImagePos = arrowFrames[`Arrow-${note.arrowID}-hold-piece`]
            let holdEndImagePos = arrowFrames[`Arrow-${note.arrowID}-hold-end`]

            ctx.shadowColor = game.state.personalizedNotes[note.type]?.noteShadowColor || arrowInfo.noteShadowColor
            ctx.shadowBlur = game.state.personalizedNotes[note.type]?.noteShadowBlur || arrowInfo.noteShadowBlur

            if (note.hold && arrowImage && holdImagePos && holdEndImagePos && arrowImagePos) {
                let holdY = noteY
                let holdX = (arrowInfo.X-((arrowImagePos.width**resizeNoteOpponent-arrowsSize**resizeNoteOpponent)/2))+(arrowImagePos.width**resizeNoteOpponent/2)-(holdImagePos.width**resizeNoteOpponent/2)
                let holdYInRelationToTheLine = null
                if (!note.holdHeight) note.holdHeight = holdImagePos.height

                for (let i = 0;i <= note.hold;i += holdImagePos?.height) {
                    holdY = game.state.smallFunctions.getConfig('DownScroll') ? holdY-(holdImagePos.height**resizeNoteOpponent) : holdY+holdImagePos.height**resizeNoteOpponent
                    holdYInRelationToTheLine = game.state.smallFunctions.getConfig('DownScroll') ? holdY-arrowYOpponent : (arrowYOpponent+(arrowImagePos.height**resizeNoteOpponent/2))-holdY
                    ctx.globalAlpha = holdYInRelationToTheLine > 0 || note.disabled ? 0.2 : arrowInfo.noteAlpha > 1 ? 1 : arrowInfo.noteAlpha < 0 ? 0 : game.state.alphaHUD == 1 ? arrowInfo.noteAlpha : arrowInfo.noteAlpha == 1 ? game.state.alphaHUD : 0

                    if (note.clicked ? holdYInRelationToTheLine < 0 : true) {
                        if (i+holdImagePos?.height >= note.hold) {
                            let holdWidth = holdEndImagePos.width**resizeNoteOpponent
                            let holdHeight = holdEndImagePos.height**resizeNoteOpponent
                            let scaleV = game.state.smallFunctions.getConfig('DownScroll') ? -1 : 1
                            let posY = game.state.smallFunctions.getConfig('DownScroll') ? (holdHeight+holdY) * -1 : holdY

                            ctx.save();
                            ctx.scale(1, scaleV);

                            ctx.drawImage(arrowImageHold, holdEndImagePos.x, holdEndImagePos.y, holdEndImagePos.width, holdEndImagePos.height, holdX, posY, holdWidth, holdHeight)

                            ctx.restore()
                        } else ctx.drawImage(arrowImageHold, holdImagePos.x, holdImagePos.y, holdImagePos.width, holdImagePos.height, holdX, holdY, holdImagePos.width**resizeNoteOpponent, holdImagePos.height**resizeNoteOpponent)
                    }
                }
            }

            if (!note.clicked && arrowImage || note.clicked && note.Y <= 0 && arrowImage && arrowImagePos) {
                ctx.globalAlpha = note.Y > 0 || note.disabled ? 0.2 : arrowInfo.noteAlpha > 1 ? 1 : arrowInfo.noteAlpha < 0 ? 0 : game.state.alphaHUD == 1 ? arrowInfo.noteAlpha : arrowInfo.noteAlpha == 1 ? game.state.alphaHUD : 0
                
                let arrowWidth = arrowImagePos?.width**resizeNoteOpponent
                let arrowHeight = arrowImagePos?.height**resizeNoteOpponent
                let currentArrowX = arrowInfo.X-((arrowWidth-arrowsSize**resizeNoteOpponent)/2)
                let currentArrowY = noteY-((arrowHeight-arrowsSize**resizeNoteOpponent)/2)

                ctx.save()
                ctx.translate(currentArrowX+(arrowWidth/2), currentArrowY+(arrowHeight/2));
                ctx.rotate((arrowInfo.rotation)*Math.PI/180);
                
                ctx.drawImage(arrowImage, arrowImagePos.x, arrowImagePos.y, arrowImagePos?.width, arrowImagePos?.height, -(arrowWidth/2), -(arrowHeight/2), arrowWidth, arrowHeight)

                ctx.restore()
            }

            ctx.globalAlpha = 1
            ctx.shadowBlur = 0
        }
    }
}