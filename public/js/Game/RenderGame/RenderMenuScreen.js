export default async (ctx, canvas, game, Listener, functions) => {
    //let Y = (canvas.height/2-(70/2))-menuSelect*(70)
/*
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
        ctx.strokeText(game.state.selectMenuOption.menuOptions[i], (menuSelect == i ? 20 : 0)+X, Y);

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
                setTimeout(() => game.state.selectMenuOption.menuSelect = 0, 200)
            }
        }
        
        Y += canvas.height*0.18
    }*/

    let screenResize = Math.floor(Math.min(canvas.height*0.45, canvas.width*0.22))/150//canvas.width/canvas.height

    let screenElements = document.getElementById('screenElements')
    let notUpdate = screenElements && !screenElements.getElementsByClassName('menuElement')[0]
    try {
        let menuElement = screenElements.getElementsByClassName('menuElement')[0] || document.createElement('div')

        
        if (notUpdate) screenElements.innerHTML = ''
        menuElement.className = 'menuElement stage'

        let menuStyle = document.getElementById('menuStyle') || document.createElement('style')
        menuStyle.id = 'menuStyle'
        menuStyle.innerHTML = `
            #updateLogTitle {
                position: absolute;
                left: 0;
                top: 0;
                width: 100%;
                height: 10%;
                font-size: ${canvas.height*0.08}px;
                color: white;
                padding-top: 5px
            }
            #updateContent {
                position: absolute;
                text-align: left;
                left: 0;
                top: 14%;
                width: 100%;
                height: 88%;
                overflow: auto;
            }
            #updateDate {
                font-size: ${canvas.height*0.04}px;
                text-align: center;
                color: rgb(200, 200, 200);
                background-color: rgb(10, 0, 5);
                padding: 5px;
                margin: 10px ${canvas.width*0.05}px;
                margin-top: 25px
            }
            .updateContentText {
                font-size: ${canvas.height*0.035}px;
                background-color: rgb(20, 0, 10);
                padding: 10px;
                margin: 5px 0;
            }
            #updateNew {
                color: rgb(0, 255, 100);
            }
            #updateUpdate {
                color: rgb(0, 150, 255);
            }
            #updateRemoved {
                color: rgb(255, 50, 50);
            }
            #updateWarning {
                color: rgb(255, 200, 0);
            }

            @keyframes logo {
                5% {
                    transform: rotateX(0deg);
                }
                10% {
                    transform: rotateX(360deg);
                }
                35% {
                    transform: rotateZ(360deg);
                }
                40% {
                    transform: rotateZ(0deg);
                }
                65% {
                    transform: rotateY(0deg);
                }
                70% {
                    transform: rotateY(360deg);
                }
                100% {
                    transform: rotateY(360deg);
                }
            }
            @keyframes optionButtonOver {
                from {
                    scale: 1
                }
                to {
                    background-color: rgb(40, 20, 30);
                    scale: 1.02
                }
            }
            @keyframes optionButtonOut {
                from {
                    background-color: rgb(40, 20, 30);
                    scale: 1.02
                }
                to {
                    scale: 1
                }
            }
            @keyframes rotate {
                from {
                    transform: rotateZ(0deg);
                }
                to {
                    transform: rotateZ(360deg);
                }
            }
        `
        if (notUpdate) menuElement.appendChild(menuStyle)

        let Y = canvas.height*0.29
        for (let i in game.state.selectMenuOption.menuOptions) {
            let optionElement = document.getElementById(i+'-menuOptions') || document.createElement('button')
            optionElement.id = i+'-menuOptions'
            optionElement.innerText = game.state.selectMenuOption.menuOptions[i]
            optionElement.style.width = canvas.width*0.30+'px'
            optionElement.style.height = 50+'px'
            optionElement.style.position = 'absolute'
            optionElement.style.left = canvas.width*0.25/2+'px'
            optionElement.style.top = Y+'px'
            optionElement.style.fontSize = screenResize*12+'px'
            optionElement.style.border = 'solid 2px rgb(150, 0, 50)'
            optionElement.style.borderRadius = '8px'
            optionElement.style.backgroundColor = 'rgb(20, 0, 10)'
            optionElement.style.color = 'white'
            //optionElement.onmouseover = () => optionElement.style.animation = 'optionButtonOver 0.2s ease forwards'
            //optionElement.onmouseout = () => optionElement.style.animation = 'optionButtonOut 0.2s ease forwards'
            optionElement.onmouseover = () => game.state.selectMenuOption.menuSelect = i

            if (Number(game.state.selectMenuOption.menuSelect) == Number(i)) optionElement.style.animation = 'optionButtonOver 0.2s ease forwards'
            else optionElement.style.animation = 'optionButtonOut 0.2s ease forwards'
            optionElement.onclick = () => {
                game.state.selectMenuOption.menuSelect = Number(i)
                Listener.handleKeys({ event: { code: 'Enter' }, on: true })
                setTimeout(() => game.state.selectMenuOption.menuSelect = 0, 200)
            }

            if (notUpdate) menuElement.appendChild(optionElement)
            Y += (canvas.height-(canvas.height*0.25*2))/(game.state.selectMenuOption.menuOptions.length-1)
        }


        let nameText = document.getElementById('nameText') || document.createElement('div')
        nameText.id = 'nameText'
        nameText.innerText = 'FunCog'
        nameText.style.color = 'white'
        nameText.style.fontSize = screenResize*40+'px'
        nameText.style.marginTop = screenResize*10+'px'
        /*nameText.style.position = 'absolute'
        nameText.style.left = canvas.width/2+canvas.width/4-(logoSize/2)+'px'
        nameText.style.top = canvas.height/2-(logoSize/2)+'px'*/
        if (notUpdate) menuElement.appendChild(nameText)
        

        let logoElement = document.getElementById('logoElement') || document.createElement('img')
        let logoSize = Math.floor(Math.min(canvas.height*0.45, canvas.width*0.22))
        logoElement.id = 'logoElement'
        logoElement.src = '/imgs/logo.png'
        logoElement.style.width = logoSize+'px'
        logoElement.style.height = logoSize+'px'
        logoElement.style.position = 'absolute'
        logoElement.style.animation = 'logo 30s ease infinite'
        logoElement.style.left = canvas.width/2+canvas.width/4-(logoSize/2)+'px'
        logoElement.style.top = canvas.height*0.55-(logoSize/2)+'px'
        if (notUpdate) menuElement.appendChild(logoElement)


        let updateContainer = document.getElementById('updateContainer') || document.createElement('div')
        updateContainer.id = 'updateContainer'
        if (notUpdate) updateContainer.style.display = 'none'
        updateContainer.style.overflow = 'hidden'
        updateContainer.style.position = 'absolute'
        updateContainer.style.width = canvas.width*0.5-(canvas.width*0.05)+'px'
        updateContainer.style.height = canvas.height-(canvas.height*0.15)-canvas.height*0.1+'px'
        updateContainer.style.left = canvas.width*0.5+'px'
        updateContainer.style.top = canvas.height*0.20+'px'
        updateContainer.style.backgroundColor = 'rgb(40, 20, 30)'
        updateContainer.style.borderRadius = '8px'
        updateContainer.style.border = 'solid 2px rgb(150, 0, 50)'

        if (notUpdate) updateContainer.innerHTML = `
            <div id="updateLogTitle">Atualizações</div>
            
            <div id="updateContent">
                <div id="updateDate">10/jul/2023</div>
                <div id="updateNew" class="updateContentText">- Novo sistema de Menus!!</div>
                <div id="updateNew" class="updateContentText">- Novo Menu principal!!</div>
                <div id="updateDate">21/mai/2023</div>
                <div id="updateUpdate" class="updateContentText">- Música "Shadows" do mod "VS Withered Freddy" terminada</div>
                <div id="updateNew" class="updateContentText">- Configurações adicionadas: AudioVisualizer e BackgroundOfuscation</div>
                <div id="updateWarning" class="updateContentText">- Multiplayer desligado</div>
            </div>
        `

        if (notUpdate) menuElement.appendChild(updateContainer)


        let updateButton = document.getElementById('updateButton') || document.createElement('button')
        updateButton.id = 'updateButton'

        let updateButtonImage = document.getElementById('updateButtonImage') || document.createElement('img')
        updateButtonImage.id = 'updateButtonImage'
        updateButtonImage.className = 'buttonImage'
        if (notUpdate) updateButtonImage.src = '/imgs/update.png'
        if (notUpdate) updateButton.appendChild(updateButtonImage)

        let buttonSize = screenResize*15
        updateButton.style.padding = '5px'
        updateButton.style.width = buttonSize+'px'
        updateButton.style.height = buttonSize+'px'
        updateButton.style.position = 'absolute'
        updateButton.style.left = canvas.width-buttonSize-10+'px'
        updateButton.style.top = canvas.height-buttonSize-20+'px'
        updateButton.style.border = 'none'
        updateButton.style.borderRadius = '8px'
        updateButton.style.backgroundColor = 'rgb(20, 0, 10)'
        updateButton.style.border = 'solid 2px rgb(150, 0, 50)'
        updateButton.onmouseover = () => updateButtonImage.style.animation = 'rotate 0.5s ease forwards'
        updateButton.onmouseout = () => updateButtonImage.style.animation = ''
        updateButton.onclick = () => {
            updateContainer.style.display = updateContainer.style.display == 'block' ? 'none' : 'block'
            logoElement.style.display = updateContainer.style.display == 'block' ? 'none' : 'block'
        }
        if (notUpdate) menuElement.appendChild(updateButton)


        if (notUpdate) screenElements.appendChild(menuElement)
    } catch (err) { console.error(err) }

    //}
/*
    ctx.fillStyle = 'rgb(20, 20, 20)'
    ctx.fillRect(canvas.width/2, 0, canvas.width/2, canvas.height)

    ctx.fillStyle = 'rgb(200, 200, 200)'
    ctx.fillRect(canvas.width/2-5, 0, 10, canvas.height)

    ctx.font = `bold ${canvas.width/canvas.height*30}px Arial`
    ctx.fillStyle = 'black'
    ctx.fillText('Atualizações', canvas.width-canvas.width/4-ctx.measureText('Atualizações').width/2, canvas.height*0.18);
    ctx.lineWidth = 3
    ctx.strokeStyle  = 'rgb(255, 255, 255)'
    ctx.strokeText('Atualizações', canvas.width-canvas.width/4-ctx.measureText('Atualizações').width/2, canvas.height*0.18);

    let resizeMsg = 0.04
    let msgArr = [
        { msg: '- Música "Shadows" do mod', color: 'rgb(0, 150, 255)' },
        { msg: '  "VS Withered Freddy" terminada', color: 'rgb(0, 150, 255)' },
        { msg: '' },
        { msg: '- Background com visualização da música!!', color: 'rgb(0, 255, 0)' },
        { msg: '' },
        { msg: '- Configurações:', color: 'rgb(0, 255, 0)' },
        { msg: '     "AudioVisualizer" adicionada', color: 'rgb(0, 255, 0)' },
        { msg: '     "BackgroundOfuscation" adicionada', color: 'rgb(0, 255, 0)' },
        { msg: '' },
        { msg: '' },
        { msg: '- Multiplayer desligado Temporariamente', color: 'rgb(255, 255, 0)' },
    ]

    //'rgb(0, 150, 255)'
    //'rgb(0, 255, 0)'
    //'rgb(255, 0, 0)'
    //'rgb(255, 0, 0)'
    //'rgb(255, 255, 0)'


    let msgX = canvas.width/2+(canvas.width*0.05)
    let msgY = canvas.height/3
    //msgY = (canvas.height-canvas.height/2.5)+(-((msgArr.length-1)*(canvas.width/2*resizeMsg)/2))
    for (let i in msgArr) {
        let msg = msgArr[i].msg

        ctx.fillStyle = msgArr[i].color || 'black'
        ctx.font = `bold ${canvas.width/2*resizeMsg}px Arial`
        ctx.fillText(msg, msgX, msgY);

        msgY += canvas.width/2*resizeMsg
    }

    let logoImage = game.state.images['imgs/logo.png']?.image
    /*let alpha = 1//100/game.state.animations.menuLogoAnimation.frame
    let size = (canvas.height/canvas.width*500)*((alpha/8)+1)

    ctx.globalAlpha = alpha
    if (logoImage) ctx.drawImage(logoImage, canvas.width/2+canvas.width/4-(size/2), canvas.height/2-(size/2), size, size)

    let animation = (game.state.animations.menuLogoAnimation.frame)/((game.state.animations.menuLogoAnimation.endFrame)/30)
    animation = animation >= 1 ? 1 : animation
    let size = 300
    let x = canvas.width/2+canvas.width/4
    let y = canvas.height/2
    ctx.save();
    ctx.translate(x, y)
    ctx.rotate((Math.PI*2)*animation)
    
    if (logoImage) ctx.drawImage(logoImage, -(size/2), -(size/2), size, size)

    ctx.restore();*/
}