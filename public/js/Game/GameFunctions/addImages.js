export default async (state) => {
    state.images = [
        { dir: 'imgs/logo.png' },
        { dir: 'imgs/alert.png' },
        
        /* ---- */

        { dir: 'BongoCat/BongoCat.png', animationConfigDir: 'BongoCat/BongoCat.json' },

        /* ---- */

        { dir: 'imgs/cursor.png' },
        { dir: 'imgs/cursor-hover.png' },
        { dir: 'imgs/BF/Dead.png', animationConfigDir: 'imgs/BF/Dead.json' },

        /* ---- */

        { dir: 'ratings/bad.png' },
        { dir: 'ratings/good.png' },
        { dir: 'ratings/shit.png' },
        { dir: 'ratings/sick.png' },

        /* ---- */

        { dir: 'intro/0.png' },
        { dir: 'intro/1.png' },
        { dir: 'intro/2.png' },
        { dir: 'intro/3.png' },

        /* ---- */

        { dir: 'Arrows/Arrows.png', animationConfigDir: 'Arrows/Arrows.json' },
        { dir: 'Arrows/splash.png', animationConfigDir: 'Arrows/splash.json' },

        /* ---- */

        { dir: 'icons/icon-bf.png' },
        { dir: 'icons/icon-bf-red.png' },
        { dir: 'icons/icon-face.png' },
        { dir: 'icons/BongoCat.png' },
    ]
    
    return state.images.length
}