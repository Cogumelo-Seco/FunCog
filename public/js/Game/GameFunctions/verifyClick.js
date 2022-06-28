module.exports = async({ arrowID, listenerState }, state) => {
    let notes = state.musicNotes.filter((n) => {
        n.hitNote = n.Y//state.downScroll ? n.Y : -(n.Y)//-(state.arrowsSize**state.resizeNote/2)
        /*return n.arrowID == arrowID && !state.downScroll &&
        n.Y <= -(state.arrowsSize**state.resizeNote*1.5) &&
        n.Y >= (state.arrowsSize**state.resizeNote*1.5/2) || 
        n.arrowID == arrowID && state.downScroll &&
        n.Y <= (state.arrowsSize**state.resizeNote*1.5/2) &&
        n.Y >= -(state.arrowsSize**state.resizeNote*1.5)*/
        return n.Y >= -(state.arrowsSize**state.resizeNote*1.5/2) &&
        n.Y <= (state.arrowsSize**state.resizeNote*1.5/2)
    })

    for (let i in notes) {
        listenerState.arrows[arrowID].state = 'onNote'

        state.musicInfo.accuracyMedia.push((state.arrowsSize**state.resizeNote*1.5/2-Math.abs(notes[i].hitNote))/(state.arrowsSize**state.resizeNote*1.5/2)*100)
        state.musicInfo.hitNote = notes[i].hitNote * -1
        state.musicInfo.score += state.musicInfo.hitNote > 15 ? 100 : 200

        notes[i].clicked = true

        let loop = setInterval(() => {
            let note = notes[i]

            if (!listenerState.arrows[arrowID].click) {
                note.disabled = true
                clearInterval(loop)
            } else {
                if (note.hold > 0) {
                    if (note.holdHeight) {
                        if (note.Y >= note.hold * (state.resizeNote-0.1) ** state.resizeNote) clearInterval(loop)

                        state.musicInfo.score += 50
                    }
                }
            }
        }, 1000/10)
    }

    
    if (!notes[0] && state.musicNotes.filter((n) => n.Y <= -100 &&n.Y >= -(window.innerHeight-(state.arrowsSize**state.resizeNote*3)))[0]) {
        state.musicInfo.accuracyMedia.push(1)
        state.musicInfo.misses += 1
    }
}