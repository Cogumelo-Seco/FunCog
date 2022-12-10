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

        if (event?.type == 'mouseover') state.onChat = 'over'
        else state.onChat = 'on'
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
            chat.style.display = 'block'
            messageBox.focus()
            setTimeout(() => messageBox.value = '', 50)
        } else chat.style.display = 'none'

        focusin()
        chatContent.scrollTop = chatContent.scrollHeight
        require('../RenderGame/RenderChat').default(document.getElementById('gameCanvas'), state.game.state)
    }

    function send() {
        let content = messageBox.value
        if (!content) return;

        socket.emit('message', {
            author: {
                name: socket.id.slice(0, 20),
                id: socket.id
            },
            colorName: state.game.state.myMessageConfig.colorName,
            colorContent: state.game.state.myMessageConfig.colorContent,
            content,
        })
        messageBox.value = ''
        chatContent.scrollTop = chatContent.scrollHeight
    }

    function keyPressed(keyPressed) {
        // Enviar mensagem com enter
        if (document.activeElement.id == 'message-box' && keyPressed == 'Enter' && messageBox.value.trim()) send()

        // Abrir chat com click no teclado
        if (document.activeElement.id != 'message-box' &&(keyPressed == 'NumpadDivide' || keyPressed == 'KeyT')) openCloseChat()

        // Fechar chat aberto com ESC
        if(document.activeElement.id == 'message-box' && keyPressed == 'Escape') openCloseChat()
    }

    return {
        keyPressed,
        openCloseChat,
        send
    }
}