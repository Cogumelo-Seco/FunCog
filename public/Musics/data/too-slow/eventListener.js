export default async (type, { noteClickAuthor, note, notes, listenerState, difficulty, events }, state) => {
    switch (type) {
		case 'noteClick':
			break
		case 'passedNote':
			if (note?.type == 'sonicEXEStaticNote') {
				state.musicInfo.health -= 15
				state.playSong('Sounds/hitStatic1.ogg', { newSong: true })

				state.musicInfo.popups.sonicEXEHitStatic = {
					image: `imgs/sonicEXE/sonicEXEHitStatic/sonicEXEHitStatic.png`,
					animationDir: 'frames',
					frame: 0,
					x: 0,
					y: 0,
					width: state.canvas.width,
					height: state.canvas.height,
				}

				let interval = setInterval(() => {
					if (state.musicInfo.popups.sonicEXEHitStatic?.frame >= state.images['imgs/sonicEXE/sonicEXEHitStatic/sonicEXEHitStatic.png']?.animationConfig.frames.length-1) {
						clearInterval(interval)
						delete state.musicInfo.popups.sonicEXEHitStatic
					} else if (state.musicInfo.popups.sonicEXEHitStatic) state.musicInfo.popups.sonicEXEHitStatic.frame += 1
				}, 1000/30);
				//setTimeout(() => delete state.musicInfo.popups.sonicEXEHitStatic, 500)
			}
			break
        case 'started':
			let oldBeat = 0
			let oldStep = 0

			function doStaticSign() {
				state.playSong('Sounds/simplejumpsound.ogg')

				state.musicInfo.popups.sonicEXESimpleStatic = {
					image: `imgs/sonicEXE/sonicEXESimpleStatic/sonicEXESimpleStatic.png`,
					animationDir: 'frames',
					frame: Number.parseInt(Math.random()*6),
					x: 0,
					y: 0,
					width: state.canvas.width,
					height: state.canvas.height,
					alpha: '0.1-0.5',
					alphaRandom: true
				}

				setTimeout(() => delete state.musicInfo.popups.sonicEXESimpleStatic, 200)
			}

			function doSimpleJump() {
				state.playSong('Sounds/sppok.ogg')

				state.musicInfo.popups.sonicEXESimpleJumpscare = {
					image: 'jumpscares/sonicEXESimpleJump.png',
					x: 0,
					y: 0,
					width: state.canvas.width,
					height: state.canvas.height,
				}

				setTimeout(() => delete state.musicInfo.popups.sonicEXESimpleJumpscare, 250)
			}

			function doJumpscare() {
				let frame = 0
				let loop = setInterval(() => {
					frame += 1
					let imageData = state.images[`imgs/sonicEXE/sonicJumpscare/sonicJumpscare.png`]
					let imageConfig = imageData.animationConfig

					state.musicInfo.popups.sonicEXEJumpscare = {
						image: `imgs/sonicEXE/sonicJumpscare/sonicJumpscare.png`,
						animationDir: 'frames',
						frame,
						x: state.canvas.width/2-(imageConfig.frames[0].width/2),
						y: state.canvas.height-(imageConfig.frames[0].height/2),
					}

					if (frame >= imageData.animationConfig.frames.length-1) {
						clearInterval(loop)
						delete state.musicInfo.popups.sonicEXEJumpscare
					}
				}, 1000/20)

				state.playSong('Sounds/datOneSound.ogg')
			}

            let loop = setInterval(() => {
				let beat = state.musicBeat
				let step = state.musicStep

				if (state.screenZoom < 10 && state.camZooming) {
					if (beat%5 == 0 && beat != oldBeat) state.screenZoom = 10
				} else if (state.screenZoom <= 0) {
					state.screenZoom = 0
					state.camZooming = true
				} else {
					state.camZooming = false
					state.screenZoom -= 1
				}

				if (step != oldStep) switch (Number.parseInt(step*1.16)) {
					case 27:
						doStaticSign(0);
						break
					case 130:
						doStaticSign(0);
						break
					case 265:
						doStaticSign(0);
						break
					case 450:
						doStaticSign(0);
						break
					case 645:
						doStaticSign(0);
						break
					case 800:
						doStaticSign(0);
						break
					case 855:
						doStaticSign(0);
						break
					case 889:
						doStaticSign(0);
						break
					case 921:
						doSimpleJump();
						break
					case 938:
						doStaticSign(0);
						break
					case 981:
						doStaticSign(0);
						break
					case 1030:
						doStaticSign(0);
						break
					case 1065:
						doStaticSign(0);
						break
					case 1105:
						doStaticSign(0);
						break
					case 1123:
						doStaticSign(0);
						break
					case 1178:
						doSimpleJump();
						break
					case 1245:
						doStaticSign(0);
						break
					case 1337:
						doSimpleJump();
						break
					case 1345:
						doStaticSign(0);
						break
					case 1432:
						doStaticSign(0);
						break
					case 1454:
						doStaticSign(0);
						break
					case 1495:
						doStaticSign(0);
						break
					case 1521:
						doStaticSign(0);
						break
					case 1558:
						doStaticSign(0);
						break
					case 1578:
						doStaticSign(0);
						break
					case 1599:
						doStaticSign(0);
						break
					case 1618:
						doStaticSign(0);
						break
					case 1647:
						doStaticSign(0);
						break
					case 1657:
						doStaticSign(0);
						break
					case 1692:
						doStaticSign(0);
						break
					case 1713:
						doStaticSign(0);
						break
					case 1723:
						doJumpscare();
						break
					case 1738:
						doStaticSign(0);
						break
					case 1747:
						doStaticSign(0);
						break
					case 1761:
						doStaticSign(0);
						break
					case 1785:
						doStaticSign(0);
						break
					case 1806:
						doStaticSign(0);
						break
					case 1816:
						doStaticSign(0);
						break
					case 1832:
						doStaticSign(0);
						break
					case 1849:
						doStaticSign(0);
						break
					case 1868:
						doStaticSign(0);
						break
					case 1887:
						doStaticSign(0);
						break
					case 1909:
						doStaticSign(0);
						break
				}

				oldStep = step
				oldBeat = beat
                if (state.music?.duration <= state.music?.currentTime || state.gameStage != 'game') {
                    clearInterval(loop)
					state.screenZoom = 0
                }
            }, 1000/30)
            break
    }
}