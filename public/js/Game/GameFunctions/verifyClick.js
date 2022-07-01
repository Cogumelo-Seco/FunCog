module.exports = async({ arrowID, listenerState }, state) => {
    let notes = state.musicNotes.filter((n) => {
        n.hitNote = (n.time-state.music?.currentTime)*1000
        return n.arrowID == arrowID && n.type == 'normal' &&
        n.Y >= -(state.arrowsSize**state.resizeNote*1.5) &&
        n.Y <= (state.arrowsSize**state.resizeNote*1.5) ||
        n.arrowID == arrowID && n.type != 'normal' &&
        n.Y >= -(state.arrowsSize**state.resizeNote) &&
        n.Y <= (state.arrowsSize**state.resizeNote)
    })

    for (let i in notes) {
        if (notes[i].type == 'normal') {
            state.musicInfo.health += 2.5
            listenerState.arrows[arrowID].state = 'onNote'
        } else if (!notes.find(n => n.type == 'normal')) {
            listenerState.arrows[arrowID].state = 'onNoteKill'

            switch (notes[i].type) {
                case 'fireNote':
                    state.musicInfo.health -= 20
                    state.playSong('Sounds/burnSound.ogg', { newSong: true })
                    break
                case 'hitKill':
                    state.musicInfo.health = 0
                    break
            }
        }


        if (notes[i].errorWhenClicking) {
            state.musicInfo.accuracyMedia.push(1)
            state.musicInfo.misses += 1
        }
        notes[i].clicked = true

        //state.musicInfo.accuracyMedia.push((state.arrowsSize**state.resizeNote*1.5-Math.abs(notes[i].hitNote))/(state.arrowsSize**state.resizeNote*1.5)*100)
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

    
    if (!notes[0] && state.musicNotes.filter((n) => !n.clicked && n.Y <= 0 && n.Y >= -(state.arrowsSize**state.resizeNote*2.5))[0]) {
        state.musicInfo.accuracyMedia.push(1)
        state.musicInfo.misses += 1
        state.musicInfo.health -= 5
    }
}