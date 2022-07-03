module.exports = async (state) => {
    state.difficulties = [
        {
            name: 'Easy',
            fileNameDifficulty: 'easy',
            color: 'rgb(1, 255, 1)'
        },
        {
            name: 'Normal',
            fileNameDifficulty: '',
            color: 'rgb(255, 255, 10)'
        },
        {
            name: 'Hard',
            fileNameDifficulty: 'hard',
            color: 'rgb(254, 7, 7)'
        },
        {
            name: 'Mania',
            fileNameDifficulty: 'hard',
            color: 'rgb(255, 43, 234)'
        },
        {
            name: 'Alt',
            fileNameDifficulty: 'alt',
            color: 'rgb(232, 105, 236)'
        }
    ]
    
    return state.difficulties
}