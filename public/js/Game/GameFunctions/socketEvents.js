export default function codesFunction(state, stateListener) {
    let loop = () => {
        //if (state.socket.id) {
            setTimeout(loop, 1000/2)
            state.socket.emit('ping', +new Date())
        //} else state.ping = '???'
    }
    loop()

    state.socket.on('ping', (time) => state.ping = +new Date()-time || '???')

    state.socket.on('listServers', (listServers) => {
        state.selectServerOption.listServers = listServers
        /*let server = listServers.find(s => s.serverID == state.serverID)
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
            }
        }*/
    })

    state.socket.on('messageHistory', (command) => {
        state.messages = []
        state.messages = command || []
        require('./RenderChat').default(document.getElementById('gameCanvas'), state, stateListener, 'historyMessage')
    })

    state.socket.on('message', (command) => {
        state.messages.unshift(command)
        require('./RenderChat').default(document.getElementById('gameCanvas'), state, stateListener, 'newMessage')
    })

    state.socket.on('deleteMessage', (command) => {
        const messageIndex = state.messages.findIndex(m => m.messageID == command.messageID && (m.author?.playerID == command.playerData.author.playerID || command.playerData.emoji == '👑'))
        const deletedMessage = state.messages.find(m => m.messageID == command.messageID && (m.author?.playerID == command.playerData.author.playerID || command.playerData.emoji == '👑'))
        if (!isNaN(Number(messageIndex)) && deletedMessage) {
            let messageElementContent = document.getElementById(command.messageID+'-Content')
            let messageElementHeader = document.getElementById(command.messageID+'-Header')
            if (messageElementContent) messageElementContent.remove()
            if (messageElementHeader) messageElementHeader.remove()

            let arrCopy = Array.from(state.messages);
            arrCopy.splice(messageIndex, 1);
            state.messages = arrCopy

            if (messageElementHeader.style.display == 'block') for (let i = messageIndex-1;i < state.messages.length;i++) {
                let message = state.messages[i]

                if (message?.author.playerID == deletedMessage?.author.playerID) {
                    let messageElementHeader = document.getElementById(message.messageID+'-Header')
                    messageElementHeader.style.display = 'block'
                    break
                }
            }
        }
    })

    state.socket.on('error', (err) => alert(err))
}