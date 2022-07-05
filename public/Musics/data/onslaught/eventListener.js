module.exports = async (type, { noteClickAuthor, note, notes, listenerState, difficulty }, state) => {
    switch (type) {
        case 'started':
			let oldBeat = 0
            let loop = setInterval(() => {
				let beat = state.musicBeat

				if (state.screenZoom < 20 && state.camZooming) {
					if (beat%3 == 0) state.screenZoom = 20
				} else if (state.screenZoom <= 0) {
					state.screenZoom = 0
					state.camZooming = true
				} else {
					state.camZooming = false
					state.screenZoom -= 2
				}

				if (difficulty.name != 'Mania') {
					if (beat >= 128 && oldBeat <= 352) {
						if (beat%20 == 0 && state.musicInfo.lastPopupTime+1000 <= +new Date()) {
							state.playSong('Sounds/pop_up.ogg')
							let dir = `bob-PopUps/popup${Number.parseInt(Math.random()*11)+1}.png`
							let image = state.images[dir]
							let popup = {
								image: dir,
								x: Number.parseInt(Math.random()*(state.canvas.width-image.width)),
								y: Number.parseInt(Math.random()*(state.canvas.height-image.height))
							}
							state.musicInfo.popups.push(popup)
							state.musicInfo.lastPopupTime = +new Date()
							setTimeout(() => state.musicInfo.popups.splice(state.musicInfo.popups.indexOf(popup), 1), 1000+Number.parseInt(Math.random()*5000))
						}
					}

					if (oldBeat <= 96 && beat >= 96 || oldBeat <= 240 && beat >= 240) {
						state.arrowsAlpha = 0
						state.arrowsAlphaOpponent = 0
						state.playSong('Sounds/Meow.ogg')
					}

					if (oldBeat <= 128 && beat >= 128) {
						state.arrowsAlpha = 1
						state.arrowsAlphaOpponent = 1
						state.playSong('Sounds/woeM.ogg')
						state.IsNoteSpinning = true
						state.arrowsRotation = { 0: 0, 1: 0, 2: 0, 3: 0 }
					}

					if (oldBeat <= 352 && beat >= 352) {
						state.arrowsAlpha = 1
						state.arrowsAlphaOpponent = 1
						state.playSong('Sounds/woeM.ogg')
						state.IsNoteSpinning = false
						state.arrowsRotation = {}
					}

					if (state.IsNoteSpinning) for (let i in state.arrowsRotation) state.arrowsRotation[i] += 0.5
				}

				oldBeat = beat
                if (state.music?.duration <= state.music?.currentTime || state.gameStage != 'game') {
                    clearInterval(loop)
					state.screenZoom = 0
                }
            }, 1000/50)
            break
    }
}