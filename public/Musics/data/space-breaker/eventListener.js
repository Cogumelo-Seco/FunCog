export default async (type, { noteClickAuthor, note, click, listenerState, difficulty, events }, state) => {
    switch (type) {
		case 'noteClick':
			break
		case 'loaded':
			let options = JSON.parse(JSON.stringify(state.selectSettingsOption.settingsOptions))
			let defaultResizeNote = Number(JSON.stringify(state.resizeNote))

			state.musicInfo.variables = {
				oldStep: 0,
				MiddleScroll: options.find((g) => g.id == 'MiddleScroll').content,
				SpaceBetweenArrows: options.find((g) => g.id == 'SpaceBetweenArrows').content,
				botPlay: options.find((g) => g.id == 'botPlay').content,
				defaultResizeNote,
			}

			state.musicInfo.notesImageDir = 'Arrows/Arrows-26K/'
			state.resizeNote = 0.7
			state.selectSettingsOption.settingsOptions.find((g) => g.id == 'SpaceBetweenArrows').content = 0
			state.selectSettingsOption.settingsOptions.find((g) => g.id == 'MiddleScroll').content = false
			state.selectSettingsOption.settingsOptions.find((g) => g.id == 'botPlay').content = true

			state.customBongPosition = {
				X: NaN,
				Y: NaN
			}

			for (let i = 4;i < 18;i++) {
				state.arrowsInfo[i] = {
					arrowID: i,
					arrowFrameID: i,
					pos: i,
					defaultPos: i,
					imageDir: null,
					X: 0,
					Y: 0,
					defaultX: 0,
					defaultY: 0,
					fitX: 0,
					fitY: 0,
					resetEnable: true,
					alpha: 1,
					noteAlpha: 1,
					splashAlpha: 1,
					rotation: 0
				}

				state.arrowsInfoOpponent[i] = {
					arrowID: i,
					arrowFrameID: i,
					pos: i,
					defaultPos: i,
					imageDir: null,
					X: 0,
					Y: 0,
					defaultX: 0,
					defaultY: 0,
					fitX: 0,
					fitY: 0,
					resetEnable: true,
					alpha: 1,
					noteAlpha: 1,
					splashAlpha: 1,
					rotation: 0
				}
			}
			break
        case 'started':
			break
		case 'end':
			state.resizeNote = state.musicInfo.variables.defaultResizeNote
			state.selectSettingsOption.settingsOptions.find((g) => g.id == 'MiddleScroll').content = state.musicInfo.variables.MiddleScroll
			state.selectSettingsOption.settingsOptions.find((g) => g.id == 'SpaceBetweenArrows').content = state.musicInfo.variables.SpaceBetweenArrows
			state.selectSettingsOption.settingsOptions.find((g) => g.id == 'botPlay').content = state.musicInfo.variables.botPlay
			break
		case 'gameLoop':
			var variables = state.musicInfo.variables

			let beat = state.musicBeat

			if (state.screenZoom < 10 && state.camZooming) {
				if (variables.oladBeat != beat && beat%4 == 0) state.screenZoom = 10
			} else if (state.screenZoom <= 0) {
				state.screenZoom = 0
				state.camZooming = true
			} else {
				state.camZooming = false
				state.screenZoom -= 1
			}

			variables.oldBeat = beat
            break
    }
}