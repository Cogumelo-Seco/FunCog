export default async (type, { noteClickAuthor, note, notes, listenerState, difficulty, events }, state) => {
	const hurtFunction = (hurt) => {
		state.musicInfo.variables.hurtLevel += 1

		state.musicInfo.popupsBackground.broken = {
			image: `imgs/LateNightCityTale/Broken.png`,
			x: 0,
			y: 0,
			width: state.canvas.width,
			height: state.canvas.height,
			alpha: 0.5
		}

		if (state.musicInfo.variables.hurtLevel >= 2) {
			state.musicInfo.health = -100
		}
	}

    switch (type) {
		case 'noteClick':
			if (noteClickAuthor == 'player' && note?.type == 'LNCTRed')
				state.playSong('Sounds/LateNightCityTale/heal.ogg', { newSong: true })
			break
		case 'passedNote':
			if (note?.type == 'LNCTRed') {
				state.playSong('Sounds/LateNightCityTale/broken.ogg', { newSong: true })
				hurtFunction(true)
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
				noteAlpha: 1,
				addAlpha: false,
				pauseAlpha: false
			}
			break
		case 'gameLoop':
			let variables = state.musicInfo.variables

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
			break
    }
}