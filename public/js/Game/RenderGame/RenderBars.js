module.exports = async (canvas, game, Listener) => {
    const ctx = canvas.getContext('2d')

    let musicBarWidth = canvas.width*0.5
    let musicBarHeight = 20

    let musicDuration = game.state.music?.duration || 0
    let musicCurrentTime = game.state.music?.currentTime || 0
    let musiPercent = musicCurrentTime/musicDuration

    ctx.fillStyle = 'rgb(100, 100, 100)'
    ctx.fillRect(canvas.width/2-musicBarWidth/2, 10, musicBarWidth, musicBarHeight)

    ctx.fillStyle = 'rgb(19, 189, 0)'
    ctx.fillRect(canvas.width/2-musicBarWidth/2, 10, musicBarWidth*musiPercent, musicBarHeight)

    ctx.font = `bold 15px Arial`
    ctx.fillStyle = 'white'
    let infoTxt = `${game.state.musicInfo.name} - (${formatTime(musicCurrentTime)} / ${formatTime(musicDuration)}) - ${Number.parseInt(musiPercent*100)}%`
    ctx.fillText(infoTxt, canvas.width/2-(ctx.measureText(infoTxt).width/2), 25);

    ctx.lineWidth = 2.5
    ctx.strokeStyle = 'black'
    ctx.strokeRect(canvas.width/2-musicBarWidth/2, 10, musicBarWidth, musicBarHeight)

    function formatTime(time) {
        if (!time) time = 0

        let keys = {
            minute: Number.parseInt(time/60%60),
            second: Number.parseInt(time%60)
        }

        let timeText = ''
        let oldKey;
        for (const key in keys) {
            timeText  += `${oldKey ? ':' : ''}${('00'+keys[key]).slice(-2)}`
            oldKey = key
        }
        if (!timeText) timeText = '00:00'
        return timeText
    }
}