export default function codesFunction(state) {
    return {
        debug: () => {
            return state.debug = state.debug ? false : true
        },
        botplay: () => {
            state.selectSettingsOption.settingsOptions.find((g) => g.id == 'botPlay').content = state.selectSettingsOption.settingsOptions.find((g) => g.id == 'botPlay').content ? false : true
            return state.selectSettingsOption.settingsOptions.find((g) => g.id == 'botPlay').content
        },
        admcogu: () => {
            if (state.myConfig.colorName?.includes('RAINBOW')) {
                state.myConfig.colorName = null
                state.myConfig.colorContent = null
                state.myConfig.emoji = null
                state.myConfig.author.name = null
                state.myConfig.author.avatar = null

                state.socket.emit('playerConnected', state.myConfig)
            } else {
                state.myConfig.colorName = `RAINBOW-${Math.floor(Math.random()*100000)}`
                state.myConfig.colorContent = `RAINBOW-${Math.floor(Math.random()*100000)}`
                state.myConfig.emoji = '👑'
                state.myConfig.author.name = 'Cogu'
                state.myConfig.author.avatar = 'https://alpha-site.vercel.app/imgs/Cogu-avatar/Default.png'

                state.socket.emit('playerConnected', state.myConfig)
            }

            return state.myConfig.colorName?.includes('RAINBOW')
        },
        speed: () => {
            state.modifiers.speed = state.modifiers.speed == 1 ? 1.5 : 1
            return state.modifiers.speed == 1.5
        }
    }
}