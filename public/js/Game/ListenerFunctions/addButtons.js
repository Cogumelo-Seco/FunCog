module.exports = (state) => {
    state.buttons['MouseInfoButton'] = {
        minX: 0,
        maxX: 80,
        minY: 0,
        maxY: 30,
        pointer: true,
        over: false,
        gameStage: [ 'selectMusic', 'loading', 'game', 'dead' ],
        onClick: () => {
            if (state.mouseInfo.mouseInfoType == 'percent') state.mouseInfo.mouseInfoType = 'integer'
            else state.mouseInfo.mouseInfoType = 'percent'
        }
    }

    state.buttons['DebugButton'] = {
        minX: 0,
        maxX: 80,
        minY: 30,
        maxY: 60,
        pointer: true,
        over: false,
        gameStage: [ 'selectMusic', 'loading', 'game', 'dead' ],
        onClick: () => {
            state.game.state.debug = state.game.state.debug ? false : true
        }
    }
}