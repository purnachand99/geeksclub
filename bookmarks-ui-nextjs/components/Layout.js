import Head from 'next/head'
import Header from "./Header";

export default function Layout({ children, title = 'Bookmarks-NextJS' }) {
    return (
        <div>
            <Head>
                <title>{ title }</title>
                <meta name="viewport" content="width=device-width, initial-scale=1"/>
            </Head>
            <Header/>
            <main>
                <div className="container">
                { children }
                </div>
            </main>
        </div>
    )
}
