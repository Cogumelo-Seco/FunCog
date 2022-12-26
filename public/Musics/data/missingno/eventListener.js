export default async (type, { noteClickAuthor, note, click, listenerState, difficulty, events }, state) => {
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
			console.log(events)
			for (let i in events) {
                let event = events[i]

                if (variables.oldCurrentTime*1000 <= event[0] && currentTime*1000 >= event[0]) {
					if (event[2] == 'Missingno' && state.musicInfo.difficulty.name != 'Mania') {
						let downScrool = Math.floor(Math.random()*100) > 50 ? true : false
						state.selectSettingsOption.settingsOptions.find((g) => g.id == 'DownScroll').content = downScrool
						let arrowSize = state.arrowsInfo[0]?.height
						let width = state.canvas.width
						let height = state.canvas.height

						for (let i in state.arrowsInfo) {
							state.arrowsInfo[i].resetEnable = false
							state.arrowsInfo[i].rotation = Math.floor(Math.random()*360)

							if (i == 0) {
								state.arrowsInfo[i].Y = (arrowSize/2)+Math.floor(Math.random()*(height*0.5))+(downScrool ? height*0.5-(arrowSize) : 0)
								state.arrowsInfo[i].X = Math.floor(Math.random()*(width*0.24))
							}
							if (i == 1) {
								state.arrowsInfo[i].Y = (arrowSize/2)+Math.floor(Math.random()*(height*0.5))+(downScrool ? height*0.5-(arrowSize) : 0)
								state.arrowsInfo[i].X = width/2-Math.floor(Math.random()*(width*0.24))
							}
							if (i == 2) {
								state.arrowsInfo[i].Y = (arrowSize/2)+Math.floor(Math.random()*(height*0.5))+(downScrool ? height*0.5-(arrowSize) : 0)
								state.arrowsInfo[i].X = width/2+Math.floor(Math.random()*(width*0.24))
							}
							if (i == 3) {
								state.arrowsInfo[i].Y = (arrowSize/2)+Math.floor(Math.random()*(height*0.5))+(downScrool ? height*0.5-(arrowSize) : 0)
								state.arrowsInfo[i].X = width-Math.floor(Math.random()*(width*0.24))-arrowSize
							}
						}
			
						for (let i in state.arrowsInfoOpponent) {
							state.arrowsInfoOpponent[i].alpha = 0
							state.arrowsInfoOpponent[i].noteAlpha = 0
							state.arrowsInfoOpponent[i].resetEnable = false
							state.arrowsInfoOpponent[i].X = -500
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