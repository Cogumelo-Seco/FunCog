export default async (state) => {
    state.sounds = [
        { dir: 'Sounds/scrollMenu.ogg' },
        { dir: 'Sounds/confirmMenu.ogg' },
        { dir: 'Sounds/fnf_loss_sfx.ogg' },
        { dir: 'Sounds/gameOver.ogg' },
        { dir: 'Sounds/gameOverEnd.ogg' },
        { dir: 'Sounds/intro3.ogg' },
        { dir: 'Sounds/intro2.ogg' },
        { dir: 'Sounds/intro1.ogg' },
        { dir: 'Sounds/intro0.ogg' },

        /*
        { dir: 'Sounds/hitStatic1.ogg' },
        { dir: 'Sounds/simplejumpsound.ogg' },
        { dir: 'Sounds/datOneSound.ogg' },
        { dir: 'Sounds/sppok.ogg' },
        ,*/
    ]

    return state.sounds.length
}