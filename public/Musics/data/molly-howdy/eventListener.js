export default async (type, { noteClickAuthor, note, notes, listenerState, events }, state) => {
    switch (type) {
        case 'noteClick':
            if (noteClickAuthor == 'player' && note?.type == 'VSChiraMarsh') {
                state.musicInfo.health += 25
            }
            if (noteClickAuthor == 'opponent') {
                state.musicInfo.health -= 3
            }
            break
        case 'started':
			for (let i in events) {
				let change = events[i]

				state.musicChangeBPM[change.startTime] = state.musicBPM*(change.multiplier+0.3)
			}

            let loop = setInterval(() => {
                for (let i in state.arrowsInfo) {
                    state.arrowsInfo[i].resetEnable = false
                    state.arrowsInfo[i].Y = state.arrowsInfo[i].defaultY+(Math.random()*2-1)
                    state.arrowsInfo[i].X = state.arrowsInfo[i].defaultX+(Math.random()*2-1)
                }
                for (let i in state.arrowsInfoOpponent) {
                    state.arrowsInfoOpponent[i].resetEnable = false
                    state.arrowsInfoOpponent[i].Y = state.arrowsInfoOpponent[i].defaultY+(Math.random()*2-1)
                    state.arrowsInfoOpponent[i].X = state.arrowsInfoOpponent[i].defaultX+(Math.random()*2-1)
                }

                if (state.music?.duration <= state.music?.currentTime || state.gameStage != 'game') {
                    clearInterval(loop)
                }
            }, 1000/30)
            break
    }
}