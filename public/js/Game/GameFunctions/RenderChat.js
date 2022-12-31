export default async (canvas, state, stateListener, command) => {
    if ([ 'loading', 'login' ].includes(state.gameStage)) return

    const messageBox = document.getElementById('message-box')
    const messageBoxContent = document.getElementById('message-box-content')
    const chatContent = document.getElementById('chat-content')
    const chatButton = document.getElementById('chat-button')
    const unreadMessageCounter = document.getElementById('unreadMessageCounter')
    const chat = document.getElementById('chat')
    chatButton.style.display = 'block'

    if (command == 'gameLoop') {
        if (stateListener.writingPosition != stateListener.writingPositionOld || stateListener.renderChat) {
            let txtArr = []

            let previousTextLetters = (stateListener.messageContent.substring(0, stateListener.writingPosition)).split(/<@([\S\s]*?)>/g)
            for (let i in previousTextLetters) txtArr.push(previousTextLetters[i])

            txtArr.push('WRITINGPOSITION')

            let nextTextLetters = (stateListener.messageContent.substring(stateListener.writingPosition)).split(/<@([\S\s]*?)>/g)
            for (let i in nextTextLetters) txtArr.push(nextTextLetters[i])

            messageBoxContent.innerHTML = ''
            for (let i in txtArr) {
                let text = txtArr[i]
                
                if (text == 'WRITINGPOSITION') {
                    let element = document.createElement('span')

                    element.className = 'messageBoxText'
                    element.id = 'messageBoxWritingPosition'

                    messageBoxContent.appendChild(element)
                } else if (text[0] == '@' && text[text.length-1] == '@') {
                    let element = document.createElement('metion')
                    element.className = 'messageBoxText'

                    let player = state.serverPlayers[text.replace(/@/g, '')]
                    element.innerHTML = `@${player ? player.name : text.replace(/@/g, '')}`

                    messageBoxContent.appendChild(element)
                } else {
                    let element = document.createElement('span')
                    element.className = 'messageBoxText'
                    element.innerText = text

                    messageBoxContent.appendChild(element)
                }
                
            }

            messageBox.scrollLeft = stateListener.writingPosition/stateListener.messageContent.length*chatContent.scrollWidth
            stateListener.renderChat = false
            stateListener.writingPositionOld = stateListener.writingPosition
        }
        return
    }
    
    state.messages = state.messages.slice(0, 1000)
    let messages = state.messages
    let unreadMessages = 0

    let autoScroll = true
    for (let i in messages)  {
        let message = messages[messages.length-1-i]
        let lastMessage = messages[messages.length-i] || null

        if (message.loadTo == 'all' || message.loadTo == state.socket.id) {
            if (chat.style.display == 'block') {
                if (command == 'newMessage' && chatContent.scrollTop < chatContent.scrollHeight-500) autoScroll = false
                state.serverPlayers[message.author.id] = message.author

                if (lastMessage && (lastMessage.author.id != message.author.id || lastMessage.timestamp+120000 <= message.timestamp) || !lastMessage) {
                    let headerElement = document.createElement('p')
                    headerElement.id = 'Header'
                    headerElement.style = `color: ${message.colorName?.includes('RAINBOW') ? `hsl(${state.rainbowColor+message.timestamp+(Number(message.colorName.split('-')[1]) || 0)}, 100%, 50%)` : message.colorName || 'rgb(0, 229, 255)'} ${message.nameAdditionalCSS ? ';'+message.nameAdditionalCSS : ''}`

                    let nameElement = document.createElement('span')
                    nameElement.id = 'Name'
                    nameElement.innerText = `${message.author.name} ${message.emoji || '' } `

                    let avatarElement = document.createElement('img')
                    avatarElement.id = 'Avatar'
                    avatarElement.src = message.author.avatar || './imgs/sticker-sla.png'

                    let timestampElement = document.createElement('span')
                    timestampElement.id = 'Timestamp'
                    timestampElement.innerText = `${new Date(message.timestamp).toLocaleDateString()} - ${new Date(message.timestamp).toLocaleTimeString()}`

                    chatContent.appendChild(avatarElement)
                    headerElement.appendChild(nameElement)
                    headerElement.appendChild(timestampElement)
                    chatContent.appendChild(headerElement)

                    nameElement.addEventListener('click', () => {
                        if (message.author.id && !message.author.server) {
                            metionPlayer(message.author.id)
                        }
                    })
                }

                let contentArr = []
                let content = message.content.split(/<@([\S\s]*?)>/g)
                for (let i in content) contentArr.push(content[i])

                let contentElement = document.createElement('p')
                contentElement.id = 'Content'
                contentElement.style = `color: ${message.colorContent?.includes('RAINBOW') ? `hsl(${state.rainbowColor+message.timestamp+(Number(message.colorContent.split('-')[1]) || 0)}, 100%, 50%)` : message.colorContent || 'white'} ${message.messageAdditionalCSS ? ';'+message.messageAdditionalCSS : ''}`

                for (let i in contentArr) {
                    if (contentArr[i][0] == '@' && contentArr[i][contentArr[i].length-1] == '@') {
                        let metionElement = document.createElement('metion')
                        let player = state.serverPlayers[contentArr[i].replace(/@/g, '')]
                        metionElement.innerText = `@${player ? player.name : contentArr[i].replace(/@/g, '')}`

                        if (contentArr[i].replace(/@/g, '') == state.socket.id) contentElement.className += 'Mentioned'

                        metionElement.addEventListener('click', () => {
                            metionPlayer(contentArr[i].replace(/@/g, ''))
                        })

                        contentElement.appendChild(metionElement)
                    } else {
                        let textElement = document.createElement('span')
                        textElement.innerText = contentArr[i]
                        contentElement.appendChild(textElement)
                    }
                }

                chatContent.appendChild(contentElement)
                

                if (autoScroll) chatContent.scrollTop = chatContent.scrollHeight
                message.loadTo = 'none'
                message.unread = false
            } else if (message.unread) unreadMessages += 1
        }
    }

    function metionPlayer(id) {
        let metion = `<@@${id}@>`
        stateListener.messageContent = stateListener.messageContent.substring(0, stateListener.writingPosition)+ metion +stateListener.messageContent.substring(stateListener.writingPosition)
        stateListener.writingPosition += metion.length
        stateListener.renderChat = true
    }

    if (unreadMessages > 0 || typeof(unreadMessages) == 'string') {
        unreadMessageCounter.style.display = 'flex'
        unreadMessageCounter.innerText = unreadMessages
        chatButton.style.background = 'rgba(0, 0, 0, 0.658) url(/imgs/chat/unreadChat.png) no-repeat center 0px / 100%'
    } else {
        unreadMessageCounter.style.display = 'none'
        chatButton.style.background = 'rgba(0, 0, 0, 0.658) url(/imgs/chat/chat.png) no-repeat center 0px / 100%'
    }
}