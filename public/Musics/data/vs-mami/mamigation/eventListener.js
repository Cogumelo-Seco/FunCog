export default async (type, { noteClickAuthor, note, click, listenerState, difficulty, events, hold }, state) => {
	let shoot = () => {
		state.playSong('Sounds/Mami/MAMI_shoot.ogg', { newSong: true, volume: 0.3 })
		let current = 0
		let loop = () => {
			if (current >= 6) {
				state.screenXMovement = 0
				state.screenYMovement = 0
			} else {
				current += 1
				state.screenXMovement = Number.parseInt(Math.random()*16)-8
				state.screenYMovement = Number.parseInt(Math.random()*16)-8
				setTimeout(loop, 1000/30)
			}
		}
		loop()
	}
    switch (type) {
		case 'passedNote':
			if (note?.type == 'holynote') {
				state.musicInfo.health = state.musicInfo.health-state.musicInfo.variables.holyPower
				state.musicInfo.variables.holyPower += 25
				shoot()
			}
			break
		case 'noteClick':
			if (noteClickAuthor == 'player' && note?.type == 'holynote') shoot()
			break
		case 'loaded':
			state.musicInfo.variables = {
				oldBeat: 0,
				oldStep: 0,
				oldCurrentTime: 0,
				holyPower: 25,
				FPSControlTime: 0
			}
			break
		case 'gameLoop':
			var variables = state.musicInfo.variables
			let beat = state.musicBeat

			if (state.screenZoom < 10 && state.camZooming) {
				if (state.musicInfo.variables.oldBeat != beat && beat%4 == 0) state.screenZoom = 10
			} else if (state.screenZoom <= 0) {
				state.screenZoom = 0
				state.camZooming = true
			} else {
				state.camZooming = false
				state.screenZoom -= 1
			}

			if (beat%15 == 0 && variables.oldBeat != beat && variables.holyPower > 25) variables.holyPower -= 0.5

			state.musicInfo.additionalScreenInfo = `§f§lHOLY POWER: §r§c${variables.holyPower}%`

			let image = state.images['imgs/Mami/pyramid.png']?.image
			if (image && !state.musicInfo.popups['pyramid']) {
				state.musicInfo.popups['pyramid'] = {
					image: `imgs/Mami/pyramid.png`,
					x: state.canvas.width/2-(image.width*1.5/2),
					y: state.canvas.height/2-(image.height*1.5/2),
					alpha: 0,
					width: image.width*1.5,
					height: image.height*1.5
				}
			} else {
				state.musicInfo.popups['pyramid'].x = state.canvas.width/2-(image.width*1.5/2)
				state.musicInfo.popups['pyramid'].y = state.canvas.height/2-(image.height*1.5/2)
			}
			let pyramid = () => {
				if (!state.musicInfo.popups['pyramid'].alpha && (Math.random()*100) <= 2) {
					state.musicInfo.popups['pyramid'].alpha = 1
					state.playSong('Sounds/Chamoy.mp3', { newSong: true })
					setTimeout(() => state.musicInfo.popups['pyramid'].alpha = 0, 500)
				}
			}
			if (beat%100 == 0 && beat != variables.oldBeat) pyramid()

			variables.oldBeat = beat
			break
    }
}