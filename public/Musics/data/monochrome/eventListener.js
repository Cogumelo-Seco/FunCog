export default async (type, { noteClickAuthor, note, click, listenerState, difficulty, events }, state) => {
    switch (type) {
		case 'noteClick':
			if (state.musicInfo.playerId == 2 && noteClickAuthor == 'player' || state.musicInfo.playerId == 1 && noteClickAuthor == 'opponent') {
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
					state.animations['GoldNoteIntroOutro'].frame = 0
					state.musicInfo.variables.outro = false
				}
				state.musicInfo.variables.animation = animation

				clearTimeout(state.musicInfo.variables.timeout)
				state.musicInfo.variables.timeout = setTimeout(() => {
					state.musicInfo.variables.outro = true
					state.animations['GoldNoteIntroOutro'].frame = 0
				}, 500)
			}
			break
		case 'loaded':
			state.musicInfo.backgroundImage = null
			
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
			state.animations['GoldHeadRip'] = {
                frame: 0,
                startFrame: 0,
                endFrame: 69,
                totalDalay: 0,
                dalay: 0
            }

			state.animations['GoldNoMore'] = {
                frame: 0,
                startFrame: 0,
                endFrame: 61,
                totalDalay: 5,
                dalay: 0
            }

			state.animations['GoldIdleHeadSheet'] = {
                frame: 0,
                startFrame: 10,
                endFrame: 63,
                totalDalay: 0,
                dalay: 0,
				loop: true
            }

			state.animations['GoldIdle'] = {
                frame: 0,
                startFrame: 0,
                endFrame: 7,
                totalDalay: 20,
                dalay: 0,
                loop: true
            }

			state.animations['GoldSpawn'] = {
                frame: 0,
                startFrame: 0,
                endFrame: 16,
                totalDalay: 20,
                dalay: 0
            }

			state.animations['GoldNoteHeadSheet'] = {
                frame: 0,
                startFrame: 10,
                endFrame: 24,
                totalDalay: 0,
                dalay: 0,
				loop: true
            }

			state.animations['GoldNote'] = {
                frame: 0,
                startFrame: 10,
                endFrame: 17,
                totalDalay: 0,
                dalay: 0,
				loop: true
            }

			state.animations['GoldNoteIntroOutro'] = {
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
				goldAnimtionState: 'normal',
				outro: false,
				HUDFade: false,
				HUDFadeOut: false,
				onCelebi: false,
				animationCelebi: 'spawn',
				timeIdleCelebi: 0,
				onWriting: false,
				onWritingEndTime: 0,
				pastLetters: 0,
				keys: {},
				botOnNote: null,
				defaultMusicName: state.musicInfo.name,
				anagramMusicName: false,
				anagramMusicNameLoop: true
			}
			break
		case 'end':
			state.musicInfo.name = state.musicInfo.variables.defaultMusicName
			break
		case 'gameLoop':
			var variables = state.musicInfo.variables

			let beat = state.musicBeat
			let step = state.musicStep
			let currentTime = state.music?.currentTime

			if (state.screenZoom < 10 && state.camZooming) {
				if (variables.oladBeat != beat && beat%4 == 0 && currentTime > 13 && currentTime < 144) state.screenZoom = 10
			} else if (state.screenZoom <= 0) {
				state.screenZoom = 0
				state.camZooming = true
			} else {
				state.camZooming = false
				state.screenZoom -= 1
			}

			let musicName = variables.defaultMusicName
			if (variables.anagramMusicName && variables.anagramMusicNameLoop) {
				variables.anagramMusicNameLoop = false
				let txtArr = musicName.split('')
				let newTxt = ''
				let loop = (arr) => {
					let randomLetter = arr.splice(Math.floor(Math.random()*arr.length), 1)
					newTxt += randomLetter
					if (newTxt.length == musicName.length) {
						variables.anagramMusicNameLoop = true
						if (state.music?.currentTime < state.music?.duration) state.musicInfo.name = newTxt
					} else setTimeout(() => loop(arr), 0)
				}
				loop(txtArr)
			} else state.musicInfo.name = musicName

			let imageSpawn = state.images['imgs/VSLullaby/gold.png'].animationConfig['spawn'][state.animations['GoldSpawn'].frame]
			let Xpint = state.canvas.width*0.49
			let Ypoint = state.canvas.height/2-(imageSpawn.height/2)+imageSpawn.height
			state.musicInfo.popupsBackground.Gold = {
				image: `imgs/VSLullaby/gold.png`,
				animationDir: 'spawn',
				frame: state.animations['GoldSpawn'].frame,
				x: Xpint-imageSpawn.width/2,
				y: Ypoint-imageSpawn.height,
			}

			if (state.animations['GoldSpawn'].frame == state.animations['GoldSpawn'].endFrame) {
				if (variables.animation == 'idle') {
					let imageInfo = state.images[variables.goldAnimtionState == 'normal' ? 'imgs/VSLullaby/gold.png' : 'imgs/VSLullaby/goldHeadSheet.png'].animationConfig['idle'][state.animations[variables.goldAnimtionState == 'normal' ? 'GoldIdle' : 'GoldIdleHeadSheet'].frame]

					if (imageInfo?.name) state.musicInfo.popupsBackground['Gold'] = {
						image: variables.goldAnimtionState == 'normal' ? 'imgs/VSLullaby/gold.png' : 'imgs/VSLullaby/goldHeadSheet.png',
						animationDir: 'idle',
						frame: state.animations[variables.goldAnimtionState == 'normal' ? 'GoldIdle' : 'GoldIdleHeadSheet'].frame,
						x: Xpint-imageInfo.width/2,
						y: Ypoint-imageInfo.height,
						width: imageInfo.frameWidth,
						height: imageInfo.frameHeight
					}
				} else if (variables.animation == 'goldHeadRip') {
					if (state.animations['GoldHeadRip'].frame >= state.animations['GoldHeadRip'].endFrame) variables.animation = 'idle'
					let imageInfo = state.images['imgs/VSLullaby/goldHeadRip.png'].animationConfig.frames[state.animations['GoldHeadRip'].frame]

					if (imageInfo?.name) state.musicInfo.popupsBackground['Gold'] = {
						image: `imgs/VSLullaby/goldHeadRip.png`,
						animationDir: 'frames',
						frame: state.animations['GoldHeadRip'].frame,
						x: Xpint-imageInfo.width/2,
						y: Ypoint-imageInfo.height
					}
				} else if (variables.animation == 'noMore') {
					if (state.animations['GoldNoMore'].frame >= state.animations['GoldNoMore'].endFrame) {
						state.animations['GoldHeadRip'].frame = 0
						variables.animation = 'goldHeadRip'
					}
					let imageInfo = state.images['imgs/VSLullaby/goldNoMore.png'].animationConfig.frames[state.animations['GoldNoMore'].frame]

					if (imageInfo?.name) state.musicInfo.popupsBackground['Gold'] = {
						image: `imgs/VSLullaby/goldNoMore.png`,
						animationDir: 'frames',
						frame: state.animations['GoldNoMore'].frame,
						x: Xpint-imageInfo.width/2,
						y: Ypoint-imageInfo.height,
						width: imageInfo.frameWidth,
						height: imageInfo.frameHeight
					}
				} else {
					let animation = state.animations['GoldNoteIntroOutro'].frame == state.animations['GoldNoteIntroOutro'].endFrame ? state.animations[variables.goldAnimtionState == 'normal' ? 'GoldNote' : 'GoldNoteHeadSheet'] : state.animations['GoldNoteIntroOutro']
					let frame = animation.frame
					if (variables.outro) {
						frame = state.animations['GoldNoteIntroOutro'].endFrame-state.animations['GoldNoteIntroOutro'].frame
						if (state.animations['GoldNoteIntroOutro'].frame >= state.animations['GoldNoteIntroOutro'].endFrame) {
							variables.animation = 'idle'
							variables.outro = false
						}
					}
					let imageInfo = JSON.parse(JSON.stringify(state.images[variables.goldAnimtionState == 'normal' ? 'imgs/VSLullaby/gold.png' : 'imgs/VSLullaby/goldHeadSheet.png'].animationConfig[variables.animation][frame]))

					switch (variables.animation) {
						case 'left':
							imageInfo.frameX = imageInfo.frameX-200
							break
						case 'right':
							imageInfo.frameX = imageInfo.frameX+200
							break
					}

					if (imageInfo?.name) state.musicInfo.popupsBackground.Gold = {
						image: variables.goldAnimtionState == 'normal' ? 'imgs/VSLullaby/gold.png' : 'imgs/VSLullaby/goldHeadSheet.png',
						animationDir: variables.animation,
						frame,
						x: Xpint-imageInfo.width/2+(imageInfo.frameX),
						y: Ypoint-imageInfo.height+(imageInfo.frameY),
						width: imageInfo.frameWidth,
						height: imageInfo.frameHeight
					}
				}
			}

			state.alphaHUD = state.alphaHUD > 1 ? 1 : state.alphaHUD <= 0 ? 0 : state.alphaHUD
			if (variables.HUDFadeOut && state.alphaHUD > 0) state.alphaHUD -= 0.02
			else if (state.alphaHUD == 0) variables.HUDFadeOut = false
			if (variables.HUDFade && state.alphaHUD < 1) state.alphaHUD += 0.02
			else if (state.alphaHUD == 1) variables.HUDFade = false
			state.alphaHUD = state.alphaHUD > 1 ? 1 : state.alphaHUD <= 0 ? 0 : state.alphaHUD

			if (state.alphaHUD == 1 && state.arrowsInfo[0].alpha == 1) {
				for (let i in state.arrowsInfo) {
					state.arrowsInfo[i].alpha = 0.8
					state.arrowsInfo[i].noteAlpha = 0.8
					state.arrowsInfo[i].splashAlpha = 0.7
				}
			}

			let events = state.musicInfo.events
			for (let i in events) {
                let event = events[i]
				
                if (variables.oldCurrentTime*1000 <= event[0] && currentTime*1000 >= event[0]) {
					if (event[2] == 'Jumpscare' && Math.floor(Math.random()*10) <= Number(event[4] || 10)) {
						let time = +new Date()
						clearInterval(variables.jumpscareInterval)
						variables.jumpscareInterval = setInterval(() => {
							if (+new Date()-time >= 450) {
								clearInterval(variables.jumpscareInterval)
								state.musicInfo.popups['GoldJumpscare'].x = -964986
							} else {
								let movementX = Math.floor(Math.random()*50)-25
								let movementY = Math.floor(Math.random()*50)-25

								if (state.musicInfo.popups['GoldJumpscare']) {
									if (currentTime >= 150 && state.musicInfo.popups['GoldJumpscare'].image != 'jumpscares/GoldAltJumpscare.png') state.musicInfo.popups['GoldJumpscare'].image = 'jumpscares/GoldAltJumpscare.png'
									state.musicInfo.popups['GoldJumpscare'].x = -(state.canvas.width*0.5/2)+movementX
									state.musicInfo.popups['GoldJumpscare'].y = -(state.canvas.height*0.5/2)+movementY
								} else {
									state.musicInfo.popups['GoldJumpscare'] = {
										image: 'jumpscares/GoldJumpscare.png',
										x: -(state.canvas.width*0.5/2)+movementX,
										y: -(state.canvas.height*0.5/2)+movementY,
										width: state.canvas.width*1.5,
										height: state.canvas.height*1.5,
									}
								}
							}
						}, 1000/30)
					}

					if (event[2] == 'Monochrome No More') {
						variables.goldAnimtionState = 'goldHeadSheet'
						variables.animation = 'noMore'
						variables.anagramMusicName = true
						state.animations['GoldNoMore'].frame = 0
					}

					if (event[2] == 'Unown' && state.musicInfo.difficulty.name != 'Mania') {
						let percent = Math.floor(Math.random()*100)
						let letters = monochromeTexts.words
						if (percent >= 70 && percent < 85) letters = monochromeTexts.rareWords
						if (percent >= 85 && percent < 96) letters = monochromeTexts.harderWords
						if (percent >= 97) letters = monochromeTexts.impossibleWords
						variables.monochromeText = letters[Math.floor(Math.random()*letters.length)]

						variables.pastLetters = 0
						variables.onWriting = true
						variables.onWritingEndTime = +new Date()+5000

						//if(event[4] == 'NO MORE') variables.onWritingTroll = true

						listenerState.pauseGameKeys = true
					}

					if (event[2] == 'Celebi') {
						state.animations['CelebiSpawn'].frame = 0
						variables.onCelebi = true
					}

					if (event[2] == 'HUD Fade' || (event[2] == 'HUD Fade Mid Song' && state.alphaHUD < 1)) variables.HUDFade = true
					if (event[2] == 'HUD Fade Mid Song' && state.alphaHUD >= 1) {
						for (let i in state.arrowsInfo) state.arrowsInfo[i].alpha = 1
						variables.HUDFadeOut = true
					}
                }
            }

			if (variables.onCelebi) {
				let spawnAnimation = state.animations['CelebiSpawn']
				let idleAnimation = state.animations['CelebiIdle']
				let frame = 0

				if (variables.animationCelebi == 'spawn') frame = spawnAnimation.frame
				if (variables.animationCelebi == 'idle') frame = idleAnimation.frame
				if (variables.animationCelebi == 'outro') frame = spawnAnimation.endFrame-spawnAnimation.frame

				state.musicInfo.popupsBackground['Celebi'] = {
					image: 'imgs/VSLullaby/celebi.png',
					animationDir: variables.animationCelebi == 'idle' ? 'idle' : 'spawn',
					frame,
					resize: 0.7,
					x: state.canvas.width*0.05,
					y: state.canvas.height*0.25
				}

				if (variables.animationCelebi == 'spawn' && spawnAnimation.frame >= spawnAnimation.endFrame) {
					variables.timeIdleCelebi = +new Date()
					variables.animationCelebi = 'idle'
				}
				if (variables.animationCelebi == 'idle' && +new Date()-variables.timeIdleCelebi > 1000) {
					spawnAnimation.frame = 0
					variables.animationCelebi = 'outro'
				}
				if (variables.animationCelebi == 'outro' && spawnAnimation.frame >= spawnAnimation.endFrame) {
					variables.onCelebi = false
					variables.animationCelebi = 'spawn'
				}
			} else delete state.musicInfo.popupsBackground['Celebi']


			variables.oldBeat = beat
			variables.oldStep = step
			variables.oldCurrentTime = currentTime
            break
		case 'gameLoopFullFPS':
			var variables = state.musicInfo.variables

			let canvas = state.canvas
			let ctx = canvas.getContext('2d')

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
					if (lyric.steps[a] >= variables.oldStep && lyric.steps[a] <= step) {
						if (Number(a) == 2) lyric.onState = undefined
						else lyric.onState = Number(a)
					}
				}
			}

			if (variables.onWriting) {
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
			break
    }
}

let lyrics = [
	{
		steps: [368, 376, 384],
		curString: "I'M/ DEAD!"
	},
	{
		steps: [1144, 1152, 1160],
		curString: "I'M/ DEAD!"
	},
	{
		steps: [1608, 1616, 1632],
		curString: "NO/ MORE."
	}
]

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