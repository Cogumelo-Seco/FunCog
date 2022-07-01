export default function createListener() {
    const state = {
        mobile: false,
        keys: {},
        arrows: { },
        keyBindings: {
            0: (key) => key == 'ArrowLeft' || key == 'KeyD',
            1: (key) => key == 'ArrowDown' || key == 'KeyF',
            2: (key) => key == 'ArrowUp' || key == 'KeyJ',
            3: (key) => key == 'ArrowRight' || key == 'KeyK',
        }
    }

    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) state.mobile = true

    document.addEventListener('keydown', (event) => handleKeys({ event, on: true }))
    document.addEventListener('keyup', (event) => handleKeys({ event, on: false }))
    
    function handleKeys({ event, on }) {
        let keyPressed = event.code
        state.keys[keyPressed] = on

        for (let arrowID = 0;arrowID <= state.game.state.amountOfArrows;arrowID++) {
            if (!state.arrows[arrowID]) state.arrows[arrowID] = { state: 'noNote',  click: false }

            if (
                state.keyBindings[arrowID](keyPressed) && on && !state.arrows[arrowID].click || 
                state.keyBindings[arrowID](keyPressed) && !on && state.arrows[arrowID].click
            ) {
                if (on) state.game.verifyClick({ arrowID, listenerState: state })
                else state.arrows[arrowID].state = 'noNote'
                state.arrows[arrowID].click = on
            }
        }
        
        if (state.game.state.debug && on) {
            if (keyPressed == 'Digit1') state.game.startMusic({ name: 'Tutorial', difficulty: 'hard' })
            if (keyPressed == 'Digit2') state.game.startMusic({ name: 'Bopeebo', difficulty: 'hard' })
            if (keyPressed == 'Digit3') state.game.startMusic({ name: 'Dadbattle', difficulty: 'hard' })
            if (keyPressed == 'Digit4') state.game.startMusic({ name: 'Milf', difficulty: 'hard' })
            if (keyPressed == 'Digit5') state.game.startMusic({ name: 'Expurgation', difficulty: 'hard' })

            if (keyPressed == 'KeyP' && state.game.state.music) {
                state.game.state.music.currentTime = 110
                state.game.state.musicVoice.currentTime = 110
            }

            if (keyPressed == 'KeyE') state.game.state.musicInfo.health = 0
        }

        if (keyPressed == 'Enter' && state.game.state.gameStage == 'dead' && !state.game.state.musicMenu?.src.includes('gameOverEnd') && state.game.state.gameStageTime+2000 < +new Date()) {
            state.game.state.playSong('Sounds/gameOverEnd.ogg', { musicMenu: true })
            setTimeout(() => state.game.state.gameStage = 'selectMusic', 1500)
        }

        if (state.game.state.gameStage == 'selectMusic' && on) {
            switch (keyPressed) {
                case 'ArrowUp':
                    state.game.state.selectMusicMenu.musicSelect = state.game.state.selectMusicMenu.musicSelect <= 0 ? state.game.state.musics.length-1 : state.game.state.selectMusicMenu.musicSelect-1
                    state.game.playSong('Sounds/scrollMenu.ogg')
                    break
                case 'ArrowDown':
                    state.game.state.selectMusicMenu.musicSelect = state.game.state.selectMusicMenu.musicSelect >= state.game.state.musics.length-1 ? 0 : state.game.state.selectMusicMenu.musicSelect+1
                    state.game.playSong('Sounds/scrollMenu.ogg')
                    break
                case 'ArrowLeft':
                    state.game.state.selectMusicMenu.difficultySelected -= 1
                    state.game.playSong('Sounds/scrollMenu.ogg')
                    break
                case 'ArrowRight':
                    state.game.state.selectMusicMenu.difficultySelected += 1
                    state.game.playSong('Sounds/scrollMenu.ogg')
                    break
                case 'Enter':
                    state.musicMenu?.pause()
                    state.game.playSong('Sounds/confirmMenu.ogg')
                    setTimeout(() => {
                        state.game.state.gameStage = 'game'
                        state.game.startMusic({ 
                            name: state.game.state.musics[state.game.state.selectMusicMenu.musicSelect].name, 
                            difficulty: state.game.state.difficulties[state.game.state.musics[state.game.state.selectMusicMenu.musicSelect].difficulties[state.game.state.selectMusicMenu.difficultySelected]]?.name
                        })
                    }, 1500)
                    break
            }
        }

        if (keyPressed == 'KeyQ' && on) state.game.state.downScroll = state.game.state.downScroll ? false : true
        if (keyPressed == 'KeyW' && on) state.game.state.middleScroll = state.game.state.middleScroll ? false : true
    }

    return {
        state
    }
}