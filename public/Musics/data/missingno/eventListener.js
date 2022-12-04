export default async (type, { noteClickAuthor, note, click, listenerState, difficulty, events, gameState }, state) => {
    switch (type) {
		case 'loaded':
			state.musicInfo.variables = {
				noteAlpha: 1,
				addAlpha: true,
				pauseAlpha: false,
				ScrollSpeed: state.selectSettingsOption.settingsOptions.find((g) => g.id == 'ScrollSpeed').content
			}

			//state.selectSettingsOption.settingsOptions.find((g) => g.id == 'ScrollSpeed').content = true
			break
        case 'started':
			state.musicInfo.variables = {
				oldBeat: 0,
				oldStep: 0,
				oldCurrentTime: 0
			}
			break
		case 'end':
			state.selectSettingsOption.settingsOptions.find((g) => g.id == 'ScrollSpeed').content = state.musicInfo.variables.ScrollSpeed
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
					if (event[1] == 'Change Scroll Speed') {
						state.selectSettingsOption.settingsOptions.find((g) => g.id == 'ScrollSpeed').content = Number(event[2])
					}
				}
			}

			variables.oldBeat = beat
			variables.oldStep = step
			variables.oldCurrentTime = currentTime
			break
		/*case 'noteClick':
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

			state.animations['AlphaBet'] = {
                frame: 0,
                startFrame: 0,
                endFrame: 5,
                totalDalay: 10,
                dalay: 0,
				loop: true
            }

			state.musicInfo.variables = {
				oldBeat: 0,
				oldStep: 0,
				oldCurrentTime: 0,
				animation: 'idle',
				outro: false,
				HUDFade: false,
				onCelebi: false,
				animationCelebi: 'spawn',
				timeIdleCelebi: 0,
				onWriting: false,
				onWritingEndTime: 0,
				pastLetters: 0,
				keys: {},
				botOnNote: null,
			}
			break
		case 'gameLoop':
			var variables = state.musicInfo.variables

			let beat = state.musicBeat
			let step = state.musicStep
			let currentTime = state.music?.currentTime

			let imageSpawn = state.images['imgs/VSLullaby/silver.png'].animationConfig['spawn'][state.animations['SilverSpawn'].frame]
			state.musicInfo.popupsBackground.Silver = {
				image: `imgs/VSLullaby/silver.png`,
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
					let imageInfo = JSON.parse(JSON.stringify(state.images['imgs/VSLullaby/silver.png'].animationConfig[variables.animation][frame]))

					switch (variables.animation) {
						case 'left':
							imageInfo.frameX = imageInfo.frameX-200
							break
						case 'right':
							imageInfo.frameX = imageInfo.frameX+200
							break
					}

					if (imageInfo?.name) state.musicInfo.popupsBackground.Silver = {
						image: `imgs/VSLullaby/silver.png`,
						animationDir: variables.animation,
						frame,
						x: state.canvas.width/2-imageInfo.width/2+(imageInfo.frameX),
						y: state.canvas.height-imageInfo.height+(imageInfo.frameY),
						width: imageInfo.frameWidth,
						height: imageInfo.frameHeight
					}
				} else {
					let imageInfo = state.images['imgs/VSLullaby/silver.png'].animationConfig['idle'][state.animations['SilverIdle'].frame]

					if (imageInfo?.name) state.musicInfo.popupsBackground['Silver'] = {
						image: `imgs/VSLullaby/silver.png`,
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
					if (event[2] == 'Jumpscare' && (event[4] == '10' || Math.random()*100 > 20)) {
						let time = +new Date()
						let interval = setInterval(() => {
							if (+new Date()-time >= 450) {
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

					if (event[2] == 'Unown' && state.musicInfo.difficulty.name != 'Mania') {
						let percent = Math.floor(Math.random()*100)
						let letters = monochromeTexts.words
						if (percent >= 70 && percent < 85) letters = monochromeTexts.rareWords
						if (percent >= 85 && percent < 96) letters = monochromeTexts.harderWords
						if (percent >= 96) letters = monochromeTexts.impossibleWords
						variables.monochromeText = letters[Math.floor(Math.random()*letters.length)]

						variables.pastLetters = 0
						variables.onWriting = true
						variables.onWritingEndTime = +new Date()+5000

						if(event[4] == 'NO MORE') variables.onWritingTroll = true

						listenerState.pauseGameKeys = true
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
					image: 'imgs/VSLullaby/celebi.png',
					animationDir: variables.animationCelebi == 'idle' ? 'idle' : 'spawn',
					frame,
					x: 0,
					y: 0
				}
			} else delete state.musicInfo.popupsBackground['Celebi']

			variables.oldBeat = beat
			variables.oldStep = step
			variables.oldCurrentTime = currentTime
            break
		case 'gameLoopFullFPS':
			var variables = state.musicInfo.variables

			if (variables.onWriting) {
				let canvas = state.canvas
				let ctx = canvas.getContext('2d')
				let time = Number.parseInt((variables.onWritingEndTime-+new Date())/1000*4)

				ctx.fillStyle = 'rgba(255, 0, 0, 0.5)'
				ctx.fillRect(0, 0, canvas.width, canvas.height)

				ctx.fillStyle = 'white'
				ctx.font = `bold 25px Arial`
				ctx.fillText(time, canvas.width/2-(ctx.measureText(time).width/2), canvas.height*0.75)

				let text = variables.monochromeText?.toLowerCase() || '??????????????'

				if (text[variables.pastLetters] == ' ') variables.pastLetters += 1

				let key = Object.values(listenerState.keys).find(k => k.key.toLowerCase() == text[variables.pastLetters])

				if (key && !key.clicked && variables.keys[key.code]) variables.keys[key.code] = false
				if (key && key.clicked && !variables.keys[key.code]) {
					variables.pastLetters += 1
					variables.keys[key.code] = true
				}

				if (variables.botOnNote != null) listenerState.arrows[variables.botOnNote].click = true
				if (state.smallFunctions.getConfig('botPlay') && state.musicStep != variables.oldStep && !variables.keys['bot']) {
					variables.botOnNote = Math.floor(Math.random()*4)
					variables.keys['bot'] = true
					variables.pastLetters += 1
				}
				if (state.smallFunctions.getConfig('botPlay') && state.musicStep == variables.oldStep && state.musicStep%2 == 0) {
					variables.botOnNote = null
					variables.keys['bot'] = false
				}

				let phraseWidth = 0
				let letterResize = (canvas.width/text.length)/250 < 0.4 ? (canvas.width/text.length)/250 : 0.4
				let letterSpace = 50*letterResize
				let spaceWidth = 90*letterResize
				
				for (let i in text) {
					let imageData = state.images['imgs/VSLullaby/alphabet.png']
					if (imageData.animationConfig[text[i]]) phraseWidth += (imageData.animationConfig[text[i]][state.animations['AlphaBet'].frame].width*letterResize)+letterSpace
					else phraseWidth += spaceWidth+letterSpace
				}

				let X = canvas.width/2-(phraseWidth/2)
				for (let i in text) {
					let letter = text[i]
					let imageData = state.images['imgs/VSLullaby/alphabet.png']
					let image = imageData.image

					if (imageData.animationConfig[letter]) {
						let imagePos = imageData.animationConfig[letter][state.animations['AlphaBet'].frame]
						let letterWidth = imagePos.width*letterResize
						let letterHeight = imagePos.height*letterResize

						if (Number(i)+1 > variables.pastLetters) {
							ctx.drawImage(image, imagePos.x, imagePos.y, imagePos.width, imagePos.height, X, canvas.height*0.2, letterWidth, letterHeight)

							ctx.fillStyle = 'black'
							ctx.fillRect(X, canvas.height*0.9, letterWidth, 5)
						}

						X += letterWidth+letterSpace
					} else X += spaceWidth+letterSpace
				}

				if (variables.onWritingEndTime < +new Date() || text.length-1 < variables.pastLetters) {
					if (text.length-1 >= variables.pastLetters && !state.smallFunctions.getConfig('botPlay') && !variables.onWritingTroll) state.musicInfo.health = -100
					variables.onWriting = false
					variables.onWritingTroll = false
					listenerState.pauseGameKeys = false
				}
			}
			break*/
    }
}

