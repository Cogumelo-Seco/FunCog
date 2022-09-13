export default async (type, { noteClickAuthor, note, notes, listenerState, difficulty, events }, state) => {
	const hurtFunction = (hurt) => {
		state.musicInfo.hurtLevel += hurt ? 1 : -1
		if (state.musicInfo.hurtLevel <= 0) state.musicInfo.hurtLevel = 0

		state.musicInfo.popups.LNCTHurt = {
			image: `imgs/LateNightCityTale/hurt.png`,
			x: 0,
			y: 0,
			width: state.canvas.width,
			height: state.canvas.height,
			alpha: state.musicInfo.hurtLevel/3
		}

		if (state.musicInfo.hurtLevel > 3) {
			state.musicInfo.health = -100
		}
	}

    switch (type) {
		case 'noteClick':
			if (noteClickAuthor == 'player' && note?.type == 'LNCTWhite') {
				state.playSong('Sounds/LateNightCityTale/heal.ogg', { newSong: true })
				hurtFunction(false)
			}

			if (noteClickAuthor == 'player' && note?.type == 'LNCTBlack' && !notes?.find(n => n.errorWhenNotClicking)) {
				state.playSong(`Sounds/LateNightCityTale/blackNote${Number.parseInt(Math.random()*2)+1}.ogg`, { newSong: true })
				hurtFunction(true)
				note.clicked = true
                state.musicInfo.combo = 0
                state.musicInfo.accuracyMedia.push(1)
                state.musicInfo.misses += 1
                state.musicInfo.score -= 50
			}
			break
		case 'passedNote':
			break
        case 'started':
			state.musicInfo.hurtLevel = 0
			let oldCurrentTime = 0
			let noteAlpha = 1
			let addAlpha = true
			let pauseAlpha = false

			for (let i in state.arrowsInfo) {
				state.arrowsInfo[i].shadowBlur = 15
				state.arrowsInfo[i].noteShadowBlur = 15
				state.arrowsInfoOpponent[i].shadowBlur = 15
				state.arrowsInfoOpponent[i].noteShadowBlur = 15
			}

            let loop = setInterval(() => {
				let beat = state.musicBeat
				let currentTime = state.music?.currentTime

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
					if (currentTime <= 85 && oldCurrentTime >= 76) {
						if (state.arrowsInfo[i].shadowBlur > 0) state.arrowsInfo[i].shadowBlur -= 0.1
						if (state.arrowsInfo[i].noteShadowBlur > 0) state.arrowsInfo[i].noteShadowBlur -= 0.1
						if (state.arrowsInfoOpponent[i].shadowBlur > 0) state.arrowsInfoOpponent[i].shadowBlur -= 0.1
						if (state.arrowsInfoOpponent[i].noteShadowBlur > 0) state.arrowsInfoOpponent[i].noteShadowBlur -= 0.1
						
						if (state.arrowsInfo[i].alpha < 1) state.arrowsInfo[i].alpha += 0.1
						if (state.arrowsInfo[i].noteAlpha < 1) state.arrowsInfo[i].noteAlpha += 0.1
						if (state.arrowsInfoOpponent[i].alpha < 1) state.arrowsInfoOpponent[i].alpha += 0.1
						if (state.arrowsInfoOpponent[i].noteAlpha < 1) state.arrowsInfoOpponent[i].noteAlpha += 0.1

						pauseAlpha = true
					} else if (currentTime >= 88 && oldCurrentTime <= 95) {
						pauseAlpha = false

						if (state.arrowsInfo[i].shadowBlur < 15) state.arrowsInfo[i].shadowBlur += 0.1
						if (state.arrowsInfo[i].noteShadowBlur < 15) state.arrowsInfo[i].noteShadowBlur += 0.1
						if (state.arrowsInfoOpponent[i].shadowBlur < 15) state.arrowsInfoOpponent[i].shadowBlur += 0.1
						if (state.arrowsInfoOpponent[i].noteShadowBlur < 15) state.arrowsInfoOpponent[i].noteShadowBlur += 0.1
					}

					if (!pauseAlpha) {
						state.arrowsInfo[i].shadowColor = currentTime <= 80 ? '#d20ef1' : '#02f7ff'
						state.arrowsInfo[i].noteShadowColor = currentTime <= 80 ? '#d20ef1' : '#02f7ff'
						state.arrowsInfo[i].alpha = noteAlpha
						state.arrowsInfo[i].noteAlpha = noteAlpha

						state.arrowsInfoOpponent[i].shadowColor = currentTime <= 80 ? '#d20ef1' : '#02f7ff'
						state.arrowsInfoOpponent[i].noteShadowColor = currentTime <= 80 ? '#d20ef1' : '#02f7ff'
						state.arrowsInfoOpponent[i].alpha = noteAlpha
						state.arrowsInfoOpponent[i].noteAlpha = noteAlpha
					}
				}

				oldCurrentTime = currentTime
                if (state.music?.duration <= state.music?.currentTime || state.gameStage != 'game') {
                    clearInterval(loop)
					state.screenZoom = 0
                }
            }, 1000/40)
            break
    }
}