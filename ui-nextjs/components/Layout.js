import Head from 'next/head'
import Header from "./Header";

export default function Layout({ children, title = 'GeeksClub' }) {
    return (
        <div>
            <Head>
                <title>{ title }</title>
                <meta name="viewport" content="width=device-width, initial-scale=1"/>
            </Head>
            <Header/>
            <main>
                { children }
            </main>
        </div>
    )
}
