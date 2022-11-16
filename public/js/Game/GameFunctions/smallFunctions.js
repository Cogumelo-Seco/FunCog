export default (state) => {
    return {
        redirectGameStage: async (newStage, oldStage) => {
            state.oldGameStage = oldStage || state.gameStage
            state.gameStage = newStage
        },
        getConfig: (id) => {
            return (state.selectSettingsOption.settingsOptions.find((g) => g.id == id))?.content
        }
    }
}