export default async (type, { noteClickAuthor }, state) => {
    switch (type) {
		case 'noteClick':
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
            let oldStep = 0
            let loop = setInterval(() => {
				let beat = state.musicBeat
				let step = state.musicStep

				if (state.screenZoom < 20 && state.camZooming) {
					if (beat%4 == 0) state.screenZoom = 20
				} else if (state.screenZoom <= 0) {
					state.screenZoom = 0
					state.camZooming = true
				} else {
					state.camZooming = false
					state.screenZoom -= 2
				}

				oldStep = step
                if (state.music?.duration <= state.music?.currentTime || state.gameStage != 'game') {
                    clearInterval(loop)
					state.screenZoom = 0
                }
            }, 1000/30)
            break
        
    }
}