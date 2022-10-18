export default async (type, { noteClickAuthor, note, notes, listenerState, difficulty }, state) => {
    state.animations['hitKillNote'] = {
        frame: 0,
        startFrame: 1,
        endFrame: 6,
        totalDalay: 40,
        dalay: 0,
        loop: true
    }
    
    switch (type) {
        case 'noteClick':
            if (noteClickAuthor == 'player' && note?.type == 'hitKillNote' && !notes?.find(n => n.errorWhenNotClicking))
                state.musicInfo.health = -100
            break
        case 'started':
			let oldStep = 0
            let signs = {}
            let currentSignId = 0
            if (difficulty.name == 'Mania') return

            let loop = setInterval(() => {
				let beat = state.musicBeat
                let step = state.musicStep

                for (let i in signs) {
                    let resize = 0.6
                    let signInfo = signs[i]
                    let frameInfo = state.images['imgs/Expurgation/signs.png']?.animationConfig[`Sign-${signInfo.type}`][signInfo.frame]
                    if (!frameInfo) {
                        delete state.musicInfo.popups[`sign-${i}`]
                        return delete signs[i]
                    }

                    let posX = frameInfo.frameX < 0 ? -1*(Math.abs(frameInfo.frameX)**(resize+0.2)) : frameInfo.frameX**(resize+0.2)
                    let posY = frameInfo.frameY < 0 ? -1*(Math.abs(frameInfo.frameY)**(resize+0.2)) : frameInfo.frameY**(resize+0.2)

                    switch(signInfo.type) {
                        case 1:
                            signInfo.frame -= 1
                            state.musicInfo.popups[`sign-${i}`] = {
                                image: `imgs/Expurgation/signs.png`,
                                x: (state.arrowsInfo[3].X+(frameInfo.width/2))+(posX),
                                y: state.canvas.height/6+(signInfo.fuck ? Math.abs(posY*2) : posY*2),
                                animationDir: `Sign-${signInfo.type}`,
                                frame: signInfo.frame,
                                resize,
                                rotation: -90,
                                flipX: signInfo.fuck
                            }
                            break
                        case 3:
                            signInfo.frame += 1
                            state.musicInfo.popups[`sign-${i}`] = {
                                image: `imgs/Expurgation/signs.png`,
                                x: (state.arrowsInfo[3].X)+(signInfo.fuck ? Math.abs(posY) : posY),
                                y: (state.downScroll ? state.canvas.height/2 : -(state.canvas.height/5))+(posX),
                                animationDir: `Sign-${signInfo.type}`,
                                frame: signInfo.frame,
                                resize,
                                rotation: -90,
                                flipX: signInfo.fuck
                            }
                            break
                        case 4:
                            signInfo.frame += 1
                            state.musicInfo.popups[`sign-${i}`] = {
                                image: `imgs/Expurgation/signs.png`,
                                x: (state.arrowsInfo[3].X+(frameInfo.width/4))+posX,
                                y: (signInfo.fuck ? -(state.canvas.height/6) : state.canvas.height/3)+(signInfo.fuck ? Math.abs(posY*2) : posY*2),
                                animationDir: `Sign-${signInfo.type}`,
                                frame: signInfo.frame,
                                resize,
                                rotation: -90,
                                flipX: signInfo.fuck
                            }
                            break
                    }
                }

                function doStopSign(sign, fuck) {
                    currentSignId += 1

                    signs[currentSignId] = {
                        frame: sign == 0 ? 50 : 0,
                        type: sign+1,
                        fuck
                    }
                }

                if (step != oldStep) switch(step) {
                    case 384:
                        doStopSign(0);
                        break
                    case 511:
                        doStopSign(2);
                        doStopSign(0);
                        break
                    case 610:
                        doStopSign(3);
                        break
                    case 720:
                        doStopSign(2);
                        break
                    case 991:
                        doStopSign(3);
                        break
                    case 1184:
                        doStopSign(2);
                        break
                    case 1218:
                        doStopSign(0);
                        break
                    case 1235:
                        doStopSign(0, true);
                        break
                    case 1200:
                        doStopSign(3);
                        break
                    case 1328:
                        doStopSign(0, true);
                        doStopSign(2);
                        break
                    case 1439:
                        doStopSign(3, true);
                        break
                    case 1567:
                        doStopSign(0);
                        break
                    case 1584:
                        doStopSign(0, true);
                        break
                    case 1600:
                        doStopSign(2);
                        break
                    case 1706:
                        doStopSign(3);
                        break
                    case 1917:
                        doStopSign(0);
                        break
                    case 1923:
                        doStopSign(0, true);
                        break
                    case 1927:
                        doStopSign(0);
                        break
                    case 1932:
                        doStopSign(0, true);
                        break
                    case 2032:
                        doStopSign(2);
                        doStopSign(0);
                        break
                    case 2036:
                        doStopSign(0, true);
                        break
                    case 2162:
                        doStopSign(2);
                        doStopSign(3);
                        break
                    case 2193:
                        doStopSign(0);
                        break
                    case 2202:
                        doStopSign(0,true);
                        break
                    case 2239:
                        doStopSign(2,true);
                        break
                    case 2258:
                        doStopSign(0, true);
                        break
                    case 2304:
                        doStopSign(0, true);
                        doStopSign(0);	
                        break
                    case 2326:
                        doStopSign(0, true);
                        break
                    case 2336:
                        doStopSign(3);
                        break
                    case 2447:
                        doStopSign(2);
                        doStopSign(0, true);
                        doStopSign(0);	
                        break
                    case 2480:
                        doStopSign(0, true);
                        doStopSign(0);	
                        break
                    case 2512:
                        doStopSign(2);
                        doStopSign(0, true);
                        doStopSign(0);
                    case 2544:
                        doStopSign(0, true);
                        doStopSign(0);	
                        break
                    case 2575:
                        doStopSign(2);
                        doStopSign(0, true);
                        doStopSign(0);
                        break
                    case 2608:
                        doStopSign(0, true);
                        doStopSign(0);	
                        break
                    case 2604:
                        doStopSign(0, true);
                        break
                    case 2655:
                        //doGremlin(20,13,true);
                }


                oldStep = step
                if (state.music?.duration <= state.music?.currentTime || state.gameStage != 'game') {
                    clearInterval(loop)
					state.screenZoom = 0

					delete state.animations['hitKillNote']
                }
            }, 1000/30)
            break
    }
}