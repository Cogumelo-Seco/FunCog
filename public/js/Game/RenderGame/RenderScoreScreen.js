export default async (canvas, game, Listener, functions) => {
    const ctx = canvas.getContext('2d')

    ctx.font = `bold ${(canvas.width+canvas.height)*0.03}px Arial`

    let musicName = game.state.musicInfo.name.replace(/[-]/g, ' ')
    let difficultyName = game.state.musicInfo.difficulty.name+(game.state.musicInfo.difficultyAlert && game.state.musicInfo.difficultyAlert[game.state.musicInfo.difficulty.id] ? ` ${game.state.musicInfo.difficultyAlert[game.state.musicInfo.difficulty.id]}` : '')

    ctx.fillStyle = game.state.musicInfo.menuColor?.includes('RAINBOW') ? `hsl(${game.state.rainbowColor+(Number(game.state.musicInfo.menuColor.split('-')[1]) || 0)}, 100%, 50%)` : game.state.musicInfo.menuColor || 'white'
    ctx.fillText(musicName, canvas.width/2-((ctx.measureText(musicName).width+ctx.measureText(`(${difficultyName})`).width)/2), 80);

    ctx.fillStyle = game.state.musicInfo.difficulty.color || 'white'
    ctx.fillText(`(${difficultyName})`, 10+canvas.width/2+((ctx.measureText(musicName).width+ctx.measureText(`(${difficultyName})`).width)/2-(ctx.measureText(`(${difficultyName})`).width)), 80);

    let playerWin = game.state.musicInfoOpponent.score == game.state.musicInfo.score ? 'draw' : game.state.musicInfo.score > game.state.musicInfoOpponent.score ? true : false

    if (game.state.online) {
        drawBox({
            playerId: 2,
            popupColor: playerWin == 'draw' ? 'rgb(255, 150, 100)' : playerWin ? 'rgb(255, 100, 100)' : 'rgb(130, 200, 120)',
            playerMusicInfo: game.state.musicInfoOpponent,
            musicInfoPopupWidth: canvas.width/4,
            musicInfoPopupHeight: canvas.width/4,
            musicInfoPopupX: canvas.width/12,
            musicInfoPopupY: 120+((canvas.height-120)/2-(canvas.width/4/2))
        })
        drawBox({
            playerId: 1,
            popupColor: playerWin == 'draw' ? 'rgb(255, 150, 100)' : playerWin ? 'rgb(130, 200, 120)' : 'rgb(255, 100, 100)',
            playerMusicInfo: game.state.musicInfo,
            musicInfoPopupWidth: canvas.width/4,
            musicInfoPopupHeight: canvas.width/4,
            musicInfoPopupX: canvas.width-canvas.width/4-canvas.width/12,
            musicInfoPopupY: 120+((canvas.height-120)/2-(canvas.width/4/2))
        })
    } else drawBox({
        popupColor: game.state.musicInfo.dead ? 'rgb(255, 100, 100)' : 'rgb(200, 200, 200)',
        playerMusicInfo: game.state.musicInfo,
        musicInfoPopupWidth: canvas.width/4,
        musicInfoPopupHeight: canvas.width/4,
        musicInfoPopupX: canvas.width/12,
        musicInfoPopupY: 120+((canvas.height-120)/2-(canvas.width/4/2))
    })

    function drawBox({ musicInfoPopupWidth, musicInfoPopupHeight, musicInfoPopupX, musicInfoPopupY, playerMusicInfo, popupColor, playerId }) {
        ctx.font = `bold ${musicInfoPopupWidth*0.1}px Arial`
        ctx.fillStyle = 'white'//'rgb(50, 150, 40)'
        if (game.state.online) {
            let txt = playerId == 1 ? 'Your Results' : 'Opponent Results'
            ctx.fillText(txt, musicInfoPopupX+(musicInfoPopupWidth/2)-(ctx.measureText(txt).width/2), musicInfoPopupY-7);
        }
        ctx.fillStyle = popupColor
        ctx.fillRect(musicInfoPopupX, musicInfoPopupY, musicInfoPopupWidth, musicInfoPopupHeight)

        let msgArr = [
            {
                msg: game.state.smallFunctions.getConfig('botPlay') ? 'Bongo Cat' : 'Stats',
                type: 'title'
            },
            {
                msg: 'Score:',
                msg2: (playerMusicInfo.score || 0),
                type: 'stats'
            },
            {
                msg: 'Misses:',
                msg2: (playerMusicInfo.misses || 0),
                type: 'stats'
            },
            {
                msg: 'Best Combo:',
                msg2: (playerMusicInfo.bestCombo || 0)+(playerMusicInfo.misses == 0 ? ' (FC)' : ''),
                type: 'stats'
            },
            {
                msg: 'Accuracy:',
                msg2: (playerMusicInfo.accuracy?.toFixed(2)+'%' || '0%'),
                type: 'stats'
            },
            {
                msg: 'Judgements',
                type: 'title'
            },
            {
                msg: 'sick',
                msg2: 'bad',
                type: 'judgements'
            },
            {
                msg: 'good',
                msg2: 'shit',
                type: 'judgements'
            },
        ]

        let resizeMsg = 0.07
        let msgY = musicInfoPopupY+(musicInfoPopupWidth*resizeMsg*1.5)
        for (let i in msgArr) {
            resizeMsg = 0.07
            let msg = msgArr[i]

            switch (msg.type) {
                case 'stats':
                    ctx.fillStyle = 'black'//'rgb(0, 150, 0)'
                    ctx.font = `bold ${musicInfoPopupWidth*resizeMsg}px Arial`
                    ctx.fillText(msg.msg, musicInfoPopupX+(musicInfoPopupWidth*0.03), msgY);
        
                    ctx.fillStyle = 'black'//'rgb(0, 150, 0)'
                    ctx.font = `bold ${musicInfoPopupWidth*resizeMsg}px Arial`
                    ctx.fillText(msg.msg2, (musicInfoPopupX+musicInfoPopupWidth)-(musicInfoPopupWidth*0.03)-ctx.measureText(msg.msg2).width, msgY);
        
                    msgY += musicInfoPopupWidth*resizeMsg
                    break
                case 'title':
                    resizeMsg *= 1.5
                    msgY += (musicInfoPopupWidth*resizeMsg*1.5)-(musicInfoPopupWidth*resizeMsg)

                    ctx.lineWidth = 2
                    ctx.strokeStyle = 'black'//'rgb(0, 100, 0)'
                    ctx.font = `bold ${musicInfoPopupWidth*resizeMsg}px Arial`
                    ctx.strokeText(msg.msg, musicInfoPopupX+(musicInfoPopupWidth/2)-(ctx.measureText(msg.msg).width/2), msgY);

                    msgY += musicInfoPopupWidth*resizeMsg
                    break
                case 'judgements':
                    function drawRating(judgement, type) {
                        let ratingImage = game.state.images[`ratings/${judgement}.png`]
                        if (ratingImage) {
                            let judgementScore = playerMusicInfo.judgements[judgement] || 0
                            let ratingImageWidth = ratingImage.image.width*2.5*(resizeMsg*1.2)
                            let ratingImageHeight = ratingImage.image.height*2.5*(resizeMsg*1.2)
                            let ratingImageY = msgY
                            let ratingImageX = type == 1 ? musicInfoPopupX : (musicInfoPopupX+musicInfoPopupWidth)-ratingImageWidth-ctx.measureText('X'+judgementScore).width-3

                            ctx.fillStyle = 'black'//'rgb(0, 150, 0)'
                            ctx.font = `bold ${musicInfoPopupWidth*resizeMsg}px Arial`
                            ctx.fillText('X'+judgementScore, ratingImageX+ratingImageWidth, ratingImageY+(musicInfoPopupWidth*resizeMsg));

                            ctx.drawImage(ratingImage.image, ratingImageX, ratingImageY, ratingImageWidth, ratingImageHeight);
                        }
                    }

                    drawRating(msg.msg, 1)
                    drawRating(msg.msg2, 2)
                    msgY += musicInfoPopupWidth*(resizeMsg*1.5)
                    break
            }
        }
    }

    if (!game.state.online) {
        let graphicWidth = canvas.width/4
        let graphicHeight = graphicWidth/2
        let graphicX = canvas.width-(canvas.width/12)-graphicWidth
        let graphicY = 120+((canvas.height-120)/2-(canvas.width/4/2))
        

        ctx.strokeStyle = 'rgb(200, 200, 200)'
        ctx.lineWidth = 5
        ctx.rect(graphicX, graphicY, graphicWidth, graphicHeight)
        ctx.stroke()

        graphicX += 10
        graphicY += 10
        graphicHeight -= 20
        graphicWidth -= 20

        function renderGraphic(graphicData, color, color2) {
            ctx.lineWidth = 2
            ctx.strokeStyle = color
            let lastGraphicInfo = { x: graphicX,  y: graphicY }
            if (graphicData.length <= 5000) for (let i in graphicData) {
                let percent = (graphicData[i] || 1)/100
                let percentNext = (graphicData[Number(i)+1] || 100)/100

                let x = graphicX+(graphicWidth*(i/(graphicData.length-1)))-ctx.lineWidth
                let y = graphicY+(graphicHeight-graphicHeight*(percent))

                ctx.strokeStyle = percent <= 0.5 || percentNext <= 0.5 ? color2 || color : color

                ctx.beginPath();
                ctx.moveTo(lastGraphicInfo.x, lastGraphicInfo.y);
                ctx.lineTo(x, y);
                ctx.stroke();

                lastGraphicInfo = { x, y }
            }
        }
        //renderGraphic(game.state.musicInfo.accuracyMedia, 'rgba(0, 255, 0, 0.5)')
        renderGraphic(game.state.musicInfo.linearAccuracyMedia, 'cyan')
        renderGraphic(game.state.musicInfo.accuracyMediaLow, 'green', 'red')
    }
}