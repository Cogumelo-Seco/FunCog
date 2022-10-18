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
                    signInfo.frame += 1
                    let frameInfo = state.images['imgs/Expurgation/signs.png']?.animationConfig[`Sign-${signInfo.type}`][signInfo.frame]
                    if (!frameInfo) {
                        delete state.musicInfo.popups[`sign-${i}`]
                        return delete signs[i]
                    }

                    let posX = frameInfo.frameX < 0 ? -1*(Math.abs(frameInfo.frameX)**(resize+0.2)) : frameInfo.frameX**(resize+0.2)
                    let posY = frameInfo.frameY < 0 ? -1*(Math.abs(frameInfo.frameY)**(resize+0.2)) : frameInfo.frameY**(resize+0.2)

                    switch(signInfo.type) {
                        case 1:
                            state.musicInfo.popups[`sign-${i}`] = {
                                image: `imgs/Expurgation/signs.png`,
                                x: (state.arrowsInfo[3].X+(frameInfo.width/4))+(posX),
                                y: state.canvas.height/4+(posY),
                                animationDir: `Sign-${signInfo.type}`,
                                frame: signInfo.frame,
                                resize,
                                rotation: -90,
                                flipX: signInfo.fuck
                            }
                            break
                        case 3:
                            state.musicInfo.popups[`sign-${i}`] = {
                                image: `imgs/Expurgation/signs.png`,
                                x: (state.arrowsInfo[3].X)+posY,
                                y: (state.downScroll ? state.canvas.height/2 : -(state.canvas.height/5))+(posX),
                                animationDir: `Sign-${signInfo.type}`,
                                frame: signInfo.frame,
                                resize,
                                rotation: -90,
                                flipX: signInfo.fuck
                            }
                            break
                        case 4:
                            state.musicInfo.popups[`sign-${i}`] = {
                                image: `imgs/Expurgation/signs.png`,
                                x: (state.arrowsInfo[signInfo.fuck ? 0 : 3].X+(frameInfo.width/4))+posX,
                                y: state.canvas.height/6+(posY),
                                animationDir: `Sign-${signInfo.type}`,
                                frame: signInfo.frame,
                                resize,
                                rotation: -90,
                                flipX: signInfo.fuck
                            }
                            break
                    }
                }

                let signsInfo = {}
                let lastTimeSing = 0
                function doStopSign(sign, fuck) {
                    currentSignId += 1
                    console.log(currentSignId)

                    signs[currentSignId] = {
                        frame: 0,
                        type: sign+1,
                        fuck
                    }
                    /*sign += 1
                    currentSignId += 1
                    let resize = 0.6

                    for (let signId = 0;signId < currentSignId; signId++) {
                        if (!signsInfo[signId]) signsInfo[signId] = {
                            frame: 0
                        }

                        let signInfo = signsInfo[signId]

                        let frameInfo = state.images['imgs/Expurgation/signs.png']?.animationConfig[`Sign-${sign}`][signsframes[signId]]
                        if (!frameInfo) return
                        let posX = frameInfo.frameX < 0 ? -1*(Math.abs(frameInfo.frameX)*resize) : frameInfo.frameX*resize
                        let posY = frameInfo.frameY < 0 ? -1*(Math.abs(frameInfo.frameY)*resize) : frameInfo.frameY*resize

                        /*switch(sign) {
                            case 1:
                                state.musicInfo.popups[`sign-${signId}`] = {
                                    image: `imgs/Expurgation/signs.png`,
                                    x: state.canvas.height+posX,//state.positionArrow[3],
                                    y: state.canvas.height/2+(posY),//state.canvas.height/2,
                                    animationDir: `Sign-${sign}`,
                                    frame: signInfo.frame,
                                    resize,
                                    rotation: fuck ? 0 : -90,
                                }
                                /*break
                        }
                    }

                    /*if (!signsframes[signId]) signsframes[signId] = 0

                    let interval = setInterval(() => {
                        signsframes[signId] += 1
                        let frameInfo = state.images['imgs/Expurgation/signs.png']?.animationConfig[`Sign-${sign}`][signsframes[signId]]
                        if (!frameInfo) {
                            
                            //if (!state.musicInfo.popups[`sign-${signId}`]) clearInterval(interval)
                            return
                        }
                        delete state.musicInfo.popups[`sign-${signId}`]

                        let posX = frameInfo.frameX < 0 ? -1*(Math.abs(frameInfo.frameX)*resize) : frameInfo.frameX*resize
                        let posY = frameInfo.frameY < 0 ? -1*(Math.abs(frameInfo.frameY)*resize) : frameInfo.frameY*resize

                        switch(sign) {
                            case 1:
                                state.musicInfo.popups[`sign-${signId}`] = {
                                    image: `imgs/Expurgation/signs.png`,
                                    x: state.canvas.height+posX,//state.positionArrow[3],
                                    y: state.canvas.height/2+(posY),//state.canvas.height/2,
                                    animationDir: `Sign-${sign}`,
                                    frame: signsframes[signId],
                                    resize,
                                    rotation: fuck ? 0 : -90,
                                }
                                break
                        }

                        ///state.canvas.width
                        //state.arrowsInfo[0].X
                    }, 1000/10)
                    

                    /*let resize = 0.6
                    if (lastTimeSing+1000 >= +new Date()) return
                    lastTimeSing = +new Date()

                    switch(sign) {
                        case 0:
                            var image = state.images['expurgation-sings/Signature-Stop Sign-1-1.png']
                            var popup = {
                                image: 'expurgation-sings/Signature-Stop Sign-1-{{frame}}.png',
                                x: state.positionArrow[3]-(image.width*resize*(Math.random()*0.5+0.25)),
                                y: state.canvas.height-(image.height*resize*(Math.random()*3+1)),
                                animation: 'expurgationSing1',
                                resize,
                                flipX: fuck,
                                flipY: true
                            }
                            state.musicInfo.popups.push(popup)
                            state.animations.expurgationSing1.frame = 0
                            setTimeout(() => state.musicInfo.popups.splice(state.musicInfo.popups.indexOf(popup), 1), 15000)
                            break
                        case 2:
                            var image = state.images['expurgation-sings/Signature-Stop Sign-3-1.png']
                            var popup = {
                                image: 'expurgation-sings/Signature-Stop Sign-3-{{frame}}.png',
                                x: state.positionArrow[3]-(image.width*resize*0.6),
                                y: state.canvas.height/2-(image.height*resize),
                                animation: 'expurgationSing3',
                                resize,
                                flipX: fuck,
                                flipY: true
                            }
                            state.musicInfo.popups.push(popup)
                            state.animations.expurgationSing3.frame = 1
                            setTimeout(() => state.musicInfo.popups.splice(state.musicInfo.popups.indexOf(popup), 1), 15000)
                            break
                        case 3:
                            var image = state.images['expurgation-sings/Signature-Stop Sign-4-1.png']
                            var popup = {
                                image: 'expurgation-sings/Signature-Stop Sign-4-{{frame}}.png',
                                x: state.positionArrow[3]-(image?.width*resize*(Math.random()*0.5+0.25)),
                                y: state.canvas.height/2-(image?.height*resize*0.5),
                                animation: 'expurgationSing4',
                                resize,
                                flipX: fuck,
                                flipY: true
                            }
                            state.musicInfo.popups.push(popup)
                            state.animations.expurgationSing4.frame = 0
                            setTimeout(() => state.musicInfo.popups.splice(state.musicInfo.popups.indexOf(popup), 1), 5000)
                            break
                    }*/
                }

                /*if (step >= 384 && oldStep <= 384) {
                    doStopSign(0);
                }
                if (step >= 511 && oldStep <= 511) {
                    doStopSign(0);
                    doStopSign(2);
                }
                if (step >= 610 && oldStep <= 610) {
                    doStopSign(3);
                }
                if (step >= 720 && oldStep <= 720) {
                    doStopSign(2);
                }
                if (step >= 991 && oldStep <= 991) {
                    doStopSign(3);
                }
                if (step >= 1184 && oldStep <= 1184) {
                    doStopSign(2);
                }
                if (step >= 1218 && oldStep <= 1218) {
                    doStopSign(0);
                }
                if (step >= 1235 && oldStep <= 1235) {
                    doStopSign(0, true);
                }
                if (step >= 1200 && oldStep <= 1200) {
                    doStopSign(3);
                }
                if (step >= 1328 && oldStep <= 1328) {
                    doStopSign(0, true);
                    doStopSign(2);
                }
                if (step >= 1439 && oldStep <= 1439) {
                    doStopSign(3, true);
                }
                if (step >= 1567 && oldStep <= 1567) {
                    doStopSign(0);
                }
                if (step >= 1584 && oldStep <= 1584) {
                    doStopSign(0, true);
                }
                if (step >= 1600 && oldStep <= 1600) {
                    doStopSign(2);
                }
                if (step >= 1706 && oldStep <= 1706) {
                    doStopSign(3);
                }
                if (step >= 1917 && oldStep <= 1917) {
                    doStopSign(0);
                }
                if (step >= 1923 && oldStep <= 1923) {
                    doStopSign(0, true);
                }
                if (step >= 1927 && oldStep <= 1927) {
                    doStopSign(0);
                }
                if (step >= 1932 && oldStep <= 1932) {
                    doStopSign(0, true);
                }
                if (step >= 2032 && oldStep <= 2032) {
                    doStopSign(0);
                    doStopSign(2);
                }
                if (step >= 2036 && oldStep <= 2036) {
                    doStopSign(0, true);
                }
                if (step >= 2162 && oldStep <= 2162) {
                    doStopSign(2);
                    doStopSign(3);
                }
                if (step >= 2193 && oldStep <= 2193) {
                    doStopSign(0);
                }
                if (step >= 2202 && oldStep <= 2202) {
                    doStopSign(0, true);
                }
                if (step >= 2239 && oldStep <= 2239) {
                    doStopSign(2, true);
                }
                if (step >= 2258 && oldStep <= 2258) {
                    doStopSign(0, true);
                }
                if (step >= 2304 && oldStep <= 2304) {
                    doStopSign(0, true);
                    doStopSign(0);
                }
                if (step >= 2326 && oldStep <= 2326) {
                    doStopSign(0, true);
                }
                if (step >= 2336 && oldStep <= 2336) {
                    doStopSign(3);
                }
                if (step >= 2447 && oldStep <= 2447) {
                    doStopSign(2);
                    doStopSign(0, true);
                    doStopSign(0);
                }
                if (step >= 2480 && oldStep <= 2480) {
                    doStopSign(0, true);
                    doStopSign(0);
                }
                if (step >= 2512 && oldStep <= 2512) {
                    doStopSign(0, true);
                    doStopSign(0);
                    doStopSign(2);
                }
                if (step >= 2544 && oldStep <= 2544) {
                    doStopSign(0, true);
                    doStopSign(0);
                }
                if (step >= 2575 && oldStep <= 2575) {
                    doStopSign(0);
                    doStopSign(0, true);
                    doStopSign(2);
                }
                if (step >= 2608 && oldStep <= 2608) {
                    doStopSign(0, true);
                    doStopSign(0);
                }
                if (step >= 2604 && oldStep <= 2604) {
                    doStopSign(0, true);
                }*/

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