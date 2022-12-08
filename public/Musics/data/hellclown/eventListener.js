export default async (type, { noteClickAuthor, note, notes, listenerState }, state) => {
    if (!state.animations['fireNote']) state.animations['fireNote'] = {
        frame: 0,
        startFrame: 0,
        endFrame: 11,
        totalDalay: 40,
        dalay: 0,
        loop: true
    }

    switch (type) {
        case 'noteClick':
            if (state.musicInfo.playerId == 2 && noteClickAuthor == 'player' || state.musicInfo.playerId == 1 && noteClickAuthor == 'opponent') {
                let current = 0
                let interval = setInterval(() => {
                    if (current >= 3) {
                        state.screenXMovement = 0
                        state.screenYMovement = 0
                        clearInterval(interval)
                    } else {
                        current += 1
                        state.screenXMovement = Number.parseInt(Math.random()*10)-5
                        state.screenYMovement = Number.parseInt(Math.random()*10)-5
                    }
                }, 1000/50)
            }
            if (noteClickAuthor == 'player' && note?.type == 'fireNote' && !notes?.find(n => n.errorWhenNotClicking)) {
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
            state.musicInfo.variables = {
				oldBeat: 0,
			}
        case 'end':
            delete state.animations['fireNote']
            break
		case 'gameLoop':
			let beat = state.musicBeat

			if (state.screenZoom < 20 && state.camZooming) {
				if (state.musicInfo.variables.oldBeat != beat && beat%4 == 0) state.screenZoom = 20
			} else if (state.screenZoom <= 0) {
				state.screenZoom = 0
				state.camZooming = true
			} else {
				state.camZooming = false
				state.screenZoom -= 2
			}

			state.musicInfo.variables.oldBeat = beat
            break
    }
}