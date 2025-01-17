function createGame(Listener, canvas) {
    const state = {
        debug: false,
        fps: '0-0',
        ping: '???',
        customBongPosition: { X: null, Y: null },
        SunshineMeme: false,
        myConfig: {
            logged: false,
            author: {
                name: `Guest${Math.floor(Math.random()*1000)}`,
                avatar: null
            },
            colorName: null,
            colorContent: null,
            emoji: null,
            xp: 0,
            level: 0
        },
        messages: [],
        gameStage: 'loading',
        inLogin: true,
        waiting: true,
        serverId: null,
        serverInfo: {},
        serverPlayers: {
        },
        gameLoopFPSControlTime: 0,
        gameLoopFPSControlTime2: 0,
        rainbowColor: 0,
        gameStageTime: 0,
        musicMenu: null,
        selectMusicMenu: {
            musicSelect: 0,
            modSelect: 0,
            difficultySelected: 0,
            currentSelection: 0
        },
        selectMenuOption: {
            menuOptions: [ 'ModList', 'Settings' ],
            menuSelect: -1
        },
        selectSettingsOption: {
            settingsOptions: [],
            settingsSelect: 0
        },
        selectServerOption: {
            serverSelect: 0,
            createServer: false,
            listServers: []
        },
        selectPauseOption: {
            pauseSelect: 0,
            pauseOptions: [
                {
                    name: 'Resume'
                },
                {
                    name: 'Exit'
                }
            ]
        },
        modifiers: {
            speed: 1
        },
        personalizedNotes: {},
        toLoadInScreen: {},
        images: {},
        sounds: {},
        musics: [],
        difficulties: [],
        opponentArrows: [],
        arrowsWidth: 0,
        arrowsWidthOpponent: 0,
        resizeNote: 0.91,
        resizeNoteOpponent: 0,
        resizeNoteOpponentInMiddleScroll: 0.75,
        holdHeight: 44,
        arrowsMargin: 85,
        arrowsYLine: 0,
        alphaHUD: 1,
        speed: 1,
        scoreToAdd: 200,
        invertArrowPos: false,
        
        arrowsYLineOpponent: 0,
        changeBPMTimeoutValue: 1000/30,
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
        musicData: {},
        videoBackground: null,
        musicData: {},
        musicEventListener: () => null,
        notesImageDir: null,
        musicInfo: {
        },
        musicInfoOpponent: {
            judgements: {}
        },
        backgroundInfo: {
            zoom: 500,
            defaultMovementX: -100,
            defaultMovementY: 0,
            movementX: 20,
            movementY: 20,
            rotation: 0
        },
        countdown: 4,

        arrowsInfo: {},
        arrowsInfoOpponent: {},

        screenYMovement: 0,
        screenXMovement: 0,
        screenZoom: 0,
        screenFilter: '',
        screenZooming: false,
        screenRotation: 0,

        opponentRatingLoaded: {},

        defaultAnimations: {
            menuLogoAnimation: {
                frame: 0,
                startFrame: 0,
                endFrame: 300,
                totalDalay: 0,
                dalay: 0,
                loop: true
            },
            arrowKeys: {
                frame: 0,
                startFrame: 0,
                endFrame: 150,
                totalDalay: 0,
                dalay: 0,
                paused: true,
            },
            loadingLogo: {
                frame: 0,
                startFrame: 0,
                endFrame: 50,
                totalDalay: 0,
                dalay: 0,
                paused: true,
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
            transition: {
                frame: 15,
                startFrame: 0,
                endFrame: 15,
                totalDalay: 0,
                dalay: 0,
            },
            code: {
                frame: 100,
                startFrame: 0,
                endFrame: 100,
                totalDalay: 30,
                dalay: 0,
            }
        },
        animations: {},
        loading: {
            loaded: 0,
            total: 0,
            msg: 'Loading...'
        },
        loadingSong: {
            complete: false,
            loaded: 0,
            total: 0,
            msg: 'Loading...'
        },
        filesURL: 'https://raw.githubusercontent.com/Cogumelo-Seco/Cogu-FNF-Files/refs/heads/main/'
    }

    const addImages = (command) => require('./GameFunctions/addImages').default(state)
    const addSounds = (command) => require('./GameFunctions/addSounds').default(state)
    const addMusicList = (command) => require('./GameFunctions/addMusicList').default(state)
    const addDifficulties = (command) => require('./GameFunctions/addDifficulties').default(state)
    const addPersonalizedNotes = (command) => require('./GameFunctions/addPersonalizedNotes').default(state)
    const addSettings = (command) => require('./GameFunctions/addSettings').default(state)

    const playSong = (type, command) => require('./GameFunctions/playSong').default(type, command, state)
    const calculateRating = (command) => require('./GameFunctions/calculateRating').default(command, state)
    const smallFunctions = require('./GameFunctions/smallFunctions').default(state, Listener)
    const codes = require('./GameFunctions/codes').default(state)
    state.Listener = Listener
    state.smallFunctions = smallFunctions
    state.calculateRating = calculateRating
    state.playSong = playSong
    state.canvas = canvas

    const startMusic = (command) => require('./GameFunctions/startMusic').default(command, state)
    const verifyClick = (command) => require('./GameFunctions/verifyClick').default(command, state)

    async function start() {
        let videoElement = document.getElementById('gameVideo')

        /*videoElement.addEventListener('loadeddata', () => {
            videoElement.style.display = 'block'
            setTimeout(() => videoElement.play(), 1000)
        })*/

        videoElement.addEventListener('ended', () => {
            videoElement.style.display = 'none'
        })
    }

    function updateLocalPlayer() {
        state.myConfig.settings = state.selectSettingsOption.settingsOptions
    }

    async function gameLoop(command) {
        updateLocalPlayer()

        let botPlay = state.smallFunctions.getConfig('botPlay')
        let botResponseTime = state.smallFunctions.getConfig('botResponseTime')
        let ScrollSpeed = state.smallFunctions.getConfig('ScrollSpeed')

        document.title = `Cogu - ${state.gameStage}`

        if (state.music?.buffered.length) {
            let loaded = state.music?.buffered.end(0) / state.music.duration;
            let played = state.music.currentTime / state.music.duration;
            state.musicData.loaded = loaded
            state.musicData.played = played
        }

        state.musicBeat = Number.parseInt(state.music?.currentTime*(state.musicBPM/60))
        state.musicStep = Number.parseInt(state.music?.currentTime*(state.musicBPM/60)*4)

        if (state.musicVoice && state.music && Math.abs(state.musicVoice.currentTime-state.music.currentTime) > 0.09) state.musicVoice.currentTime = state.music.currentTime
        if (state.videoBackground && state.music && Math.abs(state.videoBackground.currentTime-state.music.currentTime) > 0.09) state.videoBackground.currentTime = state.music.currentTime

        if (!state.arrowsInfoOpponent[0]) {
            for (let arrowID = 0;arrowID <= 3;arrowID++) {
                if (!state.opponentArrows[arrowID]) state.opponentArrows[arrowID] = { click: false }
                if (!state.arrowsInfoOpponent[arrowID]) state.arrowsInfoOpponent[arrowID] = {
                    arrowID,
                    arrowFrameID: arrowID,
                    splashFrameID: arrowID,
                    imageDir: null,
                    pos: arrowID,
                    defaultPos: arrowID,
                    X: null,
                    Y: null,
                    defaultX: null,
                    defaultY: null,
                    fitX: 0,
                    fitY: 0,
                    resetX: true,
                    resetY: true,
                    resetEnable: true,
                    alpha: 1,
                    noteAlpha: 1,
                    splashAlpha: 1,
                    rotation: 0,
                    noteRotation: 0,
                    forceScroll: false,
                    forceScrollDown: smallFunctions.getConfig('DownScroll')
                }
            }
        }

        if (!state.arrowsInfo[0]) {
            for (let arrowID = 0;arrowID <= 3;arrowID++) {
                if (!state.arrowsInfo[arrowID]) state.arrowsInfo[arrowID] = {
                    arrowID,
                    arrowFrameID: arrowID,
                    splashFrameID: arrowID,
                    imageDir: null,
                    pos: arrowID,
                    defaultPos: arrowID,
                    X: null,
                    Y: null,
                    defaultX: null,
                    defaultY: null,
                    fitX: 0,
                    fitY: 0,
                    resetX: true,
                    resetY: true,
                    resetEnable: true,
                    alpha: 1,
                    noteAlpha: 1,
                    splashAlpha: 1,
                    rotation: 0,
                    noteRotation: 0,
                    forceScroll: false,
                    forceScrollDown: smallFunctions.getConfig('DownScroll')
                }
            }
        }

        state.resizeNoteOpponent = state.smallFunctions.getConfig('MiddleScroll') ? state.resizeNoteOpponentInMiddleScroll : state.resizeNote

        if (state.gameStage == 'game' && state.musicInfo.health <= 0 && !botPlay && !state.debug && state.music?.currentTime > 1) {
            state.gameStageTime = +new Date()
            
            state.musicInfo.dead = true
            state.smallFunctions.redirectGameStage('score', 'menu')

            state.animations.BFDead.frame = 0
            state.smallFunctions.resetGame()
        }
        else if (state.musicInfo.health > 100) state.musicInfo.health = 100
        else if (state.musicInfo.health < 0) state.musicInfo.health = 0

        let musicDuration = state.music?.duration
        let musicCurrentTime = state.music?.currentTime

        if (state.musicInfo.exit || musicCurrentTime > 1 && musicDuration <= musicCurrentTime && state.musicNotes.length+state.musicOpponentNotes.length > 0) {
            state.musicInfo.exit = false
            state.gameStageTime = +new Date()
            state.smallFunctions.resetGame()
            state.smallFunctions.redirectGameStage('score', 'menu')
        }

        for (let i in state.musicChangeBPM) {
            if (Number(i)/1000 >= musicCurrentTime && Number(i)/1000 <= musicCurrentTime+3 && state.musicChangeBPM[i] != state.oldChangeBPM) {
                changeBPM(state.musicChangeBPM[i])
                state.oldChangeBPM = state.musicChangeBPM[i]
            }
        }

        function changeBPM(bpm) {
            clearTimeout(state.changeBPMTimeout)

            if (state.musicBPM > bpm-1 && state.musicBPM < bpm+1) state.musicBPM = bpm
            if (state.musicBPM != bpm) {
                state.musicBPM = state.musicBPM > bpm ? state.musicBPM-1 : state.musicBPM+1
                state.musicChangeBPMNew = bpm
                state.changeBPMTimeout = setTimeout(() => changeBPM(bpm), state.changeBPMTimeoutValue)
            }
        }

        function moveNote(note, opponent, resizeNote) {
            let newNoteY = -((note.time-musicCurrentTime)*((5**resizeNote)*state.musicBPM)*ScrollSpeed*state.speed)
            note.Y = newNoteY
            if (botPlay && !note.botMissVerify && note.type == 'normal') note.botMiss = botResponseTime >= 160 ? Math.random()*(botResponseTime*2)-botResponseTime >= 160 ? true : false : false
            note.botMissVerify = true

            if (!opponent && Listener.state.arrows[note.arrowID]) {
                if (((botPlay && !note.botMiss) || note.autoClick) && Listener.state.arrows[note.arrowID].lastNoteClicked && Listener.state.arrows[note.arrowID].lastNoteClicked.Y >= (state.holdHeight**resizeNote)*(Listener.state.arrows[note.arrowID].lastNoteClicked.hold/(state.holdHeight))+(state.holdHeight*2)) Listener.state.arrows[note.arrowID].click = false
                if (!note.clicked && !note.disabled && ((botPlay && !note.botMiss) || note.autoClick) && (note.errorWhenNotClicking || note.autoClick) && newNoteY >= -10 && newNoteY <= (state.holdHeight**resizeNote)*(note.hold/(state.holdHeight))+(state.holdHeight*2)) {
                    Listener.state.arrows[note.arrowID].state = 'onNote'
                    Listener.state.arrows[note.arrowID].click = true
                    Listener.state.arrows[note.arrowID].lastNoteClicked = note

                    note.clicked = true
                    verifyClick({ arrowID: note.arrowID, listenerState: Listener.state, readyNote: note })
                }
            }
            
            if (!opponent && !Listener.state.pauseGameKeys && note.errorWhenNotClicking && (!botPlay || botPlay && note.botMiss) && state.arrowsInfo[note.arrowID] && note.Y > (state.arrowsInfo[note.arrowID]?.height**resizeNote) && !note.disabled && !note.clicked && (Number(note.arrowID) >= 0 && Number(note.arrowID) < Object.keys(state.arrowsInfo).length)) {
                note.disabled = true
                state.musicInfo.misses += 1
                state.musicInfo.score -= Number.parseInt(state.scoreToAdd/2)
                state.musicInfo.health -= 2.5
                state.musicInfo.combo = 0
                state.musicInfo.accuracyMedia.push(1)
                state.musicEventListener('passedNote', { note: note, listenerState: Listener.state }, state)
            }

            if (note.Y-note.hold > (state.arrowsInfo[note.arrowID]?.height**resizeNote) && !note.disabled) note.disabled = true

            if (opponent) {
                if (newNoteY >= 0 && !note.clicked && !note.disabled && (note.errorWhenNotClicking || note.autoClick)) {
                    state.musicEventListener('noteClick', { noteClickAuthor: 'opponent', note, hold: false }, state)

                    if (note.hold > 0) {
                        let loop = () => {
                            if (!state.music?.paused && note.Y <= ((state.holdHeight**resizeNote)*(note.hold/(state.holdHeight))+(state.holdHeight/2*2))) {
                                state.musicEventListener('noteClick', { noteClickAuthor: 'opponent', note, hold: true }, state)
                                if (state.musicInfo.health > 5 && state.music?.currentTime > 1) state.musicInfo.health -= 0.2
                                setTimeout(() => loop(), 1000/10)
                            }
                        }
                        loop()
                    }
                    note.clicked = true
                    if (state.musicInfo.health > 5 && state.music?.currentTime > 1) state.musicInfo.health -= state.musicInfo.lifeDrain
                }
            }
        }

        if (state.gameStage == 'game') for (let i in state.musicNotes) {
            let note = state.musicNotes[i]
            let newNoteY = -((note.time-musicCurrentTime)*((5**(state.resizeNote*state.musicInfo.noteResize))*state.musicBPM)*ScrollSpeed*state.speed)
            if (note.time >= 0 && newNoteY >= -state.canvas.height && (note.Y <= state.canvas.height+note.hold || newNoteY <= state.canvas.height+note.hold)) moveNote(note, false, (state.resizeNote*state.musicInfo.noteResize))
        }

        if (state.gameStage == 'game') for (let i in state.musicOpponentNotes) {
            let note = state.musicOpponentNotes[i]
            let newNoteY = -((note.time-musicCurrentTime)*((5**(state.resizeNoteOpponent*state.musicInfo.noteResize))*state.musicBPM)*ScrollSpeed*state.speed)
            if (note.time >= 0 && newNoteY >= -state.canvas.height && (note.Y <= state.canvas.height+note.hold || newNoteY <= state.canvas.height+note.hold)) moveNote(note, true, (state.resizeNoteOpponent*state.musicInfo.noteResize))
        }

        state.musicInfo.accuracy = 0
        for (let i in state.musicInfo.accuracyMedia) state.musicInfo.accuracy += state.musicInfo.accuracyMedia[i]
        state.musicInfo.accuracy = state.musicInfo.accuracy/state.musicInfo.accuracyMedia?.length || 100

        for (let i in codes) {
            if (Listener.state.codeText.toLowerCase().includes(i)) {          
                Listener.state.codeText = ''
                let code = codes[i]()
                state.animations.code.frame = 0
                state.animations.code.on = code
            }
        }

        const messageBoxContent = document.getElementById('message-box-content')
        const chatPlaceholder = document.getElementById('placeholder')
        chatPlaceholder.style.display = messageBoxContent.innerHTML.length >= 1 ? 'none' : 'block'

        /* !!!!!!! FPS LIMITADO !!!!!!! */
        
        if (state.gameLoopFPSControlTime2+1000 <= +new Date()) {
            state.gameLoopFPSControlTime2 = +new Date()
            
            smallFunctions.loopImages()
            
            if (state.musicInfo.accuracyMedia?.length >= 1 && musicCurrentTime < musicDuration) {
                let media = 0
                let mediaData = []
                for (let i = 1; i <= 10;i++) mediaData.push(state.musicInfo.accuracyMedia[state.musicInfo.accuracyMedia.length-i])
                for (let i in mediaData) media += mediaData[i]
                state.musicInfo.accuracyMediaLow.push(media/mediaData.length || 100)

                state.musicInfo.linearAccuracyMedia.push(state.musicInfo.accuracy || 100)
            }
        }

        if (state.gameLoopFPSControlTime+25 <= +new Date()) {
            state.gameLoopFPSControlTime = +new Date()

            if (state.music?.currentTime > 0 && state.music?.currentTime < state.music?.duration && !state.music.paused) state.musicEventListener('gameLoop', { listenerState: Listener.state }, state)

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

            state.rainbowColor += 1
        }
    }

    async function loading() {
        state.animations = state.defaultAnimations
        let loadingImagesTotal = await addImages()
        let loadingSoundsTotal = await addSounds()
        state.loading.total = loadingImagesTotal
        state.loading.total += loadingSoundsTotal
        addMusicList()
        addDifficulties()
        addPersonalizedNotes()
        addSettings()

        let toLoad = state.images.concat(state.sounds)

        const newLoad = (msg) => {
            state.loading.loaded += 1
            state.loading.msg = `(${state.loading.loaded}/${state.loading.total}) - ${msg}`

            if (state.loading.loaded >= state.loading.total) completeLoading()
            else load(toLoad[state.loading.loaded])
        }

        const completeLoading = () => {
            state.loading.msg = `(${state.loading.loaded}/${state.loading.total}) 100% - Complete loading`
            if (state.gameStage == 'loading') {
                let interval = setInterval(() => {
                    state.animations.loadingLogo.paused = false

                    if (state.animations.loadingLogo.frame >= state.animations.loadingLogo.endFrame) {
                        clearInterval(interval)
                        state.animations.loadingLogo.paused = true
                        state.smallFunctions.redirectGameStage('menu')
                    }
                }, 1000)
            }
        }

        const load = async({ dir, animationConfigDir, local }) => {
            let loaded = false

            setTimeout(() => {
                if (!loaded) newLoad('[ERROR File failed to load] '+dir)
            }, 10000)

            if ([ 'ogg', 'mp3' ].includes(dir.split('.')[dir.split('.').length-1])) {
                let link = state.filesURL+dir

                let sound = new Audio()
                sound.addEventListener('loadeddata', (e) => {
                    loaded = true
                    newLoad(dir)
                })
                sound.addEventListener('error', (e) => newLoad('[ERROR] '+dir))
                sound.src = dir.split('/')[0] == 'Sounds' ? `/${dir}` : link
                sound.preload = 'auto'
                state.sounds[dir] = sound
            } else {
                let link = local ? '/'+dir : state.filesURL+'imgs/'+dir
                let animationConfig = animationConfigDir ? JSON.parse(await fetch(state.filesURL+'imgs/'+animationConfigDir).then(r => r.text())) : null

                let img = new Image()
                img.addEventListener('load', (e) => {
                    loaded = true
                    newLoad(dir)
                })
                img.addEventListener('error',(e) => newLoad('[ERROR] '+dir))
                img.src = link
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