export default async (type, { noteClickAuthor, note, notes, listenerState }, state) => {
	const remantFunction = () => {
		state.musicInfo.variables.remantLevel += 1

		if (state.musicInfo.variables.remantLevel > 0 && state.musicInfo.variables.remantLevel <= 5) {
			state.musicInfo.popups.WitheredFreddyRemnant = {
				image: `imgs/Shadows/remant-${state.musicInfo.variables.remantLevel}.png`,
				x: 0,
				y: 0,
				width: state.canvas.width,
				height: state.canvas.height,
				alpha: state.musicInfo.variables.hurtLevel/3
			}
		} /*if (state.musicInfo.variables.remantLevel >= 6) {
			state.musicInfo.health = -100
		}*/
	}

    switch (type) {
		case 'noteClick':
			if (noteClickAuthor == 'player' && note?.type == 'WitheredFreddyLoose' && !notes?.find(n => n.errorWhenNotClicking)) {
				note.clicked = true
                state.musicInfo.combo = 0
                state.musicInfo.accuracyMedia.push(1)
                state.musicInfo.misses += 1
                state.musicInfo.score -= 50
				state.musicInfo.health -= 10
			}

			if (noteClickAuthor == 'player' && note?.type == 'WitheredFreddyRemnant' && !notes?.find(n => n.errorWhenNotClicking)) {
				//state.playSong(`Sounds/LateNightCityTale/blackNote${Number.parseInt(Math.random()*2)+1}.ogg`, { newSong: true })
				remantFunction()
				note.clicked = true
                state.musicInfo.combo = 0
                state.musicInfo.accuracyMedia.push(1)
                state.musicInfo.misses += 1
                state.musicInfo.score -= 50
				state.musicInfo.health -= 10
			}
			break
		case 'loaded':
			let overlayImageElement = document.getElementById('overlayImage')
			overlayImageElement.src = state.images['imgs/Shadows/lines.png'].image.src
			console.log(state.images['imgs/Shadows/lines.png'].image.src)
			overlayImageElement.style.display = 'block'
			break
        case 'started':
			state.musicInfo.variables = {
				oldCurrentTime: 0,
				oldBeat: 0,
				oldStep: 0,
				remantLevel: 0,
				flash: 0
			}
			break
		case 'gameLoop':
			var variables = state.musicInfo.variables
			let beat = state.musicBeat
			let step = state.musicStep
			let currentTime = state.music?.currentTime

			if (state.screenZoom < 20 && state.camZooming) {
				if (variables.oldBeat != beat && beat%2 == 0) state.screenZoom = 20
			} else if (state.screenZoom <= 0) {
				state.screenZoom = 0
				state.camZooming = true
			} else {
				state.camZooming = false
				state.screenZoom -= 2
			}

			let flashData = [ 50, 59, 67, 84, 102, 134, 168, 202, 236, 253, 269, 286, 320, 328, 337, 345, 354, 362, 371, 388, 396, 404, 413, 421, 430, 438, 455, 471, 488, 505, 573, 589, 606, 623, 639, 640, 775, 780, 808, 817, 825, 834, 851, 859, 876, 884, 893, 901, 910, 919, 927 ]
			if (Math.floor(variables.oldStep*0.47) != Math.floor(step*0.47) && flashData.includes(Math.floor(step*0.47))) variables.flash = 1

			if (variables.flash > 0) variables.flash -= 0.02
			if (variables.flash <= 0) variables.flash = 0

			let backgroundImage = 'Shadows-1'
			if (Math.floor(currentTime) % 5 == 0) backgroundImage = 'Shadows-1'
			else if (Math.floor(currentTime) % 5 == 1) backgroundImage = 'Shadows-2'
			else if (Math.floor(currentTime) % 5 == 2) backgroundImage = 'Shadows-3'
			else if (Math.floor(currentTime) % 5 == 3) backgroundImage = 'Shadows-4'
			else if (Math.floor(currentTime) % 5 == 4) backgroundImage = 'Shadows-5'

			state.musicInfo.backgroundImage = `backgrounds/${backgroundImage}.png`

			variables.oldBeat = beat
			variables.oldStep = step
			variables.oldCurrentTime = currentTime
            break
		case 'gameLoopFullFPS':
			var variables = state.musicInfo.variables

			let canvas = state.canvas
			let ctx = canvas.getContext('2d')

			ctx.fillStyle = `rgba(255, 255, 255, ${variables.flash})`
			ctx.fillRect(0, 0, canvas.width, canvas.height)
    }
}