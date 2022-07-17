export default function createListener() {
    const state = {
        buttons: {},
        keys: {},
        arrows: {},
        mouseInfo: {
            x: NaN,
            y: NaN,
            mouseOnHover: false,
            mouseInfoType: 'percent',
        },
        keyBindings: {
            0: (key) => key == 'ArrowLeft' || key == 'KeyD',
            1: (key) => key == 'ArrowDown' || key == 'KeyF',
            2: (key) => key == 'ArrowUp' || key == 'KeyJ',
            3: (key) => key == 'ArrowRight' || key == 'KeyK',
        }
    }

    require('./ListenerFunctions/addButtons')(state)

    document.onmousemove = (event) => {
        state.mouseInfo.x = event.pageX/window.innerWidth
        state.mouseInfo.y = event.pageY/window.window.innerHeight

        let X = Math.floor(event.pageX/window.innerWidth*1000)
        let Y = Math.floor(event.pageY/window.window.innerHeight*1000)
        
        let onAButton = false
        if (state.game) for (let i in state.buttons) {
            let button = state.buttons[i]
            if (X > button.minX && X < button.maxX && Y > button.minY && Y < button.maxY && button.gameStage.includes(state.game.state.gameStage)) {                
                if (!button.over && button.onOver) button.onOver()
                button.over = true
                if (button.pointer) {
                    onAButton = true                    
                    state.mouseInfo.mouseOnHover = true
                }
            } else button.over = false
        }
        if (!onAButton) state.mouseInfo.mouseOnHover = false
    }

    document.addEventListener('click', (event) => {
        let X = Math.floor(event.pageX/window.innerWidth*1000)
        let Y = Math.floor(event.pageY/window.window.innerHeight*1000)

        if (state.game) for (let i in state.buttons) {
            let button = state.buttons[i]
            if (X > button.minX && X < button.maxX && Y > button.minY && Y < button.maxY && button.onClick && button.gameStage.includes(state.game.state.gameStage)) button.onClick()
        }
    })

    document.addEventListener('keydown', (event) => handleKeys({ event, on: true }))
    document.addEventListener('keyup', (event) => handleKeys({ event, on: false }))
    
    function handleKeys({ event, on }) {
        let keyPressed = event.code
        console.log(keyPressed)
        let lastClick = state.keys[keyPressed]
        state.keys[keyPressed] = {
            clicked: on,
            time: +new Date(),
            lastClickTime: lastClick?.time || null
        }

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

        if (state.game.state.gameStage == 'game') {
            if (keyPressed == 'KeyR' && on) state.game.state.musicInfo.health = -100

            if (keyPressed == 'Escape' && on) {
                if (state.game.state.music.paused) {
                    state.game.state.music.play()
                    state.game.state.musicVoice.play()
                } else {
                    state.game.state.music.pause()
                    state.game.state.musicVoice.pause()
                }
            }
        }
        
        if (state.game.state.debug && on) {
            if (keyPressed == 'Digit1') state.game.startMusic({ name: 'Tutorial', difficulty: 'hard', notesImageDir: 'Arrows/' })
            if (keyPressed == 'Digit2') state.game.startMusic({ name: 'Really-happy', difficulty: 'hard', notesImageDir: 'Arrows/' })
            if (keyPressed == 'Digit3') state.game.startMusic({ name: 'Expurgation', difficulty: 'hard', notesImageDir: 'Arrows/' })

            if (keyPressed == 'KeyO' && state.game.state.music) {
                state.game.state.music.currentTime -= 10
                state.game.state.musicVoice.currentTime -= 10
            } 
            if (keyPressed == 'KeyP' && state.game.state.music) {
                state.game.state.music.currentTime += 10
                state.game.state.musicVoice.currentTime += 10
            }
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
                            difficulty: state.game.state.difficulties[state.game.state.musics[state.game.state.selectMusicMenu.musicSelect].difficulties[state.game.state.selectMusicMenu.difficultySelected]],
                            notesImageDir: state.game.state.musics[state.game.state.selectMusicMenu.musicSelect].notesImageDir,
                            backgroundImage: state.game.state.musics[state.game.state.selectMusicMenu.musicSelect].backgroundImage,
                            mod: state.game.state.musics[state.game.state.selectMusicMenu.musicSelect].mod,
                            listenerState: state
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