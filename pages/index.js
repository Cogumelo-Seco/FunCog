import data from '../public/js/data.js';
import cookies from 'next-cookies';
import { useRouter } from 'next/router';
import { io } from 'socket.io-client';
import React, { useEffect } from 'react';
import Head from "next/head";
import createGame from '../public/js/Game/Game.js';
import createListener from '../public/js/Game/Listener.js';
import renderGame from '../public/js/Game/RenderGame/index.js';

const Game = (props) => {
    const cookie = cookies(data)
    const router = useRouter()

    useEffect(() => {
        let skipedConnecting = false
        const skipConnecting = document.getElementById('skipConnecting')
        const connectingMessage = document.getElementById('connectingMessage')
        skipConnecting.onclick = () => {
            skipedConnecting = true
            start(io(props.SERVER, {
                withCredentials: true,
            }), null, true)
        }

        function tryConnect(SERVER, one) {
            const socket = io(SERVER, {
                withCredentials: true,
            })

            let tryConnectOn = false
            let test = false
            socket.emit('test')
            socket.on('test', (r) => test = r)
            socket.on('connect', () => {
                connectingMessage.innerText = 'Waiting Response...'
                setTimeout(() => {
                    if (!test && !skipedConnecting) {
                        connectingMessage.innerText = 'Connecting to Server...'
                        if (!tryConnectOn) tryConnect(props.SERVER, one ? false : true)
                    } else {
                        connectingMessage.style.display = 'none'
                        if (!skipedConnecting) start(socket, SERVER, false)
                    }
                }, 2000)
            })
        }
        tryConnect(props.SERVER, true)

        function start(socket, ServerLink, SkipLogin) {
            document.body.style.cursor = 'none'
            skipConnecting.style.display = 'none'
            connectingMessage.style.display = 'none'
            const canvas = document.getElementById('gameCanvas')        
            const Listener = createListener(socket);
            const game = createGame(Listener, canvas, socket);
            game.state.inLogin = SkipLogin ? false : true

            game.loading({ Listener })
            game.state.router = router
            Listener.state.game = game
            game.start()

            renderGame(canvas, game, Listener);

            let login = true
            
            if (!SkipLogin && cookie.token) socket.emit('login', { token: cookie.token })

            const registerContent = document.getElementById('registerContent')
            const loginContent = document.getElementById('loginContent')
            const registerButton = document.getElementById('registerButton')

            const passwordInputs = document.getElementsByClassName('password')
            const showPassword = document.getElementsByClassName('showPasswordInput')
            for (let element of showPassword) {
                element.onclick = (event) => {
                    for (let elementPassword of passwordInputs) elementPassword.type = element.checked ? 'text' : 'password'
                }
            }

            const changeLoginState = document.getElementsByClassName('changeLoginState')
            for (let element of changeLoginState) {
                element.addEventListener('click', (event) => {
                    login = element.id == 'register' ? false : true

                    for (let element of showPassword) element.checked = false
                    for (let element of passwordInputs) {
                        element.type = 'password'
                        element.value = ''
                    }
                })
            }

            let registerButtonMoveSpeed = 20
            let registerButtonXMovement = 0
            let left = false
            let move = false
            registerButton.addEventListener('mouseover', () => {
                move = true
                left = left ? false : true
            })

            let borderGradientDeg = 0
            let countFrame = 0
            function loop() {
                if (game.state.inLogin/*[ 'loading', 'login' ].includes(game.state.gameStage)*/) {
                    window.requestAnimationFrame(() => loop())

                    const username = document.getElementById(`usernameInput${login ? 'Login' : 'Register'}`)
                    const password = document.getElementById(`passwordInput${login ? 'Login' : 'Register'}`)
                    const repeatPassword = document.getElementById(`repeatPasswordInput`)
                    const discordButton = document.getElementById(`discordButton${login ? 'Login' : 'Register'}`)

                    if (move && (!document.getElementById(`usernameInputRegister`).value || repeatPassword.value == '' || document.getElementById(`passwordInputRegister`).value != repeatPassword.value)) {
                        if (registerButtonXMovement <= 70 && !left) registerButtonXMovement += registerButtonMoveSpeed
                        if (registerButtonXMovement >= -70 && left) registerButtonXMovement -= registerButtonMoveSpeed
                    }
                    registerButton.style.transform = `translateX(${registerButtonXMovement}px)`

                    borderGradientDeg += 1
                    countFrame += 1
                    const loginAndRegisterContents = document.getElementsByClassName('loginAndRegisterContent')

                    /*if (countFrame%30 == 0) for (let connectingMessage of connectingMessages) {
                        if (connect) connectingMessage.style.display = 'none'
                        else {
                            if (inConnecting) connectingMessage.innerText = ''
                            connectingMessage.innerText += '.'
                            if (connectingMessage.innerText.length > 30) connectingMessage.innerText = connectingMessage.innerText.substring(0, 23)
                        }
                    }*/

                    let contentBackgroundColor = '#acacac'
                    for (let loginAndRegisterContent of loginAndRegisterContents) {
                        loginAndRegisterContent.style.background = `
                            radial-gradient(circle at 100% 100%, ${contentBackgroundColor} 0, ${contentBackgroundColor} 6px, transparent 6px) 0% 0%/8px 8px no-repeat,
                            radial-gradient(circle at 0 100%, ${contentBackgroundColor} 0, ${contentBackgroundColor} 6px, transparent 6px) 100% 0%/8px 8px no-repeat,
                            radial-gradient(circle at 100% 0, ${contentBackgroundColor} 0, ${contentBackgroundColor} 6px, transparent 6px) 0% 100%/8px 8px no-repeat,
                            radial-gradient(circle at 0 0, ${contentBackgroundColor} 0, ${contentBackgroundColor} 6px, transparent 6px) 100% 100%/8px 8px no-repeat,
                            linear-gradient(${contentBackgroundColor}, ${contentBackgroundColor}) 50% 50%/calc(100% - 4px) calc(100% - 16px) no-repeat,
                            linear-gradient(${contentBackgroundColor}, ${contentBackgroundColor}) 50% 50%/calc(100% - 16px) calc(100% - 4px) no-repeat,
                            linear-gradient(${borderGradientDeg}deg, #ff0000 0%, #ff00da 23%, #0100ff 43%, #00fff4 63%, rgba(0,255,14,1) 80%, rgba(246,255,0,1) 100%)
                        `
                        loginAndRegisterContent.style.boxSizing = 'border-box'
                    }
                    
                    const withoutAccountButton = document.getElementById('withoutAccountButton')
                    withoutAccountButton.onclick = (event) => {
                        //alert('Sem uma conta, você terá acesso limitado ao jogo e todo o seu progresso não será salvo. Limite de 5 Mods e sem permissão ao chat.\n\nWithout an account you will have limited access to the game and all your progress will not be saved. Limit of 5 Mods and no chat permission.')
                        alert('Sem uma conta, você terá acesso limitado ao jogo e todo o seu progresso não será salvo. Sem permissão ao chat.\n\nWithout an account you will have limited access to the game and all your progress will not be saved. No chat permission.')
        
                        //game.state.musics = game.state.musics.splice(0, 5)
                        game.state.inLogin = false
                        //game.state.smallFunctions.redirectGameStage('menu')
                    }

                
                    discordButton.onclick = (event) => {
                        socket.emit(login ? 'login' : 'register', 'discord')

                        window.open(ServerLink+'/api/auth', "discord-auth-window", `width=400px,height=700px,top=30px,left=20pxstatus=yes,scrollbars=yes,resizable=yes`)
                    }

                    username.value = username.value.slice(0, 20).replace(/[^A-Za-z0-9\-\_]/g, '')
                    
                    if (!login) {
                        registerContent.style.display = 'block'
                        loginContent.style.display = 'none'

                        if (password.value == '') repeatPassword.style.borderColor = '#000000'
                        else if (password.value != repeatPassword.value) repeatPassword.style.borderColor = '#550000'
                        else repeatPassword.style.borderColor = '#005500'

                        registerButton.onclick = () => {
                            //if (!username.value) return alert('You must add a username')
                            //if (!password.value || password.value != repeatPassword.value) return alert('Passwords do not match')
                            if (username.value && repeatPassword.value != '' && password.value == repeatPassword.value) {
                                socket.emit('register', {
                                    usernameID: username.value,
                                    password: password.value
                                })
                            }
                        }
                    } else {
                        registerContent.style.display = 'none'
                        loginContent.style.display = 'block'

                        const loginButton = document.getElementById('loginButton')
                        loginButton.onclick = () => {
                            if (!username.value) return alert('You must add a username')

                            socket.emit('login', {
                                usernameID: username.value,
                                password: password.value
                            })
                        }
                    }
                } else {
                    registerContent.style.display = 'none'
                    loginContent.style.display = 'none'
                }
            }
            loop()

            socket.on('login', (player) => {
                console.log(player)
                if (player?.token) {
                    game.state.inLogin = false
                    //game.state.smallFunctions.redirectGameStage('loading')

                    document.cookie = `token=${player.token}; path=/`;

                    game.state.myConfig.logged = true
                    game.state.myConfig.author.name = player.name
                    game.state.myConfig.author.avatar = player.avatar
                    game.state.myConfig.colorName = player.chatColorName
                    game.state.myConfig.colorContent = player.chatColorContent
                    game.state.myConfig.emoji = player.chatEmoji
                    game.state.myConfig.settings = player.settings
                    game.state.myConfig.token = player.token

                    /*if (player.settings && player.settings[0]) {
                        let defaultSettingsOptions = game.state.selectSettingsOption.settingsOptions
                        let playerSettingsOptions = player.settings
                        playerSettingsOptions = Object.assign(playerSettingsOptions, defaultSettingsOptions)
                        game.state.selectSettingsOption.settingsOptions = playerSettingsOptions
                    }*/
                    let defaultSettingsOptions = game.state.selectSettingsOption.settingsOptions
                    let playerSettingsOptions = player.settings
                    let reset = false
                    for (let i in defaultSettingsOptions) {
                        let option = playerSettingsOptions.find((o, pI) => o?.id == defaultSettingsOptions[i].id && i == pI)
                        if (option) defaultSettingsOptions[i].content = option.content
                        else reset = true
                        /*if (
                            playerSettingsOptions[i].name == defaultSettingsOptions[i].name && 
                            playerSettingsOptions[i].add == defaultSettingsOptions[i].add &&
                            playerSettingsOptions[i].name == defaultSettingsOptions[i].name &&
                            playerSettingsOptions[i].name == defaultSettingsOptions[i].name &&
                            playerSettingsOptions[i].name == defaultSettingsOptions[i].name &&
                            playerSettingsOptions[i].name == defaultSettingsOptions[i].name
                        ) playerSettingsOptions[i] = Object.assign(defaultSettingsOptions[i], playerSettingsOptions[i])//defaultSettingsOptions[i] = playerSettingsOptions[i]
                        else playerSettingsOptions[i] = defaultSettingsOptions[i]*/
                    }
                    if (reset) playerSettingsOptions = defaultSettingsOptions
                    /*for (let i in playerSettingsOptions) {
                        if (typeof defaultSettingsOptions[i] == 'object' && typeof playerSettingsOptions[i] == 'object') {
                            try {
                                if (defaultSettingsOptions[i]) playerSettingsOptions[i] = Object.assign(defaultSettingsOptions[i], playerSettingsOptions[i])
                            } catch (e) {}      
                        } else defaultSettingsOptions[i] = playerSettingsOptions[i]  
                    }*/
                    
                    socket.emit('setup')
                } else alert('ERROR: No player data')
            })

            socket.on('error', (err) => alert(err))
        }
    }, [])

    return (
        <html lang="pt-BR">
            <Head>
                <title>Game</title>

                <meta charset="UTF-8" />
                <meta http-equiv="X-UA-Compatible" content="IE=edge" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                
                <link rel="stylesheet" href="/css/fonts.css" />
                <link rel="stylesheet" href="/css/game/animations.css" />
                <link rel="stylesheet" href="/css/game/game.css" />
                <link rel="stylesheet" href="/css/game/resizable.css" />
            </Head>
            <body id="body">
                <span id="connectingMessage">Connecting to Server...</span>
                <button id="skipConnecting">Skip Connecting</button>

                <video preload="auto" id="gameVideoBackground" />
                <img id="gameBackground" src="https://raw.githubusercontent.com/Cogumelo-Seco/Cogu-FNF-Files/main/imgs/imgs/VSLullaby/Bygone/Background2.png" />
                <canvas id="gameCanvas"/>
                <img id="jumpscare" src="https://raw.githubusercontent.com/Cogumelo-Seco/Cogu-FNF-Files/main/imgs/imgs/VSLullaby/Bygone/Background2.png" />
                <video preload="auto" id="gameVideo" />

                <button id="chat-button" />
                <div id="unreadMessageCounter" />

                <div id="loginContent" className="loginAndRegisterContent">
                    <p id="title">Login</p>

                    <p class="description margin-top">Username/id</p>
                    <input class="inputText" id="usernameInputLogin" maxLength="20" type="text" placeholder="Name" />

                    <p class="description margin-top">Password</p>
                    <input class="inputText password" id="passwordInputLogin" type="password" placeholder="Password" />

                    <div class="description showPasswordContent">
                        <span class="showPassword">Show password:</span>
                        <input class="showPasswordInput" type="checkbox"/>
                    </div>

                    <span className="contentSeparation" />

                    <p class="changeLoginState" id="register">I don't have an account</p>

                    <button id="loginButton">Login</button>
                    <button id="withoutAccountButton">Enter without account</button>

                    <span class="contentSeparation" />

                    <div id="connections">
                        <button class="connectionButton" id="discordButtonLogin">
                            <img id="connectionButtonDiscordImg" src="/imgs/login/discord.png" />
                        </button>
                    </div>
                </div>

                <div id="registerContent" className="loginAndRegisterContent">
                    <p id="title">Register</p>

                    <p className="description margin-top">Username/id</p>
                    <input className="inputText" id="usernameInputRegister" maxLength="20" type="text" placeholder="Name" />

                    <p className="description margin-top">Password</p>
                    <input className="inputText password" id="passwordInputRegister" type="password" placeholder="Password" />

                    <p className="description" id="repeatPassword">Repeat password</p>
                    <input className="inputText password" id="repeatPasswordInput" type="password" placeholder="Password" />


                    <div class="description showPasswordContent">
                        <span class="showPassword">Show password:</span>
                        <input class="showPasswordInput" type="checkbox"/>
                    </div>

                    <span className="contentSeparation" />
                    
                    <p class="changeLoginState" id="login">I already have an account</p>

                    <div class="buttonsContent">
                        <button id="registerButton">Register</button>
                    </div>

                    <span className="contentSeparation" />

                    <div id="connections">
                        <button className="connectionButton" id="discordButtonRegister">
                            <img id="connectionButtonDiscordImg" src="/imgs/login/discord.png" />
                        </button>
                    </div>
                </div>

                <div id="chat">
                    <div id="chat-content" />
                    <div id="message-box" maxLength="200">
                        <div id="message-box-content">
                            <span className="messageBoxText" contentEditable="true"></span>
                        </div>
                    </div>
                </div>
            </body>
        </html>
    )
}

export async function getStaticProps() {
    const SERVER = process.env.SERVER
    const SERVER2 = process.env.SERVER2

    return {
        props: {
            SERVER,
            SERVER2,
        },
        revalidate: 1800
    }
}

export default Game