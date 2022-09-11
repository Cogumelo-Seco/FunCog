export default async (state) => {
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
            newArrowImage: `Arrows/sonicEXEStaticNotes/Arrow-{{arrowID}}.png`,
        },
        sonicEXEphantomNote: {
            newArrowImage: `Arrows/sonicEXEphantomNotes/Arrow-{{arrowID}}.png`,
        },
        LNCTBlack: {
            newArrowImage: `Arrows/LNCTBlack/Arrow-{{arrowID}}.png`,
            newHoldImage: `Arrows/LNCTBlack/Arrow-hold-piece.png`,
            newHoldEndImage: `Arrows/LNCTBlack/Arrow-hold-end.png`,
            noteShadowColor: 'black',
            noteShadowBlur: 13
        },
        LNCTRed: {
            newArrowImage: `Arrows/LNCTRed/Arrow-{{arrowID}}.png`,
            newHoldImage: `Arrows/LNCTRed/Arrow-hold-piece.png`,
            newHoldEndImage: `Arrows/LNCTRed/Arrow-hold-end.png`,
            noteShadowColor: 'red',
            noteShadowBlur: 13
        },
        LNCTWhite: {
            newArrowImage: `Arrows/LNCTWhite/Arrow-{{arrowID}}.png`,
            newHoldImage: `Arrows/LNCTWhite/Arrow-hold-piece.png`,
            newHoldEndImage: `Arrows/LNCTWhite/Arrow-hold-end.png`,
            noteShadowColor: 'white',
            noteShadowBlur: 13
        },
    }
    
    return state.sounds.length
}