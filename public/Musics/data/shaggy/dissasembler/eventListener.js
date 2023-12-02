export default async (type, { noteClickAuthor, note, click, listenerState, difficulty, events }, state) => {
    switch (type) {
		case 'loaded':
			let options = JSON.parse(JSON.stringify(state.selectSettingsOption.settingsOptions))
			let defaultResizeNote = Number(JSON.stringify(state.resizeNote))

			state.musicInfo.variables = {
				currentTime: 0,
				oldStep: 0,
				MiddleScroll: options.find((g) => g.id == 'MiddleScroll').content,
				SpaceBetweenArrows: options.find((g) => g.id == 'SpaceBetweenArrows').content,
				defaultResizeNote,
			}

			if (difficulty.id == 2 || difficulty.id == 1) {
				state.musicInfo.notesImageDir = 'Arrows/Arrows-26K/'
				state.resizeNote = 0.85
				state.resizeNoteOpponentInMiddleScroll = 0.70

				for (let i = 0;i < 7;i++) {
					let arrowFrameID = i
					if (i == 0) arrowFrameID = 3
					if (i == 1) arrowFrameID = 5
					if (i == 2) arrowFrameID = 6
					if (i == 3) arrowFrameID = 7
					if (i == 4) arrowFrameID = 19
					if (i == 5) arrowFrameID = 4
					if (i == 6) arrowFrameID = 22

					state.arrowsInfo[i] = {
						arrowID: i,
						arrowFrameID,
						splashFrameID: 0,
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
						arrowFrameID,
						splashFrameID: 0,
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
			}
			break
        case 'started':
			state.animations['dissasemblerScreenRotation'] = {
                frame: 0,
                startFrame: 0,
                endFrame: 50,
                totalDalay: 10,
                dalay: 0,
                boomerang: true,
                boomerangForward: false
            }
			break
		case 'end':
			state.resizeNote = state.musicInfo.variables.defaultResizeNote
			state.selectSettingsOption.settingsOptions.find((g) => g.id == 'MiddleScroll').content = state.musicInfo.variables.MiddleScroll
			state.selectSettingsOption.settingsOptions.find((g) => g.id == 'SpaceBetweenArrows').content = state.musicInfo.variables.SpaceBetweenArrows
			break
		case 'gameLoop':
			var variables = state.musicInfo.variables
			let beat = state.musicBeat
			let currentTime = state.music?.currentTime

			if (state.screenZoom < 10 && state.camZooming) {
				if (variables.oladBeat != beat && beat%4 == 0) state.screenZoom = 10
			} else if (state.screenZoom <= 0) {
				state.screenZoom = 0
				state.camZooming = true
			} else {
				state.camZooming = false
				state.screenZoom -= 1
			}


			try {
				if (beat >= 327 && beat <= 424 || beat >= 552 && beat <= 616) state.screenRotation = (state.animations.dissasemblerScreenRotation.frame/15)-(25/15)
				if ((beat >= 424 && beat <= 430 || beat >= 616 && beat <= 626) && state.screenRotation != 0) state.screenRotation = state.screenRotation < 0 ? (state.screenRotation.toFixed(1))+0.1 : (state.screenRotation.toFixed(1))-0.1
				if ((beat >= 430 && beat <= 435 || beat >= 626) && state.screenRotation != 0) state.screenRotation = 0
			} catch {}

			variables.currentTime = currentTime
			variables.oldBeat = beat
            break
    }
}