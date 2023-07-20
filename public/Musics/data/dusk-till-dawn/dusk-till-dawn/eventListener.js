export default async (type, { noteClickAuthor, note, notes, listenerState }, state) => {
    switch (type) {
        case 'noteClick':
            if (note?.type == 'pinkieSing') note.clicked = true
            break
        case 'started':
            state.animations['duskTillDawnScreenRotation'] = {
                frame: 0,
                startFrame: 0,
                endFrame: 50,
                totalDalay: 10,
                dalay: 0,
                boomerang: true,
                boomerangForward: false
            }

            let oldCurrentTime = 0
			let oldBeat = 0
            let loop = setInterval(() => {
				let beat = state.musicBeat

				if (state.screenZoom < 10 && state.camZooming) {
					if (oldBeat != beat && beat%4 == 0) state.screenZoom = 10
				} else if (state.screenZoom <= 0) {
					state.screenZoom = 0
					state.camZooming = true
				} else {
					state.camZooming = false
					state.screenZoom -= 0.5
				}

				try {
					if (beat >= 193 && beat <= 258) state.screenRotation = (state.animations.duskTillDawnScreenRotation.frame/15)-(25/15)
					if (beat >= 258 && beat <= 278 && state.screenRotation != 0) state.screenRotation = state.screenRotation < 0 ? (state.screenRotation.toFixed(1))+0.1 : (state.screenRotation.toFixed(1))-0.1
					if (beat >= 278 && state.screenRotation != 0) state.screenRotation = 0
				} catch {}

                let currentTime = state.music?.currentTime

                for (let i in events) {
                    let event = events[i]

                    if (oldCurrentTime*1000 <= event[0] && currentTime*1000 >= event[0]) {
                        let current = 0
                        let interval = setInterval(() => {
                            if (current >= 5) {
                                state.screenXMovement = 0
                                state.screenYMovement = 0
                                state.screenZoom = 0
                                clearInterval(interval)
                            } else {
                                current += 1
                                if (event[1] == 'Screen Shake' || event[1] == 'Laser') {
                                    state.screenXMovement = Number.parseInt(Math.random()*20)-10
                                    state.screenYMovement = Number.parseInt(Math.random()*20)-10
                                } else if (event[1] == 'Add Camera Zoom') {
                                    state.screenZoom += 5
                                } 
                            }
                        }, 1000/50)
                    }
                }

				oldBeat = beat
                oldCurrentTime = currentTime
                if (state.music?.duration <= state.music?.currentTime || state.gameStage != 'game') {
                    clearInterval(loop)
					state.screenXMovement = 0
                    state.screenYMovement = 0
					state.screenZoom = 0
                    state.screenRotation = 0
                }
            }, 1000/50)
            break
    }
}

let events = [
    [ 20526.3157894737, "Add Camera Zoom" ],
	[ 22736.8421052632, "Add Camera Zoom" ],
	[ 40736.8421052632, "Play Animation" ],
	[ 50526.3157894737, "Change Character" ],
	[ 60947.3684210526, "Add Camera Zoom" ],
	[ 63473.6842105263, "Add Camera Zoom" ],
	[ 66000, "Add Camera Zoom" ],
	[ 68526.3157894736, "Add Camera Zoom" ],
	[ 80999.9999999999, "Play Animation" ],
	[ 83289.4736842104, "Alt Idle Animation" ],
	[ 84947.3684210526, "Change Character" ],
	[ 84960.5263157894, "Change Character" ],
	[ 89368.4210526315, "Play Animation" ],
	[ 89684.2105263157, "Play Animation" ],
	[ 89999.9999999999, "Laser" ],
	[ 90315.7894736841, "Laser" ],
	[ 90631.5789473683, "Laser" ],
	[ 90947.3684210525, "Laser" ],
	[ 91263.1578947368, "Laser" ],
	[ 91578.947368421, "Laser" ],
	[ 91894.7368421052, "Laser" ],
	[ 92052.6315789473, "Laser" ],
	[ 92210.5263157894, "Laser" ],
	[ 92368.4210526315, "Laser" ],
	[ 92842.1052631578, "Laser" ],
	[ 93157.894736842, "Laser" ],
	[ 93473.6842105262, "Laser" ],
	[ 93789.4736842104, "Laser" ],
	[ 94105.2631578946, "Laser" ],
	[ 94342.1052631578, "Play Animation" ],
	[ 99473.6842105262, "Play Animation" ],
	[ 100105.263157895, "Laser" ],
	[ 100263.157894737, "Laser" ],
	[ 100342.105263158, "Laser" ],
	[ 100421.052631579, "Laser" ],
	[ 100578.947368421, "Laser" ],
	[ 100736.842105263, "Laser" ],
	[ 101052.631578947, "Laser" ],
	[ 101131.578947368, "Laser" ],
	[ 101210.526315789, "Laser" ],
	[ 101289.47368421, "Laser" ],
	[ 101368.421052631, "Laser" ],
	[ 101684.210526316, "Laser" ],
	[ 101842.105263158, "Laser" ],
	[ 102157.894736842, "Laser" ],
	[ 102236.842105263, "Laser" ],
	[ 102315.789473684, "Laser" ],
	[ 102631.578947368, "Laser" ],
	[ 102947.368421053, "Laser" ],
	[ 103263.157894737, "Laser" ],
	[ 103578.947368421, "Laser" ],
	[ 104210.526315789, "Laser" ],
	[ 104526.315789474, "Laser" ],
	[ 104842.105263158, "Laser" ],
	[ 104921.052631579, "Laser" ],
	[ 105000, "Laser" ],
	[ 105157.894736842, "Alt Idle Animation" ],
	[ 106421.052631579, "Change Character" ],
	[ 106500, "Change Character" ],
	[ 131052.631578947, "Screen Shake" ],
	[ 131131.578947368, "Add Camera Zoom" ],
	[ 134526.315789474, "Screen Shake" ],
	[ 136973.684210526, "Screen Shake" ],
	[ 140763.157894737, "Screen Shake" ],
	[ 151894.736842105, "Play Animation" ],
	[ 154342.105263158, "Screen Shake" ]
]