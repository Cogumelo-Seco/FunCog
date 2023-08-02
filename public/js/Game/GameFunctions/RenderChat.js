export default async (canvas, state, stateListener, command) => {
    if ([ 'loading', 'login' ].includes(state.gameStage) || !state.myConfig.logged) return

    const characterLimitWarning = document.getElementById('characterLimitWarning')
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
        
        text = text.replace(/&lt;@([\s\S]*?)&gt;|&lt;@([\s\S]*?)>|\*{2}([\s\S]*?)\*{2}|\*([\s\S]*?)\*|~~([\S\s]*?)~~|__([\S\s]*?)__|`{2}([\S\s]*?)`{2}|`([^`]*)`|\|{2}([\S\s]*?)\|{2}|#([\S\s]*?)#/g, (match, a, b, c, d, e, f, g, h, i, j) => {
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
            if (i) {
                update = true
                return `<span class="spoiler is-hidden" contentEditable="true"${id ? 'id="'+id+'"' : ''}>${i}</span>&nbsp;`
            }
            if (j) {
                update = true
                return `<span class="giant" contentEditable="true"${id ? 'id="'+id+'"' : ''}>${j}</span>&nbsp;`
            }
            return match
        });
        return { text, update }
    }

    if (command == 'gameLoop') {
        if (messageBoxContent.innerText == '') messageBoxContent.innerHTML = ''
        let { text, update } = replaces(messageBoxContent.innerHTML)
        if (messageBoxContent.innerText.length >= 400) {
            function numberConverter(nbr) {
                let number = Number(nbr)
                if (Math.floor(number/1000000000000) > 0) return Math.floor(number/1000000000000)+'T'
                if (Math.floor(number/1000000000) > 0) return Math.floor(number/1000000000)+'B'
                if (Math.floor(number/1000000) > 0) return Math.floor(number/1000000)+'M'
                if (Math.floor(number/1000) > 0) return Math.floor(number/1000)+'K'
                return number
            }
            characterLimitWarning.style.display = 'block'
            characterLimitWarning.innerText = `${numberConverter(messageBoxContent.innerText.length)}/400`
            messageBoxContent.style.color = 'rgb(255, 150, 150)'
        } else {
            characterLimitWarning.style.display = 'none'
            messageBoxContent.style.color = 'white'
        }

        let contentElements = messageBoxContent.getElementsByTagName('span')
        for (let element of contentElements) {
            if (element.innerText.replace(/\s+/s, '').replace(/&nbsp;+/s, '') == '') element.remove()
            if (messageBoxContent.innerText.length >= 400) element.style.color = 'red'
        }

        if (text && text.split('</span>').length > 1 && text.split('</span>')[text.split('</span>').length-1].split(';')[0] != '&nbsp') {
            let endValue = '</span>'+text.split('</span>')[text.split('</span>').length-2].split('<span')[0]
            text = text.split('</span>').slice(0, text.split('</span>').length-2).join('</span>')+endValue
            update = true
        }

        if (update && messageBoxContent.innerHTML !== text) {
            messageBoxContent.innerHTML = text
            function toEnd() {
                for (let i = 0;i <= messageBoxContent.getElementsByTagName('span').length*2;i++) {
                    try {
                        window.getSelection().collapse(messageBoxContent, i);
                    } catch {}
                }
            }
            toEnd()
            setTimeout(toEnd, 20)
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

        if (message.loadTo == 'all' || message.loadTo == state.myConfig.author.playerID) {
            if (chat.style.display == 'block') {
                if (command == 'newMessage' && chatContent.scrollTop < chatContent.scrollHeight-500) autoScroll = false
                state.serverPlayers[message.author.id] = message.author

                let headerElement = document.createElement('p')
                headerElement.className = 'Header'
                headerElement.id = message.messageID+'-Header'
                headerElement.style = `color: ${message.colorName?.includes('RAINBOW') ? `hsl(${state.rainbowColor+message.timestamp+(Number(message.colorName.split('-')[1]) || 0)}, 100%, 50%)` : message.colorName || 'rgb(0, 229, 255)'} ${message.nameAdditionalCSS ? ';'+message.nameAdditionalCSS : ''}`
                headerElement.style.display = lastMessage && lastMessage.author.id == message.author.id && lastMessage.timestamp+120000 >= message.timestamp  ? 'none' : 'block'

                let nameElement = document.createElement('span')
                nameElement.id = 'Name'
                nameElement.innerText = `${message.author.name} ${message.emoji || '' } `

                let avatarElement = document.createElement('img')
                avatarElement.id = 'Avatar'
                avatarElement.src = message.author.avatar || './imgs/sticker-sla.png'

                let timestampElement = document.createElement('span')
                timestampElement.id = 'Timestamp'
                timestampElement.innerText = `${new Date(message.timestamp).toLocaleDateString()} - ${new Date(message.timestamp).toLocaleTimeString()}`

                headerElement.appendChild(avatarElement)
                headerElement.appendChild(nameElement)
                headerElement.appendChild(timestampElement)
                chatContent.appendChild(headerElement)

                nameElement.addEventListener('click', () => {
                    if (message.author.id && !message.author.server) {
                        metionPlayer(message.author.id)
                    }
                })

                let contentElementContaner = document.createElement('p')
                contentElementContaner.className = 'ContentContaner'
                contentElementContaner.id = message.messageID+'-Content'
                contentElementContaner.style = `color: ${message.colorContent?.includes('RAINBOW') ? `hsl(${state.rainbowColor+message.timestamp+(Number(message.colorContent.split('-')[1]) || 0)}, 100%, 50%)` : message.colorContent || 'white'} ${message.messageAdditionalCSS ? ';'+message.messageAdditionalCSS : ''}`
                //contecontentElementContanertElement.innerHTML = message.content//.replace(/(<div><br><\/div>){2}/g, '').replace(/(<br>)+/g, '<br><br>')

                let contentElement = document.createElement('span')
                //contentElement.id = 'Content'
                contentElement.innerHTML = message.content
                contentElementContaner.appendChild(contentElement)

                let messagePropsElement = document.createElement('span')
                messagePropsElement.id = 'messageProps'
                messagePropsElement.style.display = 'none'
                contentElementContaner.appendChild(messagePropsElement)

                let deleteMessageButton = document.createElement('button')
                deleteMessageButton.id = 'deleteMessageButton'
                deleteMessageButton.innerHTML = '<svg style="color: red; width: 100%; height: 100%" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16"> <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" fill="red"></path> <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z" fill="red"></path> </svg>'
                deleteMessageButton.onclick = () => {
                    if (message.author.id == state.myConfig.author.playerID) {
                        state.socket.emit('deleteMessage', message.messageID)
                    }
                }
                messagePropsElement.appendChild(deleteMessageButton)

                contentElementContaner.onmouseover = () => {
                    if (message.author.id == state.myConfig.author.playerID) {
                        messagePropsElement.style.display = 'block'
                    }
                }
                contentElementContaner.onmouseout = () => {
                    messagePropsElement.style.display = 'none'
                }

                let contentElements = contentElement.getElementsByTagName('span')
                for (let element of contentElements) {
                    element.contentEditable = false
                    if (element.className.includes('metion')) {
                        element.onclick = () => {
                            metionPlayer(element.id)
                        }
                        if (element.id == state.myConfig.author.playerID && !contentElement.className.includes('Mentioned')) contentElement.className += 'Mentioned'
                    }
                    if (element.className.includes('spoiler')) {
                        element.onclick = () => {
                            element.className = 'spoiler'
                        }
                    }
                }
                chatContent.appendChild(contentElementContaner)

                if (autoScroll) chatContent.scrollTop = chatContent.scrollHeight
                message.loadTo = 'none'
                message.unread = false
            } else if (message.unread) {
                if (message.content.includes(`<span class="metion" contenteditable="false" id="${state.myConfig.author.playerID}">`)) {
                    unreadMessagesAlert = true
                    unreadMessages = Number(unreadMessages)+1
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
        unreadMessageCounter.style.backgroundColor = unreadMessagesAlert ? 'rgba(150, 0, 50)' : 'rgb(40, 40, 40)'
        chatButton.style.background = 'rgba(100,75,175,0.2) url(/imgs/chat/unreadChat.png) no-repeat center 0px / 100%'
    } else {
        unreadMessageCounter.style.display = 'none'
        chatButton.style.background = 'rgba(100,75,175,0.2) url(/imgs/chat/chat.png) no-repeat center 0px / 100%'
    }
}