import chat from './ListenerFunctions/Chat.js';

export default function createListener(socket) {
    const state = {
        buttons: {},
        keys: {},
        arrows: {},
        pauseGameKeys: false,
        codeText: '',
        onChat: 'off',
        messageContent: '',
        renderChat: true,
        gamepadLoop: false,
        gamepadButtons: {},
        mouseInfo: {
            x: NaN,
            y: NaN,
            mouseOnHover: false,
            mouseInfoType: 'percent',
            lastMoveTime: 0
        }
    }

    const chatFunctions = chat(state, socket)
    require('./ListenerFunctions/addButtons').default(state, handleKeys)

    document.onmousemove = (event) => {
        state.mouseInfo.lastMoveTime = +new Date()
        state.mouseInfo.x = event.pageX/window.innerWidth
        state.mouseInfo.y = event.pageY/window.window.innerHeight

        let X = Math.floor(event.pageX/window.innerWidth*1000)
        let Y = Math.floor(event.pageY/window.window.innerHeight*1000)
        
        let onAButton = false
        if (state.game) for (let i in state.buttons) {
            let button = state.buttons[i]
            if (
                button.gameStage && button.gameStage.includes(state.game.state.gameStage) && X > button.minX && X < button.maxX && Y > button.minY && Y < button.maxY ||
                !button.gameStage && X > button.minX && X < button.maxX && Y > button.minY && Y < button.maxY
            ) {
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
        //if (event.target?.id == 'screenElements') {
            handleKeys({ event: { code: 'MouseClick' }, on: true })

            let X = Math.floor(event.pageX/window.innerWidth*1000)
            let Y = Math.floor(event.pageY/window.window.innerHeight*1000)

            if (state.game && !state.onChangeKeyBind) for (let i in state.buttons) {
                let button = state.buttons[i]
                if (
                    button.gameStage && button.gameStage.includes(state.game.state.gameStage) && X > button.minX && X < button.maxX && Y > button.minY && Y < button.maxY && button.onClick ||
                    !button.gameStage && X > button.minX && X < button.maxX && Y > button.minY && Y < button.maxY && button.onClick
                ) {
                    if (button.songClick) {
                        state.game.playSong(button.songClick)
                    }
                    button.onClick()
                }
            }
        //}
    })

    document.getElementById('body').onwheel = (event) => {
        if (event.deltaY < 0) handleKeys({ event: { code: 'WheelUp' }, on: true })
        else handleKeys({ event: { code: 'WheelDown' }, on: true })
    }

    window.addEventListener("gamepadconnected", (e) => {
        console.log(
            "Gamepad connected at index %d: %s. %d buttons, %d axes.",
            e.gamepad.index,
            e.gamepad.id,
            e.gamepad.buttons.length,
            e.gamepad.axes.length
        );

        const replaces = (b) => {
            switch(b) {
                case '0':
                    return 'Enter'
                case '1':
                    return 'Escape'
                case '9':
                    return 'Enter'
                case '12':
                    return 'ArrowUp'
                case '13':
                    return 'ArrowDown'
                case '14':
                    return 'ArrowLeft'
                case '15':
                    return 'ArrowRight'
            }
            return b
        }
        const verifyButtonPressed  = (b) => typeof b === "object" ? b.pressed : b === 1.0
        const gamepadLoop = () => {
            const gamepads = navigator.getGamepads();
            if (!gamepads || !gamepads[0]) return state.gamepadLoop = false
            state.gamepadLoop = true
            let gamepad = gamepads[0]

            for (let i in gamepad.buttons) {
                let buttonId = i
                let buttonPressed = verifyButtonPressed(gamepad.buttons[i])
                if (state.gamepadButtons[buttonId] == undefined) state.gamepadButtons[buttonId] = {
                    pressed: 0,
                    count: 0
                }

                if (+new Date()-state.gamepadButtons[buttonId].pressed >= 150 && buttonPressed || state.gamepadButtons[buttonId].pressed && !buttonPressed) {
                    state.gamepadButtons[buttonId].pressed = buttonPressed ? +new Date() : 0
                    state.gamepadButtons[buttonId].count = buttonPressed ? state.gamepadButtons[buttonId].count+1 : 1
                    handleKeys({ event: { code: replaces(i), repeat: state.gamepadButtons[buttonId].count >= 3 }, on: buttonPressed })

                    //if (buttonPressed) console.log(buttonId)
                }
            }

            window.requestAnimationFrame(gamepadLoop)
        }
        if (!state.gamepadLoop) gamepadLoop()
    });

    window.addEventListener("gamepaddisconnected", (e) => {
        state.game.state.musicInfo.oldPauseTime = state.game.state.music?.currentTime
        state.game.state.music?.pause()
        if (state.game.state.musicVoice) state.game.state.musicVoice.pause()
        if (state.game.state.videoBackground) state.game.state.videoBackground.pause()
    })

    document.addEventListener('keydown', (event) => handleKeys({ event, on: true }))
    document.addEventListener('keyup', (event) => handleKeys({ event, on: false }))
    
    async function handleKeys({ event, on }) {
        let keys = {
            KeyUp: state.game?.state.smallFunctions.getConfig('KeyUp'),
            KeyDown: state.game?.state.smallFunctions.getConfig('KeyDown'),
            KeyLeft: state.game?.state.smallFunctions.getConfig('KeyLeft'),
            KeyRight: state.game?.state.smallFunctions.getConfig('KeyRight'),
            KeyEnter: state.game?.state.smallFunctions.getConfig('KeyEnter'),
            KeyExit: state.game?.state.smallFunctions.getConfig('KeyExit')
        }

        let keyPressed = event.code
        let lastClick = state.keys[keyPressed]
        let hold = !state.keys[keyPressed] || +new Date()-state.keys[keyPressed]?.time <= 50
        state.keys[keyPressed] = {
            key: event.key || '',
            code: keyPressed || '',
            hold,
            clicked: on,
            time: +new Date(),
            lastClickTime: lastClick?.time || null
        }
        
        /*if (on && keyPressed == 'KeyZ') {
            state.game.state.rainbowColor += 1
            console.log(state.game.state.rainbowColor)
        }*/
        
        if (state.onChat == 'off') {
            if (on && event.key) state.codeText += event.key

            if (state.game && !state.onChangeKeyBind) for (let i in state.buttons) {
                let button = state.buttons[i]
                if (button && on && button.gameStage?.includes(state.game.state.gameStage) && button.keyPress?.includes(keyPressed)) button.onClick()
            }

            if (!state.pauseGameKeys && !event.repeat) for (let arrowID in state.game.state.arrowsInfo) {
                if (!state.arrows[arrowID]) {
                    state.arrows[arrowID] = { state: 'noNote', click: false }
                    state.keys[state.game.state.smallFunctions.getKey(arrowID)] = {
                        code: state.game.state.smallFunctions.getKey(arrowID) || '',
                        hold: false,
                        clicked: false,
                        time: +new Date(),
                        lastClickTime: +new Date(),
                    }
                }

                if (
                    !state.game?.state.smallFunctions.getConfig('botPlay') && state.game.state.smallFunctions.getKey(arrowID) == keyPressed && on && !state.arrows[arrowID].click || 
                    !state.game?.state.smallFunctions.getConfig('botPlay') && state.game.state.smallFunctions.getKey(arrowID) == keyPressed && !on && state.arrows[arrowID].click
                ) {
                    if (on /*&& !hold*/) state.game.verifyClick({ arrowID, listenerState: state })
                    else state.arrows[arrowID].state = 'noNote'
                    state.arrows[arrowID].click = on

                    /*clearTimeout(state.arrows[arrowID].timeout)
                    if (on) state.arrows[arrowID].click = true
                    else state.arrows[arrowID].timeout = setTimeout(() => {
                        if (+new Date()-state.keys[keyPressed]?.time >= 50) state.arrows[arrowID].click = false
                    }, 60)*/
                }
            }

            if (state.game.state.gameStage == 'test' && !state.pauseGameKeys) {
                
            }

            if (state.game.state.gameStage == 'game') {
                /*if (keyPressed == keys.KeyExit && on && state.keys[keyPressed].time-state.keys[keyPressed].lastClickTime <= 100 && !state.game.state.online && state.game.state.music.currentTime >= 1) {
                    let botPlay = state.game.state.selectSettingsOption.settingsOptions.find((g) => g.id == 'botPlay').content
                    state.game.state.selectSettingsOption.settingsOptions.find((g) => g.id == 'botPlay').content = false
                    state.game.state.musicInfo.health = -100
                    setTimeout(() => state.game.state.selectSettingsOption.settingsOptions.find((g) => g.id == 'botPlay').content = botPlay, 500)
                }*/
                let gameVideoElement = document.getElementById('gameVideo')
                
                if (keyPressed == keys.KeyEnter && on && gameVideoElement.duration >= 6 && state.game.state.music?.currentTime <= 0) {
                    gameVideoElement.currentTime = gameVideoElement.duration
                    gameVideoElement.style.display = 'none'
                }

                if (state.pauseGameKeys) return
                if (keyPressed == keys.KeyExit && on && !state.game.state.online && state.game.state.countdown <= -1) {
                    if (state.game.state.music.paused) {
                        let count = 0
                        function loop() {
                            count += 1
                            if (count <= 20) {
                                if (state.game.state.music.currentTime-0.04 <= 0) count = 20
                                else {
                                    state.game.state.music.currentTime -= 0.04
                                    if (state.game.state.musicVoice) state.game.state.musicVoice.currentTime = state.game.state.music.currentTime -= 0.02
                                    if (state.game.state.videoBackground) state.game.state.videoBackground.currentTime = state.game.state.music.currentTime -= 0.02
                                }
                                setTimeout(loop, 1000/20)
                            } else {
                                if (state.game.state.music) state.game.state.music.play()
                                if (state.game.state.musicVoice) {
                                    state.game.state.musicVoice.play()
                                    state.game.state.musicVoice.currentTime = state.game.state.music.currentTime
                                }
                                if (state.game.state.videoBackground) {
                                    state.game.state.videoBackground.play()
                                    state.game.state.videoBackground.currentTime = state.game.state.music.currentTime
                                }
                            }
                        }
                        loop()

                        
                    } else if (state.game.state.musicInfo.oldPauseTime+1 < state.game.state.music.currentTime) {
                        state.game.state.musicInfo.oldPauseTime = state.game.state.music.currentTime
                        state.game.state.music.pause()
                        if (state.game.state.musicVoice) state.game.state.musicVoice.pause()
                        if (state.game.state.videoBackground) state.game.state.videoBackground.pause()
                    }
                }

                keyPressed = keyPressed.replace('WheelUp', keys.KeyUp).replace('WheelDown', keys.KeyDown)
                let selectPauseOption = state.game.state.selectPauseOption
                if (on && state.game.state.music?.paused && state.game.state.music.currentTime > 0) switch (keyPressed) {
                    case keys.KeyDown:
                        if (selectPauseOption.pauseSelect < selectPauseOption.pauseOptions.length-1) {
                            selectPauseOption.pauseSelect += 1
                            state.game.playSong('Sounds/scrollMenu.ogg', { volume: 0.5 })
                        }
                        break
                    case keys.KeyUp:
                        if (selectPauseOption.pauseSelect > 0) {
                            selectPauseOption.pauseSelect -= 1
                            state.game.playSong('Sounds/scrollMenu.ogg', { volume: 0.5 })
                        }
                        break
                    case keys.KeyEnter:
                        let option = selectPauseOption.pauseOptions[selectPauseOption.pauseSelect]

                        switch (option.name) {
                            case 'Resume':
                                handleKeys({ event: { code: keys.KeyExit }, on: true })
                                break
                            case 'Exit':
                                state.game.state.musicInfo.dead = true
                                state.game.state.music.currentTime = state.game.state.music.duration
                                break
                        }
                        break
                }

                if (state.game.state.debug && on) {
                    if (keyPressed == 'KeyO' && state.game.state.music) {
                        if (state.game.state.music) state.game.state.music.currentTime -= 10
                        if (state.game.state.musicVoice) state.game.state.musicVoice.currentTime -= 10
                    } 
                    if (keyPressed == 'KeyP' && state.game.state.music) {
                        if (state.game.state.music) state.game.state.music.currentTime += 10
                        if (state.game.state.musicVoice) state.game.state.musicVoice.currentTime += 10
                    }
                }
            }

            if (keyPressed == keys.KeyEnter && state.game.state.gameStage == 'dead' && !state.game.state.musicMenu?.src.includes('gameOverEnd') && state.game.state.gameStageTime+2000 < +new Date()) {
                state.game.state.playSong('Sounds/gameOverEnd.ogg', { musicMenu: true })
                //state.game.state.selectMusicMenu.musicSelect = -1
                setTimeout(() => state.game.state.smallFunctions.redirectGameStage('selectMusic', 'menu'), 1500)
            }

            if (state.game.state.gameStage == 'score' && on) {
                if (![ 'F11', 'PrintScreen' ].includes(keyPressed) && state.game.state.gameStageTime != 0 && state.game.state.gameStageTime+1000 <= +new Date()) {
                    //state.game.state.selectMusicMenu.musicSelect = -1
                    if (state.game.state.online) state.game.state.smallFunctions.redirectGameStage('onlineServerList', 'menu')
                    else state.game.state.smallFunctions.redirectGameStage('selectMusic', 'menu')
                }
            }

            if (state.game.state.gameStage == 'selectMusic' && on) {
                keyPressed = keyPressed.replace('WheelUp', keys.KeyUp).replace('WheelDown', keys.KeyDown)
                let filtredMusics = state.game.state.musics.filter(m => !m.dev || game.state.myConfig.emoji == '👑')
                let selectMusicMenu = state.game.state.selectMusicMenu

                if (state.game.state.gameStageTime != 0 && state.game.state.gameStageTime+100 <= +new Date()) switch (keyPressed) {
                    case keys.KeyRight:
                        selectMusicMenu.currentSelection = selectMusicMenu.currentSelection+1 >= 3 ? 0 : selectMusicMenu.currentSelection+1
                        state.game.playSong('Sounds/scrollMenu.ogg', { volume: 0.5 })
                        break
                    case keys.KeyLeft:
                        selectMusicMenu.currentSelection = selectMusicMenu.currentSelection-1 <= -1 ? 2 : selectMusicMenu.currentSelection-1
                        state.game.playSong('Sounds/scrollMenu.ogg', { volume: 0.5 })
                        break
                    case keys.KeyDown:
                        switch(selectMusicMenu.currentSelection) {
                            case 0:
                                selectMusicMenu.musicSelect = 0
                                selectMusicMenu.modSelect = selectMusicMenu.modSelect >= filtredMusics.length-1 ? 0 : selectMusicMenu.modSelect+1
                                break
                            case 1:
                                selectMusicMenu.musicSelect = selectMusicMenu.musicSelect >= filtredMusics[selectMusicMenu.modSelect].musics.length-1 ? 0 : selectMusicMenu.musicSelect+1
                                break
                            case 2:
                                selectMusicMenu.difficultySelected += 1
                                break
                        }
                        state.game.playSong('Sounds/scrollMenu.ogg', { volume: 0.5 })
                        break
                    case keys.KeyUp:
                        switch(selectMusicMenu.currentSelection) {
                            case 0:
                                selectMusicMenu.musicSelect = 0
                                selectMusicMenu.modSelect = selectMusicMenu.modSelect <= 0 ? filtredMusics.length-1 : selectMusicMenu.modSelect-1
                                break
                            case 1:
                                selectMusicMenu.musicSelect = selectMusicMenu.musicSelect <= 0 ? filtredMusics[selectMusicMenu.modSelect].musics.length-1 : selectMusicMenu.musicSelect-1
                                break
                            case 2:
                                selectMusicMenu.difficultySelected -= 1
                                break
                        }
                        state.game.playSong('Sounds/scrollMenu.ogg', { volume: 0.5 })
                        break
                    case keys.KeyEnter:
                        let modInfo = filtredMusics[state.game.state.selectMusicMenu.modSelect]
                        let musicInfo = filtredMusics[state.game.state.selectMusicMenu.modSelect].musics[state.game.state.selectMusicMenu.musicSelect]

                        if (modInfo && musicInfo && state.game.state.online) {
                            state.musicMenu?.pause()
                            state.game.state.smallFunctions.redirectGameStage('game')
                            socket.emit('newServer', {
                                difficulty: state.game.state.selectMusicMenu.difficultySelected,
                                mod: state.game.state.selectMusicMenu.modSelect,
                                music: state.game.state.selectMusicMenu.musicSelect
                            })

                            state.game.startMusic({
                                modInfo,
                                musicInfo,
                                difficulty: state.game.state.difficulties[musicInfo.difficulties[state.game.state.selectMusicMenu.difficultySelected]],
                                listenerState: state,
                                socket
                            })
                        } else if (modInfo && musicInfo) {
                            state.musicMenu?.pause()
                            state.game.playSong('Sounds/confirmMenu.ogg', { volume: 0.5 })
                            state.game.state.smallFunctions.redirectGameStage('game')

                            state.game.startMusic({ 
                                modInfo,
                                musicInfo,
                                difficulty: state.game.state.difficulties[musicInfo.difficulties[state.game.state.selectMusicMenu.difficultySelected]],
                                listenerState: state,
                                socket
                            })
                        }
                        break
                }
            }
/*
            if (state.game.state.gameStage == 'onlineServerList' && on) {
                keyPressed = keyPressed.replace('WheelUp', keys.KeyUp).replace('WheelDown', keys.KeyDown)

                switch (keyPressed) {
                    case keys.KeyUp:
                        if (!state.game.state.selectServerOption.createServer) {
                            state.game.state.selectServerOption.serverSelect = state.game.state.selectServerOption.serverSelect <= 0 ? (state.game.state.selectServerOption.listServers.filter(s => s.open)).length-1 : state.game.state.selectServerOption.serverSelect-1
                            state.game.playSong('Sounds/scrollMenu.ogg', { volume: 0.5 })
                        }
                        break
                    case keys.KeyDown:
                        if (!state.game.state.selectServerOption.createServer) {
                            state.game.state.selectServerOption.serverSelect = state.game.state.selectServerOption.serverSelect >= (state.game.state.selectServerOption.listServers.filter(s => s.open)).length-1 ? 0 : state.game.state.selectServerOption.serverSelect+1
                            state.game.playSong('Sounds/scrollMenu.ogg', { volume: 0.5 })
                        }
                        break
                    case keys.KeyLeft:
                        state.game.state.selectServerOption.createServer = true
                        state.game.playSong('Sounds/scrollMenu.ogg', { volume: 0.5 })
                        break
                    case keys.KeyRight:
                        state.game.state.selectServerOption.createServer = false
                        state.game.playSong('Sounds/scrollMenu.ogg', { volume: 0.5 })
                        break
                    case keys.KeyEnter:
                        let filtredServers = state.game.state.selectServerOption.listServers.filter(s => s.open)
                        //if (!state.game.state.debug) state.game.state.selectSettingsOption.settingsOptions.find((g) => g.id == 'botPlay').content = false

                        if (state.game.state.selectServerOption.createServer) {
                            state.game.state.smallFunctions.redirectGameStage('selectMusic')

                            state.game.state.serverId = socket.id
                        } else if (state.game.state.selectServerOption.listServers[0]) {
                            let server = filtredServers[state.game.state.selectServerOption.serverSelect]
                            state.game.state.serverId = server.id

                            if (state.game.state.serverId) {
                                let modInfo = state.game.state.musics[server.mod]
                                let musicInfo = state.game.state.musics[server.mod].musics[server.music]

                                socket.emit('connectServer', {
                                    serverId: state.game.state.serverId
                                })

                                state.game.startMusic({
                                    modInfo,
                                    musicInfo,
                                    difficulty: state.game.state.difficulties[musicInfo.difficulties[server.difficulty]],
                                    listenerState: state,
                                    opponentPlayer: true,
                                    socket
                                })

                                state.game.state.smallFunctions.redirectGameStage('game')
                            }
                        }
                        break
                }
            }*/

            if (state.game.state.gameStage == 'settings' && on) {
                keyPressed = keyPressed.replace('WheelUp', keys.KeyUp).replace('WheelDown', keys.KeyDown)
                let currentConfig = state.game.state.selectSettingsOption.settingsOptionsFiltered ? state.game.state.selectSettingsOption.settingsOptionsFiltered[state.game.state.selectSettingsOption.settingsSelect] : {}

                if (state.onChangeKeyBind) {
                    if (keyPressed != keys.KeyExit && on) currentConfig.content = keyPressed
                    state.onChangeKeyBind = false
                } else switch (keyPressed) {
                    case keys.KeyUp:
                        state.game.state.selectSettingsOption.settingsSelect = state.game.state.selectSettingsOption.settingsSelect <= 0 ? state.game.state.selectSettingsOption.settingsOptionsFiltered.length-1 : state.game.state.selectSettingsOption.settingsSelect-1
                        state.game.playSong('Sounds/scrollMenu.ogg', { volume: 0.5 })
                        break
                    case keys.KeyDown:
                        state.game.state.selectSettingsOption.settingsSelect = state.game.state.selectSettingsOption.settingsSelect >= state.game.state.selectSettingsOption.settingsOptionsFiltered.length-1 ? 0 : state.game.state.selectSettingsOption.settingsSelect+1
                        state.game.playSong('Sounds/scrollMenu.ogg', { volume: 0.5 })
                        break
                    case keys.KeyLeft:
                        if (currentConfig.type == 'Number' && currentConfig.content > currentConfig.min) {
                            currentConfig.content = Number((currentConfig.content-currentConfig.add).toFixed(1))
                            state.game.playSong('Sounds/scrollMenu.ogg', { volume: 0.5 })
                        }
                        break
                    case keys.KeyRight:
                        if (currentConfig.type == 'Number' && currentConfig.content < currentConfig.max) {
                            currentConfig.content = Number((currentConfig.content+currentConfig.add).toFixed(1))
                            state.game.playSong('Sounds/scrollMenu.ogg', { volume: 0.5 })
                        }
                        break
                    case keys.KeyEnter:
                        switch (currentConfig.type) {
                            case 'ConfigTitle':
                                if (currentConfig.content) {
                                    let options = Object.keys(state.game.state.selectSettingsOption.settingsOptions[1])
                                    currentConfig.currentOption = currentConfig.currentOption >= options.length-1 ? 0 : currentConfig.currentOption+1 
                                    currentConfig.content = options[currentConfig.currentOption]
                                    state.game.playSong('Sounds/scrollMenu.ogg', { volume: 0.5 })
                                }
                                break
                            case 'Boolean':
                                if (currentConfig.id == 'LightTheme') {
                                    let gameCanvas = document.getElementById('gameCanvas')
                                    if (!currentConfig.content) {
                                        gameCanvas.style.backgroundColor = 'white'
                                        currentConfig.content = true
                                        setTimeout(async() => {
                                            await alert('You are crazy?!')
                                            currentConfig.content = false
                                            gameCanvas.style.backgroundColor = 'transparent'
                                        }, 200)
                                    }
                                    return
                                }
                                currentConfig.content = currentConfig.content ? false : true
                                state.game.playSong('Sounds/scrollMenu.ogg', { volume: 0.5 })
                                break
                            case 'KeyBind':
                                state.onChangeKeyBind = true
                                state.game.playSong('Sounds/scrollMenu.ogg', { volume: 0.5 })
                                break
                            case 'logoff':
                                document.cookie = `token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT`;
                                setTimeout(() => state.game.state.router.push('/logoff'), 500)
                                break
                        }
                        
                        break
                }
            }

            if (state.game.state.gameStage == 'menu' && on) {
                //keyPressed = keyPressed.replace('WheelUp', keys.KeyUp).replace('WheelDown', keys.KeyDown)
                
                switch (keyPressed) {
                    case keys.KeyUp:
                        state.game.state.selectMenuOption.menuSelect = state.game.state.selectMenuOption.menuSelect <= 0 ? state.game.state.selectMenuOption.menuOptions.length-1 : state.game.state.selectMenuOption.menuSelect-1
                        state.game.playSong('Sounds/scrollMenu.ogg', { volume: 0.5 })
                        break
                    case keys.KeyDown:
                        state.game.state.selectMenuOption.menuSelect = state.game.state.selectMenuOption.menuSelect >= state.game.state.selectMenuOption.menuOptions.length-1 ? 0 : state.game.state.selectMenuOption.menuSelect+1
                        state.game.playSong('Sounds/scrollMenu.ogg', { volume: 0.5 })
                        break
                    case keys.KeyEnter:
                        if (state.game.state.selectMenuOption.menuOptions[state.game.state.selectMenuOption.menuSelect] == 'Singleplayer') {
                            state.game.state.online = false
                            state.game.state.smallFunctions.redirectGameStage('selectMusic')
                        } else if (state.game.state.selectMenuOption.menuOptions[state.game.state.selectMenuOption.menuSelect] == 'Multiplayer') {
                            alert('Multiplayer desligado Temporariamente\n\nMultiplayer Temporarily Off')
                            /*if (state.game.state.ping) {
                                state.game.state.online = true
                                state.game.state.smallFunctions.redirectGameStage('onlineServerList')
                                socket.emit('getListServers')
                            } else alert('No connection to the server!')*/
                        } else {
                            state.game.state.online = true
                            state.game.state.smallFunctions.redirectGameStage('settings')
                        }
                        
                        break
                }
            }
        }

        if (on) chatFunctions.keyPressed(event)
    }

    return {
        state,
        handleKeys
    }
}