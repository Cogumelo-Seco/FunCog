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

				state.arrowsInfo[i].shadowColor = '#d20ef1'
				state.arrowsInfo[i].noteShadowColor = '#d20ef1'
			}
			break
        case 'started':
			state.musicInfo.variables = {
				hurtLevel: 0,
				oldCurrentTime: 0,
				noteAlpha: 1,
				addAlpha: true,
				pauseAlpha: false
			}
			break
		case 'gameLoop':
			let variables = state.musicInfo.variables
			let currentTime = state.music?.currentTime

			if (variables.addAlpha) {
				if (variables.noteAlpha < 1) variables.noteAlpha += 0.002
				if (variables.noteAlpha >= 1) variables.addAlpha = false
			} else if (!variables.pauseAlpha) {
				if (variables.noteAlpha > 0.7) variables.noteAlpha -= 0.002
				if (variables.noteAlpha <= 0.7) variables.addAlpha = true
			}

			for (let i in state.arrowsInfo) {
				if (currentTime <= 85 && variables.oldCurrentTime >= 76) {
					if (state.arrowsInfo[i].shadowBlur > 0) state.arrowsInfo[i].shadowBlur -= 0.15
					if (state.arrowsInfo[i].noteShadowBlur > 0) state.arrowsInfo[i].noteShadowBlur -= 0.15
					if (state.arrowsInfoOpponent[i].shadowBlur > 0) state.arrowsInfoOpponent[i].shadowBlur -= 0.15
					if (state.arrowsInfoOpponent[i].noteShadowBlur > 0) state.arrowsInfoOpponent[i].noteShadowBlur -= 0.15
					
					if (state.arrowsInfo[i].alpha < 1) state.arrowsInfo[i].alpha += 0.1
					if (state.arrowsInfo[i].noteAlpha < 1) state.arrowsInfo[i].noteAlpha += 0.1
					if (state.arrowsInfoOpponent[i].alpha < 1) state.arrowsInfoOpponent[i].alpha += 0.1
					if (state.arrowsInfoOpponent[i].noteAlpha < 1) state.arrowsInfoOpponent[i].noteAlpha += 0.1

					variables.pauseAlpha = true
				} else if (currentTime >= 88 && variables.oldCurrentTime <= 95) {
					variables.pauseAlpha = false

					if (state.arrowsInfo[i].shadowBlur < 15) state.arrowsInfo[i].shadowBlur += 0.1
					if (state.arrowsInfo[i].noteShadowBlur < 15) state.arrowsInfo[i].noteShadowBlur += 0.1
					if (state.arrowsInfoOpponent[i].shadowBlur < 15) state.arrowsInfoOpponent[i].shadowBlur += 0.1
					if (state.arrowsInfoOpponent[i].noteShadowBlur < 15) state.arrowsInfoOpponent[i].noteShadowBlur += 0.1
				}

				if (!variables.pauseAlpha) {
					state.arrowsInfo[i].shadowColor = currentTime <= 80 ? '#d20ef1' : '#02f7ff'
					state.arrowsInfo[i].noteShadowColor = currentTime <= 80 ? '#d20ef1' : '#02f7ff'
					state.arrowsInfo[i].alpha = variables.noteAlpha
					state.arrowsInfo[i].noteAlpha = variables.noteAlpha

					state.arrowsInfoOpponent[i].shadowColor = currentTime <= 80 ? '#d20ef1' : '#02f7ff'
					state.arrowsInfoOpponent[i].noteShadowColor = currentTime <= 80 ? '#d20ef1' : '#02f7ff'
					state.arrowsInfoOpponent[i].alpha = variables.noteAlpha
					state.arrowsInfoOpponent[i].noteAlpha = variables.noteAlpha
				}
			}

			variables.oldCurrentTime = currentTime
			break
    }
}