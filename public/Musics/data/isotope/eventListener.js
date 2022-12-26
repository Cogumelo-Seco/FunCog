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
			state.musicInfo.variables = {
				oldBeat: 0,
				oldStep: 0,
				oldCurrentTime: 0
			}
			break
		case 'end':
			break
		case 'gameLoop':
			var variables = state.musicInfo.variables

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
			break
    }
}

let lyrics = [
	{
		"steps": [1872, 1875, 1879, 1885, 1888],
		"curString": "They /took /everything /from /me..."
	},
	{
		"steps": [1895, 1900],
		"curString": "My /VOICE,"
	},
	{
		"steps": [1912, 1918],
		"curString": "My /FREEDOM,"
	},
	{
		"steps": [1932, 1939],
		"curString": "My /LEGACY,"
	},
	{
		"steps": [1952, 1955, 1957, 1963, 1965, 1969],
		"curString": "And/ they /replaced /me /with /some"
	},
	{
		"steps": [1978],
		"curString": "blue..."
	},
	{
		"steps": [1984],
		"curString": "haired..."
	},
	{
		"steps": [1991, 2000],
		"curString": "KID."
	}
]