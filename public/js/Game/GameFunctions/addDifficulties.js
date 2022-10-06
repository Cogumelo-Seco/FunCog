export default async (state) => {
    state.difficulties = [
        {// 0
            name: 'Easy',
            fileNameDifficulty: 'easy',
            color: 'rgb(1, 255, 1)',
            lifeDrain: 0.1
        },
        {// 1
            name: 'Normal',
            fileNameDifficulty: '',
            color: 'rgb(255, 255, 10)',
            lifeDrain: 0.5
        },
        {// 2
            name: 'Hard',
            fileNameDifficulty: 'hard',
            color: 'rgb(254, 7, 7)',
            lifeDrain: 1
        },
        {// 3
            name: 'Mania',
            fileNameDifficulty: 'hard',
            color: 'rgb(255, 43, 234)',
            lifeDrain: 1
        },
        {// 4
            name: 'Alt',
            fileNameDifficulty: 'alt',
            color: 'rgb(232, 105, 236)',
            lifeDrain: 1.5
        },
        {// 5
            name: 'Harder',
            fileNameDifficulty: 'harder',
            color: 'rgb(255, 0, 0)',
            lifeDrain: 1.5
        }
    ]
    
    return state.difficulties
}