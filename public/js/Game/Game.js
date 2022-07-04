function createGame(Listener, canvas) {
    const state = {
        fps: '0-0',
        debug: false,
        gameStage: 'loading',
        gameStageTime: 0,
        musicMenu: null,
        selectMusicMenu: {
            musicSelect: 0,
            difficultySelected: 0,
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
        musicNotes: [],
        musicOpponentNotes: [],
        musicBPM: 1,
        music: null,
        musicVoice: null,
        musicEventListener: null,
        notesImageDir: null,
        musicInfo: {},
        countdown: 4,
        positionArrow: {},
        positionArrowOpponent: {},

        arrowsYLineMovement: 0,
        arrowsXLineMovement: 0,
        arrowsYLineMovementOpponent: 0,
        arrowsXLineMovementOpponent: 0,
        screenYMovement: 0,
        screenXMovement: 0,
        screenZoom: 0,
        screenRotation: 0,

        animations: {
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
                totalDalay: 90,
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

    const addImages = (command) => require('./GameFunctions/addImages')(state)
    const addSounds = (command) => require('./GameFunctions/addSounds')(state)
    const addMusicList = (command) => require('./GameFunctions/addMusicList')(state)
    const addDifficulties = (command) => require('./GameFunctions/addDifficulties')(state)
    const addPersonalizedNotes = (command) => require('./GameFunctions/addPersonalizedNotes')(state)

    const playSong = (type, command) => require('./GameFunctions/playSong')(type, command, state)
    const calculateRating = (command) => require('./GameFunctions/calculateRating')(command, state)
    state.calculateRating = calculateRating
    state.playSong = playSong

    const startMusic = (command) => require('./GameFunctions/startMusic')(command, state)
    const verifyClick = (command) => require('./GameFunctions/verifyClick')(command, state)

    async function start(command) {
        for (let arrowID = 0;arrowID <= state.amountOfArrowsOpponent;arrowID++) {
            if (!state.opponentArrows[arrowID]) state.opponentArrows[arrowID] = { click: false }
        }

        let interval = setInterval(() => {
            if (state.arrowsSize) state.arrowsYLine = state.downScroll ? canvas.height-state.arrowsYLineMargin-state.arrowsSize**state.resizeNote : state.arrowsYLineMargin
            state.arrowsYLineOpponent = state.middleScroll ? state.downScroll ? canvas.height*0.60 : canvas.height*0.40 : state.arrowsYLine
            state.resizeNoteOpponent = state.middleScroll ? state.resizeNoteOpponentInMiddleScroll : state.resizeNote

            if (state.gameStage == 'game' && state.musicInfo.health <= 0 && !state.debug && state.music?.currentTime > 3) {
                state.music?.pause()
                state.musicVoice?.pause()
                state.music.currentTime = 0
                state.gameStage = 'dead'
                state.musicInfo.health = 50
                state.musicNotes = []
                state.musicOpponentNotes= []
                state.gameStageTime = +new Date()
                playSong('Sounds/fnf_loss_sfx.ogg')
                setTimeout(() => playSong('Sounds/gameOver.ogg', { musicMenu: true }), 2000)
            } 
            else if (state.musicInfo.health > 100) state.musicInfo.health = 100
            else if (state.musicInfo.health < 0) state.musicInfo.health = 0

            let musicDuration = state.music?.duration
            let musicCurrentTime = state.music?.currentTime

            if (musicDuration <= musicCurrentTime) {
                state.gameStage = 'selectMusic'
                state.musicInfo.health = 50
                state.musicNotes = []
                state.musicOpponentNotes= []
            }

            for (let i in state.musicNotes) {
                state.musicNotes[i].Y = -((state.musicNotes[i].time-musicCurrentTime)*((5**state.resizeNote)*state.musicBPM))
                if (state.musicNotes[i].errorWhenNotClicking && state.musicNotes[i].arrowID >= 0 && state.musicNotes[i].arrowID <= state.amountOfArrows && state.musicNotes[i].Y > 200 && !state.musicNotes[i].disabled && !state.musicNotes[i].clicked) {
                    state.musicNotes[i].disabled = true
                    state.musicInfo.misses += 1
                    state.musicInfo.score -= 50
                    state.musicInfo.health -= 5
                    state.musicInfo.combo = 0
                    state.musicInfo.accuracyMedia.push(1)
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
        }, 1000/50);
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
            img.addEventListener('error',(e) => newLoad('ERROR: '+e.path[0].src))
            img.addEventListener('load', (e) => newLoad(e.path[0].src)?.join('/'))
            img.src = `/imgs/${i}`
            img.id = i
            state.images[i] = img
        }

        for (let i of state.sounds) {
            let sound = new Audio()
            sound.addEventListener('loadeddata', (e) => newLoad(e.path[0].src))
            sound.addEventListener('error', (e) => newLoad('ERROR: '+e.path[0].src))
            sound.src = `/${i}`
            state.sounds[i] = sound
        }

        let interval = setInterval(() => {
            if (state.loading.loaded >= state.loading.total) {
                state.loading.msg = `(${state.loading.loaded}/${state.loading.total}) 100% - Complete loading`
                clearInterval(interval)
                if (!state.debug || state.gameStage == 'loading') setTimeout(() => state.gameStage = 'selectMusic', 1000)
            }
        }, 10)
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

module.exports = createGame