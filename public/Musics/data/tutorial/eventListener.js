export default async (type, { noteClickAuthor, note, notes, listenerState }, state) => {
    switch (type) {
		case 'loaded':
			break
        case 'started':
			break
		case 'gameLoop':
			let arrowsInfo = state.arrowsInfo
			let currentBeat = state.music.currentTime * (state.musicBPM/60)
			let spinLength = 10
			for (let i in arrowsInfo) {
				let arrowValue = Number(i)+1

				arrowsInfo[i].resetEnable = false
				arrowsInfo[i].rotation = (spinLength / 3) * -Math.sin((currentBeat + arrowValue*0.30) * Math.PI)
				arrowsInfo[i].noteRotation = arrowsInfo[i].rotation
				arrowsInfo[i].X = arrowsInfo[i].defaultX + spinLength * Math.sin((currentBeat + arrowValue*0.30) * Math.PI)
				arrowsInfo[i].Y = arrowsInfo[i].defaultY + spinLength * Math.cos((currentBeat + arrowValue*0.30) * Math.PI)
			}
            break
    }
}