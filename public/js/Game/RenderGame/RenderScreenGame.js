export default async (ctx, canvas, game, Listener, functions) => {
    ctx.globalAlpha = 0
    for (let i in game.state.toLoadInScreen) {
        let data = game.state.toLoadInScreen[i]
        let image = data.image
        data.counter += 1

        if (data.counter > 5) delete game.state.toLoadInScreen[i]

        if (image) ctx.drawImage(image, 0, 0)
        else if (!['Inst.ogg', 'Voices.ogg', 'Inst.mp3', 'Voices.mp3'].includes(i.split('/')[i.split('/').length-1])) game.playSong(i, { volume: 0 })
    }
    ctx.globalAlpha = 1
    
    let gameBackground = document.getElementById('gameBackground')
    gameBackground.style.display = 'none'
    if (game.state.smallFunctions.getConfig('ShowBackground') && (game.state.musicInfo.backgroundImage || game.state.musicInfo.dynamicBackgroundImage)) {
        if (game.state.musicInfo.dynamicBackgroundImage) {
            gameBackground.style.display = 'block'
            gameBackground.style.left = game.state.backgroundInfo.movementX-(game.state.backgroundInfo.zoom/2)+'px'
            gameBackground.style.top = game.state.backgroundInfo.movementY-(game.state.backgroundInfo.zoom/2)+'px'
            gameBackground.style.width = window.innerWidth+(game.state.backgroundInfo.zoom)+'px'
            gameBackground.style.height = window.innerHeight+(game.state.backgroundInfo.zoom)+'px'
            gameBackground.style.transform = `rotate(${game.state.backgroundInfo.rotation}deg)`
            gameBackground.src = `https://raw.githubusercontent.com/Cogumelo-Seco/Cogu-FNF-Files/main/imgs/${game.state.musicInfo.dynamicBackgroundImage}`
        } canvas.style.backgroundImage = `url(https://raw.githubusercontent.com/Cogumelo-Seco/Cogu-FNF-Files/main/imgs/${game.state.musicInfo.backgroundImage})`
    } else canvas.style.backgroundImage = null
    
    if (game.state.music?.bufferLength && !game.state.videoBackground.src && !game.state.musicInfo.dynamicBackgroundImage /*&& !game.state.musicInfo.backgroundImage*/) {
        let bufferLength = game.state.music.bufferLength
        let barWidth = (canvas.width/(bufferLength*0.6)/2)
        let dataArr = game.state.music.dataArr

        game.state.music.analyser?.getByteFrequencyData(dataArr)
        let x = 0
        for (let i = Math.floor(bufferLength*0.6);i > 0;i--) {
            let barHeight = Math.floor((dataArr[i]/250)*canvas.height*0.7)
            //ctx.fillStyle = `hsl(${x/canvas.width*720}, 100%, 50%)`
            ctx.fillStyle = `hsl(${x/canvas.width*720-game.state.rainbowColor}, 50%, 50%)`
            ctx.fillRect(Math.floor(x)-1, canvas.height-barHeight, Math.floor(barWidth)+2, barHeight)
            x += barWidth
        }

        for (let i = 0;i <= Math.floor(bufferLength*0.6);i++) {
            let barHeight = Math.floor((dataArr[i]/250)*canvas.height*0.7)
            //ctx.fillStyle = `hsl(${x/canvas.width*720}, 100%, 50%)`
            ctx.fillStyle = `hsl(${x/canvas.width*720-game.state.rainbowColor}, 50%, 50%)`
            ctx.fillRect(Math.floor(x)-1, canvas.height-barHeight, Math.floor(barWidth)+2, barHeight)
            x += barWidth
        }
    }

    if (!game.state.videoBackground || game.state.videoBackground.style.display != 'block') {
        ctx.fillStyle = `rgba(0, 0, 0, ${game.state.smallFunctions.getConfig('BackgroundOfuscation')})`
        ctx.fillRect(0, 0, canvas.width, canvas.height)
    }
}