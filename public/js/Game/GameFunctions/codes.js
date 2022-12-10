export default function codesFunction(state) {
    return {
        debug: () => {
            return state.debug = state.debug ? false : true
        },
        rainbow: () => {
            if (state.myMessageConfig.colorName?.includes('RAINBOW')) {
                state.myMessageConfig.colorName = null
                state.myMessageConfig.colorContent = null
            } else {
                state.myMessageConfig.colorName = `RAINBOW-${Math.random()*94964}`
                state.myMessageConfig.colorContent = `RAINBOW-${Math.random()*94964}`
            }

            return state.myMessageConfig.colorName?.includes('RAINBOW')
        }
    }
}