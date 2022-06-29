module.exports = async({ name, difficulty }, state) => {
    try {
        let musicData = require(`../../../Musics/data/${name}/${name}${difficulty ? '-'+difficulty : ''}.json`)
        let musicBPMs = musicData.song.notes.filter(i => i.mustHitSection).map(i => i.sectionNotes).filter(i => i[0])
        let musicOpponentBPMs = musicData.song.notes.filter(i => !i.mustHitSection).map(i => i.sectionNotes).filter(i => i[0])
    
        state.musicBPM = musicData.song.bpm

        for (let i in musicBPMs) {
            for (let a in musicBPMs[i]) state.musicNotes.push(await getNoteinfo(musicBPMs[i][a]))
        }

        for (let i in musicOpponentBPMs) {
            for (let a in musicOpponentBPMs[i]) state.musicOpponentNotes.push(await getNoteinfo(musicOpponentBPMs[i][a]))
        }

        // FILTRAR NOTAS EM POSIÇÕES IGUAIS

        for (let i in musicBPMs) {
            for (let a in musicBPMs[i]) {
                let notes = state.musicNotes.filter(n => n.time == musicBPMs[i][a][0]/1000 && n.arrowID == musicBPMs[i][a][1]%4)
                if (notes.length > 1) state.musicNotes.splice(state.musicNotes.indexOf(notes.find(n => n.type != 'normal')), 1)
            }
        }

        for (let i in musicOpponentBPMs) {
            for (let a in musicOpponentBPMs[i]) {
                let notes = state.musicOpponentNotes.filter(n => n.time == musicOpponentBPMs[i][a][0]/1000 && n.arrowID == musicOpponentBPMs[i][a][1]%4)
                if (notes.length > 1) state.musicOpponentNotes.splice(state.musicOpponentNotes.indexOf(notes.find(n => n.type != 'normal')), 1)
            }
        }

        state.musicInfo.name = name
        state.musicInfo.difficulty = difficulty

        state.music = state.sounds[`Musics/musics/${name}_Inst.ogg`]
        state.musicVoice = state.sounds[`Musics/musics/${name}_Voices.ogg`]
        state.music?.play()
        state.musicVoice?.play()

        if (state.musicVoice) state.musicVoice.currentTime = state.music?.currentTime || 0
    } catch (err) {
        console.error(err)
    }

    async function getNoteinfo(note) {
        let arrowID = note[1]
        let type = 'normal'
        let errorWhenClicking = false

        switch (name) {
            case 'Expurgation':
                if (arrowID > 3) {
                    arrowID = arrowID%4
                    note[2] = 0
                    errorWhenClicking = true
                    type = 'hitKill'
                }
                break
        }

        return {
            Y: NaN,
            hold: Number.parseInt(note[2]),
            time: note[0]/1000, 
            arrowID,
            clicked: false,
            disabled: false,
            errorWhenClicking,
            type
        }
    }
}