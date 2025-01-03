export default async (ctx, canvas, game, Listener, functions) => {
    ctx.globalAlpha = game.state.alphaHUD

    let loadingBarWidth = canvas.width*0.30
    let loadingBarHeight = 13
    let loadingBarMarginIn = 2
    let loadingPercent = game.state.loadingSong.loaded/game.state.loadingSong.total

    if (!game.state.loadingSong.complete) {
        ctx.fillStyle = 'black'
        ctx.fillRect(0, 0, canvas.width, canvas.height)

        ctx.fillStyle = 'white'
        ctx.fillRect(canvas.width/2-loadingBarWidth/2+loadingBarMarginIn, canvas.height/2-loadingBarHeight/2+loadingBarMarginIn, loadingBarWidth*loadingPercent-(loadingBarMarginIn*2), loadingBarHeight-(loadingBarMarginIn-2))

        ctx.lineWidth = 2.5
        ctx.strokeStyle = 'white'
        ctx.strokeRect(canvas.width/2-loadingBarWidth/2-loadingBarMarginIn, canvas.height/2-loadingBarHeight/2-loadingBarMarginIn, loadingBarWidth+(loadingBarMarginIn*4), loadingBarHeight+(loadingBarMarginIn*4))

        /*ctx.fillStyle = 'rgb(100, 100, 100)'
        ctx.fillRect(canvas.width/2-loadingBarWidth/2, canvas.height/2-loadingBarHeight/2, loadingBarWidth, loadingBarHeight)

        ctx.fillStyle = 'rgb(19, 189, 0)'
        ctx.fillRect(canvas.width/2-loadingBarWidth/2, canvas.height/2-loadingBarHeight/2, loadingBarWidth*loadingPercent, loadingBarHeight)

        ctx.font = `bold 15px Arial`
        ctx.fillStyle = 'white'
        ctx.fillText((Number.parseInt(loadingPercent*100))+'%', canvas.width/2-(ctx.measureText((Number.parseInt(loadingPercent*100))+'%').width/2), canvas.height/2-loadingBarHeight/2+15);

        ctx.lineWidth = 2.5
        ctx.strokeStyle = 'black'
        ctx.strokeRect(canvas.width/2-loadingBarWidth/2, canvas.height/2-loadingBarHeight/2, loadingBarWidth, loadingBarHeight)*/

        ctx.font = `bold 10px Arial`
        ctx.fillStyle = 'rgba(255, 255, 255, 0.1)'
        ctx.fillText(game.state.loadingSong.msg, canvas.width/2-(ctx.measureText(game.state.loadingSong.msg).width/2), canvas.height/2+loadingBarHeight+15)

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
    let musicBarY = 5//game.state.smallFunctions.getConfig('DownScroll') ? 10 : canvas.height-30
    let musicBarX = canvas.width/2-(musicBarWidth/2)//canvas.width-musicBarWidth-canvas.width*0.06
    
    ctx.fillStyle = 'rgb(100, 100, 100)'
    ctx.fillRect(musicBarX, musicBarY, musicBarWidth, musicBarHeight)

    //ctx.fillStyle = 'rgba(0, 0, 0, 0.5)'
    //ctx.fillRect(musicBarX, musicBarY, musicBarWidth*musicLoadedPercent, musicBarHeight)

    ctx.fillStyle = `hsl(${musicPercent*720}, 100%, 40%)`
    ctx.fillRect(musicBarX, musicBarY, musicBarWidth*musicPercent, musicBarHeight)

    ctx.fillStyle = 'white'
    //ctx.fillText(infoTxt, canvas.width/2-(ctx.measureText(infoTxt).width/2), musicBarY+15);
    functions.fillText({
        text: infoTxt,
        x: musicBarX+(musicBarWidth/2)-(ctx.measureText(infoTxt).width/2),
        y: musicBarY+15,
        add: 2
    })

    //ctx.font = `10px Arial`
    //if ((musicLoadedPercent*100) < 100) ctx.fillText(Number.parseInt(musicLoadedPercent*100)+'%', musicBarX+musicBarWidth+3, musicBarY+14);

    ctx.lineWidth = 2.5
    ctx.strokeStyle = 'black'
    ctx.strokeRect(musicBarX, musicBarY, musicBarWidth, musicBarHeight)


    let healthBarWidth = canvas.width*0.5
    let healthBarHeight = 20
    let healthBarX = canvas.width/2-healthBarWidth/2
    let healthBarY = 30
    let healthPercent = (100-game.state.musicInfo.health)/100
    healthPercent = healthPercent > 1 ? 1 : healthPercent < 0 ? 0 : healthPercent

    ctx.fillStyle = `hsl(${100-healthPercent*100}, 100%, 40%)`
    ctx.fillRect(healthBarX, healthBarY, healthBarWidth, healthBarHeight)

    ctx.fillStyle = 'rgb(100, 100, 100)'//'white'
    ctx.fillRect(healthBarX, healthBarY, healthBarWidth*healthPercent, healthBarHeight)
/*
    ctx.font = `bold 15px Arial`
    functions.fillText({
        text: (healthPercent*100).toFixed(1)+'%',
        x: healthBarX+(healthBarWidth/2)-(ctx.measureText((healthPercent*100).toFixed(1)+'%').width/2),
        y: healthBarY+15,
        add: 2,
    })*/

    ctx.lineWidth = 2.5
    ctx.strokeStyle = 'black'
    ctx.strokeRect(healthBarX, healthBarY, healthBarWidth, healthBarHeight)


    function drawIcon({ dir, flipY, imageType }) {
        let iconImage = game.state.images[dir]?.image
        if (!iconImage) return
        let iconResize = 0.4+0.2*(((game.state.music?.currentTime*(game.state.musicBPM/60)*4)%4+1)/5)
        let iconWidth = iconImage.width/2
        let iconHeight = iconImage.height
        let iconX = canvas.width/2-healthBarWidth/2+(healthBarWidth*(healthPercent))-(flipY ? 10 : iconWidth*iconResize-10)
        let iconY = healthBarY-(healthBarHeight)

        let scaleH = flipY ? -1 : 1
        let posX = flipY ? ((iconWidth*iconResize)+iconX)* -1 : iconX

        ctx.save();
        ctx.scale(scaleH, 1);
        
        ctx.drawImage(iconImage, imageType == 1 ? 0 : iconWidth, 0, iconWidth, iconHeight, posX, iconY, iconWidth*iconResize, iconHeight*iconResize)

        ctx.restore();
    }

    drawIcon({ dir: game.state.smallFunctions.getConfig('botPlay') ? 'icons/icon-BongoCat.png' : 'icons/icon-Cogu.png', imageType: healthPercent >= 0.90 ? 2 : 1, flipY: true })
    drawIcon({ dir: 'icons/icon-Guto.png', imageType: healthPercent <= 0.10 ? 2 : 1, flipY: false })
    
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