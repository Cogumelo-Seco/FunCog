export default async (canvas, game, Listener) => {
    const ctx = canvas.getContext('2d')

    let settingsSelect = game.state.selectSettingsOption.settingsSelect
    let Y = (canvas.height/2-(70/2)+47)-settingsSelect*(70)

    for (let i in game.state.selectSettingsOption.settingsOptions) {
        let X = 20//canvas.width*0.2//-(Math.abs(canvas.height/2-Y))

        if (settingsSelect == i) {
            ctx.fillStyle = 'rgba(255, 255, 255, 0.1)'
            ctx.fillRect(0, Y-50, canvas.width, 60)
        }

        ctx.font = `bold ${settingsSelect == i ? 60 : 50}px Arial`
        if (settingsSelect == i) {
            ctx.lineWidth = 4
            ctx.strokeStyle  = 'white'
            ctx.strokeText(game.state.selectSettingsOption.settingsOptions[i].name, (settingsSelect == i ? 20 : 0)+X, Y);
        } else {
            ctx.fillStyle = 'white'
            ctx.fillText(game.state.selectSettingsOption.settingsOptions[i].name, (settingsSelect == i ? 20 : 0)+X, Y);
        }

        ctx.fillStyle = 'white'
        ctx.font = `bold 50px Arial`
        ctx.fillText(game.state.selectSettingsOption.settingsOptions[i].content.toString(), canvas.width-ctx.measureText(game.state.selectSettingsOption.settingsOptions[i].content.toString()).width-X, Y);
        
        Y += 70
    }
}