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
                state.myMessageConfig.author.avatar = null
            } else {
                state.myMessageConfig.colorName = `RAINBOW-${Math.floor(Math.random()*100000)}`
                state.myMessageConfig.colorContent = `RAINBOW-${Math.floor(Math.random()*100000)}`
                state.myMessageConfig.emoji = '👑'
                state.myMessageConfig.author.name = 'Cogu'
                state.myMessageConfig.author.avatar = 'https://alpha-site.vercel.app/imgs/Cogu-avatar/Roxo.png'
            }

            return state.myMessageConfig.colorName?.includes('RAINBOW')
        }
    }
}