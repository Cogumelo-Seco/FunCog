export default async({ arrowID, listenerState, readyNote, hold }, state) => {
    let scrollSpeed = state.smallFunctions.getConfig('ScrollSpeed')
    let botResponseTime = state.smallFunctions.getConfig('botResponseTime')

    let arrowsInfo = state[state.musicInfo.playerId == 2 ? 'arrowsInfoOpponent' : 'arrowsInfo']
    let musicNotes = state[state.musicInfo.playerId == 2 ? 'musicOpponentNotes' : 'musicNotes']

    const getHitBoxSize = (arrowID) => arrowsInfo[arrowID]?.height**state.resizeNote*(scrollSpeed > 1 ? scrollSpeed : 1)*(state.musicBPM/130 > 1 ? state.musicBPM/130 : 1)

    let notes = []
    if (!readyNote) for (let i in musicNotes) {
        let n = musicNotes[i]
        if (
            n.arrowID == arrowID && !n.disabled &&
            n.time >= 0 && n.time <= state.music?.currentTime+0.5 &&
            n.Y >= -(getHitBoxSize(n.arrowID)) &&
            n.Y <= (getHitBoxSize(n.arrowID))
        ) {
            n.hitNote = (n.time-state.music?.currentTime)*1000
            notes.push(n)
        }
    }
    /*musicNotes.filter((n) => {
        n.hitNote = (n.time-state.music?.currentTime)*1000
        return n.arrowID == arrowID && !n.disabled &&
        n.time >= 0 && n.time <= state.music?.currentTime+0.5 &&
        n.Y >= -(getHitBoxSize(n.arrowID)) &&
        n.Y <= (getHitBoxSize(n.arrowID))
    })*/

    function noteClick(note) {
        if (!note) return
        let bestNote = note
        if (!readyNote) for (let i in notes) {
            let rating = state.calculateRating(notes[i].hitNote)
            if (!bestNote || rating.media >= bestNote.ratingMedia) {
                bestNote = notes[i]
                bestNote.ratingMedia = rating.media
            }
        }
        if (isNaN(Number(bestNote.hitNote))) bestNote.hitNote = Math.random()*(botResponseTime*2)-botResponseTime

        state.musicEventListener('noteClick', { noteClickAuthor: 'player', note, listenerState }, state)

        note.clicked = true
        arrowsInfo[note.arrowID].splashTime = +new Date()
        arrowsInfo[note.arrowID].splashFrame = 0

        if (note.errorWhenNotClicking) {
            state.musicInfo.health += 2
            state.musicInfo.combo += 1
            if (state.musicInfo.combo >= state.musicInfo.bestCombo) state.musicInfo.bestCombo = state.musicInfo.combo
            listenerState.arrows[arrowID].state = 'onNote'
        }

        if (state.personalizedNotes[note.type]) {
            let pressImage = state.personalizedNotes[note.type].pressImage
            listenerState.arrows[arrowID].state = pressImage || 'onNote'
            arrowsInfo[note.arrowID].splashDir = state.personalizedNotes[note.type].splashDir || state.musicInfo.splashDir
        } else arrowsInfo[note.arrowID].splashDir = state.musicInfo.splashDir

        let rating = state.calculateRating(bestNote.hitNote)
        state.musicInfo.accuracyMedia.push(rating.media)
        state.musicInfo.score += Number.parseInt(state.scoreToAdd*(rating.media/100))
        state.musicInfo.judgements[rating.name] += 1

        if (state.musicInfo.ratings.length > 10) state.musicInfo.ratings.shift()
        state.musicInfo.ratings.push({
            rating,
            hitNote: bestNote.hitNote*-1,
            time: +new Date(),
            defaultTime: +new Date(),
        })

        if (note.hold > 0) {
            let loop = () => {
                if (!listenerState.arrows[arrowID].click || note && note.Y >= ((state.holdHeight**state.resizeNote)*(note.hold/(state.holdHeight))+(state.holdHeight/2*2))) {
                    note.disabled = true
                } else if (!state.music?.paused) {
                    state.musicEventListener('noteClick', { noteClickAuthor: 'player', note, listenerState, hold: true }, state)
                    state.musicInfo.health += 0.2
                    state.musicInfo.score += Number.parseInt((state.scoreToAdd/2)*(rating.media/100))
                    setTimeout(() => loop(), 1000/5)   
                }
            }
            setTimeout(() => loop(), 1000/5)
        }
    }

    //if (notes.length >= Number.parseInt(3*scrollSpeed) || notes.length == Number.parseInt(2*scrollSpeed) && Math.abs(notes[0].time-notes[1].time)*10000 <= 84) {
    if (readyNote) noteClick(readyNote)
    else {
        for (let i in notes) {
            if (!notes[i].errorWhenNotClicking && !notes.find(n => n.errorWhenNotClicking) || notes[i].errorWhenNotClicking) noteClick(notes[i])
        }
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

    if (!readyNote) {
        let notesInScreen = false
        for (let i in musicNotes) {
            let n = musicNotes[i]
            if (n && !n.clicked && !n.disabled && n.Y <= 0 && n.Y >= -(getHitBoxSize(n.arrowID)*3)) {
                notesInScreen = true
            }
        }

        if (!listenerState.pauseGameKeys && !notes[0] && (notesInScreen || !state.smallFunctions.getConfig('GhostTapping'))) {
            state.musicInfo.accuracyMedia.push(1)
            state.musicInfo.misses += 1
            state.musicInfo.score -= Number.parseInt(state.scoreToAdd/2)
            state.musicInfo.health -= 3
            state.musicInfo.combo = 0
        }
    }
}