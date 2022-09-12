export default async (type, { noteClickAuthor, note, notes, listenerState, difficulty, events }, state) => {
	const hurtFunction = (hurt) => {
		state.musicInfo.hurtLevel += 1

		state.musicInfo.popups.sonicEXEHitStatic = {
			image: `imgs/LateNightCityTale/Broken.png`,
			x: 0,
			y: 0,
			width: state.canvas.width,
			height: state.canvas.height,
			alpha: 0.5
		}

		if (state.musicInfo.hurtLevel >= 2) {
			state.musicInfo.health = -100
		}
	}

    switch (type) {
		case 'noteClick':
			if (noteClickAuthor == 'player' && note?.type == 'LNCTRed' && !notes?.find(n => n.type == 'normal'))
				state.playSong('Sounds/LateNightCityTale/heal.ogg', { newSong: true })
			break
		case 'passedNote':
			if (note?.type == 'LNCTRed') {
				state.playSong('Sounds/LateNightCityTale/broken.ogg', { newSong: true })
				hurtFunction(true)
			}
			break
        case 'started':
			state.musicInfo.hurtLevel = 0
			let noteAlpha = 1
			let addAlpha = true
			let pauseAlpha = false

			for (let i in state.arrowsInfo) {
				state.arrowsInfo[i].shadowBlur = 15
				state.arrowsInfo[i].noteShadowBlur = 15
				state.arrowsInfoOpponent[i].shadowBlur = 15
				state.arrowsInfoOpponent[i].noteShadowBlur = 15
				
				state.arrowsInfo[i].shadowColor = '#02f7ff'
				state.arrowsInfo[i].noteShadowColor = '#02f7ff'
				state.arrowsInfoOpponent[i].shadowColor = '#02f7ff'
				state.arrowsInfoOpponent[i].noteShadowColor = '#02f7ff'
			}

            let loop = setInterval(() => {
				let beat = state.musicBeat

				/*if (state.screenZoom < 10 && state.camZooming) {
					if (beat%4 == 0) state.screenZoom = 10
				} else if (state.screenZoom <= 0) {
					state.screenZoom = 0
					state.camZooming = true
				} else {
					state.camZooming = false
					state.screenZoom -= 0.5
				}*/

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

						state.arrowsInfoOpponent[i].alpha = noteAlpha
						state.arrowsInfoOpponent[i].noteAlpha = noteAlpha
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