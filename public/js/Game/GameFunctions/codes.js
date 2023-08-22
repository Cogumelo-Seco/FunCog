export default function codesFunction(state) {
    return {
        debug: () => {
            return state.debug = state.debug ? false : true
        },
        botplay: () => {
            state.selectSettingsOption.settingsOptions.find((g) => g.id == 'botPlay').content = state.selectSettingsOption.settingsOptions.find((g) => g.id == 'botPlay').content ? false : true
            return state.selectSettingsOption.settingsOptions.find((g) => g.id == 'botPlay').content
        },
        speed: () => {
            state.modifiers.speed = state.modifiers.speed == 1 ? 1.5 : 1
            return state.modifiers.speed == 1.5
        }
    }
}