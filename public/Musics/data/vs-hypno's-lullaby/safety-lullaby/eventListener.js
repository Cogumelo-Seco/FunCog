export default async (type, { noteClickAuthor, note, click, listenerState, difficulty, events }, state) => {
    switch (type) {
		case 'noteClick':
			break
		case 'loaded':
			for (let i in state.arrowsInfo) {
				state.arrowsInfo[i].alpha = 0.8
				state.arrowsInfo[i].noteAlpha = 0.8
				state.arrowsInfo[i].splashAlpha = 0.7

				state.arrowsInfoOpponent[i].alpha = 0.8
				state.arrowsInfoOpponent[i].noteAlpha = 0.8
				state.arrowsInfoOpponent[i].splashAlpha = 0.7
			}
			break
        case 'started':
			state.animations['Pendelum'] = {
                frame: 0,
                startFrame: 0,
                endFrame: 30,
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
				if (variables.oladBeat != beat && beat%4 == 0) state.screenZoom = 10
			} else if (state.screenZoom <= 0) {
				state.screenZoom = 0
				state.camZooming = true
			} else {
				state.camZooming = false
				state.screenZoom -= 1
			}

			if (state.musicInfo.difficulty.name != 'Mania') {
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

				if (step >= 10 && variables.oldStep != step && (step%65 == 0 || variables.oldStep%65 == 0)) {
					if (state.sounds['Sounds/Lullaby/Psyshock.ogg']?.paused && variables.hypnotizationLevel <= variables.hypnotizationLevelMax*0.2) {
						state.sounds['Sounds/Lullaby/Psyshock.ogg'].volume = 1
						state.sounds['Sounds/Lullaby/Psyshock.ogg'].play()

						variables.hypnotizationLevel += variables.hypnotizationLevelMax*0.35
					}
				}
				
				if (!botPlay && variables.pendelumTime+2000 <= +new Date()) {
					variables.hypnotizationLevel += 0.5
				}
				if (botPlay) {
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

let lyrics = [
	{
		"steps": [0],
		"curString": ""
	},
	{
		"steps": [64, 68, 72, 76],
		"curString": "Come, /little /Girl/friend..."
	},
	{
		"steps": [80, 84, 88, 94],
		"curString": "Come /with/ me..."
	},
	{
		"steps": [95, 98, 101, 104, 107, 111, 115, 119, 126],
		"curString": "Boy/friend /is /wai/ting /stea/di/ly!" 
	},
	{
		"steps": [190, 192, 196, 200, 204, 208, 210, 216],
		"curString": "A/lone /at /night, /now /let /us /run..." 
	},
	{
		"steps": [222, 224, 228, 232, 236, 240, 244, 248, 256],
		"curString": "With/ Hyp/no,/ you'll/ have/ so/ much/ fun!" 
	},
	{
		"steps": [320, 324, 328, 332, 336, 340, 344],
		"curString": "Oh/ little/ Girl/friend,/ please/ don't/ cry!" 
	},
	{
		"steps": [352, 356, 360, 367, 373, 376, 384],
		"curString": "Hyp/no/ wouldn't/ hurt/ a/ fly!" 
	},
	{
		"steps": [446, 448, 452, 455, 460, 464, 470],
		"curString": "Your/ fath/er/ clear/ly/ doesn't/ get..."
	},
	{
		"steps": [480, 484, 486, 488, 492, 496, 500, 504, 512],
		"curString": "Deep/ in/ the/ fore/st,/ BF/ I/ met!" 
	},
	{
		"steps": [576, 580, 583, 587, 592, 596, 600],
		"curString": "Oh/ little/ Girl/friend,/ please/ don't/ squirm!" 
	},
	{
		"steps": [606, 608, 612, 614, 620, 624, 628, 632],
		"curString": "Those/ ropes/ I/ know/ will/ hold/ you/ firm..." 
	},
	{
		"steps": [640, 644, 648, 652, 656, 658, 663],
		"curString": "Hyp/no/ tells/ you/ this/ is/ true..." 
	},
	{
		"steps": [670, 672, 676, 680, 685, 688, 694, 696],
		"curString": "But/ sadly,/ Hyp/no/ lied/ to/ you!" 
	},
	{
		"steps": [832, 836, 840, 844, 846, 848, 852, 855],
		"curString": "Oh/ little/ Girl/friend,/ you/ shall/ not/ leave..." 
	},
	{
		"steps": [862, 864, 867, 869, 872, 877, 880, 886, 896],
		"curString": "Your/ fath/er/ for/ you/ will/ never/ grieve!" 
	},
	{
		"steps": [958, 960, 964, 968, 976, 978, 982],
		"curString": "And/ minds/ un/ravel/ at/ the/ seams..." 
	},
	{
		"steps": [990, 999, 1004, 1006, 1012, 1016, 1024],
		"curString": "Allowing/ me/ to/ haunt/ their/ dreams!" 
	},
	{
		"steps": [1088, 1094, 1096, 1103, 1107, 1111],
		"curString": "Sure/ly/ now,/ you/ must/ know..." 
	},
	{
		"steps": [1119, 1121, 1123, 1126, 1132, 1136, 1140, 1144, 1152],
		"curString": "That/ it/ is/ time/ for/ you/ to/ go!" 
	},
	{
		"steps": [1216, 1222, 1225, 1229, 1231, 1233, 1240],
		"curString": "Oh/ little/ Girl/friend,/ you/ weren't/ clever..." 
	},
	{
		"steps": [1248, 1250, 1253, 1258, 1263, 1267, 1271, 1275, 1286],
		"curString": "Re/sist/ing/ me,/ only/ MAKES/ ME/ BITTER." 
	}
]