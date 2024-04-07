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

                if (i == game.state.selectMusicMenu.difficultySelected) canvas.style.backgroundImage = `url(https://raw.githubusercontent.com/Cogumelo-Seco/Cogu-FNF-Files/main/imgs/${music.backgroundImage})`

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
/*
        let modTextTitle = document.getElementById('modTextTitle') || document.createElement('spam')
        modTextTitle.id = 'modTextTitle'
        modTextTitle.style.color = 'white'
        modTextTitle.innerHTML = selectedModNameTxt

        let musicTextTitle = document.getElementById('musicTextTitle') || document.createElement('spam')
        modTextTitle.id = 'musicTextTitle'
        modTextTitle.style.color = 'white'
        modTextTitle.innerHTML = selectedMusicName

        titleContanerElement.appendChild(modTextTitle)
        titleContanerElement.appendChild(musicTextTitle)*/

        screenElements.appendChild(titleContanerElement)
        
        /* functions.fillText({
        style: filtredMusics[modSelect].menuColor,
        text: `${selectedModNameTxt}`,
        x: canvas.width/2-ctx.measureText(`-> ${selectedMusicName} ->`).width/2-ctx.measureText(`${selectedModNameTxt}`).width-4, 
        y: 40,
        add: 2
    })

    functions.fillText({
        style: filtredMusics[modSelect].musics[musicSelect].menuColor,
        text: `§f-> §g${selectedMusicName} §f->`,
        x: canvas.width/2-(ctx.measureText(`-> ${selectedMusicName} ->`).width/2), 
        y: 40,
        add: 2
    })

    functions.fillText({
        style: game.state.difficulties[selectMusicInfo.difficulties[difficultySelected]]?.color,
        text: `${selectedDifficultyName}`,
        x: canvas.width/2+(ctx.measureText(`-> ${selectedMusicName} ->`).width/2)+15, 
        y: 40,
        add: 2
    })*/


        if (notUpdate) screenElements.appendChild(musicSelectMenuElement)
    } catch (err) {
        console.error(err)
    }
    /*
    let screenElements = document.getElementById('screenElements')
    screenElements.innerHTML = ''

    let screenResize = Math.floor(Math.min(canvas.height*0.45, canvas.width*0.22))/150
    let filtredMusics = game.state.musics.filter(m => !m.dev || game.state.myConfig.emoji == '👑')

    ctx.fillStyle = 'rgb(0, 0, 0, 0.9)'
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    let modSelect = game.state.selectMusicMenu.modSelect
    let musicSelect = game.state.selectMusicMenu.musicSelect
    let difficultySelected = game.state.selectMusicMenu.difficultySelected
    let currentSelection = game.state.selectMusicMenu.currentSelection

    let selectedModNameTxt = null
    let selectedMusicName = null
    let selectedDifficultyName = null

    let startModsY = canvas.height/3
    let endModsY = canvas.height-4
    let modsY = startModsY+((endModsY-startModsY)*(modSelect/(filtredMusics.length)))-(modSelect*(40+(currentSelection == 0 ? 12 : 0)))
    if (startModsY+(40*filtredMusics.length) < endModsY) modsY = startModsY

    let contentWidth = canvas.width/3

    for (let i in filtredMusics) {
        let mod = filtredMusics[i]
        let modNameTxt = `${mod.dev ? '⚒' : mod.special ? '👑' : ''} ${mod.name.replace(/-/g, ' ')} ${mod.dev ? '⚒' : mod.special ? '👑' : ''}`

        ctx.fillStyle = mod.dev ? 'rgba(150, 25, 25)' : currentSelection == 0 ? `rgba(64,46,120,1)` : `rgba(64,56,100,0.6)`
        ctx.fillRect(20-(currentSelection == 0 ? 8 : 0), modsY-20-(currentSelection == 0 ? 8 : 0), contentWidth-40+(currentSelection == 0 ? 16 : 0), 30+(currentSelection == 0 ? 16 : 0));

        if (i == modSelect) {
            selectedModNameTxt = modNameTxt
            ctx.fillStyle = currentSelection == 0 ? 'rgb(208, 67, 125)' : 'rgba(208, 67, 125, 0.5)'
            ctx.fillRect(20, modsY-20, contentWidth-40, 30);
        }

        ctx.font = `bold ${(currentSelection == 0 ? 15 : 10)*screenResize}px Arial`

        functions.fillText({
            style: mod.menuColor?.includes('RAINBOW') ? `hsl(${game.state.rainbowColor+(Number(mod.menuColor.split('-')[1]) || 0)}, 100%, 50%)` : mod.menuColor || 'white',
            text: modNameTxt,
            x: contentWidth/2-(ctx.measureText(modNameTxt).width/2), 
            y: modsY+3,
            alpha: currentSelection == 0 ? 1 : 0.5,
            add: 2
        })

        modsY += 40+(currentSelection == 0 ? 12 : 0)
    }


    let startMusicY = canvas.height/3
    let endMusicY = canvas.height-4
    let musicY = startMusicY+((endMusicY-startMusicY)*(musicSelect/(filtredMusics[modSelect].musics.length)))-(musicSelect*(40+(currentSelection == 1 ? 12 : 0)))
    if (startMusicY+(50*filtredMusics[modSelect].musics.length) < endMusicY) musicY = startMusicY

    for (let i in filtredMusics[modSelect]?.musics) {
        let music = filtredMusics[modSelect].musics[i]
        let musicName = music.name.replace(/-/g, ' ')+(music.suffix ? ' '+music.suffix : '')

        ctx.fillStyle = currentSelection == 1 ? `rgba(64,46,120,1)` : `rgba(64,56,100,0.6)`
        ctx.fillRect(20-(currentSelection == 1 ? 8 : 0)+contentWidth, musicY-20-(currentSelection == 1 ? 8 : 0), contentWidth-40+(currentSelection == 1 ? 16 : 0), 30+(currentSelection == 1 ? 16 : 0));

        if (i == musicSelect) {
            selectedMusicName = musicName
            ctx.fillStyle = currentSelection == 1 ? 'rgb(208, 67, 125)' : 'rgba(208, 67, 125, 0.5)'
            ctx.fillRect(contentWidth+20, musicY-20, contentWidth-40, 30);
            canvas.style.backgroundImage = `url(https://raw.githubusercontent.com/Cogumelo-Seco/Cogu-FNF-Files/main/imgs/${music.backgroundImage})`
        }

        ctx.font = `bold ${(currentSelection == 1 ? 15 : 10)*screenResize}px Arial`

        functions.fillText({
            style: music.menuColor?.includes('RAINBOW') ? `hsl(${game.state.rainbowColor+(Number(music.menuColor.split('-')[1]) || 0)}, 100%, 50%)` : music.menuColor || 'white',
            text: musicName,
            x: contentWidth/2-(ctx.measureText(musicName).width/2)+contentWidth, 
            y: musicY+3,
            alpha: currentSelection == 1 ? 1 : 0.5,
            add: 2
        })

        let txtWidth = ctx.measureText(musicName).width
        let alertImage = game.state.images[`imgs/alert.png`]?.image
        if (music.dev && alertImage) {
            ctx.font = `bold 10px Arial`
            ctx.fillStyle = `rgba(255, 50, 50, ${currentSelection == 1 ? 1 : 0.5})`
            let X = (contentWidth+contentWidth/2+txtWidth/2)

            ctx.globalAlpha = currentSelection == 1 ? 1 : 0.5,
            ctx.drawImage(alertImage, X+5, musicY-22, 30, 30)
            ctx.fillText('In development', X+30, musicY-10);
            ctx.globalAlpha = 1
        }

        musicY += 40+(currentSelection == 1 ? 12 : 0)
    }

    let selectMusicInfo = filtredMusics[modSelect]?.musics[musicSelect]

    let startDifficultyY = canvas.height/3
    let endDifficultyY = canvas.height-2
    let difficultyY = startDifficultyY+((endDifficultyY-startDifficultyY)*(difficultySelected/(game.state.difficulties.length)))-(difficultySelected*(40+(currentSelection == 2 ? 12 : 0)))
    if (startDifficultyY+(40*game.state.difficulties.length) < endDifficultyY) difficultyY = startDifficultyY

    for (let i in selectMusicInfo?.difficulties) {
        let difficulty = game.state.difficulties[selectMusicInfo.difficulties[i]]
        let difficultyName = difficulty.name+(selectMusicInfo.difficultyAlert && selectMusicInfo.difficultyAlert[selectMusicInfo.difficulties[i]] ? ` ${selectMusicInfo.difficultyAlert[selectMusicInfo.difficulties[i]]}` : '')

        ctx.fillStyle = currentSelection == 2 ? `rgba(64,46,120,1)` : `rgba(64,56,100,0.6)`
        ctx.fillRect(contentWidth*2+20-(currentSelection == 2 ? 4 : 0), difficultyY-20-(currentSelection == 2 ? 4 : 0), contentWidth-40+(currentSelection == 2 ? 8 : 0), 30+(currentSelection == 2 ? 8 : 0));

        if (i == difficultySelected) {
            selectedDifficultyName = difficultyName
            ctx.fillStyle = currentSelection == 2 ? 'rgb(208, 67, 125)' : 'rgba(208, 67, 125, 0.5)'
            ctx.fillRect(contentWidth*2+20, difficultyY-20, contentWidth-40, 30);
        }

        ctx.font = `bold ${(currentSelection == 2 ? 15 : 10)*screenResize}px Arial`

        functions.fillText({
            style: difficulty.color,
            text: difficultyName,
            x: (contentWidth*2)+contentWidth/2-(ctx.measureText(difficultyName).width/2), 
            y: difficultyY+3,
            alpha: currentSelection == 2 ? 1 : 0.5,
            add: 2
        })

        difficultyY += 40+(currentSelection == 2 ? 12 : 0)
        
        game.state.selectMusicMenu.difficultySelected = game.state.selectMusicMenu.difficultySelected > selectMusicInfo.difficulties.length-1 ? 0 : game.state.selectMusicMenu.difficultySelected
        game.state.selectMusicMenu.difficultySelected = game.state.selectMusicMenu.difficultySelected < 0 ? selectMusicInfo.difficulties.length-1 : game.state.selectMusicMenu.difficultySelected
    }

    ctx.fillStyle = 'rgb(0, 0, 0)'
    ctx.fillRect(0, 0, canvas.width, canvas.height/3-40)

    ctx.font = `bold ${screenResize*11}px Arial`

    functions.fillText({
        style: filtredMusics[modSelect].menuColor,
        text: `${selectedModNameTxt}`,
        x: canvas.width/2-ctx.measureText(`-> ${selectedMusicName} ->`).width/2-ctx.measureText(`${selectedModNameTxt}`).width-4, 
        y: 40,
        add: 2
    })

    functions.fillText({
        style: filtredMusics[modSelect].musics[musicSelect].menuColor,
        text: `§f-> §g${selectedMusicName} §f->`,
        x: canvas.width/2-(ctx.measureText(`-> ${selectedMusicName} ->`).width/2), 
        y: 40,
        add: 2
    })

    functions.fillText({
        style: game.state.difficulties[selectMusicInfo.difficulties[difficultySelected]]?.color,
        text: `${selectedDifficultyName}`,
        x: canvas.width/2+(ctx.measureText(`-> ${selectedMusicName} ->`).width/2)+15, 
        y: 40,
        add: 2
    })

    ctx.font = `bold ${screenResize*13}px Arial`

    functions.fillText({
        style: 'white',
        text: 'Mod',
        x: canvas.width/3/2-(ctx.measureText('Mod').width/2), 
        y: canvas.height/3-70,
        add: 2
    })

    functions.fillText({
        style: 'white',
        text: 'Music',
        x: canvas.width/2-(ctx.measureText('Music').width/2), 
        y: canvas.height/3-70,
        add: 2
    })

    functions.fillText({
        style: 'white',
        text: 'Difficulty',
        x: (canvas.width/3*2)+canvas.width/3/2-(ctx.measureText('Difficulty').width/2), 
        y: canvas.height/3-70,
        add: 2
    })*/
}