module.exports = async (type, { noteClickAuthor, note, notes, listenerState }, state) => {
    switch (type) {
        case 'noteClick':
            if (noteClickAuthor == 'player' && note?.type == 'fireNote' && !notes?.find(n => n.type == 'normal')) {
                listenerState.arrows[note.arrowID].state = 'onNoteKill'
                note.clicked = true
                state.musicInfo.combo = 0
                state.musicInfo.accuracyMedia.push(1)
                state.musicInfo.misses += 1
                state.musicInfo.score -= 50
                state.musicInfo.health -= 20
                state.playSong('Sounds/burnSound.ogg', { newSong: true })
            }
            break
    }
}