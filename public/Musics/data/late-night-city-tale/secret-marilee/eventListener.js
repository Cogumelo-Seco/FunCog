export default async (type, { noteClickAuthor, note, notes, listenerState, difficulty, events }, state) => {
	const hurtFunction = (hurt) => {
		state.musicInfo.variables.hurtLevel += hurt ? 1 : -1
		if (state.musicInfo.variables.hurtLevel <= 0) state.musicInfo.variables.hurtLevel = 0

		state.musicInfo.popups.sonicEXEHitStatic = {
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
				
				state.arrowsInfo[i].shadowColor = '#d20ef1'
				state.arrowsInfo[i].noteShadowColor = '#d20ef1'
				state.arrowsInfoOpponent[i].shadowColor = '#d20ef1'
				state.arrowsInfoOpponent[i].noteShadowColor = '#d20ef1'
			}
			break
        case 'started':
			state.musicInfo.variables = {
				hurtLevel: 0,
				oldCurrentTime: 0,
				screenFilterAlpha: 0,
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

			/*if (state.screenZoom < 10 && state.camZooming) {
				if (beat%4 == 0) state.screenZoom = 10
			} else if (state.screenZoom <= 0) {
				state.screenZoom = 0
				state.camZooming = true
			} else {
				state.camZooming = false
				state.screenZoom -= 0.5
			}*/

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

			if (beat >= 96 && variables.oldBeat <= 96) {
				variables.screenFilterAlpha = 1
				for (let i in state.arrowsInfo) {
					state.arrowsInfo[i].shadowColor = '#02f7ff'
					state.arrowsInfo[i].noteShadowColor = '#02f7ff'
					state.arrowsInfoOpponent[i].shadowColor = '#02f7ff'
					state.arrowsInfoOpponent[i].noteShadowColor = '#02f7ff'
				}
			}

			if (beat >= 352 && variables.oldBeat <= 352) {
				variables.screenFilterAlpha = 1
				for (let i in state.arrowsInfo) {
					state.arrowsInfo[i].shadowColor = '#d20ef1'
					state.arrowsInfo[i].noteShadowColor = '#d20ef1'
					state.arrowsInfoOpponent[i].shadowColor = '#d20ef1'
					state.arrowsInfoOpponent[i].noteShadowColor = '#d20ef1'
				}
			}

			state.musicInfo.popups.LNCTPurpleFilter = {
				image: `imgs/LateNightCityTale/purple-filter.png`,
				x: 0,
				y: 0,
				width: state.canvas.width,
				height: state.canvas.height,
				alpha: variables.screenFilterAlpha
			}

			variables.screenFilterAlpha = variables.screenFilterAlpha-(variables.screenFilterAlpha/15) <= 0 ? 0 : variables.screenFilterAlpha-(variables.screenFilterAlpha/15)

			variables.oldBeat = beat
			variables.oldCurrentTime = currentTime
            break
    }
}