let monochromeTexts = {
	words: [
		"IM DEAD",
		"EERIE NOISE",
		"LEAVE HURRY",
		"HE DIED",
		"DYING",
		"PERISH SONG",
		"GOLD",
		"SILVER",
		"DONT BELONG",
		"ABANDONED",
		"BOO!",
		"UNOWN",
		"NOT WANTED",
		"TIRESOME",
		"USELESS",
		"GRUESOME",
		"NIGHTMARE",
		"GET OUT",
		"HOPELESS",
		"RUN",
		"NOT WELCOME",
		"CAN YOU SEE?",
		"WHERE?",
		"HELP",
		"RELIVE",
		"XXXXX",
		"GOODBYE",
		"CELEBI DIED",
		"IT FAILED",
		"AGONY",
		"I SEE YOU"
	],
	rareWords: [
		"NICE COCK",
		"SUS AF",
		"BOOB LOL",
		"LMAO GOTTEM",
		"RUN STREAMER",
		"FUN STREAMER",
		"RATIO",
		"GOO!",
		"POGGERS!",
		"BUSSY"
	],
	impossibleWords: [
		"WANNA WORK ON MY FNF MOD?",
		"IM IN A FUCKING WHEEL CHAIR",
		"BUT DURING THE STONE AGE",
		"HIS MOUTH IS NOT A PUSSY",
		"FEAR OF THE UNOWN",
		"HAIL TO THE KING"
	],
	harderWords: [
		"FERALIGATR",
		"CYNDAQUIL",
		"TYPHLOSION",
		"HIPPOPOTAMUS",
		"FORGOTTEN",
		"FRUSTRATION",
		"DECAPITATION",
		"NOT YOUR FATE",
		"HOLLOWED AND EMPTY",
		"POSSESSION",
		"MELANCHOLY",
		"MONOTONY",
		"TOMBSTONE",
		"THE END OF ALL THINGS",
		"DEATH TO GLORY",
		"LOST MEMORIES",
		"ASPHYXIATION"
	]
}