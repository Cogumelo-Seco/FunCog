export default (state, handleKeys) => {
    state.buttons['MouseInfoButton'] = {
        minX: 0,
        maxX: 80,
        minY: 0,
        maxY: 30,
        pointer: true,
        over: false,
        onClick: () => {
            if (state.mouseInfo.mouseInfoType == 'percent') state.mouseInfo.mouseInfoType = 'integer'
            else state.mouseInfo.mouseInfoType = 'percent'
        }
    }
/*
    state.buttons['DebugButton'] = {
        minX: 0,
        maxX: 80,
        minY: 30,
        maxY: 50,
        pointer: true,
        over: false,
        onClick: () => {
            state.game.state.debug = state.game.state.debug ? false : true
        }
    }

    state.buttons['BotPlayButton'] = {
        minX: 0,
        maxX: 80,
        minY: 50,
        maxY: 74,
        pointer: true,
        over: false,
        onClick: () => {
            state.game.state.botPlay = state.game.state.botPlay ? false : true
        }
    }

    state.buttons['RenderTypeButton'] = {
        minX: 0,
        maxX: 80,
        minY: 74,
        maxY: 95,
        pointer: true,
        over: false,
        onClick: () => {
            state.game.state.renderType = state.game.state.renderType == 'limited' ? 'unlimited' : 'limited'
        }
    }
*/
    state.buttons['DevWaterMarkButton'] = {
        minX: 932,
        maxX: 1000,
        minY: 972,
        maxY: 1000,
        pointer: true,
        over: false,
        onClick: () => {
            open('https://www.instagram.com/wellingtonfelipe_cogu/')
        }
    }

    state.buttons['ReturnPageButton'] = {
        gameStage: [ 'selectMusic', 'onlineServerList', 'settings' ],
        keyPress: [ 'KeyQ', 'Escape' ],
        minX: 468,
        maxX: 530,
        minY: 9,
        maxY: 45,
        pointer: true,
        over: false,
        onClick: () => {
            state.game.state.smallFunctions.redirectGameStage(state.game.state.oldGameStage)
        }
    }
}