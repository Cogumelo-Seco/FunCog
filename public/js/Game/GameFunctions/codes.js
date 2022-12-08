export default function codesFunction(state) {
    return {
        debug: () => {
            return state.debug = state.debug ? false : true
        }
    }
}