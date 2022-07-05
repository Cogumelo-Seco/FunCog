module.exports = async (type, { noteClickAuthor, note, notes, listenerState, difficulty }, state) => {
    switch (type) {
        case 'noteClick':
            if (noteClickAuthor == 'player' && note?.type == 'hitKillNote' && !notes?.find(n => n.type == 'normal'))
                state.musicInfo.health = -100
            break
        case 'started':
			let oldStep = 0
            if (difficulty.name == 'Mania') return

            let loop = setInterval(() => {
				let beat = state.musicBeat
                let step = state.musicStep

                if (step >= 384 && oldStep <= 384) {
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
                }


                oldStep = step
                if (state.music?.duration <= state.music?.currentTime || state.gameStage != 'game') {
                    clearInterval(loop)
					state.screenZoom = 0
                }
            }, 1000/50)//state.musicBPM*1.1)
            break
    }

    let lastTimeSing = 0
    function doStopSign(sign, fuck) {
        let resize = 0.6
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
        }
    }
}