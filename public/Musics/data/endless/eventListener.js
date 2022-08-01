module.exports = async (type, { noteClickAuthor, note, notes, listenerState, difficulty, events }, state) => {
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

				let spinArray = [
					272, 276, 336, 340, 400, 404, 464, 468, 528, 532, 592, 596, 656, 660, 720, 724, 784, 788, 848, 852, 912, 916, 976, 980, 1040, 1044, 1104, 1108,
					1424, 1428, 1488, 1492, 1552, 1556, 1616, 1620
				];

				if (oldStep != step && spinArray.includes(step)) state.IsNoteSpinning = true
				
				if (state.IsNoteSpinning) for (let i in state.arrowsInfo) {
					state.arrowsInfo[i].rotation += 60
					if (state.arrowsInfo[i].rotation >= 360) {
						state.IsNoteSpinning = false
						state.arrowsInfo[i].rotation = 0
					}
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