export default async (type, { noteClickAuthor }, state) => {
    switch (type) {
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