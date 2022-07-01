module.exports = (type, command, state) => {
    let song = null

    if (command?.newSong) {
        song = new Audio()
        song.src = `/${type}`
    } else song = state.sounds[type]

    if (!song) return
    
    if (command?.musicMenu) {
        if (state.musicMenu) state.musicMenu.pause()
        state.musicMenu = song
    }

    song.pause()
    song.currentTime = 0
    song.loop = command?.loop ? true : false
    song.volume = Number(command?.volume) || 1
    song.play()
}