export default async({ name, mod, difficulty, notesImageDir, backgroundImage, dev, listenerState, opponentPlayer, splashDir, splashResize, toLoad }, state) => {
    try {
        state.music = null
        state.arrowsInfo = {},
        state.arrow = {},
        state.arrowsInfoOpponent = {},
        state.arrowsInfoOpponent = {},
        state.positionArrow = {},
        state.positionArrowOpponent = {},
        state.screenYMovement = 0,
        state.screenXMovement = 0,
        state.screenZoom = 0,
        state.screenZooming = false,
        state.screenRotation = 0,
        state.musicOriginalNotes = []
        state.musicNotes = []
        state.musicOriginalOpponentNotes = []
        state.musicOpponentNotes = []
        state.countdown = 4
        state.musicEventListener = () => null
        state.musicInfo = {
            name,
            splashDir,
            splashResize,
            notesImageDir,
            backgroundImage,
            lifeDrain: difficulty.lifeDrain || 0,
            dev,
            defaultBackgroundImage: backgroundImage,
            difficulty: difficulty.name,
            hitNote: 0,
            misses: 0,
            score: 0,
            combo: 0,
            accuracy: 0,
            accuracyMedia: [],
            rating: {},
            health: 50,
            popups: [],
            lastPopupTime: 0,
            playerId: opponentPlayer ? 2 : 1
        }

        let musicData = require(`../../../Musics/data/${name.toLowerCase()}/${name.toLowerCase()}${difficulty.fileNameDifficulty ? '-'+difficulty.fileNameDifficulty : ''}.json`)
        let musicNotes = musicData.song.notes
        state.musicInfo.events = musicData.song.events
        state.musicBPM = musicData.song.bpm
        
        for (let i in musicNotes) {
            if (musicNotes[i].changeBPM) {
                try {
                    state.musicChangeBPM[musicNotes[i].timeToChangeBPM || musicNotes[i].sectionNotes[0][0]] = musicNotes[i].bpm
                } catch {}
            }

            for (let a in musicNotes[i].sectionNotes) {
                let noteInfo = musicNotes[i].sectionNotes[a]
                let mustHitSection = musicNotes[i].mustHitSection
                mustHitSection = opponentPlayer ? mustHitSection ? false : true : mustHitSection

                if (noteInfo[1] > 3 && noteInfo[1] < 8) {
                    noteInfo[1] = noteInfo[1]%4
                    mustHitSection = mustHitSection ? false : true
                }

                let newNoteInfo = await getNoteinfo(noteInfo, difficulty, musicData)

                if (mustHitSection) {
                    state.musicOriginalNotes.push(noteInfo)
                    state.musicNotes.push(newNoteInfo)
                } else {
                    state.musicOriginalOpponentNotes.push(noteInfo)
                    state.musicOpponentNotes.push(newNoteInfo)
                }
            }
        }

        const newLoad = (msg) => {
            state.loadingSong.loaded += 1

            if (state.loadingSong.loaded >= state.loadingSong.total && !state.music) loaded()
            else if (toLoad[state.loadingSong.loaded]) load(toLoad[state.loadingSong.loaded])
        }

        const load = ({ dir, animationConfigDir}) => {
            let loaded = false

            setTimeout(() => {
                if (!loaded) newLoad()
            }, 10000)

            if ([ 'ogg', 'mp3' ].includes(dir.split('.')[dir.split('.').length-1])) {
                if (state.sounds[dir]) newLoad()
                else {
                    let sound = new Audio()
                    sound.addEventListener('loadeddata', (e) => {
                        loaded = true
                        newLoad()
                    })
                    sound.addEventListener('error', (e) => newLoad())
                    sound.src = `/${dir}`
                    state.sounds[dir] = sound
                }
            } else {
                if (state.images[dir] || state.sounds[dir]) newLoad(dir)
                else {
                    let animationConfig = animationConfigDir ? require(`../../../imgs/${animationConfigDir}`) : null
                    let img = new Image()
                    img.addEventListener('load', (e) => {
                        loaded = true
                        newLoad()
                    })
                    img.addEventListener('error',(e) => newLoad())
                    img.src = `/imgs/${dir}`
                    img.id = dir
                    state.images[dir] = {
                        image: img,
                        animationConfig
                    }
                }
            }
        }

        state.loadingSong.loaded = 0
        state.loadingSong.total = toLoad.length
        load(toLoad[0])

        async function loaded() {
            if (state.musicOpponentNotes.length <= 0 && state.online) {
                state.musicOpponentNotes = JSON.parse(JSON.stringify(state.musicNotes));
                state.musicOriginalOpponentNotes = JSON.parse(JSON.stringify(state.musicOriginalNotes));
            }
            if (state.musicNotes.length <= 0 && state.online) {
                state.musicNotes = JSON.parse(JSON.stringify(state.musicOpponentNotes));
                state.musicOriginalNotes = JSON.parse(JSON.stringify(state.musicOriginalOpponentNotes));
            }

            try {
                state.musicEventListener = require(`../../../Musics/data/${name.toLowerCase()}/eventListener`).default
            } catch {}
            
            state.music = state.sounds[`Musics/musics/${name.toLowerCase()}/Inst.ogg`]
            state.musicVoice = state.sounds[`Musics/musics/${name.toLowerCase()}/Voices.ogg`]
            state.music?.load()
            state.musicVoice?.load()

            let interval = setInterval(() => {
                if (state.online && !state.waiting || !state.online) {
                    state.countdown -= 1
                    if (state.countdown <= -1) {
                        clearInterval(interval)

                        state.music?.play()
                        state.musicVoice?.play()

                        if (state.musicVoice) state.musicVoice.currentTime = state.music?.currentTime || 0

                        state.musicEventListener('started', { difficulty, events: musicData.song.events, listenerState }, state)
                    } else state.playSong(`Sounds/intro${state.countdown}.ogg`)
                }
            }, 900-(musicData.song.bpm*2));
        }
    } catch (err) {
        console.error(err)
    }

    async function getNoteinfo(note, difficulty, musicData) {
        name = name.toLowerCase()
        let arrowID = note[1]
        let type = 'normal'
        let errorWhenNotClicking = true
        let disabled = false
        let autoClick = false

        if (name == 'expurgation') {
            if (note[1] > 3) {
                note[2] = 0
                arrowID = note[1]%4
                disabled = difficulty.name == 'Mania' ? true : false
                errorWhenNotClicking = false
                type = 'hitKillNote'
            } 
        }
        if (name == 'hellclown' || name == 'madness') {
            if (note[1] > 3) {
                note[2] = 0
                arrowID = note[1]%4
                disabled = difficulty.name == 'Mania' ? true : false
                errorWhenNotClicking = false
                type = 'fireNote'
            }
        }
        if (mod == 'SuicideMouse') {
            if (note[3] && note[1] != -1) {
                arrowID = note[1]%4
                disabled = difficulty.name == 'Mania' ? true : false
                errorWhenNotClicking = false
                type = 'hurtNoteSuicidemouse'
            }
        }
        if (mod == 'DuskTillDawn') {
            if (note[3] != undefined) {
                autoClick = true
                arrowID = note[1]%4
                errorWhenNotClicking = false
                type = 'pinkieSing'
            }
        }

        if (mod == 'SonicEXE') {
            if (note[3] == 2) {
                arrowID = note[1]%4
                disabled = difficulty.name == 'Mania' ? true : false
                //errorWhenNotClicking = false
                type = 'sonicEXEStaticNote'
            } else if (note[3]) {
                arrowID = note[1]%4
                disabled = difficulty.name == 'Mania' ? true : false
                errorWhenNotClicking = false
                type = 'sonicEXEphantomNote'
            }
        }

        if (mod == 'LateNightCityTale') {
            if (note[3] == 'black') {
                disabled = difficulty.name == 'Mania' ? true : false
                errorWhenNotClicking = false
                type = 'LNCTBlack'
            }
            if (note[3] == 'white') {
                disabled = difficulty.name == 'Mania' ? true : false
                type = 'LNCTWhite'
            }
            if (note[3] == 'red') {
                disabled = difficulty.name == 'Mania' ? true : false
                type = 'LNCTRed'
            }
        }
        if (mod == 'WitheredFreddy') {
            if (note[3] == 3) {
                disabled = difficulty.name == 'Mania' ? true : false
                errorWhenNotClicking = false
                type = 'WitheredFreddyDanger'
            }
            if (note[3] == 4) {
                disabled = difficulty.name == 'Mania' ? true : false
                errorWhenNotClicking = false
                type = 'WitheredFreddyCharge'
            }
            if (note[3] == 2) {
                disabled = difficulty.name == 'Mania' ? true : false
                errorWhenNotClicking = false
                type = 'WitheredFreddyRemnant'
            }
            if (note[3] == 5) {
                disabled = difficulty.name == 'Mania' ? true : false
                errorWhenNotClicking = false
                type = 'WitheredFreddyLoose'
            }
        }

        return {
            Y: NaN,
            hold: Number.parseInt(note[2]) * (musicData.song.bpm/200),
            time: Math.abs(note[0]/1000), 
            arrowID,
            clicked: false,
            disabled,
            errorWhenNotClicking,
            autoClick,
            type
        }
    }
}