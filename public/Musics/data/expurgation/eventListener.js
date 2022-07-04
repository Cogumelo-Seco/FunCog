module.exports = async (type, { noteClickAuthor, note, notes, listenerState }, state) => {
    switch (type) {
        case 'noteClick':
            if (noteClickAuthor == 'player' && note?.type == 'hitKillNote' && !notes?.find(n => n.type == 'normal'))
                state.musicInfo.health = -100
            break
    }
}