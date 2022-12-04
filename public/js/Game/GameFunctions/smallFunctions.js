export default (state) => {
    return {
        redirectGameStage: async (newStage, oldStage) => {
            state.animations.transition.frame = 0
            state.oldGameStage = oldStage || state.gameStage
            state.gameStage = newStage
        },
        getConfig: (id) => {
            return (state.selectSettingsOption.settingsOptions.find((g) => g.id == id))?.content
        },
        resetScreen: () => {
            state.musicEventListener = () => null
            state.screenZoom = 0
            state.screenRotation = 0
            state.screenXMovement = 0
            state.screenYMovement = 0
            state.HUD = true
            state.customBongPosition = { X: null, Y: null }
            state.animations = state.defaultAnimations
        }
    }
}