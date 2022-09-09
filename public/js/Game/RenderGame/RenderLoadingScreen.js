export default async (canvas, game, Listener) => {
    const ctx = canvas.getContext('2d')
    
    let loadingBarWidth = canvas.width*0.5
    let loadingBarHeight = 20

    let loadinPercent = game.state.loading.loaded/game.state.loading.total || 0

    ctx.font = `bold 15px Arial`
    ctx.fillStyle = 'rgb(255, 255, 255)'
    ctx.fillText('LOADING', canvas.width/2-(ctx.measureText('LOADING').width/2), canvas.height/2-loadingBarHeight);

    ctx.fillStyle = 'rgb(100, 100, 100)'
    ctx.fillRect(canvas.width/2-loadingBarWidth/2, canvas.height/2-(loadingBarHeight/2), loadingBarWidth, loadingBarHeight)

    ctx.fillStyle = `hsl(${loadinPercent*360}, 100%, 40%)`//'rgb(19, 189, 0)'
    ctx.fillRect(canvas.width/2-loadingBarWidth/2, canvas.height/2-(loadingBarHeight/2), loadingBarWidth*loadinPercent, loadingBarHeight)

    ctx.fillStyle = 'rgb(255, 255, 255)'
    ctx.fillText(`${Number.parseInt(loadinPercent*100)}%`, canvas.width/2-(ctx.measureText(`${Number.parseInt(loadinPercent*100)}%`).width/2), canvas.height/2-(loadingBarHeight/2)+15);

    ctx.lineWidth = 2.5
    ctx.strokeStyle = 'black'
    ctx.strokeRect(canvas.width/2-loadingBarWidth/2, canvas.height/2-(loadingBarHeight/2), loadingBarWidth, loadingBarHeight)

    ctx.fillStyle = game.state.loading.msg.includes('ERROR:') ? 'rgba(255, 0, 0, 0.5)' : 'rgba(255, 255, 255, 0.2)'
    //ctx.fillText(game.state.loading.msg, canvas.width-ctx.measureText(game.state.loading.msg).width-10, canvas.height-10);
    ctx.fillText(game.state.loading.msg, 5, canvas.height-10);
}