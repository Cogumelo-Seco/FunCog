export default async (state) => {
    state.images = [
        { dir: 'imgs/logo.png', local: true },
        { dir: 'imgs/alert.png' },
        { dir: 'imgs/check.png', animationConfigDir: 'imgs/check.json' },
        
        /* ---- */

        { dir: 'BongoCat/BongoCat.png', animationConfigDir: 'BongoCat/BongoCat.json' },
        
        /* ---- 

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

        { dir: 'icons/icon-Cogu.png' },
        { dir: 'icons/icon-Guto.png' },
        { dir: 'icons/icon-BongoCat.png' },
    ]
    
    return state.images.length
}