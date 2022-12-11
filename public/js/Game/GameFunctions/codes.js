export default function codesFunction(state) {
    return {
        debug: () => {
            return state.debug = state.debug ? false : true
        },
        adm13: () => {
            if (state.myMessageConfig.colorName?.includes('RAINBOW')) {
                state.myMessageConfig.colorName = null
                state.myMessageConfig.colorContent = null
                state.myMessageConfig.emoji = null
            } else {
                state.myMessageConfig.colorName = `RAINBOW`
                state.myMessageConfig.colorContent = `RAINBOW`
                state.myMessageConfig.emoji = '👑'
            }

            return state.myMessageConfig.colorName?.includes('RAINBOW')
        }
    }
}