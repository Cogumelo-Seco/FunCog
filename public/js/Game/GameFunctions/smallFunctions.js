export default (state) => {
    return {
        redirectGameStage: async (newStage, oldStage) => {
            state.oldGameStage = oldStage || state.gameStage
            state.gameStage = newStage
        },
        getConfig: (config) => {
            return (state.selectSettingsOption.settingsOptions.find((g) => g.name = config)).content
        }
    }
}