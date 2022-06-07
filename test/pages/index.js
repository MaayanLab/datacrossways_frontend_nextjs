import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

import React from 'react'
import Link from 'next/link'

import Button from '../components/Button'
import GoogleButton from '../components/GoogleButton'
import LymeButton from '../components/LymeButton'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Data Crossways Portal</title>
        <meta name="description" content="The easy data portal." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <a href="https://nextjs.org">DataCrossways!</a>
        </h1>
        <h2>Current version is {React.version}</h2>
        <br/>
        <br/>
        <Link  href="/signin">
          <Button>Go to login</Button>
        </Link>
        <br/>
        
      
        <p className={styles.description}>
          Get started by editing{' '}
          <code className={styles.code}>pages/index.js</code>
        </p>

        <div className={styles.grid}>
          <a href="https://nextjs.org/docs" className={styles.card}>
            <h2>Documentation &rarr;</h2>
            <p>Find in-depth information about Next.js features and API.</p>
          </a>

          <a href="https://nextjs.org/learn" className={styles.card}>
            <h2>Learn &rarr;</h2>
            <p>Learn about Next.js in an interactive course with quizzes!</p>
          </a>

          <a
            href="https://github.com/vercel/next.js/tree/canary/examples"
            className={styles.card}
          >
            <h2>Examples &rarr;</h2>
            <p>Discover and deploy boilerplate example Next.js projects.</p>
          </a>

          <a
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            className={styles.card}
          >
            <h2>Deploy &rarr;</h2>
            <p>
              Instantly deploy your Next.js site to a public URL with Vercel.
            </p>
          </a>
        </div>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://labs.icahn.mssm.edu/maayanlab/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Created by{' '}
          <span className={styles.logo}>
            <Image src="/maayan_logo.svg" alt="MaayanLab" width={85} height={32} />
          </span>
        </a>
      </footer>
    </div>
  )
}
