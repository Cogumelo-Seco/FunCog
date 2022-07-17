module.exports = async({ arrowID, listenerState }, state) => {
    let notes = state.musicNotes.filter((n) => {
        n.hitNote = (n.time-state.music?.currentTime)*1000
        return n.arrowID == arrowID && n.errorWhenNotClicking && !n.disabled &&
        n.Y >= -(state.arrowsSize**state.resizeNote*1.5) &&
        n.Y <= (state.arrowsSize**state.resizeNote*1.5) ||
        n.arrowID == arrowID && !n.errorWhenNotClicking && !n.disabled &&
        n.Y >= -(state.arrowsSize**state.resizeNote) &&
        n.Y <= (state.arrowsSize**state.resizeNote)
    })

    for (let i in notes) {
        state.musicEventListener('noteClick', { noteClickAuthor: 'player', note: notes[i], notes, listenerState }, state)

        if (notes[i].type == 'normal') {
            state.musicInfo.health += 2
            state.musicInfo.combo += 1
            listenerState.arrows[arrowID].state = 'onNote'
            notes[i].clicked = true
        }

        if (state.personalizedNotes[notes[i].type]) {
            let pressImage = state.personalizedNotes[notes[i].type].pressImage
            if (pressImage) listenerState.arrows[arrowID].state = pressImage || 'onNote'
        }

        state.animations.ratingImage.frame = 0
        state.musicInfo.accuracyMedia.push(state.calculateRating(notes[i].hitNote).media)
        state.musicInfo.hitNote = notes[i].hitNote*-1
        state.musicInfo.score += state.musicInfo.hitNote > 50 ? 100 : 200

        if (notes[i].hold > 0) {
            let loop = setInterval(() => {
                let note = notes[i]
                
                if (!listenerState.arrows[arrowID].click || note.Y >= ((state.holdHeight**state.resizeNote)*(note.hold/(state.holdHeight))+(state.holdHeight/2*2))) {
                    note.disabled = true
                    clearInterval(loop)
                } else {
                    state.musicInfo.health += 0.2
                    state.musicInfo.score += 20
                }
            }, 1000/10)
        }
    }

    
    if (!notes[0] && state.musicNotes.filter((n) => n.errorWhenNotClicking && !n.clicked && !n.disabled && n.Y <= 0 && n.Y >= -(state.arrowsSize**state.resizeNote*2.5))[0]) {
        state.musicInfo.accuracyMedia.push(1)
        state.musicInfo.misses += 1
        state.musicInfo.score -= 50
        state.musicInfo.health -= 2
        state.musicInfo.combo = 0
    }
}