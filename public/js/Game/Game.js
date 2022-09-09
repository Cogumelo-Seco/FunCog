function createGame(Listener, canvas, socket) {
    const state = {
        fps: '0-0',
        online: true,
        waiting: true,
        serverId: null,
        serverInfo: {},
        rainbowColor: 0,
        debug: false,
        gameStage: 'loading',
        gameStageTime: 0,
        musicMenu: null,
        selectMusicMenu: {
            musicSelect: 0,
            difficultySelected: 0,
        },
        selectMenuOption: {
            menuOptions: [ 'Singleplayer', 'Multiplayer' ], //'Settings' ],
            menuSelect: 0
        },
        selectServerOption: {
            serverSelect: 0,
            createServer: false,
            listServers: []
        },
        personalizedNotes: {},
        images: {},
        sounds: {},
        musics: [],
        difficulties: [],
        opponentArrows: [],
        spaceBetweenArrows: 10,
        resizeNote: 0.9,
        resizeNoteOpponent: 0,
        resizeNoteOpponentInMiddleScroll: 0.75,
        arrowsYLineMargin: 50,
        arrowsYLine: 0,
        
        arrowsYLineOpponent: 0,
        amountOfArrowsOpponent: 3,
        amountOfArrows: 3,
        downScroll: true,
        middleScroll: true,
        botPlay: false,
        musicNotes: [],
        musicOpponentNotes: [],
        musicOriginalNotes: [],
        musicOriginalOpponentNotes: [],
        musicBPM: 1,
        totalMusicSteps: 0,
        totalMusicPos: 0,
        musicBeat: 0,
        music: null,
        musicVoice: null,
        musicEventListener: null,
        notesImageDir: null,
        musicInfo: {},
        musicInfoOpponent: {},
        countdown: 4,

        arrowsInfo: {},
        arrowsInfoOpponent: {},

        screenYMovement: 0,
        screenXMovement: 0,
        screenZoom: 0,
        screenZooming: false,
        screenRotation: 0,

        animations: {
            icons: {
                frame: 0,
                startFrame: 0,
                endFrame: 10,
                totalDalay: 5,
                dalay: 0,
                loop: true,
            },
            ratingImage: {
                frame: 0,
                startFrame: 0,
                endFrame: 20,
                totalDalay: 2,
                dalay: 0,
                loop: false
            },
            BFDead: {
                frame: 0,
                startFrame: 0,
                endFrame: 5,
                totalDalay: 120,
                dalay: 0,
                loop: true
            },
            arrows: {
                frame: 0,
                startFrame: 0,
                endFrame: 2,
                totalDalay: 70,
                dalay: 0,
                loop: true
            },
            hitKillNote: {
                frame: 0,
                startFrame: 1,
                endFrame: 6,
                totalDalay: 40,
                dalay: 0,
                loop: true
            },
            fireNote: {
                frame: 0,
                startFrame: 0,
                endFrame: 11,
                totalDalay: 40,
                dalay: 0,
                loop: true
            },
        },
        loading: {
            loaded: 0,
            total: 0,
            msg: 'Loading...'
        },
    }

    const addImages = (command) => require('./GameFunctions/addImages').default(state)
    const addSounds = (command) => require('./GameFunctions/addSounds').default(state)
    const addMusicList = (command) => require('./GameFunctions/addMusicList').default(state)
    const addDifficulties = (command) => require('./GameFunctions/addDifficulties').default(state)
    const addPersonalizedNotes = (command) => require('./GameFunctions/addPersonalizedNotes').default(state)

    const playSong = (type, command) => require('./GameFunctions/playSong').default(type, command, state)
    const calculateRating = (command) => require('./GameFunctions/calculateRating').default(command, state)
    const smallFunctions = require('./GameFunctions/smallFunctions').default(state)
    state.smallFunctions = smallFunctions
    state.calculateRating = calculateRating
    state.playSong = playSong
    state.canvas = canvas

    const startMusic = (command) => require('./GameFunctions/startMusic').default(command, state)
    const verifyClick = (command) => require('./GameFunctions/verifyClick').default(command, state)

    async function start(command) {
        function gameLoop() {
            if (state.online && state.serverId) {
                if (state.serverInfo.end == true) {
                    state.waiting = true
                    state.serverId = null
                    state.serverInfo = {}
                    state.smallFunctions.redirectGameStage('onlineServerList')
                    state.music?.pause()
                    state.musicVoice?.pause()
                    state.music.currentTime = 0
                    state.musicInfo.health = 50
                    state.musicNotes = []
                    state.musicOpponentNotes = []
                }

                state.musicInfo.arrows = Listener.state.arrows

                socket.emit('updateGame', {
                    serverId: state.serverId,
                    data: state.musicInfo
                })
            }

            if (state.botPlay) {
                state.musicInfo.misses = 0
            }

            state.musicBeat = Number.parseInt(state.music?.currentTime*(state.musicBPM/60))
            state.musicStep = Number.parseInt(state.music?.currentTime*(state.musicBPM/60)*4)

            if (state.musicVoice && state.music && Math.abs(state.musicVoice.currentTime-state.music.currentTime) > 0.05) state.musicVoice.currentTime = state.music.currentTime

            if (!state.arrowsInfoOpponent[0]) {
                for (let arrowID = 0;arrowID <= state.amountOfArrowsOpponent;arrowID++) {
                    if (!state.opponentArrows[arrowID]) state.opponentArrows[arrowID] = { click: false }
                    if (!state.arrowsInfoOpponent[arrowID]) state.arrowsInfoOpponent[arrowID] = { 
                        X: null,
                        Y: null,
                        defaultX: null,
                        defaultY: null,
                        resetX: true,
                        resetY: true,
                        resetEnable: true,
                        alpha: 1,
                        noteAlpha: 1,
                        rotation: 0
                    }
                }
            }

            if (!state.arrowsInfo[0]) {
                for (let arrowID = 0;arrowID <= state.amountOfArrows;arrowID++) {
                    if (!state.arrowsInfo[arrowID]) state.arrowsInfo[arrowID] = { 
                        X: null,
                        Y: null,
                        defaultX: null,
                        defaultY: null,
                        resetX: true,
                        resetY: true,
                        resetEnable: true,
                        alpha: 1,
                        noteAlpha: 1,
                        rotation: 0
                    }
                }
            }

            let lastResizeNoteOpponent = state.resizeNoteOpponent
            let lastArrowsYLineOpponent = state.arrowsYLineOpponent
            let lastArrowsYLine = state.arrowsYLine

            state.arrowsYLine = state.downScroll ? canvas.height-state.arrowsYLineMargin-state.arrowsSize**state.resizeNote : state.arrowsYLineMargin
            state.arrowsYLineOpponent = state.middleScroll ? state.downScroll ? canvas.height*0.60 : canvas.height*0.40 : state.arrowsYLine
            state.resizeNoteOpponent = state.middleScroll ? state.resizeNoteOpponentInMiddleScroll : state.resizeNote

            if (state.arrowsYLineOpponent != lastArrowsYLineOpponent || state.arrowsYLine != lastArrowsYLine || state.resizeNoteOpponent != lastResizeNoteOpponent) {
                for (let i in state.arrowsInfo) {
                    if (state.arrowsInfo[i].resetEnable) {
                        state.arrowsInfo[i].resetX = true
                        state.arrowsInfo[i].resetY = true
                    }
                }
                for (let i in state.arrowsInfoOpponent) {
                    if (state.arrowsInfoOpponent[i].resetEnable) {
                        state.arrowsInfoOpponent[i].resetX = true
                        state.arrowsInfoOpponent[i].resetY = true
                    }
                }
            }

            if (state.gameStage == 'game' && state.musicInfo.health <= 0 && !state.botPlay && !state.debug && state.music?.currentTime > 3) {
                state.music?.pause()
                state.musicVoice?.pause()
                state.music.currentTime = 0
                state.smallFunctions.redirectGameStage('dead')
                state.musicInfo.health = 50
                state.musicNotes = []
                state.musicOpponentNotes = []
                state.gameStageTime = +new Date()

                if (state.online && state.serverId) {
                    socket.emit('deadPlayer', { 
                        serverId: state.serverId
                     })
                } else {
                    playSong('Sounds/fnf_loss_sfx.ogg')
                    setTimeout(() => playSong('Sounds/gameOver.ogg', { musicMenu: true }), 2000)
                }
            }
            else if (state.musicInfo.health > 100) state.musicInfo.health = 100
            else if (state.musicInfo.health < 0) state.musicInfo.health = 0

            let musicDuration = state.music?.duration
            let musicCurrentTime = state.music?.currentTime

            if (musicDuration <= musicCurrentTime) {
                state.smallFunctions.redirectGameStage('selectMusic')
                state.musicInfo.health = 50
                state.musicNotes = []
                state.musicOpponentNotes= []
            }

            for (let i in state.musicNotes) {
                state.musicNotes[i].Y = -((state.musicNotes[i].time-musicCurrentTime)*((5**state.resizeNote)*state.musicBPM))
                if (state.musicNotes[i].errorWhenNotClicking && !state.botPlay && state.musicNotes[i].arrowID >= 0 && state.musicNotes[i].arrowID <= state.amountOfArrows && state.musicNotes[i].Y > 200 && !state.musicNotes[i].disabled && !state.musicNotes[i].clicked) {
                    state.musicNotes[i].disabled = true
                    state.musicInfo.misses += 1
                    state.musicInfo.score -= 50
                    state.musicInfo.health -= 2.5
                    state.musicInfo.combo = 0
                    state.musicInfo.accuracyMedia.push(1)
                    state.musicEventListener('passedNote', { note: state.musicNotes[i], listenerState: Listener.state }, state)
                }
            }

            for (let i in state.musicOpponentNotes) {
                state.musicOpponentNotes[i].Y = -((state.musicOpponentNotes[i].time-musicCurrentTime)*((5**state.resizeNoteOpponent)*state.musicBPM))
            }

            state.musicInfo.accuracy = 0
            for (let i in state.musicInfo.accuracyMedia) state.musicInfo.accuracy += state.musicInfo.accuracyMedia[i]
            state.musicInfo.accuracy = state.musicInfo.accuracy/state.musicInfo.accuracyMedia?.length || 0

            for (let i in state.animations) {
                let animation = state.animations[i]

                if (animation.dalay <= +new Date()) {
                    animation.frame += animation.boomerang ? animation.boomerangForward ? 1 : -1 : 1
                    if (animation.frame > animation.endFrame) {
                        if (!animation.boomerang) animation.frame = animation.loop ? animation.startFrame : animation.endFrame
                        else animation.boomerangForward = animation.boomerangForward ? false : true
                    } else if (animation.frame < animation.startFrame) {
                        animation.boomerangForward = animation.boomerangForward ? false : true
                        animation.frame = animation.startFrame
                    }
                    animation.dalay = +new Date()+animation.totalDalay
                }
            }

            state.rainbowColor = state.rainbowColor >= 360 ? 0 : state.rainbowColor+1

            setTimeout(() => gameLoop(), 1000/40)
        }
        gameLoop()
        
        //let interval = setInterval(() => null, 1000/30);
    }

    async function loading(command) {
        state.loading.total += await addImages()
        state.loading.total += await addSounds()
        addMusicList()
        addDifficulties()
        addPersonalizedNotes()

        /*state.loading.total = 50
        let interval = setInterval(() => {
            if (state.loading.loaded < state.loading.total) state.loading.loaded += 1
        }, 100)*/

        const newLoad = (msg) => {
            state.loading.loaded += 1
            state.loading.msg = `(${state.loading.loaded}/${state.loading.total}) - ${msg}`
        }

        for (let i of state.images) {
            let img = new Image()
            img.addEventListener('error',(e) => {
                console.warn('ERROR: '+e.path[0].src)
                newLoad('ERROR: '+e.path[0].src)
            })
            img.addEventListener('load', (e) => newLoad(e.path[0].src))
            img.src = `/imgs/${i}`
            img.id = i
            state.images[i] = img
        }

        for (let i of state.sounds) {
            let sound = new Audio()
            sound.addEventListener('loadeddata', (e) => newLoad(e.path[0].src))
            /*sound.addEventListener('error', (e) => {
                console.warn('ERROR: '+e.path[0].src)
                newLoad('ERROR: '+e.path[0].src)
            })*/
            sound.src = `/${i}`
            state.sounds[i] = sound
        }

        let interval = setInterval(() => {
            if (state.loading.loaded >= state.loading.total) {// || state.gameStage != 'loading') {
                state.loading.msg = `(${state.loading.loaded}/${state.loading.total}) 100% - Complete loading`
                clearInterval(interval)
                if (state.gameStage == 'loading') setTimeout(() => state.smallFunctions.redirectGameStage('menu'), 500)
            }
        }, 1000/40)

        setTimeout(() => {
            state.loading.msg = `(${state.loading.loaded}/${state.loading.total}) 100% - Complete loading`
            clearInterval(interval)
            if (state.gameStage == 'loading') setTimeout(() => state.smallFunctions.redirectGameStage('menu'), 500)
        }, 40000)
    }
    
    return {
        start,
        loading,
        playSong,
        state,
        startMusic,
        verifyClick
    }
}

export default createGame