export default (state) => {
    return {
        redirectGameStage: async (newStage, oldStage) => {
            if (state.smallFunctions.getConfig('PerformanceMode')) state.animations.transition.frame = state.animations.transition.endFrame
            else state.animations.transition.frame = 0
            state.oldGameStage = oldStage || state.gameStage
            state.gameStage = newStage
        },
        getConfig: (id) => {
            return (state.selectSettingsOption.settingsOptions.find((g) => g.id == id))?.content
        },
        resetGame: () => {
            if (!state.smallFunctions.getConfig('PerformanceMode')) state.musicEventListener('end', {}, state)
            state.musicEventListener = () => null
            state.waiting = true
            state.serverId = null
            state.music?.pause()
            state.musicVoice?.pause()
            state.music = null
            state.musicVoice = null
            state.musicInfo.health = 50
            state.musicNotes = []
            state.musicOpponentNotes = []
            state.serverInfo = {}
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