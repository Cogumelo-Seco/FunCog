export default async (state) => {
    state.personalizedNotes = {
        hitKillNote:  {
            newArrowImage: `Arrows/deathnotes/Arrows.png`,
            pressImage: `Arrows/deathnotes/Arrows.png`
        },
        fireNote: {
            newArrowImage: `Arrows/firenotes/Arrows.png`,
            pressImage: `Arrows/deathnotes/Arrows.png`
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
            newArrowImage: `Arrows/staticNotes/Arrow-{{arrowID}}.png`,
        },
        sonicEXEphantomNote: {
            newArrowImage: `Arrows/phantomNotes/Arrow-{{arrowID}}.png`,
        },
        LNCTBlack: {
            newArrowImage: `Arrows/LNCTBlack/Arrows.png`,
            newHoldImage: `Arrows/LNCTBlack/Arrow-hold-piece.png`,
            newHoldEndImage: `Arrows/LNCTBlack/Arrow-hold-end.png`,
            splashDir: 'Arrows/LNCTBlack/splash.png',
            noteShadowColor: 'black',
            noteShadowBlur: 15
        },
        LNCTRed: {
            newArrowImage: `Arrows/LNCTRed/Arrows.png`,
            newHoldImage: `Arrows/LNCTRed/Arrow-hold-piece.png`,
            newHoldEndImage: `Arrows/LNCTRed/Arrow-hold-end.png`,
            splashDir: 'Arrows/LNCTRed/splash.png',
            noteShadowColor: 'red',
            noteShadowBlur: 15
        },
        LNCTWhite: {
            newArrowImage: `Arrows/LNCTWhite/Arrows.png`,
            newHoldImage: `Arrows/LNCTWhite/Arrow-hold-piece.png`,
            newHoldEndImage: `Arrows/LNCTWhite/Arrow-hold-end.png`,
            splashDir: 'Arrows/LNCTWhite/splash.png',
            noteShadowColor: 'white',
            noteShadowBlur: 15,
        },
    }
    
    return state.sounds.length
}