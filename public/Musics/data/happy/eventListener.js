export default async (type, { noteClickAuthor, note, notes, listenerState }, state) => {
    switch (type) {
        case 'noteClick':
            if (noteClickAuthor == 'player' && note?.type != 'normal' && !notes?.find(n => n.errorWhenNotClicking)) {
                note.clicked = true
                state.musicInfo.combo = 0
                state.musicInfo.accuracyMedia.push(1)
                state.musicInfo.misses += 1
                state.musicInfo.score -= 50
                state.musicInfo.health -= 15
            }
            break
        case 'started':
            state.musicInfo.variables = {
                oldCurrentTime: 0
            }
            break
        case 'gameLoop':
            let variables = state.musicInfo.variables
            let currentTime = state.music?.currentTime

            for (let i in events) {
                let event = events[i]

                if (variables.oldCurrentTime*1000 <= event[0] && currentTime*1000 >= event[0]) {
                    let current = 0
                    console.log(event)
                    let interval = setInterval(() => {
                        if (current >= 10) {
                            state.screenXMovement = 0
                            state.screenYMovement = 0
                            state.screenZoom = 0
                            clearInterval(interval)
                        } else {
                            current += 1
                            if (event[1] == 'Screen Shake') {
                                state.screenXMovement = Number.parseInt(Math.random()*20)-10
                                state.screenYMovement = Number.parseInt(Math.random()*20)-10
                            } else if (event[1] == 'Add Camera Zoom') {
                                state.screenZoom += 5
                            } else if (event[1] == 'Add Jumpscare') {
                                state.musicInfo.popups.sadmouseJumpscare = {
                                    image: 'jumpscares/sadmouse-jumpscare.png',
                                    x: 0,
                                    y: 0,
                                    width: state.canvas.width,
                                    height: state.canvas.height,
                                }
                            } else if (event[1] == 'Remove Jumpscare') {
                                delete state.musicInfo.popups.sadmouseJumpscare
                            }
                        }
                    }, 1000/50)
                }
            }

            variables.oldCurrentTime = currentTime
            break
    }
}

let events = [
    [ 60712.5, "Add Jumpscare" ],
    [ 60985.2272727273, "Remove Jumpscare" ],
    [ 60985.2272727273, "Add Camera Zoom" ],
    [ 60940.9090909091, "Add Camera Zoom" ],
    [ 60927.2727272728, "Add Camera Zoom" ],
    [ 60910.2272727273, "Add Camera Zoom" ],
    [ 60893.1818181819, "Add Camera Zoom" ],
    [ 60876.1363636364, "Add Camera Zoom" ],
    [ 60869.3181818182, "Add Camera Zoom" ],
    [ 60855.6818181819, "Add Camera Zoom" ],
    [ 60852.2727272728, "Add Camera Zoom" ],
    [ 60838.6363636364, "Add Camera Zoom" ],
    [ 60818.1818181819, "Add Camera Zoom" ],
    [ 60801.1363636364, "Add Camera Zoom" ],
    [ 60777.2727272728, "Add Camera Zoom" ],
    [ 60770.4545454546, "Add Camera Zoom" ],
    [ 60763.6363636364, "Add Camera Zoom" ],
    [ 60756.8181818182, "Add Camera Zoom" ],
    [ 60746.5909090909, "Add Camera Zoom" ],
    [ 60726.1363636364, "Add Camera Zoom" ],
    [ 60712.5, "Add Camera Zoom" ],
    [ 60695.4545454546, "Add Camera Zoom" ],
    [ 60681.8181818182, "Screen Shake" ],
    [ 61090.9090909091, "Screen Shake" ],
    [ 63272.7272727273, "Screen Shake" ],
    [ 65454.5454545455, "Screen Shake" ],
    [ 67636.3636363637, "Screen Shake" ],
    [ 69818.1818181819, "Screen Shake" ],
    [ 72000, "Screen Shake" ],
    [ 74181.8181818182, "Screen Shake" ],
    [ 76363.6363636364, "Screen Shake" ],
    [ 78545.4545454546, "Screen Shake" ],
    [ 80727.2727272727, "Screen Shake" ],
    [ 82909.0909090909, "Screen Shake" ],
    [ 85090.9090909091, "Screen Shake" ],
    [ 87272.7272727273, "Screen Shake" ],
    [ 89454.5454545454, "Screen Shake" ],
    [ 91636.3636363636, "Screen Shake" ],
    [ 93818.1818181818, "Screen Shake" ]
]