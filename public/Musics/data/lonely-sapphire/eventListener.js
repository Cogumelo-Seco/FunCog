export default async (type, { noteClickAuthor, note, notes, listenerState, difficulty, events }, state) => {
    switch (type) {
		case 'loaded':
			for (let i in state.arrowsInfoOpponent) {
				state.arrowsInfoOpponent[i].alpha = 0
				state.arrowsInfoOpponent[i].noteAlpha = 0
			}

			for (let i in state.arrowsInfo) {
				state.arrowsInfo[i].shadowBlur = 15
				state.arrowsInfo[i].noteShadowBlur = 15
				
				state.arrowsInfo[i].shadowColor = '#d20ef1'
				state.arrowsInfo[i].noteShadowColor = '#d20ef1'
			}
			break
        case 'started':
			let noteAlpha = 1
			let addAlpha = true
			let pauseAlpha = false

            let loop = setInterval(() => {
				state.middleScroll = true

				if (addAlpha) {
					if (noteAlpha < 1) noteAlpha += 0.002
					if (noteAlpha >= 1) addAlpha = false
				} else if (!pauseAlpha) {
					if (noteAlpha > 0.7) noteAlpha -= 0.002
					if (noteAlpha <= 0.7) addAlpha = true
				}

				for (let i in state.arrowsInfo) {
					if (!pauseAlpha) {
						state.arrowsInfo[i].alpha = noteAlpha
						state.arrowsInfo[i].noteAlpha = noteAlpha
					}
				}

                if (state.music?.duration <= state.music?.currentTime || state.gameStage != 'game') {
                    clearInterval(loop)
					state.screenZoom = 0
                }
            }, 1000/40)
            break
    }
}