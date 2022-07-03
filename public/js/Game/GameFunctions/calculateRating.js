module.exports = (time, state) => {
    time = Number.parseInt(Math.abs(time))

    let ratings = [
        {
            name: 'shit',
            media: 50
        },
        {
            name: 'bad',
            media: 75
        },
        {
            name: 'good',
            media: 90
        },
        {
            name: 'sick',
            media: 100
        }
    ]

    let rating = null

    if (time >= 170) rating = ratings[0]
    else if (time <= 170 && time >= 100) rating = ratings[1]
    else if (time <= 100 && time >= 50) rating = ratings[2]
    else rating = ratings[3]

    state.musicInfo.rating = rating
    return rating
}