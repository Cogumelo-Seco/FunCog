export default async (canvas, state, command) => {
    const chatContent = document.getElementById('chat-content')
    const chatButton = document.getElementById('chat-button')
    const unreadMessageCounter = document.getElementById('unreadMessageCounter')
    const chat = document.getElementById('chat')

    state.messages = state.messages.slice(0, 1000)
    let messages = state.messages
    let unreadMessages = 0

    let autoScroll = true
    for (let i in messages)  {
        let message = messages[messages.length-1-i]
        let lastMessage = messages[messages.length-i] || null
        if (message.unread) {
            if (chat.style.display == 'block') {
                if (command == 'newMessage' && chatContent.scrollTop < chatContent.scrollHeight-500) autoScroll = false

                if (lastMessage && lastMessage.author.id != message.author.id || !lastMessage) {
                    let headerElement = document.createElement('p')
                    headerElement.id = 'Header'
                    headerElement.style = `color: ${message.colorName?.includes('RAINBOW') ? `hsl(${state.rainbowColor+message.timestamp}, 100%, 50%)` : message.colorName || 'rgb(0, 229, 255)'} ${message.nameAdditionalCSS ? ';'+message.nameAdditionalCSS : ''}`
                    headerElement.innerText = `${message.author.name} ${message.emoji || '' } `

                    let timestampElement = document.createElement('span')
                    timestampElement.id = 'Timestamp'
                    timestampElement.innerText = `${new Date(message.timestamp).toLocaleDateString()} - ${new Date(message.timestamp).toLocaleTimeString()}`

                    headerElement.appendChild(timestampElement)
                    chatContent.appendChild(headerElement)
                }

                let contentElement = document.createElement('p')
                contentElement.id = 'Content'
                contentElement.style = `color: ${message.colorContent?.includes('RAINBOW') ? `hsl(${state.rainbowColor+message.timestamp}, 100%, 50%)` : message.colorContent || 'white'} ${message.messageAdditionalCSS ? ';'+message.messageAdditionalCSS : ''}`
                contentElement.innerText = message.content
                chatContent.appendChild(contentElement)

                if (autoScroll) chatContent.scrollTop = chatContent.scrollHeight
                message.unread = false
            } else unreadMessages += 1
        }
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