export default async (ctx, canvas, game, Listener, functions) => {
    let screenElements = document.getElementById('screenElements')
    screenElements.innerHTML = ''
    
    ctx.fillStyle = 'rgb(0, 0, 0, 0.95)'
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    let modSelect = game.state.selectMusicMenu.modSelect
    let musicSelect = game.state.selectMusicMenu.musicSelect
    let difficultySelected = game.state.selectMusicMenu.difficultySelected
    let currentSelection = game.state.selectMusicMenu.currentSelection

    let modCurrent = game.state.musics[modSelect]
    if (!modCurrent) return

    let startModsY = 100//canvas.height/2-(50/2)
    let endModsY = canvas.height
    let modsY = startModsY+((endModsY-startModsY)*(modSelect/(game.state.musics.length)))-(modSelect*40)
    if (startModsY+(40*game.state.musics.length) < endModsY) modsY = startModsY
    //startModsY+((endModsY-startModsY)*(musicSelectFiltered/(game.state.musics[modSelect].musics.length)))-(musicSelectFiltered*50)

    let contentWidth = canvas.width/3

    for (let i in game.state.musics) {
        let mod = game.state.musics[i]
        let modNameTxt = `${mod.special ? '👑' : ''} ${mod.name} ${mod.special ? '👑' : ''}`

        ctx.fillStyle = mod.special ? `rgba(200, 150, 00, ${currentSelection == 0 ? 0.6 : 0.3})` : `rgba(130, 130, 130, ${currentSelection == 0 ? 0.6 : 0.3})`
        ctx.fillRect(20, modsY-20, contentWidth-40, 30);

        if (i == modSelect) {
            ctx.fillStyle = 'rgba(40, 40, 255, 0.5)'
            ctx.fillRect(20, modsY-20, contentWidth-40, 30);
        }

        ctx.font = 'bold 20px Arial'

        functions.fillText({
            style: mod.menuColor?.includes('RAINBOW') ? `hsl(${game.state.rainbowColor+(Number(mod.menuColor.split('-')[1]) || 0)}, 100%, 50%)` : mod.menuColor || 'white',
            text: modNameTxt,
            x: contentWidth/2-(ctx.measureText(modNameTxt).width/2), 
            y: modsY,
            add: 2
        })

        modsY += 40
    }

    let startMusicY = 100
    let endMusicY = canvas.height
    let musicY = startMusicY+((endMusicY-startMusicY)*(musicSelect/(game.state.musics[modSelect].musics.length)))-(musicSelect*50)
    if (startMusicY+(50*game.state.musics[modSelect].musics.length) < endMusicY) musicY = startMusicY

    for (let i in game.state.musics[modSelect]?.musics) {
        let music = game.state.musics[modSelect].musics[i]
        let musicName = music.name.replace(/-/g, ' ')+(music.suffix ? ' '+music.suffix : '')

        ctx.fillStyle = `rgba(130, 130, 130, ${currentSelection == 1 ? 0.6 : 0.3})`
        ctx.fillRect(contentWidth+20, musicY-20, contentWidth-40, 30);

        if (i == musicSelect) {
            ctx.fillStyle = 'rgba(40, 40, 255, 0.5)'
            ctx.fillRect(contentWidth+20, musicY-20, contentWidth-40, 30);
            canvas.style.backgroundImage = `url(https://raw.githubusercontent.com/Cogumelo-Seco/Cogu-FNF-Files/main/imgs/${music.backgroundImage})`
        }

        ctx.font = 'bold 20px Arial'

        functions.fillText({
            style: music.menuColor?.includes('RAINBOW') ? `hsl(${game.state.rainbowColor+(Number(music.menuColor.split('-')[1]) || 0)}, 100%, 50%)` : music.menuColor || 'white',
            text: musicName,
            x: contentWidth+contentWidth/2-(ctx.measureText(musicName).width/2), 
            y: musicY,
            add: 2
        })

        let txtWidth = ctx.measureText(musicName).width
        let alertImage = game.state.images[`imgs/alert.png`]?.image
        if (music.dev && alertImage) {
            ctx.font = `bold 10px Arial`
            ctx.fillStyle = 'rgb(255, 50, 50)'
            let X = (contentWidth+contentWidth/2+txtWidth/2)

            ctx.drawImage(alertImage, X+5, musicY-22, 30, 30)
            ctx.fillText('In development', X+30, musicY-10);
        }

        musicY += 40
    }

    let selectMusicInfo = game.state.musics[modSelect]?.musics[musicSelect]
    let difficultyY = canvas.height/2-(difficultySelected*40)
    for (let i in selectMusicInfo?.difficulties) {
        let difficulty = game.state.difficulties[selectMusicInfo.difficulties[i]]
        let difficultyName = difficulty.name+(selectMusicInfo.difficultyAlert && selectMusicInfo.difficultyAlert[selectMusicInfo.difficulties[i]] ? ` ${selectMusicInfo.difficultyAlert[selectMusicInfo.difficulties[i]]}` : '')

        ctx.fillStyle = `rgba(130, 130, 130, ${currentSelection == 2 ? 0.6 : 0.3})`
        ctx.fillRect(contentWidth*2+20, difficultyY-20, contentWidth-40, 30);

        if (i == difficultySelected) {
            ctx.fillStyle = 'rgba(40, 40, 255, 0.5)'
            ctx.fillRect(contentWidth*2+20, difficultyY-20, contentWidth-40, 30);
        }

        ctx.font = 'bold 20px Arial'

        functions.fillText({
            style: difficulty.color,
            text: difficultyName,
            x: (contentWidth*2)+contentWidth/2-(ctx.measureText(difficultyName).width/2), 
            y: difficultyY,
            add: 2
        })

        difficultyY += 40
        
        game.state.selectMusicMenu.difficultySelected = game.state.selectMusicMenu.difficultySelected > selectMusicInfo.difficulties.length-1 ? 0 : game.state.selectMusicMenu.difficultySelected
        game.state.selectMusicMenu.difficultySelected = game.state.selectMusicMenu.difficultySelected < 0 ? selectMusicInfo.difficulties.length-1 : game.state.selectMusicMenu.difficultySelected
    }
/*
    let modSelect = game.state.selectMusicMenu.modSelect
    let musicSelect = game.state.selectMusicMenu.musicSelect
    let musicSelectFiltered = (musicSelect < 0 ? 0 : musicSelect)

     
    let modPrevious = game.state.musics[modSelect-1] || game.state.musics[game.state.musics.length-1]
    let mod = game.state.musics[modSelect]
    let modNext = game.state.musics[modSelect+1] || game.state.musics[0]
    if (!mod) return
    
    let startY = canvas.height/2-(50/2)
    let endY = canvas.height-50
    let Y = startY+((endY-startY)*(musicSelectFiltered/(game.state.musics[modSelect].musics.length)))-(musicSelectFiltered*50)
    if (startY+(50*game.state.musics[modSelect].musics.length) < endY) Y = startY

    ctx.fillStyle = 'rgb(0, 0, 0, 0.8)'
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    canvas.style.backgroundImage = null
    for (let i in game.state.musics[modSelect].musics) {
        let music = game.state.musics[modSelect].musics[i]
        let musicName = music.name.replace(/-/g, ' ')+(music.crown ? ' 👑' : '')

        let X = canvas.width*0.2

        ctx.font = `bold 30px Arial`
        ctx.fillStyle = mod.special ? 'rgba(255, 200, 10, 0.2)' : 'rgba(255, 255, 255, 0.2)'
        if (i == musicSelect) {
            ctx.fillRect(X-4, (Y-(30/1.2))-4, ctx.measureText(musicName).width+8, 30+8);
            canvas.style.backgroundImage = `url(https://raw.githubusercontent.com/Cogumelo-Seco/Cogu-FNF-Files/main/imgs/${music.backgroundImage})`
        }

        if (Y >= 200) {
            ctx.fillStyle = music.menuColor?.includes('RAINBOW') ? `hsl(${game.state.rainbowColor+(Number(music.menuColor.split('-')[1]) || 0)}, 100%, 50%)` : music.menuColor || 'white'
            ctx.fillText(musicName, X, Y);

            ctx.lineWidth = 0.5
            ctx.strokeStyle  = 'black'
            ctx.strokeText(musicName.replace(/-/g, ' '), X, Y);

            Listener.state.buttons[`SelectMusic-${i}`] = {
                gameStage: [ 'selectMusic' ],
                minX: X/canvas.width*1000,
                maxX: (X+ctx.measureText(musicName).width)/canvas.width*1000,
                minY: (Y-30)/canvas.height*1000,
                maxY: Y/canvas.height*1000,
                pointer: true,
                over: false,
                onClick: () => {
                    if (game.state.selectMusicMenu.musicSelect == i) Listener.handleKeys({ event: { code: 'Enter' }, on: true })
                    else game.state.selectMusicMenu.musicSelect = i
                }
            }

            let txtWidth = ctx.measureText(musicName).width
            let additionalX = 0
            if (music.amountOfArrows) {
                additionalX += ctx.measureText(music.amountOfArrows).width

                ctx.fillStyle = 'rgb(245, 50, 50)'
                ctx.fillText(music.amountOfArrows, X+txtWidth+5, Y);
            }

            let alertImage = game.state.images[`imgs/alert.png`]?.image
            if (music.dev && alertImage) {
                ctx.font = `bold 10px Arial`
                ctx.fillStyle = 'rgb(255, 66, 66)'

                ctx.drawImage(alertImage, X+additionalX+txtWidth+5, Y-28, 30, 30)
                ctx.fillText('In development', X+additionalX+txtWidth+30, Y-(30/2));
            }
        } else delete Listener.state.buttons[`SelectMusic-${i}`] 

        Y += 50
    }

    let selectMusicInfo = game.state.musics[modSelect].musics[musicSelect]
    if (selectMusicInfo) {
        if (game.state.difficulties[selectMusicInfo.difficulties[game.state.selectMusicMenu.difficultySelected]]) {
            ctx.font = `bold 30px Arial`
            ctx.fillStyle = game.state.difficulties[selectMusicInfo.difficulties[game.state.selectMusicMenu.difficultySelected]].color
            let difficultyName = game.state.difficulties[selectMusicInfo.difficulties[game.state.selectMusicMenu.difficultySelected]].name

            let X = canvas.width*0.8-(ctx.measureText(`<  ${difficultyName}  >`).width)
            let Y = canvas.height/2-(70/2)+47
            ctx.fillText(`<  ${difficultyName}  >`, X, Y);

            Listener.state.buttons[`SelectMusic-Difficulty`] = {
                gameStage: [ 'selectMusic' ],
                minX: X/canvas.width*1000,
                maxX: (X+ctx.measureText(`<  ${difficultyName}  >`).width)/canvas.width*1000,
                minY: (Y-30)/canvas.height*1000,
                maxY: Y/canvas.height*1000,
                pointer: true,
                over: false,
                songClick: 'Sounds/scrollMenu.ogg',
                onClick: () => {
                    Listener.handleKeys({ event: { code: 'ArrowLeft' }, on: true })
                }
            }
        }

        game.state.selectMusicMenu.difficultySelected = game.state.selectMusicMenu.difficultySelected > selectMusicInfo.difficulties.length-1 ? 0 : game.state.selectMusicMenu.difficultySelected
        game.state.selectMusicMenu.difficultySelected = game.state.selectMusicMenu.difficultySelected < 0 ? selectMusicInfo.difficulties.length-1 : game.state.selectMusicMenu.difficultySelected
    } else delete Listener.state.buttons[`SelectMusic-Difficulty`]

    ctx.fillStyle = mod.special ? 'rgb(50, 30, 5, 0.6)' : 'rgb(30, 30, 30, 0.6)'
    ctx.fillRect(0, 0, canvas.width, 180);

    ctx.fillStyle = mod.menuColor?.includes('RAINBOW') ? `hsl(${game.state.rainbowColor+(Number(mod.menuColor.split('-')[1]) || 0)}, 100%, 50%)` : mod.menuColor || 'white'
    ctx.font = `bold 30px Arial`
    let modNameTxt = `${musicSelect == -1 ? '<' : ''} ${mod.special ? '👑' : ''} ${mod.name} ${mod.special ? '👑' : ''} ${musicSelect == -1 ? '>' : ''}`
    ctx.fillText(modNameTxt, canvas.width/2-(ctx.measureText(modNameTxt).width/2), 110);

    ctx.lineWidth = 0.5
    ctx.strokeStyle  = 'black'
    ctx.strokeText(modNameTxt, canvas.width/2-(ctx.measureText(modNameTxt).width/2), 110);

    ctx.fillStyle = 'white'
    ctx.font = `bold 15px Arial`
    ctx.fillText(mod.musics.length, canvas.width/2-(ctx.measureText(mod.musics.length).width/2), 130);

    ctx.globalAlpha = 0.5
    if (modPrevious) {
        ctx.font = `bold 20px Arial`
        ctx.fillStyle = modPrevious.menuColor?.includes('RAINBOW') ? `hsl(${game.state.rainbowColor+(Number(modPrevious.menuColor.split('-')[1]) || 0)}, 100%, 50%)` : modPrevious.menuColor || 'white'
        let X = canvas.width/6-(ctx.measureText(modPrevious.name).width/2)
        let Y = 110
        ctx.fillText(modPrevious.name, X, Y);

        Listener.state.buttons[`SelectMusic-ModPrevious`] = {
            gameStage: [ 'selectMusic' ],
            minX: X/canvas.width*1000,
            maxX: (X+ctx.measureText(modPrevious.name).width)/canvas.width*1000,
            minY: (Y-20)/canvas.height*1000,
            maxY: Y/canvas.height*1000,
            pointer: true,
            over: false,
            songClick: 'Sounds/scrollMenu.ogg',
            onClick: () => {
                game.state.selectMusicMenu.modSelect = game.state.musics[game.state.selectMusicMenu.modSelect-1] ? game.state.selectMusicMenu.modSelect-1 : game.state.musics.length-1
            }
        }
        
        ctx.fillStyle = 'white'
        ctx.font = `bold 10px Arial`
        ctx.fillText(modPrevious.musics.length, canvas.width/6-(ctx.measureText(modPrevious.musics.length).width/2), 125);
    }
    if (modNext) {
        ctx.font = `bold 20px Arial`
        ctx.fillStyle = modNext.menuColor?.includes('RAINBOW') ? `hsl(${game.state.rainbowColor+(Number(modNext.menuColor.split('-')[1]) || 0)}, 100%, 50%)` : modNext.menuColor || 'white'
        let X = (canvas.width-canvas.width/6)-(ctx.measureText(modNext.name).width/2)
        let Y = 110
        ctx.fillText(modNext.name, X, Y);

        Listener.state.buttons[`SelectMusic-ModNext`] = {
            gameStage: [ 'selectMusic' ],
            minX: X/canvas.width*1000,
            maxX: (X+ctx.measureText(modNext.name).width)/canvas.width*1000,
            minY: (Y-20)/canvas.height*1000,
            maxY: Y/canvas.height*1000,
            pointer: true,
            over: false,
            songClick: 'Sounds/scrollMenu.ogg',
            onClick: () => {
                game.state.selectMusicMenu.modSelect = game.state.musics[game.state.selectMusicMenu.modSelect+1] ? game.state.selectMusicMenu.modSelect+1 : 0
            }
        }
        
        ctx.fillStyle = 'white'
        ctx.font = `bold 10px Arial`
        ctx.fillText(modNext.musics.length, (canvas.width-canvas.width/6)-(ctx.measureText(modNext.musics.length).width/2), 125);
    }
    ctx.globalAlpha = 1*/
}