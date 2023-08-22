export default async (state) => {
    state.difficulties = [
        {
            id: 0,
            name: 'Easy',
            fileNameDifficulty: 'easy',
            color: 'rgb(1, 255, 1)',
            lifeDrain: 0.1
        },
        {
            id: 1,
            name: 'Normal',
            fileNameDifficulty: '',
            color: 'rgb(255, 255, 10)',
            lifeDrain: 0.3
        },
        {
            id: 2,
            name: 'Hard',
            fileNameDifficulty: 'hard',
            color: 'rgb(254, 7, 7)',
            lifeDrain: 0.8
        },
        {
            id: 3,
            name: 'BABY',
            fileNameDifficulty: 'hard',
            color: '#4287f5',
            lifeDrain: 0.8
        },
        {
            id: 4,
            name: 'Alt',
            fileNameDifficulty: 'alt',
            color: 'rgb(232, 105, 236)',
            lifeDrain: 1.1
        },
        {
            id: 5,
            name: 'Harder',
            fileNameDifficulty: 'harder',
            color: 'rgb(255, 0, 0)',
            lifeDrain: 1.1
        },
        {
            id: 6,
            name: 'God',
            fileNameDifficulty: 'god',
            color: '#ffff00',
            lifeDrain: 1.1
        },
        {
            id: 7,
            name: 'Mania',
            fileNameDifficulty: 'mania',
            color: 'rgb(255, 43, 234)',
            lifeDrain: 1
        },
        {
            id: 8,
            name: 'Hard+',
            fileNameDifficulty: 'hard',
            color: 'rgb(254, 7, 7)',
            lifeDrain: 0.8
        },
        {
            id: 9,
            name: 'Lunatic',
            fileNameDifficulty: 'lunatic',
            color: '#8100e8',
            lifeDrain: 1.1
        },
        {
            id: 10,
            name: 'Holy',
            fileNameDifficulty: 'holy',
            color: '#FFFFFF',
            lifeDrain: 1.1
        },
    ]
    
    return state.difficulties
}