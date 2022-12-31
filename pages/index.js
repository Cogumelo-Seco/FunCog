import { useRouter } from 'next/router';
import { io } from 'socket.io-client';
import React, { useEffect } from 'react';
import Head from "next/head";
import createGame from '../public/js/Game/Game.js';
import createListener from '../public/js/Game/Listener.js';
import renderGame from '../public/js/Game/RenderGame/index.js';

const Game = (props) => {
    const router = useRouter()

    useEffect(() => {
        const socket = io(props.SERVER, {
            withCredentials: true,
        })

        const canvas = document.getElementById('gameCanvas')        
        const Listener = createListener(socket);
        const game = createGame(Listener, canvas, socket);

        game.loading({ Listener })
        Listener.state.game = game
        game.start()

        renderGame(canvas, game, Listener);

        let login = true

        const registerContent = document.getElementById('registerContent')
        const loginContent = document.getElementById('loginContent')

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
                console.log(element.id == 'register' ? false : true)
                login = element.id == 'register' ? false : true

                for (let element of showPassword) element.checked = false
                for (let element of passwordInputs) {
                    element.type = 'password'
                    element.value = ''
                }
            })
        }

        function loop() {
            if ([ 'loading', 'login' ].includes(game.state.gameStage)) {
                window.requestAnimationFrame(() => loop())
                
                const withoutAccountButton = document.getElementById('withoutAccountButton')
                withoutAccountButton.onclick = (event) => {
                    alert('Sem uma conta, você terá acesso limitado ao jogo e todo o seu progresso não será salvo.\n\nWithout an account you will have limited access to the game and all your progress will not be saved.')

                    registerContent.style.display = 'none'
                    loginContent.style.display = 'none'
    
                    game.state.inLogin = false
                    game.state.smallFunctions.redirectGameStage('menu')
                }

                const username = document.getElementById(`usernameInput${login ? 'Login' : 'Register'}`)
                const password = document.getElementById(`passwordInput${login ? 'Login' : 'Register'}`)
                const repeatPassword = document.getElementById(`repeatPasswordInput`)
                const discordButton = document.getElementById(`discordButton${login ? 'Login' : 'Register'}`)
                discordButton.onclick = (event) => {
                    socket.emit(login ? 'login' : 'register', 'discord')

                    window.open(props.SERVER+'/api/auth', "discord-auth-window", `width=400px,height=700px,top=30px,left=20pxstatus=yes,scrollbars=yes,resizable=yes`)
                }

                username.value = username.value.slice(0, 20).replace(/[^A-Za-z0-9\-\_]/g, '')
                
                if (!login) {
                    registerContent.style.display = 'block'
                    loginContent.style.display = 'none'

                    if (password.value == '') repeatPassword.style.borderColor = '#000000'
                    else if (password.value != repeatPassword.value) repeatPassword.style.borderColor = '#550000'
                    else repeatPassword.style.borderColor = '#005500'

                    const registerButton = document.getElementById('registerButton')
                    registerButton.onclick = () => {
                        if (!username.value) return alert('You must add a username')
                        if (!password.value || password.value != repeatPassword.value) return alert('Passwords do not match')
                        
                        socket.emit('register', {
                            usernameID: username.value,
                            password: password.value
                        })
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
            }
        }
        loop()

        socket.on('login', (player) => {
            if (player) {
                registerContent.style.display = 'none'
                loginContent.style.display = 'none'

                game.state.inLogin = false
                game.state.smallFunctions.redirectGameStage('menu')

                game.state.myConfig.logged = true
                game.state.myConfig.author.name = player.name
                game.state.myConfig.author.avatar = player.avatar
                game.state.myConfig.colorName = player.chatColorName
                game.state.myConfig.colorContent = player.chatColorContent
                game.state.myConfig.emoji = player.chatEmoji

                socket.emit('setup')
            } else alert('ERROR: No player data')
        })

        socket.on('error', (err) => alert(err))
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
                <img id="gameBackground" src="https://raw.githubusercontent.com/Cogumelo-Seco/Cogu-FNF-Files/main/imgs/imgs/VSLullaby/Bygone/Background2.png" />
                <canvas id="gameCanvas"/>
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
                    <div id="message-box" maxLength="200" placeholder="Send Message">
                        <div id="message-box-content" />
                    </div>
                </div>
            </body>
        </html>
    )
}

export async function getStaticProps() {
    const SERVER = process.env.SERVER

    return {
        props: {
            SERVER,
        },
        revalidate: 1800
    }
}

export default Game