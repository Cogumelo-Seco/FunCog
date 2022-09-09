export default async({ name, mod, difficulty, notesImageDir, backgroundImage, dev, listenerState, opponentPlayer }, state) => {
    try {
        state.arrowsInfo = {},
        state.arrowsInfoOpponent = {},
        state.positionArrow = {},
        state.positionArrowOpponent = {},
        state.screenYMovement = 0,
        state.screenXMovement = 0,
        state.screenZoom = 0,
        state.screenZooming = false,
        state.screenRotation = 0,
        state.musicNotes = []
        state.musicOpponentNotes = []
        state.countdown = 4
        state.musicEventListener = () => null
        state.notesImageDir = notesImageDir
        state.musicInfo = {
            name,
            backgroundImage,
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
        state.musicBPM = musicData.song.bpm

        for (let i in musicNotes) {
            for (let a in musicNotes[i].sectionNotes) {
                let noteInfo = musicNotes[i].sectionNotes[a]
                let mustHitSection = musicNotes[i].mustHitSection
                mustHitSection = opponentPlayer ? mustHitSection ? false : true : mustHitSection

                if (noteInfo[1] > 3 && noteInfo[1] < 8) {
                    noteInfo[1] = noteInfo[1]%4
                    mustHitSection = mustHitSection ? false : true
                }

                if (mustHitSection) {
                    state.musicOriginalNotes.push(noteInfo)
                    state.musicNotes.push(await getNoteinfo(noteInfo, difficulty, musicData))
                } else {
                    state.musicOriginalOpponentNotes.push(noteInfo)
                    state.musicOpponentNotes.push(await getNoteinfo(noteInfo, difficulty, musicData))
                }
            }
        }

        try {
            state.musicEventListener = require(`../../../Musics/data/${name.toLowerCase()}/eventListener`).default
        } catch {}
        
        state.music = state.sounds[`Musics/musics/${name.toLowerCase()}/Inst.ogg`]
        state.musicVoice = state.sounds[`Musics/musics/${name.toLowerCase()}/Voices.ogg`]

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
        if (name == 'dusk-till-dawn') {
            if (note[3] && note[3] != 'Pinkie Sing') {
                autoClick = true
                arrowID = note[1]%4
                errorWhenNotClicking = false
                type = 'pinkieSing'
            } else arrowID = note[1]%4
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

        //console.log(note)

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