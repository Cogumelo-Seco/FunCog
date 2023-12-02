export default async (type, { noteClickAuthor, note, click, listenerState, difficulty, events }, state) => {
    switch (type) {
		case 'loaded':
			state.musicInfo.variables = {
				oldStep: 0,
			}
			break
        case 'started':
			break
		case 'gameLoop':
			var variables = state.musicInfo.variables

			let beat = state.musicBeat

			if (state.screenZoom < 10 && state.camZooming) {
				if (variables.oladBeat != beat && beat%4 == 0) state.screenZoom = 10
			} else if (state.screenZoom <= 0) {
				state.screenZoom = 0
				state.camZooming = true
			} else {
				state.camZooming = false
				state.screenZoom -= 1
			}

			variables.oldBeat = beat
            break
    }
}