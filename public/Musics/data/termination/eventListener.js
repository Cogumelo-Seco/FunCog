export default async (type, { noteClickAuthor, note, notes, listenerState, difficulty, events }, state) => {
    switch (type) {
        case 'started':
			let oldCurrentTime = 0
			let screenShake = false

			for (let i in state.arrowsInfo) {
				state.arrowsInfo[i].alpha = 0
				state.arrowsInfo[i].resetEnable = false
				state.arrowsInfo[i].Y = state.arrowsInfo[i].defaultY+(state.downScroll ? -50 : 50)
			}
			for (let i in state.arrowsInfoOpponent) {
				state.arrowsInfoOpponent[i].alpha = 0
				state.arrowsInfoOpponent[i].resetEnable = false
				state.arrowsInfoOpponent[i].Y = state.arrowsInfoOpponent[i].defaultY+(state.downScroll ? -50 : 50)
			}

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

			let pincerPrepareIntervals = {}
			function pincerPrepare({ arrowID, goAway, opponent }) {
				let arrow = state[opponent ? 'arrowsInfoOpponent' : 'arrowsInfo'][arrowID]
				let image = state.images['imgs/QT/pincer-open.png']
				
				clearInterval(pincerPrepareIntervals[arrowID])
				pincerPrepareIntervals[arrowID] = setInterval(() => {
					if (state.downScroll ? goAway ? state.musicInfo.popups[arrowID]?.y >= state.canvas.height+100 : state.musicInfo.popups[arrowID]?.y <= arrow.Y+(state.arrowsSize**state.resizeNote/2) : goAway ? state.musicInfo.popups[arrowID]?.y <= -((image.height*1.5)**state.resizeNote)-100 : state.musicInfo.popups[arrowID]?.y >= arrow.Y+(state.arrowsSize**state.resizeNote/2)-((image.height*1.5)**state.resizeNote)) {
						clearInterval(pincerPrepareIntervals[arrowID])
						state.musicInfo.popups[arrowID].image = `imgs/QT/pincer-close.png`
						if (goAway) setTimeout(() => delete state.musicInfo.popups[arrowID], 1000)
					} else {
						let y = state.musicInfo.popups[arrowID]?.y+(state.downScroll ? goAway ? 20 : -20 : goAway ? -20 : 20)
						if (!y) y = state.downScroll ? goAway ? arrow.Y+((image.height*1.5)**state.resizeNote/2) : state.canvas.height+50 : goAway ? arrow.Y+(state.arrowsSize**state.resizeNote/2)-((image.height*1.5)**state.resizeNote) : -((image.height*1.5)**state.resizeNote)-100

						state.musicInfo.popups[arrowID] = {
								image: `imgs/QT/pincer-open.png`,
								x: arrow.X-(image.width**state.resizeNote/2)-(state.downScroll ? 5 : 25),
								y,
								rotation: state.downScroll ? -90 : 90,
								width: (image.width*1.5)**state.resizeNote,
								height: (image.height*1.5)**state.resizeNote,
						}
					}
				}, 1000/40)
			}

			let arrowMoveIntervals = {}
			function arrowMove({ X, Y, rotation, arrowID, pincer, speed, opponent }) {
				let arrow = state[opponent ? 'arrowsInfoOpponent' : 'arrowsInfo'][arrowID]

				let directionX = X ? X < arrow.X ? '-' : '+' : null
				let directionY = Y ? Y < arrow.Y ? '-' : '+' : null
				if (rotation != undefined) arrow.rotation = rotation

				clearInterval(arrowMoveIntervals[arrowID])
				arrowMoveIntervals[arrowID] = setInterval(() => {
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
						clearInterval(arrowMoveIntervals[arrowID])						
						//delete state.musicInfo.popups[arrowID]
					} else if (pincer) {
						let image = state.images['imgs/QT/pincer-close.png']
						state.musicInfo.popups[arrowID] = {
								image: `imgs/QT/pincer-close.png`,
								x: arrow.X-(image.width**state.resizeNote/2)-(state.downScroll ? 5 : 25),//+(state.arrowsSize**state.resizeNote/2),//+(state.arrowsSize*state.resizeNote/2)-(image.width*state.resizeNote/2)+(state.downScroll ? 10 : 35),
								y: arrow.Y+(state.arrowsSize**state.resizeNote/2)-(state.downScroll ? 0 : (image.height*1.5)**state.resizeNote),
								rotation: state.downScroll ? -90 : 90,
								width: (image.width*1.5)**state.resizeNote,
								height: (image.height*1.5)**state.resizeNote,
						}
					}
				}, 1000/40)
			}

			function attackAlert(alertType) {
				let image = state.images[`QTAlerts/alert${alertType == 2 ? '-double' : ''}-0.png`]
				state.musicInfo.popups.QTAlert = {
					image: `QTAlerts/alert${alertType == 2 ? '-double' : ''}-{{frame}}.png`,
					x: state.canvas.width/2-(image.width/2),
					y: state.canvas.height/2-(image.height/2),
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

            let loop = setInterval(() => {
				if (screenShake) state.screenRotation = (state.animations.QTScreenShake.frame*0.7)-((state.animations.QTScreenShake.endFrame/2)*0.7)
				else state.screenRotation = 0

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

				
				for (let i in events) {
					let time = events[i][0]

					for (let a in events[i][1]) {
						let values = events[i][1][a]

						if (oldCurrentTime*1000 <= time && currentTime*1000 >= time) {
							if (difficulty.name != 'Mania' || values[0] == 'streetBG state' || values[0] == 'TerminationIntro' || values[0] == 'TerminationOutro') switch(values[0]) {
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
									if (!state.botPlay) setTimeout(() => {
										if (!listenerState.keys['Space'] || listenerState.keys['Space']?.lastClickTime && listenerState.keys['Space']?.time-listenerState.keys['Space']?.lastClickTime <= 100 || listenerState.keys['Space']?.time+220 < +new Date()) state.musicInfo.health = -100
									}, 145)
									break
								case 'KB_AttackFireDOUBLE':
									state.playSong('Sounds/attack-double.ogg')
									if (!state.botPlay) setTimeout(() => {
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
											arrowMove({ Y: state.arrowsInfo[2].defaultY+(state.downScroll ? -70 : 70), pincer: true, arrowID: 2 })
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
											arrowMove({ Y: state.arrowsInfo[0].defaultY+(state.downScroll ? -70 : 70), X: state.arrowsInfo[0].defaultX-20, pincer: true, arrowID: 0 })
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
											arrowMove({ Y: state.arrowsInfo[3].defaultY+(state.downScroll ? -50 : 50), X: state.arrowsInfo[3].defaultX+40, pincer: true, arrowID: 3 })
											arrowMove({ Y: state.arrowsInfo[1].defaultY+(state.downScroll ? -70 : 70), X: state.arrowsInfo[1].defaultX+11, pincer: true, arrowID: 1 })
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
											arrowMove({ Y: state.arrowsInfo[3].defaultY+(state.downScroll ? -70 : 70), X: state.arrowsInfo[3].defaultX, pincer: true, rotation: state.downScroll ? -45 : 45, arrowID: 3 })
											arrowMove({ Y: state.arrowsInfo[0].defaultY+(state.downScroll ? -70 : 70), X: state.arrowsInfo[0].defaultX, pincer: true, rotation: state.downScroll ? 45 : -45, arrowID: 0 })
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
											pincerPrepare({ arrowID: 0, opponent: state.middleScroll ? false : true, goAway: false })
											setTimeout(() => screenShake = true, 500)
										},
										24: () => {
											pincerPrepare({ arrowID: 3, goAway: true })
											pincerPrepare({ arrowID: 0, opponent: state.middleScroll ? false : true, goAway: true })
											screenShake = false
										}
									}

									if (pincers[Number(values[1])]) pincers[Number(values[1])]()
							}
						}
					}
				}
				
				oldCurrentTime = currentTime
                if (state.music?.duration <= state.music?.currentTime || state.gameStage != 'game') {
                    clearInterval(loop)
					state.screenZoom = 0
					state.screenRotation = 0
					state.screenXMovement = 0
                    state.screenYMovement = 0

					delete state.animations['QTScreenShake']
					delete state.animations['QTAlerts']
                }
            }, 1000/40)
            break
    }
}