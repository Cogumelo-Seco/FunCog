export default async (canvas, game, Listener) => {
    const ctx = canvas.getContext('2d')

    let modSelect = game.state.selectMusicMenu.modSelect
    let musicSelect = game.state.selectMusicMenu.musicSelect
    let musicSelectFiltered = (musicSelect < 0 ? 0 : musicSelect)


    let startY = canvas.height/2-(50/2)
    let endY = canvas.height-50
    let Y = startY+((endY-startY)*(musicSelectFiltered/(game.state.musics[modSelect].musics.length)))-(musicSelectFiltered*50)

    for (let i in game.state.musics[modSelect].musics) {
        let music = game.state.musics[modSelect].musics[i]

        let X = canvas.width*0.2

        ctx.font = `bold 30px Arial`

        ctx.fillStyle = 'rgba(255, 255, 255, 0.1)'
        if (i == musicSelect) ctx.fillRect(X-4, (Y-(30/1.2))-4, ctx.measureText(music.name).width+8, 30+8);

        ctx.fillStyle = music.menuColor || 'rgb(255, 255, 255)'
        ctx.fillText(music.name, X, Y);

        let alertImage = game.state.images[`imgs/alert.png`]?.image
        if (music.dev && alertImage) {
            let txtWidth = ctx.measureText(music.name).width
            ctx.font = `bold 10px Arial`
            ctx.fillStyle = 'rgb(255, 66, 66)'

            ctx.drawImage(alertImage, X+txtWidth+5, Y-28, 30, 30)
            ctx.fillText('In development', X+txtWidth+30, Y-(30/2));
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


    let mod = game.state.musics[modSelect]

    ctx.fillStyle = 'black'
    ctx.fillRect(0, 0, canvas.width, 175);

    ctx.fillStyle = 'rgb(255, 255, 255)'
    ctx.font = `bold 30px Arial`
    ctx.fillText(`${musicSelect == -1 ? '<' : ''}  ${mod.name}  ${musicSelect == -1 ? '>' : ''}`, canvas.width/2-(ctx.measureText(`${musicSelect == -1 ? '<' : ''}  ${mod.name}  ${musicSelect == -1 ? '>' : ''}`).width/2), 150);
}