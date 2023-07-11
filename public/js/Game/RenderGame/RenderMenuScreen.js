export default async (ctx, canvas, game, Listener, functions) => {
    let screenResize = Math.floor(Math.min(canvas.height*0.45, canvas.width*0.22))/150

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
                height: 86%;
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
            optionElement.onmouseover = () => {
                game.playSong('Sounds/scrollMenu.ogg', { volume: 0.5 })
                game.state.selectMenuOption.menuSelect = i
            }

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
                <div id="updateDate">11/jul/2023</div>
                <div id="updateNew" class="updateContentText">- Painel de propriedades da mensagem adicionado, com função de deletar mensagem</div>
                <div id="updateDate">10/jul/2023</div>
                <div id="updateNew" class="updateContentText">- Novo Menu principal!!</div>
                <div id="updateNew" class="updateContentText">- Novo sistema de Menus!!</div>
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
        updateButton.style.padding = '4px'
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
            game.playSong('Sounds/scrollMenu.ogg', { volume: 0.5 })
            updateContainer.style.display = updateContainer.style.display == 'block' ? 'none' : 'block'
            logoElement.style.display = updateContainer.style.display == 'block' ? 'none' : 'block'
        }
        if (notUpdate) menuElement.appendChild(updateButton)


        if (notUpdate) screenElements.appendChild(menuElement)
    } catch (err) { console.error(err) }
}