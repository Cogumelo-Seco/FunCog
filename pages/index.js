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
        skipConnecting.style.display = 'none'
        connectingMessage.style.display = 'none'
        const canvas = document.getElementById('gameCanvas')        
        let Listener = createListener();
        let game = createGame(Listener, canvas);

        game.loading({ Listener })
        game.state.router = router
        Listener.state.game = game
        game.start()

        renderGame(canvas, game, Listener);
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
                <span id="connectingMessage">...</span>
                <button id="skipConnecting">...</button>

                <video preload="auto" id="gameVideoBackground" />
                <img id="gameBackground" src="https://raw.githubusercontent.com/Cogumelo-Seco/Cogu-FNF-Files/main/imgs/imgs/VSLullaby/Bygone/Background2.png" />
                <canvas id="backgroundCanvas"/>
                <canvas id="gameCanvas"/>
                <img id="overlayImage" src="https://raw.githubusercontent.com/Cogumelo-Seco/Cogu-FNF-Files/main/imgs/imgs/VSLullaby/Bygone/Background2.png" />

                <div id="screenElements" />

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
                            <img id="connectionButtonDiscordImg" className="buttonImage" src="/imgs/login/discord.png" />
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
                            <img id="connectionButtonDiscordImg" className="buttonImage" src="/imgs/login/discord.png" />
                        </button>
                    </div>
                </div>

                <div id="chat">
                    <div id="chat-content" />
                    <div id="message-box">
                        <span id="placeholder" onClick={() => document.getElementById('message-box-content').focus()}>Message</span>
                        <div id="message-box-content" contentEditable="true"/>
                        <span id="characterLimitWarning">500/400</span>
                        <span id="openEmojiBoxButton">🤨</span>
                    </div>
                    <div id="emojiBox">
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
            SERVER
        },
        revalidate: 1800
    }
}

export default Game