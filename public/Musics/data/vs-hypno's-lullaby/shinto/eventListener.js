export default async (type, { noteClickAuthor, note, notes, listenerState, difficulty, events }, state) => {
    switch (type) {
		case 'started':
			state.musicInfo.variables = {
				oldBeat: 0,
			}
			break
        case 'gameLoop':
			let beat = state.musicBeat
			let fast = (beat >= 255 && beat <= 320) || (beat >= 384 && beat <= 448)

			if (state.screenZoom < (fast ? 30 : 20) && state.camZooming) {
				if (state.musicInfo.variables.oldBeat != beat && (fast ? true : beat%4 == 0)) state.screenZoom = fast ? 30 : 20
			} else if (state.screenZoom <= 0) {
				state.screenZoom = 0
				state.camZooming = true
			} else {
				state.camZooming = false
				state.screenZoom -= fast ? 2 : 1
			}

			state.musicInfo.variables.oldBeat = beat
            break
    }
}