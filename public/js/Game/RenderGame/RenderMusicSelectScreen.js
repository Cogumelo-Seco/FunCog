export default async (canvas, game, Listener) => {
    const ctx = canvas.getContext('2d')

    let modSelect = game.state.selectMusicMenu.modSelect
    let musicSelect = game.state.selectMusicMenu.musicSelect
    let musicSelectFiltered = (musicSelect < 0 ? 0 : musicSelect)

     
    let modPrevious = game.state.musics[modSelect-1] || game.state.musics[game.state.musics.length-1]
    let mod = game.state.musics[modSelect]
    let modNext = game.state.musics[modSelect+1] || game.state.musics[0]

    let startY = canvas.height/2-(50/2)
    let endY = canvas.height-50
    let Y = startY+((endY-startY)*(musicSelectFiltered/(game.state.musics[modSelect].musics.length)))-(musicSelectFiltered*50)
    if (startY+(50*game.state.musics[modSelect].musics.length) < endY) Y = startY

    ctx.fillStyle = 'rgba(0, 0, 0, 0.8)'
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    canvas.style.backgroundImage = null
    for (let i in game.state.musics[modSelect].musics) {
        let music = game.state.musics[modSelect].musics[i]

        let X = canvas.width*0.2

        ctx.font = `bold 30px Arial`

        ctx.fillStyle = 'rgba(255, 255, 255, 0.2)'
        if (i == musicSelect) {
            ctx.fillRect(X-4, (Y-(30/1.2))-4, ctx.measureText(music.name).width+8, 30+8);
            canvas.style.backgroundImage = `url(https://raw.githubusercontent.com/Cogumelo-Seco/Cogu-FNF-Files/main/imgs/${music.backgroundImage})`
        }

        if (Y >= 200) {
            ctx.fillStyle = music.menuColor || 'rgb(255, 255, 255)'
            ctx.fillText(music.name.replace(/-/g, ' '), X, Y);

            ctx.lineWidth = 0.5
            ctx.strokeStyle  = 'black'
            ctx.strokeText(music.name.replace(/-/g, ' '), X, Y);

            let alertImage = game.state.images[`imgs/alert.png`]?.image
            if (music.dev && alertImage) {
                let txtWidth = ctx.measureText(music.name).width
                ctx.font = `bold 10px Arial`
                ctx.fillStyle = 'rgb(255, 66, 66)'

                ctx.drawImage(alertImage, X+txtWidth+5, Y-28, 30, 30)
                ctx.fillText('In development', X+txtWidth+30, Y-(30/2));
            }
        }

        Y += 50
    }

    let selectMusicInfo = game.state.musics[modSelect].musics[musicSelect]
    if (selectMusicInfo) {
        if (game.state.difficulties[selectMusicInfo.difficulties[game.state.selectMusicMenu.difficultySelected]]) {
            ctx.font = `bold 30px Arial`
            ctx.fillStyle = game.state.difficulties[selectMusicInfo.difficulties[game.state.selectMusicMenu.difficultySelected]].color
            let difficultyName = game.state.difficulties[selectMusicInfo.difficulties[game.state.selectMusicMenu.difficultySelected]].name
            ctx.fillText(`<  ${difficultyName}  >`, canvas.width*0.8-(ctx.measureText(`<  ${difficultyName}  >`).width), canvas.height/2-(70/2)+47);
        }

        game.state.selectMusicMenu.difficultySelected = game.state.selectMusicMenu.difficultySelected > selectMusicInfo.difficulties.length-1 ? 0 : game.state.selectMusicMenu.difficultySelected
        game.state.selectMusicMenu.difficultySelected = game.state.selectMusicMenu.difficultySelected < 0 ? selectMusicInfo.difficulties.length-1 : game.state.selectMusicMenu.difficultySelected
    }

    ctx.fillStyle = 'rgb(30, 30, 30, 0.6)'
    ctx.fillRect(0, 0, canvas.width, 180);

    ctx.fillStyle = mod.menuColor || 'white'
    ctx.font = `bold 30px Arial`
    let modNameTxt = `${musicSelect == -1 ? '<' : ''}  ${mod.name}  ${musicSelect == -1 ? '>' : ''}`
    ctx.fillText(modNameTxt, canvas.width/2-(ctx.measureText(modNameTxt).width/2), 110);

    ctx.lineWidth = 0.5
    ctx.strokeStyle  = 'black'
    ctx.strokeText(modNameTxt, canvas.width/2-(ctx.measureText(modNameTxt).width/2), 110);

    ctx.fillStyle = 'white'
    ctx.font = `bold 15px Arial`
    ctx.fillText(mod.musics.length, canvas.width/2-(ctx.measureText(mod.musics.length).width/2), 130);

    ctx.globalAlpha = 0.5
    if (modPrevious) {
        ctx.fillStyle = modPrevious.menuColor || 'white'
        ctx.font = `bold 20px Arial`
        ctx.fillText(modPrevious.name, canvas.width/6-(ctx.measureText(modPrevious.name).width/2), 110);
        
        ctx.fillStyle = 'white'
        ctx.font = `bold 10px Arial`
        ctx.fillText(modPrevious.musics.length, canvas.width/6-(ctx.measureText(modPrevious.musics.length).width/2), 125);
    }
    if (modNext) {
        ctx.fillStyle = modNext.menuColor || 'white'
        ctx.font = `bold 20px Arial`
        ctx.fillText(modNext.name, (canvas.width-canvas.width/6)-(ctx.measureText(modNext.name).width/2), 110);
        
        ctx.fillStyle = 'white'
        ctx.font = `bold 10px Arial`
        ctx.fillText(modNext.musics.length, (canvas.width-canvas.width/6)-(ctx.measureText(modNext.musics.length).width/2), 125);
    }
    ctx.globalAlpha = 1
}