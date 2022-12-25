export default function chat(state, socket) {
    document.getElementById('chat-button').addEventListener('click', openCloseChat);
    
    const chatContent = document.getElementById('chat-content')

    const messageBoxInput = document.getElementById('message-box-input')
    const messageBox = document.getElementById('message-box')
    const chat = document.getElementById('chat')   
    const gameCanvas = document.getElementById('gameCanvas')
    
    function focusin(event) {
        const messageBoxWritingPosition = document.getElementById('messageBoxWritingPosition')

        chat.style.backgroundColor = 'rgba(0, 0, 0, 0.8)'
        chat.style.borderColor = 'rgb(50, 50, 50)'
        messageBox.style.backgroundColor = 'rgba(80, 80, 80, 1)'
        if (messageBoxWritingPosition) messageBoxWritingPosition.style.display = 'inline-block'

        state.onChat = 'on'
    }

    function focusout(event) {
        const messageBoxWritingPosition = document.getElementById('messageBoxWritingPosition')

        chat.style.backgroundColor = 'rgba(0, 0, 0, 0.2)'
        chat.style.borderColor = 'transparent'
        messageBox.style.backgroundColor = 'rgba(80, 80, 80, 0.4)'
        if (messageBoxWritingPosition) messageBoxWritingPosition.style.display = 'none'

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
            gameCanvas.focus()
            state.onChat = 'off'
            chat.style.display = 'none'
        }
        
        chatContent.scrollTop = chatContent.scrollHeight
        require('../GameFunctions/RenderChat').default(document.getElementById('gameCanvas'), state.game.state, state)
    }

    function send() {
        let content = state.messageContent.replace(/[\s]+/g, ' ')
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

        state.messageContent = ''
        state.renderChat = true
        chatContent.scrollTop = chatContent.scrollHeight
    }

    function keyPressed(event) {
        if (state.pauseGameKeys) return;
        
        if ((event.code == 'NumpadDivide' || event.code == 'KeyT') && state.onChat == 'off') return openCloseChat({ pointerType: 'mouse' })
        if (event.code == 'Escape' && state.onChat == 'on') return openCloseChat({ pointerType: 'mouse' })
        if (!event.key || state.onChat != 'on') return
        if (event.code == 'Enter') send()

        if (event.code == 'ArrowRight') state.writingPosition += 1
        if (event.code == 'ArrowLeft') state.writingPosition -= 1
        if (event.code == 'Home') state.writingPosition = 0
        if (event.code == 'End') state.writingPosition = state.messageContent.length

        if (event.key.length == 1 && (event.key != ' ' || event.key == ' ' && state.messageContent.substring(0, state.writingPosition)[state.messageContent.substring(0, state.writingPosition).length-1] != ' ')) {
            state.messageContent = state.messageContent.substring(0, state.writingPosition)+event.key+state.messageContent.substring(state.writingPosition)
            state.writingPosition += 1
        }

        try {
            if (event.code == 'Backspace') {
                state.messageContent = state.messageContent.substring(0, state.writingPosition-1)+state.messageContent.substring(state.writingPosition)
                state.writingPosition -= 1
                /*let sel = window.getSelection()

                if (sel) {
                    let selectedText = ''
                    if (sel.rangeCount) {
                        var container = document.createElement("div");
                        for (var i = 0, len = sel.rangeCount; i < len; ++i) {
                            container.appendChild(sel.getRangeAt(i).cloneContents());
                        }
                        selectedText = container.innerText;
                    }

                    sel = sel?.getRangeAt ? sel.getRangeAt(0) : null

                    let startElement = sel?.startContainer.parentElement
                    let start = Number(startElement.id)
                    let end = Number(startElement.id)+selectedText.length

                    if (event.code == 'Backspace' && (!start && start != 0 || !end && end != 0 || !sel)) {
                        state.messageContent = state.messageContent.substring(0, state.writingPosition-1)+state.messageContent.substring(state.writingPosition)
                        state.writingPosition -= 1
                    } else if (start != end && (start || start == 0)) {
                        state.messageContent = state.messageContent.substring(0, start)+ (event.code == 'Backspace' ? '' : event.key) +state.messageContent.substring(end);
                        state.renderChat = true
                    }
    
                    /*
                    let start = sel.startOffset
                    let end = sel.endOffset

                    if (start != end) {
                        //for (let i in messageBox) console.log(i, messageBox[i])
                        
                        let startElement = sel.startContainer.parentElement
                        for (let i in messageBox.childNodes) {
                            let childElement = messageBox.childNodes[i]

                            if (childElement.id == startElement.id) {
                                childElement.innerText = state.messageContent.substring(0, start)+ (event.code == 'Backspace' ? '' : event.key) +state.messageContent.substring(end);
                            }
                        }
                        /*if (sel.startContainer != sel.endContainer) {
                            let startElement = self.startContainer.parentElement
                            let endElement = self.endContainer.parentElement

                            state.messageContent
                        }
                        
                        //parentElement
                        //state.messageContent = state.messageContent.substring(0, start)+ (event.code == 'Backspace' ? '' : event.key) +state.messageContent.substring(end);
                    }
                    else if (event.code == 'Backspace') {
                        state.messageContent = state.messageContent.substring(0, state.writingPosition-1)+state.messageContent.substring(state.writingPosition)
                        state.writingPosition -= 1
                    }
                }

                /* if (event.code == 'Backspace') {
                        state.messageContent = state.messageContent.substring(0, state.writingPosition-1)+state.messageContent.substring(state.writingPosition)
                        state.writingPosition -= 1
                    }*/
            }
        } catch (err) { console.warn(err) }

        state.writingPosition = state.writingPosition <= 0 ? 0 : state.writingPosition > state.messageContent.length ? state.messageContent.length : state.writingPosition

        //console.log(state.messageContent)
        /*// Enviar mensagem com enter
        if (document.activeElement.id == 'message-box-input' && keyPressed == 'Enter' && messageBoxInput.value.trim()) send()

        // Abrir chat com click no teclado
        if (document.activeElement.id != 'message-box-input' && (keyPressed == 'NumpadDivide' || keyPressed == 'KeyT')) openCloseChat()

        // Fechar chat aberto com ESC
        if(document.activeElement.id == 'message-box-input' && keyPressed == 'Escape') openCloseChat()*/
    }

    return {
        keyPressed,
        //openCloseChat,
        //send
    }
}