export default (state, Listener, socket) => {
    return {
        getBase64FromUrl: async (url, callback) => {
            var xhr = new XMLHttpRequest();
            xhr.onload = function () {
                /*function Uint8ToString(u8a){
                    var CHUNK_SZ = 0x8000;
                    var c = [];
                    for (var i=0; i < u8a.length; i+=CHUNK_SZ) {
                        c.push(String.fromCharCode.apply(null, u8a.subarray(i, i+CHUNK_SZ)));
                    }
                    return c.join("");
                }*/
                
                var u8 = new Uint8Array(xhr.response);
                var b64encoded = Buffer.from(u8).toString('base64')
                //var b64encoded = btoa(Uint8ToString(u8));

                callback(b64encoded)
            };

            xhr.open('GET', url);
            xhr.responseType = 'arraybuffer';
            xhr.send();
        },
        getKey: (arrowID) => {
            let arrowsKey = (state.selectSettingsOption.settingsOptions.find(c => c[Object.keys(state.arrowsInfo).length+'K']))[Object.keys(state.arrowsInfo).length+'K']
            return (arrowsKey.find(c => c.id == 'Arrow-'+arrowID))?.content
        },
        redirectGameStage: async (newStage, oldStage) => {
            state.animations.transition.frame = 0
            state.gameStageTime = +new Date()
            state.oldGameStage = oldStage || state.gameStage
            state.gameStage = newStage

            socket.emit('updatePlayer', { settings: state.myConfig.settings, token: state.myConfig.token })
        },
        getConfig: (id) => {
            return (state.selectSettingsOption.settingsOptions.find((g) => g?.id == id))?.content
        },
        resetGame: () => {
            state.musicEventListener('end', {}, state)
            state.musicEventListener = () => null
            state.waiting = true
            state.serverId = null
            state.music?.pause()
            state.musicVoice?.pause()
            state.videoBackground?.pause()
            state.music = null
            state.musicVoice = null
            state.videoBackground = null
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
            document.getElementById('gameVideoBackground').style.display = 'none'
            document.getElementById('overlayImage').style.display = 'none'
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

                if (state.backgroundInfo.defaultMovementY-state.backgroundInfo.movementY >= y-(speed || 1) && state.backgroundInfo.defaultMovementY-state.backgroundInfo.movementY <= y+(speed || 1)) {
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
        },
        loopImages: () => {
            let images = document.getElementsByClassName('zoom')
            for (let imageElement of images) {
                const zoom = document.getElementById('zoom');
                const zoomImage = document.getElementById('zoomImage');
                const openOriginal = document.getElementById('openOriginal')

                zoom.onclick = (e) => e.target.id == 'zoom' ? zoom.classList.toggle('open') : null

                imageElement.onclick = (e) => {
                    if (e.target.className.includes('zoom') && e.target.src) {
                        zoom.classList.toggle('open')
                        zoomImage.src = e.target.src
                        openOriginal.href = e.target.src
                    }
                }
            }
        },
        rewardXP: (rewardXP) => {
            console.log(rewardXP)
            let playerInfo = state.myConfig

            if (playerInfo.xp+rewardXP >= state.smallFunctions.requiredXPCalc(playerInfo.level)) {
                playerInfo.xp = playerInfo.xp+rewardXP-state.smallFunctions.requiredXPCalc(playerInfo.level)
                playerInfo.level += 1
                if (playerInfo.xp >= state.smallFunctions.requiredXPCalc(playerInfo.level)) state.smallFunctions.rewardXP(0)
            } else playerInfo.xp += rewardXP

            socket.emit('updatePlayer', playerInfo)
        },
        requiredXPCalc: (level) => Number.parseInt(5 * level ** 2 * level + 100)
    }
}