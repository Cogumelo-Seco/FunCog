export default async (state) => {
    state.musics = [
        {
            name: 'Tutorial',
            menuColor: null,
            difficulties: [ 0, 1, 2 ],
            notesImageDir: 'Arrows/',
            mod: 'FNFDefault',
            splashDir: 'Arrows/splash.png',
            splashResize: 1.5,
            toLoad: [
                { dir: 'Musics/musics/tutorial/Inst.ogg' },
            ]
        },
        {
            name: 'Bopeebo',
            menuColor: null,
            difficulties: [ 0, 1, 2 ],
            notesImageDir: 'Arrows/',
            mod: 'FNFDefault',
            splashDir: 'Arrows/splash.png',
            splashResize: 1.5,
            toLoad: [
                { dir: 'Musics/musics/bopeebo/Inst.ogg' },
                { dir: 'Musics/musics/bopeebo/Voices.ogg' },
            ]
        },
        {
            name: 'Dadbattle',
            menuColor: null,
            difficulties: [ 0, 1, 2 ],
            notesImageDir: 'Arrows/',
            mod: 'FNFDefault',
            splashDir: 'Arrows/splash.png',
            splashResize: 1.5,
            toLoad: [
                { dir: 'Musics/musics/dadbattle/Inst.ogg' },
                { dir: 'Musics/musics/dadbattle/Voices.ogg' },
            ]
        },
        {
            name: 'Milf',
            menuColor: null,
            difficulties: [ 0, 1, 2 ],
            notesImageDir: 'Arrows/',
            mod: 'FNFDefault',
            splashDir: 'Arrows/splash.png',
            splashResize: 1.5,
            toLoad: [
                { dir: 'Musics/musics/milf/Inst.ogg' },
                { dir: 'Musics/musics/milf/Voices.ogg' },
            ]
        },
        {
            name: 'Improbable-outset',
            menuColor: 'green',
            difficulties: [ 0, 1, 2 ],
            notesImageDir: 'Arrows/',
            backgroundImage: 'backgrounds/trick.png',
            mod: 'VSTricky',
            toLoad: [
                { dir: 'Musics/musics/improbable-outset/Inst.ogg' },
                { dir: 'Musics/musics/improbable-outset/Voices.ogg' },
            ]
        },
        {
            name: 'Madness',
            menuColor: 'green',
            difficulties: [ 0, 1, 2 ],
            notesImageDir: 'Arrows/',
            backgroundImage: 'backgrounds/trick.png',
            mod: 'VSTricky',
            toLoad: [
                { dir: 'Arrows/firenotes/Arrows.png', animationConfigDir: 'Arrows/firenotes/Arrows.json' },
                { dir: 'Musics/musics/madness/Inst.ogg' },
                { dir: 'Musics/musics/madness/Voices.ogg' },
                { dir: 'Sounds/burnSound.ogg' },
            ]
        },
        {
            name: 'Hellclown',
            menuColor: 'green',
            difficulties: [ 0, 1, 2, 3 ],
            notesImageDir: 'Arrows/',
            backgroundImage: 'backgrounds/hellclown.png',
            mod: 'VSTricky',
            toLoad: [
                { dir: 'Arrows/firenotes/Arrows.png', animationConfigDir: 'Arrows/firenotes/Arrows.json' },
                { dir: 'Musics/musics/hellclown/Inst.ogg' },
                { dir: 'Musics/musics/hellclown/Voices.ogg' },
                { dir: 'Sounds/burnSound.ogg' },
            ]
        },
        {
            name: 'Expurgation',
            menuColor: 'red',
            difficulties: [ 2, 3 ],
            notesImageDir: 'Arrows/',
            backgroundImage: 'backgrounds/expurgation.png',
            mod: 'VSTricky',
            toLoad: [
                { dir: 'Arrows/deathnotes/Arrows.png', animationConfigDir: 'Arrows/deathnotes/Arrows.json' },
                { dir: 'Musics/musics/expurgation/Inst.ogg' },
                { dir: 'Musics/musics/expurgation/Voices.ogg' },
            ]
        },
        {
            name: 'Sarvente-Tutorial-Remix',
            menuColor: 'rgb(255, 43, 234)',
            difficulties: [ 0, 1, 2, 4 ],
            notesImageDir: 'Arrows/',
            backgroundImage: 'backgrounds/mid-fight-masses.png',
            mod: 'MidFightMasses',
            toLoad: [
                { dir: 'Musics/musics/sarvente-tutorial-remix/Inst.ogg' },
                { dir: 'Musics/musics/sarvente-tutorial-remix/Voices.ogg' },
            ]
        },
        {
            name: 'Parish',
            menuColor: 'rgb(255, 43, 234)',
            difficulties: [ 0, 1, 2, 4 ],
            notesImageDir: 'Arrows/',
            backgroundImage: 'backgrounds/mid-fight-masses.png',
            mod: 'MidFightMasses',
            toLoad: [
                { dir: 'Musics/musics/parish/Inst.ogg' },
                { dir: 'Musics/musics/parish/Voices.ogg' },
            ]
        },
        {
            name: 'Worship',
            menuColor: 'rgb(255, 43, 234)',
            difficulties: [ 0, 1, 2, 4 ],
            notesImageDir: 'Arrows/',
            backgroundImage: 'backgrounds/mid-fight-masses.png',
            mod: 'MidFightMasses',
            toLoad: [
                { dir: 'Musics/musics/worship/Inst.ogg' },
                { dir: 'Musics/musics/worship/Voices.ogg' },
            ]
        },
        {
            name: 'Zavodila',
            menuColor: 'grey',
            difficulties: [ 0, 1, 2, 4 ],
            notesImageDir: 'Arrows/',
            backgroundImage: 'backgrounds/mid-fight-masses.png',
            mod: 'MidFightMasses',
            toLoad: [
                { dir: 'Musics/musics/zavodila/Inst.ogg' },
                { dir: 'Musics/musics/zavodila/Voices.ogg' },
            ]
        },
        {
            name: 'Gospel',
            menuColor: 'rgb(255, 43, 234)',
            difficulties: [ 0, 1, 2, 4 ],
            notesImageDir: 'Arrows/sarvente/',
            backgroundImage: 'backgrounds/mid-fight-masses.png',
            mod: 'MidFightMasses',
            toLoad: [
                { dir: 'Musics/musics/gospel/Inst.ogg' },
                { dir: 'Musics/musics/gospel/Voices.ogg' },
            ]
        },
        {
            name: 'Casanova',
            menuColor: 'rgb(255, 43, 234)',
            difficulties: [ 0, 1, 2, 4 ],
            notesImageDir: 'Arrows/',
            backgroundImage: 'backgrounds/mid-fight-masses.png',
            mod: 'MidFightMasses',
            toLoad: [
                { dir: 'Musics/musics/casanova/Inst.ogg' },
                { dir: 'Musics/musics/casanova/Voices.ogg' },
            ]
        },
        {
            name: 'Unhappy',
            menuColor: 'rgb(50, 50, 50)',
            difficulties: [ 0, 1, 2 ],
            notesImageDir: 'Arrows/suicidemouse/',
            backgroundImage: 'backgrounds/suicidemouse.png',
            mod: 'SuicideMouse',
            toLoad: [
                { dir: 'Musics/musics/unhappy/Inst.ogg' },
                { dir: 'Musics/musics/unhappy/Voices.ogg' },
            ]
        },
        {
            name: 'Happy',
            menuColor: 'rgb(50, 50, 50)',
            difficulties: [ 0, 1, 2, 3 ],
            notesImageDir: 'Arrows/suicidemouse/',
            backgroundImage: 'backgrounds/suicidemouse.png',
            mod: 'SuicideMouse',
            toLoad: [
                { dir: 'Musics/musics/happy/Inst.ogg' },
                { dir: 'Musics/musics/happy/Voices.ogg' },
            ]
        },
        {
            name: 'Really-happy',
            menuColor: 'rgb(50, 50, 50)',
            difficulties: [ 0, 1, 2, 3 ],
            notesImageDir: 'Arrows/suicidemouse/',
            backgroundImage: 'backgrounds/suicidemouse.png',
            mod: 'SuicideMouse',
            toLoad: [
                { dir: 'Musics/musics/really-happy/Inst.ogg' },
                { dir: 'Musics/musics/really-happy/Voices.ogg' },
            ]
        },
        {
            name: 'Smile',
            menuColor: 'rgb(50, 50, 50)',
            difficulties: [ 0, 1, 2 ],
            notesImageDir: 'Arrows/suicidemouse/',
            backgroundImage: 'backgrounds/suicidemouse.png',
            mod: 'SuicideMouse',
            toLoad: [
                { dir: 'Musics/musics/smile/Inst.ogg' },
                { dir: 'Musics/musics/smile/Voices.ogg' },
            ]
        },
        {
            name: 'Dusk-till-dawn',
            menuColor: 'rgb(196, 0, 244)',
            difficulties: [ 0, 1, 2 ],
            notesImageDir: 'Arrows/dusk-till-dawn/',
            backgroundImage: 'backgrounds/dusk-till-dawn.png',
            mod: 'DuskTillDawn',
            toLoad: [
                { dir: 'Musics/musics/dusk-till-dawn/Inst.ogg' },
                { dir: 'Musics/musics/dusk-till-dawn/Voices.ogg' },
            ]
        },
        {
            name: 'Sunshine',
            menuColor: null,
            difficulties: [ 0, 1, 2 ],
            notesImageDir: 'Arrows/',
            backgroundImage: 'backgrounds/bob.png',
            mod: 'Bob',
            toLoad: [
                { dir: 'Sounds/Meow.ogg' },
                { dir: 'Sounds/woeM.ogg' },
                { dir: 'Sounds/pop_up.ogg' },
                { dir: 'Musics/musics/sunshine/Inst.ogg' },
                { dir: 'Musics/musics/sunshine/Voices.ogg' },
            ]
        },
        {
            name: 'Withered',
            menuColor: null,
            difficulties: [ 0, 1, 2 ],
            notesImageDir: 'Arrows/',
            backgroundImage: 'backgrounds/bob.png',
            mod: 'Bob',
            toLoad: [
                { dir: 'Musics/musics/withered/Inst.ogg' },
                { dir: 'Musics/musics/withered/Voices.ogg' },
            ]
        },
        {
            name: 'Run',
            menuColor: null,
            difficulties: [ 0, 1, 2 ],
            notesImageDir: 'Arrows/',
            backgroundImage: 'backgrounds/bob.png',
            mod: 'Bob',
            toLoad: [
                { dir: 'Musics/musics/run/Inst.ogg' },
                { dir: 'Musics/musics/run/Voices.ogg' },
            ]
        },
        {
            name: 'Ron',
            menuColor: null,
            difficulties: [ 0, 1, 2 ],
            notesImageDir: 'Arrows/',
            backgroundImage: 'backgrounds/bob.png',
            mod: 'Bob',
            toLoad: [
                { dir: 'Musics/musics/ron/Inst.ogg' },
                { dir: 'Musics/musics/ron/Voices.ogg' },
            ]
        },
        {
            name: 'Trouble',
            menuColor: null,
            difficulties: [ 0, 1, 2 ],
            notesImageDir: 'Arrows/',
            backgroundImage: 'backgrounds/bob.png',
            mod: 'Bob',
            toLoad: [
                { dir: 'Musics/musics/trouble/Inst.ogg' },
                { dir: 'Musics/musics/trouble/Voices.ogg' },
            ]
        },
        {
            name: 'Onslaught',
            menuColor: null,
            difficulties: [ 0, 1, 2, 3 ],
            notesImageDir: 'Arrows/',
            backgroundImage: 'backgrounds/bob.png',
            mod: 'Bob',
            toLoad: [
                { dir: 'Musics/musics/onslaught/Inst.ogg' },
                { dir: 'Musics/musics/onslaught/Voices.ogg' },
            ]
        },
        {
            name: 'Little-man',
            menuColor: null,
            difficulties: [ 0, 1, 2 ],
            notesImageDir: 'Arrows/',
            backgroundImage: 'backgrounds/bob.png',
            mod: 'Bob',
            toLoad: [
                { dir: 'Musics/musics/little-man/Inst.ogg' },
                { dir: 'Musics/musics/little-man/Voices.ogg' },
            ]
        },
        {
            name: 'Carefree',
            menuColor: 'rgb(251, 150, 183)',
            difficulties: [ 0, 1, 2, 5 ],
            notesImageDir: 'Arrows/',
            backgroundImage: 'backgrounds/qt.png',
            mod: 'QT',
            toLoad: [
                { dir: 'Musics/musics/carefree/Inst.ogg' },
                { dir: 'Musics/musics/carefree/Voices.ogg' },
            ]
        },
        {
            name: 'Careless',
            menuColor: 'rgb(251, 150, 183)',
            difficulties: [ 0, 1, 2, 5 ],
            notesImageDir: 'Arrows/',
            backgroundImage: 'backgrounds/qt.png',
            mod: 'QT',
            toLoad: [
                { dir: 'Musics/musics/careless/Inst.ogg' },
                { dir: 'Musics/musics/careless/Voices.ogg' },
            ]
        },
        {
            name: 'Censory-overload',
            menuColor: 'rgb(251, 150, 183)',
            difficulties: [ 0, 1, 2, 5 ],
            notesImageDir: 'Arrows/',
            backgroundImage: 'backgrounds/qt.png',
            mod: 'QT',
            toLoad: [
                { dir: 'Musics/musics/censory-overload/Inst.ogg' },
                { dir: 'Musics/musics/censory-overload/Voices.ogg' },
            ]
        },
        {
            name: 'Termination',
            menuColor: 'rgb(251, 150, 183)',
            difficulties: [ 2, 5, 3 ],
            notesImageDir: 'Arrows/',
            backgroundImage: 'backgrounds/qt.png',
            mod: 'QT',
            toLoad: [
                { dir: 'imgs/QT/pincer-open.png' },
                { dir: 'imgs/QT/pincer-close.png' },
                { dir: 'imgs/QT/alert.png', animationConfigDir: 'imgs/QT/alert.json' },
                { dir: 'Musics/musics/termination/Inst.ogg' },
                { dir: 'Musics/musics/termination/Voices.ogg' },
                { dir: 'Sounds/alert.ogg' },
                { dir: 'Sounds/alertDouble.ogg' },
                { dir: 'Sounds/attack.ogg' },
                { dir: 'Sounds/attack-double.ogg' },
            ]
        },
        {
            name: 'Cessation',
            menuColor: 'rgb(251, 150, 183)',
            difficulties: [ 1 ],
            notesImageDir: 'Arrows/',
            backgroundImage: 'backgrounds/qt.png',
            mod: 'QT',
            toLoad: [
                { dir: 'Musics/musics/cessation/Inst.ogg' },
                { dir: 'Musics/musics/cessation/Voices.ogg' },
            ]
        },
        {
            name: 'Interlope',
            menuColor: 'rgb(251, 150, 183)',
            difficulties: [ 1 ],
            notesImageDir: 'Arrows/',
            backgroundImage: 'backgrounds/qt.png',
            mod: 'QT',
            toLoad: [
                { dir: 'Musics/musics/interlope/Inst.ogg' },
                { dir: 'Musics/musics/interlope/Voices.ogg' },
            ]
        },

        {
            name: 'Too-slow',
            menuColor: 'rgb(0, 0, 110)',
            difficulties: [ 0, 1, 2, 3 ],
            notesImageDir: 'Arrows/',
            backgroundImage: null,
            splashType: 'BloodSplash',
            splashResize: 1,
            mod: 'SonicEXE',
            toLoad: [
                { dir: 'Musics/musics/too-slow/Inst.ogg' },
                { dir: 'Musics/musics/too-slow/Voices.ogg' },
            ]
        },
        {
            name: 'You-cant-run',
            menuColor: 'rgb(0, 0, 110)',
            difficulties: [ 0, 1, 2 ],
            notesImageDir: 'Arrows/',
            backgroundImage: null,
            splashType: 'BloodSplash',
            splashResize: 1,
            mod: 'SonicEXE',
            dev: true,
            toLoad: [
                { dir: 'Musics/musics/you-cant-run/Inst.ogg' },
                { dir: 'Musics/musics/you-cant-run/Voices.ogg' },
            ]
        },
        {
            name: 'Triple-trouble',
            menuColor: 'rgb(0, 0, 110)',
            difficulties: [ 1, 2 ],
            notesImageDir: 'Arrows/',
            backgroundImage: null,
            mod: 'SonicEXE',
            splashType: 'BloodSplash',
            splashResize: 1,
            dev: true,
            toLoad: [
                { dir: 'Musics/musics/triple-trouble/Inst.ogg' },
                { dir: 'Musics/musics/triple-trouble/Voices.ogg' },
            ]
        },
        {
            name: 'Cycles',
            menuColor: 'rgb(0, 0, 110)',
            difficulties: [ 1, 2 ],
            notesImageDir: 'Arrows/',
            backgroundImage: null,
            mod: 'SonicEXE',
            splashType: 'BloodSplash',
            splashResize: 1,
            dev: true,
            toLoad: [
                { dir: 'Musics/musics/cycles/Inst.ogg' },
                { dir: 'Musics/musics/cycles/Voices.ogg' },
            ]
        },
        {
            name: 'Endless',
            menuColor: 'rgb(0, 0, 110)',
            difficulties: [ 2 ],
            notesImageDir: 'Arrows/',
            backgroundImage: null,
            mod: 'SonicEXE',
            toLoad: [
                { dir: 'Musics/musics/endless/Inst.ogg' },
                { dir: 'Musics/musics/endless/Voices.ogg' },
            ]
        },
        {
            name: 'Sunshine',
            menuColor: 'rgb(0, 0, 110)',
            difficulties: [ 2 ],
            notesImageDir: 'Arrows/',
            backgroundImage: null,
            splashType: 'BloodSplash',
            splashResize: 1,
            mod: 'SonicEXE',
            dev: true,
            toLoad: [
                { dir: 'Musics/musics/sunshine/Inst.ogg' },
                { dir: 'Musics/musics/sunshine/Voices.ogg' },
            ]
        },
        {
            name: 'Chaos',
            menuColor: 'rgb(0, 0, 110)',
            difficulties: [ 2 ],
            notesImageDir: 'Arrows/',
            backgroundImage: null,
            splashType: 'BloodSplash',
            splashResize: 1,
            mod: 'SonicEXE',
            dev: true,
            toLoad: [
                { dir: 'Musics/musics/chaos/Inst.ogg' },
                { dir: 'Musics/musics/chaos/Voices.ogg' },
            ]
        },
        {
            name: 'Faker',
            menuColor: 'rgb(0, 0, 110)',
            difficulties: [ 2 ],
            notesImageDir: 'Arrows/',
            backgroundImage: null,
            splashType: 'BloodSplash',
            splashResize: 1,
            mod: 'SonicEXE',
            dev: true,
            toLoad: [
                { dir: 'Musics/musics/faker/Inst.ogg' },
                { dir: 'Musics/musics/faker/Voices.ogg' },
            ]
        },
        {
            name: 'Black-sun',
            menuColor: 'rgb(0, 0, 110)',
            difficulties: [ 2 ],
            notesImageDir: 'Arrows/',
            backgroundImage: null,
            splashType: 'BloodSplash',
            splashResize: 1,
            mod: 'SonicEXE',
            dev: true,
            toLoad: [
                { dir: 'Musics/musics/black-sun/Inst.ogg' },
                { dir: 'Musics/musics/black-sun/Voices.ogg' },
            ]
        },
        {
            name: 'Milk',
            menuColor: 'rgb(0, 0, 110)',
            difficulties: [ 1 ],
            notesImageDir: 'Arrows/',
            backgroundImage: null,
            mod: 'SonicEXE',
            dev: true,
            toLoad: [
                { dir: 'Musics/musics/milk/Inst.ogg' },
                { dir: 'Musics/musics/milk/Voices.ogg' },
            ]
        },
        {
            name: 'Too-fest',
            menuColor: 'rgb(0, 0, 110)',
            difficulties: [ 2 ],
            notesImageDir: 'Arrows/',
            backgroundImage: null,
            splashType: 'BloodSplash',
            splashResize: 1,
            mod: 'SonicEXE',
            dev: true,
            toLoad: [
                { dir: 'Musics/musics/too-fest/Inst.ogg' },
                { dir: 'Musics/musics/too-fest/Voices.ogg' },
            ]
        },
        {
            name: 'Execution',
            menuColor: 'rgb(0, 0, 110)',
            difficulties: [ 0, 1, 2 ],
            notesImageDir: 'Arrows/',
            backgroundImage: null,
            mod: 'SonicEXE',
            dev: true,
            toLoad: [
                { dir: 'Musics/musics/execution/Inst.ogg' },
                { dir: 'Musics/musics/execution/Voices.ogg' },
            ]
        },
        {
            name: 'Azure-encounter',
            menuColor: 'rgb(138, 12, 162)',
            difficulties: [ 0, 1, 2, 3 ],
            notesImageDir: 'Arrows/LNCTNotes/',
            backgroundImage: 'backgrounds/LateNightCityTale.jpg',
            mod: 'LateNightCityTale',
            splashDir: 'Arrows/splash.png',
            splashResize: 2,
            toLoad: [
                { dir: 'imgs/LateNightCityTale/hurt.png' },
                { dir: 'Arrows/LNCTWhite/splash.png', animationConfigDir: 'Arrows/LNCTWhite/splash.json' },
                { dir: 'Arrows/LNCTBlack/splash.png', animationConfigDir: 'Arrows/LNCTBlack/splash.json' },
                { dir: 'Arrows/LNCTRed/splash.png', animationConfigDir: 'Arrows/LNCTRed/splash.json' },
                { dir: 'Arrows/LNCTNotes/Arrows.png', animationConfigDir: 'Arrows/LNCTNotes/Arrows.json' },
                { dir: 'Arrows/LNCTBlack/Arrows.png', animationConfigDir: 'Arrows/LNCTBlack/Arrows.json' },
                { dir: 'Arrows/LNCTRed/Arrows.png', animationConfigDir: 'Arrows/LNCTRed/Arrows.json' },
                { dir: 'Arrows/LNCTWhite/Arrows.png', animationConfigDir: 'Arrows/LNCTWhite/Arrows.json' },
                { dir: 'Musics/musics/azure-encounter/Inst.ogg' },
                { dir: 'Musics/musics/azure-encounter/Voices.ogg' },
                { dir: 'Sounds/LateNightCityTale/blackNote1.ogg' },
                { dir: 'Sounds/LateNightCityTale/blackNote2.ogg' },
                { dir: 'Sounds/LateNightCityTale/heal.ogg' },
            ]
        },
        {
            name: 'Secret-marilee',
            menuColor: 'rgb(138, 12, 162)',
            difficulties: [ 0, 1, 2, 3 ],
            notesImageDir: 'Arrows/LNCTNotes/',
            backgroundImage: 'backgrounds/LateNightCityTale.jpg',
            mod: 'LateNightCityTale',
            splashDir: 'Arrows/splash.png',
            splashResize: 2,
            toLoad: [
                { dir: 'imgs/LateNightCityTale/purple-filter.png' },
                { dir: 'imgs/LateNightCityTale/hurt.png' },
                { dir: 'Arrows/LNCTWhite/splash.png', animationConfigDir: 'Arrows/LNCTWhite/splash.json' },
                { dir: 'Arrows/LNCTBlack/splash.png', animationConfigDir: 'Arrows/LNCTBlack/splash.json' },
                { dir: 'Arrows/LNCTRed/splash.png', animationConfigDir: 'Arrows/LNCTRed/splash.json' },
                { dir: 'Arrows/LNCTNotes/Arrows.png', animationConfigDir: 'Arrows/LNCTNotes/Arrows.json' },
                { dir: 'Arrows/LNCTBlack/Arrows.png', animationConfigDir: 'Arrows/LNCTBlack/Arrows.json' },
                { dir: 'Arrows/LNCTRed/Arrows.png', animationConfigDir: 'Arrows/LNCTRed/Arrows.json' },
                { dir: 'Arrows/LNCTWhite/Arrows.png', animationConfigDir: 'Arrows/LNCTWhite/Arrows.json' },
                { dir: 'Musics/musics/secret-marilee/Inst.ogg' },
                { dir: 'Musics/musics/secret-marilee/Voices.ogg' },
                { dir: 'Sounds/LateNightCityTale/blackNote1.ogg' },
                { dir: 'Sounds/LateNightCityTale/blackNote2.ogg' },
                { dir: 'Sounds/LateNightCityTale/heal.ogg' },
            ]
        },
        {
            name: 'Broken-heart',
            menuColor: 'rgb(138, 12, 162)',
            difficulties: [ 0, 1, 2, 3 ],
            notesImageDir: 'Arrows/LNCTNotes/',
            backgroundImage: 'backgrounds/LateNightCityTale.jpg',
            mod: 'LateNightCityTale',
            splashDir: 'Arrows/splash.png',
            splashResize: 2,
            toLoad: [
                { dir: 'imgs/LateNightCityTale/Broken.png' },
                { dir: 'Arrows/LNCTWhite/splash.png', animationConfigDir: 'Arrows/LNCTWhite/splash.json' },
                { dir: 'Arrows/LNCTBlack/splash.png', animationConfigDir: 'Arrows/LNCTBlack/splash.json' },
                { dir: 'Arrows/LNCTRed/splash.png', animationConfigDir: 'Arrows/LNCTRed/splash.json' },
                { dir: 'Arrows/LNCTNotes/Arrows.png', animationConfigDir: 'Arrows/LNCTNotes/Arrows.json' },
                { dir: 'Arrows/LNCTBlack/Arrows.png', animationConfigDir: 'Arrows/LNCTBlack/Arrows.json' },
                { dir: 'Arrows/LNCTRed/Arrows.png', animationConfigDir: 'Arrows/LNCTRed/Arrows.json' },
                { dir: 'Arrows/LNCTWhite/Arrows.png', animationConfigDir: 'Arrows/LNCTWhite/Arrows.json' },
                { dir: 'Musics/musics/broken-heart/Inst.ogg' },
                { dir: 'Musics/musics/broken-heart/Voices.ogg' },
                { dir: 'Sounds/LateNightCityTale/broken.ogg' },
            ]
        },
        {
            name: 'Aquaphobia',
            menuColor: 'rgb(138, 12, 162)',
            difficulties: [ 0, 1, 2, 3 ],
            notesImageDir: 'Arrows/LNCTNotes/',
            backgroundImage: 'backgrounds/LateNightCityTale.jpg',
            mod: 'LateNightCityTale',
            splashDir: 'Arrows/splash.png',
            splashResize: 2,
            toLoad: [
                { dir: 'imgs/LateNightCityTale/purple-filter.png' },
                { dir: 'imgs/LateNightCityTale/hurt.png' },
                { dir: 'imgs/LateNightCityTale/brokenScreen/whiteScreen.png' },
                { dir: 'imgs/LateNightCityTale/brokenScreen/brokenScreen.png', animationConfigDir: 'imgs/LateNightCityTale/brokenScreen/brokenScreen.json' },
                { dir: 'Arrows/LNCTWhite/splash.png', animationConfigDir: 'Arrows/LNCTWhite/splash.json' },
                { dir: 'Arrows/LNCTBlack/splash.png', animationConfigDir: 'Arrows/LNCTBlack/splash.json' },
                { dir: 'Arrows/LNCTRed/splash.png', animationConfigDir: 'Arrows/LNCTRed/splash.json' },
                { dir: 'Arrows/LNCTNotes/Arrows.png', animationConfigDir: 'Arrows/LNCTNotes/Arrows.json' },
                { dir: 'Arrows/LNCTBlack/Arrows.png', animationConfigDir: 'Arrows/LNCTBlack/Arrows.json' },
                { dir: 'Arrows/LNCTRed/Arrows.png', animationConfigDir: 'Arrows/LNCTRed/Arrows.json' },
                { dir: 'Arrows/LNCTWhite/Arrows.png', animationConfigDir: 'Arrows/LNCTWhite/Arrows.json' },
                { dir: 'Musics/musics/aquaphobia/Inst.ogg' },
                { dir: 'Musics/musics/aquaphobia/Voices.ogg' },
                { dir: 'Sounds/LateNightCityTale/blackNote1.ogg' },
                { dir: 'Sounds/LateNightCityTale/blackNote2.ogg' },
                { dir: 'Sounds/LateNightCityTale/heal.ogg' },
                { dir: 'Sounds/LateNightCityTale/glassBreak1.ogg' },
                { dir: 'Sounds/LateNightCityTale/glassBreak2.ogg' },
            ]
        },
        {
            name: 'Lonely-sapphire',
            menuColor: 'rgb(138, 12, 162)',
            difficulties: [ 0, 1, 2 ],
            notesImageDir: 'Arrows/LNCTNotes/',
            backgroundImage: 'backgrounds/LateNightCityTale.jpg',
            mod: 'LateNightCityTale',
            splashDir: 'Arrows/splash.png',
            splashResize: 2,
            toLoad: [
                { dir: 'Arrows/LNCTWhite/splash.png', animationConfigDir: 'Arrows/LNCTWhite/splash.json' },
                { dir: 'Arrows/LNCTBlack/splash.png', animationConfigDir: 'Arrows/LNCTBlack/splash.json' },
                { dir: 'Arrows/LNCTRed/splash.png', animationConfigDir: 'Arrows/LNCTRed/splash.json' },
                { dir: 'Arrows/LNCTNotes/Arrows.png', animationConfigDir: 'Arrows/LNCTNotes/Arrows.json' },
                { dir: 'Arrows/LNCTBlack/Arrows.png', animationConfigDir: 'Arrows/LNCTBlack/Arrows.json' },
                { dir: 'Arrows/LNCTRed/Arrows.png', animationConfigDir: 'Arrows/LNCTRed/Arrows.json' },
                { dir: 'Arrows/LNCTWhite/Arrows.png', animationConfigDir: 'Arrows/LNCTWhite/Arrows.json' },
                { dir: 'Musics/musics/lonely-sapphire/Inst.ogg' },
                { dir: 'Musics/musics/lonely-sapphire/Voices.ogg' },
            ]
        }
    ]
    
    return state.musics.length
}