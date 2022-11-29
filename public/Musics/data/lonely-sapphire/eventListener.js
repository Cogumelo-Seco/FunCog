export default async (type, { noteClickAuthor, note, notes, listenerState, difficulty, events }, state) => {
    switch (type) {
		case 'loaded':
			for (let i in state.arrowsInfoOpponent) {
				state.arrowsInfoOpponent[i].alpha = 0
				state.arrowsInfoOpponent[i].noteAlpha = 0
			}

			for (let i in state.arrowsInfo) {
				state.arrowsInfo[i].shadowBlur = 15
				state.arrowsInfo[i].noteShadowBlur = 15
				
				state.arrowsInfo[i].shadowColor = '#d20ef1'
				state.arrowsInfo[i].noteShadowColor = '#d20ef1'
			}

			state.musicInfo.variables = {
				noteAlpha: 1,
				addAlpha: true,
				pauseAlpha: false,
				MiddleScroll: state.selectSettingsOption.settingsOptions.find((g) => g.id == 'MiddleScroll').content
			}

			state.selectSettingsOption.settingsOptions.find((g) => g.id == 'MiddleScroll').content = true
			break
        case 'started':
			break
		case 'end':
			state.selectSettingsOption.settingsOptions.find((g) => g.id == 'MiddleScroll').content = state.musicInfo.variables.MiddleScroll
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
				}
			}

			if (state.music?.duration <= state.music?.currentTime || state.gameStage != 'game') {
				clearInterval(loop)
				state.screenZoom = 0
			}
            break
    }
}