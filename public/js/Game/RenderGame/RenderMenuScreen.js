export default async (canvas, game, Listener, functions) => {
    const ctx = canvas.getContext('2d')

    let menuSelect = game.state.selectMenuOption.menuSelect
    let Y = (canvas.height/2-(70/2)+47)-menuSelect*(70)

    for (let i in game.state.selectMenuOption.menuOptions) {
        let X = 20//canvas.width*0.2//-(Math.abs(canvas.height/2-Y))

        ctx.font = `bold ${menuSelect == i ? 110 : 100}px Arial`
        ctx.fillStyle = menuSelect == i ? 'black' : 'white'
        ctx.fillText(game.state.selectMenuOption.menuOptions[i], (menuSelect == i ? 20 : 0)+X, Y);

        ctx.lineWidth = 4
        ctx.strokeStyle  = menuSelect == i ? 'white' : 'black'
        ctx.strokeText(game.state.selectMenuOption.menuOptions[i], (menuSelect == i ? 20 : 0)+X, Y);

        Listener.state.buttons[`Menu-${i}`] = {
            gameStage: [ 'menu' ],
            minX: X/canvas.width*1000,
            maxX: (X+ctx.measureText(game.state.selectMenuOption.menuOptions[i]).width)/canvas.width*1000,
            minY: (Y-(menuSelect == i ? 110 : 100))/canvas.height*1000,
            maxY: Y/canvas.height*1000,
            pointer: true,
            over: false,
            onClick: () => {
                game.state.selectMenuOption.menuSelect = i
                Listener.handleKeys({ event: { code: 'Enter' }, on: true })
            }
        }
        
        Y += 150
    }
}