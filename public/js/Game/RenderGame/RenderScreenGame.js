export default async (canvas, game, Listener) => {
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
    
    if (game.state.smallFunctions.getConfig('ShowBackground')) canvas.style.backgroundImage = `url(https://raw.githubusercontent.com/Cogumelo-Seco/Cogu-FNF-Files/main/imgs/${game.state.musicInfo.backgroundImage})`
    else canvas.style.backgroundImage = null
    
    ctx.fillStyle = `rgba(0, 0, 0, 0.7)`
    ctx.fillRect(0, 0, canvas.width, canvas.height)
}