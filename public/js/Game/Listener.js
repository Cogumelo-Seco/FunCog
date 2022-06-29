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
        
        if (!state.game.state.music?.duration || state.game.state.music?.duration >= state.game.state.music?.currentTime) {
            if (keyPressed == 'Digit1' && on) state.game.startMusic({ name: 'Tutorial', difficulty: 'hard' })
            if (keyPressed == 'Digit2' && on) state.game.startMusic({ name: 'Bopeebo', difficulty: 'hard' })
            if (keyPressed == 'Digit3' && on) state.game.startMusic({ name: 'Dadbattle', difficulty: 'hard' })
            if (keyPressed == 'Digit4' && on) state.game.startMusic({ name: 'Milf', difficulty: 'hard' })
            if (keyPressed == 'Digit5' && on) state.game.startMusic({ name: 'Expurgation', difficulty: 'hard' })
        }

        if (keyPressed == 'KeyQ' && on) state.game.state.downScroll = state.game.state.downScroll ? false : true
        if (keyPressed == 'KeyW' && on) state.game.state.middleScroll = state.game.state.middleScroll ? false : true

        if (keyPressed == 'KeyP' && on && state.game.state.music) {
            state.game.state.music.currentTime = 110
            state.game.state.musicVoice.currentTime = 110
        }
    }

    return {
        state
    }
}