export default async (canvas, game, Listener, functions) => {
    const ctx = canvas.getContext('2d')

    ctx.fillStyle = 'rgb(255, 255, 255)'
    ctx.font = `bold ${(canvas.width+canvas.height)*0.04}px Arial`
    ctx.fillText('You Won', canvas.width/2-(ctx.measureText('You Won').width/2), 80);

    let musicInfoPopupWidth = canvas.width/4
    let musicInfoPopupHeight = musicInfoPopupWidth//canvas.height-(120/1.5*2)
    let musicInfoPopupX = canvas.width/12
    let musicInfoPopupY = 120+((canvas.height-120)/2-(musicInfoPopupHeight/2))

    ctx.font = `bold ${musicInfoPopupWidth*0.1}px Arial`
    ctx.fillStyle = 'rgb(50, 150, 40)'
    if (game.state.online) ctx.fillText('Your Results', musicInfoPopupX+(musicInfoPopupWidth/2)-(ctx.measureText('Your Results').width/2), musicInfoPopupY-5);
    ctx.fillStyle = 'rgb(130, 200, 120)'
    ctx.fillRect(musicInfoPopupX, musicInfoPopupY, musicInfoPopupWidth, musicInfoPopupHeight)

    let msgArr = [
        {
            msg: 'Stats',
            type: 'title'
        },
        {
            msg: 'Score',
            msg2: (game.state.musicInfo.score || 0),
            type: 'stats'
        },
        {
            msg: 'Misses',
            msg2: (game.state.musicInfo.misses || 0),
            type: 'stats'
        },
        {
            msg: 'Best Combo',
            msg2: (game.state.musicInfo.bestCombo || 0),
            type: 'stats'
        },
        {
            msg: 'Accuracy',
            msg2: (game.state.musicInfo.accuracy || 0),
            type: 'stats'
        },
        {
            msg: 'Judgements',
            type: 'title'
        },
        {
            msg: 'shit',
            msg2: 'good',
            type: 'judgements'
        },
        {
            msg: 'sick',
            msg2: 'sick',
            type: 'judgements'
        },
    ]

    let resizeMsg = 0.07
    let msgY = musicInfoPopupY+(musicInfoPopupWidth*resizeMsg*1.5)//-((msgArr.length-1)*(musicInfoPopupWidth*resizeMsg)/2)
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

    let accuracyMedia = game.state.musicInfo.accuracyMedia//[100,100,90,90,0,0,100,90,0,90,0,100]

    let graphicWidth = canvas.width/4
    let graphicHeight = graphicWidth/2
    let graphicX = canvas.width-(canvas.width/12)-graphicWidth
    let graphicY = 120+((canvas.height-120)/2-(musicInfoPopupHeight/2))
    

    ctx.strokeStyle = 'rgb(200, 200, 200)'
    ctx.lineWidth = 8
    ctx.rect(graphicX, graphicY, graphicWidth, graphicHeight)
    ctx.stroke()
    //ctx.fillStyle = 'rgb(100, 100, 100)'
    //ctx.fillRect(graphicX, graphicY, graphicWidth, graphicHeight)

    graphicX += 10
    graphicY += 10
    graphicHeight -= 20
    graphicWidth -= 20

    ctx.lineWidth = 4
    let lastGraphicPos = { x: graphicX,  y: graphicY }
    for (let i in accuracyMedia) {
        ctx.strokeStyle = accuracyMedia[i] <= 50 ? 'red' : 'green'

        let x = graphicX+(graphicWidth*(i/(accuracyMedia.length-1)))-ctx.lineWidth
        let y = graphicY+(graphicHeight-graphicHeight*((accuracyMedia[i] || 1)/100))

        ctx.beginPath();
        ctx.moveTo(lastGraphicPos.x, lastGraphicPos.y);
        ctx.lineTo(x, y);
        ctx.stroke();

        lastGraphicPos = { x, y }
        
        //ctx.fillRect(graphicX+(graphicWidth*(i/(accuracyMedia.length-1))), graphicY+(graphicHeight-graphicHeight*((accuracyMedia[i] || 1)/100)), 10, 10)
    }
    //graphic

}