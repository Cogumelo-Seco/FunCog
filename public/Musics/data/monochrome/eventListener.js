export default async (type, { noteClickAuthor, note, click, listenerState, difficulty, events }, state) => {
    switch (type) {
		case 'noteClick':
			if (noteClickAuthor == 'opponent') {
				state.musicInfo.variables.animation = 'idle'

				let animation = 'idle'
				switch (note.arrowID) {
					case 0:
						animation = 'left'
						break
					case 1:
						animation = 'down'
						break
					case 2:
						animation = 'up'
						break
					case 3:
						animation = 'right'
						break
				}

				if (click) {
					state.animations['SilverNoteIntroOutro'].frame = 0
					state.musicInfo.variables.outro = false
				}
				state.musicInfo.variables.animation = animation

				clearTimeout(state.musicInfo.variables.timeout)
				state.musicInfo.variables.timeout = setTimeout(() => {
					//state.musicInfo.variables.animation = 'idle'
					state.musicInfo.variables.outro = true
					state.animations['SilverNoteIntroOutro'].frame = 0
				}, 500)
			}
			break
		case 'loaded':
			if (!state.smallFunctions.getConfig('MiddleScroll')) {
				state.customBongPosition = {
					X: state.canvas.width*0.15,
					Y: state.canvas.height*0.75
				}
			}

			state.countdown = 0
			state.alphaHUD = 0

			for (let i in state.arrowsInfoOpponent) {
				state.arrowsInfoOpponent[i].alpha = 0
				state.arrowsInfoOpponent[i].noteAlpha = 0
			}

			break
        case 'started':
			state.animations['SilverIdle'] = {
                frame: 0,
                startFrame: 0,
                endFrame: 7,
                totalDalay: 20,
                dalay: 0,
                loop: true
            }

			state.animations['SilverSpawn'] = {
                frame: 0,
                startFrame: 0,
                endFrame: 16,
                totalDalay: 20,
                dalay: 0
            }

			state.animations['SilverNote'] = {
                frame: 0,
                startFrame: 10,
                endFrame: 17,
                totalDalay: 0,
                dalay: 0,
				loop: true
            }

			state.animations['SilverNoteIntroOutro'] = {
                frame: 0,
                startFrame: 0,
                endFrame: 10,
                totalDalay: 0,
                dalay: 0
            }

			state.animations['CelebiSpawn'] = {
                frame: 0,
                startFrame: 0,
                endFrame: 14,
                totalDalay: 0,
                dalay: 0
            }

			state.animations['CelebiIdle'] = {
                frame: 0,
                startFrame: 0,
                endFrame: 3,
                totalDalay: 0,
                dalay: 0,
				loop: true
            }

			state.musicInfo.variables = {
				animation: 'idle',
				outro: false,
				HUDFade: false,
				onCelebi: false,
				animationCelebi: 'spawn',
				timeIdleCelebi: 0,
				onWriting: false,
				onWritingEndTime: 0
			}
			break
		case 'gameLoop':
			let variables = state.musicInfo.variables

			let beat = state.musicBeat
			let currentTime = state.music?.currentTime

			let imageSpawn = state.images['imgs/Monochrome/silver.png'].animationConfig['spawn'][state.animations['SilverSpawn'].frame]
			state.musicInfo.popupsBackground.Silver = {
				image: `imgs/Monochrome/silver.png`,
				animationDir: 'spawn',
				frame: state.animations['SilverSpawn'].frame,
				x: state.canvas.width/2-imageSpawn.width/2,
				y: state.canvas.height-imageSpawn.height,
			}

			if (state.animations['SilverSpawn'].frame == state.animations['SilverSpawn'].endFrame) {
				if (variables.animation != 'idle') {
					let animation = state.animations['SilverNoteIntroOutro'].frame == state.animations['SilverNoteIntroOutro'].endFrame ? state.animations['SilverNote'] : state.animations['SilverNoteIntroOutro']
					let frame = animation.frame
					if (variables.outro) {
						frame = state.animations['SilverNoteIntroOutro'].endFrame-state.animations['SilverNoteIntroOutro'].frame
						if (state.animations['SilverNoteIntroOutro'].frame >= state.animations['SilverNoteIntroOutro'].endFrame) {
							variables.animation = 'idle'
							variables.outro = false
						}
					}
					let imageInfo = JSON.parse(JSON.stringify(state.images['imgs/Monochrome/silver.png'].animationConfig[variables.animation][frame]))

					switch (variables.animation) {
						case 'left':
							imageInfo.frameX = imageInfo.frameX-200
							break
						case 'right':
							imageInfo.frameX = imageInfo.frameX+200
							break
					}

					if (imageInfo?.name) state.musicInfo.popupsBackground.Silver = {
						image: `imgs/Monochrome/silver.png`,
						animationDir: variables.animation,
						frame,
						x: state.canvas.width/2-imageInfo.width/2+(imageInfo.frameX),
						y: state.canvas.height-imageInfo.height+(imageInfo.frameY),
						width: imageInfo.frameWidth,
						height: imageInfo.frameHeight
					}
				} else {
					let imageInfo = state.images['imgs/Monochrome/silver.png'].animationConfig['idle'][state.animations['SilverIdle'].frame]

					if (imageInfo?.name) state.musicInfo.popupsBackground['Silver'] = {
						image: `imgs/Monochrome/silver.png`,
						animationDir: 'idle',
						frame: state.animations['SilverIdle'].frame,
						x: state.canvas.width/2-imageInfo.width/2,
						y: state.canvas.height-imageInfo.height,
						width: imageInfo.frameWidth,
						height: imageInfo.frameHeight
					}
				}
			}

			state.alphaHUD = state.alphaHUD > 1 ? 1 : state.alphaHUD
			if (variables.HUDFade && state.alphaHUD < 1) state.alphaHUD += 0.02
			if (state.alphaHUD == 1 && state.arrowsInfo[0].alpha == 1) {
				for (let i in state.arrowsInfo) {
					state.arrowsInfo[i].alpha = 0.8
					state.arrowsInfo[i].noteAlpha = 0.8
					state.arrowsInfo[i].splashAlpha = 0.5
				}
			}

			let events = state.musicInfo.events
			for (let i in events) {
                let event = events[i]

                if (variables.oldCurrentTime*1000 <= event[0] && currentTime*1000 >= event[0]) {
					if (event[2] == 'Jumpscare' && (Math.random()*100 > 25 || event[4] == '32')) {
						let count = 0
						let interval = setInterval(() => {
							count += 1
							if (count >= 15) {
								clearInterval(interval)
								delete state.musicInfo.popups['SilverJumpscare']
							} else {
								let movementX = Math.floor(Math.random()*50)-25
								let movementY = Math.floor(Math.random()*50)-25
								state.musicInfo.popups['SilverJumpscare'] = {
									image: 'jumpscares/SilverJumpscare.png',
									x: -(state.canvas.width*0.5/2)+movementX,
									y: -(state.canvas.height*0.5/2)+movementY,
									width: state.canvas.width*1.5,
									height: state.canvas.height*1.5,
								}
							}
						}, 1000/30)
					}

					if (event[2] == 'Unown') {
						variables.onWriting = true
						variables.onWritingEndTime = +new Date()+4000
					}

					if (event[2] == 'Celebi') {
						state.animations['CelebiSpawn'].frame = 0
						variables.onCelebi = true
					}

					if (event[2] == 'HUD Fade') variables.HUDFade = true
                }
            }

			if (variables.onCelebi) {
				let spawnAnimation = state.animations['CelebiSpawn']
				let idleAnimation = state.animations['CelebiIdle']
				let frame = 0

				if (variables.animationCelebi == 'spawn' && spawnAnimation.frame >= spawnAnimation.endFrame) {
					variables.timeIdleCelebi = +new Date()
					variables.animationCelebi = 'idle'
				}
				if (variables.animationCelebi == 'idle' && variables.timeIdleCelebi+1000 < +new Date()) {
					spawnAnimation.frame = 0
					variables.animationCelebi = 'outro'
				}
				if (variables.animationCelebi == 'outro' && spawnAnimation.frame >= spawnAnimation.endFrame) variables.onCelebi = false

				if (variables.animationCelebi == 'spawn') frame = spawnAnimation.frame
				if (variables.animationCelebi == 'idle') frame = idleAnimation.frame
				if (variables.animationCelebi == 'outro') frame = spawnAnimation.endFrame-spawnAnimation.frame

				state.musicInfo.popupsBackground['Celebi'] = {
					image: 'imgs/Monochrome/celebi.png',
					animationDir: variables.animationCelebi == 'idle' ? 'idle' : 'spawn',
					frame,
					x: 0,
					y: 0
				}
			} else delete state.musicInfo.popupsBackground['Celebi']

			if (variables.onWriting) {
				let canvas = state.canvas
				let ctx = canvas.getContext('2d')
				let time = Number.parseInt((variables.onWritingEndTime-+new Date())/1000*4)

				ctx.fillStyle = 'rgba(255, 0, 0, 0.5)'
				ctx.fillRect(0, 0, canvas.width, canvas.height)

				ctx.fillStyle = 'white'
				ctx.font = `bold 20px Arial`
				ctx.fillText(time, canvas.width/2-(ctx.measureText(time).width/2), canvas.height/2)

				if (variables.onWritingEndTime < +new Date()) variables.onWriting = false
			}

			variables.oldBeat = beat
			variables.oldCurrentTime = currentTime
            break
    }
}