export default async (type, { noteClickAuthor, note, notes, listenerState, difficulty, events }, state) => {
    switch (type) {
        case 'started':
			state.musicInfo.variables = {
				oldBeat: 0,
				oldCurrentTime: 0
			}
			break
		case 'gameLoop':
			let variables = state.musicInfo.variables

			let beat = state.musicBeat
			let currentTime = state.music?.currentTime

			if (state.screenZoom < 20 && state.camZooming) {
				if (variables.oldBeat != beat && beat%4 == 0) state.screenZoom = 20
			} else if (state.screenZoom <= 0) {
				state.screenZoom = 0
				state.camZooming = true
			} else {
				state.camZooming = false
				state.screenZoom -= 2
			}

			for (let i in state.musicInfo.events) {
				let time = state.musicInfo.events[i][0]

				for (let a in state.musicInfo.events[i][1]) {
					let values = state.musicInfo.events[i][1][a]

					if (variables.oldCurrentTime*1000 <= time && currentTime*1000 >= time) {
						switch(values[0]) {
							case 'streetBG state':
								if (Number(values[1]) == 0) state.musicInfo.backgroundImage = state.musicInfo.defaultBackgroundImage
								else state.musicInfo.backgroundImage = 'backgrounds/streetError.png'
								break
						}
					}
				}
			}

			variables.oldBeat = beat
			variables.oldCurrentTime = currentTime
            break
    }
}