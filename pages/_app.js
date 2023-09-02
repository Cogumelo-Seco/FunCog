import Router from 'next/router';
import Head from 'next/head';
import NProgress from 'nprogress';
import { CookiesProvider } from "react-cookie";

Router.events.on('routeChangeStart', (url) => {
    NProgress.start()
})
Router.events.on('routeChangeComplete', () => NProgress.done())
Router.events.on('routeChangeError', () => NProgress.done())

function App({ Component, pageProps }) {
    return (
        <>
            <Head>
                <link rel="shortcut icon" href="https://alpha-site.vercel.app/imgs/Cogu-avatar/Default.png" />
                <link rel="mask-icon" href="/favicons/safari-pinned-tab.svg" color="#000000" />
            </Head>
            <head>
                <link rel="stylesheet" href="/css/reset.css" />
                <link rel="stylesheet" type="text/css" href="/css/nprogress.css" />
                <link rel="stylesheet" href="/css/global.css" />
                <link rel="stylesheet" href="/css/globalAnimations.css" />
            </head>
            <nav>
                <style jsx>{`
                    a {
                        margin: 0 10px 0 0;
                    }
                `}</style>
            </nav>

            <div id="zoom" className="zoom">
                <div id="zoomContent">
                    <img id="zoomImage" src="/imgs/logo.png" />
                    <a id="openOriginal" href="/imgs/logo.png" target="_blank">Open original</a>
                </div>
            </div>

            <CookiesProvider>
                <Component {...pageProps} />
            </CookiesProvider>
        </>
    )
}

export default App