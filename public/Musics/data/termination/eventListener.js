export default async (type, { noteClickAuthor, note, notes, listenerState }, state) => {
    switch (type) {
		case 'loaded':
			for (let i in state.arrowsInfo) {
				state.arrowsInfo[i].alpha = 0
				state.arrowsInfo[i].resetEnable = false
				state.arrowsInfo[i].Y = state.arrowsInfo[i].defaultY+(state.smallFunctions.getConfig('DownScroll') ? 50 : -50)
			}
			for (let i in state.arrowsInfoOpponent) {
				state.arrowsInfoOpponent[i].alpha = 0
				state.arrowsInfoOpponent[i].resetEnable = false
				state.arrowsInfoOpponent[i].Y = state.arrowsInfoOpponent[i].defaultY+(state.smallFunctions.getConfig('DownScroll') ? 50 : -50)
			}
			break
        case 'started':
			state.animations['QTScreenShake'] = {
                frame: 0,
                startFrame: 0,
                endFrame: 10,
                totalDalay: 4,
                dalay: 0,
                boomerang: true,
                boomerangForward: false
            }

			state.animations['QTAlerts'] = {
                frame: 0,
                startFrame: 0,
                endFrame: 5,
                totalDalay: 50,
                dalay: 0,
                loop: false
            }

			state.musicInfo.variables = {
				oldCurrentTime: 0,
				oldBeat: 0,
				screenShake: false,
				pincerPrepareIntervals: {},
				arrowMoveIntervals: {},
			}
			break
		case 'gameLoop':
			let variables = state.musicInfo.variables
			let arrowsSize = state.arrowsInfo[0]?.height

			function intro_outro(player, arrowID, add) {
				arrowMove({ speed: 3, Y: state[player ? 'arrowsInfo' : 'arrowsInfoOpponent'][arrowID].defaultY, arrowID, opponent: player ? false : true })
				setTimeout(() => state[player ? 'arrowsInfo' : 'arrowsInfoOpponent'][arrowID].resetEnable = true, 2000)

				let introLoop = setInterval(() => {
					if (add > 0) {
						state.screenXMovement = Number.parseInt(Math.random()*10)-5
                        state.screenYMovement = Number.parseInt(Math.random()*10)-5
					}

					if (add > 0 && state[player ? 'arrowsInfo' : 'arrowsInfoOpponent'][arrowID].alpha < 1 || add < 0 && state[player ? 'arrowsInfo' : 'arrowsInfoOpponent'][arrowID].alpha > 0) {
						if (state[player ? 'arrowsInfo' : 'arrowsInfoOpponent'][arrowID].alpha+add <= 0) state[player ? 'arrowsInfo' : 'arrowsInfoOpponent'][arrowID].alpha = 0
						else if (state[player ? 'arrowsInfo' : 'arrowsInfoOpponent'][arrowID].alpha+add >= 1) state[player ? 'arrowsInfo' : 'arrowsInfoOpponent'][arrowID].alpha = 1
						else state[player ? 'arrowsInfo' : 'arrowsInfoOpponent'][arrowID].alpha += add
					} else clearInterval(introLoop)
				}, 1000/40)
			}

			function pincerPrepare({ arrowID, goAway, opponent }) {
				let arrow = state[opponent ? 'arrowsInfoOpponent' : 'arrowsInfo'][arrowID]
				let image = state.images['imgs/QT/pincer-open.png'].image
				
				clearInterval(variables.pincerPrepareIntervals[arrowID])
				variables.pincerPrepareIntervals[arrowID] = setInterval(() => {
					if (state.smallFunctions.getConfig('DownScroll') ? goAway ? state.musicInfo.popups[arrowID]?.y >= state.canvas.height+100 : state.musicInfo.popups[arrowID]?.y <= arrow.Y : goAway ? state.musicInfo.popups[arrowID]?.y <= -((image.height*1.5)**state.resizeNote)-100 : state.musicInfo.popups[arrowID]?.y >= arrow.Y) {
						clearInterval(variables.pincerPrepareIntervals[arrowID])
						state.musicInfo.popups[arrowID].image = `imgs/QT/pincer-close.png`
						if (goAway) setTimeout(() => delete state.musicInfo.popups[arrowID], 1000)
					} else {
						let y = state.musicInfo.popups[arrowID]?.y+(state.smallFunctions.getConfig('DownScroll') ? goAway ? 20 : -20 : goAway ? -20 : 20)
						if (!y) y = state.smallFunctions.getConfig('DownScroll') ? goAway ? arrow.Y : state.canvas.height+50 : goAway ? arrow.Y : -((image.height*1.5)**state.resizeNote)-100
						let width = (image.width*1.5)**state.resizeNote
						let height = (image.height*1.5)**state.resizeNote

						state.musicInfo.popups[arrowID] = {
							image: `imgs/QT/pincer-open.png`,
							x: arrow.X+(arrow.width**state.resizeNote/2)-(width/2)+(13**state.resizeNote),
							y,
							rotation: state.smallFunctions.getConfig('DownScroll') ? -90 : 90,
							width,
							height,
						}
					}
				}, 1000/40)
			}

			function arrowMove({ X, Y, rotation, arrowID, pincer, speed, opponent }) {
				let arrow = state[opponent ? 'arrowsInfoOpponent' : 'arrowsInfo'][arrowID]

				let directionX = X ? X < arrow.X ? '-' : '+' : null
				let directionY = Y ? Y < arrow.Y ? '-' : '+' : null
				if (rotation != undefined) arrow.rotation = rotation

				if (variables.arrowMoveIntervals) {
					clearInterval(variables.arrowMoveIntervals[arrowID])
					variables.arrowMoveIntervals[arrowID] = setInterval(() => {
						let clear = []

						if (Y != undefined && directionY == '-' && Y < arrow.Y || Y != undefined && directionY == '+' && Y > arrow.Y) {
							arrow.Y += directionY == '-' ? -(speed) || -7 : speed || 7
							clear.push(false)
						} else if (Y != undefined) clear.push(true)

						if (X != undefined && directionX == '-' && X < arrow.X || X != undefined && directionX == '+' && X > arrow.X) {
							arrow.X += directionX == '-' ? -(speed) || -7 : speed || 7
							clear.push(false)
						} else if (X != undefined) clear.push(true)

						if (!clear.includes(false)) {
							clearInterval(variables.arrowMoveIntervals[arrowID])
						} else if (pincer) {
							let image = state.images['imgs/QT/pincer-close.png'].image
							let width = (image.width*1.5)**state.resizeNote
							let height = (image.height*1.5)**state.resizeNote

							state.musicInfo.popups[arrowID] = {
								image: `imgs/QT/pincer-close.png`,
								x: arrow.X+(arrow.width**state.resizeNote/2)-(width/2)+(13**state.resizeNote),
								y: arrow.Y,
								rotation: state.smallFunctions.getConfig('DownScroll') ? -90 : 90,
								width,
								height,
							}
						}
					}, 1000/40)
				}
			}

			function attackAlert(alertType) {
				let imageData = state.images[`imgs/QT/alert.png`].animationConfig[alertType == 2 ? 'double' : 'single'][`${alertType == 2 ? 'double' : 'single'}-0`]

				state.musicInfo.popups.QTAlert = {
					image: `imgs/QT/alert.png`,
					frame: `${alertType == 2 ? 'double' : 'single'}-{{frame}}`,
					animationDir: alertType == 2 ? 'double' : 'single',
					x: state.canvas.width/2-(imageData.width/2),
					y: state.canvas.height/2-(imageData.height/2),
					animation: 'QTAlerts',
				}

                state.animations.QTAlerts.frame = 0
				let verifyInterval = setInterval(() => {
					if (state.animations.QTAlerts.frame >= 5) {
						delete state.musicInfo.popups.QTAlert
						clearInterval(verifyInterval)
					}
				}, 1000/20)

				if (alertType == 2) state.playSong('Sounds/alertDouble.ogg')
				else state.playSong('Sounds/alert.ogg')
			}

			if (variables.screenShake) state.screenRotation = (state.animations.QTScreenShake.frame*0.7)-((state.animations.QTScreenShake.endFrame/2)*0.7)
			else state.screenRotation = 0

			let beat = state.musicBeat
			let currentTime = state.music?.currentTime

			if (state.screenZoom < 10 && state.camZooming) {
				if (variables.oldBeat != beat && beat%4 == 0) state.screenZoom = 10
			} else if (state.screenZoom <= 0) {
				state.screenZoom = 0
				state.camZooming = true
			} else {
				state.camZooming = false
				state.screenZoom -= 1
			}

			
			for (let i in state.musicInfo.events) {
				let time = state.musicInfo.events[i][0]

				for (let a in state.musicInfo.events[i][1]) {
					let values = state.musicInfo.events[i][1][a]

					if (variables.oldCurrentTime*1000 <= time && currentTime*1000 >= time) {
						if (state.musicInfo.difficulty.name != 'Mania' || values[0] == 'streetBG state' || values[0] == 'TerminationIntro' || values[0] == 'TerminationOutro') switch(values[0]) {
							case 'TerminationIntro':
								intro_outro(values[2] == 'player', Number(values[1]), 0.04)
								break
							case 'TerminationOutro':
								intro_outro(Number(values[1]) > 3, Number(values[1])%4, -0.04)
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
								if (!state.smallFunctions.getConfig('botPlay')) setTimeout(() => {
									if (!listenerState.keys['Space'] || listenerState.keys['Space']?.lastClickTime && listenerState.keys['Space']?.time-listenerState.keys['Space']?.lastClickTime <= 100 || listenerState.keys['Space']?.time+220 < +new Date()) state.musicInfo.health = -100
								}, 145)
								break
							case 'KB_AttackFireDOUBLE':
								state.playSong('Sounds/attack-double.ogg')
								if (!state.smallFunctions.getConfig('botPlay')) setTimeout(() => {
									if (!listenerState.keys['Space'] || listenerState.keys['Space']?.time+220 < +new Date()) state.musicInfo.health = -100
								}, 145)
								break
							case 'streetBG state':
								if (Number(values[1]) == 0) state.musicInfo.backgroundImage = state.musicInfo.defaultBackgroundImage
								else state.musicInfo.backgroundImage = 'backgrounds/streetError.png'
								break
							case 'KB_Pincer':
								let pincers = {
									0: () => {
										pincerPrepare({ arrowID: 2, goAway: false })
									},
									1: () => {
										for (let i in state.arrowsInfo) state.arrowsInfo[i].resetEnable = false
										arrowMove({ Y: state.arrowsInfo[2].defaultY+(state.smallFunctions.getConfig('DownScroll') ? -70 : 70), pincer: true, arrowID: 2 })
									},
									2: () => {
										pincerPrepare({ arrowID: 2, goAway: true })
									},
									3: () => {
										pincerPrepare({ arrowID: 2, goAway: false })
										pincerPrepare({ arrowID: 0, goAway: false })
									},
									4: () => {
										arrowMove({ Y: state.arrowsInfo[2].defaultY, pincer: true, arrowID: 2 })
										arrowMove({ Y: state.arrowsInfo[0].defaultY+(state.smallFunctions.getConfig('DownScroll') ? -70 : 70), X: state.arrowsInfo[0].defaultX-20, pincer: true, arrowID: 0 })
									},
									5: () => {
										pincerPrepare({ arrowID: 2, goAway: true })
										pincerPrepare({ arrowID: 0, goAway: true })
									},
									6: () => {
										pincerPrepare({ arrowID: 0, goAway: false })
										pincerPrepare({ arrowID: 1, goAway: false })
										pincerPrepare({ arrowID: 3, goAway: false })
									},
									7: () => {
										arrowMove({ Y: state.arrowsInfo[0].defaultY, X: state.arrowsInfo[0].defaultX, pincer: true, arrowID: 0 })
										arrowMove({ Y: state.arrowsInfo[3].defaultY+(state.smallFunctions.getConfig('DownScroll') ? -50 : 50), X: state.arrowsInfo[3].defaultX+40, pincer: true, arrowID: 3 })
										arrowMove({ Y: state.arrowsInfo[1].defaultY+(state.smallFunctions.getConfig('DownScroll') ? -70 : 70), X: state.arrowsInfo[1].defaultX+11, pincer: true, arrowID: 1 })
									},
									8: () => {
										pincerPrepare({ arrowID: 3, goAway: true })
										pincerPrepare({ arrowID: 1, goAway: true })
										pincerPrepare({ arrowID: 0, goAway: true })
									},
									9: () => {
										pincerPrepare({ arrowID: 0, goAway: false })
										pincerPrepare({ arrowID: 1, goAway: false })
										pincerPrepare({ arrowID: 2, goAway: false })
										pincerPrepare({ arrowID: 3, goAway: false })
									},
									10: () => {
										arrowMove({ Y: state.arrowsInfo[3].defaultY, X: state.arrowsInfo[3].defaultX, pincer: true, arrowID: 3 })
										arrowMove({ Y: state.arrowsInfo[1].defaultY, X: state.arrowsInfo[1].defaultX, pincer: true, arrowID: 1 })
										arrowMove({ Y: state.arrowsInfo[3].defaultY+(state.smallFunctions.getConfig('DownScroll') ? -70 : 70), X: state.arrowsInfo[3].defaultX, pincer: true, rotation: state.smallFunctions.getConfig('DownScroll') ? -45 : 45, arrowID: 3 })
										arrowMove({ Y: state.arrowsInfo[0].defaultY+(state.smallFunctions.getConfig('DownScroll') ? -70 : 70), X: state.arrowsInfo[0].defaultX, pincer: true, rotation: state.smallFunctions.getConfig('DownScroll') ? 45 : -45, arrowID: 0 })
									},
									11: () => {
										pincerPrepare({ arrowID: 0, goAway: true })
										pincerPrepare({ arrowID: 1, goAway: true })
										pincerPrepare({ arrowID: 2, goAway: true })
										pincerPrepare({ arrowID: 3, goAway: true })
									},
									12: () => {
										pincerPrepare({ arrowID: 3, goAway: false })
										pincerPrepare({ arrowID: 0, goAway: false })
									},
									13: () => {
										arrowMove({ Y: state.arrowsInfo[3].defaultY+80, pincer: true, arrowID: 3 })
										arrowMove({ Y: state.arrowsInfo[0].defaultY-80, pincer: true, arrowID: 0 })
									},
									14: () => {
										arrowMove({ X: state.arrowsInfo[0].defaultX, pincer: true, speed: 20, arrowID: 3 })
										arrowMove({ X: state.arrowsInfo[3].defaultX, pincer: true, speed: 20, arrowID: 0 })
									},
									15: () => {
										arrowMove({ Y: state.arrowsInfo[3].defaultY, X: state.arrowsInfo[0].defaultX, rotation: 0, pincer: true, arrowID: 3 })
										arrowMove({ Y: state.arrowsInfo[0].defaultY, X: state.arrowsInfo[3].defaultX, rotation: 0, pincer: true, arrowID: 0 })
									},
									16: () => {
										pincerPrepare({ arrowID: 3, goAway: true })
										pincerPrepare({ arrowID: 0, goAway: true })
										pincerPrepare({ arrowID: 2, goAway: false })
										pincerPrepare({ arrowID: 1, goAway: false })
									},
									17: () => {
										arrowMove({ Y: state.arrowsInfo[2].defaultY+80, pincer: true, arrowID: 2 })
										arrowMove({ Y: state.arrowsInfo[1].defaultY-80, pincer: true, arrowID: 1 })
									},
									18: () => {
										arrowMove({ X: state.arrowsInfo[1].defaultX, pincer: true, arrowID: 2 })
										arrowMove({ X: state.arrowsInfo[2].defaultX, pincer: true, arrowID: 1 })
									},
									19: () => {
										arrowMove({ Y: state.arrowsInfo[2].defaultY, X: state.arrowsInfo[1].defaultX, pincer: true, arrowID: 2 })
										arrowMove({ Y: state.arrowsInfo[1].defaultY, X: state.arrowsInfo[2].defaultX, pincer: true,  arrowID: 1 })
									},
									20: () => {
										pincerPrepare({ arrowID: 2, goAway: true })
										pincerPrepare({ arrowID: 1, goAway: true })
									},
									21: () => {
										for (let i in state.arrowsInfo) {
											arrowMove({ /*Y: state.arrowsInfo[i].defaultY,*/ X: state.arrowsInfo[i].defaultX, rotation: 0, speed: 20, arrowID: i})
											setTimeout(() => state.arrowsInfo[i].resetEnable = true, 2000)
										}
									},
									22: () => {
										pincerPrepare({ arrowID: 3, goAway: false })
										pincerPrepare({ arrowID: 0, opponent: state.smallFunctions.getConfig('MiddleScroll') ? false : true, goAway: false })
										setTimeout(() => variables.screenShake = true, 500)
									},
									24: () => {
										pincerPrepare({ arrowID: 3, goAway: true })
										pincerPrepare({ arrowID: 0, opponent: state.smallFunctions.getConfig('MiddleScroll') ? false : true, goAway: true })
										variables.screenShake = false
									}
								}

								if (pincers[Number(values[1])]) pincers[Number(values[1])]()
						}
					}
				}
			}
			
			variables.oldBeat = beat
			variables.oldCurrentTime = currentTime
			if (state.music?.duration <= state.music?.currentTime || state.gameStage != 'game') {
				delete state.animations['QTScreenShake']
				delete state.animations['QTAlerts']
			}
            break
    }
}