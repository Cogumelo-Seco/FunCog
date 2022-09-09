export default async (canvas, game, Listener) => {
    const ctx = canvas.getContext('2d')

    let musicSelect = game.state.selectMusicMenu.musicSelect
    let Y = (canvas.height/2-(70/2)+47)-musicSelect*(70)

    ctx.fillStyle = 'rgba(255, 255, 255, 0.1)'
    ctx.fillRect(0, canvas.height/2-(70/2), canvas.width, 70);

    ctx.font = `bold 40px Arial`
    let selectMusicInfo = game.state.musics[musicSelect]
    if (selectMusicInfo) {
        if (game.state.difficulties[selectMusicInfo.difficulties[game.state.selectMusicMenu.difficultySelected]]) {
            ctx.fillStyle = game.state.difficulties[selectMusicInfo.difficulties[game.state.selectMusicMenu.difficultySelected]].color
            ctx.fillText(game.state.difficulties[selectMusicInfo.difficulties[game.state.selectMusicMenu.difficultySelected]].name, canvas.width*0.8-(ctx.measureText(game.state.difficulties[selectMusicInfo.difficulties[game.state.selectMusicMenu.difficultySelected]].name).width/2), canvas.height/2-(70/2)+47);
        }

        game.state.selectMusicMenu.difficultySelected = game.state.selectMusicMenu.difficultySelected > selectMusicInfo.difficulties.length-1 ? 0 : game.state.selectMusicMenu.difficultySelected
        game.state.selectMusicMenu.difficultySelected = game.state.selectMusicMenu.difficultySelected < 0 ? selectMusicInfo.difficulties.length-1 : game.state.selectMusicMenu.difficultySelected
    }

    for (let i in game.state.musics) {
        let music = game.state.musics[i]
        let alertImage = game.state.images['QTAlerts/alert-0.png']
        let X = canvas.width*0.2-(Math.abs(canvas.height/2-Y))
        ctx.fillStyle = music.menuColor || 'rgb(255, 255, 255)'
        ctx.font = `bold 40px Arial`

        ctx.fillText(music.name, X, Y);

        if (music.dev && alertImage) {
            let txtWidth = ctx.measureText(music.name).width
            ctx.font = `bold 10px Arial`
            ctx.fillStyle = 'rgb(255, 66, 66)'

            ctx.drawImage(alertImage, X+txtWidth+5, Y-28, 30, 30)
            ctx.fillText('In development', X+txtWidth+30, Y-(30/2));
        }

        Y += 70
    }
}