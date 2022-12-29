export default (state, Listener) => {
    return {
        getKey: (arrowID) => {
            let arrowsKey = (state.selectSettingsOption.settingsOptions.find(c => c[Object.keys(state.arrowsInfo).length+'K']))[Object.keys(state.arrowsInfo).length+'K']
            return (arrowsKey.find(c => c.id == 'Arrow-'+arrowID))?.content
        },
        redirectGameStage: async (newStage, oldStage) => {
            state.animations.transition.frame = 0
            state.gameStageTime = +new Date()
            state.oldGameStage = oldStage || state.gameStage
            state.gameStage = newStage
        },
        getConfig: (id) => {
            return (state.selectSettingsOption.settingsOptions.find((g) => g.id == id))?.content
        },
        resetGame: () => {
            state.musicEventListener('end', {}, state)
            state.musicEventListener = () => null
            state.waiting = true
            state.serverId = null
            state.music?.pause()
            state.musicVoice?.pause()
            state.music = null
            state.musicVoice = null
            state.musicInfo.health = 50
            state.arrowsInfo = {}
            state.arrowsInfoOpponent = {}
            state.musicNotes = []
            state.musicOpponentNotes = []
            state.serverInfo = {}
            state.screenFilter = ''
            state.screenZoom = 0
            state.screenRotation = 0
            state.screenXMovement = 0
            state.screenYMovement = 0
            state.alphaHUD = 1
            state.customBongPosition = { X: null, Y: null }
            state.animations = state.defaultAnimations
            state.invertArrowPos = false
            state.speed = 1
            document.getElementById('gameBackground').style.display = 'none'
            state.backgroundInfo = {
				zoom: 0,
				movementX: 0,
				movementY: 0,
				rotation: 0
			}
        },
        moveBackground: (x, y, speed) => {
            clearInterval(state.moveBackgroundInterval)
            state.moveBackgroundInterval = setInterval(() => {
                let clear = [false,false]

                console.log(state.backgroundInfo.defaultMovementX-state.backgroundInfo.movementX, state.backgroundInfo.defaultMovementY-state.backgroundInfo.movementY)
                if (state.backgroundInfo.defaultMovementY-state.backgroundInfo.movementY >= y-(speed || 1) && state.backgroundInfo.defaultMovementY-state.backgroundInfo.movementY <= y+(speed || 1)) {
                    //state.backgroundInfo.movementY = state.backgroundInfo.defaultMovementY+y
                    clear[0] = true
                } else {
                    if (y == 0) {
                        if (state.backgroundInfo.defaultMovementY-state.backgroundInfo.movementY > 0) state.backgroundInfo.movementY += speed || 1
                        else state.backgroundInfo.movementY -= speed || 1
                    } else {
                        if (y > 0) state.backgroundInfo.movementY -= speed || 1
                        else if (y < 0) state.backgroundInfo.movementY += speed || 1
                    }
                }

                if (state.backgroundInfo.defaultMovementX-state.backgroundInfo.movementX >= x-(speed || 1) && state.backgroundInfo.defaultMovementX-state.backgroundInfo.movementX <= x+(speed || 1)) {
                    //state.backgroundInfo.movementX = state.backgroundInfo.defaultMovementX+x
                    clear[1] = true
                } else {
                    if (x == 0) {
                        if (state.backgroundInfo.defaultMovementX-state.backgroundInfo.movementX > 0) state.backgroundInfo.movementX += speed || 1
                        else state.backgroundInfo.movementX -= speed || 1
                    } else {
                        if (x > 0) state.backgroundInfo.movementX -= speed || 1
                        else if (x < 0) state.backgroundInfo.movementX += speed || 1
                    }
                }

                if (clear[0] && clear[1]) {
                    clearInterval(state.moveBackgroundInterval)
                }
            }, 1000/30)
        }
    }
}