export default async (type, { noteClickAuthor, note, notes, listenerState, difficulty, events }, state) => {
    switch (type) {
		case 'loaded':
			let options = JSON.parse(JSON.stringify(state.selectSettingsOption.settingsOptions))

			for (let i in state.arrowsInfoOpponent) {
				state.arrowsInfoOpponent[i].alpha = 0
				state.arrowsInfoOpponent[i].noteAlpha = 0
			}

			state.musicInfo.variables = {
				oldCurrentTime: 0,
				MiddleScroll: options.find((g) => g.id == 'MiddleScroll').content
			}

			state.selectSettingsOption.settingsOptions.find((g) => g.id == 'MiddleScroll').content = true
			break
		case 'end':
			state.selectSettingsOption.settingsOptions.find((g) => g.id == 'MiddleScroll').content = state.musicInfo.variables.MiddleScroll
			break
		case 'gameLoop':
			let variables = state.musicInfo.variables
			let currentTime = state.music?.currentTime

			if (currentTime >= 81 && variables.oldCurrentTime <= 81 || currentTime >= 139.5 && variables.oldCurrentTime <= 139.5) {
				let current = 0
				let interval = setInterval(() => {
					if (current >= 15) {
						state.screenXMovement = 0
						state.screenYMovement = 0
						clearInterval(interval)
					} else {
						current += 1
						state.screenXMovement = Number.parseInt(Math.random()*100)-50
						state.screenYMovement = Number.parseInt(Math.random()*100)-50
					}
				}, 1000/50)
			}

			variables.oldCurrentTime = currentTime
            break
    }
}