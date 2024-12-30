export default async (ctx, canvas, game, Listener, functions) => {
    let resizeNote = (game.state.resizeNote*game.state.musicInfo.noteResize)*(1-0.1*(100-game.state.smallFunctions.getConfig('ArrowSize'))/100)
    let resizeNoteOpponent = game.state.resizeNoteOpponent*game.state.musicInfo.noteResize

    let downScroll = game.state.smallFunctions.getConfig('DownScroll')
    let middleScroll = game.state.smallFunctions.getConfig('MiddleScroll')

    let invertArrowPos = game.state.invertArrowPos

    ctx.globalAlpha = game.state.alphaHUD
    ctx.font = `bold 13px Arial`

    let musicInfoTxt = `§f§lSCORE: ${game.state.musicInfo.score < 0 ? '§c' : '§6'}§o${game.state.musicInfo.score} §3§l| §f§lMISSES: ${game.state.musicInfo.misses >= 100 ? '§c' : '§6'}§o${game.state.musicInfo.misses || 0}${game.state.musicInfo.misses <= 0 ? ' (FC)' : ''} §3§l| §f§lACCURANCY: §6§o${game.state.musicInfo.accuracy?.toFixed(2)}%`

    ctx.font = `13px Arial`
    functions.fillText({
        text: musicInfoTxt,
        font: `13px Arial`,
        x: canvas.width/2-functions.getTextWidth(musicInfoTxt, '13px Arial')/2,
        y: canvas.height-20+2,//downScroll ? canvas.height-20+2 : 28,
        add: 2
    })

    if (game.state.musicInfo.additionalScreenInfo) {
        ctx.font = `13px Arial`
        functions.fillText({
            text: game.state.musicInfo.additionalScreenInfo,
            font: `13px Arial`,
            x: canvas.width/2-functions.getTextWidth(game.state.musicInfo.additionalScreenInfo, '13px Arial')/2,
            y: downScroll ? 70 : canvas.height-45+2,
            add: 2
        })
    }
    
    functions.fillText({
        text: `§f§lDifficulty: §r§c${game.state.musicInfo.difficulty.name}`,
        font: `10px Arial`,
        x: 2,
        y: canvas.height-5,
        add: 2
    })

    functions.fillText({
        text: `§7ScrollSpeed: §r§7${game.state.smallFunctions.getConfig('ScrollSpeed')}`,
        font: `10px Arial`,
        x: 2,
        y: canvas.height-15
    })

    if (game.state.debug) {
        functions.fillText({
            text: `§7Beat: §r§7${game.state.musicBeat}`,
            font: `10px Arial`,
            x: 2,
            y: canvas.height-25
        })
        functions.fillText({
            text: `§7Step: §r§7${game.state.musicStep}`,
            font: `10px Arial`,
            x: 2,
            y: canvas.height-35
        })
    }
    
    let introImage = game.state.images[`intro/${game.state.countdown}.png`]
    if (game.state.countdown >= 0 && introImage) {
        let introWidth = introImage.image.width*0.4
        let introHeight = introImage.image.height*0.4
        ctx.drawImage(introImage.image, canvas.width/2-(introWidth/2), canvas.height/2-(introHeight/2), introWidth, introHeight);
    }

    let alertImage = game.state.images[`imgs/alert.png`]?.image
    if (game.state.musicInfo.dev && alertImage) {
        ctx.font = `bold 13px Arial`
        ctx.fillStyle = 'rgb(255, 0, 0)'
        let X = 5
        let Y = 30
        ctx.drawImage(alertImage, X, Y-28, 30, 30)
        ctx.fillText('In development', X+27, Y-(16/2));
    }

    function renderRatings(rating, arrowsInfo, musicInfo, resize) {
        let ratingImage = game.state.images[`ratings/${rating.rating.name}.png`]
        let percent = (+new Date()-rating.time)/400 < 1 ? (+new Date()-rating.time)/400 : 1
        ctx.globalAlpha = percent > 0.6 ? 1-(percent-0.4)/0.6 : game.state.alphaHUD

        if (ratingImage) {
            let ratingImageWidth = ratingImage.image.width**resize*0.5
            let ratingImageHeight = ratingImage.image.height**resize*0.5
            let ratingImageY = (arrowsInfo[0]?.Y+(arrowsInfo[0]?.height**resize*0.2)-(ratingImage.image.height**resize*0.6/2))-(95**resize)*percent
            let ratingImageX = arrowsInfo[0]?.X-ratingImageWidth-5

            ctx.drawImage(ratingImage.image, ratingImageX, ratingImageY, ratingImageWidth*((1-percent)/9+1), ratingImageHeight*((1-percent)/9+1));
        }
    }

    let arrowsInfo = Object.values(game.state.arrowsInfo).sort((a, b) => a.pos-b.pos)
    for (let i in game.state.musicInfo.ratings) renderRatings(game.state.musicInfo.ratings[i], arrowsInfo, game.state.musicInfo, resizeNote)
    for (let i in game.state.musicInfoOpponent.ratings) {
        let rating = JSON.parse(JSON.stringify(game.state.musicInfoOpponent.ratings[i]))
        rating.time += 500
        renderRatings(rating, Object.values(game.stat.arrowsInfoOpponent).sort((a, b) => a.pos-b.pos), game.state.musicInfoOpponent, resizeNoteOpponent)
    }

    let ratingInfoX = arrowsInfo[arrowsInfo.length-1]?.X+arrowsInfo[arrowsInfo.length-1]?.width**resizeNote
    let rating = game.state.musicInfo.ratings[game.state.musicInfo.ratings.length-1]
    if (rating) {
        let percent = (+new Date()-rating.time)/700 < 1 ? (+new Date()-rating.time)/700 : 1

        functions.fillText({
            font: `bold ${14**resizeNote*((1-percent)/3+1)}px Arial`,
            alpha: percent > 0.6 ? 1-(percent-0.4)/0.6 : game.state.alphaHUD,
            style: `hsl(${110-Math.abs(rating.hitNote)}, 100%, 40%)`,
            text: rating.hitNote?.toFixed(2)+'ms',
            x: ratingInfoX+5, 
            y: arrowsInfo[arrowsInfo.length-1]?.Y-(10**resizeNote),
            add: 2
        })

        functions.fillText({
            font: `bold ${17**resizeNote*((1-percent)+1)}px Arial`,
            text: game.state.musicInfo.combo+'X',
            x: ratingInfoX+5, 
            y: arrowsInfo[arrowsInfo.length-1]?.Y+(30**resizeNote),
            add: 2
        })
    }

    ctx.globalAlpha = 1
/*
    if (!game.state.serverInfo.start) {
        ctx.fillStyle = `rgba(255, 50, 50, 0.7)`
        ctx.fillRect(0, canvas.height/2-20, canvas.width, 40)

        let txt = game.state.waiting ? 'Waiting for player' : 'Waiting for player to load files'

        ctx.font = 'bold 30px Arial'
        ctx.fillStyle = `white`
        ctx.fillText(txt, canvas.width/2-(ctx.measureText(txt).width/2), canvas.height/2+10)

        ctx.lineWidth = 1
        ctx.strokeStyle  = 'black'
        ctx.strokeText(txt, canvas.width/2-(ctx.measureText(txt).width/2), canvas.height/2+10)
    }*/
}