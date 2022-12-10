export default async (canvas, game, Listener) => {
    const chatContent = document.getElementById('chat-content')
    const chatButton = document.getElementById('chat-button')
    const unreadMessageCounter = document.getElementById('unreadMessageCounter')
    const chat = document.getElementById('chat')

    let messages = game.state.messages
    let unreadMessages = 0

    chatContent.innerHTML = ''
    for (let message of messages)  {
        if (message.unread) {
            if (chat.style.display == 'block') {
                message.unread = false
            } else unreadMessages += 1
        }

        chatContent.innerHTML += `
            <p id="Name" style="color: ${message.colorName?.includes('RAINBOW') ? `hsl(${game.state.rainbowColor+(Number(message.colorName.split('-')[1]) || 0)}, 100%, 50%)` : message.colorName || 'rgb(0, 229, 255)'} ${message.nameAdditionalCSS ? ';'+message.nameAdditionalCSS : ''}">${message.author.name} ${message.emoji || ''}</p>
            <p id="Message" style="color: ${message.colorContent?.includes('RAINBOW') ? `hsl(${game.state.rainbowColor+(Number(message.colorContent.split('-')[1]) || 0)}, 100%, 50%)` : message.colorContent || 'white'} ${message.messageAdditionalCSS ? ';'+message.messageAdditionalCSS : ''}">${message.content}</p>
        `
    }

    unreadMessages = unreadMessages > 999 ? '999+' : unreadMessages

    if (unreadMessages > 0 || typeof(unreadMessages) == 'string') {
        unreadMessageCounter.style.display = 'flex'
        unreadMessageCounter.innerText = unreadMessages
        chatButton.style.background = 'rgba(0, 0, 0, 0.658) url(/imgs/chat/unreadChat.png) no-repeat center 0px / 100%'
    } else {
        unreadMessageCounter.style.display = 'none'
        chatButton.style.background = 'rgba(0, 0, 0, 0.658) url(/imgs/chat/chat.png) no-repeat center 0px / 100%'
    }
}