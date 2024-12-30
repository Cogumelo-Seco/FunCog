export default async (ctx, canvas, game, Listener, functions) => {
    let invertArrowPos = game.state.invertArrowPos

    let onNotesSplashes = game.state.smallFunctions.getConfig('Splashes')
    let downScroll = game.state.smallFunctions.getConfig('DownScroll')
    let middleScroll = game.state.smallFunctions.getConfig('MiddleScroll')

    let resizeNote = (game.state.resizeNote*game.state.musicInfo.noteResize)*(1-0.1*(100-game.state.smallFunctions.getConfig('ArrowSize'))/100)
    let spaceBetweenArrows = game.state.smallFunctions.getConfig('SpaceBetweenArrows')**resizeNote*game.state.musicInfo.spaceBetweenArrowsAdd
    let arrowsWidth = game.state.arrowsWidth

    let arrowX = middleScroll ? canvas.width/2-(arrowsWidth/2) : invertArrowPos ? canvas.width/4-arrowsWidth/2 : canvas.width-(arrowsWidth+(canvas.width/4-arrowsWidth/2))
    let arrowY = downScroll ? canvas.height-game.state.arrowsMargin : game.state.arrowsMargin+20

    game.state.arrowsWidth = 0

    let resizeNoteOpponent = (game.state.resizeNoteOpponent*game.state.musicInfo.noteResize)*(1-0.1*(100-game.state.smallFunctions.getConfig('ArrowSize'))/100)
    let spaceBetweenArrowsOpponent = game.state.smallFunctions.getConfig('SpaceBetweenArrows')**resizeNoteOpponent*game.state.musicInfo.spaceBetweenArrowsAdd
    let arrowsWidthOpponent = game.state.arrowsWidthOpponent

    let arrowXOpponent = middleScroll ? invertArrowPos ? canvas.width-canvas.width/6-(arrowsWidthOpponent/2) : canvas.width/6-(arrowsWidthOpponent/2) : invertArrowPos ? canvas.width-(arrowsWidthOpponent+(canvas.width/4-arrowsWidthOpponent/2)) : canvas.width/4-arrowsWidthOpponent/2
    let arrowYOpponent = middleScroll ? downScroll ? (canvas.height-canvas.height/3) : canvas.height/3 : downScroll ? canvas.height-game.state.arrowsMargin : game.state.arrowsMargin+20

    game.state.arrowsWidthOpponent = 0

    let arrowsInfo = Object.values(game.state.arrowsInfo).sort((a, b) => a.pos-b.pos)
    let arrowsInfoOpponent = Object.values(game.state.arrowsInfoOpponent).sort((a, b) => a.pos-b.pos)
    let musicNotes = game.state.musicNotes
    let musicOpponentNotes = game.state.musicOpponentNotes

    if (game.state.musicInfo.notesImageDir) for (let i in arrowsInfo) {
        let arrowID = arrowsInfo[i].arrowID
        let arrowInfo = arrowsInfo[i]

        let arrowImageData = game.state.images[arrowInfo.imageDir || `${game.state.musicInfo.notesImageDir}Arrows.png`]
        let arrowImage = arrowImageData?.image
        let arrowFrames = arrowImageData?.animationConfig[`Arrow-${arrowInfo.arrowFrameID}`]
        if (!arrowFrames) return
        let arrowImagePos = arrowFrames[`Arrow-${arrowInfo.arrowFrameID}`]

        let arrowWidth = arrowImagePos?.width
        let arrowHeight = arrowImagePos?.height
        arrowInfo.width = arrowWidth
        arrowInfo.height = arrowHeight

        let splashImageData = game.state.images[arrowInfo?.splashDir]
        let splashImage = splashImageData?.image
        let splashFrames = splashImageData?.animationConfig[`Arrow-${arrowInfo.splashFrameID}`]
        let splashImagePos = splashFrames ? splashFrames[`Arrow-${arrowInfo.splashFrameID}-splash-${arrowInfo.splashFrame}`] : null

        if (arrowInfo && splashFrames && arrowInfo.splashFrame <= Object.keys(splashFrames).length && arrowInfo.splashTime+(35-Object.keys(splashFrames).length < 15 ? 15 : 35-Object.keys(splashFrames).length) <= +new Date()) {
            arrowInfo.splashFrame += 1
            arrowInfo.splashTime = +new Date()
        }

        if (Listener.state.arrows[arrowID]?.click) {
            let note = musicNotes.find(n => (n.errorWhenNotClicking || n.autoClick) && !n.disabled && n.time >= game.state.musicInfo.oldPauseTime && n.arrowID == arrowID && n.Y >= -(arrowHeight**resizeNote) && n.Y <= (game.state.holdHeight**resizeNote)*(n.hold/(game.state.holdHeight))+(game.state.holdHeight*2))
            let onNote = Listener.state.arrows[arrowID]?.state == 'onNote' && note ? true : false

            if (Listener.state.arrows[arrowID]?.state == 'onNote' || Listener.state.arrows[arrowID]?.state == 'noNote') arrowImagePos = arrowFrames[`Arrow-${arrowInfo.arrowFrameID}-press-${game.state.animations.arrows.frame}${onNote ? '' : '-no'}`]
            else {
                arrowImageData = game.state.images[Listener.state.arrows[arrowID]?.state]
                arrowImage = arrowImageData?.image
                arrowFrames = arrowImageData?.animationConfig[`Arrow-${arrowInfo.arrowFrameID}`]
                arrowImagePos = arrowFrames[`Arrow-${arrowInfo.arrowFrameID}-press-${game.state.animations.arrows.frame}`] || arrowImagePos
            }
        }

        if (arrowImage && arrowImagePos && arrowInfo) {
            let alphaHUD = game.state.alphaHUD >= 1 ? 1 : game.state.alphaHUD <= 0 ? 0 : game.state.alphaHUD
            let arrowAlpha = arrowInfo.alpha >= 1 ? 1 : arrowInfo.alpha <= 0 ? 0 : arrowInfo.alpha
            ctx.globalAlpha = arrowAlpha <= alphaHUD ? arrowAlpha : alphaHUD//arrowInfo.alpha > 1 ? 1 : arrowInfo.alpha < 0 ? 0 : game.state.alphaHUD == 1 ? arrowInfo.alpha : arrowInfo.alpha == 1 ? game.state.alphaHUD : 0
            ctx.shadowColor = arrowInfo.shadowColor
            ctx.shadowBlur = arrowInfo.shadowBlur

            ctx.save()
            
            if (arrowInfo.resetEnable) {
                arrowInfo.X = arrowX
                arrowInfo.defaultX = arrowX

                arrowInfo.Y = arrowY
                arrowInfo.defaultY = arrowY
            }

            let currentArrowWidth = arrowImagePos.width**resizeNote
            let currentArrowHeight = arrowImagePos.height**resizeNote
            let currentArrowX = arrowInfo.X-((arrowImagePos.width**resizeNote-arrowWidth**resizeNote)/2)+arrowInfo.fitX
            let currentArrowY = arrowInfo.Y-(arrowImagePos.height**resizeNote/2)+arrowInfo.fitY

            ctx.translate(currentArrowX+(currentArrowWidth/2), currentArrowY+(currentArrowHeight/2));
            ctx.rotate((arrowInfo.rotation)*Math.PI/180);

            ctx.drawImage(arrowImage, arrowImagePos.x, arrowImagePos.y, arrowImagePos.width, arrowImagePos.height, -(currentArrowWidth/2), -(currentArrowHeight/2), currentArrowWidth, currentArrowHeight)
            if (splashImage && splashImagePos && onNotesSplashes) {
                ctx.globalAlpha = game.state.alphaHUD == 1 ? arrowInfo.splashAlpha : arrowInfo.splashAlpha == 1 ? game.state.alphaHUD : 0
                ctx.drawImage(splashImage, splashImagePos.x, splashImagePos.y, splashImagePos.width, splashImagePos.height, -((currentArrowWidth*game.state.musicInfo.splashResize)/2), -((currentArrowHeight*game.state.musicInfo.splashResize)/2), currentArrowWidth*game.state.musicInfo.splashResize, currentArrowHeight*game.state.musicInfo.splashResize)
            }

            ctx.restore()

            let key = game.state.smallFunctions.getKey(arrowID).replace(/Key/g, '').replace(/Arrow/g, '')

            ctx.font = `bold ${30**resizeNote}px Arial`

            let percent = game.state.animations.arrowKeys.frame/game.state.animations.arrowKeys.endFrame
            if (percent < 1) {
                let arrowKeysAlpha = percent > 0.8 ? 1-(percent-0.8)/0.2 : game.state.alphaHUD
                functions.fillText({
                    alpha: arrowKeysAlpha <= game.state.alphaHUD ? arrowKeysAlpha : game.state.alphaHUD,
                    style: `rgb(255, 255, 255)`,
                    text: key,
                    font: `bold ${30**resizeNote}px Arial`,
                    x: arrowInfo.X+(arrowInfo.width**resizeNote)/2-(ctx.measureText(key).width/2), 
                    y: arrowInfo.Y+(downScroll ? -(arrowInfo.height**resizeNote/2)-20 : (arrowInfo.height**resizeNote/2)+25),
                    add: 2
                })
            }

            ctx.globalAlpha = game.state.alphaHUD
            ctx.shadowBlur = 0
        }

        game.state.arrowsWidth += arrowWidth**resizeNote+spaceBetweenArrows
        arrowX += arrowWidth**resizeNote+spaceBetweenArrows
    }

    if (game.state.musicInfo.notesImageDir && game.state.smallFunctions.getConfig('OpponentNotes')) for (let i in arrowsInfoOpponent) {
        let arrowID = arrowsInfoOpponent[i].arrowID
        let arrowInfo = arrowsInfoOpponent[i]

        let arrowImageData = game.state.images[arrowInfo.imageDir || `${game.state.musicInfo.notesImageDir}Arrows.png`]
        let arrowImage = arrowImageData?.image
        let arrowFrames = arrowImageData?.animationConfig[`Arrow-${arrowInfo.arrowFrameID}`]
        if (!arrowFrames) return
        let arrowImagePos = arrowFrames[`Arrow-${arrowInfo.arrowFrameID}`]

        let arrowWidth = arrowImagePos?.width
        let arrowHeight = arrowImagePos?.height
        arrowInfo.width = arrowWidth
        arrowInfo.height = arrowHeight

        let note = musicOpponentNotes.find(n => (n.errorWhenNotClicking || n.autoClick) && !n.disabled && n.time >= game.state.musicInfo.oldPauseTime && n.arrowID == arrowID && n.Y >= 0 && n.Y <= (game.state.holdHeight**resizeNoteOpponent)*(n.hold/(game.state.holdHeight))+(game.state.holdHeight*2))
        let onClickNoteOpponent = game.state.musicInfoOpponent.arrows && game.state.musicInfoOpponent.arrows[arrowID]?.click
        if (note || onClickNoteOpponent) {
            let pressImage = game.state.personalizedNotes[note?.type]?.pressImage
            if (pressImage) {
                arrowImageData = game.state.images[Listener.state.arrows[arrowID]?.state]
                arrowImage = arrowImageData?.image
                arrowFrames = arrowImageData?.animationConfig[`Arrow-${arrowInfo.arrowFrameID}`]
                arrowImagePos = arrowFrames[`Arrow-${arrowInfo.arrowFrameID}-press-${game.state.animations.arrows.frame}`] || arrowImagePos
            } else arrowImagePos = arrowFrames[`Arrow-${arrowInfo.arrowFrameID}-press-${game.state.animations.arrows.frame}${onClickNoteOpponent ? '-no' : ''}`]
        }

        if (arrowImage && arrowImagePos && arrowInfo) {
            let alphaHUD = game.state.alphaHUD >= 1 ? 1 : game.state.alphaHUD <= 0 ? 0 : game.state.alphaHUD
            let arrowAlpha = arrowInfo.alpha >= 1 ? 1 : arrowInfo.alpha <= 0 ? 0 : arrowInfo.alpha
            ctx.globalAlpha = arrowAlpha <= alphaHUD ? arrowAlpha : alphaHUD
            ctx.shadowColor = arrowInfo.shadowColor
            ctx.shadowBlur = arrowInfo.shadowBlur

            ctx.save()
            
            if (arrowInfo.resetEnable) {
                arrowInfo.X = arrowXOpponent
                arrowInfo.defaultX = arrowXOpponent

                arrowInfo.Y = arrowYOpponent
                arrowInfo.defaultY = arrowYOpponent
            }

            let currentArrowWidth = arrowImagePos.width**resizeNoteOpponent
            let currentArrowHeight = arrowImagePos.height**resizeNoteOpponent
            let currentArrowX = arrowInfo.X-((arrowImagePos.width**resizeNoteOpponent-arrowWidth**resizeNoteOpponent)/2)+arrowInfo.fitX
            let currentArrowY = arrowInfo.Y-(arrowImagePos.height**resizeNoteOpponent/2)+arrowInfo.fitY

            ctx.translate(currentArrowX+(currentArrowWidth/2), currentArrowY+(currentArrowHeight/2));
            ctx.rotate((arrowInfo.rotation)*Math.PI/180);
            
            ctx.drawImage(arrowImage, arrowImagePos.x, arrowImagePos.y, arrowImagePos.width, arrowImagePos.height, -(currentArrowWidth/2), -(currentArrowHeight/2), currentArrowWidth, currentArrowHeight)

            ctx.restore()

            ctx.globalAlpha = game.state.alphaHUD
            ctx.shadowBlur = 0
        }

        game.state.arrowsWidthOpponent += arrowWidth**resizeNoteOpponent+spaceBetweenArrowsOpponent
        arrowXOpponent += arrowWidth**resizeNoteOpponent+spaceBetweenArrowsOpponent
    }
}