module.exports = async({ name, difficulty }, state) => {
    try {
        let musicData = require(`../../../Musics/data/${name}/${name}${difficulty ? '-'+difficulty : ''}.json`)
        let musicBPMs = musicData.song.notes.filter(i => i.mustHitSection).map(i => i.sectionNotes).filter(i => i[0])
        let musicOpponentBPMs = musicData.song.notes.filter(i => !i.mustHitSection).map(i => i.sectionNotes).filter(i => i[0])
    
        state.musicBPM = 180//musicData.song.bpm
        console.log(musicData)

        for (let i in musicBPMs) {
            for (let a in musicBPMs[i]) state.musicNotes.push({
                Y: NaN,
                hold: musicBPMs[i][a][2],
                time: Number.parseInt(musicBPMs[i][a][0]), 
                arrowID: musicBPMs[i][a][1] ,
                clicked: false,
                disabled: false
            })
        }

        for (let i in musicOpponentBPMs) {
            for (let a in musicOpponentBPMs[i]) state.musicOpponentNotes.push({
                Y: NaN,
                hold: musicOpponentBPMs[i][a][2],
                time: Number.parseInt(musicOpponentBPMs[i][a][0]), 
                arrowID: musicOpponentBPMs[i][a][1] ,
                clicked: false,
                disabled: false
            })
        }

        state.musicInfo.name = name
        state.musicInfo.difficulty = difficulty

        state.music = state.sounds[`Musics/musics/${name}_Inst.ogg`]
        state.musicVoice = state.sounds[`Musics/musics/${name}_Voices.ogg`]
        state.music?.play()
        state.musicVoice?.play()

        state.musicVoice.currentTime = state.music.currentTime
    } catch (err) {
        console.error(err)
    }
}