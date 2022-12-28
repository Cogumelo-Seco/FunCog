export default async (type, { noteClickAuthor, note, click, listenerState, difficulty, events, hold }, state) => {
    switch (type) {
		case 'noteClick':
			if (state.musicInfo.playerId == 1 && noteClickAuthor == 'player' || state.musicInfo.playerId == 2 && noteClickAuthor == 'opponent') {
				if (state.musicInfo.variables.scenary2) state.musicInfo.variables.animation = 'idle'
				state.musicInfo.variables.dalayToIdle = +new Date()

				let animation = 'idle'
				switch (note.arrowID) {
					case 0:
						if (!hold) state.smallFunctions.moveBackground(-5, 0, 0.4)
						animation = 'left'
						break
					case 1:
						if (!hold) state.smallFunctions.moveBackground(0, 5, 0.4)
						animation = 'down'
						break
					case 2:
						if (!hold) state.smallFunctions.moveBackground(0, -5, 0.4)
						animation = 'up'
						break
					case 3:
						if (!hold) state.smallFunctions.moveBackground(5, 0, 0.4)
						animation = 'right'
						break
				}

				state.musicInfo.variables.animation = animation
			}
			break
		case 'loaded':
			let options = JSON.parse(JSON.stringify(state.selectSettingsOption.settingsOptions))
			
			state.musicInfo.variables = {
				oldBeat: 0,
				oldStep: 0,
				oldCurrentTime: 0,
				animation: 'idle',
				dalayToIdle: 0,
				HUDFade: false,
				HUDFadeOut: false,
				defaultBackgroundOfuscation: state.gameBackgroundOfuscation,
				MiddleScroll: options.find((g) => g.id == 'MiddleScroll').content,
				moveBackgroundInterval: null,
				scenary2: false,
				AlexisAlpha: 0,
				onHeavensGate: false
			}

			state.backgroundInfo = {
				zoom: 1000,
				defaultMovementX: -100,
				defaultMovementY: 0,
				movementX: -100,
				movementY: 0,
				rotation: 0
			}
			
			for (let i in state[state.musicInfo.playerId == 2 ? 'arrowsInfo' : 'arrowsInfoOpponent']) {
				state[state.musicInfo.playerId == 2 ? 'arrowsInfo' : 'arrowsInfoOpponent'][i].alpha = 0
				state[state.musicInfo.playerId == 2 ? 'arrowsInfo' : 'arrowsInfoOpponent'][i].noteAlpha = 0
			}

			
			state.customBongPosition = {
				X: state.canvas.width-state.canvas.width*0.15,
				Y: state.canvas.height*0.75
			}

			state.musicInfo.backgroundImage = null
			state.alphaHUD = 0
			state.gameBackgroundOfuscation = 0
			state.countdown = 0
			state.invertArrowPos = true
			state.selectSettingsOption.settingsOptions.find((g) => g.id == 'MiddleScroll').content = false
			break
		case 'end':
			state.selectSettingsOption.settingsOptions.find((g) => g.id == 'MiddleScroll').content = state.musicInfo.variables.MiddleScroll
			state.gameBackgroundOfuscation = state.musicInfo.variables.defaultBackgroundOfuscation
			break
        case 'started':
			state.animations['AnimationIdle'] = {
                frame: 0,
                startFrame: 0,
                endFrame: 6,
                totalDalay: 20,
                dalay: 0,
                boomerang: true,
				boomerangForward: true
            }

			state.animations['AnimationNote'] = {
                frame: 0,
                startFrame: 0,
                endFrame: 13,
                totalDalay: 0,
                dalay: 0,
				boomerang: true,
				boomerangForward: true
            }

			state.animations['HeavensGate'] = {
				frame: 0,
                startFrame: 0,
                endFrame: 40,
                totalDalay: 10,
                dalay: 0
			}

			state.animations['AlexisPassing'] = {
				frame: 0,
                startFrame: 0,
                endFrame: 26,
                totalDalay: 10,
                dalay: 0,
			}
			break
		case 'gameLoop':
			var variables = state.musicInfo.variables

			let beat = state.musicBeat
			let step = state.musicStep
			let currentTime = state.music?.currentTime

			state.alphaHUD = state.alphaHUD > 1 ? 1 : state.alphaHUD <= 0 ? 0 : state.alphaHUD
			if (variables.HUDFadeOut && state.alphaHUD > 0) state.alphaHUD -= 0.02
			else if (state.alphaHUD == 0) variables.HUDFadeOut = false
			if (variables.HUDFade && state.alphaHUD < 1) state.alphaHUD += 0.02
			else if (state.alphaHUD == 1) variables.HUDFade = false
			state.alphaHUD = state.alphaHUD > 1 ? 1 : state.alphaHUD <= 0 ? 0 : state.alphaHUD

			let events = state.musicInfo.events
			for (let i in events) {
                let event = events[i]
				
                if (variables.oldCurrentTime*1000 <= event[0] && currentTime*1000 >= event[0]) {
					if (event[2] == 'Bygone Transition Initial') {
						let interval = setInterval(() => {
							let AlexisTransitionPopup = state.musicInfo.popupsBackground['AlexisTransition']
							if (AlexisTransitionPopup.alpha < 1) AlexisTransitionPopup.alpha += 0.005
							else clearInterval(interval)
						}, 1000/30)
					}
					if (event[2] == 'Bygone Transition') {
						let add = true
						let interval = setInterval(() => {
							if (add && state.gameBackgroundOfuscation < 1) state.gameBackgroundOfuscation += 0.01
							else if (add) {
								add = false
								variables.scenary2 = true
								state.backgroundInfo = {
									zoom: 500,
									defaultMovementX: -100,
									defaultMovementY: 0,
									movementX: 20,
									movementY: 20,
									rotation: 0
								}
							}

							if (!add && state.gameBackgroundOfuscation+0.01 > 0) state.gameBackgroundOfuscation -= 0.01
							else if (!add) {
								state.gameBackgroundOfuscation = 0
								clearInterval(interval)
							}
						}, 1000/30)
					}
					if (event[2] == 'Bygone Transition End') {
						let interval = setInterval(() => {
							let AlexisTransitionPopup = state.musicInfo.popupsBackground['AlexisTransition']
							if (AlexisTransitionPopup.alpha-0.02 > 0) AlexisTransitionPopup.alpha -= 0.02
							else {
								delete state.musicInfo.popupsBackground['AlexisTransition']
								clearInterval(interval)
							}
						}, 1000/30)
					}

					if (event[2] == 'Summon Alexis') {
						let interval = setInterval(() => {
							if (variables.AlexisAlpha < 1) variables.AlexisAlpha += 0.02
							else {
								variables.AlexisAlpha = 1
								clearInterval(interval)
							}
						}, 1000/30)
					}

					if (event[2] == 'Alexis Pass') {
						variables.onHeavensGate = true
						state.animations['HeavensGate'].frame = 0
						state.animations['AlexisPassing'].frame = 0
					}

					if (event[2] == 'HUD Fade' || (event[2] == 'HUD Fade Mid Song' && state.alphaHUD < 1)) variables.HUDFade = true
					if (event[2] == 'HUD Fade Mid Song' && state.alphaHUD >= 1) {
						for (let i in state.arrowsInfo) state.arrowsInfo[i].alpha = 1
						variables.HUDFadeOut = true
					}
				}
			}

			let Xpoint = state.canvas.width*0.55+(state.backgroundInfo.movementX*0.5)
			let Ypoint = state.canvas.height*0.53+(state.backgroundInfo.movementY*0.5)

			state.musicInfo.dynamicBackgroundImage = `imgs/VSLullaby/Bygone/Background${variables.scenary2 ? '2' : ''}.png`
			let bridgeRopeImage = state.images[`imgs/VSLullaby/Bygone/BridgeRope${variables.scenary2 ? '2' : ''}.png`]?.image
			let bridgeImage = state.images[`imgs/VSLullaby/Bygone/Bridge${variables.scenary2 ? '2' : ''}.png`]?.image
			let bigHypnoImage = state.images[`imgs/VSLullaby/Bygone/BigHypno.png`]?.image

			let heavensGateAnimation = state.animations['HeavensGate']
			let alexisPassingAnimation = state.animations['AlexisPassing']
			let heavensGateData = state.images['imgs/VSLullaby/Bygone/HeavensGate.png'].animationConfig.frames[heavensGateAnimation.frame]
			let alexisPassingData = state.images['imgs/VSLullaby/Bygone/AlexisPassing.png'].animationConfig.frames[alexisPassingAnimation.frame]

			if (variables.onHeavensGate) {
				variables.AlexisAlpha = 0
				let x = Xpoint+bridgeImage.width*0.06
				let y = Ypoint-bridgeImage.height*0.15

				if (heavensGateData) state.musicInfo.popupsBackground['HeavensGate'] = {
					image: `imgs/VSLullaby/Bygone/HeavensGate.png`,
					animationDir: 'frames',
					frame: heavensGateAnimation.frame,
					x: x-(heavensGateData.width*0.8/8),
					y: y-(heavensGateData.height*0.8/2),
					width: heavensGateData.width*0.8,
					height: heavensGateData.height*0.8
				}

				if (alexisPassingData) {
					state.musicInfo.popupsBackground['AlexisPassing'] = {
						image: `imgs/VSLullaby/Bygone/AlexisPassing.png`,
						animationDir: 'frames',
						frame: alexisPassingAnimation.frame,
						x,
						y: y*(1-heavensGateAnimation.frame/(heavensGateAnimation.endFrame/3)),
						width: alexisPassingData.width*0.8,
						height: alexisPassingData.height*0.8
					}
				}
			}

			if (variables.animation != 'idle') {
				let animation = state.animations['AnimationNote']
				if (state.musicInfo.variables.scenary2 && variables.dalayToIdle+200 <= +new Date()) state.musicInfo.variables.animation = 'idle'

				animation.boomerang = variables.scenary2 ? false : true
				animation.loop = variables.scenary2
				animation.startFrame = variables.scenary2 ? 10 : 0
				let endFrame = state.images[`imgs/VSLullaby/Bygone/${variables.scenary2 ? 'Alexis' : 'smolHypno'}.png`].animationConfig[variables.animation].length-2
				if (animation.endFrame != endFrame) animation.endFrame = endFrame
				else {
					let imageInfo = state.images[`imgs/VSLullaby/Bygone/${variables.scenary2 ? 'Alexis' : 'smolHypno'}.png`].animationConfig[variables.animation][animation.frame]

					switch(variables.animation) {
						case 'left':
							imageInfo.frameX = -(imageInfo.width*0.8/2)
							imageInfo.frameY = 0
							break
						case 'right':
							imageInfo.frameX = (imageInfo.width*0.8/4)
							imageInfo.frameY = 0
							break
					}

					if (imageInfo?.name) state.musicInfo.popupsBackground['Animation'] = {
						image: `imgs/VSLullaby/Bygone/${variables.scenary2 ? 'Alexis' : 'smolHypno'}.png`,
						animationDir: variables.animation,
						frame: animation.frame,
						x: variables.scenary2 ? Xpoint+bridgeImage.width*0.06+imageInfo.frameX+(Math.floor(Math.random()*4)-2) : Xpoint,
						y: variables.scenary2 ? Ypoint-bridgeImage.height*0.15+imageInfo.frameY+(Math.floor(Math.random()*4)-2)  : Ypoint,
						width: imageInfo.width*0.8,
						height: imageInfo.height*0.8,
						alpha: variables.scenary2 ? variables.AlexisAlpha : 1
					}
				}
			} else {
				let animation = state.animations['AnimationIdle']
				let endFrame = state.images[`imgs/VSLullaby/Bygone/${variables.scenary2 ? 'Alexis' : 'smolHypno'}.png`].animationConfig[variables.animation].length-2
				if (animation.endFrame != endFrame) animation.endFrame = endFrame
				else {
					let imageInfo = state.images[`imgs/VSLullaby/Bygone/${variables.scenary2 ? 'Alexis' : 'smolHypno'}.png`].animationConfig['idle'][animation.frame]

					if (imageInfo?.name) state.musicInfo.popupsBackground['Animation'] = {
						image: `imgs/VSLullaby/Bygone/${variables.scenary2 ? 'Alexis' : 'smolHypno'}.png`,
						animationDir: 'idle',
						frame: animation.frame,
						x: variables.scenary2 ? Xpoint+bridgeImage.width*0.06 : Xpoint,
						y: variables.scenary2 ? Ypoint-bridgeImage.height*0.15  : Ypoint,
						width: imageInfo.frameWidth*0.8,
						height: imageInfo.frameHeight*0.8,
						alpha: variables.scenary2 ? variables.AlexisAlpha : 1
					}
				}
			}

			if (bridgeRopeImage) state.musicInfo.popupsBackground['BridgeRope'] = {
				image: `imgs/VSLullaby/Bygone/BridgeRope${variables.scenary2 ? '2' : ''}.png`,
				x: Xpoint-(bridgeImage.width*0.09),
				y: Ypoint-(bridgeImage.height*0.2),
				width: bridgeRopeImage.width*0.8,
				height: bridgeRopeImage.height*0.8,
				alpha: 1-state.gameBackgroundOfuscation <= 0 ? 0 : 1-state.gameBackgroundOfuscation
			}
			if (state.musicInfo.popupsBackground['Animation']) {
				if (bigHypnoImage) state.musicInfo.popupsBackground['BigHypno'] = {
					image: `imgs/VSLullaby/Bygone/BigHypno.png`,
					x: Xpoint-(bigHypnoImage.width*0.32),
					y: Ypoint-(bridgeImage.height*0.135),
					width: bigHypnoImage.width*0.8,
					height: bigHypnoImage.height*0.8,
					alpha: variables.scenary2 ? 1-state.gameBackgroundOfuscation <= 0 ? 0 : 1-state.gameBackgroundOfuscation : 0
				}
				if (bridgeImage) state.musicInfo.popupsBackground['Bridge'] = {
					image: `imgs/VSLullaby/Bygone/Bridge${variables.scenary2 ? '2' : ''}.png`,
					x: Xpoint-(bridgeImage.width*0.18),
					y: Ypoint-(bridgeImage.height*0.182),
					width: bridgeImage.width*0.8,
					height: bridgeImage.height*0.8,
					alpha: 1-state.gameBackgroundOfuscation <= 0 ? 0 : 1-state.gameBackgroundOfuscation
				}

				let alexisTransition = state.images['imgs/VSLullaby/Bygone/AlexisTransition.png']?.image
				if (alexisTransition && !state.musicInfo.popupsBackground['AlexisTransition']) state.musicInfo.popupsBackground['AlexisTransition'] = {
					image: `imgs/VSLullaby/Bygone/AlexisTransition.png`,
					x: state.canvas.width/2-alexisTransition.width/2,
					y: state.canvas.height/2-alexisTransition.height/2,
					alpha: 0
				}
			}

			variables.oldBeat = beat
			variables.oldStep = step
			variables.oldCurrentTime = currentTime
            break
		case 'gameLoopFullFPS':
			var variables = state.musicInfo.variables

			var canvas = state.canvas
			var ctx = canvas.getContext('2d')

			for (let i in lyrics) {
				let step = state.musicStep
				let lyric = lyrics[i]
				let textArr = lyric.curString.split('/')
				
				if (lyric.onState != undefined) {
					ctx.font = `18px pok`

					let X = canvas.width*0.5-(ctx.measureText(textArr.join('')).width/2)

					for (let i in textArr) {
						let txt = textArr[i]

						ctx.fillStyle = 'black'
						ctx.fillText(txt, X+1, canvas.height*0.75-(lyric.onState == Number(i) ? 5 : 0)+1)

						ctx.fillStyle = lyric.onState == Number(i) ? 'red' : 'white'
						ctx.fillText(txt, X, canvas.height*0.75-(lyric.onState == Number(i) ? 5 : 0))

						X += ctx.measureText(txt).width
					}
				}
				
				for (let a in lyric.steps) {
					if (lyric.steps.length <= textArr.length) lyric.steps.push(lyric.steps[lyric.steps.length-1]+4)
					
					if (lyric.steps[a] >= variables.oldStep && lyric.steps[a] <= step) {
						if (Number(a) == lyric.steps.length-1) lyric.onState = undefined
						else lyric.onState = Number(a)
					}
				}
			}
			break
    }
}

let lyrics = [
	{
		"steps": [701, 704, 706, 708, 714],
		"curString": "It's/ gonna/ be/ okay!"
	}
]