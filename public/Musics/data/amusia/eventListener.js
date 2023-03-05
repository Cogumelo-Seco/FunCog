export default async (type, { noteClickAuthor, note, notes, listenerState }, state) => {
    switch (type) {
		case 'loaded':
			let options = JSON.parse(JSON.stringify(state.selectSettingsOption.settingsOptions))

			state.musicInfo.variables = {
				MiddleScroll: options.find((g) => g.id == 'MiddleScroll').content,
				arrowsMovementX: 0,
				arrowsMovementXAdd: true,
				IsNoteSpinning: false,
				arrowMoveIntervals: [],
				waveNotes: false
			}

			state.selectSettingsOption.settingsOptions.find((g) => g.id == 'MiddleScroll').content = false
			break
        case 'started':
			break
		case 'end':
			state.invertArrowPos = false
			state.selectSettingsOption.settingsOptions.find((g) => g.id == 'MiddleScroll').content = state.musicInfo.variables.MiddleScroll
			break
		case 'gameLoop':
			let variables = state.musicInfo.variables
			let beat = state.musicBeat
			let currentBeat = state.music.currentTime * (state.musicBPM/60) / 2
			let arrowsInfo = state.arrowsInfo
			let arrowsInfoOpponent = state.arrowsInfoOpponent
			let spinLength = (beat-200)/300 * 15 + 10

			if (beat >= 328 && state.musicInfo.difficulty.name != 'Mania') {
				if (beat != variables.oldBeat && beat%10 == 0) variables.IsNoteSpinning = true

				if (variables.arrowsMovementXAdd) {
					if (variables.arrowsMovementX > 100) variables.arrowsMovementXAdd = false
					else variables.arrowsMovementX += 1.5
				} else {
					if (variables.arrowsMovementX < -100) variables.arrowsMovementXAdd = true
					else variables.arrowsMovementX -= 1.5
				}
			}

			if (variables.IsNoteSpinning) for (let i in arrowsInfo) {
				arrowsInfo[i].rotation += 10
				arrowsInfoOpponent[i].rotation += 10	
				if (arrowsInfo[i].rotation >= 360) {
					arrowsInfo[i].rotation = 0
					arrowsInfoOpponent[i].rotation = 0
					variables.IsNoteSpinning = false
				}
			}

			if (beat >= 200 && !variables.waveNotes && state.musicInfo.difficulty.name != 'Mania') variables.waveNotes = true
			if (beat == 201 && !state.invertArrowPos && state.musicInfo.difficulty.name != 'Mania') {
				variables.IsNoteSpinning = true
				state.invertArrowPos = true

				for (let i in arrowsInfo) {
					arrowMove({ speed: 10, X: arrowsInfoOpponent[i].defaultX, Y: arrowsInfoOpponent[i].defaultY, arrowID: Number(i) })
					arrowMove({ speed: 10, X: arrowsInfo[i].defaultX, Y: arrowsInfo[i].defaultY, arrowID: Number(i), opponent: true })
				}
			}

			function arrowMove({ X, Y, rotation, arrowID, pincer, speed, opponent }) {
				let arrow = state[opponent ? 'arrowsInfoOpponent' : 'arrowsInfo'][arrowID]

				let directionX = X ? X < arrow.musicDefaultX ? '-' : '+' : null
				let directionY = Y ? Y < arrow.musicDefaultY ? '-' : '+' : null
				if (rotation != undefined) arrow.rotation = rotation

				variables.arrowMoveIntervals[arrowID+(opponent ? 'arrowsInfoOpponent' : 'arrowsInfo')] = setInterval(() => {
					let clear = []

					if (Y != undefined && directionY == '-' && Y < arrow.musicDefaultY || Y != undefined && directionY == '+' && Y > arrow.musicDefaultY) {
						arrow.musicDefaultY += directionY == '-' ? -(speed) || -7 : speed || 7
						clear.push(false)
					} else if (Y != undefined) clear.push(true)

					if (X != undefined && directionX == '-' && X < arrow.musicDefaultX || X != undefined && directionX == '+' && X > arrow.musicDefaultX) {
						arrow.musicDefaultX += directionX == '-' ? -(speed) || -7 : speed || 7
						clear.push(false)
					} else if (X != undefined) clear.push(true)

					if (!clear.includes(false)) {
						clearInterval(variables.arrowMoveIntervals[arrowID+(opponent ? 'arrowsInfoOpponent' : 'arrowsInfo')])
					}
				}, 1000/40)
			}


			if (state.music?.currentTime >= 168) {
				for (let i in arrowsInfo) {
					if (arrowsInfo[i].alpha-0.01 <= 0) {
						arrowsInfo[i].alpha = 0
						arrowsInfoOpponent[i].alpha = 0
						state.alphaHUD = 0
						state.musicInfo.popupsBackground.amusia.alpha = 1
					} else {
						arrowsInfo[i].alpha -= 0.01
						arrowsInfoOpponent[i].alpha = arrowsInfo[i].alpha
						state.alphaHUD = arrowsInfo[i].alpha

						state.musicInfo.popupsBackground.amusia = {
							image: `backgrounds/amusia.png`,
							x: 0,
							y: 0,
							width: state.canvas.width,
							height: state.canvas.height,
							alpha: 1-arrowsInfo[i].alpha
						}
					}
				}
			}
			
			if (variables.waveNotes) {
				for (let i in arrowsInfo) {
					let arrowValue = Number(i)+1
					if (arrowsInfo[i].musicDefaultX == undefined) {
						arrowsInfo[i].musicDefaultX = arrowsInfo[i].defaultX
						arrowsInfo[i].musicDefaultY = arrowsInfo[i].defaultY
					}

					arrowsInfo[i].resetEnable = false
					if (!variables.IsNoteSpinning) arrowsInfo[i].rotation = (spinLength / 3) * -Math.sin((currentBeat + arrowValue*0.25) * Math.PI)
					arrowsInfo[i].noteRotation = arrowsInfo[i].rotation
					arrowsInfo[i].X = variables.arrowsMovementX+arrowsInfo[i].musicDefaultX //+ spinLength * Math.sin((currentBeat + arrowValue*0.25) * Math.PI)
					arrowsInfo[i].Y = arrowsInfo[i].musicDefaultY + spinLength * Math.cos((currentBeat + arrowValue*0.25) * Math.PI)
				}

				for (let i in arrowsInfoOpponent) {
					let arrowValue = Number(i)+1
					if (arrowsInfoOpponent[i].musicDefaultX == undefined) {
						arrowsInfoOpponent[i].musicDefaultX = arrowsInfoOpponent[i].defaultX
						arrowsInfoOpponent[i].musicDefaultY = arrowsInfoOpponent[i].defaultY
					}

					arrowsInfoOpponent[i].resetEnable = false
					if (!variables.IsNoteSpinning) arrowsInfoOpponent[i].rotation = (spinLength / 3) * -Math.sin((currentBeat + arrowValue*0.25) * Math.PI)
					arrowsInfoOpponent[i].noteRotation = arrowsInfoOpponent[i].rotation
					arrowsInfoOpponent[i].X = variables.arrowsMovementX+arrowsInfoOpponent[i].musicDefaultX //+ spinLength * Math.sin((currentBeat + arrowValue*0.25) * Math.PI)
					arrowsInfoOpponent[i].Y = arrowsInfoOpponent[i].musicDefaultY + spinLength * Math.cos((currentBeat + arrowValue*0.25) * Math.PI)
				}
			}

			variables.oldBeat = beat
            break
    }
}