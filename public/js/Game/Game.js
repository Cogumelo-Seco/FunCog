function createGame(Listener) {
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
        musicInfo: {
            name: 'none',
            difficulty: 'none',
            hitNote: 0,
            misses: 0,
            score: 0,
            accuracy: 0,
            accuracyMedia: [],
            health: 50,
        },
        positionArrow: {},
        positionArrowOpponent: {},
        animations: {
            BFDead: {
                frame: 0,
                startFrame: 0,
                endFrame: 5,
                totalDalay: 120,
                dalay: 0
            },
            arrows: {
                frame: 0,
                startFrame: 0,
                endFrame: 1,
                totalDalay: 90,
                dalay: 0
            },
            deathnotes: {
                frame: 0,
                startFrame: 1,
                endFrame: 6,
                totalDalay: 40,
                dalay: 0
            },
            firenotes: {
                frame: 0,
                startFrame: 0,
                endFrame: 11,
                totalDalay: 40,
                dalay: 0
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

    const playSong = (type, command) => require('./GameFunctions/playSong')(type, command, state)
    state.playSong = playSong

    const startMusic = (command) => require('./GameFunctions/startMusic')(command, state)
    const verifyClick = (command) => require('./GameFunctions/verifyClick')(command, state)

    async function start(command) {
        for (let arrowID = 0;arrowID <= state.amountOfArrowsOpponent;arrowID++) {
            if (!state.opponentArrows[arrowID]) state.opponentArrows[arrowID] = { click: false }
        }

        let interval = setInterval(() => {
            if (state.arrowsSize) state.arrowsYLine = state.downScroll ? window.innerHeight-state.arrowsYLineMargin-state.arrowsSize**state.resizeNote : state.arrowsYLineMargin
            state.arrowsYLineOpponent = state.middleScroll ? state.downScroll ? window.innerHeight*0.60 : window.innerHeight*0.40 : state.arrowsYLine
            state.resizeNoteOpponent = state.middleScroll ? state.resizeNoteOpponentInMiddleScroll : state.resizeNote

            if (state.gameStage == 'game' && state.musicInfo.health <= 0 && !state.debug) {
                state.music?.pause()
                state.musicVoice?.pause()
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
                state.musicNotes[i].Y = -((state.musicNotes[i].time-musicCurrentTime)*(4*state.musicBPM))//-((state.musicNotes[i].time-musicCurrentTime)/musicDuration*(1000*state.musicBPM*state.resizeNote))
                if (!state.musicNotes[i].errorWhenClicking && state.musicNotes[i].Y > 200 && !state.musicNotes[i].disabled && !state.musicNotes[i].clicked) {
                    state.musicNotes[i].disabled = true
                    state.musicInfo.misses += 1
                    state.musicInfo.health -= 5
                    state.musicInfo.accuracyMedia.push(1)
                }
            }

            for (let i in state.musicOpponentNotes) {
                state.musicOpponentNotes[i].Y = -((state.musicOpponentNotes[i].time-musicCurrentTime)*(4*state.musicBPM))//-((state.musicOpponentNotes[i].time-musicCurrentTime)/musicDuration*(1000*state.musicBPM*state.resizeNoteOpponent))
            }

            state.musicInfo.accuracy = 0
            for (let i in state.musicInfo.accuracyMedia) state.musicInfo.accuracy += state.musicInfo.accuracyMedia[i]
            state.musicInfo.accuracy = state.musicInfo.accuracy/state.musicInfo.accuracyMedia.length || 0

            for (let i in state.animations) {
                let animation = state.animations[i]

                if (animation.dalay <= +new Date()) {
                    animation.frame += animation.boomerang ? animation.boomerangForward ? 1 : -1 : 1
                    if (animation.frame > animation.endFrame) {
                        if (!animation.boomerang) animation.frame = animation.startFrame
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