export default async (canvas, game, Listener, functions) => {
    const ctx = canvas.getContext('2d')

    let menuSelect = game.state.selectMenuOption.menuSelect
    let Y = (canvas.height/2-(70/2)+47)-menuSelect*(70)

    for (let i in game.state.selectMenuOption.menuOptions) {
        let X = 20//canvas.width*0.2//-(Math.abs(canvas.height/2-Y))

        ctx.font = `bold ${menuSelect == i ? canvas.width/canvas.height*45 : canvas.width/canvas.height*44}px Arial`
        ctx.fillStyle = 'white'//menuSelect == i ? 'black' : 'white'
        ctx.fillText(game.state.selectMenuOption.menuOptions[i], (menuSelect == i ? 20 : 0)+X, Y);

        if (menuSelect == i) {
            ctx.fillStyle = 'rgba(255, 255, 255, 0.1)'
            ctx.fillRect(0, Y-(canvas.width/canvas.height*45)+10, canvas.width, canvas.width/canvas.height*45+10)
        }
        /*ctx.lineWidth = 4
        ctx.strokeStyle  = menuSelect == i ? 'white' : 'black'
        ctx.strokeText(game.state.selectMenuOption.menuOptions[i], (menuSelect == i ? 20 : 0)+X, Y);*/

        Listener.state.buttons[`Menu-${i}`] = {
            gameStage: [ 'menu' ],
            minX: X/canvas.width*1000,
            maxX: (X+ctx.measureText(game.state.selectMenuOption.menuOptions[i]).width)/canvas.width*1000,
            minY: (Y-(menuSelect == i ? canvas.width/canvas.height*45 : canvas.width/canvas.height*44))/canvas.height*1000,
            maxY: Y/canvas.height*1000,
            pointer: true,
            over: false,
            onClick: () => {
                game.state.selectMenuOption.menuSelect = i
                Listener.handleKeys({ event: { code: 'Enter' }, on: true })
            }
        }
        
        Y += canvas.height*0.18
    }

    ctx.fillStyle = 'rgb(170, 170, 170)'
    ctx.fillRect(canvas.width/2, 0, canvas.width/2, canvas.height)

    ctx.fillStyle = 'rgb(40, 40, 150)'
    ctx.fillRect(canvas.width/2-10, 0, 20, canvas.height)

    ctx.font = `bold ${canvas.width/canvas.height*30}px Arial`
    ctx.fillStyle = 'black'
    ctx.fillText('Atualizações', canvas.width-canvas.width/4-ctx.measureText('Atualizações').width/2, canvas.height*0.18);
    ctx.lineWidth = 3
    ctx.strokeStyle  = 'white'
    ctx.strokeText('Atualizações', canvas.width-canvas.width/4-ctx.measureText('Atualizações').width/2, canvas.height*0.18);

    let resizeMsg = 0.04
    let msgArr = [
        { msg: '- Menu do jogo atualizado', color: 'rgb(50, 70, 150)' },
        { msg: '- HUD atualizada', color: 'rgb(50, 70, 150)' },
        { msg: '' },
        { msg: '- Música "Pasta Night" do mod', color: 'rgb(0, 120, 70)' },
        { msg: '  lullaby terminada', color: 'rgb(0, 120, 70)' },
    ]

    //'rgb(50, 70, 150)'
    //'rgb(150, 70, 50)'
    //'rgb(150, 50, 50)'
    //'rgb(0, 120, 70)'

    let msgX = canvas.width/2+(canvas.width*0.05)
    let msgY = canvas.height/3
    //msgY = (canvas.height-canvas.height/2.5)+(-((msgArr.length-1)*(canvas.width/2*resizeMsg)/2))
    for (let i in msgArr) {
        let msg = msgArr[i].msg

        ctx.fillStyle = msgArr[i].color || 'black'
        ctx.font = `bold ${canvas.width/2*resizeMsg}px Arial`
        ctx.fillText(msg, msgX/*-(ctx.measureText(msg).width/2)*/, msgY);

        msgY += canvas.width/2*resizeMsg
    }
}