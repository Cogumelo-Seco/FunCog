module.exports = function renderGame(canvas, game, Listener) {
    const ctx = canvas.getContext('2d')

    ctx.font = 'bold 20px Arial'

    ctx.fillStyle = game.state.selectServerOption.createServer == true ? 'rgb(60, 60, 80)' : 'rgb(50, 50, 50)'
    ctx.strokeStyle = 'white'
    ctx.fillRect(10, canvas.height/2-25, canvas.width*0.15, 50)
    ctx.rect(10, canvas.height/2-25, canvas.width*0.15, 50)
    ctx.stroke()
    ctx.fillStyle = 'white'
    ctx.fillText('Create server', 10+canvas.width*0.15/2-(ctx.measureText('Create server').width/2), canvas.height/2)

    let noServers = true
    let serverSelect = game.state.selectServerOption.serverSelect
    let Y = (canvas.height/2-(80/2)+47)-serverSelect*(80)
    let X = canvas.width*0.2+10
    let endPosX = X+(canvas.width*0.8-(canvas.width*0.2)-40)
    
    for (let i in game.state.selectServerOption.listServers) {
        if (game.state.selectServerOption.listServers[i].open) {
            noServers = false

            ctx.fillStyle = game.state.selectServerOption.createServer == false && serverSelect == i ? 'rgb(60, 60, 80)' : 'rgb(50, 50, 50)'
            ctx.strokeStyle = 'white'
            ctx.fillRect(X, Y-10, endPosX-X, 50)
            ctx.rect(X, Y-10, endPosX-X, 50)
            ctx.stroke()

            ctx.fillStyle = game.state.musics[game.state.selectServerOption.listServers[i].music].menuColor || 'white'
            ctx.fillText(game.state.musics[game.state.selectServerOption.listServers[i].music].name, X+10, Y+20)
            ctx.fillStyle = game.state.difficulties[game.state.musics[game.state.selectServerOption.listServers[i].music].difficulties[game.state.selectServerOption.listServers[i].difficulty]].color || 'white'
            ctx.fillText(game.state.difficulties[game.state.musics[game.state.selectServerOption.listServers[i].music].difficulties[game.state.selectServerOption.listServers[i].difficulty]].name, endPosX-(ctx.measureText(game.state.difficulties[game.state.selectServerOption.listServers[i].difficulty].name).width)-10, Y+20)

            Y += 80
        }
    }

    if (noServers) {
        game.state.selectServerOption.createServer = true

        ctx.font = 'bold 30px Arial'
        ctx.fillStyle = 'rgb(255, 100, 100)'
        ctx.fillText('No servers created yet', canvas.width/2-(ctx.measureText('No servers created yet').width/2), canvas.height/2)
    }
}