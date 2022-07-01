module.exports = async (state) => {
    state.musics = [
        {
            name: 'Tutorial',
            menuColor: null,
            difficulties: [ 0, 1, 2 ],
            maxDifficulty: 2,
            minDifficulty: 0
        },
        {
            name: 'Bopeebo',
            menuColor: null,
            difficulties: [ 0, 1, 2 ],
            maxDifficulty: 2,
            minDifficulty: 0
        },
        {
            name: 'Dadbattle',
            menuColor: null,
            difficulties: [ 0, 1, 2 ],
            maxDifficulty: 2,
            minDifficulty: 0
        },
        {
            name: 'Milf',
            menuColor: null,
            difficulties: [ 0, 1, 2 ],
            maxDifficulty: 2,
            minDifficulty: 0
        },
        {
            name: 'Improbable-outset',
            menuColor: 'green',
            difficulties: [ 0, 1, 2 ],
            maxDifficulty: 2,
            minDifficulty: 0
        },
        {
            name: 'Madness',
            menuColor: 'green',
            difficulties: [ 0, 1, 2 ],
            maxDifficulty: 2,
            minDifficulty: 0
        },
        {
            name: 'Hellclown',
            menuColor: 'green',
            difficulties: [ 0, 1, 2 ],
            maxDifficulty: 2,
            minDifficulty: 0
        },
        {
            name: 'Expurgation',
            menuColor: 'red',
            difficulties: [ 2 ],
            maxDifficulty: 2,
            minDifficulty: 2
        }
    ]
    
    return state.musics.length
}