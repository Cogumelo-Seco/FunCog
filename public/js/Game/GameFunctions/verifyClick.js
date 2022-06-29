module.exports = async({ arrowID, listenerState }, state) => {
    let notes = state.musicNotes.filter((n) => {
        n.hitNote = n.Y//state.downScroll ? n.Y : -(n.Y)//-(state.arrowsSize**state.resizeNote/2)
        return n.arrowID == arrowID && n.type == 'normal' &&
        n.Y >= -(state.arrowsSize**state.resizeNote*(state.musicBPM/100)/2) &&
        n.Y <= (state.arrowsSize**state.resizeNote*(state.musicBPM/100)/2) ||
        n.arrowID == arrowID && n.type != 'normal' &&
        n.Y >= -(state.arrowsSize**state.resizeNote*0.5) &&
        n.Y <= (state.arrowsSize**state.resizeNote*0.5)
    })

    for (let i in notes) {
        if (notes[i].type == 'normal') listenerState.arrows[arrowID].state = 'onNote'
        else {
            listenerState.arrows[arrowID].state = 'onNoteKill'
            alert('Morreu clico na seta errada')
        }


        if (notes[i].errorWhenClicking) {
            state.musicInfo.accuracyMedia.push(1)
            state.musicInfo.misses += 1
        }
        notes[i].clicked = true

        state.musicInfo.accuracyMedia.push((state.arrowsSize**state.resizeNote*(state.musicBPM/100)/2-Math.abs(notes[i].hitNote))/(state.arrowsSize**state.resizeNote*(state.musicBPM/100)/2)*100)
        state.musicInfo.hitNote = notes[i].hitNote * -1
        state.musicInfo.score += state.musicInfo.hitNote > 25 ? 100 : 200

        if (notes[i].hold > 0) {
            let loop = setInterval(() => {
                let note = notes[i]
                
                if (!listenerState.arrows[arrowID].click || note.Y >= ((state.holdHeight**state.resizeNote)*(note.hold/(state.holdHeight))+(state.holdHeight/2))) {
                    note.disabled = true
                    clearInterval(loop)
                } else state.musicInfo.score += 20
            }, 1000/10)
        }
    }

    
    if (!notes[0] && state.musicNotes.filter((n) => n.Y <= state.arrowsSize**state.resizeNote*1.5 && n.Y >= -(state.arrowsSize**state.resizeNote*1.5))[0]) {
        state.musicInfo.accuracyMedia.push(1)
        state.musicInfo.misses += 1
    }
}