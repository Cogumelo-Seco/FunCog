export default async({ arrowID, listenerState, bot }, state) => {
    let scrollSpeed = state.smallFunctions.getConfig('ScrollSpeed')
    const getHitBoxSize = (arrowID) => scrollSpeed > 1 ? state.arrowsInfo[arrowID]?.height**state.resizeNote*scrollSpeed*(state.musicBPM/150 > 1 ? state.musicBPM/150 : 1) : state.arrowsInfo[arrowID]?.height**state.resizeNote*(state.musicBPM/150 > 1 ? state.musicBPM/150 : 1)

    let notes = state.musicNotes.filter((n) => {
        n.hitNote = (n.time-state.music?.currentTime)*1000
        return n.arrowID == arrowID && !n.disabled &&
        n.Y >= -(getHitBoxSize(n.arrowID)) &&
        n.Y <= (getHitBoxSize(n.arrowID))
    })

    function noteClick(note) {
        if (!note) return
        let bestNote = null
        for (let i in notes) {
            let rating = state.calculateRating(notes[i].hitNote)
            if (!bestNote || rating.media >= bestNote.ratingMedia) {
                bestNote = notes[i]
                bestNote.ratingMedia = rating.media
            }
        }

        state.musicEventListener('noteClick', { noteClickAuthor: 'player', note, listenerState }, state)

        note.clicked = true
        state.arrowsInfo[note.arrowID].splashTime = +new Date()
        state.arrowsInfo[note.arrowID].splashFrame = 0

        if (note.errorWhenNotClicking) {
            state.musicInfo.health += 2
            state.musicInfo.combo += 1
            if (state.musicInfo.combo >= state.musicInfo.bestCombo) state.musicInfo.bestCombo = state.musicInfo.combo
            listenerState.arrows[arrowID].state = 'onNote'
        }

        if (state.personalizedNotes[note.type]) {
            let pressImage = state.personalizedNotes[note.type].pressImage
            listenerState.arrows[arrowID].state = pressImage || 'onNote'
            state.arrowsInfo[note.arrowID].splashDir = state.personalizedNotes[note.type].splashDir || state.musicInfo.splashDir
        } else state.arrowsInfo[note.arrowID].splashDir = state.musicInfo.splashDir

        let rating = state.calculateRating(bestNote.hitNote)
        state.musicInfo.accuracyMedia.push(rating.media)
        state.musicInfo.score += Number.parseInt(state.scoreToAdd*(rating.media/100))
        state.musicInfo.judgements[rating.name] += 1

        state.ratings.unshift({
            rating,
            hitNote: bestNote.hitNote*-1,
            time: +new Date()
        })
        state.ratings.splice(10)

        if (note.hold > 0) {
            let loop = setInterval(() => {
                if (!listenerState.arrows[arrowID].click || note.Y >= ((state.holdHeight**state.resizeNote)*(note.hold/(state.holdHeight))+(state.holdHeight/2*2))) {
                    note.disabled = true
                    clearInterval(loop)
                } else if (!state.music.paused) {
                    state.musicEventListener('noteClick', { noteClickAuthor: 'player', note, listenerState }, state)
                    state.musicInfo.health += 0.2
                    state.musicInfo.score += Number.parseInt((state.scoreToAdd/2)*(rating.media/100))
                }
            }, 1000/5)
        }
    }

    //if (notes.length >= Number.parseInt(3*scrollSpeed) || notes.length == Number.parseInt(2*scrollSpeed) && Math.abs(notes[0].time-notes[1].time)*10000 <= 84) {
        for (let i in notes) {
            if (!notes[i].errorWhenNotClicking && !notes.find(n => n.errorWhenNotClicking) || notes[i].errorWhenNotClicking) noteClick(notes[i])
        }
    /*} else {
        let bestNote = null
        let filtredNotes = notes.filter(n => n.errorWhenNotClicking)
        if (!filtredNotes[0]) filtredNotes = notes
        for (let i in filtredNotes) {
            let rating = state.calculateRating(filtredNotes[i].hitNote)
            if (!bestNote || rating.media >= bestNote.ratingMedia) {
                bestNote = filtredNotes[i]
                bestNote.ratingMedia = rating.media
            }
        }
        noteClick(bestNote)
    }*/

    if (!listenerState.pauseGameKeys && !notes[0] && (state.smallFunctions.getConfig('GhostTapping') ? state.musicNotes.filter((n) => !n.clicked && !n.disabled && n.Y <= 0 && n.Y >= -(getHitBoxSize(n.arrowID)*3))[0] : true)) {
        state.musicInfo.accuracyMedia.push(1)
        state.musicInfo.misses += 1
        state.musicInfo.score -= Number.parseInt(state.scoreToAdd/2)
        state.musicInfo.health -= 3
        state.musicInfo.combo = 0
    }
}