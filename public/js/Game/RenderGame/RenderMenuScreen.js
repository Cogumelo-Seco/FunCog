export default async (ctx, canvas, game, Listener, functions) => {
    ctx.fillStyle = `rgba(0, 0, 0, ${game.state.smallFunctions.getConfig('BackgroundOfuscation')/100})`
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    let screenResize = Math.floor(Math.min(canvas.height*0.45, canvas.width*0.22))/150

    /*let gameBackground = document.getElementById('gameBackground')
    gameBackground.style.display = 'block'
    gameBackground.src = '/imgs/logo.png'*/

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
                background-color: rgb(9, 4, 27);
                padding: 5px;
                margin: 10px ${canvas.width*0.05}px;
                margin-top: 25px;
                border-radius: 8px;
            }
            .updateContentText {
                font-size: ${canvas.height*0.035}px;
                background-color: rgb(16, 7, 45);
                padding: 10px;
                margin: 5px 0;
                border-radius: 8px;
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
            #bugFix {
                color: rgb(255, 100, 150);
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
                    background: linear-gradient(90deg, rgba(255,102,170,1) 0%, rgba(208,57,125,1) 100%);
                    scale: 1.02
                }
            }
            @keyframes optionButtonOut {
                from {
                    background: linear-gradient(90deg, rgba(255,102,170,1) 0%, rgba(208,57,125,1) 100%);
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

            .skew-fix{
                display:inline-block;
                transform: skew(20deg);
            }
            .menuButton {
                border: none;
                border-radius: 8px;
                background: linear-gradient(90deg, rgba(64,46,120,1) 0%, rgba(100,75,175,1) 100%);
                color: white;
                transform: skew(-20deg);
            }
        `
        if (notUpdate) menuElement.appendChild(menuStyle)

        let Y = canvas.height*0.29
        for (let i in game.state.selectMenuOption.menuOptions) {
            let optionElement = document.getElementById(i+'-menuOptions') || document.createElement('button')
            optionElement.className = 'menuButton'
            optionElement.id = i+'-menuOptions'
            if (notUpdate) optionElement.innerHTML = `<span class="skew-fix">${await functions.fillTextHTML(game.state.selectMenuOption.menuOptions[i])}</span>`
            optionElement.style.width = canvas.width*0.30+'px'
            optionElement.style.height = 50+'px'
            optionElement.style.position = 'absolute'
            optionElement.style.left = canvas.width*0.25/2+'px'
            optionElement.style.top = Y+'px'
            optionElement.style.fontSize = screenResize*12+'px'
            optionElement.onmouseover = () => {
                if (game.state.selectMenuOption.menuSelect != i) {
                    game.playSong('Sounds/scrollMenu.ogg', { volume: 0.5 })
                    game.state.selectMenuOption.menuSelect = i
                }
            }

            if (Number(game.state.selectMenuOption.menuSelect) == Number(i)) optionElement.style.animation = 'optionButtonOver 0.2s ease forwards'
            else optionElement.style.animation = 'optionButtonOut 0.2s ease forwards'
            let optionButtonElements = optionElement.getElementsByTagName('span')
            optionElement.onclick = () => {
                game.state.selectMenuOption.menuSelect = Number(i)
                Listener.handleKeys({ event: { code: 'Enter' }, on: true })
                setTimeout(() => game.state.selectMenuOption.menuSelect = 0, 200)
            }
            for (let element of optionButtonElements) element.onclick = () => optionElement.onclick()

            if (notUpdate) menuElement.appendChild(optionElement)
            Y += (canvas.height-(canvas.height*0.25*2))/(game.state.selectMenuOption.menuOptions.length-1)
        }


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

        let nameText = document.getElementById('nameText') || document.createElement('div')
        nameText.id = 'nameText'
        nameText.innerText = 'FunCog'
        nameText.style.position = 'absolute'
        nameText.style.left = canvas.width*0.65+'px'
        nameText.style.fontSize = screenResize*60+'px'
        nameText.style.marginTop = screenResize*92+'px'
        nameText.style.transform = 'rotateZ(25deg)'
        nameText.style.color = 'white'
        if (notUpdate) menuElement.appendChild(nameText)


        let updateContainer = document.getElementById('updateContainer') || document.createElement('div')
        updateContainer.id = 'updateContainer'
        if (notUpdate) updateContainer.style.display = 'none'
        updateContainer.style.overflow = 'hidden'
        updateContainer.style.position = 'absolute'
        updateContainer.style.width = canvas.width*0.5-(canvas.width*0.05)+'px'
        updateContainer.style.height = canvas.height-(canvas.height*0.15)-canvas.height*0.1+'px'
        updateContainer.style.left = canvas.width*0.5+'px'
        updateContainer.style.top = canvas.height*0.20+'px'
        updateContainer.style.backgroundColor = 'rgb(50, 50, 50)'
        updateContainer.style.borderRadius = '8px'
        updateContainer.style.border = 'solid 4px rgb(50, 50, 50)'

        if (notUpdate) updateContainer.innerHTML = `
            <div id="updateLogTitle">Atualizações</div>
            
            <div id="updateContent">
                <div id="updateDate">02/dec/2023</div>
                <div id="updateNew" class="updateContentText">- Novo mod "Shaggy" adicionado</div>
                <div id="updateUpdate" class="updateContentText">- Lista de mods reorganizada</div>
                <div id="updateDate">02/sep/2023</div>
                <div id="updateNew" class="updateContentText">- SISTEMA DE NÍVEIS!!!!</div>
                <div id="updateNew" class="updateContentText">- Adicionado painel de informações em algumas páginas</div>
                <div id="updateNew" class="updateContentText">- Adicionado visualizador de imagem, para avatares no chat</div>
                <div id="updateDate">21/ago/2023</div>
                <div id="updateUpdate" class="updateContentText">- Novas configurações, categoria de Audio</div>
                <div id="updateWarning" class="updateContentText">- Dificuldade MANIA renomeada para BABY</div>
                <div id="updateNew" class="updateContentText">- Placas da "Expurgation" novamente!!</div>
                <div id="updateDate">01/ago/2023</div>
                <div id="updateUpdate" class="updateContentText">- Mod "VS Mami" Terminado</div>
                <div id="updateUpdate" class="updateContentText">- Aparência do menu atualizado</div>
                <div id="bugFix" class="updateContentText">- Bug de setas sumirem ao pausar na música "Pasta Night" corrigido</div>
                <div id="updateDate">20/jul/2023</div>
                <div id="updateNew" class="updateContentText">- Novo mod "VS-Mami" adicionado (em desenvolvimento)</div>
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

        let buttonSize = screenResize*17
        updateButton.style.padding = '4px'
        updateButton.style.width = buttonSize+'px'
        updateButton.style.height = buttonSize+'px'
        updateButton.style.position = 'absolute'
        updateButton.style.left = canvas.width-buttonSize-10+'px'
        updateButton.style.top = canvas.height-buttonSize-20+'px'
        updateButton.style.border = 'none'
        updateButton.style.borderRadius = '8px'
        updateButton.style.transition = 'all 0.5s'
        if (!updateButton.style.backgroundColor) updateButton.style.backgroundColor = 'rgba(64,46,120,1)'
        updateButton.style.border = 'none'
        updateButton.onmouseover = () => {
            updateButton.style.backgroundColor = 'rgba(208,57,125,1)'
            updateButtonImage.style.animation = 'rotate 0.5s ease forwards'
        }
        updateButton.onmouseout = () => {
            updateButton.style.backgroundColor = 'rgba(64,46,120,1)'
            updateButtonImage.style.animation = ''
        }
        updateButton.onclick = () => {
            game.playSong('Sounds/scrollMenu.ogg', { volume: 0.5 })
            updateContainer.style.display = updateContainer.style.display == 'block' ? 'none' : 'block'
            logoElement.style.display = updateContainer.style.display == 'block' ? 'none' : 'block'
        }
        if (notUpdate) menuElement.appendChild(updateButton)

        if (notUpdate) screenElements.appendChild(menuElement)
    } catch (err) { console.error(err) }
}