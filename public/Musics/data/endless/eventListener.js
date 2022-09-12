export default async (type, { noteClickAuthor, note, notes, listenerState, difficulty, events }, state) => {
    switch (type) {
        case 'started':
			let oldStep = 0
            let loop = setInterval(() => {
				let beat = state.musicBeat
				let step = state.musicStep

				if (state.screenZoom < 20 && state.camZooming) {
					if (beat%4 == 0) state.screenZoom = 20
				} else if (state.screenZoom <= 0) {
					state.screenZoom = 0
					state.camZooming = true
				} else {
					state.camZooming = false
					state.screenZoom -= 2
				}

				if (step >= 888 && oldStep <= 888) {
					for (let i in state.arrowsInfo) {
						state.arrowsInfo[i].alpha = 0
						state.arrowsInfo[i].noteAlpha = 0
					}
					for (let i in state.arrowsInfoOpponent) {
						state.arrowsInfoOpponent[i].alpha = 0
						state.arrowsInfoOpponent[i].noteAlpha = 0
					}
					state.screenZoom = 80
					setTimeout(() => state.screenZoom -= 10, 100)

					let image = state.images['imgs/sonicEXE/three.png']
					state.musicInfo.popups.sonicEXEEndlessCounter = {
						image: `imgs/sonicEXE/three.png`,
						x: state.canvas.width/2-(image.width/2),
						y: state.canvas.height/2-(image.height/2),
					}
				}
				if (step >= 891 && oldStep <= 891) {
					state.screenZoom = 100
					setTimeout(() => state.screenZoom -= 20, 100)

					let image = state.images['imgs/sonicEXE/two.png']
					state.musicInfo.popups.sonicEXEEndlessCounter = {
						image: `imgs/sonicEXE/two.png`,
						x: state.canvas.width/2-(image.width/2),
						y: state.canvas.height/2-(image.height/2),
					}
				}
				if (step >= 896 && oldStep <= 896) {
					state.screenZoom = 100
					setTimeout(() => state.screenZoom -= 20, 100)
					state.musicInfo.notesImageDir = 'Arrows/sonicEXEMajinNotes/'

					let image = state.images['imgs/sonicEXE/one.png']
					state.musicInfo.popups.sonicEXEEndlessCounter = {
						image: `imgs/sonicEXE/one.png`,
						x: state.canvas.width/2-(image.width/2),
						y: state.canvas.height/2-(image.height/2),
					}
				}
				if (step >= 899 && oldStep <= 899) {
					state.screenZoom = 100
					setTimeout(() => state.screenZoom -= 20, 100)

					let image = state.images['imgs/sonicEXE/go.png']
					state.musicInfo.popups.sonicEXEEndlessCounter = {
						image: `imgs/sonicEXE/go.png`,
						x: state.canvas.width/2-(image.width/2),
						y: state.canvas.height/2-(image.height/2),
					}
				}

				if (step >= 902 && oldStep <= 902) {
					delete state.musicInfo.popups.sonicEXEEndlessCounter
					for (let i in state.arrowsInfo) {
						state.arrowsInfo[i].alpha = 1
						state.arrowsInfo[i].noteAlpha = 1
					}
					for (let i in state.arrowsInfoOpponent) {
						state.arrowsInfoOpponent[i].alpha = 1
						state.arrowsInfoOpponent[i].noteAlpha = 1
					}
				}

				let spinArray = [
					272, 276, 336, 340, 400, 404, 464, 468, 528, 532, 592, 596, 656, 660, 720, 724, 784, 788, 848, 852, 912, 916, 976, 980, 1040, 1044, 1104, 1108,
					1424, 1428, 1488, 1492, 1552, 1556, 1616, 1620
				];

				for (let i of spinArray) {
					if (step >= i && oldStep <= i) state.IsNoteSpinning = true
				}
				
				if (state.IsNoteSpinning) for (let i in state.arrowsInfo) {
					state.arrowsInfo[i].rotation += 60
					if (state.arrowsInfo[i].rotation >= 360) {
						state.IsNoteSpinning = false
						state.arrowsInfo[i].rotation = 0
					}
				}

				oldStep = step
                if (state.music?.duration <= state.music?.currentTime || state.gameStage != 'game') {
                    clearInterval(loop)
					state.screenZoom = 0
                }
            }, 1000/30)
            break
    }
}