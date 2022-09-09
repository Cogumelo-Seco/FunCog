export default (state) => {
    return {
        redirectGameStage: async (newStage) => {
            state.oldGameStage = state.gameStage
            state.gameStage = newStage
        }
    }
}