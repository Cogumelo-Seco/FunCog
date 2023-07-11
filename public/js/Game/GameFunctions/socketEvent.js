export default function codesFunction(state, stateListener, socket) {
    setInterval(() => socket.emit('ping', +new Date()), 1000)
    socket.on('ping', (time) => state.ping = +new Date()-time || '???')
    state.myConfig.logged = true

    if (state.myConfig.logged) socket.on('listServers', (listServers) => {
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
        if (state.myConfig.logged) {
            state.messages = command || []
            require('./RenderChat').default(document.getElementById('gameCanvas'), state, stateListener, 'historyMessage')
        }
    })

    socket.on('message', (command) => {
        if (state.myConfig.logged) {
            state.messages.unshift(command)
            require('./RenderChat').default(document.getElementById('gameCanvas'), state, stateListener, 'newMessage')
        }
    })

    socket.on('deleteMessage', (messageID) => {
        const messageIndex = state.messages.findIndex(m => m.messageID == messageID)
        const deletedMessage = state.messages.find(m => m.messageID == messageID)
        if (!isNaN(Number(messageIndex)) && deletedMessage) {
            let messageElementContent = document.getElementById(messageID+'-Content')
            let messageElementHeader = document.getElementById(messageID+'-Header')
            if (messageElementContent) messageElementContent.remove()
            if (messageElementHeader) messageElementHeader.remove()

            let arrCopy = Array.from(state.messages);
            arrCopy.splice(messageIndex, 1);
            state.messages = arrCopy

            if (messageElementHeader.style.display == 'block') for (let i = messageIndex-1;i < state.messages.length;i++) {
                let message = state.messages[i]

                if (message?.author.id == deletedMessage?.author.id) {
                    let messageElementHeader = document.getElementById(message.messageID+'-Header')
                    messageElementHeader.style.display = 'block'
                    break
                }
            }
        }
    })
}