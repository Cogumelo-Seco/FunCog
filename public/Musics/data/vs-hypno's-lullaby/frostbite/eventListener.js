export default async (type, { noteClickAuthor, note, click, listenerState, difficulty, events }, state) => {
    switch (type) {
		case 'noteClick':
			break
		case 'loaded':
			state.countdown = 0
			break
        case 'started':
			state.animations['Typhlosion'] = {
                frame: 0,
                startFrame: 0,
                endFrame: 13,
                totalDalay: 0,
                dalay: 0,
				loop: true
            }

			state.musicInfo.variables = {
				oldBeat: 0,
				oldStep: 0,
				oldCurrentTime: 0,
				freezingLevel: 0,
				freezingLevelMax: 200,
				pokemonUse: 0,
				pokemonUseMax: 20,
				keys: {}
			}
			break
		case 'end':
			break
		case 'gameLoop':
			var variables = state.musicInfo.variables

			let botPlay = state.smallFunctions.getConfig('botPlay')
			let beat = state.musicBeat
			let step = state.musicStep
			let currentTime = state.music?.currentTime

			if (state.screenZoom < 10 && state.camZooming) {
				if (variables.oldBeat != beat && beat%4 == 0 && step < 1220) state.screenZoom = step > 700 ? 40 : 10
			} else if (state.screenZoom <= 0) {
				state.screenZoom = 0
				state.camZooming = true
			} else {
				state.camZooming = false
				state.screenZoom -= step > 700 ? 4 : 1
			}

			if (state.musicInfo.difficulty.id != 3) {
				let key = listenerState.keys['Space']
				if (key && !key.clicked && variables.keys[key.code]) variables.keys[key.code] = false
				if (
					key && key.clicked && !variables.keys[key.code] && variables.pokemonUse < variables.pokemonUseMax && !botPlay ||
					botPlay && variables.freezingLevel/variables.freezingLevelMax >= 0.80
				) {
					variables.pokemonUse += 1
					variables.freezingLevel -= variables.freezingLevelMax/3
					if (key) variables.keys[key.code] = true
				}

				variables.freezingLevel += 0.22

				if (variables.freezingLevel >= variables.freezingLevelMax) state.musicInfo.health = -100
				variables.freezingLevel = variables.freezingLevel <= 0 ? 0 : variables.freezingLevel >= variables.freezingLevelMax ? variables.freezingLevelMax : variables.freezingLevel
			}

			variables.oldBeat = beat
			variables.oldStep = step
			variables.oldCurrentTime = currentTime
            break
		case 'gameLoopFullFPS':
			var variables = state.musicInfo.variables

			let canvas = state.canvas
			let ctx = canvas.getContext('2d')

			let ThermostatData = state.images['imgs/VSLullaby/Thermostat.png']
			let TyphlosionVitData = state.images['imgs/VSLullaby/TyphlosionVit.png']
			if (ThermostatData && TyphlosionVitData && state.musicInfo.difficulty.id != 3) {
				let percent = variables.freezingLevel/variables.freezingLevelMax

				let TyphlosionVitImage = TyphlosionVitData.image
				let TyphlosionVitImagePos = TyphlosionVitData.animationConfig[`Typh-${Number.parseInt(variables.pokemonUse/variables.pokemonUseMax*4)+1}`][state.animations['Typhlosion']?.frame]

				let ThermostatImage = ThermostatData.image
				let ThermostatImagePos = ThermostatData.animationConfig.frames[Number.parseInt(percent*3) >= ThermostatData.animationConfig.frames.length-1 ? ThermostatData.animationConfig.frames.length-1 : Number.parseInt(percent*3)]
				
				if (ThermostatImage && TyphlosionVitImage) {
					let width = ThermostatImagePos.width
					let height = ThermostatImagePos.height
					let X = state.smallFunctions.getConfig('MiddleScroll') ? 5 : canvas.width-width-5
					let Y = canvas.height/2-height/2

					let progressWidth = 15
					let progressHeight = height-75

					ctx.fillStyle = '#2b4964'
					ctx.fillRect(X+width/2-progressWidth/2, Y+15, progressWidth, progressHeight)
					ctx.fillStyle = '#bbdafc'
					ctx.fillRect(X+width/2-progressWidth/2, (Y+15+(progressHeight-progressHeight*percent)), progressWidth, progressHeight*percent)

					ctx.drawImage(TyphlosionVitImage, TyphlosionVitImagePos.x, TyphlosionVitImagePos.y, TyphlosionVitImagePos.width, TyphlosionVitImagePos.height, X+width/2-TyphlosionVitImagePos.width/2, Y-TyphlosionVitImagePos.height/1.5, TyphlosionVitImagePos.width, TyphlosionVitImagePos.height)
					ctx.drawImage(ThermostatImage, ThermostatImagePos.x, ThermostatImagePos.y, ThermostatImagePos.width, ThermostatImagePos.height, X, Y, width, height)
				}
			}
			break
    }
}