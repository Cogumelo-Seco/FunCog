export default async (canvas, game, Listener, functions) => {
    const ctx = canvas.getContext('2d')

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
    
    if (!game.state.videoBackground) {
        ctx.fillStyle = `rgba(0, 0, 0, ${game.state.gameBackgroundOfuscation})`
        ctx.fillRect(0, 0, canvas.width, canvas.height)
    }
}