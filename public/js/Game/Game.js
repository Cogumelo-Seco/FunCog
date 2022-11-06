function createGame(Listener, canvas, socket) {
    const state = {
        speed: 1,
        fps: '0-0',
        renderType: 'limited',
        online: true,
        waiting: true,
        serverId: null,
        serverInfo: {},
        gameLoopFPSControlTime: 0,
        rainbowColor: 0,
        debug: false,
        gameStage: 'loading',
        gameStageTime: 0,
        musicMenu: null,
        selectMusicMenu: {
            musicSelect: -1,
            modSelect: 0,
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
        toLoadInScreen: {},
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
        musicChangeBPM: {},
        oldChangeBPM: 0,
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
            loadingLogo: {
                frame: 0,
                startFrame: 0,
                endFrame: 50,
                totalDalay: 0,
                dalay: 0,
                paused: true,
            },
            icons: {
                frame: 0,
                startFrame: 0,
                endFrame: 10,
                totalDalay: 20,
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
                endFrame: 11,
                totalDalay: 110,
                dalay: 0
            },
            BFDeadLoop: {
                frame: 0,
                startFrame: 0,
                endFrame: 3,
                totalDalay: 110,
                dalay: 0,
                loop: true
            },
            arrows: {
                frame: 0,
                startFrame: 0,
                endFrame: 2,
                totalDalay: 40,
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
            VSChiraMarsh: {
                frame: 0,
                startFrame: 0,
                endFrame: 12,
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
        loadingSong: {
            loaded: 0,
            total: 0
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

    async function start() {
        let videoElement = document.getElementById('gameVideo')

        videoElement.addEventListener('loadeddata', () => {
            videoElement.style.display = 'block'
            videoElement.play()
        })

        videoElement.addEventListener('ended', () => {
            videoElement.style.display = 'none'
        })
    }

    async function gameLoop(command) {
        /*function gameLoop() {*/
            document.title = `Cogu - ${state.gameStage}`

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

            state.musicBeat = Number.parseInt(state.music?.currentTime*(state.musicBPM/60))
            state.musicStep = Number.parseInt(state.music?.currentTime*(state.musicBPM/60)*4)

            console.log(Math.abs(state.musicVoice?.currentTime-state.music?.currentTime))
            if (state.musicVoice && state.music && Math.abs(state.musicVoice.currentTime-state.music.currentTime) > 0.09) state.musicVoice.currentTime = state.music.currentTime

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
                state.animations.BFDead.frame = 0
                state.smallFunctions.redirectGameStage('dead')
                state.waiting = true
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

            if (musicDuration <= musicCurrentTime && state.musicNotes.length+state.musicOpponentNotes.length > 0) {
                state.waiting = true
                state.musicInfo.health = 50
                state.musicNotes = []
                state.musicOpponentNotes= []
                state.music = null
                if (state.online) state.smallFunctions.redirectGameStage('onlineServerList', 'menu')
                else state.smallFunctions.redirectGameStage('selectMusic', 'menu')
            }

            for (let i in state.musicChangeBPM) {
                if (Number(i)/1000 <= musicCurrentTime && state.musicChangeBPM[i] != state.oldChangeBPM) {
                    changeBPM(state.musicChangeBPM[i], true)
                    state.oldChangeBPM = state.musicChangeBPM[i]
                }
            }

            function changeBPM(bpm, newBPM) {
                if (state.musicChangeBPMNew && newBPM) state.musicBPM = state.musicChangeBPMNew
                clearTimeout(state.changeBPMTimeout)

                //if (state.musicBPM > bpm-2 && state.musicBPM < bpm+2) state.musicBPM = bpm
                if (state.musicBPM != bpm) {
                    state.musicBPM = state.musicBPM > bpm ? state.musicBPM-1 : state.musicBPM+1
                    state.musicChangeBPMNew = bpm
                    state.changeBPMTimeout = setTimeout(() => changeBPM(bpm), 1000/30)
                }
            }

            for (let i in state.musicNotes) {
                let newNoteY = -((state.musicNotes[i].time-musicCurrentTime)*((5**state.resizeNote)*state.musicBPM))
                let oldNoteY = state.musicNotes[i].oldY || -musicDuration*1000
                if (newNoteY >= oldNoteY) {
                    state.musicNotes[i].Y = newNoteY
                    state.musicNotes[i].oldY = newNoteY
                }

                if (state.musicNotes[i].errorWhenNotClicking && !state.botPlay && state.musicNotes[i].arrowID >= 0 && state.musicNotes[i].arrowID <= state.amountOfArrows && state.musicNotes[i].Y > (state.arrowsSize**state.resizeNote) && !state.musicNotes[i].disabled && !state.musicNotes[i].clicked) {
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
                let newNoteY = -((state.musicOpponentNotes[i].time-musicCurrentTime)*((5**state.resizeNoteOpponent)*state.musicBPM))
                let oldNoteY = state.musicOpponentNotes[i].oldY || -musicDuration*1000
                if (newNoteY >= oldNoteY) {
                    state.musicOpponentNotes[i].Y = newNoteY
                    state.musicOpponentNotes[i].oldY = newNoteY
                }
            }

            state.musicInfo.accuracy = 0
            for (let i in state.musicInfo.accuracyMedia) state.musicInfo.accuracy += state.musicInfo.accuracyMedia[i]
            state.musicInfo.accuracy = state.musicInfo.accuracy/state.musicInfo.accuracyMedia?.length || 0

            if (state.gameLoopFPSControlTime+30 <= +new Date()) {
                state.gameLoopFPSControlTime = +new Date()

                for (let i in state.animations) {
                    let animation = state.animations[i]

                    if (animation.dalay <= +new Date() && !animation.paused) {
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
            }

            /*setTimeout(() => gameLoop(), 1000/40)
        }
        gameLoop()*/
    }

    async function loading(command) {
        let loadingImagesTotal = await addImages()
        let loadingSoundsTotal = await addSounds()
        state.loading.total = loadingImagesTotal
        state.loading.total += loadingSoundsTotal
        addMusicList()
        addDifficulties()
        addPersonalizedNotes()

        let toLoad = state.images.concat(state.sounds)

        const newLoad = (msg) => {
            state.loading.loaded += 1
            state.loading.msg = `(${state.loading.loaded}/${state.loading.total}) - ${msg}`

            if (state.loading.loaded >= state.loading.total) completeLoading()
            else load(toLoad[state.loading.loaded])
        }

        const completeLoading = () => {
            state.loading.msg = `(${state.loading.loaded}/${state.loading.total}) 100% - Complete loading`
            state.animations.loadingLogo.paused = false
            if (state.gameStage == 'loading') {
                let interval = setInterval(() => {
                    if (state.animations.loadingLogo.frame >= state.animations.loadingLogo.endFrame) {
                        clearInterval(interval)
                        state.animations.loadingLogo.paused = true
                        state.smallFunctions.redirectGameStage('menu')
                    }
                }, 2000)
            }
        }

        const load = async({ dir, animationConfigDir}) => {
            let loaded = false

            setTimeout(() => {
                if (!loaded) newLoad('[ERROR File failed to load] '+dir)
            }, 10000)

            if ([ 'ogg', 'mp3' ].includes(dir.split('.')[dir.split('.').length-1])) {
                let link = 'https://raw.githubusercontent.com/Cogumelo-Seco/Cogu-FNF-Files/main/'+dir

                let sound = new Audio()
                sound.addEventListener('loadeddata', (e) => {
                    loaded = true
                    newLoad(e.path[0].src)
                })
                sound.addEventListener('error', (e) => newLoad('[ERROR] '+dir))
                sound.src = dir.split('/')[0] == 'Sounds' ? `/${dir}` : link
                state.sounds[dir] = sound
            } else {
                let link = 'https://raw.githubusercontent.com/Cogumelo-Seco/Cogu-FNF-Files/main/imgs/'+dir
                let animationConfig = animationConfigDir ? JSON.parse(await fetch('https://raw.githubusercontent.com/Cogumelo-Seco/Cogu-FNF-Files/main/imgs/'+animationConfigDir).then(r => r.text())) : null

                let img = new Image()
                img.addEventListener('load', (e) => {
                    loaded = true
                    newLoad(e.path[0].src)
                })
                img.addEventListener('error',(e) => newLoad('[ERROR] '+dir))
                img.src = link//`/imgs/${dir}`
                img.id = dir
                state.images[dir] = {
                    image: img,
                    animationConfig
                }
            }
        }

        load(toLoad[0])
    }
    
    return {
        start,
        gameLoop,
        loading,
        playSong,
        state,
        startMusic,
        verifyClick
    }
}

export default createGame