export default async (type, { noteClickAuthor, note, notes, listenerState, difficulty, events }, state) => {
    switch (type) {
		case 'started':
			state.musicInfo.variables = {
				oldBeat: 0,
				oldStep: 0,
			}
			break
        case 'gameLoop':
			var variables = state.musicInfo.variables
			let beat = state.musicBeat
			let step = state.musicStep
			let fast = (beat >= 180 && beat <= 309)

			if (state.screenZoom < (fast ? 30 : 20) && state.camZooming) {
				if (state.musicInfo.variables.oldBeat != beat && (fast ? true : beat%4 == 0)) state.screenZoom = fast ? 30 : 20
			} else if (state.screenZoom <= 0) {
				state.screenZoom = 0
				state.camZooming = true
			} else {
				state.camZooming = false
				state.screenZoom -= fast ? 2 : 1
			}

			variables.oldBeat = beat
			variables.oldStep = step
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
		"steps": [88, 94],
		"curString": "So /cold..."
	},
	{
		"steps": [108, 112, 114, 116, 120, 128],
		"curString": "Why/ is/ it/ so/ cold?"
	},
	{
		"steps": [568, 572, 576, 578, 580, 582, 586, 594],
		"curString": "Get/ away/ from/ me/ you/ freak!"
	},
	{
		"steps": [2064, 2068, 2072, 2078],
		"curString": "Leave/ me/ ALONE!"
	},
	{
		"steps": [2976, 2980, 2988],
		"curString": "What/ the?!"
	},
	{
		"steps": [2991, 2998],
		"curString": "AHH!"
	},
	{
		"steps": [3008, 3088],
		"curString": "*Grey Screaming*"
	}
]