export default async (canvas, game, Listener) => {
    const ctx = canvas.getContext('2d')

    /*ctx.fillStyle = 'rgb(255, 255, 255)'
    ctx.font = `bold ${(canvas.width+canvas.height)*0.04}px Arial`
    ctx.fillText('You Won', canvas.width/2-(ctx.measureText('You Won').width/2), 80);*/

    ctx.font = `bold ${(canvas.width+canvas.height)*0.03}px Arial`

    ctx.fillStyle = game.state.musicInfo.menuColor || 'white'
    ctx.fillText(game.state.musicInfo.name, canvas.width/2-((ctx.measureText(game.state.musicInfo.name).width+ctx.measureText(`(${game.state.musicInfo.difficulty.name})`).width)/2), 80);

    ctx.fillStyle = game.state.musicInfo.difficulty.color || 'white'
    ctx.fillText(`(${game.state.musicInfo.difficulty.name})`, 10+canvas.width/2+((ctx.measureText(game.state.musicInfo.name).width+ctx.measureText(`(${game.state.musicInfo.difficulty.name})`).width)/2-(ctx.measureText(`(${game.state.musicInfo.difficulty.name})`).width)), 80);

    let musicInfoPopupWidth = canvas.width/4
    let musicInfoPopupHeight = musicInfoPopupWidth
    let musicInfoPopupX = canvas.width/12
    let musicInfoPopupY = 120+((canvas.height-120)/2-(musicInfoPopupHeight/2))

    ctx.font = `bold ${musicInfoPopupWidth*0.1}px Arial`
    ctx.fillStyle = 'rgb(50, 150, 40)'
    if (game.state.online) ctx.fillText('Your Results', musicInfoPopupX+(musicInfoPopupWidth/2)-(ctx.measureText('Your Results').width/2), musicInfoPopupY-5);
    ctx.fillStyle = game.state.online ? 'rgb(130, 200, 120)' : 'rgb(200, 200, 200)'
    ctx.fillRect(musicInfoPopupX, musicInfoPopupY, musicInfoPopupWidth, musicInfoPopupHeight)

    let msgArr = [
        {
            msg: game.state.smallFunctions.getConfig('botPlay') ? 'Bongo Cat' : 'Stats',
            type: 'title'
        },
        {
            msg: 'Score:',
            msg2: (game.state.musicInfo.score || 0),
            type: 'stats'
        },
        {
            msg: 'Misses:',
            msg2: (game.state.musicInfo.misses || 0),
            type: 'stats'
        },
        {
            msg: 'Best Combo:',
            msg2: (game.state.musicInfo.bestCombo || 0)+(game.state.musicInfo.misses == 0 ? ' (FC)' : ''),
            type: 'stats'
        },
        {
            msg: 'Accuracy:',
            msg2: (game.state.musicInfo.accuracy?.toFixed(2)+'%' || '0%'),
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
                        let judgementScore = game.state.musicInfo.judgements[judgement] || 0
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

    let graphicWidth = canvas.width/4
    let graphicHeight = graphicWidth/2
    let graphicX = canvas.width-(canvas.width/12)-graphicWidth
    let graphicY = 120+((canvas.height-120)/2-(musicInfoPopupHeight/2))
    

    ctx.strokeStyle = 'rgb(200, 200, 200)'
    ctx.lineWidth = 5
    ctx.rect(graphicX, graphicY, graphicWidth, graphicHeight)
    ctx.stroke()

    graphicX += 10
    graphicY += 10
    graphicHeight -= 20
    graphicWidth -= 20

    function renderGraphic(graphicData, color) {
        ctx.lineWidth = 1
        let lastGraphicInfo = { x: graphicX,  y: graphicY }
        for (let i in graphicData) {
            ctx.strokeStyle = color

            let x = graphicX+(graphicWidth*(i/(graphicData.length-1)))-ctx.lineWidth
            let y = graphicY+(graphicHeight-graphicHeight*((graphicData[i] || 1)/100))

            ctx.beginPath();
            ctx.moveTo(lastGraphicInfo.x, lastGraphicInfo.y);
            ctx.lineTo(x, y);
            ctx.stroke();

            lastGraphicInfo = { x, y }
        }
    }
    
    renderGraphic(game.state.musicInfo.accuracyMedia, 'green')
    renderGraphic(game.state.musicInfo.linearAccuracyMedia, 'cyan')
}