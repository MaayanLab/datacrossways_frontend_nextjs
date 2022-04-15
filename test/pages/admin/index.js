import Head from 'next/head'
import Image from 'next/image'
import styles from '../../styles/Home.module.css'

export default function AdminView() {
    return (
        <div className={styles.container}>
            <Head>
                <title>Admin</title>
                <meta name="description" content="Do what you want!" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <h1>You are admin, here are some things you can do</h1>

            <ul>
                <li>List users</li>
                <li>Create User</li>
                <li>List files</li>
                <li>Modify User Roles</li>
                <li>Create New Roles</li>
                <li>Create Projects</li>
            </ul >
        </div>
    )
}