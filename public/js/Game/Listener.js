export default function createListener(socket) {
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
            4: (key) => key == 'ArrowRight' || key == 'KeyK',
        }
    }

    require('./ListenerFunctions/addButtons').default(state)

    document.onmousemove = (event) => {
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
        let X = Math.floor(event.pageX/window.innerWidth*1000)
        let Y = Math.floor(event.pageY/window.window.innerHeight*1000)

        if (state.game) for (let i in state.buttons) {
            let button = state.buttons[i]
            if (
                button.gameStage && button.gameStage.includes(state.game.state.gameStage) && X > button.minX && X < button.maxX && Y > button.minY && Y < button.maxY && button.onClick ||
                !button.gameStage && X > button.minX && X < button.maxX && Y > button.minY && Y < button.maxY && button.onClick
            ) button.onClick()
        }
    })

    document.addEventListener('keydown', (event) => handleKeys({ event, on: true }))
    document.addEventListener('keyup', (event) => handleKeys({ event, on: false }))
    
    function handleKeys({ event, on }) {
        let keyPressed = event.code
        let lastClick = state.keys[keyPressed]
        state.keys[keyPressed] = {
            clicked: on,
            time: +new Date(),
            lastClickTime: lastClick?.time || null
        }

        if (state.game) for (let i in state.buttons) {
            let button = state.buttons[i]
            if (button && on && button.gameStage?.includes(state.game.state.gameStage) && button.keyPress == keyPressed) button.onClick()
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
            //if (keyPressed == 'KeyT' && on) state.game.state.speed += 0.2
            if (keyPressed == 'KeyQ' && on) state.game.state.downScroll = state.game.state.downScroll ? false : true
            if (keyPressed == 'KeyW' && on) state.game.state.middleScroll = state.game.state.middleScroll ? false : true

            if (keyPressed == 'KeyR' && on && !state.game.state.online) state.game.state.musicInfo.health = -100

            if (keyPressed == 'Enter' && on) document.getElementById('gameVideo').currentTime = document.getElementById('gameVideo').duration

            if (keyPressed == 'Escape' && on && !state.game.state.online && state.game.state.countdown <= -1) {
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
            setTimeout(() => state.game.state.smallFunctions.redirectGameStage('selectMusic'), 1500)
        }

        if (state.game.state.gameStage == 'selectMusic' && on) {
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
                            listenerState: state
                        })
                    } else {
                        state.musicMenu?.pause()
                        state.game.playSong('Sounds/confirmMenu.ogg')
                        state.game.state.smallFunctions.redirectGameStage('game')

                        state.game.startMusic({ 
                            musicInfo,
                            difficulty: state.game.state.difficulties[musicInfo.difficulties[state.game.state.selectMusicMenu.difficultySelected]],
                            listenerState: state
                        })
                    }
                    break
            }
        }

        if (state.game.state.gameStage == 'onlineServerList' && on) {
            switch (keyPressed) {
                case 'ArrowUp':
                    state.game.state.selectServerOption.serverSelect = state.game.state.selectServerOption.serverSelect <= 0 ? (state.game.state.selectServerOption.listServers.filter(s => s.open)).length-1 : state.game.state.selectServerOption.serverSelect-1
                    state.game.playSong('Sounds/scrollMenu.ogg')
                    break
                case 'ArrowDown':
                    state.game.state.selectServerOption.serverSelect = state.game.state.selectServerOption.serverSelect >= (state.game.state.selectServerOption.listServers.filter(s => s.open)).length-1 ? 0 : state.game.state.selectServerOption.serverSelect+1
                    state.game.playSong('Sounds/scrollMenu.ogg')
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
                    if (state.game.state.selectServerOption.createServer) {
                        state.game.state.smallFunctions.redirectGameStage('selectMusic')

                        state.game.state.serverId = socket.id
                    } else if (state.game.state.selectServerOption.listServers[0]) {
                        let server = state.game.state.selectServerOption.listServers[state.game.state.selectServerOption.serverSelect]
                        state.game.state.serverId = server.id

                        if (state.game.state.serverId) {
                            let musicInfo = state.game.state.musics[server.mod].musics[server.music]

                            state.game.startMusic({ 
                                musicInfo,
                                difficulty: state.game.state.difficulties[musicInfo.difficulties[server.difficulty]],
                                listenerState: state,
                                opponentPlayer: true,
                            })

                            socket.emit('connectServer', {
                                serverId: state.game.state.serverId
                            })

                            state.game.state.smallFunctions.redirectGameStage('game')
                        }
                    }
                    break
            }
        }

        if (state.game.state.gameStage == 'menu' && on) {
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
                    } else {
                        state.game.state.online = true
                        state.game.state.smallFunctions.redirectGameStage('onlineServerList')
                        socket.emit('getListServers')
                    }
                    
                    break
            }
        }
    }

    return {
        state
    }
}