export default async (type, { noteClickAuthor, note, click, listenerState, difficulty, events }, state) => {
    switch (type) {
		case 'noteClick':
			break
		case 'loaded':
			for (let i in state.arrowsInfo) {
				state.arrowsInfo[i].alpha = 0.8
				state.arrowsInfo[i].noteAlpha = 0.8
				state.arrowsInfo[i].splashAlpha = 0.7

				state.arrowsInfoOpponent[i].alpha = 0.8
				state.arrowsInfoOpponent[i].noteAlpha = 0.8
				state.arrowsInfoOpponent[i].splashAlpha = 0.7
			}
			break
        case 'started':
			state.musicInfo.variables = {
				oldBeat: 0,
				oldStep: 0,
				oldCurrentTime: 0,
			}
			break
		case 'end':
			state.sounds['Sounds/Lullaby/Psyshock.ogg'].pause()
			state.sounds['Sounds/Lullaby/TranceStatic.ogg'].pause()
			break
		case 'gameLoop':
			var variables = state.musicInfo.variables

			let beat = state.musicBeat
			let step = state.musicStep
			let currentTime = state.music?.currentTime

			if (state.screenZoom < 10 && state.camZooming) {
				if (variables.oldBeat != beat && beat%4 == 0) state.screenZoom = 10
			} else if (state.screenZoom <= 0) {
				state.screenZoom = 0
				state.camZooming = true
			} else {
				state.camZooming = false
				state.screenZoom -= 1
			}

			variables.oldBeat = beat
			variables.oldStep = step
			variables.oldCurrentTime = currentTime
            break
    }
}