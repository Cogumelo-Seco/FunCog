export default async (type, { noteClickAuthor, note, notes, listenerState, difficulty, events }, state) => {
    switch (type) {
		case 'loaded':
			let options = JSON.parse(JSON.stringify(state.selectSettingsOption.settingsOptions))

			if (!state.online) for (let i in state.arrowsInfoOpponent) {
				state.arrowsInfoOpponent[i].alpha = 0
				state.arrowsInfoOpponent[i].noteAlpha = 0
			}

			state.musicInfo.variables = {
				oldCurrentTime: 0,
				MiddleScroll: options.find((g) => g.id == 'MiddleScroll').content
			}

			if (!state.online) state.selectSettingsOption.settingsOptions.find((g) => g.id == 'MiddleScroll').content = true
			break
		case 'end':
			state.selectSettingsOption.settingsOptions.find((g) => g.id == 'MiddleScroll').content = state.musicInfo.variables.MiddleScroll
			break
    }
}