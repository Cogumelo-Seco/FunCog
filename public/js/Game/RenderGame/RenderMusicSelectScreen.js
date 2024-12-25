export default async (ctx, canvas, game, Listener, functions) => {
    let screenResize = Math.floor(Math.min(canvas.height*0.45, canvas.width*0.22))/150
    let filtredMusics = game.state.musics.filter(m => !m.dev || game.state.myConfig.emoji == '👑')

    ctx.fillStyle = 'rgb(0, 0, 0, 0.9)'
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    
    let selectedModNameTxt = null
    let selectedMusicName = null
    let selectedDifficultyName = null

    let screenElements = document.getElementById('screenElements')
    let notUpdate = screenElements && !screenElements.getElementsByClassName('musicSelectMenuElement')[0]
    try {
        let musicSelectMenuElement = screenElements.getElementsByClassName('musicSelectMenuElement')[0] || document.createElement('div')
        
        if (notUpdate) screenElements.innerHTML = ''
        musicSelectMenuElement.className = 'musicSelectMenuElement stage'

        let musicSelectMenuStyle = document.getElementById('musicSelectMenuStyle') || document.createElement('style')
        musicSelectMenuStyle.id = 'musicSelectMenuStyle'
        musicSelectMenuStyle.innerHTML = `
            .skew-fix{
                display: inline-block;
                transform: skew(20deg);
            }
            .menuElement {
                border: none;
                border-radius: 8px;
                background: linear-gradient(90deg, rgba(64,46,120,1) 0%, rgba(100,75,175,1) 100%);
                color: white;
                transform: skew(-20deg);
            }

            .colorElement {
                position: absolute;
                display: block;
                left: 2%;
                bottom: 15%;
                width: ${screenResize*10}px;
                height: ${screenResize*10}px;
                border-radius: 2px;
            }

            @keyframes buttonOver {
                from {
                    scale: 1
                }
                to {
                    background: linear-gradient(90deg, rgba(255,102,170,1) 0%, rgba(208,57,125,1) 100%);
                    scale: 1.02
                }
            }
            @keyframes buttonOut {
                from {
                    background: linear-gradient(90deg, rgba(255,102,170,1) 0%, rgba(208,57,125,1) 100%);
                    scale: 1.02
                }
                to {
                    scale: 1
                }
            }
        `
        if (notUpdate) musicSelectMenuElement.appendChild(musicSelectMenuStyle)


        let startModsY = canvas.height/3
        let endModsY = canvas.height-4
        let modsY = startModsY+((endModsY-startModsY)*(game.state.selectMusicMenu.modSelect/(filtredMusics.length)))-(game.state.selectMusicMenu.modSelect*(62+2))
        if (startModsY+(60*filtredMusics.length) < endModsY) modsY = startModsY

        for (let i in filtredMusics) {
            let mod = filtredMusics[i]
            let modNameTxt = `${mod.dev ? '⚒' : mod.special ? '👑' : ''} ${mod.name.replace(/-/g, ' ')} ${mod.dev ? '⚒' : mod.special ? '👑' : ''}`
            if (Number(game.state.selectMusicMenu.modSelect) == Number(i)) selectedModNameTxt = modNameTxt
            
            let modElement = document.getElementById(i+'-modElement') || document.createElement('button')
            modElement.className = 'menuElement'
            modElement.id = i+'-modElement'
            modElement.style.width = canvas.width/4+'px'
            modElement.style.height = 50+'px'
            modElement.style.position = 'absolute'
            modElement.style.left = canvas.width/8-(canvas.width/4/2)+canvas.width/22+'px'
            modElement.style.top = modsY+'px'
            modElement.style.fontSize = screenResize*12+'px'
            if (notUpdate) modElement.innerHTML = `<span class="skew-fix">${modNameTxt}</span>`

            let colorElement = document.getElementById(i+'-modColorElement') || document.createElement('div')
            colorElement.className = 'colorElement'
            colorElement.id = i+'-modColorElement'
            colorElement.style.opacity = game.state.selectMusicMenu.currentSelection == 0 ? 1 : 0.5
            colorElement.style.backgroundColor = mod.menuColor?.includes('RAINBOW') ? `hsl(${game.state.rainbowColor+(Number(mod.menuColor.split('-')[1]) || 0)}, 100%, 50%)` : mod.menuColor || 'white'
            modElement.appendChild(colorElement)

            if (game.state.selectMusicMenu.currentSelection != 0) {
                modElement.style.animation = ''
                if (Number(game.state.selectMusicMenu.modSelect) == Number(i)) modElement.style.background = 'linear-gradient(90deg, rgba(255,102,170,0.5) 0%, rgba(208,57,125,0.5) 100%)'
                else modElement.style.background = 'linear-gradient(90deg, rgba(64,46,120,0.5) 0%, rgba(100,75,175,0.5) 100%)'
            } else {
                modElement.style.background = ''
                if (Number(game.state.selectMusicMenu.modSelect) == Number(i)) modElement.style.animation = 'buttonOver 0.4s ease forwards'
                else modElement.style.animation = 'buttonOut 0.4s ease forwards'
            }

            modElement.onmouseover = () => {
                if (game.state.selectMusicMenu.currentSelection != 0) game.state.selectMusicMenu.currentSelection = 0

                if (game.state.selectMusicMenu.modSelect != i) {
                    game.playSong('Sounds/scrollMenu.ogg', { volume: 0.5 })
                    game.state.selectMusicMenu.modSelect = i
                }
            }
            modElement.onclick = () => Listener.handleKeys({ event: { code: 'Enter' }, on: true })

            if (notUpdate) musicSelectMenuElement.appendChild(modElement)
            modsY += 62
        }

        let startMusicY = canvas.height/3
        let endMusicY = canvas.height-4
        let musicY = startMusicY+((endMusicY-startMusicY)*(game.state.selectMusicMenu.musicSelect/(filtredMusics[game.state.selectMusicMenu.modSelect].musics.length)))-(game.state.selectMusicMenu.musicSelect*(62+2))
        if (startMusicY+(60*filtredMusics[game.state.selectMusicMenu.modSelect].musics.length) < endMusicY) musicY = startMusicY

        for (let i = 0;i <= 20; i++) {
            let music = filtredMusics[game.state.selectMusicMenu.modSelect].musics[i]

            if (music) {
                let musicName = music.name.replace(/-/g, ' ')+(music.suffix ? ' '+music.suffix : '')
                if (Number(game.state.selectMusicMenu.musicSelect) == Number(i)) selectedMusicName = musicName

                let musicElement = document.getElementById(i+'-musicElement') || document.createElement('button')
                musicElement.className = 'menuElement musicElement'
                musicElement.id = i+'-musicElement'
                musicElement.style.width = canvas.width/4+'px'
                musicElement.style.height = 50+'px'
                musicElement.style.position = 'absolute'
                musicElement.style.left = canvas.width/2-(canvas.width/4/2)+'px'
                musicElement.style.top = musicY+'px'
                musicElement.style.fontSize = screenResize*12+'px'
                musicElement.style.display = 'block'
                musicElement.style.backgroundColor = 'red'
                /*if (notUpdate)*/ musicElement.innerHTML = `<span class="skew-fix">${musicName}</span>`

                let colorElement = document.getElementById(i+'-musicColorElement') || document.createElement('div')
                colorElement.className = 'colorElement'
                colorElement.id = i+'-musicColorElement'
                colorElement.style.opacity = game.state.selectMusicMenu.currentSelection == 1 ? 1 : 0.5
                colorElement.style.backgroundColor = music.menuColor?.includes('RAINBOW') ? `hsl(${game.state.rainbowColor+(Number(music.menuColor.split('-')[1]) || 0)}, 100%, 50%)` : music.menuColor  || 'white'
                musicElement.appendChild(colorElement)

                if (game.state.selectMusicMenu.currentSelection != 1) {
                    musicElement.style.animation = ''
                    if (Number(game.state.selectMusicMenu.musicSelect) == Number(i)) musicElement.style.background = 'linear-gradient(90deg, rgba(255,102,170,0.5) 0%, rgba(208,57,125,0.5) 100%)'
                    else musicElement.style.background = 'linear-gradient(90deg, rgba(64,46,120,0.5) 0%, rgba(100,75,175,0.5) 100%)'
                } else {
                    musicElement.style.background = ''
                    if (Number(game.state.selectMusicMenu.musicSelect) == Number(i)) musicElement.style.animation = 'buttonOver 0.4s ease forwards'
                    else musicElement.style.animation = 'buttonOut 0.4s ease forwards'
                }

                musicElement.onmouseover = () => {
                    if (game.state.selectMusicMenu.currentSelection != 1) game.state.selectMusicMenu.currentSelection = 1

                    if (game.state.selectMusicMenu.musicSelect != i) {
                        game.playSong('Sounds/scrollMenu.ogg', { volume: 0.5 })
                        game.state.selectMusicMenu.musicSelect = i
                    }
                }
                musicElement.onclick = () => Listener.handleKeys({ event: { code: 'Enter' }, on: true })

                if (Number(game.state.selectMusicMenu.musicSelect) == Number(i)) canvas.style.backgroundImage = `url(https://raw.githubusercontent.com/Cogumelo-Seco/Cogu-FNF-Files/main/imgs/${music.backgroundImage})`

                if (notUpdate) musicSelectMenuElement.appendChild(musicElement)
                musicY += 62
            } else {
                let musicElement = document.getElementById(i+'-musicElement')
                if (musicElement) musicElement.style.display = 'none'
            }
        }

        let selectMusicInfo = filtredMusics[game.state.selectMusicMenu.modSelect]?.musics[game.state.selectMusicMenu.musicSelect]

        let startDifficultyY = canvas.height/3
        let endDifficultyY = canvas.height-2
        let difficultyY = canvas.height/3//startDifficultyY+((endDifficultyY-startDifficultyY)*(difficultySelected/(game.state.difficulties.length)))-(difficultySelected*(40+(currentSelection == 2 ? 12 : 0)))
        //if (startDifficultyY+(40*game.state.difficulties.length) < endDifficultyY) difficultyY = startDifficultyY

        for (let i in game.state.difficulties) {
            game.state.selectMusicMenu.difficultySelected = game.state.selectMusicMenu.difficultySelected > selectMusicInfo.difficulties.length-1 ? 0 : game.state.selectMusicMenu.difficultySelected
            game.state.selectMusicMenu.difficultySelected = game.state.selectMusicMenu.difficultySelected < 0 ? selectMusicInfo.difficulties.length-1 : game.state.selectMusicMenu.difficultySelected
            
            //console.log(selectMusicInfo.difficulties)
            let difficulty = game.state.difficulties[selectMusicInfo.difficulties[i]]
            if (difficulty) {
                let difficultyName = difficulty.name+(selectMusicInfo.difficultyAlert && selectMusicInfo.difficultyAlert[selectMusicInfo.difficulties[i]] ? ` ${selectMusicInfo.difficultyAlert[selectMusicInfo.difficulties[i]]}` : '')
                if (Number(game.state.selectMusicMenu.difficultySelected) == Number(i)) selectedDifficultyName = difficultyName

                let difficultyElement = document.getElementById(i+'-difficultyElement') || document.createElement('button')
                difficultyElement.className = 'menuElement difficultyElement'
                difficultyElement.id = i+'-difficultyElement'
                difficultyElement.style.width = canvas.width/4+'px'
                difficultyElement.style.height = 50+'px'
                difficultyElement.style.position = 'absolute'
                difficultyElement.style.left = canvas.width-canvas.width/4-canvas.width/22+'px'
                difficultyElement.style.top = difficultyY+'px'
                difficultyElement.style.fontSize = screenResize*12+'px'
                difficultyElement.style.display = 'block'
                /*if (notUpdate)*/ difficultyElement.innerHTML = `<span class="skew-fix">${difficultyName}</span>`

                let colorElement = document.getElementById(i+'-difficultyColorElement') || document.createElement('div')
                colorElement.className = 'colorElement'
                colorElement.id = i+'-difficultyColorElement'
                colorElement.style.opacity = game.state.selectMusicMenu.currentSelection == 2 ? 1 : 0.5
                colorElement.style.backgroundColor = difficulty.color || 'white'
                difficultyElement.appendChild(colorElement)

                
                if (game.state.selectMusicMenu.currentSelection != 2) {
                    difficultyElement.style.animation = ''
                    if (Number(game.state.selectMusicMenu.difficultySelected) == Number(i)) difficultyElement.style.background = 'linear-gradient(90deg, rgba(255,102,170,0.5) 0%, rgba(208,57,125,0.5) 100%)'
                    else difficultyElement.style.background = 'linear-gradient(90deg, rgba(64,46,120,0.5) 0%, rgba(100,75,175,0.5) 100%)'
                } else {
                    difficultyElement.style.background = ''
                    if (Number(game.state.selectMusicMenu.difficultySelected) == Number(i)) difficultyElement.style.animation = 'buttonOver 0.4s ease forwards'
                    else difficultyElement.style.animation = 'buttonOut 0.4s ease forwards'
                }
    

                difficultyElement.onmouseover = () => {
                    if (game.state.selectMusicMenu.currentSelection != 2) game.state.selectMusicMenu.currentSelection = 2

                    if (game.state.selectMusicMenu.difficultySelected != i) {
                        game.playSong('Sounds/scrollMenu.ogg', { volume: 0.5 })
                        game.state.selectMusicMenu.difficultySelected = i
                    }
                }
                difficultyElement.onclick = () => Listener.handleKeys({ event: { code: 'Enter' }, on: true })

                if (notUpdate || !document.getElementById(i+'-difficultyElement')) musicSelectMenuElement.appendChild(difficultyElement)
                difficultyY += 62
            } else {
                let difficultyElement = document.getElementById(i+'-difficultyElement')
                if (difficultyElement) difficultyElement.style.display = 'none'
            }
        }

        let headerElement = document.getElementById('headerElement') || document.createElement('div')
        headerElement.id = 'headerElement'
        headerElement.style.backgroundColor = 'black'
        headerElement.style.position = 'absolute'
        headerElement.style.left = '0'
        headerElement.style.top = '0'
        headerElement.style.width = canvas.width+'px'
        headerElement.style.height = canvas.height/3-40+'px'
        musicSelectMenuElement.appendChild(headerElement)


        let modTextElement = document.getElementById('modTextElement') || document.createElement('div')
        modTextElement.id = 'modTextElement'
        modTextElement.style.color = 'white'
        modTextElement.style.position = 'absolute'
        modTextElement.style.fontSize = screenResize*12+'px'
        ctx.font = `bold ${screenResize*12}px Arial`
        modTextElement.style.left = canvas.width/3/2-(ctx.measureText('Mod').width/2)+'px'
        modTextElement.style.top = canvas.height/3-90+'px'
        modTextElement.innerHTML = 'Mod'
        screenElements.appendChild(modTextElement)

        let musicTextElement = document.getElementById('musicTextElement') || document.createElement('div')
        musicTextElement.id = 'musicTextElement'
        musicTextElement.style.color = 'white'
        musicTextElement.style.position = 'absolute'
        musicTextElement.style.fontSize = screenResize*12+'px'
        ctx.font = `bold ${screenResize*12}px Arial`
        musicTextElement.style.left = canvas.width/2-(ctx.measureText('Music').width/2)+'px'
        musicTextElement.style.top = canvas.height/3-90+'px'
        musicTextElement.innerHTML = 'Music'
        screenElements.appendChild(musicTextElement)

        let difficultyTextElement = document.getElementById('difficultyTextElement') || document.createElement('div')
        difficultyTextElement.id = 'difficultyTextElement'
        difficultyTextElement.style.color = 'white'
        difficultyTextElement.style.position = 'absolute'
        difficultyTextElement.style.fontSize = screenResize*13+'px'
        ctx.font = `bold ${screenResize*13}px Arial`
        difficultyTextElement.style.left = (canvas.width/3*2)+canvas.width/3/2-(ctx.measureText('Difficulty').width/2)+'px'
        difficultyTextElement.style.top = canvas.height/3-90+'px'
        difficultyTextElement.innerHTML = 'Difficulty'
        screenElements.appendChild(difficultyTextElement)


        let titleContanerElement = document.getElementById('titleContanerElement') || document.createElement('div')
        titleContanerElement.id = 'titleContanerElement'
        titleContanerElement.style.color = 'white'
        titleContanerElement.style.position = 'absolute'
        titleContanerElement.style.fontSize = screenResize*16+'px'
        titleContanerElement.style.left = '0'
        titleContanerElement.style.top = 40+'px'
        titleContanerElement.style.width = '100%'
        titleContanerElement.innerHTML = `
            <spam style="color: ${filtredMusics[game.state.selectMusicMenu.modSelect].menuColor};">${selectedModNameTxt}</spam>
            <spam>-></spam>
            <spam style="color: ${filtredMusics[game.state.selectMusicMenu.modSelect].musics[game.state.selectMusicMenu.musicSelect].menuColor};">${selectedMusicName}</spam>
            <spam>-></spam>
            <spam style="color: ${game.state.difficulties[selectMusicInfo.difficulties[game.state.selectMusicMenu.difficultySelected]]?.color};">${selectedDifficultyName}</spam>
        `

        screenElements.appendChild(titleContanerElement)
        if (notUpdate) screenElements.appendChild(musicSelectMenuElement)
    } catch (err) {
        console.error(err)
    }
}