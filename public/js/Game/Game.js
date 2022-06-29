function createGame(Listener) {
    const state = {
        fps: '0-0',
        gameStage: 'loading',
        images: [],
        sounds: [],
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
            accuracyMedia: []
        },
        positionArrow: {},
        positionArrowOpponent: {},
        animations: {
            arrows: {
                frame: 0,
                startFrame: 0,
                endFrame: 1,
                totalDalay: 90,
                dalay: 0
            },
            deathnotes: {
                frame: 0,
                startFrame: 0,
                endFrame: 6,
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

            let musicDuration = state.music?.duration
            let musicCurrentTime = state.music?.currentTime
            let musicBPM = 100

            for (let i in state.musicNotes) {
                let percent = musicCurrentTime/state.musicNotes[i].time
                state.musicNotes[i].Y = -(state.musicNotes[i].time/musicDuration)*(musicDuration*6**state.resizeNote*state.musicBPM)+(musicCurrentTime/musicDuration*(musicDuration*6**state.resizeNote*state.musicBPM))//-(percent*(musicDuration*(musicCurrentTime/musicDuration)*1000))//-(state.musicNotes[i].time/(musicDuration*1000)*((musicDuration*5**state.resizeNote)*state.musicBPM)-(musicCurrentTime/musicDuration*((musicDuration*5**state.resizeNote)*state.musicBPM)))
                if (!state.musicNotes[i].errorWhenClicking && state.musicNotes[i].Y > 200 && state.musicNotes[i].Y < 400 && !state.musicNotes[i].disabled && !state.musicNotes[i].clicked) {
                    state.musicNotes[i].disabled = true
                    state.musicInfo.misses += 1
                    state.musicInfo.accuracyMedia.push(1)
                }
            }

            for (let i in state.musicOpponentNotes) {
                state.musicOpponentNotes[i].Y = -(state.musicOpponentNotes[i].time/musicDuration)*(musicDuration*6**state.resizeNoteOpponent*state.musicBPM)+(musicCurrentTime/musicDuration*(musicDuration*6**state.resizeNoteOpponent*state.musicBPM))//-(state.musicOpponentNotes[i].time/(musicDuration*1000)*((musicDuration*5**state.resizeNoteOpponent)*state.musicBPM)-(musicCurrentTime/musicDuration*((musicDuration*5**state.resizeNoteOpponent)*state.musicBPM)))
            }

            state.musicInfo.accuracy = 0
            for (let i in state.musicInfo.accuracyMedia) state.musicInfo.accuracy += state.musicInfo.accuracyMedia[i]
            state.musicInfo.accuracy = state.musicInfo.accuracy/state.musicInfo.accuracyMedia.length || 0

            for (let i in state.animations) {
                let animation = state.animations[i]

                if (animation.dalay <= +new Date()) {
                    animation.frame += 1
                    if (animation.frame > animation.endFrame) animation.frame = animation.startFrame
                    animation.dalay = +new Date()+animation.totalDalay
                }
            }
        }, 1000/50);
    }

    async function loading(command) {
        state.loading.total += await addImages()
        state.loading.total += await addSounds()

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
            img.src = `/imgs/${i}`
            img.id = i
            img.style.display = 'none'
            document.body.appendChild(img)
            state.images[i] = img
            img.addEventListener('error',(event) => state.images[event.path[0].id] = null)
            img.addEventListener('load', (e) => newLoad(e.path[0].src.split('/')[e.path[0].src.split('/').length-1]))
        }

        for (let i of state.sounds) {
            let sound = new Audio()
            sound.src = `/${i}`
            state.sounds[i] = sound
            sound.addEventListener('loadeddata', (e) => newLoad(e.path[0].src.split('/')[e.path[0].src.split('/').length-1]))
        }

        let interval = setInterval(() => {
            if (state.loading.loaded >= state.loading.total) {
                state.loading.msg = `(${state.loading.loaded}/${state.loading.total}) 100% - Complete loading`
                clearInterval(interval)
                setTimeout(() => state.gameStage = 'home', 1000)
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