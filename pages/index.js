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
                <canvas id="gameCanvas"/>
                <video preload="auto" id="gameVideo" />

                <button id="chat-button" />
                <div id="unreadMessageCounter" />

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