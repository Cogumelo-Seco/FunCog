export default async (ctx, canvas, game, Listener, functions) => {
    let screenElements = document.getElementById('screenElements')
    screenElements.innerHTML = ''
    
    ctx.fillStyle = 'rgb(0, 0, 0, 0.95)'
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    let modSelect = game.state.selectMusicMenu.modSelect
    let musicSelect = game.state.selectMusicMenu.musicSelect
    let difficultySelected = game.state.selectMusicMenu.difficultySelected
    let currentSelection = game.state.selectMusicMenu.currentSelection

    let filtredMusics = game.state.musics.filter(m => !m.dev || game.state.myConfig.emoji == '👑')

    let modCurrent = filtredMusics[modSelect]
    if (!modCurrent) return

    let startModsY = 100//canvas.height/2-(50/2)
    let endModsY = canvas.height
    let modsY = startModsY+((endModsY-startModsY)*(modSelect/(filtredMusics.length)))-(modSelect*40)
    if (startModsY+(40*filtredMusics.length) < endModsY) modsY = startModsY
    //startModsY+((endModsY-startModsY)*(musicSelectFiltered/(filtredMusics[modSelect].musics.length)))-(musicSelectFiltered*50)

    let contentWidth = canvas.width/3

    for (let i in filtredMusics) {
        let mod = filtredMusics[i]
        let modNameTxt = `${mod.dev ? '⚒' : mod.special ? '👑' : ''} ${mod.name.replace(/-/g, ' ')} ${mod.dev ? '⚒' : mod.special ? '👑' : ''}`

        ctx.fillStyle = mod.dev ? 'rgba(150, 25, 25)' : mod.special ? `rgba(200, 150, 00, ${currentSelection == 0 ? 0.6 : 0.3})` : `rgba(130, 130, 130, ${currentSelection == 0 ? 0.6 : 0.3})`
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
    let musicY = startMusicY+((endMusicY-startMusicY)*(musicSelect/(filtredMusics[modSelect].musics.length)))-(musicSelect*50)
    if (startMusicY+(50*filtredMusics[modSelect].musics.length) < endMusicY) musicY = startMusicY

    for (let i in filtredMusics[modSelect]?.musics) {
        let music = filtredMusics[modSelect].musics[i]
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

    let selectMusicInfo = filtredMusics[modSelect]?.musics[musicSelect]
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
}