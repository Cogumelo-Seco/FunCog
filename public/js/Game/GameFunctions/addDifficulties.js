module.exports = async (state) => {
    state.difficulties = [
        {
            name: 'Easy',
            color: 'rgb(1, 255, 1)'
        },
        {
            name: 'Normal',
            color: 'rgb(255, 255, 10)'
        },
        {
            name: 'Hard',
            color: 'rgb(254, 7, 7)'
        },
    ]
    
    return state.difficulties
}