export default (state) => {
    return {
        redirectGameStage: async (newStage, oldStage) => {
            state.oldGameStage = oldStage || state.gameStage
            state.gameStage = newStage
        }
    }
}