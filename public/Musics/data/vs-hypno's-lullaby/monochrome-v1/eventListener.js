export default async (type, { noteClickAuthor, note, click, listenerState, difficulty, hold }, state) => {
    switch (type) {
		case 'noteClick':
			if (state.musicInfo.playerId == 2 && noteClickAuthor == 'player' && !hold || state.musicInfo.playerId == 1 && noteClickAuthor == 'opponent' && !hold) {
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

			for (let i in state[state.musicInfo.playerId == 2 ? 'arrowsInfo' : 'arrowsInfoOpponent']) {
				state[state.musicInfo.playerId == 2 ? 'arrowsInfo' : 'arrowsInfoOpponent'][i].alpha = 0
				state[state.musicInfo.playerId == 2 ? 'arrowsInfo' : 'arrowsInfoOpponent'][i].noteAlpha = 0

				state[state.musicInfo.playerId == 2 ? 'arrowsInfoOpponent' : 'arrowsInfo'][i].alpha = 0.8
				state[state.musicInfo.playerId == 2 ? 'arrowsInfoOpponent' : 'arrowsInfo'][i].noteAlpha = 0.8
				state[state.musicInfo.playerId == 2 ? 'arrowsInfoOpponent' : 'arrowsInfo'][i].splashAlpha = 0.7
			}

			break
        case 'started':
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
				jumpscareTime: 0,
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

			if (state.screenZoom < 10 && state.camZooming) {
				if (variables.oldBeat != beat && beat%4 == 0 && currentTime > 13 && currentTime < 144) state.screenZoom = 10
			} else if (state.screenZoom <= 0) {
				state.screenZoom = 0
				state.camZooming = true
			} else {
				state.camZooming = false
				state.screenZoom -= 1
			}

			let imageSpawn = state.images['imgs/VSLullaby/gold.png'].animationConfig['spawn'][state.animations['GoldSpawn'].frame]
			let Xpoint = state.canvas.width*0.49
			let Ypoint = state.canvas.height/2-(imageSpawn.height/2)+imageSpawn.height
			state.musicInfo.popupsBackground.Gold = {
				image: `imgs/VSLullaby/gold.png`,
				animationDir: 'spawn',
				frame: state.animations['GoldSpawn'].frame,
				x: Xpoint-imageSpawn.width/2,
				y: Ypoint-imageSpawn.height,
			}

			if (state.animations['GoldSpawn'].frame == state.animations['GoldSpawn'].endFrame) {
				if (variables.animation != 'idle') {
					let animation = state.animations['GoldNoteIntroOutro'].frame == state.animations['GoldNoteIntroOutro'].endFrame ? state.animations['GoldNote'] : state.animations['GoldNoteIntroOutro']
					let frame = animation.frame
					if (variables.outro) {
						frame = state.animations['GoldNoteIntroOutro'].endFrame-state.animations['GoldNoteIntroOutro'].frame
						if (state.animations['GoldNoteIntroOutro'].frame >= state.animations['GoldNoteIntroOutro'].endFrame) {
							variables.animation = 'idle'
							variables.outro = false
						}
					}
					let imageInfo = JSON.parse(JSON.stringify(state.images['imgs/VSLullaby/gold.png'].animationConfig[variables.animation][frame]))

					switch (variables.animation) {
						case 'left':
							imageInfo.frameX = imageInfo.frameX-200
							break
						case 'right':
							imageInfo.frameX = imageInfo.frameX+200
							break
					}

					if (imageInfo?.name) state.musicInfo.popupsBackground.Gold = {
						image: `imgs/VSLullaby/gold.png`,
						animationDir: variables.animation,
						frame,
						x: Xpoint-imageInfo.width/2+(imageInfo.frameX),
						y: Ypoint-imageInfo.height+(imageInfo.frameY),
						width: imageInfo.frameWidth,
						height: imageInfo.frameHeight
					}
				} else {
					let imageInfo = state.images['imgs/VSLullaby/gold.png'].animationConfig['idle'][state.animations['GoldIdle'].frame]

					if (imageInfo?.name) state.musicInfo.popupsBackground['Gold'] = {
						image: `imgs/VSLullaby/gold.png`,
						animationDir: 'idle',
						frame: state.animations['GoldIdle'].frame,
						x: Xpoint-imageInfo.width/2,
						y: Ypoint-imageInfo.height,
						width: imageInfo.frameWidth,
						height: imageInfo.frameHeight
					}
				}
			}

			state.alphaHUD = state.alphaHUD > 1 ? 1 : state.alphaHUD
			if (variables.HUDFade && state.alphaHUD < 1) state.alphaHUD += 0.02
			else if (state.alphaHUD == 1) variables.HUDFade = false

			let jumpscareElement = document.getElementById('overlayImage')
			if (+new Date()-variables.jumpscareTime >= 450) jumpscareElement.style.display = 'none'
			else {
				let movementX = Math.floor(Math.random()*50)-25
				let movementY = Math.floor(Math.random()*50)-25

				jumpscareElement.src = currentTime >= 150 ? state.images['jumpscares/GoldAltJumpscare.png'].image.src : state.images['jumpscares/GoldJumpscare.png'].image.src
				jumpscareElement.style.display = 'block'
				jumpscareElement.style.transform = `translateX(${movementX}px) translateY(${movementY}px)`
				jumpscareElement.style.width = '150%'
				jumpscareElement.style.height = '150%'
				jumpscareElement.style.left = '-25%'
				jumpscareElement.style.top = '-25%'
			}

			let events = state.musicInfo.events
			for (let i in events) {
                let event = events[i]
				
                if (variables.oldCurrentTime*1000 <= event[0] && currentTime*1000 >= event[0]) {
					if (event[2] == 'Jumpscare' && Math.floor(Math.random()*10) <= Number(event[4] || 10)) variables.jumpscareTime = +new Date()

					if (event[2] == 'Unown' && state.musicInfo.difficulty.id != 3) {
						let percent = Math.floor(Math.random()*100)
						let letters = monochromeTexts.words
						if (percent >= 70 && percent < 85) letters = monochromeTexts.rareWords
						if (percent >= 85 && percent < 96) letters = monochromeTexts.harderWords
						if (percent >= 97) letters = monochromeTexts.impossibleWords
						//variables.monochromeText = letters[Math.floor(Math.random()*letters.length)]
						variables.monochromeText = Math.floor(Math.random()*100) <= 2 ? 'GUTO LINDO' : letters[Math.floor(Math.random()*letters.length)]

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

					if (event[2] == 'HUD Fade') variables.HUDFade = true
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

			if (variables.onWriting) {
				let time = Number.parseInt((variables.onWritingEndTime-+new Date())/1000*4)

				ctx.fillStyle = 'rgba(255, 0, 0, 0.5)'
				ctx.fillRect(0, 0, canvas.width, canvas.height)

				ctx.fillStyle = 'white'
				ctx.font = `bold 25px Arial`
				ctx.fillText(time, canvas.width/2-(ctx.measureText(time).width/2), canvas.height*0.75)

				let text = variables.monochromeText?.toLowerCase() || '??????????????'

				if (text[variables.pastLetters] == ' ') variables.pastLetters += 1

				let key = Object.values(listenerState.keys).find(k => k.key?.toLowerCase() == text[variables.pastLetters])

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