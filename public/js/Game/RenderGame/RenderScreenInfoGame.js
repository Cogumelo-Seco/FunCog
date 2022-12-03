export default async (canvas, game, Listener) => {
    const ctx = canvas.getContext('2d')

    ctx.fillStyle = 'rgb(200, 200, 200)'
    ctx.font = `bold 13px Arial`

    let musicInfoTxt = `SCORE: ${game.state.musicInfo.score} | MISSES: ${game.state.musicInfo.misses} | COMBO: ${game.state.musicInfo.combo} (${game.state.musicInfo.misses <= 0 ? 'FC' : game.state.musicInfo.bestCombo}) | ACCURANCY: ${game.state.musicInfo.accuracy?.toFixed(2)}%`
    let musicInfoTxtOpponent = `SCORE: ${game.state.musicInfoOpponent.score || 0} | MISSES: ${game.state.musicInfoOpponent.misses || 0} | COMBO: ${game.state.musicInfoOpponent.combo || 0} (${game.state.musicInfoOpponent.combo ? game.state.musicInfoOpponent.misses <= 0 ? 'FC' : game.state.musicInfoOpponent.bestCombo : 'FC'}) ${game.state.musicInfoOpponent.misses <= 0 ? '(FC)' : ''} | ACCURANCY: ${(game.state.musicInfoOpponent.accuracy || 0)?.toFixed(2)}%`

    let musicInfoY = game.state.smallFunctions.getConfig('DownScroll') ? canvas.height-20 : 33
    ctx.fillText(musicInfoTxt, game.state.online ? (canvas.width-canvas.width/4)-(ctx.measureText(musicInfoTxt).width/2) : canvas.width/2-(ctx.measureText(musicInfoTxt).width/2), musicInfoY);
    if (game.state.online) ctx.fillText(musicInfoTxtOpponent, canvas.width/4-(ctx.measureText(musicInfoTxtOpponent).width/2), musicInfoY);

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

    for (let i in game.state.ratings) {
        let rating = game.state.ratings[game.state.ratings.length-1-i]
        let ratingImage = game.state.images[`ratings/${rating.rating.name}.png`]
        let percent = (+new Date()-rating.time)/400 < 1 ? (+new Date()-rating.time)/400 : 1
        ctx.globalAlpha = percent > 0.5 ? 1-(percent-0.5)/0.5 : 1

        if (ratingImage) {
            let ratingImageWidth = ratingImage.image.width*0.25
            let ratingImageHeight = ratingImage.image.height*0.25
            let ratingImageY = (game.state.arrowsYLine+(game.state.arrowsSize**game.state.resizeNote*0.75)-(ratingImage.image.height*0.3/2))-50*percent
            let ratingImageX = game.state.arrowsInfo[0]?.defaultX-50-game.state.smallFunctions.getConfig('SpaceBetweenArrows')-(ratingImageWidth/2)

            ctx.drawImage(ratingImage.image, ratingImageX, ratingImageY, ratingImageWidth, ratingImageHeight);

            ctx.font = `bold 13px Arial`
            ctx.fillStyle = rating.rating.media >= 80 ? 'rgb(19, 189, 0)' : 'rgb(220, 50, 50)'
            ctx.fillText(rating.hitNote?.toFixed(2)+'ms', ratingImageX+ratingImageWidth-(ctx.measureText(rating.hitNote?.toFixed(2)+'ms').width), ratingImageY+ratingImageHeight+9);
        }
    }
    ctx.globalAlpha = 1

    if (game.state.online && game.state.waiting) {
        ctx.font = 'bold 30px Arial'
        ctx.fillStyle = `rgba(50, 50, 50, 0.5)`
        ctx.fillRect(0, canvas.height/2-20, canvas.width, 40)
        ctx.fillStyle = `white`
        ctx.fillText('Waiting for player', canvas.width/2-(ctx.measureText('Waiting for player').width/2), canvas.height/2+10)
    }
}