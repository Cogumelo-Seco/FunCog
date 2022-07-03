module.exports = async (state) => {
    state.musics = [
        {
            name: 'Tutorial',
            menuColor: null,
            difficulties: [ 0, 1, 2 ],
            notesImageDir: 'Arrows/'
        },
        {
            name: 'Bopeebo',
            menuColor: null,
            difficulties: [ 0, 1, 2 ],
            notesImageDir: 'Arrows/'
        },
        {
            name: 'Dadbattle',
            menuColor: null,
            difficulties: [ 0, 1, 2 ],
            notesImageDir: 'Arrows/'
        },
        {
            name: 'Milf',
            menuColor: null,
            difficulties: [ 0, 1, 2 ],
            notesImageDir: 'Arrows/'
        },
        {
            name: 'Improbable-outset',
            menuColor: 'green',
            difficulties: [ 0, 1, 2 ],
            notesImageDir: 'Arrows/'
        },
        {
            name: 'Madness',
            menuColor: 'green',
            difficulties: [ 0, 1, 2 ],
            notesImageDir: 'Arrows/'
        },
        {
            name: 'Hellclown',
            menuColor: 'green',
            difficulties: [ 0, 1, 2, 3 ],
            notesImageDir: 'Arrows/'
        },
        {
            name: 'Expurgation',
            menuColor: 'red',
            difficulties: [ 2, 3 ],
            notesImageDir: 'Arrows/',
            backgroundImage: 'expurgation'
        },
        {
            name: 'Sarvente-Tutorial-Remix',
            menuColor: 'rgb(255, 43, 234)',
            difficulties: [ 0, 1, 2, 4 ],
            notesImageDir: 'Arrows/'
        },
        {
            name: 'Parish',
            menuColor: 'rgb(255, 43, 234)',
            difficulties: [ 0, 1, 2, 4 ],
            notesImageDir: 'Arrows/'
        },
        {
            name: 'Worship',
            menuColor: 'rgb(255, 43, 234)',
            difficulties: [ 0, 1, 2, 4 ],
            notesImageDir: 'Arrows/'
        },
        {
            name: 'Zavodila',
            menuColor: 'grey',
            difficulties: [ 0, 1, 2, 4 ],
            notesImageDir: 'Arrows/'
        },
        {
            name: 'Gospel',
            menuColor: 'rgb(255, 43, 234)',
            difficulties: [ 0, 1, 2, 4 ],
            notesImageDir: 'Arrows/sarvente/'
        },
        {
            name: 'Casanova',
            menuColor: 'rgb(255, 43, 234)',
            difficulties: [ 0, 1, 2, 4 ],
            notesImageDir: 'Arrows/'
        },
        {
            name: 'Unhappy',
            menuColor: 'rgb(50, 50, 50)',
            difficulties: [ 0, 1, 2 ],
            notesImageDir: 'Arrows/suicidemouse/'
        },
        {
            name: 'Happy',
            menuColor: 'rgb(50, 50, 50)',
            difficulties: [ 0, 1, 2, 3 ],
            notesImageDir: 'Arrows/suicidemouse/'
        },
        {
            name: 'Really-happy',
            menuColor: 'rgb(50, 50, 50)',
            difficulties: [ 0, 1, 2, 3 ],
            notesImageDir: 'Arrows/suicidemouse/'
        },
        {
            name: 'Smile',
            menuColor: 'rgb(50, 50, 50)',
            difficulties: [ 0, 1, 2 ],
            notesImageDir: 'Arrows/suicidemouse/'
        },
    ]
    
    return state.musics.length
}