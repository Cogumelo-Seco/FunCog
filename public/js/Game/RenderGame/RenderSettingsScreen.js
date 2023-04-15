export default async (ctx, canvas, game, Listener, functions) => {
    let settingsSelect = game.state.selectSettingsOption.settingsSelect
    let Y = (canvas.height/2-(80/2)+47)-settingsSelect*(80)

    let options = game.state.selectSettingsOption.settingsOptions

    let lastTitle = null
    for (let i in options) {
        let config = options[i]
        let newConfig = []
        if (!config.type && lastTitle) {
            for (let a in options[i][lastTitle.content]) {
                config = options[i][lastTitle.content][a]
                newConfig.push(config)
            }
            options = options.slice(0, 1).concat(newConfig).concat(options.slice(2, options.length))
            game.state.selectSettingsOption.settingsOptionsFiltered = options
        }
        if (config.type == 'ConfigTitle') lastTitle = config
    }
    
    for (let i in options) {
        let config = options[i]
        let X = 20

        if (settingsSelect == i && config.type != 'ConfigTitle') {
            ctx.fillStyle = 'rgba(255, 255, 255, 0.1)'
            ctx.fillRect(0, Y-50, canvas.width, 60)
        }

        ctx.font = `bold ${settingsSelect == i ? 50 : 40}px Arial`
        if (config.type == 'ConfigTitle') {
            ctx.fillStyle = 'rgba(255, 255, 255, 0.3)'
            ctx.fillRect(0, Y-65, canvas.width, 90)

            ctx.font = `bold 80px Arial`
            ctx.fillStyle = settingsSelect == i ? 'rgb(40, 40, 90)' : 'rgb(50, 50, 50)'
            ctx.fillText(config.name, canvas.width/2-(ctx.measureText(config.name).width/2), Y);

            ctx.lineWidth = 4
            ctx.strokeStyle  = 'white'
            ctx.strokeText(config.name, canvas.width/2-(ctx.measureText(config.name).width/2), Y);
        } else {
            ctx.fillStyle = config.menuColor || 'white'
            ctx.fillText(config.name, (settingsSelect == i ? 20 : 0)+X, Y);

            Listener.state.buttons[`settings-${i}`] = {
                gameStage: [ 'settings' ],
                minX: 0,
                maxX: 1000,
                minY: (Y-30)/canvas.height*1000,
                maxY: Y/canvas.height*1000,
                pointer: true,
                over: false,
                songClick: 'Sounds/scrollMenu.ogg',
                onClick: () => {
                    game.state.selectSettingsOption.settingsSelect = i
                    Listener.handleKeys({ event: { code: 'Enter' }, on: true })
                }
            }
        }

        ctx.fillStyle = config.menuColor || 'white'
        ctx.font = `bold 50px Arial`
        if (config.content != undefined) {
            let configContent = config.content

            if (settingsSelect == i && config.type == 'Number') {
                ctx.fillText('< '+configContent.toString()+' >', canvas.width-ctx.measureText('< '+configContent.toString()+' >').width-X, Y);
            } else if (config.type == 'Boolean') {
                let checkImageData = game.state.images['imgs/check.png']
                if (checkImageData) {
                    let checkImage = game.state.images['imgs/check.png'].image
                    let checkImagePos = game.state.images['imgs/check.png'].animationConfig[configContent ? 'checkFinished' : 'uncheckFinished'][0]
                    let checkResize = 0.5
                    let checkWidth = checkImagePos.width*checkResize
                    let checkHeight = checkImagePos.height*checkResize

                    ctx.drawImage(checkImage, checkImagePos.x, checkImagePos.y, checkImagePos.width, checkImagePos.height, canvas.width-checkWidth-X, Y-(checkHeight)+16, checkWidth, checkHeight)
                }
            } else if (config.type == 'ConfigTitle') {
                ctx.fillStyle = 'rgb(50, 50, 50)'
                ctx.fillRect(canvas.width-canvas.width/6-ctx.measureText(configContent.toString()).width/2-X-10, Y-50, ctx.measureText(configContent.toString()).width+20, 60)

                ctx.fillStyle = 'white'
                ctx.fillText(configContent.toString(), canvas.width-canvas.width/6-ctx.measureText(configContent.toString()).width/2-X, Y);
            } else {
                ctx.fillText(configContent.toString(), canvas.width-ctx.measureText(configContent.toString()).width-X, Y);
            }
        }
        
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

        let msgY = -((msgArr.length-1)*(popupWidth*resizeMsg)/2)
        for (let i in msgArr) {
            let msg = msgArr[i]

            ctx.fillStyle = 'white'
            ctx.font = `bold ${popupWidth*resizeMsg}px Arial`
            ctx.fillText(msg, canvas.width/2-(ctx.measureText(msg).width/2), canvas.height/2+msgY);

            msgY += popupWidth*resizeMsg
        }
    }
}