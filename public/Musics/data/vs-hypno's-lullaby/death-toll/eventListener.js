export default async (type, { noteClickAuthor, note, click, listenerState, difficulty, events }, state) => {
    switch (type) {
		case 'noteClick':
			break
		case 'loaded':
			if (state.musicInfo.difficulty.name != 'Mania') {
				state.arrowsInfo[4] = {
					arrowID: 4,
					arrowFrameID: 4,
					pos: 2,
					defaultPos: 4,
					imageDir: 'Arrows/Bronzong/Arrows.png',
					X: 0,
					Y: 0,
					defaultX: 0,
					defaultY: 0,
					fitX: 0,
					fitY: 0,
					resetEnable: true,
					alpha: 1,
					noteAlpha: 1,
					splashAlpha: 1,
					rotation: 0
				}

				state.arrowsInfo[2].pos = 3
				state.arrowsInfo[3].pos = 4
			}
			break
        case 'started':
			state.musicInfo.variables = {
				oldBeat: 0,
				oldStep: 0,
				oldCurrentTime: 0
			}
			break
		case 'end':
			break
		case 'gameLoop':
			var variables = state.musicInfo.variables

			let botPlay = state.smallFunctions.getConfig('botPlay')
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
		case 'gameLoopFullFPS':
			var variables = state.musicInfo.variables

			let canvas = state.canvas
			let ctx = canvas.getContext('2d')



			break
    }
}