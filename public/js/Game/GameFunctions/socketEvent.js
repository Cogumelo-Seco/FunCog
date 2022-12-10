export default function codesFunction(state, socket) {
    setInterval(() => socket.emit('ping', +new Date()), 1000)
    socket.on('ping', (time) => state.ping = +new Date()-time || '???')

    socket.on('listServers', (listServers) => {
        state.selectServerOption.listServers = listServers
        let server = listServers.find(s => s.id == state.serverId)
        if (server) state.serverInfo = server
        if (server && server.playerData2) {
            state.waiting = false
            state.musicInfoOpponent = state.musicInfo.playerId == 1 ? server.playerData2 : server.playerData1
        }
    })

    socket.on('messageHistory', (command) => {
        state.messages = command || []
    })

    socket.on('message', (command) => {
        state.messages.push(command)
    })
}