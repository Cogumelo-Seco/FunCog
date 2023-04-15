export default async (ctx, canvas, game, Listener, functions) => {
    ctx.fillStyle = 'rgb(0, 0, 0, 0.7)'
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    ctx.fillStyle = 'rgb(255, 255, 255)'
    ctx.font = `bold ${(canvas.width+canvas.height)*0.03}px Arial`
    ctx.fillText('Pause', canvas.width/2-ctx.measureText('Pause').width/2, 80)

    let pauseOptions = game.state.selectPauseOption.pauseOptions
    let pauseSelect = game.state.selectPauseOption.pauseSelect

    let margin = 20
    let textSize = (canvas.width+canvas.height)*0.02
    let X = canvas.width/10
    let Y = canvas.height/2-(pauseOptions.length*(textSize)/2)

    for (let i in pauseOptions) {
        ctx.fillStyle = pauseSelect == i ? 'black' : 'white'
        ctx.font = `bold ${pauseSelect == i ? textSize*1.2 : textSize}px Arial`
        ctx.fillText(pauseOptions[i].name, pauseSelect == i ? X+5 : X, Y);

        ctx.lineWidth = 2
        ctx.strokeStyle = pauseSelect == i  ? 'white' : 'black'
        ctx.strokeText(pauseOptions[i].name, pauseSelect == i ? X+5 : X, Y);

        Listener.state.buttons[`Pause-${i}`] = {
            gameStage: [ 'game' ],
            minX: X/canvas.width*1000,
            maxX: (X+ctx.measureText(pauseOptions[i].name).width)/canvas.width*1000,
            minY: (Y-(pauseSelect == i ? textSize*1.2 : textSize))/canvas.height*1000,
            maxY: Y/canvas.height*1000,
            pointer: true,
            over: false,
            onClick: () => {
                game.state.selectPauseOption.pauseSelect = i
                Listener.handleKeys({ event: { code: 'Enter' }, on: true })
            }
        }

        Y += textSize+margin
    }
}