export default async (type, { noteClickAuthor, note, notes, listenerState, difficulty, events }, state) => {
	const hurtFunction = (hurt) => {
		state.musicInfo.variables.hurtLevel += hurt ? 1 : -1
		if (state.musicInfo.variables.hurtLevel <= 0) state.musicInfo.variables.hurtLevel = 0

		state.musicInfo.popups.LNCTHurt = {
			image: `imgs/LateNightCityTale/hurt.png`,
			x: 0,
			y: 0,
			width: state.canvas.width,
			height: state.canvas.height,
			alpha: state.musicInfo.variables.hurtLevel/3
		}

		if (state.musicInfo.variables.hurtLevel > 3) {
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
			state.musicInfo.variables = {
				hurtLevel: 0,
				oldCurrentTime: 0,
				screenPurpleFilterAlpha: 0,
				brokenScreenFilterAlpha: 0,
				brokenScreenFrame: 1,
				brokenScreenSong1: true,
				brokenScreenSong2: true,
				oldBeat: 0,
				noteAlpha: 1,
				addAlpha: true,
				pauseAlpha: false
			}
			break
		case 'gameLoop':
			let variables = state.musicInfo.variables

			let beat = state.musicBeat
			let currentTime = state.music?.currentTime

			if (beat >= 48 && beat <= 272 || beat >= 376 && beat <= 568) {
				state.screenXMovement = Number.parseInt(Math.random()*4)-2
				state.screenYMovement = Number.parseInt(Math.random()*4)-2
			}

			if (state.screenZoom < 10 && state.camZooming) {
				if (variables.oldBeat != beat && beat%4 == 0) state.screenZoom = 10
			} else if (state.screenZoom <= 0) {
				state.screenZoom = 0
				state.camZooming = true
			} else {
				state.camZooming = false
				state.screenZoom -= 0.5
			}

			if (variables.addAlpha) {
				if (variables.noteAlpha < 1) variables.noteAlpha += 0.002
				if (variables.noteAlpha >= 1) variables.addAlpha = false
			} else if (!variables.pauseAlpha) {
				if (variables.noteAlpha > 0.7) variables.noteAlpha -= 0.002
				if (variables.noteAlpha <= 0.7) variables.addAlpha = true
			}

			for (let i in state.arrowsInfo) {
				if (!variables.pauseAlpha) {
					state.arrowsInfo[i].alpha = variables.noteAlpha
					state.arrowsInfo[i].noteAlpha = variables.noteAlpha

					state.arrowsInfoOpponent[i].alpha = variables.noteAlpha
					state.arrowsInfoOpponent[i].noteAlpha = variables.noteAlpha
				}
			}

			if (beat >= 48 && variables.oldBeat <= 48) variables.screenPurpleFilterAlpha = 1
			if (variables.screenPurpleFilterAlpha > 0) {
				state.musicInfo.popups.LNCTPurpleFilter = {
					image: `imgs/LateNightCityTale/purple-filter.png`,
					x: 0,
					y: 0,
					width: state.canvas.width,
					height: state.canvas.height,
					alpha: variables.screenPurpleFilterAlpha
				}
				variables.screenPurpleFilterAlpha = variables.screenPurpleFilterAlpha-(variables.screenPurpleFilterAlpha/15) <= 0 ? 0 : variables.screenPurpleFilterAlpha-(variables.screenPurpleFilterAlpha/15)
			} else delete state.musicInfo.popups.LNCTPurpleFilter

			if (variables.oldBeat <= 272 && beat >= 272) state.musicInfo.backgroundImage = null
			if (variables.oldBeat <= 280 && beat >= 280) state.musicInfo.backgroundImage = 'backgrounds/eyes.png'
			if (beat >= 365 && beat <= 374) {
				variables.brokenScreenFilterAlpha = variables.brokenScreenFilterAlpha+0.02 >= 1 ? 1 : variables.brokenScreenFilterAlpha+0.02

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
						alpha: variables.brokenScreenFilterAlpha
					}
				}

				//beat >= 371 ? 1 : 0
			}


			if (variables.oldBeat <= 371 && beat >= 371 && variables.brokenScreenSong1) {
				variables.brokenScreenSong1 = false
				state.playSong('Sounds/LateNightCityTale/glassBreak1.ogg')
			}
			if (variables.oldBeat <= 374 && beat >= 374 && variables.brokenScreenSong2) {
				variables.brokenScreenSong2 = false
				state.playSong('Sounds/LateNightCityTale/glassBreak2.ogg')
			}

			if (beat >= 374 && beat <= 390) {
				state.musicInfo.backgroundImage = state.musicInfo.defaultBackgroundImage

				state.musicInfo.popups.LNCTBrokenScreenFilter = {
					image: `imgs/LateNightCityTale/brokenScreen/brokenScreen.png`,
					frame: variables.brokenScreenFrame,
					animationDir: 'frames',
					x: 0,
					y: 0,
					width: state.canvas.width,
					height: state.canvas.height
				}

				if (variables.brokenScreenFrame <= 20) variables.brokenScreenFrame += 1
				else delete state.musicInfo.popups.LNCTBrokenScreenFilter
			}

			variables.oldBeat = beat
			variables.oldCurrentTime = currentTime
            break
    }
}