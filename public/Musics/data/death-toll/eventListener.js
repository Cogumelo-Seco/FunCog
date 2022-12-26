export default async (type, { noteClickAuthor, note, click, listenerState, difficulty, events }, state) => {
    switch (type) {
		case 'noteClick':
			break
		case 'loaded':
			state.amountOfArrows = 4

			let height = state.images['Arrows/Bronzong/Arrows.png'].animationConfig['Arrow-4']['Arrow-4'].height

			state.arrowsInfo[4] = {
				arrowID: 4,
				pos: 2,
                defaultPos: 4,
				imageDir: 'Arrows/Bronzong/Arrows.png',
				X: 0,
				Y: 0,
				defaultX: 0,
				defaultY: 0,
				fitX: 0,
				fitY: 0/*-(height/2)*/,
				resetEnable: true,
				alpha: 1,
				noteAlpha: 1,
				splashAlpha: 1,
				rotation: 0
			}

			state.arrowsInfo[2].pos = 3
			state.arrowsInfo[3].pos = 4

			for (let i in state.arrowsInfo) {
				state.arrowsInfo[i].resetX = true
				state.arrowsInfo[i].resetY = true
			}

			break
        case 'started':
			/*state.arrowsInfo[2].X = state.arrowsInfo[3].defaultX
			state.arrowsInfo[2].Y = state.arrowsInfo[3].defaultY
			state.arrowsInfo[3].X = state.arrowsInfo[4].defaultX
			state.arrowsInfo[3].Y = state.arrowsInfo[4].defaultY
			state.arrowsInfo[4].X = state.arrowsInfo[2].defaultX
			state.arrowsInfo[4].Y = state.arrowsInfo[2].defaultY*/

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
				if (variables.oladBeat != beat && beat%4 == 0) state.screenZoom = 10
			} else if (state.screenZoom <= 0) {
				state.screenZoom = 0
				state.camZooming = true
			} else {
				state.camZooming = false
				state.screenZoom -= 1
			}

			for (let i in state.musicNotes) {
				let note = state.musicNotes[i]
				if (note.type == 'Bronzong') {
					//console.log(note)
					let noteY = -((note.time-currentTime)*((5**state.resizeNote)*state.musicBPM)*state.smallFunctions.getConfig('ScrollSpeed'))
				}

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