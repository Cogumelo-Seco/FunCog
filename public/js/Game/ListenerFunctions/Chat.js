export default function chat(state, socket) {
    document.getElementById('chat-button').addEventListener('click', openCloseChat);
    
    const chatContent = document.getElementById('chat-content')

    const messageBox = document.getElementById('message-box')
    const chat = document.getElementById('chat')   
    const gameCanvas = document.getElementById('gameCanvas')
    
    function focusin(event) {
        chat.style.backgroundColor = 'rgba(0, 0, 0, 0.8)'
        chat.style.borderColor = 'rgb(50, 50, 50)'
        messageBox.style.backgroundColor = 'rgba(80, 80, 80, 1)'

        state.onChat = 'on'
    }

    function focusout(event) {
        if (!document.activeElement || document.activeElement.id != 'message-box') {
            chat.style.backgroundColor = 'rgba(0, 0, 0, 0.2)'
            chat.style.borderColor = 'transparent'
            messageBox.style.backgroundColor = 'rgba(80, 80, 80, 0.4)'
            state.onChat = 'off'
        }
    }

    gameCanvas.addEventListener('mouseover', focusout)
    gameCanvas.addEventListener('mouseout', focusin)

    function openCloseChat() {
        if (chat.style.display == 'none' || chat.style.display == '') {
            focusin()
            chat.style.display = 'block'
            messageBox.focus()
            setTimeout(() => messageBox.value = '', 50)
        } else {
            focusout()
            gameCanvas.focus()
            state.onChat = 'off'
            chat.style.display = 'none'
        }
        
        chatContent.scrollTop = chatContent.scrollHeight
        require('../RenderGame/RenderChat').default(document.getElementById('gameCanvas'), state.game.state)
    }

    function send() {
        let content = messageBox.value
        if (!content || !socket.connected) return;

        socket.emit('message', {
            author: {
                name: state.game.state.myMessageConfig.author.name || socket.id.slice(0, 20),
                avatar: state.game.state.myMessageConfig.author.avatar || null,
                id: socket.id
            },
            colorName: state.game.state.myMessageConfig.colorName || null,
            colorContent: state.game.state.myMessageConfig.colorContent || null,
            emoji: state.game.state.myMessageConfig.emoji || null,
            loadTo: 'all',
            content,
        })
        messageBox.value = ''
        chatContent.scrollTop = chatContent.scrollHeight
    }

    function keyPressed(keyPressed) {
        // Enviar mensagem com enter
        if (document.activeElement.id == 'message-box' && keyPressed == 'Enter' && messageBox.value.trim()) send()

        // Abrir chat com click no teclado
        if (document.activeElement.id != 'message-box' && (keyPressed == 'NumpadDivide' || keyPressed == 'KeyT')) openCloseChat()

        // Fechar chat aberto com ESC
        if(document.activeElement.id == 'message-box' && keyPressed == 'Escape') openCloseChat()
    }

    return {
        keyPressed,
        openCloseChat,
        send
    }
}