export default async({ musicInfo, difficulty, listenerState, opponentPlayer }, state) => {
    //try {
        let performanceMode = state.smallFunctions.getConfig('PerformanceMode')

        state.music = null
        state.musicChangeBPM = {}
        state.arrowsInfo = {}
        state.arrow = {}
        state.arrowsInfoOpponent = {}
        state.arrowsInfoOpponent = {}
        state.positionArrow = {}
        state.positionArrowOpponent = {}
        state.screenYMovement = 0
        state.screenXMovement = 0
        state.screenZoom = 0
        state.screenZooming = false
        state.screenRotation = 0
        state.musicOriginalNotes = []
        state.musicNotes = []
        state.musicOriginalOpponentNotes = []
        state.musicOpponentNotes = []
        state.countdown = 4
        state.musicEventListener = () => null
        state.musicInfo = {
            name: musicInfo.name,
            splashDir: musicInfo.splashDir,
            splashResize: musicInfo.splashResize,
            notesImageDir: musicInfo.notesImageDir,
            backgroundImage: musicInfo.backgroundImage,
            menuColor: musicInfo.menuColor,
            lifeDrain: difficulty.lifeDrain || 0,
            dev: musicInfo.dev,
            defaultBackgroundImage: musicInfo.backgroundImage,
            difficulty,
            hitNote: 0,
            misses: 0,
            score: 0,
            combo: 0,
            bestCombo: 0,
            accuracy: 0,
            accuracyMedia: [],
            linearAccuracyMedia: [],
            rating: {},
            health: 50,
            popups: [],
            popupsBackground: [],
            lastPopupTime: 0,
            variables: {},
            playerId: opponentPlayer ? 2 : 1,
            judgements: {
                shit: 0,
                bad: 0,
                good: 0,
                sick: 0,
            }
        }

        let musicData = JSON.parse(JSON.stringify(require(`../../../Musics/data/${musicInfo.name.toLowerCase()}/${musicInfo.name.toLowerCase()}${difficulty.fileNameDifficulty ? '-'+difficulty.fileNameDifficulty : ''}.json`)))
        let musicNotes = musicData.song.notes
        let musicNotesTotal = ((musicNotes.map(a => a.sectionNotes)).map(a => a.length)).reduce((a, b) => a+b)

        state.loadingSong.loaded = 0
        state.loadingSong.total = musicInfo.toLoad.length

        state.musicInfo.events = musicData.song.events
        state.musicBPM = musicData.song.bpm
        try {
            state.musicEventListener = require(`../../../Musics/data/${musicInfo.name.toLowerCase()}/eventListener`).default
        } catch {}
        
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

                if (state.musicNotes.length+state.musicOpponentNotes.length >= musicNotesTotal) load(musicInfo.toLoad[0])
            }
        }

        function newLoad(msg) {
            state.loadingSong.msg = `(${state.loadingSong.loaded}/${state.loadingSong.total}) - ${msg}`
            state.loadingSong.loaded += 1

            if (state.loadingSong.loaded >= state.loadingSong.total && !state.music)
                loaded()
            else if (musicInfo.toLoad[state.loadingSong.loaded]) 
                load(musicInfo.toLoad[state.loadingSong.loaded])
        }

        async function load({ dir, animationConfigDir}) {
            let loaded = false

            setTimeout(() => {
                if (!loaded) newLoad('[ERROR] '+dir)
            }, 10000)

            if ([ 'ogg', 'mp3' ].includes(dir.split('.')[dir.split('.').length-1])) {
                /*if (state.sounds[dir]?.src) newLoad()
                else {*/
                    let link = 'https://raw.githubusercontent.com/Cogumelo-Seco/Cogu-FNF-Files/main/'+dir

                    let sound = new Audio()
                    sound.addEventListener('loadeddata', (e) => {
                        state.toLoadInScreen[dir] = {
                            sound,
                            counter: 0
                        }

                        loaded = true
                        newLoad(dir)
                    })
                    sound.addEventListener('error', (e) => newLoad('[ERROR] '+dir))
                    sound.src = dir.split('/')[0] == 'Sounds' ? `/${dir}` : link
                    state.sounds[dir] = sound
                //}
            } else {
                /*if (state.images[dir]?.image) newLoad()
                else {*/
                    let link = 'https://raw.githubusercontent.com/Cogumelo-Seco/Cogu-FNF-Files/main/imgs/'+dir
                    let animationConfig = animationConfigDir ? JSON.parse(await fetch('https://raw.githubusercontent.com/Cogumelo-Seco/Cogu-FNF-Files/main/imgs/'+animationConfigDir).then(r => r.text())) : null
    
                    let img = new Image()
                    img.addEventListener('load', (e) => {
                        state.toLoadInScreen[dir] = {
                            image: img,
                            counter: 0
                        }

                        loaded = true
                        newLoad(dir)
                    })
                    img.addEventListener('error',(e) => newLoad('[ERROR] '+dir))
                    img.src = link//`/imgs/${dir}`
                    img.id = dir
                    state.images[dir] = {
                        image: img,
                        animationConfig
                    }
                //}
            }
        }

        async function loaded() {
            if (!performanceMode) state.musicEventListener('loaded', {}, state)

            if (state.musicOpponentNotes.length <= 0 && state.online) {
                state.musicOpponentNotes = JSON.parse(JSON.stringify(state.musicNotes));
                state.musicOriginalOpponentNotes = JSON.parse(JSON.stringify(state.musicOriginalNotes));
            }
            if (state.musicNotes.length <= 0 && state.online) {
                state.musicNotes = JSON.parse(JSON.stringify(state.musicOpponentNotes));
                state.musicOriginalNotes = JSON.parse(JSON.stringify(state.musicOriginalOpponentNotes));
            }

            state.music = state.sounds[`Musics/musics/${musicInfo.name.toLowerCase()}/Inst.ogg`] || state.sounds[`Musics/musics/${musicInfo.name.toLowerCase()}/Inst.mp3`]
            state.musicVoice = state.sounds[`Musics/musics/${musicInfo.name.toLowerCase()}/Voices.ogg`] || state.sounds[`Musics/musics/${musicInfo.name.toLowerCase()}/Voices.mp3`]

            let videoElement = document.getElementById('gameVideo')

            if (musicInfo.cutscene && !state.online) {
                videoElement.onended = () => startMusic()
                videoElement.src = 'https://raw.githubusercontent.com/Cogumelo-Seco/Cogu-FNF-Files/main/Videos/'+musicInfo.cutscene
            } else startMusic()
            
            async function startMusic() {
                if (state.online && !state.waiting || !state.online) {
                    state.countdown -= 1
                    if (state.countdown <= -1) {
                        state.music?.play()
                        state.musicVoice?.play()

                        if (state.musicVoice) state.musicVoice.currentTime = state.music?.currentTime || 0

                        if (!performanceMode) state.musicEventListener('started', { difficulty, listenerState }, state)
                    } else {
                        let countdownSpeed = 900-(state.musicBPM*state.smallFunctions.getConfig('ScrollSpeed')*2)
                        if (countdownSpeed < 150) countdownSpeed = 150
                        setTimeout(() => startMusic(), countdownSpeed)
                        state.playSong(`Sounds/intro${state.countdown}.ogg`)
                    }
                }
            }
        }
    /*} catch (err) {
        console.error(err)
    }*/

    async function getNoteinfo(note, difficulty, musicData) {
        let name = musicInfo.name.toLowerCase()
        let arrowID = note[1]
        let type = 'normal'
        let errorWhenNotClicking = true
        let disabled = false
        let autoClick = false

        if (name == 'expurgation') {
            if (note[1] > 3) {
                note[2] = 0
                arrowID = note[1]%4
                disabled = difficulty.name == 'Mania' || performanceMode ? true : false
                errorWhenNotClicking = false
                type = 'hitKillNote'
            } 
        }
        if (name == 'hellclown' || name == 'madness') {
            if (note[1] > 3) {
                note[2] = 0
                arrowID = note[1]%4
                disabled = difficulty.name == 'Mania' || performanceMode ? true : false
                errorWhenNotClicking = false
                type = 'fireNote'
            }
        }
        if (musicInfo.mod == 'SuicideMouse') {
            if (note[3] && note[1] != -1) {
                arrowID = note[1]%4
                disabled = difficulty.name == 'Mania' || performanceMode ? true : false
                errorWhenNotClicking = false
                type = 'hurtNoteSuicidemouse'
            }
        }
        if (musicInfo.mod == 'DuskTillDawn') {
            if (note[3] != undefined) {
                autoClick = true
                arrowID = note[1]%4
                errorWhenNotClicking = false
                type = 'pinkieSing'
            }
        }

        if (musicInfo.mod == 'SonicEXE') {
            if (note[3] == 2) {
                arrowID = note[1]%4
                disabled = difficulty.name == 'Mania' || performanceMode ? true : false
                //errorWhenNotClicking = false
                type = 'sonicEXEStaticNote'
            } else if (note[3]) {
                arrowID = note[1]%4
                disabled = difficulty.name == 'Mania' || performanceMode ? true : false
                errorWhenNotClicking = false
                type = 'sonicEXEphantomNote'
            }
        }

        if (musicInfo.mod == 'LateNightCityTale') {
            if (note[3] == 'black') {
                disabled = difficulty.name == 'Mania' || performanceMode ? true : false
                errorWhenNotClicking = false
                type = 'LNCTBlack'
            }
            if (note[3] == 'white') {
                disabled = difficulty.name == 'Mania' || performanceMode ? true : false
                type = 'LNCTWhite'
            }
            if (note[3] == 'red') {
                disabled = difficulty.name == 'Mania' || performanceMode ? true : false
                type = 'LNCTRed'
            }
        }
        if (musicInfo.mod == 'WitheredFreddy') {
            if (note[3] == 3) {
                disabled = difficulty.name == 'Mania' || performanceMode ? true : false
                errorWhenNotClicking = false
                type = 'WitheredFreddyDanger'
            }
            if (note[3] == 4) {
                disabled = difficulty.name == 'Mania' || performanceMode ? true : false
                errorWhenNotClicking = false
                type = 'WitheredFreddyCharge'
            }
            if (note[3] == 2) {
                disabled = difficulty.name == 'Mania' || performanceMode ? true : false
                errorWhenNotClicking = false
                type = 'WitheredFreddyRemnant'
            }
            if (note[3] == 5) {
                disabled = difficulty.name == 'Mania' || performanceMode ? true : false
                errorWhenNotClicking = false
                type = 'WitheredFreddyLoose'
            }
        }
        if (musicInfo.mod == 'VSChira') {
            if (note[3] == 'chiraNote') {
                disabled = difficulty.name == 'Mania' || performanceMode ? true : false
                type = 'VSChiraMarsh'
            }
        }

        return {
            Y: NaN,
            hold: Number.parseInt(note[2]) * (state.musicBPM*state.smallFunctions.getConfig('ScrollSpeed')/200),
            time: Math.abs(note[0]/1000), 
            arrowID,
            clicked: false,
            disabled,
            defaultDisabled: disabled,
            errorWhenNotClicking,
            autoClick,
            type
        }
    }
}