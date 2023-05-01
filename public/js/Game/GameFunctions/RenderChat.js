export default async (canvas, state, stateListener, command) => {
    if ([ 'loading', 'login' ].includes(state.gameStage) || !state.myConfig.logged) return

    const messageBoxContent = document.getElementById('message-box-content')
    const chatContent = document.getElementById('chat-content')
    const chatButton = document.getElementById('chat-button')
    const unreadMessageCounter = document.getElementById('unreadMessageCounter')
    const chat = document.getElementById('chat')
    chatButton.style.display = 'block'

    function replaces(text, id) {
        if (!text) return text

        let update = false
        text = text
            .replace(/</g, '&lt;')
            .replace(/&lt;span/g, '<span')
            .replace(/&lt;\/span/g, '</span')
        
        text = text.replace(/&lt;@([\s\S]*?)&gt;|&lt;@([\s\S]*?)>|\*{2}([\s\S]*?)\*{2}|\*([\s\S]*?)\*|~~([\S\s]*?)~~|__([\S\s]*?)__|`{2}([\S\s]*?)`{2}|`([^`]*)`/g, (match, a, b, c, d, e, f, g, h) => {
            let metion = a || b
            if (metion) {
                update = true
                if (metion.includes('|')) {
                    id = metion.split('|')[0]
                    metion = metion.split('|')[1]
                }
                return `<span class="metion" contentEditable="false"${id ? 'id="'+id+'"' : ''}>@${metion}</span>&nbsp;`
            }
            if (c) {
                update = true
                return `<span class="bold" contentEditable="true"${id ? 'id="'+id+'"' : ''}>${c}</span>&nbsp;`
            }
            if (d) {
                update = true
                return `<span class="italic" contentEditable="true"${id ? 'id="'+id+'"' : ''}>${d}</span>&nbsp;`
            }
            if (e) {
                update = true
                return `<span class="line" contentEditable="true"${id ? 'id="'+id+'"' : ''}>${e}</span>&nbsp;`
            }
            if (f) {
                update = true
                return `<span class="underline" contentEditable="true"${id ? 'id="'+id+'"' : ''}>${f}</span>&nbsp;`
            }
            if (g || h) {
                update = true
                return `<span class="code" contentEditable="true"${id ? 'id="'+id+'"' : ''}>${g || h}</span>&nbsp;`
            }
            return match
        });
        return { text, update }
    }

    if (command == 'gameLoop') {
        let { text, update } = replaces(messageBoxContent.innerHTML)
        if (messageBoxContent.innerText.length >= 200) messageBoxContent.style.color = 'red'
        else messageBoxContent.style.color = 'white'
        if (update && messageBoxContent.innerHTML !== text) {
            messageBoxContent.innerHTML = text
            let metions = messageBoxContent.getElementsByClassName('metion')
            //messageBoxContent.blur()
            //setTimeout(() => {
                //window.getSelection().removeAllRanges()
                //messageBoxContent.focus()
                for (let i = 0;i <= messageBoxContent.getElementsByTagName('span').length*2;i++) {
                    try {
                        window.getSelection().collapse(messageBoxContent, i);
                    } catch {}
                }
                //document.getSelection().setPosition(document.getSelection().focusNode, messageBoxContent.innerText.length-2)//.collapse(0, 1000)//document.getSelection().focusNode, document.getSelection().focusNode.length)
            //}, 2000)
        }

        return
    }

    state.messages = state.messages.slice(0, 1000)
    let messages = state.messages
    let unreadMessagesAlert = false
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

                let contentElement = document.createElement('p')
                contentElement.id = 'Content'
                contentElement.style = `color: ${message.colorContent?.includes('RAINBOW') ? `hsl(${state.rainbowColor+message.timestamp+(Number(message.colorContent.split('-')[1]) || 0)}, 100%, 50%)` : message.colorContent || 'white'} ${message.messageAdditionalCSS ? ';'+message.messageAdditionalCSS : ''}`
                /*contentElement.innerHTML = replaces(message.content).text
                let metionElements = contentElement.getElementsByClassName('metion')
                for (let element of metionElements) element.onclick = () => {
                    metionPlayer(element.id)
                }*/
                contentElement.innerHTML = message.content.replace(/(<div><br><\/div>){2}/g, '')
                let metionElements = contentElement.getElementsByClassName('metion')
                for (let element of metionElements) element.onclick = () => {
                    metionPlayer(element.id)
                }
                for (let element of metionElements) {
                    if (element.id == state.socket.id && !contentElement.className.includes('Mentioned')) contentElement.className += 'Mentioned'
                }
                chatContent.appendChild(contentElement)

                if (autoScroll) chatContent.scrollTop = chatContent.scrollHeight
                message.loadTo = 'none'
                message.unread = false
            } else if (message.unread) {
                if (message.content.includes(`@${state.socket.id}`)) {
                    unreadMessagesAlert = true
                    unreadMessages += 1
                }
                if (unreadMessages <= 0) unreadMessages = ' '
            }
        }
    }

    function metionPlayer(id) {
        let player = state.serverPlayers[id]
        if (player) {
            messageBoxContent.innerHTML += `<span class="metion" contentEditable="false" id="${player.id || null}">@${player.name || player.id}</span>&nbsp;`
            messageBoxContent.focus()
            for (let i = 0;i <= messageBoxContent.getElementsByTagName('span').length*2;i++) {
                try {
                    window.getSelection().collapse(messageBoxContent, i);
                } catch {}
            }
        }
    }

    if (unreadMessages > 0 || typeof(unreadMessages) == 'string') {
        unreadMessageCounter.style.display = 'flex'
        unreadMessageCounter.innerText = unreadMessages
        unreadMessageCounter.style.backgroundColor = unreadMessagesAlert ? 'rgb(115, 0, 255)' : 'rgb(40, 40, 40)'
        chatButton.style.background = 'rgba(0, 0, 0, 0.658) url(/imgs/chat/unreadChat.png) no-repeat center 0px / 100%'
    } else {
        unreadMessageCounter.style.display = 'none'
        chatButton.style.background = 'rgba(0, 0, 0, 0.658) url(/imgs/chat/chat.png) no-repeat center 0px / 100%'
    }
}