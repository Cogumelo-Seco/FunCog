export default async (type, { noteClickAuthor, note, notes, listenerState, difficulty, events }, state) => {
    switch (type) {
		case 'loaded':
			for (let i in state.arrowsInfoOpponent) {
				state.arrowsInfoOpponent[i].alpha = 0
			}
			break
        case 'started':
			state.musicInfo.variables = {
			}
			break
		case 'gameLoop':
			let variables = state.musicInfo.variables

			let beat = state.musicBeat
			let currentTime = state.music?.currentTime

			variables.oldBeat = beat
			variables.oldCurrentTime = currentTime
            break
    }
}