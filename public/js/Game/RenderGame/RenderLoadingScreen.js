export default async (ctx, canvas, game, Listener, functions) => {
    let loadinPercent = (game.state.loading.loaded)/game.state.loading.total || 0
    let alpha = game.state.animations.loadingLogo.frame/(game.state.animations.loadingLogo.endFrame-game.state.animations.loadingLogo.endFrame*0.25)
    alpha = alpha >= 1 ? 1 : alpha <= 0 ? 0 : alpha

    ctx.globalAlpha = 1-alpha
    ctx.lineWidth = 15;

    ctx.beginPath();    
    ctx.arc(canvas.width/2, canvas.height/2, 80, 0, Math.PI*2);    
    ctx.strokeStyle = 'rgb(20, 20, 20)';
    ctx.stroke();

    ctx.beginPath();
    //ctx.arc(canvas.width/2, canvas.height/2, 80, -(Math.PI)*loadinPercent, Math.PI*loadinPercent)
    ctx.arc(canvas.width/2, canvas.height/2, 80, -(Math.PI/2), Math.PI*2*loadinPercent-(Math.PI/2), false)
    ctx.strokeStyle = `hsl(${300-loadinPercent*360}, 100%, 40%)`
    ctx.stroke();

    ctx.font = `bold 15px Arial`

    ctx.fillStyle = 'rgb(255, 255, 255)'
    ctx.fillText(`${(loadinPercent*100).toFixed(0)}%`, canvas.width/2-(ctx.measureText(`${(loadinPercent*100).toFixed(0)}%`).width/2), canvas.height/2+7.5);

    ctx.font = `bold 10px Arial`
    ctx.fillStyle = game.state.loading.msg.includes('ERROR') ? 'rgba(255, 0, 0, 0.4)' : 'rgba(255, 255, 255, 0.1)'
    ctx.fillText(game.state.loading.msg, 5, canvas.height-5);

    let logoImage = game.state.images['imgs/logo.png']?.image
    let size = 180*((alpha/8)+1)

    ctx.globalAlpha = alpha
    if (logoImage) ctx.drawImage(logoImage, canvas.width/2-(size/2), canvas.height/2-(size/2), size, size)

    ctx.globalAlpha = 1
}