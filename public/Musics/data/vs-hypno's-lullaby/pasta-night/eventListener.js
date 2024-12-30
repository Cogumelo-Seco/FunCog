export default async (type, { noteClickAuthor, note, click, listenerState, difficulty, events }, state) => {
    switch (type) {
		case 'noteClick':
			break
		case 'loaded':
			state.customBongPosition = {
				forceScroll: true,
				middleScroll: true
				/*X: NaN,
				Y: NaN*/
			}
			
			for (let i = 4;i <= 7;i++) {
				state.arrowsInfoOpponent[i] = {
					arrowID: i,
					arrowFrameID: i-4,
					pos: i,
					defaultPos: i,
					imageDir: null,//'Arrows/Bronzong/Arrows.png',
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

			for (let i in state.arrowsInfoOpponent) {
				state.arrowsInfoOpponent[i].alpha = 0.5
				state.arrowsInfoOpponent[i].noteAlpha = 0.5
				state.arrowsInfoOpponent[i].splashAlpha = 0.5
			}

			for (let i in state.arrowsInfo) state.arrowsInfo[i].forceScroll = true

			let options = JSON.parse(JSON.stringify(state.selectSettingsOption.settingsOptions))
			state.musicInfo.variables = {
				MiddleScroll: options.find((g) => g.id == 'MiddleScroll').content,
				oldBeat: 0,
				oldStep: 0,
				oldCurrentTime: 0,
				pendelumTime: +new Date()+4000,
				hypnotizationLevel: 0,
				hypnotizationLevelMax: 200,
				keys: {},
				changeScroll: false,
				downScroll: state.selectSettingsOption.settingsOptions.find((g) => g.id == 'DownScroll').content
			}

			state.countdown = 0
			state.selectSettingsOption.settingsOptions.find((g) => g.id == 'MiddleScroll').content = false
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
			break
		case 'end':
			state.sounds['Sounds/Lullaby/Psyshock.ogg'].pause()
			state.sounds['Sounds/Lullaby/TranceStatic.ogg'].pause()
			state.selectSettingsOption.settingsOptions.find((g) => g.id == 'MiddleScroll').content = state.musicInfo.variables.MiddleScroll
			break
		case 'gameLoop':
			var variables = state.musicInfo.variables

			let arrowXOpponent = state.canvas.width/5-(state.arrowsWidthOpponent/2)/2
			let arrowXOpponent2 = state.canvas.width-((state.arrowsWidthOpponent/2)+(state.canvas.width/5-(state.arrowsWidthOpponent/2)/2))
			let arrowYOpponent = state.selectSettingsOption.settingsOptions.find((g) => g.id == 'DownScroll').content ? state.canvas.height-state.arrowsMargin : state.arrowsMargin+20

			for (let i in state.arrowsInfoOpponent) {
				let arrowInfo = state.arrowsInfoOpponent[i]
				let arrowImageData = state.images[arrowInfo.imageDir || `${state.musicInfo.notesImageDir}Arrows.png`]
				let arrowFrames = arrowImageData?.animationConfig[`Arrow-${arrowInfo.arrowFrameID}`]
				let arrowImagePos = arrowFrames[`Arrow-${arrowInfo.arrowFrameID}`]

				let arrowWidth = arrowImagePos?.width

				arrowInfo.resetEnable = false
				arrowInfo.Y = arrowYOpponent
				if (i <= 3) {
					arrowInfo.X = arrowXOpponent
					arrowXOpponent += arrowWidth**state.resizeNoteOpponent+state.smallFunctions.getConfig('SpaceBetweenArrows')**state.resizeNoteOpponent
				} else {
					arrowInfo.X = arrowXOpponent2
					arrowXOpponent2 += arrowWidth**state.resizeNoteOpponent+state.smallFunctions.getConfig('SpaceBetweenArrows')**state.resizeNoteOpponent
				}
			}

			let arrowX = state.canvas.width/2-(state.arrowsWidth/2)
			let arrowY = variables.downScroll ? state.canvas.height-state.arrowsMargin : state.arrowsMargin+20

			for (let i in state.arrowsInfo) {
				let arrowInfo = state.arrowsInfo[i]
				let arrowImageData = state.images[arrowInfo.imageDir || `${state.musicInfo.notesImageDir}Arrows.png`]
				let arrowFrames = arrowImageData?.animationConfig[`Arrow-${arrowInfo.arrowFrameID}`]
				let arrowImagePos = arrowFrames[`Arrow-${arrowInfo.arrowFrameID}`]

				let arrowWidth = arrowImagePos?.width

				arrowInfo.resetEnable = false
				arrowInfo.X = arrowX
				arrowInfo.Y = arrowY
				arrowX += arrowWidth**state.resizeNote+state.smallFunctions.getConfig('SpaceBetweenArrows')**state.resizeNote
			}

			let botPlay = state.smallFunctions.getConfig('botPlay')
			let beat = state.musicBeat
			let step = state.musicStep
			let currentTime = state.music?.currentTime

			//if (variables.oldCurrentTime*1000 <= time && currentTime*1000 >= time) {

			if (state.musicInfo.difficulty.id != 3) for (let event of state.musicInfo.events) {
				if (variables.oldCurrentTime*1000 <= event[0] && currentTime*1000 >= event[0]) {
					variables.changeScroll = true
					state.sounds['Sounds/Lullaby/POW.ogg'].volume = 1
					state.sounds['Sounds/Lullaby/POW.ogg'].play()
				}
			}

			if (variables.changeScroll) {
				variables.changeScroll = false
				variables.downScroll = variables.downScroll ? false : true

				for (let i in state.arrowsInfo) {
					let arrowInfo = state.arrowsInfo[i]

					arrowInfo.gravity.distance = (state.canvas.height-state.arrowsMargin)-state.arrowsMargin
				}
			}

			for (let i in state.arrowsInfo) {
				let arrowInfo = state.arrowsInfo[i]

				if (!arrowInfo.gravity) {
					arrowInfo.gravity = {
						distance: 0,
						v: 0,
						bounce: Number(i)*7+100,
						time: +new Date()
					}
				}

				let a = 3 * (10 ** (-3))
				let getNewDistance = (S0, v, t) => S0 + v*t + 0.5 * (a*t)**2

				let timeGap = Math.min(30, +new Date()-arrowInfo.gravity.time)
				arrowInfo.gravity.time = +new Date()
				arrowInfo.gravity.distance = Math.min(state.canvas.height, Math.max(getNewDistance(arrowInfo.gravity.distance, arrowInfo.gravity.v, timeGap), 0))

				if (arrowInfo.gravity.distance <= 0) {
					arrowInfo.gravity.v = arrowInfo.gravity.v > -0.2 ? 0 : (arrowInfo.gravity.v * -1) * (1-arrowInfo.gravity.bounce/200)
				} else arrowInfo.gravity.v = arrowInfo.gravity.v - (a * timeGap)

				arrowInfo.Y = variables.downScroll ? arrowInfo.Y-arrowInfo.gravity.distance : arrowInfo.Y+arrowInfo.gravity.distance
				arrowInfo.forceScrollDown = arrowInfo.Y <= state.canvas.height/2 ? false : true
			}
			

			if (state.screenZoom < 10 && state.camZooming) {
				if (variables.oldBeat != beat && beat%4 == 0) state.screenZoom = 10
			} else if (state.screenZoom <= 0) {
				state.screenZoom = 0
				state.camZooming = true
			} else {
				state.camZooming = false
				state.screenZoom -= 1
			}

			if (state.musicInfo.difficulty.id != 3 && state.musicInfo.difficulty.name != 'Hard') {
				let pendelumAnimation = state.animations['Pendelum']
				let pendelumImageData = state.images['imgs/VSLullaby/Pendelum.png']

				if (state.musicInfo.popupsBackground['PendelumGhost']) 
					state.musicInfo.popupsBackground['PendelumGhost'].alpha = state.musicInfo.popupsBackground['PendelumGhost'].alpha-0.1 <= 0 ? 0 : state.musicInfo.popupsBackground['PendelumGhost'].alpha-0.1

				let key = listenerState.keys['Space']
				if (key && !key.clicked && variables.keys[key.code]) variables.keys[key.code] = false
				if (key && key.clicked && !variables.keys[key.code] && currentTime <= 185) {
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

				if (currentTime >= 185 && variables.oldCurrentTime <= 185 || step >= 300 && variables.oldStep != step && (step%65 == 0 || variables.oldStep%65 == 0)) {
					if (state.sounds['Sounds/Lullaby/Psyshock.ogg']?.paused && variables.hypnotizationLevel <= variables.hypnotizationLevelMax*0.2) {
						state.sounds['Sounds/Lullaby/Psyshock.ogg'].volume = 1
						state.sounds['Sounds/Lullaby/Psyshock.ogg'].play()

						variables.hypnotizationLevel += currentTime >= 185 ? variables.hypnotizationLevelMax : variables.hypnotizationLevelMax*0.35
					}
				}
				
				if (!botPlay && variables.pendelumTime+1000 <= +new Date()) {
					variables.hypnotizationLevel += 0.5
				}
				if (botPlay && currentTime <= 185) {
					variables.hypnotizationLevel -= variables.hypnotizationLevelMax*0.02
				}

				if (pendelumImageData && pendelumImageData.image?.width && pendelumAnimation) {
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

				if (variables.hypnotizationLevel >= variables.hypnotizationLevelMax && currentTime <= 185) state.musicInfo.health = -100
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