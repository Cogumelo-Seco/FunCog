export default function chat(state, socket) {
    document.getElementById('chat-button').addEventListener('click', openCloseChat);
    
    const chatContent = document.getElementById('chat-content')

    const messageBoxContent = document.getElementById('message-box-content')
    const messageBox = document.getElementById('message-box')
    const chat = document.getElementById('chat')   
    const gameCanvas = document.getElementById('gameCanvas')
    
    function focusin(event) {
        //const messageBoxWritingPosition = document.getElementById('messageBoxWritingPosition')

        messageBoxContent.focus()
        chat.style.backgroundColor = 'rgba(60, 60, 60, 1)'//'rgba(0, 0, 0, 0.8)'
        chat.style.borderColor = 'rgb(50, 50, 50)'
        messageBox.style.backgroundColor = 'rgba(50, 50, 50, 1)'
        
        state.onChat = 'on'
    }

    function focusout(event) {
        messageBoxContent.blur()
        gameCanvas.focus()
        chat.style.backgroundColor = 'rgba(60, 60, 60, 0.2)'
        chat.style.borderColor = 'transparent'
        messageBox.style.backgroundColor = 'rgba(50, 50, 50, 0.4)'
        state.onChat = 'off'
    }

    gameCanvas.addEventListener('mouseover', focusout)
    gameCanvas.addEventListener('mouseout', focusin)

    function openCloseChat(event) {
        if (event.pointerType != 'mouse') return

        if (chat.style.display == 'none' || chat.style.display == '') {
            focusin()
            state.onChat = 'on'
            chat.style.display = 'block'
            state.messageContent = ''
            state.renderChat = true
        } else {
            focusout()
            state.onChat = 'off'
            chat.style.display = 'none'
        }
        
        chatContent.scrollTop = chatContent.scrollHeight
        require('../GameFunctions/RenderChat').default(document.getElementById('gameCanvas'), state.game.state, state)
    }

    function send() {
        let content = messageBoxContent.innerHTML
        
        if (content.split(' ')[0] == '/s') state.game.state.gameStage = content.split(' ')[1]
        else socket.emit('message', {
            author: {
                name: state.game.state.myConfig.author.name || socket.id.slice(0, 20),
                avatar: state.game.state.myConfig.author.avatar || null,
                id: socket.id
            },
            colorName: state.game.state.myConfig.colorName || null,
            colorContent: state.game.state.myConfig.colorContent || null,
            emoji: state.game.state.myConfig.emoji || null,
            loadTo: 'all',
            content,
        })

        messageBoxContent.innerHTML = ''
        setTimeout(() => messageBoxContent.innerHTML = '', 10)
    }

    function keyPressed(event) {
        if (state.pauseGameKeys) return;

        if (event.code == 'Escape' && state.onChat == 'on') return openCloseChat({ pointerType: 'mouse' })
        if (!event.key || state.onChat != 'on') return
        if (event.key == 'Enter' && !event.shiftKey) send()
    }

    return {
        keyPressed,
        //openCloseChat,
        //send
    }
}