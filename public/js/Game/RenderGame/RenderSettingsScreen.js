export default async (canvas, game, Listener) => {
    const ctx = canvas.getContext('2d')

    let settingsSelect = game.state.selectSettingsOption.settingsSelect
    let Y = (canvas.height/2-(80/2)+47)-settingsSelect*(80)

    for (let i in game.state.selectSettingsOption.settingsOptions) {
        let X = 20//canvas.width*0.2//-(Math.abs(canvas.height/2-Y))

        if (settingsSelect == i && game.state.selectSettingsOption.settingsOptions[i].type != 'ConfigTitle') {
            ctx.fillStyle = 'rgba(255, 255, 255, 0.1)'
            ctx.fillRect(0, Y-50, canvas.width, 60)
        }

        ctx.font = `bold ${settingsSelect == i ? 60 : 50}px Arial`
        if (game.state.selectSettingsOption.settingsOptions[i].type == 'ConfigTitle') {
            ctx.font = `bold 80px Arial`
            ctx.fillStyle = settingsSelect == i ? 'rgb(40, 40, 90)' : 'rgb(50, 50, 50)'
            ctx.fillText(game.state.selectSettingsOption.settingsOptions[i].name, canvas.width/2-(ctx.measureText(game.state.selectSettingsOption.settingsOptions[i].name).width/2), Y);

            ctx.lineWidth = 4
            ctx.strokeStyle  = 'white'
            ctx.strokeText(game.state.selectSettingsOption.settingsOptions[i].name, canvas.width/2-(ctx.measureText(game.state.selectSettingsOption.settingsOptions[i].name).width/2), Y);
        } else /*if (settingsSelect == i) {
            ctx.lineWidth = 4
            ctx.strokeStyle  = 'white'
            ctx.strokeText(game.state.selectSettingsOption.settingsOptions[i].name, (settingsSelect == i ? 20 : 0)+X, Y);
        } else*/ {
            ctx.fillStyle = 'white'
            ctx.fillText(game.state.selectSettingsOption.settingsOptions[i].name, (settingsSelect == i ? 20 : 0)+X, Y);
        }

        ctx.fillStyle = 'white'
        ctx.font = `bold 50px Arial`
        if (game.state.selectSettingsOption.settingsOptions[i].content != undefined) 
            ctx.fillText(game.state.selectSettingsOption.settingsOptions[i].content.toString(), canvas.width-ctx.measureText(game.state.selectSettingsOption.settingsOptions[i].content.toString()).width-X, Y);
        
        Y += 80
    }

    if (Listener.state.onChangeKeyBind) {
        let popupWidth = canvas.width/2
        let popupHeight = canvas.height/2
        ctx.fillStyle = 'rgb(100, 100, 100)'
        ctx.fillRect(popupWidth/2, popupHeight/2, popupWidth, popupHeight)


        let resizeMsg = 0.05
        let msgArr = [
            'Press the key you want to configure',
            'or press ESC to exit',
            '',
            'Pressione a tecla que deseja configurar',
            'ou pressione ESC para sair'
        ]

        let msgY = -(msgArr.length*(popupWidth*resizeMsg)/2)
        for (let i in msgArr) {
            let msg = msgArr[i]

            ctx.fillStyle = 'white'
            ctx.font = `bold ${popupWidth*resizeMsg}px Arial`
            ctx.fillText(msg, canvas.width/2-(ctx.measureText(msg).width/2), canvas.height/2+msgY);

            msgY += popupWidth*resizeMsg
        }
    }
}