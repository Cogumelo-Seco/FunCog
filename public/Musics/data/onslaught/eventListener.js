export default async (type, { noteClickAuthor, note, notes, listenerState, difficulty }, state) => {
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
							let id = Number.parseInt(Math.random()*1000)
							let dir = `bob-PopUps/popup${Number.parseInt(Math.random()*11)+1}.png`
							let image = state.images[dir].image
							state.musicInfo.popups[id] = {
								image: dir,
								x: Number.parseInt(Math.random()*(state.canvas.width-image.width)),
								y: Number.parseInt(Math.random()*(state.canvas.height-image.height))
							}
							state.musicInfo.lastPopupTime = +new Date()
							setTimeout(() => delete state.musicInfo.popups[id], 1000+Number.parseInt(Math.random()*5000))
						}
					}

					if (oldBeat <= 96 && beat >= 96 || oldBeat <= 240 && beat >= 240) {
						for (let i in state.arrowsInfo) state.arrowsInfo[i].alpha = 0
						for (let i in state.arrowsInfoOpponent) state.arrowsInfoOpponent[i].alpha = 0
						state.playSong('Sounds/Meow.ogg')
					}

					if (oldBeat <= 128 && beat >= 128) {
						for (let i in state.arrowsInfo) state.arrowsInfo[i].alpha = 1
						for (let i in state.arrowsInfoOpponent) state.arrowsInfoOpponent[i].alpha = 1
						state.playSong('Sounds/woeM.ogg')
						state.IsNoteSpinning = true
					}

					if (oldBeat <= 352 && beat >= 352) {
						for (let i in state.arrowsInfo) state.arrowsInfo[i].alpha = 1
						for (let i in state.arrowsInfoOpponent) state.arrowsInfoOpponent[i].alpha = 1
						state.playSong('Sounds/woeM.ogg')
						state.IsNoteSpinning = false
						for (let i in state.arrowsInfo) state.arrowsInfo[i].rotation = 0
						for (let i in state.arrowsInfoOpponent) state.arrowsInfoOpponent[i].rotation = 0
					}

					if (state.IsNoteSpinning) for (let i in state.arrowsInfo) state.arrowsInfo[i].rotation += 1
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