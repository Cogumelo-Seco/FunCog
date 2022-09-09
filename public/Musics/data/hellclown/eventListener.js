export default async (type, { noteClickAuthor, note, notes, listenerState }, state) => {
    state.animations['fireNote'] = {
        frame: 0,
        startFrame: 0,
        endFrame: 11,
        totalDalay: 40,
        dalay: 0,
        loop: true
    }

    switch (type) {
        case 'noteClick':
            if (noteClickAuthor == 'player' && note?.type == 'fireNote' && !notes?.find(n => n.type == 'normal')) {
                listenerState.arrows[note.arrowID].state = 'onNoteKill'
                note.clicked = true
                state.musicInfo.combo = 0
                state.musicInfo.accuracyMedia.push(1)
                state.musicInfo.misses += 1
                state.musicInfo.score -= 50
                state.musicInfo.health -= 15
                state.playSong('Sounds/burnSound.ogg', { newSong: true })
            }
            break
        case 'started':
            let loop = setInterval(() => {
                if (state.music?.duration <= state.music?.currentTime || state.gameStage != 'game') {
                    clearInterval(loop)
					state.screenZoom = 0

					delete state.animations['fireNote']
                }
            }, 1000/30)
            break
    }
}