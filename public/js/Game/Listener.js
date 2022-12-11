import chat from './ListenerFunctions/Chat.js';

export default function createListener(socket) {
    const state = {
        buttons: {},
        keys: {},
        arrows: {},
        pauseGameKeys: false,
        codeText: '',
        onChat: 'off',
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
        if (event.target?.id == 'gameCanvas') {
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
        }
    })

    document.getElementById('body').onwheel = (event) => {
        if (event.deltaY < 0) handleKeys({ event: { code: 'WheelUp' }, on: true })
        else handleKeys({ event: { code: 'WheelDown' }, on: true })
    }

    document.addEventListener('keydown', (event) => handleKeys({ event, on: true }))
    document.addEventListener('keyup', (event) => handleKeys({ event, on: false }))
    
    function handleKeys({ event, on }) {
        let keyPressed = event.code
        let lastClick = state.keys[keyPressed]
        state.keys[keyPressed] = {
            key: event.key || '',
            code: keyPressed || '',
            clicked: on,
            time: +new Date(),
            lastClickTime: lastClick?.time || null
        }
        if (on) chatFunctions.keyPressed(keyPressed)
        if (state.onChat != 'off') return
        if (on && event.key) state.codeText += event.key

        if (state.game && !state.onChangeKeyBind) for (let i in state.buttons) {
            let button = state.buttons[i]
            if (button && on && button.gameStage?.includes(state.game.state.gameStage) && button.keyPress?.includes(keyPressed)) button.onClick()
        }

        for (let arrowID = 0;arrowID <= state.game.state.amountOfArrows;arrowID++) {
            if (!state.arrows[arrowID]) state.arrows[arrowID] = { state: 'noNote',  click: false }

            if (
                !state.game?.state.smallFunctions.getConfig('botPlay') && state.game.state.smallFunctions.getConfig(`Arrow-${arrowID}`) == keyPressed && on && !state.arrows[arrowID].click || 
                !state.game?.state.smallFunctions.getConfig('botPlay') && state.game.state.smallFunctions.getConfig(`Arrow-${arrowID}`) == keyPressed && !on && state.arrows[arrowID].click
            ) {
                if (on) state.game.verifyClick({ arrowID, listenerState: state })
                else state.arrows[arrowID].state = 'noNote'
                state.arrows[arrowID].click = on
            }
        }

        if (state.game.state.gameStage == 'game' && !state.pauseGameKeys) {
            if (keyPressed == 'KeyR' && on && !state.game.state.online) {
                let botPlay = state.game.state.selectSettingsOption.settingsOptions.find((g) => g.id == 'botPlay').content
                state.game.state.selectSettingsOption.settingsOptions.find((g) => g.id == 'botPlay').content = false
                state.game.state.musicInfo.health = -100
                setTimeout(() => state.game.state.selectSettingsOption.settingsOptions.find((g) => g.id == 'botPlay').content = botPlay, 500)
            }

            if (keyPressed == 'Enter' && on && document.getElementById('gameVideo').src && state.game.state.music.currentTime <= 0) {
                let gameVideoElement = document.getElementById('gameVideo')
                gameVideoElement.currentTime = gameVideoElement.duration
                gameVideoElement.style.display = 'none'
            }

            if (keyPressed == 'Escape' && on && !state.game.state.online && state.game.state.countdown <= -1) {
                if (state.game.state.music.paused) {
                    state.game.state.music.play()
                    state.game.state.musicVoice.play()
                } else {
                    state.game.state.music.pause()
                    state.game.state.musicVoice.pause()
                }
            }

            if (state.game.state.debug && on) {
                if (keyPressed == 'KeyO' && state.game.state.music) {
                    state.game.state.music.currentTime -= 10
                    state.game.state.musicVoice.currentTime -= 10
                } 
                if (keyPressed == 'KeyP' && state.game.state.music) {
                    state.game.state.music.currentTime += 10
                    state.game.state.musicVoice.currentTime += 10
                }
            }
        }

        if (keyPressed == 'Enter' && state.game.state.gameStage == 'dead' && !state.game.state.musicMenu?.src.includes('gameOverEnd') && state.game.state.gameStageTime+2000 < +new Date()) {
            state.game.state.playSong('Sounds/gameOverEnd.ogg', { musicMenu: true })
            state.game.state.selectMusicMenu.musicSelect = -1
            setTimeout(() => state.game.state.smallFunctions.redirectGameStage('selectMusic', 'menu'), 1500)
        }

        if (state.game.state.gameStage == 'score' && on) {
            if (![ 'F11', 'PrintScreen' ].includes(keyPressed)) {
                state.game.state.selectMusicMenu.musicSelect = -1
                if (state.game.state.online) state.game.state.smallFunctions.redirectGameStage('onlineServerList', 'menu')
                else state.game.state.smallFunctions.redirectGameStage('selectMusic', 'menu')
            }
        }

        if (state.game.state.gameStage == 'selectMusic' && on) {
            keyPressed = keyPressed.replace('WheelUp', 'ArrowUp').replace('WheelDown', 'ArrowDown')

            switch (keyPressed) {
                case 'ArrowUp':
                    state.game.state.selectMusicMenu.musicSelect = state.game.state.selectMusicMenu.musicSelect-1 < -1 ? state.game.state.musics[state.game.state.selectMusicMenu.modSelect].musics.length-1 : state.game.state.selectMusicMenu.musicSelect-1
                    state.game.playSong('Sounds/scrollMenu.ogg')
                    break
                case 'ArrowDown':
                    state.game.state.selectMusicMenu.musicSelect = state.game.state.selectMusicMenu.musicSelect+1 > state.game.state.musics[state.game.state.selectMusicMenu.modSelect].musics.length-1 ? -1 : state.game.state.selectMusicMenu.musicSelect+1
                    state.game.playSong('Sounds/scrollMenu.ogg')
                    break
                case 'ArrowLeft':
                    if (state.game.state.selectMusicMenu.musicSelect == -1) 
                        state.game.state.selectMusicMenu.modSelect = !state.game.state.musics[state.game.state.selectMusicMenu.modSelect-1] ? state.game.state.musics.length-1 : state.game.state.selectMusicMenu.modSelect-1
                    else 
                        state.game.state.selectMusicMenu.difficultySelected -= 1

                    state.game.playSong('Sounds/scrollMenu.ogg')
                    break
                case 'ArrowRight':
                    if (state.game.state.selectMusicMenu.musicSelect == -1) 
                        state.game.state.selectMusicMenu.modSelect = !state.game.state.musics[state.game.state.selectMusicMenu.modSelect+1] ? 0 : state.game.state.selectMusicMenu.modSelect+1
                    else 
                        state.game.state.selectMusicMenu.difficultySelected += 1

                    state.game.playSong('Sounds/scrollMenu.ogg')
                    break
                case 'Enter':
                    if (state.game.state.selectMusicMenu.musicSelect < 0) return
                    let musicInfo = state.game.state.musics[state.game.state.selectMusicMenu.modSelect].musics[state.game.state.selectMusicMenu.musicSelect]

                    if (state.game.state.online) {
                        state.musicMenu?.pause()
                        state.game.state.smallFunctions.redirectGameStage('game')
                        socket.emit('newServer', {
                            difficulty: state.game.state.selectMusicMenu.difficultySelected,
                            mod: state.game.state.selectMusicMenu.modSelect,
                            music: state.game.state.selectMusicMenu.musicSelect
                        })

                        state.game.startMusic({ 
                            musicInfo,
                            difficulty: state.game.state.difficulties[musicInfo.difficulties[state.game.state.selectMusicMenu.difficultySelected]],
                            listenerState: state,
                            socket
                        })
                    } else {
                        state.musicMenu?.pause()
                        state.game.playSong('Sounds/confirmMenu.ogg')
                        state.game.state.smallFunctions.redirectGameStage('game')

                        state.game.startMusic({ 
                            musicInfo,
                            difficulty: state.game.state.difficulties[musicInfo.difficulties[state.game.state.selectMusicMenu.difficultySelected]],
                            listenerState: state,
                            socket
                        })
                    }
                    break
            }
        }

        if (state.game.state.gameStage == 'onlineServerList' && on) {
            keyPressed = keyPressed.replace('WheelUp', 'ArrowUp').replace('WheelDown', 'ArrowDown')

            switch (keyPressed) {
                case 'ArrowUp':
                    if (!state.game.state.selectServerOption.createServer) {
                        state.game.state.selectServerOption.serverSelect = state.game.state.selectServerOption.serverSelect <= 0 ? (state.game.state.selectServerOption.listServers.filter(s => s.open)).length-1 : state.game.state.selectServerOption.serverSelect-1
                        state.game.playSong('Sounds/scrollMenu.ogg')
                    }
                    break
                case 'ArrowDown':
                    if (!state.game.state.selectServerOption.createServer) {
                        state.game.state.selectServerOption.serverSelect = state.game.state.selectServerOption.serverSelect >= (state.game.state.selectServerOption.listServers.filter(s => s.open)).length-1 ? 0 : state.game.state.selectServerOption.serverSelect+1
                        state.game.playSong('Sounds/scrollMenu.ogg')
                    }
                    break
                case 'ArrowLeft':
                    state.game.state.selectServerOption.createServer = true
                    state.game.playSong('Sounds/scrollMenu.ogg')
                    break
                case 'ArrowRight':
                    state.game.state.selectServerOption.createServer = false
                    state.game.playSong('Sounds/scrollMenu.ogg')
                    break
                case 'Enter':
                    let filtredServers = state.game.state.selectServerOption.listServers.filter(s => s.open)
                    if (!state.game.state.debug) state.game.state.selectSettingsOption.settingsOptions.find((g) => g.id == 'botPlay').content = false

                    if (state.game.state.selectServerOption.createServer) {
                        state.game.state.smallFunctions.redirectGameStage('selectMusic')

                        state.game.state.serverId = socket.id
                    } else if (state.game.state.selectServerOption.listServers[0]) {
                        let server = filtredServers[state.game.state.selectServerOption.serverSelect]
                        state.game.state.serverId = server.id

                        if (state.game.state.serverId) {
                            let musicInfo = state.game.state.musics[server.mod].musics[server.music]

                            socket.emit('connectServer', {
                                serverId: state.game.state.serverId
                            })

                            state.game.startMusic({ 
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
        }

        if (state.game.state.gameStage == 'settings' && on) {
            keyPressed = keyPressed.replace('WheelUp', 'ArrowUp').replace('WheelDown', 'ArrowDown')
            let currentConfig = state.game.state.selectSettingsOption.settingsOptions[state.game.state.selectSettingsOption.settingsSelect]

            if (state.onChangeKeyBind) {
                if (keyPressed != 'Escape') currentConfig.content = keyPressed
                state.onChangeKeyBind = false
            } else switch (keyPressed) {
                case 'ArrowUp':
                    state.game.state.selectSettingsOption.settingsSelect = state.game.state.selectSettingsOption.settingsSelect <= 0 ? state.game.state.selectSettingsOption.settingsOptions.length-1 : state.game.state.selectSettingsOption.settingsSelect-1
                    state.game.playSong('Sounds/scrollMenu.ogg')
                    break
                case 'ArrowDown':
                    state.game.state.selectSettingsOption.settingsSelect = state.game.state.selectSettingsOption.settingsSelect >= state.game.state.selectSettingsOption.settingsOptions.length-1 ? 0 : state.game.state.selectSettingsOption.settingsSelect+1
                    state.game.playSong('Sounds/scrollMenu.ogg')
                    break
                case 'ArrowLeft':
                    if (currentConfig.type == 'Number' && currentConfig.content > currentConfig.min) {
                        currentConfig.content = Number((currentConfig.content-currentConfig.add).toFixed(1))
                        state.game.playSong('Sounds/scrollMenu.ogg')
                    }
                    break
                case 'ArrowRight':
                    if (currentConfig.type == 'Number' && currentConfig.content < currentConfig.max) {
                        currentConfig.content = Number((currentConfig.content+currentConfig.add).toFixed(1))
                        state.game.playSong('Sounds/scrollMenu.ogg')
                    }
                    break
                case 'Enter':
                    switch (currentConfig.type) {
                        case 'Boolean':
                            currentConfig.content = currentConfig.content ? false : true
                            state.game.playSong('Sounds/scrollMenu.ogg')
                            break
                        case 'KeyBind':
                            state.onChangeKeyBind = true
                            state.game.playSong('Sounds/scrollMenu.ogg')
                            break
                    }
                    
                    break
            }
        }

        if (state.game.state.gameStage == 'menu' && on) {
            keyPressed = keyPressed.replace('WheelUp', 'ArrowUp').replace('WheelDown', 'ArrowDown')
            
            switch (keyPressed) {
                case 'ArrowUp':
                    state.game.state.selectMenuOption.menuSelect = state.game.state.selectMenuOption.menuSelect <= 0 ? state.game.state.selectMenuOption.menuOptions.length-1 : state.game.state.selectMenuOption.menuSelect-1
                    state.game.playSong('Sounds/scrollMenu.ogg')
                    break
                case 'ArrowDown':
                    state.game.state.selectMenuOption.menuSelect = state.game.state.selectMenuOption.menuSelect >= state.game.state.selectMenuOption.menuOptions.length-1 ? 0 : state.game.state.selectMenuOption.menuSelect+1
                    state.game.playSong('Sounds/scrollMenu.ogg')
                    break
                case 'Enter':
                    if (state.game.state.selectMenuOption.menuOptions[state.game.state.selectMenuOption.menuSelect] == 'Singleplayer') {
                        state.game.state.online = false
                        state.game.state.smallFunctions.redirectGameStage('selectMusic')
                    } else if (state.game.state.selectMenuOption.menuOptions[state.game.state.selectMenuOption.menuSelect] == 'Multiplayer') {
                        if (state.game.state.ping) {
                            state.game.state.online = true
                            state.game.state.smallFunctions.redirectGameStage('onlineServerList')
                            socket.emit('getListServers')
                        } else alert('No connection to the server!')
                    } else {
                        state.game.state.online = true
                        state.game.state.smallFunctions.redirectGameStage('settings')
                    }
                    
                    break
            }
        }
    }

    return {
        state,
        handleKeys
    }
}