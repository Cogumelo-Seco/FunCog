export default async (state) => {
    state.splash = {
        default: {
            dir: 'Arrows/splash/Arrow-{{arrowID}}-splash-{{frame}}.png',
            maxFrame: 7
        },
        LNCTBlack: {
            dir: 'Arrows/LNCTBlack/splash/Arrow-{{arrowID}}-splash-{{frame}}.png',
            maxFrame: 10
        },
        LNCTWhite: {
            dir: 'Arrows/LNCTWhite/splash/Arrow-{{arrowID}}-splash-{{frame}}.png',
            maxFrame: 5
        },
        LNCTRed: {
            dir: 'Arrows/LNCTRed/splash/Arrow-{{arrowID}}-splash-{{frame}}.png',
            maxFrame: 7
        },
        BloodSplash: {
            dir: 'Arrows/BloodSplash/splash-{{frame}}.png',
            maxFrame: 4
        }
    }

    return
}