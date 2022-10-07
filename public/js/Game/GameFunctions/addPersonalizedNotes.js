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
            newArrowImage: `Arrows/hurtnotes-suicidemouse/Arrows.png`
        },
        pinkieSing: {
            newArrowImage: `Arrows/pinkieSing/Arrows.png`,
            splashDir: 'Arrows/pinkieSing/splash.png',
        },
        sonicEXEStaticNote: {
            newArrowImage: `Arrows/staticNotes/Arrows.png`,
        },
        sonicEXEphantomNote: {
            newArrowImage: `Arrows/phantomNotes/Arrows.png`,
        },
        LNCTBlack: {
            newArrowImage: `Arrows/LNCTBlack/Arrows.png`,
            splashDir: 'Arrows/LNCTBlack/splash.png',
            noteShadowColor: 'black',
            noteShadowBlur: 15
        },
        LNCTRed: {
            newArrowImage: `Arrows/LNCTRed/Arrows.png`,
            splashDir: 'Arrows/LNCTRed/splash.png',
            noteShadowColor: 'red',
            noteShadowBlur: 15
        },
        LNCTWhite: {
            newArrowImage: `Arrows/LNCTWhite/Arrows.png`,
            splashDir: 'Arrows/LNCTWhite/splash.png',
            noteShadowColor: 'white',
            noteShadowBlur: 15,
        },
        WitheredFreddyRemnant: {
            newArrowImage: `Arrows/WitheredFreddyRemnant/Arrows.png`,
        },
        WitheredFreddyCharge: {
            newArrowImage: `Arrows/WitheredFreddyCharge/Arrows.png`,
        },
        WitheredFreddyDanger: {
            newArrowImage: `Arrows/WitheredFreddyDanger/Arrows.png`,
        },
        WitheredFreddyLoose: {
            newArrowImage: `Arrows/WitheredFreddyLoose/Arrows.png`,
        },
        VSChiraMarsh: {
            newArrowImage: `Arrows/VSChiraMarsh/Arrows.png`,
        },
    }
    
    return state.sounds.length
}