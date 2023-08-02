export default (time, state) => {
    time = Number.parseInt(Math.abs(time))

    let ratings = [
        {
            name: 'shit',
            media: 40
        },
        {
            name: 'bad',
            media: 65
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

    if (time >= 120) rating = ratings[0]
    else if (time <= 120 && time >= 90) rating = ratings[1]
    else if (time <= 90 && time >= 65) rating = ratings[2]
    else rating = ratings[3]
    
    state.musicInfo.rating = rating
    return rating
}