export default async (canvas, state, stateListener, command) => {
    //if ([ 'loading', 'login' ].includes(state.gameStage) || !state.myConfig.logged) return

    const messageBox = document.getElementById('message-box')
    const messageBoxContent = document.getElementById('message-box-content')
    const chatContent = document.getElementById('chat-content')
    const chatButton = document.getElementById('chat-button')
    const unreadMessageCounter = document.getElementById('unreadMessageCounter')
    const chat = document.getElementById('chat')
    chatButton.style.display = 'block'
/*function replaces(text, type) {
                            if (!text) return
                            if (type == 'color' && text == 'DEFAULT-COLOR') return text = '#000000'
                            
                            text = text
                                .replace(/{guildMemberCount}/g, 13)
                                .replace(/{guildName}/g, guild.name)
                                .replace(/{avatar}/g, user.avatarURL || '/imgs/avatar/Default.png')
                                .replace(/{@member}/g, `<alpha-metion>@${user.username}</alpha-metion>`)
                                .replace(/{member}/g, user.username)
                                .replace(/{memberTag}/g, user.tag)
                                .replace(/{memberId}/g, user.id)
                                .replace(/{lv}/g, 13)
            
                            const re = /<code(?:\s[^>]*)?>[\s\S]*?<\/code>|`{3}([\S\s]*?)`{3}|`{2}([\S\s]*?)`{2}|`([^`]*)`|~~([\S\s]*?)~~|\*{2}([\s\S]*?)\*{2}(?!\*)|\*([^*]*)\*|__([\s\S]*?)__/g;
                            let tmp = '';
                            do {
                                tmp = text;
                                text = text.replace(re, (match, a, b, c, d, e, f, g) => {
                                    if (a && type != 'title') return `<code ${type == 'content' ? 'class="content box"' : 'class="box"'}>${a}</code>`
                                    if (b || c) return `<code ${type == 'content' ? 'class="inline content"' : 'class="inline"'}>${b || c}</code>`
                                    if (d) return `<s>${d}</s>`
                                    if (e) return `<b>${e}</b>`
                                    if (f) return `<i>${f}</i>`
                                    if (g) return `<u>${g}</u>`
                                    return match
                                });
                            }  while (text != tmp);
            
                            return text
                        }*/
    function replaces(text, id) {
        if (!text) return text

        let update = false
        text = text
            .replace(/</g, '&lt;')
            .replace(/&lt;span/g, '<span')
            .replace(/&lt;\/span/g, '</span')
        //console.log(text)
        
        text = text.replace(/&lt;@([\s\S]*?)&gt;|&lt;@([\s\S]*?)>/g, (match, a, b) => {
            let metion = a || b
            if (metion) {
                update = true
                if (metion.includes('|')) {
                    id = metion.split('|')[0]
                    metion = metion.split('|')[1]
                }
                return `<span class="metion" contentEditable="false"${id ? 'id="'+id+'"' : ''}>@${metion}</span> `
            }
            return match
        });
        return { text, update }
    }

    if (command == 'gameLoop') {
        let { text, update } = replaces(messageBoxContent.innerHTML)
        if (update && messageBoxContent.innerHTML !== text) {
            messageBoxContent.innerHTML = text
            let metions = messageBoxContent.getElementsByClassName('metion')
            document.getSelection().collapse(document.getSelection().focusNode, metions.length*2)
            /*setTimeout(() => {
                let sel = document.getSelection();
                console.log(sel)
                if (sel.rangeCount > 0) {
                    //var textNode = sel.focusNode;
                    //var newOffset = sel.focusOffset + 2;
                    sel.collapse(sel.focusNode, 2/*Math.min(textNode.length, newOffset));
                }
            }, 1000)*/
            /*if(messageBoxContent.getSelection) {
                var range = messageBoxContent.getSelection().getRangeAt(0);
                range.setStart(range.startOffset + distance);
            } else if (messageBoxContent.document.selection) {
                var range = messageBoxContent.document.selection.createRange();
                range.setStart(range.startOffset + distance);
            }*/
        }

        return
        /*let elements = messageBoxContent.querySelectorAll('.messageBoxText')
        let text = ''
        for (let i = 0;i <= elements.length;i++) {
            if (elements[i]) {
                if (elements[i].id == 'metion') text += '<@'+elements[i].name+'>'
                else text += elements[i].innerText
            }
        }

        if (stateListener.oldText != text) {
            let textData = []

            let metionsArr = text.split(/<@([\S\s]*?)>/g)
            for (let i in metionsArr) {
                textData.push({
                    type: i%2 == 1 ? 'metion' : 'text',
                    content: metionsArr[i].replace(/\n/g, '')
                })
            }
            if (textData[textData.length-1].type == 'metion') textData.push({
                type: 'text',
                content: ''
            })

            for (let i = 0;i <= textData.length-1;i++) {
                if (elements[i]) {
                    let player = state.serverPlayers[elements[i].name]
                    if (textData[i].type == 'metion' && player) {
                        elements[i].className = 'messageBoxText metion'
                        elements[i].id = 'metion'
                        elements[i].contentEditable = false
                        elements[i].name = elements[i].name
                        if (elements[i].innerText != textData[i].content) {
                            elements[i].innerText = '@'+player.name
                        }
                    } else {
                        elements[i].className = 'messageBoxText'
                        elements[i].id = 'text'
                        elements[i].contentEditable = true
                        if (elements[i].innerText != textData[i].content) elements[i].innerText = textData[i].content
                    }
                } else if (textData[i].type == 'metion') {
                    let player = state.serverPlayers[textData[i].content]
                    if (player) {
                        let element = document.createElement('span')
                        element.className = 'messageBoxText metion'
                        element.id = 'metion'
                        element.contentEditable = false
                        element.innerText = '@'+player.name
                        element.name = textData[i].content

                        messageBoxContent.appendChild(element)
                    } else {
                        let element = document.createElement('span')
                        element.className = 'messageBoxText'
                        element.id = 'text'
                        element.contentEditable = true
                        element.innerText = textData[i].content

                        messageBoxContent.appendChild(element)
                    }
                } else {
                    let element = document.createElement('span')
                    element.className = 'messageBoxText'
                    element.id = 'text'
                    element.contentEditable = true
                    element.innerText = textData[i].content

                    messageBoxContent.appendChild(element)
                }
            }

            for (let i = 0;i <= elements.length;i++) {
                if (elements[i] && (!textData[i] || (i != 0 && i != textData.length-1 && !textData[i].content))) elements[i].remove()
            }
        }
        stateListener.oldText = text
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

                let contentData = []

                let metionsArr = message.content.split(/<@([\S\s]*?)>/g)
                for (let i in metionsArr) {
                    contentData.push({
                        type: i%2 == 1 ? 'metion' : 'text',
                        content: metionsArr[i].replace(/\n/g, '')
                    })
                }

                let contentElement = document.createElement('p')
                contentElement.id = 'Content'
                contentElement.style = `color: ${message.colorContent?.includes('RAINBOW') ? `hsl(${state.rainbowColor+message.timestamp+(Number(message.colorContent.split('-')[1]) || 0)}, 100%, 50%)` : message.colorContent || 'white'} ${message.messageAdditionalCSS ? ';'+message.messageAdditionalCSS : ''}`

                for (let i in contentData) {
                    if (contentData[i].type == 'metion') {
                        let element = document.createElement('span')
                        let player = state.serverPlayers[contentData[i].content]
                        element.className = 'metion'
                        element.innerText = `@${player?.name || contentData[i].content}`

                        if (contentData[i].content == state.socket.id) contentElement.className += 'Mentioned'

                        element.addEventListener('click', () => {
                            metionPlayer(contentData[i].content)
                        })

                        contentElement.appendChild(element)
                    } else {
                        let element = document.createElement('span')
                        element.innerText = contentData[i].content
                        contentElement.appendChild(element)
                    }
                }
                chatContent.appendChild(contentElement)

                /*let contentArr = []
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
            } else if (message.unread) {
                if (message.content.includes(`@${state.socket.id}`)) {
                    unreadMessagesAlert = true
                    unreadMessages += 1
                }
                if (unreadMessages <= 0) unreadMessages = '.'
            }
        }*/
    }

    /*function metionPlayer(id) {
        let player = state.serverPlayers[id]
        if (player) {
            let element = document.createElement('span')
            element.className = 'messageBoxText metion'
            element.id = 'metion'
            element.contentEditable = false
            element.innerText = '@'+player.name
            element.name = id

            messageBoxContent.appendChild(element)
        }
    }
    */

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
                contentElement.innerHTML = replaces(message.content).text
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
                if (unreadMessages <= 0) unreadMessages = '.'
            }
        }
    }

    function metionPlayer(id) {
        let player = state.serverPlayers[id]
        if (player) {
            messageBoxContent.innerHTML += `<span class="metion" contentEditable="false" id="${player.id || null}">@${player.name || player.id}</span> `
            messageBoxContent.focus()
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