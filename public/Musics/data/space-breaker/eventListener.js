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
				defaultResizeNote,
			}

			if (difficulty.id != 7) {
				state.musicInfo.notesImageDir = 'Arrows/Arrows-26K/'
				state.selectSettingsOption.settingsOptions.find((g) => g.id == 'SpaceBetweenArrows').content = 0
				state.selectSettingsOption.settingsOptions.find((g) => g.id == 'MiddleScroll').content = false
				if (difficulty.id == 6) state.resizeNote = 0.7
				else if (difficulty.id == 5) state.resizeNote = 0.75
				else state.resizeNote = 0.8

				state.customBongPosition = {
					X: NaN,
					Y: NaN
				}

				if (difficulty.id == 6) {
					for (let i = 0;i < 18;i++) {
						let arrowFrameID = i
						if (i == 17) arrowFrameID = 25
						if (i == 16) arrowFrameID = 24
						if (i == 15) arrowFrameID = 23
						if (i == 14) arrowFrameID = 22
						if (i == 13) arrowFrameID = 21
						if (i == 12) arrowFrameID = 20
						if (i == 11) arrowFrameID = 19
						if (i == 9) arrowFrameID = 11

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
				} else if (difficulty.id == 5) {
					for (let i = 0;i < 12;i++) {
						let arrowFrameID = i
						if (i == 11) arrowFrameID = 25
						if (i == 10) arrowFrameID = 24
						if (i == 9) arrowFrameID = 23
						if (i == 8) arrowFrameID = 22
						if (i == 7) arrowFrameID = 21
						if (i == 6) arrowFrameID = 7
						if (i == 5) arrowFrameID = 9

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
				} else {
					for (let i = 0;i < 9;i++) {
						let arrowFrameID = i
						if (i == 0) arrowFrameID = 3
						if (i == 1) arrowFrameID = 4
						if (i == 2) arrowFrameID = 5
						if (i == 3) arrowFrameID = 6
						if (i == 4) arrowFrameID = 7
						if (i == 5) arrowFrameID = 19
						if (i == 6) arrowFrameID = 20
						if (i == 7) arrowFrameID = 21
						if (i == 8) arrowFrameID = 22

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
			}
			break
        case 'started':
			break
		case 'end':
			state.resizeNote = state.musicInfo.variables.defaultResizeNote
			state.selectSettingsOption.settingsOptions.find((g) => g.id == 'MiddleScroll').content = state.musicInfo.variables.MiddleScroll
			state.selectSettingsOption.settingsOptions.find((g) => g.id == 'SpaceBetweenArrows').content = state.musicInfo.variables.SpaceBetweenArrows
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