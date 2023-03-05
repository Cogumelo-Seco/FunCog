export default async (canvas, game, Listener, functions) => {
    const ctx = canvas.getContext('2d')

    let downScroll = game.state.smallFunctions.getConfig('DownScroll')
    let middleScroll = game.state.smallFunctions.getConfig('MiddleScroll')

    let invertArrowPos = game.state.invertArrowPos

    ctx.globalAlpha = game.state.alphaHUD
    ctx.font = `bold 13px Arial`

    let musicInfoTxt = `SCORE: ${game.state.musicInfo.score} | MISSES: ${game.state.musicInfo.misses || 0}${game.state.musicInfo.misses <= 0 ? ' (FC)' : ''} | ACCURANCY: ${game.state.musicInfo.accuracy?.toFixed(2)}%`
    let musicInfoTxtOpponent = `SCORE: ${game.state.musicInfoOpponent.score || 0} | MISSES: ${game.state.musicInfoOpponent.misses || 0}${game.state.musicInfoOpponent.misses <= 0 ? ' (FC)' : ''} | ACCURANCY: ${(game.state.musicInfoOpponent.accuracy || 0)?.toFixed(2)}%`

    let arrowsInfoOpponent = Object.values(game.state.arrowsInfoOpponent).sort((a, b) => a.pos-b.pos)
    if (game.state.online) {
        ctx.font = `bold ${game.state.resizeNoteOpponent != game.state.resizeNote ? 20**game.state.resizeNoteOpponent : 13}px Arial`
        let musicInfoYOpponent = middleScroll ? downScroll ? arrowsInfoOpponent[0]?.defaultY+(arrowsInfoOpponent[0]?.height**game.state.resizeNoteOpponent) : arrowsInfoOpponent[0]?.defaultY-(arrowsInfoOpponent[0]?.height**game.state.resizeNoteOpponent) : downScroll ? canvas.height-20 : 33
        let musicInfoXOpponent = middleScroll ? invertArrowPos ? canvas.width-canvas.width/6-ctx.measureText(musicInfoTxtOpponent).width/2 : canvas.width/6-ctx.measureText(musicInfoTxtOpponent).width/2 : invertArrowPos ? canvas.width-canvas.width/4-(ctx.measureText(musicInfoTxtOpponent).width/2) : canvas.width/4-(ctx.measureText(musicInfoTxtOpponent).width/2)

        functions.fillText({
            text: musicInfoTxtOpponent,
            x: musicInfoXOpponent, 
            y: musicInfoYOpponent,
            add: 2
        })

        ctx.font = `bold 13px Arial`
        let musicInfoY = downScroll ? canvas.height-20 : 33
        let musicInfoX = middleScroll ? canvas.width/2-(ctx.measureText(musicInfoTxt).width/2) : invertArrowPos ? canvas.width/4-(ctx.measureText(musicInfoTxt).width/2) : (canvas.width-canvas.width/4)-(ctx.measureText(musicInfoTxt).width/2)

        functions.fillText({
            text: musicInfoTxt,
            x: musicInfoX, 
            y: musicInfoY,
            add: 2
        })
    } else {
        ctx.font = `bold 13px Arial`
        functions.fillText({
            text: musicInfoTxt,
            x: canvas.width/2-(ctx.measureText(musicInfoTxt).width/2), 
            y: downScroll ? canvas.height-20+2 : 33,
            add: 2
        })
    }

    ctx.font = `bold 10px Arial`

    ctx.fillStyle = game.state.musicInfo.difficulty.color
    ctx.fillText(`Difficulty: ${game.state.musicInfo.difficulty.name}`, 2, canvas.height-5);

    ctx.fillStyle = 'rgb(200, 200, 200)'
    ctx.fillText(`ScrollSpeed: ${game.state.smallFunctions.getConfig('ScrollSpeed')}`, 2, canvas.height-15);
    if (game.state.debug) {
        ctx.fillText(`Beat: ${game.state.musicBeat}`, 2, canvas.height-25);
        ctx.fillText(`Step: ${game.state.musicStep}`, 2, canvas.height-35);
    }
    
    let introImage = game.state.images[`intro/${game.state.countdown}.png`]
    if (game.state.countdown >= 0 && introImage) {
        let introWidth = introImage.image.width*0.4
        let introHeight = introImage.image.height*0.4
        ctx.drawImage(introImage.image, canvas.width/2-(introWidth/2), canvas.height/2-(introHeight/2), introWidth, introHeight);
    }

    function renderRatings(rating, arrowsInfo, musicInfo, resize) {
        let ratingImage = game.state.images[`ratings/${rating.rating.name}.png`]
        let percent = (+new Date()-rating.time)/400 < 1 ? (+new Date()-rating.time)/400 : 1
        ctx.globalAlpha = percent > 0.6 ? 1-(percent-0.4)/0.6 : game.state.alphaHUD

        if (ratingImage) {
            let ratingImageWidth = ratingImage.image.width**resize*0.5
            let ratingImageHeight = ratingImage.image.height**resize*0.5
            let ratingImageY = (arrowsInfo[0]?.Y+(arrowsInfo[0]?.height**resize*0.2)-(ratingImage.image.height**resize*0.6/2))-(90**resize)*percent
            let ratingImageX = arrowsInfo[0]?.X-(ratingImageWidth**resize*2)

            ctx.drawImage(ratingImage.image, ratingImageX, ratingImageY, ratingImageWidth*((1-percent)/9+1), ratingImageHeight*((1-percent)/9+1));
        }
    }

    let arrowsInfo = Object.values(game.state.arrowsInfo).sort((a, b) => a.pos-b.pos)
    for (let i in game.state.musicInfo.ratings) renderRatings(game.state.musicInfo.ratings[i], arrowsInfo, game.state.musicInfo, game.state.resizeNote)
    for (let i in game.state.musicInfoOpponent.ratings) {
        let rating = JSON.parse(JSON.stringify(game.state.musicInfoOpponent.ratings[i]))
        rating.time += 500
        renderRatings(rating, Object.values(game.stat.arrowsInfoOpponent).sort((a, b) => a.pos-b.pos), game.state.musicInfoOpponent, game.state.resizeNoteOpponent)
    }

    let ratingInfoX = arrowsInfo[arrowsInfo.length-1]?.X+arrowsInfo[arrowsInfo.length-1]?.width**game.state.resizeNote
    let rating = game.state.musicInfo.ratings[game.state.musicInfo.ratings.length-1]
    if (rating) {
        let percent = (+new Date()-rating.time)/700 < 1 ? (+new Date()-rating.time)/700 : 1
        ctx.font = `bold ${15**game.state.resizeNote*((1-percent)/3+1)}px Arial`

        functions.fillText({
            alpha: percent > 0.6 ? 1-(percent-0.4)/0.6 : game.state.alphaHUD,
            style: `hsl(${110-Math.abs(rating.hitNote)}, 100%, 40%)`,
            text: rating.hitNote?.toFixed(2)+'ms',
            x: ratingInfoX+5, 
            y: arrowsInfo[arrowsInfo.length-1]?.Y-(10**game.state.resizeNote),
            add: 2
        })
        functions.fillText({
            text: game.state.musicInfo.combo+'X',
            x: ratingInfoX+5, 
            y: arrowsInfo[arrowsInfo.length-1]?.Y+(30**game.state.resizeNote),
            add: 2
        })
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