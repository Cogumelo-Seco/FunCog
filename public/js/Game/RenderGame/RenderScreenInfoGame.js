export default async (canvas, game, Listener) => {
    const ctx = canvas.getContext('2d')

    ctx.fillStyle = 'rgb(200, 200, 200)'
    ctx.font = `bold 13px Arial`

    let musicInfoTxt = `SCORE: ${game.state.musicInfo.score} | MISSES: ${game.state.musicInfo.misses} | COMBO: ${game.state.musicInfo.combo} (${game.state.musicInfo.misses <= 0 ? 'FC' : game.state.musicInfo.bestCombo}) | ACCURANCY: ${game.state.musicInfo.accuracy?.toFixed(2)}%`
    let musicInfoTxtOpponent = `SCORE: ${game.state.musicInfoOpponent.score || 0} | MISSES: ${game.state.musicInfoOpponent.misses || 0} | COMBO: ${game.state.musicInfoOpponent.combo || 0} (${game.state.musicInfoOpponent.combo ? game.state.musicInfoOpponent.misses <= 0 ? 'FC' : game.state.musicInfoOpponent.bestCombo : 'FC'}) ${game.state.musicInfoOpponent.misses <= 0 ? '(FC)' : ''} | ACCURANCY: ${(game.state.musicInfoOpponent.accuracy || 0)?.toFixed(2)}%`

    ctx.fillText(musicInfoTxt, game.state.online ? (canvas.width-canvas.width/4)-(ctx.measureText(musicInfoTxt).width/2) : canvas.width/2-(ctx.measureText(musicInfoTxt).width/2), canvas.height-20);
    if (game.state.online) ctx.fillText(musicInfoTxtOpponent, canvas.width/4-(ctx.measureText(musicInfoTxtOpponent).width/2), canvas.height-20);

    ctx.font = `bold 10px Arial`
    ctx.fillText(`Difficulty: ${game.state.musicInfo.difficulty}`, 2, canvas.height-5);
    ctx.fillText(`Beat: ${game.state.musicBeat}`, 2, canvas.height-15);
    ctx.fillText(`Step: ${game.state.musicStep}`, 2, canvas.height-25); 
    if (game.state.musicInfo.dev) {
        ctx.fillStyle = 'rgb(255, 0, 0)'
        ctx.fillText(`In development`, 2, canvas.height-35); 
    }
    
    let introImage = game.state.images[`intro/${game.state.countdown}.png`]
    if (game.state.countdown >= 0 && introImage) {
        let introWidth = introImage.image.width*0.4
        let introHeight = introImage.image.height*0.4
        ctx.drawImage(introImage.image, canvas.width/2-(introWidth/2), canvas.height/2-(introHeight/2), introWidth, introHeight);
    }

    ctx.font = `bold 13px Arial`
    ctx.globalAlpha = game.state.animations.ratingImage.frame > 15 ? (5-(game.state.animations.ratingImage.frame-15))/5 : 1
    let ratingImage = game.state.images[`ratings/${game.state.musicInfo.rating?.name}.png`]
    if (ratingImage) {
        let ratingImageWidth = ratingImage.image.width*0.25
        let ratingImageHeight = ratingImage.image.height*0.25
        let ratingImageY = (game.state.arrowsYLine+(game.state.arrowsSize**game.state.resizeNote/2)-(ratingImage.image.height*0.3/2))-50*((game.state.animations.ratingImage.frame/20))
        let ratingImageX = game.state.arrowsInfo[0]?.defaultX-ratingImageWidth-game.state.spaceBetweenArrows

        ctx.drawImage(ratingImage.image, ratingImageX, ratingImageY, ratingImageWidth, ratingImageHeight);

        ctx.fillStyle = game.state.musicInfo.rating?.name == 'good' || game.state.musicInfo.rating?.name == 'sick' ? 'rgb(19, 189, 0)' : 'rgb(220, 0, 0)'
        ctx.fillText(game.state.musicInfo.hitNote?.toFixed(2)+'ms', ratingImageX+ratingImageWidth-(ctx.measureText(game.state.musicInfo.hitNote?.toFixed(2)+'ms').width), ratingImageY+ratingImageHeight+8);
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