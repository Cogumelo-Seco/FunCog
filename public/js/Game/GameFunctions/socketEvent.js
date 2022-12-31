export default function codesFunction(state, stateListener, socket) {
    setInterval(() => socket.emit('ping', +new Date()), 1000)
    socket.on('ping', (time) => state.ping = +new Date()-time || '???')

    socket.on('listServers', (listServers) => {
        state.selectServerOption.listServers = listServers
        let server = listServers.find(s => s.id == state.serverId)
        if (server) state.serverInfo = server
        if (server && server.playerData2) {
            state.waiting = false
            state.musicInfoOpponent = state.musicInfo.playerId == 1 ? server.playerData2 : server.playerData1
            /*for (let i in state.musicInfoOpponent.rating) {
                state.musicInfoOpponent.rating[i].time += 500
                /*let rating = state.musicInfoOpponent.rating[i]
                if (!state.opponentRatingLoaded[rating.time]) {
                    state.opponentRatingLoaded[rating.time] = true
                    rating.time = +new Date()
                }
            }*/
        }
    })

    socket.on('connect', () => {
        socket.emit('playerConnected', state.myConfig)
    })

    socket.on('messageHistory', (command) => {
        state.messages = command || []
        require('./RenderChat').default(document.getElementById('gameCanvas'), state, stateListener, 'historyMessage')
    })

    socket.on('message', (command) => {
        state.messages.unshift(command)
        require('./RenderChat').default(document.getElementById('gameCanvas'), state, stateListener, 'newMessage')
        //require('../GameFunctions/RenderChat').default(canvas, state)
    })
}