export default async (type, { noteClickAuthor, note, notes, listenerState, difficulty, events }, state) => {
    switch (type) {
        case 'started':
			state.musicInfo.variables = {
				oldBeat: 0,
			}
		case 'gameLoop':
			let beat = state.musicBeat

			if (state.screenZoom < 10 && state.camZooming) {
				if (state.musicInfo.variables.oldBeat != beat && beat%4 == 0) state.screenZoom =10
			} else if (state.screenZoom <= 0) {
				state.screenZoom = 0
				state.camZooming = true
			} else {
				state.camZooming = false
				state.screenZoom -= 1
			}

			state.musicInfo.variables.oldBeat = beat
            break
    }
}