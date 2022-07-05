module.exports = async (type, { noteClickAuthor, note, notes, listenerState }, state) => {
    switch (type) {
        case 'started':
            let loop = setInterval(() => {
				let beat = state.musicBeat

				if (state.screenZoom < 20 && state.camZooming) {
					if (beat%4 == 0) state.screenZoom = 20
				} else if (state.screenZoom <= 0) {
					state.screenZoom = 0
					state.camZooming = true
				} else {
					state.camZooming = false
					state.screenZoom -= 2
				}
                if (state.music?.duration <= state.music?.currentTime || state.gameStage != 'game') {
                    clearInterval(loop)
					state.screenZoom = 0
                }
            }, 1000/50)
            break
    }
}