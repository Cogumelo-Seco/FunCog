module.exports = async (type, { noteClickAuthor, note, notes, listenerState, difficulty, events }, state) => {
    switch (type) {
        case 'started':
			let oldCurrentTime = 0

            let loop = setInterval(() => {
				let beat = state.musicBeat
				let currentTime = state.music?.currentTime

				if (state.screenZoom < 20 && state.camZooming) {
					if (beat%4 == 0) state.screenZoom = 20
				} else if (state.screenZoom <= 0) {
					state.screenZoom = 0
					state.camZooming = true
				} else {
					state.camZooming = false
					state.screenZoom -= 2
				}

				for (let i in events) {
					let time = events[i][0]

					for (let a in events[i][1]) {
						let values = events[i][1][a]

						if (oldCurrentTime*1000 <= time && currentTime*1000 >= time) {
							switch(values[0]) {
								case 'streetBG state':
									if (Number(values[1]) == 0) state.musicInfo.backgroundImage = state.musicInfo.defaultBackgroundImage
									else state.musicInfo.backgroundImage = 'backgrounds/streetError.png'
									break
							}
						}
					}
				}

				oldCurrentTime = currentTime
                if (state.music?.duration <= state.music?.currentTime || state.gameStage != 'game') {
                    clearInterval(loop)
					state.screenZoom = 0
                }
            }, 1000/50)
            break
    }
}