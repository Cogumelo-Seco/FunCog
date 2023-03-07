export default async (canvas, game, Listener, functions) => {
    const ctx = canvas.getContext('2d')

    let a = 3 * (10 ** (-3))

    let getNewDistance = (S0, v, t) => S0 + v*t + 0.5 * (a*t)**2

    let timeGap = +new Date()-game.state.gravity.time
    game.state.gravity.time = +new Date()
    game.state.gravity.distance = Math.max(getNewDistance(game.state.gravity.distance, game.state.gravity.v, timeGap), 0)

    console.log(game.state.gravity.v, game.state.gravity.distance)

    if (game.state.gravity.distance <= 0) {
        game.state.gravity.v = game.state.gravity.v > -0.2 ? 0 : (game.state.gravity.v * -1) * (1-game.state.gravity.bounce/200)
    } else game.state.gravity.v = game.state.gravity.v - (a * timeGap)

    let X = canvas.width/2-25
    let Y = canvas.height-(100)-game.state.gravity.distance

    ctx.fillStyle = 'yellow'
    ctx.fillRect(X, Y, 50, 50)

    ctx.fillStyle = 'red'
    ctx.fillRect(0, canvas.height-(50), canvas.width, 100)
}