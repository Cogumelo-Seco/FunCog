export default async (canvas, game, Listener) => {
    const ctx = canvas.getContext('2d')

    let performanceMode = game.state.smallFunctions.getConfig('PerformanceMode')

    if (!game.state.holdHeight) game.state.holdHeight = game.state.images[`Arrows/Arrows.png`]?.animationConfig['Arrow-0']['Arrow-0-hold-piece']?.height
    let resizeNote = game.state.resizeNote
    
    let arrowY = game.state.smallFunctions.getConfig('DownScroll') ? canvas.height-game.state.arrowsYLineMargin : game.state.arrowsYLineMargin

    for (let i in game.state.musicNotes) {
        let note = game.state.musicNotes[i]
        let arrowInfo = game.state.arrowsInfo[note.arrowID]

        let noteY = game.state.smallFunctions.getConfig('DownScroll') ? (arrowInfo?.Y || arrowY)+note.Y : (arrowInfo?.Y || arrowY)-note.Y

        if (arrowInfo && noteY-(note.hold) < canvas.height && noteY+(note.hold) > -arrowInfo.height) {
            let arrowImageData = game.state.personalizedNotes[note.type] ? game.state.images[game.state.personalizedNotes[note.type].newArrowImage] : game.state.images[arrowInfo.imageDir || `${game.state.musicInfo.notesImageDir}Arrows.png`]
            let arrowImage = arrowImageData?.image
            let arrowFrames = arrowImageData?.animationConfig[`Arrow-${note.arrowID}`]
            if (!arrowFrames) return
            let arrowImagePos = arrowFrames[`Arrow-${note.arrowID}-note${game.state.animations[note.type] ? '-'+game.state.animations[note.type]?.frame : ''}`]

            let holdImagePos = arrowFrames[`Arrow-${note.arrowID}-hold-piece`]
            let holdEndImagePos = arrowFrames[`Arrow-${note.arrowID}-hold-end`]

            ctx.shadowColor = game.state.personalizedNotes[note.type]?.noteShadowColor || arrowInfo.noteShadowColor
            ctx.shadowBlur = game.state.personalizedNotes[note.type]?.noteShadowBlur || arrowInfo.noteShadowBlur

            if (note.hold && arrowImage && holdImagePos && holdEndImagePos && arrowImagePos) {
                let holdY = noteY-(holdImagePos.height/2)
                let holdX = (arrowInfo.X)+(arrowImagePos.width**resizeNote/2)-(holdImagePos.width**resizeNote/2)
                let holdYInRelationToTheLine = null
                if (!note.holdHeight) note.holdHeight = holdImagePos.height

                for (let i = 0;i <= note.hold;i += holdImagePos?.height) {
                    holdY = game.state.smallFunctions.getConfig('DownScroll') ? holdY-(holdImagePos.height**resizeNote) : holdY+(holdImagePos.height**resizeNote)
                    holdYInRelationToTheLine = game.state.smallFunctions.getConfig('DownScroll') ? (holdY+(holdImagePos.height/2))-arrowInfo?.Y : arrowInfo?.Y-holdY
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

                let currentArrowWidth = arrowImagePos?.width**resizeNote
                let currentArrowHeight = arrowImagePos?.height**resizeNote
                let currentArrowX = arrowInfo.X
                let currentArrowY = noteY-(arrowImagePos.height**resizeNote/2)

                ctx.save()
                ctx.translate(currentArrowX+(currentArrowWidth/2), currentArrowY+(currentArrowHeight/2));
                ctx.rotate((arrowInfo.rotation)*Math.PI/180);
                
                ctx.drawImage(arrowImage, arrowImagePos.x, arrowImagePos.y, arrowImagePos.width, arrowImagePos.height, -(currentArrowWidth/2), -(currentArrowHeight/2), currentArrowWidth, currentArrowHeight)

                ctx.restore()
            }

            ctx.globalAlpha = game.state.alphaHUD
            ctx.shadowBlur = 0
        }
    }

    let resizeNoteOpponent = game.state.resizeNoteOpponent
    
    let arrowYOpponent = game.state.smallFunctions.getConfig('DownScroll') ? (canvas.height-canvas.height/3) : canvas.height/3

    if (!performanceMode && game.state.smallFunctions.getConfig('OpponentNotes')) for (let i in game.state.musicOpponentNotes) {
        let note = game.state.musicOpponentNotes[i]
        let arrowInfo = game.state.arrowsInfoOpponent[note.arrowID]

        let noteY = game.state.smallFunctions.getConfig('DownScroll') ? (arrowInfo?.Y || arrowYOpponent)+note.Y : (arrowInfo?.Y || arrowYOpponent)-note.Y

        if (arrowInfo && noteY-(note.hold) < canvas.height && noteY+(note.hold) > -arrowInfo.height) {
            let arrowImageData = game.state.personalizedNotes[note.type] ? game.state.images[game.state.personalizedNotes[note.type].newArrowImage] : game.state.images[arrowInfo.imageDir || `${game.state.musicInfo.notesImageDir}Arrows.png`]
            let arrowImage = arrowImageData?.image
            let arrowFrames = arrowImageData?.animationConfig[`Arrow-${note.arrowID}`]
            if (!arrowFrames) return
            let arrowImagePos = arrowFrames[`Arrow-${note.arrowID}-note${game.state.animations[note.type] ? '-'+game.state.animations[note.type]?.frame : ''}`]

            let holdImagePos = arrowFrames[`Arrow-${note.arrowID}-hold-piece`]
            let holdEndImagePos = arrowFrames[`Arrow-${note.arrowID}-hold-end`]

            ctx.shadowColor = game.state.personalizedNotes[note.type]?.noteShadowColor || arrowInfo.noteShadowColor
            ctx.shadowBlur = game.state.personalizedNotes[note.type]?.noteShadowBlur || arrowInfo.noteShadowBlur

            if (note.hold && arrowImage && holdImagePos && holdEndImagePos && arrowImagePos) {
                let holdY = noteY-(holdImagePos.height/2)
                let holdX = (arrowInfo.X)+(arrowImagePos.width**resizeNoteOpponent/2)-(holdImagePos.width**resizeNoteOpponent/2)
                let holdYInRelationToTheLine = null
                if (!note.holdHeight) note.holdHeight = holdImagePos.height

                for (let i = 0;i <= note.hold;i += holdImagePos?.height) {
                    holdY = game.state.smallFunctions.getConfig('DownScroll') ? holdY-(holdImagePos.height**resizeNoteOpponent) : holdY+(holdImagePos.height**resizeNoteOpponent)
                    holdYInRelationToTheLine = game.state.smallFunctions.getConfig('DownScroll') ? (holdY+(holdImagePos.height/2))-arrowInfo?.Y : arrowInfo?.Y-holdY
                    ctx.globalAlpha = holdYInRelationToTheLine > 0 || note.disabled ? 0.2 : arrowInfo.noteAlpha > 1 ? 1 : arrowInfo.noteAlpha < 0 ? 0 : game.state.alphaHUD == 1 ? arrowInfo.noteAlpha : arrowInfo.noteAlpha == 1 ? game.state.alphaHUD : 0

                    if (note.clicked ? holdYInRelationToTheLine < 0 : true) {
                        if (i+holdImagePos?.height >= note.hold) {
                            let holdWidth = holdEndImagePos.width**resizeNoteOpponent
                            let holdHeight = holdEndImagePos.height**resizeNoteOpponent
                            let scaleV = game.state.smallFunctions.getConfig('DownScroll') ? -1 : 1
                            let posY = game.state.smallFunctions.getConfig('DownScroll') ? (holdHeight+holdY) * -1 : holdY

                            ctx.save();
                            ctx.scale(1, scaleV);

                            ctx.drawImage(arrowImage, holdEndImagePos.x, holdEndImagePos.y, holdEndImagePos.width, holdEndImagePos.height, holdX, posY, holdWidth, holdHeight)
                            
                            ctx.restore()
                        } else {
                            ctx.drawImage(arrowImage, holdImagePos.x, holdImagePos.y, holdImagePos.width, holdImagePos.height, holdX, holdY, holdImagePos.width**resizeNoteOpponent, holdImagePos.height**resizeNoteOpponent)
                        }
                    }
                }
            }

            if (!note.clicked && arrowImage || note.clicked && note.Y <= 0 && arrowImage && arrowImagePos) {
                ctx.globalAlpha = note.Y > 0 || note.disabled ? 0.2 : arrowInfo.noteAlpha > 1 ? 1 : arrowInfo.noteAlpha < 0 ? 0 : game.state.alphaHUD == 1 ? arrowInfo.noteAlpha : arrowInfo.noteAlpha == 1 ? game.state.alphaHUD : 0

                let currentArrowWidth = arrowImagePos?.width**resizeNoteOpponent
                let currentArrowHeight = arrowImagePos?.height**resizeNoteOpponent
                let currentArrowX = arrowInfo.X
                let currentArrowY = noteY-(arrowImagePos.height**resizeNoteOpponent/2)

                ctx.save()
                ctx.translate(currentArrowX+(currentArrowWidth/2), currentArrowY+(currentArrowHeight/2));
                ctx.rotate((arrowInfo.rotation)*Math.PI/180);
                
                ctx.drawImage(arrowImage, arrowImagePos.x, arrowImagePos.y, arrowImagePos.width, arrowImagePos.height, -(currentArrowWidth/2), -(currentArrowHeight/2), currentArrowWidth, currentArrowHeight)

                ctx.restore()
            }

            ctx.globalAlpha = game.state.alphaHUD
            ctx.shadowBlur = 0
        }
    }
}