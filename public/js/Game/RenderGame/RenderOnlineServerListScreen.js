export default async (canvas, game, Listener, functions) => {
    const ctx = canvas.getContext('2d')

    ctx.font = 'bold 20px Arial'

    let createServerButtonWidth = canvas.width*0.15
    let createServerButtonHeight = createServerButtonWidth/5
    let createServerButtonX = 10
    let createServerButtonY = canvas.height/2-createServerButtonHeight/2

    ctx.fillStyle = game.state.selectServerOption.createServer == true ? 'rgb(40, 40, 90)' : 'rgb(50, 50, 50)'
    ctx.strokeStyle = 'white'
    ctx.fillRect(createServerButtonX, createServerButtonY, createServerButtonWidth, createServerButtonHeight)
    ctx.rect(createServerButtonX, createServerButtonY, createServerButtonWidth, createServerButtonHeight)
    ctx.stroke()

    ctx.font = `bold ${createServerButtonWidth*0.1}px Arial`
    ctx.fillStyle = 'white'
    ctx.fillText('Create server', createServerButtonX+canvas.width*0.15/2-(ctx.measureText('Create server').width/2), createServerButtonY+(createServerButtonHeight/2)+(createServerButtonWidth*0.1/4))

    Listener.state.buttons[`OnlineServerList-CreateServer`] = {
        gameStage: [ 'onlineServerList' ],
        minX: createServerButtonX/canvas.width*1000,
        maxX: (createServerButtonX+createServerButtonWidth)/canvas.width*1000,
        minY: createServerButtonY/canvas.height*1000,
        maxY: (createServerButtonY+createServerButtonHeight)/canvas.height*1000,
        pointer: true,
        over: false,
        onClick: () => {
            game.state.selectServerOption.createServer = true
            Listener.handleKeys({ event: { code: 'Enter' }, on: true })
        }
    }

    let noServers = true
    let filtredServers = game.state.selectServerOption.listServers.filter(s => s.open)
    let serverSelect = game.state.selectServerOption.serverSelect
    let serverButtonMargin = 20
    let serverButtonWidth = canvas.width*0.5
    let serverButtonHeight = 50
    let X = canvas.width/2-serverButtonWidth/2
    let startY = 100
    let endY = canvas.height-startY
    let Y = startY+((endY-startY)*(serverSelect/(filtredServers.length)))-(serverSelect*(serverButtonHeight+serverButtonMargin))
    if (startY+((serverButtonHeight+serverButtonMargin)*filtredServers.length) < endY) Y = startY

    for (let i in filtredServers) {
        noServers = false

        ctx.fillStyle = game.state.selectServerOption.createServer == false && serverSelect == i ? 'rgb(40, 40, 90)' : 'rgb(50, 50, 50)'
        ctx.strokeStyle = 'white'
        ctx.fillRect(X, Y, serverButtonWidth, serverButtonHeight)
        ctx.rect(X, Y, serverButtonWidth, serverButtonHeight)
        ctx.stroke()

        let musicInfo =  game.state.musics[filtredServers[i].mod].musics[filtredServers[i].music]

        ctx.font = `bold 20px Arial`
        ctx.fillStyle = musicInfo.menuColor?.includes('RAINBOW') ? `hsl(${game.state.rainbowColor+(Number(musicInfo.menuColor.split('-')[1]) || 0)}, 100%, 50%)` : musicInfo.menuColor || 'white'
        ctx.fillText(musicInfo.name.replace(/[-]/g, ' '), X+10, Y+(serverButtonHeight/2)+(20/4))
        ctx.fillStyle = game.state.difficulties[musicInfo.difficulties[filtredServers[i].difficulty]].color || 'white'
        ctx.fillText(game.state.difficulties[musicInfo.difficulties[filtredServers[i].difficulty]].name, (X+serverButtonWidth)-(ctx.measureText(game.state.difficulties[filtredServers[i].difficulty].name).width)-10, Y+(serverButtonHeight/2)+(20/4))

        Listener.state.buttons[`OnlineServerList-Server${i}`] = {
            gameStage: [ 'onlineServerList' ],
            minX: X/canvas.width*1000,
            maxX: (X+serverButtonWidth)/canvas.width*1000,
            minY: (Y)/canvas.height*1000,
            maxY: (Y+serverButtonHeight)/canvas.height*1000,
            pointer: true,
            over: false,
            onClick: () => {
                if (game.state.selectServerOption.serverSelect === i) Listener.handleKeys({ event: { code: 'Enter' }, on: true })
                game.state.selectServerOption.createServer = false
                game.state.selectServerOption.serverSelect = i
            }
        }

        Y += serverButtonHeight+serverButtonMargin
    }

    if (noServers) {
        game.state.selectServerOption.createServer = true

        ctx.font = 'bold 30px Arial'
        ctx.fillStyle = 'rgb(255, 100, 100)'
        ctx.fillText('No servers created yet', canvas.width/2-(ctx.measureText('No servers created yet').width/2), canvas.height/2)
    }
}