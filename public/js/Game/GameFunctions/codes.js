export default function codesFunction(state) {
    return {
        debug: () => {
            return state.debug = state.debug ? false : true
        },
        admcogu: () => {
            if (state.myMessageConfig.colorName?.includes('RAINBOW')) {
                state.myMessageConfig.colorName = null
                state.myMessageConfig.colorContent = null
                state.myMessageConfig.emoji = null
                state.myMessageConfig.author.name = null
            } else {
                state.myMessageConfig.colorName = `RAINBOW-${Math.floor(Math.random()*100000)}`
                state.myMessageConfig.colorContent = `RAINBOW-${Math.floor(Math.random()*100000)}`
                state.myMessageConfig.emoji = '👑'
                state.myMessageConfig.author.name = 'Cogu'
            }

            return state.myMessageConfig.colorName?.includes('RAINBOW')
        }
    }
}