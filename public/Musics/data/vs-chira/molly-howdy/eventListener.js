export default async (type, { noteClickAuthor, note, notes, listenerState, events }, state) => {
    switch (type) {
        case 'noteClick':
            if (noteClickAuthor == 'player' && note?.type == 'VSChiraMarsh') {
                state.musicInfo.health += 25
            }
            if (noteClickAuthor == 'opponent') {
                state.musicInfo.health -= 2
            }
            break
        case 'started':
            state.animations['VSChiraMarsh'] = {
                frame: 0,
                startFrame: 0,
                endFrame: 12,
                totalDalay: 40,
                dalay: 0,
                loop: true
            }

			for (let i in events) {
				let change = events[i]

				state.musicChangeBPM[change.startTime] = state.musicBPM*(change.multiplier+0.3)
			}
            break
        case 'end':
            delete state.animations['VSChiraMarsh']
            break
        case 'gameLoop':
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
            break
    }
}