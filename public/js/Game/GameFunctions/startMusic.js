module.exports = async({ name, mod, difficulty, notesImageDir, backgroundImage }, state) => {
    try {
        state.notesImageDir = notesImageDir
        state.musicNotes = []
        state.musicOpponentNotes = []
        state.countdown = 4
        state.musicEventListener = () => null
        state.musicInfo = {
            name,
            backgroundImage,
            difficulty: difficulty.name,
            hitNote: 0,
            misses: 0,
            score: 0,
            combo: 0,
            accuracy: 0,
            accuracyMedia: [],
            rating: {},
            health: 50,
        }

        let musicData = require(`../../../Musics/data/${name.toLowerCase()}/${name.toLowerCase()}${difficulty.fileNameDifficulty ? '-'+difficulty.fileNameDifficulty : ''}.json`)
        let musicBPMs = musicData.song.notes.filter(i => i.mustHitSection).map(i => i.sectionNotes)//.filter(i => i[0])
        let musicOpponentBPMs = musicData.song.notes.filter(i => !i.mustHitSection).map(i => i.sectionNotes)//.filter(i => i[0])
    
        state.musicBPM = musicData.song.bpm

        for (let i in musicBPMs) {
            for (let a in musicBPMs[i]) state.musicNotes.push(await getNoteinfo(musicBPMs[i][a], difficulty, musicData))
        }

        for (let i in musicOpponentBPMs) {
            for (let a in musicOpponentBPMs[i]) state.musicOpponentNotes.push(await getNoteinfo(musicOpponentBPMs[i][a], difficulty, musicData))
        }

        // FILTRAR NOTAS EM POSIÇÕES IGUAIS

        for (let i in musicBPMs) {
            for (let a in musicBPMs[i]) {
                let notes = state.musicNotes.filter(n => n.time <= musicBPMs[i][a][0]/1000+0.1 && n.time >= musicBPMs[i][a][0]/1000-0.1 && n.arrowID == musicBPMs[i][a][1]%4)
                if (notes.length > 1) {
                    notes = notes.filter(n => n.type != 'normal')
                    for (let b in notes) state.musicNotes.splice(state.musicNotes.indexOf(notes[b]), 1)
                }
            }
        }

        for (let i in musicOpponentBPMs) {
            for (let a in musicOpponentBPMs[i]) {
                let notes = state.musicOpponentNotes.filter(n => n.time <= musicOpponentBPMs[i][a][0]/1000+0.1 && n.time >= musicOpponentBPMs[i][a][0]/1000-0.1 && n.arrowID == musicOpponentBPMs[i][a][1]%4)
                if (notes.length > 1) {
                    notes = notes.filter(n => n.type != 'normal')
                    for (let b in notes) state.musicOpponentNotes.splice(state.musicOpponentNotes.indexOf(notes[b]), 1)
                }
            }
        }

        try {
            state.musicEventListener = require(`../../../Musics/data/${name.toLowerCase()}/eventListener`)
        } catch {}
        
        state.music = state.sounds[`Musics/musics/${name.toLowerCase()}/Inst.ogg`]
        state.musicVoice = state.sounds[`Musics/musics/${name.toLowerCase()}/Voices.ogg`]

        let interval = setInterval(() => {
            state.countdown -= 1
            if (state.countdown <= -1) {
                clearInterval(interval)

                state.music?.play()
                state.musicVoice?.play()

                if (state.musicVoice) state.musicVoice.currentTime = state.music?.currentTime || 0

                state.musicEventListener('started', {}, state)
            } else state.playSong(`Sounds/intro${state.countdown}.ogg`)
        }, 900-(musicData.song.bpm*2));
    } catch (err) {
        console.error(err)
    }

    async function getNoteinfo(note, difficulty, musicData) {
        name = name.toLowerCase()
        let arrowID = note[1]%4
        let type = 'normal'
        let errorWhenNotClicking = true
        let disabled = false
        let autoClick = false
        if (note[3]) arrowID = note[1]
        let doNotFormatNotes = [ 'SuicideMouse', 'Bob', 'DuskTillDawn' ]
        if (doNotFormatNotes.includes(mod)) arrowID = note[1]

        if (name == 'expurgation') {
            if (note[1] > 3) {
                note[2] = 0
                disabled = difficulty.name == 'Mania' ? true : false
                errorWhenNotClicking = false
                type = 'hitKillNote'
            } 
        }
        if (name == 'hellclown') {
            if (note[1] > 3) {
                note[2] = 0
                disabled = difficulty.name == 'Mania' ? true : false
                errorWhenNotClicking = false
                type = 'fireNote'
            }
        }
        if (name == 'happy' || name == 'really-happy') {
            if (note[3] && note[1] != -1) {
                disabled = difficulty.name == 'Mania' ? true : false
                errorWhenNotClicking = false
                type = 'hurtNote'
            }
        }
        if (name == 'dusk-till-dawn') {
            if (note[3] && note[3] != 'Pinkie Sing') {
                autoClick = true
                errorWhenNotClicking = false
                type = 'pinkieSing'
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