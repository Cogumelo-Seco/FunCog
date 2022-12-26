export default async (canvas, game, Listener) => {
    const ctx = canvas.getContext('2d')

    let performanceMode = game.state.smallFunctions.getConfig('PerformanceMode')
    let onNotesSplashes = game.state.smallFunctions.getConfig('Splashes')

    let resizeNote = game.state.resizeNote
    let spaceBetweenArrows = game.state.smallFunctions.getConfig('SpaceBetweenArrows')**resizeNote
    let arrowsWidth = game.state.arrowsWidth

    let arrowX = game.state.smallFunctions.getConfig('MiddleScroll') ? canvas.width/2-(arrowsWidth/2) : canvas.width-(arrowsWidth+(arrowsSize**resizeNote+spaceBetweenArrows))
    let arrowY = game.state.smallFunctions.getConfig('DownScroll') ? canvas.height-game.state.arrowsYLineMargin : game.state.arrowsYLineMargin

    game.state.arrowsWidth = 0

    let arrowsInfo = Object.values(game.state.arrowsInfo).sort((a, b) => a.pos-b.pos)
    if (game.state.musicInfo.notesImageDir) for (let i in arrowsInfo) {
        let arrowID = arrowsInfo[i].arrowID
        let arrowInfo = arrowsInfo[i]

        let arrowImageData = game.state.images[arrowInfo.imageDir || `${game.state.musicInfo.notesImageDir}Arrows.png`]
        let arrowImage = arrowImageData?.image
        let arrowFrames = arrowImageData?.animationConfig[`Arrow-${arrowID}`]
        if (!arrowFrames) return
        let arrowImagePos = arrowFrames[`Arrow-${arrowID}`]

        let arrowWidth = arrowImagePos?.width
        let arrowHeight = arrowImagePos?.height
        arrowInfo.width = arrowWidth
        arrowInfo.height = arrowHeight

        let splashImageData = game.state.images[arrowInfo?.splashDir]
        let splashImage = splashImageData?.image
        let splashFrames = splashImageData?.animationConfig[`Arrow-${arrowID}`]
        let splashImagePos = splashFrames ? splashFrames[`Arrow-${arrowID}-splash-${arrowInfo.splashFrame}`] : null

        if (arrowInfo && splashFrames && arrowInfo.splashFrame <= Object.keys(splashFrames).length && arrowInfo.splashTime+(35-Object.keys(splashFrames).length < 15 ? 15 : 35-Object.keys(splashFrames).length) <= +new Date()) {
            arrowInfo.splashFrame += 1
            arrowInfo.splashTime = +new Date()
        }

        if (Listener.state.arrows[arrowID]?.click) {
            let note = game.state.musicNotes.find(n => (n.errorWhenNotClicking || n.autoClick) && !n.disabled && n.arrowID == arrowID && n.Y >= -(arrowHeight**game.state.resizeNote) && n.Y <= (game.state.holdHeight**resizeNote)*(n.hold/(game.state.holdHeight))+(game.state.holdHeight*2))
            let onNote = Listener.state.arrows[arrowID]?.state == 'onNote' && note ? true : false

            if (Listener.state.arrows[arrowID]?.state == 'onNote' || Listener.state.arrows[arrowID]?.state == 'noNote') arrowImagePos = arrowFrames[`Arrow-${arrowID}-press-${game.state.animations.arrows.frame}${onNote ? '' : '-no'}`]
            else {
                arrowImageData = game.state.images[Listener.state.arrows[arrowID]?.state]
                arrowImage = arrowImageData?.image
                arrowFrames = arrowImageData?.animationConfig[`Arrow-${arrowID}`]
                arrowImagePos = arrowFrames[`Arrow-${arrowID}-press-${game.state.animations.arrows.frame}`] || arrowImagePos
            }
        }

        if (arrowImage && arrowImagePos && arrowInfo) {
            ctx.globalAlpha = arrowInfo.alpha > 1 ? 1 : arrowInfo.alpha < 0 ? 0 : game.state.alphaHUD == 1 ? arrowInfo.alpha : arrowInfo.alpha == 1 ? game.state.alphaHUD : 0
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
            if (splashImage && splashImagePos && onNotesSplashes && !performanceMode) {
                ctx.globalAlpha = game.state.alphaHUD == 1 ? arrowInfo.splashAlpha : arrowInfo.splashAlpha == 1 ? game.state.alphaHUD : 0
                ctx.drawImage(splashImage, splashImagePos.x, splashImagePos.y, splashImagePos.width, splashImagePos.height, -((currentArrowWidth*game.state.musicInfo.splashResize)/2), -((currentArrowHeight*game.state.musicInfo.splashResize)/2), currentArrowWidth*game.state.musicInfo.splashResize, currentArrowHeight*game.state.musicInfo.splashResize)
            }

            ctx.restore()

            ctx.globalAlpha = game.state.alphaHUD
        }

        game.state.arrowsWidth += arrowWidth**resizeNote+spaceBetweenArrows
        arrowX += arrowWidth**resizeNote+spaceBetweenArrows
    }

    let resizeNoteOpponent = game.state.resizeNoteOpponent
    let spaceBetweenArrowsOpponent = game.state.smallFunctions.getConfig('SpaceBetweenArrows')**resizeNoteOpponent
    let arrowsWidthOpponent = game.state.arrowsWidthOpponent

    let arrowXOpponent = game.state.smallFunctions.getConfig('MiddleScroll') ? canvas.width/6-(arrowsWidthOpponent/2) : arrowsSize**resizeNoteOpponent+spaceBetweenArrowsOpponent
    let arrowYOpponent = game.state.smallFunctions.getConfig('DownScroll') ? (canvas.height-canvas.height/3) : canvas.height/3

    game.state.arrowsWidthOpponent = 0

    let arrowsInfoOpponent = Object.values(game.state.arrowsInfoOpponent).sort((a, b) => a.pos-b.pos)
    if (game.state.musicInfo.notesImageDir && !performanceMode && game.state.smallFunctions.getConfig('OpponentNotes')) for (let i in arrowsInfoOpponent) {
        let arrowID = arrowsInfoOpponent[i].arrowID
        let arrowInfo = arrowsInfoOpponent[i]

        let arrowImageData = game.state.images[arrowInfo.imageDir || `${game.state.musicInfo.notesImageDir}Arrows.png`]
        let arrowImage = arrowImageData?.image
        let arrowFrames = arrowImageData?.animationConfig[`Arrow-${arrowID}`]
        if (!arrowFrames) return
        let arrowImagePos = arrowFrames[`Arrow-${arrowID}`]

        let arrowWidth = arrowImagePos?.width
        let arrowHeight = arrowImagePos?.height
        arrowInfo.width = arrowWidth
        arrowInfo.height = arrowHeight

        let note = game.state.musicOpponentNotes.find(n => (n.errorWhenNotClicking || n.autoClick) && !n.disabled && n.arrowID == arrowID && n.Y >= 0 && n.Y <= (game.state.holdHeight**resizeNoteOpponent)*(n.hold/(game.state.holdHeight))+(game.state.holdHeight*2))
        let onClickNoteOpponent = game.state.musicInfoOpponent.arrows && game.state.musicInfoOpponent.arrows[arrowID]?.click
        if (note || onClickNoteOpponent) {
            let pressImage = game.state.personalizedNotes[note?.type]?.pressImage
            if (pressImage) {
                arrowImageData = game.state.images[Listener.state.arrows[arrowID]?.state]
                arrowImage = arrowImageData?.image
                arrowFrames = arrowImageData?.animationConfig[`Arrow-${arrowID}`]
                arrowImagePos = arrowFrames[`Arrow-${arrowID}-press-${game.state.animations.arrows.frame}`] || arrowImagePos
            } else arrowImagePos = arrowFrames[`Arrow-${arrowID}-press-${game.state.animations.arrows.frame}${onClickNoteOpponent ? '-no' : ''}`]
        }

        if (arrowImage && arrowImagePos && arrowInfo) {
            ctx.globalAlpha = arrowInfo.alpha > 1 ? 1 : arrowInfo.alpha < 0 ? 0 : game.state.alphaHUD == 1 ? arrowInfo.alpha : arrowInfo.alpha == 1 ? game.state.alphaHUD : 0
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
        }

        game.state.arrowsWidthOpponent += arrowWidth**resizeNoteOpponent+spaceBetweenArrowsOpponent
        arrowXOpponent += arrowWidth**resizeNoteOpponent+spaceBetweenArrowsOpponent
    }
}