module.exports = async (state) => {
    state.personalizedNotes = {
        hitKillNote:  {
            newArrowImage: `Arrows/deathnotes/Arrow-{{arrowID}}-deathnote-{{frame}}.png`,
            pressImage: `Arrows/deathnotes/Arrow-{{arrowID}}-press-deathnote-{{frame}}.png`
        },
        fireNote: {
            newArrowImage: `Arrows/firenotes/Arrow-{{arrowID}}-firenote-{{frame}}.png`,
            pressImage: `Arrows/deathnotes/Arrow-{{arrowID}}-press-deathnote-{{frame}}.png`
        },
        hurtNote: {
            newArrowImage: `Arrows/hurtnotes/Arrow-{{arrowID}}-hurtnote.png`,
            newHoldImage: `Arrows/hurtnotes/Arrow-hurtnote-hold-piece.png`,
            newHoldEndImage: `Arrows/hurtnotes/Arrow-hurtnote-hold-end.png`
        },
        pinkieSing: {
            newArrowImage: `Arrows/pinkieSing/Arrow-{{arrowID}}-pinkieSing.png`,
            newHoldImage: `Arrows/pinkieSing/Arrow-pinkieSing-hold-piece.png`,
            newHoldEndImage: `Arrows/pinkieSing/Arrow-pinkieSing-hold-end.png`
        }
    }
    
    return state.sounds.length
}