export default async (canvas, game, Listener) => {
    const ctx = canvas.getContext('2d')

    let imageData = game.state.images['Arrows/Arrows.png']

    if (imageData) {
        //game.state.testframe = (game.state.testframe || 0)+1
        //if (imageData.animationConfig.frames.length <= game.state.testframe) game.state.testframe = 0
        let frame = Listener.state.arrows['0']?.state == 'noNote' ? imageData.animationConfig.frames.filter((f) => f.name.split('-')[1] == '0' && f.name.includes('press') && f.name.includes('no'))[0] : imageData.animationConfig.frames.filter((f) => f.name.split('-')[1] == '0')[0]

        ctx.drawImage(imageData.image, frame.x, frame.y, frame.width, frame.height, 0, 0, frame.width, frame.height)//Arrow-1-press-0-no
    }
}