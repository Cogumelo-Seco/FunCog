export default async (type, { noteClickAuthor, note, click, listenerState, difficulty, events }, state) => {
    switch (type) {
		case 'noteClick':
			break
		case 'loaded':
			for (let i in state.arrowsInfoOpponent) {
				state.arrowsInfoOpponent[i].alpha = 0
				state.arrowsInfoOpponent[i].noteAlpha = 0
				state.arrowsInfoOpponent[i].splashAlpha = 0
			}
			break
        case 'started':
			state.animations['Pendelum'] = {
                frame: 0,
                startFrame: 0,
                endFrame: 20,
				angle: 55,
                totalDalay: 0,
                dalay: 0,
				boomerang: true,
				boomerangForward: true
            }

			state.animations['StaticHypno'] = {
                frame: 0,
                startFrame: 0,
                endFrame: 2,
                totalDalay: 0,
                dalay: 0,
				loop: true
            }

			state.musicInfo.variables = {
				oldBeat: 0,
				oldStep: 0,
				oldCurrentTime: 0,
				pendelumTime: +new Date()+4000,
				hypnotizationLevel: 0,
				hypnotizationLevelMax: 200,
				keys: {}
			}
			break
		case 'end':
			state.sounds['Sounds/Lullaby/Psyshock.ogg'].pause()
			state.sounds['Sounds/Lullaby/TranceStatic.ogg'].pause()
			break
		case 'gameLoop':
			var variables = state.musicInfo.variables

			let botPlay = state.smallFunctions.getConfig('botPlay')
			let beat = state.musicBeat
			let step = state.musicStep
			let currentTime = state.music?.currentTime

			if (state.screenZoom < 10 && state.camZooming) {
				if (variables.oldBeat != beat && beat%4 == 0) state.screenZoom = 10
			} else if (state.screenZoom <= 0) {
				state.screenZoom = 0
				state.camZooming = true
			} else {
				state.camZooming = false
				state.screenZoom -= 1
			}

			if (step >= 316 && variables.oldBeat <= 316) {
				for (let i in state.arrowsInfoOpponent) {
					state.arrowsInfoOpponent[i].alpha = 1
					state.arrowsInfoOpponent[i].noteAlpha = 1
					state.arrowsInfoOpponent[i].splashAlpha = 1
				}
			}

			if (state.musicInfo.difficulty.id != 3 && step >= 316) {
				let pendelumAnimation = state.animations['Pendelum']
				let pendelumImageData = state.images['imgs/VSLullaby/Pendelum.png']

				if (state.musicInfo.popupsBackground['PendelumGhost']) 
					state.musicInfo.popupsBackground['PendelumGhost'].alpha = state.musicInfo.popupsBackground['PendelumGhost'].alpha-0.1 <= 0 ? 0 : state.musicInfo.popupsBackground['PendelumGhost'].alpha-0.1

				let key = listenerState.keys['Space']
				if (key && !key.clicked && variables.keys[key.code]) variables.keys[key.code] = false
				if (key && key.clicked && !variables.keys[key.code]) {
					if (pendelumAnimation && pendelumAnimation.frame >= pendelumAnimation.endFrame/3 && pendelumAnimation.frame <= pendelumAnimation.endFrame-pendelumAnimation.endFrame/3) {
						variables.hypnotizationLevel -= variables.hypnotizationLevelMax*0.12
						variables.pendelumTime = +new Date()
						variables.keys[key.code] = true

						if (pendelumImageData && pendelumImageData.image?.width) {
							let endFrame = pendelumAnimation.endFrame*1.5
							let frame = pendelumAnimation.frame*1.5
			
							state.musicInfo.popupsBackground['PendelumGhost'].alpha = 1
							state.musicInfo.popupsBackground['PendelumGhost'].rotation = -(endFrame/2-endFrame+frame)
						}
					} else if (!botPlay) {
						variables.pendelumTime = +new Date()+2000
						variables.hypnotizationLevel += variables.hypnotizationLevelMax*0.05
					}
				}

				if (step >= 300 && variables.oldStep != step && (step%65 == 0 || variables.oldStep%65 == 0)) {
					if (state.sounds['Sounds/Lullaby/Psyshock.ogg']?.paused && variables.hypnotizationLevel <= variables.hypnotizationLevelMax*0.2) {
						state.sounds['Sounds/Lullaby/Psyshock.ogg'].volume = 1
						state.sounds['Sounds/Lullaby/Psyshock.ogg'].play()

						variables.hypnotizationLevel += variables.hypnotizationLevelMax*0.35
					}
				}
				
				if (!botPlay && variables.pendelumTime+1000 <= +new Date()) {
					variables.hypnotizationLevel += 0.5
				}
				if (botPlay) {
					variables.hypnotizationLevel -= variables.hypnotizationLevelMax*0.02
				}

				if (pendelumAnimation && pendelumImageData && pendelumImageData.image?.width) {
					let endFrame = pendelumAnimation.endFrame*(pendelumAnimation.angle/pendelumAnimation.endFrame)
					let frame = pendelumAnimation.frame*(pendelumAnimation.angle/pendelumAnimation.endFrame)

					if (!state.musicInfo.popupsBackground['PendelumGhost']) state.musicInfo.popupsBackground['PendelumGhost'] = {
						image: `imgs/VSLullaby/Pendelum.png`,
						x: state.canvas.width/2-pendelumImageData.image.width/2,
						y: -(pendelumImageData.image.height/2),
						rotation: -(endFrame/2-endFrame+frame),
						alpha: 0
					}

					state.musicInfo.popupsBackground['Pendelum'] = {
						image: `imgs/VSLullaby/Pendelum.png`,
						x: state.canvas.width/2-pendelumImageData.image.width/2,
						y: -(pendelumImageData.image.height/2),
						rotation: -(endFrame/2-endFrame+frame)
					}
				}

				if (variables.hypnotizationLevel >= variables.hypnotizationLevelMax) state.musicInfo.health = -100
				variables.hypnotizationLevel = variables.hypnotizationLevel <= 0 ? 0 : variables.hypnotizationLevel >= variables.hypnotizationLevelMax ? variables.hypnotizationLevelMax : variables.hypnotizationLevel
			}

			variables.oldBeat = beat
			variables.oldStep = step
			variables.oldCurrentTime = currentTime
            break
		case 'gameLoopFullFPS':
			var variables = state.musicInfo.variables

			let canvas = state.canvas
			let ctx = canvas.getContext('2d')

			let soundTranceStatic = state.sounds['Sounds/Lullaby/TranceStatic.ogg']
			if (variables.hypnotizationLevel/variables.hypnotizationLevelMax >= 0) {
				soundTranceStatic.volume = variables.hypnotizationLevel/variables.hypnotizationLevelMax
				if (soundTranceStatic.currentTime >= soundTranceStatic.duration-1) soundTranceStatic.currentTime = 0
				if (soundTranceStatic?.paused) state.sounds['Sounds/Lullaby/TranceStatic.ogg'].play()
			}


			let StaticHypnoData = state.images['imgs/VSLullaby/StaticHypno.png']
			if (StaticHypnoData) {
				ctx.globalAlpha = variables.hypnotizationLevel/variables.hypnotizationLevelMax

				let image = StaticHypnoData.image
				let imagePos = StaticHypnoData.animationConfig.frames[state.animations['StaticHypno']?.frame]
				
				if (image && imagePos) ctx.drawImage(image, imagePos.x, imagePos.y, imagePos.width, imagePos.height, 0, 0, canvas.width, canvas.height)

				ctx.globalAlpha = 1
			}
			break
    }
}