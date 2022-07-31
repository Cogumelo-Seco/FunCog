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
        hurtNoteSuicidemouse: {
            newArrowImage: `Arrows/hurtnotes-suicidemouse/Arrow-{{arrowID}}-hurtnote.png`,
            newHoldImage: `Arrows/hurtnotes-suicidemouse/Arrow-hurtnote-hold-piece.png`,
            newHoldEndImage: `Arrows/hurtnotes-suicidemouse/Arrow-hurtnote-hold-end.png`
        },
        pinkieSing: {
            newArrowImage: `Arrows/pinkieSing/Arrow-{{arrowID}}-pinkieSing.png`,
            newHoldImage: `Arrows/pinkieSing/Arrow-pinkieSing-hold-piece.png`,
            newHoldEndImage: `Arrows/pinkieSing/Arrow-pinkieSing-hold-end.png`
        },
        sonicEXEStaticNote: {
            newArrowImage: `Arrows/sonicEXEStaticNotes/Arrow-{{arrowID}}-sonicEXEStaticNote.png`,
        },
        sonicEXEphantomNote: {
            newArrowImage: `Arrows/sonicEXEphantomNotes/Arrow-{{arrowID}}-sonicEXEphantomNote.png`,
        },
    }
    
    return state.sounds.length
}