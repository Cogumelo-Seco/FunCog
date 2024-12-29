export default async (state) => {
    state.difficulties = [
        {
            id: 0,
            name: 'Easy',
            fileNameDifficulty: 'easy',
            color: 'rgb(1, 255, 1)',
            lifeDrain: 0.2,
            xp: 100,
        },
        {
            id: 1,
            name: 'Normal',
            fileNameDifficulty: '',
            color: 'rgb(255, 255, 10)',
            lifeDrain: 0.4,
            xp: 200,
        },
        {
            id: 2,
            name: 'Hard',
            fileNameDifficulty: 'hard',
            color: 'rgb(254, 7, 7)',
            lifeDrain: 1,
            xp: 350,
        },
        {
            id: 3,
            name: 'BABY 👶',
            fileNameDifficulty: 'hard',
            color: '#4287f5',
            lifeDrain: 1,
            xp: 200,
        },
        {
            id: 4,
            name: 'Alt',
            fileNameDifficulty: 'alt',
            color: 'rgb(232, 105, 236)',
            lifeDrain: 1.3,
            xp: 400,
        },
        {
            id: 5,
            name: 'Harder',
            fileNameDifficulty: 'harder',
            color: 'rgb(255, 0, 0)',
            lifeDrain: 1.3,
            xp: 500,
        },
        {
            id: 6,
            name: 'God',
            fileNameDifficulty: 'god',
            color: '#ffff00',
            lifeDrain: 1.3,
            xp: 600,
        },
        {
            id: 7,
            name: 'Mania',
            fileNameDifficulty: 'mania',
            color: 'rgb(255, 43, 234)',
            lifeDrain: 1,
            xp: 200,
        },
        {
            id: 8,
            name: 'Hard+',
            fileNameDifficulty: 'hard',
            color: 'rgb(254, 7, 7)',
            lifeDrain: 1,
            xp: 450,
        },
        {
            id: 9,
            name: 'Lunatic',
            fileNameDifficulty: 'lunatic',
            color: '#8100e8',
            lifeDrain: 1.3,
            xp: 400,
        },
        {
            id: 10,
            name: 'Holy',
            fileNameDifficulty: 'holy',
            color: '#FFFFFF',
            lifeDrain: 1.3,
            xp: 400,
        },
    ]
    
    return state.difficulties
}