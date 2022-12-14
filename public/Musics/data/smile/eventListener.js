export default async (type, { noteClickAuthor, note, notes, listenerState }, state) => {
    switch (type) {
        case 'loaded':
            state.screenFilter = 'grayscale(100%)'
            break
    }
}