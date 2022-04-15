import Link from 'next/link'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../../styles/Home.module.css'
import mystyles from './login.module.css'

import GoogleButton from '../../components/GoogleButton'
import BackLink from '../../components/BackLink'

export default function Login() {

    return (
        <div className={styles.container}>
            <Head>
                <title>Login</title>
                <meta name="description" content="Do what you want!" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main className={styles.main}>
                <div className={mystyles.b1}>
                    <h1>Welcome to DataCrossways. Please log in.</h1>
                    Login to Data Crossways is managed through OAuth.
                    <br />
                    <br />
                    <br />
                    <Link href="http://localhost:5000/login">
                        <GoogleButton>Sign in with Google</GoogleButton>
                    </Link>
                    <br />
                    <br />
                    <p>
                        <b>Note:</b> DataCrossways uses Google for authentication purposes only.
                        The application will not have access to your private data, and
                        will not send you any e-mails.
                    </p>
                    <hr />
                    <h2>
                        <BackLink href="/">
                            <a>Back to home</a>
                        </BackLink>
                    </h2>
                </div>
            </main>
        </div>
    )
}