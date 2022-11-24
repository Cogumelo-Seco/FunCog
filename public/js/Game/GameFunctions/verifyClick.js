export default async({ arrowID, listenerState, bot }, state) => {
    let notes = state.musicNotes.filter((n) => {
        n.hitNote = (n.time-state.music?.currentTime)*1000
        return n.arrowID == arrowID && !n.disabled &&
        n.Y >= -(state.arrowsSize**state.resizeNote) &&
        n.Y <= (state.arrowsSize**state.resizeNote)
    })

    function noteClick(note) {
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

        let rating = state.calculateRating(note.hitNote)
        state.animations.ratingImage.frame = 0
        state.musicInfo.accuracyMedia.push(rating.media)
        state.musicInfo.hitNote = note.hitNote*-1
        state.musicInfo.score += Number((100*(rating.media/100)).toFixed(0))

        if (note.hold > 0) {
            let loop = setInterval(() => {
                if (!listenerState.arrows[arrowID].click || note.Y >= ((state.holdHeight**state.resizeNote)*(note.hold/(state.holdHeight))+(state.holdHeight/2*2))) {
                    note.disabled = true
                    clearInterval(loop)
                } else {
                    state.musicEventListener('noteClick', { noteClickAuthor: 'player', note, listenerState }, state)
                    state.musicInfo.health += 0.2
                    state.musicInfo.score += Number((20*(rating.media/100)).toFixed(0))
                }
            }, 1000/5)
        }
    }

    if (notes.length >= 3) {
        for (let i in notes) {
            if (!notes[i].errorWhenNotClicking && !notes.find(n => n.errorWhenNotClicking) || notes[i].errorWhenNotClicking) noteClick(notes[i])
        }
    } else {
        let note = notes.sort((a, b) => a.hitNote < b.hitNote)[0]
        if (note) noteClick(note)
    }

    
    if (!notes[0] && state.musicNotes.filter((n) => !n.clicked && !n.disabled && n.Y <= 0 && n.Y >= -(state.arrowsSize**state.resizeNote*3))[0]) {
        state.musicInfo.accuracyMedia.push(1)
        state.musicInfo.misses += 1
        state.musicInfo.score -= 50
        state.musicInfo.health -= 3
        state.musicInfo.combo = 0
    }
}