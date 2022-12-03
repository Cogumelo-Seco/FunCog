export default async (state) => {
    state.selectSettingsOption.settingsOptions = [
        {
            name: 'KeyBind',
            type: 'ConfigTitle'
        },
        {
            name: 'Arrow Left',
            id: 'Arrow-0',
            type: 'KeyBind',
            content: 'KeyD'
        },
        {
            name: 'Arrow Down',
            id: 'Arrow-1',
            type: 'KeyBind',
            content: 'KeyF'
        },
        {
            name: 'Arrow Up',
            id: 'Arrow-2',
            type: 'KeyBind',
            content: 'KeyJ'
        },
        {
            name: 'Arrow Right',
            id: 'Arrow-3',
            type: 'KeyBind',
            content: 'KeyK'
        },
        {
            name: 'Gameplay',
            type: 'ConfigTitle'
        },
        {
            name: 'Bongo Cat',
            id: 'botPlay',
            type: 'Boolean',
            content: false
        },
        {
            name: 'Down Scroll',
            id: 'DownScroll',
            type: 'Boolean',
            content: true
        },
        {
            name: 'Middle Scroll',
            id: 'MiddleScroll',
            type: 'Boolean',
            content: true
        },
        {
            name: 'Space Between Arrows',
            id: 'SpaceBetweenArrows',
            type: 'Boolean',
            type: 'Number',
            add: 1,
            max: 30,
            min: 0,
            content: 10
        },
        {
            name: 'Ghost Tapping',
            id: 'GhostTapping',
            type: 'Boolean',
            content: true
        },
        {
            name: 'Life Drain',
            id: 'LifeDrain',
            type: 'Boolean',
            content: true
        },
        {
            name: 'Scroll Speed',
            id: 'ScrollSpeed',
            type: 'Number',
            add: 0.1,
            max: 2,
            min: 0.1,
            content: 1
        },
        {
            name: 'Splashes',
            id: 'Splashes',
            type: 'Boolean',
            content: true
        },
        {
            name: 'Jumpscare',
            id: 'Jumpscare',
            type: 'Boolean',
            content: true
        },
        {
            name: 'Show Opponent Notes',
            id: 'OpponentNotes',
            type: 'Boolean',
            content: true
        },
        {
            name: 'Show Background',
            id: 'ShowBackground',
            type: 'Boolean',
            content: true
        },
        {
            name: 'Game',
            type: 'ConfigTitle'
        },
        {
            name: 'Game Info',
            id: 'GameInfo',
            type: 'Boolean',
            content: true
        },
        {
            name: 'Higher FPS in menus',
            id: 'menuFPSUnlimit',
            type: 'Boolean',
            content: true
        },
    ]
    
    return state.selectSettingsOption.settingsOptions
}