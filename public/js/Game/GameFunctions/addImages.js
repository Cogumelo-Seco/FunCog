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
        { dir: 'icons/icon-face.png' },
        { dir: 'icons/BongoCat.png' },

        
        /*
        'imgs/LateNightCityTale/hurt.png',
        'imgs/LateNightCityTale/Broken.png',
        'imgs/LateNightCityTale/purple-filter.png',

        'imgs/LateNightCityTale/brokenScreen/brokenScreen-0.png',
        'imgs/LateNightCityTale/brokenScreen/brokenScreen-1.png',
        'imgs/LateNightCityTale/brokenScreen/brokenScreen-2.png',
        'imgs/LateNightCityTale/brokenScreen/brokenScreen-3.png',
        'imgs/LateNightCityTale/brokenScreen/brokenScreen-4.png',
        'imgs/LateNightCityTale/brokenScreen/brokenScreen-5.png',
        'imgs/LateNightCityTale/brokenScreen/brokenScreen-6.png',
        'imgs/LateNightCityTale/brokenScreen/brokenScreen-7.png',
        'imgs/LateNightCityTale/brokenScreen/brokenScreen-8.png',
        'imgs/LateNightCityTale/brokenScreen/brokenScreen-9.png',
        'imgs/LateNightCityTale/brokenScreen/brokenScreen-10.png',
        'imgs/LateNightCityTale/brokenScreen/brokenScreen-11.png',
        'imgs/LateNightCityTale/brokenScreen/brokenScreen-12.png',
        'imgs/LateNightCityTale/brokenScreen/brokenScreen-13.png',
        'imgs/LateNightCityTale/brokenScreen/brokenScreen-14.png',
        'imgs/LateNightCityTale/brokenScreen/brokenScreen-15.png',
        'imgs/LateNightCityTale/brokenScreen/brokenScreen-16.png',
        'imgs/LateNightCityTale/brokenScreen/brokenScreen-17.png',
        'imgs/LateNightCityTale/brokenScreen/brokenScreen-18.png',
        'imgs/LateNightCityTale/brokenScreen/brokenScreen-19.png',
        'imgs/LateNightCityTale/brokenScreen/brokenScreen-20.png',
        'imgs/LateNightCityTale/brokenScreen/brokenScreen-21.png',



        'imgs/sonicEXE/three.png',
        'imgs/sonicEXE/two.png',
        'imgs/sonicEXE/one.png',
        'imgs/sonicEXE/go.png',



        'icons/icon-bf.png',
        'icons/icon-face.png',
        'icons/BongoCat.png',

        

        'Arrows/BloodSplash/splash-0.png',
        'Arrows/BloodSplash/splash-1.png',
        'Arrows/BloodSplash/splash-2.png',
        'Arrows/BloodSplash/splash-3.png',
        'Arrows/BloodSplash/splash-4.png',

               

        'Arrows/LNCTNotes/Arrow-0.png',
        'Arrows/LNCTNotes/Arrow-0-note.png',
        'Arrows/LNCTNotes/Arrow-0-press-0.png',
        'Arrows/LNCTNotes/Arrow-0-press-1.png',
        'Arrows/LNCTNotes/Arrow-0-press-2.png',
        'Arrows/LNCTNotes/Arrow-0-press-0-no.png',
        'Arrows/LNCTNotes/Arrow-0-press-1-no.png',
        'Arrows/LNCTNotes/Arrow-0-hold-piece.png',
        'Arrows/LNCTNotes/Arrow-0-hold-end.png',

        'Arrows/LNCTNotes/Arrow-1.png',
        'Arrows/LNCTNotes/Arrow-1-note.png',
        'Arrows/LNCTNotes/Arrow-1-press-0.png',
        'Arrows/LNCTNotes/Arrow-1-press-1.png',
        'Arrows/LNCTNotes/Arrow-1-press-2.png',
        'Arrows/LNCTNotes/Arrow-1-press-0-no.png',
        'Arrows/LNCTNotes/Arrow-1-press-1-no.png',
        'Arrows/LNCTNotes/Arrow-1-hold-piece.png',
        'Arrows/LNCTNotes/Arrow-1-hold-end.png',
        
        'Arrows/LNCTNotes/Arrow-2.png',
        'Arrows/LNCTNotes/Arrow-2-note.png',
        'Arrows/LNCTNotes/Arrow-2-press-0.png',
        'Arrows/LNCTNotes/Arrow-2-press-1.png',
        'Arrows/LNCTNotes/Arrow-2-press-2.png',
        'Arrows/LNCTNotes/Arrow-2-press-0-no.png',
        'Arrows/LNCTNotes/Arrow-2-press-1-no.png',
        'Arrows/LNCTNotes/Arrow-2-hold-piece.png',
        'Arrows/LNCTNotes/Arrow-2-hold-end.png',

        'Arrows/LNCTNotes/Arrow-3.png',
        'Arrows/LNCTNotes/Arrow-3-note.png',
        'Arrows/LNCTNotes/Arrow-3-press-0.png',
        'Arrows/LNCTNotes/Arrow-3-press-1.png',
        'Arrows/LNCTNotes/Arrow-3-press-2.png',
        'Arrows/LNCTNotes/Arrow-3-press-0-no.png',
        'Arrows/LNCTNotes/Arrow-3-press-1-no.png',
        'Arrows/LNCTNotes/Arrow-3-hold-piece.png',
        'Arrows/LNCTNotes/Arrow-3-hold-end.png',

           

        'Arrows/sonicEXEMajinNotes/Arrow-0.png',
        'Arrows/sonicEXEMajinNotes/Arrow-0-note.png',
        'Arrows/sonicEXEMajinNotes/Arrow-0-press-0.png',
        'Arrows/sonicEXEMajinNotes/Arrow-0-press-1.png',
        'Arrows/sonicEXEMajinNotes/Arrow-0-press-2.png',
        'Arrows/sonicEXEMajinNotes/Arrow-0-press-0-no.png',
        'Arrows/sonicEXEMajinNotes/Arrow-0-press-1-no.png',
        'Arrows/sonicEXEMajinNotes/Arrow-0-hold-piece.png',
        'Arrows/sonicEXEMajinNotes/Arrow-0-hold-end.png',

        'Arrows/sonicEXEMajinNotes/Arrow-1.png',
        'Arrows/sonicEXEMajinNotes/Arrow-1-note.png',
        'Arrows/sonicEXEMajinNotes/Arrow-1-press-0.png',
        'Arrows/sonicEXEMajinNotes/Arrow-1-press-1.png',
        'Arrows/sonicEXEMajinNotes/Arrow-1-press-2.png',
        'Arrows/sonicEXEMajinNotes/Arrow-1-press-0-no.png',
        'Arrows/sonicEXEMajinNotes/Arrow-1-press-1-no.png',
        'Arrows/sonicEXEMajinNotes/Arrow-1-hold-piece.png',
        'Arrows/sonicEXEMajinNotes/Arrow-1-hold-end.png',
        
        'Arrows/sonicEXEMajinNotes/Arrow-2.png',
        'Arrows/sonicEXEMajinNotes/Arrow-2-note.png',
        'Arrows/sonicEXEMajinNotes/Arrow-2-press-0.png',
        'Arrows/sonicEXEMajinNotes/Arrow-2-press-1.png',
        'Arrows/sonicEXEMajinNotes/Arrow-2-press-2.png',
        'Arrows/sonicEXEMajinNotes/Arrow-2-press-0-no.png',
        'Arrows/sonicEXEMajinNotes/Arrow-2-press-1-no.png',
        'Arrows/sonicEXEMajinNotes/Arrow-2-hold-piece.png',
        'Arrows/sonicEXEMajinNotes/Arrow-2-hold-end.png',

        'Arrows/sonicEXEMajinNotes/Arrow-3.png',
        'Arrows/sonicEXEMajinNotes/Arrow-3-note.png',
        'Arrows/sonicEXEMajinNotes/Arrow-3-press-0.png',
        'Arrows/sonicEXEMajinNotes/Arrow-3-press-1.png',
        'Arrows/sonicEXEMajinNotes/Arrow-3-press-2.png',
        'Arrows/sonicEXEMajinNotes/Arrow-3-press-0-no.png',
        'Arrows/sonicEXEMajinNotes/Arrow-3-press-1-no.png',
        'Arrows/sonicEXEMajinNotes/Arrow-3-hold-piece.png',
        'Arrows/sonicEXEMajinNotes/Arrow-3-hold-end.png',

        

        'Arrows/splash/Arrow-0-splash-0.png',
        'Arrows/splash/Arrow-0-splash-1.png',
        'Arrows/splash/Arrow-0-splash-2.png',
        'Arrows/splash/Arrow-0-splash-3.png',
        'Arrows/splash/Arrow-0-splash-4.png',
        'Arrows/splash/Arrow-0-splash-5.png',
        'Arrows/splash/Arrow-0-splash-6.png',
        'Arrows/splash/Arrow-0-splash-7.png',

        'Arrows/splash/Arrow-1-splash-0.png',
        'Arrows/splash/Arrow-1-splash-1.png',
        'Arrows/splash/Arrow-1-splash-2.png',
        'Arrows/splash/Arrow-1-splash-3.png',
        'Arrows/splash/Arrow-1-splash-4.png',
        'Arrows/splash/Arrow-1-splash-5.png',
        'Arrows/splash/Arrow-1-splash-6.png',
        'Arrows/splash/Arrow-1-splash-7.png',

        'Arrows/splash/Arrow-2-splash-0.png',
        'Arrows/splash/Arrow-2-splash-1.png',
        'Arrows/splash/Arrow-2-splash-2.png',
        'Arrows/splash/Arrow-2-splash-3.png',
        'Arrows/splash/Arrow-2-splash-4.png',
        'Arrows/splash/Arrow-2-splash-5.png',
        'Arrows/splash/Arrow-2-splash-6.png',
        'Arrows/splash/Arrow-2-splash-7.png',

        'Arrows/splash/Arrow-3-splash-0.png',
        'Arrows/splash/Arrow-3-splash-1.png',
        'Arrows/splash/Arrow-3-splash-2.png',
        'Arrows/splash/Arrow-3-splash-3.png',
        'Arrows/splash/Arrow-3-splash-4.png',
        'Arrows/splash/Arrow-3-splash-5.png',
        'Arrows/splash/Arrow-3-splash-6.png',
        'Arrows/splash/Arrow-3-splash-7.png',

        'Arrows/Arrow-0.png',
        'Arrows/Arrow-0-note.png',
        'Arrows/Arrow-0-press-0.png',
        'Arrows/Arrow-0-press-1.png',
        'Arrows/Arrow-0-press-2.png',
        'Arrows/Arrow-0-press-0-no.png',
        'Arrows/Arrow-0-press-1-no.png',
        'Arrows/Arrow-0-hold-piece.png',
        'Arrows/Arrow-0-hold-end.png',

        'Arrows/Arrow-1.png',
        'Arrows/Arrow-1-note.png',
        'Arrows/Arrow-1-press-0.png',
        'Arrows/Arrow-1-press-1.png',
        'Arrows/Arrow-1-press-2.png',
        'Arrows/Arrow-1-press-0-no.png',
        'Arrows/Arrow-1-press-1-no.png',
        'Arrows/Arrow-1-hold-piece.png',
        'Arrows/Arrow-1-hold-end.png',
        
        'Arrows/Arrow-2.png',
        'Arrows/Arrow-2-note.png',
        'Arrows/Arrow-2-press-0.png',
        'Arrows/Arrow-2-press-1.png',
        'Arrows/Arrow-2-press-2.png',
        'Arrows/Arrow-2-press-0-no.png',
        'Arrows/Arrow-2-press-1-no.png',
        'Arrows/Arrow-2-hold-piece.png',
        'Arrows/Arrow-2-hold-end.png',

        'Arrows/Arrow-3.png',
        'Arrows/Arrow-3-note.png',
        'Arrows/Arrow-3-press-0.png',
        'Arrows/Arrow-3-press-1.png',
        'Arrows/Arrow-3-press-2.png',
        'Arrows/Arrow-3-press-0-no.png',
        'Arrows/Arrow-3-press-1-no.png',
        'Arrows/Arrow-3-hold-piece.png',
        'Arrows/Arrow-3-hold-end.png',

        

        'Arrows/sarvente/Arrow-0.png',
        'Arrows/sarvente/Arrow-0-note.png',
        'Arrows/sarvente/Arrow-0-press-0.png',
        'Arrows/sarvente/Arrow-0-press-1.png',
        'Arrows/sarvente/Arrow-0-press-2.png',
        'Arrows/sarvente/Arrow-0-press-0-no.png',
        'Arrows/sarvente/Arrow-0-press-1-no.png',
        'Arrows/sarvente/Arrow-0-hold-piece.png',
        'Arrows/sarvente/Arrow-0-hold-end.png',

        'Arrows/sarvente/Arrow-1.png',
        'Arrows/sarvente/Arrow-1-note.png',
        'Arrows/sarvente/Arrow-1-press-0.png',
        'Arrows/sarvente/Arrow-1-press-1.png',
        'Arrows/sarvente/Arrow-1-press-2.png',
        'Arrows/sarvente/Arrow-1-press-0-no.png',
        'Arrows/sarvente/Arrow-1-press-1-no.png',
        'Arrows/sarvente/Arrow-1-hold-piece.png',
        'Arrows/sarvente/Arrow-1-hold-end.png',
        
        'Arrows/sarvente/Arrow-2.png',
        'Arrows/sarvente/Arrow-2-note.png',
        'Arrows/sarvente/Arrow-2-press-0.png',
        'Arrows/sarvente/Arrow-2-press-1.png',
        'Arrows/sarvente/Arrow-2-press-2.png',
        'Arrows/sarvente/Arrow-2-press-0-no.png',
        'Arrows/sarvente/Arrow-2-press-1-no.png',
        'Arrows/sarvente/Arrow-2-hold-piece.png',
        'Arrows/sarvente/Arrow-2-hold-end.png',

        'Arrows/sarvente/Arrow-3.png',
        'Arrows/sarvente/Arrow-3-note.png',
        'Arrows/sarvente/Arrow-3-press-0.png',
        'Arrows/sarvente/Arrow-3-press-1.png',
        'Arrows/sarvente/Arrow-3-press-2.png',
        'Arrows/sarvente/Arrow-3-press-0-no.png',
        'Arrows/sarvente/Arrow-3-press-1-no.png',
        'Arrows/sarvente/Arrow-3-hold-piece.png',
        'Arrows/sarvente/Arrow-3-hold-end.png',

          

        'Arrows/suicidemouse/Arrow-0.png',
        'Arrows/suicidemouse/Arrow-0-note.png',
        'Arrows/suicidemouse/Arrow-0-press-0.png',
        'Arrows/suicidemouse/Arrow-0-press-1.png',
        'Arrows/suicidemouse/Arrow-0-press-2.png',
        'Arrows/suicidemouse/Arrow-0-press-0-no.png',
        'Arrows/suicidemouse/Arrow-0-press-1-no.png',
        'Arrows/suicidemouse/Arrow-0-hold-piece.png',
        'Arrows/suicidemouse/Arrow-0-hold-end.png',

        'Arrows/suicidemouse/Arrow-1.png',
        'Arrows/suicidemouse/Arrow-1-note.png',
        'Arrows/suicidemouse/Arrow-1-press-0.png',
        'Arrows/suicidemouse/Arrow-1-press-1.png',
        'Arrows/suicidemouse/Arrow-1-press-2.png',
        'Arrows/suicidemouse/Arrow-1-press-0-no.png',
        'Arrows/suicidemouse/Arrow-1-press-1-no.png',
        'Arrows/suicidemouse/Arrow-1-hold-piece.png',
        'Arrows/suicidemouse/Arrow-1-hold-end.png',
        
        'Arrows/suicidemouse/Arrow-2.png',
        'Arrows/suicidemouse/Arrow-2-note.png',
        'Arrows/suicidemouse/Arrow-2-press-0.png',
        'Arrows/suicidemouse/Arrow-2-press-1.png',
        'Arrows/suicidemouse/Arrow-2-press-2.png',
        'Arrows/suicidemouse/Arrow-2-press-0-no.png',
        'Arrows/suicidemouse/Arrow-2-press-1-no.png',
        'Arrows/suicidemouse/Arrow-2-hold-piece.png',
        'Arrows/suicidemouse/Arrow-2-hold-end.png',

        'Arrows/suicidemouse/Arrow-3.png',
        'Arrows/suicidemouse/Arrow-3-note.png',
        'Arrows/suicidemouse/Arrow-3-press-0.png',
        'Arrows/suicidemouse/Arrow-3-press-1.png',
        'Arrows/suicidemouse/Arrow-3-press-2.png',
        'Arrows/suicidemouse/Arrow-3-press-0-no.png',
        'Arrows/suicidemouse/Arrow-3-press-1-no.png',
        'Arrows/suicidemouse/Arrow-3-hold-piece.png',
        'Arrows/suicidemouse/Arrow-3-hold-end.png',

        

        'Arrows/dusk-till-dawn/Arrow-0.png',
        'Arrows/dusk-till-dawn/Arrow-0-note.png',
        'Arrows/dusk-till-dawn/Arrow-0-press-0.png',
        'Arrows/dusk-till-dawn/Arrow-0-press-1.png',
        'Arrows/dusk-till-dawn/Arrow-0-press-2.png',
        'Arrows/dusk-till-dawn/Arrow-0-press-0-no.png',
        'Arrows/dusk-till-dawn/Arrow-0-press-1-no.png',
        'Arrows/dusk-till-dawn/Arrow-0-hold-piece.png',
        'Arrows/dusk-till-dawn/Arrow-0-hold-end.png',

        'Arrows/dusk-till-dawn/Arrow-1.png',
        'Arrows/dusk-till-dawn/Arrow-1-note.png',
        'Arrows/dusk-till-dawn/Arrow-1-press-0.png',
        'Arrows/dusk-till-dawn/Arrow-1-press-1.png',
        'Arrows/dusk-till-dawn/Arrow-1-press-2.png',
        'Arrows/dusk-till-dawn/Arrow-1-press-0-no.png',
        'Arrows/dusk-till-dawn/Arrow-1-press-1-no.png',
        'Arrows/dusk-till-dawn/Arrow-1-hold-piece.png',
        'Arrows/dusk-till-dawn/Arrow-1-hold-end.png',
        
        'Arrows/dusk-till-dawn/Arrow-2.png',
        'Arrows/dusk-till-dawn/Arrow-2-note.png',
        'Arrows/dusk-till-dawn/Arrow-2-press-0.png',
        'Arrows/dusk-till-dawn/Arrow-2-press-1.png',
        'Arrows/dusk-till-dawn/Arrow-2-press-2.png',
        'Arrows/dusk-till-dawn/Arrow-2-press-0-no.png',
        'Arrows/dusk-till-dawn/Arrow-2-press-1-no.png',
        'Arrows/dusk-till-dawn/Arrow-2-hold-piece.png',
        'Arrows/dusk-till-dawn/Arrow-2-hold-end.png',

        'Arrows/dusk-till-dawn/Arrow-3.png',
        'Arrows/dusk-till-dawn/Arrow-3-note.png',
        'Arrows/dusk-till-dawn/Arrow-3-press-0.png',
        'Arrows/dusk-till-dawn/Arrow-3-press-1.png',
        'Arrows/dusk-till-dawn/Arrow-3-press-2.png',
        'Arrows/dusk-till-dawn/Arrow-3-press-0-no.png',
        'Arrows/dusk-till-dawn/Arrow-3-press-1-no.png',
        'Arrows/dusk-till-dawn/Arrow-3-hold-piece.png',
        'Arrows/dusk-till-dawn/Arrow-3-hold-end.png',

        

        'Arrows/deathnotes/Arrow-0-deathnote-0.png',
        'Arrows/deathnotes/Arrow-0-deathnote-1.png',
        'Arrows/deathnotes/Arrow-0-deathnote-2.png',
        'Arrows/deathnotes/Arrow-0-deathnote-3.png',
        'Arrows/deathnotes/Arrow-0-deathnote-4.png',
        'Arrows/deathnotes/Arrow-0-deathnote-5.png',
        'Arrows/deathnotes/Arrow-0-deathnote-6.png',
        'Arrows/deathnotes/Arrow-0-deathnote-6.png',
        'Arrows/deathnotes/Arrow-0-press-deathnote-0.png',
        'Arrows/deathnotes/Arrow-0-press-deathnote-1.png',
        'Arrows/deathnotes/Arrow-0-press-deathnote-2.png',

        'Arrows/deathnotes/Arrow-1-deathnote-0.png',
        'Arrows/deathnotes/Arrow-1-deathnote-1.png',
        'Arrows/deathnotes/Arrow-1-deathnote-2.png',
        'Arrows/deathnotes/Arrow-1-deathnote-3.png',
        'Arrows/deathnotes/Arrow-1-deathnote-4.png',
        'Arrows/deathnotes/Arrow-1-deathnote-5.png',
        'Arrows/deathnotes/Arrow-1-deathnote-6.png',
        'Arrows/deathnotes/Arrow-1-deathnote-6.png',
        'Arrows/deathnotes/Arrow-1-press-deathnote-0.png',
        'Arrows/deathnotes/Arrow-1-press-deathnote-1.png',
        'Arrows/deathnotes/Arrow-1-press-deathnote-2.png',

        'Arrows/deathnotes/Arrow-2-deathnote-0.png',
        'Arrows/deathnotes/Arrow-2-deathnote-1.png',
        'Arrows/deathnotes/Arrow-2-deathnote-2.png',
        'Arrows/deathnotes/Arrow-2-deathnote-3.png',
        'Arrows/deathnotes/Arrow-2-deathnote-4.png',
        'Arrows/deathnotes/Arrow-2-deathnote-5.png',
        'Arrows/deathnotes/Arrow-2-deathnote-6.png',
        'Arrows/deathnotes/Arrow-2-deathnote-6.png',
        'Arrows/deathnotes/Arrow-2-press-deathnote-0.png',
        'Arrows/deathnotes/Arrow-2-press-deathnote-1.png',
        'Arrows/deathnotes/Arrow-2-press-deathnote-2.png',

        'Arrows/deathnotes/Arrow-3-deathnote-0.png',
        'Arrows/deathnotes/Arrow-3-deathnote-1.png',
        'Arrows/deathnotes/Arrow-3-deathnote-2.png',
        'Arrows/deathnotes/Arrow-3-deathnote-3.png',
        'Arrows/deathnotes/Arrow-3-deathnote-4.png',
        'Arrows/deathnotes/Arrow-3-deathnote-5.png',
        'Arrows/deathnotes/Arrow-3-deathnote-6.png',
        'Arrows/deathnotes/Arrow-3-deathnote-6.png',
        'Arrows/deathnotes/Arrow-3-press-deathnote-0.png',
        'Arrows/deathnotes/Arrow-3-press-deathnote-1.png',
        'Arrows/deathnotes/Arrow-3-press-deathnote-2.png',

        

        'Arrows/firenotes/Arrow-0-firenote-0.png',
        'Arrows/firenotes/Arrow-0-firenote-1.png',
        'Arrows/firenotes/Arrow-0-firenote-2.png',
        'Arrows/firenotes/Arrow-0-firenote-3.png',
        'Arrows/firenotes/Arrow-0-firenote-4.png',
        'Arrows/firenotes/Arrow-0-firenote-5.png',
        'Arrows/firenotes/Arrow-0-firenote-6.png',
        'Arrows/firenotes/Arrow-0-firenote-7.png',
        'Arrows/firenotes/Arrow-0-firenote-8.png',
        'Arrows/firenotes/Arrow-0-firenote-9.png',
        'Arrows/firenotes/Arrow-0-firenote-10.png',
        'Arrows/firenotes/Arrow-0-firenote-11.png',

        'Arrows/firenotes/Arrow-1-firenote-0.png',
        'Arrows/firenotes/Arrow-1-firenote-1.png',
        'Arrows/firenotes/Arrow-1-firenote-2.png',
        'Arrows/firenotes/Arrow-1-firenote-3.png',
        'Arrows/firenotes/Arrow-1-firenote-4.png',
        'Arrows/firenotes/Arrow-1-firenote-5.png',
        'Arrows/firenotes/Arrow-1-firenote-6.png',
        'Arrows/firenotes/Arrow-1-firenote-7.png',
        'Arrows/firenotes/Arrow-1-firenote-8.png',
        'Arrows/firenotes/Arrow-1-firenote-9.png',
        'Arrows/firenotes/Arrow-1-firenote-10.png',
        'Arrows/firenotes/Arrow-1-firenote-11.png',

        'Arrows/firenotes/Arrow-2-firenote-0.png',
        'Arrows/firenotes/Arrow-2-firenote-1.png',
        'Arrows/firenotes/Arrow-2-firenote-2.png',
        'Arrows/firenotes/Arrow-2-firenote-3.png',
        'Arrows/firenotes/Arrow-2-firenote-4.png',
        'Arrows/firenotes/Arrow-2-firenote-5.png',
        'Arrows/firenotes/Arrow-2-firenote-6.png',
        'Arrows/firenotes/Arrow-2-firenote-7.png',
        'Arrows/firenotes/Arrow-2-firenote-8.png',
        'Arrows/firenotes/Arrow-2-firenote-9.png',
        'Arrows/firenotes/Arrow-2-firenote-10.png',
        'Arrows/firenotes/Arrow-2-firenote-11.png',

        'Arrows/firenotes/Arrow-3-firenote-0.png',
        'Arrows/firenotes/Arrow-3-firenote-1.png',
        'Arrows/firenotes/Arrow-3-firenote-2.png',
        'Arrows/firenotes/Arrow-3-firenote-3.png',
        'Arrows/firenotes/Arrow-3-firenote-4.png',
        'Arrows/firenotes/Arrow-3-firenote-5.png',
        'Arrows/firenotes/Arrow-3-firenote-6.png',
        'Arrows/firenotes/Arrow-3-firenote-7.png',
        'Arrows/firenotes/Arrow-3-firenote-8.png',
        'Arrows/firenotes/Arrow-3-firenote-9.png',
        'Arrows/firenotes/Arrow-3-firenote-10.png',
        'Arrows/firenotes/Arrow-3-firenote-11.png',

        

        'Arrows/hurtnotes-suicidemouse/Arrow-0-hurtnote.png',
        'Arrows/hurtnotes-suicidemouse/Arrow-1-hurtnote.png',
        'Arrows/hurtnotes-suicidemouse/Arrow-2-hurtnote.png',
        'Arrows/hurtnotes-suicidemouse/Arrow-3-hurtnote.png',
        'Arrows/hurtnotes-suicidemouse/Arrow-hurtnote-hold-piece.png',
        'Arrows/hurtnotes-suicidemouse/Arrow-hurtnote-hold-end.png',

        

        'Arrows/pinkieSing/Arrow-0-pinkieSing.png',
        'Arrows/pinkieSing/Arrow-1-pinkieSing.png',
        'Arrows/pinkieSing/Arrow-2-pinkieSing.png',
        'Arrows/pinkieSing/Arrow-3-pinkieSing.png',
        'Arrows/pinkieSing/Arrow-pinkieSing-hold-piece.png',
        'Arrows/pinkieSing/Arrow-pinkieSing-hold-end.png',

        

        'Arrows/staticNotes/Arrow-0.png',
        'Arrows/staticNotes/Arrow-1.png',
        'Arrows/staticNotes/Arrow-2.png',
        'Arrows/staticNotes/Arrow-3.png',

        

        'Arrows/phantomNotes/Arrow-0.png',
        'Arrows/phantomNotes/Arrow-1.png',
        'Arrows/phantomNotes/Arrow-2.png',
        'Arrows/phantomNotes/Arrow-3.png',

        

        'Arrows/LNCTBlack/splash/Arrow-0-splash-0.png',
        'Arrows/LNCTBlack/splash/Arrow-0-splash-1.png',
        'Arrows/LNCTBlack/splash/Arrow-0-splash-2.png',
        'Arrows/LNCTBlack/splash/Arrow-0-splash-3.png',
        'Arrows/LNCTBlack/splash/Arrow-0-splash-4.png',
        'Arrows/LNCTBlack/splash/Arrow-0-splash-5.png',
        'Arrows/LNCTBlack/splash/Arrow-0-splash-6.png',
        'Arrows/LNCTBlack/splash/Arrow-0-splash-7.png',
        'Arrows/LNCTBlack/splash/Arrow-0-splash-8.png',
        'Arrows/LNCTBlack/splash/Arrow-0-splash-9.png',
        'Arrows/LNCTBlack/splash/Arrow-0-splash-10.png',

        'Arrows/LNCTBlack/splash/Arrow-1-splash-0.png',
        'Arrows/LNCTBlack/splash/Arrow-1-splash-1.png',
        'Arrows/LNCTBlack/splash/Arrow-1-splash-2.png',
        'Arrows/LNCTBlack/splash/Arrow-1-splash-3.png',
        'Arrows/LNCTBlack/splash/Arrow-1-splash-4.png',
        'Arrows/LNCTBlack/splash/Arrow-1-splash-5.png',
        'Arrows/LNCTBlack/splash/Arrow-1-splash-6.png',
        'Arrows/LNCTBlack/splash/Arrow-1-splash-7.png',
        'Arrows/LNCTBlack/splash/Arrow-1-splash-8.png',
        'Arrows/LNCTBlack/splash/Arrow-1-splash-9.png',
        'Arrows/LNCTBlack/splash/Arrow-1-splash-10.png',

        'Arrows/LNCTBlack/splash/Arrow-2-splash-0.png',
        'Arrows/LNCTBlack/splash/Arrow-2-splash-1.png',
        'Arrows/LNCTBlack/splash/Arrow-2-splash-2.png',
        'Arrows/LNCTBlack/splash/Arrow-2-splash-3.png',
        'Arrows/LNCTBlack/splash/Arrow-2-splash-4.png',
        'Arrows/LNCTBlack/splash/Arrow-2-splash-5.png',
        'Arrows/LNCTBlack/splash/Arrow-2-splash-6.png',
        'Arrows/LNCTBlack/splash/Arrow-2-splash-7.png',
        'Arrows/LNCTBlack/splash/Arrow-2-splash-8.png',
        'Arrows/LNCTBlack/splash/Arrow-2-splash-9.png',
        'Arrows/LNCTBlack/splash/Arrow-2-splash-10.png',

        'Arrows/LNCTBlack/splash/Arrow-3-splash-0.png',
        'Arrows/LNCTBlack/splash/Arrow-3-splash-1.png',
        'Arrows/LNCTBlack/splash/Arrow-3-splash-2.png',
        'Arrows/LNCTBlack/splash/Arrow-3-splash-3.png',
        'Arrows/LNCTBlack/splash/Arrow-3-splash-4.png',
        'Arrows/LNCTBlack/splash/Arrow-3-splash-5.png',
        'Arrows/LNCTBlack/splash/Arrow-3-splash-6.png',
        'Arrows/LNCTBlack/splash/Arrow-3-splash-7.png',
        'Arrows/LNCTBlack/splash/Arrow-3-splash-8.png',
        'Arrows/LNCTBlack/splash/Arrow-3-splash-9.png',
        'Arrows/LNCTBlack/splash/Arrow-3-splash-10.png',

        'Arrows/LNCTBlack/Arrow-0.png',
        'Arrows/LNCTBlack/Arrow-1.png',
        'Arrows/LNCTBlack/Arrow-2.png',
        'Arrows/LNCTBlack/Arrow-3.png',
        'Arrows/LNCTBlack/Arrow-hold-piece.png',
        'Arrows/LNCTBlack/Arrow-hold-end.png',

        

        'Arrows/LNCTRed/splash/Arrow-0-splash-0.png',
        'Arrows/LNCTRed/splash/Arrow-0-splash-1.png',
        'Arrows/LNCTRed/splash/Arrow-0-splash-2.png',
        'Arrows/LNCTRed/splash/Arrow-0-splash-3.png',
        'Arrows/LNCTRed/splash/Arrow-0-splash-4.png',
        'Arrows/LNCTRed/splash/Arrow-0-splash-5.png',

        'Arrows/LNCTRed/splash/Arrow-1-splash-0.png',
        'Arrows/LNCTRed/splash/Arrow-1-splash-1.png',
        'Arrows/LNCTRed/splash/Arrow-1-splash-2.png',
        'Arrows/LNCTRed/splash/Arrow-1-splash-3.png',
        'Arrows/LNCTRed/splash/Arrow-1-splash-4.png',
        'Arrows/LNCTRed/splash/Arrow-1-splash-5.png',

        'Arrows/LNCTRed/splash/Arrow-2-splash-0.png',
        'Arrows/LNCTRed/splash/Arrow-2-splash-1.png',
        'Arrows/LNCTRed/splash/Arrow-2-splash-2.png',
        'Arrows/LNCTRed/splash/Arrow-2-splash-3.png',
        'Arrows/LNCTRed/splash/Arrow-2-splash-4.png',
        'Arrows/LNCTRed/splash/Arrow-2-splash-5.png',

        'Arrows/LNCTRed/splash/Arrow-3-splash-0.png',
        'Arrows/LNCTRed/splash/Arrow-3-splash-1.png',
        'Arrows/LNCTRed/splash/Arrow-3-splash-2.png',
        'Arrows/LNCTRed/splash/Arrow-3-splash-3.png',
        'Arrows/LNCTRed/splash/Arrow-3-splash-4.png',
        'Arrows/LNCTRed/splash/Arrow-3-splash-5.png',

        'Arrows/LNCTRed/Arrow-0.png',
        'Arrows/LNCTRed/Arrow-1.png',
        'Arrows/LNCTRed/Arrow-2.png',
        'Arrows/LNCTRed/Arrow-3.png',
        'Arrows/LNCTRed/Arrow-hold-piece.png',
        'Arrows/LNCTRed/Arrow-hold-end.png',

    

        'Arrows/LNCTWhite/splash/Arrow-0-splash-0.png',
        'Arrows/LNCTWhite/splash/Arrow-0-splash-1.png',
        'Arrows/LNCTWhite/splash/Arrow-0-splash-2.png',
        'Arrows/LNCTWhite/splash/Arrow-0-splash-3.png',
        'Arrows/LNCTWhite/splash/Arrow-0-splash-4.png',
        'Arrows/LNCTWhite/splash/Arrow-0-splash-5.png',

        'Arrows/LNCTWhite/splash/Arrow-1-splash-0.png',
        'Arrows/LNCTWhite/splash/Arrow-1-splash-1.png',
        'Arrows/LNCTWhite/splash/Arrow-1-splash-2.png',
        'Arrows/LNCTWhite/splash/Arrow-1-splash-3.png',
        'Arrows/LNCTWhite/splash/Arrow-1-splash-4.png',
        'Arrows/LNCTWhite/splash/Arrow-1-splash-5.png',

        'Arrows/LNCTWhite/splash/Arrow-2-splash-0.png',
        'Arrows/LNCTWhite/splash/Arrow-2-splash-1.png',
        'Arrows/LNCTWhite/splash/Arrow-2-splash-2.png',
        'Arrows/LNCTWhite/splash/Arrow-2-splash-3.png',
        'Arrows/LNCTWhite/splash/Arrow-2-splash-4.png',
        'Arrows/LNCTWhite/splash/Arrow-2-splash-5.png',

        'Arrows/LNCTWhite/splash/Arrow-3-splash-0.png',
        'Arrows/LNCTWhite/splash/Arrow-3-splash-1.png',
        'Arrows/LNCTWhite/splash/Arrow-3-splash-2.png',
        'Arrows/LNCTWhite/splash/Arrow-3-splash-3.png',
        'Arrows/LNCTWhite/splash/Arrow-3-splash-4.png',
        'Arrows/LNCTWhite/splash/Arrow-3-splash-5.png',

        'Arrows/LNCTWhite/Arrow-0.png',
        'Arrows/LNCTWhite/Arrow-1.png',
        'Arrows/LNCTWhite/Arrow-2.png',
        'Arrows/LNCTWhite/Arrow-3.png',
        'Arrows/LNCTWhite/Arrow-hold-piece.png',
        'Arrows/LNCTWhite/Arrow-hold-end.png',

        

        'BF/BF Dead Loop0000.png',
        'BF/BF Dead Loop0001.png',
        'BF/BF Dead Loop0002.png',
        'BF/BF Dead Loop0003.png',
        'BF/BF Dead Loop0004.png',
        'BF/BF Dead Loop0005.png',



        'jumpscares/sadmouse-jumpscare-0.png',
        'jumpscares/sadmouse-jumpscare-1.png',
        'jumpscares/sadmouse-jumpscare-2.png',

        

        'jumpscares/sonicEXESimpleJump.png',

        

        'jumpscares/sonicJumpscares/sonicJumpscare-0.png',
        'jumpscares/sonicJumpscares/sonicJumpscare-1.png',
        'jumpscares/sonicJumpscares/sonicJumpscare-2.png',
        'jumpscares/sonicJumpscares/sonicJumpscare-3.png',
        'jumpscares/sonicJumpscares/sonicJumpscare-4.png',
        'jumpscares/sonicJumpscares/sonicJumpscare-5.png',
        'jumpscares/sonicJumpscares/sonicJumpscare-6.png',
        'jumpscares/sonicJumpscares/sonicJumpscare-7.png',
        'jumpscares/sonicJumpscares/sonicJumpscare-8.png',
        'jumpscares/sonicJumpscares/sonicJumpscare-9.png',
        'jumpscares/sonicJumpscares/sonicJumpscare-10.png',
        'jumpscares/sonicJumpscares/sonicJumpscare-11.png',
        'jumpscares/sonicJumpscares/sonicJumpscare-12.png',
        'jumpscares/sonicJumpscares/sonicJumpscare-13.png',
        'jumpscares/sonicJumpscares/sonicJumpscare-14.png',
        'jumpscares/sonicJumpscares/sonicJumpscare-15.png',
        'jumpscares/sonicJumpscares/sonicJumpscare-16.png',
        'jumpscares/sonicJumpscares/sonicJumpscare-17.png',
        'jumpscares/sonicJumpscares/sonicJumpscare-18.png',
        'jumpscares/sonicJumpscares/sonicJumpscare-19.png',
        'jumpscares/sonicJumpscares/sonicJumpscare-20.png',

        

        'bob-PopUps/popup1.png',
        'bob-PopUps/popup2.png',
        'bob-PopUps/popup3.png',
        'bob-PopUps/popup4.png',
        'bob-PopUps/popup5.png',
        'bob-PopUps/popup6.png',
        'bob-PopUps/popup7.png',
        'bob-PopUps/popup8.png',
        'bob-PopUps/popup9.png',
        'bob-PopUps/popup10.png',
        'bob-PopUps/popup11.png',

        

        'QTAlerts/alert-0.png',
        'QTAlerts/alert-1.png',
        'QTAlerts/alert-2.png',
        'QTAlerts/alert-3.png',
        'QTAlerts/alert-4.png',

        'QTAlerts/alert-double-0.png',
        'QTAlerts/alert-double-1.png',
        'QTAlerts/alert-double-2.png',
        'QTAlerts/alert-double-3.png',
        'QTAlerts/alert-double-4.png',

        
        
        'imgs/QT/pincer-close.png',
        'imgs/QT/pincer-open.png',

        

        'sonicEXE/sonicEXEHitStatic/hitStatic-0.png',
        'sonicEXE/sonicEXEHitStatic/hitStatic-1.png',
        'sonicEXE/sonicEXEHitStatic/hitStatic-2.png',
        'sonicEXE/sonicEXEHitStatic/hitStatic-3.png',
        'sonicEXE/sonicEXEHitStatic/hitStatic-4.png',
        'sonicEXE/sonicEXEHitStatic/hitStatic-5.png',
        'sonicEXE/sonicEXEHitStatic/hitStatic-6.png',
        'sonicEXE/sonicEXEHitStatic/hitStatic-7.png',
        'sonicEXE/sonicEXEHitStatic/hitStatic-8.png',
        'sonicEXE/sonicEXEHitStatic/hitStatic-9.png',

        

        'sonicEXE/sonicEXESimpleStatic/static-0.png',
        'sonicEXE/sonicEXESimpleStatic/static-1.png',
        'sonicEXE/sonicEXESimpleStatic/static-2.png',
        'sonicEXE/sonicEXESimpleStatic/static-3.png',
        'sonicEXE/sonicEXESimpleStatic/static-4.png',
        'sonicEXE/sonicEXESimpleStatic/static-5.png',*/
    ]
    
    return state.images.length
}