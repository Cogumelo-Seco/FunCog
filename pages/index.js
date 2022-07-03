import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import Head from "next/head";
import createGame from '../public/js/Game/Game.js';
import createListener from '../public/js/Game/Listener.js';
import renderGame from '../public/js/Game/RenderGame/index.js';

const Game = (props) => {
    const router = useRouter()

    useEffect(() => {
        const canvas = document.getElementById('gameCanvas')        
        const Listener = createListener();
        const game = createGame(Listener, canvas);

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
                
                <link rel="stylesheet" href="/css/game/animations.css" />
                <link rel="stylesheet" href="/css/game/game.css" />
                <link rel="stylesheet" href="/css/game/resizable.css" />
            </Head>
            <body id="body">
                <canvas id="gameCanvas" />

                <section id="section">
                    
                </section>
            </body>
        </html>
    )
}

export async function getStaticProps() {
    return {
        props: {
            
        },
        revalidate: 1800
    }
}

export default Game