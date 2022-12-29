export default async (canvas, game, Listener) => {
    const ctx = canvas.getContext('2d')
    ctx.globalAlpha = game.state.alphaHUD

    let loadingBarWidth = canvas.width*0.25
    let loadingBarHeight = 20
    let loadingPercent = game.state.loadingSong.loaded/game.state.loadingSong.total

    if (loadingPercent < 1) {
        ctx.fillStyle = 'black'
        ctx.fillRect(0, 0, canvas.width, canvas.height)

        ctx.fillStyle = 'rgb(100, 100, 100)'
        ctx.fillRect(canvas.width/2-loadingBarWidth/2, canvas.height/2-loadingBarHeight/2, loadingBarWidth, loadingBarHeight)

        ctx.fillStyle = 'rgb(19, 189, 0)'
        ctx.fillRect(canvas.width/2-loadingBarWidth/2, canvas.height/2-loadingBarHeight/2, loadingBarWidth*loadingPercent, loadingBarHeight)

        ctx.font = `bold 15px Arial`
        ctx.fillStyle = 'white'
        ctx.fillText((Number.parseInt(loadingPercent*100))+'%', canvas.width/2-(ctx.measureText((Number.parseInt(loadingPercent*100))+'%').width/2), canvas.height/2-loadingBarHeight/2+15);

        ctx.lineWidth = 2.5
        ctx.strokeStyle = 'black'
        ctx.strokeRect(canvas.width/2-loadingBarWidth/2, canvas.height/2-loadingBarHeight/2, loadingBarWidth, loadingBarHeight)

        ctx.font = `bold 10px Arial`
        ctx.fillStyle = 'rgba(255, 255, 255, 0.1)'
        ctx.fillText(game.state.loadingSong.msg, canvas.width/2-(ctx.measureText(game.state.loadingSong.msg).width/2), canvas.height/2+loadingBarHeight+5)

        return
    }

    let musicDuration = game.state.music?.duration || 0
    let musicCurrentTime = game.state.music?.currentTime || 0
    let musicPercent = game.state.musicData?.played || 0
    let musicLoadedPercent = game.state.musicData?.loaded || 0

    ctx.font = `bold 15px Arial`
    let infoTxt = `${game.state.musicInfo.name.replace(/-/g, ' ')} - (${formatTime(musicCurrentTime)} / ${formatTime(musicDuration)}) - ${(musicPercent*100).toFixed(2)}%`

    let musicBarWidth = canvas.width*0.25 > ctx.measureText(infoTxt).width+10 ? canvas.width*0.25 : ctx.measureText(infoTxt).width+10
    let musicBarHeight = 20
    let musicBarY = game.state.smallFunctions.getConfig('DownScroll') ? 10 : canvas.height-30

    ctx.fillStyle = 'rgb(100, 100, 100)'
    ctx.fillRect(canvas.width/2-musicBarWidth/2, musicBarY, musicBarWidth, musicBarHeight)

    ctx.fillStyle = 'rgba(0, 0, 0, 0.5)'
    ctx.fillRect(canvas.width/2-musicBarWidth/2, musicBarY, musicBarWidth*musicLoadedPercent, musicBarHeight)

    ctx.fillStyle = `hsl(${musicPercent*720}, 100%, 40%)`//'rgb(19, 189, 0)'
    ctx.fillRect(canvas.width/2-musicBarWidth/2, musicBarY, musicBarWidth*musicPercent, musicBarHeight)

    ctx.fillStyle = 'white'
    ctx.fillText(infoTxt, canvas.width/2-(ctx.measureText(infoTxt).width/2), musicBarY+15);

    ctx.font = `10px Arial`
    if ((musicLoadedPercent*100) < 100) ctx.fillText(Number.parseInt(musicLoadedPercent*100)+'%', canvas.width/2-musicBarWidth/2-(ctx.measureText(Number.parseInt(musicLoadedPercent*100)+'%').width)-3, musicBarY+14);

    ctx.lineWidth = 2.5
    ctx.strokeStyle = 'black'
    ctx.strokeRect(canvas.width/2-musicBarWidth/2, musicBarY, musicBarWidth, musicBarHeight)

    let alertImage = game.state.images[`imgs/alert.png`]?.image
    if (game.state.musicInfo.dev && alertImage) {
        let X = canvas.width/2+musicBarWidth/2
        let Y = musicBarY+20
        ctx.font = `bold 15px Arial`
        ctx.fillStyle = 'rgb(255, 0, 0)'
        ctx.drawImage(alertImage, X+5, Y-28, 30, 30)
        ctx.fillText('In development', X+35, Y-(15/2));
    }

    let invertArrowPos = game.state.musicInfo.playerId == 2 ? game.state.invertArrowPos ? false : true : game.state.invertArrowPos

    let healthBarWidth = canvas.width*0.5
    let healthBarHeight = 20
    let healthBarY = game.state.smallFunctions.getConfig('DownScroll') ? 40 : canvas.height-60
    let healthPercent = game.state.online ? game.state.musicInfoOpponent.health/(game.state.musicInfo.health+game.state.musicInfoOpponent.health) : 1-(game.state.musicInfo.health/100)
    healthPercent = healthPercent > 1 ? 1 : healthPercent < 0 ? 0 : healthPercent

    ctx.fillStyle = invertArrowPos ? 'red' : 'rgb(49, 176, 209)'//'rgb(19, 189, 0)'
    ctx.fillRect(canvas.width/2-healthBarWidth/2, healthBarY, healthBarWidth, healthBarHeight)

    ctx.fillStyle = invertArrowPos ? 'rgb(49, 176, 209)' : 'red'
    ctx.fillRect(canvas.width/2-healthBarWidth/2, healthBarY, healthBarWidth*(invertArrowPos ? 1-healthPercent : healthPercent), healthBarHeight)

    ctx.lineWidth = 2.5
    ctx.strokeStyle = 'black'
    ctx.strokeRect(canvas.width/2-healthBarWidth/2, healthBarY, healthBarWidth, healthBarHeight)

    function drawIcon({ dir, flipY, imageType }) {
        let iconImage = game.state.images[dir].image
        if (!iconImage) return
        let iconResize = 0.86+(((game.state.music?.currentTime*15)%4+1)/100)
        let iconWidth = iconImage.width/2
        let iconHeight = iconImage.height
        let iconX = canvas.width/2-healthBarWidth/2+(healthBarWidth*(invertArrowPos ? 1-healthPercent : healthPercent))-(flipY ? 10 : iconWidth**iconResize-10)
        let iconY = healthBarY-(healthBarHeight)

        let scaleH = flipY ? -1 : 1
        let posX = flipY ? ((iconWidth**iconResize)+iconX)* -1 : iconX

        ctx.save();
        ctx.scale(scaleH, 1);
        
        ctx.drawImage(iconImage, imageType == 1 ? 0 : iconWidth, 0, iconWidth, iconHeight, posX, iconY, iconWidth**iconResize, iconHeight**iconResize)

        ctx.restore();
    }

    drawIcon({ dir: game.state.smallFunctions.getConfig('botPlay') && !game.state.online ? 'icons/BongoCat.png' : 'icons/icon-bf.png', imageType: healthPercent >= 0.80 ? 2 : 1, flipY: invertArrowPos ? false : true })
    drawIcon({ dir: game.state.online ? 'icons/icon-bf-red.png' : 'icons/icon-face.png', imageType: healthPercent <= 0.20 ? 2 : 1, flipY: invertArrowPos ? true : false })
    
    function formatTime(time) {
        if (!time) time = 0

        let keys = {
            minute: Number.parseInt(time/60%60),
            second: Number.parseInt(time%60)
        }

        let timeText = ''
        let oldKey;
        for (const key in keys) {
            timeText  += `${oldKey ? ':' : ''}${('00'+keys[key]).slice(-2)}`
            oldKey = key
        }
        if (!timeText) timeText = '00:00'
        return timeText
    }

    ctx.globalAlpha = 1
}