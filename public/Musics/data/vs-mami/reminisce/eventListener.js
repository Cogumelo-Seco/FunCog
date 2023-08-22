export default async (type, { noteClickAuthor, note, click, listenerState, difficulty, events, hold }, state) => {
    switch (type) {
		case 'loaded':
			state.musicInfo.variables = {
				oldBeat: 0,
				oldStep: 0,
				oldCurrentTime: 0
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