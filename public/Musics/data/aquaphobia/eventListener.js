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
		case 'loaded':
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
				break
        case 'started':
			state.musicInfo.hurtLevel = 0
			let oldCurrentTime = 0
			let screenPurpleFilterAlpha = 0
			let brokenScreenFilterAlpha = 0
			let brokenScreenFrame = 1
			let brokenScreenSong1 = true
			let brokenScreenSong2 = true
			let oldBeat = 0
			let noteAlpha = 1
			let addAlpha = true
			let pauseAlpha = false

            let loop = setInterval(() => {
				let beat = state.musicBeat
				let currentTime = state.music?.currentTime

				if (beat >= 48 && beat <= 272 || beat >= 376 && beat <= 568) {
					state.screenXMovement = Number.parseInt(Math.random()*4)-2
					state.screenYMovement = Number.parseInt(Math.random()*4)-2
				}

				if (state.screenZoom < 10 && state.camZooming) {
					if (beat%4 == 0) state.screenZoom = 10
				} else if (state.screenZoom <= 0) {
					state.screenZoom = 0
					state.camZooming = true
				} else {
					state.camZooming = false
					state.screenZoom -= 0.5
				}

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

				if (beat >= 48 && oldBeat <= 48)
					screenPurpleFilterAlpha = 1

				state.musicInfo.popups.LNCTPurpleFilter = {
					image: `imgs/LateNightCityTale/purple-filter.png`,
					x: 0,
					y: 0,
					width: state.canvas.width,
					height: state.canvas.height,
					alpha: screenPurpleFilterAlpha
				}

				screenPurpleFilterAlpha = screenPurpleFilterAlpha-(screenPurpleFilterAlpha/15) <= 0 ? 0 : screenPurpleFilterAlpha-(screenPurpleFilterAlpha/15)

				if (oldBeat <= 272 && beat >= 272) state.musicInfo.backgroundImage = null
				if (oldBeat <= 280 && beat >= 280) state.musicInfo.backgroundImage = 'backgrounds/eyes.png'
				if (beat >= 365 && beat <= 374) {
					brokenScreenFilterAlpha = brokenScreenFilterAlpha+0.02 >= 1 ? 1 : brokenScreenFilterAlpha+0.02

					if (beat >= 371) {
						state.musicInfo.popups.LNCTBrokenScreenFilter = {
							image: `imgs/LateNightCityTale/brokenScreen/brokenScreen.png`,
							animationDir: 'frames',
							frame: 0,
							x: 0,
							y: 0,
							width: state.canvas.width,
							height: state.canvas.height,
							alpha: 1
						}
					} else {
						state.musicInfo.popups.LNCTBrokenScreenFilter = {
							image: `imgs/LateNightCityTale/brokenScreen/whiteScreen.png`,
							x: 0,
							y: 0,
							width: state.canvas.width,
							height: state.canvas.height,
							alpha: brokenScreenFilterAlpha
						}
					}

					//beat >= 371 ? 1 : 0
				}


				if (oldBeat <= 371 && beat >= 371 && brokenScreenSong1) {
					brokenScreenSong1 = false
					state.playSong('Sounds/LateNightCityTale/glassBreak1.ogg')
				}
				if (oldBeat <= 374 && beat >= 374 && brokenScreenSong2) {
					brokenScreenSong2 = false
					state.playSong('Sounds/LateNightCityTale/glassBreak2.ogg')
				}

				if (beat >= 374 && beat <= 390) {
					state.musicInfo.backgroundImage = state.musicInfo.defaultBackgroundImage

					state.musicInfo.popups.LNCTBrokenScreenFilter = {
						image: `imgs/LateNightCityTale/brokenScreen/brokenScreen.png`,
						frame: brokenScreenFrame,
						animationDir: 'frames',
						x: 0,
						y: 0,
						width: state.canvas.width,
						height: state.canvas.height
					}

					if (brokenScreenFrame <= 20) brokenScreenFrame += 1
					else delete state.musicInfo.popups.LNCTBrokenScreenFilter
				}

				oldBeat = beat
				oldCurrentTime = currentTime
                if (state.music?.duration <= state.music?.currentTime || state.gameStage != 'game') {
                    clearInterval(loop)
					state.screenZoom = 0
					state.screenXMovement = 0
                    state.screenYMovement = 0
                }
            }, 1000/30)
            break
    }
}