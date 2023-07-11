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
                contentElement.innerHTML = message.content//.replace(/(<div><br><\/div>){2}/g, '').replace(/(<br>)+/g, '<br><br>')
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
                chatContent.appendChild(contentElement)

                if (autoScroll) chatContent.scrollTop = chatContent.scrollHeight
                message.loadTo = 'none'
                message.unread = false
            } else if (message.unread) {
                console.log(message.content)
                //if (message.content.includes(`@${state.myConfig.author.playerID}`)) {
                    //
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
        chatButton.style.background = 'rgb(30, 10, 20, 0.5) url(/imgs/chat/unreadChat.png) no-repeat center 0px / 100%'
    } else {
        unreadMessageCounter.style.display = 'none'
        chatButton.style.background = 'rgb(30, 10, 20, 0.5) url(/imgs/chat/chat.png) no-repeat center 0px / 100%'
    }
}