export default async (canvas, game, Listener) => {
    const ctx = canvas.getContext('2d')

    let performanceMode = game.state.smallFunctions.getConfig('PerformanceMode')
    let downScroll = game.state.smallFunctions.getConfig('DownScroll')
    let middleScroll = game.state.smallFunctions.getConfig('MiddleScroll')

    let invertArrowPos = game.state.musicInfo.playerId == 2 ? game.state.invertArrowPos ? false : true : game.state.invertArrowPos

    ctx.globalAlpha = game.state.alphaHUD
    ctx.fillStyle = 'rgb(200, 200, 200)'
    ctx.font = `bold 13px Arial`

    let musicInfoTxt = `SCORE: ${game.state.musicInfo.score} | MISSES: ${game.state.musicInfo.misses} | COMBO: ${game.state.musicInfo.combo} (${!game.state.musicInfo.misses ? 'FC' : game.state.musicInfo.bestCombo}) | ACCURANCY: ${game.state.musicInfo.accuracy?.toFixed(2)}%`
    let musicInfoTxtOpponent = `SCORE: ${game.state.musicInfoOpponent.score || 0} | MISSES: ${game.state.musicInfoOpponent.misses || 0} | COMBO: ${game.state.musicInfoOpponent.combo || 0} (${!game.state.musicInfoOpponent.misses ? 'FC' : game.state.musicInfoOpponent.bestCombo}) | ACCURANCY: ${(game.state.musicInfoOpponent.accuracy || 0)?.toFixed(2)}%`

    let arrowsInfoOpponent = Object.values(game.state[game.state.musicInfo.playerId == 2 ? 'arrowsInfo' : 'arrowsInfoOpponent']).sort((a, b) => a.pos-b.pos)
    if (game.state.online) {
        ctx.font = `bold ${game.state.resizeNoteOpponent != game.state.resizeNote ? 20**game.state.resizeNoteOpponent : 13}px Arial`
        let musicInfoYOpponent = middleScroll ? downScroll ? arrowsInfoOpponent[0]?.defaultY+(arrowsInfoOpponent[0]?.height**game.state.resizeNoteOpponent) : arrowsInfoOpponent[0]?.defaultY-(arrowsInfoOpponent[0]?.height**game.state.resizeNoteOpponent) : downScroll ? canvas.height-20 : 33
        let musicInfoXOpponent = middleScroll ? invertArrowPos ? canvas.width-canvas.width/6-ctx.measureText(musicInfoTxtOpponent).width/2 : canvas.width/6-ctx.measureText(musicInfoTxtOpponent).width/2 : invertArrowPos ? canvas.width-canvas.width/4-(ctx.measureText(musicInfoTxtOpponent).width/2) : canvas.width/4-(ctx.measureText(musicInfoTxtOpponent).width/2)

        ctx.fillText(musicInfoTxtOpponent, musicInfoXOpponent, musicInfoYOpponent);

        ctx.font = `bold 13px Arial`
        let musicInfoY = downScroll ? canvas.height-20 : 33
        let musicInfoX = middleScroll ? canvas.width/2-(ctx.measureText(musicInfoTxt).width/2) : invertArrowPos ? canvas.width/4-(ctx.measureText(musicInfoTxt).width/2) : (canvas.width-canvas.width/4)-(ctx.measureText(musicInfoTxt).width/2)

        ctx.fillText(musicInfoTxt, musicInfoX, musicInfoY);
    } else {
        ctx.font = `bold 13px Arial`
        ctx.fillText(musicInfoTxt, canvas.width/2-(ctx.measureText(musicInfoTxt).width/2),  downScroll ? canvas.height-20 : 33);
    }

    ctx.font = `bold 10px Arial`
    ctx.fillText(`Difficulty: ${game.state.musicInfo.difficulty.name}`, 2, canvas.height-5);
    ctx.fillText(`Beat: ${game.state.musicBeat}`, 2, canvas.height-15);
    ctx.fillText(`Step: ${game.state.musicStep}`, 2, canvas.height-25);
    
    let introImage = game.state.images[`intro/${game.state.countdown}.png`]
    if (game.state.countdown >= 0 && introImage) {
        let introWidth = introImage.image.width*0.4
        let introHeight = introImage.image.height*0.4
        ctx.drawImage(introImage.image, canvas.width/2-(introWidth/2), canvas.height/2-(introHeight/2), introWidth, introHeight);
    }

    function renderRatings(rating, arrowsInfo, resize) {
        let ratingImage = game.state.images[`ratings/${rating.rating.name}.png`]
        let percent = (+new Date()-rating.time)/400 < 1 ? (+new Date()-rating.time)/400 : 1
        ctx.globalAlpha = percent > 0.5 ? 1-(percent-0.5)/0.5 : game.state.alphaHUD

        if (ratingImage) {
            let ratingImageWidth = ratingImage.image.width**resize*0.55
            let ratingImageHeight = ratingImage.image.height**resize*0.55
            let ratingImageY = (arrowsInfo[0]?.Y+(arrowsInfo[0]?.height**resize*0.2)-(ratingImage.image.height**resize*0.6/2))-(90**resize)*percent
            let ratingImageX = arrowsInfo[0]?.defaultX-(game.state.smallFunctions.getConfig('SpaceBetweenArrows')**resize+(ratingImageWidth**resize*2))

            ctx.drawImage(ratingImage.image, ratingImageX, ratingImageY, ratingImageWidth, ratingImageHeight);

            ctx.font = `bold ${16**resize}px Arial`
            ctx.fillStyle = rating.rating.media >= 80 ? 'rgb(19, 189, 0)' : 'rgb(220, 50, 50)'
            ctx.fillText(rating.hitNote?.toFixed(2)+'ms', ratingImageX+ratingImageWidth-(ctx.measureText(rating.hitNote?.toFixed(2)+'ms').width), ratingImageY+ratingImageHeight+9);
        }
    }

    if (!performanceMode) {
        for (let i in game.state.musicInfo.ratings) renderRatings(game.state.musicInfo.ratings[i], Object.values(game.state[game.state.musicInfo.playerId == 2 ? 'arrowsInfoOpponent' : 'arrowsInfo']).sort((a, b) => a.pos-b.pos), game.state.resizeNote)
        
        for (let i in game.state.musicInfoOpponent.ratings) {
            let rating = JSON.parse(JSON.stringify(game.state.musicInfoOpponent.ratings[i]))
            rating.time += 500
            renderRatings(rating, Object.values(game.state[game.state.musicInfo.playerId == 2 ? 'arrowsInfo' : 'arrowsInfoOpponent']).sort((a, b) => a.pos-b.pos), game.state.resizeNoteOpponent)
        }
    }

    ctx.globalAlpha = 1

    if (game.state.online && !game.state.serverInfo.start) {
        ctx.fillStyle = `rgba(255, 50, 50, 0.7)`
        ctx.fillRect(0, canvas.height/2-20, canvas.width, 40)

        let txt = game.state.waiting ? 'Waiting for player' : 'Waiting for player to load files'

        ctx.font = 'bold 30px Arial'
        ctx.fillStyle = `white`
        ctx.fillText(txt, canvas.width/2-(ctx.measureText(txt).width/2), canvas.height/2+10)

        ctx.lineWidth = 1
        ctx.strokeStyle  = 'black'
        ctx.strokeText(txt, canvas.width/2-(ctx.measureText(txt).width/2), canvas.height/2+10)
    }
}