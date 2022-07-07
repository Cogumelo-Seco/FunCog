module.exports = async (type, { noteClickAuthor, note, notes, listenerState, difficulty, events }, state) => {
    switch (type) {
        case 'started':
			for (let i in state.arrowsInfo) state.arrowsInfo[i].alpha = 0
			for (let i in state.arrowsInfoOpponent) state.arrowsInfoOpponent[i].alpha = 0
			function intro_outro(player, arrowID, add) {
				let introLoop = setInterval(() => {
					if (add > 0 && state[player ? 'arrowsInfo' : 'arrowsInfoOpponent'][arrowID].alpha < 1 || add < 0 && state[player ? 'arrowsInfo' : 'arrowsInfoOpponent'][arrowID].alpha > 0) {
						if (state[player ? 'arrowsInfo' : 'arrowsInfoOpponent'][arrowID].alpha+add <= 0) state[player ? 'arrowsInfo' : 'arrowsInfoOpponent'][arrowID].alpha = 0
						else if (state[player ? 'arrowsInfo' : 'arrowsInfoOpponent'][arrowID].alpha+add >= 1) state[player ? 'arrowsInfo' : 'arrowsInfoOpponent'][arrowID].alpha = 1
						else state[player ? 'arrowsInfo' : 'arrowsInfoOpponent'][arrowID].alpha += add
					} else clearInterval(introLoop)
				}, 1000/10)
			}

			let arrowMoveIntervals = {}
			function arrowMove({ X, Y, rotation, arrowID }) {
				let arrow = state.arrowsInfo[arrowID]

				let directionX = X ? X < arrow.X ? '-' : '+' : null
				let directionY = Y ? Y < arrow.Y ? '-' : '+' : null
				arrow.rotation = rotation

				clearInterval(arrowMoveIntervals[arrowID])
				arrowMoveIntervals[arrowID] = setInterval(() => {
					let clear = []

					if (Y != undefined && directionY == '-' && Y < arrow.Y || Y != undefined && directionY == '+' && Y > arrow.Y) {
						arrow.Y += directionY == '-' ? -7 : 7
						clear.push(false)
					} else if (Y != undefined) clear.push(true)

					if (X != undefined && directionX == '-' && X < arrow.X || X != undefined && directionX == '+' && X > arrow.X) {
						arrow.X += directionX == '-' ? -7 : 7
						clear.push(false)
					} else if (X != undefined) clear.push(true)

					if (!clear.includes(false)) clearInterval(arrowMoveIntervals[arrowID])
				}, 1000/50)
			}

			function attackAlert(alertType) {
				let image = state.images[`QTAlerts/alert${alertType == 2 ? '-double' : ''}-0.png`]
				let popup = {
                    image: `QTAlerts/alert${alertType == 2 ? '-double' : ''}-{{frame}}.png`,
                    x: state.canvas.width/2-(image.width/2),
                    y: state.canvas.height/2-(image.height/2),
                    animation: 'QTAlerts',
                }
				state.musicInfo.popups = [ popup ]
                state.animations.QTAlerts.frame = 0
				let verifyInterval = setInterval(() => {
					if (state.animations.QTAlerts.frame >= 5) {
						state.musicInfo.popups = []
						clearInterval(verifyInterval)
					}
				}, 1000/20)

				if (alertType == 2) state.playSong('Sounds/alertDouble.ogg')
				else state.playSong('Sounds/alert.ogg')
			}

			let oldCurrentTime = 0
            let loop = setInterval(() => {
				let beat = state.musicBeat
				let currentTime = state.music?.currentTime

				if (state.screenZoom < 20 && state.camZooming) {
					if (beat%4 == 0) state.screenZoom = 20
				} else if (state.screenZoom <= 0) {
					state.screenZoom = 0
					state.camZooming = true
				} else {
					state.camZooming = false
					state.screenZoom -= 2
				}

				if (difficulty.name != 'Mania') {
					for (let i in events) {
						let time = events[i][0]

						for (let a in events[i][1]) {
							let values = events[i][1][a]

							if (oldCurrentTime*1000 <= time && currentTime*1000 >= time) {
								switch(values[0]) {
									case 'TerminationIntro':
										intro_outro(values[2] == 'player', Number(values[1]), 0.1)
										break
									case 'TerminationOutro':
										console.log(Number(values[1])%4)
										intro_outro(Number(values[1]) > 3, Number(values[1])%4, -0.1)
										break
									case 'KB_Alert':
										attackAlert()
										break
									case 'KB_AttackPrepare':
										attackAlert()
										break
									case 'KB_AlertDouble':
										attackAlert(2)
										break
									case 'KB_AttackFire':
										state.playSong('Sounds/attack.ogg')
										setTimeout(() => {
											if (!listenerState.keys['Space'] || listenerState.keys['Space']?.time+170 < +new Date()) state.musicInfo.health = -100
										}, 150)
										break
									case 'streetBG state':
										if (Number(values[1]) == 0) state.musicInfo.backgroundImage = state.musicInfo.defaultBackgroundImage
										else state.musicInfo.backgroundImage = 'backgrounds/streetError.png'
										break
									case 'KB_Pincer':
										let pincers = {
											1: () => {
												for (let i in state.arrowsInfo) state.arrowsInfo[i].resetEnable = false
												arrowMove({ Y: state.arrowsInfo[2].defaultY+(state.downScroll ? -70 : 70), arrowID: 2 })
											},
											4: () => {
												arrowMove({ Y: state.arrowsInfo[2].defaultY, arrowID: 2 })
												arrowMove({ Y: state.arrowsInfo[0].defaultY+(state.downScroll ? -70 : 70), arrowID: 0 })
											},
											7: () => {
												arrowMove({ Y: state.arrowsInfo[0].defaultY, arrowID: 0 })
												arrowMove({ Y: state.arrowsInfo[3].defaultY+(state.downScroll ? -70 : 70), arrowID: 3 })
												arrowMove({ Y: state.arrowsInfo[1].defaultY+(state.downScroll ? -70 : 70), arrowID: 1 })
											},
											10: () => {
												arrowMove({ Y: state.arrowsInfo[3].defaultY, arrowID: 3 })
												arrowMove({ Y: state.arrowsInfo[1].defaultY, arrowID: 1 })
												arrowMove({ Y: state.arrowsInfo[3].defaultY+(state.downScroll ? -70 : 70), rotation: state.downScroll ? -45 : 45, arrowID: 3 })
												arrowMove({ Y: state.arrowsInfo[0].defaultY+(state.downScroll ? -70 : 70), rotation: state.downScroll ? 45 : -45, arrowID: 0 })
											},
											13: () => {
												arrowMove({ Y: state.arrowsInfo[3].defaultY+80, rotation: 0, arrowID: 3 })
												arrowMove({ Y: state.arrowsInfo[0].defaultY-80, rotation: 0, arrowID: 0 })
											},
											14: () => {
												arrowMove({ X: state.arrowsInfo[0].defaultX, arrowID: 3 })
												arrowMove({ X: state.arrowsInfo[3].defaultX, arrowID: 0 })
											},
											16: () => {
												arrowMove({ Y: state.arrowsInfo[3].defaultY, X: state.arrowsInfo[0].defaultX, arrowID: 3 })
												arrowMove({ Y: state.arrowsInfo[0].defaultY, X: state.arrowsInfo[3].defaultX, arrowID: 0 })
											},
											17: () => {
												arrowMove({ Y: state.arrowsInfo[2].defaultY+80, rotation: 0, arrowID: 2 })
												arrowMove({ Y: state.arrowsInfo[1].defaultY-80, rotation: 0, arrowID: 1 })
											},
											18: () => {
												arrowMove({ X: state.arrowsInfo[1].defaultX, arrowID: 2 })
												arrowMove({ X: state.arrowsInfo[2].defaultX, arrowID: 1 })
											},
											19: () => {
												arrowMove({ Y: state.arrowsInfo[2].defaultY, X: state.arrowsInfo[1].defaultX, arrowID: 2 })
												arrowMove({ Y: state.arrowsInfo[1].defaultY, X: state.arrowsInfo[2].defaultX, arrowID: 1 })
											},
											21: () => {
												for (let i in state.arrowsInfo) {
													arrowMove({ Y: state.arrowsInfo[i].defaultY, X: state.arrowsInfo[i].defaultX, rotation: 0, arrowID: i})
													setTimeout(() => state.arrowsInfo[i].resetEnable = true, 2000)
												}
											}
										}

										if (pincers[Number(values[1])]) pincers[Number(values[1])]()
								}
							}
						}
					}
				}
/*
				if (difficulty.name != 'Mania') {
					if (beat >= 128 && oldBeat <= 352) {
						if (beat%20 == 0 && state.musicInfo.lastPopupTime+1000 <= +new Date()) {
							state.playSong('Sounds/pop_up.ogg')
							let dir = `bob-PopUps/popup${Number.parseInt(Math.random()*11)+1}.png`
							let image = state.images[dir]
							let popup = {
								image: dir,
								x: Number.parseInt(Math.random()*(state.canvas.width-image.width)),
								y: Number.parseInt(Math.random()*(state.canvas.height-image.height))
							}
							state.musicInfo.popups.push(popup)
							state.musicInfo.lastPopupTime = +new Date()
							setTimeout(() => state.musicInfo.popups.splice(state.musicInfo.popups.indexOf(popup), 1), 1000+Number.parseInt(Math.random()*5000))
						}
					}

					if (oldBeat <= 96 && beat >= 96 || oldBeat <= 240 && beat >= 240) {
						for (let i in state.arrowsInfo) state.arrowsInfo[i].alpha = 0
						for (let i in state.arrowsInfoOpponent) state.arrowsInfoOpponent[i].alpha = 0
						state.playSong('Sounds/Meow.ogg')
					}

					if (oldBeat <= 128 && beat >= 128) {
						for (let i in state.arrowsInfo) state.arrowsInfo[i].alpha = 1
						for (let i in state.arrowsInfoOpponent) state.arrowsInfoOpponent[i].alpha = 1
						state.playSong('Sounds/woeM.ogg')
						state.IsNoteSpinning = true
					}

					if (oldBeat <= 352 && beat >= 352) {
						for (let i in state.arrowsInfo) state.arrowsInfo[i].alpha = 1
						for (let i in state.arrowsInfoOpponent) state.arrowsInfoOpponent[i].alpha = 1
						state.playSong('Sounds/woeM.ogg')
						state.IsNoteSpinning = false
						for (let i in state.arrowsInfo) state.arrowsInfo[i].rotation = 0
						for (let i in state.arrowsInfoOpponent) state.arrowsInfoOpponent[i].rotation = 0
					}

					if (state.IsNoteSpinning) for (let i in state.arrowsInfo) state.arrowsInfo[i].rotation += 1
				}
*/
				oldCurrentTime = currentTime
                if (state.music?.duration <= state.music?.currentTime || state.gameStage != 'game') {
                    clearInterval(loop)
					state.screenZoom = 0
                }
            }, 1000/50)
            break
    }
}