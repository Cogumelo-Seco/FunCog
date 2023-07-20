export default async (type, { noteClickAuthor, note, click, listenerState, difficulty, events }, state) => {
	let resizeNote = state[state.musicInfo.playerId == 2 ? 'resizeNoteOpponent' : 'resizeNote']
	let arrowsInfo = state[state.musicInfo.playerId == 2 ? 'arrowsInfoOpponent' : 'arrowsInfo']
	let arrowsInfoOpponent = state[state.musicInfo.playerId == 2 ? 'arrowsInfo' : 'arrowsInfoOpponent']

    switch (type) {
		case 'loaded':
			let options = JSON.parse(JSON.stringify(state.selectSettingsOption.settingsOptions))
			
			state.musicInfo.variables = {
				oldBeat: 0,
				oldStep: 0,
				oldCurrentTime: 0,
				noteAlpha: 1,
				addAlpha: true,
				pauseAlpha: false,
				ScrollSpeed: options.find((g) => g.id == 'ScrollSpeed').content,
				DownScroll: options.find((g) => g.id == 'DownScroll').content
			}

			//state.selectSettingsOption.settingsOptions.find((g) => g.id == 'ScrollSpeed').content = true
			break
        case 'started':
			break
		case 'end':
			state.selectSettingsOption.settingsOptions.find((g) => g.id == 'ScrollSpeed').content = state.musicInfo.variables.ScrollSpeed
			state.selectSettingsOption.settingsOptions.find((g) => g.id == 'DownScroll').content = state.musicInfo.variables.DownScroll
			break
		case 'gameLoop':
			var variables = state.musicInfo.variables
			let beat = state.musicBeat
			let step = state.musicStep
			let currentTime = state.music?.currentTime

			let events = state.musicInfo.events
			for (let i in events) {
                let event = events[i]

                if (variables.oldCurrentTime*1000 <= event[0] && currentTime*1000 >= event[0]) {
					if (event[2] == 'Missingno' && state.musicInfo.difficulty.name != 'Mania') {
						let downScrool = Math.floor(Math.random()*100) > 50 ? true : false
						state.selectSettingsOption.settingsOptions.find((g) => g.id == 'DownScroll').content = downScrool
						let arrowSize = arrowsInfo[0]?.height**resizeNote
						let width = state.canvas.width
						let height = state.canvas.height

						for (let i in arrowsInfo) {
							arrowsInfo[i].resetEnable = false
							arrowsInfo[i].rotation = Math.floor(Math.random()*360)
							arrowsInfo[i].noteRotation = arrowsInfo[i].rotation
							state.screenFilter = `hue-rotate(${Math.floor(Math.random()*360)}deg)`
							console.log(state.screenFilter)

							if (i == 0) {
								arrowsInfo[i].Y = (arrowSize/2)+Math.floor(Math.random()*(height*0.5))+(downScrool ? height*0.5-(arrowSize) : 0)
								arrowsInfo[i].X = Math.floor(Math.random()*(width*0.24))
							}
							if (i == 1) {
								arrowsInfo[i].Y = (arrowSize/2)+Math.floor(Math.random()*(height*0.5))+(downScrool ? height*0.5-(arrowSize) : 0)
								arrowsInfo[i].X = width/2-Math.floor(Math.random()*(width*0.24))
							}
							if (i == 2) {
								arrowsInfo[i].Y = (arrowSize/2)+Math.floor(Math.random()*(height*0.5))+(downScrool ? height*0.5-(arrowSize) : 0)
								arrowsInfo[i].X = width/2+Math.floor(Math.random()*(width*0.24))
							}
							if (i == 3) {
								arrowsInfo[i].Y = (arrowSize/2)+Math.floor(Math.random()*(height*0.5))+(downScrool ? height*0.5-(arrowSize) : 0)
								arrowsInfo[i].X = width-Math.floor(Math.random()*(width*0.24))-arrowSize
							}

							clearTimeout(variables.bugScreen)
							variables.bugScreen = setTimeout(() => {
								state.screenFilter = ''
							}, 100)
						}
			
						for (let i in arrowsInfoOpponent) {
							arrowsInfoOpponent[i].alpha = 0
							arrowsInfoOpponent[i].noteAlpha = 0
							arrowsInfoOpponent[i].resetEnable = false
							arrowsInfoOpponent[i].X = -500
						}

						let bongoImageData = state.images['BongoCat/BongoCat.png']
						let bongoWidth = bongoImageData.animationConfig.bg.width*0.5
						let bongoHeight = bongoImageData.animationConfig.bg.height*0.5
						state.customBongPosition = {
							X: (bongoWidth/2)+Math.floor(Math.random()*(state.canvas.width-bongoWidth)),
							Y: (bongoHeight/2)+Math.floor(Math.random()*(state.canvas.height-bongoHeight))
						}
					}


					if (event[1] == 'Change Scroll Speed') {
						state.selectSettingsOption.settingsOptions.find((g) => g.id == 'ScrollSpeed').content = Number(event[2])
					}
				}
			}

			variables.oldBeat = beat
			variables.oldStep = step
			variables.oldCurrentTime = currentTime
			break
    }
}